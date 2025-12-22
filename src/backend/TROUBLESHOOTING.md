# 🔧 Troubleshooting Guide - API Errors

## Common Error: "Method Not Allowed"

### ❌ Error Message
```json
{
    "detail": "Method Not Allowed"
}
```

### ✅ Solution

This error occurs when you're using the **wrong HTTP method** for an endpoint.

---

## 🔍 Quick Fixes

### 1. Check HTTP Method

| Operation | Correct Method | Common Mistake |
|-----------|---------------|----------------|
| Get list of students | `GET /api/v1/students/` | Using POST |
| Create student | `POST /api/v1/students/` | Using GET |
| Update student | `PUT /api/v1/students/1` | Using POST |
| Delete student | `DELETE /api/v1/students/1` | Using GET |

### 2. Check Endpoint URL

**❌ Wrong:**
```
POST /api/v1/students/1     ← Should be PUT
GET /api/v1/student/        ← Missing 's'
POST /students/             ← Missing /api/v1
```

**✅ Correct:**
```
PUT /api/v1/students/1      ← Update student
GET /api/v1/students/       ← Get all students
POST /api/v1/students/      ← Create student
```

### 3. Check Authorization Header

**❌ Missing Token:**
```javascript
fetch('http://localhost:8000/api/v1/students/')
```

**✅ With Token:**
```javascript
fetch('http://localhost:8000/api/v1/students/', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
```

---

## 📋 Correct API Calls

### CREATE Student (POST)

```bash
curl -X POST "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer <token>" \
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
```

**JavaScript (Fetch):**
```javascript
const response = await fetch('http://localhost:8000/api/v1/students/', {
  method: 'POST',  // ✅ Correct method
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    school_id: 1,
    admission_no: 'GHS2024999',
    first_name: 'Test',
    last_name: 'Student',
    date_of_birth: '2012-01-01',
    gender: 'Male',
    status: 'active'
  })
});
```

### UPDATE Student (PUT)

```bash
curl -X PUT "http://localhost:8000/api/v1/students/1" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+91-9999999999",
    "email": "newemail@test.com"
  }'
```

**JavaScript:**
```javascript
const response = await fetch('http://localhost:8000/api/v1/students/1', {
  method: 'PUT',  // ✅ Use PUT for updates
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone: '+91-9999999999',
    email: 'newemail@test.com'
  })
});
```

### GET Students

```bash
curl -X GET "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer <token>"
```

**JavaScript:**
```javascript
const response = await fetch('http://localhost:8000/api/v1/students/', {
  method: 'GET',  // ✅ GET for reading data
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### DELETE Student

```bash
curl -X DELETE "http://localhost:8000/api/v1/students/1" \
  -H "Authorization: Bearer <token>"
```

**JavaScript:**
```javascript
const response = await fetch('http://localhost:8000/api/v1/students/1', {
  method: 'DELETE',  // ✅ DELETE for removing
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 🐛 Other Common Errors

### 401 Unauthorized

**Error:**
```json
{
  "detail": "Not authenticated"
}
```

**Causes:**
1. Missing Authorization header
2. Invalid/expired token
3. Token not prefixed with "Bearer "

**Fix:**
```javascript
// ✅ Correct
headers: {
  'Authorization': `Bearer ${token}`
}

// ❌ Wrong
headers: {
  'Authorization': token  // Missing "Bearer "
}
```

### 403 Forbidden

**Error:**
```json
{
  "detail": "Access denied"
}
```

**Causes:**
1. Trying to access another school's data
2. Insufficient permissions

**Fix:**
- Login with correct user (admin/super_admin)
- Access only your school's data

### 404 Not Found

**Error:**
```json
{
  "detail": "Student not found"
}
```

**Causes:**
1. Invalid student ID
2. Student was deleted
3. Wrong URL

**Fix:**
- Verify ID exists: `GET /api/v1/students/`
- Check URL: `/api/v1/students/1` (not `/api/v1/student/1`)

### 422 Validation Error

**Error:**
```json
{
  "detail": [
    {
      "loc": ["body", "admission_no"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**Causes:**
1. Missing required field
2. Invalid data type
3. Invalid date format

**Fix:**
```javascript
// ❌ Wrong - missing required field
{
  "first_name": "Test"
}

// ✅ Correct - all required fields
{
  "school_id": 1,
  "admission_no": "GHS2024999",
  "first_name": "Test",
  "last_name": "Student",
  "status": "active"
}
```

### 500 Internal Server Error

**Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

**Causes:**
1. Database connection error
2. Server code error
3. Invalid data

**Fix:**
1. Check database is running:
   ```bash
   mysql -u vinaygoud -p
   ```

2. Check backend logs in terminal

3. Restart backend:
   ```bash
   cd backend
   python -m uvicorn main:app --reload
   ```

---

## 🔧 Debug Steps

### Step 1: Verify Server is Running

```bash
curl http://localhost:8000/health
```

**Expected:**
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Step 2: Test Login

```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin1",
    "password": "demo123"
  }'
```

**Expected:**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "role": "school_admin",
  "school_id": 1
}
```

### Step 3: Test with Token

```bash
TOKEN="<paste_token_here>"

curl -X GET "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer $TOKEN"
```

### Step 4: Check Database

```bash
mysql -u vinaygoud -p EduPortal -e "SELECT * FROM students LIMIT 5;"
```

---

## 🧪 Testing Script

Run the automated test script:

```bash
cd backend
pip install requests
python test_api.py
```

**This will:**
- ✅ Test all CRUD operations
- ✅ Create test student
- ✅ Update test student
- ✅ Delete test student
- ✅ Test all endpoints

---

## 📝 Request/Response Examples

### Frontend to Backend Flow

1. **User clicks "Add Student"**
2. **Frontend sends:**
   ```javascript
   const createStudent = async (studentData) => {
     const response = await fetch('http://localhost:8000/api/v1/students/', {
       method: 'POST',  // ✅ POST for create
       headers: {
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(studentData)
     });
     
     if (!response.ok) {
       const error = await response.json();
       throw new Error(error.detail);
     }
     
     return await response.json();
   };
   ```

3. **Backend processes:**
   - Validates token
   - Checks permissions
   - Validates data
   - Saves to MySQL
   - Returns student object

4. **Frontend receives:**
   ```json
   {
     "id": 13,
     "school_id": 1,
     "admission_no": "GHS2024999",
     "first_name": "Test",
     "last_name": "Student",
     ...
     "created_at": "2024-12-12T15:30:00"
   }
   ```

5. **Data is in MySQL:**
   ```sql
   SELECT * FROM students WHERE id = 13;
   ```

---

## ✅ Checklist

Before calling any API:

- [ ] Backend server is running (`http://localhost:8000`)
- [ ] Database is connected (check `/health`)
- [ ] You have logged in and got a token
- [ ] Token is stored in localStorage/state
- [ ] Using correct HTTP method (GET/POST/PUT/DELETE)
- [ ] Using correct URL with `/api/v1` prefix
- [ ] Authorization header includes "Bearer " + token
- [ ] Content-Type is "application/json" for POST/PUT
- [ ] Request body is valid JSON
- [ ] All required fields are included

---

## 🆘 Still Having Issues?

### Check Backend Logs

The terminal running uvicorn shows all requests:

```
INFO:     127.0.0.1:55555 - "POST /api/v1/students/ HTTP/1.1" 201 Created
```

**Look for:**
- Status code (200, 201, 400, 404, 405, etc.)
- Error messages
- Stack traces

### Enable Debug Mode

In `/backend/config.py`:
```python
DEBUG: bool = True  # Shows detailed errors
```

### Test with Postman/Insomnia

1. Import collection
2. Set environment variable `token`
3. Test each endpoint
4. Check response

### Check Database Directly

```bash
# Login to MySQL
mysql -u vinaygoud -p EduPortal

# Check students table
SELECT * FROM students;

# Check if student was created
SELECT * FROM students WHERE admission_no = 'GHS2024999';

# Check recent students
SELECT * FROM students ORDER BY created_at DESC LIMIT 5;
```

---

## 📚 Additional Resources

- **API Documentation:** `/backend/API_DOCUMENTATION.md`
- **Swagger UI:** http://localhost:8000/api/docs
- **Test Script:** `python backend/test_api.py`
- **Database Guide:** `/backend/database/README_DATABASE.md`

---

**Most common fix: Use POST for create, PUT for update, GET for read, DELETE for delete!** ✅
