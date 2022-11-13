import MySQLdb
import requests
from bs4 import BeautifulSoup

conn = MySQLdb.connect( 
    user="spacecrawl_user", 
    passwd="sp1212", 
    host="localhost", 
    db="space_db" 
    #charset="utf-8"
)

cursor = conn.cursor()

URL = 'https://spacenews.com/segment/news/' 
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"} 
res = requests.get(URL, headers=headers) 
res.raise_for_status()

soup = BeautifulSoup(res.text)
launch_articles = soup.select('#main > div.launch-section > div')

for launch_article in launch_articles:
    news_url = launch_article.select_one('h2 > a').attrs['href'] 
    news_name = launch_article.select_one('h2 > a').text
    news_author = launch_article.select_one('div.launch-author > a').text
    news_launch_date = launch_article.select_one('time').text
    news_contents = launch_article.select_one('p').text
    
    selectSQL = "select idx from space_news_list where title_name = %s and launch_date = %s"
    cursor.execute(selectSQL, (news_name, news_launch_date))
    
    if cursor.rowcount>0: continue

    URL = 'https://script.google.com/macros/s/AKfycbyiG7rOum49qrEuVcO44m9somlu1vew1qFj-AEMPjMwW0H9My8zqJgIlMknxHKhog/exec?url=' + news_url + "&name=" + news_name + "&author=" + news_author + "&launchtime=" + news_launch_date + "&post=" + news_contents
    response = requests.get(URL)
    response.status_code
    response.text
    
    print('News Name : ', news_name)
    print('News URL : ', news_url)
    print('New Author : ', news_author)
    print('News Launch Time : ', news_launch_date)
    print('News Post : ', news_contents)
    print('========================================================================================================')

    cursor.execute("INSERT INTO space_news_list (title_name, link_url, author_name, launch_date, news_contents) VALUES " +
     "(%s, %s, %s, %s, %s)", (news_name, news_url, news_author, news_launch_date, news_contents))

conn.commit()
conn.close()


#구글 스프레드시트 링크: https://docs.google.com/spreadsheets/d/1Q6Jb7669Tm4vhurdb5biFALgmdP5L60_3Rd16ci11nA/edit?usp=sharing
#웹앱 링크: https://script.google.com/macros/s/AKfycbwvcA-Sp1qkkLU9d1sGZO1_tGFW3VOQoU0UT6mx7WXllm3cunM1Mcq5ibLVOM6gS5N-/exec
