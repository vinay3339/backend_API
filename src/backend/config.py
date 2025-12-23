"""
Configuration settings for the application
"""
from typing import Optional
try:
    from pydantic_settings import BaseSettings
except ImportError:
    try:
        from pydantic import BaseSettings
    except ImportError:
        raise ImportError("Please install pydantic-settings: pip install pydantic-settings")
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings"""

    # Database - Use environment variables for production
    DB_HOST: str = "mysql-1c65d782-tvinaygoud999-0dcf.c.aivencloud.com"
    DB_PORT: int = 18827
    DB_USER: str = "avnadmin"
    DB_PASSWORD: str = "AVNS_plIT8ThLQjs15UIM5Uk"
    DB_NAME: str = "School_Management_System"
    
    # Alternative: Full database URL (for services like PlanetScale, Railway, etc.)
    DATABASE_URL: Optional[str] = None
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Application
    APP_NAME: str = "School Management System"
    API_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # CORS
    ALLOWED_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",
    ]
    
    @property
    def get_database_url(self) -> str:
        """Get database URL - prioritize DATABASE_URL env var for production"""
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        # For Pydantic v2 compatibility
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


settings = get_settings()
