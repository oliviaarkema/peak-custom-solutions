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

/* =========================
   GALLERY LIGHTBOX
========================= */

const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

if (lightbox) {

  const galleryImgs = [...document.querySelectorAll('.gallery-item img')];
  let current = 0;

  function openLightbox(index) {
    current = index;
    const img = galleryImgs[current];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = (current + 1) + ' / ' + galleryImgs.length;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    current = (current - 1 + galleryImgs.length) % galleryImgs.length;
    openLightbox(current);
  }

  function showNext() {
    current = (current + 1) % galleryImgs.length;
    openLightbox(current);
  }

  galleryImgs.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape')     closeLightbox();
  });

}

/* =========================
   LISTINGS TAB FILTER
========================= */

const tabBtns = document.querySelectorAll('.tab-btn');
const listingCards = document.querySelectorAll('.listing-card-link');

function applyFilter(filter) {
  tabBtns.forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });
  listingCards.forEach(card => {
    if (filter === 'all' || card.dataset.category === filter) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    applyFilter(btn.dataset.filter);
  });
});

// Activate filter from URL hash (e.g. listings.html#combines)
if (tabBtns.length && location.hash) {
  const hashFilter = location.hash.replace('#', '');
  const matched = [...tabBtns].find(b => b.dataset.filter === hashFilter);
  if (matched) applyFilter(hashFilter);
}