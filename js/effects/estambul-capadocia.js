/* ============================================================
   Estambul–Capadocia — globos al amanecer + LA CAMA
   Globos ascendiendo con parallax al scroll, cielo de amanecer
   sobre chimeneas de hadas, y la cama enorme del hotel-cueva.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .cap-cielo{
          position:relative; overflow:hidden; min-height:78svh;
          background:linear-gradient(180deg,
            #9BBAC0 0%, #C7BBAe 30%, #C98B84 55%, #C9A24B 78%, #EAE0CA 100%);
        }
        .cap-sol{
          position:absolute; left:50%; bottom:16%; width:110px; height:110px;
          transform:translateX(-50%); border-radius:50%;
          background:radial-gradient(circle, #F3ECDA, #C9A24B 65%, transparent 70%);
          filter:blur(1px); opacity:.9;
        }
        .cap-rocas{ position:absolute; left:0; right:0; bottom:-2px; }
        .cap-globo{ position:absolute; will-change:transform; filter:drop-shadow(0 6px 8px rgba(74,59,44,.25)); }
        .cap-titulo{
          position:absolute; top:26px; left:0; right:0; text-align:center; z-index:5;
          font-family:var(--font-hand); font-size:clamp(1.5rem,5.5vw,2.2rem);
          color:#4A3B2C; text-shadow:0 1px 0 rgba(243,236,218,.7);
          transform:rotate(-2deg);
        }
        .cap-cama{ max-width:560px; margin:40px auto 0; padding:0 22px; text-align:center; }
        .cap-cama svg{ width:100%; filter:drop-shadow(0 8px 16px rgba(74,59,44,.2)); }
        .cap-cama .cap-caption{
          font-family:var(--font-hand); font-size:1.5rem; color:var(--ink-soft); margin-top:10px;
          transform:rotate(-1.5deg);
        }
      </style>

      <div class="cap-cielo" id="capCielo">
        <div class="cap-titulo">los globos madrugaron más que nosotros (casi)</div>
        <div class="cap-sol"></div>
        <svg class="cap-rocas" viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,150 L0,90 Q30,88 42,60 Q54,30 66,58 Q74,80 92,84 L110,90 Q130,86 138,52 Q146,24 158,50 Q170,80 196,88 L230,96 Q260,92 268,64 Q278,34 290,62 Q300,86 330,92 L400,102 Q440,96 452,70 Q462,44 476,68 Q488,88 520,94 L580,102 Q620,98 632,74 Q640,56 654,72 Q668,90 710,96 L800,106 L800,150 Z"
            fill="#B26A54" opacity=".85"/>
          <path d="M0,150 L0,116 Q60,108 120,114 Q200,122 280,116 Q380,108 470,118 Q580,128 680,120 Q740,116 800,122 L800,150 Z"
            fill="#8a5140"/>
        </svg>
      </div>

      <div class="cap-cama will-reveal">
        <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
          <path d="M20 210 Q10 120 60 108 L360 108 Q410 120 400 210" fill="#DDCFB2"/>
          <rect x="34" y="128" width="352" height="46" rx="10" fill="#F3ECDA"/>
          <path d="M34 150 q90 -16 176 0 q90 16 176 0" stroke="#C98B84" stroke-width="4" fill="none"/>
          <rect x="52" y="96" width="92" height="30" rx="12" fill="#F7F1E1"/>
          <rect x="276" y="96" width="92" height="30" rx="12" fill="#F7F1E1"/>
          <path d="M20 210 v6 M400 210 v6" stroke-width="5"/>
          <path d="M120 60 q6 -18 24 -14 M300 58 q-6 -18 -24 -14" stroke="#6E5B48" stroke-width="2.5"/>
          <text x="210" y="52" text-anchor="middle" font-family="Caveat, cursive" font-size="30" fill="#7C3B34" stroke="none" transform="rotate(-3 210 52)">tamaño: provincia</text>
        </svg>
        <div class="cap-caption">‹‹ CAPTION DE LA CAMA — EDITAR ›› (guiño al hotel-cueva)</div>
      </div>`;

    /* globos: SVG generado con variaciones de la paleta */
    const cielo = document.getElementById('capCielo');
    const colores = [['#C98B84', '#7C3B34'], ['#C9A24B', '#B26A54'], ['#9BBAC0', '#5F7355'], ['#F3ECDA', '#C98B84'], ['#B26A54', '#C9A24B']];
    const globos = [];
    for (let i = 0; i < 8; i++){
      const [c1, c2] = colores[i % colores.length];
      const g = document.createElement('div');
      g.className = 'cap-globo';
      const w = 46 + Math.random() * 60;               // tamaño = profundidad
      g.style.width = w + 'px';
      g.style.left = (4 + Math.random() * 84) + '%';
      g.style.top = (14 + Math.random() * 55) + '%';
      g.innerHTML = `
        <svg viewBox="0 0 60 84" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 2 C50 2 58 18 58 32 C58 48 44 58 36 64 L24 64 C16 58 2 48 2 32 C2 18 10 2 30 2 Z" fill="${c1}" stroke="#4A3B2C" stroke-width="2.5"/>
          <path d="M14 8 q-8 22 4 50 M46 8 q8 22 -4 50 M30 2 v62" stroke="${c2}" stroke-width="2.2" fill="none"/>
          <path d="M24 64 l2 8 h8 l2 -8" stroke="#4A3B2C" stroke-width="2" fill="none"/>
          <rect x="24" y="72" width="12" height="9" rx="2" fill="#B26A54" stroke="#4A3B2C" stroke-width="2"/>
        </svg>`;
      cielo.appendChild(g);
      globos.push({ el: g, depth: w / 106 });
    }

    if (reduced || !App.hasGsap || typeof ScrollTrigger === 'undefined') return;

    /* parallax: al hacer scroll los globos ascienden a distinta velocidad */
    globos.forEach(({ el, depth }) => {
      gsap.to(el, {
        y: -(160 + depth * 340), x: (Math.random() * 60 - 30),
        ease: 'none',
        scrollTrigger: { trigger: cielo, start: 'top bottom', end: 'bottom top', scrub: 1 + depth },
      });
      /* balanceo continuo, muy suave */
      gsap.to(el, { rotate: (Math.random() > .5 ? 1 : -1) * (2 + Math.random() * 3),
        duration: 2.6 + Math.random() * 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });
    /* el sol asoma con el scroll */
    gsap.from(section.querySelector('.cap-sol'), {
      y: 90, opacity: .3, ease: 'none',
      scrollTrigger: { trigger: cielo, start: 'top 80%', end: 'center center', scrub: true },
    });
  },
};
