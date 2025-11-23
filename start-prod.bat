@echo off
title PredictaCare Production Environment

echo ========================================
echo PredictaCare Production Environment
echo ========================================
echo.

echo Building all components...
echo This may take a few minutes...
call npm run build

echo.
echo Starting Production Server...
echo.
echo Server will be available at: http://localhost:4000
echo.
echo Press Ctrl+C to stop the server
echo.
node backend/server.js

pause