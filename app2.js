const startButton = document.querySelector('#stopwatch-button-start');
const stopButton = document.querySelector('#stopwatch-button-stop');
const resetButton = document.querySelector('#stopwatch-button-reset');
const lapButton = document.querySelector('#stopwatch-button-lap');
const stopwatchLaps = document.querySelector('.stopwatch-laps');
const stopwatchTime = document.querySelector('#stopwatch-time');
let timerInerval;
lapTimes = [];
lapCount = 0;
let timeNumber = 0;

startButton.addEventListener('click', function startTime() {
  startButton.style.display = 'none';
  stopButton.style.display = 'block';
  resetButton.style.display = 'none';
  lapButton.style.display = 'block';
  timerInerval = setInterval(() => {
    stopwatchTime.innerHTML = msToTime(10 * timeNumber++);
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
  lapCount = 0;
  stopwatchTime.innerHTML = '00:00:00.00';
  timeNumber = 0;
  stopwatchLaps.innerHTML = `<div class="stopwatch-lap">
      <div class="lap-number">Lap 1</div>
      <div class="lap-time">00:00:00.00</div>
    </div>`;
});

lapButton.addEventListener('click', function addLapTime() {
  lapCount++;
  console.log(stopwatchTime.innerHTML, msToTime(getMsDifference(stopwatchTime.innerHTML)));
  stopwatchLaps.innerHTML =
    `<div class="stopwatch-lap">
    <div class="lap-number">Lap ${lapCount}</div>
    <div id="lap-time-${lapCount}" class="lap-time">${stopwatchTime.innerHTML}</div>
  </div>` + stopwatchLaps.innerHTML;
});

function getMsDifference(timeString) {
  let timeArray = timeString.split(':');
  return 1000 * (parseInt(timeArray[0] * 3600) + parseInt(timeArray[1] * 60) + parseFloat(timeArray[2]));
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
