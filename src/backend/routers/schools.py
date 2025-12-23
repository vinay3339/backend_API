"""
Schools API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, date
from database import get_db
from models_denormalized import School
from auth import get_current_active_user
from sqlalchemy import or_

router = APIRouter(prefix="/data/schools", tags=["Schools"])

# ==================== SCHEMAS ====================

from pydantic import BaseModel

class SchoolBase(BaseModel):
    school_name: str
    school_code: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    principal_name: Optional[str] = None
    established_year: Optional[int] = None
    school_type: Optional[str] = None
    board: Optional[str] = None

class SchoolCreate(SchoolBase):
    pass

class SchoolUpdate(BaseModel):
    school_name: Optional[str] = None
    school_code: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    principal_name: Optional[str] = None
    established_year: Optional[int] = None
    school_type: Optional[str] = None
    board: Optional[str] = None
    is_active: Optional[bool] = None

class SchoolResponse(SchoolBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# ==================== ENDPOINTS ====================

@router.get("/", response_model=List[SchoolResponse])
async def get_schools(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = None,
    city: Optional[str] = None,
    state: Optional[str] = None,
    school_type: Optional[str] = None,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Get all schools with filtering"""
    query = db.query(School)
    
    # Apply filters
    if search:
        search_filter = or_(
            School.school_name.contains(search),
            School.school_code.contains(search),
            School.principal_name.contains(search)
        )
        query = query.filter(search_filter)
    
    if city:
        query = query.filter(School.city == city)
    if state:
        query = query.filter(School.state == state)
    if school_type:
        query = query.filter(School.school_type == school_type)
    if is_active is not None:
        query = query.filter(School.is_active == is_active)
    
    schools = query.offset(skip).limit(limit).all()
    return schools

@router.get("/{school_id}", response_model=SchoolResponse)
async def get_school(
    school_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Get school by ID"""
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="School not found"
        )
    return school

@router.post("/", response_model=SchoolResponse)
async def create_school(
    school: SchoolCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Create new school"""
    # Check if school with same name or code exists
    existing = db.query(School).filter(
        (School.school_name == school.school_name) |
        (School.school_code == school.school_code)
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="School with this name or code already exists"
        )
    
    db_school = School(
        **school.dict(),
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    db.add(db_school)
    db.commit()
    db.refresh(db_school)
    return db_school

@router.put("/{school_id}", response_model=SchoolResponse)
async def update_school(
    school_id: int,
    school_update: SchoolUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Update school"""
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="School not found"
        )
    
    # Update fields
    update_data = school_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(school, field, value)
    
    school.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(school)
    return school

@router.delete("/{school_id}")
async def delete_school(
    school_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Delete school (soft delete)"""
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="School not found"
        )
    
    school.is_active = False
    school.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "School deleted successfully"}