const clock = () => {
    const date  = new Date()
    let hh: any = date.getHours()
    let mn: any = date.getMinutes() 
    let sc: any = date.getSeconds() 
    const seconds: any = document.getElementById('clockSeconds')
    const minutes: any = document.getElementById('clockMinutes')
    const hours: any = document.getElementById('clockHours')
    hh = hh < 10 ? `0${hh}` : hh
    mn = mn < 10 ? `0${mn}` : mn
    sc = sc < 10 ? `0${sc}` : sc
    hours.innerText = hh
    minutes.innerText = mn
    seconds.innerText = sc
}

setInterval(clock, 1000)