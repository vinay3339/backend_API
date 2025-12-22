# 🚀 Complete API Documentation

## School Management System Backend API

**Base URL:** `http://localhost:8000`  
**API Prefix:** `/api/v1`

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Students API](#students-api)
3. [Teachers API](#teachers-api)
4. [Classes API](#classes-api)
5. [Attendance API](#attendance-api)
6. [Exams & Marks API](#exams--marks-api)
7. [Fees API](#fees-api)
8. [Transport API](#transport-api)
9. [Common Error Codes](#common-error-codes)

---

## 🔐 Authentication

### Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "username": "admin1",
  "password": "demo123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "role": "school_admin",
  "school_id": 1
}
```

**Use Token in Headers:**
```
Authorization: Bearer <access_token>
```

---

## 👨‍🎓 Students API

### 1. Get All Students (Paginated)

**Endpoint:** `GET /api/v1/students/`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `page_size` (optional): Items per page (default: 50, max: 100)
- `search` (optional): Search by name, admission no, roll no
- `class_id` (optional): Filter by class ID
- `section` (optional): Filter by section
- `status` (optional): Filter by status (active, inactive, graduated)
- `academic_year` (optional): Filter by academic year

**Example Request:**
```bash
curl -X GET "http://localhost:8000/api/v1/students/?page=1&page_size=10&status=active" \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "total": 100,
  "page": 1,
  "page_size": 10,
  "total_pages": 10,
  "data": [
    {
      "id": 1,
      "school_id": 1,
      "admission_no": "GHS2024001",
      "first_name": "Aarav",
      "last_name": "Sharma",
      "date_of_birth": "2012-04-15",
      "gender": "Male",
      "blood_group": "O+",
      "email": "aarav.sharma@student.greenwoodhigh.edu",
      "phone": "+91-9876543221",
      "address": "123 MG Road, Koramangala",
      "city": "Bangalore",
      "state": "Karnataka",
      "pincode": "560034",
      "class_id": 1,
      "section": "A",
      "roll_no": "1",
      "admission_date": "2024-04-01",
      "academic_year": "2024-2025",
      "father_name": "Vikram Sharma",
      "father_phone": "+91-9876000001",
      "father_email": "vikram.sharma@email.com",
      "mother_name": "Priya Sharma",
      "mother_phone": "+91-9876000002",
      "status": "active",
      "is_active": true,
      "created_at": "2024-12-01T10:30:00"
    }
  ]
}
```

### 2. Get Student by ID

**Endpoint:** `GET /api/v1/students/{student_id}`

**Example:**
```bash
curl -X GET "http://localhost:8000/api/v1/students/1" \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "id": 1,
  "school_id": 1,
  "admission_no": "GHS2024001",
  "first_name": "Aarav",
  "last_name": "Sharma",
  ...
}
```

### 3. Create New Student ✨

**Endpoint:** `POST /api/v1/students/`

**Request Body:**
```json
{
  "school_id": 1,
  "admission_no": "GHS2024999",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "2012-01-15",
  "gender": "Male",
  "blood_group": "A+",
  "email": "john.doe@student.greenwoodhigh.edu",
  "phone": "+91-9999999999",
  "address": "123 Test Street",
  "city": "Bangalore",
  "state": "Karnataka",
  "pincode": "560001",
  "class_id": 1,
  "section": "A",
  "roll_no": "25",
  "admission_date": "2024-12-12",
  "academic_year": "2024-2025",
  "father_name": "Father Name",
  "father_phone": "+91-9999000001",
  "father_email": "father@email.com",
  "mother_name": "Mother Name",
  "mother_phone": "+91-9999000002",
  "mother_email": "mother@email.com",
  "guardian_name": "Guardian Name",
  "guardian_phone": "+91-9999000003",
  "transport_required": false,
  "status": "active"
}
```

**Example cURL:**
```bash
curl -X POST "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "GHS2024999",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "2012-01-15",
    "gender": "Male",
    "status": "active"
  }'
```

**Response (201 Created):**
```json
{
  "id": 13,
  "school_id": 1,
  "admission_no": "GHS2024999",
  "first_name": "John",
  "last_name": "Doe",
  ...
  "created_at": "2024-12-12T15:30:00"
}
```

### 4. Update Student ✨

**Endpoint:** `PUT /api/v1/students/{student_id}`

**Request Body (Only send fields you want to update):**
```json
{
  "phone": "+91-8888888888",
  "email": "newemail@student.greenwoodhigh.edu",
  "address": "New Address, Bangalore",
  "class_id": 2,
  "section": "B",
  "status": "active"
}
```

**Example cURL:**
```bash
curl -X PUT "http://localhost:8000/api/v1/students/1" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+91-8888888888",
    "email": "newemail@student.greenwoodhigh.edu"
  }'
```

**Response:**
```json
{
  "id": 1,
  "school_id": 1,
  "admission_no": "GHS2024001",
  "first_name": "Aarav",
  "last_name": "Sharma",
  "phone": "+91-8888888888",
  "email": "newemail@student.greenwoodhigh.edu",
  ...
}
```

### 5. Delete Student (Soft Delete) ✨

**Endpoint:** `DELETE /api/v1/students/{student_id}`

**Example:**
```bash
curl -X DELETE "http://localhost:8000/api/v1/students/1" \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "message": "Student deleted successfully",
  "success": true
}
```

### 6. Get Students by Class

**Endpoint:** `GET /api/v1/students/by-class/{class_id}`

**Query Parameters:**
- `section` (optional): Filter by section

**Example:**
```bash
curl -X GET "http://localhost:8000/api/v1/students/by-class/1?section=A" \
  -H "Authorization: Bearer <token>"
```

### 7. Get Student Statistics

**Endpoint:** `GET /api/v1/students/statistics/summary`

**Response:**
```json
{
  "total_students": 100,
  "active_students": 95,
  "inactive_students": 5,
  "male_students": 60,
  "female_students": 40,
  "transport_users": 30
}
```

---

## 👨‍🏫 Teachers API

### 1. Get All Teachers

**Endpoint:** `GET /api/v1/teachers/`

**Query Parameters:**
- `page`, `page_size`, `search`, `department`, `status`

### 2. Get Teacher by ID

**Endpoint:** `GET /api/v1/teachers/{teacher_id}`

### 3. Create New Teacher ✨

**Endpoint:** `POST /api/v1/teachers/`

**Request Body:**
```json
{
  "school_id": 1,
  "employee_id": "GHS-T999",
  "first_name": "Jane",
  "last_name": "Smith",
  "date_of_birth": "1990-05-15",
  "gender": "Female",
  "email": "jane.smith@greenwoodhigh.edu",
  "phone": "+91-9876543299",
  "address": "456 Teacher Colony",
  "city": "Bangalore",
  "state": "Karnataka",
  "pincode": "560034",
  "designation": "Senior Teacher",
  "department": "Mathematics",
  "subjects": "Mathematics, Statistics",
  "qualifications": "M.Sc Mathematics, B.Ed",
  "experience_years": 8,
  "joining_date": "2016-07-01",
  "employment_type": "Permanent",
  "salary": 55000.00
}
```

**Example cURL:**
```bash
curl -X POST "http://localhost:8000/api/v1/teachers/" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "employee_id": "GHS-T999",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@greenwoodhigh.edu",
    "phone": "+91-9876543299"
  }'
```

**Response (201 Created):**
```json
{
  "id": 9,
  "school_id": 1,
  "employee_id": "GHS-T999",
  "first_name": "Jane",
  "last_name": "Smith",
  ...
  "status": "active",
  "created_at": "2024-12-12T15:30:00"
}
```

### 4. Update Teacher ✨

**Endpoint:** `PUT /api/v1/teachers/{teacher_id}`

**Request Body:**
```json
{
  "phone": "+91-8888888888",
  "email": "newemail@greenwoodhigh.edu",
  "designation": "Head of Department",
  "department": "Science"
}
```

**Example:**
```bash
curl -X PUT "http://localhost:8000/api/v1/teachers/1" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "designation": "Head of Department"
  }'
```

### 5. Delete Teacher ✨

**Endpoint:** `DELETE /api/v1/teachers/{teacher_id}`

```bash
curl -X DELETE "http://localhost:8000/api/v1/teachers/1" \
  -H "Authorization: Bearer <token>"
```

### 6. Get Teacher Statistics

**Endpoint:** `GET /api/v1/teachers/statistics/summary`

**Response:**
```json
{
  "total_teachers": 50,
  "active_teachers": 48,
  "on_leave": 2,
  "male_teachers": 25,
  "female_teachers": 25,
  "permanent_teachers": 40,
  "contract_teachers": 10
}
```

---

## 📚 Classes API

### 1. Get All Classes

**Endpoint:** `GET /api/v1/classes/`

### 2. Create New Class

**Endpoint:** `POST /api/v1/classes/`

**Request Body:**
```json
{
  "school_id": 1,
  "class_name": "Class 11",
  "section": "A",
  "academic_year": "2024-2025",
  "room_number": "601",
  "capacity": 40,
  "class_teacher_id": 1
}
```

### 3. Update Class

**Endpoint:** `PUT /api/v1/classes/{class_id}`

### 4. Delete Class

**Endpoint:** `DELETE /api/v1/classes/{class_id}`

---

## 📊 Attendance API

### 1. Mark Attendance

**Endpoint:** `POST /api/v1/attendance/mark`

**Request Body:**
```json
{
  "class_id": 1,
  "date": "2024-12-12",
  "attendance": [
    {
      "student_id": 1,
      "status": "present"
    },
    {
      "student_id": 2,
      "status": "absent"
    },
    {
      "student_id": 3,
      "status": "late"
    }
  ]
}
```

### 2. Get Attendance by Date

**Endpoint:** `GET /api/v1/attendance/by-date?date=2024-12-12&class_id=1`

### 3. Get Student Attendance Report

**Endpoint:** `GET /api/v1/attendance/student/{student_id}?from_date=2024-12-01&to_date=2024-12-31`

---

## 📝 Exams & Marks API

### 1. Create Exam

**Endpoint:** `POST /api/v1/exams/`

**Request Body:**
```json
{
  "school_id": 1,
  "exam_name": "Final Term 2024",
  "exam_type": "final",
  "academic_year": "2024-2025",
  "start_date": "2024-12-20",
  "end_date": "2024-12-30",
  "total_marks": 100
}
```

### 2. Enter Marks

**Endpoint:** `POST /api/v1/marks/`

**Request Body:**
```json
{
  "exam_id": 1,
  "student_id": 1,
  "subject": "Mathematics",
  "marks_obtained": 85,
  "total_marks": 100,
  "grade": "A"
}
```

### 3. Get Student Marks

**Endpoint:** `GET /api/v1/marks/student/{student_id}?exam_id=1`

---

## 💰 Fees API

### 1. Create Fee Structure

**Endpoint:** `POST /api/v1/fees/structure`

**Request Body:**
```json
{
  "school_id": 1,
  "class_id": 1,
  "fee_type": "Tuition Fee",
  "amount": 25000,
  "academic_year": "2024-2025",
  "due_date": "2024-07-15"
}
```

### 2. Record Payment

**Endpoint:** `POST /api/v1/fees/payment`

**Request Body:**
```json
{
  "student_id": 1,
  "fee_structure_id": 1,
  "amount_paid": 25000,
  "payment_date": "2024-07-10",
  "payment_method": "online",
  "transaction_id": "TXN123456789"
}
```

### 3. Get Student Fee Report

**Endpoint:** `GET /api/v1/fees/student/{student_id}`

---

## 🚌 Transport API

### 1. Get All Routes

**Endpoint:** `GET /api/v1/transport/routes`

### 2. Create Route

**Endpoint:** `POST /api/v1/transport/routes`

**Request Body:**
```json
{
  "school_id": 1,
  "route_name": "Koramangala - HSR Route",
  "route_number": "RT-004",
  "driver_name": "Kumar Singh",
  "driver_phone": "+91-9999000007",
  "bus_number": "KA-01-AB-9999",
  "capacity": 40,
  "fare": 8000
}
```

### 3. Assign Student to Route

**Endpoint:** `POST /api/v1/transport/assign`

**Request Body:**
```json
{
  "student_id": 1,
  "route_id": 1,
  "pickup_point": "Forum Mall",
  "pickup_time": "07:30:00",
  "drop_point": "Forum Mall",
  "drop_time": "15:45:00"
}
```

---

## ❌ Common Error Codes

### 400 Bad Request
```json
{
  "detail": "Admission number already exists"
}
```

### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

### 403 Forbidden
```json
{
  "detail": "Access denied"
}
```

### 404 Not Found
```json
{
  "detail": "Student not found"
}
```

### 405 Method Not Allowed ⚠️
```json
{
  "detail": "Method Not Allowed"
}
```

**Common Causes:**
- Using GET instead of POST
- Using POST instead of PUT
- Using wrong endpoint URL
- Missing trailing slash in URL

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "first_name"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "detail": "Database connection error"
}
```

---

## 🧪 Testing APIs

### Using cURL

```bash
# 1. Login first
TOKEN=$(curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","password":"demo123"}' \
  | jq -r '.access_token')

# 2. Create student
curl -X POST "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "GHS2024999",
    "first_name": "Test",
    "last_name": "Student",
    "date_of_birth": "2012-01-01",
    "gender": "Male",
    "status": "active"
  }'

# 3. Update student
curl -X PUT "http://localhost:8000/api/v1/students/13" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"phone": "+91-9999999999"}'

# 4. Get all students
curl -X GET "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer $TOKEN"

# 5. Delete student
curl -X DELETE "http://localhost:8000/api/v1/students/13" \
  -H "Authorization: Bearer $TOKEN"
```

### Using Postman

1. **Login:**
   - Method: POST
   - URL: `http://localhost:8000/api/v1/auth/login`
   - Body: Raw JSON
     ```json
     {
       "username": "admin1",
       "password": "demo123"
     }
     ```
   - Copy the `access_token`

2. **Set Authorization Header:**
   - Authorization tab → Type: Bearer Token
   - Paste token

3. **Create Student:**
   - Method: POST
   - URL: `http://localhost:8000/api/v1/students/`
   - Headers: `Content-Type: application/json`
   - Body: Student JSON

---

## 🔍 API Documentation (Interactive)

Visit these URLs when backend is running:

- **Swagger UI:** http://localhost:8000/api/docs
- **ReDoc:** http://localhost:8000/api/redoc

---

## ✅ Quick Checklist

Before making API calls:

- [ ] Backend server is running (`python -m uvicorn main:app --reload`)
- [ ] Database is connected (check `/health` endpoint)
- [ ] You have a valid access token
- [ ] Token is in Authorization header
- [ ] Content-Type is application/json for POST/PUT
- [ ] Using correct HTTP method (GET/POST/PUT/DELETE)
- [ ] Endpoint URL is correct with `/api/v1` prefix

---

**All APIs save data directly to MySQL database! Check using:**

```bash
mysql -u vinaygoud -p EduPortal -e "SELECT * FROM students ORDER BY id DESC LIMIT 5;"
```
