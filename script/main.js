const incomeInput = document.getElementById("per-hour-income");
const incomeDisplay = document.getElementById("total-income");

const resetButton = document.getElementById("reset-button");
const pauseButton = document.getElementById("pause-button");

let totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
let incomePerHour = parseFloat(localStorage.getItem("incomePerHour")) || 0;

let incomePerSecond = incomePerHour / 3600;

let lastTime = parseInt(localStorage.getItem("lastTime")) || Date.now();
let isPaused = localStorage.getItem("isPaused") === "true";

pauseButton.textContent = isPaused ? "Resume" : "Pause";

function applyOfflineProgress() {
    const now = Date.now();
    const secondsPassed = Math.floor((now - lastTime) / 1000);

    if (!isPaused) {
        const offlineEarnings = secondsPassed * incomePerSecond;
        totalIncome += offlineEarnings;
    }

    lastTime = now;

    localStorage.setItem("lastTime", lastTime);
    localStorage.setItem("totalIncome", totalIncome);
}

applyOfflineProgress();

incomeInput.value = incomePerHour;
incomeDisplay.textContent = totalIncome.toFixed(2);

function updateIncomeRate() {
    incomePerHour = parseFloat(incomeInput.value) || 0;
    incomePerSecond = incomePerHour / 3600;

    localStorage.setItem("incomePerHour", incomePerHour);
}

incomeInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        incomeInput.blur();
        updateIncomeRate();
    }
});

incomeInput.addEventListener("blur", updateIncomeRate);

incomeInput.addEventListener("input", () => {
    incomePerHour = parseFloat(incomeInput.value) || 0;
    incomePerSecond = incomePerHour / 3600;
});

function updateIncome() {
    if (isPaused) return;

    totalIncome += incomePerSecond;

    incomeDisplay.textContent = totalIncome.toFixed(2);

    lastTime = Date.now();

    localStorage.setItem("totalIncome", totalIncome);
    localStorage.setItem("lastTime", lastTime);
}

setInterval(updateIncome, 1000);

pauseButton.addEventListener("click", function () {
    isPaused = !isPaused;
    localStorage.setItem("isPaused", isPaused);

    pauseButton.textContent = isPaused ? "Resume" : "Pause";
});

resetButton.addEventListener("click", function () {
    localStorage.removeItem("lastTime");
    localStorage.removeItem("totalIncome");
    localStorage.removeItem("incomePerHour");
    localStorage.removeItem("isPaused");

    totalIncome = 0;
    incomePerHour = 0;
    incomePerSecond = 0;
    isPaused = false;

    incomeInput.value = "";
    incomeDisplay.textContent = "0.00";

    pauseButton.textContent = "Pause";
});