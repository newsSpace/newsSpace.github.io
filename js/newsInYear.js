const newsInYearBox = document.getElementById("news-in-year")
const newsInYear = newsInYearBox.children[0]
let isHidden = false
const news2022 = 
    [
        {
            title: "사분의 자리 유성우 극대화",
            date: 20220104,
            content: "1월 3일 밤을 넘어 1월 4일 새벽, 극대시간은 1월 4일 5시 40분. 최대 한 시간에 120개 관측 가능."
        },
        {
            title: "금성-토성-화성-달 근접",
            date: 20220328,
            content: "동틀 무렵 금성, 토성, 화성과 달이 근접."
        },
        {
            title: "금성-목성 근접",
            date: 20220501,
            content: "목성과 금성이 거의 붙은것 처럼 관측. 이후 4시 30분 경 달-목성-화성이 근접."
        },
        {
            title: "태양계 6행성 일직선",
            date: 20220626,
            content: "수성, 금성, 천왕성, 화성, 목성, 토성이 일렬로 배열."
        },
        {
            title: "가장 큰 보름달",
            date: 20220714,
            content: "새벽에 가장 큰 달. 이번 년도 가장 큼."
        },
        {
            title: "페르세우스자리 유성우 극대",
            date: 20220813,
            content: "지구 대기와 충돌하며 극대. 13일 새벽이 관측 최적기"
        },
        {
            title: "한가위 보름달",
            date: 20220910,
            content: "서울 기준 19시 14분 떠서 6시 41분에 진다."
        },
        {
            title: "개기월식",
            date: 20221108,
            content: "11얼 8일 7시 16분 경 개기월식 시작. 20시 41분 경 종료."
        },
        {
            title: "쌍둥이자리 유성우 극대",
            date: 20221214,
            content: "12월 14일 22시 극대. 시간당 최대 150개 관측 가능."
        }
    ]
function formDate(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : " " + (date.getMonth() + 1)
    const day = (date.getDate() + 1) >= 10 ? date.getDate() : " " + (date.getDate() + 1)
    
    return year + "" + month + day
}

window.onload = () => {
    const date = new Date()
    const todayDate = parseInt(formDate(date))

    news2022.every(
        (value) => {
            if (value.date >= todayDate) {
                const changedDate = String(value.date)
                const dateForPrint = changedDate.substring(4, 6)+"/"+changedDate.substring(6)
                newsInYear.innerText = " [" + dateForPrint + "] " + value.title+ ":" + value.content
                return false
            } else {
                return true
            }
        }
    )
}

newsInYear.addEventListener("click", () => {
    if (!isHidden) {
        newsInYear.classList.remove("overflow")
        isHidden = !isHidden
    } else {
        newsInYear.classList.add("overflow")
        isHidden = !isHidden
    }
})