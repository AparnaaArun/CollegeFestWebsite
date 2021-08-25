'use strict'

const deadlineDate = '2021-08-20T00:00';

function getTimeRemaining(date){
    const t = Date.parse(date) - new Date(),
          days = Math.floor(t / 1000 / 60 / 60 / 24),
          hours = Math.floor((t / 1000 / 60 / 60) % 24),
          minutes = Math.floor( (t / 1000 / 60) % 60),
          seconds = Math.floor( (t / 1000) % 60);

    return {
        t, days, hours, minutes, seconds
    }
}

function setTimer(selector, date){
    const timer = document.querySelector(selector),
          days = timer.querySelector('.days'),
          hours = timer.querySelector('.hours'),
          minutes = timer.querySelector('.minutes'),
          seconds = timer.querySelector('.seconds'),
          timerTic = setInterval(updateTimer, 1000);
    
    function updateTimer(data){
        const t = getTimeRemaining(date);
    
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
    
        if (t.t <= 0) {
            clearInterval(timerTic);
        }
    }

    updateTimer();
}

function getZero(num){
    if (num >= 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

setTimer('.timer', deadlineDate);
