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
      </div>`;

    const merc = document.getElementById('corMercurio');
    const grados = document.getElementById('corGrados');

    if (reduced || !App.hasGsap || typeof ScrollTrigger === 'undefined'){
      merc.style.height = '86%'; grados.textContent = '47';
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
  },
};
