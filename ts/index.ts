const date  = new Date()
let hours: any = date.getHours()
let minutes: any = date.getMinutes()
let seconds: any = date.getSeconds()
const isToday = new Date(Date.now())

const clock = () => {
    const date  = new Date()
    let hh: any = date.getHours() * 30
    let mn: any = date.getMinutes() * 6
    let sc: any = date.getSeconds() * 6
    const seconds: any = document.getElementById('seconds')
    const minutes: any = document.getElementById('minutes')
    const hours: any = document.getElementById('hours')
    hours.style.transform = `rotateZ(${hh+(mn/12)}deg)`
    minutes.style.transform = `rotateZ(${mn}deg)`
    seconds.style.transform = `rotateZ(${sc}deg)`
}

const countDown = () => {
    let endTime = hours + 6
    let day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    if(endTime > 23) {
        day++
    }
    const endHour: any = document.getElementById('exit')
    const countDate = new Date(`${month}/${day}/${year} ${endHour.value}`).getTime();

    const count = () => {
      const now = new Date().getTime();
      const gap = countDate - now;
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      let h: any = Math.floor((gap % day) / hour);
      let m: any = Math.floor((gap % hour) / minute);
      let s: any = Math.floor((gap % minute) / second);
      h = h < 10 ? `0${h}` : h;
      m = m < 10 ? `0${m}` : m;
      s = s < 10 ? `0${s}` : s;
      const hours: any = document.getElementById("hour")
      const minutes: any = document.getElementById("minute")
      const seconds: any  = document.getElementById("second")
      hours.innerText = h;
      minutes.innerText = m;
      seconds.innerText = s;
      if(h == 0) {
        clearInterval(idCountdown)
      } else if (h == 0 && m == 30) {
        notification()
      }
    }        
    const idCountdown = setInterval(count, 1000);
}

const beforeStartCount = () => {
    if(hours >= 7 && minutes >= 30) {
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
        countDown()
    }
}
 
const stopCountdown = () => {
    const inputStart: any = document.getElementById('input')
    if(inputStart.value != '') {
        countDown()
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
    const notification = new Notification("Web Ponto", {
      body: "Atenção! Seu tempo está acabando, se precisar fazer hora extra, clique em 'solicitar hora extra', após o horário de saída!",
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