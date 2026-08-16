# 1 año de Aventuras… por ahora ✈

Web-regalo de primer aniversario: una home con **el mapa vivo** (los 10 destinos sobre el mapa ilustrado, con ruta punteada animada) y **una página por destino** con su efecto temático, lista para abrirse desde las etiquetas NFC.

Sitio 100% estático (HTML + CSS + JS vanilla, GSAP/Lenis por CDN). Sin build, sin backend: push y funciona.

---

## 1. El mapa

Hay **dos versiones** del mapa, ambas con geografía real de Europa (datos Natural Earth, proyección azimutal como los mapas europeos de verdad) y España sutilmente agrandada con una "lupa":

- **`assets/mapa.svg`** — la que usa la web. Sin textos: solo los 10 iconos de destino (con NFC) y los 4 easter eggs (oso de Cervera, cochinillo de Segovia, piscina de Guadalajara y tienda de Huesca — decoración, sin página).
- **`assets/mapa-imprimir.svg`** — la del **cuadro físico**: igual pero con el cartucho del título ("1 año de Aventuras… por ahora") y la nota "psst: acerca el móvil a cada dibujo…". Ábrela en el navegador (con internet, para que cargue las fuentes) e imprímela o expórtala a PNG grande (Figma/Inkscape). Al ser vectorial no pierde calidad a ningún tamaño. Las pegatinas NFC van detrás de cada icono principal.

Si algún día quieres usar una foto/escaneo del cuadro en la web: guárdala como `assets/mapa.png` y se usará si falta el SVG. Los marcadores están anclados en % en `js/data/destinos.js` (campo `x`/`y`).

> El mapa se genera con dos scripts de Python (proyección + composición). Si quieres retocarlo en serio (mover decoración, cambiar el aumento de España…), pídemelo o edita el SVG directamente.

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

**Doble clic en `abrir-editor.command`**. Se abre una página con formularios normales donde escribes texto tal cual — sin comillas, sin códigos raros. Los huecos por rellenar salen resaltados y hay un contador que baja según escribes.

> ⚠️ **Nunca abras los archivos `.html` o `.js` con TextEdit.** Los reescribe como documento de texto y destruye el código (si pasa: `git checkout HEAD -- index.html` lo recupera). Usa el editor visual, o un editor de código si te apañas.

Arriba hay **dos desplegables**:
- **Destino** — la **★ Portada** (título, dedicatoria, firma, títulos de sección…) o cualquiera de los 10 destinos.
- **Qué editar** (solo para destinos):
  - *Ficha del destino* → título, fecha, intro, el pie de cada foto, historia y nota. (guarda en `js/data/<slug>.js`)
  - *Textos de las escenas* → los bocadillos y títulos de los dibujos animados: la fiesta de Bratislava, el setlist de Berlín, la clase de Topkapi, los gritos de la cabaña… (guarda en `js/data/textos-efectos.js`)

Cuando termines: **"guardar en el proyecto"** (la primera vez te pedirá que elijas la carpeta `Mapa interactivo`; dale a *Permitir*) y luego doble clic en `actualizar.command` para publicarlo.

> Guardar directo funciona en **Chrome**. Si usas Safari, el botón **"descargar archivo"** te baja el archivo y solo tienes que meterlo en `js/data/` reemplazando el que había.

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

*1 año de Aventuras… por ahora.*
