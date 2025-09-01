// assets/js/backtop.js
(() => {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  const threshold = () => window.innerHeight;

  function toggleBtn(){
    if (window.scrollY >= threshold()){
      btn.classList.add('is-visible');
      btn.removeAttribute('hidden');
    } else {
      btn.classList.remove('is-visible');
      btn.setAttribute('hidden', '');
    }
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.jQuery){
      $('html, body').stop(true).animate({ scrollTop: 0 }, 600, 'linear');
    } else {
      const start = window.pageYOffset;
      const dur = 600; let t0;
      function step(ts){ if(!t0) t0=ts; const t=Math.min((ts-t0)/dur,1); window.scrollTo(0, start*(1-t)); if(t<1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }
  });

  window.addEventListener('scroll', toggleBtn, { passive: true });
  window.addEventListener('resize', toggleBtn);
  toggleBtn();
})();
