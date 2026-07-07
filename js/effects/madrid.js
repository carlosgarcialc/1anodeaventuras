/* ============================================================
   Madrid — dos personas comiendo MUCHO
   Banquete a mesa puesta: brazos que no paran, vapor de la
   paella, torres de platos que crecen con el scroll y contador
   de platos retirados. Ambiente: tapas flotando por los lados.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .mad-banquete{ text-align:center; }
        .mad-mesa-svg{ width:min(760px,100%); margin:6px auto 0; display:block; }
        .mad-contador{
          font-family:var(--font-display); font-size:1rem; letter-spacing:.18em;
          text-transform:uppercase; color:var(--ink-soft); margin-top:4px;
        }
        .mad-contador b{ color:var(--terracotta); font-size:1.3em; }
        .mad-burbuja{ opacity:0; }
      </style>

      <div class="escena-abierta mad-banquete" id="madBanquete">
        <div class="escena-titulo">dos personas normales en una cata «ligerita»</div>

        <svg class="mad-mesa-svg" viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <!-- sol de atardecer -->
          <circle cx="380" cy="60" r="34" fill="#C9A24B" opacity=".35" stroke="none"/>

          <!-- torres de platos (crecen con el scroll) -->
          <g id="madTorreIzq">
            ${Array.from({length:8},(_,i)=>`<rect class="mad-plato" x="60" y="${218-i*13}" width="76" height="10" rx="5" fill="#F7F1E1"/>`).join('')}
          </g>
          <g id="madTorreDer">
            ${Array.from({length:8},(_,i)=>`<rect class="mad-plato" x="624" y="${218-i*13}" width="76" height="10" rx="5" fill="#F7F1E1"/>`).join('')}
          </g>

          <!-- comensal A (izquierda) -->
          <g id="madPersonaA">
            <circle cx="215" cy="150" r="30" fill="#E8C9A0"/>
            <path d="M203 144 q4 -5 8 0 M223 144 q4 -5 8 0" stroke-width="2.5"/>
            <ellipse id="madBocaA" cx="217" cy="163" rx="7" ry="4" fill="#7C3B34" stroke-width="2"/>
            <path d="M196 132 q18 -18 40 -2" stroke-width="4"/>
            <path d="M185 216 q0 -38 30 -38 q30 0 30 38" fill="#B26A54"/>
            <g id="madBrazoA">
              <path d="M242 196 Q262 176 250 158" stroke-width="6" stroke="#E8C9A0"/>
              <path d="M250 158 l-2 -12 M247 157 l-6 -10 M253 158 l2 -12" stroke-width="2.5"/>
            </g>
          </g>

          <!-- comensal B (derecha) -->
          <g id="madPersonaB">
            <circle cx="545" cy="150" r="30" fill="#E8C9A0"/>
            <path d="M533 144 q4 -5 8 0 M553 144 q4 -5 8 0" stroke-width="2.5"/>
            <ellipse id="madBocaB" cx="543" cy="163" rx="7" ry="4" fill="#7C3B34" stroke-width="2"/>
            <path d="M523 128 q22 -14 44 4 l-4 10 q-18 -12 -36 -4 Z" fill="#6E5B48"/>
            <path d="M515 216 q0 -38 30 -38 q30 0 30 38" fill="#5F7355"/>
            <g id="madBrazoB">
              <path d="M518 196 Q498 176 510 158" stroke-width="6" stroke="#E8C9A0"/>
              <ellipse cx="508" cy="152" rx="7" ry="5" fill="#DDCFB2" stroke-width="2.5"/>
            </g>
          </g>

          <!-- bocadillos de diálogo -->
          <g class="mad-burbuja" id="madBurbujaA">
            <rect x="130" y="66" width="130" height="36" rx="16" fill="#F7F1E1"/>
            <path d="M195 102 l-6 14 l16 -14" fill="#F7F1E1"/>
            <text x="195" y="90" text-anchor="middle" font-family="Caveat, cursive" font-size="22" fill="#4A3B2C" stroke="none">¿otra ración?</text>
          </g>
          <g class="mad-burbuja" id="madBurbujaB">
            <rect x="510" y="66" width="80" height="36" rx="16" fill="#F7F1E1"/>
            <path d="M552 102 l6 14 l-16 -14" fill="#F7F1E1"/>
            <text x="550" y="91" text-anchor="middle" font-family="Caveat, cursive" font-size="23" fill="#4A3B2C" stroke="none">obvio.</text>
          </g>

          <!-- mesa -->
          <rect x="150" y="216" width="460" height="16" rx="6" fill="#B26A54"/>
          <path d="M150 224 l-14 86 M610 224 l14 86" stroke-width="6"/>
          <path d="M160 216 h440 l-10 -12 h-420 Z" fill="#F3ECDA"/>
          <path d="M170 210 h60 M250 208 h40 M470 208 h60" stroke="#C98B84" stroke-width="2" opacity=".6"/>

          <!-- festín: paella, bravas, bocata de calamares, jarras -->
          <g id="madPaella">
            <ellipse cx="380" cy="206" rx="58" ry="14" fill="#B26A54"/>
            <ellipse cx="380" cy="202" rx="48" ry="10" fill="#E8D98F"/>
            <circle cx="362" cy="200" r="4" fill="#C98B84" stroke-width="2"/>
            <circle cx="396" cy="203" r="4" fill="#8B9A78" stroke-width="2"/>
            <circle cx="380" cy="198" r="3.5" fill="#7C3B34" stroke-width="2"/>
            <path d="M322 206 h-16 M438 206 h16" stroke-width="5"/>
            <path class="mad-vapor" d="M360 184 q-5 -9 0 -18 q5 -9 0 -16" stroke="#DDCFB2" stroke-width="3.5"/>
            <path class="mad-vapor" d="M400 184 q5 -9 0 -18 q-5 -9 0 -16" stroke="#DDCFB2" stroke-width="3.5"/>
          </g>
          <g>
            <ellipse cx="272" cy="208" rx="26" ry="8" fill="#F7F1E1"/>
            <circle cx="264" cy="203" r="5.5" fill="#C88F4F" stroke-width="2"/>
            <circle cx="278" cy="202" r="5.5" fill="#C88F4F" stroke-width="2"/>
            <circle cx="271" cy="197" r="5.5" fill="#C88F4F" stroke-width="2"/>
          </g>
          <g>
            <ellipse cx="490" cy="208" rx="28" ry="8" fill="#F7F1E1"/>
            <path d="M468 204 q22 -14 44 0 q-8 -4 -10 -1 q-6 -6 -12 -1 q-6 -5 -12 1 q-4 -3 -10 1 Z" fill="#DDCFB2" stroke-width="2.5"/>
          </g>
          <path d="M330 176 h14 v26 h-14 Z M416 176 h14 v26 h-14 Z" fill="#C9A24B" opacity=".85"/>

          <!-- migas volanderas -->
          <circle class="mad-miga" cx="310" cy="160" r="2.5" fill="#B26A54" stroke="none"/>
          <circle class="mad-miga" cx="452" cy="150" r="2.5" fill="#C88F4F" stroke="none"/>
          <circle class="mad-miga" cx="380" cy="140" r="2" fill="#6E5B48" stroke="none"/>
        </svg>

        <div class="mad-contador">platos retirados: <b id="madPlatos">3</b> · arrepentimiento: 0</div>
        <div class="escena-caption">‹‹ CAPTION BANQUETE — EDITAR ›› (qué pedimos, qué repetimos y qué juramos no volver a contar)</div>
      </div>`;

    const platos = section.querySelectorAll('.mad-plato');
    const contador = section.querySelector('#madPlatos');

    if (reduced || !App.hasGsap || typeof ScrollTrigger === 'undefined'){
      contador.textContent = '19';
      section.querySelectorAll('.mad-burbuja').forEach(b => b.style.opacity = 1);
      return;
    }

    /* brazos tenedor-boca sin descanso, a ritmos distintos */
    gsap.to('#madBrazoA', { rotation: -32, svgOrigin: '242 196', duration: .5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to('#madBrazoB', { rotation: 32, svgOrigin: '518 196', duration: .62, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: .3 });
    gsap.to('#madBocaA', { scaleY: .3, svgOrigin: '217 163', duration: .5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to('#madBocaB', { scaleY: .3, svgOrigin: '543 163', duration: .62, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: .3 });

    /* vapor de la paella y migas saltarinas */
    section.querySelectorAll('.mad-vapor').forEach((v, i) => {
      gsap.to(v, { y: -8, opacity: .25, duration: 1.6 + i * .3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });
    section.querySelectorAll('.mad-miga').forEach((m, i) => {
      gsap.to(m, { y: -12 - i * 4, x: i % 2 ? 8 : -8, opacity: 0, duration: 1 + i * .3, repeat: -1, ease: 'power1.out', repeatDelay: .6 });
    });

    /* bocadillos de diálogo alternándose */
    const charla = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });
    charla.to('#madBurbujaA', { opacity: 1, duration: .3 })
      .to('#madBurbujaA', { opacity: 0, duration: .3 }, '+=1.4')
      .to('#madBurbujaB', { opacity: 1, duration: .3 }, '+=.2')
      .to('#madBurbujaB', { opacity: 0, duration: .3 }, '+=1.2');

    /* las torres de platos crecen con el scroll + contador */
    platos.forEach(p => gsap.set(p, { opacity: 0, y: -14 }));
    const st = { trigger: '#madBanquete', start: 'top 78%', end: 'bottom 40%', scrub: .8 };
    gsap.to(platos, { opacity: 1, y: 0, stagger: .06, ease: 'none', scrollTrigger: st });
    const n = { v: 3 };
    gsap.to(n, { v: 19, ease: 'none', scrollTrigger: st,
      onUpdate: () => contador.textContent = Math.round(n.v) });
  },

  /* tapas flotando por los laterales de toda la página */
  ambient(layer, reduced){
    if (reduced) return;
    const croqueta = `<svg viewBox="0 0 40 26"><ellipse cx="20" cy="13" rx="17" ry="10" fill="#C88F4F" stroke="#4A3B2C" stroke-width="2.5"/><path d="M10 10 q10 -5 20 0 M9 16 q11 5 22 0" stroke="#8a5a2e" stroke-width="2" fill="none"/></svg>`;
    const churro = `<svg viewBox="0 0 44 14"><rect x="2" y="3" width="40" height="8" rx="4" fill="#C9A24B" stroke="#4A3B2C" stroke-width="2.5"/><path d="M6 7 h32" stroke="#8a5a2e" stroke-width="2"/></svg>`;
    const calamar = `<svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="11" fill="#E8D98F" stroke="#4A3B2C" stroke-width="2.5"/><circle cx="15" cy="15" r="4.5" fill="var(--paper)" stroke="#4A3B2C" stroke-width="2"/></svg>`;
    App.ambienteFlotar(layer, croqueta, { w: 38, op: .7, dur: 17 });
    App.ambienteFlotar(layer, churro, { w: 44, op: .65, dur: 21, esperaMax: 12 });
    App.ambienteFlotar(layer, calamar, { w: 30, op: .6, dur: 19, esperaMax: 14 });
  },
};
