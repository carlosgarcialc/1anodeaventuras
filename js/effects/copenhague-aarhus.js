/* ============================================================
   Copenhague–Aarhus — el enfado (nubarrón → arcoíris)
   + patinaje sobre hielo con estela tallada. Rollo hygge.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){

    /* --- pingüino patinador (de pie), dibujado a mano --- */
    const PINGUINO = (escala, bufanda) => `
      <g transform="scale(${escala})">
        <!-- cuchillas -->
        <path d="M-14.5 24.6 h13 M1.5 24.6 h13" stroke="#9BBAC0" stroke-width="2.4"/>
        <!-- patas -->
        <path d="M-8 18 L-13.5 23 L-2 23 Z" fill="#C9A24B" stroke="#241C13" stroke-width="1.5"/>
        <path d="M8 18 L13.5 23 L2 23 Z" fill="#C9A24B" stroke="#241C13" stroke-width="1.5"/>
        <!-- cuerpo + cabeza (una sola pieza) -->
        <path d="M0 -22 C-9 -22 -11.5 -14 -10.5 -9 C-14.5 -5.5 -14.5 7 -12 13
                 C-9.5 18.5 -5 21 0 21 C5 21 9.5 18.5 12 13 C14.5 7 14.5 -5.5 10.5 -9
                 C11.5 -14 9 -22 0 -22 Z" fill="#4A3B2C" stroke="#241C13" stroke-width="2"/>
        <!-- panza -->
        <path d="M0 -15 C-6 -15 -7.5 -9 -7 -5.5 C-10 -2 -10 8 -7 12.5 C-4.5 16 -2 17 0 17
                 C2 17 4.5 16 7 12.5 C10 8 10 -2 7 -5.5 C7.5 -9 6 -15 0 -15 Z"
              fill="#F7F1E1" stroke="#241C13" stroke-width="1.2"/>
        <!-- aletas -->
        <path d="M-10.5 -6 C-16.5 -3 -18 6 -14.5 11 C-13.5 6 -12 -1 -10 -4 Z" fill="#4A3B2C" stroke="#241C13" stroke-width="1.6"/>
        <path d="M10.5 -6 C16.5 -3 18 6 14.5 11 C13.5 6 12 -1 10 -4 Z" fill="#4A3B2C" stroke="#241C13" stroke-width="1.6"/>
        <!-- ojos y pico -->
        <circle cx="-4" cy="-15" r="2.6" fill="#F7F1E1" stroke="none"/>
        <circle cx="4" cy="-15" r="2.6" fill="#F7F1E1" stroke="none"/>
        <circle cx="-3.6" cy="-14.8" r="1.1" fill="#241C13" stroke="none"/>
        <circle cx="4.4" cy="-14.8" r="1.1" fill="#241C13" stroke="none"/>
        <path d="M-3.3 -11.8 L3.3 -11.8 L0 -7.4 Z" fill="#C9A24B" stroke="#241C13" stroke-width="1.3"/>
        <!-- bufanda -->
        <path d="M-11 -5.6 q11 4.6 22 0" stroke="${bufanda}" stroke-width="3.4"/>
        <path d="M9 -4.8 q5 4 2.6 9.6" stroke="${bufanda}" stroke-width="3"/>
      </g>`;

    /* --- pingüino deslizándose de panza (los de verdad frenan así) --- */
    const PINGUINO_PANZA = (escala, bufanda) => `
      <g transform="scale(${escala})">
        <path d="M-24 9 q-10 3 -19 0" stroke="#F7F1E1" stroke-width="3" stroke-dasharray="3 6" opacity=".85"/>
        <path d="M-22 -3 l-9 -6 M-22 1.5 l-10 -1" stroke="#C9A24B" stroke-width="3"/>
        <ellipse cx="-4" cy="0" rx="20" ry="9" fill="#4A3B2C" stroke="#241C13" stroke-width="2"/>
        <path d="M-19 4.5 C-9 9.5 6 8.5 13 3" stroke="#F7F1E1" stroke-width="6"/>
        <path d="M-2 -4 C-8 -7.5 -14 -8.5 -18.5 -7 C-14 -3.5 -8 -1.5 -4 -0.5 Z" fill="#4A3B2C" stroke="#241C13" stroke-width="1.4"/>
        <circle cx="18" cy="-5" r="9" fill="#4A3B2C" stroke="#241C13" stroke-width="2"/>
        <path d="M26 -5.6 l7.5 2.2 l-7 3.2 z" fill="#C9A24B" stroke="#241C13" stroke-width="1.3"/>
        <circle cx="20" cy="-8" r="2.4" fill="#F7F1E1" stroke="none"/>
        <circle cx="20.7" cy="-7.8" r="1.1" fill="#241C13" stroke="none"/>
        <path d="M8 -11.5 C12.5 -9.5 13.5 -1 9.5 2.5" stroke="${bufanda}" stroke-width="3.2"/>
        <path d="M8 -11 C1 -16.5 -8 -16.5 -15 -12.5" stroke="${bufanda}" stroke-width="2.8"/>
      </g>`;

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
            <div class="cph-boca a">${TXT('tuVersion')}</div>
            <div class="cph-boca b">${TXT('suVersion')}</div>
          </div>
          <div class="cph-hygge">moraleja: ${TXT('moraleja')}</div>
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
              <path id="cphGlide2" d="M528 190 Q400 222 260 196 T60 194" fill="none" stroke="none"/>
              <path id="cphGlide3" d="M120 178 Q250 202 390 176 T580 180" fill="none" stroke="none"/>
              <path id="cphGlide4" d="M500 138 Q380 160 280 136 T70 142" fill="none" stroke="none"/>
              <path id="cphGlide5" d="M90 214 Q190 226 290 212 Q340 206 390 210" fill="none" stroke="none"/>

              <!-- patinador 1 -->
              <g id="cphSk1" transform="translate(70,152)"><g class="cph-lean">
                <path d="M0 6 L-6 22" stroke="#4A3B2C" stroke-width="3.5"/>
                <path d="M-11 24 L0 24" stroke="#9BBAC0" stroke-width="3"/>
                <path d="M0 6 L11 15" stroke="#4A3B2C" stroke-width="3.5"/>
                <path d="M-13 26 L-2 26" stroke="#9BBAC0" stroke-width="2" opacity=".5"/>
                <path d="M-6 -13 Q0 -17 6 -13 L4 7 Q0 9 -4 7 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2"/>
                <path d="M-4 -8 L-17 -13 M4 -8 L16 -3" stroke="#B26A54" stroke-width="4"/>
                <path d="M-5 -11 L7 -9 M6 -10 l2 9" stroke="#C9A24B" stroke-width="2.6"/>
                ${CARAS.chico(0, -21, .34)}
                <circle cx="-1.6" cy="-20.5" r=".8" fill="#4A3B2C" stroke="none"/>
                <circle cx="1.6" cy="-20.5" r=".8" fill="#4A3B2C" stroke="none"/>
              </g></g>

              <!-- patinador 2 -->
              <g id="cphSk2" transform="translate(540,196)"><g class="cph-lean">
                <path d="M0 6 L6 22" stroke="#4A3B2C" stroke-width="3.5"/>
                <path d="M0 24 L11 24" stroke="#9BBAC0" stroke-width="3"/>
                <path d="M0 6 L-11 15" stroke="#4A3B2C" stroke-width="3.5"/>
                <path d="M-6 -13 Q0 -17 6 -13 L4 7 Q0 9 -4 7 Z" fill="#5F7355" stroke="#4A3B2C" stroke-width="2"/>
                <path d="M4 -8 L17 -13 M-4 -8 L-16 -3" stroke="#5F7355" stroke-width="4"/>
                <path d="M5 -11 L-7 -9 M-6 -10 l-2 9" stroke="#C98B84" stroke-width="2.6"/>
                ${CARAS.chica(0, -21, .34)}
                <circle cx="-1.6" cy="-20.5" r=".8" fill="#4A3B2C" stroke="none"/>
                <circle cx="1.6" cy="-20.5" r=".8" fill="#4A3B2C" stroke="none"/>
              </g></g>

              <!-- pingüinos patinadores -->
              <g id="cphPg1" transform="translate(120,178)"><g class="cph-pg"> ${PINGUINO(.78, '#C98B84')} </g></g>
              <g id="cphPg2" transform="translate(500,138)"><g class="cph-pg"> ${PINGUINO(.62, '#C9A24B')} </g></g>
              <g id="cphPg3" transform="translate(70,216)"><g class="cph-pg"> ${PINGUINO_PANZA(.72, '#8B9A78')} </g></g>

              <!-- sirenita en su roca -->
              <g transform="translate(548,198)">
                <path d="M0 0 q10 -18 2 -34 q14 8 12 26 q16 -6 18 -20 q6 22 -12 32 q-8 4 -20 -4 Z" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="2"/>
                <circle cx="6" cy="-40" r="7" fill="#C98B84" stroke="#4A3B2C" stroke-width="2"/>
              </g>
              <!-- ojo: la pista está recortada en óvalo, los textos van hacia dentro -->
              <text x="488" y="218" text-anchor="middle" font-family="Caveat, cursive" font-size="17" fill="#4A3B2C" stroke="none">hola, Sirenita</text>
              <text x="300" y="243" text-anchor="middle" font-family="Caveat, cursive" font-size="17" fill="#4A3B2C" stroke="none" opacity=".85">${TXT('pinguinos')}</text>
            </svg>
          </div>

          <div class="cph-velas" aria-hidden="true">
            ${[0, 1, 2].map(i => `
              <svg class="cph-vela" viewBox="0 0 26 54" xmlns="http://www.w3.org/2000/svg" style="width:${22 + i * 5}px">
                <rect x="6" y="20" width="14" height="30" rx="3" fill="#F3ECDA" stroke="#6E5B48" stroke-width="2"/>
                <path class="cph-llama" style="animation-delay:${i * .4}s" d="M13 4 Q18 12 13 18 Q8 12 13 4 Z" fill="#C9A24B" stroke="#B26A54" stroke-width="1.5"/>
              </svg>`).join('')}
          </div>
          <div class="cph-hygge">${TXT('hyggeFinal')}</div>
        </div>
      </div>`;

    /* la pista se va tras el carrete: nunca dos escenas seguidas.
       ¡ojo! deja de ser hija de `section`, así que a partir de aquí
       sus elementos se buscan dentro de `pista`, no dentro de `section`. */
    const pista = section.querySelector('.cph-hielo');
    (function(){
      const hist = document.querySelector('.d-historia');
      if (pista && hist){
        pista.style.maxWidth = '720px';
        pista.style.margin = '44px auto 0';
        pista.style.padding = '0 20px';
        hist.before(pista);
      }
    })();

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
    if (!pista) return;
    [['#cphGlide1', '#cphSk1', 13, 7, 24], ['#cphGlide2', '#cphSk2', 16, -7, 24],
     ['#cphGlide3', '#cphPg1', 11, 8, 20], ['#cphGlide4', '#cphPg2', 15, -8, 20],
     ['#cphGlide5', '#cphPg3', 9, 3, 20]].forEach(([guia, fig, dur, giro, eje]) => {
      const g = pista.querySelector(guia);
      gsap.to(pista.querySelector(fig), {
        motionPath: { path: g, align: g, alignOrigin: [.5, .95] },
        duration: dur, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to(pista.querySelector(fig + ' > g'), {
        rotation: giro, transformOrigin: `0px ${eje}px`,
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
