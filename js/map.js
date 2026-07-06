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

  /* ---------- imagen del mapa + fallback ---------- */
  const img = document.createElement('img');
  img.className = 'mapa-img';
  img.src = 'assets/mapa.png';
  img.alt = 'Mapa ilustrado de Europa con nuestros destinos';
  img.addEventListener('error', () => {
    const fb = document.createElement('div');
    fb.className = 'mapa-fallback';
    fb.innerHTML = `<div>
      <div style="width:70px;margin:0 auto 10px;color:var(--ink-soft)">${ADORNOS.brujula}</div>
      <div class="ph-txt">‹‹ MAPA — coloca tu mapa en <b>assets/mapa.png</b> ››<br>los marcadores ya funcionan igual</div>
    </div>`;
    img.replaceWith(fb);
  });
  canvas.appendChild(img);

  /* ---------- ruta punteada (SVG, orden = DESTINOS) ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'mapa-rutas');
  svg.setAttribute('viewBox', `0 0 ${VB_W} ${VB_H}`);
  svg.setAttribute('preserveAspectRatio', 'none');

  const pts = DESTINOS.map(d => [d.x / 100 * VB_W, d.y / 100 * VB_H]);
  // curva suave que pasa por todos los puntos (catmull-rom → bézier)
  let dAttr = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++){
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    dAttr += ` C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }

  svg.innerHTML = `
    <defs><mask id="rutaMask">
      <path id="rutaMaskPath" d="${dAttr}" fill="none" stroke="#fff" stroke-width="26"/>
    </mask></defs>
    <path class="ruta-dots" d="${dAttr}" fill="none" stroke-width="4.5"
      stroke-dasharray="1 16" stroke-linecap="round" mask="url(#rutaMask)"/>`;
  canvas.appendChild(svg);

  const maskPath = svg.querySelector('#rutaMaskPath');
  const len = maskPath.getTotalLength();
  maskPath.style.strokeDasharray = len;
  maskPath.style.strokeDashoffset = App.reduced ? 0 : len;

  if (!App.reduced && App.hasGsap && typeof ScrollTrigger !== 'undefined'){
    gsap.to(maskPath, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top 80%', end: 'bottom 55%', scrub: 1 },
    });
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
  }
})();
