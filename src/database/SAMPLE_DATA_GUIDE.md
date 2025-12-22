# 📊 Sample Data Guide - Complete Reference

## 🎯 Quick Start

### Execute Sample Data

```bash
# After creating schema, load sample data
mysql -u root -p eduportal < mysql_sample_data.sql
```

### Verify Data Loaded

```sql
USE eduportal;

SELECT 
    (SELECT COUNT(*) FROM schools) AS schools,
    (SELECT COUNT(*) FROM users) AS users,
    (SELECT COUNT(*) FROM students) AS students,
    (SELECT COUNT(*) FROM teachers) AS teachers,
    (SELECT COUNT(*) FROM classes) AS classes,
    (SELECT COUNT(*) FROM attendance) AS attendance,
    (SELECT COUNT(*) FROM marks) AS marks,
    (SELECT COUNT(*) FROM fee_payments) AS fee_payments;
```

---

## 📋 Complete Sample Data Summary

### 1️⃣ Schools (3)

| ID | Code | School Name | City | Board | Principal |
|----|------|-------------|------|-------|-----------|
| 1 | SCH001 | Green Valley International School | Mumbai | CBSE | Dr. Ramesh Kumar |
| 2 | SCH002 | Sunrise Public School | Bangalore | ICSE | Mrs. Priya Sharma |
| 3 | SCH003 | St. Mary's Convent School | Kolkata | CBSE | Sister Angela |

---

### 2️⃣ Users (25)

#### Super Admin (1)
| Username | Email | Password | Role |
|----------|-------|----------|------|
| superadmin | admin@eduportal.com | `password` | super_admin |

#### School Admins (3)
| Username | Email | School | Role |
|----------|-------|--------|------|
| admin.greenvalley | admin@greenvalley.edu.in | Green Valley | school_admin |
| admin.sunrise | admin@sunriseschool.edu.in | Sunrise | school_admin |
| admin.stmarys | admin@stmarys.edu.in | St. Mary's | school_admin |

#### Teachers (10) - Auto-created format
| Username | Email | School | Role | Default Password |
|----------|-------|--------|------|------------------|
| sarah.johnson | sarah.johnson@greenvalley.edu.in | Green Valley | teacher | `sarah@123` |
| michael.brown | michael.brown@greenvalley.edu.in | Green Valley | teacher | `michael@123` |
| emily.davis | emily.davis@greenvalley.edu.in | Green Valley | teacher | `emily@123` |
| patricia.rodriguez | patricia.rodriguez@greenvalley.edu.in | Green Valley | teacher | `patricia@123` |
| david.wilson | david.wilson@sunriseschool.edu.in | Sunrise | teacher | `david@123` |
| lisa.anderson | lisa.anderson@sunriseschool.edu.in | Sunrise | teacher | `lisa@123` |
| robert.taylor | robert.taylor@sunriseschool.edu.in | Sunrise | teacher | `robert@123` |
| jennifer.lee | jennifer.lee@sunriseschool.edu.in | Sunrise | teacher | `jennifer@123` |
| maria.garcia | maria.garcia@stmarys.edu.in | St. Mary's | teacher | `maria@123` |
| james.martinez | james.martinez@stmarys.edu.in | St. Mary's | teacher | `james@123` |

#### Students (10) - Auto-created format
| Username | Email | School | Class | Role | Default Password |
|----------|-------|--------|-------|------|------------------|
| john.doe | john.doe@student.greenvalley.edu.in | Green Valley | Grade 5-A | student | `john@123` |
| alice.williams | alice.williams@student.greenvalley.edu.in | Green Valley | Grade 5-A | student | `alice@123` |
| bob.smith | bob.smith@student.greenvalley.edu.in | Green Valley | Grade 5-B | student | `bob@123` |
| noah.thompson | noah.thompson@student.greenvalley.edu.in | Green Valley | Grade 10-A | student | `noah@123` |
| emma.jones | emma.jones@student.sunriseschool.edu.in | Sunrise | Grade 6-A | student | `emma@123` |
| oliver.thomas | oliver.thomas@student.sunriseschool.edu.in | Sunrise | Grade 8-A | student | `oliver@123` |
| sophia.jackson | sophia.jackson@student.sunriseschool.edu.in | Sunrise | Grade 10-A | student | `sophia@123` |
| mia.white | mia.white@student.sunriseschool.edu.in | Sunrise | Grade 6-A | student | `mia@123` |
| liam.harris | liam.harris@student.stmarys.edu.in | St. Mary's | Grade 7-A | student | `liam@123` |
| ava.martin | ava.martin@student.stmarys.edu.in | St. Mary's | Grade 9-A | student | `ava@123` |

#### Parents (1)
| Username | Email | Child | Role |
|----------|-------|-------|------|
| richard.doe | richard.doe@gmail.com | John Doe | parent |

---

### 3️⃣ Classes (9 classes across 3 schools)

#### Green Valley International School
| Class | Section | Room | Class Teacher | Strength |
|-------|---------|------|---------------|----------|
| Grade 5 | A | R-201 | Sarah Johnson | 35/40 |
| Grade 5 | B | R-202 | Michael Brown | 38/40 |
| Grade 10 | A | R-301 | Emily Davis | 32/35 |

#### Sunrise Public School
| Class | Section | Room | Class Teacher | Strength |
|-------|---------|------|---------------|----------|
| Grade 6 | A | B-101 | David Wilson | 42/45 |
| Grade 8 | A | B-201 | Lisa Anderson | 37/40 |
| Grade 10 | A | B-301 | Robert Taylor | 30/35 |

#### St. Mary's Convent School
| Class | Section | Room | Class Teacher | Strength |
|-------|---------|------|---------------|----------|
| Grade 7 | A | C-101 | Maria Garcia | 36/40 |
| Grade 9 | A | C-201 | James Martinez | 34/38 |
| Grade 10 | A | C-301 | Maria Garcia | 28/35 |

---

### 4️⃣ Transport Routes (6 routes)

#### Green Valley Routes
| Route Name | Vehicle | Driver | Capacity | Students | Monthly Fee |
|------------|---------|--------|----------|----------|-------------|
| Route A - Andheri North | MH-02-AB-1234 | Ramesh Patil | 40 | 25 | ₹2,000 |
| Route B - Andheri South | MH-02-CD-5678 | Vijay Sharma | 45 | 30 | ₹1,800 |

#### Sunrise Routes
| Route Name | Vehicle | Driver | Capacity | Students | Monthly Fee |
|------------|---------|--------|----------|----------|-------------|
| Route C - Koramangala | KA-01-EF-9012 | Murthy K | 42 | 28 | ₹1,900 |
| Route D - HSR Layout | KA-01-GH-3456 | Sunil Reddy | 20 | 15 | ₹1,500 |

#### St. Mary's Routes
| Route Name | Vehicle | Driver | Capacity | Students | Monthly Fee |
|------------|---------|--------|----------|----------|-------------|
| Route E - Salt Lake | WB-06-IJ-7890 | Biswas Roy | 38 | 22 | ₹1,700 |
| Route F - New Town | WB-06-KL-2345 | Rajesh Ghosh | 40 | 18 | ₹1,800 |

---

### 5️⃣ Teachers (10 with complete denormalized data)

#### Green Valley Teachers

**Sarah Johnson** (TEACH001)
- Designation: Senior Teacher
- Department: Mathematics
- Experience: 12 years
- Salary: ₹50,000/month
- Class Teacher: Grade 5-A
- Status: Active

**Michael Brown** (TEACH002)
- Designation: Head of Science Department
- Department: Science
- Experience: 15 years
- Salary: ₹61,000/month
- Class Teacher: Grade 5-B
- Status: Active

**Emily Davis** (TEACH003)
- Designation: Teacher
- Department: English
- Experience: 8 years
- Salary: ₹44,000/month
- Class Teacher: Grade 10-A
- Status: Active

**Patricia Rodriguez** (TEACH009)
- Designation: Senior Teacher
- Department: Science
- Experience: 10 years
- Salary: ₹53,000/month
- Status: Active

#### Sunrise Teachers

**David Wilson** (TEACH004)
- Designation: Vice Principal
- Department: Mathematics
- Experience: 16 years
- Salary: ₹68,000/month
- Class Teacher: Grade 6-A
- Status: Active

**Lisa Anderson** (TEACH005)
- Designation: Senior Teacher
- Department: English
- Experience: 11 years
- Salary: ₹50,000/month
- Class Teacher: Grade 8-A
- Status: Active

**Robert Taylor** (TEACH006)
- Designation: Head of Mathematics
- Department: Mathematics
- Experience: 18 years
- Salary: ₹73,000/month
- Class Teacher: Grade 10-A
- Status: Active

**Jennifer Lee** (TEACH010)
- Designation: Teacher
- Department: Social Studies
- Experience: 6 years
- Salary: ₹41,500/month
- Status: Active (Contract)

#### St. Mary's Teachers

**Maria Garcia** (TEACH007)
- Designation: Senior Teacher
- Department: Science
- Experience: 13 years
- Salary: ₹51,500/month
- Class Teacher: Grade 7-A
- Status: Active

**James Martinez** (TEACH008)
- Designation: Head of Mathematics
- Department: Mathematics
- Experience: 14 years
- Salary: ₹57,500/month
- Class Teacher: Grade 9-A
- Status: Active

---

### 6️⃣ Students (10 with complete denormalized data)

#### Green Valley Students

**John Doe** (STU2024001 / GV5A01)
- Class: Grade 5-A
- DOB: 2010-05-15 (Age: 14)
- Gender: Male, Blood Group: O+
- Transport: Route A - Andheri North (₹2,000/month)
- Father: Richard Doe (Software Engineer, ₹1,800,000/year)
- Mother: Mary Doe (Teacher, ₹800,000/year)
- Performance: A grade, 92.5%, Rank 3
- Attendance: 96.5%
- Fee Status: Partial (₹25,000 pending)
- Total Annual Fee: ₹75,000

**Alice Williams** (STU2024002 / GV5A02)
- Class: Grade 5-A
- DOB: 2010-08-22 (Age: 14)
- Gender: Female, Blood Group: A+
- Transport: Route A - Andheri North (₹2,000/month)
- Father: Robert Williams (Doctor, ₹2,500,000/year)
- Mother: Sarah Williams (Lawyer, ₹2,000,000/year)
- Performance: A+ grade, 95.8%, Rank 1
- Attendance: 98.0%
- Scholarship: Merit Scholarship (₹15,000)
- Fee Status: Paid in full
- Total Annual Fee: ₹75,000

**Bob Smith** (STU2024003 / GV5B03)
- Class: Grade 5-B
- DOB: 2010-11-10 (Age: 14)
- Gender: Male, Blood Group: B+
- Transport: No transport
- Father: John Smith (Business Owner, ₹3,000,000/year)
- Mother: Emma Smith (Homemaker)
- Performance: B+ grade, 88.5%, Rank 8
- Attendance: 94.0%
- Fee Status: Pending (₹35,000 pending)
- Total Annual Fee: ₹75,000

**Noah Thompson** (STU2024009 / GV10A09)
- Class: Grade 10-A
- DOB: 2008-03-12 (Age: 16)
- Gender: Male, Blood Group: AB+
- Transport: Route B - Andheri South (₹1,800/month)
- Father: William Thompson (Architect, ₹1,500,000/year)
- Mother: Olivia Thompson (Designer, ₹1,200,000/year)
- Performance: A grade, 91.2%, Rank 5
- Attendance: 95.5%
- Fee Status: Partial (₹30,000 pending)
- Total Annual Fee: ₹90,000

#### Sunrise Students

**Emma Jones** (STU2024004 / SR6A04)
- Class: Grade 6-A
- DOB: 2009-06-18 (Age: 15)
- Gender: Female, Blood Group: O-
- Transport: Route C - Koramangala (₹1,900/month)
- Father: Michael Jones (IT Manager, ₹2,000,000/year)
- Mother: Lisa Jones (Pharmacist, ₹1,000,000/year)
- Performance: A grade, 93.0%, Rank 2
- Attendance: 97.0%
- Fee Status: Paid in full
- Total Annual Fee: ₹68,000

**Oliver Thomas** (STU2024005 / SR8A05)
- Class: Grade 8-A
- DOB: 2007-09-25 (Age: 17)
- Gender: Male, Blood Group: A-
- Transport: No transport
- Father: Daniel Thomas (Financial Analyst, ₹1,800,000/year)
- Mother: Sophia Thomas (Teacher, ₹900,000/year)
- Performance: B+ grade, 86.5%, Rank 12
- Attendance: 92.0%
- Fee Status: Pending (₹36,000 pending)
- Total Annual Fee: ₹72,000

**Sophia Jackson** (STU2024006 / SR10A06)
- Class: Grade 10-A
- DOB: 2006-12-08 (Age: 18)
- Gender: Female, Blood Group: B-
- Transport: Route D - HSR Layout (₹1,500/month)
- Father: James Jackson (Lawyer, ₹2,500,000/year)
- Mother: Emily Jackson (Interior Designer, ₹1,500,000/year)
- Performance: A+ grade, 96.5%, Rank 1
- Attendance: 99.0%
- Scholarship: Academic Excellence Award (₹20,000)
- Fee Status: Paid in full
- Total Annual Fee: ₹85,000

**Mia White** (STU2024010 / SR6A10)
- Class: Grade 6-A
- DOB: 2009-04-20 (Age: 15)
- Gender: Female, Blood Group: O+
- Transport: No transport
- Father: Thomas White (Entrepreneur, ₹3,500,000/year)
- Mother: Jessica White (Journalist, ₹1,200,000/year)
- Performance: A grade, 90.5%, Rank 4
- Attendance: 96.0%
- Fee Status: Partial (₹18,000 pending)
- Total Annual Fee: ₹68,000

#### St. Mary's Students

**Liam Harris** (STU2024007 / SM7A07)
- Class: Grade 7-A
- DOB: 2008-07-14 (Age: 16)
- Gender: Male, Blood Group: A+
- Transport: Route E - Salt Lake (₹1,700/month)
- Father: Andrew Harris (Bank Manager, ₹1,600,000/year)
- Mother: Jennifer Harris (Teacher, ₹800,000/year)
- Performance: A grade, 92.8%, Rank 2
- Attendance: 97.5%
- Fee Status: Paid in full
- Total Annual Fee: ₹62,000

**Ava Martin** (STU2024008 / SM9A08)
- Class: Grade 9-A
- DOB: 2007-01-30 (Age: 17)
- Gender: Female, Blood Group: B+
- Transport: No transport
- Father: Christopher Martin (Export Manager, ₹2,200,000/year)
- Mother: Amanda Martin (Nurse, ₹900,000/year)
- Performance: A- grade, 89.5%, Rank 6
- Attendance: 94.5%
- Fee Status: Pending (₹35,000 pending)
- Total Annual Fee: ₹70,000

---

### 7️⃣ Subjects (15 subjects)

#### Green Valley - Grade 5A
| Subject | Code | Teacher | Periods/Week | Max Marks |
|---------|------|---------|--------------|-----------|
| Mathematics | MATH-5A | Sarah Johnson | 6 | 100 |
| Science | SCI-5A | Michael Brown | 5 | 100 |
| English | ENG-5A | Emily Davis | 5 | 100 |

#### Green Valley - Grade 10A
| Subject | Code | Teacher | Periods/Week | Max Marks |
|---------|------|---------|--------------|-----------|
| Physics | PHY-10A | Emily Davis | 5 | 100 |
| Chemistry | CHEM-10A | Patricia Rodriguez | 5 | 100 |
| Mathematics | MATH-10A | Sarah Johnson | 6 | 100 |

#### Sunrise - Grade 6A
| Subject | Code | Teacher | Periods/Week | Max Marks |
|---------|------|---------|--------------|-----------|
| Mathematics | MATH-6A | David Wilson | 6 | 100 |
| English | ENG-6A | Lisa Anderson | 5 | 100 |

#### Sunrise - Grade 8A
| Subject | Code | Teacher | Periods/Week | Max Marks |
|---------|------|---------|--------------|-----------|
| English | ENG-8A | Lisa Anderson | 5 | 100 |
| Social Studies | SS-8A | Jennifer Lee | 4 | 100 |

#### Sunrise - Grade 10A
| Subject | Code | Teacher | Periods/Week | Max Marks |
|---------|------|---------|--------------|-----------|
| Mathematics | MATH-10A | Robert Taylor | 6 | 100 |

#### St. Mary's - Grade 7A
| Subject | Code | Teacher | Periods/Week | Max Marks |
|---------|------|---------|--------------|-----------|
| Science | SCI-7A | Maria Garcia | 5 | 100 |
| Mathematics | MATH-7A | James Martinez | 6 | 100 |

#### St. Mary's - Grade 9A
| Subject | Code | Teacher | Periods/Week | Max Marks |
|---------|------|---------|--------------|-----------|
| Mathematics | MATH-9A | James Martinez | 6 | 100 |
| Science | SCI-9A | Maria Garcia | 5 | 100 |

---

### 8️⃣ Exams (6 exams)

| School | Exam Name | Code | Type | Classes | Start Date | Status |
|--------|-----------|------|------|---------|------------|--------|
| Green Valley | Unit Test 1 | UT1-2024 | Unit Test | Grade 5, 10 | 2024-07-15 | Completed |
| Green Valley | Mid-Term Examination | MID-2024 | Mid-term | Grade 5, 10 | 2024-10-01 | Completed |
| Green Valley | Final Examination | FINAL-2024 | Final | Grade 5, 10 | 2025-03-01 | Scheduled |
| Sunrise | First Term Exam | TERM1-2024 | Mid-term | Grade 6, 8, 10 | 2024-09-15 | Completed |
| Sunrise | Second Term Exam | TERM2-2024 | Final | Grade 6, 8, 10 | 2025-02-20 | Scheduled |
| St. Mary's | Quarterly Exam | Q1-2024 | Unit Test | Grade 7, 9, 10 | 2024-08-20 | Completed |

---

### 9️⃣ Attendance (15 sample records)

Sample attendance for December 2-6, 2024:

**John Doe (Grade 5-A):**
- Dec 2: Present (7:55 AM - 2:30 PM)
- Dec 3: Present (7:50 AM - 2:30 PM)
- Dec 4: Late (8:15 AM - 2:30 PM) - 15 min late
- Dec 5: Present (7:58 AM - 2:30 PM)
- Dec 6: Absent - Sick leave

**Alice Williams (Grade 5-A):**
- Dec 2-6: All Present (Perfect attendance)

**Emma Jones (Grade 6-A):**
- Dec 2-6: All Present (Perfect attendance)

---

### 🔟 Marks (20 exam results)

#### Mid-Term Examination Results

**John Doe (Grade 5-A):**
| Subject | Theory | Practical | Total | Grade | Status |
|---------|--------|-----------|-------|-------|--------|
| Mathematics | 87 | - | 87/100 | A | Pass |
| Science | 78 | 16 | 94/100 | A+ | Pass |
| English | 92 | - | 92/100 | A+ | Pass |
| **Overall** | | | **91.0%** | **A+** | **Pass** |

**Alice Williams (Grade 5-A):**
| Subject | Theory | Practical | Total | Grade | Status |
|---------|--------|-----------|-------|-------|--------|
| Mathematics | 96 | - | 96/100 | A+ | Pass |
| Science | 76 | 19 | 95/100 | A+ | Pass |
| English | 96 | - | 96/100 | A+ | Pass |
| **Overall** | | | **95.7%** | **A+** | **Pass** |

**Noah Thompson (Grade 10-A):**
| Subject | Theory | Practical | Total | Grade | Status |
|---------|--------|-----------|-------|-------|--------|
| Physics | 64 | 27 | 91/100 | A+ | Pass |
| Chemistry | 63 | 28 | 91/100 | A+ | Pass |
| Mathematics | 92 | - | 92/100 | A+ | Pass |
| **Overall** | | | **91.3%** | **A+** | **Pass** |

**Emma Jones (Grade 6-A) - First Term:**
| Subject | Total | Grade | Status |
|---------|-------|-------|--------|
| Mathematics | 94/100 | A+ | Pass |
| English | 91/100 | A+ | Pass |
| **Overall** | **92.5%** | **A+** | **Pass** |

**Sophia Jackson (Grade 10-A) - First Term:**
| Subject | Total | Grade | Status |
|---------|-------|-------|--------|
| Mathematics | 97/100 | A+ | Pass |

---

### 1️⃣1️⃣ Fee Structures (12 fee types)

#### Green Valley
| Class | Fee Type | Amount | Due Date |
|-------|----------|--------|----------|
| Grade 5 | Tuition Fee | ₹50,000 | 2024-04-30 |
| Grade 5 | Transport Fee | ₹24,000 | 2024-04-30 |
| Grade 5 | Library Fee | ₹1,000 | 2024-05-31 |
| Grade 10 | Tuition Fee | ₹65,000 | 2024-04-30 |
| Grade 10 | Lab Fee | ₹5,000 | 2024-05-31 |

#### Sunrise
| Class | Fee Type | Amount | Due Date |
|-------|----------|--------|----------|
| Grade 6 | Tuition Fee | ₹45,000 | 2024-04-30 |
| Grade 6 | Transport Fee | ₹22,800 | 2024-04-30 |
| Grade 10 | Tuition Fee | ₹60,000 | 2024-04-30 |
| Grade 10 | Exam Fee | ₹5,000 | 2024-12-31 |

#### St. Mary's
| Class | Fee Type | Amount | Due Date |
|-------|----------|--------|----------|
| Grade 7 | Tuition Fee | ₹42,000 | 2024-04-30 |
| Grade 7 | Transport Fee | ₹20,400 | 2024-04-30 |
| Grade 9 | Tuition Fee | ₹48,000 | 2024-04-30 |

---

### 1️⃣2️⃣ Fee Payments (20 payment transactions)

#### John Doe - Payment History
| Receipt | Date | Fee Type | Amount | Mode | Balance | Status |
|---------|------|----------|--------|------|---------|--------|
| GV-2024-001 | 2024-04-15 | Tuition | ₹25,000 | Online | ₹25,000 | Partial |
| GV-2024-002 | 2024-04-15 | Transport | ₹24,000 | Online | ₹0 | Paid |
| GV-2024-003 | 2024-05-20 | Library | ₹1,000 | Cash | ₹0 | Paid |
| **Total Paid** | | | **₹50,000** | | **₹25,000 pending** | |

#### Alice Williams - Payment History (With Scholarship)
| Receipt | Date | Fee Type | Gross | Scholarship | Net | Mode | Status |
|---------|------|----------|-------|-------------|-----|------|--------|
| GV-2024-004 | 2024-04-10 | Tuition | ₹50,000 | -₹15,000 | ₹35,000 | Cheque | Paid |
| GV-2024-005 | 2024-04-10 | Transport | ₹24,000 | ₹0 | ₹24,000 | Cheque | Paid |
| GV-2024-006 | 2024-05-15 | Library | ₹1,000 | ₹0 | ₹1,000 | Online | Paid |
| **Total Paid** | | | **₹75,000** | **-₹15,000** | **₹60,000** | | **Paid** |

#### Sophia Jackson - Payment History (With Scholarship)
| Receipt | Date | Fee Type | Gross | Scholarship | Net | Mode | Status |
|---------|------|----------|-------|-------------|-----|------|--------|
| SR-2024-005 | 2024-04-01 | Tuition | ₹60,000 | -₹20,000 | ₹40,000 | Cheque | Paid |
| SR-2024-006 | 2024-04-01 | Transport | ₹18,000 | ₹0 | ₹18,000 | Cheque | Paid |
| SR-2024-007 | 2024-11-30 | Exam | ₹5,000 | ₹0 | ₹5,000 | Online | Paid |
| **Total Paid** | | | **₹83,000** | **-₹20,000** | **₹63,000** | | **Paid** |

---

## 🔑 Test Credentials

### For Testing Login

**Super Admin:**
```
Username: superadmin
Password: password
```

**School Admins:**
```
Green Valley: admin.greenvalley / password
Sunrise: admin.sunrise / password
St. Mary's: admin.stmarys / password
```

**Teachers (format: firstname@123):**
```
sarah.johnson / sarah@123
michael.brown / michael@123
emily.davis / emily@123
david.wilson / david@123
lisa.anderson / lisa@123
robert.taylor / robert@123
maria.garcia / maria@123
james.martinez / james@123
```

**Students (format: firstname@123):**
```
john.doe / john@123
alice.williams / alice@123
bob.smith / bob@123
emma.jones / emma@123
sophia.jackson / sophia@123
liam.harris / liam@123
ava.martin / ava@123
```

---

## 📊 Statistics Summary

| Metric | Count |
|--------|-------|
| **Schools** | 3 |
| **Users** | 25 |
| **Classes** | 9 |
| **Transport Routes** | 6 |
| **Teachers** | 10 |
| **Students** | 10 |
| **Subjects** | 15 |
| **Exams** | 6 |
| **Attendance Records** | 15 |
| **Marks Records** | 20 |
| **Fee Structures** | 12 |
| **Fee Payments** | 20 |

---

## 🎯 Common Queries

### Get All Students in a Class
```sql
SELECT * FROM students
WHERE class_id = 1 AND section = 'A';
```

### Get Students with Pending Fees
```sql
SELECT 
  first_name, last_name, admission_no,
  class_name, section,
  fee_pending, fee_status
FROM students
WHERE fee_status IN ('Pending', 'Partial');
```

### Get Teacher Subjects
```sql
SELECT 
  teacher_name, subjects, department,
  school_name, designation
FROM teachers
WHERE is_active = 1;
```

### Get Student Attendance
```sql
SELECT 
  date, status, check_in_time,
  student_name, class_name
FROM attendance
WHERE student_id = 1
ORDER BY date DESC;
```

### Get Exam Results
```sql
SELECT 
  student_name, subject_name,
  total_marks_obtained, max_marks,
  percentage, grade
FROM marks
WHERE exam_id = 2
ORDER BY percentage DESC;
```

---

## ✅ Data Validation

After loading, verify:

```sql
-- Check users created
SELECT role, COUNT(*) FROM users GROUP BY role;

-- Check students per school
SELECT school_name, COUNT(*) FROM students GROUP BY school_name;

-- Check teachers per school
SELECT school_name, COUNT(*) FROM teachers GROUP BY school_name;

-- Check fee payments
SELECT payment_status, COUNT(*) FROM fee_payments GROUP BY payment_status;
```

---

**Your comprehensive sample data is ready!** 🎊

All tables populated with realistic test data across 3 schools!
