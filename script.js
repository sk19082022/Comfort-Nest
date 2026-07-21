/* ========================================
   PRELOADER
   ======================================== */
window.addEventListener('load', () => {
  document.getElementById('preloader').classList.add('hide');
});

/* ========================================
   HAMBURGER MENU
   ======================================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ========================================
   ACTIVE NAV LINK
   ======================================== */
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ========================================
   GALLERY SLIDER
   ======================================== */
const track = document.getElementById('galleryTrack');
const leftBtn = document.getElementById('slideLeft');
const rightBtn = document.getElementById('slideRight');
let scrollPos = 0;
const slideStep = 290;

rightBtn.addEventListener('click', () => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  scrollPos = Math.min(scrollPos + slideStep, maxScroll);
  track.style.transform = `translateX(-${scrollPos}px)`;
});

leftBtn.addEventListener('click', () => {
  scrollPos = Math.max(scrollPos - slideStep, 0);
  track.style.transform = `translateX(-${scrollPos}px)`;
});

/* ========================================
   REVIEW AUTO SLIDER
   ======================================== */
const reviewTrack = document.getElementById('reviewTrack');
let reviewIndex = 0;
const reviewCards = reviewTrack.querySelectorAll('.review-card');
const reviewStep = 310;
let autoSlide = setInterval(() => {
  reviewIndex = (reviewIndex + 1) % reviewCards.length;
  reviewTrack.style.transform = `translateX(-${reviewIndex * reviewStep}px)`;
}, 3500);

// Pause on hover
const reviewSlider = document.querySelector('.review-slider');

reviewSlider.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

reviewSlider.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    reviewIndex = (reviewIndex + 1) % reviewCards.length;
    reviewTrack.style.transform = `translateX(-${reviewIndex * reviewStep}px)`;
  }, 3500);
});

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========================================
   FADE-UP ON SCROLL
   ======================================== */
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));

// Add fade-up class to cards and items
document.querySelectorAll('.card, .amenity-item, .why-card, .review-card, .contact-info-item').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  observer.observe(el);
});

/* ========================================
   BUTTON RIPPLE EFFECT
   ======================================== */
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 700);
  });
});

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href === '#') return;
    
    e.preventDefault();
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ========================================
   RESPONSIVE GALLERY ADJUSTMENT
   ======================================== */
function adjustGalleryStep() {
  const screenWidth = window.innerWidth;
  let newStep = 290;
  
  if (screenWidth < 480) {
    newStep = 220;
  } else if (screenWidth < 768) {
    newStep = 240;
  }
  
  // Update slideStep if needed (not changing dynamically for simplicity)
  // The slider uses fixed step, but we could re-calculate
}

window.addEventListener('resize', adjustGalleryStep);
adjustGalleryStep();

/* ========================================
   PARALLAX EFFECT (Subtle)
   ======================================== */
window.addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.05;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

console.log('Comfort Nest PG for Ladies website loaded successfully!');