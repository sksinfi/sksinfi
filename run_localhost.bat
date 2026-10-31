@echo off
title SKS INFI - Local Server (http://localhost:3000)
color 0b

echo ========================================================
echo           SKS INFI - WEBSITE LOCAL RUNNER               
echo ========================================================
echo.

:: Switch to the directory where this script is located
cd /d "%~dp0"

:: 1. Verify Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0c
    echo [ERROR] Node.js is not installed or not found in system PATH!
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: 2. Ensure dependencies are installed
if not exist "node_modules\" (
    echo [INFO] Project dependencies not detected.
    echo [INFO] Running 'npm install'... Please wait.
    echo.
    call npm install
    if %errorlevel% neq 0 (
        color 0c
        echo.
        echo [ERROR] npm install encountered an error.
        pause
        exit /b 1
    )
    echo.
)

echo [OK] Node.js and dependencies are ready.
echo [INFO] Launching Next.js development server...
echo [INFO] Your browser will open at http://localhost:3000 in 3 seconds.
echo.
echo ========================================================
echo  Website URL  : http://localhost:3000
echo  To Stop Server: Press Ctrl + C in this window
echo ========================================================
echo.

:: Open browser automatically after a short 3-second delay
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

:: Run Next.js dev server
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [NOTICE] Server stopped or exited.
    pause
)
