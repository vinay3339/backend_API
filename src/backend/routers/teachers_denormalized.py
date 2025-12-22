"""
Denormalized Teacher Router with Advanced Filtering
All data in single table - use filters instead of JOINs
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import Optional, List
from datetime import date, datetime
from database import get_db
from models_denormalized import Teacher, User, School
from auth import get_current_active_user, get_password_hash

router = APIRouter(prefix="/data/teachers", tags=["Teachers (Denormalized)"])


# ==================== HELPER FUNCTIONS ====================

def generate_username_teacher(first_name: str, last_name: str, db: Session) -> str:
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


def generate_employee_id(db: Session, school_id: int = None) -> str:
    """
    Generate employee_id in format: TEACH + count of teachers + 1
    Example: TEACH1, TEACH, TEACH, etc.
    """
    query = db.query(Teacher)
    if school_id:
        query = query.filter(Teacher.school_id == school_id)
    
    teacher_count = query.count()
    return f"TEACH{00+teacher_count + 1}"


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



def create_user_for_teacher(teacher_data: dict, db: Session) -> User:
    """
    Automatically create user account for teacher
    Username: firstname.lastname
    Password: firstname@123
    Role: teacher
    """
    first_name = teacher_data.get('first_name', '')
    last_name = teacher_data.get('last_name', '')
    
    # Generate username
    username = generate_username_teacher(first_name, last_name, db)
    
    # Generate email if not provided
    email = teacher_data.get('email')
    if not email:
        email = f"{username}@teacher.school.com"
    
    # Default password: firstname@123
    default_password = f"{first_name.lower()}@123"
    hashed_password = get_password_hash(default_password)
    
    # Create user
    user = User(
        username=username,
        email=email,
        hashed_password=hashed_password,
        role="teacher",
        school_id=teacher_data.get('school_id'),
        school_name=teacher_data.get('school_name'),
        is_first_login=True,
        is_active=True
    )
    
    db.add(user)
    db.flush()  # Flush to get user.id without committing
    
    return user


@router.get("/")
@router.get("")
async def get_teachers(
    # Pagination
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    
    # Basic Filters
    school_id: Optional[int] = None,
    school_name: Optional[str] = None,
    designation: Optional[str] = None,
    department: Optional[str] = None,
    employment_type: Optional[str] = None,
    status: Optional[str] = None,
    gender: Optional[str] = None,
    
    # Search Filters
    search: Optional[str] = None,
    first_name: Optional[str] = None,
    last_name: Optional[str] = None,
    employee_id: Optional[str] = None,
    email: Optional[str] = None,
    
    # Location Filters
    city: Optional[str] = None,
    state: Optional[str] = None,
    
    # Professional Filters
    experience_years_min: Optional[int] = None,
    experience_years_max: Optional[int] = None,
    is_class_teacher: Optional[bool] = None,
    class_teacher_of: Optional[str] = None,
    
    # Salary Filters
    salary_min: Optional[float] = None,
    salary_max: Optional[float] = None,
    
    # Date Filters
    joining_date_from: Optional[date] = None,
    joining_date_to: Optional[date] = None,
    
    # Attendance Filters
    attendance_min: Optional[float] = None,
    
    # Sorting
    sort_by: Optional[str] = Query("id", description="Field to sort by"),
    sort_order: Optional[str] = Query("asc", regex="^(asc|desc)$"),
    
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get teachers with advanced filtering
    
    Examples:
    - All teachers in school: ?school_id=1
    - Teachers by designation: ?designation=Principal
    - Teachers by department: ?department=Science
    - Search: ?search=john
    - Salary range: ?salary_min=30000&salary_max=80000
    - Class teachers only: ?is_class_teacher=true
    """
    query = db.query(Teacher)
    
    # Apply filters
    if school_id:
        query = query.filter(Teacher.school_id == school_id)
    if school_name:
        query = query.filter(Teacher.school_name.contains(school_name))
    if designation:
        query = query.filter(Teacher.designation == designation)
    if department:
        query = query.filter(Teacher.department == department)
    if employment_type:
        query = query.filter(Teacher.employment_type == employment_type)
    if status:
        query = query.filter(Teacher.status == status)
    if gender:
        query = query.filter(Teacher.gender == gender)
    
    # Search
    if search:
        search_filter = or_(
            Teacher.first_name.contains(search),
            Teacher.last_name.contains(search),
            Teacher.full_name.contains(search),
            Teacher.employee_id.contains(search),
            Teacher.email.contains(search),
            Teacher.phone.contains(search)
        )
        query = query.filter(search_filter)
    
    # Specific filters
    if first_name:
        query = query.filter(Teacher.first_name.contains(first_name))
    if last_name:
        query = query.filter(Teacher.last_name.contains(last_name))
    if employee_id:
        query = query.filter(Teacher.employee_id == employee_id)
    if email:
        query = query.filter(Teacher.email == email)
    
    # Location
    if city:
        query = query.filter(Teacher.city == city)
    if state:
        query = query.filter(Teacher.state == state)
    
    # Professional
    if experience_years_min is not None:
        query = query.filter(Teacher.experience_years >= experience_years_min)
    if experience_years_max is not None:
        query = query.filter(Teacher.experience_years <= experience_years_max)
    if is_class_teacher is not None:
        query = query.filter(Teacher.is_class_teacher == is_class_teacher)
    if class_teacher_of:
        query = query.filter(Teacher.class_teacher_of == class_teacher_of)
    
    # Salary
    if salary_min is not None:
        query = query.filter(Teacher.net_salary >= salary_min)
    if salary_max is not None:
        query = query.filter(Teacher.net_salary <= salary_max)
    
    # Date range
    if joining_date_from:
        query = query.filter(Teacher.joining_date >= joining_date_from)
    if joining_date_to:
        query = query.filter(Teacher.joining_date <= joining_date_to)
    
    # Attendance
    if attendance_min is not None:
        query = query.filter(Teacher.attendance_percentage >= attendance_min)
    
    total_count = query.count()
    
    # Sorting
    if hasattr(Teacher, sort_by):
        if sort_order == "desc":
            query = query.order_by(getattr(Teacher, sort_by).desc())
        else:
            query = query.order_by(getattr(Teacher, sort_by).asc())
    
    teachers = query.offset(skip).limit(limit).all()
    
    return {
        "total": total_count,
        "page": skip // limit + 1,
        "page_size": limit,
        "total_pages": (total_count + limit - 1) // limit,
        "data": teachers
    }


@router.get("/{teacher_id}")
async def get_teacher(
    teacher_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Get single teacher"""
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher


@router.post("/")
async def create_teacher(
    teacher_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Create teacher with all data in single request
    
    STEP 1: Create user account first
    STEP 2: Get user_id from created user
    STEP 3: Create teacher with user_id
    """
    # Get school information from current user's school_id
    if current_user:
        teacher_data['school_id'] = getattr(current_user, 'school_id', None)
        teacher_data['school_name'] = getattr(current_user, 'school_name', None)
        
        # Get additional school details from schools table
        if teacher_data['school_id']:
            school = db.query(School).filter(School.id == teacher_data['school_id']).first()
            if school:
                teacher_data['school_code'] = school.school_code
                teacher_data['school_name'] = school.school_name
                teacher_data['school_address'] = school.address
                teacher_data['school_city'] = school.city
                teacher_data['school_phone'] = school.phone
    
    # Generate employee_id if not provided
    if not teacher_data.get('employee_id'):
        teacher_data['employee_id'] = generate_employee_id(db, school_id=teacher_data.get('school_id'))

    teacher_data['joining_date'] = date.today()
    
    if teacher_data.get('date_of_birth'):
        teacher_data['age'] = calculate_age(teacher_data.get('date_of_birth'))
    
    # STEP 1: Create user account FIRST
    user = create_user_for_teacher(teacher_data, db)
    
    # Auto-compute fields
    if 'first_name' in teacher_data and 'last_name' in teacher_data:
        teacher_data['full_name'] = f"{teacher_data['first_name']} {teacher_data['last_name']}"
    
    # STEP 2: Create teacher
    teacher = Teacher(**teacher_data)
    db.add(teacher)
    
    db.commit()
    db.refresh(teacher)
    
    # Return teacher with user info
    return {
        **teacher.__dict__,
        "user_created": {
            "user_id": user.id,
            "username": user.username,
            "password": f"{teacher_data['first_name'].lower()}@123",  # Show default password
            "role": user.role
        }
    }


@router.put("/{teacher_id}")
async def update_teacher(
    teacher_id: int,
    update_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Update teacher - any field"""
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    for field, value in update_data.items():
        if hasattr(teacher, field):
            setattr(teacher, field, value)
    
    if 'first_name' in update_data or 'last_name' in update_data:
        teacher.full_name = f"{teacher.first_name} {teacher.last_name}"
    
    teacher.updated_at = datetime.now()
    db.commit()
    db.refresh(teacher)
    return teacher


@router.delete("/{teacher_id}")
async def delete_teacher(
    teacher_id: int,
    hard_delete: bool = Query(False),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Delete teacher"""
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    if hard_delete:
        db.delete(teacher)
    else:
        teacher.is_active = False
        teacher.status = "inactive"
        teacher.updated_at = datetime.now()
        
        # Also update the users table - find user by email
        if teacher.email:
            user = db.query(User).filter(User.email == teacher.email).first()
            if user:
                user.is_active = False
                user.updated_at = datetime.now()
    
    db.commit()
    return {"message": "Teacher deleted successfully"}


# Specialized filters
@router.get("/filters/by-department")
async def get_teachers_by_department(
    department: str,
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get teachers by department"""
    query = db.query(Teacher).filter(Teacher.department == department)
    if school_id:
        query = query.filter(Teacher.school_id == school_id)
    return query.all()


@router.get("/filters/class-teachers")
async def get_class_teachers(
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get all class teachers"""
    query = db.query(Teacher).filter(Teacher.is_class_teacher == True)
    if school_id:
        query = query.filter(Teacher.school_id == school_id)
    return query.all()


@router.get("/stats/summary")
async def get_teacher_stats(
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get teacher statistics"""
    query = db.query(Teacher)
    if school_id:
        query = query.filter(Teacher.school_id == school_id)
    
    all_teachers = query.all()
    
    return {
        "total_teachers": len(all_teachers),
        "active_teachers": sum(1 for t in all_teachers if t.is_active),
        "class_teachers": sum(1 for t in all_teachers if t.is_class_teacher),
        "permanent_teachers": sum(1 for t in all_teachers if t.employment_type == "Permanent"),
        "contract_teachers": sum(1 for t in all_teachers if t.employment_type == "Contract"),
        "average_experience": sum(t.experience_years or 0 for t in all_teachers) / len(all_teachers) if all_teachers else 0,
        "average_salary": sum(t.net_salary or 0 for t in all_teachers) / len(all_teachers) if all_teachers else 0
    }