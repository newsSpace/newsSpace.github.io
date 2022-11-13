const posts = document.getElementById("posts")

function getData() {
    return fetch("https://script.google.com/macros/s/AKfycbwj0gXwoDe-YUQ-tDyP7tOsH_v7ML4UDCabv8LZn3l_bZcxPjKqpQ0ZX-_2ocH0e8Sh/exec?sheetName=crawling")
        .then(res => res.json())
        .then(dat => {
            const data = dat.data
            return data
        })
        .catch(err => console.log(err))
}

getData().then((dat) => {
    dat.forEach(element => {
        const div = document.createElement("div")
        div.classList.add("hide")
        div.classList.add("box")

        const title = document.createElement("h5")
        title.innerText = element.name
        title.classList.add("news-title")
        div.appendChild(title)

        const author = document.createElement("span")
        author.innerText = "by" + element.author
        author.classList.add("news-author")
        div.appendChild(author)

        const content = document.createElement("p")
        content.innerText = element.post
        content.classList.add("news-content")
        div.appendChild(content)
        
        posts.appendChild(div)
    });
})