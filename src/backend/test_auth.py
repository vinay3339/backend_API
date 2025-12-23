"""
Test login endpoint - bypasses database
"""
from fastapi import APIRouter
from schemas import Token, UserLogin
from auth import create_access_token
from datetime import timedelta
from config import settings

test_router = APIRouter(prefix="/test", tags=["Test"])

@test_router.post("/login", response_model=Token)
async def test_login(user_login: UserLogin):
    """Test login without database - for debugging"""
    
    # Hardcoded test credentials
    if user_login.username == "admin.stmarys" and user_login.password == "stmarys123":
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={
                "sub": user_login.username,
                "role": "ADMIN",
                "school_id": 1
            },
            expires_delta=access_token_expires
        )
        
        return Token(
            access_token=access_token,
            token_type="bearer",
            role="ADMIN",
            school_id=1
        )
    
    return {"detail": "Incorrect username or password"}