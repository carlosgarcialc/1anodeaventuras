/* ============================================================
   Vigo — Atlántico: olas, bruma, pulpo y la gaviota ladrona
   (botín: bocadillo de pollo empanado).
   + Parte oficial de catástrofes: el barco a Cíes que se movía
     "un poquito" y el BMW azul que dijo basta.
   + Interludio real (en otra parte de la página): la familia
     de Carlos agasajando a Su Majestad Bea.
   ============================================================ */

/* bocadillo de pollo empanado (se usa en la gaviota y en el ambiente) */
const VIG_BOCADILLO = `
  <g>
    <path d="M0 8 Q14 -2 28 8 L28 10 Q14 16 0 10 Z" fill="#E8C06B" stroke="#4A3B2C" stroke-width="2"/>
    <path d="M2 10 q6 5 12 4 q8 -1 12 -4 l0 3 Q14 19 2 13 Z" fill="#C88F4F" stroke="#4A3B2C" stroke-width="1.8"/>
    <path d="M1 13 Q14 22 27 13 L27 15 Q14 24 1 15 Z" fill="#E8C06B" stroke="#4A3B2C" stroke-width="2"/>
  </g>`;

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .vig-mar{
          position:relative; overflow:hidden; min-height:380px;
          background:linear-gradient(180deg, #DCE7E4 0%, #BFD3D6 55%, #9BBAC0 100%);
        }
        .vig-ola{ position:absolute; left:-5%; width:110%; }
        .vig-ola svg{ width:100%; display:block; }
        .vig-bruma{
          position:absolute; inset:0; z-index:4; pointer-events:none;
          background:linear-gradient(180deg, rgba(243,236,218,.75), rgba(243,236,218,0) 45%);
        }
        .vig-gaviota{ position:absolute; top:16%; left:-14%; width:96px; z-index:5; }
        .vig-cartel{
          position:absolute; top:14px; left:50%; transform:translateX(-50%) rotate(-2deg); z-index:6;
          font-family:var(--font-hand); font-size:clamp(1.15rem,4vw,1.6rem); color:#4A3B2C;
          background:rgba(243,236,218,.85); padding:.1em .7em; border-radius:4px;
          border:1.5px solid rgba(110,91,72,.4); text-align:center; width:max-content; max-width:92%;
        }
        .vig-pulpo{ position:absolute; bottom:-8px; right:6%; width:120px; z-index:3; }

        /* --- catástrofes --- */
        .vig-catastrofes{ padding:40px 18px 6px; max-width:820px; margin:0 auto; }
        .vig-cat-escenas{ display:grid; gap:26px; margin-top:18px; }
        @media (min-width:700px){ .vig-cat-escenas{ grid-template-columns:1fr 1fr; } }
        .vig-cat{
          margin:0; background:var(--paper-light); background-image:var(--noise);
          border:1.5px solid var(--ink-soft); border-radius:4px; box-shadow:var(--shadow-soft);
          padding:14px 14px 10px; position:relative;
        }
        .vig-cat:first-child{ transform:rotate(-1.2deg); }
        .vig-cat:last-child{ transform:rotate(1.2deg); }
        .vig-cat .num{
          position:absolute; top:-13px; left:14px; font-family:var(--font-display);
          font-size:.72rem; letter-spacing:.16em; background:var(--wine); color:var(--paper-light);
          padding:.25em .7em; border-radius:3px;
        }
        .vig-cat svg{ width:100%; }
        .vig-cat figcaption{ font-family:var(--font-hand); font-size:1.3rem; color:var(--ink-soft); text-align:center; padding-top:8px; }

        /* --- interludio real --- */
        .vig-reina{ text-align:center; margin:44px 0 10px; }
        .vig-reina-svg{ width:min(680px,100%); margin:8px auto 0; display:block; }
        .vig-jaja{ opacity:.85; }
      </style>

      <div class="vig-mar torn-top torn-bottom" id="vigMar">
        <div class="vig-bruma"></div>
        <div class="vig-cartel">SE BUSCA: gaviota · botín: un (1) bocadillo de pollo empanado</div>

        <div class="vig-gaviota" id="vigGaviota">
          <svg viewBox="0 0 110 70" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
            <path d="M10 34 Q26 20 42 30 Q40 18 52 14 Q66 10 76 20 Q68 20 64 25 L78 30 Q64 44 46 40 Q26 38 10 34 Z" fill="#F3ECDA"/>
            <circle cx="58" cy="20" r="1.6" fill="#4A3B2C" stroke="none"/>
            <path id="vigAla" d="M40 28 Q48 12 66 10" stroke-width="3.5"/>
            <g transform="translate(70,34) rotate(10)">${VIG_BOCADILLO}</g>
          </svg>
        </div>

        <div class="vig-pulpo">
          <svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
            <path d="M60 10 Q88 10 88 44 L88 58 Q88 66 82 66 Q76 66 76 58 M32 58 Q32 66 38 66 Q44 66 44 58 L32 44 Q32 10 60 10" fill="#C98B84"/>
            <path d="M60 10 Q32 10 32 44 L32 58" fill="none"/>
            <path id="vigTent1" d="M44 62 Q40 84 26 92 Q18 96 14 90" fill="none" stroke="#C98B84" stroke-width="7"/>
            <path id="vigTent2" d="M58 66 Q58 90 48 100" fill="none" stroke="#C98B84" stroke-width="7"/>
            <path id="vigTent3" d="M72 64 Q80 86 96 90 Q104 92 106 84" fill="none" stroke="#C98B84" stroke-width="7"/>
            <circle cx="50" cy="40" r="2.4" fill="#4A3B2C" stroke="none"/>
            <circle cx="72" cy="40" r="2.4" fill="#4A3B2C" stroke="none"/>
            <path d="M54 52 q6 5 14 0" stroke-width="2.5"/>
          </svg>
        </div>
      </div>

      <!-- ============ PARTE OFICIAL DE CATÁSTROFES ============ -->
      <div class="vig-catastrofes will-reveal">
        <div class="escena-titulo">parte oficial de catástrofes</div>
        <div class="vig-cat-escenas">

          <figure class="vig-cat">
            <span class="num">EXPEDIENTE 001</span>
            <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
              <rect width="320" height="190" fill="#BFD3D6" stroke="none"/>
              <path d="M258 34 l24 8 -22 10" stroke-width="2.5" stroke="#6E5B48"/>
              <text x="270" y="26" text-anchor="middle" font-family="Caveat, cursive" font-size="17" fill="#4A3B2C" stroke="none">Cíes →</text>
              <g id="vigBarco">
                <path d="M96 118 h128 l-18 26 h-92 Z" fill="#B26A54"/>
                <rect x="138" y="92" width="44" height="26" rx="4" fill="#F3ECDA"/>
                <circle cx="152" cy="104" r="5"/><circle cx="168" cy="104" r="5"/>
                <path d="M160 92 v-22 M160 74 q16 2 16 12 h-16" fill="#F3ECDA"/>
                <!-- pasajeros mareados -->
                <circle cx="112" cy="108" r="8" fill="#8B9A78"/>
                <path d="M108 106 q2 -3 4 0 M114 106 q2 -3 4 0 M108 113 q4 -3 8 0" stroke-width="2"/>
                <circle cx="206" cy="108" r="8" fill="#8B9A78"/>
                <path d="M202 106 q2 -3 4 0 M208 106 q2 -3 4 0 M202 113 q4 -3 8 0" stroke-width="2"/>
              </g>
              <path id="vigOlaCat1" d="M0 150 Q40 134 80 150 T160 150 T240 150 T320 150 L320 190 L0 190 Z" fill="#7FA6AD" stroke="none"/>
              <path id="vigOlaCat2" d="M0 164 Q40 150 80 164 T160 164 T240 164 T320 164 L320 190 L0 190 Z" fill="#5F8B94" stroke="none"/>
            </svg>
            <figcaption>‹‹ CAPTION BARCO — EDITAR ›› (el barco a Cíes: 40 min de trayecto, 400 de estómago)</figcaption>
          </figure>

          <figure class="vig-cat">
            <span class="num">EXPEDIENTE 002</span>
            <svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
              <rect width="320" height="190" fill="#EAE0CA" stroke="none"/>
              <path d="M0 152 h320" stroke-width="3" stroke="#6E5B48"/>
              <path d="M20 152 h20 M60 152 h20 M100 152 h20" stroke="#DDCFB2" stroke-width="4"/>
              <!-- el BMW azul, con el capó abierto y el alma rota -->
              <g id="vigBmw">
                <path d="M60 132 q0 -22 26 -24 l16 -18 q30 -14 74 -6 l22 22 q28 4 28 26 Z" fill="#5E7E9B"/>
                <path d="M108 92 l12 -13 q24 -10 56 -5 l16 18 Z" fill="#BFD3D6"/>
                <path d="M148 90 v-14" stroke-width="2.5"/>
                <!-- capó abierto -->
                <path d="M64 108 L36 84" stroke-width="4" stroke="#5E7E9B"/>
                <path d="M64 108 L36 84 q22 -6 34 8" fill="#4d6a85" stroke-width="3"/>
                <circle cx="96" cy="136" r="14" fill="#4A3B2C"/><circle cx="96" cy="136" r="6" fill="#DDCFB2"/>
                <circle cx="196" cy="136" r="14" fill="#4A3B2C"/><circle cx="196" cy="136" r="6" fill="#DDCFB2"/>
                <!-- logo -->
                <circle cx="150" cy="112" r="7" fill="#F3ECDA" stroke-width="2"/>
                <path d="M150 105 v14 M143 112 h14" stroke-width="1.6"/>
              </g>
              <!-- humo del motor -->
              <path class="vig-humo" d="M52 76 q-6 -10 2 -18 q8 -8 2 -16" stroke="#6E5B48" stroke-width="4" opacity=".7"/>
              <path class="vig-humo" d="M40 82 q-8 -8 -2 -18" stroke="#6E5B48" stroke-width="3.5" opacity=".5"/>
              <!-- triángulo de emergencia -->
              <path d="M262 150 l13 -24 13 24 Z" fill="#B26A54" stroke-width="3"/>
              <path d="M268 146 l7 -13 7 13 Z" fill="#F3ECDA" stroke-width="2"/>
              <text x="160" y="30" text-anchor="middle" font-family="Caveat, cursive" font-size="18" fill="#6E5B48" stroke="none" transform="rotate(-2 160 30)">in memoriam: la avería</text>
            </svg>
            <figcaption>‹‹ CAPTION BMW — EDITAR ›› (el BMW azul: elegante hasta para averiarse)</figcaption>
          </figure>

        </div>
      </div>`;

    /* ============ INTERLUDIO REAL (en otra parte de la página) ============ */
    const reina = document.createElement('section');
    reina.className = 'escena-abierta vig-reina will-reveal';
    reina.innerHTML = `
      <div class="escena-titulo">interludio real, basado en hechos reales</div>
      <svg class="vig-reina-svg" viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <!-- banderines -->
        <path d="M40 26 Q340 60 640 26" stroke="#6E5B48" stroke-width="2.5"/>
        ${[90,190,290,390,490,590].map((x,i)=>`<path d="M${x} ${38+Math.round(Math.sin((x-40)/600*Math.PI)*16)} l9 20 l9 -21" fill="${['#C98B84','#C9A24B','#8B9A78'][i%3]}" stroke-width="2"/>`).join('')}
        <text x="340" y="88" text-anchor="middle" font-family="Caveat, cursive" font-size="30" fill="#7C3B34" stroke="none" transform="rotate(-2 340 88)">¡SU MAJESTAD BEA!</text>

        <!-- alfombra roja -->
        <path d="M240 292 L440 292 L400 190 L280 190 Z" fill="#7C3B34" stroke-width="2.5"/>
        <path d="M258 292 L422 292 L388 200 L292 200 Z" fill="#96524a" stroke="none"/>

        <!-- trono + Bea -->
        <g id="vigTrono">
          <path d="M296 196 v-74 q0 -16 14 -16 q10 0 12 10 q4 -12 18 -12 q14 0 18 12 q2 -10 12 -10 q14 0 14 16 v74 Z" fill="#C9A24B" opacity=".9"/>
          <rect x="288" y="188" width="104" height="14" rx="5" fill="#B26A54"/>
          <rect x="304" y="140" width="72" height="50" rx="8" fill="#DDCFB2"/>
          <!-- Bea -->
          <circle cx="340" cy="120" r="22" fill="#E8C9A0"/>
          <path d="M322 108 q18 -16 36 0 l2 16 q-4 -4 -6 -2 q-16 -10 -28 0 q-2 -2 -6 2 Z" fill="#6E5B48"/>
          <path d="M331 118 q3 -4 6 0 M343 118 q3 -4 6 0" stroke-width="2.5"/>
          <path d="M333 128 q7 6 14 0" stroke-width="2.5"/>
          <g id="vigCorona">
            <path d="M322 96 l4 -16 8 10 6 -14 6 14 8 -10 4 16 Z" fill="#C9A24B" stroke-width="2.5"/>
            <circle cx="340" cy="78" r="2.5" fill="#C98B84" stroke-width="2"/>
          </g>
          <path d="M318 186 q0 -34 22 -34 q22 0 22 34" fill="#C98B84"/>
          <path d="M362 166 q14 -4 18 -14" stroke-width="5" stroke="#E8C9A0"/>
        </g>

        <!-- familia: reverencia, bandeja y abanico de palma -->
        <g id="vigFan1">
          <g id="vigReverencia">
            <circle cx="176" cy="196" r="16" fill="#E8C9A0"/>
            <path d="M170 192 q3 -3 6 0 M180 192 q3 -3 6 0" stroke-width="2"/>
            <path d="M162 258 q-2 -30 14 -46" stroke-width="7" stroke="#5F7355"/>
            <path d="M176 212 q18 10 30 2" stroke-width="5" stroke="#E8C9A0"/>
          </g>
          <text x="150" y="242" font-family="Caveat, cursive" font-size="17" fill="#6E5B48" stroke="none" transform="rotate(-4 150 242)">majestad…</text>
        </g>
        <g id="vigBandeja">
          <circle cx="92" cy="188" r="15" fill="#E8C9A0"/>
          <path d="M86 184 q3 -3 6 0 M96 184 q3 -3 6 0 M87 193 q5 4 10 0" stroke-width="2"/>
          <path d="M80 256 q0 -28 12 -40" stroke-width="7" stroke="#B26A54"/>
          <path d="M96 210 q14 -18 22 -34" stroke-width="4.5" stroke="#E8C9A0"/>
          <g id="vigBandejaTop">
            <ellipse cx="122" cy="170" rx="26" ry="6" fill="#DDCFB2" stroke-width="2.5"/>
            <path d="M106 166 a16 10 0 0 1 32 0" fill="#E8D98F" stroke-width="2.5"/>
            <path class="vig-vapor" d="M122 150 q-4 -8 0 -14" stroke="#DDCFB2" stroke-width="3"/>
          </g>
        </g>
        <g id="vigAbanico">
          <circle cx="516" cy="192" r="16" fill="#E8C9A0"/>
          <path d="M510 188 q3 -3 6 0 M520 188 q3 -3 6 0 M511 197 q5 4 10 0" stroke-width="2"/>
          <path d="M524 258 q0 -30 -8 -50" stroke-width="7" stroke="#8B9A78"/>
          <g id="vigPalma">
            <path d="M500 190 L462 148" stroke-width="4"/>
            <path d="M462 148 q-20 -4 -26 -22 q16 2 26 10 q-6 -16 2 -30 q8 12 8 26 q10 -12 26 -12 q-8 16 -22 20 q14 4 18 18 q-18 2 -32 -10 Z" fill="#8B9A78" stroke-width="2.5"/>
          </g>
        </g>
        <!-- fotógrafo oficial de la casa real -->
        <g id="vigFoto">
          <circle cx="590" cy="200" r="15" fill="#E8C9A0"/>
          <path d="M596 254 q0 -26 -6 -39" stroke-width="7" stroke="#6E5B48"/>
          <rect x="566" y="192" width="20" height="14" rx="3" fill="#4A3B2C"/>
          <circle cx="576" cy="199" r="4" fill="#DDCFB2" stroke-width="2"/>
          <circle class="vig-flash" cx="562" cy="188" r="6" fill="#F7F1E1" stroke="none" opacity="0"/>
        </g>
      </svg>
      <div class="escena-caption">‹‹ CAPTION REALEZA — EDITAR ›› (la familia de Carlos recibiendo a Bea con la discreción que les caracteriza)</div>`;
    const historia = document.querySelector('.d-historia');
    if (historia) historia.before(reina); else section.appendChild(reina);
    sembrarDestellos(reina, 8);

    /* ---------- olas del mar (tres capas) ---------- */
    const mar = document.getElementById('vigMar');
    const olas = [
      { y: 48, o: .5, c: '#9BBAC0', dur: 9 },
      { y: 62, o: .7, c: '#7FA6AD', dur: 7 },
      { y: 76, o: .9, c: '#5F8B94', dur: 5.4 },
    ];
    olas.forEach((o, i) => {
      const div = document.createElement('div');
      div.className = 'vig-ola';
      div.style.bottom = '0';
      div.style.zIndex = i + 1;
      div.innerHTML = `
        <svg viewBox="0 0 900 ${o.y + 60}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="${o.c}" opacity="${o.o}"
            d="M0,40 Q75,${40 - 22} 150,40 T300,40 T450,40 T600,40 T750,40 T900,40 L900,${o.y + 60} L0,${o.y + 60} Z"/>
        </svg>`;
      div.style.height = (o.y + 40) + 'px';
      mar.appendChild(div);
    });

    if (reduced || !App.hasGsap) return;

    /* olas */
    section.querySelectorAll('.vig-ola').forEach((el, i) => {
      gsap.to(el, { x: i % 2 ? 40 : -40, duration: olas[i].dur, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(el, { y: -6 - i * 3, duration: 3 + i, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    /* gaviota con su bocadillo */
    gsap.to('#vigGaviota', {
      x: () => mar.clientWidth * 1.3, y: -30, duration: 11, repeat: -1,
      ease: 'none', delay: 1,
      onRepeat(){ gsap.set('#vigGaviota', { y: Math.random() * 40 }); },
    });
    gsap.to('#vigAla', { attr: { d: 'M40 28 Q48 40 66 38' }, duration: .4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    /* pulpo saluda */
    gsap.to('#vigTent3', { attr: { d: 'M72 64 Q84 80 98 78 Q106 76 104 68' }, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.vig-pulpo', { y: 6, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    /* catástrofe 1: el barco se mueve MUCHO */
    gsap.to('#vigBarco', { rotation: 7, y: -8, svgOrigin: '160 130', duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('#vigOlaCat1', { x: -26, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('#vigOlaCat2', { x: 22, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    /* catástrofe 2: humo del BMW + temblor del motor */
    section.querySelectorAll('.vig-humo').forEach((h, i) => {
      gsap.to(h, { y: -14, opacity: .1, duration: 1.6 + i * .4, repeat: -1, ease: 'power1.out' });
    });
    gsap.to('#vigBmw', { x: 1.5, duration: .08, repeat: -1, yoyo: true, ease: 'none' });

    /* interludio real: reverencias, abanico, bandeja y flashes */
    gsap.to('#vigReverencia', { rotation: 16, svgOrigin: '166 250', duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('#vigPalma', { rotation: 14, svgOrigin: '500 190', duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('#vigBandejaTop', { y: -5, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('#vigCorona', { y: -3, rotation: 2, svgOrigin: '340 88', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.vig-flash', { opacity: .9, duration: .1, repeat: -1, repeatDelay: 2.8, yoyo: true });
    gsap.to('.vig-vapor', { y: -6, opacity: .2, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },

  /* ambiente: la gaviota fugada y nubecillas cruzan toda la página */
  ambient(layer, reduced){
    if (reduced) return;
    const gaviota = `
      <svg viewBox="0 0 110 70" fill="none" stroke="#6E5B48" stroke-width="3" stroke-linecap="round">
        <path d="M10 34 Q26 20 42 30 Q40 18 52 14 Q66 10 76 20 Q68 20 64 25 L78 30 Q64 44 46 40 Q26 38 10 34 Z" fill="#F3ECDA"/>
        <circle cx="58" cy="20" r="1.6" fill="#6E5B48" stroke="none"/>
        <g transform="translate(70,34) rotate(10)">${VIG_BOCADILLO}</g>
      </svg>`;
    const nube = `<svg viewBox="0 0 80 44" fill="#F3ECDA" opacity=".9"><path d="M16 34 Q4 34 6 25 Q8 17 17 18 Q19 8 30 8 Q40 8 43 16 Q54 12 58 21 Q68 20 68 28 Q68 34 58 34 Z"/></svg>`;
    App.ambienteCruzar(layer, gaviota, { w: 64, op: .8, dur: 18, yMax: 45 });
    App.ambienteCruzar(layer, nube, { w: 90, op: .5, dur: 42, yMax: 30, vaiven: 8 });
    App.ambienteCruzar(layer, nube, { w: 56, op: .35, dur: 34, yMin: 30, yMax: 60, vaiven: 6, esperaMax: 16 });
  },
};
