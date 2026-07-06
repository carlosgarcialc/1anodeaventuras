/* ============================================================
   Madrid — heladería fresa y limón
   Bolas que gotean con el scroll + atardecer cálido de ciudad.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .mad-escena{
          position:relative; overflow:hidden; text-align:center;
          background:linear-gradient(180deg, #E8C9A0 0%, #DBA57F 40%, #C98B84 75%, #B26A54 100%);
          padding:44px 20px 0;
        }
        .mad-titulo{ font-family:var(--font-hand); font-size:clamp(1.5rem,5.5vw,2.1rem); color:#4A3B2C; transform:rotate(-2deg); position:relative; z-index:3; }
        .mad-helado{ width:min(230px,52vw); margin:16px auto -4px; position:relative; z-index:2; }
        .mad-gota{ transform-origin:top center; }
        .mad-skyline{ display:block; width:100%; position:relative; z-index:1; margin-top:-40px; }
        .mad-sol{ position:absolute; left:14%; top:26%; width:80px; height:80px; border-radius:50%;
          background:radial-gradient(circle, #F3ECDA, #C9A24B 60%, transparent 72%); opacity:.85; }
      </style>

      <div class="mad-escena" id="madEscena">
        <div class="mad-sol"></div>
        <div class="mad-titulo">fresa y limón, la pareja original (después de nosotros)</div>
        <svg class="mad-helado" viewBox="0 0 160 240" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 130 L80 225 L105 130 Z" fill="#DDCFB2" stroke="#4A3B2C" stroke-width="3.5" stroke-linejoin="round"/>
          <path d="M58 140 h44 M63 158 h34 M68 176 h24 M73 194 h14" stroke="#B26A54" stroke-width="2" opacity=".6"/>
          <circle cx="62" cy="96" r="34" fill="#C98B84" stroke="#4A3B2C" stroke-width="3.5"/>
          <circle cx="100" cy="88" r="36" fill="#E8D98F" stroke="#4A3B2C" stroke-width="3.5"/>
          <circle cx="80" cy="52" r="10" fill="#7C3B34" stroke="#4A3B2C" stroke-width="3"/>
          <path class="mad-gota" id="madGota1" d="M56 126 q4 0 4 6 q0 8 -4 8 q-4 0 -4 -8 q0 -6 4 -6" fill="#C98B84"/>
          <path class="mad-gota" id="madGota2" d="M104 120 q4 0 4 6 q0 8 -4 8 q-4 0 -4 -8 q0 -6 4 -6" fill="#E8D98F"/>
          <path d="M40 30 l6 6 M124 26 l-6 6 M80 14 v8" stroke="#C9A24B" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <svg class="mad-skyline" viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg" fill="#4A3B2C" opacity=".88">
          <path d="M0,120 L0,70 h30 v-16 h18 v16 h24 V50 h14 l4,-14 4,14 h12 v70 h40 V64 h34 v-22 h10 v-8 h6 v8 h10 v22 h26 v56 h36 V58 h44 l6,-18 6,18 h30 v62 h38 V70 h28 V44 h8 l3,-12 3,12 h8 v26 h30 v50 h44 V60 h36 v-14 h20 v14 h28 v60 h36 V72 h30 v48 Z"/>
        </svg>
      </div>`;

    if (reduced || !App.hasGsap || typeof ScrollTrigger === 'undefined') return;

    /* las gotas caen y se regeneran con el scroll */
    ['#madGota1', '#madGota2'].forEach((sel, i) => {
      gsap.fromTo(sel, { y: 0, scaleY: .4, opacity: 0 }, {
        y: 84 + i * 16, scaleY: 1.35, opacity: 1, ease: 'power1.in',
        scrollTrigger: { trigger: '#madEscena', start: 'top 75%', end: 'bottom 40%', scrub: 1.2 },
      });
    });
    /* el sol se pone despacio con el scroll */
    gsap.to('.mad-sol', { y: 60, opacity: .55, ease: 'none',
      scrollTrigger: { trigger: '#madEscena', start: 'top 80%', end: 'bottom 30%', scrub: true } });
    /* palpito goloso del helado */
    gsap.to('.mad-helado', { y: -6, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};
