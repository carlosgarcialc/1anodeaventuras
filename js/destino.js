/* ============================================================
   beapa — runtime de página de destino
   Lee window.DESTINO_DATA (js/data/<slug>.js) y monta la página.
   Después llama al efecto temático (js/effects/<slug>.js) que
   se registra en window.DESTINO_EFFECTS.
   ============================================================ */

(function(){
  const D = window.DESTINO_DATA;
  if (!D){ console.warn('Falta js/data/<slug>.js'); return; }
  const ROOT = '../../';           // desde /destinos/<slug>/ a la raíz
  const app = document.getElementById('app');

  const idx = DESTINOS.findIndex(x => x.slug === D.slug);
  const meta = DESTINOS[idx];
  const prev = DESTINOS[(idx - 1 + DESTINOS.length) % DESTINOS.length];
  const next = DESTINOS[(idx + 1) % DESTINOS.length];
  document.documentElement.style.setProperty('--accent', meta.accent);

  /* ---------- cabecera ---------- */
  const header = document.createElement('header');
  header.className = 'd-header';
  header.innerHTML = `
    <a class="ticket volver" href="${ROOT}index.html"><span class="flecha">←</span> al mapa</a>
    <span class="adorno-esq tl">${ADORNOS.olivo}</span>
    <span class="adorno-esq br">${ADORNOS.olivo}</span>
    <div class="postmark">correo<br>aéreo<br>· beapa ·</div>
    <div class="d-icono">${ICONOS[D.slug] || ADORNOS.brujula}</div>
    <h1>${D.titulo}</h1>
    <div class="dateline">${D.fechas}</div>`;
  sembrarDestellos(header, 5);

  /* ---------- hero media ---------- */
  const hero = document.createElement('section');
  hero.className = 'd-hero will-reveal';
  const marco = document.createElement('div');
  marco.className = 'marco';
  marco.appendChild(App.crearMedia(D.hero, D.slug, ROOT, 'hero'));
  const selloEsq = document.createElement('div');
  selloEsq.className = 'stamp sello-esq';
  selloEsq.innerHTML = `<div class="stamp-inner" style="padding:8px 10px">
    <div style="width:40px;color:var(--ink)">${ICONOS[D.slug] || ''}</div>
    <div class="valor">${meta.nombre.toUpperCase()}</div></div>`;
  marco.appendChild(selloEsq);
  hero.appendChild(marco);

  /* ---------- intro ---------- */
  const intro = document.createElement('section');
  intro.className = 'd-intro will-reveal';
  intro.innerHTML = `<p class="ph-texto">${D.intro}</p>`;

  /* ---------- hueco del efecto temático ---------- */
  const efecto = document.createElement('section');
  efecto.className = 'efecto';
  efecto.id = 'efecto';

  /* ---------- galería ---------- */
  const galTit = document.createElement('div');
  galTit.className = 'd-galeria-titulo will-reveal';
  galTit.innerHTML = `<h2>El carrete</h2><div class="hand">${D.galeriaSub || 'lo que sobrevivió de la galería'}</div>`;
  const galeria = document.createElement('section');
  galeria.className = 'd-galeria';
  D.galeria.forEach((item, i) => galeria.appendChild(App.crearPolaroid(item, D.slug, ROOT, i)));

  /* ---------- historia ---------- */
  const historia = document.createElement('section');
  historia.className = 'd-historia will-reveal';
  historia.innerHTML = `<h2>La <em>historia</em></h2><div class="ph-texto">${D.historia}</div>`;
  sembrarDestellos(historia, 3);

  /* ---------- nota manuscrita ---------- */
  const nota = document.createElement('aside');
  nota.className = 'd-nota will-reveal';
  nota.innerHTML = `${D.nota}<span class="wax-seal">b&a</span>`;

  /* ---------- navegación ---------- */
  const nav = document.createElement('nav');
  nav.className = 'd-nav';
  nav.setAttribute('aria-label', 'Otros destinos');
  const mkLink = (dest, label, flecha) => {
    const a = document.createElement('a');
    a.className = 'ticket';
    a.href = `../${dest.slug}/index.html`;
    a.innerHTML = flecha === '←'
      ? `<span class="flecha">←</span> ${label}`
      : `${label} <span class="flecha">→</span>`;
    a.addEventListener('click', e => {
      e.preventDefault();
      App.viajarA(a.href, dest.nombre, ICONOS[dest.slug]);
    });
    return a;
  };
  nav.append(mkLink(prev, prev.nombre, '←'), mkLink(next, next.nombre, '→'));

  app.append(header, hero, intro, efecto, galTit, galeria, historia, nota, nav);

  /* ---------- boot ---------- */
  App.overlaysGlobales();
  App.llegada();
  App.footer(ROOT);

  /* capa de ambiente: objetos que deambulan por los lados de toda la página */
  const ambiente = document.createElement('div');
  ambiente.className = 'ambiente';
  document.body.appendChild(ambiente);

  if (window.DESTINO_EFFECTS){
    try {
      if (typeof DESTINO_EFFECTS.init === 'function') DESTINO_EFFECTS.init(efecto, App.reduced);
      if (typeof DESTINO_EFFECTS.ambient === 'function') DESTINO_EFFECTS.ambient(ambiente, App.reduced);
    }
    catch (err){ console.warn('Efecto temático falló (la página sigue bien):', err); }
  }
  App.activarReveals();
})();
