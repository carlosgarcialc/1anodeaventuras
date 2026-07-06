# 1 año de Aventuras… por ahora ✈

Web-regalo de primer aniversario: una home con **el mapa vivo** (los 10 destinos sobre el mapa ilustrado, con ruta punteada animada) y **una página por destino** con su efecto temático, lista para abrirse desde las etiquetas NFC.

Sitio 100% estático (HTML + CSS + JS vanilla, GSAP/Lenis por CDN). Sin build, sin backend: push y funciona.

---

## 1. Poner el mapa

Guarda tu mapa (1536×1024) como:

```
assets/mapa.png
```

Nada más. Los marcadores y la ruta ya están anclados encima (coordenadas en `js/data/destinos.js`, campo `x`/`y` en %, por si quieres afinarlas).

## 2. Añadir fotos y vídeos

Cada destino busca su media en `assets/destinos/<slug>/` con estos nombres:

| Archivo | Dónde aparece |
|---|---|
| `hero.jpg` (o `hero.mp4`) | imagen/vídeo grande de cabecera |
| `foto-1.jpg` … `foto-5.jpg` | polaroids de la galería |
| `video-1.mp4` | polaroid de vídeo de la galería |
| `concierto.mp4` | solo Berlín: el vídeo del concierto |

Mientras un archivo no exista, se muestra un hueco vintage `‹‹ FOTO — … ››`, así que puedes ir rellenando poco a poco. Para cambiar nombres, cantidad de polaroids, orientación (`horizontal: true`) o usar vídeo de hero (`type: 'video'`), edita el array `galeria` en `js/data/<slug>.js`.

## 3. Escribir los textos

**Busca `EDITAR` en el proyecto**: todos los huecos están marcados como `‹‹ … — EDITAR ››`.

- **Dedicatoria de la home** → directamente en `index.html` (sección "bienvenida").
- **Textos de cada destino** (fechas, intro, historia, nota manuscrita, captions) → `js/data/<slug>.js`. Todo centralizado ahí.
- Algunos efectos tienen captions propios (setlist de Berlín, bocadillos del enfado de Copenhague, la cama de Capadocia) → están en `js/effects/<slug>.js`, también marcados con `EDITAR`.

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
