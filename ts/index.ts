const hours = new Date().getHours()
const minutes = new Date().getMinutes()
const seconds = new Date().getSeconds() 
const isToday = new Date(Date.now())
const totalHours = hours + 6
const totalMinutes = (totalHours - hours) * 60
const totalSeconds = totalMinutes * 60

const beforeStartCount = () => {
    const inputDate:any = document.getElementById('date')
    const inputStart:any = document.getElementById('start')
    const inputExit:any = document.getElementById('exit')
    inputDate.value = isToday.toLocaleDateString()
    inputStart.value = `${hours}:${minutes}:${seconds}`
    inputExit.value = `${totalHours}:${minutes}:${seconds}`
}
 
const refresh = (timer: number) => {
    const seconds: any = document.getElementById('seconds')
    const minutes: any = document.getElementById('minutes')
    const hours: any = document.getElementById('hours')
    let totalSeconds: any = timer % 60
    let totalMinutes: any  = Math.floor((timer % (60 * 60)) / 60)
    let totalHours: any = Math.floor((timer % (60 * 60 * 24)) / (60 * 60))
    totalSeconds = totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds
    totalMinutes = totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes
    totalHours = totalHours < 10 ? `0${totalHours}` : totalHours
    seconds.textContent = totalSeconds
    minutes.textContent = totalMinutes
    hours.textContent = totalHours
}

const countdown = (timer: number) => {
    let sec = 0
    const intervalStart = 9900
    const intervalEnd = 10800
   const count = () => {
        if(timer === 0) {
            stopCountdown(id)
        } 
        refresh(timer)
        timer--
        sec ++
        if(sec === intervalStart) {
            const inputIntervalStart: any = document.getElementById('intervalStart')
            inputIntervalStart.value = `${jobInterval().hours}:${jobInterval().minutes}:${jobInterval().seconds}`
        }
        if(sec === intervalEnd) {
            const inputIntervalEnd: any = document.getElementById('intervalEnd')
            inputIntervalEnd.value = `${jobInterval().hours}:${jobInterval().minutes}:${jobInterval().seconds}`
        }
    }
    const id = setInterval(count, 1000) 
}

const stopCountdown = (id: number) => {
    clearInterval(id)
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

const jobInterval = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const jobInterval =  {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
    return jobInterval
}

countdown(totalSeconds)
beforeStartCount()