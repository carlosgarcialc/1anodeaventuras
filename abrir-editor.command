#!/bin/bash
# Doble clic aquí para abrir el EDITOR DE TEXTOS de la web.
# (arranca un servidor local y abre el editor en Chrome, que es el que
#  permite guardar los cambios directamente en el proyecto)

cd "$(dirname "$0")"
PUERTO=4321

echo "======================================"
echo " Abriendo el editor de textos..."
echo "======================================"
echo ""

# si ya hay algo escuchando en ese puerto, no arrancamos otro
if ! lsof -i :$PUERTO >/dev/null 2>&1; then
  /usr/bin/python3 -m http.server $PUERTO --bind 127.0.0.1 >/dev/null 2>&1 &
  SERVIDOR=$!
  sleep 1
else
  SERVIDOR=""
fi

URL="http://localhost:$PUERTO/editar.html"

# Chrome permite guardar directo; si no está, abrimos el navegador por defecto
if [ -d "/Applications/Google Chrome.app" ]; then
  open -a "Google Chrome" "$URL"
else
  echo "(Consejo: con Google Chrome puedes guardar los cambios directamente."
  echo " Sin él, usa el botón 'descargar archivo' del editor.)"
  echo ""
  open "$URL"
fi

echo "Editor abierto en: $URL"
echo ""
echo "Cuando termines de editar:"
echo "  1. Pulsa 'guardar en el proyecto' en el editor"
echo "  2. Cierra esta ventana"
echo "  3. Doble clic en 'actualizar.command' para publicarlo"
echo ""
read -p "Pulsa Enter cuando hayas terminado (esto cerrará el editor)..."

if [ -n "$SERVIDOR" ]; then
  kill $SERVIDOR 2>/dev/null
fi
