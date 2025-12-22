# Demo Credentials Guide

## School Login Portal

### First-Time Login Accounts
These accounts require password change on first login.

#### Student Account
- **Username:** `student`
- **Password:** `demo123`
- **Display Name:** John Doe
- **Role:** Student
- **Flow:** Login → Change Password → Dashboard

#### Teacher Account
- **Username:** `teacher`
- **Password:** `demo123`
- **Display Name:** Mr. Anderson
- **Role:** Teacher
- **Flow:** Login → Change Password → Dashboard

#### School Admin Account
- **Username:** `admin`
- **Password:** `demo123`
- **Display Name:** Dr. Principal
- **Role:** School Admin
- **Flow:** Login → Change Password → Dashboard

---

### Returning User Accounts
These accounts go directly to the dashboard.

#### Student Account (Returning)
- **Username:** `student2`
- **Password:** `demo123`
- **Display Name:** Sarah Smith
- **Role:** Student
- **Flow:** Login → Dashboard (Direct)

#### Teacher Account (Returning)
- **Username:** `teacher2`
- **Password:** `demo123`
- **Display Name:** Ms. Wilson
- **Role:** Teacher
- **Flow:** Login → Dashboard (Direct)

#### School Admin Account (Returning)
- **Username:** `admin2`
- **Password:** `demo123`
- **Display Name:** Mrs. Administrator
- **Role:** School Admin
- **Flow:** Login → Dashboard (Direct)

---

## Application Manager (Super Admin) Login

### Super Admin Account
- **Username:** `superadmin`
- **Password:** `admin2024`
- **Display Name:** System Administrator
- **Role:** Super Admin
- **Flow:** Login → Admin Dashboard

---

## Testing Scenarios

### Scenario 1: First-Time User Experience
1. Select a school from the search modal
2. Login with `student` / `demo123`
3. System redirects to Change Password page
4. Create a new password (must meet strength requirements)
5. Successfully redirected to Dashboard
6. Dashboard displays "John Doe" with "Student" role

### Scenario 2: Returning User Experience
1. Select a school from the search modal
2. Login with `student2` / `demo123`
3. System directly redirects to Dashboard
4. Dashboard displays "Sarah Smith" with "Student" role

### Scenario 3: School Admin First-Time Login
1. Select a school from the search modal
2. Login with `admin` / `demo123`
3. System redirects to Change Password page
4. Create a new password
5. Successfully redirected to **Admin Dashboard**
6. Dashboard displays "Dr. Principal" with "School Admin" role badge
7. **Sidebar shows admin modules**: Students, Teachers, Classes, Attendance Reports, Finance, Reports, Settings
8. **Stats show**: Total Students (1,248), Total Teachers (78), Active Classes (45), Monthly Revenue ($84.5k)

### Scenario 4: School Admin Returning User
1. Select a school from the search modal
2. Login with `admin2` / `demo123`
3. System directly redirects to **Admin Dashboard**
4. Dashboard displays "Mrs. Administrator" with "School Admin" role badge
5. **Purple role badge** indicates admin privileges
6. **Quick actions**: Manage Students, Manage Teachers, View Reports, Finance

### Scenario 5: Teacher Returning User
1. Select a school from the search modal
2. Login with `teacher2` / `demo123`
3. System directly redirects to **Teacher Dashboard**
4. Dashboard displays "Ms. Wilson" with "Teacher" role badge
5. **Sidebar shows teacher modules**: My Classes, Attendance (marking), Assignments, Gradebook, Schedule, Resources, Settings
6. **Stats show**: My Classes (5), Total Students (142), Pending Assignments (12), Avg Class Performance (82%)
7. **Blue role badge** indicates teacher privileges
8. **Quick actions**: Mark Attendance, Create Assignment, Enter Grades, View My Classes

### Scenario 5: Application Manager Login
1. From landing page, click "Application Manager"
2. Login with `superadmin` / `admin2024`
3. System redirects to Admin Dashboard
4. Shows system-wide management interface

---

## Password Requirements (for Change Password)

When changing password for first-time users:

- **Minimum Length:** 8 characters
- **Strength Indicators:**
  - Weak (0-2): Red - Too short or simple
  - Fair (3): Orange - Basic requirements met
  - Good (4): Yellow - Multiple character types
  - Strong (5): Green - Excellent password

- **Recommended:**
  - Mix of uppercase and lowercase
  - Include numbers
  - Include special characters
  - Avoid common words

---

## Notes for Developers

### User Type Detection Logic
The system determines first-time vs returning users based on username:

```typescript
const firstTimeUsers = ['student', 'teacher', 'admin'];
const isFirstTimeLogin = firstTimeUsers.includes(username.toLowerCase());
```

### Display Name Mapping
```typescript
const userMap = {
  'student': 'John Doe',
  'student2': 'Sarah Smith',
  'teacher': 'Mr. Anderson',
  'teacher2': 'Ms. Wilson',
  'admin': 'Dr. Principal',
  'admin2': 'Mrs. Administrator',
};
```

### Role Detection
```typescript
getUserRole(username) {
  if (username.includes('admin')) return 'School Admin';
  if (username.includes('teacher')) return 'Teacher';
  if (username.includes('student')) return 'Student';
  return 'User';
}
```

---

## Production Deployment

⚠️ **Important:** Before deploying to production:

1. Remove all demo credential notices from the UI
2. Remove the credential helper boxes (desktop and mobile)
3. Implement proper authentication backend
4. Add secure password hashing
5. Implement session management
6. Add rate limiting for login attempts
7. Enable two-factor authentication (optional)
8. Set up proper user database

---

## UI Elements Showing Credentials

### Desktop
- Fixed bottom-right card with all credentials
- Organized by First-Time vs Returning users
- Color-coded (Blue for first-time, Green for returning)

### Mobile
- Below the login form
- Compact layout with background colors
- Same credential information

### To Remove for Production
Remove these sections from `SchoolLoginPage.tsx`:
- `.fixed.bottom-4.right-4` div (lines 123-173)
- `.sm:hidden` credential section (lines in the form)
