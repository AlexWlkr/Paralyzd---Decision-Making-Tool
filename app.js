// Activity options
const ACTIVITIES = [
  {
    type: "Do Chores",
    options: ["Clean your room", "Do the dishes", "Laundry", "Organize workspace", "Water the plants"],
  },
  {
    type: "Do Exercise",
    options: ["Go for a walk", "Yoga", "Quick HIIT session", "Stretching", "Bike ride"],
  },
  {
    type: "Watch a Movie or TV Show",
    options: ["Comedy movie", "Nature documentary", "Feel-good TV show", "Animated film", "Mystery series"],
  },
  {
    type: "Read a Book",
    options: ["Light fiction", "Self-help book", "Short stories", "Comics/graphic novel", "Poetry"],
  },
  {
    type: "Listen to Music",
    options: ["Upbeat pop", "Relaxing instrumental", "Classical", "Jazz", "Ambient sounds"],
  },
];

// Populate activity type select
const activityTypeSelect = document.getElementById('activityType');
ACTIVITIES.forEach(a => {
  const opt = document.createElement('option');
  opt.value = a.type;
  opt.textContent = a.type;
  activityTypeSelect.appendChild(opt);
});

function getBestActivity(mood, stress, activityType) {
  if (!activityType) return null;
  const category = ACTIVITIES.find(a => a.type === activityType);
  if (!category) return null;

  let idx = 0;
  if (mood === "Anxious" || stress === "High") idx = 3;
  else if (mood === "Sad") idx = 2;
  else if (mood === "Motivated" && stress === "Low") idx = 1;

  idx = Math.min(idx, category.options.length - 1);
  return category.options[idx];
}

const moodSelect = document.getElementById('mood');
const stressSelect = document.getElementById('stress');
const suggestionDiv = document.getElementById('suggestion');
const suggestBtn = document.getElementById('suggestBtn');

const modal = document.getElementById('postChoiceModal');
const pickedChoiceEl = document.getElementById('pickedChoice');
const anotherChoiceBtn = document.getElementById('anotherChoiceBtn');
const startNowBtn = document.getElementById('startNowBtn');
const timerSection = document.getElementById('timerSection');
const timerDisplay = document.getElementById('timer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let lastSuggestion = "";
let timer = null;
let timeLeft = 300; // 300 seconds = 5 minutes
let isRunning = false;

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function playTimer() {
  if (isRunning || timeLeft <= 0) return;
  isRunning = true;
  playBtn.disabled = true;
  pauseBtn.disabled = false;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      renderTimer();
      if (timeLeft === 0) {
        clearInterval(timer);
        timerDisplay.textContent = "Time's up!";
        playBtn.disabled = true;
        pauseBtn.disabled = true;
        isRunning = false;
      }
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
  playBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 300;
  isRunning = false;
  renderTimer();
  timerSection.style.display = "none";
  playBtn.disabled = false;
  pauseBtn.disabled = true;
}

// When "Suggest" is clicked
suggestBtn.addEventListener('click', () => {
  const mood = moodSelect.value;
  const stress = stressSelect.value;
  const activityType = activityTypeSelect.value;
  const suggestion = getBestActivity(mood, stress, activityType);
  if (suggestion) {
    lastSuggestion = suggestion;
    suggestionDiv.textContent = `Try: ${suggestion}`;
    setTimeout(() => {
      pickedChoiceEl.textContent = `You picked: ${suggestion}`;
      modal.style.display = 'flex';
    }, 600);
  } else {
    suggestionDiv.textContent = "Please select all fields.";
  }
});

// Modal: Make another choice
anotherChoiceBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  // Optionally: clear fields or suggestionDiv
});

// Modal: Start Now > show timer but don't auto-start
startNowBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  resetTimer();
  timerSection.style.display = "block";
  renderTimer();
  playBtn.disabled = false;
  pauseBtn.disabled = true;
});

// Timer controls
playBtn.addEventListener('click', playTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Optionally, render timer initially
renderTimer();

// Modal close on background click
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}