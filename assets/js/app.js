// =====================================================
// AK Labs — app.js
// Scroll progress • FABs (back-to-top + theme) • Reveal
// Tilt • Lightbox • Slider • Contact form + Alertify
// =====================================================

const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// ---------------- Preloader ----------------
window.addEventListener('load', () => {
  $('.preloader')?.classList.add('hidden');
});

// ---------------- Scroll progress bar ----------------
const progressFill = $('#progressbar .progress__fill');
window.addEventListener('scroll', () => {
  if (!progressFill) return;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  progressFill.style.width = `${scrolled}%`;
});

// ---------------- Sticky nav border ----------------
const nav = $('.nav');
const navObserver = new IntersectionObserver(([e]) => {
  nav?.setAttribute('data-scrolled', (!e.isIntersecting).toString());
}, { rootMargin: '-80px 0px 0px 0px', threshold: 0 });
navObserver.observe($('#home'));

// ---------------- Mobile menu ----------------
const navToggle = $('.nav__toggle');
const navLinks = $('.nav__links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  document.body.classList.toggle('menu-open', !open);
  navToggle.setAttribute('aria-expanded', (!open).toString());
});
$$('.nav__links a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth < 768) {
    navLinks.style.display = 'none';
    document.body.classList.remove('menu-open');
  }
}));

// ---------------- Theme toggle (FAB) ----------------
const themeFab = $('#themeFab');
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  // Actualiza icono Font Awesome (luna en dark, sol en light)
  const icon = themeFab?.querySelector('i');
  if (icon) icon.className = (t === 'light') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}
function nextTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
}
// Estado inicial
applyTheme(localStorage.getItem('theme') || 'dark');
// Click -> alternar
themeFab?.addEventListener('click', () => {
  const t = nextTheme();
  localStorage.setItem('theme', t);
  applyTheme(t);
});

// ---------------- Back-to-top FAB ----------------
const backToTop = $('#backToTop');
window.addEventListener('scroll', () => {
  if (!backToTop) return;
  backToTop.hidden = window.scrollY <= 300;
});
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Ajustar FABs para no tapar el footer
const footer = $('#footer');
if (footer) {
  const fabObserver = new IntersectionObserver(
    ([entry]) => {
      const raise = entry.isIntersecting ? entry.boundingClientRect.height + 16 : 0;
      document.documentElement.style.setProperty('--fab-raise', `${raise}px`);
    },
    { rootMargin: '0px', threshold: 0 }
  );
  fabObserver.observe(footer);
}

// ---------------- Reveal on scroll ----------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) el.target.classList.add('is-visible');
    });
  },
  { threshold: 0.14 }
);
$$('[data-reveal]').forEach((el) => revealObserver.observe(el));

// ---------------- Tilt effect ----------------
$$('.tilt').forEach((card) => {
  let r;
  card.addEventListener('mousemove', (e) => {
    r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px)';
  });
});

// ---------------- Lightbox ----------------
const dlg = $('#lightbox');
if (dlg) {
  const img = dlg.querySelector('img');
  const label = $('.lightbox__label', dlg);
  $$('.work img').forEach((w) =>
    w.addEventListener('click', () => {
      img.src = w.src;
      label.textContent = w.alt;
      dlg.showModal();
    })
  );
  $('.lightbox__close', dlg)?.addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });
}

// ---------------- Slider ----------------
$$('[data-slider]').forEach((slider) => {
  const track = $('.slider__track', slider);
  const prev = $('.slider__btn--prev', slider);
  const next = $('.slider__btn--next', slider);
  let i = 0;
  const go = (dir) => {
    const slides = $$('.slide', slider).length;
    i = (i + dir + slides) % slides;
    track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
  };
  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));
});

// ---------------- Contact form (demo, PHP backend) ----------------
$('#contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const msg = $('#msg').value.trim();
  const emailOk = /.+@.+\..+/.test(email);

  if (!name || !emailOk || msg.length < 10) {
    alertify.error('Completa nombre, email válido y mensaje (10+ caracteres)');
    return;
  }

  // Enviar vía PHP (action en el form apunta a assets/php/contact.php)
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Network error');
      return res.text();
    })
    .then(() => {
      alertify.success('Cotización enviada ✔️');
      form.reset();
    })
    .catch(() => {
      alertify.error('Hubo un problema al enviar');
    });
});

// ---------------- Año dinámico ----------------
$('#year').textContent = new Date().getFullYear();

// ---------------- Reduced motion ----------------
const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mql.matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  $$('*').forEach((el) => (el.style.animation = 'none'));
}
