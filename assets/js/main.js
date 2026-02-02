/* ============================= */
/* FADE-UP SCROLL ANIMATION */
/* ============================= */
const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);

fadeElements.forEach((el) => observer.observe(el));

/* ============================= */
/* PROJECT CARD GLOW EFFECT */
/* ============================= */
const cards = document.querySelectorAll(".project-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });

  card.addEventListener("touchstart", (e) => {
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    card.style.setProperty("--x", `${touch.clientX - rect.left}px`);
    card.style.setProperty("--y", `${touch.clientY - rect.top}px`);
  });
});

/* ============================= */
/* PROJECT SLIDER (GRID SAFE) */
/* ============================= */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".projects-track");
  const cards = document.querySelectorAll(".project-card");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  const visible = 3;
  let index = 0;

  function update() {
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    prev.disabled = index === 0;
    next.disabled = index >= cards.length - visible;
  }

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      update();
    }
  });

  next.addEventListener("click", () => {
    if (index < cards.length - visible) {
      index++;
      update();
    }
  });

  update();
});

/* ============================= */
/* SMOOTH SCROLL NAVBAR */
/* ============================= */
document.addEventListener("DOMContentLoaded", () => {
  const navbarLinks = document.querySelectorAll('.navbar a[href^="#"]');
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar.offsetHeight;

  navbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      const offset = target.offsetTop - navbarHeight - 100;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    });
  });
});
