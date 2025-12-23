"""
Database connection and session management
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings
import os

# Debug: Print database URL (without password)
def get_safe_db_url():
    url = settings.get_database_url
    # Hide password for logging
    if '@' in url:
        parts = url.split('@')
        if ':' in parts[0]:
            user_pass = parts[0].split(':')
            safe_url = f"{user_pass[0]}:***@{parts[1]}"
            return safe_url
    return "Invalid URL format"

print(f"Database URL: {get_safe_db_url()}")

# Create database engine
try:
    engine = create_engine(
        settings.get_database_url,
        pool_pre_ping=True,
        pool_recycle=3600,
        echo=settings.DEBUG
    )
except Exception as e:
    print(f"Database connection error: {e}")
    print(f"DATABASE_URL env var: {os.getenv('DATABASE_URL', 'Not set')}")
    raise

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


def get_db():
    """
    Dependency to get database session
    Usage: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database - create all tables"""
    Base.metadata.create_all(bind=engine)"""
Database connection and session management
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

# Create database engine
engine = create_engine(
    settings.get_database_url,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=settings.DEBUG
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


def get_db():
    """
    Dependency to get database session
    Usage: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database - create all tables"""
    Base.metadata.create_all(bind=engine)
