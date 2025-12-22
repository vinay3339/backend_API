# Role-Based Dashboard Features

## Overview
The school management system provides three distinct dashboard experiences tailored to different user roles: Students, Teachers, and School Administrators. Each role has unique sidebar navigation, dashboard statistics, and module access.

---

## 🎓 Student Role

### Dashboard Statistics
- **Attendance Rate**: Personal attendance percentage (94%)
- **Pending Homework**: Number of incomplete assignments (3)
- **Average Marks**: Overall grade performance (85%)
- **Library Books**: Number of books currently issued (2)

### Sidebar Modules
1. **Dashboard** - Overview with quick stats and recent activity
2. **Homework** - View and submit assignments
3. **Attendance** - Monthly calendar view (read-only)
4. **Marks** - View grades and academic performance
5. **Fees** - View and pay school fees
6. **Transport** - Track school bus and routes
7. **Library** - Browse and manage borrowed books
8. **Settings** - Account preferences

### Recent Activities
- Homework submissions
- Quiz scores and grades
- Attendance records
- Library book due dates

### Quick Actions
- View Attendance
- Pending Homework
- View Marks
- Library Books

### Use Cases
- Check daily attendance
- Submit homework assignments
- View grades and progress
- Pay school fees online
- Track library books
- Monitor bus location

---

## 👨‍🏫 Teacher Role

### Dashboard Statistics
- **My Classes**: Number of classes taught (5)
- **Total Students**: Students under supervision (142)
- **Pending Assignments**: Assignments to grade (12)
- **Avg Class Performance**: Overall class grades (82%)

### Sidebar Modules
1. **Dashboard** - Teacher overview with class statistics
2. **My Classes** - View and manage teaching classes
3. **Attendance** - Mark attendance for classes (read/write)
4. **Assignments** - Create, assign, and grade homework
5. **Gradebook** - Enter and manage student grades
6. **Schedule** - View teaching timetable
7. **Resources** - Access and upload teaching materials
8. **Settings** - Account preferences

### Recent Activities
- Student assignment submissions
- Completed grading tasks
- Class attendance marking
- Resource uploads

### Quick Actions
- Mark Attendance
- Create Assignment
- Enter Grades
- View My Classes

### Use Cases
- Mark daily attendance for classes
- Create and assign homework
- Grade student assignments
- Enter exam marks
- View class schedules
- Share teaching resources
- Monitor class performance

---

## 🏫 School Admin Role

### Dashboard Statistics
- **Total Students**: School enrollment (1,248)
- **Total Teachers**: Teaching staff (78)
- **Active Classes**: Number of classes (45)
- **Monthly Revenue**: Fee collection ($84.5k)

### Sidebar Modules
1. **Dashboard** - Administrative overview with school-wide stats
2. **Students** - Manage student records and enrollments
3. **Teachers** - Manage teacher profiles and assignments
4. **Classes** - Manage classes, sections, and schedules
5. **Attendance Reports** - View comprehensive attendance analytics
6. **Finance** - Manage fees, payments, and financial reports
7. **Reports** - Access detailed analytics and reports
8. **Settings** - School configuration and preferences

### Recent Activities
- New student enrollments
- Fee collection reports
- Teacher onboarding
- Attendance statistics

### Quick Actions
- Manage Students
- Manage Teachers
- View Reports
- Finance Management

### Use Cases
- Enroll new students
- Assign teachers to classes
- Monitor school-wide attendance
- Generate financial reports
- Track fee collection
- Analyze academic performance
- Configure school settings
- Manage staff records

---

## Module Comparison

| Module | Student | Teacher | Admin |
|--------|---------|---------|-------|
| **Dashboard** | Personal stats | Class stats | School-wide stats |
| **Attendance** | View only (calendar) | Mark attendance | View reports/analytics |
| **Homework/Assignments** | View & submit | Create & grade | - |
| **Marks/Gradebook** | View own | Enter for students | - |
| **Classes** | - | My Classes | All Classes Management |
| **Students** | - | - | Full Management |
| **Teachers** | - | - | Full Management |
| **Finance/Fees** | View & pay | - | Full Management |
| **Reports** | - | - | Analytics & Insights |
| **Transport** | Track bus | - | - |
| **Library** | Borrow books | - | - |
| **Resources** | - | Teaching materials | - |
| **Schedule** | - | View timetable | - |

---

## Color Coding by Role

### Role Badges
- **Student**: Green badge (`bg-green-100 text-green-700`)
- **Teacher**: Blue badge (`bg-blue-100 text-blue-700`)
- **School Admin**: Purple badge (`bg-purple-100 text-purple-700`)

### Stat Card Colors
All roles use a consistent color scheme for stats:
- **Blue**: Primary metrics (classes, attendance)
- **Green**: Success metrics (students, performance)
- **Orange**: Pending items (assignments, tasks)
- **Purple**: Special metrics (resources, classes)

---

## Navigation Patterns

### Student Navigation Flow
```
Login → Student Dashboard → Select Module → View/Submit Content
Example: Homework → View Assignment → Submit Work → Back to Dashboard
```

### Teacher Navigation Flow
```
Login → Teacher Dashboard → Select Class → Perform Action
Example: Attendance → Select Class → Mark Present/Absent → Save
```

### Admin Navigation Flow
```
Login → Admin Dashboard → Select Category → Manage Records
Example: Students → View All → Add New Student → Save Record
```

---

## Access Control

### Module Access Matrix

| Module ID | Student | Teacher | Admin |
|-----------|---------|---------|-------|
| `dashboard` | ✅ | ✅ | ✅ |
| `homework` | ✅ | ❌ | ❌ |
| `attendance` | ✅ (view) | ✅ (mark) | ✅ (reports) |
| `marks` | ✅ (view) | ❌ | ❌ |
| `fees` | ✅ | ❌ | ❌ |
| `transport` | ✅ | ❌ | ❌ |
| `library` | ✅ | ❌ | ❌ |
| `my-classes` | ❌ | ✅ | ❌ |
| `assignments` | ❌ | ✅ | ❌ |
| `gradebook` | ❌ | ✅ | ❌ |
| `schedule` | ❌ | ✅ | ❌ |
| `resources` | ❌ | ✅ | ❌ |
| `students` | ❌ | ❌ | ✅ |
| `teachers` | ❌ | ❌ | ✅ |
| `classes` | ❌ | ❌ | ✅ |
| `attendance-reports` | ❌ | ❌ | ✅ |
| `finance` | ❌ | ❌ | ✅ |
| `reports` | ❌ | ❌ | ✅ |
| `settings` | ✅ | ✅ | ✅ |

---

## Testing Different Roles

### Test Student Experience
1. Login with `student2` / `demo123`
2. See student-specific dashboard with personal stats
3. Navigate to Attendance to view monthly calendar
4. Click on Homework to see assignments
5. Check sidebar for student-specific modules

### Test Teacher Experience
1. Login with `teacher2` / `demo123`
2. See teacher dashboard with class statistics
3. Navigate to My Classes to view teaching schedule
4. Click on Attendance to mark student attendance
5. Check sidebar for teacher-specific modules

### Test Admin Experience
1. Login with `admin2` / `demo123`
2. See admin dashboard with school-wide metrics
3. Navigate to Students for enrollment management
4. Click on Reports for analytics
5. Check sidebar for admin-specific modules

---

## Implementation Details

### Role Detection
```typescript
const getUserRole = (username: string): string => {
  const lowerUsername = username.toLowerCase();
  if (lowerUsername.includes('admin')) return 'School Admin';
  if (lowerUsername.includes('teacher')) return 'Teacher';
  if (lowerUsername.includes('student')) return 'Student';
  return 'User';
};
```

### Menu Items Selection
```typescript
const getMenuItems = (userRole: string) => {
  if (userRole.includes('Admin')) return adminMenuItems;
  if (userRole.includes('Teacher')) return teacherMenuItems;
  return studentMenuItems;
};
```

### Dashboard Rendering
```typescript
if (isAdmin) {
  return <AdminDashboardOverview />;
} else if (isTeacher) {
  return <TeacherDashboardOverview />;
}
return <StudentDashboardOverview />;
```

---

## Future Enhancements

### Student Role
- Real-time homework submission
- Grade analytics and trends
- Peer discussion forums
- Study material downloads

### Teacher Role
- Automated grading
- Class performance analytics
- Parent communication portal
- Lesson plan management

### Admin Role
- Bulk operations (enrollment, etc.)
- Advanced reporting dashboards
- Staff performance metrics
- Budget planning tools

---

## Responsive Behavior

All three role dashboards are fully responsive:

- **Desktop**: Full sidebar with icons and labels
- **Tablet**: Collapsible sidebar
- **Mobile**: Bottom navigation bar (first 5 items) + hamburger menu for full access

Each role maintains consistent navigation patterns across devices while adapting to screen size.
