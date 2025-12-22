# ✅ LOGIN FIXED - Two Ways to Login

## 🎯 Problem Solved!

The backend was expecting **Form Data**, not JSON. Now you have **TWO endpoints**:

---

## 🔑 Option 1: JSON Login (EASIEST) ✨

### NEW Endpoint (Use This!)
```
POST http://localhost:8000/api/v1/auth/login-json
```

### ✅ Using cURL
```bash
curl -X POST http://localhost:8000/api/v1/auth/login-json \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin1",
    "password": "demo123"
  }'
```

### ✅ Using Postman
1. **Method:** POST
2. **URL:** `http://localhost:8000/api/v1/auth/login-json`
3. **Headers:**
   - `Content-Type: application/json`
4. **Body:** Select "raw" → "JSON"
   ```json
   {
     "username": "admin1",
     "password": "demo123"
   }
   ```
5. Click "Send"

### ✅ Using JavaScript
```javascript
const response = await fetch('http://localhost:8000/api/v1/auth/login-json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin1',
    password: 'demo123'
  })
});

const data = await response.json();
localStorage.setItem('token', data.access_token);
console.log('Token:', data.access_token);
```

### ✅ Using Python
```python
import requests

response = requests.post(
    'http://localhost:8000/api/v1/auth/login-json',
    json={
        'username': 'admin1',
        'password': 'demo123'
    }
)

token = response.json()['access_token']
print(f"Token: {token}")
```

---

## 🔑 Option 2: Form Data Login (OAuth2 Standard)

### Endpoint
```
POST http://localhost:8000/api/v1/auth/login
```

### ✅ Using cURL
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin1&password=demo123"
```

### ✅ Using Postman
1. **Method:** POST
2. **URL:** `http://localhost:8000/api/v1/auth/login`
3. **Body:** Select "x-www-form-urlencoded"
4. Add key-value pairs:
   - Key: `username` → Value: `admin1`
   - Key: `password` → Value: `demo123`
5. Click "Send"

### ✅ Using JavaScript
```javascript
const formData = new URLSearchParams();
formData.append('username', 'admin1');
formData.append('password', 'demo123');

const response = await fetch('http://localhost:8000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: formData
});

const data = await response.json();
```

### ✅ Using Python
```python
import requests

response = requests.post(
    'http://localhost:8000/api/v1/auth/login',
    data={  # ← Use 'data', not 'json'
        'username': 'admin1',
        'password': 'demo123'
    }
)
```

---

## 📋 Response (Both Endpoints)

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbjEiLCJyb2xlIjoic2Nob29sX2FkbWluIiwiZXhwIjoxNzM0MDA5NjAwfQ.xxxxxxxxxxx",
  "token_type": "bearer",
  "role": "school_admin",
  "school_id": 1
}
```

---

## 🧪 Quick Test

### Test JSON Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login-json \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","password":"demo123"}'
```

### Test Form Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin1&password=demo123"
```

---

## 🎯 Recommended: Use JSON Login

**For modern applications, use `/auth/login-json`:**
- ✅ Easier to use
- ✅ Works with JSON in Postman
- ✅ Standard for REST APIs
- ✅ No form data conversion needed

---

## 🔐 All Demo Users

| Username | Password | Role |
|----------|----------|------|
| `superadmin` | `demo123` | Super Admin |
| `admin1` | `demo123` | School Admin (School 1) |
| `admin2` | `demo123` | School Admin (School 2) |
| `teacher1` | `demo123` | Teacher |
| `student1` | `demo123` | Student |

---

## ✅ Complete Example

```bash
# 1. Login (JSON)
TOKEN=$(curl -s -X POST "http://localhost:8000/api/v1/auth/login-json" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","password":"demo123"}' \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

echo "Token: ${TOKEN:0:30}..."

# 2. Create Student
curl -X POST "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": 1,
    "admission_no": "GHS2024100",
    "first_name": "Test",
    "last_name": "Student",
    "status": "active"
  }'

# 3. Get Students
curl -X GET "http://localhost:8000/api/v1/students/" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🎉 Summary

**Problem:** Login endpoint expected form-data, you were sending JSON

**Solution:** Added new `/auth/login-json` endpoint that accepts JSON

**Use:** `POST /api/v1/auth/login-json` with JSON body

**Try it now!** ✅
