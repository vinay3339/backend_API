#!/usr/bin/env python3
"""
Test database connection
"""
import os
import sys
from sqlalchemy import create_engine, text
from config import settings

def test_connection():
    """Test database connection"""
    try:
        print("Testing database connection...")
        print(f"Database URL: {settings.get_database_url}")
        
        # Create engine
        engine = create_engine(settings.get_database_url)
        
        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Database connection successful!")
            print(f"Test query result: {result.fetchone()}")
            
        # Test database exists
        with engine.connect() as conn:
            result = conn.execute(text("SELECT DATABASE()"))
            db_name = result.fetchone()[0]
            print(f"✅ Connected to database: {db_name}")
            
        return True
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\n🔧 Troubleshooting:")
        print("1. Check if DATABASE_URL environment variable is set")
        print("2. Verify database credentials")
        print("3. Ensure database server is running")
        print("4. Check network connectivity")
        return False

if __name__ == "__main__":
    success = test_connection()
    sys.exit(0 if success else 1)