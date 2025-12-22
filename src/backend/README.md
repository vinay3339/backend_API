# School Management System - Backend API

A comprehensive RESTful API built with FastAPI and MySQL for managing school operations including students, teachers, classes, attendance, exams, marks, fees, and transport.

## ⚠️ IMPORTANT: Login Setup Required

**Before you can login and get bearer tokens, you MUST run the setup script:**

```bash
cd backend
python setup_demo_users.py
```

This creates all demo users with properly hashed passwords. See [LOGIN_AUTHENTICATION_FIXED.md](../LOGIN_AUTHENTICATION_FIXED.md) for details.

---

## 🚀 Features

- **Authentication & Authorization** - JWT-based authentication with role-based access control
- **Student Management** - Complete CRUD operations for student records
- **Teacher Management** - Manage teacher information and assignments
- **Class Management** - Configure classes, sections, and subjects
- **Attendance System** - Track student and teacher attendance
- **Exam & Marks** - Manage exams and record student marks/grades
- **Fee Management** - Handle fee structures, payments, and reports
- **Transport Management** - Manage transport routes and assignments
- **Comprehensive Reports** - Generate various reports and statistics

## 📋 Prerequisites

- Python 3.8+
- MySQL 8.0+
- pip (Python package manager)

## 🛠️ Installation

### 1. Clone the repository

```bash
cd backend
```

### 2. Create a virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure MySQL Database

Create a new MySQL database:

```sql
CREATE DATABASE school_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Create a database user (optional but recommended):

```sql
CREATE USER 'school_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON school_management.* TO 'school_user'@'localhost';
FLUSH PRIVILEGES;
```

### 5. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=school_user
DB_PASSWORD=your_secure_password
DB_NAME=school_management

SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Important:** Generate a secure SECRET_KEY:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 6. Initialize Database

The database tables will be created automatically when you start the application for the first time.

## 🏃 Running the Application

### Development Mode

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📚 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## 🔐 Authentication

### Login

```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@school.com&password=password123"
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "role": "school_admin",
  "school_id": 1
}
```

### Using the Token

Include the token in the Authorization header for subsequent requests:

```bash
curl -X GET "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📖 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/change-password` - Change password
- `GET /api/v1/auth/me` - Get current user info
- `POST /api/v1/auth/logout` - Logout

### Students
- `GET /api/v1/students/` - List all students (with pagination & filters)
- `GET /api/v1/students/{id}` - Get student details
- `POST /api/v1/students/` - Create new student
- `PUT /api/v1/students/{id}` - Update student
- `DELETE /api/v1/students/{id}` - Delete student
- `GET /api/v1/students/by-class/{class_id}` - Get students by class
- `GET /api/v1/students/statistics/summary` - Get student statistics

### Teachers
- `GET /api/v1/teachers/` - List all teachers
- `GET /api/v1/teachers/{id}` - Get teacher details
- `POST /api/v1/teachers/` - Create new teacher
- `PUT /api/v1/teachers/{id}` - Update teacher
- `DELETE /api/v1/teachers/{id}` - Delete teacher
- `GET /api/v1/teachers/statistics/summary` - Get teacher statistics

### Classes
- `GET /api/v1/classes/` - List all classes
- `GET /api/v1/classes/{id}` - Get class details
- `POST /api/v1/classes/` - Create new class
- `PUT /api/v1/classes/{id}` - Update class
- `DELETE /api/v1/classes/{id}` - Delete class

### Attendance
- `GET /api/v1/attendance/students/` - Get student attendance
- `POST /api/v1/attendance/students/` - Mark student attendance
- `POST /api/v1/attendance/students/bulk` - Bulk attendance marking
- `GET /api/v1/attendance/students/{student_id}/report` - Student attendance report
- `GET /api/v1/attendance/teachers/` - Get teacher attendance
- `POST /api/v1/attendance/teachers/` - Mark teacher attendance
- `GET /api/v1/attendance/teachers/{teacher_id}/report` - Teacher attendance report

### Exams
- `GET /api/v1/exams/` - List all exams
- `GET /api/v1/exams/{id}` - Get exam details
- `POST /api/v1/exams/` - Create new exam
- `PUT /api/v1/exams/{id}` - Update exam
- `DELETE /api/v1/exams/{id}` - Delete exam

### Marks
- `GET /api/v1/marks/` - Get marks (with filters)
- `GET /api/v1/marks/{id}` - Get specific mark
- `POST /api/v1/marks/` - Enter marks
- `POST /api/v1/marks/bulk` - Bulk marks entry
- `PUT /api/v1/marks/{id}` - Update marks
- `DELETE /api/v1/marks/{id}` - Delete marks
- `GET /api/v1/marks/student/{student_id}/report` - Student marks report
- `GET /api/v1/marks/exam/{exam_id}/report` - Exam marks report

### Fees
- `GET /api/v1/fees/structure/` - Get fee structures
- `POST /api/v1/fees/structure/` - Create fee structure
- `GET /api/v1/fees/` - Get fee records
- `GET /api/v1/fees/{id}` - Get fee record
- `POST /api/v1/fees/` - Create fee record
- `POST /api/v1/fees/payment` - Record fee payment
- `GET /api/v1/fees/student/{student_id}/summary` - Student fee summary
- `GET /api/v1/fees/reports/collection` - Fee collection report
- `GET /api/v1/fees/reports/defaulters` - Fee defaulters report

### Transport
- `GET /api/v1/transport/routes/` - List transport routes
- `GET /api/v1/transport/routes/{id}` - Get route details
- `POST /api/v1/transport/routes/` - Create new route
- `PUT /api/v1/transport/routes/{id}` - Update route
- `DELETE /api/v1/transport/routes/{id}` - Delete route
- `GET /api/v1/transport/routes/{id}/students` - Get route students
- `GET /api/v1/transport/statistics/summary` - Transport statistics

## 🔑 User Roles

The system supports the following user roles:

1. **Super Admin** - Full access to all features across all schools
2. **School Admin** - Full access to their school's data
3. **Teacher** - Limited access (attendance, marks entry, view students)
4. **Student** - View their own data only
5. **Parent** - View their child's data only

## 📊 Database Schema

The database includes the following main tables:

- `schools` - School information
- `users` - User authentication and roles
- `students` - Student records
- `teachers` - Teacher information
- `classes` - Class/Grade configuration
- `subjects` - Subject details
- `attendance` - Student attendance records
- `teacher_attendance` - Teacher attendance records
- `exams` - Exam configuration
- `marks` - Student marks/grades
- `fee_structures` - Fee structure definitions
- `fee_records` - Fee payment records
- `transport_routes` - Transport route information
- `timetable` - Class timetable

## 🧪 Testing the API

### Using cURL

```bash
# Get students list
curl -X GET "http://localhost:8000/api/v1/students/?page=1&page_size=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create a new student
curl -X POST "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "ADM001",
    "first_name": "John",
    "last_name": "Doe",
    "class_id": 1,
    "section": "A"
  }'
```

### Using Python requests

```python
import requests

# Login
response = requests.post(
    "http://localhost:8000/api/v1/auth/login",
    data={"username": "admin", "password": "password123"}
)
token = response.json()["access_token"]

# Get students
headers = {"Authorization": f"Bearer {token}"}
response = requests.get(
    "http://localhost:8000/api/v1/students/",
    headers=headers,
    params={"page": 1, "page_size": 10}
)
students = response.json()
```

## 🔒 Security Best Practices

1. **Change Default Credentials**: Always change default passwords in production
2. **Use HTTPS**: Deploy behind a reverse proxy with SSL/TLS
3. **Secure SECRET_KEY**: Generate a strong secret key
4. **Database Security**: Use strong database passwords and limit access
5. **CORS Configuration**: Update `ALLOWED_ORIGINS` in config.py for production
6. **Rate Limiting**: Consider adding rate limiting in production
7. **Input Validation**: All inputs are validated using Pydantic schemas

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test MySQL connection
mysql -u school_user -p -h localhost school_management
```

### Port Already in Use

```bash
# Find process using port 8000
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process or use a different port
uvicorn main:app --port 8001
```

### Module Import Errors

```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

## 📝 Sample Data

To populate the database with sample data, you can use the provided scripts or insert data manually:

```python
# Create a super admin user (run in Python shell)
from database import SessionLocal
from models import User, School
from auth import get_password_hash

db = SessionLocal()

# Create school
school = School(
    school_code="SCH001",
    school_name="Demo High School",
    city="Hyderabad",
    state="Telangana",
    email="demo@school.com",
    phone="1234567890"
)
db.add(school)
db.commit()

# Create admin user
user = User(
    school_id=school.id,
    username="admin",
    email="admin@school.com",
    hashed_password=get_password_hash("password123"),
    role="school_admin",
    is_active=True,
    is_first_login=False
)
db.add(user)
db.commit()

db.close()
```

## 🚀 Deployment

### Using Docker (Recommended)

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# Build and run
docker build -t school-api .
docker run -p 8000:8000 school-api
```

### Using systemd (Linux)

```ini
# /etc/systemd/system/school-api.service
[Unit]
Description=School Management API
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/school-api
Environment="PATH=/var/www/school-api/venv/bin"
ExecStart=/var/www/school-api/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

[Install]
WantedBy=multi-user.target
```

## 📧 Support

For issues and questions, please create an issue in the repository.

## 📄 License

This project is licensed under the MIT License.