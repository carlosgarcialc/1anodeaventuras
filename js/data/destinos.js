/* ============================================================
   beapa — lista global de destinos
   - El ORDEN del array = orden de la ruta punteada del mapa
     y de las flechas anterior/siguiente. Reordena a tu gusto.
   - x/y = posición del marcador en % sobre el mapa (1536×1024).
   ============================================================ */

window.DESTINOS = [
  { slug:'madrid',              nombre:'Madrid',              x:26.3, y:72.2, icono:'helado',        accent:'#B26A54', tag:'fresa y limón' },
  { slug:'cordoba',             nombre:'Córdoba',             x:20.1, y:84.0, icono:'termometro',    accent:'#C9A24B', tag:'42° a la sombra' },
  { slug:'vigo',                nombre:'Vigo',                x:11.1, y:63.2, icono:'gaviota',       accent:'#9BBAC0', tag:'ojo con la gaviota' },
  { slug:'bratislava',          nombre:'Bratislava',          x:60.8, y:55.7, icono:'salchicha',     accent:'#5F7355', tag:'la del Danubio' },
  { slug:'bucarest',            nombre:'Bucarest',            x:77.3, y:59.5, icono:'vampiro',       accent:'#7C3B34', tag:'mono pero gótico' },
  { slug:'tatras',              nombre:'Tatras',              x:67.0, y:48.9, icono:'cabana',        accent:'#5F7355', tag:'nieve y cabaña' },
  { slug:'copenhague-aarhus',   nombre:'Copenhague–Aarhus',   x:50.7, y:28.7, icono:'cafe',          accent:'#9BBAC0', tag:'hygge (y un enfado)' },
  { slug:'berlin',              nombre:'Berlín',              x:52.9, y:41.3, icono:'microfono',     accent:'#4A3B2C', tag:'Carolina Durante' },
  { slug:'praga',               nombre:'Praga',               x:61.3, y:41.2, icono:'discoball',     accent:'#C9A24B', tag:'bola de disco' },
  { slug:'estambul-capadocia',  nombre:'Estambul–Capadocia',  x:84.7, y:76.2, icono:'kebab',         accent:'#C98B84', tag:'globos al amanecer' },
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
