const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');

/* =========================
   MOBILE MENU
========================= */

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

/* =========================
   HEADER SCROLL BEHAVIOR
========================= */

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {

  /* Add solid background after scrolling */

  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  /* Hide on scroll down */

  if (window.scrollY <= 100) {
    header.classList.remove('hide');
    return;
  }

  if (window.scrollY > lastScrollY) {

    header.classList.add('hide');

  } else {

    header.classList.remove('hide');

  }

  lastScrollY = window.scrollY;

});

/* =========================
   HERO IMAGE CAROUSEL
========================= */

const slides = document.querySelectorAll('.hero-slide');

let currentSlide = 0;

function showNextSlide() {

  slides[currentSlide].classList.remove('active');

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add('active');

}

setInterval(showNextSlide, 10000);