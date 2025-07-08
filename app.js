
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

const activityTypeSelect = document.getElementById('activityType');
const moodSelect = document.getElementById('mood');
const stressSelect = document.getElementById('stress');
const suggestionDiv = document.getElementById('suggestion');
const suggestBtn = document.getElementById('suggestBtn');

// Populate activity types
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

suggestBtn.addEventListener('click', () => {
  const mood = moodSelect.value;
  const stress = stressSelect.value;
  const activityType = activityTypeSelect.value;
  const suggestion = getBestActivity(mood, stress, activityType);
  suggestionDiv.textContent = suggestion
    ? `Try: ${suggestion}`
    : "Please select all fields.";
});