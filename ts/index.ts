let hours: any = new Date().getHours()
let minutes: any = new Date().getMinutes()
let seconds: any = new Date().getSeconds() 
const isToday = new Date(Date.now())
let totalHours: any = hours + 6
let intervalStartHour = hours + 3
let intervalStartMinutes: any =  minutes + 45
let intervalEndMinutes = intervalStartMinutes + 15
let totalMinutes: any = (totalHours - hours) * 60
// const totalSeconds = totalMinutes * 60
let countSeconds = 0

const clock = () => {
    const date = new Date()
    let hh: any = date.getHours()
    let mn: any = date.getMinutes()
    let sc: any = date.getSeconds()
    const intervalStart = 9900
    const intervalEnd = 10800
    const totalSeconds = 21600
    hh = hh < 10 ? `0${hh}` : hh
    mn = mn < 10 ? `0${mn}` : mn
    sc = sc < 10 ? `0${sc}` : sc
    const seconds: any = document.getElementById('seconds')
    const minutes: any = document.getElementById('minutes')
    const hours: any = document.getElementById('hours')
    seconds.innerText = sc
    minutes.innerText = mn
    hours.innerText = hh
    countSeconds ++

    if(countSeconds == intervalStart) {
        const inputIntervalStart: any = document.getElementById('intervalStart')
        inputIntervalStart.value = `${hh}:${mn}:${sc}`
    }

    if(countSeconds == intervalEnd) {
        const inputIntervalEnd: any = document.getElementById('intervalEnd')
        inputIntervalEnd.value = `${hh}:${mn}:${sc}`
    }

    if(countSeconds == totalSeconds) {
      clearInterval(id)
      stopCountdown()
    }
}

const beforeStartCount = () => {
    const inputDate:any = document.getElementById('date')
    const inputStart:any = document.getElementById('start')
    const inputIntervalStart: any = document.getElementById('intervalStart')
    const inputIntervalEnd: any = document.getElementById('intervalEnd')
    const inputExit:any = document.getElementById('exit')
    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    totalHours = totalHours > 23 ?  `0${totalHours - 24}` : `${totalHours}`
    intervalStartMinutes = intervalStartMinutes > 59 ? `${intervalStartMinutes - 60}` : intervalStartMinutes
    intervalEndMinutes  = intervalEndMinutes > 59 ? `${intervalEndMinutes - 60}` : intervalEndMinutes
    intervalStartMinutes = intervalStartMinutes < 10 ? `0${intervalStartMinutes}` : intervalStartMinutes
    intervalEndMinutes = intervalEndMinutes < 10 ? `0${intervalEndMinutes}` : intervalEndMinutes
    inputDate.value = isToday.toLocaleDateString()
    inputStart.value = `${hours}:${minutes}:${seconds}`
    inputIntervalStart.value = `${intervalStartHour}:${intervalStartMinutes}:${seconds}`
    inputIntervalEnd.value = `${intervalStartHour}:${intervalEndMinutes}:${seconds}`
    inputExit.value = `${totalHours}:${minutes}:${seconds}`
}
 
const stopCountdown = () => {
    const table: any = document.getElementById('calendar-body')
    const row = document.createElement('tr')
    const finalHour = new Date().getHours()
    const finalMinute = new Date().getMinutes()
    const finalSeconds = new Date().getSeconds()
    const cell1 = document.createElement('td')
    const cell2 = document.createElement('td')
    const cell3 = document.createElement('td')
    // cell1.innerText = isToday.toLocaleDateString()
    // cell2.innerText = `${hours}:${minutes}`
    // cell3.innerText = `${finalHour}:${finalMinute}`
    row.append(cell1, cell2, cell3)
    table.append(row)
    const inputEnd:any = document.getElementById('end')
    // const inputExtraHour:any = document.getElementById('extraHour')
    inputEnd.value = `${finalHour}:${finalMinute}:${finalSeconds}`
    autoClick()
}

const autoClick = () => {
    const buttonSend:any = document.getElementById("submit");
    buttonSend.dispatchEvent(new MouseEvent("click"));
};

beforeStartCount()
const id = setInterval(clock, 1000)



