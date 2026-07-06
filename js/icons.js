/* ============================================================
   beapa — iconos y adornos SVG "hechos a mano"
   Todos usan currentColor + variables de la paleta.
   ============================================================ */

(function(){
  const S = (vb, inner) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  /* ---------- iconos por destino (los del mapa) ---------- */
  window.ICONOS = {
    vigo: S('0 0 64 64', `
      <path d="M6 34 Q18 22 30 30 Q26 20 36 16 Q48 12 56 22 Q50 22 46 26 L58 30 Q46 44 30 40 Q16 38 6 34 Z" fill="#F3ECDA"/>
      <circle cx="41" cy="22" r="1.6" fill="#4A3B2C" stroke="none"/>
      <path d="M52 24 l7 1 -6 3" stroke-width="2.4" stroke="#C9A24B"/>
      <path d="M10 48 q8 -5 16 0 q8 5 16 0 q8 -5 12 0" stroke="#9BBAC0" stroke-width="2.6"/>`),
    madrid: S('0 0 64 64', `
      <path d="M24 30 L32 58 L40 30 Z" fill="#DDCFB2" stroke="#4A3B2C"/>
      <path d="M24 34 l16 0 M27 42 l10 0" stroke-width="2" stroke="#6E5B48"/>
      <circle cx="26" cy="22" r="9" fill="#C98B84" stroke="#4A3B2C"/>
      <circle cx="38" cy="22" r="9" fill="#E8D98F" stroke="#4A3B2C"/>
      <path d="M23 30 q1 5 3 7 M39 30 q0 6 -2 8" stroke-width="2.2" stroke="#B26A54"/>`),
    cordoba: S('0 0 64 64', `
      <rect x="26" y="8" width="12" height="34" rx="6" fill="#F3ECDA" stroke="#4A3B2C"/>
      <circle cx="32" cy="48" r="9" fill="#B26A54" stroke="#4A3B2C"/>
      <path d="M32 44 V20" stroke="#B26A54" stroke-width="5"/>
      <path d="M42 14 l6 -3 M43 22 l7 0 M42 30 l6 3" stroke-width="2.4" stroke="#C9A24B"/>`),
    'copenhague-aarhus': S('0 0 64 64', `
      <path d="M14 26 h30 v14 q0 10 -15 10 q-15 0 -15 -10 Z" fill="#F3ECDA" stroke="#4A3B2C"/>
      <path d="M44 30 q10 0 8 7 q-2 6 -9 4" stroke="#4A3B2C"/>
      <path d="M22 20 q-2 -4 2 -7 M30 20 q-2 -4 2 -7 M38 20 q-2 -4 2 -7" stroke="#6E5B48" stroke-width="2.4"/>
      <path d="M18 54 h28" stroke="#6E5B48" stroke-width="2.4"/>`),
    berlin: S('0 0 64 64', `
      <rect x="26" y="8" width="12" height="20" rx="6" fill="#4A3B2C" stroke="#4A3B2C"/>
      <path d="M20 22 q0 14 12 14 q12 0 12 -14" stroke="#4A3B2C"/>
      <path d="M32 36 v12 M24 52 h16" stroke="#4A3B2C"/>
      <path d="M14 14 l4 4 M50 14 l-4 4" stroke="#C9A24B" stroke-width="2.4"/>`),
    praga: S('0 0 64 64', `
      <circle cx="32" cy="30" r="18" fill="#BFD3D6" stroke="#4A3B2C"/>
      <path d="M32 12 v36 M14 30 h36 M19 17 l26 26 M45 17 l-26 26" stroke="#F3ECDA" stroke-width="2.2"/>
      <circle cx="32" cy="30" r="18" stroke="#4A3B2C" fill="none"/>
      <path d="M32 6 v-3 M20 52 l-3 5 M44 52 l3 5" stroke="#C9A24B" stroke-width="2.4"/>`),
    bratislava: S('0 0 64 64', `
      <path d="M18 34 q14 -16 28 0 q-14 14 -28 0 Z" fill="#B26A54" stroke="#4A3B2C" transform="rotate(-18 32 32)"/>
      <path d="M30 12 l4 10 M38 12 l3 9" stroke="#6E5B48" stroke-width="2.2"/>
      <path d="M20 52 l16 -14 M20 52 l-4 6 M20 52 l6 4" stroke="#4A3B2C" stroke-width="2.6"/>`),
    tatras: S('0 0 64 64', `
      <path d="M6 50 L22 22 L32 38 L42 16 L58 50 Z" fill="#F3ECDA" stroke="#4A3B2C"/>
      <path d="M38 24 L42 16 L47 26" fill="#EAE0CA" stroke="#4A3B2C" stroke-width="2.4"/>
      <rect x="24" y="40" width="14" height="10" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.4"/>
      <rect x="28" y="43" width="4" height="4" fill="#C9A24B" stroke="none"/>`),
    bucarest: S('0 0 64 64', `
      <path d="M32 16 Q30 26 20 26 Q28 30 26 40 Q32 34 38 40 Q36 30 44 26 Q34 26 32 16 Z" fill="#4A3B2C" stroke="#4A3B2C"/>
      <path d="M24 46 q8 6 16 0" stroke="#7C3B34" stroke-width="2.6"/>
      <path d="M27 50 l2 4 M35 50 l-2 4" stroke="#F3ECDA" stroke-width="2.4"/>
      <circle cx="28" cy="22" r="1.5" fill="#C98B84" stroke="none"/><circle cx="36" cy="22" r="1.5" fill="#C98B84" stroke="none"/>`),
    'estambul-capadocia': S('0 0 64 64', `
      <circle cx="32" cy="24" r="16" fill="#C98B84" stroke="#4A3B2C"/>
      <path d="M20 28 q12 8 24 0 M24 16 q8 -5 16 0" stroke="#C9A24B" stroke-width="2.4"/>
      <path d="M25 38 l2 8 h10 l2 -8" stroke="#4A3B2C"/>
      <rect x="27" y="46" width="10" height="8" rx="2" fill="#B26A54" stroke="#4A3B2C" stroke-width="2.4"/>`),
  };

  /* ---------- adornos compartidos ---------- */
  window.ADORNOS = {
    sparkle: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 0 C13 7 15 9 24 12 C15 15 13 17 12 24 C11 17 9 15 0 12 C9 9 11 7 12 0 Z"/></svg>`,
    avion: S('0 0 64 40', `
      <path d="M4 26 L40 18 L56 6 Q60 4 58 9 L48 22 L54 30 L46 30 L40 24 L14 30 Z" fill="#F3ECDA"/>
      <path d="M40 18 L34 8 L40 8 L48 16" fill="#F3ECDA"/>`),
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

  /* helper: siembra destellos aleatorios en un contenedor */
  window.sembrarDestellos = function(el, n = 6){
    for (let i = 0; i < n; i++){
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.innerHTML = ADORNOS.sparkle;
      s.style.left = (5 + Math.random() * 90) + '%';
      s.style.top = (5 + Math.random() * 85) + '%';
      s.style.setProperty('--dur', (2 + Math.random() * 2.6).toFixed(2) + 's');
      s.style.setProperty('--delay', (Math.random() * 3).toFixed(2) + 's');
      const sc = .5 + Math.random() * .9;
      s.style.width = s.style.height = (22 * sc).toFixed(0) + 'px';
      el.appendChild(s);
    }
  };
})();
