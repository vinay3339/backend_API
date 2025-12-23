"""
Main FastAPI application
School Management System Backend API
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from config import settings
import uvicorn
from database import init_db

# Import routers
from routers import auth, students_denormalized, teachers_denormalized, classes_denormalized, exams_denormalized, transport_denormalized, schools, users
from routers.all_denormalized_routers import attendance_router, subjects_router, marks_router, fee_payments_router, fee_structure_router, timetable_router
from test_auth import test_router

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for School Management System",
    version=settings.API_VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "status": "online",
        "app": settings.APP_NAME,
        "version": settings.API_VERSION,
        "docs": "/api/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "database": "connected"
    }


# Include routers
API_PREFIX = "/api/v1"

app.include_router(test_router, prefix=API_PREFIX)
app.include_router(auth.router, prefix=API_PREFIX)
app.include_router(schools.router, prefix=API_PREFIX)
app.include_router(users.router, prefix=API_PREFIX)
app.include_router(students_denormalized.router, prefix=API_PREFIX)
app.include_router(teachers_denormalized.router, prefix=API_PREFIX)
app.include_router(classes_denormalized.router, prefix=API_PREFIX)
app.include_router(subjects_router, prefix=API_PREFIX)
app.include_router(attendance_router, prefix=API_PREFIX)
app.include_router(marks_router, prefix=API_PREFIX)
app.include_router(exams_denormalized.router, prefix=API_PREFIX)
app.include_router(fee_structure_router, prefix=API_PREFIX)
app.include_router(fee_payments_router, prefix=API_PREFIX)
app.include_router(timetable_router, prefix=API_PREFIX)
app.include_router(transport_denormalized.router, prefix=API_PREFIX)


# Exception handlers
@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Handle all unhandled exceptions"""
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal server error",
            "detail": str(exc) if settings.DEBUG else "An error occurred"
        }
    )


# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    print(f"Starting {settings.APP_NAME} v{settings.API_VERSION}")
    print(f"Database URL: {settings.get_database_url.split('@')[1] if '@' in settings.get_database_url else 'localhost'}")
    
    # Initialize database tables
    try:
        init_db()
        print("Database tables initialized successfully")
    except Exception as e:
        print(f"Error initializing database: {e}")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print(f"Shutting down {settings.APP_NAME}")


# Run the application
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )
