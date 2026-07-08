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
