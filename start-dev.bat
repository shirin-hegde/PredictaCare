@echo off
title PredictaCare Development Environment

echo ========================================
echo PredictaCare Development Environment
echo ========================================
echo.

echo Starting MongoDB (if not already running)...
echo Make sure MongoDB is running on your system
echo.

echo Starting Backend Node.js Server and Python ML Server...
start "Backend & ML Server" cmd /k "cd backend && node server.js"
timeout /t 5 /nobreak >nul

echo Starting Python Flask Server...
start "Python ML Server" cmd /k "cd backend && python server.py"
timeout /t 5 /nobreak >nul

echo Starting Frontend Development Server...
start "Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 10 /nobreak >nul

echo Starting Admin Panel Development Server...
start "Admin Panel" cmd /k "cd admin && npm run dev"

echo.
echo ========================================
echo All services started successfully!
echo ========================================
echo.
echo Frontend (Patient):    http://localhost:5173
echo Admin Panel:           http://localhost:5174
echo Backend API:           http://localhost:4000
echo Python ML Server:      http://localhost:5000
echo.
echo Press any key to exit this window...
pause >nul