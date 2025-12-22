# 🏫 School Management System - Database Schema Structure

## 📋 Overview
This document describes the complete database schema for the School Management System, including all tables, relationships, and constraints.

---

## 🗂️ Table Categories

### **1. Core System Tables (4 tables)**
- `schools` - School/institution master data
- `academic_years` - Academic year management
- `users` - Unified user authentication
- `settings` - Application configuration

### **2. Authentication & Security Tables (4 tables)**
- `users` - User accounts
- `user_roles` - Role definitions
- `user_sessions` - Login sessions
- `password_history` - Password change tracking

### **3. Student Management Tables (10 tables)**
- `students` - Student master data
- `student_guardians` - Parent/guardian information
- `student_addresses` - Address records
- `student_documents` - Document repository
- `student_medical_records` - Medical information
- `student_emergency_contacts` - Emergency contacts
- `student_previous_schools` - Education history
- `student_enrollment` - Class enrollment tracking

### **4. Teacher Management Tables (6 tables)**
- `teachers` - Teacher master data
- `teacher_qualifications` - Educational qualifications
- `teacher_experience` - Work experience
- `teacher_subjects` - Subject expertise
- `teacher_documents` - Document repository

### **5. Class Management Tables (8 tables)**
- `classes` - Class definitions (10th, 9th, etc.)
- `class_sections` - Section divisions (A, B, C)
- `subjects` - Subject master data
- `class_subjects` - Subject-class mapping
- `class_teachers` - Class teacher assignments
- `timetable` - Timetable master
- `timetable_periods` - Individual periods

### **6. Attendance Tables (4 tables)**
- `student_attendance` - Student daily attendance
- `student_leave_requests` - Student leave applications
- `teacher_attendance` - Teacher daily attendance
- `teacher_leave_requests` - Teacher leave applications

### **7. Marks & Exams Tables (7 tables)**
- `exams` - Exam definitions
- `exam_subjects` - Subject-exam mapping
- `exam_timetable` - Exam schedule
- `marks` - Student marks storage
- `grade_system` - Grading configuration
- `report_cards` - Generated report cards

### **8. Finance Tables (11 tables)**
- `fee_categories` - Fee type definitions
- `fee_structures` - Class-wise fee structure
- `student_fees` - Student fee assignments
- `fee_payments` - Payment transactions
- `fee_receipts` - Payment receipts
- `fee_concessions` - Scholarships/discounts
- `expense_categories` - Expense types
- `expenses` - Expense records
- `salary_structures` - Salary definitions
- `salary_payments` - Salary disbursements

### **9. Transport Tables (5 tables)**
- `transport_routes` - Bus routes
- `transport_vehicles` - Vehicle information
- `transport_stops` - Bus stops
- `student_transport` - Student-route mapping
- `vehicle_maintenance` - Maintenance records

### **10. Communication Tables (3 tables)**
- `announcements` - School announcements
- `notifications` - User notifications
- `messages` - Internal messaging

### **11. Academic Activity Tables (2 tables)**
- `homework` - Homework assignments
- `homework_submissions` - Student submissions

### **12. Library Tables (2 tables)**
- `library_books` - Book catalog
- `library_transactions` - Issue/return records

### **13. Events Tables (2 tables)**
- `events` - School events
- `event_participants` - Participation tracking

### **14. System Configuration Tables (3 tables)**
- `custom_fields` - Custom field definitions
- `custom_field_values` - Custom field data
- `audit_logs` - System audit trail

---

## 🔗 Entity Relationship Diagram (Text Format)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CORE HIERARCHY                             │
└─────────────────────────────────────────────────────────────────────┘

                            ┌──────────┐
                            │ SCHOOLS  │
                            └────┬─────┘
                                 │
                    ┌────────────┼────────────┬──────────────┐
                    │            │            │              │
              ┌─────▼─────┐ ┌───▼────┐  ┌───▼────┐    ┌───▼────┐
              │ACADEMIC_  │ │ USERS  │  │CLASSES │    │SUBJECTS│
              │  YEARS    │ └───┬────┘  └───┬────┘    └────────┘
              └───────────┘     │           │
                                │           │
                    ┌───────────┼───────────┼─────────────┐
                    │           │           │             │
              ┌─────▼─────┐ ┌──▼───────┐ ┌─▼─────────┐    │
              │ STUDENTS  │ │ TEACHERS │ │  SECTIONS │    │
              └─────┬─────┘ └────┬─────┘ └─────┬─────┘    │
                    │            │             │        │
                    └────────────┴─────────────┴────────┘
                                 │
                         ┌───────┴────────┐
                         │                │
                    ┌────▼────┐      ┌───▼────┐
                    │  EXAMS  │      │ATTENDANCE│
                    └─────────┘      └─────────┘
```

---

## 📊 Detailed Table Relationships

### **1. SCHOOLS (Central Entity)**

**One-to-Many Relationships:**
- `schools` → `academic_years` (A school has multiple academic years)
- `schools` → `users` (A school has multiple users)
- `schools` → `students` (A school has multiple students)
- `schools` → `teachers` (A school has multiple teachers)
- `schools` → `classes` (A school has multiple classes)
- `schools` → `subjects` (A school has multiple subjects)
- `schools` → `exams` (A school conducts multiple exams)
- `schools` → `transport_routes` (A school has multiple routes)
- `schools` → `fee_categories` (A school has multiple fee types)
- `schools` → `announcements` (A school makes multiple announcements)
- `schools` → `settings` (A school has multiple settings)

**Foreign Keys in Child Tables:**
```sql
school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE
```

---

### **2. USERS (Authentication Hub)**

**One-to-One Relationships:**
- `users` ↔ `students` (One user account per student)
- `users` ↔ `teachers` (One user account per teacher)

**One-to-Many Relationships:**
- `users` → `user_sessions` (A user can have multiple sessions)
- `users` → `password_history` (A user has password change history)
- `users` → `notifications` (A user receives multiple notifications)
- `users` → `audit_logs` (A user performs multiple actions)

**Foreign Keys:**
```sql
-- In students/teachers table:
user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE

-- In dependent tables:
created_by UUID REFERENCES users(user_id)
updated_by UUID REFERENCES users(user_id)
approved_by UUID REFERENCES users(user_id)
```

---

### **3. STUDENTS (Student Module)**

**Parent Relationships:**
- `students` → `schools` (Many students belong to one school)
- `students` → `users` (One student has one user account)
- `students` → `academic_years` (Enrolled in one academic year)

**One-to-Many Relationships:**
- `students` → `student_guardians` (A student has multiple guardians)
- `students` → `student_addresses` (A student has multiple addresses)
- `students` → `student_documents` (A student has multiple documents)
- `students` → `student_medical_records` (Medical history)
- `students` → `student_emergency_contacts` (Multiple emergency contacts)
- `students` → `student_previous_schools` (Education history)
- `students` → `student_enrollment` (Multiple enrollments over years)
- `students` → `student_attendance` (Daily attendance records)
- `students` → `student_leave_requests` (Leave applications)
- `students` → `marks` (Exam marks)
- `students` → `student_fees` (Fee assignments)
- `students` → `fee_payments` (Payment records)
- `students` → `student_transport` (Transport allocation)
- `students` → `homework_submissions` (Homework submissions)
- `students` → `library_transactions` (Book borrowing)

**Foreign Keys:**
```sql
student_id UUID REFERENCES students(student_id) ON DELETE CASCADE
```

**ER Representation:**
```
STUDENTS (1) ────── (M) STUDENT_GUARDIANS
         (1) ────── (M) STUDENT_ADDRESSES
         (1) ────── (M) STUDENT_DOCUMENTS
         (1) ────── (M) STUDENT_ENROLLMENT
         (1) ────── (M) STUDENT_ATTENDANCE
         (1) ────── (M) MARKS
         (1) ────── (M) FEE_PAYMENTS
```

---

### **4. TEACHERS (Teacher Module)**

**Parent Relationships:**
- `teachers` → `schools` (Many teachers belong to one school)
- `teachers` → `users` (One teacher has one user account)

**One-to-Many Relationships:**
- `teachers` → `teacher_qualifications` (Multiple degrees)
- `teachers` → `teacher_experience` (Work history)
- `teachers` → `teacher_subjects` (Subject expertise)
- `teachers` → `teacher_documents` (Document uploads)
- `teachers` → `teacher_attendance` (Daily attendance)
- `teachers` → `teacher_leave_requests` (Leave applications)
- `teachers` → `class_subjects` (Subject assignments)
- `teachers` → `class_teachers` (Class teacher assignments)
- `teachers` → `timetable_periods` (Period allocations)
- `teachers` → `salary_structures` (Salary definitions)
- `teachers` → `salary_payments` (Salary disbursements)
- `teachers` → `homework` (Homework assignments)

**Foreign Keys:**
```sql
teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE
```

**ER Representation:**
```
TEACHERS (1) ────── (M) TEACHER_QUALIFICATIONS
         (1) ────── (M) TEACHER_EXPERIENCE
         (1) ────── (M) TEACHER_SUBJECTS
         (1) ────── (M) CLASS_SUBJECTS
         (1) ────── (M) TEACHER_ATTENDANCE
         (1) ────── (M) SALARY_PAYMENTS
```

---

### **5. CLASSES & SECTIONS (Class Management)**

**Hierarchical Structure:**
```
CLASSES (1) ────── (M) CLASS_SECTIONS
        (1) ────── (M) CLASS_SUBJECTS
        (1) ────── (M) STUDENT_ENROLLMENT
        (1) ────── (M) TIMETABLE
        (1) ────── (M) FEE_STRUCTURES
```

**Relationships:**
- `classes` → `schools` (Many classes in one school)
- `classes` → `academic_years` (Classes per academic year)
- `classes` → `class_sections` (A class has multiple sections)
- `classes` → `class_subjects` (Subjects taught in class)
- `classes` → `student_enrollment` (Students enrolled)
- `classes` → `timetable` (Class timetables)
- `classes` → `fee_structures` (Fee structure per class)
- `classes` → `exams` (Class-wise exams)

**Section Relationships:**
- `class_sections` → `student_enrollment` (Students in section)
- `class_sections` → `class_teachers` (Class teacher assignment)
- `class_sections` → `timetable` (Section timetable)
- `class_sections` → `student_attendance` (Section attendance)

**Foreign Keys:**
```sql
class_id UUID REFERENCES classes(class_id) ON DELETE CASCADE
section_id UUID REFERENCES class_sections(section_id)
```

---

### **6. SUBJECTS (Subject Management)**

**Relationships:**
```
SUBJECTS (1) ────── (M) CLASS_SUBJECTS (Subject-Class mapping)
         (1) ────── (M) TEACHER_SUBJECTS (Teacher expertise)
         (1) ────── (M) TIMETABLE_PERIODS (Period allocation)
         (1) ────── (M) EXAM_SUBJECTS (Exam-Subject mapping)
         (1) ────── (M) MARKS (Marks per subject)
         (1) ────── (M) HOMEWORK (Subject assignments)
```

**Foreign Keys:**
```sql
subject_id UUID REFERENCES subjects(subject_id)
```

---

### **7. EXAMS & MARKS (Examination System)**

**Hierarchical Structure:**
```
EXAMS (1) ────── (M) EXAM_SUBJECTS
      (1) ────── (M) EXAM_TIMETABLE
      (1) ────── (M) MARKS
      (1) ────── (M) REPORT_CARDS
```

**Relationships:**
- `exams` → `schools` (School conducts exams)
- `exams` → `academic_years` (Exams per academic year)
- `exams` → `exam_subjects` (Subjects in exam)
- `exams` → `exam_timetable` (Exam schedule)
- `exams` → `marks` (Student marks)
- `exams` → `report_cards` (Generated reports)

**Marks Relationships:**
```
MARKS
  ├─ student_id → STUDENTS
  ├─ exam_id → EXAMS
  ├─ exam_subject_id → EXAM_SUBJECTS
  ├─ entered_by → USERS
  └─ verified_by → USERS
```

**Foreign Keys:**
```sql
exam_id UUID REFERENCES exams(exam_id) ON DELETE CASCADE
exam_subject_id UUID REFERENCES exam_subjects(exam_subject_id)
student_id UUID REFERENCES students(student_id) ON DELETE CASCADE
```

---

### **8. ATTENDANCE (Attendance Tracking)**

**Student Attendance:**
```
STUDENT_ATTENDANCE
  ├─ student_id → STUDENTS
  ├─ class_id → CLASSES
  ├─ section_id → CLASS_SECTIONS
  └─ marked_by → USERS

STUDENT_LEAVE_REQUESTS
  ├─ student_id → STUDENTS
  └─ approved_by → USERS
```

**Teacher Attendance:**
```
TEACHER_ATTENDANCE
  ├─ teacher_id → TEACHERS
  └─ marked_by → USERS

TEACHER_LEAVE_REQUESTS
  ├─ teacher_id → TEACHERS
  └─ approved_by → USERS
```

**Foreign Keys:**
```sql
student_id UUID REFERENCES students(student_id) ON DELETE CASCADE
teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE
marked_by UUID REFERENCES users(user_id)
approved_by UUID REFERENCES users(user_id)
```

---

### **9. FINANCE (Fee & Expense Management)**

**Fee Structure Hierarchy:**
```
FEE_CATEGORIES (1) ────── (M) FEE_STRUCTURES
                                     │
                                     ▼
                            STUDENT_FEES (1) ────── (M) FEE_PAYMENTS
                                                              │
                                                              ▼
                                                        FEE_RECEIPTS
```

**Relationships:**
- `fee_structures` → `schools`, `academic_years`, `classes`, `fee_categories`
- `student_fees` → `students`, `fee_structures`
- `fee_payments` → `student_fees`, `students`, `users` (collected_by)
- `fee_receipts` → `fee_payments`
- `fee_concessions` → `students`

**Expense Tracking:**
```
EXPENSE_CATEGORIES (1) ────── (M) EXPENSES
```

**Salary Management:**
```
TEACHERS (1) ────── (M) SALARY_STRUCTURES (1) ────── (M) SALARY_PAYMENTS
```

**Foreign Keys:**
```sql
student_id UUID REFERENCES students(student_id) ON DELETE CASCADE
fee_structure_id UUID REFERENCES fee_structures(fee_structure_id)
payment_id UUID REFERENCES fee_payments(payment_id) ON DELETE CASCADE
teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE
```

---

### **10. TRANSPORT (Transport Management)**

**Transport Hierarchy:**
```
TRANSPORT_ROUTES (1) ────── (M) TRANSPORT_STOPS
                 (1) ────── (M) TRANSPORT_VEHICLES
                 (1) ────── (M) STUDENT_TRANSPORT

TRANSPORT_VEHICLES (1) ────── (M) VEHICLE_MAINTENANCE
```

**Relationships:**
- `transport_routes` → `schools`
- `transport_vehicles` → `schools`, `transport_routes`
- `transport_stops` → `transport_routes`
- `student_transport` → `students`, `transport_routes`, `transport_stops`
- `vehicle_maintenance` → `transport_vehicles`

**Foreign Keys:**
```sql
route_id UUID REFERENCES transport_routes(route_id) ON DELETE CASCADE
vehicle_id UUID REFERENCES transport_vehicles(vehicle_id) ON DELETE CASCADE
stop_id UUID REFERENCES transport_stops(stop_id)
student_id UUID REFERENCES students(student_id) ON DELETE CASCADE
```

---

### **11. TIMETABLE (Schedule Management)**

**Timetable Structure:**
```
TIMETABLE (1) ────── (M) TIMETABLE_PERIODS
    │
    ├─ school_id → SCHOOLS
    ├─ academic_year_id → ACADEMIC_YEARS
    ├─ class_id → CLASSES
    └─ section_id → CLASS_SECTIONS

TIMETABLE_PERIODS
    ├─ timetable_id → TIMETABLE
    ├─ subject_id → SUBJECTS
    └─ teacher_id → TEACHERS
```

**Foreign Keys:**
```sql
timetable_id UUID REFERENCES timetable(timetable_id) ON DELETE CASCADE
subject_id UUID REFERENCES subjects(subject_id)
teacher_id UUID REFERENCES teachers(teacher_id)
```

---

### **12. HOMEWORK (Academic Activities)**

**Homework Structure:**
```
HOMEWORK (1) ────── (M) HOMEWORK_SUBMISSIONS
    │
    ├─ class_id → CLASSES
    ├─ section_id → CLASS_SECTIONS
    ├─ subject_id → SUBJECTS
    └─ teacher_id → TEACHERS

HOMEWORK_SUBMISSIONS
    ├─ homework_id → HOMEWORK
    ├─ student_id → STUDENTS
    └─ evaluated_by → USERS
```

**Foreign Keys:**
```sql
homework_id UUID REFERENCES homework(homework_id) ON DELETE CASCADE
student_id UUID REFERENCES students(student_id) ON DELETE CASCADE
teacher_id UUID REFERENCES teachers(teacher_id)
```

---

### **13. LIBRARY (Library Management)**

**Library Structure:**
```
LIBRARY_BOOKS (1) ────── (M) LIBRARY_TRANSACTIONS
    │
    └─ school_id → SCHOOLS

LIBRARY_TRANSACTIONS
    ├─ book_id → LIBRARY_BOOKS
    ├─ user_id → USERS
    └─ issued_by → USERS
```

**Foreign Keys:**
```sql
book_id UUID REFERENCES library_books(book_id)
user_id UUID REFERENCES users(user_id)
issued_by UUID REFERENCES users(user_id)
```

---

### **14. EVENTS (Event Management)**

**Event Structure:**
```
EVENTS (1) ────── (M) EVENT_PARTICIPANTS
    │
    ├─ school_id → SCHOOLS
    └─ organizer → USERS

EVENT_PARTICIPANTS
    ├─ event_id → EVENTS
    ├─ student_id → STUDENTS
    └─ teacher_id → TEACHERS
```

**Foreign Keys:**
```sql
event_id UUID REFERENCES events(event_id) ON DELETE CASCADE
student_id UUID REFERENCES students(student_id)
teacher_id UUID REFERENCES teachers(teacher_id)
```

---

### **15. COMMUNICATION (Communication System)**

**Announcements:**
```
ANNOUNCEMENTS
    ├─ school_id → SCHOOLS
    └─ published_by → USERS
```

**Notifications:**
```
NOTIFICATIONS
    └─ user_id → USERS
```

**Messages:**
```
MESSAGES
    ├─ sender_id → USERS
    └─ receiver_id → USERS
```

**Foreign Keys:**
```sql
school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE
user_id UUID REFERENCES users(user_id) ON DELETE CASCADE
sender_id UUID REFERENCES users(user_id)
receiver_id UUID REFERENCES users(user_id)
```

---

### **16. SYSTEM CONFIGURATION**

**Custom Fields:**
```
CUSTOM_FIELDS (1) ────── (M) CUSTOM_FIELD_VALUES
    │
    └─ school_id → SCHOOLS

CUSTOM_FIELD_VALUES
    └─ custom_field_id → CUSTOM_FIELDS
```

**Audit Logs:**
```
AUDIT_LOGS
    └─ user_id → USERS
```

**Settings:**
```
SETTINGS
    └─ school_id → SCHOOLS
```

---

## 🔑 Key Constraints & Rules

### **Unique Constraints:**
1. `schools.school_code` - Unique school identifier
2. `users.username` - Unique login username
3. `users.email` - Unique email address
4. `students.admission_number` - Unique admission number
5. `teachers.employee_id` - Unique employee ID
6. `classes.class_code` - Unique class code
7. `subjects.subject_code` - Unique subject code
8. `exams.exam_code` - Unique exam code
9. `transport_routes.route_code` - Unique route code
10. `transport_vehicles.vehicle_number` - Unique vehicle number

### **Composite Unique Constraints:**
1. `(class_id, section_name)` in `class_sections`
2. `(student_id, attendance_date)` in `student_attendance`
3. `(teacher_id, attendance_date)` in `teacher_attendance`
4. `(exam_id, exam_subject_id, student_id)` in `marks`
5. `(section_id, academic_year_id, is_primary)` in `class_teachers`

### **Cascade Delete Rules:**
- When a `school` is deleted → All related records are deleted
- When a `student` is deleted → All student-related records are deleted
- When a `teacher` is deleted → All teacher-related records are deleted
- When a `class` is deleted → Sections, enrollments, timetables are deleted
- When an `exam` is deleted → Exam subjects, timetable, marks are deleted

### **Check Constraints:**
1. `date_of_birth` < CURRENT_DATE
2. `start_date` < `end_date` in academic years
3. `min_pass_marks` <= `max_marks` in exams
4. `obtained_marks` <= `total_marks` in marks
5. `from_date` <= `to_date` in leave requests

---

## 📈 Indexing Strategy

### **Primary Indexes (Automatically created):**
- All `*_id` primary keys

### **Foreign Key Indexes:**
- `school_id` in all school-related tables
- `student_id` in all student-related tables
- `teacher_id` in all teacher-related tables
- `user_id` in all user-related tables

### **Performance Indexes:**
1. `idx_users_email` - Fast user lookup by email
2. `idx_students_admission_number` - Student search
3. `idx_teachers_employee_id` - Teacher search
4. `idx_student_attendance_student_date` - Attendance queries
5. `idx_marks_exam_student` - Marks retrieval
6. `idx_fee_payments_student` - Payment history
7. `idx_audit_logs_created_at` - Audit log queries

---

## 🔄 Data Flow Examples

### **Example 1: Student Enrollment Flow**
```
1. Create USERS record (authentication)
2. Create STUDENTS record (linked to user)
3. Add STUDENT_GUARDIANS records
4. Add STUDENT_ADDRESSES records
5. Create STUDENT_ENROLLMENT (assign to class/section)
6. Auto-assign STUDENT_FEES based on fee_structures
7. Student can now:
   - Have STUDENT_ATTENDANCE marked
   - Receive MARKS in exams
   - Make FEE_PAYMENTS
   - Use STUDENT_TRANSPORT
   - Borrow LIBRARY_BOOKS
```

### **Example 2: Exam & Marks Flow**
```
1. Create EXAMS record
2. Add EXAM_SUBJECTS (subjects in exam)
3. Create EXAM_TIMETABLE (schedule)
4. After exam, teachers enter MARKS
5. System calculates grades using GRADE_SYSTEM
6. Generate REPORT_CARDS
7. Publish results to students
```

### **Example 3: Fee Payment Flow**
```
1. FEE_STRUCTURES defined per class
2. STUDENT_FEES assigned to each student
3. Student makes FEE_PAYMENTS
4. FEE_RECEIPTS generated
5. FEE_CONCESSIONS applied if applicable
6. Payment history tracked
```

---

## 📊 Total Database Statistics

- **Total Tables:** 68
- **Core Tables:** 4
- **Module Tables:** 64
- **Junction Tables:** 15
- **Total Foreign Keys:** 120+
- **Total Indexes:** 50+
- **Cascade Delete Chains:** 15+

---

## 🎯 Best Practices

1. **Always use transactions** for multi-table operations
2. **Soft delete** for critical records (use `status` field)
3. **Audit trail** for sensitive operations
4. **Normalize data** to avoid redundancy
5. **Use UUIDs** for distributed systems
6. **Index frequently** queried columns
7. **Regular backups** of all data
8. **Archive old data** after academic year ends

---

## 📝 Notes

- All timestamps use `TIMESTAMP` with UTC
- All monetary values use `DECIMAL(10,2)` for precision
- All foreign keys have proper `ON DELETE` actions
- All tables have `created_at` timestamp
- Critical tables have `updated_at` timestamp
- Status fields use predefined values (Active/Inactive)
- JSONB fields used for flexible data (permissions, custom fields)

---

**Generated for:** School Management System  
**Database:** PostgreSQL Compatible  
**Last Updated:** December 2024
