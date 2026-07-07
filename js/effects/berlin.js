/* ============================================================
   Berlín — concierto de Carolina Durante
   Escenario, público saltando, ecualizador, luces suaves,
   confeti, setlist vintage y hueco para el vídeo del concierto.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .blz-escenario{
          max-width:820px; margin:0 auto; padding:0 18px;
        }
        .blz-sala{
          position:relative; overflow:hidden; border-radius:6px;
          background:linear-gradient(180deg, #3a2f24, #4A3B2C 60%, #5a4936);
          box-shadow:var(--shadow-lift); border:10px solid #F7F1E1;
          padding:26px 18px 0; text-align:center;
        }
        .blz-luces{ position:absolute; inset:0; pointer-events:none; mix-blend-mode:screen; }
        .blz-luz{
          position:absolute; top:-30%; width:34%; height:150%;
          background:linear-gradient(180deg, var(--c), transparent 75%);
          opacity:.24; transform-origin:top center; filter:blur(6px);
        }
        .blz-titulo{
          font-family:var(--font-hand); font-weight:700; color:#F3ECDA;
          font-size:clamp(1.8rem,7vw,2.8rem); letter-spacing:.04em;
          text-shadow:2px 2px 0 rgba(201,139,132,.55), -2px -2px 0 rgba(155,186,192,.4);
          transform:rotate(-2deg); position:relative; z-index:2;
        }
        .blz-sub{ color:rgba(243,236,218,.75); font-family:var(--font-display); font-size:.8rem; letter-spacing:.3em; text-transform:uppercase; position:relative; z-index:2; }
        .blz-eq{
          display:flex; align-items:flex-end; justify-content:center; gap:5px;
          height:64px; margin:18px auto 0; position:relative; z-index:2;
        }
        .blz-eq span{
          width:9px; background:linear-gradient(180deg, var(--rose), var(--gold));
          border-radius:3px 3px 0 0; height:20%;
        }
        .blz-publico{ display:block; width:100%; margin-top:-6px; position:relative; z-index:2; }
        .blz-video{ max-width:640px; margin:26px auto 0; }
        .blz-video .marco{ background:#F7F1E1; padding:12px; box-shadow:var(--shadow-soft); transform:rotate(.8deg); }
        .blz-video .ph-media{ aspect-ratio:16/10; }
        .blz-setlist{
          max-width:340px; margin:30px auto 0; text-align:left;
        }
        .blz-setlist .stamp-inner{ text-align:left; padding:18px 22px; }
        .blz-setlist h3{ font-size:1.1rem; letter-spacing:.14em; text-transform:uppercase; margin-bottom:.6em; }
        .blz-setlist ol{ margin:0; padding-left:1.3em; font-family:var(--font-hand); font-size:1.3rem; color:var(--ink-soft); }
        .blz-confeti{ position:absolute; inset:0; pointer-events:none; z-index:3; }
      </style>

      <div class="blz-escenario will-reveal">
        <div class="blz-sala" id="blzSala">
          <div class="blz-luces">
            <div class="blz-luz" style="--c:#C98B84; left:2%"></div>
            <div class="blz-luz" style="--c:#C9A24B; left:34%"></div>
            <div class="blz-luz" style="--c:#9BBAC0; left:66%"></div>
          </div>
          <canvas class="blz-confeti" id="blzConfeti"></canvas>
          <div class="blz-titulo">Carolina Durante</div>
          <div class="blz-sub">· Berlín · aquella noche ·</div>
          <div class="blz-eq" id="blzEq"></div>
          <svg class="blz-publico" viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg" fill="#241c13">
            <g id="blzGente"></g>
          </svg>
        </div>

        <div class="blz-video">
          <div class="marco"><div id="blzVideoSlot"></div>
            <div style="font-family:var(--font-hand);font-size:1.3rem;color:var(--ink-soft);text-align:center;padding-top:8px">‹‹ CAPTION CONCIERTO — EDITAR ››</div>
          </div>
        </div>

        <div class="blz-setlist stamp">
          <div class="stamp-inner">
            <h3>Setlist</h3>
            <ol>
              <li>‹‹ CANCIÓN 1 — EDITAR ››</li>
              <li>‹‹ CANCIÓN 2 — EDITAR ››</li>
              <li>‹‹ LA NUESTRA — EDITAR ››</li>
              <li>bis (siempre hay bis)</li>
            </ol>
            <div class="valor" style="margin-top:.8em">ENTRADA Nº 000 · PISTA</div>
          </div>
        </div>
      </div>`;

    /* video del concierto (assets/destinos/berlin/concierto.mp4) */
    document.getElementById('blzVideoSlot')
      .appendChild(App.crearMedia({ type: 'video', src: 'concierto.mp4' }, 'berlin', '../../', 'concierto'));

    /* público: siluetas cabezas+brazos */
    const gente = document.getElementById('blzGente');
    let gs = '';
    for (let i = 0; i < 26; i++){
      const x = 12 + i * 30 + (Math.random() * 10 - 5);
      const r = 11 + Math.random() * 4;
      const arms = Math.random() > .45
        ? `<path d="M${x-r} ${86} L${x-r-9} ${64} M${x+r} ${86} L${x+r+9} ${64}" stroke="#241c13" stroke-width="5" stroke-linecap="round" fill="none"/>` : '';
      gs += `<g class="blz-persona" data-d="${(Math.random()*.9).toFixed(2)}">
        <circle cx="${x}" cy="${74 + Math.random()*6}" r="${r}"/>
        <rect x="${x - r - 2}" y="${84}" width="${r*2+4}" height="40" rx="8"/>${arms}</g>`;
    }
    gente.innerHTML = gs;

    /* ecualizador */
    const eq = document.getElementById('blzEq');
    for (let i = 0; i < 16; i++) eq.appendChild(document.createElement('span'));

    if (reduced || !App.hasGsap) return;

    /* barras */
    eq.querySelectorAll('span').forEach(s => {
      gsap.to(s, { height: () => (15 + Math.random() * 85) + '%',
        duration: .18 + Math.random() * .22, repeat: -1, yoyo: true, ease: 'sine.inOut',
        repeatRefresh: true });
    });
    /* saltos del público */
    gente.querySelectorAll('.blz-persona').forEach(p => {
      gsap.to(p, { y: -(6 + Math.random() * 10), duration: .34 + Math.random() * .2,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: +p.dataset.d });
    });
    /* luces que barren, suaves (sin estrobo) */
    section.querySelectorAll('.blz-luz').forEach((l, i) => {
      gsap.to(l, { rotate: i % 2 ? 14 : -14, opacity: .34, duration: 3 + i,
        repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    /* confeti en paleta */
    const cv = document.getElementById('blzConfeti');
    const sala = document.getElementById('blzSala');
    const ctx = cv.getContext('2d');
    const colores = ['#C98B84', '#C9A24B', '#9BBAC0', '#F3ECDA', '#B26A54'];
    let piezas = [];
    function resize(){
      cv.width = sala.clientWidth; cv.height = sala.clientHeight;
      piezas = Array.from({ length: 46 }, () => ({
        x: Math.random() * cv.width, y: Math.random() * -cv.height,
        w: 4 + Math.random() * 5, h: 7 + Math.random() * 6,
        v: .5 + Math.random() * 1.1, a: Math.random() * Math.PI * 2,
        va: .02 + Math.random() * .05, c: colores[(Math.random() * colores.length) | 0],
      }));
    }
    resize(); addEventListener('resize', resize);
    (function tick(){
      if (!cv.isConnected) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      piezas.forEach(p => {
        p.y += p.v; p.a += p.va; p.x += Math.sin(p.a) * .6;
        if (p.y > cv.height + 12){ p.y = -12; p.x = Math.random() * cv.width; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
        ctx.fillStyle = p.c; ctx.globalAlpha = .85;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      requestAnimationFrame(tick);
    })();
  },

  /* ambiente: notas que suben del concierto y confeti perdido */
  ambient(layer, reduced){
    if (reduced) return;
    const nota = c => `<svg viewBox="0 0 30 34" fill="${c}"><ellipse cx="8" cy="27" rx="6" ry="4.5" transform="rotate(-20 8 27)"/><path d="M13 27 V6 q10 2 12 9" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
    const confeti = c => `<svg viewBox="0 0 10 14"><rect width="10" height="14" rx="2" fill="${c}"/></svg>`;
    App.ambienteFlotar(layer, nota('#6E5B48'), { w: 24, op: .7, dur: 13 });
    App.ambienteFlotar(layer, nota('#B26A54'), { w: 18, op: .6, dur: 17, esperaMax: 12 });
    App.ambienteFlotar(layer, nota('#C9A24B'), { w: 21, op: .65, dur: 15, esperaMax: 9 });
    App.ambienteCaer(layer, confeti('#C98B84'), { w: 9, op: .8, dur: 12, giro: 160 });
    App.ambienteCaer(layer, confeti('#9BBAC0'), { w: 8, op: .7, dur: 15, giro: 200, esperaMax: 11 });
  },
};
