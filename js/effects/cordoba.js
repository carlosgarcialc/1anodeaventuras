/* ============================================================
   Córdoba — calor extremo
   Heat-haze (aire ondulante con feTurbulence), termómetro que
   sube con el scroll, sol que palpita y patio con flores.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .cor-escena{
          position:relative; max-width:720px; margin:0 auto; padding:0 20px;
          display:grid; grid-template-columns:84px 1fr; gap:16px; align-items:stretch;
        }
        .cor-patio{
          position:relative; overflow:hidden; border-radius:6px; box-shadow:var(--shadow-soft);
          background:linear-gradient(180deg, #E8C06B 0%, #E0A860 45%, #F3ECDA 46%, #EAE0CA 100%);
          min-height:340px;
        }
        .cor-haze{ position:absolute; inset:0; }
        .cor-sol{
          position:absolute; top:22px; right:26px; width:74px; height:74px; border-radius:50%;
          background:radial-gradient(circle, #F7F1E1, #C9A24B 62%, transparent 72%);
        }
        .cor-caption{
          position:absolute; bottom:10px; left:0; right:0; text-align:center;
          font-family:var(--font-hand); font-size:1.3rem; color:#4A3B2C;
        }
        .cor-termo{
          background:var(--paper-light); border-radius:40px; box-shadow:var(--shadow-soft);
          display:flex; flex-direction:column; align-items:center; padding:14px 0 10px; position:relative;
        }
        .cor-termo .tubo{
          width:14px; flex:1; background:#F7F1E1; border:2px solid var(--ink-soft);
          border-radius:8px; position:relative; overflow:hidden; margin-bottom:6px;
        }
        .cor-termo .mercurio{
          position:absolute; bottom:0; left:0; right:0; height:18%;
          background:linear-gradient(180deg, #C9A24B, #B26A54, #7C3B34);
        }
        .cor-termo .bulbo{
          width:34px; height:34px; border-radius:50%; margin-top:-14px;
          background:radial-gradient(circle at 35% 32%, #a3564a, #7C3B34);
          border:2px solid var(--ink-soft); z-index:2;
        }
        .cor-termo .grados{
          font-family:var(--font-hand); font-size:1.5rem; color:#7C3B34; padding-top:6px;
        }
        .cor-ducha{ text-align:center; margin-top:44px; }
        .cor-ducha-svg{ width:min(420px,86%); margin:8px auto 0; display:block;
          border-radius:8px; box-shadow:var(--shadow-soft); }
      </style>

      <div class="cor-escena will-reveal" id="corEscena">
        <div class="cor-termo">
          <div class="tubo"><div class="mercurio" id="corMercurio"></div></div>
          <div class="bulbo"></div>
          <div class="grados"><span id="corGrados">28</span>°</div>
        </div>

        <div class="cor-patio">
          <svg class="cor-haze" viewBox="0 0 400 340" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="corHazeF"><feTurbulence id="corTurb" type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="3"/>
                <feDisplacementMap in="SourceGraphic" scale="7"/></filter>
            </defs>
            <g filter="url(#corHazeF)">
              <path d="M0,156 h400" stroke="#B26A54" stroke-width="3" opacity=".5"/>
              <path d="M60,156 v-96 a40 40 0 0 1 80 0 v96 M260,156 v-96 a40 40 0 0 1 80 0 v96"
                fill="#F7F1E1" stroke="#B26A54" stroke-width="4"/>
              <path d="M70,110 h60 M270,110 h60" stroke="#B26A54" stroke-width="2.5" opacity=".5"/>
              <path d="M180,156 v-70 h40 v70" fill="#6E5B48" opacity=".85"/>
              <g stroke="#4A3B2C" stroke-width="2">
                <rect x="30" y="190" width="26" height="30" rx="4" fill="#B26A54"/>
                <circle cx="43" cy="184" r="12" fill="#C98B84"/>
                <rect x="344" y="196" width="26" height="30" rx="4" fill="#B26A54"/>
                <circle cx="357" cy="190" r="12" fill="#C98B84"/>
                <rect x="120" y="240" width="30" height="34" rx="4" fill="#B26A54"/>
                <circle cx="135" cy="232" r="14" fill="#7C3B34"/>
                <rect x="250" y="244" width="30" height="34" rx="4" fill="#B26A54"/>
                <circle cx="265" cy="236" r="14" fill="#C98B84"/>
              </g>
              <path d="M195,300 q10 -8 20 0" stroke="#9BBAC0" stroke-width="3" fill="none"/>
            </g>
          </svg>
          <div class="cor-sol" id="corSol"></div>
          <div class="cor-caption">el patio: 10/10 · la temperatura: denunciable</div>
        </div>
      </div>

      <!-- ============ BONUS TRACK: LA DUCHA-PISCINA ============ -->
      <div class="escena-abierta cor-ducha will-reveal" id="corDucha">
        <div class="escena-titulo">${TXT('duchaTitulo')}</div>
        <svg class="cor-ducha-svg" viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
          <!-- pared de azulejos -->
          <rect width="420" height="320" fill="#DCE7E4" stroke="none"/>
          <g stroke="#BFD3D6" stroke-width="2">
            ${[40,80,120,160,200,240,280].map(y=>`<path d="M0 ${y} h420"/>`).join('')}
            ${[60,120,180,240,300,360].map(x=>`<path d="M${x} 0 v320"/>`).join('')}
          </g>
          <!-- tubería y alcachofa -->
          <path d="M40 0 v46 q0 16 22 18 l28 3" stroke-width="6" stroke="#6E5B48"/>
          <g transform="rotate(12 108 70)">
            <rect x="86" y="58" width="46" height="18" rx="8" fill="#DDCFB2" stroke-width="3"/>
            <path d="M94 76 v5 M104 76 v5 M114 76 v5 M124 76 v5" stroke-width="2.5" stroke="#6E5B48"/>
          </g>
          <!-- chorro infinito -->
          <g stroke="#7FA6AD" stroke-width="3">
            <line class="cor-gota" x1="96"  y1="88" x2="93"  y2="106"/>
            <line class="cor-gota" x1="108" y1="90" x2="106" y2="108"/>
            <line class="cor-gota" x1="120" y1="92" x2="119" y2="110"/>
            <line class="cor-gota" x1="130" y1="90" x2="130" y2="106"/>
          </g>
          <!-- desagüe en huelga -->
          <ellipse cx="330" cy="306" rx="16" ry="5" fill="#9BBAC0" stroke-width="2.5" stroke="#6E5B48"/>
          <text x="330" y="292" text-anchor="middle" font-family="Caveat, cursive" font-size="15" fill="#4A3B2C" stroke="none">el desagüe, dimitiendo</text>
          <!-- el agua sube (grupo entero con el scroll) -->
          <g id="corAguaG">
            <path d="M0 236 Q35 224 70 236 T140 236 T210 236 T280 236 T350 236 T420 236 L420 340 L0 340 Z" fill="#9BBAC0" opacity=".85" stroke="none"/>
            <path d="M0 236 Q35 224 70 236 T140 236 T210 236 T280 236 T350 236 T420 236" stroke="#F3ECDA" stroke-width="2.5" opacity=".8"/>
            <!-- patito de goma, muy profesional -->
            <g id="corPato" transform="translate(150,208)">
              <ellipse cx="0" cy="10" rx="20" ry="13" fill="#E8D98F" stroke-width="2.5"/>
              <circle cx="15" cy="-6" r="10" fill="#E8D98F" stroke-width="2.5"/>
              <path d="M24 -6 l10 3 -10 4" fill="#B26A54" stroke-width="2"/>
              <circle cx="17" cy="-8" r="1.5" fill="#4A3B2C" stroke="none"/>
              <path d="M-16 6 q-6 -8 2 -12" stroke-width="2.5"/>
            </g>
            <!-- chancla a la deriva -->
            <g transform="translate(280,226) rotate(8)">
              <ellipse cx="0" cy="0" rx="17" ry="8" fill="#C98B84" stroke-width="2.5"/>
              <path d="M-8 -4 q8 6 14 2" stroke-width="2"/>
            </g>
          </g>
        </svg>
        <div class="escena-caption">${TXT('duchaCaption')}</div>
      </div>`;

    /* ===== escena sesión de fotos en la Mezquita (va TRAS el carrete) ===== */
    (function(){
      const esc = document.createElement('section');
      esc.className = 'escena-abierta will-reveal';
      esc.innerHTML = `
        <div class="escena-titulo">${TXT('fotosTitulo')}</div>
        <div class="escena-figuras">
          <svg viewBox="0 0 460 244" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <!-- arcos de la Mezquita (dovelas rojas y blancas) -->
            <g>
              <rect x="26" y="124" width="10" height="94" fill="#F3ECDA"/>
              <rect x="146" y="124" width="10" height="94" fill="#F3ECDA"/>
              <rect x="266" y="124" width="10" height="94" fill="#F3ECDA"/>
              <rect x="386" y="124" width="10" height="94" fill="#F3ECDA"/>
              <path d="M31 126 A60 60 0 0 1 151 126" fill="none" stroke="#B26A54" stroke-width="12"/>
              <path d="M31 126 A60 60 0 0 1 151 126" fill="none" stroke="#F3ECDA" stroke-width="12" stroke-dasharray="15 15"/>
              <path d="M151 126 A60 60 0 0 1 271 126" fill="none" stroke="#B26A54" stroke-width="12"/>
              <path d="M151 126 A60 60 0 0 1 271 126" fill="none" stroke="#F3ECDA" stroke-width="12" stroke-dasharray="15 15"/>
              <path d="M271 126 A60 60 0 0 1 391 126" fill="none" stroke="#B26A54" stroke-width="12"/>
              <path d="M271 126 A60 60 0 0 1 391 126" fill="none" stroke="#F3ECDA" stroke-width="12" stroke-dasharray="15 15"/>
              <path d="M0 218 h460" stroke="#B26A54" stroke-width="3"/>
            </g>

            <!-- ELLA (chica de pelo largo castaño, posando) -->
            <g>
              <path d="M156 218 q0 -42 24 -42 q24 0 24 42" fill="#C98B84"/>
              <path d="M158 192 Q147 198 151 208" stroke="#C98B84" stroke-width="7"/>
              <path d="M202 190 Q214 178 210 164" stroke="#C98B84" stroke-width="7"/>
              ${CARAS.chica(180, 154, 1)}
              <path d="M172 155 q3 -4 6 0 M184 155 q3 -4 6 0" stroke-width="2.2"/>
              <path d="M176 164 q4 3 8 0" stroke-width="2.2"/>
            </g>

            <!-- ÉL (chico de pelo castaño, con la cámara) -->
            <g>
              <path d="M320 218 q0 -40 24 -40 q24 0 24 40" fill="#5F7355"/>
              ${CARAS.chico(344, 150, 1)}
              <path d="M337 151 q3 -4 6 0 M349 151 q3 -4 6 0" stroke-width="2.2"/>
              <path d="M340 190 L312 178 M348 190 L316 184" stroke="#5F7355" stroke-width="6"/>
              <rect x="292" y="166" width="24" height="17" rx="3" fill="#4A3B2C" stroke="#4A3B2C"/>
              <circle cx="304" cy="174" r="4.5" fill="#9BBAC0" stroke="#F3ECDA" stroke-width="1.6"/>
              <rect x="309" y="160" width="6" height="5" rx="1" fill="#4A3B2C"/>
              <path d="M300 156 l-4 -6 M308 154 l0 -7 M316 156 l4 -6" stroke="#C9A24B" stroke-width="2"/>
            </g>
          </svg>
          <div class="escena-boca" style="left:2%;top:-6px;--tail:80%">${TXT('fotosElla')}<small>${TXT('fotosEllaSub')}</small></div>
          <div class="escena-boca" style="right:2%;top:15%;--tail:24%">${TXT('fotosEl')}<small>${TXT('fotosElSub')}</small></div>
        </div>
        <div class="escena-caption">${TXT('fotosCaption')}</div>`;
      const hist = document.querySelector('.d-historia');
      if (hist) hist.before(esc); else section.appendChild(esc);
      sembrarDestellos(esc, 4);
    })();

    /* la ducha se va detrás de la historia: nunca dos escenas seguidas */
    (function(){
      const ducha = section.querySelector('#corDucha');
      const notaEl = document.querySelector('.d-nota');
      if (ducha && notaEl) notaEl.before(ducha);
    })();

    const merc = document.getElementById('corMercurio');
    const grados = document.getElementById('corGrados');

    if (reduced || !App.hasGsap || typeof ScrollTrigger === 'undefined'){
      merc.style.height = '86%'; grados.textContent = '47';
      const agua = section.querySelector('#corAguaG');
      if (agua) agua.setAttribute('transform', 'translate(0,-40)');
      return;
    }

    /* mercurio y contador suben con el scroll */
    const st = { trigger: '#corEscena', start: 'top 80%', end: 'bottom 45%', scrub: .8 };
    gsap.to(merc, { height: '88%', ease: 'none', scrollTrigger: st });
    const cnt = { v: 28 };
    gsap.to(cnt, { v: 47, ease: 'none', scrollTrigger: st,
      onUpdate: () => grados.textContent = Math.round(cnt.v) });

    /* sol que palpita */
    gsap.to('#corSol', { scale: 1.12, opacity: .85, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    /* aire ondulante: animamos la turbulencia */
    const turb = document.getElementById('corTurb');
    let t = 0;
    (function ondear(){
      if (!turb.isConnected) return;
      t += .004;
      turb.setAttribute('baseFrequency', `${0.012 + Math.sin(t) * 0.004} ${0.06 + Math.cos(t * .8) * 0.012}`);
      requestAnimationFrame(ondear);
    })();

    /* la ducha: gotas cayendo sin parar y el agua subiendo con el scroll */
    section.querySelectorAll('.cor-gota').forEach((g, i) => {
      gsap.fromTo(g, { y: 0, opacity: 1 }, {
        y: 130, opacity: 0, duration: .7 + i * .12, repeat: -1,
        ease: 'power1.in', delay: i * .18,
      });
    });
    gsap.fromTo('#corAguaG', { y: 60 }, {
      y: -55, ease: 'none',
      scrollTrigger: { trigger: '#corDucha', start: 'top 80%', end: 'bottom 45%', scrub: .8 },
    });
    gsap.to('#corPato', { y: '-=6', rotation: 5, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },

  /* ambiente: pétalos de los patios y alguna pompa de la ducha */
  ambient(layer, reduced){
    if (reduced) return;
    const petalo = c => `<svg viewBox="0 0 20 26"><path d="M10 2 Q19 10 14 21 Q10 26 6 21 Q1 10 10 2 Z" fill="${c}" stroke="#4A3B2C" stroke-width="1.6" opacity=".85"/></svg>`;
    const pompa = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#9BBAC0" stroke-width="2" opacity=".8"/><path d="M7 9 q2 -3 5 -3" stroke="#F3ECDA" stroke-width="2" fill="none"/></svg>`;
    App.ambienteCaer(layer, petalo('#C98B84'), { w: 17, op: .85, dur: 13, giro: 60 });
    App.ambienteCaer(layer, petalo('#B26A54'), { w: 14, op: .75, dur: 17, giro: 80, esperaMax: 12 });
    App.ambienteCaer(layer, petalo('#7C3B34'), { w: 12, op: .65, dur: 21, giro: 50, esperaMax: 16 });
    App.ambienteFlotar(layer, pompa, { w: 20, op: .55, dur: 16, esperaMax: 14 });
  },
};
