@echo off
title PredictaCare Setup

echo ========================================
echo PredictaCare Setup
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Node.js is installed
) else (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b
)

echo.
echo Checking if Python is installed...
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python is installed
) else (
    echo [ERROR] Python is not installed. Please install Python first.
    pause
    exit /b
)

echo.
echo Installing root dependencies...
npm install

echo.
echo Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo Installing admin dependencies...
cd admin
npm install
cd ..

echo.
echo Installing backend dependencies...
cd backend
npm install
cd ..

echo.
echo Installing Python dependencies...
cd backend
pip install -r requirements.txt
cd ..

echo.
echo Setup completed successfully!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Update the .env files with your configuration
echo 3. Run start-dev.bat to start the development environment
echo.
pause