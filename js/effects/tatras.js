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
        .tat-boca{
          position:absolute; z-index:8; max-width:200px;
          background:#F7F1E1; border:2.5px solid #4A3B2C; border-radius:16px;
          padding:.35em .75em; font-family:var(--font-hand); font-weight:700;
          font-size:1.15rem; line-height:1.15; color:#4A3B2C; text-align:center;
          box-shadow:var(--shadow-soft); opacity:0; transform:scale(.3);
        }
        .tat-boca::after{
          content:""; position:absolute; bottom:-11px; left:50%; width:14px; height:14px;
          background:#F7F1E1; border-right:2.5px solid #4A3B2C; border-bottom:2.5px solid #4A3B2C;
          transform:translateX(-50%) rotate(45deg);
        }
        .tat-jaja{
          position:absolute; z-index:8; font-family:var(--font-hand); font-weight:700;
          color:#7C3B34; opacity:0; white-space:nowrap;
        }
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

        <!-- grandes éxitos de la cabaña, en riguroso directo -->
        <div class="tat-boca" style="left:6%;  bottom:52%; transform:scale(.3) rotate(-4deg)">¡AY, MI RODILLA!</div>
        <div class="tat-boca" style="right:4%; bottom:56%; transform:scale(.3) rotate(3deg)">¿Qué tamaño de palo es vuestro favorito?</div>
        <div class="tat-boca" style="left:30%; bottom:64%; transform:scale(.3) rotate(-2deg)">¡UNA CABRA!</div>
        <div class="tat-jaja" style="left:18%; bottom:40%; font-size:1.5rem; transform:rotate(-8deg)">jajajaja</div>
        <div class="tat-jaja" style="right:14%; bottom:38%; font-size:1.2rem; transform:rotate(6deg)">JAJAJA</div>
        <div class="tat-jaja" style="left:55%; bottom:46%; font-size:1.05rem; transform:rotate(-3deg)">jsjsjsjs</div>
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
      /* nieve estática + bocadillos visibles sin animación */
      ctx.fillStyle = 'rgba(247,241,225,.9)';
      copos.forEach(c => { ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 7); ctx.fill(); });
      escena.querySelectorAll('.tat-boca, .tat-jaja').forEach(b => { b.style.opacity = 1; b.style.transform = 'none'; });
      return;
    }

    /* bocadillos de cómic: van saltando por turnos, con risas alrededor */
    if (App.hasGsap){
      const bocas = escena.querySelectorAll('.tat-boca');
      const jajas = escena.querySelectorAll('.tat-jaja');
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8,
        scrollTrigger: { trigger: escena, start: 'top 75%' } });
      bocas.forEach(b => {
        const rot = b.style.transform.match(/rotate\([^)]*\)/)?.[0] || '';
        tl.to(b, { opacity: 1, transform: `scale(1) ${rot}`, duration: .45, ease: 'back.out(2.2)' })
          .to(jajas, { opacity: .9, duration: .3, stagger: .08 }, '<.3')
          .to(jajas, { opacity: 0, duration: .4, stagger: .05 }, '+=1.1')
          .to(b, { opacity: 0, transform: `scale(.3) ${rot}`, duration: .3, ease: 'power1.in' }, '<');
      });
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

  /* ambiente: LA CABRA cruza la página de vez en cuando + nieve suelta */
  ambient(layer, reduced){
    if (reduced) return;
    const cabra = `
      <svg viewBox="0 0 90 64" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 34 Q18 20 34 20 L58 20 Q70 20 70 32 Q70 42 58 42 L32 42 Q18 42 18 34 Z" fill="#DDCFB2"/>
        <path d="M26 42 l-2 14 M38 42 l0 14 M52 42 l0 14 M64 40 l2 14" stroke-width="3.5"/>
        <path d="M66 26 Q78 22 80 12 M70 30 L82 28" stroke-width="3"/>
        <circle cx="76" cy="20" r="9" fill="#DDCFB2"/>
        <path d="M72 12 q-3 -7 2 -9 M80 12 q3 -7 -2 -9" stroke-width="2.5"/>
        <circle cx="78" cy="18" r="1.4" fill="#4A3B2C" stroke="none"/>
        <path d="M80 26 l0 5" stroke-width="2.5"/>
        <path d="M18 30 q-6 2 -6 8" stroke-width="3"/>
      </svg>`;
    const copo = `<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#F7F1E1" opacity=".9"/></svg>`;
    App.ambienteCruzar(layer, cabra, { w: 74, op: .9, dur: 9, yMin: 55, yMax: 80, esperaMax: 14, vaiven: 5 });
    App.ambienteCaer(layer, copo, { w: 8, op: .8, dur: 11 });
    App.ambienteCaer(layer, copo, { w: 6, op: .6, dur: 15, esperaMax: 10 });
    App.ambienteCaer(layer, copo, { w: 4, op: .45, dur: 19, esperaMax: 14 });
  },
};
