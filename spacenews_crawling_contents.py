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

selectSQL = "select idx, link_url from space_news_list where contents_update = false"
cursor.execute(selectSQL)

if cursor.rowcount==0: exit()

result = cursor.fetchall()

for row in result:
    #row[0] = idx, row[1] = link_url
    URL = row[1]
    headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}
    res = requests.get(URL, headers=headers)
    res.raise_for_status()

    soup = BeautifulSoup(res.text)
    launch_articles = soup.select('#main > article > section > div.clearfix > div > p')

    news_contents = ""

    for launch_article in launch_articles:
        news_contents = news_contents + " " + launch_article.get_text()

    cursor.execute("insert into space_news_contents values (%s, %s)", (news_contents, row[0]))
    
    URL = 'https://script.google.com/macros/s/AKfycbzoPSPL_Wj6CvuIPpk4tK2Njdg914AbjP1ue0LTTDTPAfwaObWNmvTyMVILQvPaNnJ-/exec?contents=' + news_contents + "&blank=" + " "
    response = requests.get(URL)
    response.status_code
    response.text

    updateSQL = "update space_news_list set contents_update = true where idx = {0}".format(row[0])
    cursor.execute(updateSQL)

conn.commit()
conn.close()
