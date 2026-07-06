/* ============================================================
   Bucarest — Drácula mono pero gótico
   Murciélagos que cruzan, niebla, velas y castillo. Acento wine.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .buc-noche{
          position:relative; overflow:hidden; min-height:400px;
          background:linear-gradient(180deg, #3b3230 0%, #4A3B2C 50%, #5b4a38 100%);
          text-align:center;
        }
        .buc-luna{
          position:absolute; top:34px; right:12%; width:64px; height:64px; border-radius:50%;
          background:radial-gradient(circle at 40% 36%, #F3ECDA, #DDCFB2 70%);
          box-shadow:0 0 34px rgba(243,236,218,.35);
        }
        .buc-castillo{ position:absolute; bottom:0; left:0; right:0; }
        .buc-bat{ position:absolute; width:44px; color:#241c13; z-index:5; }
        .buc-bat svg{ overflow:visible; }
        .buc-ala{ transform-origin:center; }
        @keyframes aleteo{ 0%,100%{ transform:scaleY(1);} 50%{ transform:scaleY(.35);} }
        .buc-bat .buc-ala{ animation:aleteo .5s ease-in-out infinite; }
        html.no-motion .buc-bat .buc-ala{ animation:none; }
        .buc-niebla{
          position:absolute; bottom:0; left:-10%; width:120%; height:100px; z-index:6;
          background:linear-gradient(180deg, rgba(221,207,178,0), rgba(221,207,178,.55));
          filter:blur(8px);
        }
        .buc-titulo{
          position:relative; z-index:7; padding-top:30px;
          font-family:var(--font-hand); font-size:clamp(1.5rem,5.5vw,2.1rem);
          color:#F3ECDA; transform:rotate(-2deg);
        }
        .buc-velas{ position:absolute; bottom:16px; left:0; right:0; display:flex; justify-content:center; gap:22px; z-index:7; }
        .buc-vela{ width:20px; }
        .buc-llama{ transform-origin:50% 90%; animation:bucVela 1.3s ease-in-out infinite; }
        @keyframes bucVela{ 0%,100%{ transform:scale(1) rotate(-3deg); opacity:.95;} 50%{ transform:scale(1.18) rotate(4deg); opacity:.8;} }
        html.no-motion .buc-llama{ animation:none; }
        .buc-caption{ text-align:center; font-family:var(--font-hand); font-size:1.4rem; color:var(--ink-soft); padding:14px 20px 0; }
      </style>

      <div class="buc-noche torn-top torn-bottom" id="bucNoche">
        <div class="buc-luna"></div>
        <div class="buc-titulo">bienvenidos a Transilvania (sucursal Bucarest)</div>

        <svg class="buc-castillo" viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg">
          <g fill="#241c13">
            <path d="M90 220 v-90 l-12 0 v-16 h10 v-10 h10 v10 h10 v-10 h10 v10 h10 v16 h-12 v90 Z"/>
            <path d="M240 220 v-120 l30 -46 30 46 v120 Z"/>
            <path d="M380 220 v-100 h-14 v-18 h12 v-12 h12 v12 h12 v-12 h12 v12 h12 v18 h-14 v100 Z"/>
            <path d="M540 220 v-140 l26 -40 26 40 v140 Z"/>
            <path d="M680 220 v-84 h-10 v-14 h8 v-8 h9 v8 h9 v-8 h9 v8 h8 v14 h-10 v84 Z"/>
            <path d="M0 220 h800 v-34 q-100 -14 -200 -8 q-100 6 -200 0 q-100 -6 -200 2 q-100 8 -200 6 Z"/>
          </g>
          <g fill="#C9A24B" opacity=".9">
            <rect x="262" y="120" width="9" height="14" rx="2"/>
            <rect x="558" y="120" width="9" height="14" rx="2"/>
            <rect x="99" y="150" width="8" height="12" rx="2"/>
          </g>
        </svg>

        <div class="buc-niebla" id="bucNiebla"></div>
        <div class="buc-velas">
          ${[0,1,2].map(i => `
            <svg class="buc-vela" viewBox="0 0 22 50" style="width:${16 + i * 4}px">
              <rect x="5" y="18" width="12" height="28" rx="3" fill="#F3ECDA" stroke="#241c13" stroke-width="1.6"/>
              <path class="buc-llama" style="animation-delay:${i * .35}s" d="M11 3 Q15 10 11 15 Q7 10 11 3 Z" fill="#C9A24B"/>
            </svg>`).join('')}
        </div>
      </div>
      <div class="buc-caption">mordiscos confirmados: 0 · sustos: solo por los precios del taxi</div>`;

    /* murciélagos */
    const noche = document.getElementById('bucNoche');
    const batSVG = `
      <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path class="buc-ala" d="M28 14 Q18 2 4 6 Q10 10 8 16 Q16 12 28 18 Z"/>
        <path class="buc-ala" d="M32 14 Q42 2 56 6 Q50 10 52 16 Q44 12 32 18 Z"/>
        <ellipse cx="30" cy="15" rx="5" ry="7"/>
        <path d="M27 9 l-2 -5 3 3 M33 9 l2 -5 -3 3"/>
      </svg>`;
    const bats = [];
    for (let i = 0; i < 5; i++){
      const b = document.createElement('div');
      b.className = 'buc-bat';
      b.style.width = (26 + Math.random() * 26) + 'px';
      b.style.top = (12 + Math.random() * 40) + '%';
      b.style.left = '-60px';
      b.innerHTML = batSVG;
      b.querySelectorAll('.buc-ala').forEach(a => a.style.animationDelay = (Math.random() * .4) + 's');
      noche.appendChild(b);
      bats.push(b);
    }

    if (reduced || !App.hasGsap) return;

    bats.forEach((b, i) => {
      const cruzar = () => {
        const desdeIzq = Math.random() > .4;
        const w = noche.clientWidth;
        gsap.fromTo(b,
          { x: desdeIzq ? -70 : w + 70, y: 0, scaleX: desdeIzq ? 1 : -1 },
          { x: desdeIzq ? w + 70 : -70,
            duration: 5 + Math.random() * 5, ease: 'none',
            delay: i * 1.6 + Math.random() * 2,
            onUpdate(){ b.style.top = (12 + Math.sin(this.progress() * 9 + i) * 8 + Math.random() * .5) + '%'; },
            onComplete: cruzar });
      };
      cruzar();
    });

    /* niebla que deriva */
    gsap.to('#bucNiebla', { x: 60, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    /* luna con halo que respira */
    gsap.to('.buc-luna', { boxShadow: '0 0 50px rgba(243,236,218,.5)', duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};
