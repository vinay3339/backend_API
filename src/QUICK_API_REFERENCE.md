# ⚡ Quick API Reference Card

## 🔥 Most Common Operations

### 1️⃣ Start Backend

```bash
cd backend
python -m uvicorn main:app --reload
```

**Server runs on:** http://localhost:8000

---

### 2️⃣ Login

```javascript
const response = await fetch('http://localhost:8000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin1',
    password: 'demo123'
  })
});

const { access_token } = await response.json();
localStorage.setItem('token', access_token);
```

---

### 3️⃣ CREATE Student ✨

```javascript
const response = await fetch('http://localhost:8000/api/v1/students/', {
  method: 'POST',  // ← POST for CREATE
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    school_id: 1,
    admission_no: 'GHS2024999',
    first_name: 'John',
    last_name: 'Doe',
    date_of_birth: '2012-01-15',
    gender: 'Male',
    status: 'active'
  })
});

const newStudent = await response.json();
console.log('Created:', newStudent.id);  // ID: 13
```

---

### 4️⃣ UPDATE Student ✨

```javascript
const response = await fetch(`http://localhost:8000/api/v1/students/${studentId}`, {
  method: 'PUT',  // ← PUT for UPDATE
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone: '+91-9999999999',
    email: 'newemail@test.com'
  })
});

const updated = await response.json();
console.log('Updated:', updated);
```

---

### 5️⃣ GET Students

```javascript
const response = await fetch('http://localhost:8000/api/v1/students/', {
  method: 'GET',  // ← GET for READ
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const { data, total } = await response.json();
console.log(`Found ${total} students`);
```

---

### 6️⃣ DELETE Student

```javascript
const response = await fetch(`http://localhost:8000/api/v1/students/${studentId}`, {
  method: 'DELETE',  // ← DELETE for REMOVE
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const { message } = await response.json();
console.log(message);  // "Student deleted successfully"
```

---

## 🎯 HTTP Methods Quick Guide

| Operation | HTTP Method | Endpoint | Example |
|-----------|------------|----------|---------|
| **Create** | `POST` | `/api/v1/students/` | Add new student |
| **Read All** | `GET` | `/api/v1/students/` | Get list |
| **Read One** | `GET` | `/api/v1/students/1` | Get by ID |
| **Update** | `PUT` | `/api/v1/students/1` | Update student |
| **Delete** | `DELETE` | `/api/v1/students/1` | Remove student |

---

## ❌ Common Error

**"Method Not Allowed"**

```javascript
// ❌ WRONG
fetch('/api/v1/students/1', { method: 'POST' })  // Wrong for update!

// ✅ CORRECT
fetch('/api/v1/students/1', { method: 'PUT' })   // Correct for update!
```

---

## 🧪 Quick Test

```bash
# Test everything
cd backend
python test_api.py
```

---

## 📋 All Endpoints

### Students
- `GET /api/v1/students/` - List
- `POST /api/v1/students/` - Create
- `GET /api/v1/students/{id}` - Get one
- `PUT /api/v1/students/{id}` - Update
- `DELETE /api/v1/students/{id}` - Delete

### Teachers
- `GET /api/v1/teachers/` - List
- `POST /api/v1/teachers/` - Create
- `GET /api/v1/teachers/{id}` - Get one
- `PUT /api/v1/teachers/{id}` - Update
- `DELETE /api/v1/teachers/{id}` - Delete

### Classes
- `GET /api/v1/classes/` - List
- `POST /api/v1/classes/` - Create
- `PUT /api/v1/classes/{id}` - Update
- `DELETE /api/v1/classes/{id}` - Delete

---

## 🔑 Login Credentials

```
Super Admin:  superadmin / demo123
School Admin: admin1 / demo123
Teacher:      teacher1 / demo123
Student:      student1 / demo123
```

---

## ✅ Checklist

- [ ] Backend running on port 8000
- [ ] MySQL database connected
- [ ] Logged in with valid token
- [ ] Token in Authorization header
- [ ] Using correct HTTP method
- [ ] Content-Type: application/json
- [ ] All required fields included

---

## 📚 Full Documentation

- **Complete API Docs:** `/backend/API_DOCUMENTATION.md`
- **Troubleshooting:** `/backend/TROUBLESHOOTING.md`
- **Swagger UI:** http://localhost:8000/api/docs

---

## 💾 Verify in Database

```bash
mysql -u vinaygoud -p EduPortal -e "SELECT * FROM students ORDER BY id DESC LIMIT 5;"
```

---

**Remember:**
- **POST** = Create new
- **PUT** = Update existing
- **GET** = Read/retrieve
- **DELETE** = Remove

**All operations save to MySQL database automatically!** ✅
