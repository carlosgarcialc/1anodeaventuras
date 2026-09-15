# 1 año de Aventuras… por ahora ✈

Web-regalo de primer aniversario: una home con **el mapa vivo** (los 10 destinos sobre el mapa ilustrado, con ruta punteada animada) y **una página por destino** con su efecto temático, lista para abrirse desde las etiquetas NFC.

Sitio 100% estático (HTML + CSS + JS vanilla, GSAP/Lenis por CDN). Sin build, sin backend: push y funciona.

---

## 1. El mapa

Todas las versiones usan geografía real de Europa (datos Natural Earth, proyección azimutal como los mapas europeos de verdad) y España sutilmente agrandada con una "lupa".

### Para imprimir y enmarcar (A3)

**`assets/mapa-A3.pdf`** — esto es lo que le llevas a la copistería. Mide
**420,2 × 297,0 mm** (A3 apaisado exacto), lleva las cuatro tipografías
incrustadas y los degradados a 300 dpi, así que allí no tienen que reescalar
ni retocar nada. Una sola página.

Los originales vectoriales, por si algún día quieres retocarlos, son
`assets/mapa-A3.svg` (la versión limpia, la del PDF) y
`assets/mapa-A3-detalles.svg` (la misma con una cartela abajo: leyenda de los
10 destinos, escala gráfica, sello de beapa y los textos "edición única · 1/1"
y "hecho a mano por Carlis").

> Papel recomendado: grueso mate de 250–300 g. Las pegatinas NFC van detrás de cada icono que lleva brillito dorado ✦.

### Para la web

- **`assets/mapa.svg`** — el del "mapa vivo". Sin textos ni Praga, y sin el bus dibujado (ese va animado).
- `assets/mapa-imprimir.svg` — la versión antigua en formato libre (3:2). Se conserva por si acaso; para imprimir usa las A3.

Si algún día quieres usar una foto/escaneo del cuadro en la web: guárdala como `assets/mapa.png` y se usará si falta el SVG. Los marcadores están anclados en % en `js/data/destinos.js` (campo `x`/`y`).

> El mapa se genera con dos scripts de Python (proyección + composición) en `tools/mapa/`. Si quieres retocarlo en serio (mover decoración, cambiar el aumento de España…), pídemelo o edita el SVG directamente.

## 2. Añadir fotos y vídeos

Cada destino busca su media en `assets/destinos/<slug>/` con estos nombres:

| Archivo | Dónde aparece |
|---|---|
| `hero.jpg` (o `hero.mp4`) | imagen/vídeo grande de cabecera |
| `foto-1.jpg` … `foto-5.jpg` | polaroids de la galería |
| `video-1.mp4` | polaroid de vídeo de la galería |
| `concierto.mp4` | solo Berlín: el vídeo del concierto |

Mientras un archivo no exista, se muestra un hueco vintage `‹‹ FOTO — … ››`, así que puedes ir rellenando poco a poco. Para cambiar nombres, cantidad de polaroids, orientación (`horizontal: true`) o usar vídeo de hero (`type: 'video'`), edita el array `galeria` en `js/data/<slug>.js`.

## 3. Escribir los textos ✏️

### La forma cómoda: el editor visual

**Doble clic en `abrir-editor.command`** (en Windows: **`abrir-editor.bat`**). Se abre una página con formularios normales donde escribes texto tal cual — sin comillas, sin códigos raros. Los huecos por rellenar salen resaltados y hay un contador que baja según escribes.

> ⚠️ **Nunca abras los archivos `.html` o `.js` con TextEdit (Mac) ni con Word.** Los reescriben como documento de texto y destruyen el código (si pasa: `git checkout HEAD -- index.html` lo recupera). Usa el editor visual, o un editor de código si te apañas. El Bloc de notas de Windows sí es seguro, pero el editor visual es más cómodo.

Arriba hay **dos desplegables**:
- **Destino** — la **★ Portada** (título, dedicatoria, firma, títulos de sección…) o cualquiera de los 10 destinos.
- **Qué editar** (solo para destinos):
  - *Ficha del destino* → título, fecha, intro, el pie de cada foto, historia y nota. (guarda en `js/data/<slug>.js`)
  - *Textos de las escenas* → los bocadillos y títulos de los dibujos animados: la fiesta de Bratislava, el setlist de Berlín, la clase de Topkapi, los gritos de la cabaña… (guarda en `js/data/textos-efectos.js`)

Cuando termines: **"guardar en el proyecto"** (la primera vez te pedirá que elijas la carpeta `Mapa interactivo`; dale a *Permitir*) y luego doble clic en `actualizar.command` / `actualizar.bat` para publicarlo.

> Guardar directo funciona en **Chrome** y en **Edge**. Si usas Safari, el botón **"descargar archivo"** te baja el archivo y solo tienes que meterlo en `js/data/` reemplazando el que había.

### A mano (si lo prefieres)

- **La página falsa de Bucarest** (la parodia cutre del castillo de Drácula) → `destinos/bucarest/index.html`. Es una página aparte, escrita a mano y a propósito horrible; su botón del final lleva a la página buena, que vive en `destinos/bucarest/real.html`. No la toques con el editor visual.
- **Textos de la portada** → `js/data/portada.js`
- **Ficha de cada destino** → `js/data/<slug>.js`
- **Textos de las escenas** → `js/data/textos-efectos.js` (todos juntos, agrupados por destino)

En todos los casos, los huecos están marcados como `‹‹ … — EDITAR ››`: busca `EDITAR` y ve reemplazando.

## 4. Los efectos temáticos

Cada destino tiene su módulo en `js/effects/<slug>.js`, encapsulado en:

```js
window.DESTINO_EFFECTS = { init(section, reduced){ … } };
```

- `section` es el hueco de la página donde se pinta el efecto.
- `reduced` es `true` si el visitante tiene `prefers-reduced-motion`: en ese caso los efectos muestran una versión estática.
- Para **desactivar** un efecto: comenta la línea `<script src="../../js/effects/<slug>.js">` en `destinos/<slug>/index.html`.
- Para añadir ideas nuevas, edita solo ese archivo; si el efecto peta, la página sigue funcionando (está envuelto en try/catch).

## 5. Desplegar en GitHub Pages

```bash
cd "Mapa interactivo"
git init && git add -A && git commit -m "1 año de aventuras"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `main` / carpeta `/ (root)` → Save**. En 1–2 minutos estará en:

```
https://<usuario>.github.io/<repo>/
```

Cada `git push` a `main` redespliega solo.

> Consejo: añade una imagen `assets/og.jpg` (1200×630, una foto o el propio mapa) para que la preview al compartir el enlace sea bonita. Las meta tags ya apuntan ahí.

## 6. Programar las NFC

Con cualquier app de escritura NFC (p. ej. "NFC Tools"), graba en cada etiqueta un registro **URL** con:

```
https://<usuario>.github.io/<repo>/destinos/<slug>/
```

Slugs: `madrid` · `cordoba` · `vigo` · `bratislava` · `bucarest` · `tatras` · `copenhague-aarhus` · `berlin` · `praga` · `estambul-capadocia`

## 7. Estructura

```
index.html                  home: hero + dedicatoria + mapa vivo
editar.html                 editor visual de textos
CLAUDE.md                   guía del proyecto para Claude Code
abrir-editor.command/.bat   abrir el editor   (Mac / Windows)
actualizar.command/.bat     publicar la web   (Mac / Windows)
css/
  design-system.css         paleta, tipografías, polaroids, sellos, tickets…
  home.css                  hero y mapa vivo
  destino.css               plantilla de destino
js/
  icons.js                  iconos y adornos SVG hechos a mano
  main.js                   Lenis, transiciones de viaje, helpers de media
  map.js                    mapa vivo: marcadores, ruta, pan/zoom, viaje
  destino.js                monta cada página de destino desde su config
  data/destinos.js          lista global (orden de ruta, coordenadas, acentos)
  data/<slug>.js            ✏️ textos y captions de cada destino
  effects/<slug>.js         efecto temático de cada destino
destinos/<slug>/index.html  una URL limpia por NFC
assets/
  mapa.png                  ⬅ tu mapa (ponlo aquí)
  favicon.svg
  destinos/<slug>/          ⬅ tus fotos y vídeos
```

## 8. Llevarte el proyecto a otro ordenador (Windows)

El proyecto funciona igual en Mac y en Windows. Los dos programas de doble clic
tienen su gemelo: `.command` para Mac, `.bat` para Windows.

### Qué hace falta en el ordenador nuevo

1. **Git** → <https://git-scm.com/download/win>. Durante la instalación, en
   *"Configuring the line ending conversions"*, elige
   **"Checkout as-is, commit as-is"**. El archivo `.gitattributes` ya se
   encarga de los finales de línea, y así no se pelean entre ellos.
2. **Google Chrome** (o Edge, que ya viene puesto) → hace falta para que el
   editor de textos pueda guardar directamente en el proyecto.
3. **Python** → <https://www.python.org/downloads/windows/>. Marca la casilla
   **"Add python.exe to PATH"** al instalar. Solo se usa para levantar el
   servidor local del editor y para regenerar el mapa.

### Traerte el proyecto

Con todo subido a GitHub (doble clic en `actualizar.command` antes de salir del
Mac), en el ordenador nuevo abre **Git Bash** o **PowerShell** y:

```bash
cd %USERPROFILE%\Desktop
git clone https://github.com/<usuario>/<repo>.git "Mapa interactivo"
```

Eso baja todo: web, fotos, vídeos y el historial. Es un buen rato de descarga,
son unos 300 MB de fotos.

> Si prefieres copiarlo con un USB o un disco, copia **la carpeta entera**,
> incluida la subcarpeta oculta `.git` (si no, pierdes el historial y la
> conexión con GitHub). En el Finder, ⌘⇧. muestra los archivos ocultos.
> La carpeta `.claude` no hace falta: es configuración de esta máquina.

### Trabajar desde los dos ordenadores

Si vas a tocar el proyecto desde el Mac y desde el PC, **antes de empezar** en
cualquiera de los dos:

```bash
git pull
```

Y al terminar, doble clic en `actualizar.command` / `actualizar.bat`. Así los
dos van siempre al día y no se pisan.

---

*1 año de Aventuras… por ahora.*
