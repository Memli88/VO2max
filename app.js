const exercises = {
  day1: [
    {
      name: "Zone 2 Flow",
      desc: "حرکت پیوسته با تنفس بینی، شدت متوسط، قابل صحبت کردن."
    },
    {
      name: "Squat",
      desc: "اسکات با وزن بدن یا دمبل، تمرکز روی کنترل و تنفس."
    },
    {
      name: "Reverse Lunge",
      desc: "لانج معکوس برای زانوهای امن‌تر و تقویت لگن."
    }
  ],
  day2: [
    {
      name: "VO₂ Max Intervals",
      desc: "۴۰ ثانیه شدت بالا + ۸۰ ثانیه ریکاوری، نفس‌نفس واقعی."
    },
    {
      name: "Mountain Climber",
      desc: "کنترل‌شده، بدون ضربه، تمرکز روی ریتم."
    }
  ],
  day3: [
    {
      name: "Zone 2 Cardio",
      desc: "۱۵ دقیقه حرکت یکنواخت با ضربان متوسط."
    },
    {
      name: "Push-up",
      desc: "شنا با کنترل، ستون قدرت بالاتنه."
    },
    {
      name: "Dumbbell Row",
      desc: "تقویت پشت و شانه برای posture و طول عمر."
    }
  ],
  day4: [
    {
      name: "Tai Chi Flow",
      desc: "حرکت نرم برای مغز، تعادل و سیستم عصبی."
    },
    {
      name: "Animal Flow",
      desc: "حرکات طبیعی برای بدن واقعی."
    }
  ]
};

const daySelect = document.getElementById("daySelect");
const exerciseSection = document.getElementById("exerciseSection");
const exerciseList = document.getElementById("exerciseList");
const detailSection = document.getElementById("detailSection");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");

daySelect.addEventListener("change", () => {
  const day = daySelect.value;
  exerciseList.innerHTML = "";
  if (!day) return;

  exercises[day].forEach(ex => {
    const li = document.createElement("li");
    li.textContent = ex.name;
    li.onclick = () => showDetail(ex);
    exerciseList.appendChild(li);
  });

  exerciseSection.classList.remove("hidden");
  detailSection.classList.add("hidden");
});

function showDetail(ex) {
  detailTitle.textContent = ex.name;
  detailDescription.textContent = ex.desc;
  detailSection.classList.remove("hidden");
}

function closeDetail() {
  detailSection.classList.add("hidden");
}
