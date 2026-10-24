const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const carousel = document.querySelector(".home-carousel");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dots button"));
  const prev = carousel.querySelector(".carousel-arrow.prev");
  const next = carousel.querySelector(".carousel-arrow.next");
  let current = 0;
  let timer;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === current;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === current);
    });
  };

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 5200);
  };

  prev?.addEventListener("click", () => {
    showSlide(current - 1);
    start();
  });

  next?.addEventListener("click", () => {
    showSlide(current + 1);
    start();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      start();
    });
  });

  showSlide(0);
  start();
}

document.querySelectorAll("[data-bmi-calculator]").forEach((calculator) => {
  const heightInput = calculator.querySelector("[data-bmi-height]");
  const weightInput = calculator.querySelector("[data-bmi-weight]");
  const result = calculator.querySelector("[data-bmi-result]");

  const updateBmi = () => {
    const heightCm = Number(heightInput?.value);
    const weightKg = Number(weightInput?.value);
    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      result.textContent = "填入兩個數字後顯示 BMI";
      return;
    }

    const bmi = weightKg / ((heightCm / 100) ** 2);
    const category = bmi < 18.5 ? "體重過輕" : bmi < 24 ? "健康體位" : bmi < 27 ? "體重過重" : "肥胖";
    result.textContent = `你的 BMI 約為 ${bmi.toFixed(1)}（成人標準：${category}）`;
  };

  heightInput?.addEventListener("input", updateBmi);
  weightInput?.addEventListener("input", updateBmi);
});

document.querySelectorAll("[data-print-page]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});
