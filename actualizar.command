#!/bin/bash
# Doble clic en este archivo para subir tus cambios a la web.
# (la primera vez puede que macOS te pida permiso en Preferencias > Seguridad)

cd "$(dirname "$0")"

echo "======================================"
echo " Subiendo cambios a la web..."
echo "======================================"
echo ""

git add -A

# si no hay nada que guardar, avisa y no continúes
if git diff --cached --quiet; then
  echo "No hay cambios nuevos que subir. Todo está ya actualizado."
  echo ""
  read -p "Pulsa Enter para cerrar..."
  exit 0
fi

echo "¿Qué cambiaste? (escribe una nota corta y pulsa Enter)"
read -p "> " mensaje

# si el usuario no escribe nada, ponemos un mensaje por defecto
if [ -z "$mensaje" ]; then
  mensaje="Actualización $(date '+%Y-%m-%d %H:%M')"
fi

git commit -m "$mensaje"
echo ""
echo "Subiendo a GitHub..."
git push

echo ""
echo "======================================"
echo " Listo. La web tardará 1-2 minutos"
echo " en actualizarse."
echo "======================================"
echo ""
read -p "Pulsa Enter para cerrar..."
