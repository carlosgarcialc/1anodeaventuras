/* ============================================================
   Bucarest — contenido de la página
   ✏️ EDITA AQUÍ: fechas, textos y captions.
   La media va en /assets/destinos/bucarest/ con estos nombres:
   hero.jpg (o hero.mp4 cambiando type a 'video'), foto-1.jpg…
   Busca "EDITAR" para ver todos los huecos.
   ============================================================ */

window.DESTINO_DATA = {
  slug: 'bucarest',
  titulo: 'Bu<em>ca</em>rest',
  fechas: '\u2039\u2039 FECHAS \u2014 EDITAR \u203a\u203a \u00b7 p. ej. \u00abmarzo 2026\u00bb',

  intro: '\u2039\u2039 INTRO \u2014 EDITAR \u203a\u203a \u2014 Transilvania de andar por casa: murciélagos, niebla, velas y cero mordiscos (confirmados).',

  hero: { type: 'img', src: 'hero.jpg' },  // cambia a { type:'video', src:'hero.mp4' } si es video

  galeriaSub: 'mono pero gótico, como prometimos',
  galeria: [
    { type: 'img',   src: 'foto-1.jpg', caption: '\u2039\u2039 CAPTION 1 \u2014 EDITAR \u203a\u203a' },
    { type: 'img',   src: 'foto-2.jpg', caption: '\u2039\u2039 CAPTION 2 \u2014 EDITAR \u203a\u203a', horizontal: true },
    { type: 'img',   src: 'foto-3.jpg', caption: '\u2039\u2039 CAPTION 3 \u2014 EDITAR \u203a\u203a' },
    { type: 'video', src: 'video-1.mp4', caption: '\u2039\u2039 CAPTION V\u00cdDEO \u2014 EDITAR \u203a\u203a' },
    { type: 'img',   src: 'foto-4.jpg', caption: '\u2039\u2039 CAPTION 4 \u2014 EDITAR \u203a\u203a', horizontal: true },
    { type: 'img',   src: 'foto-5.jpg', caption: '\u2039\u2039 CAPTION 5 \u2014 EDITAR \u203a\u203a' },
  ],

  historia: '\u2039\u2039 HISTORIA \u2014 EDITAR \u203a\u203a \u2014 Aqu\u00ed va nuestra an\u00e9cdota de Bucarest: c\u00f3mo empez\u00f3, qu\u00e9 sali\u00f3 (m\u00e1s o menos) seg\u00fan el plan y qu\u00e9 no olvidaremos.',

  nota: '‹‹ INSIDE JOKE — EDITAR ›› <br>(Drácula nos pareció majo)',
};
