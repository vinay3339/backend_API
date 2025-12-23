"""
Configuration settings for the application
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings"""

    # Database - Use environment variables for production
    DB_HOST: str = "127.0.0.1"
    DB_PORT: int = 3306
    DB_USER: str = "vinaygoud"
    DB_PASSWORD: str = "vinay3339"
    DB_NAME: str = "EduPortal"
    
    # Alternative: Full database URL (for services like PlanetScale, Railway, etc.)
    DATABASE_URL: str = None
    
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
            # Clean up the URL if it has placeholder values
            url = self.DATABASE_URL.strip()
            if 'username:password@host:port' in url:
                # This is a template, use individual components instead
                return f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
            return url
        return f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


settings = get_settings()
