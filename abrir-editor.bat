@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PUERTO=4321
set "URL=http://localhost:%PUERTO%/editar.html"

echo ======================================
echo  Abriendo el editor de textos...
echo ======================================
echo.

rem --- Python: hace falta para servir la web en local ---
set "PY="
where py >nul 2>&1 && set "PY=py -3"
if not defined PY (
  where python >nul 2>&1 && set "PY=python"
)

if not defined PY (
  echo No encuentro Python, y hace falta para abrir el editor.
  echo.
  echo Instalalo desde https://www.python.org/downloads/windows/
  echo IMPORTANTE: marca la casilla "Add python.exe to PATH" al instalar.
  echo.
  pause
  exit /b 1
)

rem --- arranca el servidor solo si no hay ya uno en ese puerto ---
set "MIO="
netstat -an | findstr /c:":%PUERTO% " | findstr /i "LISTENING" >nul 2>&1
if errorlevel 1 (
  start "servidor beapa" /min %PY% -m http.server %PUERTO% --bind 127.0.0.1
  set "MIO=1"
  timeout /t 2 /nobreak >nul
)

rem --- navegador: Chrome o Edge permiten guardar directo en el proyecto ---
set "NAV="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "NAV=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "NAV=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "NAV=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if not defined NAV if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "NAV=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not defined NAV if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "NAV=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if defined NAV (
  start "" "%NAV%" "%URL%"
) else (
  echo Consejo: con Google Chrome o Microsoft Edge puedes guardar los cambios
  echo directamente en el proyecto. Sin ellos, usa el boton "descargar archivo".
  echo.
  start "" "%URL%"
)

echo Editor abierto en: %URL%
echo.
echo Cuando termines de editar:
echo   1. Pulsa "guardar en el proyecto" en el editor
echo   2. Vuelve aqui y pulsa Enter
echo   3. Doble clic en "actualizar.bat" para publicarlo
echo.
pause

if defined MIO taskkill /f /fi "WINDOWTITLE eq servidor beapa*" >nul 2>&1
