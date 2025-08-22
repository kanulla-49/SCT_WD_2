let timerDisplay = document.querySelector(".timer");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");
let lapsContainer = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  timerDisplay.textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

startBtn.onclick = () => {
  if (!isRunning) {
    startTime = Date.now();
    interval = setInterval(updateTime, 1000);
    isRunning = true;
  }
};

pauseBtn.onclick = () => {
  if (isRunning) {
    clearInterval(interval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(interval);
  timerDisplay.textContent = "00:00:00";
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  lapsContainer.innerHTML = "";
};

lapBtn.onclick = () => {
  if (isRunning) {
    const lapTime = timerDisplay.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap: ${lapTime}`;
    lapsContainer.appendChild(li);
  }
};
