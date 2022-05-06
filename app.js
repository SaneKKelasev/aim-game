const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeLast = document.querySelector('#time');
const board = document.querySelector('#board');
const color = ['green', 'red', 'blue', 'black', 'white', 'yellow'];
let time = 0;
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime);
    }
}

function setTime(value) {
    timeLast.innerHTML = `00:${value}`;
}

function finishGame() {
    board.innerHTML = `<h1>Ваш счет: <span class='primary'>${score}</span></h1>`
    timeLast.parentNode.classList.add('hide');
}

function createRandomCircle () {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color[getRandomNumber(0, 5)];

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}