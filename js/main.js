/* ============================================================
   beapa — runtime compartido (todas las páginas)
   Lenis + GSAP + overlays + transiciones + helpers de media
   ============================================================ */

/* Texto de una escena dibujada. Los textos viven en
   js/data/textos-efectos.js (editables desde editar.html). */
window.TXT = function(clave){
  const slug = window.DESTINO_DATA && DESTINO_DATA.slug;
  const t = window.TEXTOS_EFECTOS && TEXTOS_EFECTOS[slug] && TEXTOS_EFECTOS[slug][clave];
  return t == null ? '' : t;
};

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

  /* al cargar media real cambia la altura de la página: recalcula los
     triggers de aparición para que ninguna polaroid se quede escondida */
  let refrescoT;
  function refrescarScroll(){
    if (!hasGsap || typeof ScrollTrigger === 'undefined') return;
    clearTimeout(refrescoT);
    refrescoT = setTimeout(() => ScrollTrigger.refresh(), 250);
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

    /* Da igual la extensión/mayúsculas que pongas: probamos variantes.
       Así valen jpg y jpeg (y JPG/JPEG), y mp4/MP4/mov… en vídeo.
       GitHub Pages distingue mayúsculas, por eso probamos ambos casos. */
    const candidatos = (src, tipo) => {
      const i = src.lastIndexOf('.');
      const nombre = i < 0 ? src : src.slice(0, i);
      const ext = i < 0 ? '' : src.slice(i + 1);
      const low = ext.toLowerCase();
      let exts;
      if (tipo === 'video') exts = ['mp4', 'MP4', 'mov', 'MOV', 'm4v', 'webm'];
      else if (low === 'jpg' || low === 'jpeg') exts = ['jpg', 'jpeg', 'JPG', 'JPEG'];
      else exts = [low, ext.toUpperCase()];        // png, webp, heic…
      return [...new Set([src, ...exts.map(e => nombre + '.' + e)])];
    };

    if (item.type === 'video'){
      const vid = document.createElement('video');
      vid.setAttribute('playsinline',''); vid.muted = true; vid.loop = true;
      vid.autoplay = !reduced; vid.controls = true; vid.preload = 'metadata';
      vid.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      const lista = candidatos(item.src, 'video');
      let idx = 0;
      const srcEl = document.createElement('source');
      srcEl.src = base + lista[idx];
      vid.addEventListener('loadedmetadata', refrescarScroll);
      srcEl.addEventListener('error', () => {
        if (++idx < lista.length){ srcEl.src = base + lista[idx]; vid.load(); }
        else placeholder();
      });
      vid.appendChild(srcEl);
      cont.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.loading = 'lazy'; img.decoding = 'async';
      img.alt = item.caption || etiqueta || slug;
      const lista = candidatos(item.src, 'img');
      let idx = 0;
      img.src = base + lista[idx];
      img.addEventListener('load', () => {
        /* foto apaisada → marco apaisado (sin recortarla por la mitad) */
        if (img.naturalWidth > img.naturalHeight){
          const media = cont.closest('.media');
          if (media) media.classList.add('horizontal');
        }
        refrescarScroll();
      });
      img.addEventListener('error', () => {
        if (++idx < lista.length){ img.src = base + lista[idx]; }
        else placeholder();
      });
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
        scrollTrigger: { trigger: el, start: 'top 92%' },
      });
    });
    /* con todo cargado (fotos incluidas), recalcula posiciones */
    window.addEventListener('load', () => ScrollTrigger.refresh());
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

  /* ---------- objetos de ambiente (deambulan por toda la página) ----------
     Cada efecto puede definir DESTINO_EFFECTS.ambient(layer, reduced) y usar
     estos helpers para soltar objetos que cruzan, suben o caen por el viewport. */
  function crearAmbObj(layer, html, o){
    const el = document.createElement('div');
    el.className = 'amb-obj';
    el.style.width = (o.w || 40) + 'px';
    if (o.op != null) el.style.opacity = o.op;
    el.innerHTML = html;
    layer.appendChild(el);
    return el;
  }

  // cruza la pantalla de lado a lado, a altura aleatoria, en bucle
  function ambienteCruzar(layer, html, o = {}){
    if (reduced || !hasGsap) return;
    const el = crearAmbObj(layer, html, o);
    const vuelo = primera => {
      const izq = Math.random() > .5;
      el.style.top = ((o.yMin ?? 6) + Math.random() * ((o.yMax ?? 72) - (o.yMin ?? 6))) + '%';
      const svg = el.querySelector('svg');
      if (svg) svg.style.transform = `scaleX(${izq ? 1 : -1})`;
      gsap.fromTo(el,
        { x: izq ? -110 : innerWidth + 110 },
        { x: izq ? innerWidth + 110 : -110,
          duration: (o.dur ?? 20) * (.75 + Math.random() * .5), ease: 'none',
          delay: (primera ? 0 : 1.5) + Math.random() * (o.esperaMax ?? 8),
          onComplete: () => vuelo(false) });
    };
    gsap.to(el, { y: '+=' + (o.vaiven ?? 16), duration: 2.2 + Math.random() * 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    vuelo(true);
  }

  // sube desde abajo por los laterales (o.borde = % de anchura del carril)
  function ambienteFlotar(layer, html, o = {}){
    if (reduced || !hasGsap) return;
    const el = crearAmbObj(layer, html, o);
    const subir = () => {
      const carril = o.borde ?? 16;
      el.style.left = (Math.random() > .5
        ? 2 + Math.random() * carril
        : 94 - carril + Math.random() * carril) + '%';
      gsap.fromTo(el,
        { y: innerHeight + 90, rotation: -10 + Math.random() * 20 },
        { y: -150, rotation: '+=10',
          duration: (o.dur ?? 18) * (.8 + Math.random() * .4), ease: 'none',
          delay: Math.random() * (o.esperaMax ?? 10), onComplete: subir });
    };
    subir();
  }

  // cae desde arriba, con balanceo, por cualquier punto del ancho
  function ambienteCaer(layer, html, o = {}){
    if (reduced || !hasGsap) return;
    const el = crearAmbObj(layer, html, o);
    const caer = () => {
      el.style.left = (2 + Math.random() * 94) + '%';
      gsap.fromTo(el,
        { y: -90, rotation: -14 + Math.random() * 28 },
        { y: innerHeight + 90, rotation: '+=' + (o.giro ?? 24),
          duration: (o.dur ?? 14) * (.8 + Math.random() * .5), ease: 'none',
          delay: Math.random() * (o.esperaMax ?? 8), onComplete: caer });
    };
    gsap.to(el, { x: '+=' + (o.vaiven ?? 26), duration: 2 + Math.random() * 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    caer();
  }

  return { reduced, hasGsap, lenis, overlaysGlobales, footer, crearMedia, crearPolaroid, activarReveals, viajarA, llegada,
    ambienteCruzar, ambienteFlotar, ambienteCaer };
})();
