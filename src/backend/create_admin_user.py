#!/usr/bin/env python3
"""
Create default admin user for testing
"""
from sqlalchemy.orm import Session
from database import SessionLocal, init_db
from models_denormalized import User, UserRole
from auth import get_password_hash
from datetime import datetime

def create_default_user():
    """Create default admin user"""
    # Initialize database
    init_db()
    
    # Create session
    db = SessionLocal()
    
    try:
        # Check if admin user already exists
        existing_user = db.query(User).filter(User.username == "admin").first()
        if existing_user:
            print("Admin user already exists!")
            print(f"Username: admin")
            print(f"Email: {existing_user.email}")
            return
        
        # Create admin user
        admin_user = User(
            username="admin",
            email="admin@school.com",
            hashed_password=get_password_hash("admin123"),
            role=UserRole.ADMIN,
            school_id=1,
            is_active=True,
            is_first_login=False,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        db.add(admin_user)
        db.commit()
        
        print("✅ Default admin user created successfully!")
        print("Username: admin")
        print("Password: admin123")
        print("Email: admin@school.com")
        print("Role: ADMIN")
        
    except Exception as e:
        print(f"❌ Error creating user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_default_user()