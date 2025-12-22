#!/usr/bin/env python3
"""
One-Click Login Fix
Run this script to setup demo users and test login automatically
"""

import subprocess
import sys
import time
import os

def print_header(text):
    """Print a formatted header"""
    print("\n" + "=" * 70)
    print(f"  {text}")
    print("=" * 70 + "\n")

def print_success(text):
    """Print success message"""
    print(f"✅ {text}")

def print_error(text):
    """Print error message"""
    print(f"❌ {text}")

def print_info(text):
    """Print info message"""
    print(f"ℹ️  {text}")

def run_command(command, description):
    """Run a command and return success status"""
    print_info(f"{description}...")
    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            print_success(f"{description} - SUCCESS")
            if result.stdout:
                print(result.stdout)
            return True
        else:
            print_error(f"{description} - FAILED")
            if result.stderr:
                print(result.stderr)
            return False
    except subprocess.TimeoutExpired:
        print_error(f"{description} - TIMEOUT")
        return False
    except Exception as e:
        print_error(f"{description} - ERROR: {e}")
        return False

def check_backend_running():
    """Check if backend is running"""
    import requests
    try:
        response = requests.get("http://localhost:8000/", timeout=5)
        return response.status_code == 200
    except:
        return False

def main():
    """Main function"""
    print_header("🔧 ONE-CLICK LOGIN FIX")
    
    print("This script will:")
    print("  1. Check if backend is running")
    print("  2. Setup demo users with hashed passwords")
    print("  3. Test login authentication")
    print("  4. Display credentials for you to use")
    print()
    
    # Change to backend directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Step 1: Check backend
    print_header("STEP 1: Checking Backend")
    
    if check_backend_running():
        print_success("Backend is running on http://localhost:8000")
    else:
        print_error("Backend is NOT running!")
        print()
        print("Please start the backend first:")
        print("  cd backend")
        print("  python -m uvicorn main:app --reload")
        print()
        print("Then run this script again.")
        sys.exit(1)
    
    # Step 2: Setup demo users
    print_header("STEP 2: Setting Up Demo Users")
    
    success = run_command(
        f"{sys.executable} setup_demo_users.py",
        "Creating demo users"
    )
    
    if not success:
        print_error("Failed to create demo users!")
        print()
        print("Please check:")
        print("  - MySQL is running")
        print("  - Database credentials in config.py are correct")
        print("  - Database 'EduPortal' exists")
        sys.exit(1)
    
    # Wait a moment
    time.sleep(1)
    
    # Step 3: Test login
    print_header("STEP 3: Testing Login")
    
    success = run_command(
        f"{sys.executable} test_login_json.py",
        "Testing authentication"
    )
    
    if not success:
        print_error("Login test failed!")
        sys.exit(1)
    
    # Step 4: Display summary
    print_header("✅ SUCCESS! Login is Working!")
    
    print("📋 Demo Credentials:")
    print()
    print("  🔹 Super Admin:")
    print("     Username: superadmin")
    print("     Password: admin2024")
    print()
    print("  🔹 School Admin:")
    print("     Username: admin")
    print("     Password: demo123")
    print()
    print("  🔹 Teacher:")
    print("     Username: teacher2")
    print("     Password: demo123")
    print()
    print("  🔹 Student:")
    print("     Username: student2")
    print("     Password: demo123")
    print()
    
    print("=" * 70)
    print()
    print("🧪 Quick Test:")
    print()
    print('curl -X POST http://localhost:8000/api/v1/auth/login-json \\')
    print('  -H "Content-Type: application/json" \\')
    print('  -d \'{"username": "admin", "password": "demo123"}\'')
    print()
    
    print("=" * 70)
    print()
    print("📚 Next Steps:")
    print()
    print("  1. Use the credentials above to login")
    print("  2. Copy the access_token from the response")
    print("  3. Include it in API requests:")
    print('     -H "Authorization: Bearer YOUR_TOKEN"')
    print()
    print("  4. Check the docs:")
    print("     - API Docs: http://localhost:8000/api/docs")
    print("     - Quick Guide: ../QUICK_LOGIN_GUIDE.md")
    print("     - Full Guide: ../LOGIN_AUTHENTICATION_FIXED.md")
    print()
    
    print("=" * 70)
    print()
    print_success("All done! Your authentication is now fully working! 🎉")
    print()

if __name__ == "__main__":
    main()
