/* ============================================================
   beapa — "nuevas aventuras" añadidas a mano desde la web
   Se guardan en ESTE dispositivo (IndexedDB), fotos y vídeos
   incluidos. No necesitan servidor ni git: abrir, crear, listo.
   ============================================================ */

window.Aventuras = (function(){
  const DB = 'beapa-aventuras', STORE = 'aventuras';

  /* ---------- almacén (IndexedDB) ---------- */
  function abrir(){
    return new Promise((res, rej) => {
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = e => e.target.result.createObjectStore(STORE, { keyPath: 'id' });
      r.onsuccess = e => res(e.target.result);
      r.onerror = () => rej(r.error);
    });
  }
  const tx = (db, modo) => db.transaction(STORE, modo).objectStore(STORE);
  async function listar(){
    const db = await abrir();
    return new Promise((res, rej) => {
      const r = tx(db, 'readonly').getAll();
      r.onsuccess = () => res((r.result || []).sort((a, b) => b.creada - a.creada));
      r.onerror = () => rej(r.error);
    });
  }
  async function guardar(av){
    const db = await abrir();
    return new Promise((res, rej) => {
      const r = tx(db, 'readwrite').put(av);
      r.onsuccess = () => res(av);
      r.onerror = () => rej(r.error);
    });
  }
  async function borrar(id){
    const db = await abrir();
    return new Promise((res, rej) => {
      const r = tx(db, 'readwrite').delete(id);
      r.onsuccess = () => res();
      r.onerror = () => rej(r.error);
    });
  }

  /* ---------- helpers ---------- */
  const $ = sel => document.querySelector(sel);
  const urlDe = blob => URL.createObjectURL(blob);
  const esVideo = m => m.type === 'video';

  function mediaTag(m, { controls = false } = {}){
    if (esVideo(m)){
      const v = document.createElement('video');
      v.src = urlDe(m.blob);
      v.setAttribute('playsinline', ''); v.muted = !controls; v.loop = !controls;
      v.controls = controls; if (!controls) v.autoplay = true;
      return v;
    }
    const i = document.createElement('img');
    i.src = urlDe(m.blob); i.alt = '';
    return i;
  }

  /* ---------- tarjetas ---------- */
  let grid;
  async function render(){
    if (!grid) return;
    grid.innerHTML = '';
    let avs = [];
    try { avs = await listar(); }
    catch (e){ console.warn('IndexedDB no disponible', e); return; }

    if (!avs.length){
      grid.innerHTML = `<p class="av-vacio hand">aún nada por aquí…<br>la próxima aventura la escribes tú ✈</p>`;
      return;
    }
    avs.forEach(av => {
      const fig = document.createElement('figure');
      fig.className = 'polaroid av-card';
      fig.style.setProperty('--rot', ((Math.random() * 4 - 2)).toFixed(1) + 'deg');
      const tape = document.createElement('span'); tape.className = 'tape';
      const media = document.createElement('div'); media.className = 'media';
      if (av.media.length) media.appendChild(mediaTag(av.media[0]));
      else media.innerHTML = `<div class="ph-media"><span class="ph-txt">sin fotos</span></div>`;
      const cap = document.createElement('figcaption');
      cap.innerHTML = `${av.titulo}${av.fecha ? `<small>${av.fecha}</small>` : ''}`;
      fig.append(tape, media, cap);
      fig.addEventListener('click', () => verAventura(av));
      grid.appendChild(fig);
    });
  }

  /* ---------- visor de una aventura ---------- */
  function verAventura(av){
    const ov = document.createElement('div');
    ov.className = 'av-overlay';
    ov.innerHTML = `
      <div class="av-hoja">
        <button class="ticket av-cerrar"><span class="flecha">←</span> volver</button>
        <h2 class="av-titulo">${av.titulo}</h2>
        ${av.fecha ? `<div class="dateline hand">${av.fecha}</div>` : ''}
        <div class="av-medios"></div>
        ${av.nota ? `<p class="av-nota hand">${av.nota}</p>` : ''}
        <div class="av-acciones">
          <button class="ticket av-borrar">🗑 borrar esta aventura</button>
        </div>
      </div>`;
    const medios = ov.querySelector('.av-medios');
    av.media.forEach(m => {
      const marco = document.createElement('div');
      marco.className = 'av-marco';
      marco.appendChild(mediaTag(m, { controls: esVideo(m) }));
      medios.appendChild(marco);
    });
    ov.querySelector('.av-cerrar').addEventListener('click', () => ov.remove());
    ov.querySelector('.av-borrar').addEventListener('click', async () => {
      if (!confirm(`¿Borrar «${av.titulo}»? No se puede deshacer.`)) return;
      await borrar(av.id);
      ov.remove();
      render();
    });
    document.body.appendChild(ov);
  }

  /* ---------- formulario de nueva aventura ---------- */
  function abrirFormulario(){
    const ov = document.createElement('div');
    ov.className = 'av-overlay';
    ov.innerHTML = `
      <div class="av-hoja">
        <button class="ticket av-cerrar"><span class="flecha">←</span> cancelar</button>
        <h2 class="av-titulo">Nueva aventura</h2>
        <label class="av-label">título
          <input class="av-input" id="avTitulo" type="text" maxlength="60" placeholder="p. ej. Escapada sorpresa a…">
        </label>
        <label class="av-label">fecha (opcional)
          <input class="av-input" id="avFecha" type="text" maxlength="40" placeholder="p. ej. agosto 2026">
        </label>
        <label class="av-label">nota (opcional)
          <textarea class="av-input" id="avNota" rows="3" placeholder="qué pasó, qué comimos, quién se perdió…"></textarea>
        </label>
        <label class="av-label">fotos y vídeos
          <input id="avFiles" type="file" accept="image/*,video/*" multiple style="display:none">
          <button class="ticket" id="avElegir">📷 elegir del carrete</button>
          <div class="av-previews" id="avPreviews"></div>
        </label>
        <div class="av-acciones">
          <button class="ticket av-guardar" id="avGuardar">✈ guardar aventura</button>
        </div>
        <p class="av-aviso hand">se guarda en este dispositivo (el móvil o el ordenador donde estés ahora)</p>
      </div>`;
    document.body.appendChild(ov);

    const files = [];
    const inp = ov.querySelector('#avFiles');
    ov.querySelector('#avElegir').addEventListener('click', () => inp.click());
    inp.addEventListener('change', () => {
      for (const f of inp.files) files.push(f);
      const prev = ov.querySelector('#avPreviews');
      prev.innerHTML = '';
      files.forEach((f, i) => {
        const d = document.createElement('div');
        d.className = 'av-thumb';
        d.appendChild(mediaTag({ type: f.type.startsWith('video') ? 'video' : 'img', blob: f }));
        const x = document.createElement('button');
        x.className = 'av-thumb-x'; x.textContent = '×';
        x.addEventListener('click', () => { files.splice(i, 1); inp.dispatchEvent(new Event('change')); });
        d.appendChild(x);
        prev.appendChild(d);
      });
      inp.value = '';
    });

    ov.querySelector('.av-cerrar').addEventListener('click', () => ov.remove());
    ov.querySelector('#avGuardar').addEventListener('click', async () => {
      const titulo = ov.querySelector('#avTitulo').value.trim();
      if (!titulo){ ov.querySelector('#avTitulo').focus(); return; }
      const av = {
        id: 'av-' + Date.now(),
        creada: Date.now(),
        titulo,
        fecha: ov.querySelector('#avFecha').value.trim(),
        nota: ov.querySelector('#avNota').value.trim(),
        media: files.map(f => ({ type: f.type.startsWith('video') ? 'video' : 'img', blob: f })),
      };
      try {
        await guardar(av);
        ov.remove();
        render();
      } catch (e){
        alert('No se pudo guardar (¿sin espacio en el dispositivo?). Prueba con menos vídeos o más cortos.');
        console.warn(e);
      }
    });
  }

  /* ---------- init ---------- */
  function init(){
    grid = document.getElementById('avGrid');
    const btn = document.getElementById('avAdd');
    if (btn) btn.addEventListener('click', abrirFormulario);
    render();
  }

  return { init, render, guardar, borrar, listar };
})();
