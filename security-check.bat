@echo off
echo.
echo 🔒 KALA-AI Security Check
echo ==========================
echo.

REM Check for sensitive files that shouldn't be committed
echo 🔍 Checking for sensitive files...
echo.

set "ISSUES_FOUND=0"

REM Check for .env files with real API keys
if exist ".env" (
    findstr /C:"AIzaSy" .env >nul 2>&1
    if not errorlevel 1 (
        echo ❌ WARNING: Real API key found in root .env file!
        set "ISSUES_FOUND=1"
    )
)

if exist ".env.local" (
    findstr /C:"AIzaSy" .env.local >nul 2>&1
    if not errorlevel 1 (
        echo ❌ WARNING: Real API key found in .env.local file!
        set "ISSUES_FOUND=1"
    )
)

if exist "backend\.env" (
    findstr /C:"AIzaSy" backend\.env >nul 2>&1
    if not errorlevel 1 (
        echo ✅ Good: API key found in backend\.env (this is correct and will be ignored by Git)
    ) else (
        echo ⚠️  No API key found in backend\.env - you'll need to add it for the app to work
    )
)

REM Check .env.example files
if exist ".env.example" (
    findstr /C:"AIzaSy" .env.example >nul 2>&1
    if not errorlevel 1 (
        echo ❌ CRITICAL: Real API key found in .env.example file! This will be public!
        set "ISSUES_FOUND=1"
    ) else (
        echo ✅ Good: .env.example has placeholder key only
    )
)

if exist "backend\.env.example" (
    findstr /C:"AIzaSy" backend\.env.example >nul 2>&1
    if not errorlevel 1 (
        echo ❌ CRITICAL: Real API key found in backend\.env.example file! This will be public!
        set "ISSUES_FOUND=1"
    ) else (
        echo ✅ Good: backend\.env.example has placeholder key only
    )
)

echo.
echo 📋 Checking .gitignore protection...
findstr /C:".env" .gitignore >nul 2>&1
if not errorlevel 1 (
    echo ✅ Good: .env files are protected by .gitignore
) else (
    echo ❌ WARNING: .env files may not be properly protected by .gitignore
    set "ISSUES_FOUND=1"
)

echo.
if "%ISSUES_FOUND%"=="0" (
    echo ✅ 🎉 SECURITY CHECK PASSED! 
    echo    Your project is safe to push to GitHub
    echo.
    echo 🚀 Ready for deployment:
    echo    • API keys are secure
    echo    • Sensitive files are protected
    echo    • Ready for Render deployment
) else (
    echo ❌ ⚠️  SECURITY ISSUES FOUND!
    echo    Please fix the issues above before pushing to GitHub
    echo.
    echo 🔧 To fix:
    echo    1. Remove real API keys from example files
    echo    2. Ensure API key is only in backend\.env
    echo    3. Run this check again
)

echo.
pause
