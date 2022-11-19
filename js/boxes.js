const posts = document.getElementById("posts")
const footer = document.getElementById("footer")

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
    footer.classList.remove("hidden")

    dat.forEach(element => {
        const div = document.createElement("div")
        div.classList.add("box")

        const title = document.createElement("h5")
        title.innerText = element.name
        title.classList.add("news-title")
        div.appendChild(title)

        const information = document.createElement("span")
        information.innerText = "by " + element.author + "\n" + element.launchtime.substring(0, 8) + String(parseInt(element.launchtime.substring(8, 10)) + 1)
        information.classList.add("news-author")
        div.appendChild(information)

        const content = document.createElement("p")
        content.innerText = element.post
        content.classList.add("news-content")
        div.appendChild(content)

        posts.appendChild(div)
    });
})