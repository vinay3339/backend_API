# 🗄️ MySQL Denormalized Database Schema

## 📋 Quick Start

### Execute Schema

```bash
mysql -u root -p eduportal < mysql_denormalized_schema.sql
```

### Verify Installation

```sql
USE eduportal;
SHOW TABLES;
-- Should show 13 tables
```

---

## 📊 Database Overview

### Tables Created: 13

| Table | Fields | Purpose |
|-------|--------|---------|
| `users` | 12 | Authentication & authorization |
| `schools` | 17 | School master data |
| **`students`** | **85+** | **All student data (denormalized)** |
| **`teachers`** | **45+** | **All teacher data (denormalized)** |
| `classes` | 18 | Class information |
| `exams` | 17 | Exam schedules |
| `transport_routes` | 23 | Transport management |
| `subjects` | 24 | Subject details |
| `attendance` | 24 | Attendance records |
| `marks` | 29 | Student grades/marks |
| `fee_structures` | 18 | Fee configuration |
| `fee_payments` | 26 | Payment transactions |
| `timetables` | 19 | Class schedules |

**Total: 300+ fields**

---

## 🎯 Key Features

### ✅ Denormalized Architecture
- No foreign key constraints
- All related data stored directly in tables
- Single-table queries with filters
- **NO JOINs needed!**

### ✅ Comprehensive Indexing
- 100+ indexes across all tables
- All filter fields indexed
- Fast query performance

### ✅ JSON Support
- Custom fields for unlimited extension
- Complex data structures (timetables, routes)
- Flexible schema evolution

### ✅ Auto Timestamps
- `created_at` - automatic on insert
- `updated_at` - automatic on update

---

## 🚀 Example Usage

### Create Student (with auto user creation)

```sql
-- 1. Insert student (all denormalized data in ONE table)
INSERT INTO students (
  admission_no, first_name, last_name, full_name,
  school_id, school_name, school_code,
  class_id, class_name, section, class_section,
  class_teacher_name, academic_year,
  status, is_active
) VALUES (
  'STU2024001', 'John', 'Doe', 'John Doe',
  1, 'ABC School', 'SCH001',
  5, 'Grade 5', 'A', 'Grade 5-A',
  'Mrs. Smith', '2024-25',
  'active', 1
);

-- 2. User is auto-created by API with:
--    username: john.doe
--    password: john@123
--    role: student
```

### Query Students (NO JOIN!)

```sql
-- Get all students in class with school & teacher info
SELECT 
  id, first_name, last_name, admission_no,
  school_name,  -- Already in table!
  class_name, section,  -- Already in table!
  class_teacher_name,  -- Already in table!
  fee_status, fee_pending  -- Already in table!
FROM students
WHERE class_id = 5 
  AND section = 'A'
  AND school_id = 1;

-- NO JOINS NEEDED! All data in one table!
```

---

## 📁 Files in This Directory

| File | Description |
|------|-------------|
| `mysql_denormalized_schema.sql` | Complete MySQL schema (execute this) |
| `MYSQL_SETUP_GUIDE.md` | Detailed setup instructions |
| `SCHEMA_OVERVIEW.md` | Visual schema documentation |
| `README.md` | This file |

---

## 🔑 Auto User Creation

When you create a student or teacher via the API:

**Student:**
- ✅ User account auto-created
- ✅ Username: `firstname.lastname`
- ✅ Password: `firstname@123` (hashed)
- ✅ Role: `student`

**Teacher:**
- ✅ User account auto-created
- ✅ Username: `firstname.lastname`
- ✅ Password: `firstname@123` (hashed)
- ✅ Role: `teacher`

---

## 🎨 Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│              DENORMALIZED TABLES                 │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ students │  │ teachers │  │ classes  │      │
│  │  (85+)   │  │  (45+)   │  │  (18)    │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  All school, class, teacher data                │
│  duplicated in each table!                      │
│  NO foreign keys, NO JOINs needed!              │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │attendance│  │  marks   │  │   fees   │      │
│  │  (24)    │  │  (29)    │  │  (26)    │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  All student, exam, subject data                │
│  duplicated in each table!                      │
│  Filter-based queries only!                     │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 💡 Query Examples

### Students with Pending Fees

```sql
SELECT 
  first_name, last_name, admission_no,
  class_name, section,
  fee_pending, fee_status,
  school_name
FROM students
WHERE fee_status IN ('Pending', 'Overdue')
  AND fee_pending > 0
  AND school_id = 1
ORDER BY fee_pending DESC;
```

### Students Using Transport

```sql
SELECT 
  first_name, last_name,
  route_name, vehicle_number,
  driver_name, pickup_point
FROM students
WHERE transport_required = 1
  AND route_id = 3;
```

### Teachers by Department

```sql
SELECT 
  first_name, last_name, employee_id,
  designation, subjects,
  school_name
FROM teachers
WHERE department = 'Science'
  AND is_active = 1;
```

### Student Attendance

```sql
SELECT 
  date, status, check_in_time,
  student_name, class_name,
  marked_by_name
FROM attendance
WHERE student_id = 1
  AND MONTH(date) = 12
  AND YEAR(date) = 2024
ORDER BY date DESC;
```

### Exam Results

```sql
SELECT 
  student_name, subject_name,
  total_marks_obtained, max_marks,
  percentage, grade
FROM marks
WHERE exam_id = 5
  AND class_id = 10
  AND pass_status = 'Pass'
ORDER BY percentage DESC
LIMIT 10;
```

---

## ⚙️ Configuration

### MySQL Requirements

- MySQL 5.7+ or MariaDB 10.2+
- JSON support required
- UTF-8 MB4 charset

### Recommended Settings

```ini
[mysqld]
max_allowed_packet = 64M
innodb_buffer_pool_size = 1G
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```

---

## 🔧 Maintenance

### Optimize Tables

```sql
OPTIMIZE TABLE students;
OPTIMIZE TABLE teachers;
OPTIMIZE TABLE attendance;
OPTIMIZE TABLE marks;
```

### Check Table Sizes

```sql
SELECT 
  table_name,
  ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.tables
WHERE table_schema = 'eduportal'
ORDER BY (data_length + index_length) DESC;
```

### Backup Database

```bash
mysqldump -u root -p eduportal > eduportal_backup.sql
```

---

## 📈 Performance Tips

### 1. Use Indexes (Already Created)
All frequently queried fields are indexed

### 2. Limit Result Sets
```sql
SELECT * FROM students LIMIT 100 OFFSET 0;
```

### 3. Use Specific Columns
```sql
-- Good
SELECT id, first_name, last_name FROM students;

-- Avoid
SELECT * FROM students;
```

### 4. Leverage Denormalization
```sql
-- Single query, no JOIN
SELECT * FROM students WHERE school_name = 'ABC School';
```

---

## 🚨 Important Notes

### ⚠️ No Foreign Keys
This schema intentionally has **NO foreign key constraints** to maintain the denormalized architecture. This is by design!

### ⚠️ Data Duplication
School names, class names, etc. are duplicated across tables. This is intentional for performance.

### ⚠️ Update Consistency
When updating school name, you'll need to update all related tables. Use the API which handles this automatically.

---

## ✅ Verification Checklist

After setup:

- [ ] All 13 tables created
- [ ] Can query students table
- [ ] Can query teachers table
- [ ] All indexes created
- [ ] JSON columns working
- [ ] Timestamps auto-updating
- [ ] FastAPI can connect

---

## 📞 Troubleshooting

### "Table already exists"
```sql
DROP TABLE IF EXISTS students;
-- Then run schema again
```

### "Access denied"
```sql
GRANT ALL PRIVILEGES ON eduportal.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

### "JSON not supported"
Upgrade to MySQL 5.7+ or MariaDB 10.2+

---

## 🎉 Success!

After successful setup:

✅ 13 tables with 300+ fields  
✅ 100+ indexes for fast queries  
✅ 0 foreign keys (by design)  
✅ Complete denormalized architecture  
✅ Ready for API integration  
✅ Filter-based queries only - NO JOINs!  

---

## 📚 Related Documentation

- **Setup Guide**: `MYSQL_SETUP_GUIDE.md`
- **Schema Overview**: `SCHEMA_OVERVIEW.md`
- **API Documentation**: `/AUTO_USER_CREATION_GUIDE.md`
- **Complete Guide**: `/COMPLETE_DENORMALIZED_ALL_ENTITIES.md`

---

**Your MySQL denormalized database is ready!** 🎊

Execute the schema file and start using filter-based queries without any JOINs!
