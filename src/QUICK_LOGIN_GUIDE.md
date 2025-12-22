# 🚀 Quick Login Setup Guide

## ⚡ 3-Step Setup (Takes 2 Minutes)

### Step 1: Start Backend
```bash
cd backend
python -m uvicorn main:app --reload
```

### Step 2: Create Demo Users
```bash
# In a NEW terminal window
cd backend
python setup_demo_users.py
```

### Step 3: Test Login
```bash
python test_login_json.py
```

✅ **You should see:** `✅ SUCCESS!` with a bearer token

---

## 🔐 Login Credentials

| Username | Password | Role |
|----------|----------|------|
| `superadmin` | `admin2024` | Super Admin |
| `admin` | `demo123` | School Admin |
| `teacher` | `demo123` | Teacher |
| `student` | `demo123` | Student |

---

## 🧪 Quick Test

### Test with curl:
```bash
curl -X POST http://localhost:8000/api/v1/auth/login-json \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "demo123"}'
```

### Expected Response:
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "role": "school_admin",
  "school_id": 1
}
```

---

## 🔄 Use the Token

```bash
# Save token (Linux/Mac)
TOKEN="your_token_here"

# Make authenticated request
curl http://localhost:8000/api/v1/students/ \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🐛 Troubleshooting

**Problem:** Can't connect to server  
**Fix:** Make sure backend is running on port 8000

**Problem:** "Incorrect username or password"  
**Fix:** Run `python setup_demo_users.py` again

**Problem:** Database error  
**Fix:** Check MySQL is running and credentials in `config.py`

---

## 📚 More Info

- **Detailed Guide:** [LOGIN_AUTHENTICATION_FIXED.md](LOGIN_AUTHENTICATION_FIXED.md)
- **API Docs:** http://localhost:8000/api/docs
- **Backend README:** [backend/README.md](backend/README.md)

---

**That's it! You're ready to login and get bearer tokens! 🎉**
