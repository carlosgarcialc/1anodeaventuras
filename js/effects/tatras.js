/* ============================================================
   Tatras — nieve con parallax, montañas, pinos y cabaña
   con la ventanita encendida.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .tat-escena{
          position:relative; overflow:hidden; min-height:420px;
          background:linear-gradient(180deg, #C9D6D2 0%, #DDE3DB 45%, #EAE0CA 100%);
        }
        .tat-nieve{ position:absolute; inset:0; z-index:6; pointer-events:none; }
        .tat-capa{ position:absolute; bottom:0; left:0; right:0; }
        .tat-titulo{
          position:relative; z-index:7; text-align:center; padding-top:26px;
          font-family:var(--font-hand); font-size:clamp(1.5rem,5.5vw,2.1rem);
          color:#4A3B2C; transform:rotate(-2deg);
        }
        .tat-ventana{ animation:tatVentana 3s ease-in-out infinite; }
        @keyframes tatVentana{ 0%,100%{ opacity:1;} 50%{ opacity:.55;} }
        html.no-motion .tat-ventana{ animation:none; }
        .tat-humo{ opacity:.65; }
        .tat-caption{ text-align:center; font-family:var(--font-hand); font-size:1.4rem; color:var(--ink-soft); padding:14px 20px 0; }
      </style>

      <div class="tat-escena torn-top torn-bottom" id="tatEscena">
        <div class="tat-titulo">fuera: -12°. dentro: nosotros y la estufa.</div>

        <svg class="tat-capa" id="tatMontes" viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M-20 300 L140 90 L230 210 L330 60 L440 220 L560 100 L700 240 L820 140 L820 300 Z" fill="#AAB8B0"/>
          <path d="M110 130 L140 90 L172 132 Z M300 105 L330 60 L365 112 Z M528 140 L560 100 L594 142 Z" fill="#F3ECDA"/>
          <path d="M-20 300 L100 190 L220 300 M300 300 L420 200 L560 300 M580 300 L680 220 L800 300 Z" fill="#8fa39a" opacity=".8"/>
        </svg>

        <svg class="tat-capa" id="tatValle" viewBox="0 0 800 210" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 210 Q200 150 400 176 Q600 200 800 160 L800 210 Z" fill="#EFEAD8"/>
          <!-- pinos -->
          ${[60, 130, 620, 700, 750].map((x, i) => `
            <g transform="translate(${x},${150 + (i % 2) * 14}) scale(${.7 + (i % 3) * .18})">
              <path d="M0 -46 L11 -26 L6 -26 L15 -8 L8 -8 L16 8 L-16 8 L-8 -8 L-15 -8 L-6 -26 L-11 -26 Z" fill="#5F7355" stroke="#4A3B2C" stroke-width="1.6"/>
              <rect x="-2.6" y="8" width="5.2" height="6" fill="#6E5B48"/>
            </g>`).join('')}
          <!-- cabaña -->
          <g transform="translate(330,108)">
            <path class="tat-humo" d="M84 -34 q6 -8 0 -16 q-6 -8 2 -14" fill="none" stroke="#DDCFB2" stroke-width="5" stroke-linecap="round"/>
            <rect x="74" y="-38" width="14" height="18" fill="#6E5B48" stroke="#4A3B2C" stroke-width="2"/>
            <path d="M-10 10 L60 -34 L130 10 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="3"/>
            <path d="M-10 10 L60 -34 L130 10" fill="none" stroke="#F3ECDA" stroke-width="6" stroke-dasharray="1 0" opacity=".5"/>
            <rect x="4" y="10" width="112" height="58" fill="#8a6a4d" stroke="#4A3B2C" stroke-width="3"/>
            <path d="M4 22 h112 M4 36 h112 M4 50 h112" stroke="#6b4f37" stroke-width="2.4"/>
            <rect class="tat-ventana" x="24" y="26" width="26" height="24" rx="2" fill="#E8C06B" stroke="#4A3B2C" stroke-width="3"/>
            <path d="M37 26 v24 M24 38 h26" stroke="#4A3B2C" stroke-width="2"/>
            <rect x="72" y="30" width="22" height="38" rx="2" fill="#5b4433" stroke="#4A3B2C" stroke-width="3"/>
            <circle cx="89" cy="50" r="2" fill="#C9A24B"/>
          </g>
        </svg>

        <canvas class="tat-nieve" id="tatNieve"></canvas>
      </div>
      <div class="tat-caption">‹‹ CAPTION CABAÑA — EDITAR ›› (p. ej. quién ganó al monopoly)</div>`;

    /* nieve en canvas, dos profundidades */
    const cv = document.getElementById('tatNieve');
    const escena = document.getElementById('tatEscena');
    const ctx = cv.getContext('2d');
    let copos = [];
    function resize(){
      cv.width = escena.clientWidth; cv.height = escena.clientHeight;
      copos = Array.from({ length: 90 }, () => {
        const depth = Math.random();               // 0 = lejos, 1 = cerca
        return { x: Math.random() * cv.width, y: Math.random() * cv.height,
          r: 1 + depth * 2.6, v: .3 + depth * 1.1, a: Math.random() * Math.PI * 2,
          va: .01 + Math.random() * .02, depth };
      });
    }
    resize(); addEventListener('resize', resize);

    if (reduced){
      /* nieve estática: un fotograma */
      ctx.fillStyle = 'rgba(247,241,225,.9)';
      copos.forEach(c => { ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 7); ctx.fill(); });
      return;
    }

    let scrollBoost = 0;
    if (App.hasGsap && typeof ScrollTrigger !== 'undefined'){
      /* parallax de capas con el scroll */
      gsap.to('#tatMontes', { y: 40, ease: 'none',
        scrollTrigger: { trigger: escena, start: 'top bottom', end: 'bottom top', scrub: true } });
      ScrollTrigger.create({
        trigger: escena, start: 'top bottom', end: 'bottom top',
        onUpdate: self => { scrollBoost = Math.abs(self.getVelocity()) / 900; },
      });
    }

    (function nevar(){
      if (!cv.isConnected) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      copos.forEach(c => {
        c.y += c.v * (1 + Math.min(scrollBoost, 3) * c.depth);
        c.a += c.va; c.x += Math.sin(c.a) * (.3 + c.depth * .5);
        if (c.y > cv.height + 4){ c.y = -4; c.x = Math.random() * cv.width; }
        ctx.globalAlpha = .45 + c.depth * .5;
        ctx.fillStyle = '#F7F1E1';
        ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 7); ctx.fill();
      });
      scrollBoost *= .95;
      requestAnimationFrame(nevar);
    })();
  },
};
