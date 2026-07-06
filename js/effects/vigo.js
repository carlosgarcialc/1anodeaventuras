/* ============================================================
   Vigo — Atlántico: olas animadas, bruma, gaviota ladrona
   (con botín) y un pulpo que saluda.
   ============================================================ */

window.DESTINO_EFFECTS = {
  init(section, reduced){
    section.innerHTML = `
      <style>
        .vig-mar{
          position:relative; overflow:hidden; min-height:380px;
          background:linear-gradient(180deg, #DCE7E4 0%, #BFD3D6 55%, #9BBAC0 100%);
        }
        .vig-ola{ position:absolute; left:-5%; width:110%; }
        .vig-ola svg{ width:100%; display:block; }
        .vig-bruma{
          position:absolute; inset:0; z-index:4; pointer-events:none;
          background:linear-gradient(180deg, rgba(243,236,218,.75), rgba(243,236,218,0) 45%);
        }
        .vig-gaviota{ position:absolute; top:16%; left:-14%; width:88px; z-index:5; }
        .vig-cartel{
          position:absolute; top:14px; left:50%; transform:translateX(-50%) rotate(-2deg); z-index:6;
          font-family:var(--font-hand); font-size:clamp(1.3rem,4.5vw,1.8rem); color:#4A3B2C;
          background:rgba(243,236,218,.85); padding:.1em .7em; border-radius:4px;
          border:1.5px solid rgba(110,91,72,.4); white-space:nowrap;
        }
        .vig-pulpo{ position:absolute; bottom:-8px; right:6%; width:120px; z-index:3; }
      </style>

      <div class="vig-mar torn-top torn-bottom" id="vigMar">
        <div class="vig-bruma"></div>
        <div class="vig-cartel">se busca: gaviota. delito: robo con vuelo.</div>

        <div class="vig-gaviota" id="vigGaviota">
          <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
            <path d="M10 34 Q26 20 42 30 Q40 18 52 14 Q66 10 76 20 Q68 20 64 25 L78 30 Q64 44 46 40 Q26 38 10 34 Z" fill="#F3ECDA"/>
            <circle cx="58" cy="20" r="1.6" fill="#4A3B2C" stroke="none"/>
            <path id="vigAla" d="M40 28 Q48 12 66 10" stroke-width="3.5"/>
            <g transform="translate(72,32) rotate(14)">
              <rect x="0" y="0" width="16" height="10" rx="2" fill="#C9A24B" stroke="#4A3B2C" stroke-width="2"/>
              <text x="8" y="8" text-anchor="middle" font-size="7" fill="#4A3B2C" stroke="none" font-family="Caveat">tuyo</text>
            </g>
          </svg>
        </div>

        <div class="vig-pulpo">
          <svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4A3B2C" stroke-width="3" stroke-linecap="round">
            <path d="M60 10 Q88 10 88 44 L88 58 Q88 66 82 66 Q76 66 76 58 M32 58 Q32 66 38 66 Q44 66 44 58 L32 44 Q32 10 60 10" fill="#C98B84"/>
            <path d="M60 10 Q32 10 32 44 L32 58" fill="none"/>
            <path id="vigTent1" d="M44 62 Q40 84 26 92 Q18 96 14 90" fill="none" stroke="#C98B84" stroke-width="7"/>
            <path id="vigTent2" d="M58 66 Q58 90 48 100" fill="none" stroke="#C98B84" stroke-width="7"/>
            <path id="vigTent3" d="M72 64 Q80 86 96 90 Q104 92 106 84" fill="none" stroke="#C98B84" stroke-width="7"/>
            <circle cx="50" cy="40" r="2.4" fill="#4A3B2C" stroke="none"/>
            <circle cx="72" cy="40" r="2.4" fill="#4A3B2C" stroke="none"/>
            <path d="M54 52 q6 5 14 0" stroke-width="2.5"/>
          </svg>
        </div>
      </div>`;

    /* tres capas de ola generadas */
    const mar = document.getElementById('vigMar');
    const olas = [
      { y: 48, o: .5, c: '#9BBAC0', dur: 9 },
      { y: 62, o: .7, c: '#7FA6AD', dur: 7 },
      { y: 76, o: .9, c: '#5F8B94', dur: 5.4 },
    ];
    olas.forEach((o, i) => {
      const div = document.createElement('div');
      div.className = 'vig-ola';
      div.style.bottom = '0';
      div.style.zIndex = i + 1;
      div.innerHTML = `
        <svg viewBox="0 0 900 ${o.y + 60}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path class="vig-ola-p" fill="${o.c}" opacity="${o.o}"
            d="M0,40 Q75,${40 - 22} 150,40 T300,40 T450,40 T600,40 T750,40 T900,40 L900,${o.y + 60} L0,${o.y + 60} Z"/>
        </svg>`;
      div.style.height = (o.y + 40) + 'px';
      mar.appendChild(div);
    });

    if (reduced || !App.hasGsap) return;

    /* olas: vaivén horizontal desfasado */
    section.querySelectorAll('.vig-ola').forEach((el, i) => {
      gsap.to(el, { x: i % 2 ? 40 : -40, duration: olas[i].dur, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(el, { y: -6 - i * 3, duration: 3 + i, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    /* gaviota cruza con su botín, en bucle */
    gsap.to('#vigGaviota', {
      x: () => mar.clientWidth * 1.3, y: -30, duration: 11, repeat: -1,
      ease: 'none', delay: 1,
      onRepeat(){ gsap.set('#vigGaviota', { y: Math.random() * 40 }); },
    });
    gsap.to('#vigAla', { attr: { d: 'M40 28 Q48 40 66 38' }, duration: .4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    /* pulpo saluda */
    gsap.to('#vigTent3', { attr: { d: 'M72 64 Q84 80 98 78 Q106 76 104 68' }, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.vig-pulpo', { y: 6, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};
