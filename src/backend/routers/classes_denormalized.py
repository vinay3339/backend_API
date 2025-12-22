"""
Denormalized Class Router with Advanced Filtering
All data in single table - use filters instead of JOINs
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from datetime import datetime
from database import get_db
from models_denormalized import Class, Teacher
from auth import get_current_active_user

router = APIRouter(prefix="/data/classes", tags=["Classes (Denormalized)"])


@router.get("/")
@router.get("")
async def get_classes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    
    # Basic Filters
    school_id: Optional[int] = None,
    school_name: Optional[str] = None,
    class_name: Optional[str] = None,
    section: Optional[str] = None,
    academic_year: Optional[str] = None,
    status: Optional[str] = None,
    
    # Search
    search: Optional[str] = None,
    
    # Class Teacher Filters
    class_teacher_id: Optional[int] = None,
    class_teacher_name: Optional[str] = None,
    
    # Capacity Filters
    capacity_min: Optional[int] = None,
    capacity_max: Optional[int] = None,
    current_strength_min: Optional[int] = None,
    current_strength_max: Optional[int] = None,
    
    # Room Filters
    room_number: Optional[str] = None,
    
    # Sorting
    sort_by: Optional[str] = Query("id"),
    sort_order: Optional[str] = Query("asc", regex="^(asc|desc)$"),
    
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get classes with advanced filtering
    
    Examples:
    - All classes in school: ?school_id=1
    - Classes by academic year: ?academic_year=2024-25
    - Classes by teacher: ?class_teacher_name=Smith
    - Search: ?search=Grade 5
    """
    query = db.query(Class)
    
    if school_id:
        query = query.filter(Class.school_id == school_id)
    if school_name:
        query = query.filter(Class.school_name.contains(school_name))
    if class_name:
        query = query.filter(Class.class_name == class_name)
    if section:
        query = query.filter(Class.section == section)
    if academic_year:
        query = query.filter(Class.academic_year == academic_year)
    if status:
        query = query.filter(Class.status == status)
    
    if search:
        search_filter = or_(
            Class.class_name.contains(search),
            Class.class_section.contains(search),
            Class.class_teacher_name.contains(search),
            Class.room_number.contains(search)
        )
        query = query.filter(search_filter)
    
    if class_teacher_id:
        query = query.filter(Class.class_teacher_id == class_teacher_id)
    if class_teacher_name:
        query = query.filter(Class.class_teacher_name.contains(class_teacher_name))
    
    if capacity_min:
        query = query.filter(Class.capacity >= capacity_min)
    if capacity_max:
        query = query.filter(Class.capacity <= capacity_max)
    if current_strength_min:
        query = query.filter(Class.current_strength >= current_strength_min)
    if current_strength_max:
        query = query.filter(Class.current_strength <= current_strength_max)
    
    if room_number:
        query = query.filter(Class.room_number == room_number)
    
    total_count = query.count()
    
    if hasattr(Class, sort_by):
        if sort_order == "desc":
            query = query.order_by(getattr(Class, sort_by).desc())
        else:
            query = query.order_by(getattr(Class, sort_by).asc())
    
    classes = query.offset(skip).limit(limit).all()
    
    return {
        "total": total_count,
        "page": skip // limit + 1,
        "page_size": limit,
        "total_pages": (total_count + limit - 1) // limit,
        "data": classes
    }


@router.get("/{class_id}")
async def get_class(
    class_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Get single class"""
    class_obj = db.query(Class).filter(Class.id == class_id).first()
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    return class_obj


@router.post("/")
async def create_class(
    class_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Create class with all data"""
    # Get class teacher details from teachers table using class_teacher_id
    if class_data.get('class_teacher_id'):
        teacher = db.query(Teacher).filter(Teacher.id == class_data['class_teacher_id']).first()
        if teacher:
            class_data['class_teacher_name'] = teacher.full_name
            class_data['class_teacher_email'] = teacher.email
            class_data['class_teacher_phone'] = teacher.phone
    
    # Get subject teacher names from teachers table using teacher_id
    subject_teacher_map = {}
    if class_data.get('subject_teachers'):
        for subject_teacher in class_data['subject_teachers']:
            if subject_teacher.get('teacher_id'):
                teacher = db.query(Teacher).filter(Teacher.id == subject_teacher['teacher_id']).first()
                if teacher:
                    subject_teacher['teacher_name'] = teacher.full_name
                    subject_teacher_map[subject_teacher['subject']] = teacher.full_name
    
    # Update timetable with teacher names based on subject mapping
    if class_data.get('timetable'):
        for day, periods in class_data['timetable'].items():
            for period in periods:
                if period.get('subject') and period['subject'] in subject_teacher_map:
                    period['teacher'] = subject_teacher_map[period['subject']]
    
    if 'class_name' in class_data and 'section' in class_data:
        class_data['class_section'] = f"{class_data['class_name']}-{class_data['section']}"
    
    class_obj = Class(**class_data)
    db.add(class_obj)
    db.commit()
    db.refresh(class_obj)
    return class_obj


@router.put("/{class_id}")
async def update_class(
    class_id: int,
    update_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Update class - any field"""
    class_obj = db.query(Class).filter(Class.id == class_id).first()
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    
    # If class_teacher_id is updated, fetch teacher details
    if 'class_teacher_id' in update_data:
        teacher = db.query(Teacher).filter(Teacher.id == update_data['class_teacher_id']).first()
        if teacher:
            update_data['class_teacher_name'] = teacher.full_name
            update_data['class_teacher_email'] = teacher.email
            update_data['class_teacher_phone'] = teacher.phone
    
    for field, value in update_data.items():
        if hasattr(class_obj, field):
            setattr(class_obj, field, value)
    
    if 'class_name' in update_data or 'section' in update_data:
        if class_obj.class_name and class_obj.section:
            class_obj.class_section = f"{class_obj.class_name}-{class_obj.section}"
    
    class_obj.updated_at = datetime.now()
    db.commit()
    db.refresh(class_obj)
    return class_obj


@router.delete("/{class_id}")
async def delete_class(
    class_id: int,
    hard_delete: bool = Query(False),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Delete class"""
    class_obj = db.query(Class).filter(Class.id == class_id).first()
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    
    if hard_delete:
        db.delete(class_obj)
    else:
        class_obj.is_active = False
        class_obj.status = "inactive"
    
    db.commit()
    return {"message": "Class deleted successfully"}


@router.get("/filters/by-academic-year")
async def get_classes_by_academic_year(
    academic_year: str,
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get classes by academic year"""
    query = db.query(Class).filter(Class.academic_year == academic_year)
    if school_id:
        query = query.filter(Class.school_id == school_id)
    return query.all()


@router.get("/filters/by-teacher")
async def get_classes_by_teacher(
    class_teacher_id: int,
    db: Session = Depends(get_db)
):
    """Get classes taught by specific teacher"""
    return db.query(Class).filter(Class.class_teacher_id == class_teacher_id).all()


@router.get("/stats/summary")
async def get_class_stats(
    school_id: Optional[int] = None,
    academic_year: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get class statistics"""
    query = db.query(Class)
    if school_id:
        query = query.filter(Class.school_id == school_id)
    if academic_year:
        query = query.filter(Class.academic_year == academic_year)
    
    all_classes = query.all()
    
    return {
        "total_classes": len(all_classes),
        "active_classes": sum(1 for c in all_classes if c.is_active),
        "total_capacity": sum(c.capacity or 0 for c in all_classes),
        "total_students": sum(c.current_strength or 0 for c in all_classes),
        "average_class_size": sum(c.current_strength or 0 for c in all_classes) / len(all_classes) if all_classes else 0,
        "occupancy_rate": (sum(c.current_strength or 0 for c in all_classes) / sum(c.capacity or 1 for c in all_classes)) * 100 if all_classes else 0
    }
