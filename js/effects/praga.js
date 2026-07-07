/* ============================================================
   Praga — bola de disco + reloj astronómico + Puente de Carlos
   Destellos de espejo que barren la escena.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .prg-fiesta{
          position:relative; overflow:hidden; text-align:center;
          background:linear-gradient(180deg, #4A3B2C 0%, #5b4a38 70%, #6E5B48 100%);
          padding:30px 20px 0; min-height:380px;
        }
        .prg-titulo{ font-family:var(--font-hand); font-size:clamp(1.5rem,5.5vw,2.1rem); color:#F3ECDA; transform:rotate(-2deg); position:relative; z-index:5; }
        .prg-bola{ width:min(150px,36vw); margin:18px auto 0; position:relative; z-index:4;
          filter:drop-shadow(0 0 24px rgba(243,236,218,.35)); }
        .prg-destello{
          position:absolute; width:10px; height:10px; z-index:3; color:#F3ECDA;
          pointer-events:none;
        }
        .prg-reloj{ position:absolute; left:6%; bottom:70px; width:min(120px,24vw); z-index:2; }
        .prg-puente{ position:absolute; bottom:0; left:0; right:0; z-index:2; }
        .prg-caption{ text-align:center; font-family:var(--font-hand); font-size:1.4rem; color:var(--ink-soft); padding:14px 20px 0; }
      </style>

      <div class="prg-fiesta torn-top torn-bottom" id="prgFiesta">
        <div class="prg-titulo">Praga de día: gótica. Praga con nosotros: discoteca.</div>

        <svg class="prg-bola" id="prgBola" viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg">
          <line x1="60" y1="0" x2="60" y2="14" stroke="#DDCFB2" stroke-width="3"/>
          <g id="prgBolaG">
            <circle cx="60" cy="70" r="54" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="3"/>
            <g stroke="#F3ECDA" stroke-width="2" opacity=".85">
              <path d="M6 70 h108 M12 46 h96 M12 94 h96 M24 26 h72 M24 114 h72" fill="none"/>
              <path d="M60 16 v108 M36 20 v100 M84 20 v100 M18 34 v72 M102 34 v72" fill="none"/>
            </g>
            <circle cx="42" cy="52" r="5" fill="#F7F1E1" opacity=".95"/>
            <circle cx="78" cy="84" r="4" fill="#F7F1E1" opacity=".8"/>
          </g>
        </svg>

        <svg class="prg-reloj" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="0" width="40" height="130" fill="#241c13"/>
          <path d="M30 0 l20 -14 20 14" fill="#241c13"/>
          <circle cx="50" cy="46" r="24" fill="#C9A24B" stroke="#F3ECDA" stroke-width="2.5"/>
          <circle cx="50" cy="46" r="15" fill="#B26A54" stroke="#F3ECDA" stroke-width="1.6"/>
          <g id="prgAgujas" stroke="#241c13" stroke-width="3" stroke-linecap="round">
            <line x1="50" y1="46" x2="50" y2="30"/>
            <line x1="50" y1="46" x2="61" y2="50" stroke-width="2.2"/>
          </g>
          <circle cx="50" cy="96" r="16" fill="#8B9A78" stroke="#F3ECDA" stroke-width="2"/>
        </svg>

        <svg class="prg-puente" viewBox="0 0 800 110" xmlns="http://www.w3.org/2000/svg">
          <g fill="#241c13">
            <path d="M0 110 v-58 h800 v58 Z" opacity="0"/>
            <path d="M0 52 h800 v14 h-800 Z"/>
            <path d="M60 66 q40 44 80 0 Z M220 66 q40 44 80 0 Z M380 66 q40 44 80 0 Z M540 66 q40 44 80 0 Z M700 66 q40 44 80 0 Z"/>
            <rect x="150" y="10" width="20" height="44"/><path d="M150 10 l10 -12 10 12"/>
            <rect x="630" y="10" width="20" height="44"/><path d="M630 10 l10 -12 10 12"/>
            <g>
              <rect x="298" y="30" width="5" height="24"/><circle cx="300" cy="26" r="5"/>
              <rect x="498" y="30" width="5" height="24"/><circle cx="500" cy="26" r="5"/>
            </g>
          </g>
          <path d="M0 92 q100 10 200 4 q100 -6 200 2 q100 8 200 0 q100 -8 200 2 L800 110 L0 110 Z" fill="#3d332a"/>
        </svg>
      </div>
      <div class="prg-caption">‹‹ CAPTION FIESTA — EDITAR ›› (qué hacía ahí esa bola de disco, aún no lo sabemos)</div>`;

    /* destellos de espejo repartidos */
    const fiesta = document.getElementById('prgFiesta');
    const motas = [];
    for (let i = 0; i < 14; i++){
      const m = document.createElement('span');
      m.className = 'prg-destello';
      m.innerHTML = ADORNOS.sparkle;
      m.style.left = (5 + Math.random() * 90) + '%';
      m.style.top = (10 + Math.random() * 70) + '%';
      m.style.width = m.style.height = (6 + Math.random() * 12) + 'px';
      m.style.opacity = 0;
      fiesta.appendChild(m);
      motas.push(m);
    }

    if (reduced || !App.hasGsap){
      motas.forEach(m => m.style.opacity = .5);
      return;
    }

    /* la bola gira (las líneas verticales se desplazan) y oscila */
    gsap.to('#prgBola', { rotate: 6, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 0%' });

    /* motas de luz que se encienden como espejos */
    motas.forEach(m => {
      gsap.to(m, {
        opacity: .9, scale: 1.6, duration: .5 + Math.random() * .7,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: Math.random() * 3, repeatDelay: Math.random() * 2.2,
      });
      gsap.to(m, { rotate: 180, duration: 6 + Math.random() * 4, repeat: -1, ease: 'none' });
    });

    /* agujas del reloj astronómico */
    gsap.to('#prgAgujas line:first-child', { rotate: 360, svgOrigin: '50 46', duration: 24, repeat: -1, ease: 'none' });
    gsap.to('#prgAgujas line:last-child', { rotate: 360, svgOrigin: '50 46', duration: 8, repeat: -1, ease: 'none' });
  },

  /* ambiente: reflejos de la bola de disco vagando por toda la página */
  ambient(layer, reduced){
    if (reduced) return;
    const brillo = (c, o) => `<svg viewBox="0 0 24 24" fill="${c}" opacity="${o}"><path d="M12 0 C13 7 15 9 24 12 C15 15 13 17 12 24 C11 17 9 15 0 12 C9 9 11 7 12 0 Z"/></svg>`;
    App.ambienteCaer(layer, brillo('#C9A24B', .9), { w: 16, op: .85, dur: 16, giro: 120 });
    App.ambienteCaer(layer, brillo('#F3ECDA', .9), { w: 11, op: .7, dur: 20, giro: 90, esperaMax: 12 });
    App.ambienteCaer(layer, brillo('#9BBAC0', .8), { w: 13, op: .6, dur: 24, giro: 150, esperaMax: 16 });
    App.ambienteFlotar(layer, brillo('#C9A24B', .8), { w: 10, op: .6, dur: 18, esperaMax: 14 });
  },
};
