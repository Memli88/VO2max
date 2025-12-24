const workouts = {
  day1: [
    {
      name: "Zone 2 Flow",
      time: 600,
      desc: "Continuous movement. Nasal breathing. You should be able to talk.",
    },
    {
      name: "Squat",
      time: 60,
      desc: "Controlled squats. Inhale down, exhale up.",
    },
    {
      name: "Reverse Lunge",
      time: 60,
      desc: "Step back gently. Keep chest tall.",
    }
  ],

  day2: [
    {
      name: "Warm-up Flow",
      time: 300,
      desc: "Gentle movement to prepare heart and joints.",
    },
    {
      name: "High Intensity Interval",
      time: 40,
      desc: "Push hard. Breathing heavy. Near max effort.",
    },
    {
      name: "Recovery",
      time: 80,
      desc: "Slow movement. Deep breathing.",
    },
    {
      name: "High Intensity Interval",
      time: 40,
      desc: "Second round. Strong but controlled.",
    },
    {
      name: "Recovery",
      time: 80,
      desc: "Let heart rate come down.",
    }
  ],

  day3: [
    {
      name: "Zone 2 Cardio",
      time: 600,
      desc: "Steady pace. Calm focus.",
    },
    {
      name: "Push-ups",
      time: 60,
      desc: "Strong plank. Elbows close to body.",
    },
    {
      name: "Dumbbell Row",
      time: 60,
      desc: "Pull with back, not arms.",
    }
  ],

  day4: [
    {
      name: "Tai Chi Flow",
      time: 600,
      desc: "Slow, mindful, continuous movement.",
    },
    {
      name: "Balance Practice",
      time: 300,
      desc: "Single-leg balance. Soft gaze.",
    }
  ]
};

let currentWorkout = [];
let index = 0;
let timeLeft = 0;
let totalTime = 0;
let elapsed = 0;
let interval;

const daySelect = document.getElementById("daySelect");
const workoutScreen = document.getElementById("workoutScreen");
const currentExercise = document.getElementById("currentExercise");
const nextExercise = document.getElementById("nextExercise");
const timerEl = document.getElementById("timer");
const descEl = document.getElementById("description");
const progressBar = document.getElementById("progressBar");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

daySelect.addEventListener("change", () => {
  if (!daySelect.value) return;
  currentWorkout = workouts[daySelect.value];
  totalTime = currentWorkout.reduce((a, b) => a + b.time, 0);
  workoutScreen.classList.remove("hidden");
});

startBtn.onclick = startWorkout;
stopBtn.onclick = stopWorkout;

function startWorkout() {
  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  index = 0;
  elapsed = 0;
  startExercise();
}

function startExercise() {
  if (index >= currentWorkout.length) {
    finishWorkout();
    return;
  }

  const ex = currentWorkout[index];
  timeLeft = ex.time;

  currentExercise.textContent = ex.name;
  descEl.textContent = ex.desc;
  nextExercise.textContent =
    index + 1 < currentWorkout.length
      ? `Next: ${currentWorkout[index + 1].name}`
      : "Last exercise";

  beep();
  updateTimer();

  interval = setInterval(() => {
    timeLeft--;
    elapsed++;
    updateTimer();
    updateProgress();

    if (timeLeft <= 0) {
      clearInterval(interval);
      index++;
      startExercise();
    }
  }, 1000);
}

function updateTimer() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  timerEl.textContent = `${min}:${sec}`;
}

function updateProgress() {
  const percent = (elapsed / totalTime) * 100;
  progressBar.style.width = percent + "%";
}

function finishWorkout() {
  beep();
  currentExercise.textContent = "Workout Complete";
  nextExercise.textContent = "";
  descEl.textContent = "Great job. Recover and hydrate.";
  stopBtn.classList.add("hidden");
}

function stopWorkout() {
  clearInterval(interval);
  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
}

function beep() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}
