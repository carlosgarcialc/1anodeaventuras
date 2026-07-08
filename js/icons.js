/* ============================================================
   beapa — iconos y adornos SVG "hechos a mano"
   Todos usan currentColor + variables de la paleta.
   ============================================================ */

(function(){
  const S = (vb, inner) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  /* ---------- iconos por destino (los mismos que en assets/mapa.svg) ---------- */
  window.ICONOS = {
    /* Vigo · pata de pulpo */
    vigo: S('0 0 64 64', `
      <path d="M18 52 C8 36 15 19 32 15 C46 12 56 23 51 34 C47 42 37 43 35 35 C34 30 38 26 43 28"
        fill="none" stroke="#4A3B2C" stroke-width="12"/>
      <path d="M18 52 C8 36 15 19 32 15 C46 12 56 23 51 34 C47 42 37 43 35 35 C34 30 38 26 43 28"
        fill="none" stroke="#C98B84" stroke-width="8"/>
      <g fill="#F3ECDA" stroke="#7C3B34" stroke-width="1.5">
        <circle cx="15" cy="44" r="2.6"/><circle cx="13" cy="33" r="2.6"/>
        <circle cx="19" cy="22" r="2.6"/><circle cx="30" cy="16" r="2.6"/>
        <circle cx="41" cy="18" r="2.6"/><circle cx="48" cy="26" r="2.4"/>
      </g>`),
    /* Madrid · helado de fresa y limón */
    madrid: S('0 0 64 64', `
      <path d="M23 34 L32 58 L41 34 Z" fill="#DDCFB2" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M25 38 l14 0 M27 44 l10 0 M29 50 l6 0" stroke="#B26A54" stroke-width="1.6"/>
      <circle cx="26" cy="25" r="10" fill="#C98B84" stroke="#4A3B2C" stroke-width="2.5"/>
      <circle cx="39" cy="23" r="9" fill="#E8D98F" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M23 34 q1 5 3 7 M40 32 q0 5 -2 7" stroke="#B26A54" stroke-width="2" fill="none"/>
      <circle cx="32" cy="13" r="4" fill="#7C3B34" stroke="#4A3B2C" stroke-width="2"/>
      <path d="M46 14 l5 -4 M16 16 l-5 -3" stroke="#C9A24B" stroke-width="2"/>`),
    /* Córdoba · termómetro que revienta */
    cordoba: S('0 0 64 64', `
      <rect x="25" y="10" width="10" height="32" rx="5" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5"/>
      <circle cx="30" cy="48" r="8" fill="#7C3B34" stroke="#4A3B2C" stroke-width="2.5"/>
      <rect x="27.5" y="16" width="5" height="30" rx="2.5" fill="#7C3B34" stroke="none"/>
      <path d="M27 6 l-3 -4 M30 5 l0 -4 M33 6 l3 -4" stroke="#B26A54" stroke-width="2.5"/>
      <path d="M43 24 q4 -3 0 -7 q-4 -4 0 -7 M50 28 q4 -3 0 -7 q-4 -4 0 -7" fill="none" stroke="#C9A24B" stroke-width="2"/>`),
    /* Copenhague–Aarhus · café pijo para llevar */
    'copenhague-aarhus': S('0 0 64 64', `
      <path d="M22 24 L42 24 L39 50 L25 50 Z" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.5"/>
      <rect x="20" y="18" width="24" height="6" rx="2" fill="#DDCFB2" stroke="#4A3B2C" stroke-width="2.2"/>
      <path d="M29 18 l0 -3 6 0" fill="none" stroke="#4A3B2C" stroke-width="2"/>
      <path d="M23 31 L41 31 L40 39 L24 39 Z" fill="#C9A24B" stroke="#4A3B2C" stroke-width="2"/>
      <path d="M32 33 c-2 -2.5 -5.5 0 -3 2.5 l3 2.5 3 -2.5 c2.5 -2.5 -1 -5 -3 -2.5 Z" fill="#7C3B34" stroke="none"/>
      <path d="M27 12 q-2 -4 1 -7 M36 12 q2 -5 -1 -8" fill="none" stroke="#6E5B48" stroke-width="2.2"/>`),
    /* Berlín · micrófono */
    berlin: S('0 0 64 64', `
      <g transform="rotate(-24 32 32)">
        <circle cx="32" cy="20" r="9" fill="#4A3B2C" stroke="#4A3B2C" stroke-width="2"/>
        <path d="M24 17 h16 M23 21 h18 M25 25 h14" stroke="#F3ECDA" stroke-width="1.4"/>
        <path d="M28 29 L25 50 L39 50 L36 29 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.2"/>
        <rect x="27" y="28" width="10" height="4" rx="2" fill="#C9A24B" stroke="#4A3B2C" stroke-width="1.6"/>
      </g>
      <path d="M48 12 l4 -4 M50 20 l6 0" stroke="#C9A24B" stroke-width="2"/>`),
    /* Praga · bola de disco */
    praga: S('0 0 64 64', `
      <path d="M32 4 V16" stroke="#4A3B2C" stroke-width="2.2"/>
      <circle cx="32" cy="31" r="14" fill="#9BBAC0" stroke="#4A3B2C" stroke-width="2.5"/>
      <path d="M18 31 h28 M20 24 h24 M20 38 h24 M32 17 v28 M25 19 v24 M39 19 v24" stroke="#F3ECDA" stroke-width="1.4"/>
      <circle cx="27" cy="26" r="2" fill="#F7F1E1" stroke="none"/>
      <path d="M12 42 l-4 3 M52 42 l4 3 M14 18 l-4 -3 M50 18 l4 -3" stroke="#C9A24B" stroke-width="2"/>`),
    /* Bratislava · salchicha pinchada en un tenedor */
    bratislava: S('0 0 64 64', `
      <g transform="rotate(-8 32 32)">
        <path d="M32 40 L32 57" stroke="#4A3B2C" stroke-width="4.5"/>
        <circle cx="32" cy="58" r="2.2" fill="#4A3B2C" stroke="none"/>
        <path d="M24 34 Q24 39 32 40 Q40 39 40 34" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.4"/>
        <path d="M24.5 18 V34 M29.5 16 V34 M34.5 16 V34 M39.5 18 V34" stroke="#4A3B2C" stroke-width="2.8"/>
        <path d="M13 28 Q11 22 19 21 L46 19 Q54 19 54 24 Q54 29 46 30 L19 32 Q13 32 13 28 Z"
          fill="#B26A54" stroke="#4A3B2C" stroke-width="2.4"/>
        <circle cx="11" cy="25" r="2" fill="#B26A54" stroke="#4A3B2C" stroke-width="1.6"/>
        <circle cx="56" cy="22" r="2" fill="#B26A54" stroke="#4A3B2C" stroke-width="1.6"/>
        <path d="M21 24 q13 -3 24 -2" stroke="#7C3B34" stroke-width="1.8" fill="none"/>
        <circle cx="29" cy="24.5" r="1" fill="#4A3B2C" stroke="none"/>
        <circle cx="36" cy="24" r="1" fill="#4A3B2C" stroke="none"/>
        <path d="M30 27 q2.5 2 5 -.4" stroke="#4A3B2C" stroke-width="1.4" fill="none"/>
        <path d="M24.5 18 V21.5 M29.5 16 V19.5 M34.5 16 V19.4 M39.5 18 V20.5" stroke="#4A3B2C" stroke-width="2.8"/>
        <path d="M28 12 q-2 -4 1 -7 M37 11 q2 -4 -1 -7" fill="none" stroke="#6E5B48" stroke-width="2"/>
      </g>`),
    /* Tatras · cabaña */
    tatras: S('0 0 64 64', `
      <path d="M40 20 v-6 h5 v10" fill="#6E5B48" stroke="#4A3B2C" stroke-width="1.8"/>
      <path d="M43 12 q4 -4 1 -8" fill="none" stroke="#DDCFB2" stroke-width="2.4"/>
      <path d="M15 36 L32 18 L49 36 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.4"/>
      <path d="M18 32 Q32 20 46 32 L44 30 Q32 19 20 30 Z" fill="#F7F1E1" stroke="none"/>
      <rect x="19" y="36" width="26" height="13" fill="#8a6a4d" stroke="#4A3B2C" stroke-width="2.2"/>
      <path d="M19 40.5 h26 M19 45 h26" stroke="#6b4f37" stroke-width="1.6"/>
      <rect x="24" y="39" width="7" height="7" fill="#E8C06B" stroke="#4A3B2C" stroke-width="1.8"/>
      <rect x="36" y="39" width="6" height="10" fill="#5b4433" stroke="#4A3B2C" stroke-width="1.8"/>`),
    /* Bucarest · vampiro */
    bucarest: S('0 0 64 64', `
      <path d="M16 42 L26 34 L23 44 Z M48 42 L38 34 L41 44 Z" fill="#4A3B2C" stroke="none"/>
      <path d="M19 46 Q24 38 32 38 Q40 38 45 46 L42 50 L22 50 Z" fill="#7C3B34" stroke="#4A3B2C" stroke-width="2.2"/>
      <circle cx="32" cy="28" r="11" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.4"/>
      <path d="M21 24 Q24 17 32 17 Q40 17 43 24 L41 26 Q36 21 32 24 Q28 21 23 26 Z" fill="#4A3B2C" stroke="none"/>
      <circle cx="28" cy="28" r="1.5" fill="#4A3B2C" stroke="none"/>
      <circle cx="36" cy="28" r="1.5" fill="#4A3B2C" stroke="none"/>
      <path d="M28 33 q4 3 8 0" fill="none" stroke="#4A3B2C" stroke-width="1.8"/>
      <path d="M29.5 33.6 l1 3 M34.5 33.6 l-1 3" stroke="#F3ECDA" stroke-width="2"/>`),
    /* Estambul–Capadocia · kebab */
    'estambul-capadocia': S('0 0 64 64', `
      <g transform="rotate(-18 32 32)">
        <path d="M16 38 L40 38 Q46 38 46 33 L46 32 Q46 27 40 27 L16 27 Q12 27 12 32.5 Q12 38 16 38 Z" fill="#F3ECDA" stroke="#4A3B2C" stroke-width="2.4"/>
        <path d="M18 27 q2 6 0 11 M25 27 q2 6 0 11 M32 27 q2 6 0 11" fill="none" stroke="#DDCFB2" stroke-width="1.8"/>
        <circle cx="45" cy="28" r="4" fill="#8B9A78" stroke="#4A3B2C" stroke-width="1.8"/>
        <circle cx="50" cy="32" r="3.6" fill="#C98B84" stroke="#4A3B2C" stroke-width="1.8"/>
        <circle cx="46" cy="36" r="3.2" fill="#B26A54" stroke="#4A3B2C" stroke-width="1.8"/>
        <path d="M52 24 q3 -3 1 -7" fill="none" stroke="#6E5B48" stroke-width="2"/>
      </g>`),
  };

  /* ---------- adornos compartidos ---------- */
  window.ADORNOS = {
    sparkle: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 0 C13 7 15 9 24 12 C15 15 13 17 12 24 C11 17 9 15 0 12 C9 9 11 7 12 0 Z"/></svg>`,
    avion: S('0 0 80 48', `
      <g fill="#F3ECDA" stroke-width="2.4" stroke-linejoin="round">
        <path d="M14 24 L2 12 L11 12 L22 22 Z"/>
        <path d="M14 24 L2 36 L11 36 L22 26 Z"/>
        <path d="M40 22 L20 4 L34 5 L52 21 Z"/>
        <path d="M40 26 L20 44 L34 43 L52 27 Z"/>
        <path d="M10 24 Q10 19 17 19 L60 20 Q72 22 76 24 Q72 26 60 28 L17 29 Q10 29 10 24 Z"/>
        <circle cx="34" cy="24" r="1.7" fill="none" stroke-width="1.5"/>
        <circle cx="42" cy="24" r="1.7" fill="none" stroke-width="1.5"/>
        <circle cx="50" cy="24" r="1.7" fill="none" stroke-width="1.5"/>
        <circle cx="66" cy="24" r="1.5" fill="#9BBAC0" stroke-width="1.4"/>
      </g>`),
    barquito: S('0 0 64 48', `
      <path d="M10 30 h44 l-8 10 h-28 Z" fill="#B26A54"/>
      <path d="M32 30 V8 M32 10 q14 2 14 12 h-14" fill="#F3ECDA"/>
      <path d="M4 44 q8 -5 14 0 q8 5 14 0 q8 -5 14 0 q6 4 14 0" stroke="#9BBAC0" stroke-width="2.4"/>`),
    bus: S('0 0 64 44', `
      <rect x="6" y="8" width="52" height="24" rx="5" fill="#C98B84"/>
      <path d="M12 14 h10 v8 h-10 Z M27 14 h10 v8 h-10 Z M42 14 h10 v8 h-10 Z" fill="#F3ECDA" stroke-width="2"/>
      <circle cx="18" cy="34" r="5" fill="#4A3B2C"/><circle cx="46" cy="34" r="5" fill="#4A3B2C"/>`),
    tren: S('0 0 72 44', `
      <rect x="4" y="10" width="30" height="22" rx="5" fill="#5F7355"/>
      <rect x="38" y="14" width="28" height="18" rx="4" fill="#B26A54"/>
      <path d="M10 16 h8 v8 h-8 Z M44 18 h6 v6 h-6 Z M55 18 h6 v6 h-6 Z" fill="#F3ECDA" stroke-width="2"/>
      <circle cx="14" cy="34" r="4.5" fill="#4A3B2C"/><circle cx="26" cy="34" r="4.5" fill="#4A3B2C"/>
      <circle cx="46" cy="34" r="4.5" fill="#4A3B2C"/><circle cx="58" cy="34" r="4.5" fill="#4A3B2C"/>
      <path d="M8 8 q-3 -4 1 -6" stroke="#6E5B48" stroke-width="2.2"/>`),
    olivo: S('0 0 90 44', `
      <path d="M4 36 Q30 18 86 10" stroke="#5F7355"/>
      <path d="M22 28 q-8 -10 2 -14 q6 8 -2 14 Z M40 21 q-7 -11 3 -14 q6 9 -3 14 Z M58 16 q-6 -11 4 -13 q5 9 -4 13 Z M32 30 q10 -4 12 4 q-9 5 -12 -4 Z M52 24 q10 -4 12 4 q-9 5 -12 -4 Z" fill="#8B9A78" stroke="#5F7355" stroke-width="2"/>
      <circle cx="70" cy="14" r="4" fill="#C9A24B" stroke="#5F7355" stroke-width="2"/>`),
    brujula: S('0 0 64 64', `
      <circle cx="32" cy="32" r="26" fill="#F3ECDA" stroke="#4A3B2C"/>
      <circle cx="32" cy="32" r="20" stroke="#6E5B48" stroke-width="1.6"/>
      <path d="M32 14 L37 32 L32 50 L27 32 Z" fill="#B26A54" stroke="#4A3B2C" stroke-width="2"/>
      <circle cx="32" cy="32" r="3" fill="#C9A24B" stroke="#4A3B2C" stroke-width="2"/>
      <text x="32" y="11" text-anchor="middle" font-size="9" fill="#4A3B2C" stroke="none" font-family="Georgia">N</text>`),
    nube: S('0 0 80 44', `
      <path d="M16 34 Q4 34 6 25 Q8 17 17 18 Q19 8 30 8 Q40 8 43 16 Q54 12 58 21 Q68 20 68 28 Q68 34 58 34 Z" fill="#F3ECDA"/>`),
    pino: S('0 0 40 64', `
      <path d="M20 4 L32 24 L26 24 L36 42 L28 42 L38 58 L2 58 L12 42 L4 42 L14 24 L8 24 Z" fill="#5F7355" stroke="#4A3B2C" stroke-width="2.4"/>
      <rect x="17" y="58" width="6" height="4" fill="#6E5B48" stroke="none"/>`),
    montanas: S('0 0 120 52', `
      <path d="M4 48 L34 10 L52 34 L70 6 L116 48 Z" fill="#DDCFB2"/>
      <path d="M28 18 L34 10 L41 20 M63 16 L70 6 L79 18" fill="#F3ECDA" stroke-width="2.4"/>`),
    camara: S('0 0 48 40', `
      <rect x="4" y="10" width="40" height="26" rx="4" fill="#F3ECDA"/>
      <circle cx="24" cy="23" r="8"/><circle cx="24" cy="23" r="3.5" fill="#6E5B48" stroke="none"/>
      <path d="M16 10 l3 -5 h10 l3 5" /><circle cx="38" cy="16" r="1.6" fill="#B26A54" stroke="none"/>`),
    claqueta: S('0 0 48 44', `
      <rect x="4" y="16" width="40" height="22" rx="3" fill="#F3ECDA"/>
      <path d="M4 16 L42 8 L44 16 Z" fill="#6E5B48"/>
      <path d="M10 14 l5 -4 M20 12 l5 -4 M30 10 l5 -4" stroke="#F3ECDA" stroke-width="2.4"/>
      <path d="M20 24 l10 5 -10 5 Z" fill="#6E5B48" stroke="none"/>`),
    corazon: `<svg viewBox="0 0 48 44" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M24 42 C10 32 2 24 2 14 C2 6 8 2 14 2 C19 2 22 5 24 9 C26 5 29 2 34 2 C40 2 46 6 46 14 C46 24 38 32 24 42 Z"/></svg>`,
  };

  /* ---------- cabezas de los muñecos (pelo bien puesto, no pelucas) ----------
     Devuelven cabeza + pelo SIN rasgos: cada escena pinta ojos/boca encima.
     Coordenadas locales: centro de la cara = (0,0), radio 20, escalable con s. */
  window.CARAS = {
    ink: '#4A3B2C',
    /* chico de pelo castaño: casquete sólido con flequillo ondulado */
    chico(x, y, s = 1, pelo = '#6E5B48', piel = '#E8C9A0'){
      return `<g transform="translate(${x},${y}) scale(${s})">
        <circle r="20" fill="${piel}" stroke="${CARAS.ink}" stroke-width="2.5"/>
        <path d="M-18.7,-7 A20,20 0 0 1 18.7,-7 Q11,-13 4,-10 Q-3,-14 -10,-10 Q-15,-10.5 -18.7,-7 Z"
          fill="${pelo}" stroke="${CARAS.ink}" stroke-width="2" stroke-linejoin="round"/>
      </g>`;
    },
    /* chica de pelo largo castaño: melena sólida detrás + flequillo con raya al medio */
    chica(x, y, s = 1, pelo = '#8a6a4d', piel = '#E8C9A0'){
      return `<g transform="translate(${x},${y}) scale(${s})">
        <path d="M-21,28 Q-26,0 -19,-11 Q-12,-27 0,-27 Q12,-27 19,-11 Q26,0 21,28 Q11,34 0,31 Q-11,34 -21,28 Z"
          fill="${pelo}" stroke="${CARAS.ink}" stroke-width="2.2" stroke-linejoin="round"/>
        <circle r="20" fill="${piel}" stroke="${CARAS.ink}" stroke-width="2.5"/>
        <path d="M-18.7,-7 A20,20 0 0 1 18.7,-7 Q9,-13.5 2.2,-9.5 Q1,-15.5 0,-16.5 Q-1,-15.5 -2.2,-9.5 Q-9,-13.5 -18.7,-7 Z"
          fill="${pelo}" stroke="${CARAS.ink}" stroke-width="2" stroke-linejoin="round"/>
      </g>`;
    },
    /* solo el casquete de pelo, para añadirlo a cabezas ya dibujadas */
    pelo(x, y, s = 1, color = '#6E5B48'){
      return `<g transform="translate(${x},${y}) scale(${s})">
        <path d="M-18.7,-7 A20,20 0 0 1 18.7,-7 Q11,-13 4,-10 Q-3,-14 -10,-10 Q-15,-10.5 -18.7,-7 Z"
          fill="${color}" stroke="${CARAS.ink}" stroke-width="2" stroke-linejoin="round"/>
      </g>`;
    },
  };

  /* helper: siembra destellos aleatorios en un contenedor */
  window.sembrarDestellos = function(el, n = 6){
    for (let i = 0; i < n; i++){
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.innerHTML = ADORNOS.sparkle;
      s.style.left = (4 + Math.random() * 82) + '%';   /* sin rozar los bordes (overflow en móvil) */
      s.style.top = (5 + Math.random() * 82) + '%';
      s.style.setProperty('--dur', (2 + Math.random() * 2.6).toFixed(2) + 's');
      s.style.setProperty('--delay', (Math.random() * 3).toFixed(2) + 's');
      const sc = .5 + Math.random() * .9;
      s.style.width = s.style.height = (22 * sc).toFixed(0) + 'px';
      el.appendChild(s);
    }
  };
})();
