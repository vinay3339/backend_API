#!/usr/bin/env python3
"""
Debug database connection and check users
"""
from database import SessionLocal, init_db
from models_denormalized import User
from config import settings

def debug_database():
    """Debug database connection"""
    try:
        print(f"Database URL: {settings.get_database_url}")
        print("Initializing database...")
        init_db()
        print("✅ Database initialized")
        
        # Create session
        db = SessionLocal()
        print("✅ Database session created")
        
        # Check users
        users = db.query(User).all()
        print(f"Total users in database: {len(users)}")
        
        for user in users:
            print(f"- Username: {user.username}, Email: {user.email}, Active: {user.is_active}")
        
        db.close()
        
    except Exception as e:
        print(f"❌ Database error: {e}")

if __name__ == "__main__":
    debug_database()