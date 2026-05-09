/* =============================================
   VENNELA SHARMA — PORTFOLIO SCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. NAV: scroll style + hamburger ─── */
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ─── 2. CANVAS: particle / matrix dots ─── */
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  };

  class Particle {
    constructor() { this.reset(true); }
    reset(instant) {
      this.x  = Math.random() * W;
      this.y  = instant ? Math.random() * H : -10;
      this.vy = 0.4 + Math.random() * 1.2;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.size   = 1 + Math.random() * 1.5;
      this.alpha  = 0.2 + Math.random() * 0.5;
      this.char   = Math.random() > 0.5
        ? String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
        : String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }
    update() {
      this.y += this.vy;
      this.x += this.vx;
      if (this.y > H + 10) this.reset(false);
    }
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = '#00e676';
      ctx.font        = `${this.size * 7}px 'JetBrains Mono', monospace`;
      ctx.fillText(this.char, this.x, this.y);
    }
  }

  const init = () => {
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: count }, () => new Particle());
  };

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();
  animate();

  /* ─── 3. INTERSECTION OBSERVER: reveal animations ─── */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const cardEls   = document.querySelectorAll('[data-card]');
  const tlEls     = document.querySelectorAll('[data-tl]');

  const makeObserver = (threshold = 0.15) =>
    new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold });

  // Hero reveals fire quickly on load
  const heroObserver = makeObserver(0.05);
  revealEls.forEach(el => heroObserver.observe(el));

  // Cards with stagger
  const cardObserver = new IntersectionObserver((entries, obs) => {
    const visible = entries.filter(e => e.isIntersecting);
    visible.forEach((e, i) => {
      setTimeout(() => {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }, i * 80);
    });
  }, { threshold: 0.1 });
  cardEls.forEach(el => cardObserver.observe(el));

  // Timeline items with stagger
  const tlObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }, i * 100);
      }
    });
  }, { threshold: 0.1 });
  tlEls.forEach(el => tlObserver.observe(el));

  /* ─── 4. ACTIVE NAV LINK on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => navObserver.observe(s));

});
