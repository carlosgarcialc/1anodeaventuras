@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ======================================
echo  Subiendo cambios a la web...
echo ======================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo No encuentro Git en este ordenador.
  echo Instalalo desde https://git-scm.com/download/win y vuelve a intentarlo.
  echo.
  pause
  exit /b 1
)

git add -A

git diff --cached --quiet
if %errorlevel% equ 0 (
  echo No hay cambios nuevos que subir. Todo esta ya actualizado.
  echo.
  pause
  exit /b 0
)

echo Que cambiaste? Escribe una nota corta y pulsa Enter.
set "mensaje="
set /p "mensaje=> "
if "%mensaje%"=="" set "mensaje=Actualizacion %date% %time%"

git commit -m "%mensaje%"
if errorlevel 1 (
  echo.
  echo Algo ha fallado al guardar los cambios. Nada se ha subido.
  echo.
  pause
  exit /b 1
)

echo.
echo Subiendo a GitHub...
git push
if errorlevel 1 (
  echo.
  echo No se ha podido subir. Revisa la conexion o el acceso a GitHub.
  echo Tus cambios estan guardados en el ordenador, no se han perdido.
  echo.
  pause
  exit /b 1
)

echo.
echo ======================================
echo  Listo. La web tardara 1-2 minutos
echo  en actualizarse.
echo ======================================
echo.
pause
