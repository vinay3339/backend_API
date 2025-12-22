"""
Denormalized SQLAlchemy Models - Single Table Design
All related data stored in one table, use API filters instead of JOINs
"""
from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Boolean, Text, Enum, Time, JSON
from sqlalchemy.sql import func
from database import Base
import enum


class UserRole(str, enum.Enum):
    """User roles enumeration"""
    SUPER_ADMIN = "super_admin"
    SCHOOL_ADMIN = "school_admin"
    TEACHER = "teacher"
    STUDENT = "student"
    PARENT = "parent"


# ==================== DENORMALIZED STUDENT TABLE ====================

class Student(Base):
    """
    DENORMALIZED Student Model - All data in ONE table
    No foreign key relationships - all data embedded directly
    Use API filters to query specific subsets
    """
    __tablename__ = "students"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # User Account Link (for authentication)
    user_id = Column(Integer, index=True)  # Links to users table but not a FK
    
    # ==================== PERSONAL INFORMATION ====================
    admission_no = Column(String(50), unique=True, index=True, nullable=False)
    roll_no = Column(String(50), index=True)
    first_name = Column(String(100), nullable=False, index=True)
    last_name = Column(String(100), index=True)
    full_name = Column(String(200), index=True)  # Computed field
    date_of_birth = Column(Date, index=True)
    age = Column(Integer)  # Computed from DOB
    gender = Column(String(20), index=True)
    blood_group = Column(String(10))
    photo_url = Column(String(255))
    
    # ==================== CONTACT INFORMATION ====================
    email = Column(String(100), index=True)
    phone = Column(String(20))
    alternate_phone = Column(String(20))
    address = Column(Text)
    city = Column(String(100), index=True)
    state = Column(String(100), index=True)
    pincode = Column(String(10))
    country = Column(String(100), default="India")
    
    # ==================== SCHOOL INFORMATION (Denormalized) ====================
    # Instead of school_id foreign key, store all school details
    school_id = Column(Integer, index=True)  # Still keep for filtering
    school_code = Column(String(50), index=True)
    school_name = Column(String(200), index=True)
    school_address = Column(Text)
    school_city = Column(String(100))
    school_state = Column(String(100))
    school_phone = Column(String(20))
    school_email = Column(String(100))
    
    # ==================== CLASS INFORMATION (Denormalized) ====================
    # Instead of class_id foreign key, store all class details
    class_id = Column(Integer, index=True)  # Keep for filtering
    class_name = Column(String(100), index=True)
    section = Column(String(10), index=True)
    class_section = Column(String(120), index=True)  # Combined "Grade 5-A"
    room_number = Column(String(20))
    academic_year = Column(String(20), index=True)
    
    # Class Teacher Details (Denormalized)
    class_teacher_id = Column(Integer)
    class_teacher_name = Column(String(200))
    class_teacher_phone = Column(String(20))
    class_teacher_email = Column(String(100))
    
    # ==================== PARENT/GUARDIAN INFORMATION ====================
    # Father Details
    father_name = Column(String(100))
    father_phone = Column(String(20))
    father_email = Column(String(100))
    father_occupation = Column(String(100))
    father_annual_income = Column(Float)
    
    # Mother Details
    mother_name = Column(String(100))
    mother_phone = Column(String(20))
    mother_email = Column(String(100))
    mother_occupation = Column(String(100))
    mother_annual_income = Column(Float)
    
    # Guardian Details (if different from parents)
    guardian_name = Column(String(100))
    guardian_relation = Column(String(50))
    guardian_phone = Column(String(20))
    guardian_email = Column(String(100))
    guardian_address = Column(Text)
    
    # Emergency Contact
    emergency_contact_name = Column(String(100))
    emergency_contact_phone = Column(String(20))
    emergency_contact_relation = Column(String(50))
    
    # ==================== TRANSPORT INFORMATION (Denormalized) ====================
    transport_required = Column(Boolean, default=False, index=True)
    route_id = Column(Integer, index=True)
    route_name = Column(String(100), index=True)
    route_number = Column(String(50))
    vehicle_number = Column(String(50))
    driver_name = Column(String(100))
    driver_phone = Column(String(20))
    pickup_point = Column(String(255))
    drop_point = Column(String(255))
    pickup_time = Column(Time)
    drop_time = Column(Time)
    transport_fee = Column(Float)
    
    # ==================== ACADEMIC PERFORMANCE ====================
    current_grade = Column(String(10))  # A+, A, B+, etc.
    current_percentage = Column(Float)
    current_rank = Column(Integer)
    total_attendance_percentage = Column(Float, index=True)
    
    # Previous Academic Year
    previous_academic_year = Column(String(20))
    previous_class = Column(String(100))
    previous_percentage = Column(Float)
    previous_rank = Column(Integer)
    
    # ==================== FEE INFORMATION (Denormalized) ====================
    total_annual_fee = Column(Float)
    fee_paid = Column(Float)
    fee_pending = Column(Float, index=True)
    fee_status = Column(String(50), index=True)  # Paid, Pending, Overdue, Partial
    last_payment_date = Column(Date)
    last_payment_amount = Column(Float)
    next_due_date = Column(Date, index=True)
    
    # Fee Concession/Scholarship
    has_scholarship = Column(Boolean, default=False)
    scholarship_name = Column(String(100))
    scholarship_amount = Column(Float)
    scholarship_percentage = Column(Float)
    fee_concession_amount = Column(Float)
    fee_concession_reason = Column(String(255))
    
    # ==================== ADMISSION INFORMATION ====================
    admission_date = Column(Date, index=True)
    admission_type = Column(String(50))  # Fresh, Transfer, Migration
    previous_school_name = Column(String(200))
    previous_school_board = Column(String(50))
    transfer_certificate_no = Column(String(100))
    transfer_certificate_date = Column(Date)
    
    # ==================== HEALTH INFORMATION ====================
    height = Column(Float)  # in cm
    weight = Column(Float)  # in kg
    medical_conditions = Column(Text)
    allergies = Column(Text)
    medications = Column(Text)
    doctor_name = Column(String(100))
    doctor_phone = Column(String(20))
    health_insurance_number = Column(String(100))
    
    # ==================== BEHAVIORAL/SPECIAL NEEDS ====================
    special_needs = Column(Boolean, default=False)
    special_needs_description = Column(Text)
    behavioral_notes = Column(Text)
    learning_disabilities = Column(Text)
    accommodations_required = Column(Text)
    
    # ==================== EXTRACURRICULAR ====================
    sports = Column(Text)  # Comma-separated or JSON
    hobbies = Column(Text)
    achievements = Column(Text)
    clubs = Column(Text)
    house = Column(String(50))  # Red, Blue, Green, Yellow
    
    # ==================== DOCUMENTS ====================
    birth_certificate_url = Column(String(255))
    transfer_certificate_url = Column(String(255))
    marksheet_url = Column(String(255))
    aadhar_number = Column(String(20))
    aadhar_url = Column(String(255))
    passport_number = Column(String(50))
    nationality = Column(String(50), default="Indian")
    religion = Column(String(50))
    caste = Column(String(50))
    category = Column(String(50))  # General, OBC, SC, ST
    
    # ==================== STATUS & METADATA ====================
    status = Column(String(50), default="active", index=True)  # active, inactive, passed_out, transferred
    is_active = Column(Boolean, default=True, index=True)
    remarks = Column(Text)
    notes = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now(), index=True)
    updated_at = Column(DateTime, onupdate=func.now())
    created_by = Column(String(50))  # User ID who created
    updated_by = Column(String(50))  # User ID who last updated
    
    # ==================== FLEXIBLE CUSTOM FIELDS ====================
    # JSON column for unlimited custom fields
    custom_fields = Column(JSON)  # Store any additional custom data as JSON
    
    # Search optimization
    search_text = Column(Text)  # Full-text search field


# ==================== DENORMALIZED TEACHER TABLE ====================

class Teacher(Base):
    """
    DENORMALIZED Teacher Model - All data in ONE table
    """
    __tablename__ = "teachers"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # ==================== PERSONAL INFORMATION ====================
    employee_id = Column(String(50), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False, index=True)
    last_name = Column(String(100), index=True)
    full_name = Column(String(200), index=True)
    date_of_birth = Column(Date)
    age = Column(Integer)
    gender = Column(String(20), index=True)
    blood_group = Column(String(10))
    photo_url = Column(String(255))
    
    # ==================== CONTACT INFORMATION ====================
    email = Column(String(100), index=True)
    phone = Column(String(20))
    alternate_phone = Column(String(20))
    address = Column(Text)
    city = Column(String(100), index=True)
    state = Column(String(100), index=True)
    pincode = Column(String(10))
    country = Column(String(100), default="India")
    
    # ==================== SCHOOL INFORMATION (Denormalized) ====================
    school_id = Column(Integer, index=True)
    school_code = Column(String(50), index=True)
    school_name = Column(String(200), index=True)
    school_address = Column(Text)
    school_city = Column(String(100))
    school_phone = Column(String(20))
    
    # ==================== PROFESSIONAL INFORMATION ====================
    designation = Column(String(100), index=True)
    department = Column(String(100), index=True)
    subjects = Column(Text)  # Comma-separated subject names
    qualifications = Column(Text)
    experience_years = Column(Integer, index=True)
    joining_date = Column(Date, index=True)
    employment_type = Column(String(50), index=True)  # Permanent, Contract, Part-time
    
    # ==================== SALARY INFORMATION ====================
    basic_salary = Column(Float)
    allowances = Column(Float)
    deductions = Column(Float)
    net_salary = Column(Float)
    salary_account_number = Column(String(100))
    salary_bank_name = Column(String(100))
    salary_ifsc_code = Column(String(20))
    pan_number = Column(String(20))
    
    # ==================== CLASS ASSIGNMENTS (Denormalized) ====================
    assigned_classes = Column(Text)  # JSON or comma-separated
    is_class_teacher = Column(Boolean, default=False)
    class_teacher_of = Column(String(100))  # Which class/section
    
    # ==================== ATTENDANCE & LEAVES ====================
    total_leaves_allowed = Column(Integer, default=20)
    leaves_taken = Column(Integer, default=0)
    leaves_remaining = Column(Integer, default=20)
    attendance_percentage = Column(Float)
    
    # ==================== EMERGENCY CONTACT ====================
    emergency_contact_name = Column(String(100))
    emergency_contact_phone = Column(String(20))
    emergency_contact_relation = Column(String(50))
    
    # ==================== DOCUMENTS ====================
    aadhar_number = Column(String(20))
    pan_number_copy = Column(String(255))
    resume_url = Column(String(255))
    certificates_url = Column(Text)  # JSON array of URLs
    
    # ==================== STATUS & METADATA ====================
    status = Column(String(50), default="active", index=True)
    is_active = Column(Boolean, default=True, index=True)
    remarks = Column(Text)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Custom fields
    custom_fields = Column(JSON)


# ==================== DENORMALIZED CLASS TABLE ====================

class Class(Base):
    """
    DENORMALIZED Class Model
    """
    __tablename__ = "classes"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # School Info (Denormalized)
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    
    # Class Info
    class_name = Column(String(100), index=True, nullable=False)
    section = Column(String(10), index=True)
    class_section = Column(String(120), index=True)  # "Grade 5-A"
    academic_year = Column(String(20), index=True, nullable=False)
    room_number = Column(String(20))
    capacity = Column(Integer)
    current_strength = Column(Integer)
    
    # Class Teacher (Denormalized)
    class_teacher_id = Column(Integer, index=True)
    class_teacher_name = Column(String(200))
    class_teacher_email = Column(String(100))
    class_teacher_phone = Column(String(20))
    
    # Subject Teachers (Denormalized - JSON)
    subject_teachers = Column(JSON)  # [{"subject": "Math", "teacher_name": "John", "teacher_id": 1}]
    
    # Timetable
    timetable = Column(JSON)  # Store entire timetable as JSON
    
    # Status
    status = Column(String(50), default="active", index=True)
    is_active = Column(Boolean, default=True, index=True)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    custom_fields = Column(JSON)


# ==================== DENORMALIZED EXAM TABLE ====================

class Exam(Base):
    """
    DENORMALIZED Exam Model
    """
    __tablename__ = "exams"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # School Info
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    
    # Exam Info
    exam_name = Column(String(200), nullable=False, index=True)
    exam_code = Column(String(50), index=True)
    exam_type = Column(String(50), index=True)  # Unit Test, Mid-term, Final
    academic_year = Column(String(20), index=True)
    
    # Class Info (Denormalized)
    class_ids = Column(Text)  # Comma-separated class IDs
    class_names = Column(Text)  # Comma-separated class names
    
    # Dates
    start_date = Column(Date, index=True)
    end_date = Column(Date, index=True)
    result_date = Column(Date)
    
    # Marks
    max_marks = Column(Integer, default=100)
    min_pass_marks = Column(Integer, default=35)
    weightage = Column(Float)
    
    # Status
    status = Column(String(50), default="scheduled", index=True)  # scheduled, ongoing, completed
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    custom_fields = Column(JSON)


# ==================== DENORMALIZED TRANSPORT TABLE ====================

class TransportRoute(Base):
    """
    DENORMALIZED Transport Route Model
    """
    __tablename__ = "transport_routes"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # School Info
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    
    # Route Info
    route_name = Column(String(100), nullable=False, index=True)
    route_number = Column(String(50), index=True)
    
    # Vehicle Info
    vehicle_number = Column(String(50), index=True)
    vehicle_type = Column(String(50))  # Bus, Van, Auto
    vehicle_model = Column(String(100))
    vehicle_capacity = Column(Integer)
    
    # Driver Info
    driver_name = Column(String(100))
    driver_phone = Column(String(20))
    driver_license = Column(String(50))
    driver_address = Column(Text)
    
    # Conductor Info
    conductor_name = Column(String(100))
    conductor_phone = Column(String(20))
    
    # Route Details
    route_stops = Column(JSON)  # Array of stops with timings
    total_distance = Column(Float)  # in KM
    average_time = Column(Integer)  # in minutes
    
    # Fee Info
    monthly_fee = Column(Float)
    annual_fee = Column(Float)
    
    # Students on this route (Denormalized)
    total_students = Column(Integer, default=0)
    student_list = Column(JSON)  # Array of student details
    
    # Status
    status = Column(String(50), default="active", index=True)
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    custom_fields = Column(JSON)


# ==================== USER MODEL (Minimal) ====================

class User(Base):
    """User authentication model"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    # Store role as plain string to avoid DB enum mismatches across migrations
    role = Column(String(50), nullable=False)
    
    # School info (denormalized)
    school_id = Column(Integer, index=True)
    school_name = Column(String(200))
    
    is_active = Column(Boolean, default=True)
    is_first_login = Column(Boolean, default=True)
    last_login = Column(DateTime)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


# ==================== SCHOOL MODEL (Minimal) ====================

class School(Base):
    """School model - kept for reference but data duplicated in other tables"""
    __tablename__ = "schools"
    
    id = Column(Integer, primary_key=True, index=True)
    school_code = Column(String(50), unique=True, index=True, nullable=False)
    school_name = Column(String(200), nullable=False)
    address = Column(Text)
    city = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(10))
    phone = Column(String(20))
    email = Column(String(100))
    principal_name = Column(String(100))
    board = Column(String(50))
    affiliation_no = Column(String(50))
    logo_url = Column(String(255))
    primary_color = Column(String(7))
    secondary_color = Column(String(7))
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class Subject(Base):
    __tablename__ = "subjects"
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    class_id = Column(Integer, index=True)
    class_name = Column(String(100), index=True)
    section = Column(String(10), index=True)
    academic_year = Column(String(20), index=True)
    subject_name = Column(String(100), nullable=False, index=True)
    subject_code = Column(String(20), index=True)
    subject_type = Column(String(50), index=True)
    description = Column(Text)
    teacher_id = Column(Integer, index=True)
    teacher_name = Column(String(200))
    teacher_email = Column(String(100))
    teacher_phone = Column(String(20))
    periods_per_week = Column(Integer)
    total_hours = Column(Integer)
    max_marks = Column(Integer)
    min_pass_marks = Column(Integer)
    practical_marks = Column(Integer)
    theory_marks = Column(Integer)
    syllabus_url = Column(String(255))
    textbook = Column(String(255))
    reference_books = Column(Text)
    status = Column(String(50), default="active", index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    custom_fields = Column(JSON)


class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    student_id = Column(Integer, index=True, nullable=False)
    student_name = Column(String(200), index=True)
    admission_no = Column(String(50), index=True)
    roll_no = Column(String(50), index=True)
    class_id = Column(Integer, index=True)
    class_name = Column(String(100), index=True)
    section = Column(String(10), index=True)
    date = Column(Date, nullable=False, index=True)
    status = Column(String(20), nullable=False, index=True)
    check_in_time = Column(Time)
    check_out_time = Column(Time)
    subject_id = Column(Integer, index=True)
    subject_name = Column(String(100))
    marked_by_id = Column(Integer, index=True)
    marked_by_name = Column(String(200))
    remarks = Column(Text)
    reason = Column(String(255))
    late_by_minutes = Column(Integer)
    academic_year = Column(String(20), index=True)
    month = Column(Integer, index=True)
    week = Column(Integer, index=True)
    marked_at = Column(DateTime)
    custom_fields = Column(JSON)


class Mark(Base):
    __tablename__ = "marks"
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    student_id = Column(Integer, index=True, nullable=False)
    student_name = Column(String(200), index=True)
    admission_no = Column(String(50), index=True)
    roll_no = Column(String(50), index=True)
    class_id = Column(Integer, index=True)
    class_name = Column(String(100), index=True)
    section = Column(String(10), index=True)
    exam_id = Column(Integer, index=True, nullable=False)
    exam_name = Column(String(200), index=True)
    exam_code = Column(String(50), index=True)
    exam_type = Column(String(50), index=True)
    subject_id = Column(Integer, index=True)
    subject_name = Column(String(100), index=True)
    subject_code = Column(String(20), index=True)
    theory_marks = Column(Float)
    practical_marks = Column(Float)
    total_marks_obtained = Column(Float)
    max_marks = Column(Float)
    percentage = Column(Float)
    grade = Column(String(5))
    is_absent = Column(Boolean, default=False)
    pass_status = Column(String(20))
    entered_by_id = Column(Integer, index=True)
    entered_by_name = Column(String(200))
    remarks = Column(Text)
    academic_year = Column(String(20), index=True)
    entered_at = Column(DateTime)
    updated_at = Column(DateTime, onupdate=func.now())
    custom_fields = Column(JSON)


class FeeStructure(Base):
    __tablename__ = "fee_structures"
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    class_id = Column(Integer, index=True)
    class_name = Column(String(100), index=True)
    fee_type = Column(String(100), index=True)
    fee_category = Column(String(100), index=True)
    amount = Column(Float, nullable=False)
    academic_year = Column(String(20), index=True)
    term = Column(String(50), index=True)
    due_date = Column(Date, index=True)
    description = Column(Text)
    is_mandatory = Column(Boolean, default=True)
    late_fee_applicable = Column(Boolean, default=False)
    late_fee_amount = Column(Float)
    concession_applicable = Column(Boolean, default=False)
    concession_percentage = Column(Float)
    status = Column(String(50), default="active", index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    custom_fields = Column(JSON)


class FeePayment(Base):
    __tablename__ = "fee_payments"
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    student_id = Column(Integer, index=True, nullable=False)
    student_name = Column(String(200), index=True)
    admission_no = Column(String(50), index=True)
    roll_no = Column(String(50), index=True)
    class_id = Column(Integer, index=True)
    class_name = Column(String(100), index=True)
    section = Column(String(10), index=True)
    fee_structure_id = Column(Integer, index=True)
    fee_type = Column(String(100), index=True)
    fee_category = Column(String(100), index=True)
    receipt_number = Column(String(100), index=True)
    payment_date = Column(Date, index=True)
    total_fee_amount = Column(Float)
    concession_amount = Column(Float)
    late_fee_amount = Column(Float)
    net_amount = Column(Float)
    amount_paid = Column(Float)
    balance_amount = Column(Float)
    payment_mode = Column(String(50))
    transaction_id = Column(String(100))
    bank_name = Column(String(100))
    cheque_number = Column(String(50))
    payment_status = Column(String(20), index=True)
    received_by_id = Column(Integer, index=True)
    received_by_name = Column(String(200))
    academic_year = Column(String(20), index=True)
    remarks = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    custom_fields = Column(JSON)


class Timetable(Base):
    __tablename__ = "timetables"
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, index=True)
    school_name = Column(String(200), index=True)
    class_id = Column(Integer, index=True)
    class_name = Column(String(100), index=True)
    section = Column(String(10), index=True)
    subject_id = Column(Integer, index=True)
    subject_name = Column(String(100))
    teacher_id = Column(Integer, index=True)
    teacher_name = Column(String(200))
    day_of_week = Column(String(20), index=True)
    period_number = Column(Integer, index=True)
    start_time = Column(Time)
    end_time = Column(Time)
    duration_minutes = Column(Integer)
    room_number = Column(String(20))
    academic_year = Column(String(20), index=True)
    term = Column(String(50), index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    custom_fields = Column(JSON)