@echo off
echo ======================================================================
echo SCHOOL MANAGEMENT SYSTEM - SETUP DEMO USERS AND TEST LOGIN
echo ======================================================================
echo.

echo Step 1: Setting up demo users...
echo ======================================================================
python setup_demo_users.py
echo.

echo.
echo Step 2: Testing login authentication...
echo ======================================================================
python test_login_json.py
echo.

echo.
echo ======================================================================
echo SETUP COMPLETE!
echo ======================================================================
echo.
echo Next Steps:
echo 1. Make sure the backend is running: python -m uvicorn main:app --reload
echo 2. Use the credentials shown above to login
echo 3. Check LOGIN_FIX_GUIDE.md for detailed documentation
echo.
pause
