/* ===== FORCE PER4MANCE — MAIN JS ===== */

/* ---- Navbar Scroll ---- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ---- Mega Menu / Dropdown toggles ---- */
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  const trigger = item.querySelector('button[aria-haspopup]');
  if (!trigger) return;
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = item.classList.contains('open');
    // Close all
    navItems.forEach(i => { i.classList.remove('open'); i.querySelector('button[aria-haspopup]')?.setAttribute('aria-expanded','false'); });
    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});
// Close on outside click
document.addEventListener('click', () => {
  navItems.forEach(i => { i.classList.remove('open'); i.querySelector('button[aria-haspopup]')?.setAttribute('aria-expanded','false'); });
});
// Close when mega-card links are clicked
document.querySelectorAll('.mega-card, .nav-dropdown a').forEach(link => {
  link.addEventListener('click', () => {
    navItems.forEach(i => { i.classList.remove('open'); });
  });
});


/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
  });
}

/* ---- Hero bg load class ---- */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('load', () => heroBg.classList.add('loaded'));
}

/* ---- Reveal on scroll ---- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

/* ---- Animated Counters ---- */
function animateCounter(el, target, duration = 1800) {
  const isYear = target > 1000;
  let startTime = null;
  const startVal = isYear ? target - 4 : 0;
  const update = (ts) => {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(startVal + (target - startVal) * ease);
    el.textContent = isYear ? value.toString() : value + '+';
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isYear ? target.toString() : target + '+';
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ---- Card 3D Tilt ---- */
function addTilt(selector, intensity = 8) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * intensity;
      const rotX = -((y - cy) / cy) * intensity;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
addTilt('.glass-card');
addTilt('.program-card', 5);
addTilt('.portal-card', 4);

/* ---- Particles Canvas ---- */
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
  const ctx = particleCanvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = particleCanvas.width = window.innerWidth;
    H = particleCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.5 - 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 166, 35, ${alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    const p = new Particle();
    p.life = Math.random() * p.maxLife;
    particles.push(p);
  }

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/* ---- Smooth Parallax on Hero BG ---- */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroBg) heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  const cityBg = document.querySelector('.city-bg');
  if (cityBg) cityBg.style.transform = `translateY(${(scrolled - (cityBg.closest('section')?.offsetTop || 0)) * 0.2}px)`;
});

/* ---- Form validation (portals) ---- */
const forms = document.querySelectorAll('form[data-validate]');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ff4444';
        valid = false;
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      }
    });
    if (valid) {
      const successEl = document.getElementById('formSuccess');
      if (successEl) {
        form.style.display = 'none';
        successEl.style.display = 'flex';
      } else {
        alert('Thank you! Your application has been submitted. We will be in touch shortly.');
        form.reset();
      }
    } else {
      const firstError = form.querySelector('[required]:invalid, [style*="border-color: rgb(255"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});
