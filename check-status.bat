@echo off
echo.
echo 🔍 KALA-AI System Status Check
echo ==============================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

echo 📋 Checking project structure...
if exist "app\page.tsx" (
    echo ✅ Frontend structure: OK
) else (
    echo ❌ Frontend structure: Missing files
)

if exist "backend\main.py" (
    echo ✅ Backend structure: OK
) else (
    echo ❌ Backend structure: Missing files
)

echo.
echo 📦 Checking dependencies...
if exist "node_modules" (
    echo ✅ Frontend dependencies: Installed
) else (
    echo ❌ Frontend dependencies: Not installed - Run 'npm install'
)

echo.
echo 🔑 Checking API configuration...
if exist "backend\.env" (
    echo ✅ Backend .env file: Found
    cd backend
    findstr /C:"GEMINI_API_KEY=" .env >nul
    if errorlevel 1 (
        echo ❌ GEMINI_API_KEY: Not configured
    ) else (
        findstr /C:"your_actual_gemini_api_key_here" .env >nul
        if errorlevel 1 (
            echo ✅ GEMINI_API_KEY: Configured
        ) else (
            echo ⚠️  GEMINI_API_KEY: Still using placeholder - Please update
        )
    )
    cd ..
) else (
    echo ❌ Backend .env file: Missing
)

echo.
echo 🐍 Checking Python environment...
python -c "import fastapi" 2>nul
if errorlevel 1 (
    echo ❌ FastAPI: Not installed
) else (
    echo ✅ FastAPI: Available
)

python -c "import google.generativeai" 2>nul
if errorlevel 1 (
    echo ❌ Google Generative AI: Not installed
) else (
    echo ✅ Google Generative AI: Available
)

echo.
echo 🌐 Checking if servers are running...
netstat -an | find "3000" | find "LISTENING" >nul
if errorlevel 1 (
    echo ❌ Frontend (port 3000): Not running
) else (
    echo ✅ Frontend (port 3000): Running
)

netstat -an | find "8000" | find "LISTENING" >nul
if errorlevel 1 (
    echo ❌ Backend (port 8000): Not running
) else (
    echo ✅ Backend (port 8000): Running
)

echo.
echo 🎯 Quick Actions:
echo   📦 Install deps: npm install ^&^& cd backend ^&^& pip install -r requirements.txt
echo   🚀 Start dev:    start-dev.bat
echo   🔑 Get API key:  https://makersuite.google.com/app/apikey
echo.
pause
