# Integration Guide - Denormalized Architecture

## 🚀 How to Integrate All Denormalized Tables

### Step 1: Update Database Configuration

```python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Your existing MySQL database
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://eduportal_user:your_password@localhost/eduportal"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Step 2: Import All Denormalized Models

```python
# main.py or app.py
from fastapi import FastAPI
from database import engine, Base

# Import ALL denormalized models
from models_denormalized import (
    Student, Teacher, Class, Exam, TransportRoute, User, School
)
from models_denormalized_extended import (
    Subject, Attendance, Mark, FeeStructure, FeePayment, Timetable
)

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="School Management System - Denormalized")
```

### Step 3: Include All Routers

```python
# main.py
from routers.students_denormalized import router as students_router
from routers.teachers_denormalized import router as teachers_router
from routers.classes_denormalized import router as classes_router
from routers.exams_denormalized import router as exams_router
from routers.transport_denormalized import router as transport_router
from routers.all_denormalized_routers import (
    subjects_router,
    attendance_router,
    marks_router,
    fee_payments_router
)

# Include all routers
app.include_router(students_router)
app.include_router(teachers_router)
app.include_router(classes_router)
app.include_router(exams_router)
app.include_router(transport_router)
app.include_router(subjects_router)
app.include_router(attendance_router)
app.include_router(marks_router)
app.include_router(fee_payments_router)
```

### Step 4: Create Database Tables

Run the application once to create all tables:

```bash
cd /backend
python -c "
from database import engine, Base
from models_denormalized import Student, Teacher, Class, Exam, TransportRoute, User, School
from models_denormalized_extended import Subject, Attendance, Mark, FeeStructure, FeePayment, Timetable

# Create all tables
Base.metadata.create_all(bind=engine)
print('All denormalized tables created successfully!')
"
```

Or create tables manually:

```sql
-- Students table (denormalized)
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admission_no VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    
    -- School info (denormalized)
    school_id INT,
    school_name VARCHAR(200),
    school_address TEXT,
    
    -- Class info (denormalized)
    class_id INT,
    class_name VARCHAR(100),
    section VARCHAR(10),
    class_teacher_name VARCHAR(200),
    
    -- Transport info (denormalized)
    transport_required BOOLEAN DEFAULT FALSE,
    route_id INT,
    route_name VARCHAR(100),
    vehicle_number VARCHAR(50),
    
    -- Fee info (denormalized)
    total_annual_fee FLOAT,
    fee_paid FLOAT,
    fee_pending FLOAT,
    fee_status VARCHAR(50),
    
    -- ... 70+ more fields
    
    custom_fields JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_school_id (school_id),
    INDEX idx_class_id (class_id),
    INDEX idx_route_id (route_id),
    INDEX idx_fee_status (fee_status)
);

-- Repeat similar structure for all other tables...
```

### Step 5: Test the API

```bash
# Start the server
uvicorn main:app --reload

# Test endpoints
curl http://localhost:8000/api/students/
curl http://localhost:8000/api/teachers/
curl http://localhost:8000/api/classes/
# ... etc
```

---

## 📊 Complete Table Structure Reference

### Tables to Create

1. **students** (80+ columns)
2. **teachers** (40+ columns)
3. **classes** (20+ columns)
4. **exams** (20+ columns)
5. **transport_routes** (25+ columns)
6. **subjects** (25+ columns)
7. **attendance** (25+ columns)
8. **marks** (30+ columns)
9. **fee_structures** (20+ columns)
10. **fee_payments** (30+ columns)

### Index Strategy

For EVERY table, create indexes on:
- Primary key (id)
- school_id
- Foreign-like IDs (class_id, teacher_id, etc.) - even though not actual FKs
- Status fields
- Date fields
- Frequently filtered fields

```sql
-- Example indexes for students table
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_students_route_id ON students(route_id);
CREATE INDEX idx_students_fee_status ON students(fee_status);
CREATE INDEX idx_students_admission_no ON students(admission_no);
CREATE INDEX idx_students_name ON students(first_name, last_name);
CREATE INDEX idx_students_city ON students(city);
CREATE INDEX idx_students_status ON students(status);
```

---

## 🔄 Data Migration (If needed)

If you have existing normalized tables, migrate data:

```python
# migration_script.py
from old_models import Student as OldStudent  # Your old normalized model
from models_denormalized import Student as NewStudent

def migrate_students():
    old_students = db.query(OldStudent).all()
    
    for old_student in old_students:
        new_student = NewStudent(
            # Personal fields (direct copy)
            admission_no=old_student.admission_no,
            first_name=old_student.first_name,
            # ...
            
            # Denormalize school data
            school_id=old_student.school.id,
            school_name=old_student.school.school_name,
            school_address=old_student.school.address,
            
            # Denormalize class data
            class_id=old_student.class_obj.id if old_student.class_obj else None,
            class_name=old_student.class_obj.class_name if old_student.class_obj else None,
            class_teacher_name=old_student.class_obj.teacher.full_name if old_student.class_obj and old_student.class_obj.teacher else None,
            
            # Denormalize transport data
            route_id=old_student.route.id if old_student.route else None,
            route_name=old_student.route.route_name if old_student.route else None,
            vehicle_number=old_student.route.vehicle_number if old_student.route else None,
            
            # ... all other fields
        )
        
        db.add(new_student)
    
    db.commit()
    print(f"Migrated {len(old_students)} students")

# Run migration for all entities
migrate_students()
migrate_teachers()
migrate_classes()
# ... etc
```

---

## 🎯 API Usage Examples

### Create Student

```python
import requests

response = requests.post('http://localhost:8000/api/students/', json={
    # Personal
    "admission_no": "2024001",
    "first_name": "John",
    "last_name": "Doe",
    
    # School (denormalized - no FK!)
    "school_id": 1,
    "school_name": "ABC School",
    "school_address": "123 School St",
    
    # Class (denormalized - no FK!)
    "class_id": 5,
    "class_name": "Grade 5",
    "section": "A",
    "class_teacher_name": "Mrs. Smith",
    
    # Transport (denormalized - no FK!)
    "transport_required": True,
    "route_id": 3,
    "route_name": "Route A",
    "vehicle_number": "MH01AB1234",
    
    # Fees
    "total_annual_fee": 50000,
    "fee_paid": 20000,
    "fee_pending": 30000,
    "fee_status": "Partial",
    
    # Custom fields
    "custom_fields": {
        "hobby": "Cricket",
        "special_talent": "Singing"
    }
})

print(response.json())
```

### Filter Students

```python
# Get students in class 5-A with pending fees
response = requests.get('http://localhost:8000/api/students/', params={
    'class_id': 5,
    'section': 'A',
    'fee_status': 'Pending'
})

students = response.json()['data']
```

### Update Student

```python
# Update any field - no FK constraints!
response = requests.put('http://localhost:8000/api/students/1', json={
    "class_id": 6,
    "class_name": "Grade 6",
    "section": "B",
    "class_teacher_name": "Mr. Johnson",
    "route_name": "Route B",
    "fee_pending": 25000
})
```

---

## ⚙️ Configuration

### Enable CORS (for frontend)

```python
# main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Add Logging

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/api/students/")
async def get_students(...):
    logger.info(f"Fetching students with filters: {filters}")
    # ... rest of code
```

---

## 🧪 Testing

### Test Script

```bash
#!/bin/bash

API_URL="http://localhost:8000"

# Test all endpoints
echo "Testing Students..."
curl "$API_URL/api/students/?school_id=1" | jq

echo "Testing Teachers..."
curl "$API_URL/api/teachers/?school_id=1" | jq

echo "Testing Classes..."
curl "$API_URL/api/classes/?school_id=1" | jq

echo "Testing Exams..."
curl "$API_URL/api/exams/?school_id=1" | jq

echo "Testing Transport..."
curl "$API_URL/api/transport/routes/?school_id=1" | jq

echo "Testing Subjects..."
curl "$API_URL/api/subjects/?class_id=5" | jq

echo "Testing Attendance..."
curl "$API_URL/api/attendance/?student_id=1" | jq

echo "Testing Marks..."
curl "$API_URL/api/marks/?exam_id=5" | jq

echo "Testing Fee Payments..."
curl "$API_URL/api/fee-payments/?student_id=1" | jq

echo "All tests complete!"
```

---

## 📝 Summary Checklist

- [x] Database configured
- [x] All models imported
- [x] All routers included
- [x] Tables created
- [x] Indexes created
- [x] Data migrated (if needed)
- [x] CORS enabled
- [x] API tested
- [x] Documentation reviewed

**Your denormalized architecture is ready to use!** 🎉
