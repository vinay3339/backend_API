"""
Denormalized Student Router with Advanced Filtering
All data in single table - use filters instead of JOINs
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, text
from typing import Optional, List
from datetime import date, datetime
from database import get_db
from models_denormalized import Student
from models_denormalized import User, UserRole, Class, School  # Import User, Class and School models
from schemas import StudentCreate, StudentUpdate, StudentResponse, PaginatedResponse, MessageResponse
from auth import get_current_active_user, get_password_hash # Import password hashing
import json
import re

router = APIRouter(prefix="/data/students", tags=["Students (Denormalized)"])


# ==================== HELPER FUNCTIONS ====================

def generate_username(first_name: str, last_name: str, db: Session) -> str:
    """
    Generate unique username from first and last name
    Format: firstname.lastname or firstname.lastname2 if exists
    """
    base_username = f"{first_name.lower()}.{last_name.lower()}" if last_name else first_name.lower()
    username = base_username
    counter = 1
    
    # Check if username exists, if yes, append number
    while db.query(User).filter(User.username == username).first():
        counter += 1
        username = f"{base_username}{counter}"
    
    return username


def generate_roll_no(db: Session, school_id: Optional[int] = None, school_name: Optional[str] = None) -> str:
    """
    Generate a per-school incremental roll_no.
    Format: <FIRST2LETTERS><NNN> e.g. ST001. Uses existing Student.roll_no values to find max suffix.
    """
    # Determine prefix from school_name (letters only)
    prefix = "SC"  # Default prefix
    if school_name:
        letters_only = "".join(filter(str.isalpha, school_name))
        if letters_only:
            prefix = letters_only[:2].upper()

    query = db.query(Student).filter(Student.roll_no != None)
    if school_id:
        query = query.filter(Student.school_id == school_id)
    query = query.filter(Student.roll_no.startswith(prefix))

    existing = [r[0] for r in query.with_entities(Student.roll_no).all()]
    max_num = 0
    for r in existing:
        m = re.search(r"(\d+)$", r)
        if m:
            try:
                n = int(m.group(1))
                if n > max_num:
                    max_num = n
            except ValueError:
                continue

    next_num = max_num + 1
    return f"{prefix}{next_num:03d}"


def generate_admission_no(db: Session, school_id: Optional[int] = None) -> str:
    """
    Generate admission number per school for the current year.
    Format: ADMIN<YYYY><NNNN> e.g. ADMIN20250001 (zero-padded 4 digits)
    """
    year = datetime.now().year
    prefix = f"{year}"

    query = db.query(Student).filter(Student.admission_no != None)
    if school_id:
        query = query.filter(Student.school_id == school_id)
    query = query.filter(Student.admission_no.startswith(prefix))

    existing = [r[0] for r in query.with_entities(Student.admission_no).all()]
    max_num = 0
    for r in existing:
        m = re.search(r"(\d+)$", r)
        if m:
            try:
                n = int(m.group(1))
                if n > max_num:
                    max_num = n
            except ValueError:
                continue

    next_num = max_num + 1
    return f"{prefix}{next_num:04d}"


def calculate_age(date_of_birth):
    """Calculate age in years only (ignoring months)"""
    if not date_of_birth:
        return None
    
    # Handle string dates
    if isinstance(date_of_birth, str):
        try:
            date_of_birth = datetime.strptime(date_of_birth, '%Y-%m-%d').date()
        except ValueError:
            return None
    
    today = datetime.today().date()
    age = today.year - date_of_birth.year
    
    # If birthday hasn't occurred this year, subtract 1
    if today.month < date_of_birth.month or (today.month == date_of_birth.month and today.day < date_of_birth.day):
        age -= 1
    
    return age


def create_user_for_student(student_data: dict, db: Session) -> User:
    """
    Automatically create user account for student
    Username: firstname.lastname
    Password: firstname@123
    Role: student
    """
    first_name = student_data.get('first_name', '')
    last_name = student_data.get('last_name', '')
    
    # Generate username
    username = generate_username(first_name, last_name, db)
    
    # Generate email if not provided
    email = student_data.get('email')
    if not email:
        email = f"{username}@student.school.com"
    
    # Default password: firstname@123
    default_password = f"{first_name.lower()}@123"
    hashed_password = get_password_hash(default_password)
    
    # Create user
    # Generate roll_no for the student and attach to both user and student_data
    roll_no = generate_roll_no(db, school_id=student_data.get('school_id'), school_name=student_data.get('school_name'))
    student_data['roll_no'] = roll_no
    

    user = User(
        username=username,
        email=email,
        hashed_password=hashed_password,
        role="student",
        school_id=student_data.get('school_id'),
        school_name=student_data.get('school_name'),
        is_first_login=True,
        is_active=True
    )
    
    db.add(user)
    db.flush()  # Flush to get user.id without committing
    
    return user




# ==================== ADVANCED FILTER HELPERS ====================

def apply_filters(query, filters: dict):
    """
    Apply dynamic filters to query
    Supports: exact match, range, contains, in, greater/less than
    """
    for field, value in filters.items():
        if value is None:
            continue
            
        # Handle special filter operators
        if field.endswith('__contains'):
            # Text search: field__contains='john'
            actual_field = field.replace('__contains', '')
            query = query.filter(getattr(Student, actual_field).contains(value))
            
        elif field.endswith('__in'):
            # List filter: status__in=['active', 'inactive']
            actual_field = field.replace('__in', '')
            query = query.filter(getattr(Student, actual_field).in_(value))
            
        elif field.endswith('__gte'):
            # Greater than or equal: age__gte=10
            actual_field = field.replace('__gte', '')
            query = query.filter(getattr(Student, actual_field) >= value)
            
        elif field.endswith('__lte'):
            # Less than or equal: age__lte=18
            actual_field = field.replace('__lte', '')
            query = query.filter(getattr(Student, actual_field) <= value)
            
        elif field.endswith('__gt'):
            # Greater than: fee_pending__gt=0
            actual_field = field.replace('__gt', '')
            query = query.filter(getattr(Student, actual_field) > value)
            
        elif field.endswith('__lt'):
            # Less than
            actual_field = field.replace('__lt', '')
            query = query.filter(getattr(Student, actual_field) < value)
            
        elif field.endswith('__startswith'):
            # Starts with: first_name__startswith='J'
            actual_field = field.replace('__startswith', '')
            query = query.filter(getattr(Student, actual_field).startswith(value))
            
        elif field.endswith('__isnull'):
            # Is null check: email__isnull=True
            actual_field = field.replace('__isnull', '')
            if value:
                query = query.filter(getattr(Student, actual_field).is_(None))
            else:
                query = query.filter(getattr(Student, actual_field).isnot(None))
                
        else:
            # Exact match
            if hasattr(Student, field):
                query = query.filter(getattr(Student, field) == value)
    
    return query


# ==================== GET STUDENTS WITH FILTERS ====================

@router.get("/")
@router.get("")
async def get_students(
    # Pagination
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    
    # Basic Filters
    school_id: Optional[int] = None,
    school_name: Optional[str] = None,
    class_id: Optional[int] = None,
    class_name: Optional[str] = None,
    section: Optional[str] = None,
    academic_year: Optional[str] = None,
    status: Optional[str] = None,
    gender: Optional[str] = None,
    
    # Search Filters
    search: Optional[str] = None,  # Search across name, admission_no, email, phone
    first_name: Optional[str] = None,
    last_name: Optional[str] = None,
    admission_no: Optional[str] = None,
    roll_no: Optional[str] = None,
    
    # Location Filters
    city: Optional[str] = None,
    state: Optional[str] = None,
    pincode: Optional[str] = None,
    
    # Transport Filters
    transport_required: Optional[bool] = None,
    route_id: Optional[int] = None,
    route_name: Optional[str] = None,
    
    # Fee Filters
    fee_status: Optional[str] = None,  # Paid, Pending, Overdue
    has_scholarship: Optional[bool] = None,
    fee_pending_min: Optional[float] = None,
    fee_pending_max: Optional[float] = None,
    
    # Academic Filters
    current_grade: Optional[str] = None,
    attendance_min: Optional[float] = None,
    attendance_max: Optional[float] = None,
    
    # Date Filters
    admission_date_from: Optional[date] = None,
    admission_date_to: Optional[date] = None,
    dob_from: Optional[date] = None,
    dob_to: Optional[date] = None,
    
    # Special Filters
    blood_group: Optional[str] = None,
    special_needs: Optional[bool] = None,
    
    # Sorting
    sort_by: Optional[str] = Query("id", description="Field to sort by"),
    sort_order: Optional[str] = Query("asc", regex="^(asc|desc)$"),
    
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get students with advanced filtering
    
    Examples:
    - All students in a school: ?school_id=1
    - Students in a specific class: ?class_id=5&section=A
    - Students with pending fees: ?fee_status=Pending
    - Students using transport: ?transport_required=true
    - Search by name: ?search=john
    - Students by location: ?city=Mumbai&state=Maharashtra
    - Fee range: ?fee_pending_min=1000&fee_pending_max=5000
    - Attendance range: ?attendance_min=75&attendance_max=100
    """
    query = db.query(Student)
    
    # Apply filters
    if school_id:
        query = query.filter(Student.school_id == school_id)
    if school_name:
        query = query.filter(Student.school_name.contains(school_name))
    if class_id:
        query = query.filter(Student.class_id == class_id)
    if class_name:
        query = query.filter(Student.class_name == class_name)
    if section:
        query = query.filter(Student.section == section)
    if academic_year:
        query = query.filter(Student.academic_year == academic_year)
    if status:
        query = query.filter(Student.status == status)
    if gender:
        query = query.filter(Student.gender == gender)
    
    # Search across multiple fields
    if search:
        search_filter = or_(
            Student.first_name.contains(search),
            Student.last_name.contains(search),
            Student.full_name.contains(search),
            Student.admission_no.contains(search),
            Student.email.contains(search),
            Student.phone.contains(search),
            Student.roll_no.contains(search)
        )
        query = query.filter(search_filter)
    
    # Specific field filters
    if first_name:
        query = query.filter(Student.first_name.contains(first_name))
    if last_name:
        query = query.filter(Student.last_name.contains(last_name))
    if admission_no:
        query = query.filter(Student.admission_no == admission_no)
    if roll_no:
        query = query.filter(Student.roll_no == roll_no)
    
    # Location filters
    if city:
        query = query.filter(Student.city == city)
    if state:
        query = query.filter(Student.state == state)
    if pincode:
        query = query.filter(Student.pincode == pincode)
    
    # Transport filters
    if transport_required is not None:
        query = query.filter(Student.transport_required == transport_required)
    if route_id:
        query = query.filter(Student.route_id == route_id)
    if route_name:
        query = query.filter(Student.route_name.contains(route_name))
    
    # Fee filters
    if fee_status:
        query = query.filter(Student.fee_status == fee_status)
    if has_scholarship is not None:
        query = query.filter(Student.has_scholarship == has_scholarship)
    if fee_pending_min is not None:
        query = query.filter(Student.fee_pending >= fee_pending_min)
    if fee_pending_max is not None:
        query = query.filter(Student.fee_pending <= fee_pending_max)
    
    # Academic filters
    if current_grade:
        query = query.filter(Student.current_grade == current_grade)
    if attendance_min is not None:
        query = query.filter(Student.total_attendance_percentage >= attendance_min)
    if attendance_max is not None:
        query = query.filter(Student.total_attendance_percentage <= attendance_max)
    
    # Date range filters
    if admission_date_from:
        query = query.filter(Student.admission_date >= admission_date_from)
    if admission_date_to:
        query = query.filter(Student.admission_date <= admission_date_to)
    if dob_from:
        query = query.filter(Student.date_of_birth >= dob_from)
    if dob_to:
        query = query.filter(Student.date_of_birth <= dob_to)
    
    # Special filters
    if blood_group:
        query = query.filter(Student.blood_group == blood_group)
    if special_needs is not None:
        query = query.filter(Student.special_needs == special_needs)
    
    # Count total before pagination
    total_count = query.count()
    
    # Sorting
    if hasattr(Student, sort_by):
        if sort_order == "desc":
            query = query.order_by(getattr(Student, sort_by).desc())
        else:
            query = query.order_by(getattr(Student, sort_by).asc())
    
    # Pagination
    students = query.offset(skip).limit(limit).all()
    
    return {
        "total": total_count,
        "page": skip // limit + 1,
        "page_size": limit,
        "total_pages": (total_count + limit - 1) // limit,
        "data": students
    }


# ==================== GET SINGLE STUDENT ====================

@router.get("/{student_id}")
async def get_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get single student by ID - returns ALL data from single table"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


# ==================== PROFILE ENDPOINTS - SPECIFIC CATEGORIES ====================

@router.get("/{student_id}/profile/personal")
async def get_student_personal_info(
    student_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get student personal information"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "first_name": student.first_name,
        "last_name": student.last_name,
        "gender": student.gender,
        "date_of_birth": student.date_of_birth,
        "blood_group": student.blood_group,
        "religion": student.religion,
        "caste": student.caste,
        "category": student.category,
        "aadhar_number": student.aadhar_number,
        "nationality": student.nationality
    }


@router.get("/{student_id}/profile/contact")
async def get_student_contact_info(
    student_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get student contact information"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "email": student.email,
        "phone": student.phone,
        "address": student.address,
        "city": student.city,
        "state": student.state,
        "pincode": student.pincode
    }


@router.get("/{student_id}/profile/parents")
async def get_student_parents_info(
    student_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get student parents/guardian information"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "father_details": {
            "name": student.father_name,
            "phone": student.father_phone,
            "occupation": student.father_occupation
        },
        "mother_details": {
            "name": student.mother_name,
            "phone": student.mother_phone,
            "occupation": student.mother_occupation
        }
    }


@router.get("/{student_id}/profile/academic")
async def get_student_academic_info(
    student_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get student academic information"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "admission_no": student.admission_no,
        "class_name": student.class_name,
        "section": student.section,
        "roll_no": student.roll_no,
        "academic_year": student.academic_year,
        "admission_date": student.admission_date,
        "previous_school_name": student.previous_school_name,
        "previous_class": student.previous_class,
        "house": student.house
    }


@router.get("/{student_id}/profile/transport")
async def get_student_transport_info(
    student_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get student transport information"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "transport_required": student.transport_required,
        "route_number": student.route_number if student.transport_required else None,
        "pickup_point": student.pickup_point if student.transport_required else None,
        "drop_point": student.drop_point if student.transport_required else None,
        "transport_fee": student.transport_fee if student.transport_required else None
    }


@router.get("/{student_id}/account")
async def get_student_account_info(
    student_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get student account and login information"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Get user account details
    user = db.query(User).filter(User.id == student.user_id).first()
    
    return {
        "portal_login": {
            "username": user.username if user else None,
            "default_password": f"{student.first_name.lower()}@123" if student.first_name else None,
            "last_login": user.last_login if user else None,
            "account_status": "active" if user and user.is_active else "inactive",
            "first_login_status": user.is_first_login if user else True
        },
        "parent_app_linking": {
            "parent_primary_mobile": student.father_phone,
            "parent_secondary_mobile": student.mother_phone,
            "linked_guardian_account": student.guardian_phone
        },
        "role_permissions": {
            "role": user.role if user else "student",
            "can_access_parent_app": False,  # Students typically don't access parent app
            "multi_child_linked_accounts": None  # Not applicable for student accounts
        }
    }


@router.get("/{student_id}/audit-log")
async def get_student_audit_log(
    student_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Get student audit log and recent activity"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "recent_activity": {
            "account_created": student.created_at,
            "profile_updated": student.updated_at,
            "created_by": student.created_by,
            "updated_by": student.updated_by,
            "last_fee_payment": student.last_payment_date,
            "last_payment_amount": student.last_payment_amount,
            "class_updates": {
                "current_class": student.class_name,
                "current_section": student.section,
                "academic_year": student.academic_year
            },
            "document_updates": {
                "birth_certificate": student.birth_certificate_url,
                "transfer_certificate": student.transfer_certificate_url,
                "marksheet": student.marksheet_url,
                "aadhar_document": student.aadhar_url
            },
            "marks_updated": {
                "current_percentage": student.current_percentage,
                "current_grade": student.current_grade,
                "current_rank": student.current_rank
            }
        },
        "account_status": {
            "is_active": student.is_active,
            "status": student.status,
            "remarks": student.remarks,
            "notes": student.notes
        }
    }



# ==================== CREATE STUDENT ====================

@router.post("/")
async def create_student(
    student_data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """
    Create student - accepts ALL fields in single request
    No need for foreign keys - store all related data directly
    
    STEP 1: Create user account first
    STEP 2: Get user_id from created user
    STEP 3: Create student with user_id
    """
    # Ensure the student (and created user) belong to the current user's school
    if current_user:
        # Force student to belong to current user's school
        student_data['school_id'] = getattr(current_user, 'school_id', None)
        student_data['school_name'] = getattr(current_user, 'school_name', None)
        
        # Get school_code from schools table using school_id
        if student_data['school_id']:
            school = db.query(School).filter(School.id == student_data['school_id']).first()
            if school:
                student_data['school_code'] = school.school_code
                student_data['school_name'] = school.name
                student_data['school_address'] = school.address
                student_data['school_city'] = school.city
                student_data['school_state'] = school.state
                student_data['school_email'] = school.email
                student_data['school_phone'] = school.phone

        print(f"Setting student school info: school_id={student_data.get('school_id')}, school_name={student_data.get('school_name')}, school_code={student_data.get('school_code')}")


    # Generate admission_no for the student if not provided
    if not student_data.get('admission_no'):
        student_data['admission_no'] = generate_admission_no(db, school_id=student_data.get('school_id'))

    # Force admission_date to today's date
    student_data['admission_date'] = date.today()
    # Set created_at to current datetime and created_by to current user username
    student_data['created_at'] = datetime.now()
    if current_user:
        student_data['created_by'] = getattr(current_user, 'username', None)
    
    # Calculate age if date_of_birth is provided
    if student_data.get('date_of_birth'):
        student_data['age'] = calculate_age(student_data.get('date_of_birth'))

    # STEP 1: Create user account FIRST
    user = create_user_for_student(student_data, db)
    
    # STEP 2: Add user_id to student_data
    student_data['user_id'] = user.id
    # STEP 3: Create student with user_id
    
    # Auto-compute fields
    if 'first_name' in student_data and 'last_name' in student_data:
        student_data['full_name'] = f"{student_data['first_name']} {student_data['last_name']}"
    
    # Get class details from classes table using class_id
    if student_data.get('class_id'):
        cls = db.query(Class).filter(Class.id == student_data['class_id']).first()
        if cls:
            student_data['class_name'] = cls.class_name
            student_data['academic_year'] = cls.academic_year
            student_data['room_number'] = cls.room_number
            student_data['class_teacher_id'] = cls.class_teacher_id
            student_data['class_teacher_name'] = cls.class_teacher_name
            student_data['class_teacher_phone'] = cls.class_teacher_phone
            student_data['class_teacher_email'] = cls.class_teacher_email
            
            # Create class_section if section is provided
            if student_data.get('section'):
                student_data['class_section'] = f"{cls.class_name}-{student_data['section']}"
    
    # STEP 3: Create student with user_id
    student = Student(**student_data)

    db.add(student)

    print(f"Created user and student for {student_data['first_name']} in school {student_data.get('school_name')} (ID: {student_data.get('school_id')})")
    db.commit()
    db.refresh(student)
    
    # Return student with user info
    return {
        **student.__dict__,
        "user_created": {
            "user_id": user.id,
            "username": user.username,
            "password": f"{student_data['first_name'].lower()}@123",  # Show default password
            "role": user.role
        }
    }

    

# ==================== UPDATE STUDENT ====================

@router.put("/{student_id}")
async def update_student(
    student_id: int,
    update_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Update student - accepts ANY field
    All data in single table, no foreign key constraints
    """
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Update all provided fields
    for field, value in update_data.items():
        if hasattr(student, field):
            setattr(student, field, value)
    
    # Auto-update computed fields
    if 'first_name' in update_data or 'last_name' in update_data:
        student.full_name = f"{student.first_name} {student.last_name}"
    
    if 'class_name' in update_data or 'section' in update_data:
        if student.class_name and student.section:
            student.class_section = f"{student.class_name}-{student.section}"
    
    student.updated_at = datetime.now()
    db.commit()
    db.refresh(student)
    return student


# ==================== DELETE STUDENT ====================

@router.delete("/{student_id}")
async def delete_student(
    student_id: int,
    hard_delete: bool = Query(False, description="True for permanent delete, False for soft delete"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Delete student (soft delete by default)"""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    if hard_delete:
        db.delete(student)
    else:
        student.is_active = False
        student.status = "inactive"
        student.updated_at = datetime.now()
        
        # Also update the users table
        if student.user_id:
            user = db.query(User).filter(User.id == student.user_id).first()
            if user:
                user.is_active = False
                user.updated_at = datetime.now()
    
    db.commit()
    return {"message": "Student deleted successfully", "hard_delete": hard_delete}


# ==================== SPECIALIZED FILTER ENDPOINTS ====================

@router.get("/filters/by-class")
async def get_students_by_class(
    class_id: int,
    section: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all students in a specific class"""
    query = db.query(Student).filter(Student.class_id == class_id)
    if section:
        query = query.filter(Student.section == section)
    return query.all()


@router.get("/filters/by-transport")
async def get_students_by_transport(
    route_id: Optional[int] = None,
    transport_required: bool = True,
    db: Session = Depends(get_db)
):
    """Get all students using transport"""
    query = db.query(Student).filter(Student.transport_required == transport_required)
    if route_id:
        query = query.filter(Student.route_id == route_id)
    return query.all()


@router.get("/filters/by-fee-status")
async def get_students_by_fee_status(
    fee_status: str = Query(..., description="Paid, Pending, Overdue, Partial"),
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get students by fee status"""
    query = db.query(Student).filter(Student.fee_status == fee_status)
    if school_id:
        query = query.filter(Student.school_id == school_id)
    return query.all()


@router.get("/filters/with-pending-fees")
async def get_students_with_pending_fees(
    min_amount: float = Query(0, ge=0),
    school_id: Optional[int] = None,
    class_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get students with pending fees above threshold"""
    query = db.query(Student).filter(Student.fee_pending > min_amount)
    if school_id:
        query = query.filter(Student.school_id == school_id)
    if class_id:
        query = query.filter(Student.class_id == class_id)
    return query.all()


@router.get("/filters/with-scholarship")
async def get_scholarship_students(
    school_id: Optional[int] = None,
    min_percentage: Optional[float] = None,
    db: Session = Depends(get_db)
):
    """Get students with scholarships"""
    query = db.query(Student).filter(Student.has_scholarship == True)
    if school_id:
        query = query.filter(Student.school_id == school_id)
    if min_percentage:
        query = query.filter(Student.scholarship_percentage >= min_percentage)
    return query.all()


@router.get("/filters/by-attendance")
async def get_students_by_attendance(
    min_percentage: float = Query(75, ge=0, le=100),
    max_percentage: float = Query(100, ge=0, le=100),
    class_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get students by attendance percentage range"""
    query = db.query(Student).filter(
        and_(
            Student.total_attendance_percentage >= min_percentage,
            Student.total_attendance_percentage <= max_percentage
        )
    )
    if class_id:
        query = query.filter(Student.class_id == class_id)
    return query.all()


@router.get("/filters/by-location")
async def get_students_by_location(
    city: Optional[str] = None,
    state: Optional[str] = None,
    pincode: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get students by location"""
    query = db.query(Student)
    if city:
        query = query.filter(Student.city == city)
    if state:
        query = query.filter(Student.state == state)
    if pincode:
        query = query.filter(Student.pincode == pincode)
    return query.all()


@router.get("/filters/special-needs")
async def get_special_needs_students(
    school_id: Optional[int] = None,
    class_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get students with special needs"""
    query = db.query(Student).filter(Student.special_needs == True)
    if school_id:
        query = query.filter(Student.school_id == school_id)
    if class_id:
        query = query.filter(Student.class_id == class_id)
    return query.all()


# ==================== AGGREGATION ENDPOINTS ====================

@router.get("/stats/summary")
async def get_student_stats(
    school_id: Optional[int] = None,
    class_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get student statistics"""
    query = db.query(Student)
    
    if school_id:
        query = query.filter(Student.school_id == school_id)
    if class_id:
        query = query.filter(Student.class_id == class_id)
    
    all_students = query.all()
    
    return {
        "total_students": len(all_students),
        "active_students": sum(1 for s in all_students if s.is_active),
        "male_students": sum(1 for s in all_students if s.gender == "Male"),
        "female_students": sum(1 for s in all_students if s.gender == "Female"),
        "transport_users": sum(1 for s in all_students if s.transport_required),
        "scholarship_students": sum(1 for s in all_students if s.has_scholarship),
        "special_needs_students": sum(1 for s in all_students if s.special_needs),
        "total_pending_fees": sum(s.fee_pending or 0 for s in all_students),
        "average_attendance": sum(s.total_attendance_percentage or 0 for s in all_students) / len(all_students) if all_students else 0
    }