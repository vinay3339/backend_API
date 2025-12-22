# Authentication Workflow - Complete Guide

## 🔐 Overview
This document explains the complete authentication workflow for the School Management System.

---

## 📊 Quick Reference

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Password Hashing | bcrypt (via passlib) | Secure password storage |
| Token | JWT (JSON Web Token) | Stateless authentication |
| Algorithm | HS256 | Token signing |
| Expiration | 30 minutes | Token validity |
| Storage | MySQL | User credentials |

---

## 🔄 Complete Authentication Flow

```
┌────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION WORKFLOW                     │
└────────────────────────────────────────────────────────────────┘

1. USER REGISTRATION (One-Time Setup)
   ┌─────────────┐
   │   Admin     │ Creates user account
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  Database   │ Stores: username, email, hashed_password
   └─────────────┘
          │
          └─→ Password is hashed using bcrypt
              Never stored in plain text


2. LOGIN REQUEST
   ┌─────────────┐
   │   Client    │ POST /auth/login-json
   └──────┬──────┘ {"username": "admin", "password": "demo123"}
          │
          ▼
   ┌─────────────┐
   │   Backend   │ Step 1: Receive credentials
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  Database   │ Step 2: Query user by username or email
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   Backend   │ Step 3: Verify password hash
   └──────┬──────┘ bcrypt.verify(password, hashed_password)
          │
          ├─→ Password correct? Continue ✅
          │
          └─→ Password wrong? Return 401 ❌


3. TOKEN GENERATION (If password correct)
   ┌─────────────┐
   │   Backend   │ Step 4: Create JWT token
   └──────┬──────┘
          │
          ▼
   ┌──────────────────────────────────────┐
   │     JWT Token Contents               │
   │                                      │
   │  {                                   │
   │    "sub": "admin",                   │
   │    "role": "school_admin",           │
   │    "school_id": 1,                   │
   │    "exp": 1734567890                 │
   │  }                                   │
   │                                      │
   │  Signed with SECRET_KEY (HS256)      │
   └──────────────────────────────────────┘
          │
          ▼
   ┌─────────────┐
   │   Backend   │ Step 5: Update last_login timestamp
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   Client    │ Step 6: Return token + role + school_id
   └─────────────┘


4. STORING TOKEN
   ┌─────────────┐
   │   Client    │ Receives:
   └──────┬──────┘ {
          │          "access_token": "eyJhbGc...",
          │          "token_type": "bearer",
          │          "role": "school_admin",
          │          "school_id": 1
          │        }
          │
          ▼
   ┌─────────────┐
   │ localStorage│ Store:
   └─────────────┘ - access_token
                   - user_role
                   - school_id


5. AUTHENTICATED REQUESTS
   ┌─────────────┐
   │   Client    │ GET /students/
   └──────┬──────┘ Headers: Authorization: Bearer eyJhbGc...
          │
          ▼
   ┌─────────────┐
   │   Backend   │ Step 1: Extract token from header
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   Backend   │ Step 2: Verify token signature
   └──────┬──────┘ jwt.decode(token, SECRET_KEY)
          │
          ├─→ Valid? Continue ✅
          │
          └─→ Invalid/Expired? Return 401 ❌
          │
          ▼
   ┌─────────────┐
   │   Backend   │ Step 3: Extract username from token
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  Database   │ Step 4: Query user by username
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   Backend   │ Step 5: Check user is_active
   └──────┬──────┘
          │
          ├─→ Active? Process request ✅
          │
          └─→ Inactive? Return 403 ❌
          │
          ▼
   ┌─────────────┐
   │   Backend   │ Step 6: Process request with user context
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   Client    │ Step 7: Return data
   └─────────────┘
```

---

## 🔑 Password Hashing Deep Dive

### How Passwords are Hashed

```python
# 1. When creating a user
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
hashed = pwd_context.hash("demo123")

# Result: $2b$12$abcd1234...xyz (60 characters)
# Structure:
#   $2b$      - bcrypt identifier
#   12$       - cost factor (2^12 iterations)
#   abcd...   - salt (22 chars) + hash (31 chars)
```

### Password Verification

```python
# 2. When logging in
plain_password = "demo123"
hashed_password = "$2b$12$abcd1234...xyz"

# Verify
is_valid = pwd_context.verify(plain_password, hashed_password)
# Returns: True or False
```

### Security Features

✅ **Salt**: Each password has unique salt (prevents rainbow tables)  
✅ **Cost Factor**: 2^12 iterations (slows down brute force)  
✅ **One-Way**: Cannot reverse hash to get password  
✅ **Constant Time**: Prevents timing attacks  

---

## 🎫 JWT Token Deep Dive

### Token Structure

A JWT has 3 parts separated by dots:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJzY2hvb2xfYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
│──────────── HEADER ──────────────││─────────── PAYLOAD ──────────││──────────── SIGNATURE ───────────│
```

### 1. Header (Base64 encoded)
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2. Payload (Base64 encoded)
```json
{
  "sub": "admin",
  "role": "school_admin",
  "school_id": 1,
  "exp": 1734567890
}
```

### 3. Signature
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  SECRET_KEY
)
```

### Token Generation Code

```python
from jose import jwt
from datetime import datetime, timedelta

def create_access_token(data: dict):
    to_encode = data.copy()
    
    # Add expiration
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    
    # Create token
    token = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm="HS256"
    )
    
    return token
```

### Token Verification Code

```python
def decode_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )
        return payload
    except jwt.JWTError:
        raise HTTPException(status_code=401)
```

---

## 🗄️ Database Schema

### Users Table Structure

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    school_id INT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'school_admin', 'teacher', 'student', 'parent'),
    is_active BOOLEAN DEFAULT TRUE,
    is_first_login BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (school_id) REFERENCES schools(id)
);
```

### Example User Record

```
+----+-----------+----------+----------------------+---------------+-------------+-----------+----------------+---------------------+
| id | school_id | username | email                | role          | is_active   | last_login| is_first_login | hashed_password     |
+----+-----------+----------+----------------------+---------------+-------------+-----------+----------------+---------------------+
| 1  | 1         | admin    | admin@demoschool.edu | school_admin  | TRUE        | NULL      | TRUE           | $2b$12$abc...xyz   |
| 2  | 1         | admin2   | admin2@demoschool.edu| school_admin  | TRUE        | 2024-...  | FALSE          | $2b$12$def...uvw   |
+----+-----------+----------+----------------------+---------------+-------------+-----------+----------------+---------------------+
```

---

## 🔒 Security Best Practices

### ✅ What We Do Right

1. **Password Hashing**
   - Never store plain text passwords
   - Use bcrypt (industry standard)
   - Unique salt per password

2. **JWT Tokens**
   - Signed with secret key
   - Include expiration
   - Contain minimal data

3. **Validation**
   - Check user exists
   - Check user is active
   - Verify password before token generation

4. **SQL Injection Prevention**
   - Use SQLAlchemy ORM
   - Parameterized queries
   - No string concatenation

### ⚠️ Production Recommendations

1. **Change Secret Key**
   ```python
   # Don't use this in production!
   SECRET_KEY = "your-secret-key-change-this-in-production"
   
   # Use a strong random key
   import secrets
   SECRET_KEY = secrets.token_urlsafe(32)
   ```

2. **Add Refresh Tokens**
   - Short-lived access tokens (30 min)
   - Long-lived refresh tokens (7 days)
   - Rotate tokens on refresh

3. **Rate Limiting**
   ```python
   # Limit login attempts
   from slowapi import Limiter
   
   @limiter.limit("5/minute")
   async def login():
       ...
   ```

4. **HTTPS Only**
   - Never transmit tokens over HTTP
   - Use secure cookies
   - Set secure headers

5. **Token Blacklisting**
   - Maintain blacklist of revoked tokens
   - Check on each request
   - Clear expired tokens

6. **Multi-Factor Authentication**
   - Add TOTP (Google Authenticator)
   - SMS verification
   - Email verification

---

## 🧪 Testing Authentication

### Test 1: Valid Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login-json \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "demo123"}'

# Expected: 200 OK + token
```

### Test 2: Wrong Password
```bash
curl -X POST http://localhost:8000/api/v1/auth/login-json \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "wrong"}'

# Expected: 401 Unauthorized
```

### Test 3: Non-existent User
```bash
curl -X POST http://localhost:8000/api/v1/auth/login-json \
  -H "Content-Type: application/json" \
  -d '{"username": "notexist", "password": "demo123"}'

# Expected: 401 Unauthorized
```

### Test 4: Using Token
```bash
TOKEN="eyJhbGc..."

curl http://localhost:8000/api/v1/students/ \
  -H "Authorization: Bearer $TOKEN"

# Expected: 200 OK + student data
```

### Test 5: Invalid Token
```bash
curl http://localhost:8000/api/v1/students/ \
  -H "Authorization: Bearer invalid_token"

# Expected: 401 Unauthorized
```

### Test 6: Expired Token
```bash
# Wait 30+ minutes, then:
curl http://localhost:8000/api/v1/students/ \
  -H "Authorization: Bearer $OLD_TOKEN"

# Expected: 401 Unauthorized
```

---

## 🔍 Debugging Authentication Issues

### Issue 1: "Incorrect username or password"

**Possible Causes:**
- Username doesn't exist in database
- Password is incorrect
- User is using email instead of username (or vice versa)

**Debug:**
```sql
-- Check if user exists
SELECT username, email, is_active FROM users WHERE username = 'admin';

-- Verify password hash exists
SELECT LENGTH(hashed_password) FROM users WHERE username = 'admin';
-- Should return 60 (bcrypt hash length)
```

### Issue 2: "Could not validate credentials"

**Possible Causes:**
- Token is malformed
- Token is expired
- SECRET_KEY changed
- Token signature is invalid

**Debug:**
```python
# Manually decode token (without verification)
import jwt
token = "eyJhbGc..."
decoded = jwt.decode(token, options={"verify_signature": False})
print(decoded)  # See what's inside
```

### Issue 3: "Inactive user"

**Possible Causes:**
- User's is_active = FALSE

**Debug:**
```sql
UPDATE users SET is_active = TRUE WHERE username = 'admin';
```

---

## 📱 Frontend Integration Examples

### React Login Component

```typescript
import { useState } from 'react';

interface LoginResponse {
  access_token: string;
  token_type: string;
  role: string;
  school_id: number;
}

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data: LoginResponse = await response.json();

      // Store token and user info
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user_role', data.role);
      localStorage.setItem('school_id', data.school_id.toString());

      // Redirect based on role
      if (data.role === 'school_admin') {
        window.location.href = '/admin/dashboard';
      } else if (data.role === 'teacher') {
        window.location.href = '/teacher/dashboard';
      } else {
        window.location.href = '/student/dashboard';
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### API Service with Auth

```typescript
class APIService {
  private baseURL = 'http://localhost:8000/api/v1';

  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async getStudents() {
    const response = await fetch(`${this.baseURL}/students/`, {
      headers: this.getAuthHeader(),
    });

    if (response.status === 401) {
      // Token expired or invalid
      this.logout();
      throw new Error('Session expired. Please login again.');
    }

    return response.json();
  }

  async createStudent(data: StudentData) {
    const response = await fetch(`${this.baseURL}/students/`, {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(data),
    });

    return response.json();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('school_id');
    window.location.href = '/login';
  }
}

export const api = new APIService();
```

---

## ⏱️ Token Expiration Handling

### Frontend Token Refresh Strategy

```typescript
let tokenRefreshTimer: NodeJS.Timeout;

function startTokenRefreshTimer() {
  // Refresh 5 minutes before expiration (25 min for 30 min tokens)
  const refreshInterval = 25 * 60 * 1000;

  tokenRefreshTimer = setInterval(async () => {
    try {
      // Call refresh endpoint (not implemented yet)
      const response = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Redirect to login
      window.location.href = '/login';
    }
  }, refreshInterval);
}

function stopTokenRefreshTimer() {
  if (tokenRefreshTimer) {
    clearInterval(tokenRefreshTimer);
  }
}

// Start on login
startTokenRefreshTimer();

// Stop on logout
stopTokenRefreshTimer();
```

---

## 📊 Monitoring & Logging

### Log Authentication Events

```python
import logging

logger = logging.getLogger(__name__)

@router.post("/login-json")
async def login_json(user_login: UserLogin, db: Session = Depends(get_db)):
    logger.info(f"Login attempt for user: {user_login.username}")
    
    user = db.query(User).filter(...).first()
    
    if not user:
        logger.warning(f"Login failed: User not found - {user_login.username}")
        raise HTTPException(status_code=401)
    
    if not verify_password(user_login.password, user.hashed_password):
        logger.warning(f"Login failed: Wrong password - {user_login.username}")
        raise HTTPException(status_code=401)
    
    logger.info(f"Login successful: {user_login.username} (role: {user.role})")
    
    # ... rest of code
```

---

## 🎯 Summary

| Aspect | Implementation | Security Level |
|--------|---------------|----------------|
| Password Storage | bcrypt hashing | ✅ High |
| Token Type | JWT (HS256) | ✅ Good |
| Token Expiration | 30 minutes | ✅ Good |
| HTTPS | Not enforced | ⚠️ Dev only |
| Rate Limiting | Not implemented | ⚠️ TODO |
| Refresh Tokens | Not implemented | ⚠️ TODO |
| MFA | Not implemented | ⚠️ TODO |

**Current Status:** ✅ Suitable for development and testing  
**Production Ready:** ⚠️ Requires additional security measures

---

**Last Updated:** December 2024
**Version:** 1.0
