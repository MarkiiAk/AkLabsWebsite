// assets/js/bindings.js
(async () => {
  const safeJSON = async (p) => {
    try { const r = await fetch(p); if (!r.ok) throw 0; return await r.json(); }
    catch { return {}; }
  };

  const [TXT, IMG, COL] = await Promise.all([
    safeJSON('config/textos.json'),
    safeJSON('config/imagenes.json'),
    safeJSON('config/colores.json')
  ]);

  const get = (o, path) => path.split('.').reduce((a,k)=> (a && a[k] != null) ? a[k] : undefined, o);

  // TEXTOS
  document.querySelectorAll('[data-text]').forEach(el => {
    const v = get(TXT, el.dataset.text);
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll('[data-html]').forEach(el => {
    const v = get(TXT, el.dataset.html);
    if (v != null) el.innerHTML = v;
  });

  // IMÁGENES / ENLACES / FONDOS
  document.querySelectorAll('[data-src]').forEach(el => {
    const v = get(IMG, el.dataset.src); if (v) el.setAttribute('src', v);
  });
  document.querySelectorAll('[data-href]').forEach(el => {
    const v = get(IMG, el.dataset.href); if (v) el.setAttribute('href', v);
  });
  document.querySelectorAll('[data-bg]').forEach(el => {
    const v = get(IMG, el.dataset.bg); if (v) el.style.backgroundImage = `url('${v}')`;
  });

  // COLORES → variables CSS
  Object.entries(COL).forEach(([k, v]) => {
    document.documentElement.style.setProperty(`--${k}`, v);
  });
})();
