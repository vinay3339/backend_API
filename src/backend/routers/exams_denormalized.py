"""
Denormalized Exam Router with Advanced Filtering
All data in single table - use filters instead of JOINs
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from datetime import date, datetime
from database import get_db
from models_denormalized import Exam, School, Class
from auth import get_current_active_user

router = APIRouter(prefix="/data/exams", tags=["Exams (Denormalized)"])


@router.get("/")
@router.get("")
async def get_exams(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    
    # Basic Filters
    school_id: Optional[int] = None,
    school_name: Optional[str] = None,
    exam_type: Optional[str] = None,
    academic_year: Optional[str] = None,
    status: Optional[str] = None,
    
    # Search
    search: Optional[str] = None,
    exam_name: Optional[str] = None,
    exam_code: Optional[str] = None,
    
    # Date Filters
    start_date_from: Optional[date] = None,
    start_date_to: Optional[date] = None,
    end_date_from: Optional[date] = None,
    end_date_to: Optional[date] = None,
    
    # Marks Filters
    max_marks: Optional[int] = None,
    min_pass_marks: Optional[int] = None,
    
    # Sorting
    sort_by: Optional[str] = Query("id"),
    sort_order: Optional[str] = Query("asc", regex="^(asc|desc)$"),
    
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get exams with advanced filtering
    
    Examples:
    - All exams in school: ?school_id=1
    - Exams by type: ?exam_type=Final
    - Exams by date range: ?start_date_from=2024-01-01&start_date_to=2024-12-31
    - Search: ?search=Mid-term
    """
    query = db.query(Exam)
    
    if school_id:
        query = query.filter(Exam.school_id == school_id)
    if school_name:
        query = query.filter(Exam.school_name.contains(school_name))
    if exam_type:
        query = query.filter(Exam.exam_type == exam_type)
    if academic_year:
        query = query.filter(Exam.academic_year == academic_year)
    if status:
        query = query.filter(Exam.status == status)
    
    if search:
        search_filter = or_(
            Exam.exam_name.contains(search),
            Exam.exam_code.contains(search)
        )
        query = query.filter(search_filter)
    
    if exam_name:
        query = query.filter(Exam.exam_name.contains(exam_name))
    if exam_code:
        query = query.filter(Exam.exam_code == exam_code)
    
    if start_date_from:
        query = query.filter(Exam.start_date >= start_date_from)
    if start_date_to:
        query = query.filter(Exam.start_date <= start_date_to)
    if end_date_from:
        query = query.filter(Exam.end_date >= end_date_from)
    if end_date_to:
        query = query.filter(Exam.end_date <= end_date_to)
    
    if max_marks:
        query = query.filter(Exam.max_marks == max_marks)
    if min_pass_marks:
        query = query.filter(Exam.min_pass_marks == min_pass_marks)
    
    total_count = query.count()
    
    if hasattr(Exam, sort_by):
        if sort_order == "desc":
            query = query.order_by(getattr(Exam, sort_by).desc())
        else:
            query = query.order_by(getattr(Exam, sort_by).asc())
    
    exams = query.offset(skip).limit(limit).all()
    
    return {
        "total": total_count,
        "page": skip // limit + 1,
        "page_size": limit,
        "total_pages": (total_count + limit - 1) // limit,
        "data": exams
    }


@router.get("/{exam_id}")
async def get_exam(
    exam_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Get single exam"""
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam


@router.post("/")
async def create_exam(
    exam_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Create exam with all data"""
    # Get school name from schools table using school_id
    if exam_data.get('school_id'):
        school = db.query(School).filter(School.id == exam_data['school_id']).first()
        if school:
            exam_data['school_name'] = school.school_name
    
    # Get class names from classes table using class_ids
    if exam_data.get('class_ids'):
        class_ids = [int(id.strip()) for id in exam_data['class_ids'].split(',')]
        classes = db.query(Class).filter(Class.id.in_(class_ids)).all()
        if classes:
            class_names = [cls.class_name for cls in classes if cls.class_name]
            exam_data['class_names'] = ', '.join(class_names)
    
    exam = Exam(**exam_data)
    db.add(exam)
    db.commit()
    db.refresh(exam)
    return exam


@router.put("/{exam_id}")
async def update_exam(
    exam_id: int,
    update_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Update exam - any field"""
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    
    # If school_id is updated, fetch school name
    if 'school_id' in update_data:
        school = db.query(School).filter(School.id == update_data['school_id']).first()
        if school:
            update_data['school_name'] = school.school_name
    
    for field, value in update_data.items():
        if hasattr(exam, field):
            setattr(exam, field, value)
    
    exam.updated_at = datetime.now()
    db.commit()
    db.refresh(exam)
    return exam


@router.delete("/{exam_id}")
async def delete_exam(
    exam_id: int,
    hard_delete: bool = Query(False),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Delete exam"""
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    
    if hard_delete:
        db.delete(exam)
    else:
        exam.is_active = False
        exam.status = "cancelled"
    
    db.commit()
    return {"message": "Exam deleted successfully"}


@router.get("/filters/by-type")
async def get_exams_by_type(
    exam_type: str,
    school_id: Optional[int] = None,
    academic_year: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get exams by type"""
    query = db.query(Exam).filter(Exam.exam_type == exam_type)
    if school_id:
        query = query.filter(Exam.school_id == school_id)
    if academic_year:
        query = query.filter(Exam.academic_year == academic_year)
    return query.all()


@router.get("/filters/upcoming")
async def get_upcoming_exams(
    school_id: Optional[int] = None,
    days: int = Query(30, description="Number of days to look ahead"),
    db: Session = Depends(get_db)
):
    """Get upcoming exams"""
    from datetime import timedelta
    today = date.today()
    future_date = today + timedelta(days=days)
    
    query = db.query(Exam).filter(
        Exam.start_date >= today,
        Exam.start_date <= future_date,
        Exam.status != "cancelled"
    )
    if school_id:
        query = query.filter(Exam.school_id == school_id)
    
    return query.order_by(Exam.start_date.asc()).all()


@router.get("/filters/ongoing")
async def get_ongoing_exams(
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get ongoing exams"""
    today = date.today()
    query = db.query(Exam).filter(
        Exam.start_date <= today,
        Exam.end_date >= today,
        Exam.status == "ongoing"
    )
    if school_id:
        query = query.filter(Exam.school_id == school_id)
    return query.all()


@router.get("/stats/summary")
async def get_exam_stats(
    school_id: Optional[int] = None,
    academic_year: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get exam statistics"""
    query = db.query(Exam)
    if school_id:
        query = query.filter(Exam.school_id == school_id)
    if academic_year:
        query = query.filter(Exam.academic_year == academic_year)
    
    all_exams = query.all()
    today = date.today()
    
    return {
        "total_exams": len(all_exams),
        "scheduled_exams": sum(1 for e in all_exams if e.status == "scheduled"),
        "ongoing_exams": sum(1 for e in all_exams if e.status == "ongoing"),
        "completed_exams": sum(1 for e in all_exams if e.status == "completed"),
        "cancelled_exams": sum(1 for e in all_exams if e.status == "cancelled"),
        "upcoming_exams": sum(1 for e in all_exams if e.start_date and e.start_date > today)
    }
