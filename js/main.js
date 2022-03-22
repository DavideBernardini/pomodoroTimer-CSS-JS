const circle = document.querySelector('#circle-timer');
const needle = document.querySelector('.needle');
const workTimer = document.querySelector('#work-timer');
const breakTimer = document.querySelector('#break-timer');
const controlBtn = document.querySelector('#btn-control');
const addTimeBtn = document.querySelector('#btn-addTime');

const workSeconds = 30;
const breakSeconds = 5;

let timer;
let currentSeconds = workSeconds; // variabile di appoggio
let isPaused = true;

const updateTimer = (element, total) => {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    element.textContent = `${minutes}:${formattedSeconds}`;
};

const decrement = () => {
    if (isPaused) {
        return;
    }

    currentSeconds--;

    if (currentSeconds === 0) {
        clearInterval(timer);
    }

    updateTimer(workTimer, currentSeconds);
};

updateTimer(workTimer, workSeconds);
updateTimer(breakTimer,breakSeconds);

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