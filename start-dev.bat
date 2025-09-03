@echo off
echo.
echo 🎨 KALA-AI Development Launcher
echo ===============================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    echo 📁 Make sure you're in the folder containing package.json
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

REM Check if backend dependencies are installed
cd backend
if not exist ".env" (
    echo ❌ Backend .env file not found!
    echo 🔑 Please add your GEMINI_API_KEY to backend\.env
    echo 🌐 Get your API key from: https://makersuite.google.com/app/apikey
    pause
    exit /b 1
)

REM Check Python dependencies
python -c "import fastapi, google.generativeai" 2>nul
if errorlevel 1 (
    echo 📦 Installing backend dependencies...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ Failed to install backend dependencies
        pause
        exit /b 1
    )
)

cd ..

echo.
echo ✅ All dependencies are ready!
echo.
echo 🚀 Starting Kala-AI platform...
echo ================================
echo.
echo 📡 Backend will start on: http://localhost:8000
echo 🎨 Frontend will start on: http://localhost:3000
echo.
echo Press Ctrl+C in any terminal to stop the servers
echo.

REM Start backend in new window
start "Kala-AI Backend" cmd /k "cd /d %~dp0backend && python main.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in current window
echo 🎭 Starting frontend...
npm run dev
