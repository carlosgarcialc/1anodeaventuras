/* ============================================================
   Bratislava — el Danubio, casco antiguo y cameo estelar
   de la salchicha en tenedor.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .bts-escena{ position:relative; overflow:hidden; }
        .bts-ciudad{ display:block; width:100%; }
        .bts-danubio{ position:relative; height:90px; overflow:hidden;
          background:linear-gradient(180deg, #9BBAC0, #7FA6AD); }
        .bts-onda{ position:absolute; left:-5%; width:110%; opacity:.5; }
        .bts-salchicha{
          position:absolute; bottom:14px; width:110px; z-index:5;
          filter:drop-shadow(0 4px 6px rgba(74,59,44,.3));
        }
        .bts-caption{
          text-align:center; font-family:var(--font-hand); font-size:1.4rem;
          color:var(--ink-soft); padding:14px 20px 0;
        }
      </style>

      <div class="bts-escena will-reveal">
        <svg class="bts-ciudad" viewBox="0 0 800 190" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="190" fill="#EAE0CA"/>
          <!-- castillo de Bratislava (la mesa invertida) -->
          <g stroke="#4A3B2C" stroke-width="3" fill="#F3ECDA">
            <rect x="330" y="60" width="140" height="70"/>
            <rect x="322" y="40" width="18" height="90"/><rect x="460" y="40" width="18" height="90"/>
            <path d="M322 40 l9 -14 9 14 M460 40 l9 -14 9 14" fill="#B26A54"/>
            <rect x="360" y="80" width="16" height="22" fill="#6E5B48"/>
            <rect x="392" y="80" width="16" height="22" fill="#6E5B48"/>
            <rect x="424" y="80" width="16" height="22" fill="#6E5B48"/>
          </g>
          <!-- casco antiguo -->
          <g stroke="#4A3B2C" stroke-width="2.5">
            <path d="M60 130 h70 v60 h-70 z" fill="#C98B84"/><path d="M60 130 l35 -26 35 26" fill="#B26A54"/>
            <path d="M160 145 h60 v45 h-60 z" fill="#E8D98F"/><path d="M160 145 l30 -22 30 22" fill="#B26A54"/>
            <path d="M540 140 h64 v50 h-64 z" fill="#BFD3D6"/><path d="M540 140 l32 -24 32 24" fill="#6E5B48"/>
            <path d="M640 128 h56 v62 h-56 z" fill="#C98B84"/><path d="M640 128 l28 -20 28 20" fill="#B26A54"/>
            <!-- torre de San Miguel -->
            <rect x="250" y="96" width="34" height="94" fill="#F3ECDA"/>
            <path d="M250 96 q17 -34 34 0" fill="#5F7355"/>
            <circle cx="267" cy="120" r="8" fill="#F7F1E1"/>
          </g>
          <text x="400" y="24" text-anchor="middle" font-family="Caveat, cursive" font-size="24" fill="#6E5B48" transform="rotate(-1 400 24)">el castillo-mesa-del-revés y alrededores</text>
        </svg>

        <div class="bts-danubio" id="btsDanubio">
          <svg class="bts-onda" style="top:12px" viewBox="0 0 900 40" preserveAspectRatio="none"><path d="M0,20 Q75,4 150,20 T300,20 T450,20 T600,20 T750,20 T900,20" fill="none" stroke="#F3ECDA" stroke-width="3"/></svg>
          <svg class="bts-onda" style="top:44px" viewBox="0 0 900 40" preserveAspectRatio="none"><path d="M0,20 Q75,36 150,20 T300,20 T450,20 T600,20 T750,20 T900,20" fill="none" stroke="#DDE9EA" stroke-width="3"/></svg>

          <div class="bts-salchicha" id="btsSalchicha">
            <svg viewBox="0 0 110 70" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <g transform="translate(55,36) rotate(-8) scale(1.1)">
                <!-- mango del tenedor -->
                <path d="M0 8 L0 24" stroke-width="4"/>
                <circle cx="0" cy="25" r="2" fill="#4A3B2C" stroke="none"/>
                <!-- base y púas -->
                <path d="M-8 2 Q-8 7 0 8 Q8 7 8 2" fill="#F3ECDA" stroke-width="2.2"/>
                <path d="M-7.5 -14 V2 M-2.5 -16 V2 M2.5 -16 V2 M7.5 -14 V2" stroke-width="2.6"/>
                <!-- salchicha atravesada, feliz de navegar -->
                <path d="M-19 -4 Q-21 -10 -13 -11 L14 -13 Q22 -13 22 -8 Q22 -3 14 -2 L-13 0 Q-19 0 -19 -4 Z" fill="#B26A54" stroke-width="2.2"/>
                <circle cx="-21" cy="-7" r="2" fill="#B26A54" stroke-width="1.5"/>
                <circle cx="24" cy="-10" r="2" fill="#B26A54" stroke-width="1.5"/>
                <path d="M-11 -8 q13 -3 24 -2" stroke="#7C3B34" stroke-width="1.6"/>
                <circle cx="-3" cy="-7.5" r="1" fill="#4A3B2C" stroke="none"/>
                <circle cx="4" cy="-8" r="1" fill="#4A3B2C" stroke="none"/>
                <path d="M-2 -5 q2.5 2 5 -.4" stroke-width="1.3"/>
                <!-- puntas de las púas asomando -->
                <path d="M-7.5 -14 V-10.5 M-2.5 -16 V-12.5 M2.5 -16 V-12.6 M7.5 -14 V-11.5" stroke-width="2.6"/>
                <!-- vapor -->
                <path d="M-4 -20 q-2 -4 1 -7 M5 -21 q2 -4 -1 -7" stroke="#6E5B48" stroke-width="1.8"/>
              </g>
            </svg>
          </div>
        </div>
        <div class="bts-caption">cameo: la salchicha* navegando el Danubio &nbsp;·&nbsp; <small>*QEPD, estaba buenísima</small></div>
      </div>`;

    /* ===== escena de fiesta (va TRAS el carrete: nunca dos escenas seguidas) ===== */
    (function(){
      const esc = document.createElement('section');
      esc.className = 'escena-abierta will-reveal';
      esc.innerHTML = `
        <style>
          @keyframes btsNeon{ 0%,100%{ opacity:1; } 50%{ opacity:.35; } }
          .bts-neon{ animation:btsNeon 1.6s ease-in-out infinite; }
          html.no-motion .bts-neon{ animation:none; }
        </style>
        <div class="escena-titulo">itinerario científico de la noche eslovaca</div>
        <div class="escena-figuras">
          <svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <!-- cielo nocturno + luna -->
            <rect width="460" height="212" fill="#4A3B2C" opacity=".14"/>
            <circle cx="428" cy="30" r="13" fill="#F3ECDA"/>
            <!-- los tres templos de la noche -->
            <g>
              <rect x="14" y="60" width="128" height="152" fill="#F3ECDA"/>
              <rect x="14" y="60" width="128" height="30" fill="#7C3B34"/>
              <text x="78" y="82" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" letter-spacing="2" font-size="17" fill="#F3ECDA" stroke="none">KLUB39</text>
              <rect x="58" y="150" width="40" height="62" fill="#6E5B48"/>
              <circle class="bts-neon" cx="30" cy="104" r="4" fill="#C98B84" stroke="none"/>
              <circle class="bts-neon" cx="78" cy="104" r="4" fill="#C9A24B" stroke="none" style="animation-delay:.4s"/>
              <circle class="bts-neon" cx="126" cy="104" r="4" fill="#9BBAC0" stroke="none" style="animation-delay:.8s"/>
            </g>
            <g>
              <rect x="166" y="44" width="128" height="168" fill="#F7F1E1"/>
              <rect x="166" y="44" width="128" height="30" fill="#5F7355"/>
              <text x="230" y="66" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" letter-spacing="2" font-size="16" fill="#F3ECDA" stroke="none">CHANNELS</text>
              <rect x="210" y="150" width="40" height="62" fill="#6E5B48"/>
              <path class="bts-neon" d="M180 96 h20 M180 104 h14" stroke="#C9A24B" stroke-width="3" style="animation-delay:.2s"/>
              <path class="bts-neon" d="M280 96 h-20 M280 104 h-14" stroke="#C98B84" stroke-width="3" style="animation-delay:.6s"/>
            </g>
            <g>
              <rect x="318" y="70" width="128" height="142" fill="#F3ECDA"/>
              <rect x="318" y="70" width="128" height="30" fill="#4A3B2C"/>
              <text x="382" y="92" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" letter-spacing="5" font-size="17" fill="#C9A24B" stroke="none">DEEP</text>
              <rect x="362" y="150" width="40" height="62" fill="#6E5B48"/>
              <circle class="bts-neon" cx="334" cy="114" r="4" fill="#C9A24B" stroke="none" style="animation-delay:.3s"/>
              <circle class="bts-neon" cx="430" cy="114" r="4" fill="#C98B84" stroke="none" style="animation-delay:.7s"/>
            </g>
            <!-- notas musicales escapándose -->
            <g fill="#6E5B48" stroke="none">
              <path d="M152 40 v-14 q6 1 7 5" stroke="#6E5B48" stroke-width="2" fill="none"/><ellipse cx="150" cy="41" rx="3.4" ry="2.6"/>
              <path d="M306 34 v-12 q5 1 6 4" stroke="#6E5B48" stroke-width="2" fill="none"/><ellipse cx="304" cy="35" rx="3" ry="2.4"/>
            </g>
            <!-- la cuadrilla -->
            <path d="M0 212 h460" stroke="#B26A54" stroke-width="3"/>
            <g>
              <path d="M52 248 q0 -26 16 -26 q16 0 16 26" fill="#B26A54"/>
              ${CARAS.chico(68, 210, .62)}
            </g>
            <g>
              <path d="M148 248 q0 -26 16 -26 q16 0 16 26" fill="#5F7355"/>
              ${CARAS.chica(164, 210, .62)}
            </g>
            <g>
              <path d="M252 248 q0 -26 16 -26 q16 0 16 26" fill="#9BBAC0"/>
              ${CARAS.chico(268, 210, .62, '#C9A24B')}
            </g>
            <g>
              <path d="M356 248 q0 -26 16 -26 q16 0 16 26" fill="#C98B84"/>
              ${CARAS.chico(372, 210, .62, '#241c13')}
            </g>
          </svg>
          <div class="escena-boca" style="left:1%;top:44%;--tail:70%;font-size:.98rem">Maksym, que habla ucraniano</div>
          <div class="escena-boca" style="left:24%;top:58%;--tail:50%;font-size:.98rem">¿luego en Viking's?</div>
          <div class="escena-boca" style="right:22%;top:47%;--tail:40%;font-size:.98rem">¿after en la 213?</div>
          <div class="escena-boca" style="right:0%;top:60%;--tail:60%;font-size:.98rem">puto Erasmusdreamland</div>
        </div>
        <div class="escena-caption">‹‹ CAPTION FIESTA — EDITAR ›› (orden del peregrinaje: Klub39 → Channels → Deep)</div>`;
      const hist = document.querySelector('.d-historia');
      if (hist) hist.before(esc); else section.appendChild(esc);
      sembrarDestellos(esc, 4);
    })();

    if (reduced || !App.hasGsap) return;

    /* el Danubio ondea */
    section.querySelectorAll('.bts-onda').forEach((o, i) => {
      gsap.to(o, { x: i % 2 ? 46 : -46, duration: 6 + i * 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    /* la salchicha navega y se contonea */
    const rio = document.getElementById('btsDanubio');
    gsap.fromTo('#btsSalchicha', { x: -130 }, {
      x: () => rio.clientWidth + 130, duration: 14, repeat: -1, ease: 'none', delay: .5,
    });
    gsap.to('#btsSalchicha', { y: -8, rotate: 4, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },

  /* ambiente: salchichas voladoras y algún pretzel a la deriva */
  ambient(layer, reduced){
    if (reduced) return;
    const salchicha = `
      <svg viewBox="0 0 54 26" fill="none" stroke="#4A3B2C" stroke-width="2.5" stroke-linecap="round">
        <path d="M6 16 Q26 2 46 12 Q52 15 48 20 Q30 30 10 22 Q4 20 6 16 Z" fill="#B26A54"/>
        <path d="M14 14 q14 -6 28 0" stroke="#7C3B34" stroke-width="2"/>
      </svg>`;
    const pretzel = `
      <svg viewBox="0 0 40 32" fill="none" stroke="#4A3B2C" stroke-width="2.2">
        <path d="M20 6 Q34 6 34 17 Q34 27 24 27 Q16 27 12 18 M20 6 Q6 6 6 17 Q6 27 16 27 Q24 27 28 18"
          stroke="#C88F4F" stroke-width="5"/>
        <path d="M14 12 l2 2 M24 12 l-2 2 M20 22 l0 2" stroke="#F3ECDA" stroke-width="2"/>
      </svg>`;
    App.ambienteCruzar(layer, salchicha, { w: 46, op: .75, dur: 15, vaiven: 20 });
    App.ambienteCruzar(layer, salchicha, { w: 32, op: .6, dur: 21, esperaMax: 13, vaiven: 14 });
    App.ambienteCaer(layer, pretzel, { w: 26, op: .65, dur: 18, giro: 100, esperaMax: 12 });
  },
};
