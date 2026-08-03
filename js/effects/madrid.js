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
        <div class="escena-titulo">${TXT('tituloEscena')}</div>

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

          <!-- comensal A (izquierda): chico de pelo castaño -->
          <g id="madPersonaA">
            <path d="M185 216 q0 -38 30 -38 q30 0 30 38" fill="#B26A54"/>
            ${CARAS.chico(215, 150, 1.5)}
            <path d="M203 148 q4 -5 8 0 M223 148 q4 -5 8 0" stroke-width="2.5"/>
            <ellipse id="madBocaA" cx="217" cy="165" rx="7" ry="4" fill="#7C3B34" stroke-width="2"/>
            <g id="madBrazoA">
              <path d="M242 196 Q262 176 250 158" stroke-width="6" stroke="#E8C9A0"/>
              <path d="M250 158 l-2 -12 M247 157 l-6 -10 M253 158 l2 -12" stroke-width="2.5"/>
            </g>
          </g>

          <!-- comensal B (derecha): chica de pelo largo castaño -->
          <g id="madPersonaB">
            <path d="M515 216 q0 -38 30 -38 q30 0 30 38" fill="#5F7355"/>
            ${CARAS.chica(545, 150, 1.5)}
            <path d="M533 148 q4 -5 8 0 M553 148 q4 -5 8 0" stroke-width="2.5"/>
            <ellipse id="madBocaB" cx="543" cy="165" rx="7" ry="4" fill="#7C3B34" stroke-width="2"/>
            <g id="madBrazoB">
              <path d="M518 196 Q498 176 510 158" stroke-width="6" stroke="#E8C9A0"/>
              <ellipse cx="508" cy="152" rx="7" ry="5" fill="#DDCFB2" stroke-width="2.5"/>
            </g>
          </g>

          <!-- bocadillos de diálogo -->
          <g class="mad-burbuja" id="madBurbujaA">
            <rect x="130" y="66" width="130" height="36" rx="16" fill="#F7F1E1"/>
            <path d="M195 102 l-6 14 l16 -14" fill="#F7F1E1"/>
            <text x="195" y="90" text-anchor="middle" font-family="Caveat, cursive" font-size="22" fill="#4A3B2C" stroke="none">${TXT('burbujaA')}</text>
          </g>
          <g class="mad-burbuja" id="madBurbujaB">
            <rect x="510" y="66" width="80" height="36" rx="16" fill="#F7F1E1"/>
            <path d="M552 102 l6 14 l-16 -14" fill="#F7F1E1"/>
            <text x="550" y="91" text-anchor="middle" font-family="Caveat, cursive" font-size="23" fill="#4A3B2C" stroke="none">${TXT('burbujaB')}</text>
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
        <div class="escena-caption">${TXT('caption')}</div>
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
    const pizza = `<svg viewBox="0 0 40 42" fill="none" stroke="#4A3B2C" stroke-width="2.4" stroke-linejoin="round"><path d="M20 4 L34 34 Q20 41 6 34 Z" fill="#E8C06B"/><path d="M6 34 Q20 41 34 34 L33 31 Q20 37 7 31 Z" fill="#C88F4F"/><circle cx="18" cy="20" r="2.6" fill="#B26A54"/><circle cx="25" cy="27" r="2.6" fill="#B26A54"/><circle cx="14" cy="29" r="2.2" fill="#B26A54"/></svg>`;
    const burger = `<svg viewBox="0 0 40 32" fill="none" stroke="#4A3B2C" stroke-width="2.4" stroke-linejoin="round"><path d="M5 12 Q5 2 20 2 Q35 2 35 12 Z" fill="#C88F4F"/><circle cx="14" cy="8" r="1" fill="#F3ECDA" stroke="none"/><circle cx="22" cy="6" r="1" fill="#F3ECDA" stroke="none"/><circle cx="27" cy="9" r="1" fill="#F3ECDA" stroke="none"/><path d="M4 12 h32 v3 h-32 Z" fill="#8B9A78"/><rect x="4" y="15" width="32" height="6" rx="2" fill="#7C3B34"/><path d="M4 21 q16 8 32 0 v3 q-16 8 -32 0 Z" fill="#E8C06B"/></svg>`;
    const donut = `<svg viewBox="0 0 34 34" fill="none" stroke="#4A3B2C" stroke-width="2.4"><circle cx="17" cy="17" r="14" fill="#C98B84"/><circle cx="17" cy="17" r="5" fill="var(--paper)"/><path d="M6 12 q3 -3 5 1 M24 9 q3 2 1 5 M9 24 q3 3 6 -1 M26 22 q-2 3 -5 1" stroke="#C9A24B" stroke-width="2"/></svg>`;
    App.ambienteFlotar(layer, pizza, { w: 42, op: .78, dur: 17 });
    App.ambienteFlotar(layer, burger, { w: 42, op: .78, dur: 20, esperaMax: 9 });
    App.ambienteFlotar(layer, croqueta, { w: 36, op: .68, dur: 18, esperaMax: 12 });
    App.ambienteFlotar(layer, pizza, { w: 30, op: .6, dur: 24, esperaMax: 15 });
    App.ambienteFlotar(layer, churro, { w: 42, op: .65, dur: 22, esperaMax: 13 });
    App.ambienteFlotar(layer, donut, { w: 34, op: .7, dur: 19, esperaMax: 11 });
    App.ambienteFlotar(layer, calamar, { w: 28, op: .58, dur: 21, esperaMax: 16 });
    App.ambienteFlotar(layer, burger, { w: 30, op: .58, dur: 26, esperaMax: 18 });
  },
};
