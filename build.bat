@echo off
echo ============================================
echo   Disk Analyzer - Build .exe
echo ============================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Install Python 3.8+ first.
    pause
    exit /b 1
)

REM Install dependencies
echo [1/3] Installing dependencies...
pip install pywebview pyinstaller --quiet
if errorlevel 1 (
    echo ERROR: Failed to install dependencies.
    pause
    exit /b 1
)

REM Build .exe
echo [2/3] Building .exe with PyInstaller...
pyinstaller --noconfirm --onefile --windowed ^
    --name "DiskAnalyzer" ^
    --add-data "index.html;." ^
    --add-data "static;static" ^
    --icon NONE ^
    main.py

if errorlevel 1 (
    echo ERROR: Build failed.
    pause
    exit /b 1
)

echo [3/3] Done!
echo.
echo Output: dist\DiskAnalyzer.exe
echo.
pause
