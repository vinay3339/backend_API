"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import date, datetime
from models_denormalized import UserRole


# ==================== Authentication Schemas ====================

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    school_id: Optional[int] = None


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None


class UserLogin(BaseModel):
    username: str
    password: str


class PasswordChange(BaseModel):
    old_password: str
    new_password: str


class MessageResponse(BaseModel):
    message: str
    success: bool = True

    class Config:
        from_attributes = True


# ==================== Student Schemas ====================

class StudentBase(BaseModel):
    admission_no: str
    first_name: str
    last_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    class_id: Optional[int] = None
    section: Optional[str] = None
    roll_no: Optional[str] = None
    admission_date: Optional[date] = None
    academic_year: Optional[str] = None
    father_name: Optional[str] = None
    father_phone: Optional[str] = None
    father_email: Optional[str] = None
    mother_name: Optional[str] = None
    mother_phone: Optional[str] = None
    mother_email: Optional[str] = None
    guardian_name: Optional[str] = None
    guardian_phone: Optional[str] = None
    transport_required: bool = False
    status: str = "active"


class StudentCreate(StudentBase):
    school_id: int
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class StudentUpdate(BaseModel):
    """
    Flexible update schema - ALL fields are optional and updatable
    Allows updating ANY field including foreign keys (class_id, school_id, route_id, etc.)
    """
    # Basic Info
    admission_no: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    
    # Contact Info
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    
    # Academic Info (including ALL foreign keys)
    school_id: Optional[int] = None
    class_id: Optional[int] = None
    section: Optional[str] = None
    roll_no: Optional[str] = None
    admission_date: Optional[date] = None
    academic_year: Optional[str] = None
    
    # Parent/Guardian Info
    father_name: Optional[str] = None
    father_phone: Optional[str] = None
    father_email: Optional[str] = None
    mother_name: Optional[str] = None
    mother_phone: Optional[str] = None
    mother_email: Optional[str] = None
    guardian_name: Optional[str] = None
    guardian_phone: Optional[str] = None
    
    # Transport Info (including foreign keys)
    transport_required: Optional[bool] = None
    route_id: Optional[int] = None
    
    # Status
    status: Optional[str] = None
    is_active: Optional[bool] = None
    
    # Photo
    photo_url: Optional[str] = None
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class StudentResponse(StudentBase):
    id: int
    school_id: int
    photo_url: Optional[str] = None
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Teacher Schemas ====================

class TeacherBase(BaseModel):
    employee_id: str
    first_name: str
    last_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    subjects: Optional[str] = None
    qualifications: Optional[str] = None
    joining_date: Optional[date] = None
    employment_type: Optional[str] = None
    salary: Optional[float] = None


class TeacherCreate(TeacherBase):
    school_id: int
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class TeacherUpdate(BaseModel):
    """
    Flexible update schema - ALL fields are optional and updatable
    Allows updating ANY field including foreign keys (school_id, etc.)
    """
    # Basic Info
    employee_id: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    
    # Contact Info
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    
    # Professional Info (including foreign keys)
    school_id: Optional[int] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    subjects: Optional[str] = None
    qualifications: Optional[str] = None
    joining_date: Optional[date] = None
    employment_type: Optional[str] = None
    salary: Optional[float] = None
    
    # Status
    status: Optional[str] = None
    is_active: Optional[bool] = None
    
    # Photo
    photo_url: Optional[str] = None
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class TeacherResponse(TeacherBase):
    id: int
    school_id: int
    photo_url: Optional[str] = None
    status: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Class Schemas ====================

class ClassBase(BaseModel):
    class_name: str
    section: Optional[str] = None
    academic_year: str
    room_number: Optional[str] = None
    capacity: Optional[int] = None
    class_teacher_id: Optional[int] = None


class ClassCreate(ClassBase):
    school_id: int
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class ClassUpdate(BaseModel):
    """
    Flexible update schema - ALL fields are optional and updatable
    Allows updating ANY field including foreign keys (school_id, class_teacher_id, etc.)
    """
    class_name: Optional[str] = None
    section: Optional[str] = None
    academic_year: Optional[str] = None
    room_number: Optional[str] = None
    capacity: Optional[int] = None
    class_teacher_id: Optional[int] = None
    school_id: Optional[int] = None
    is_active: Optional[bool] = None
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class ClassResponse(ClassBase):
    id: int
    school_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Subject Schemas ====================

class SubjectBase(BaseModel):
    subject_name: str
    subject_code: Optional[str] = None
    subject_type: Optional[str] = None
    teacher_id: Optional[int] = None
    periods_per_week: Optional[int] = None
    max_marks: int = 100
    min_pass_marks: int = 35


class SubjectCreate(SubjectBase):
    class_id: int


class SubjectUpdate(BaseModel):
    subject_name: Optional[str] = None
    teacher_id: Optional[int] = None
    periods_per_week: Optional[int] = None


class SubjectResponse(SubjectBase):
    id: int
    class_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Attendance Schemas ====================

class AttendanceBase(BaseModel):
    student_id: int
    class_id: int
    date: date
    status: str  # present, absent, late, half_day, on_leave
    remarks: Optional[str] = None


class AttendanceCreate(AttendanceBase):
    marked_by: int


class AttendanceBulkCreate(BaseModel):
    class_id: int
    date: date
    attendance_list: List[dict]  # [{"student_id": 1, "status": "present"}, ...]
    marked_by: int


class AttendanceResponse(AttendanceBase):
    id: int
    marked_at: datetime
    
    class Config:
        from_attributes = True


class TeacherAttendanceBase(BaseModel):
    teacher_id: int
    date: date
    status: str
    check_in_time: Optional[str] = None
    check_out_time: Optional[str] = None
    remarks: Optional[str] = None


class TeacherAttendanceCreate(TeacherAttendanceBase):
    marked_by: int


class TeacherAttendanceResponse(TeacherAttendanceBase):
    id: int
    marked_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Exam Schemas ====================

class ExamBase(BaseModel):
    exam_name: str
    exam_code: str
    exam_type: str
    academic_year: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    max_marks: int = 100
    min_pass_marks: int = 35
    weightage: Optional[float] = None


class ExamCreate(ExamBase):
    school_id: int
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class ExamUpdate(BaseModel):
    """
    Flexible update schema - ALL fields are optional and updatable
    Allows updating ANY field including foreign keys (school_id, etc.)
    """
    exam_name: Optional[str] = None
    exam_code: Optional[str] = None
    exam_type: Optional[str] = None
    academic_year: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    max_marks: Optional[int] = None
    min_pass_marks: Optional[int] = None
    weightage: Optional[float] = None
    school_id: Optional[int] = None
    is_active: Optional[bool] = None
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class ExamResponse(ExamBase):
    id: int
    school_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Marks Schemas ====================

class MarkBase(BaseModel):
    student_id: int
    exam_id: int
    subject_id: int
    marks_obtained: float
    max_marks: float
    grade: Optional[str] = None
    remarks: Optional[str] = None


class MarkCreate(MarkBase):
    entered_by: int


class MarkBulkCreate(BaseModel):
    exam_id: int
    subject_id: int
    marks_list: List[dict]  # [{"student_id": 1, "marks_obtained": 85}, ...]
    entered_by: int


class MarkUpdate(BaseModel):
    marks_obtained: Optional[float] = None
    grade: Optional[str] = None
    remarks: Optional[str] = None


class MarkResponse(MarkBase):
    id: int
    entered_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Fee Schemas ====================

class FeeStructureBase(BaseModel):
    class_id: int
    academic_year: str
    fee_type: str
    amount: float
    due_date: Optional[date] = None
    term: Optional[str] = None


class FeeStructureCreate(FeeStructureBase):
    school_id: int


class FeeStructureResponse(FeeStructureBase):
    id: int
    school_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class FeeRecordBase(BaseModel):
    student_id: int
    academic_year: str
    fee_type: str
    amount: float
    due_date: Optional[date] = None


class FeeRecordCreate(FeeRecordBase):
    created_by: int


class FeePayment(BaseModel):
    fee_record_id: int
    paid_amount: float
    payment_date: date
    payment_mode: str
    transaction_id: Optional[str] = None
    receipt_number: Optional[str] = None


class FeeRecordResponse(FeeRecordBase):
    id: int
    paid_amount: float
    balance_amount: Optional[float]
    payment_date: Optional[date]
    payment_mode: Optional[str]
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Transport Schemas ====================

class TransportRouteBase(BaseModel):
    route_name: str
    route_number: Optional[str] = None
    vehicle_number: Optional[str] = None
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None
    conductor_name: Optional[str] = None
    conductor_phone: Optional[str] = None
    capacity: Optional[int] = None
    fare: Optional[float] = None


class TransportRouteCreate(TransportRouteBase):
    school_id: int
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class TransportRouteUpdate(BaseModel):
    """
    Flexible update schema - ALL fields are optional and updatable
    Allows updating ANY field including foreign keys (school_id, etc.)
    """
    route_name: Optional[str] = None
    route_number: Optional[str] = None
    vehicle_number: Optional[str] = None
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None
    conductor_name: Optional[str] = None
    conductor_phone: Optional[str] = None
    capacity: Optional[int] = None
    fare: Optional[float] = None
    school_id: Optional[int] = None
    is_active: Optional[bool] = None
    
    class Config:
        extra = "allow"  # Allow extra fields for dynamic schema evolution


class TransportRouteResponse(TransportRouteBase):
    id: int
    school_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# ==================== Common Response Schemas ====================

class PaginatedResponse(BaseModel):
    total: int
    page: int
    page_size: int
    total_pages: int
    data: List[dict]


class MessageResponse(BaseModel):
    message: str
    success: bool = True