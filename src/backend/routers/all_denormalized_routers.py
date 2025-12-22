"""
Complete Denormalized Routers for ALL Entities
Subjects, Attendance, Marks, Fee Payments - All with advanced filtering
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import Optional, List
from datetime import date, datetime
from database import get_db
from models_denormalized import Subject, Attendance, Mark, FeeStructure, FeePayment, Timetable, School, Class, Teacher
from auth import get_current_active_user, get_password_hash


# ==================== SUBJECTS ROUTER ====================

subjects_router = APIRouter(prefix="/data/subjects", tags=["Subjects (Denormalized)"])


@subjects_router.get("/")
@subjects_router.get("")
async def get_subjects(
    skip: int = 0,
    limit: int = 100,
    school_id: Optional[int] = None,
    class_id: Optional[int] = None,
    class_name: Optional[str] = None,
    teacher_id: Optional[int] = None,
    teacher_name: Optional[str] = None,
    subject_type: Optional[str] = None,
    academic_year: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get subjects with filters"""
    query = db.query(Subject)
    
    if school_id:
        query = query.filter(Subject.school_id == school_id)
    if class_id:
        query = query.filter(Subject.class_id == class_id)
    if class_name:
        query = query.filter(Subject.class_name == class_name)
    if teacher_id:
        query = query.filter(Subject.teacher_id == teacher_id)
    if teacher_name:
        query = query.filter(Subject.teacher_name.contains(teacher_name))
    if subject_type:
        query = query.filter(Subject.subject_type == subject_type)
    if academic_year:
        query = query.filter(Subject.academic_year == academic_year)
    
    if search:
        query = query.filter(
            or_(
                Subject.subject_name.contains(search),
                Subject.subject_code.contains(search),
                Subject.teacher_name.contains(search)
            )
        )
    
    total = query.count()
    subjects = query.offset(skip).limit(limit).all()
    
    return {"total": total, "data": subjects}


@subjects_router.post("/")
async def create_subject(subject_data: dict, db: Session = Depends(get_db)):
    """Create subject with all data in single request"""
    subject = Subject(**subject_data)
    db.add(subject)
    db.commit()
    db.refresh(subject)
    return subject


@subjects_router.put("/{subject_id}")
async def update_subject(subject_id: int, update_data: dict, db: Session = Depends(get_db)):
    """Update subject - any field"""
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    for field, value in update_data.items():
        if hasattr(subject, field):
            setattr(subject, field, value)
    
    db.commit()
    db.refresh(subject)
    return subject


@subjects_router.delete("/{subject_id}")
async def delete_subject(subject_id: int, hard_delete: bool = False, db: Session = Depends(get_db)):
    """Delete subject - soft delete by default, hard delete if hard_delete=true"""
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    if hard_delete:
        db.delete(subject)
        db.commit()
        return {"message": "Subject permanently deleted"}
    else:
        subject.is_active = False
        db.commit()
        return {"message": "Subject soft deleted"}


# ==================== ATTENDANCE ROUTER ====================

attendance_router = APIRouter(prefix="/data/attendance", tags=["Attendance (Denormalized)"])


@attendance_router.get("/")
@attendance_router.get("")
async def get_attendance(
    skip: int = 0,
    limit: int = 100,
    school_id: Optional[int] = None,
    student_id: Optional[int] = None,
    student_name: Optional[str] = None,
    class_id: Optional[int] = None,
    class_name: Optional[str] = None,
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    status: Optional[str] = None,
    academic_year: Optional[str] = None,
    month: Optional[int] = None,
    subject_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get attendance with filters"""
    query = db.query(Attendance)
    
    if school_id:
        query = query.filter(Attendance.school_id == school_id)
    if student_id:
        query = query.filter(Attendance.student_id == student_id)
    if student_name:
        query = query.filter(Attendance.student_name.contains(student_name))
    if class_id:
        query = query.filter(Attendance.class_id == class_id)
    if class_name:
        query = query.filter(Attendance.class_name == class_name)
    if date_from:
        query = query.filter(Attendance.date >= date_from)
    if date_to:
        query = query.filter(Attendance.date <= date_to)
    if status:
        query = query.filter(Attendance.status == status)
    if academic_year:
        query = query.filter(Attendance.academic_year == academic_year)
    if month:
        query = query.filter(Attendance.month == month)
    if subject_id:
        query = query.filter(Attendance.subject_id == subject_id)
    
    total = query.count()
    attendance = query.offset(skip).limit(limit).all()
    
    return {"total": total, "data": attendance}


@attendance_router.post("/")
async def create_attendance(attendance_data: dict, db: Session = Depends(get_db)):
    """Create attendance record"""
    attendance = Attendance(**attendance_data)
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance


@attendance_router.put("/{attendance_id}")
async def update_attendance(attendance_id: int, update_data: dict, db: Session = Depends(get_db)):
    """Update attendance record"""
    attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    
    for field, value in update_data.items():
        if hasattr(attendance, field):
            setattr(attendance, field, value)
    
    db.commit()
    db.refresh(attendance)
    return attendance


@attendance_router.delete("/{attendance_id}")
async def delete_attendance(attendance_id: int, hard_delete: bool = False, db: Session = Depends(get_db)):
    """Delete attendance record - soft delete by default, hard delete if hard_delete=true"""
    attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    
    if hard_delete:
        db.delete(attendance)
        db.commit()
        return {"message": "Attendance permanently deleted"}
    else:
        attendance.status = "deleted"
        db.commit()
        return {"message": "Attendance soft deleted"}


# ==================== MARKS ROUTER ====================

marks_router = APIRouter(prefix="/data/marks", tags=["Marks (Denormalized)"])


@marks_router.get("/")
@marks_router.get("")
async def get_marks(
    skip: int = 0,
    limit: int = 100,
    school_id: Optional[int] = None,
    student_id: Optional[int] = None,
    student_name: Optional[str] = None,
    class_id: Optional[int] = None,
    exam_id: Optional[int] = None,
    exam_name: Optional[str] = None,
    exam_type: Optional[str] = None,
    subject_id: Optional[int] = None,
    subject_name: Optional[str] = None,
    grade: Optional[str] = None,
    pass_status: Optional[str] = None,
    academic_year: Optional[str] = None,
    percentage_min: Optional[float] = None,
    percentage_max: Optional[float] = None,
    db: Session = Depends(get_db)
):
    """Get marks with filters"""
    query = db.query(Mark)
    
    if school_id:
        query = query.filter(Mark.school_id == school_id)
    if student_id:
        query = query.filter(Mark.student_id == student_id)
    if student_name:
        query = query.filter(Mark.student_name.contains(student_name))
    if class_id:
        query = query.filter(Mark.class_id == class_id)
    if exam_id:
        query = query.filter(Mark.exam_id == exam_id)
    if exam_name:
        query = query.filter(Mark.exam_name.contains(exam_name))
    if exam_type:
        query = query.filter(Mark.exam_type == exam_type)
    if subject_id:
        query = query.filter(Mark.subject_id == subject_id)
    if subject_name:
        query = query.filter(Mark.subject_name.contains(subject_name))
    if grade:
        query = query.filter(Mark.grade == grade)
    if pass_status:
        query = query.filter(Mark.pass_status == pass_status)
    if academic_year:
        query = query.filter(Mark.academic_year == academic_year)
    if percentage_min:
        query = query.filter(Mark.percentage >= percentage_min)
    if percentage_max:
        query = query.filter(Mark.percentage <= percentage_max)
    
    total = query.count()
    marks = query.offset(skip).limit(limit).all()
    
    return {"total": total, "data": marks}


@marks_router.post("/")
async def create_mark(mark_data: dict, db: Session = Depends(get_db)):
    """Create mark record"""
    mark = Mark(**mark_data)
    db.add(mark)
    db.commit()
    db.refresh(mark)
    return mark


@marks_router.put("/{mark_id}")
async def update_mark(mark_id: int, update_data: dict, db: Session = Depends(get_db)):
    """Update mark record"""
    mark = db.query(Mark).filter(Mark.id == mark_id).first()
    if not mark:
        raise HTTPException(status_code=404, detail="Mark not found")
    
    for field, value in update_data.items():
        if hasattr(mark, field):
            setattr(mark, field, value)
    
    db.commit()
    db.refresh(mark)
    return mark


@marks_router.delete("/{mark_id}")
async def delete_mark(mark_id: int, hard_delete: bool = False, db: Session = Depends(get_db)):
    """Delete mark record - soft delete by default, hard delete if hard_delete=true"""
    mark = db.query(Mark).filter(Mark.id == mark_id).first()
    if not mark:
        raise HTTPException(status_code=404, detail="Mark not found")
    
    if hard_delete:
        db.delete(mark)
        db.commit()
        return {"message": "Mark permanently deleted"}
    else:
        mark.is_absent = True
        db.commit()
        return {"message": "Mark soft deleted"}


# ==================== FEE STRUCTURE ROUTER ====================

fee_structure_router = APIRouter(prefix="/data/fee-structures", tags=["Fee Structures (Denormalized)"])


@fee_structure_router.get("/")
@fee_structure_router.get("")
async def get_fee_structures(
    skip: int = 0,
    limit: int = 100,
    school_id: Optional[int] = None,
    class_id: Optional[int] = None,
    fee_type: Optional[str] = None,
    academic_year: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get fee structures with filters"""
    query = db.query(FeeStructure)
    
    if school_id:
        query = query.filter(FeeStructure.school_id == school_id)
    if class_id:
        query = query.filter(FeeStructure.class_id == class_id)
    if fee_type:
        query = query.filter(FeeStructure.fee_type == fee_type)
    if academic_year:
        query = query.filter(FeeStructure.academic_year == academic_year)
    
    total = query.count()
    structures = query.offset(skip).limit(limit).all()
    
    return {"total": total, "data": structures}


@fee_structure_router.post("/")
async def create_fee_structure(structure_data: dict, db: Session = Depends(get_db)):
    """Create fee structure"""
    structure = FeeStructure(**structure_data)
    db.add(structure)
    db.commit()
    db.refresh(structure)
    return structure


@fee_structure_router.put("/{structure_id}")
async def update_fee_structure(structure_id: int, update_data: dict, db: Session = Depends(get_db)):
    """Update fee structure"""
    structure = db.query(FeeStructure).filter(FeeStructure.id == structure_id).first()
    if not structure:
        raise HTTPException(status_code=404, detail="Fee structure not found")
    
    for field, value in update_data.items():
        if hasattr(structure, field):
            setattr(structure, field, value)
    
    db.commit()
    db.refresh(structure)
    return structure


@fee_structure_router.delete("/{structure_id}")
async def delete_fee_structure(structure_id: int, hard_delete: bool = False, db: Session = Depends(get_db)):
    """Delete fee structure - soft delete by default, hard delete if hard_delete=true"""
    structure = db.query(FeeStructure).filter(FeeStructure.id == structure_id).first()
    if not structure:
        raise HTTPException(status_code=404, detail="Fee structure not found")
    
    if hard_delete:
        db.delete(structure)
        db.commit()
        return {"message": "Fee structure permanently deleted"}
    else:
        structure.is_active = False
        db.commit()
        return {"message": "Fee structure soft deleted"}


# ==================== FEE PAYMENTS ROUTER ====================

fee_payments_router = APIRouter(prefix="/data/fee-payments", tags=["Fee Payments (Denormalized)"])


@fee_payments_router.get("/")
@fee_payments_router.get("")
async def get_fee_payments(
    skip: int = 0,
    limit: int = 100,
    school_id: Optional[int] = None,
    student_id: Optional[int] = None,
    payment_status: Optional[str] = None,
    academic_year: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get fee payments with filters"""
    query = db.query(FeePayment)
    
    if school_id:
        query = query.filter(FeePayment.school_id == school_id)
    if student_id:
        query = query.filter(FeePayment.student_id == student_id)
    if payment_status:
        query = query.filter(FeePayment.payment_status == payment_status)
    if academic_year:
        query = query.filter(FeePayment.academic_year == academic_year)
    
    total = query.count()
    payments = query.offset(skip).limit(limit).all()
    
    return {"total": total, "data": payments}


@fee_payments_router.post("/")
async def create_fee_payment(payment_data: dict, db: Session = Depends(get_db)):
    """Create fee payment record"""
    payment = FeePayment(**payment_data)
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


@fee_payments_router.put("/{payment_id}")
async def update_fee_payment(payment_id: int, update_data: dict, db: Session = Depends(get_db)):
    """Update fee payment"""
    payment = db.query(FeePayment).filter(FeePayment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Fee payment not found")
    
    for field, value in update_data.items():
        if hasattr(payment, field):
            setattr(payment, field, value)
    
    db.commit()
    db.refresh(payment)
    return payment


@fee_payments_router.delete("/{payment_id}")
async def delete_fee_payment(payment_id: int, hard_delete: bool = False, db: Session = Depends(get_db)):
    """Delete fee payment - soft delete by default, hard delete if hard_delete=true"""
    payment = db.query(FeePayment).filter(FeePayment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Fee payment not found")
    
    if hard_delete:
        db.delete(payment)
        db.commit()
        return {"message": "Fee payment permanently deleted"}
    else:
        payment.payment_status = "cancelled"
        db.commit()
        return {"message": "Fee payment soft deleted"}


# ==================== TIMETABLE ROUTER ====================

timetable_router = APIRouter(prefix="/data/timetables", tags=["Timetables (Denormalized)"])


@timetable_router.get("/")
@timetable_router.get("")
async def get_timetables(
    skip: int = 0,
    limit: int = 100,
    school_id: Optional[int] = None,
    class_id: Optional[int] = None,
    teacher_id: Optional[int] = None,
    day_of_week: Optional[str] = None,
    academic_year: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get timetables with filters"""
    query = db.query(Timetable)
    
    if school_id:
        query = query.filter(Timetable.school_id == school_id)
    if class_id:
        query = query.filter(Timetable.class_id == class_id)
    if teacher_id:
        query = query.filter(Timetable.teacher_id == teacher_id)
    if day_of_week:
        query = query.filter(Timetable.day_of_week == day_of_week)
    if academic_year:
        query = query.filter(Timetable.academic_year == academic_year)
    
    total = query.count()
    timetables = query.offset(skip).limit(limit).all()
    
    return {"total": total, "data": timetables}


@timetable_router.post("/")
async def create_timetable(timetable_data: dict, db: Session = Depends(get_db)):
    """Create timetable entry with auto-populated school and class info"""
    # Auto-populate school name from schools table
    if "school_id" in timetable_data and timetable_data["school_id"]:
        school = db.query(School).filter(School.id == timetable_data["school_id"]).first()
        if school:
            timetable_data["school_name"] = school.school_name
    
    # Auto-populate class info from classes table
    if "class_id" in timetable_data and timetable_data["class_id"]:
        class_info = db.query(Class).filter(Class.id == timetable_data["class_id"]).first()
        if class_info:
            timetable_data["class_name"] = class_info.class_name
            timetable_data["section"] = class_info.section
            timetable_data["academic_year"] = class_info.academic_year
    
    # Auto-populate subject name from subjects table
    if "subject_id" in timetable_data and timetable_data["subject_id"]:
        subject = db.query(Subject).filter(Subject.id == timetable_data["subject_id"]).first()
        if subject:
            timetable_data["subject_name"] = subject.subject_name
    
    # Auto-populate teacher name from teachers table
    if "teacher_id" in timetable_data and timetable_data["teacher_id"]:
        teacher = db.query(Teacher).filter(Teacher.id == timetable_data["teacher_id"]).first()
        if teacher:
            timetable_data["teacher_name"] = teacher.full_name
    
    timetable = Timetable(**timetable_data)
    db.add(timetable)
    db.commit()
    db.refresh(timetable)
    return timetable


@timetable_router.put("/{timetable_id}")
async def update_timetable(timetable_id: int, update_data: dict, db: Session = Depends(get_db)):
    """Update timetable entry"""
    timetable = db.query(Timetable).filter(Timetable.id == timetable_id).first()
    if not timetable:
        raise HTTPException(status_code=404, detail="Timetable not found")
    
    for field, value in update_data.items():
        if hasattr(timetable, field):
            setattr(timetable, field, value)
    
    db.commit()
    db.refresh(timetable)
    return timetable


@timetable_router.delete("/{timetable_id}")
async def delete_timetable(timetable_id: int, hard_delete: bool = False, db: Session = Depends(get_db)):
    """Delete timetable entry - soft delete by default, hard delete if hard_delete=true"""
    timetable = db.query(Timetable).filter(Timetable.id == timetable_id).first()
    if not timetable:
        raise HTTPException(status_code=404, detail="Timetable not found")
    
    if hard_delete:
        db.delete(timetable)
        db.commit()
        return {"message": "Timetable permanently deleted"}
    else:
        timetable.is_active = False
        db.commit()
        return {"message": "Timetable soft deleted"}