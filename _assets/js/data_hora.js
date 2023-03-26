const currentTime = () => {
    const elementHora = document.getElementById('hora')

    let date = new Date()
    let hh = date.getHours()
    let mm = date.getMinutes()
    let ss = date.getSeconds()

    hh = hh < 10 ? `0${hh}` : hh
    mm = mm < 10 ? `0${mm}` : mm
    ss = ss < 10 ? `0${ss}` : ss

    let time = `${hh}:${mm}:${ss}`
    elementHora.innerText = time
}

const currentDate = () => {
    const elementData = document.getElementById('data')

    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month

    elementData.innerHTML = day + "/" + `${month}` + "/" + year
}

currentDate()
currentTime()
setInterval(currentTime, 1000)