/* ============================================================
   beapa — el mapa vivo (home)
   - marcadores por % sobre el lienzo 1536×1024
   - ruta punteada dibujada con máscara + GSAP ScrollTrigger
   - pan / pinch-zoom táctil en móvil (sin librerías)
   - transición "de viaje": zoom al marcador + postal con sello
   ============================================================ */

(function(){
  const VB_W = 1536, VB_H = 1024;
  const frame = document.getElementById('mapaFrame');
  const canvas = document.getElementById('mapaCanvas');
  if (!frame || !canvas) return;

  const esMovil = window.matchMedia('(max-width: 759px)').matches;

  /* ---------- imagen del mapa + fallback ----------
     El mapa dibujado vive en assets/mapa.svg. Si algún día lo
     sustituyes por una foto/escaneo, ponla como assets/mapa.png
     y se usará automáticamente como alternativa. */
  const img = document.createElement('img');
  img.className = 'mapa-img';
  img.src = 'assets/mapa.svg';
  img.alt = 'Mapa ilustrado de Europa con nuestros destinos';
  img.addEventListener('error', () => {
    if (!img.src.endsWith('mapa.png')){ img.src = 'assets/mapa.png'; return; }
    const fb = document.createElement('div');
    fb.className = 'mapa-fallback';
    fb.innerHTML = `<div>
      <div style="width:70px;margin:0 auto 10px;color:var(--ink-soft)">${ADORNOS.brujula}</div>
      <div class="ph-txt">‹‹ MAPA — falta <b>assets/mapa.svg</b> ››<br>los marcadores ya funcionan igual</div>
    </div>`;
    img.replaceWith(fb);
  });
  canvas.appendChild(img);

  /* ---------- ruta del mini bus: Copenhague–(Berlín)–Bratislava ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'mapa-rutas');
  svg.setAttribute('viewBox', `0 0 ${VB_W} ${VB_H}`);
  svg.setAttribute('preserveAspectRatio', 'none');

  // solo estos destinos (el resto no van conectados)
  const RUTA = ['copenhague-aarhus', 'berlin', 'bratislava']
    .map(sl => DESTINOS.find(d => d.slug === sl))
    .map(d => [d.x / 100 * VB_W, d.y / 100 * VB_H]);
  // curva suave (catmull-rom → bézier)
  let dAttr = `M ${RUTA[0][0]},${RUTA[0][1]}`;
  for (let i = 0; i < RUTA.length - 1; i++){
    const p0 = RUTA[Math.max(0, i - 1)], p1 = RUTA[i], p2 = RUTA[i + 1], p3 = RUTA[Math.min(RUTA.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    dAttr += ` C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }

  svg.innerHTML = `
    <defs><mask id="rutaMask">
      <path id="rutaMaskPath" d="${dAttr}" fill="none" stroke="#fff" stroke-width="26"/>
    </mask></defs>
    <path class="ruta-dots" d="${dAttr}" fill="none" stroke-width="4.5"
      stroke-dasharray="1 16" stroke-linecap="round" mask="url(#rutaMask)"/>
    <g id="rutaBus">
      <rect x="-16" y="-10" width="32" height="18" rx="4" fill="#C98B84" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M-11 -5 h7 v7 h-7 Z M-1 -5 h7 v7 h-7 Z M9 -5 h5 v7 h-5 Z" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="1.6"/>
      <circle cx="-9" cy="9" r="3.6" fill="#4A3B2C"/><circle cx="9" cy="9" r="3.6" fill="#4A3B2C"/>
    </g>`;
  canvas.appendChild(svg);

  const maskPath = svg.querySelector('#rutaMaskPath');
  const len = maskPath.getTotalLength();
  maskPath.style.strokeDasharray = len;
  maskPath.style.strokeDashoffset = App.reduced ? 0 : len;
  const bus = svg.querySelector('#rutaBus');

  if (!App.reduced && App.hasGsap && typeof ScrollTrigger !== 'undefined'){
    gsap.to(maskPath, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top 80%', end: 'bottom 55%', scrub: 1 },
    });
  } else { maskPath.style.strokeDashoffset = 0; }

  // el mini bus recorre la ruta de ida y vuelta
  if (!App.reduced && App.hasGsap && typeof MotionPathPlugin !== 'undefined'){
    gsap.to(bus, {
      motionPath: { path: maskPath, align: maskPath, alignOrigin: [.5, .9], autoRotate: true },
      duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
  } else {
    const mid = maskPath.getPointAtLength(len / 2);
    bus.setAttribute('transform', `translate(${mid.x},${mid.y})`);
  }

  /* ---------- marcadores ---------- */
  let activo = null;
  DESTINOS.forEach(d => {
    const b = document.createElement('button');
    b.className = 'marker';
    b.style.left = d.x + '%';
    b.style.top = d.y + '%';
    b.dataset.slug = d.slug;
    b.setAttribute('aria-label', `Viajar a ${d.nombre}`);
    b.innerHTML = `
      <span class="marker-glow"></span>
      <span class="marker-ring"></span>
      <span class="marker-tag">${d.nombre}<small>${d.tag}</small></span>`;
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      // móvil: 1er tap despliega etiqueta, 2º tap viaja
      if (esMovil && activo !== b){
        if (activo) activo.classList.remove('activo');
        activo = b; b.classList.add('activo');
        return;
      }
      viajar(d, b);
    });
    canvas.appendChild(b);
  });
  document.addEventListener('click', () => {
    if (activo){ activo.classList.remove('activo'); activo = null; }
  });

  /* ---------- transición de viaje ---------- */
  function viajar(d, marker){
    const url = `destinos/${d.slug}/index.html`;
    if (App.reduced || !App.hasGsap){
      App.viajarA(url, d.nombre, ICONOS[d.slug]);
      return;
    }
    // ráfaga de destellos en el marcador
    sembrarDestellos(marker, 5);
    // zoom del lienzo hacia el destino
    canvas.style.transformOrigin = `${d.x}% ${d.y}%`;
    gsap.to(canvas, { scale: view.s * 2.1, duration: .9, ease: 'power2.inOut',
      onUpdate: null, overwrite: true });
    gsap.to('.marker', { opacity: 0, duration: .4 });
    setTimeout(() => App.viajarA(url, d.nombre, ICONOS[d.slug]), 420);
  }

  /* ---------- pan + pinch-zoom (solo móvil) ---------- */
  const view = { x: 0, y: 0, s: 1 };
  if (esMovil){
    // arranca con un poco de zoom para que los marcadores sean cómodos
    view.s = 1.6;
    centrar();
    aplicar();

    const punteros = new Map();
    let inicioDist = 0, inicioS = 1, inicioMid = null, inicioView = null;

    frame.addEventListener('pointerdown', e => {
      punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (punteros.size === 2){
        const [a, b] = [...punteros.values()];
        inicioDist = Math.hypot(a.x - b.x, a.y - b.y);
        inicioS = view.s;
        inicioMid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        inicioView = { ...view };
      } else {
        inicioView = { ...view };
        inicioMid = { x: e.clientX, y: e.clientY };
      }
      frame.classList.add('arrastrando');
    });
    frame.addEventListener('pointermove', e => {
      if (!punteros.has(e.pointerId)) return;
      punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const vals = [...punteros.values()];
      if (vals.length === 2){
        const dist = Math.hypot(vals[0].x - vals[1].x, vals[0].y - vals[1].y);
        view.s = Math.min(3.5, Math.max(1, inicioS * dist / inicioDist));
        const mid = { x: (vals[0].x + vals[1].x) / 2, y: (vals[0].y + vals[1].y) / 2 };
        view.x = inicioView.x + (mid.x - inicioMid.x);
        view.y = inicioView.y + (mid.y - inicioMid.y);
      } else if (vals.length === 1 && inicioMid){
        view.x = inicioView.x + (vals[0].x - inicioMid.x);
        view.y = inicioView.y + (vals[0].y - inicioMid.y);
      }
      limitar(); aplicar();
    });
    const soltar = e => {
      punteros.delete(e.pointerId);
      if (!punteros.size) frame.classList.remove('arrastrando');
    };
    frame.addEventListener('pointerup', soltar);
    frame.addEventListener('pointercancel', soltar);
  }

  function centrar(){
    const r = frame.getBoundingClientRect();
    view.x = -(r.width * view.s - r.width) / 2;
    view.y = -(r.height * view.s - r.height) / 2;
  }
  function limitar(){
    const r = frame.getBoundingClientRect();
    view.x = Math.min(0, Math.max(r.width - r.width * view.s, view.x));
    view.y = Math.min(0, Math.max(r.height - r.height * view.s, view.y));
  }
  function aplicar(){
    canvas.style.transformOrigin = '0 0';
    canvas.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.s})`;
    /* los marcadores mantienen su tamaño en pantalla aunque hagas zoom */
    const inv = 1 / view.s;
    canvas.querySelectorAll('.marker').forEach(m => {
      m.style.transform = `translate(-50%,-50%) scale(${inv})`;
    });
  }
})();
