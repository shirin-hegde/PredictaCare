@echo off
title MongoDB Health Check

echo ========================================
echo MongoDB Health Check
echo ========================================
echo.

echo Checking if MongoDB is installed...
mongod --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] MongoDB is installed
) else (
    echo [WARNING] MongoDB is not installed or not in PATH
    echo Please install MongoDB and ensure it's in your system PATH
    pause
    exit /b
)

echo.
echo Checking if MongoDB service is running...
net start | findstr "MongoDB" >nul
if %errorlevel% == 0 (
    echo [OK] MongoDB service is running
) else (
    echo [INFO] MongoDB service is not running as a Windows service
    echo.
    echo You can start MongoDB manually by running:
    echo mongod --dbpath "C:\data\db"
    echo.
    echo Or start it as a Windows service:
    echo net start MongoDB
)

echo.
echo To install MongoDB:
echo 1. Download from https://www.mongodb.com/try/download/community
echo 2. Install with default settings
echo 3. Add MongoDB to your system PATH
echo 4. Create data directory: mkdir C:\data\db
echo.
pause