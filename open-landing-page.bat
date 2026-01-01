@echo off
echo.
echo ========================================
echo   theITguy Landing Page Launcher
echo ========================================
echo.
echo Opening theITguy landing page in your default browser...
echo.

REM Try to open with different browsers
start "" "index.html"
if %errorlevel% equ 0 goto :success

echo Trying with Chrome...
start chrome "index.html"
if %errorlevel% equ 0 goto :success

echo Trying with Firefox...
start firefox "index.html"
if %errorlevel% equ 0 goto :success

echo Trying with Microsoft Edge...
start msedge "index.html"
if %errorlevel% equ 0 goto :success

echo.
echo Could not automatically open the browser.
echo Please manually open 'index.html' in your web browser.
echo.

:success
echo.
echo Landing page should now be open in your browser!
echo If not, please open index.html manually.
echo.
pause