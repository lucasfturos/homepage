let timer;
let isRunning = false;
let timeElapsed = 0;
let lapCount = 0;
let lapTime = 0;

const chronometer = document.getElementById("chronometer");
const startBtn = document.getElementById("btn-start");
const stopBtn = document.getElementById("btn-stop");
const refreshBtn = document.getElementById("btn-refresh");
const lapBtn = document.getElementById("btn-lap");
const lapsBody = document.getElementById("laps-body");
const tableContainer = document.getElementById("chrnometer-table-container");

const updateDisplay = () => {
    let minutes = Math.floor(timeElapsed / 6000);
    let seconds = Math.floor((timeElapsed % 6000) / 100);
    let milliseconds = timeElapsed % 100;

    chronometer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}<span class="milliseconds">.${milliseconds
        .toString()
        .padStart(2, "0")}</span>`;
};

const startChronometer = () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeElapsed++;
            lapTime++;
            updateDisplay();
        }, 10);

        stopBtn.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
        startBtn.style.display = "none";
    }
};

const stopChronometer = () => {
    clearInterval(timer);
    isRunning = false;

    startBtn.style.display = "inline-block";
    stopBtn.style.display = "none";
};

const resetChronometer = () => {
    clearInterval(timer);
    isRunning = false;
    timeElapsed = 0;
    lapTime = 0;
    lapCount = 0;
    updateDisplay();

    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
    startBtn.style.display = "inline-block";
    tableContainer.style.display = "none";

    lapsBody.innerHTML = "";
};

const addLap = () => {
    lapCount++;

    let minutes = Math.floor(lapTime / 6000);
    let seconds = Math.floor((lapTime % 6000) / 100);
    let milliseconds = lapTime % 100;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;

    let totalMinutes = Math.floor(timeElapsed / 6000);
    let totalSeconds = Math.floor((timeElapsed % 6000) / 100);
    let totalMilliseconds = timeElapsed % 100;
    let totalFormattedTime = `${totalMinutes
        .toString()
        .padStart(2, "0")}:${totalSeconds
        .toString()
        .padStart(2, "0")}.${totalMilliseconds.toString().padStart(2, "0")}`;

    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${lapCount}</td>
        <td>${formattedTime}</td>
        <td>${totalFormattedTime}</td>
    `;

    lapsBody.insertBefore(row, lapsBody.firstChild);

    tableContainer.style.display = "block";

    lapTime = 0;
};

startBtn.addEventListener("click", startChronometer);
stopBtn.addEventListener("click", stopChronometer);
refreshBtn.addEventListener("click", resetChronometer);
lapBtn.addEventListener("click", addLap);
