@echo off
echo.
echo 🔒 KALA-AI Environment Setup
echo ============================
echo.
echo This script will help you set up environment variables securely
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

echo 🔑 Setting up environment files...
echo.

REM Create frontend .env.local if it doesn't exist
if not exist ".env.local" (
    echo # Kala-AI Frontend Environment Variables > .env.local
    echo NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 >> .env.local
    echo ✅ Created .env.local for frontend
)

REM Create backend .env if it doesn't exist
cd backend
if not exist ".env" (
    echo # Kala-AI Backend Environment Variables > .env
    echo GEMINI_API_KEY= >> .env
    echo ✅ Created backend/.env
    echo.
    echo ⚠️  IMPORTANT: You need to add your Gemini API key to backend/.env
    echo 🔗 Get your API key from: https://makersuite.google.com/app/apikey
    echo 📝 Edit backend/.env and add: GEMINI_API_KEY=your_actual_api_key_here
    echo.
) else (
    echo ✅ Backend .env file already exists
)

cd ..

echo.
echo 🎯 Environment setup complete!
echo.
echo Next steps:
echo 1. Add your Gemini API key to backend/.env
echo 2. Run 'start-dev.bat' to start development
echo 3. Your API keys will be kept secure and never committed to Git
echo.
pause
