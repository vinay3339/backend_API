# MySQL Database Setup Guide - Denormalized Schema

## 📋 Quick Setup Instructions

### Step 1: Connect to MySQL

```bash
mysql -u root -p
```

Or use your MySQL credentials:
```bash
mysql -u eduportal_user -p eduportal
```

### Step 2: Create Database (if not exists)

```sql
CREATE DATABASE IF NOT EXISTS eduportal 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE eduportal;
```

### Step 3: Execute Schema File

**Option A: From MySQL Command Line**
```sql
USE eduportal;
SOURCE /path/to/mysql_denormalized_schema.sql;
```

**Option B: From Terminal**
```bash
mysql -u root -p eduportal < /database/mysql_denormalized_schema.sql
```

**Option C: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your server
3. File → Open SQL Script
4. Select `mysql_denormalized_schema.sql`
5. Execute (lightning bolt icon or Ctrl+Shift+Enter)

---

## ✅ Verification

### Check All Tables Created

```sql
USE eduportal;
SHOW TABLES;
```

**Expected Output:**
```
+-------------------------+
| Tables_in_eduportal     |
+-------------------------+
| attendance              |
| classes                 |
| exams                   |
| fee_payments            |
| fee_structures          |
| marks                   |
| schools                 |
| students                |
| subjects                |
| teachers                |
| timetables              |
| transport_routes        |
| users                   |
+-------------------------+
13 rows in set
```

### Verify Students Table Structure

```sql
DESCRIBE students;
```

### Check Indexes

```sql
SHOW INDEX FROM students;
SHOW INDEX FROM teachers;
```

### Count Tables

```sql
SELECT COUNT(*) AS total_tables 
FROM information_schema.tables 
WHERE table_schema = 'eduportal';
```

Should return: **13 tables**

---

## 📊 Tables Created

| # | Table Name | Fields | Description |
|---|------------|--------|-------------|
| 1 | `users` | 12 | User authentication & authorization |
| 2 | `schools` | 17 | School master data |
| 3 | `students` | 85+ | **All student data in one table** |
| 4 | `teachers` | 45+ | **All teacher data in one table** |
| 5 | `classes` | 18 | Class information with denormalized data |
| 6 | `exams` | 17 | Exam schedules and configuration |
| 7 | `transport_routes` | 23 | Transport routes with vehicle & driver info |
| 8 | `subjects` | 24 | Subject details with teacher info |
| 9 | `attendance` | 24 | Student attendance records |
| 10 | `marks` | 29 | Student marks/grades |
| 11 | `fee_structures` | 18 | Fee configuration |
| 12 | `fee_payments` | 26 | Fee payment transactions |
| 13 | `timetables` | 19 | Class timetables |

**Total: 300+ fields across all tables!**

---

## 🔑 Key Features of Schema

### 1. Denormalized Design
✅ No foreign key constraints  
✅ Related data stored directly in each table  
✅ Single-table queries with filters  
✅ No JOINs needed  

### 2. Comprehensive Indexes
✅ All filter fields indexed  
✅ Date fields indexed  
✅ Status fields indexed  
✅ Search fields indexed  

### 3. JSON Support
✅ Custom fields column (unlimited extension)  
✅ Complex data structures (timetables, route stops)  
✅ Flexible schema evolution  

### 4. Auto Timestamps
✅ `created_at` - automatic on insert  
✅ `updated_at` - automatic on update  

---

## 🎯 Sample Data Insert Examples

### Insert School

```sql
INSERT INTO schools (
  school_code, school_name, city, state, 
  phone, email, board, is_active
) VALUES (
  'SCH001', 'Green Valley School', 'Mumbai', 'Maharashtra',
  '022-12345678', 'info@greenvalley.edu', 'CBSE', 1
);
```

### Insert Student (with denormalized data)

```sql
INSERT INTO students (
  admission_no, first_name, last_name, full_name,
  date_of_birth, gender, email, phone,
  -- School info (denormalized)
  school_id, school_name, school_code,
  -- Class info (denormalized)
  class_id, class_name, section, class_section, academic_year,
  class_teacher_name,
  -- Status
  status, is_active
) VALUES (
  'STU2024001', 'John', 'Doe', 'John Doe',
  '2010-05-15', 'Male', 'john.doe@student.school.com', '9876543210',
  -- School (denormalized - no FK!)
  1, 'Green Valley School', 'SCH001',
  -- Class (denormalized - no FK!)
  5, 'Grade 5', 'A', 'Grade 5-A', '2024-25',
  'Mrs. Smith',
  -- Status
  'active', 1
);
```

### Insert Teacher (with denormalized data)

```sql
INSERT INTO teachers (
  employee_id, first_name, last_name, full_name,
  email, phone, designation, department,
  -- School info (denormalized)
  school_id, school_name, school_code,
  -- Professional
  subjects, experience_years, employment_type,
  -- Status
  status, is_active
) VALUES (
  'TEACH001', 'Sarah', 'Johnson', 'Sarah Johnson',
  'sarah.johnson@teacher.school.com', '9876543211',
  'Senior Teacher', 'Science',
  -- School (denormalized)
  1, 'Green Valley School', 'SCH001',
  -- Professional
  'Physics, Chemistry', 8, 'Permanent',
  -- Status
  'active', 1
);
```

### Insert User (Auto-created by API)

```sql
INSERT INTO users (
  username, email, hashed_password, role,
  school_id, school_name, is_first_login, is_active
) VALUES (
  'john.doe', 'john.doe@student.school.com',
  '$2b$12$hashedpasswordhere', 'student',
  1, 'Green Valley School', 1, 1
);
```

---

## 🔍 Sample Queries (No JOINs!)

### Get All Students in Class 5-A

```sql
SELECT * FROM students
WHERE class_id = 5 
  AND section = 'A'
  AND is_active = 1;
```

**No JOIN needed!** All class info already in students table.

### Get Students with Pending Fees

```sql
SELECT 
  id, first_name, last_name, admission_no,
  class_name, section,
  fee_pending, fee_status,
  school_name
FROM students
WHERE fee_status = 'Pending'
  AND fee_pending > 0
  AND school_id = 1;
```

**No JOIN needed!** All fee info already in students table.

### Get Students Using Transport

```sql
SELECT 
  id, first_name, last_name, admission_no,
  route_name, vehicle_number, driver_name, pickup_point
FROM students
WHERE transport_required = 1
  AND route_id = 3;
```

**No JOIN needed!** All transport info already in students table.

### Get Teachers by Department

```sql
SELECT 
  id, first_name, last_name, employee_id,
  designation, department, subjects,
  school_name, experience_years
FROM teachers
WHERE department = 'Science'
  AND school_id = 1
  AND is_active = 1;
```

### Get Attendance for Student

```sql
SELECT 
  date, status, check_in_time,
  class_name, subject_name, marked_by_name
FROM attendance
WHERE student_id = 1
  AND MONTH(date) = 12
  AND YEAR(date) = 2024
ORDER BY date DESC;
```

### Get Exam Results

```sql
SELECT 
  student_name, subject_name,
  total_marks_obtained, max_marks,
  percentage, grade, pass_status
FROM marks
WHERE exam_id = 5
  AND class_id = 10
ORDER BY percentage DESC;
```

---

## 📈 Performance Tips

### 1. Use Prepared Statements

```python
# Python example
cursor.execute(
    "SELECT * FROM students WHERE class_id = %s AND section = %s",
    (class_id, section)
)
```

### 2. Limit Results

```sql
SELECT * FROM students
WHERE school_id = 1
LIMIT 100 OFFSET 0;
```

### 3. Use Specific Columns

```sql
-- Instead of SELECT *
SELECT id, first_name, last_name, class_name, fee_status
FROM students
WHERE school_id = 1;
```

### 4. Leverage Indexes

All frequently queried fields are already indexed:
- school_id
- class_id
- fee_status
- academic_year
- date fields
- status fields

---

## 🛠️ Maintenance Queries

### Count Records

```sql
SELECT 
  (SELECT COUNT(*) FROM students) AS total_students,
  (SELECT COUNT(*) FROM teachers) AS total_teachers,
  (SELECT COUNT(*) FROM classes) AS total_classes,
  (SELECT COUNT(*) FROM users) AS total_users;
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

### Optimize Tables

```sql
OPTIMIZE TABLE students;
OPTIMIZE TABLE teachers;
OPTIMIZE TABLE attendance;
OPTIMIZE TABLE marks;
```

---

## 🔄 Backup & Restore

### Backup Entire Database

```bash
mysqldump -u root -p eduportal > eduportal_backup_$(date +%Y%m%d).sql
```

### Backup Specific Tables

```bash
mysqldump -u root -p eduportal students teachers > backup_students_teachers.sql
```

### Restore Database

```bash
mysql -u root -p eduportal < eduportal_backup_20241215.sql
```

---

## 🚨 Troubleshooting

### Error: Table already exists

**Solution:** Drop existing tables first
```sql
DROP TABLE IF EXISTS students;
-- Then run the schema again
```

Or use the schema file which already includes `DROP TABLE IF EXISTS`.

### Error: Access denied

**Solution:** Grant proper permissions
```sql
GRANT ALL PRIVILEGES ON eduportal.* TO 'eduportal_user'@'localhost';
FLUSH PRIVILEGES;
```

### Error: JSON column not supported

**Solution:** Upgrade to MySQL 5.7+ or MariaDB 10.2+
```bash
mysql --version
```

### Slow Queries

**Solution:** Check indexes
```sql
EXPLAIN SELECT * FROM students WHERE class_id = 5;
```

Add missing indexes if needed:
```sql
CREATE INDEX idx_custom ON students(column_name);
```

---

## ✅ Post-Setup Checklist

- [ ] All 13 tables created
- [ ] All indexes created
- [ ] Sample data inserted
- [ ] Test queries executed
- [ ] Backup created
- [ ] Permissions verified
- [ ] FastAPI connected successfully

---

## 📞 Support

### Common Issues

**Issue**: Can't execute schema file  
**Fix**: Check file path and MySQL permissions

**Issue**: Foreign key errors  
**Fix**: Schema has no foreign keys! Check for typos

**Issue**: Charset issues  
**Fix**: Use utf8mb4 (already set in schema)

---

## 🎉 Success Indicators

After successful setup, you should see:

✅ 13 tables created  
✅ 300+ fields across all tables  
✅ 100+ indexes created  
✅ No foreign key constraints  
✅ All queries work without JOINs  
✅ FastAPI can connect and query  

---

**Your MySQL denormalized database is ready!** 🎊

Now you can use simple filter-based queries without any JOINs!
