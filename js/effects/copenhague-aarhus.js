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
            <svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <!-- estelas talladas en el hielo (decoración) -->
              <path d="M70 150 C150 118 230 182 320 152 C390 128 460 158 540 132"
                stroke="#F7F1E1" stroke-width="3" stroke-dasharray="5 9" opacity=".85"/>
              <path d="M540 198 C450 172 360 224 260 196 C190 176 120 210 60 190"
                stroke="#DDE9EA" stroke-width="2.5" stroke-dasharray="4 9" opacity=".8"/>
              <!-- guías de deslizamiento (invisibles) -->
              <path id="cphGlide1" d="M70 152 Q200 122 330 152 T560 148" fill="none" stroke="none"/>
              <path id="cphGlide2" d="M540 196 Q400 222 260 196 T60 194" fill="none" stroke="none"/>

              <!-- patinador 1 -->
              <g id="cphSk1"><g class="cph-lean">
                <path d="M0 6 L-6 22" stroke="#4A3B2C" stroke-width="3.5"/>
                <path d="M-11 24 L0 24" stroke="#9BBAC0" stroke-width="3"/>
                <path d="M0 6 L11 15" stroke="#4A3B2C" stroke-width="3.5"/>
                <path d="M-13 26 L-2 26" stroke="#9BBAC0" stroke-width="2" opacity=".5"/>
                <path d="M-6 -13 Q0 -17 6 -13 L4 7 Q0 9 -4 7 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2"/>
                <path d="M-4 -8 L-17 -13 M4 -8 L16 -3" stroke="#B26A54" stroke-width="4"/>
                <path d="M-5 -11 L7 -9 M6 -10 l2 9" stroke="#C9A24B" stroke-width="2.6"/>
                <circle cx="0" cy="-20" r="6" fill="#E8C9A0" stroke="#4A3B2C" stroke-width="2"/>
                <path d="M-6 -22 Q0 -31 6 -22 Z" fill="#7C3B34" stroke="#4A3B2C" stroke-width="2"/>
                <circle cx="0" cy="-31" r="2.2" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="1.4"/>
              </g></g>

              <!-- patinador 2 -->
              <g id="cphSk2"><g class="cph-lean">
                <path d="M0 6 L6 22" stroke="#4A3B2C" stroke-width="3.5"/>
                <path d="M0 24 L11 24" stroke="#9BBAC0" stroke-width="3"/>
                <path d="M0 6 L-11 15" stroke="#4A3B2C" stroke-width="3.5"/>
                <path d="M-6 -13 Q0 -17 6 -13 L4 7 Q0 9 -4 7 Z" fill="#5F7355" stroke="#4A3B2C" stroke-width="2"/>
                <path d="M4 -8 L17 -13 M-4 -8 L-16 -3" stroke="#5F7355" stroke-width="4"/>
                <path d="M5 -11 L-7 -9 M-6 -10 l-2 9" stroke="#C98B84" stroke-width="2.6"/>
                <circle cx="0" cy="-20" r="6" fill="#E8C9A0" stroke="#4A3B2C" stroke-width="2"/>
                <path d="M-6 -21 Q0 -27 6 -21 L4 -22 Q0 -25 -4 -22 Z" fill="#8a6a4d" stroke="#4A3B2C" stroke-width="1.6"/>
                <path d="M-5 -19 Q-7 -8 -5 0 M5 -19 Q7 -8 5 0" stroke="#8a6a4d" stroke-width="2.4"/>
              </g></g>

              <!-- sirenita en su roca -->
              <g transform="translate(548,198)">
                <path d="M0 0 q10 -18 2 -34 q14 8 12 26 q16 -6 18 -20 q6 22 -12 32 q-8 4 -20 -4 Z" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="2"/>
                <circle cx="6" cy="-40" r="7" fill="#C98B84" stroke="#4A3B2C" stroke-width="2"/>
              </g>
              <text x="560" y="246" text-anchor="middle" font-family="Caveat, cursive" font-size="17" fill="#4A3B2C" stroke="none">hola, Sirenita</text>
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

    /* patinadores: se deslizan por su guía, siempre de pie (con un leve vaivén) */
    [['#cphGlide1', '#cphSk1', 13], ['#cphGlide2', '#cphSk2', 16]].forEach(([guia, sk, dur]) => {
      const g = section.querySelector(guia);
      gsap.to(section.querySelector(sk), {
        motionPath: { path: g, align: g, alignOrigin: [.5, .95] },
        duration: dur, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to(section.querySelector(sk + ' .cph-lean'), {
        rotation: sk.endsWith('1') ? 7 : -7, transformOrigin: '0px 24px',
        duration: dur / 4, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    });
  },

  /* ambiente: nubes nórdicas, algún copo y una taza humeante que cruza */
  ambient(layer, reduced){
    if (reduced) return;
    const nube = `<svg viewBox="0 0 80 44" fill="#F3ECDA" opacity=".9"><path d="M16 34 Q4 34 6 25 Q8 17 17 18 Q19 8 30 8 Q40 8 43 16 Q54 12 58 21 Q68 20 68 28 Q68 34 58 34 Z"/></svg>`;
    const nubarron = `<svg viewBox="0 0 80 44" fill="#6E5B48" opacity=".55"><path d="M16 34 Q4 34 6 25 Q8 17 17 18 Q19 8 30 8 Q40 8 43 16 Q54 12 58 21 Q68 20 68 28 Q68 34 58 34 Z"/></svg>`;
    const taza = `
      <svg viewBox="0 0 48 44" fill="none" stroke="#4A3B2C" stroke-width="2.5" stroke-linecap="round">
        <path d="M8 20 h26 v10 q0 10 -13 10 q-13 0 -13 -10 Z" fill="#C98B84"/>
        <path d="M34 23 q8 0 6 6 q-2 5 -7 3"/>
        <path d="M16 14 q-2 -4 2 -7 M25 14 q-2 -4 2 -7" stroke="#6E5B48" stroke-width="2"/>
      </svg>`;
    const copo = `<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#F7F1E1" opacity=".85"/></svg>`;
    App.ambienteCruzar(layer, nube, { w: 86, op: .55, dur: 38, yMax: 32, vaiven: 8 });
    App.ambienteCruzar(layer, nubarron, { w: 60, op: .45, dur: 30, yMin: 8, yMax: 40, vaiven: 10, esperaMax: 16 });
    App.ambienteCruzar(layer, taza, { w: 34, op: .75, dur: 24, yMin: 40, yMax: 75, esperaMax: 12 });
    App.ambienteCaer(layer, copo, { w: 7, op: .7, dur: 14 });
    App.ambienteCaer(layer, copo, { w: 5, op: .5, dur: 18, esperaMax: 12 });
  },
};
