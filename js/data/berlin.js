/* ============================================================
   Berlín — contenido de la página
   ✏️ EDITA AQUÍ: fechas, textos y captions.
   La media va en /assets/destinos/berlin/ con estos nombres:
   hero.jpg (o hero.mp4 cambiando type a 'video'), foto-1.jpg…
   Busca "EDITAR" para ver todos los huecos.
   ============================================================ */

window.DESTINO_DATA = {
  slug: 'berlin',
  titulo: 'Ber<em>lín</em>',
  fechas: '‹‹ FECHAS — EDITAR ›› · p. ej. «marzo 2026»',

  intro: '‹‹ INTRO — EDITAR ›› — Carolina Durante en directo, saltos, confeti y un tinnitus muy feliz.',

  hero: { type: 'img', src: 'hero.jpg' },  // cambia a { type:'video', src:'hero.mp4' } si es video

  galeriaSub: 'fotos movidas = concierto bueno',
  galeria: [
    { type: 'img',   src: 'foto-1.jpg', caption: '‹‹ CAPTION 1 — EDITAR ››' },
    { type: 'img',   src: 'foto-2.jpg', caption: '‹‹ CAPTION 2 — EDITAR ››', horizontal: true },
    { type: 'img',   src: 'foto-3.jpg', caption: '‹‹ CAPTION 3 — EDITAR ››' },
    { type: 'video', src: 'video-1.mp4', caption: '‹‹ CAPTION VÍDEO — EDITAR ››' },
    { type: 'img',   src: 'foto-4.jpg', caption: '‹‹ CAPTION 4 — EDITAR ››', horizontal: true },
    { type: 'img',   src: 'foto-5.jpg', caption: '‹‹ CAPTION 5 — EDITAR ››' },
  ],

  historia: '‹‹ HISTORIA — EDITAR ›› — Aquí va nuestra anécdota de Berlín: cómo empezó, qué salió (más o menos) según el plan y qué no olvidaremos.',

  nota: '‹‹ INSIDE JOKE — EDITAR ›› <br>(la canción era la nuestra, obviamente)',
};
