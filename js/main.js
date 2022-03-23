// nodi
const container = document.querySelector('.container');
const circle = document.querySelector('#circle-timer');
const needle = document.querySelector('.needle');
const workTimer = document.querySelector('#work-timer');
const breakTimer = document.querySelector('#break-timer');
const controlBtn = document.querySelector('#btn-control');
const addTimeBtn = document.querySelector('#btn-add-time');

// variabili audio
const beep = new Audio('../audio/Beep.mp3');
const blink = new Audio('../audio/BlinkTwice.mp3');

// variabili timer
const workSeconds = 5;
const breakSeconds = 5;
const increment = 60;
let timer;
let currentSeconds = workSeconds; // variabile di appoggio
let currentTimer = workTimer; // variabile di appoggio
let currentTotal = workSeconds; // variabile di appoggio come valore fisso per percentuale
let isPaused = true;
let inWorkPhase = true;

const updateTimer = (element, total) => {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    element.textContent = `${minutes}:${formattedSeconds}`;
};

updateTimer(workTimer, workSeconds);
updateTimer(breakTimer,breakSeconds);

// cerchi
const radius = 50;
const circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

const setProgress = (percentage) => {
    const offset = circumference -(percentage / 100) * circumference;
    const rotation = (percentage / 100) * 360;
    circle.style.strokeDashoffset = offset;
    needle.style.transform = `rotate(${rotation}deg)`;
};


const decrement = () => {
    if (isPaused) {
        return;
    }

    currentSeconds--;
    updateTimer(currentTimer, currentSeconds);

    const percentage = Math.ceil(((currentTotal - currentSeconds) / currentTotal) * 100);
    setProgress(percentage);

    if (currentSeconds === 0) {
        clearInterval(timer);

        if (inWorkPhase) {
            // in pausa
            beep.play();
            inWorkPhase = false;
            currentSeconds = breakSeconds;
            currentTimer = breakTimer;
            container.classList.add('break-phase');
            workTimer.classList.remove('timer--active');
            breakTimer.classList.add('timer--active');

            timer = setInterval(decrement, 1000);
        } else {
            // fine lavoro e pausa quindi reset
            blink.play();
            container.classList.remove('break-phase');
            workTimer.classList.add('timer--active');
            breakTimer.classList.remove('timer--active');
            currentSeconds = workSeconds;
            currentTimer = workTimer;
            inWorkPhase = true;
            timer = setInterval(decrement, 1000);
            updateTimer(workTimer, workSeconds);
            updateTimer(breakTimer,breakSeconds);
        }
    }
};

controlBtn.addEventListener('click',
function() {
    isPaused = !isPaused;

    if (!isPaused) {
        controlBtn.classList.add('btn-control--pause');
    } else {
        controlBtn.classList.remove('btn-control--pause');
    }
    
    if (!timer) {
        addTimeBtn.removeAttribute('disabled', 'disabled');
        timer = setInterval(decrement, 1000);
    }
    
});

addTimeBtn.addEventListener('click',
function() {
    currentSeconds += increment;
    currentTotal += increment;
    updateTimer(currentTimer, currentSeconds);
});