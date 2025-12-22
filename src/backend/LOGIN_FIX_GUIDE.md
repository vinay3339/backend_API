# Login Authentication Fix Guide

## Problem
You were unable to login and get the bearer token, receiving authentication errors.

## Root Cause
The demo users listed in `DEMO_CREDENTIALS.md` were not actually present in the MySQL database with properly hashed passwords.

## Solution
We've created a setup script that will create all demo users with correct password hashing.

---

## 🔧 QUICK FIX - Follow These Steps

### Step 1: Make Sure Backend is Running
```bash
cd backend
python -m uvicorn main:app --reload
```

You should see:
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Step 2: Setup Demo Users (Run This First!)
Open a **NEW terminal window** and run:

```bash
cd backend
python setup_demo_users.py
```

This will:
- ✅ Create a demo school if one doesn't exist
- ✅ Create all demo users with properly hashed passwords
- ✅ Update existing users if they already exist
- ✅ Display all login credentials

### Step 3: Test the Login
After running setup_demo_users.py, test the login:

```bash
cd backend
python test_login_json.py
```

You should see:
```
✅ SUCCESS!
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Role: school_admin
School ID: 1
```

---

## 📋 Demo Users Created

After running `setup_demo_users.py`, you'll have these users:

### Super Admin
- **Username:** `superadmin`
- **Password:** `admin2024`
- **Role:** super_admin
- **School:** None (system-wide access)

### School Admins
1. **First-Time Login**
   - **Username:** `admin`
   - **Password:** `demo123`
   - **Role:** school_admin
   - **First Login:** Yes (will require password change)

2. **Returning User**
   - **Username:** `admin2`
   - **Password:** `demo123`
   - **Role:** school_admin
   - **First Login:** No (direct dashboard access)

### Teachers
1. **First-Time Login**
   - **Username:** `teacher`
   - **Password:** `demo123`
   - **Role:** teacher

2. **Returning User**
   - **Username:** `teacher2`
   - **Password:** `demo123`
   - **Role:** teacher

### Students
1. **First-Time Login**
   - **Username:** `student`
   - **Password:** `demo123`
   - **Role:** student

2. **Returning User**
   - **Username:** `student2`
   - **Password:** `demo123`
   - **Role:** student

---

## 🧪 Testing Different Login Methods

### Method 1: JSON Login (Recommended)
```bash
curl -X POST http://localhost:8000/api/v1/auth/login-json \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "demo123"}'
```

### Method 2: Form Data Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -F "username=admin" \
  -F "password=demo123"
```

### Method 3: Python Test Script
```bash
python backend/test_login_json.py
```

---

## 🔐 Using the Bearer Token

Once you get the token, use it in subsequent requests:

```bash
# Get the token
TOKEN=$(curl -X POST http://localhost:8000/api/v1/auth/login-json \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "demo123"}' \
  | jq -r '.access_token')

# Use the token to access protected endpoints
curl http://localhost:8000/api/v1/students/ \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🐛 Troubleshooting

### Issue 1: "Could not connect to database"
**Solution:**
- Make sure MySQL is running
- Check database credentials in `backend/config.py`:
  ```python
  DB_HOST = "127.0.0.1"
  DB_PORT = 3306
  DB_USER = "vinaygoud"
  DB_PASSWORD = "vinay3339"
  DB_NAME = "EduPortal"
  ```

### Issue 2: "Table doesn't exist"
**Solution:**
Run the database setup SQL scripts:
```bash
mysql -u vinaygoud -p EduPortal < database/create-tables.sql
```

### Issue 3: "Incorrect username or password"
**Solution:**
- Run `python setup_demo_users.py` again to reset passwords
- Make sure you're using the exact credentials listed above
- Check that the user exists in the database:
  ```bash
  mysql -u vinaygoud -p
  use EduPortal;
  SELECT username, email, role FROM users;
  ```

### Issue 4: Backend not starting
**Solution:**
- Install dependencies:
  ```bash
  cd backend
  pip install -r requirements.txt
  ```
- Check for port conflicts (port 8000)

---

## 📊 Verify Users in Database

To check if users were created successfully:

```bash
mysql -u vinaygoud -p
```

Then run:
```sql
USE EduPortal;

-- View all users
SELECT 
    id,
    username, 
    email, 
    role, 
    is_active,
    is_first_login,
    school_id
FROM users;

-- Count users by role
SELECT role, COUNT(*) as count 
FROM users 
GROUP BY role;
```

You should see 7 users (1 super_admin, 2 school_admin, 2 teacher, 2 student).

---

## 🎯 Expected Response Format

### Successful Login Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "role": "school_admin",
  "school_id": 1
}
```

### Error Response (Wrong Credentials)
```json
{
  "detail": "Incorrect username or password"
}
```

---

## 🔄 Reset Everything (If Needed)

If you want to start fresh:

```bash
# 1. Drop and recreate the users table
mysql -u vinaygoud -p EduPortal -e "TRUNCATE TABLE users;"

# 2. Run the setup script again
python backend/setup_demo_users.py

# 3. Test login
python backend/test_login_json.py
```

---

## ✅ Success Checklist

- [ ] Backend is running on http://localhost:8000
- [ ] MySQL database "EduPortal" exists
- [ ] Ran `python setup_demo_users.py` successfully
- [ ] Test login returns a bearer token
- [ ] Can access protected endpoints with the token

---

## 📞 Next Steps

Once login is working:

1. **Test All User Roles**
   - Login as each user type (admin, teacher, student)
   - Verify role-based access control

2. **Test First-Time Login Flow**
   - Login with `admin` (first-time user)
   - Should require password change
   - Verify `is_first_login` flag updates

3. **Test Frontend Integration**
   - Update frontend to use `/api/v1/auth/login-json`
   - Store token in localStorage/sessionStorage
   - Include token in all API requests

4. **Test Protected Endpoints**
   - Students CRUD operations
   - Teachers CRUD operations
   - Attendance marking
   - Marks entry

---

## 🔒 Security Notes

**For Development Only:**
- Passwords are simple (demo123)
- Secret key is not production-ready
- CORS is permissive

**Before Production:**
- Change SECRET_KEY in config.py
- Enforce strong password requirements
- Implement rate limiting
- Add password reset functionality
- Enable HTTPS only
- Implement refresh tokens
- Add logging and monitoring

---

## 📝 Files Modified/Created

1. **`backend/setup_demo_users.py`** - New script to create demo users
2. **`backend/test_login_json.py`** - Updated to use correct credentials
3. **`backend/LOGIN_FIX_GUIDE.md`** - This comprehensive guide

---

## 🎓 Understanding the Authentication Flow

```
1. User submits login credentials
   ↓
2. Backend validates username/password
   ↓
3. Backend checks if user is active
   ↓
4. Backend creates JWT token with user data
   ↓
5. Backend returns token + role + school_id
   ↓
6. Frontend stores token
   ↓
7. Frontend includes token in Authorization header
   ↓
8. Backend validates token on each request
```

---

**Last Updated:** December 2024
**Version:** 1.0
