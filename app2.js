const startButton = document.querySelector('#stopwatch-button-start');
const stopButton = document.querySelector('#stopwatch-button-stop');
const resetButton = document.querySelector('#stopwatch-button-reset');
const lapButton = document.querySelector('#stopwatch-button-lap');
const stopwatchLaps = document.querySelector('.stopwatch-laps');
const stopwatchTime = document.querySelector('#stopwatch-time');
let timerInerval;
let lapTimes = [];
let lapCount = 1;
let timeNumber = 0;
let lapTimeNumber = 0;

startButton.addEventListener('click', function startTime() {
  startButton.style.display = 'none';
  stopButton.style.display = 'block';
  resetButton.style.display = 'none';
  lapButton.style.display = 'block';
  document.querySelector('.stopwatch-laps').style.color = 'white';
  timerInerval = setInterval(() => {
    stopwatchTime.innerHTML = msToTime(10 * timeNumber++);
    document.querySelector(`#lap-time-${lapCount}`).innerHTML = msToTime(10 * lapTimeNumber++);
  }, 10);
});

stopButton.addEventListener('click', function stopTime() {
  stopButton.style.display = 'none';
  startButton.style.display = 'block';
  resetButton.style.display = 'block';
  lapButton.style.display = 'none';
  clearInterval(timerInerval);
});

resetButton.addEventListener('click', function resetStopwatch() {
  lapCount = 1;
  lapTimes = [];
  stopwatchTime.innerHTML = '00:00:00.00';
  timeNumber = 0;
  stopwatchLaps.innerHTML = `<div class="stopwatch-lap">
      <div id="stopwatch-lap-${lapCount}" class="lap-number">Lap ${lapCount}</div>
      <div id="lap-time-1" class="lap-time">00:00:00.00</div>
    </div>`;
});

lapButton.addEventListener('click', function addLapTime() {
  lapCount++;
  lapTimes.push(10 * (lapTimeNumber - 1));
  lapTimeNumber = 0;
  stopwatchLaps.innerHTML =
    `<div id="stopwatch-lap-${lapCount}" class="stopwatch-lap">
    <div class="lap-number">Lap ${lapCount}</div>
    <div id="lap-time-${lapCount}" class="lap-time">${msToTime(10 * lapTimeNumber)}</div>
  </div>` + stopwatchLaps.innerHTML;
  changeLapColors();
});

function changeLapColors() {
  for (let i = 1; i < lapCount; i++) {
    document.querySelector(`#stopwatch-lap-${i}`).style.color = 'white';
  }
  if (lapCount > 2) {
    document.querySelector(`#stopwatch-lap-${1 + lapTimes.indexOf(Math.max(...lapTimes))}`).style.color = 'red';
    document.querySelector(`#stopwatch-lap-${1 + lapTimes.indexOf(Math.min(...lapTimes))}`).style.color = 'green';
  }
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 10),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
  return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}
