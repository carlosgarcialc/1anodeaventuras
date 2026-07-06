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
            <svg viewBox="0 0 110 70" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
              <path d="M8 62 L46 34 M8 62 l-2 6 M4 58 l8 8" stroke-width="3.5"/>
              <path d="M46 34 l-5 -8 M52 30 l-5 -9 M58 26 l-4 -9" stroke-width="2.5"/>
              <path d="M38 30 Q60 6 88 18 Q102 24 96 36 Q86 52 60 48 Q42 45 38 30 Z" fill="#B26A54" transform="rotate(-6 65 30)"/>
              <path d="M52 24 q16 -8 34 0" stroke="#7C3B34" stroke-width="2.5"/>
              <circle cx="70" cy="28" r="1.8" fill="#4A3B2C" stroke="none"/>
              <circle cx="82" cy="28" r="1.8" fill="#4A3B2C" stroke="none"/>
              <path d="M72 36 q5 4 12 0" stroke-width="2.2"/>
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
};
