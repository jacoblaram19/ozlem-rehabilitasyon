// Özlem Rehabilitasyon Merkezi — Ortak Script

document.addEventListener('DOMContentLoaded', () => {
  // Header: scroll gölgesi
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobil menü aç/kapat
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mainNav.classList.remove('open');
      });
    });
  }

  // Scroll reveal animasyonu
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Sayaç animasyonu (data-target)
  const counters = document.querySelectorAll('[data-count]');
  const counterIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterIo.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterIo.observe(el));

  // Footer yılı
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Galeri lightbox
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  if (galleryImgs.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox-close" aria-label="Kapat">&times;</button><img alt="">';
    document.body.appendChild(lightbox);
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    const openLightbox = (img) => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('open');
      document.body.classList.add('no-scroll');
    };
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.classList.remove('no-scroll');
    };

    galleryImgs.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(img));
    });
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
});
