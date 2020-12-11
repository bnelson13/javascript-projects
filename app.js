// Stopwatch Project
const startButton = document.querySelector('#stopwatch-button-start');
const stopButton = document.querySelector('#stopwatch-button-stop');
const resetButton = document.querySelector('#stopwatch-button-reset');
const lapButton = document.querySelector('#stopwatch-button-lap');
const stopwatchLaps = document.querySelector('.stopwatch-laps');
const stopwatchTime = document.querySelector('#stopwatch-time');
const stopwatchSeconds = document.querySelector('#stopwatch-time-seconds');
// let currentStart = Date.now();
// let runningInterval = setInterval(runTime(Date.now()), 10);

// function runTime(now) {
//   stopwatchTime.innerHTML = msToTime(now - currentStart);
// }

let timerCount = 0;

startButton.addEventListener('click', function startTime() {
  startButton.style.display = 'none';
  stopButton.style.display = 'block';
  resetButton.style.display = 'none';
  lapButton.style.display = 'block';
  if (timerCount == 0) {
    let firstStartTime = Date.now();
    setInterval(() => {
      if (stopButton.style.display != 'none' && timerCount == 0) {
        stopwatchTime.innerHTML = `${msToTime(Date.now() - firstStartTime)}`;
      }
    }, 10);
  } else {
    console.log(timerCount);
  }
  //   let firstStart = Date.now();
  //   let elaspedTime = `${msToTime(currentTime - firstStart)}`;
  //   if (firstStart == Date.now()) {
  //     setInterval(() => {
  //       stopwatchTime.innerHTML = elaspedTime;
  //     }, 10);
  //   } else {
  //     console.log('too late');
  //   }
});

stopButton.addEventListener('click', function stopTime() {
  stopButton.style.display = 'none';
  startButton.style.display = 'block';
  resetButton.style.display = 'block';
  lapButton.style.display = 'none';
  console.log('Stop');
  timerCount++;
  //   stopwatchTime.innerHTML = '00:00:00.00';
  //   clearInterval(runningInterval);
});

resetButton.addEventListener('click', function resetStopwatch() {
  console.log('Reset');
  timerCount = 0;
  stopwatchTime.innerHTML = '00:00:00.00';
  stopwatchLaps.innerHTML = `<div class="stopwatch-lap">
    <div class="lap-number">Lap 1</div>
    <div class="lap-time">00:00:00.00</div>
  </div>`;
});

// function startTimerFunction(startDate) {
//   let delta = ((Date.now() - startDate) / 1000).toFixed(2);
//   return msToTime(delta);
// }

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
