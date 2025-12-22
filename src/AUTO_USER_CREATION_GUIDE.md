# Auto User Account Creation for Students & Teachers 🎫

## ✅ Feature Implemented

When creating a **Student** or **Teacher**, the system now **automatically creates a user account** for authentication.

---

## 🎯 Auto-Creation Rules

### Students

When creating a student:
- ✅ **Username**: `firstname.lastname` (e.g., `john.doe`)
- ✅ **Default Password**: `firstname@123` (e.g., `john@123`)
- ✅ **Role**: `student`
- ✅ **Email**: Uses provided email or generates `username@student.school.com`
- ✅ **First Login**: Set to `true` (user must change password)
- ✅ **Status**: Active by default

### Teachers

When creating a teacher:
- ✅ **Username**: `firstname.lastname` (e.g., `sarah.johnson`)
- ✅ **Default Password**: `firstname@123` (e.g., `sarah@123`)
- ✅ **Role**: `teacher`
- ✅ **Email**: Uses provided email or generates `username@teacher.school.com`
- ✅ **First Login**: Set to `true` (user must change password)
- ✅ **Status**: Active by default

---

## 📝 How It Works

### Student Creation Flow

```bash
POST /api/students/
{
  "first_name": "John",
  "last_name": "Doe",
  "admission_no": "2024001",
  "school_id": 1,
  "school_name": "ABC School",
  "class_id": 5,
  "class_name": "Grade 5",
  ... // other fields
}
```

**What Happens Automatically:**

1. ✅ Student record created in `students` table
2. ✅ User account created in `users` table:
   ```json
   {
     "username": "john.doe",
     "email": "john.doe@student.school.com",
     "hashed_password": "hashed(john@123)",
     "role": "student",
     "school_id": 1,
     "school_name": "ABC School",
     "is_first_login": true,
     "is_active": true
   }
   ```
3. ✅ Student's `user_id` field linked to created user

**Response:**
```json
{
  "id": 1,
  "user_id": 10,  // Automatically created user ID
  "first_name": "John",
  "last_name": "Doe",
  "admission_no": "2024001",
  ... // all student fields
}
```

**Student Can Now Login:**
- **Username**: `john.doe`
- **Password**: `john@123`
- **Role**: Student dashboard access

---

### Teacher Creation Flow

```bash
POST /api/teachers/
{
  "first_name": "Sarah",
  "last_name": "Johnson",
  "employee_id": "EMP001",
  "school_id": 1,
  "school_name": "ABC School",
  "designation": "Math Teacher",
  "department": "Mathematics",
  ... // other fields
}
```

**What Happens Automatically:**

1. ✅ Teacher record created in `teachers` table
2. ✅ User account created in `users` table:
   ```json
   {
     "username": "sarah.johnson",
     "email": "sarah.johnson@teacher.school.com",
     "hashed_password": "hashed(sarah@123)",
     "role": "teacher",
     "school_id": 1,
     "school_name": "ABC School",
     "is_first_login": true,
     "is_active": true
   }
   ```
3. ✅ Teacher's `user_id` field linked to created user

**Response:**
```json
{
  "id": 5,
  "user_id": 15,  // Automatically created user ID
  "first_name": "Sarah",
  "last_name": "Johnson",
  "employee_id": "EMP001",
  ... // all teacher fields
}
```

**Teacher Can Now Login:**
- **Username**: `sarah.johnson`
- **Password**: `sarah@123`
- **Role**: Teacher dashboard access

---

## 🔐 Username Generation Logic

### Basic Format
```
firstname.lastname
```

### Duplicate Handling

If username already exists, a number is appended:

```python
# First user: john.doe
john.doe

# Second user with same name: john.doe2
john.doe2

# Third user with same name: john.doe3
john.doe3

# And so on...
```

**Examples:**

| Name | Generated Username |
|------|-------------------|
| John Doe | `john.doe` |
| John Doe (2nd person) | `john.doe2` |
| Sarah | `sarah` (no last name) |
| Mary Johnson | `mary.johnson` |
| ROBERT Smith | `robert.smith` (lowercase) |

---

## 📧 Email Generation

### If Email Provided
Uses the provided email from the request:
```json
{
  "first_name": "John",
  "email": "john.doe@gmail.com"
}
// User email: john.doe@gmail.com
```

### If Email NOT Provided

**For Students:**
```
username@student.school.com
```

**For Teachers:**
```
username@teacher.school.com
```

**Examples:**
- Student John Doe → `john.doe@student.school.com`
- Teacher Sarah Johnson → `sarah.johnson@teacher.school.com`

---

## 🔑 Default Password Format

```
firstname@123
```

**Case-insensitive:** Converted to lowercase

**Examples:**

| Name | Default Password |
|------|-----------------|
| John Doe | `john@123` |
| SARAH Johnson | `sarah@123` |
| mary | `mary@123` |
| Robert SMITH | `robert@123` |

**Note:** All passwords are **hashed** using bcrypt before storage!

---

## 🔄 Complete API Examples

### Example 1: Create Student

**Request:**
```bash
POST /api/students/
Content-Type: application/json

{
  "admission_no": "STU2024001",
  "first_name": "Alice",
  "last_name": "Williams",
  "date_of_birth": "2010-05-15",
  "gender": "Female",
  "school_id": 1,
  "school_name": "Green Valley School",
  "class_id": 8,
  "class_name": "Grade 8",
  "section": "A"
}
```

**Response:**
```json
{
  "id": 101,
  "user_id": 201,  // ← Automatically created user
  "admission_no": "STU2024001",
  "first_name": "Alice",
  "last_name": "Williams",
  "full_name": "Alice Williams",
  "school_id": 1,
  "school_name": "Green Valley School",
  ... // all other fields
}
```

**Auto-Created User Account:**
- **Username**: `alice.williams`
- **Password**: `alice@123`
- **Role**: `student`
- **Email**: `alice.williams@student.school.com`

**Alice Can Login With:**
```
Username: alice.williams
Password: alice@123
```

---

### Example 2: Create Teacher

**Request:**
```bash
POST /api/teachers/
Content-Type: application/json

{
  "employee_id": "TEACH2024010",
  "first_name": "Michael",
  "last_name": "Brown",
  "date_of_birth": "1985-03-20",
  "gender": "Male",
  "email": "michael.brown@school.com",
  "school_id": 1,
  "school_name": "Green Valley School",
  "designation": "Senior Teacher",
  "department": "Science",
  "subjects": "Physics, Chemistry"
}
```

**Response:**
```json
{
  "id": 25,
  "user_id": 305,  // ← Automatically created user
  "employee_id": "TEACH2024010",
  "first_name": "Michael",
  "last_name": "Brown",
  "full_name": "Michael Brown",
  "email": "michael.brown@school.com",
  "school_id": 1,
  "school_name": "Green Valley School",
  ... // all other fields
}
```

**Auto-Created User Account:**
- **Username**: `michael.brown`
- **Password**: `michael@123`
- **Role**: `teacher`
- **Email**: `michael.brown@school.com` (used provided email)

**Michael Can Login With:**
```
Username: michael.brown
Password: michael@123
```

---

## 🛡️ Security Features

### Password Hashing
✅ All passwords are hashed using **bcrypt** before storage  
✅ Never stored in plain text  
✅ Strong cryptographic hashing algorithm  

### First Login Flag
✅ `is_first_login` set to `true`  
✅ Forces password change on first login  
✅ Improves security  

### Account Activation
✅ Accounts created as `is_active: true` by default  
✅ Can be deactivated if needed  
✅ Inactive users cannot login  

---

## 📊 Database Schema

### Students Table
```sql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,  -- Links to users table
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    ... -- 80+ other fields
);
```

### Teachers Table
```sql
CREATE TABLE teachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,  -- Links to users table (not FK!)
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    ... -- 40+ other fields
);
```

### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'school_admin', 'super_admin', 'parent'),
    school_id INT,
    school_name VARCHAR(200),
    is_first_login BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Note:** `user_id` in students/teachers is NOT a foreign key to maintain denormalized architecture!

---

## 🔄 Login Flow

### Step 1: User Login Request
```bash
POST /api/auth/login
{
  "username": "john.doe",
  "password": "john@123"
}
```

### Step 2: System Validation
1. Find user by username
2. Verify hashed password
3. Check if active
4. Check role

### Step 3: Check First Login
```json
{
  "is_first_login": true
}
```

### Step 4: Redirect
- If `is_first_login = true` → **Change Password Screen**
- If `is_first_login = false` → **Dashboard** (Student/Teacher based on role)

---

## 🎓 Usage Scenarios

### Scenario 1: Bulk Student Import

When importing 100 students:
```bash
POST /api/students/bulk
[
  {
    "first_name": "Student1",
    "last_name": "LastName1",
    ...
  },
  {
    "first_name": "Student2",
    "last_name": "LastName2",
    ...
  },
  ... // 100 students
]
```

**Result:**
- ✅ 100 student records created
- ✅ 100 user accounts automatically created
- ✅ All students can login immediately with default passwords
- ✅ Admin can share credentials:
  - Student1: `student1.lastname1` / `student1@123`
  - Student2: `student2.lastname2` / `student2@123`
  - etc.

---

### Scenario 2: New Teacher Onboarding

HR creates teacher:
```bash
POST /api/teachers/
{
  "first_name": "Emma",
  "last_name": "Davis",
  "employee_id": "EMP2024050",
  "email": "emma.davis@school.com",
  ...
}
```

**What HR Can Share:**
- Username: `emma.davis`
- Password: `emma@123`
- Portal: `https://school.portal.com`
- Role: Teacher

**Emma's First Login:**
1. Opens portal
2. Enters `emma.davis` / `emma@123`
3. System detects first login
4. Prompted to change password
5. Sets new secure password
6. Redirected to teacher dashboard

---

## ⚙️ Configuration

### Customize Password Format

Edit the helper functions in routers:

```python
# Current default: firstname@123
default_password = f"{first_name.lower()}@123"

# Change to: firstname@schoolname
default_password = f"{first_name.lower()}@{school_name.lower()}"

# Change to: firstname@12345
default_password = f"{first_name.lower()}@12345"

# Change to: admission_no for students
default_password = student_data.get('admission_no')
```

### Customize Email Format

```python
# Current: username@student.school.com
email = f"{username}@student.school.com"

# Change to: username@schoolname.com
email = f"{username}@{school_name.lower()}.com"

# Change to: admission_no@school.com
email = f"{admission_no}@school.com"
```

---

## 📝 API Response with User Info

### Get Student with User Details

```bash
GET /api/students/1
```

**Response:**
```json
{
  "id": 1,
  "user_id": 10,  // Link to user account
  "first_name": "John",
  "last_name": "Doe",
  "admission_no": "STU2024001",
  
  // To get full user details, optionally:
  "user": {
    "id": 10,
    "username": "john.doe",
    "email": "john.doe@student.school.com",
    "role": "student",
    "is_first_login": false,
    "is_active": true,
    "last_login": "2024-12-15T10:30:00"
  }
  
  ... // all other student fields
}
```

---

## 🎯 Summary

### What You Get

**For Students:**
- ✅ Auto-create user account on student creation
- ✅ Username: `firstname.lastname`
- ✅ Password: `firstname@123`
- ✅ Role: `student`
- ✅ Email: Auto-generated if not provided
- ✅ Immediate login capability
- ✅ Forced password change on first login

**For Teachers:**
- ✅ Auto-create user account on teacher creation
- ✅ Username: `firstname.lastname`
- ✅ Password: `firstname@123`
- ✅ Role: `teacher`
- ✅ Email: Auto-generated if not provided
- ✅ Immediate login capability
- ✅ Forced password change on first login

### Benefits

1. **No Manual User Creation** - Automatic process
2. **Consistent Credentials** - Predictable format
3. **Immediate Access** - Login right after creation
4. **Secure** - Passwords hashed, first login flag
5. **Scalable** - Works for bulk imports
6. **Flexible** - Easy to customize format

---

**Your auto user creation feature is fully implemented!** 🎊

Students and teachers get login credentials automatically when their records are created!
