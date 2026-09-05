// 1. Cursor Glow Follower (Optimized with requestAnimationFrame)
const glow = document.querySelector('.cursor-glow');
if (glow) {
  let mouseX = 0, mouseY = 0;
  let isTicking = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isTicking) {
      window.requestAnimationFrame(() => {
        glow.style.left = `${mouseX}px`;
        glow.style.top = `${mouseY}px`;
        isTicking = false;
      });
      isTicking = true;
    }
  });
}

// 2. Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((el) => revealObserver.observe(el));
}

// 3. Mobile Navigation Menu Toggle
const menuBtn = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// 4. Scroll Active State for Navigation Anchors
const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a')];

if (sections.length > 0 && navAnchors.length > 0) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

  sections.forEach((section) => navObserver.observe(section));
}

// 5. 3D Tilt Effect on Cards (Only for Desktop / Fine Pointers)
if (window.matchMedia('(pointer: fine)').matches) {
  const tiltCards = document.querySelectorAll('.skill, .project, .service, .advantage, .process-step, .journey-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(700px) rotateX(${(-y * 2).toFixed(2)}deg) rotateY(${(x * 2).toFixed(2)}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = '';
    });
  });
}

// 6. Typewriter Initialization (Typed.js)
if (document.getElementById('typed-text') && typeof Typed !== 'undefined') {
  new Typed('#typed-text', {
    strings: ['I craft modern web experiences.', 'I learn continuously.', 'I create impactful solutions.'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}