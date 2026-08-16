/* ============================================================
   beapa — lista global de destinos
   - El ORDEN del array = orden de la ruta punteada del mapa
     y de las flechas anterior/siguiente. Reordena a tu gusto.
   - x/y = posición del marcador en % sobre el mapa (1536×1024).
     Coinciden con los iconos dibujados en assets/mapa.svg
     (px del SVG ÷ 1536 ó 1024 × 100).
   ============================================================ */

window.DESTINOS = [
  { slug:'madrid',              nombre:'Madrid',              x:34.19, y:86.07, icono:'helado',     accent:'#B26A54', tag:'fresa y limón' },
  { slug:'cordoba',             nombre:'Córdoba',             x:31.58, y:93.61, icono:'termometro', accent:'#C9A24B', tag:'42° a la sombra' },
  { slug:'vigo',                nombre:'Vigo',                x:27.11, y:78.10, icono:'pulpo',      accent:'#9BBAC0', tag:'ojo con la gaviota' },
  { slug:'bratislava',          nombre:'Bratislava',          x:62.43, y:65.96, icono:'salchicha',  accent:'#5F7355', tag:'la del Danubio' },
  { slug:'bucarest',            nombre:'Bucarest',            x:74.62, y:73.51, icono:'vampiro',    accent:'#7C3B34', tag:'mono pero gótico' },
  { slug:'tatras',              nombre:'Tatras',              x:65.21, y:62.64, icono:'cabana',     accent:'#5F7355', tag:'nieve y cabaña' },
  { slug:'copenhague-aarhus',   nombre:'Copenhague–Aarhus',   x:55.96, y:45.68, icono:'cafe',       accent:'#9BBAC0', tag:'hygge (y un enfado)' },
  { slug:'berlin',              nombre:'Berlín',              x:57.31, y:54.28, icono:'microfono',  accent:'#4A3B2C', tag:'Carolina Durante' },
  // Praga está OCULTO por ahora. Para volver a activarlo: quita las dos barras
  // del principio de la línea de abajo y regenera el mapa (tools/mapa/README.md).
  // { slug:'praga',            nombre:'Praga',               x:58.89, y:60.89, icono:'discoball',  accent:'#C9A24B', tag:'bola de disco' },
  { slug:'estambul-capadocia',  nombre:'Estambul–Capadocia',  x:79.80, y:81.38, icono:'kebab',      accent:'#C98B84', tag:'globos al amanecer' },
];

/* microcopy de "cargando" para las transiciones de viaje */
window.MICROCOPY_VIAJE = [
  'revelando recuerdos…',
  'sellando el pasaporte…',
  'facturando la mochila…',
  'preguntando por la puerta de embarque…',
  'pidiendo asiento de ventanilla…',
  'doblando el mapa (mal)…',
  'comprando el imán de nevera…',
];
