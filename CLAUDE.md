# beapa — 1 año de Aventuras… por ahora

Web-regalo de primer aniversario para Bea, hecha por Carlos ("Carlis").
Una home con **el mapa vivo** (10 destinos sobre un mapa ilustrado) y **una
página por destino** con su escena dibujada. Se abre desde **pegatinas NFC**
pegadas detrás de cada icono de un mapa A3 impreso.

En producción: `https://carlosgarcialc.github.io/1anodeaventuras/`

## Reglas duras

1. **Sin build, sin backend, sin dependencias instaladas.** HTML + CSS + JS
   vanilla. GSAP (+ScrollTrigger +MotionPathPlugin) y Lenis entran por CDN.
   No introduzcas npm, bundlers ni frameworks. `git push` y ya está desplegado.
2. **Prioridades del proyecto, en este orden:** (1) que sea espectacular
   visualmente, (2) que tenga dinamismo y efectos, (3) que tenga gracia con
   bromas privadas. **Nunca cursi.**
3. **No te salgas del encargo.** Si piden un PDF, entrega el PDF: no montes
   una página web para generarlo. Esto ya ha molestado antes.
4. **Todo relativo.** Ninguna ruta absoluta en HTML/CSS/JS/Python. El sitio
   tiene que funcionar igual desde `file://`, desde un servidor local y desde
   GitHub Pages en un subdirectorio.
5. **Respeta `prefers-reduced-motion`.** Cada efecto tiene su rama estática.
6. **Nunca abras los archivos del proyecto con TextEdit (Mac) ni con Word.**
   Los reescriben como documento y destruyen el código. Ya pasó una vez con
   `index.html`; se recuperó con `git checkout HEAD -- index.html`.

## Convenciones de las escenas

Los efectos viven en `js/effects/<slug>.js` con esta forma:

```js
window.DESTINO_EFFECTS = {
  init(section, reduced){ … },   // section = contenedor; reduced = sin animación
  ambient(layer, reduced){ … },  // opcional: cosas que cruzan el fondo
};
```

Si un efecto peta, la página sigue viva (va envuelto en try/catch).

- **Textos de las escenas**: nunca los escribas a pelo en el HTML del efecto.
  Van en `js/data/textos-efectos.js` y se leen con `TXT('clave')`. Cada clave
  necesita también su etiqueta legible en `js/data/textos-efectos-labels.js`,
  que es lo que consume el editor visual.
- **Muñecos**: usa siempre `CARAS.chico(x,y,s)` / `CARAS.chica(x,y,s)` de
  `js/icons.js`. Nunca dibujes pelo a mano (salían "pelucas mal colocadas").
  **Si en una escena solo hay dos personas, son un chico de pelo castaño y una
  chica de pelo castaño largo** — son ellos dos.
- **Animales y objetos**: que se reconozcan. "Una cosa es un dibujo vago y otra
  que ni se entiende el animal". Si queda ambiguo, redibújalo.
- **Orden de las secciones de una página de destino**: nunca dos escenas
  dibujadas seguidas (se intercalan con fotos); **`.d-historia` es la
  penúltima y la nota de la broma privada la última**. Varios efectos se
  recolocan solos con `hist.before(elemento)`.
  > Ojo: al mover un bloque con `hist.before(...)` deja de ser hijo de
  > `section`, así que a partir de ahí hay que buscar sus elementos dentro del
  > bloque movido, no con `section.querySelector`. Este error tuvo a los
  > patinadores de Copenhague congelados sin que se notara.
- **Paleta**: tinta `#4A3B2C` / `#241C13`, papel `#F7F1E1` / `#F3ECDA`, dorado
  `#C9A24B`, teja `#B26A54`, rosa `#C98B84`, verde `#5F7355` / `#8B9A78`,
  azul frío `#9BBAC0`. Tipografías: Playfair Display, EB Garamond, Caveat.

## Fotos y vídeos

Van en `assets/destinos/<slug>/` como `hero.jpg`, `foto-1.jpg`…`foto-5.jpg`,
`video-1.mp4`. Mientras no exista el archivo sale un hueco vintage, así que
el sitio nunca se rompe por una foto que falte.

`App.crearMedia()` prueba varias extensiones (`jpg`/`jpeg`/`JPG`/`JPEG`)
porque **GitHub Pages distingue mayúsculas y minúsculas** aunque Mac y Windows
no. Si añades rutas de imagen nuevas, respeta ese mecanismo.
Los `.HEIC` que hay sueltos en `assets/` no los usa nadie: ningún navegador
los muestra. No los borres sin preguntar, pero tampoco los enlaces.

## El mapa

`assets/mapa.svg` (web) y `assets/mapa-A3.pdf` (el cuadro para imprimir, 420 ×
297 mm) se generan con dos scripts de Python **sin dependencias externas**:

```bash
cd tools/mapa
python3 geo.py      # Mac/Linux   (en Windows: py -3 geo.py)
python3 compose.py  # Mac/Linux   (en Windows: py -3 compose.py)
```

`geo.py` proyecta Natural Earth (LAEA centrada en Europa), simplifica y aplica
la "lupa" que agranda España. `compose.py` compone los SVG. Hay que ejecutarlos
**desde `tools/mapa/`**: usan rutas relativas a ese directorio.

El PDF A3 se saca del SVG con Chrome en modo headless (`--print-to-pdf`, con
`@page { size: 420mm 297mm; margin: 0 }`). No hay toolchain de SVG instalada
y no hace falta añadir ninguna.

## Editar textos

Carlos no programa. **Los textos se editan con `editar.html`**, no a mano:
un desplegable de destino (incluida `★ Portada`) y otro de "qué editar"
(*Ficha del destino* → `js/data/<slug>.js`, *Textos de las escenas* →
`js/data/textos-efectos.js`). Guarda directo en el proyecto con la File System
Access API, que pide Chrome o Edge.

Si añades un texto editable nuevo, añádelo **en los dos** archivos: el valor en
`textos-efectos.js` y la etiqueta en `textos-efectos-labels.js`.

Los huecos por rellenar están marcados `‹‹ … — EDITAR ››`.

## Arrancar y publicar

| | Mac | Windows |
|---|---|---|
| Editor de textos | doble clic `abrir-editor.command` | doble clic `abrir-editor.bat` |
| Publicar en la web | doble clic `actualizar.command` | doble clic `actualizar.bat` |

Los cuatro hacen lo mismo en su sistema. **Si tocas uno, actualiza su gemelo.**

Para ver la web mientras trabajas, un servidor estático en la raíz del
proyecto basta:

```bash
python3 -m http.server 4173     # Windows: py -3 -m http.server 4173
```

Si usas la herramienta de preview de Claude Code, `.claude/launch.json` (que
**no** va en el repo, es de cada máquina) debería ser:

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "beapa", "runtimeExecutable": "py",
      "runtimeArgs": ["-3", "-m", "http.server", "4173"], "port": 4173 }
  ]
}
```

En Mac, `runtimeExecutable` es `/usr/bin/python3` y `runtimeArgs`
`["-m","http.server","4173"]`. Si el sandbox de macOS bloquea servir desde
`~/Desktop`, sirve una copia del proyecto desde el scratchpad.

Publicar es `git push` a `main`: GitHub Pages redespliega solo en 1-2 minutos.
Los 404 de fotos que aún no existen son normales, no son errores a arreglar.

## Estructura

```
index.html                  home: hero + dedicatoria + mapa vivo
editar.html                 editor visual de textos
css/                        design-system · home · destino
js/
  icons.js                  ICONOS, ADORNOS, CARAS, sembrarDestellos()
  main.js                   TXT(), App.crearMedia/crearPolaroid/viajarA…
  map.js                    mapa vivo: marcadores, ruta, pan/zoom
  destino.js                monta cada página desde su config
  aventuras.js              "nuevas aventuras" del usuario (IndexedDB, local)
  data/destinos.js          orden de la ruta, coordenadas x/y en %, acentos
  data/<slug>.js            ficha de cada destino (títulos, pies de foto…)
  data/portada.js           textos de la home
  data/textos-efectos.js    textos de las escenas dibujadas
  effects/<slug>.js         la escena de cada destino
destinos/<slug>/index.html  una URL limpia por etiqueta NFC
assets/destinos/<slug>/     fotos y vídeos
tools/mapa/                 generadores del mapa (Python, sin dependencias)
```

Slugs: `madrid` · `cordoba` · `vigo` · `bratislava` · `bucarest` · `tatras` ·
`copenhague-aarhus` · `berlin` · `praga` · `estambul-capadocia`.
Bucarest tiene además `real.html`: `index.html` es una parodia web cutre a
propósito, escrita a mano. No la "arregles" ni la pases por el editor visual.

> `textos-efectos.js` suelto en la raíz es un sobrante de una descarga antigua
> del editor. El bueno es `js/data/textos-efectos.js`. Nadie carga el de la raíz.
