const date  = new Date()
let hours: any = date.getHours()
let minutes: any = date.getMinutes()
let seconds: any = date.getSeconds()
const isToday = new Date(Date.now())

const clock = () => {
    const date  = new Date()
    let hh: any = date.getHours()
    let mn: any = date.getMinutes()
    let sc: any = date.getSeconds()
    hh = hh < 10 ? `0${hh}` : hh
    mn = mn < 10 ? `0${mn}` : mn
    sc = sc < 10 ? `0${sc}` : sc
    const seconds: any = document.getElementById('seconds')
    const minutes: any = document.getElementById('minutes')
    const hours: any = document.getElementById('hours')
    seconds.innerText = sc
    minutes.innerText = mn
    hours.innerText = hh
}

const beforeStartCount = () => {
    if(hours == 7 && minutes >= 30) {
        let totalHours: any = hours + 6
        let intervalStartHour = 0
        let intervalStartTime: any = 0
        if(minutes < 15) {
            intervalStartHour = hours + 2
            intervalStartTime =  (60 - 15) + minutes
        } else {
            intervalStartHour = hours + 3
            intervalStartTime =  minutes - 15
        } 
    
        let intervalEndTime: any =  intervalStartTime + 15
    
        if (intervalEndTime > 59) {
            intervalEndTime = intervalEndTime - 60
        } else {
            intervalEndTime = intervalEndTime
        }
        const inputDate:any = document.getElementById('date')
        const inputStart:any = document.getElementById('input')
        const inputIntervalStart: any = document.getElementById('intervalStart')
        const inputIntervalEnd: any = document.getElementById('intervalEnd')
        const inputExit:any = document.getElementById('exit')
        hours = hours < 10 ? `0${hours}` : hours
        minutes = minutes < 10 ? `0${minutes}` : minutes
        seconds = seconds < 10 ? `0${seconds}` : seconds
        totalHours = totalHours > 23 ?  `0${totalHours - 24}` : `${totalHours}`
        intervalStartTime = intervalStartTime < 10 ? `0${intervalStartTime}` : intervalStartTime
        let intervalEndHour = minutes < 15 ? `${intervalStartHour + 1}` : intervalStartHour
        intervalEndTime = intervalEndTime < 10 ? `0${intervalEndTime}` : intervalEndTime
        inputDate.value = isToday.toLocaleDateString()
        inputStart.value = `${hours}:${minutes}:${seconds}`
        inputIntervalStart.value = `${intervalStartHour}:${intervalStartTime}:${seconds}`
        inputIntervalEnd.value = `${intervalEndHour}:${intervalEndTime}:${seconds}`
        inputExit.value = `${totalHours}:${minutes}:${seconds}`
    }
   

}
 
const stopCountdown = () => {
    const inputStart: any = document.getElementById('input')

    console.log(inputStart.value)
    if(inputStart.value != '') {
        clearInterval(id)
        let finalHour: any = new Date().getHours()
        let finalMinute: any = new Date().getMinutes()
        let finalSeconds: any = new Date().getSeconds()
        finalHour = finalHour < 10 ? `0${finalHour}` : finalHour
        finalMinute = finalMinute < 10 ? `0${finalMinute}` : finalMinute
        finalSeconds = finalSeconds < 10 ? `0${finalSeconds}` : finalSeconds
        const inputEnd:any = document.getElementById('output')
        const inputExtraHourStart: any = document.getElementById('extraHourStart')
        const inputExtraHourEnd: any = document.getElementById('extraHourEnd')
        inputEnd.value = `${finalHour}:${finalMinute}:${finalSeconds}`
        if(inputExtraHourStart.value != '') {
            inputExtraHourEnd.value = `${finalHour}:${finalMinute}:${finalSeconds}`
        }
        autoClick()
    }
}

const autoClick = () => {
    const buttonSend:any = document.getElementById("submit");
    buttonSend.setAttribute('onclick','exportData()')
    buttonSend.dispatchEvent(new MouseEvent("click"));
};


const extraHour = () => {
    const inputStart: any = document.getElementById('input')
    let hh: any = document.getElementById('hours')?.innerText
    let mn: any = document.getElementById('minutes')?.innerText
    let sc: any = document.getElementById('seconds')?.innerText
    const end = '1330'

    if((`${hh}${mn}` > end) && (inputStart.value != '') ) {
        const inputExtraHourStart: any = document.getElementById('extraHourStart')
        inputExtraHourStart.value = `${hh}:${mn}:${sc}`
    }

}

const optionStart: any = document.getElementById('start')
const optionExtraHour: any = document.getElementById('extraHour')
const optionFinish: any = document.getElementById('end')

optionStart.addEventListener('click', () => {
    beforeStartCount()
})

optionExtraHour.addEventListener('click', () => {
    extraHour()
})

optionFinish.addEventListener('click', () => {
    stopCountdown()
})

const notificationMe = () => {
    const notification = new Notification("Testando Notificação!", {
      body: "Rodrigo Está testando",
    });

    notification.onclick = () => {
        window.open("");
    };
  };
  
  const notification = () => {
    if (Notification.permission === "granted") {
      notificationMe();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          notificationMe();
        }
      });
    }
  };

const id = setInterval(clock, 1000)
setTimeout(notification, 19800)
