@echo off
echo.
echo 🧪 Testing Production Build Locally
echo ====================================
echo.

REM Check if build exists
if not exist ".next" (
    echo 📦 No build found. Running production build...
    call npm run build:production
    if errorlevel 1 (
        echo ❌ Build failed
        pause
        exit /b 1
    )
)

echo 🚀 Starting production server locally...
echo 🌐 Frontend will be on: http://localhost:3000
echo 🔗 Backend will be on: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run start:production
