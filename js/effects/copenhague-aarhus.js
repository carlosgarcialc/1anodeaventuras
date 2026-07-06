/* ============================================================
   Copenhague–Aarhus — el enfado (nubarrón → arcoíris)
   + patinaje sobre hielo con estela tallada. Rollo hygge.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .cph-escena{ max-width:720px; margin:0 auto; padding:0 20px; }
        .cph-enfado{
          position:relative; background:var(--paper-light); background-image:var(--noise);
          border-radius:6px; box-shadow:var(--shadow-soft); padding:30px 20px 26px;
          text-align:center; overflow:hidden; transform:rotate(-.5deg);
        }
        .cph-enfado h3, .cph-hielo-tit{ font-family:var(--font-display); font-size:1.5rem; margin:0 0 .3em; }
        .cph-enfado .sub{ font-family:var(--font-hand); font-size:1.3rem; color:var(--ink-soft); }
        .cph-nube{ width:min(240px,60%); margin:12px auto 0; position:relative; }
        .cph-rayo{ opacity:0; }
        .cph-lluvia line{ stroke:#9BBAC0; stroke-width:2.5; stroke-linecap:round; }
        .cph-arcoiris{ opacity:0; }
        .cph-bocadillos{
          display:flex; justify-content:space-between; gap:10px; max-width:460px; margin:18px auto 0;
        }
        .cph-boca{
          position:relative; background:#F7F1E1; border:2px solid var(--ink-soft);
          border-radius:14px; padding:.5em .9em; font-family:var(--font-hand);
          font-size:1.2rem; max-width:46%; box-shadow:var(--shadow-soft);
        }
        .cph-boca::after{
          content:""; position:absolute; bottom:-10px; width:14px; height:14px;
          background:#F7F1E1; border-right:2px solid var(--ink-soft); border-bottom:2px solid var(--ink-soft);
          transform:rotate(45deg);
        }
        .cph-boca.a{ transform:rotate(-2deg); } .cph-boca.a::after{ left:24px; }
        .cph-boca.b{ transform:rotate(2deg); align-self:flex-end; } .cph-boca.b::after{ right:24px; }
        .cph-hielo{
          position:relative; margin-top:34px; text-align:center;
        }
        .cph-pista{
          border-radius:50% / 38%;
          background:
            radial-gradient(80% 70% at 50% 36%, #E9F0F0, #BFD3D6 70%, #9BBAC0);
          box-shadow:inset 0 6px 20px rgba(74,59,44,.14), var(--shadow-soft);
          overflow:hidden; position:relative;
        }
        .cph-pista svg{ width:100%; display:block; }
        .cph-velas{
          display:flex; justify-content:center; gap:18px; margin-top:20px; align-items:flex-end;
        }
        .cph-vela{ width:26px; }
        .cph-llama{ transform-origin:50% 90%; }
        @keyframes vela{ 0%,100%{ transform:scale(1) rotate(-2deg);} 50%{ transform:scale(1.12) rotate(3deg);} }
        .cph-llama{ animation:vela 1.6s ease-in-out infinite; }
        html.no-motion .cph-llama{ animation:none; }
        .cph-hygge{ font-family:var(--font-hand); font-size:1.35rem; color:var(--ink-soft); margin-top:8px; }
      </style>

      <div class="cph-escena">
        <div class="cph-enfado will-reveal" id="cphEnfado">
          <h3>Parte meteorológico del viaje</h3>
          <div class="sub">hubo un (1) frente borrascoso. escampó.</div>

          <div class="cph-nube">
            <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
              <g class="cph-arcoiris" id="cphArcoiris">
                <path d="M30 128 A70 70 0 0 1 170 128" fill="none" stroke="#C98B84" stroke-width="8"/>
                <path d="M42 128 A58 58 0 0 1 158 128" fill="none" stroke="#C9A24B" stroke-width="8"/>
                <path d="M54 128 A46 46 0 0 1 146 128" fill="none" stroke="#8B9A78" stroke-width="8"/>
                <path d="M66 128 A34 34 0 0 1 134 128" fill="none" stroke="#9BBAC0" stroke-width="8"/>
              </g>
              <g id="cphNube">
                <path d="M50 78 Q28 78 30 60 Q32 44 50 46 Q54 26 78 26 Q98 26 104 42 Q124 34 132 50 Q152 48 152 64 Q152 78 132 78 Z"
                  fill="#6E5B48" stroke="#4A3B2C" stroke-width="3"/>
                <path class="cph-rayo" id="cphRayo" d="M92 82 L82 102 L94 100 L84 124" fill="none" stroke="#C9A24B" stroke-width="4" stroke-linecap="round"/>
                <g class="cph-lluvia" id="cphLluvia">
                  <line x1="60" y1="86" x2="56" y2="98"/><line x1="78" y1="88" x2="74" y2="100"/>
                  <line x1="112" y1="86" x2="108" y2="98"/><line x1="130" y1="84" x2="126" y2="96"/>
                </g>
              </g>
            </svg>
          </div>

          <div class="cph-bocadillos">
            <div class="cph-boca a">‹‹ TU VERSIÓN — EDITAR ››</div>
            <div class="cph-boca b">‹‹ SU VERSIÓN — EDITAR ››</div>
          </div>
          <div class="cph-hygge">moraleja: ‹‹ MORALEJA — EDITAR ››</div>
        </div>

        <div class="cph-hielo will-reveal">
          <h3 class="cph-hielo-tit">Y luego, hielo (del bueno)</h3>
          <div class="cph-pista">
            <svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
              <path id="cphTrazo1" d="M80,180 C160,80 240,220 320,140 C380,80 440,120 500,90"
                fill="none" stroke="#F7F1E1" stroke-width="3.5" stroke-dasharray="6 8" stroke-linecap="round" opacity=".9"/>
              <path id="cphTrazo2" d="M110,90 C200,190 300,60 400,180 C450,236 500,200 530,160"
                fill="none" stroke="#DDE9EA" stroke-width="3" stroke-dasharray="4 9" stroke-linecap="round" opacity=".8"/>
              <g id="cphSk1">
                <circle cx="0" cy="-26" r="8" fill="#4A3B2C"/>
                <path d="M0 -18 C6 -10 6 2 2 10 L-2 10 C-6 2 -6 -10 0 -18 Z" fill="#B26A54"/>
                <path d="M-1 10 L-6 22 M1 10 L8 18 M8 18 l6 2" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round" fill="none"/>
              </g>
              <g id="cphSk2">
                <circle cx="0" cy="-24" r="7" fill="#4A3B2C"/>
                <path d="M0 -17 C5 -9 5 1 2 9 L-2 9 C-5 1 -5 -9 0 -17 Z" fill="#5F7355"/>
                <path d="M-1 9 L-7 20 M1 9 L7 20" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round" fill="none"/>
              </g>
              <g transform="translate(546,196)">
                <path d="M0 0 q10 -18 2 -34 q14 8 12 26 q16 -6 18 -20 q6 22 -12 32 q-8 4 -20 -4 Z" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="2"/>
                <circle cx="6" cy="-40" r="7" fill="#C98B84" stroke="#4A3B2C" stroke-width="2"/>
              </g>
              <text x="562" y="246" text-anchor="middle" font-family="Caveat, cursive" font-size="17" fill="#4A3B2C">hola, Sirenita</text>
            </svg>
          </div>

          <div class="cph-velas" aria-hidden="true">
            ${[0, 1, 2].map(i => `
              <svg class="cph-vela" viewBox="0 0 26 54" xmlns="http://www.w3.org/2000/svg" style="width:${22 + i * 5}px">
                <rect x="6" y="20" width="14" height="30" rx="3" fill="#F3ECDA" stroke="#6E5B48" stroke-width="2"/>
                <path class="cph-llama" style="animation-delay:${i * .4}s" d="M13 4 Q18 12 13 18 Q8 12 13 4 Z" fill="#C9A24B" stroke="#B26A54" stroke-width="1.5"/>
              </svg>`).join('')}
          </div>
          <div class="cph-hygge">esto, señoras y señores, es hygge</div>
        </div>
      </div>`;

    if (reduced || !App.hasGsap || typeof ScrollTrigger === 'undefined'){
      /* sin animación: mostrar directamente el final feliz */
      section.querySelector('#cphArcoiris').style.opacity = .9;
      section.querySelector('#cphNube').style.opacity = .25;
      return;
    }

    /* tormenta → escampa → arcoíris, dirigido por el scroll */
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#cphEnfado', start: 'top 70%' },
    });
    tl.to('#cphRayo', { opacity: 1, duration: .12, repeat: 3, yoyo: true, repeatDelay: .5 })
      .to('#cphLluvia line', { y: 10, opacity: 0, duration: .5, stagger: .1, repeat: 2, ease: 'power1.in' }, 0)
      .to('#cphNube', { opacity: .22, scale: .92, transformOrigin: 'center', duration: 1.1, ease: 'power2.out' }, '+=.4')
      .to('#cphArcoiris', { opacity: .95, duration: 1.2, ease: 'power2.out' }, '+=.3');
    /* el arcoíris se "dibuja" arco a arco (dashoffset manual) */
    section.querySelectorAll('#cphArcoiris path').forEach((p, i) => {
      const L = p.getTotalLength();
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      gsap.to(p, { strokeDashoffset: 0, duration: 1.1, delay: .1 * i, ease: 'power2.out',
        scrollTrigger: { trigger: '#cphEnfado', start: 'top 55%' } });
    });

    /* patinadores: recorren su trazo mientras este se dibuja */
    [['#cphTrazo1', '#cphSk1', 14], ['#cphTrazo2', '#cphSk2', 18]].forEach(([trazo, sk, dur]) => {
      const p = section.querySelector(trazo);
      const L = p.getTotalLength();
      p.style.strokeDasharray = `6 8`;
      gsap.to(section.querySelector(sk), {
        motionPath: { path: p, align: p, alignOrigin: [.5, .82], autoRotate: 90 },
        duration: dur, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    });
  },
};
