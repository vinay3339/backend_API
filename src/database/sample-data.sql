-- =====================================================
-- SAMPLE DATA FOR SCHOOL MANAGEMENT SYSTEM
-- =====================================================
-- This file contains sample INSERT statements for demo data
-- =====================================================

-- ==================== CORE SYSTEM DATA ====================

-- Insert Sample School
INSERT INTO schools (school_id, school_code, school_name, email, phone, website, address, city, state, country, postal_code, established_year, affiliation, board, principal_name, status)
VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'SCH001', 'Delhi Public School', 'info@dpsschool.edu', '+91-9876543210', 'https://www.dpsschool.edu', '123 Education Road, Sector 5', 'Hyderabad', 'Telangana', 'India', '500001', 2005, 'CBSE', 'CBSE', 'Dr. Ramesh Kumar', 'Active');

-- Insert Academic Years
INSERT INTO academic_years (academic_year_id, school_id, year_code, year_name, start_date, end_date, is_current, status)
VALUES 
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '2024-25', '2024-2025', '2024-06-01', '2025-05-31', TRUE, 'Active'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '2023-24', '2023-2024', '2023-06-01', '2024-05-31', FALSE, 'Completed');

-- ==================== USER DATA ====================

-- Insert Sample Users (Admin, Teachers, Students)
INSERT INTO users (user_id, school_id, username, email, password_hash, user_type, first_name, last_name, phone, is_active, is_first_login)
VALUES 
-- School Admin
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'admin@dps', 'admin@dpsschool.edu', '$2a$10$hashed_password', 'School Admin', 'Rajesh', 'Sharma', '+91-9876543210', TRUE, FALSE),

-- Teachers
('770e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440000', 'priya.math', 'priya.math@dpsschool.edu', '$2a$10$hashed_password', 'Teacher', 'Priya', 'Reddy', '+91-9876543211', TRUE, FALSE),
('770e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440000', 'suresh.science', 'suresh.science@dpsschool.edu', '$2a$10$hashed_password', 'Teacher', 'Suresh', 'Patel', '+91-9876543212', TRUE, FALSE),
('770e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440000', 'anjali.english', 'anjali.english@dpsschool.edu', '$2a$10$hashed_password', 'Teacher', 'Anjali', 'Verma', '+91-9876543213', TRUE, FALSE),

-- Students
('770e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000', 'rahul.10a', 'rahul.kumar@student.dps.edu', '$2a$10$hashed_password', 'Student', 'Rahul', 'Kumar', '+91-9876543301', TRUE, FALSE),
('770e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440000', 'priya.10a', 'priya.sharma@student.dps.edu', '$2a$10$hashed_password', 'Student', 'Priya', 'Sharma', '+91-9876543302', TRUE, FALSE),
('770e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440000', 'amit.10b', 'amit.singh@student.dps.edu', '$2a$10$hashed_password', 'Student', 'Amit', 'Singh', '+91-9876543303', TRUE, FALSE);

-- ==================== STUDENT DATA ====================

-- Insert Students
INSERT INTO students (student_id, user_id, school_id, admission_number, roll_number, first_name, middle_name, last_name, date_of_birth, gender, blood_group, nationality, religion, email, phone, admission_date, academic_year_id, status)
VALUES 
('880e8400-e29b-41d4-a716-446655440201', '770e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000', 'DPS2024001', '10A01', 'Rahul', 'Kumar', 'Sharma', '2008-05-15', 'Male', 'O+', 'Indian', 'Hindu', 'rahul.kumar@student.dps.edu', '+91-9876543301', '2024-06-01', '660e8400-e29b-41d4-a716-446655440001', 'Active'),
('880e8400-e29b-41d4-a716-446655440202', '770e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440000', 'DPS2024002', '10A02', 'Priya', '', 'Sharma', '2008-07-22', 'Female', 'A+', 'Indian', 'Hindu', 'priya.sharma@student.dps.edu', '+91-9876543302', '2024-06-01', '660e8400-e29b-41d4-a716-446655440001', 'Active'),
('880e8400-e29b-41d4-a716-446655440203', '770e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440000', 'DPS2024003', '10B01', 'Amit', '', 'Singh', '2008-03-10', 'Male', 'B+', 'Indian', 'Sikh', 'amit.singh@student.dps.edu', '+91-9876543303', '2024-06-01', '660e8400-e29b-41d4-a716-446655440001', 'Active');

-- Insert Student Guardians
INSERT INTO student_guardians (guardian_id, student_id, guardian_type, first_name, last_name, relationship, occupation, email, phone, annual_income, is_primary)
VALUES 
('990e8400-e29b-41d4-a716-446655440201', '880e8400-e29b-41d4-a716-446655440201', 'Father', 'Vijay', 'Sharma', 'Father', 'Software Engineer', 'vijay.sharma@email.com', '+91-9876543401', 1200000.00, TRUE),
('990e8400-e29b-41d4-a716-446655440202', '880e8400-e29b-41d4-a716-446655440201', 'Mother', 'Sunita', 'Sharma', 'Mother', 'Teacher', 'sunita.sharma@email.com', '+91-9876543402', 600000.00, FALSE),
('990e8400-e29b-41d4-a716-446655440203', '880e8400-e29b-41d4-a716-446655440202', 'Father', 'Rajesh', 'Sharma', 'Father', 'Business', 'rajesh.sharma@email.com', '+91-9876543403', 1500000.00, TRUE);

-- Insert Student Addresses
INSERT INTO student_addresses (address_id, student_id, address_type, address_line1, address_line2, city, state, country, postal_code)
VALUES 
('aa0e8400-e29b-41d4-a716-446655440201', '880e8400-e29b-41d4-a716-446655440201', 'Permanent', 'House No. 123, Jubilee Hills', 'Road No. 45', 'Hyderabad', 'Telangana', 'India', '500033'),
('aa0e8400-e29b-41d4-a716-446655440202', '880e8400-e29b-41d4-a716-446655440202', 'Permanent', 'Flat 201, Banjara Apartments', 'Banjara Hills', 'Hyderabad', 'Telangana', 'India', '500034');

-- ==================== TEACHER DATA ====================

-- Insert Teachers
INSERT INTO teachers (teacher_id, user_id, school_id, employee_id, first_name, middle_name, last_name, date_of_birth, gender, blood_group, nationality, email, phone, joining_date, department, designation, employment_type, status)
VALUES 
('bb0e8400-e29b-41d4-a716-446655440101', '770e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440000', 'EMP001', 'Priya', '', 'Reddy', '1985-08-15', 'Female', 'O+', 'Indian', 'priya.math@dpsschool.edu', '+91-9876543211', '2015-06-01', 'Mathematics', 'Senior Teacher', 'Permanent', 'Active'),
('bb0e8400-e29b-41d4-a716-446655440102', '770e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440000', 'EMP002', 'Suresh', '', 'Patel', '1980-03-22', 'Male', 'B+', 'Indian', 'suresh.science@dpsschool.edu', '+91-9876543212', '2012-07-15', 'Science', 'Head of Department', 'Permanent', 'Active'),
('bb0e8400-e29b-41d4-a716-446655440103', '770e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440000', 'EMP003', 'Anjali', '', 'Verma', '1990-11-10', 'Female', 'A+', 'Indian', 'anjali.english@dpsschool.edu', '+91-9876543213', '2018-08-01', 'English', 'Teacher', 'Permanent', 'Active');

-- Insert Teacher Qualifications
INSERT INTO teacher_qualifications (qualification_id, teacher_id, degree_name, specialization, institution, university, year_of_passing, percentage)
VALUES 
('cc0e8400-e29b-41d4-a716-446655440101', 'bb0e8400-e29b-41d4-a716-446655440101', 'M.Sc', 'Mathematics', 'Osmania University', 'Osmania University', 2007, 85.5),
('cc0e8400-e29b-41d4-a716-446655440102', 'bb0e8400-e29b-41d4-a716-446655440101', 'B.Ed', 'Education', 'Regional Institute of Education', 'NCERT', 2009, 78.0),
('cc0e8400-e29b-41d4-a716-446655440103', 'bb0e8400-e29b-41d4-a716-446655440102', 'Ph.D', 'Physics', 'IIT Hyderabad', 'IIT Hyderabad', 2005, 90.0);

-- ==================== CLASS DATA ====================

-- Insert Classes
INSERT INTO classes (class_id, school_id, class_name, class_code, academic_year_id, medium, syllabus_type, category, max_capacity, status)
VALUES 
('dd0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Class 10', 'CLASS10', '660e8400-e29b-41d4-a716-446655440001', 'English', 'CBSE', 'High School', 40, 'Active'),
('dd0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Class 9', 'CLASS09', '660e8400-e29b-41d4-a716-446655440001', 'English', 'CBSE', 'High School', 40, 'Active'),
('dd0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Class 8', 'CLASS08', '660e8400-e29b-41d4-a716-446655440001', 'English', 'State Board', 'Middle School', 40, 'Active');

-- Insert Class Sections
INSERT INTO class_sections (section_id, class_id, section_name, room_number, max_students, current_strength)
VALUES 
('ee0e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', 'A', '301', 40, 38),
('ee0e8400-e29b-41d4-a716-446655440002', 'dd0e8400-e29b-41d4-a716-446655440001', 'B', '302', 40, 42),
('ee0e8400-e29b-41d4-a716-446655440003', 'dd0e8400-e29b-41d4-a716-446655440002', 'A', '201', 40, 40),
('ee0e8400-e29b-41d4-a716-446655440004', 'dd0e8400-e29b-41d4-a716-446655440002', 'B', '202', 40, 35);

-- Insert Subjects
INSERT INTO subjects (subject_id, school_id, subject_code, subject_name, subject_type)
VALUES 
('ff0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'MATH', 'Mathematics', 'Core'),
('ff0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'SCI', 'Science', 'Core'),
('ff0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'ENG', 'English', 'Core'),
('ff0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'SS', 'Social Studies', 'Core'),
('ff0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', 'HIN', 'Hindi', 'Core'),
('ff0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', 'CS', 'Computer Science', 'Elective');

-- Insert Class Subjects
INSERT INTO class_subjects (class_subject_id, class_id, section_id, subject_id, teacher_id, periods_per_week)
VALUES 
('110e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', 'ff0e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440101', 6),
('110e8400-e29b-41d4-a716-446655440002', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', 'ff0e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440102', 6),
('110e8400-e29b-41d4-a716-446655440003', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', 'ff0e8400-e29b-41d4-a716-446655440003', 'bb0e8400-e29b-41d4-a716-446655440103', 5);

-- ==================== ENROLLMENT DATA ====================

-- Insert Student Enrollments
INSERT INTO student_enrollment (enrollment_id, student_id, academic_year_id, class_id, section_id, roll_number, enrollment_date, status)
VALUES 
('120e8400-e29b-41d4-a716-446655440201', '880e8400-e29b-41d4-a716-446655440201', '660e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', '10A01', '2024-06-01', 'Active'),
('120e8400-e29b-41d4-a716-446655440202', '880e8400-e29b-41d4-a716-446655440202', '660e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', '10A02', '2024-06-01', 'Active'),
('120e8400-e29b-41d4-a716-446655440203', '880e8400-e29b-41d4-a716-446655440203', '660e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440002', '10B01', '2024-06-01', 'Active');

-- ==================== ATTENDANCE DATA ====================

-- Insert Student Attendance (Sample for last week)
INSERT INTO student_attendance (attendance_id, student_id, class_id, section_id, attendance_date, status, check_in_time, marked_by)
VALUES 
('130e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440201', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', '2024-12-01', 'Present', '08:45:00', '770e8400-e29b-41d4-a716-446655440101'),
('130e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440201', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', '2024-12-02', 'Present', '08:50:00', '770e8400-e29b-41d4-a716-446655440101'),
('130e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440201', 'dd0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', '2024-12-03', 'Absent', NULL, '770e8400-e29b-41d4-a716-446655440101');

-- ==================== EXAM DATA ====================

-- Insert Exams
INSERT INTO exams (exam_id, school_id, academic_year_id, exam_code, exam_name, exam_type, start_date, end_date, weightage, max_marks, min_pass_marks, status)
VALUES 
('140e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'FA1-2024', 'Formative Assessment 1', 'Formative', '2024-07-15', '2024-07-20', 10.00, 20, 7, 'Completed'),
('140e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'SA1-2024', 'Summative Assessment 1', 'Summative', '2024-09-15', '2024-09-25', 40.00, 100, 35, 'Active');

-- Insert Exam Subjects
INSERT INTO exam_subjects (exam_subject_id, exam_id, subject_id, class_id, max_marks, min_pass_marks, has_practical, practical_marks)
VALUES 
('150e8400-e29b-41d4-a716-446655440001', '140e8400-e29b-41d4-a716-446655440001', 'ff0e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', 20, 7, FALSE, 0),
('150e8400-e29b-41d4-a716-446655440002', '140e8400-e29b-41d4-a716-446655440001', 'ff0e8400-e29b-41d4-a716-446655440002', 'dd0e8400-e29b-41d4-a716-446655440001', 20, 7, TRUE, 5);

-- Insert Marks
INSERT INTO marks (mark_id, exam_id, exam_subject_id, student_id, written_marks, practical_marks, total_marks, grade, is_absent, entered_by)
VALUES 
('160e8400-e29b-41d4-a716-446655440001', '140e8400-e29b-41d4-a716-446655440001', '150e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440201', 18.0, 0.0, 18.0, 'A', FALSE, '770e8400-e29b-41d4-a716-446655440101'),
('160e8400-e29b-41d4-a716-446655440002', '140e8400-e29b-41d4-a716-446655440001', '150e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440201', 15.0, 4.5, 19.5, 'A', FALSE, '770e8400-e29b-41d4-a716-446655440102');

-- Insert Grade System
INSERT INTO grade_system (grade_id, school_id, grade_name, min_percentage, max_percentage, grade_point, description)
VALUES 
('170e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'A+', 90.00, 100.00, 10.00, 'Outstanding'),
('170e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'A', 80.00, 89.99, 9.00, 'Excellent'),
('170e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'B+', 70.00, 79.99, 8.00, 'Very Good'),
('170e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'B', 60.00, 69.99, 7.00, 'Good'),
('170e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', 'C', 50.00, 59.99, 6.00, 'Average'),
('170e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', 'D', 35.00, 49.99, 5.00, 'Pass'),
('170e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', 'F', 0.00, 34.99, 0.00, 'Fail');

-- ==================== FINANCE DATA ====================

-- Insert Fee Categories
INSERT INTO fee_categories (category_id, school_id, category_name, category_code, description)
VALUES 
('180e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Tuition Fee', 'TUITION', 'Regular tuition fee'),
('180e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Transport Fee', 'TRANSPORT', 'School bus fee'),
('180e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Exam Fee', 'EXAM', 'Examination fee'),
('180e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'Library Fee', 'LIBRARY', 'Library maintenance fee');

-- Insert Fee Structures
INSERT INTO fee_structures (fee_structure_id, school_id, academic_year_id, class_id, fee_category_id, amount, frequency, due_date)
VALUES 
('190e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', '180e8400-e29b-41d4-a716-446655440001', 50000.00, 'Annually', '2024-07-15'),
('190e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', '180e8400-e29b-41d4-a716-446655440002', 15000.00, 'Annually', '2024-07-15');

-- Insert Student Fees
INSERT INTO student_fees (student_fee_id, student_id, fee_structure_id, amount, discount, final_amount, due_date, status)
VALUES 
('1a0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440201', '190e8400-e29b-41d4-a716-446655440001', 50000.00, 0.00, 50000.00, '2024-07-15', 'Paid'),
('1a0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440202', '190e8400-e29b-41d4-a716-446655440001', 50000.00, 5000.00, 45000.00, '2024-07-15', 'Partial');

-- Insert Fee Payments
INSERT INTO fee_payments (payment_id, student_fee_id, student_id, amount_paid, payment_date, payment_mode, receipt_number, collected_by)
VALUES 
('1b0e8400-e29b-41d4-a716-446655440001', '1a0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440201', 50000.00, '2024-07-10', 'Online', 'REC2024001', '770e8400-e29b-41d4-a716-446655440001'),
('1b0e8400-e29b-41d4-a716-446655440002', '1a0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440202', 25000.00, '2024-07-12', 'Cash', 'REC2024002', '770e8400-e29b-41d4-a716-446655440001');

-- ==================== TRANSPORT DATA ====================

-- Insert Transport Routes
INSERT INTO transport_routes (route_id, school_id, route_code, route_name, start_point, end_point, distance_km, estimated_time_minutes, status)
VALUES 
('1c0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'RT001', 'Jubilee Hills Route', 'Jubilee Hills', 'School', 12.5, 45, 'Active'),
('1c0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'RT002', 'Banjara Hills Route', 'Banjara Hills', 'School', 8.0, 30, 'Active');

-- Insert Transport Vehicles
INSERT INTO transport_vehicles (vehicle_id, school_id, vehicle_number, vehicle_type, model, capacity, driver_name, driver_phone, route_id, status)
VALUES 
('1d0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'TS09AB1234', 'Bus', 'Tata Starbus', 50, 'Ramesh Kumar', '+91-9876540001', '1c0e8400-e29b-41d4-a716-446655440001', 'Active'),
('1d0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'TS09AB5678', 'Bus', 'Ashok Leyland', 45, 'Suresh Rao', '+91-9876540002', '1c0e8400-e29b-41d4-a716-446655440002', 'Active');

-- ==================== ANNOUNCEMENTS & NOTIFICATIONS ====================

-- Insert Announcements
INSERT INTO announcements (announcement_id, school_id, title, content, target_audience, priority, published_by, published_at, is_active)
VALUES 
('1e0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Annual Day Celebration', 'Annual day will be celebrated on December 20th, 2024. All students are required to attend.', 'All', 'High', '770e8400-e29b-41d4-a716-446655440001', '2024-12-01 10:00:00', TRUE),
('1e0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Winter Break Notice', 'School will be closed from December 25th to January 5th for winter break.', 'All', 'Medium', '770e8400-e29b-41d4-a716-446655440001', '2024-12-05 09:00:00', TRUE);

-- ==================== AUDIT LOGS ====================

-- Insert Sample Audit Logs
INSERT INTO audit_logs (audit_id, user_id, action, entity_type, entity_id, ip_address, created_at)
VALUES 
('1f0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Login', 'User', '770e8400-e29b-41d4-a716-446655440001', '192.168.1.100', '2024-12-06 08:00:00'),
('1f0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440101', 'Create', 'Student', '880e8400-e29b-41d4-a716-446655440201', '192.168.1.101', '2024-12-06 09:30:00'),
('1f0e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440101', 'Update', 'Marks', '160e8400-e29b-41d4-a716-446655440001', '192.168.1.101', '2024-12-06 10:15:00');

-- ==================== END OF SAMPLE DATA ====================

-- Note: All UUIDs used above are for demonstration purposes only.
-- In production, use gen_random_uuid() or your application's UUID generator.
