/* ============================================================
   Tatras — contenido de la página
   ✏️ EDITA AQUÍ: fechas, textos y captions.
   La media va en /assets/destinos/tatras/ con estos nombres:
   hero.jpg (o hero.mp4 cambiando type a 'video'), foto-1.jpg…
   Busca "EDITAR" para ver todos los huecos.
   ============================================================ */

window.DESTINO_DATA = {
  slug: 'tatras',
  titulo: 'Ta<em>tras</em>',
  fechas: '‹‹ FECHAS — EDITAR ›› · p. ej. «marzo 2026»',

  intro: '‹‹ INTRO — EDITAR ›› — Montañas, nieve cayendo a cámara lenta y una cabaña con la ventanita encendida.',

  hero: { type: 'img', src: 'hero.jpg' },  // cambia a { type:'video', src:'hero.mp4' } si es video

  galeriaSub: 'frío fuera, alcohol dentro',
  galeria: [
    { type: 'img',   src: 'foto-1.jpg', caption: '‹‹ TANTA PRUEBA DE ROPA PARA ACABAR CON VAQUEROS — EDITAR ››' },
    { type: 'img',   src: 'foto-2.jpg', caption: '‹‹ SE QUE JAMARÁS ME MIRARÁS COMO MIRAS A UN BOCADILLO — EDITAR ››', horizontal: true },
    { type: 'img',   src: 'foto-3.jpg', caption: '‹‹ UN GRUPO DE MONTAÑEROS SERIOS Y DLS BOLSAS DE BASURA — EDITAR ››' },
    { type: 'video', src: 'video-1.mp4', caption: '‹‹ VLOGSITO POR HACER ALGO EN EL BUS VÍDEO — EDITAR ››' },
    { type: 'img',   src: 'foto-4.jpg', caption: '‹‹ HASTA PARECE QUE CAMINAMOS MAS DE 2 KM— EDITAR ››', horizontal: true },
    { type: 'img',   src: 'foto-5.jpg', caption: '‹‹ CAPTION 5 — EDITAR ››' },
  ],

  historia: '‹‹ HISTORIA — EDITAR ›› — Aquí va nuestra anécdota de Tatras: cómo empezó, qué salió (más o menos) según el plan y qué no olvidaremos.',

  nota: '‹‹ INSIDE JOKE — EDITAR ›› <br>(la estufa era el tercer miembro del viaje)',
};
