@echo off
title PredictaCare Health Check

echo ========================================
echo PredictaCare Health Check
echo ========================================
echo.

echo Checking if required services are running...
echo.

echo Checking Backend API...
curl -f http://localhost:4000/health >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Backend API is running
) else (
    echo [ERROR] Backend API is not running
)

echo.
echo Checking Python ML Server...
curl -f http://localhost:5000/ >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python ML Server is running
) else (
    echo [ERROR] Python ML Server is not running
)

echo.
echo Checking MongoDB...
echo Make sure MongoDB is running on your system
echo.

echo Health check completed.
echo.
pause