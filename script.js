// ── SPLASH ────────────────────────────────────────────────────────────────
    (function () {
      const splash = document.getElementById('splash');
      const nameEl = document.getElementById('splashName');
      const canvas = document.getElementById('splash-canvas');
      const ctx    = canvas.getContext('2d');

      // Build letter-by-letter name
      let delay = 0.55;
      'Afdal Aziz'.split('').forEach(char => {
        if (char === ' ') {
          const sp = document.createElement('span');
          sp.style.cssText = 'display:inline-block;width:0.3em';
          nameEl.appendChild(sp);
        } else {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char;
          span.style.animationDelay = delay + 's';
          nameEl.appendChild(span);
          delay += 0.07;
        }
      });

      // Particle system
      let W, H, rafId;
      const particles = [];
      function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
      resize();
      window.addEventListener('resize', resize);

      function mkP() {
        return { x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.5+0.3,
                 vx:(Math.random()-.5)*.3, vy:-Math.random()*.5-.1,
                 alpha:Math.random()*.5+.1, life:Math.random() };
      }
      for (let i = 0; i < 80; i++) particles.push(mkP());

      function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy; p.life -= 0.003;
          if (p.life <= 0 || p.y < -10) particles[i] = mkP();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${170 + Math.random() * 20},70%,70%,${p.alpha * p.life})`;
          ctx.fill();
        });
        rafId = requestAnimationFrame(draw);
      }
      draw();

      // Exit: slide up then hide
      setTimeout(() => {
        splash.classList.add('animate-splash-exit');
        setTimeout(() => {
          cancelAnimationFrame(rafId);
          splash.classList.add('splash-gone');
          document.body.style.overflow = '';
        }, 900);
      }, 3000);
    })();

    // ── HAMBURGER ─────────────────────────────────────────────────────────────
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    hamburger.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
      mobileMenu.classList.toggle('flex', isHidden);
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => { mobileMenu.classList.add('hidden'); mobileMenu.classList.remove('flex'); })
    );

    // ── SMOOTH SCROLL ─────────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // ── MODAL ─────────────────────────────────────────────────────────────────
    function openModal(title, description, imageSrc) {
      document.getElementById('modalTitle').textContent       = title;
      document.getElementById('modalDescription').textContent = description;
      document.getElementById('modalImage').src               = imageSrc;
      document.getElementById('modalImage').alt               = title;
      document.getElementById('projectModal').classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      document.getElementById('projectModal').classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
    document.getElementById('projectModal').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });

    // ── SCROLL-TO-TOP ─────────────────────────────────────────────────────────
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'fixed bottom-8 right-8 bg-teal-500 text-white w-12 h-12 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-50 text-lg font-bold';
    scrollTopBtn.style.display = 'none';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
        setTimeout(() => scrollTopBtn.style.opacity = '1', 10);
      } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => scrollTopBtn.style.display = 'none', 300);
      }
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ── REVEAL + SKILL BARS (merged IntersectionObserver) ─────────────────────
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.querySelectorAll('.skill-bar').forEach((bar, i) => {
            setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 300);
          });
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ── TYPING EFFECT (from script.js — starts after splash) ──────────────────
    window.addEventListener('load', () => {
      const heroEl = document.getElementById('heroTyped');
      const text = 'Afdal Aziz';
      let i = 0, typing = true;
      function typeWriter() {
        if (typing) {
          if (i < text.length) {
            heroEl.textContent = text.substring(0, ++i);
            setTimeout(typeWriter, 100);
          } else {
            typing = false;
            setTimeout(() => { typing = true; i = 0; typeWriter(); }, 2000);
          }
        }
      }
      // Delay until after splash finishes (~4.2s total)
      setTimeout(typeWriter, 4200);
    });

    // ── CONTACT FORM ──────────────────────────────────────────────────────────
    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      btn.textContent = 'Terkirim ✓';
      btn.classList.remove('bg-teal-500', 'hover:bg-teal-600');
      btn.classList.add('bg-green-500');
      setTimeout(() => {
        btn.textContent = 'Kirim Pesan';
        btn.classList.remove('bg-green-500');
        btn.classList.add('bg-teal-500', 'hover:bg-teal-600');
        this.reset();
      }, 3000);
    });
