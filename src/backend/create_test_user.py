#!/usr/bin/env python3
"""
Create specific user for testing
"""
from sqlalchemy.orm import Session
from database import SessionLocal, init_db
from models_denormalized import User, UserRole
from auth import get_password_hash
from datetime import datetime

def create_test_user():
    """Create test user admin.stmarys"""
    # Initialize database
    init_db()
    
    # Create session
    db = SessionLocal()
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.username == "admin.stmarys").first()
        if existing_user:
            print("User admin.stmarys already exists!")
            return
        
        # Create user
        test_user = User(
            username="admin.stmarys",
            email="admin@stmarys.com",
            hashed_password=get_password_hash("stmarys123"),
            role=UserRole.ADMIN,
            school_id=1,
            is_active=True,
            is_first_login=False,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        db.add(test_user)
        db.commit()
        
        print("✅ User created successfully!")
        print("Username: admin.stmarys")
        print("Password: stmarys123")
        print("Email: admin@stmarys.com")
        
    except Exception as e:
        print(f"❌ Error creating user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_user()