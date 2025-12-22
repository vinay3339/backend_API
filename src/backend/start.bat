@echo off
REM School Management System - Backend Startup Script (Windows)
REM This script tests the database connection and starts the API server

echo ==============================================
echo School Management System - Backend
echo ==============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed
    echo Please install Python 3.8 or higher
    pause
    exit /b 1
)

echo Python detected:
python --version
echo.

echo ==============================================
echo Step 1: Checking Dependencies
echo ==============================================
echo.

REM Check if FastAPI is installed
python -c "import fastapi" >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing dependencies...
    pip install fastapi uvicorn pymysql python-multipart
    echo.
)

echo Dependencies OK
echo.

echo ==============================================
echo Step 2: Testing Database Connection
echo ==============================================
echo.

REM Test database connection
python test_connection.py
if %errorlevel% neq 0 (
    echo.
    echo Database connection test failed!
    echo Please check your MySQL configuration in config.py
    pause
    exit /b 1
)

echo.
echo ==============================================
echo Step 3: Starting API Server
echo ==============================================
echo.
echo Starting FastAPI server...
echo API will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/api/docs
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
python main.py
