// Mobilmeny toggle
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("is-active");
  navMenu.classList.toggle("active");
});

// Lukker meny ved klikk på lenke
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenu.classList.remove("is-active");
    }
  });
});

// Scroll-animasjoner
const sections = document.querySelectorAll(".fade-in, .slide-up");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

sections.forEach((section) => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // 2. Observer for Fade/Slide Animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          // Slutt å observere når vist, for bedre ytelse
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Starter animasjonen når 10% av elementet er synlig
    }
  );

  // Elementer som skal observeres (de som har fade-in eller slide-up)
  const fadeElements = document.querySelectorAll(".fade-in, .slide-up");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});
