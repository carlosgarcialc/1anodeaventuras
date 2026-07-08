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
          <!-- cumbres nevadas -->
          <g fill="#F7F1E1" stroke="#DDCFB2" stroke-width="1.5">
            <path d="M44,56 Q54,30 64,54 Q59,48 54,52 Q49,46 44,56 Z"/>
            <path d="M140,48 Q146,24 156,46 Q151,40 146,44 Q143,38 140,48 Z"/>
            <path d="M270,60 Q278,34 288,58 Q283,52 278,56 Q274,50 270,60 Z"/>
            <path d="M454,66 Q462,44 474,64 Q469,58 464,62 Q459,56 454,66 Z"/>
            <path d="M634,70 Q640,56 652,68 Q647,63 643,67 Q639,62 634,70 Z"/>
          </g>
          <path d="M0,150 L0,116 Q60,108 120,114 Q200,122 280,116 Q380,108 470,118 Q580,128 680,120 Q740,116 800,122 L800,150 Z"
            fill="#8a5140"/>
          <!-- manto de nieve sobre el valle -->
          <path d="M0,120 Q60,111 120,117 Q200,125 280,119 Q380,111 470,121 Q580,131 680,123 Q740,119 800,125 L800,131 Q740,125 680,129 Q580,137 470,127 Q380,117 280,125 Q200,131 120,123 Q60,117 0,126 Z"
            fill="#F7F1E1" opacity=".9"/>
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

    /* copitos de nieve dentro de la escena del amanecer */
    if (!reduced){
      for (let i = 0; i < 18; i++){
        const f = document.createElement('span');
        const s = 3 + Math.random() * 4;
        f.style.cssText = `position:absolute;width:${s}px;height:${s}px;border-radius:50%;
          background:#F7F1E1;opacity:${.5 + Math.random() * .45};left:${Math.random() * 98}%;top:-6px;
          box-shadow:0 0 4px rgba(247,241,225,.7);pointer-events:none;`;
        cielo.appendChild(f);
        if (App.hasGsap){
          gsap.fromTo(f, { y: -10, x: 0 }, {
            y: cielo.clientHeight + 20, x: '+=' + (Math.random() * 50 - 25),
            duration: 7 + Math.random() * 8, repeat: -1, ease: 'none', delay: Math.random() * 8,
          });
        }
      }
    }

    /* ===== escena Topkapi (va TRAS el carrete: nunca dos bromas seguidas) ===== */
    (function(){
      const esc = document.createElement('section');
      esc.className = 'escena-abierta will-reveal';
      esc.innerHTML = `
        <div class="escena-titulo">clase de historia otomana (nivel: incómodo)</div>
        <div class="escena-figuras">
          <svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <!-- cúpulas de Topkapi -->
            <g>
              <path d="M40 82 Q40 44 70 44 Q100 44 100 82 Z" fill="#9BBAC0"/>
              <rect x="44" y="78" width="52" height="8" fill="#F3ECDA"/>
              <path d="M70 44 V30" stroke="#C9A24B"/><path d="M66 28 a4 4 0 1 0 6 3" stroke="#C9A24B" stroke-width="2" fill="none"/>
              <path d="M360 90 Q360 52 388 52 Q416 52 416 90 Z" fill="#C98B84"/>
              <rect x="364" y="86" width="56" height="8" fill="#F3ECDA"/>
              <path d="M388 52 V38" stroke="#C9A24B"/><path d="M384 36 a4 4 0 1 0 6 3" stroke="#C9A24B" stroke-width="2" fill="none"/>
            </g>
            <!-- arco otomano detrás -->
            <path d="M150 214 V150 Q150 104 230 104 Q310 104 310 150 V214" fill="#F3ECDA" opacity=".45"/>
            <path d="M150 214 V150 Q150 104 230 104 Q310 104 310 150 V214" stroke="#6E5B48" stroke-width="2" opacity=".4"/>
            <path d="M0 214 h460" stroke="#B26A54" stroke-width="3"/>
            <!-- tulipanes otomanos -->
            <g stroke-width="2">
              <path d="M60 214 v-14 M60 200 q-7 -2 -6 -9 q6 1 6 6 q0 -8 6 -9 q4 6 0 11 q6 -3 8 2 q-4 6 -14 4 Z" fill="#B26A54"/>
              <path d="M410 214 v-12 M410 202 q-6 -2 -5 -8 q5 1 5 5 q0 -7 5 -8 q4 5 0 10 q5 -2 7 2 q-4 5 -12 3 Z" fill="#C9A24B"/>
            </g>

            <!-- ÉL (explicando, mano en alto) -->
            <g>
              <path d="M126 214 q0 -42 24 -42 q24 0 24 42" fill="#5F7355"/>
              <path d="M170 188 Q190 180 192 150" stroke="#5F7355" stroke-width="8"/>
              <circle cx="192" cy="147" r="4" fill="#E8C9A0"/>
              <path d="M130 190 Q120 178 124 166" stroke="#5F7355" stroke-width="7"/>
              <circle cx="150" cy="150" r="20" fill="#E8C9A0"/>
              <path d="M131 145 Q150 127 169 145 Q160 137 150 138 Q140 137 131 145 Z" fill="#6E5B48"/>
              <path d="M142 149 q3 -4 6 0 M152 149 q3 -4 6 0" stroke-width="2.2"/>
              <path d="M146 159 q4 3 8 0" stroke-width="2.2"/>
            </g>

            <!-- ELLA (pelo largo, cara de susto) -->
            <g>
              <path d="M288 150 Q286 118 312 116 Q338 118 336 150 L334 200 Q328 206 323 199 L321 150 Q321 126 312 122 Q303 126 303 150 L301 199 Q296 206 288 200 Z" fill="#8a6a4d"/>
              <path d="M288 214 q0 -42 24 -42 q24 0 24 42" fill="#C98B84"/>
              <path d="M293 186 Q297 168 301 158" stroke="#C98B84" stroke-width="7"/>
              <path d="M331 186 Q327 168 323 158" stroke="#C98B84" stroke-width="7"/>
              <circle cx="312" cy="150" r="20" fill="#E8C9A0"/>
              <path d="M293 145 Q312 126 331 145 Q322 137 312 138 Q302 137 293 145 Z" fill="#8a6a4d"/>
              <circle cx="306" cy="150" r="3" fill="#F7F1E1" stroke-width="1.5"/><circle cx="306" cy="150" r="1.3" fill="#4A3B2C" stroke="none"/>
              <circle cx="318" cy="150" r="3" fill="#F7F1E1" stroke-width="1.5"/><circle cx="318" cy="150" r="1.3" fill="#4A3B2C" stroke="none"/>
              <ellipse cx="312" cy="161" rx="3.4" ry="4.4" fill="#7C3B34" stroke-width="1.5"/>
            </g>
          </svg>
          <div class="escena-boca" style="left:2%;top:-6px;--tail:78%">‹‹ ÉL EXPLICA — EDITAR ››<small>“…y a los guardianes del harén los llamaban eunucos.”</small></div>
          <div class="escena-boca" style="right:2%;top:16%;--tail:26%">espera… ¿les hacían QUÉ?<small>‹‹ SU CARA — EDITAR ››</small></div>
        </div>
        <div class="escena-caption">‹‹ CAPTION TOPKAPI — EDITAR ›› (lo que se aprende visitando un palacio)</div>`;
      const hist = document.querySelector('.d-historia');
      if (hist) hist.before(esc); else section.appendChild(esc);
      sembrarDestellos(esc, 4);
    })();

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

  /* ambiente: mini-globos subiendo por los laterales + copitos sueltos */
  ambient(layer, reduced){
    if (reduced) return;
    const globo = (c1, c2) => `
      <svg viewBox="0 0 60 84" fill="none" stroke="#4A3B2C" stroke-width="2.5">
        <path d="M30 2 C50 2 58 18 58 32 C58 48 44 58 36 64 L24 64 C16 58 2 48 2 32 C2 18 10 2 30 2 Z" fill="${c1}"/>
        <path d="M14 8 q-8 22 4 50 M46 8 q8 22 -4 50 M30 2 v62" stroke="${c2}" stroke-width="2"/>
        <rect x="24" y="70" width="12" height="9" rx="2" fill="#B26A54" stroke-width="2"/>
      </svg>`;
    const copo = `<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#F7F1E1" opacity=".85"/></svg>`;
    App.ambienteFlotar(layer, globo('#C98B84', '#7C3B34'), { w: 34, op: .8, dur: 20 });
    App.ambienteFlotar(layer, globo('#C9A24B', '#B26A54'), { w: 26, op: .7, dur: 26, esperaMax: 14 });
    App.ambienteFlotar(layer, globo('#9BBAC0', '#5F7355'), { w: 22, op: .6, dur: 30, esperaMax: 18 });
    App.ambienteCaer(layer, copo, { w: 7, op: .7, dur: 12 });
    App.ambienteCaer(layer, copo, { w: 5, op: .5, dur: 16, esperaMax: 12 });
  },
};
