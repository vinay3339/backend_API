"""
SQLAlchemy Database Models
"""
from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Boolean, Text, ForeignKey, Enum, Time
from sqlalchemy.orm import relationship
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


class School(Base):
    """School model"""
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
    board = Column(String(50))  # CBSE, ICSE, State Board
    affiliation_no = Column(String(50))
    logo_url = Column(String(255))
    primary_color = Column(String(7))  # Hex color
    secondary_color = Column(String(7))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    users = relationship("User", back_populates="school")
    students = relationship("Student", back_populates="school")
    teachers = relationship("Teacher", back_populates="school")
    classes = relationship("Class", back_populates="school")


class User(Base):
    """User authentication model"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(
        Enum(
            UserRole,
            values_callable=lambda enum_cls: [e.value for e in enum_cls],
            name="userrole",
            native_enum=False,
        ),
        nullable=False,
    )
    is_active = Column(Boolean, default=True)
    is_first_login = Column(Boolean, default=True)
    last_login = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    school = relationship("School", back_populates="users")


class Student(Base):
    """Student model"""
    __tablename__ = "students"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Personal Information
    admission_no = Column(String(50), unique=True, index=True, nullable=False)
    roll_no = Column(String(50))
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100))
    date_of_birth = Column(Date)
    gender = Column(String(20))
    blood_group = Column(String(10))
    photo_url = Column(String(255))
    
    # Contact Information
    email = Column(String(100))
    phone = Column(String(20))
    address = Column(Text)
    city = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(10))
    
    # Academic Information
    class_id = Column(Integer, ForeignKey("classes.id"))
    section = Column(String(10))
    admission_date = Column(Date)
    academic_year = Column(String(20))
    
    # Parent Information
    father_name = Column(String(100))
    father_phone = Column(String(20))
    father_email = Column(String(100))
    father_occupation = Column(String(100))
    mother_name = Column(String(100))
    mother_phone = Column(String(20))
    mother_email = Column(String(100))
    mother_occupation = Column(String(100))
    guardian_name = Column(String(100))
    guardian_phone = Column(String(20))
    guardian_relation = Column(String(50))
    
    # Other Information
    transport_required = Column(Boolean, default=False)
    route_id = Column(Integer, ForeignKey("transport_routes.id"), nullable=True)
    hostel_required = Column(Boolean, default=False)
    medical_conditions = Column(Text)
    previous_school = Column(String(200))
    tc_number = Column(String(50))
    
    # Status
    status = Column(String(20), default="active")  # active, inactive, graduated, transferred
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    school = relationship("School", back_populates="students")
    class_obj = relationship("Class", back_populates="students")
    attendance_records = relationship("Attendance", back_populates="student")
    marks = relationship("Mark", back_populates="student")
    fee_records = relationship("FeeRecord", back_populates="student")


class Teacher(Base):
    """Teacher model"""
    __tablename__ = "teachers"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Personal Information
    employee_id = Column(String(50), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100))
    date_of_birth = Column(Date)
    gender = Column(String(20))
    blood_group = Column(String(10))
    photo_url = Column(String(255))
    
    # Contact Information
    email = Column(String(100), unique=True)
    phone = Column(String(20))
    alternate_phone = Column(String(20))
    address = Column(Text)
    city = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(10))
    
    # Professional Information
    designation = Column(String(100))
    department = Column(String(100))
    subjects = Column(Text)  # JSON array of subjects
    qualifications = Column(Text)
    experience_years = Column(Integer)
    joining_date = Column(Date)
    
    # Employment Details
    employment_type = Column(String(50))  # Permanent, Contract, Part-time
    salary = Column(Float)
    bank_account = Column(String(50))
    ifsc_code = Column(String(20))
    pan_number = Column(String(20))
    aadhar_number = Column(String(20))
    
    # Emergency Contact
    emergency_contact_name = Column(String(100))
    emergency_contact_phone = Column(String(20))
    emergency_contact_relation = Column(String(50))
    
    # Status
    status = Column(String(20), default="active")  # active, on_leave, resigned, retired
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    school = relationship("School", back_populates="teachers")
    classes = relationship("Class", back_populates="class_teacher")
    attendance_records = relationship("TeacherAttendance", back_populates="teacher")


class Class(Base):
    """Class/Grade model"""
    __tablename__ = "classes"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=False)
    class_teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=True)
    
    class_name = Column(String(50), nullable=False)  # e.g., "10", "9", "8"
    section = Column(String(10))  # e.g., "A", "B", "C"
    academic_year = Column(String(20))
    room_number = Column(String(20))
    capacity = Column(Integer)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    school = relationship("School", back_populates="classes")
    class_teacher = relationship("Teacher", back_populates="classes")
    students = relationship("Student", back_populates="class_obj")
    subjects = relationship("Subject", back_populates="class_obj")
    timetable = relationship("Timetable", back_populates="class_obj")


class Subject(Base):
    """Subject model"""
    __tablename__ = "subjects"
    
    id = Column(Integer, primary_key=True, index=True)
    class_id = Column(Integer, ForeignKey("classes.id"), nullable=False)
    
    subject_name = Column(String(100), nullable=False)
    subject_code = Column(String(50))
    subject_type = Column(String(50))  # Core, Elective, Language, etc.
    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    periods_per_week = Column(Integer)
    max_marks = Column(Integer, default=100)
    min_pass_marks = Column(Integer, default=35)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    class_obj = relationship("Class", back_populates="subjects")
    marks = relationship("Mark", back_populates="subject")


class Attendance(Base):
    """Student attendance model"""
    __tablename__ = "attendance"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    class_id = Column(Integer, ForeignKey("classes.id"), nullable=False)
    
    date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False)  # present, absent, late, half_day, on_leave
    remarks = Column(Text)
    marked_by = Column(Integer, ForeignKey("users.id"))
    marked_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    student = relationship("Student", back_populates="attendance_records")


class TeacherAttendance(Base):
    """Teacher attendance model"""
    __tablename__ = "teacher_attendance"
    
    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=False)
    
    date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False)  # present, absent, on_leave, half_day
    check_in_time = Column(Time)
    check_out_time = Column(Time)
    remarks = Column(Text)
    marked_by = Column(Integer, ForeignKey("users.id"))
    marked_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    teacher = relationship("Teacher", back_populates="attendance_records")


class Exam(Base):
    """Exam model"""
    __tablename__ = "exams"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=False)
    
    exam_name = Column(String(100), nullable=False)
    exam_code = Column(String(50), unique=True)
    exam_type = Column(String(50))  # Formative, Summative, Term, etc.
    academic_year = Column(String(20))
    start_date = Column(Date)
    end_date = Column(Date)
    max_marks = Column(Integer, default=100)
    min_pass_marks = Column(Integer, default=35)
    weightage = Column(Float)  # Percentage weightage in final grade
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    marks = relationship("Mark", back_populates="exam")


class Mark(Base):
    """Marks/Grades model"""
    __tablename__ = "marks"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    
    marks_obtained = Column(Float)
    max_marks = Column(Float)
    grade = Column(String(5))  # A+, A, B+, etc.
    remarks = Column(Text)
    
    entered_by = Column(Integer, ForeignKey("users.id"))
    entered_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    student = relationship("Student", back_populates="marks")
    exam = relationship("Exam", back_populates="marks")
    subject = relationship("Subject", back_populates="marks")


class FeeStructure(Base):
    """Fee structure model"""
    __tablename__ = "fee_structures"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=False)
    class_id = Column(Integer, ForeignKey("classes.id"), nullable=False)
    
    academic_year = Column(String(20))
    fee_type = Column(String(50))  # Tuition, Transport, Hostel, etc.
    amount = Column(Float, nullable=False)
    due_date = Column(Date)
    term = Column(String(50))  # Term 1, Term 2, Annual, etc.
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())


class FeeRecord(Base):
    """Fee payment records"""
    __tablename__ = "fee_records"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    
    academic_year = Column(String(20))
    fee_type = Column(String(50))
    amount = Column(Float, nullable=False)
    paid_amount = Column(Float, default=0)
    balance_amount = Column(Float)
    due_date = Column(Date)
    payment_date = Column(Date)
    payment_mode = Column(String(50))  # Cash, Cheque, Online, Card
    transaction_id = Column(String(100))
    receipt_number = Column(String(50))
    status = Column(String(20))  # paid, partial, pending, overdue
    remarks = Column(Text)
    
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    student = relationship("Student", back_populates="fee_records")


class TransportRoute(Base):
    """Transport route model"""
    __tablename__ = "transport_routes"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=False)
    
    route_name = Column(String(100), nullable=False)
    route_number = Column(String(50))
    vehicle_number = Column(String(50))
    driver_name = Column(String(100))
    driver_phone = Column(String(20))
    conductor_name = Column(String(100))
    conductor_phone = Column(String(20))
    capacity = Column(Integer)
    fare = Column(Float)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class Timetable(Base):
    """Class timetable model"""
    __tablename__ = "timetable"
    
    id = Column(Integer, primary_key=True, index=True)
    class_id = Column(Integer, ForeignKey("classes.id"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=False)
    
    day_of_week = Column(String(20))  # Monday, Tuesday, etc.
    period_number = Column(Integer)
    start_time = Column(Time)
    end_time = Column(Time)
    room_number = Column(String(20))
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    class_obj = relationship("Class", back_populates="timetable")
