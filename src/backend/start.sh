#!/bin/bash

# School Management System - Backend Startup Script
# This script tests the database connection and starts the API server

echo "=============================================="
echo "School Management System - Backend"
echo "=============================================="
echo ""

# Check if Python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python is not installed"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

# Use python3 if available, otherwise python
PYTHON_CMD="python"
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
fi

echo "✓ Using: $PYTHON_CMD"
$PYTHON_CMD --version
echo ""

# Check if pip is installed
if ! command -v pip &> /dev/null && ! command -v pip3 &> /dev/null; then
    echo "❌ Error: pip is not installed"
    exit 1
fi

echo "=============================================="
echo "Step 1: Checking Dependencies"
echo "=============================================="
echo ""

# Check if dependencies are installed
if ! $PYTHON_CMD -c "import fastapi" 2>/dev/null; then
    echo "⚠️  FastAPI not installed"
    echo "Installing dependencies..."
    pip install fastapi uvicorn pymysql python-multipart
    echo ""
fi

echo "✓ Dependencies OK"
echo ""

echo "=============================================="
echo "Step 2: Testing Database Connection"
echo "=============================================="
echo ""

# Test database connection
$PYTHON_CMD test_connection.py

# Check if test was successful
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Database connection test failed!"
    echo "Please check your MySQL configuration in config.py"
    exit 1
fi

echo ""
echo "=============================================="
echo "Step 3: Starting API Server"
echo "=============================================="
echo ""
echo "Starting FastAPI server..."
echo "API will be available at: http://localhost:8000"
echo "API Documentation: http://localhost:8000/api/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
$PYTHON_CMD main.py
