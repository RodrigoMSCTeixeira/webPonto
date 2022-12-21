const date  = new Date()
let hours: any = date.getHours()
let minutes: any = date.getMinutes()
let seconds: any = date.getSeconds()
const isToday = new Date(Date.now())

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
      const hours: any = document.getElementById("countdownHours")
      const minutes: any = document.getElementById("countdownMinutes")
      const seconds: any  = document.getElementById("countdownSeconds")
      hours.innerText = h;
      minutes.innerText = m;
      seconds.innerText = s;
      if(h == 0 && m == 0 && s == 0) {
        clearInterval(id)
        stopCountdown()
      } else if (h == 0 && m == 30) {
        notification()
      }
    }  
   const id = setInterval(count, 1000);
}

const extraHourCounter = () => {
  const time = new Date()
  let hh: any = time.getHours()
  let mn: any = time.getMinutes()
  let sc: any = time.getSeconds()

  if(hh == 13 && mn > 30) {
    hh = hh < 10 ? `0${hh}` : hh;
    mn = mn < 10 ? `0${mn}` : mn;
    sc = sc < 10 ? `0${sc}` : sc;
    let sec: any = 0
    let min: any = 0
    let hr: any = 0
    const heStart: any = document.getElementById("extra-hour-start")
    heStart.value = `${hh}:${mn}:${sc}`
  
    const count = () => { 
      sec++
      if(sec > 59) {
        min++
        sec = 0
      }
      if(min > 59) {
        hr++
        min = 0
      }
      const hours: any = document.getElementById("hour")
      const minutes: any = document.getElementById("minute")
      const seconds: any  = document.getElementById("second")
      hours.innerText = hr < 10 ? `0${hr}`: hr
      minutes.innerText = min < 10 ? `0${min}`: min
      seconds.innerText = sec < 10 ? `0${sec}`: sec
    }
    setInterval(count, 1000)
  }
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
        const inputStart:any = document.getElementById('start')
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
    const inputStart: any = document.getElementById('start')
    if(inputStart.value != '') {
        let finalHour: any = new Date().getHours()
        let finalMinute: any = new Date().getMinutes()
        let finalSeconds: any = new Date().getSeconds()
        finalHour = finalHour < 10 ? `0${finalHour}` : finalHour
        finalMinute = finalMinute < 10 ? `0${finalMinute}` : finalMinute
        finalSeconds = finalSeconds < 10 ? `0${finalSeconds}` : finalSeconds
        const inputEnd:any = document.getElementById('end')
        const inputExtraHourStart: any = document.getElementById('extra-hour-start')
        const inputExtraHourEnd: any = document.getElementById('extra-hour-end')
        inputEnd.value = `${finalHour}:${finalMinute}:${finalSeconds}`
        if(inputExtraHourStart.value != '') {
            inputExtraHourEnd.value = `${finalHour}:${finalMinute}:${finalSeconds}`
        }
        autoClick()
    }
}

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
}

const autoClick = () => {
    const buttonSend: any = document.createElement('button')
    buttonSend.setAttribute('onclick','exportData()')
    buttonSend.dispatchEvent(new MouseEvent("click"));
    buttonSend.remove()
};

const optionStart: any = document.getElementById('buttonStart')
const optionExtraHour: any = document.getElementById('buttonExtraHour')
const optionFinish: any = document.getElementById('buttonFinish')

optionStart.addEventListener('click', () => {
    beforeStartCount()
})

optionExtraHour.addEventListener('click', () => {
  const inputStart: any = document.getElementById('start')
  if(inputStart.value != '') {
    extraHourCounter()
  }
})


optionFinish.addEventListener('click', () => {
    stopCountdown()
})
