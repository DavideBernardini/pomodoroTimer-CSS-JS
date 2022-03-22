const circle = document.querySelector('#circle-timer');
const needle = document.querySelector('.needle');
const workTimer = document.querySelector('#work-timer');
const breakTimer = document.querySelector('#break-timer');
const controlBtn = document.querySelector('#btn-control');
const addTimeBtn = document.querySelector('#btn-addTime');

const workSeconds = 5;
const breakSeconds = 5;

let timer;
let currentSeconds = workSeconds; // variabile di appoggio
let currentTimer = workTimer // variabile di appoggio
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

const decrement = () => {
    if (isPaused) {
        return;
    }

    currentSeconds--;
    updateTimer(currentTimer, currentSeconds);

    if (currentSeconds === 0) {
        clearInterval(timer);

        if (inWorkPhase) {
            // in pausa
            inWorkPhase = false;
            currentSeconds = breakSeconds;
            currentTimer = breakTimer;
            workTimer.classList.remove('timer--active');
            breakTimer.classList.add('timer--active');

            timer = setInterval(decrement, 1000);
        } else {
            // fine lavoro e pausa
            controlBtn.classList.remove('btn-control--pause');
            controlBtn.setAttribute('disabled', 'disabled');
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
        timer = setInterval(decrement, 1000);
    }
    
});