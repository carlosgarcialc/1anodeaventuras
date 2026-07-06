/* ============================================================
   beapa — runtime compartido (todas las páginas)
   Lenis + GSAP + overlays + transiciones + helpers de media
   ============================================================ */

window.App = (function(){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) document.documentElement.classList.add('no-motion');

  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  if (hasGsap && typeof MotionPathPlugin !== 'undefined') gsap.registerPlugin(MotionPathPlugin);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduced && typeof Lenis !== 'undefined'){
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (hasGsap && typeof ScrollTrigger !== 'undefined')
      lenis.on('scroll', ScrollTrigger.update);
  }

  /* ---------- overlays globales ---------- */
  function overlaysGlobales(){
    const g = document.createElement('div'); g.className = 'film-grain';
    const v = document.createElement('div'); v.className = 'vignette';
    document.body.append(v, g);
  }

  /* ---------- footer compartido ---------- */
  function footer(rootPath){
    const f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = `
      <div class="lema">1 año de <em>Aventuras</em></div>
      <span class="porahora">por ahora…</span>
      <p class="mini"><a href="${rootPath}index.html">← volver al mapa</a></p>`;
    sembrarDestellos(f, 4);
    document.body.appendChild(f);
  }

  /* ---------- media con fallback a placeholder vintage ---------- */
  // Intenta cargar assets/destinos/<slug>/<src>; si no existe, muestra
  // un hueco "‹‹ FOTO — EDITAR ››" para que el sitio se vea completo.
  function crearMedia(item, slug, rootPath, etiqueta){
    const base = `${rootPath}assets/destinos/${slug}/`;
    const cont = document.createElement('div');
    cont.className = 'media-slot';
    cont.style.width = '100%'; cont.style.height = '100%';

    const placeholder = () => {
      const tipo = item.type === 'video' ? 'VÍDEO' : 'FOTO';
      const icon = item.type === 'video' ? ADORNOS.claqueta : ADORNOS.camara;
      cont.innerHTML = `
        <div class="ph-media">
          <span class="ph-icon">${icon}</span>
          <span class="ph-txt">‹‹ ${tipo} — ${etiqueta || slug} ››<br>
          <small style="font-family:var(--font-body);font-size:.72em;opacity:.8">sube ${base}${item.src}</small></span>
        </div>`;
    };

    if (item.type === 'video'){
      const vid = document.createElement('video');
      vid.setAttribute('playsinline',''); vid.muted = true; vid.loop = true;
      vid.autoplay = !reduced; vid.controls = true; vid.preload = 'metadata';
      vid.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      const srcEl = document.createElement('source');
      srcEl.src = base + item.src;
      srcEl.addEventListener('error', placeholder);
      vid.appendChild(srcEl);
      cont.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.loading = 'lazy'; img.decoding = 'async';
      img.alt = item.caption || etiqueta || slug;
      img.src = base + item.src;
      img.addEventListener('error', placeholder);
      cont.appendChild(img);
    }
    return cont;
  }

  /* ---------- polaroid ---------- */
  function crearPolaroid(item, slug, rootPath, i){
    const fig = document.createElement('figure');
    fig.className = 'polaroid will-reveal';
    fig.style.setProperty('--rot', ((i % 2 ? 1 : -1) * (1.2 + Math.random() * 2.4)).toFixed(1) + 'deg');
    fig.style.margin = '0';
    const tape = document.createElement('span');
    tape.className = 'tape' + (i % 3 === 1 ? ' izq' : i % 3 === 2 ? ' der' : '');
    const media = document.createElement('div');
    media.className = 'media' + (item.horizontal ? ' horizontal' : '');
    media.appendChild(crearMedia(item, slug, rootPath, item.src));
    const cap = document.createElement('figcaption');
    cap.textContent = item.caption || '‹‹ CAPTION — EDITAR ››';
    fig.append(tape, media, cap);
    return fig;
  }

  /* ---------- reveals con scroll ---------- */
  function activarReveals(){
    if (reduced || !hasGsap || typeof ScrollTrigger === 'undefined'){
      document.querySelectorAll('.will-reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }
    document.querySelectorAll('.will-reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: .9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  }

  /* ---------- transición de viaje (salida): postal + sello ---------- */
  function viajarA(url, nombre, iconoSvg){
    const micro = MICROCOPY_VIAJE[Math.floor(Math.random() * MICROCOPY_VIAJE.length)];
    const ov = document.createElement('div');
    ov.className = 'postal-overlay';
    ov.innerHTML = `
      <div class="postal">
        <div class="stamp"><div class="stamp-inner">
          <div class="avion-mini">${ADORNOS.avion}</div>
          <div style="width:90px;margin:0 auto 6px;color:var(--ink)">${iconoSvg || ADORNOS.brujula}</div>
          <h2>${nombre}</h2>
          <div class="valor">CORREO AÉREO · 1er ANIVERSARIO</div>
        </div></div>
        <div class="micro">${micro}</div>
      </div>`;
    document.body.appendChild(ov);
    sembrarDestellos(ov, 7);

    const irse = () => { sessionStorage.setItem('beapa-arrive', '1'); location.href = url; };
    if (reduced || !hasGsap){
      ov.classList.add('on');
      setTimeout(irse, 500);
      return;
    }
    ov.classList.add('on');
    gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: .35 });
    gsap.fromTo(ov.querySelector('.postal'),
      { scale: .6, rotate: -8, y: 40 },
      { scale: 1, rotate: -2, y: 0, duration: .7, ease: 'back.out(1.6)' });
    setTimeout(irse, 1150);
  }

  /* ---------- llegada (entrada de página) ---------- */
  function llegada(){
    const llegando = sessionStorage.getItem('beapa-arrive');
    sessionStorage.removeItem('beapa-arrive');
    document.documentElement.classList.remove('arriving');
    if (!llegando || reduced || !hasGsap){
      if (hasGsap && !reduced) gsap.fromTo(document.body, { opacity: 0 }, { opacity: 1, duration: .6 });
      else document.body.style.opacity = 1;
      return;
    }
    gsap.fromTo(document.body,
      { opacity: 0, scale: 1.03, filter: 'sepia(.5)' },
      { opacity: 1, scale: 1, filter: 'sepia(0)', duration: .9, ease: 'power2.out', clearProps: 'all' });
  }

  return { reduced, hasGsap, lenis, overlaysGlobales, footer, crearMedia, crearPolaroid, activarReveals, viajarA, llegada };
})();
