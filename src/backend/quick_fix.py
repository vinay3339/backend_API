#!/usr/bin/env python3
"""
Simple user creation and login test
"""
import requests
import json
from passlib.context import CryptContext

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def test_login():
    """Test login directly"""
    url = "http://127.0.0.1:8000/api/v1/auth/login-json"
    data = {
        "username": "admin.stmarys",
        "password": "stmarys123"
    }
    
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

def create_user_sql():
    """Generate SQL to create user manually"""
    hashed_password = hash_password("stmarys123")
    
    sql = f"""
INSERT INTO users (username, email, hashed_password, role, school_id, is_active, is_first_login, created_at, updated_at)
VALUES ('admin.stmarys', 'admin@stmarys.com', '{hashed_password}', 'ADMIN', 1, 1, 0, NOW(), NOW());
"""
    
    print("Execute this SQL in your Aiven MySQL database:")
    print(sql)

if __name__ == "__main__":
    print("1. Creating SQL for user...")
    create_user_sql()
    
    print("\n2. Testing login...")
    test_login()