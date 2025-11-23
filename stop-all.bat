@echo off
title PredictaCare Stop Services

echo ========================================
echo PredictaCare Stop Services
echo ========================================
echo.

echo Stopping all Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo Stopping all Python processes...
taskkill /f /im python.exe >nul 2>&1

echo.
echo All services stopped successfully!
echo.
pause