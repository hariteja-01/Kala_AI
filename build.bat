@echo off
echo.
echo 🏗️ Building Kala-AI for Production Deployment
echo ==============================================
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)

REM Build Next.js application
echo 🎭 Building Next.js application...
call npm run build
if errorlevel 1 (
    echo ❌ Failed to build Next.js application
    exit /b 1
)

REM Install backend dependencies
echo 🐍 Installing backend dependencies...
cd backend
call pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)
cd ..

echo.
echo ✅ Build complete! Ready for deployment.
echo 🚀 Use 'npm run start:production' to start the unified server
echo.
