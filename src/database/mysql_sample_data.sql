-- =====================================================
-- MySQL Sample Data - Denormalized Architecture
-- School Management System
-- Comprehensive realistic sample data for all tables
-- =====================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

USE eduportal;

-- =====================================================
-- 1. SCHOOLS TABLE (3 schools)
-- =====================================================

INSERT INTO `schools` (
  `id`, `school_code`, `school_name`, `address`, `city`, `state`, `pincode`,
  `phone`, `email`, `principal_name`, `board`, `affiliation_no`,
  `logo_url`, `primary_color`, `secondary_color`, `is_active`
) VALUES
(1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', 'Maharashtra', '400053',
 '022-12345678', 'info@greenvalley.edu.in', 'Dr. Ramesh Kumar', 'CBSE', 'CBSE/AFF/1234567',
 '/logos/greenvalley.png', '#2E7D32', '#FFA726', 1),

(2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', 'Karnataka', '560095',
 '080-87654321', 'contact@sunriseschool.edu.in', 'Mrs. Priya Sharma', 'ICSE', 'ICSE/AFF/7654321',
 '/logos/sunrise.png', '#1976D2', '#FF6F00', 1),

(3, 'SCH003', 'St. Mary\'s Convent School', '789 Park Street, Salt Lake', 'Kolkata', 'West Bengal', '700091',
 '033-23456789', 'admin@stmarys.edu.in', 'Sister Angela', 'CBSE', 'CBSE/AFF/9876543',
 '/logos/stmarys.png', '#6A1B9A', '#4CAF50', 1);


-- =====================================================
-- 2. USERS TABLE (25 users: 1 super admin, 3 school admins, 10 teachers, 10 students, 1 parent)
-- =====================================================

INSERT INTO `users` (
  `id`, `username`, `email`, `hashed_password`, `role`,
  `school_id`, `school_name`, `is_active`, `is_first_login`, `last_login`
) VALUES
-- Super Admin
(1, 'superadmin', 'admin@eduportal.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ciu3jO', 'super_admin',
 NULL, NULL, 1, 0, '2024-12-15 10:30:00'),

-- School Admins (3)
(2, 'admin.greenvalley', 'admin@greenvalley.edu.in', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ciu3jO', 'school_admin',
 1, 'Green Valley International School', 1, 0, '2024-12-15 09:00:00'),

(3, 'admin.sunrise', 'admin@sunriseschool.edu.in', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ciu3jO', 'school_admin',
 2, 'Sunrise Public School', 1, 0, '2024-12-14 14:30:00'),

(4, 'admin.stmarys', 'admin@stmarys.edu.in', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ciu3jO', 'school_admin',
 3, 'St. Mary\'s Convent School', 1, 0, '2024-12-13 11:15:00'),

-- Teachers (10) - auto-created format
(5, 'sarah.johnson', 'sarah.johnson@greenvalley.edu.in', '$2b$12$sarah123hashedpassword', 'teacher',
 1, 'Green Valley International School', 1, 0, '2024-12-15 08:00:00'),

(6, 'michael.brown', 'michael.brown@greenvalley.edu.in', '$2b$12$michael123hashedpassword', 'teacher',
 1, 'Green Valley International School', 1, 0, '2024-12-15 08:15:00'),

(7, 'emily.davis', 'emily.davis@greenvalley.edu.in', '$2b$12$emily123hashedpassword', 'teacher',
 1, 'Green Valley International School', 1, 1, NULL),

(8, 'david.wilson', 'david.wilson@sunriseschool.edu.in', '$2b$12$david123hashedpassword', 'teacher',
 2, 'Sunrise Public School', 1, 0, '2024-12-14 09:30:00'),

(9, 'lisa.anderson', 'lisa.anderson@sunriseschool.edu.in', '$2b$12$lisa123hashedpassword', 'teacher',
 2, 'Sunrise Public School', 1, 0, '2024-12-14 10:00:00'),

(10, 'robert.taylor', 'robert.taylor@sunriseschool.edu.in', '$2b$12$robert123hashedpassword', 'teacher',
 2, 'Sunrise Public School', 1, 1, NULL),

(11, 'maria.garcia', 'maria.garcia@stmarys.edu.in', '$2b$12$maria123hashedpassword', 'teacher',
 3, 'St. Mary\'s Convent School', 1, 0, '2024-12-13 08:45:00'),

(12, 'james.martinez', 'james.martinez@stmarys.edu.in', '$2b$12$james123hashedpassword', 'teacher',
 3, 'St. Mary\'s Convent School', 1, 1, NULL),

(13, 'patricia.rodriguez', 'patricia.rodriguez@greenvalley.edu.in', '$2b$12$patricia123hashedpassword', 'teacher',
 1, 'Green Valley International School', 1, 0, '2024-12-15 07:30:00'),

(14, 'jennifer.lee', 'jennifer.lee@sunriseschool.edu.in', '$2b$12$jennifer123hashedpassword', 'teacher',
 2, 'Sunrise Public School', 1, 0, '2024-12-14 08:00:00'),

-- Students (10) - auto-created format
(15, 'john.doe', 'john.doe@student.greenvalley.edu.in', '$2b$12$john123hashedpassword', 'student',
 1, 'Green Valley International School', 1, 0, '2024-12-15 16:00:00'),

(16, 'alice.williams', 'alice.williams@student.greenvalley.edu.in', '$2b$12$alice123hashedpassword', 'student',
 1, 'Green Valley International School', 1, 1, NULL),

(17, 'bob.smith', 'bob.smith@student.greenvalley.edu.in', '$2b$12$bob123hashedpassword', 'student',
 1, 'Green Valley International School', 1, 0, '2024-12-14 17:30:00'),

(18, 'emma.jones', 'emma.jones@student.sunriseschool.edu.in', '$2b$12$emma123hashedpassword', 'student',
 2, 'Sunrise Public School', 1, 0, '2024-12-14 15:45:00'),

(19, 'oliver.thomas', 'oliver.thomas@student.sunriseschool.edu.in', '$2b$12$oliver123hashedpassword', 'student',
 2, 'Sunrise Public School', 1, 1, NULL),

(20, 'sophia.jackson', 'sophia.jackson@student.sunriseschool.edu.in', '$2b$12$sophia123hashedpassword', 'student',
 2, 'Sunrise Public School', 1, 0, '2024-12-13 16:15:00'),

(21, 'liam.harris', 'liam.harris@student.stmarys.edu.in', '$2b$12$liam123hashedpassword', 'student',
 3, 'St. Mary\'s Convent School', 1, 0, '2024-12-13 14:30:00'),

(22, 'ava.martin', 'ava.martin@student.stmarys.edu.in', '$2b$12$ava123hashedpassword', 'student',
 3, 'St. Mary\'s Convent School', 1, 1, NULL),

(23, 'noah.thompson', 'noah.thompson@student.greenvalley.edu.in', '$2b$12$noah123hashedpassword', 'student',
 1, 'Green Valley International School', 1, 0, '2024-12-15 18:00:00'),

(24, 'mia.white', 'mia.white@student.sunriseschool.edu.in', '$2b$12$mia123hashedpassword', 'student',
 2, 'Sunrise Public School', 1, 1, NULL),

-- Parent
(25, 'richard.doe', 'richard.doe@gmail.com', '$2b$12$richard123hashedpassword', 'parent',
 1, 'Green Valley International School', 1, 0, '2024-12-15 19:00:00');


-- =====================================================
-- 3. CLASSES TABLE (9 classes across 3 schools)
-- =====================================================

INSERT INTO `classes` (
  `id`, `school_id`, `school_name`, `class_name`, `section`, `class_section`,
  `academic_year`, `room_number`, `capacity`, `current_strength`,
  `class_teacher_id`, `class_teacher_name`, `class_teacher_email`, `class_teacher_phone`,
  `subject_teachers`, `timetable`, `status`, `is_active`
) VALUES
-- Green Valley School
(1, 1, 'Green Valley International School', 'Grade 5', 'A', 'Grade 5-A',
 '2024-25', 'R-201', 40, 35,
 5, 'Sarah Johnson', 'sarah.johnson@greenvalley.edu.in', '9876543210',
 '[{"subject":"Mathematics","teacher_name":"Sarah Johnson","teacher_id":5},{"subject":"Science","teacher_name":"Michael Brown","teacher_id":6},{"subject":"English","teacher_name":"Emily Davis","teacher_id":7}]',
 '{"Monday":[{"period":1,"subject":"Math","time":"08:00-09:00"}],"Tuesday":[{"period":1,"subject":"Science","time":"08:00-09:00"}]}',
 'active', 1),

(2, 1, 'Green Valley International School', 'Grade 5', 'B', 'Grade 5-B',
 '2024-25', 'R-202', 40, 38,
 6, 'Michael Brown', 'michael.brown@greenvalley.edu.in', '9876543211',
 '[{"subject":"Mathematics","teacher_name":"Michael Brown","teacher_id":6},{"subject":"Science","teacher_name":"Sarah Johnson","teacher_id":5}]',
 NULL, 'active', 1),

(3, 1, 'Green Valley International School', 'Grade 10', 'A', 'Grade 10-A',
 '2024-25', 'R-301', 35, 32,
 7, 'Emily Davis', 'emily.davis@greenvalley.edu.in', '9876543212',
 '[{"subject":"Physics","teacher_name":"Emily Davis","teacher_id":7},{"subject":"Chemistry","teacher_name":"Patricia Rodriguez","teacher_id":13}]',
 NULL, 'active', 1),

-- Sunrise School
(4, 2, 'Sunrise Public School', 'Grade 6', 'A', 'Grade 6-A',
 '2024-25', 'B-101', 45, 42,
 8, 'David Wilson', 'david.wilson@sunriseschool.edu.in', '9876543213',
 '[{"subject":"Mathematics","teacher_name":"David Wilson","teacher_id":8},{"subject":"English","teacher_name":"Lisa Anderson","teacher_id":9}]',
 NULL, 'active', 1),

(5, 2, 'Sunrise Public School', 'Grade 8', 'A', 'Grade 8-A',
 '2024-25', 'B-201', 40, 37,
 9, 'Lisa Anderson', 'lisa.anderson@sunriseschool.edu.in', '9876543214',
 '[{"subject":"English","teacher_name":"Lisa Anderson","teacher_id":9},{"subject":"Social Studies","teacher_name":"Jennifer Lee","teacher_id":14}]',
 NULL, 'active', 1),

(6, 2, 'Sunrise Public School', 'Grade 10', 'A', 'Grade 10-A',
 '2024-25', 'B-301', 35, 30,
 10, 'Robert Taylor', 'robert.taylor@sunriseschool.edu.in', '9876543215',
 '[{"subject":"Mathematics","teacher_name":"Robert Taylor","teacher_id":10}]',
 NULL, 'active', 1),

-- St. Mary's School
(7, 3, 'St. Mary\'s Convent School', 'Grade 7', 'A', 'Grade 7-A',
 '2024-25', 'C-101', 40, 36,
 11, 'Maria Garcia', 'maria.garcia@stmarys.edu.in', '9876543216',
 '[{"subject":"Science","teacher_name":"Maria Garcia","teacher_id":11},{"subject":"Mathematics","teacher_name":"James Martinez","teacher_id":12}]',
 NULL, 'active', 1),

(8, 3, 'St. Mary\'s Convent School', 'Grade 9', 'A', 'Grade 9-A',
 '2024-25', 'C-201', 38, 34,
 12, 'James Martinez', 'james.martinez@stmarys.edu.in', '9876543217',
 '[{"subject":"Mathematics","teacher_name":"James Martinez","teacher_id":12}]',
 NULL, 'active', 1),

(9, 3, 'St. Mary\'s Convent School', 'Grade 10', 'A', 'Grade 10-A',
 '2024-25', 'C-301', 35, 28,
 11, 'Maria Garcia', 'maria.garcia@stmarys.edu.in', '9876543216',
 NULL, NULL, 'active', 1);


-- =====================================================
-- 4. TRANSPORT_ROUTES TABLE (6 routes)
-- =====================================================

INSERT INTO `transport_routes` (
  `id`, `school_id`, `school_name`, `route_name`, `route_number`,
  `vehicle_number`, `vehicle_type`, `vehicle_model`, `vehicle_capacity`,
  `driver_name`, `driver_phone`, `driver_license`, `driver_address`,
  `conductor_name`, `conductor_phone`,
  `route_stops`, `total_distance`, `average_time`,
  `monthly_fee`, `annual_fee`, `total_students`, `student_list`,
  `status`, `is_active`
) VALUES
-- Green Valley Routes
(1, 1, 'Green Valley International School', 'Route A - Andheri North', 'GV-R001',
 'MH-02-AB-1234', 'Bus', 'Tata LP 407', 40,
 'Ramesh Patil', '9123456789', 'MH0120230001234', 'Andheri West, Mumbai',
 'Suresh Kumar', '9123456790',
 '[{"stop":"Andheri Station","time":"07:00"},{"stop":"JB Nagar","time":"07:15"},{"stop":"Marol","time":"07:30"},{"stop":"School","time":"07:50"}]',
 15.5, 50,
 2000, 22000, 25, '[{"student_id":1,"student_name":"John Doe"},{"student_id":2,"student_name":"Alice Williams"}]',
 'active', 1),

(2, 1, 'Green Valley International School', 'Route B - Andheri South', 'GV-R002',
 'MH-02-CD-5678', 'Bus', 'Ashok Leyland', 45,
 'Vijay Sharma', '9123456791', 'MH0120230005678', 'Andheri East, Mumbai',
 'Prakash Singh', '9123456792',
 '[{"stop":"Chakala","time":"07:00"},{"stop":"Airport","time":"07:20"},{"stop":"School","time":"07:45"}]',
 12.0, 45,
 1800, 19800, 30, NULL,
 'active', 1),

-- Sunrise Routes
(3, 2, 'Sunrise Public School', 'Route C - Koramangala', 'SR-R001',
 'KA-01-EF-9012', 'Bus', 'Tata LP 507', 42,
 'Murthy K', '9234567890', 'KA0120230009012', 'Koramangala, Bangalore',
 'Ravi Kumar', '9234567891',
 '[{"stop":"Sony World Junction","time":"07:00"},{"stop":"Forum Mall","time":"07:15"},{"stop":"School","time":"07:40"}]',
 10.0, 40,
 1900, 20900, 28, '[{"student_id":4,"student_name":"Emma Jones"}]',
 'active', 1),

(4, 2, 'Sunrise Public School', 'Route D - HSR Layout', 'SR-R002',
 'KA-01-GH-3456', 'Van', 'Force Traveller', 20,
 'Sunil Reddy', '9234567892', 'KA0120230003456', 'HSR Layout, Bangalore',
 NULL, NULL,
 '[{"stop":"HSR Club","time":"07:15"},{"stop":"27th Main","time":"07:25"},{"stop":"School","time":"07:50"}]',
 8.5, 35,
 1500, 16500, 15, NULL,
 'active', 1),

-- St. Mary's Routes
(5, 3, 'St. Mary\'s Convent School', 'Route E - Salt Lake', 'SM-R001',
 'WB-06-IJ-7890', 'Bus', 'Eicher Skyline', 38,
 'Biswas Roy', '9345678901', 'WB0620230007890', 'Salt Lake, Kolkata',
 'Gopal Das', '9345678902',
 '[{"stop":"City Centre","time":"07:00"},{"stop":"Tank No 5","time":"07:15"},{"stop":"School","time":"07:40"}]',
 9.0, 40,
 1700, 18700, 22, '[{"student_id":7,"student_name":"Liam Harris"}]',
 'active', 1),

(6, 3, 'St. Mary\'s Convent School', 'Route F - New Town', 'SM-R002',
 'WB-06-KL-2345', 'Bus', 'Tata Starbus', 40,
 'Rajesh Ghosh', '9345678903', 'WB0620230002345', 'New Town, Kolkata',
 'Amit Sen', '9345678904',
 '[{"stop":"Eco Park","time":"07:10"},{"stop":"Shapoorji","time":"07:25"},{"stop":"School","time":"07:50"}]',
 11.0, 40,
 1800, 19800, 18, NULL,
 'active', 1);


-- =====================================================
-- 5. TEACHERS TABLE (10 teachers with denormalized data)
-- =====================================================

INSERT INTO `teachers` (
  `id`, `user_id`, `employee_id`, `first_name`, `last_name`, `full_name`,
  `date_of_birth`, `age`, `gender`, `blood_group`, `photo_url`,
  `email`, `phone`, `alternate_phone`, `address`, `city`, `state`, `pincode`, `country`,
  `school_id`, `school_code`, `school_name`, `school_address`, `school_city`, `school_phone`,
  `designation`, `department`, `subjects`, `qualifications`, `experience_years`,
  `joining_date`, `employment_type`,
  `basic_salary`, `allowances`, `deductions`, `net_salary`,
  `salary_account_number`, `salary_bank_name`, `salary_ifsc_code`, `pan_number`,
  `assigned_classes`, `is_class_teacher`, `class_teacher_of`,
  `total_leaves_allowed`, `leaves_taken`, `leaves_remaining`, `attendance_percentage`,
  `emergency_contact_name`, `emergency_contact_phone`, `emergency_contact_relation`,
  `aadhar_number`, `status`, `is_active`
) VALUES
-- Green Valley Teachers
(1, 5, 'TEACH001', 'Sarah', 'Johnson', 'Sarah Johnson',
 '1985-03-15', 39, 'Female', 'O+', '/photos/sarah_johnson.jpg',
 'sarah.johnson@greenvalley.edu.in', '9876543210', '9876543220',
 '12 Linking Road, Bandra West', 'Mumbai', 'Maharashtra', '400050', 'India',
 1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', '022-12345678',
 'Senior Teacher', 'Mathematics', 'Mathematics, Statistics',
 'MSc Mathematics, BEd', 12, '2012-06-15', 'Permanent',
 45000, 10000, 5000, 50000,
 '123456789012', 'HDFC Bank', 'HDFC0001234', 'ABCDE1234F',
 '[{"class_id":1,"class_name":"Grade 5","section":"A"}]', 1, 'Grade 5-A',
 20, 5, 15, 95.5,
 'John Johnson', '9876543221', 'Husband',
 '1234-5678-9012', 'active', 1),

(2, 6, 'TEACH002', 'Michael', 'Brown', 'Michael Brown',
 '1982-07-22', 42, 'Male', 'A+', '/photos/michael_brown.jpg',
 'michael.brown@greenvalley.edu.in', '9876543211', '9876543222',
 '45 Hill Road, Bandra', 'Mumbai', 'Maharashtra', '400050', 'India',
 1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', '022-12345678',
 'Head of Science Department', 'Science', 'Physics, Chemistry, General Science',
 'MSc Physics, BEd, PhD', 15, '2009-04-10', 'Permanent',
 55000, 12000, 6000, 61000,
 '234567890123', 'ICICI Bank', 'ICIC0002345', 'BCDEF2345G',
 '[{"class_id":2,"class_name":"Grade 5","section":"B"},{"class_id":3,"class_name":"Grade 10","section":"A"}]', 1, 'Grade 5-B',
 20, 3, 17, 97.0,
 'Emma Brown', '9876543223', 'Wife',
 '2345-6789-0123', 'active', 1),

(3, 7, 'TEACH003', 'Emily', 'Davis', 'Emily Davis',
 '1990-11-30', 34, 'Female', 'B+', '/photos/emily_davis.jpg',
 'emily.davis@greenvalley.edu.in', '9876543212', '9876543224',
 '78 Carter Road, Bandra', 'Mumbai', 'Maharashtra', '400050', 'India',
 1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', '022-12345678',
 'Teacher', 'English', 'English Literature, Grammar',
 'MA English, BEd', 8, '2016-07-01', 'Permanent',
 40000, 8000, 4000, 44000,
 '345678901234', 'SBI', 'SBIN0003456', 'CDEFG3456H',
 '[{"class_id":3,"class_name":"Grade 10","section":"A"}]', 1, 'Grade 10-A',
 20, 8, 12, 92.0,
 'Robert Davis', '9876543225', 'Father',
 '3456-7890-1234', 'active', 1),

(4, 13, 'TEACH009', 'Patricia', 'Rodriguez', 'Patricia Rodriguez',
 '1988-05-10', 36, 'Female', 'AB+', '/photos/patricia_rodriguez.jpg',
 'patricia.rodriguez@greenvalley.edu.in', '9876543218', '9876543228',
 '90 Turner Road, Bandra', 'Mumbai', 'Maharashtra', '400050', 'India',
 1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', '022-12345678',
 'Senior Teacher', 'Science', 'Chemistry, Biology',
 'MSc Chemistry, BEd', 10, '2014-08-20', 'Permanent',
 48000, 10000, 5000, 53000,
 '456789012345', 'Axis Bank', 'UTIB0004567', 'DEFGH4567I',
 '[{"class_id":3,"class_name":"Grade 10","section":"A"}]', 0, NULL,
 20, 4, 16, 96.0,
 'Carlos Rodriguez', '9876543229', 'Husband',
 '4567-8901-2345', 'active', 1),

-- Sunrise Teachers
(5, 8, 'TEACH004', 'David', 'Wilson', 'David Wilson',
 '1983-09-18', 41, 'Male', 'O+', '/photos/david_wilson.jpg',
 'david.wilson@sunriseschool.edu.in', '9876543213', '9876543226',
 '123 MG Road, Koramangala', 'Bangalore', 'Karnataka', '560095', 'India',
 2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', '080-87654321',
 'Vice Principal', 'Mathematics', 'Mathematics, Computer Science',
 'MSc Mathematics, MEd', 16, '2008-05-12', 'Permanent',
 60000, 15000, 7000, 68000,
 '567890123456', 'HDFC Bank', 'HDFC0005678', 'EFGHI5678J',
 '[{"class_id":4,"class_name":"Grade 6","section":"A"}]', 1, 'Grade 6-A',
 20, 2, 18, 98.5,
 'Linda Wilson', '9876543227', 'Wife',
 '5678-9012-3456', 'active', 1),

(6, 9, 'TEACH005', 'Lisa', 'Anderson', 'Lisa Anderson',
 '1987-12-25', 37, 'Female', 'A-', '/photos/lisa_anderson.jpg',
 'lisa.anderson@sunriseschool.edu.in', '9876543214', '9876543228',
 '67 Indiranagar, 1st Stage', 'Bangalore', 'Karnataka', '560038', 'India',
 2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', '080-87654321',
 'Senior Teacher', 'English', 'English, Social Studies',
 'MA English, BEd', 11, '2013-07-15', 'Permanent',
 46000, 9000, 5000, 50000,
 '678901234567', 'ICICI Bank', 'ICIC0006789', 'FGHIJ6789K',
 '[{"class_id":5,"class_name":"Grade 8","section":"A"}]', 1, 'Grade 8-A',
 20, 6, 14, 94.0,
 'Mark Anderson', '9876543229', 'Husband',
 '6789-0123-4567', 'active', 1),

(7, 10, 'TEACH006', 'Robert', 'Taylor', 'Robert Taylor',
 '1980-04-08', 44, 'Male', 'B-', '/photos/robert_taylor.jpg',
 'robert.taylor@sunriseschool.edu.in', '9876543215', '9876543230',
 '89 HSR Layout, Sector 2', 'Bangalore', 'Karnataka', '560102', 'India',
 2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', '080-87654321',
 'Head of Mathematics', 'Mathematics', 'Advanced Mathematics, Calculus',
 'MSc Mathematics, PhD', 18, '2006-03-20', 'Permanent',
 65000, 16000, 8000, 73000,
 '789012345678', 'SBI', 'SBIN0007890', 'GHIJK7890L',
 '[{"class_id":6,"class_name":"Grade 10","section":"A"}]', 1, 'Grade 10-A',
 20, 1, 19, 99.0,
 'Susan Taylor', '9876543231', 'Wife',
 '7890-1234-5678', 'active', 1),

(8, 14, 'TEACH010', 'Jennifer', 'Lee', 'Jennifer Lee',
 '1992-08-14', 32, 'Female', 'O-', '/photos/jennifer_lee.jpg',
 'jennifer.lee@sunriseschool.edu.in', '9876543219', '9876543232',
 '34 Whitefield Road', 'Bangalore', 'Karnataka', '560066', 'India',
 2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', '080-87654321',
 'Teacher', 'Social Studies', 'History, Geography, Civics',
 'MA History, BEd', 6, '2018-06-01', 'Contract',
 38000, 7000, 3500, 41500,
 '890123456789', 'Axis Bank', 'UTIB0008901', 'HIJKL8901M',
 '[{"class_id":5,"class_name":"Grade 8","section":"A"}]', 0, NULL,
 15, 5, 10, 90.0,
 'David Lee', '9876543233', 'Brother',
 '8901-2345-6789', 'active', 1),

-- St. Mary's Teachers
(9, 11, 'TEACH007', 'Maria', 'Garcia', 'Maria Garcia',
 '1986-02-28', 38, 'Female', 'A+', '/photos/maria_garcia.jpg',
 'maria.garcia@stmarys.edu.in', '9876543216', '9876543234',
 '56 Park Street, Park Circus', 'Kolkata', 'West Bengal', '700017', 'India',
 3, 'SCH003', 'St. Mary\'s Convent School', '789 Park Street, Salt Lake', 'Kolkata', '033-23456789',
 'Senior Teacher', 'Science', 'Biology, Environmental Science',
 'MSc Biology, BEd', 13, '2011-09-05', 'Permanent',
 47000, 9500, 5000, 51500,
 '901234567890', 'HDFC Bank', 'HDFC0009012', 'IJKLM9012N',
 '[{"class_id":7,"class_name":"Grade 7","section":"A"},{"class_id":9,"class_name":"Grade 10","section":"A"}]', 1, 'Grade 7-A',
 20, 7, 13, 93.0,
 'Jose Garcia', '9876543235', 'Husband',
 '9012-3456-7890', 'active', 1),

(10, 12, 'TEACH008', 'James', 'Martinez', 'James Martinez',
 '1984-10-05', 40, 'Male', 'B+', '/photos/james_martinez.jpg',
 'james.martinez@stmarys.edu.in', '9876543217', '9876543236',
 '123 Ballygunge Circular Road', 'Kolkata', 'West Bengal', '700019', 'India',
 3, 'SCH003', 'St. Mary\'s Convent School', '789 Park Street, Salt Lake', 'Kolkata', '033-23456789',
 'Head of Mathematics', 'Mathematics', 'Mathematics, Algebra, Geometry',
 'MSc Mathematics, BEd, MEd', 14, '2010-07-22', 'Permanent',
 52000, 11000, 5500, 57500,
 '012345678901', 'ICICI Bank', 'ICIC0000123', 'JKLMN0123O',
 '[{"class_id":7,"class_name":"Grade 7","section":"A"},{"class_id":8,"class_name":"Grade 9","section":"A"}]', 1, 'Grade 9-A',
 20, 4, 16, 95.5,
 'Anna Martinez', '9876543237', 'Wife',
 '0123-4567-8901', 'active', 1);


-- =====================================================
-- 6. STUDENTS TABLE (10 students with fully denormalized data)
-- =====================================================

INSERT INTO `students` (
  `id`, `user_id`, `admission_no`, `roll_no`, `first_name`, `last_name`, `full_name`,
  `date_of_birth`, `age`, `gender`, `blood_group`, `photo_url`,
  `email`, `phone`, `alternate_phone`, `address`, `city`, `state`, `pincode`, `country`,
  `school_id`, `school_code`, `school_name`, `school_address`, `school_city`, `school_state`, `school_phone`, `school_email`,
  `class_id`, `class_name`, `section`, `class_section`, `room_number`, `academic_year`,
  `class_teacher_id`, `class_teacher_name`, `class_teacher_phone`, `class_teacher_email`,
  `father_name`, `father_phone`, `father_email`, `father_occupation`, `father_annual_income`,
  `mother_name`, `mother_phone`, `mother_email`, `mother_occupation`, `mother_annual_income`,
  `guardian_name`, `guardian_phone`, `guardian_email`,
  `emergency_contact_name`, `emergency_contact_phone`, `emergency_contact_relation`,
  `transport_required`, `route_id`, `route_name`, `route_number`, `vehicle_number`,
  `driver_name`, `driver_phone`, `pickup_point`, `drop_point`, `pickup_time`, `drop_time`, `transport_fee`,
  `current_grade`, `current_percentage`, `current_rank`, `total_attendance_percentage`,
  `total_annual_fee`, `fee_paid`, `fee_pending`, `fee_status`, `last_payment_date`, `last_payment_amount`, `next_due_date`,
  `has_scholarship`, `scholarship_name`, `scholarship_amount`,
  `admission_date`, `admission_type`, `height`, `weight`, `nationality`, `religion`, `caste`, `category`,
  `status`, `is_active`, `created_at`
) VALUES
-- Green Valley Students
(1, 15, 'STU2024001', 'GV5A01', 'John', 'Doe', 'John Doe',
 '2010-05-15', 14, 'Male', 'O+', '/photos/john_doe.jpg',
 'john.doe@student.greenvalley.edu.in', '9123456789', '9123456788',
 '456 Linking Road, Bandra West', 'Mumbai', 'Maharashtra', '400050', 'India',
 1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', 'Maharashtra', '022-12345678', 'info@greenvalley.edu.in',
 1, 'Grade 5', 'A', 'Grade 5-A', 'R-201', '2024-25',
 5, 'Sarah Johnson', '9876543210', 'sarah.johnson@greenvalley.edu.in',
 'Richard Doe', '9123456790', 'richard.doe@gmail.com', 'Software Engineer', 1800000,
 'Mary Doe', '9123456791', 'mary.doe@gmail.com', 'Teacher', 800000,
 NULL, NULL, NULL,
 'Richard Doe', '9123456790', 'Father',
 1, 1, 'Route A - Andheri North', 'GV-R001', 'MH-02-AB-1234',
 'Ramesh Patil', '9123456789', 'Andheri Station', 'Andheri Station', '07:00:00', '15:30:00', 2000,
 'A', 92.5, 3, 96.5,
 75000, 50000, 25000, 'Partial', '2024-11-15', 25000, '2025-01-15',
 0, NULL, NULL,
 '2020-04-01', 'Fresh', 145.5, 38.0, 'Indian', 'Hindu', 'General', 'General',
 'active', 1, '2024-01-15 10:30:00'),

(2, 16, 'STU2024002', 'GV5A02', 'Alice', 'Williams', 'Alice Williams',
 '2010-08-22', 14, 'Female', 'A+', '/photos/alice_williams.jpg',
 'alice.williams@student.greenvalley.edu.in', '9123456792', '9123456793',
 '789 Hill Road, Bandra', 'Mumbai', 'Maharashtra', '400050', 'India',
 1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', 'Maharashtra', '022-12345678', 'info@greenvalley.edu.in',
 1, 'Grade 5', 'A', 'Grade 5-A', 'R-201', '2024-25',
 5, 'Sarah Johnson', '9876543210', 'sarah.johnson@greenvalley.edu.in',
 'Robert Williams', '9123456794', 'robert.w@gmail.com', 'Doctor', 2500000,
 'Sarah Williams', '9123456795', 'sarah.w@gmail.com', 'Lawyer', 2000000,
 NULL, NULL, NULL,
 'Robert Williams', '9123456794', 'Father',
 1, 1, 'Route A - Andheri North', 'GV-R001', 'MH-02-AB-1234',
 'Ramesh Patil', '9123456789', 'JB Nagar', 'JB Nagar', '07:15:00', '15:15:00', 2000,
 'A+', 95.8, 1, 98.0,
 75000, 75000, 0, 'Paid', '2024-12-01', 75000, NULL,
 1, 'Merit Scholarship', 15000,
 '2020-04-01', 'Fresh', 148.0, 40.5, 'Indian', 'Christian', 'General', 'General',
 'active', 1, '2024-01-15 11:00:00'),

(3, 17, 'STU2024003', 'GV5B03', 'Bob', 'Smith', 'Bob Smith',
 '2010-11-10', 14, 'Male', 'B+', '/photos/bob_smith.jpg',
 'bob.smith@student.greenvalley.edu.in', '9123456796', '9123456797',
 '321 Carter Road, Bandra', 'Mumbai', 'Maharashtra', '400050', 'India',
 1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', 'Maharashtra', '022-12345678', 'info@greenvalley.edu.in',
 2, 'Grade 5', 'B', 'Grade 5-B', 'R-202', '2024-25',
 6, 'Michael Brown', '9876543211', 'michael.brown@greenvalley.edu.in',
 'John Smith', '9123456798', 'john.smith@company.com', 'Business Owner', 3000000,
 'Emma Smith', '9123456799', 'emma.smith@gmail.com', 'Homemaker', 0,
 NULL, NULL, NULL,
 'John Smith', '9123456798', 'Father',
 0, NULL, NULL, NULL, NULL,
 NULL, NULL, NULL, NULL, NULL, NULL, NULL,
 'B+', 88.5, 8, 94.0,
 75000, 40000, 35000, 'Pending', '2024-09-15', 40000, '2025-01-15',
 0, NULL, NULL,
 '2020-04-01', 'Fresh', 142.0, 36.0, 'Indian', 'Hindu', 'OBC', 'OBC',
 'active', 1, '2024-01-15 11:30:00'),

(4, 23, 'STU2024009', 'GV10A09', 'Noah', 'Thompson', 'Noah Thompson',
 '2008-03-12', 16, 'Male', 'AB+', '/photos/noah_thompson.jpg',
 'noah.thompson@student.greenvalley.edu.in', '9123456800', '9123456801',
 '567 Turner Road, Bandra', 'Mumbai', 'Maharashtra', '400050', 'India',
 1, 'SCH001', 'Green Valley International School', '123 MG Road, Andheri', 'Mumbai', 'Maharashtra', '022-12345678', 'info@greenvalley.edu.in',
 3, 'Grade 10', 'A', 'Grade 10-A', 'R-301', '2024-25',
 7, 'Emily Davis', '9876543212', 'emily.davis@greenvalley.edu.in',
 'William Thompson', '9123456802', 'william.t@company.com', 'Architect', 1500000,
 'Olivia Thompson', '9123456803', 'olivia.t@gmail.com', 'Designer', 1200000,
 NULL, NULL, NULL,
 'William Thompson', '9123456802', 'Father',
 1, 2, 'Route B - Andheri South', 'GV-R002', 'MH-02-CD-5678',
 'Vijay Sharma', '9123456791', 'Chakala', 'Chakala', '07:00:00', '15:45:00', 1800,
 'A', 91.2, 5, 95.5,
 90000, 60000, 30000, 'Partial', '2024-10-15', 30000, '2025-02-15',
 0, NULL, NULL,
 '2018-04-01', 'Fresh', 165.0, 55.0, 'Indian', 'Christian', 'General', 'General',
 'active', 1, '2024-01-15 12:00:00'),

-- Sunrise Students
(5, 18, 'STU2024004', 'SR6A04', 'Emma', 'Jones', 'Emma Jones',
 '2009-06-18', 15, 'Female', 'O-', '/photos/emma_jones.jpg',
 'emma.jones@student.sunriseschool.edu.in', '9234567890', '9234567891',
 '234 Koramangala 5th Block', 'Bangalore', 'Karnataka', '560095', 'India',
 2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', 'Karnataka', '080-87654321', 'contact@sunriseschool.edu.in',
 4, 'Grade 6', 'A', 'Grade 6-A', 'B-101', '2024-25',
 8, 'David Wilson', '9876543213', 'david.wilson@sunriseschool.edu.in',
 'Michael Jones', '9234567892', 'michael.jones@tech.com', 'IT Manager', 2000000,
 'Lisa Jones', '9234567893', 'lisa.jones@gmail.com', 'Pharmacist', 1000000,
 NULL, NULL, NULL,
 'Michael Jones', '9234567892', 'Father',
 1, 3, 'Route C - Koramangala', 'SR-R001', 'KA-01-EF-9012',
 'Murthy K', '9234567890', 'Forum Mall', 'Forum Mall', '07:15:00', '15:25:00', 1900,
 'A', 93.0, 2, 97.0,
 68000, 68000, 0, 'Paid', '2024-12-01', 68000, NULL,
 0, NULL, NULL,
 '2021-04-01', 'Fresh', 155.0, 45.0, 'Indian', 'Christian', 'General', 'General',
 'active', 1, '2024-01-15 12:30:00'),

(6, 19, 'STU2024005', 'SR8A05', 'Oliver', 'Thomas', 'Oliver Thomas',
 '2007-09-25', 17, 'Male', 'A-', '/photos/oliver_thomas.jpg',
 'oliver.thomas@student.sunriseschool.edu.in', '9234567894', '9234567895',
 '678 Indiranagar 2nd Stage', 'Bangalore', 'Karnataka', '560038', 'India',
 2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', 'Karnataka', '080-87654321', 'contact@sunriseschool.edu.in',
 5, 'Grade 8', 'A', 'Grade 8-A', 'B-201', '2024-25',
 9, 'Lisa Anderson', '9876543214', 'lisa.anderson@sunriseschool.edu.in',
 'Daniel Thomas', '9234567896', 'daniel.t@finance.com', 'Financial Analyst', 1800000,
 'Sophia Thomas', '9234567897', 'sophia.t@school.com', 'Teacher', 900000,
 NULL, NULL, NULL,
 'Daniel Thomas', '9234567896', 'Father',
 0, NULL, NULL, NULL, NULL,
 NULL, NULL, NULL, NULL, NULL, NULL, NULL,
 'B+', 86.5, 12, 92.0,
 72000, 36000, 36000, 'Pending', '2024-08-15', 36000, '2025-01-20',
 0, NULL, NULL,
 '2019-04-01', 'Fresh', 162.0, 52.0, 'Indian', 'Hindu', 'General', 'General',
 'active', 1, '2024-01-15 13:00:00'),

(7, 20, 'STU2024006', 'SR10A06', 'Sophia', 'Jackson', 'Sophia Jackson',
 '2006-12-08', 18, 'Female', 'B-', '/photos/sophia_jackson.jpg',
 'sophia.jackson@student.sunriseschool.edu.in', '9234567898', '9234567899',
 '901 HSR Layout Sector 1', 'Bangalore', 'Karnataka', '560102', 'India',
 2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', 'Karnataka', '080-87654321', 'contact@sunriseschool.edu.in',
 6, 'Grade 10', 'A', 'Grade 10-A', 'B-301', '2024-25',
 10, 'Robert Taylor', '9876543215', 'robert.taylor@sunriseschool.edu.in',
 'James Jackson', '9234567900', 'james.j@legal.com', 'Lawyer', 2500000,
 'Emily Jackson', '9234567901', 'emily.j@design.com', 'Interior Designer', 1500000,
 NULL, NULL, NULL,
 'James Jackson', '9234567900', 'Father',
 1, 4, 'Route D - HSR Layout', 'SR-R002', 'KA-01-GH-3456',
 'Sunil Reddy', '9234567892', 'HSR Club', 'HSR Club', '07:15:00', '15:35:00', 1500,
 'A+', 96.5, 1, 99.0,
 85000, 85000, 0, 'Paid', '2024-11-30', 85000, NULL,
 1, 'Academic Excellence Award', 20000,
 '2017-04-01', 'Fresh', 158.0, 48.0, 'Indian', 'Christian', 'General', 'General',
 'active', 1, '2024-01-15 13:30:00'),

(8, 24, 'STU2024010', 'SR6A10', 'Mia', 'White', 'Mia White',
 '2009-04-20', 15, 'Female', 'O+', '/photos/mia_white.jpg',
 'mia.white@student.sunriseschool.edu.in', '9234567902', '9234567903',
 '345 Whitefield Main Road', 'Bangalore', 'Karnataka', '560066', 'India',
 2, 'SCH002', 'Sunrise Public School', '456 Brigade Road, Koramangala', 'Bangalore', 'Karnataka', '080-87654321', 'contact@sunriseschool.edu.in',
 4, 'Grade 6', 'A', 'Grade 6-A', 'B-101', '2024-25',
 8, 'David Wilson', '9876543213', 'david.wilson@sunriseschool.edu.in',
 'Thomas White', '9234567904', 'thomas.w@startup.com', 'Entrepreneur', 3500000,
 'Jessica White', '9234567905', 'jessica.w@media.com', 'Journalist', 1200000,
 NULL, NULL, NULL,
 'Thomas White', '9234567904', 'Father',
 0, NULL, NULL, NULL, NULL,
 NULL, NULL, NULL, NULL, NULL, NULL, NULL,
 'A', 90.5, 4, 96.0,
 68000, 50000, 18000, 'Partial', '2024-10-01', 50000, '2025-01-10',
 0, NULL, NULL,
 '2021-04-01', 'Fresh', 152.0, 43.0, 'Indian', 'Hindu', 'General', 'General',
 'active', 1, '2024-01-15 14:00:00'),

-- St. Mary's Students
(9, 21, 'STU2024007', 'SM7A07', 'Liam', 'Harris', 'Liam Harris',
 '2008-07-14', 16, 'Male', 'A+', '/photos/liam_harris.jpg',
 'liam.harris@student.stmarys.edu.in', '9345678901', '9345678902',
 '432 Salt Lake City Centre', 'Kolkata', 'West Bengal', '700091', 'India',
 3, 'SCH003', 'St. Mary\'s Convent School', '789 Park Street, Salt Lake', 'Kolkata', 'West Bengal', '033-23456789', 'admin@stmarys.edu.in',
 7, 'Grade 7', 'A', 'Grade 7-A', 'C-101', '2024-25',
 11, 'Maria Garcia', '9876543216', 'maria.garcia@stmarys.edu.in',
 'Andrew Harris', '9345678903', 'andrew.h@bank.com', 'Bank Manager', 1600000,
 'Jennifer Harris', '9345678904', 'jennifer.h@school.com', 'Teacher', 800000,
 NULL, NULL, NULL,
 'Andrew Harris', '9345678903', 'Father',
 1, 5, 'Route E - Salt Lake', 'SM-R001', 'WB-06-IJ-7890',
 'Biswas Roy', '9345678901', 'City Centre', 'City Centre', '07:00:00', '15:40:00', 1700,
 'A', 92.8, 2, 97.5,
 62000, 62000, 0, 'Paid', '2024-12-05', 62000, NULL,
 0, NULL, NULL,
 '2020-04-01', 'Fresh', 160.0, 50.0, 'Indian', 'Christian', 'General', 'General',
 'active', 1, '2024-01-15 14:30:00'),

(10, 22, 'STU2024008', 'SM9A08', 'Ava', 'Martin', 'Ava Martin',
 '2007-01-30', 17, 'Female', 'B+', '/photos/ava_martin.jpg',
 'ava.martin@student.stmarys.edu.in', '9345678905', '9345678906',
 '765 Ballygunge Place', 'Kolkata', 'West Bengal', '700019', 'India',
 3, 'SCH003', 'St. Mary\'s Convent School', '789 Park Street, Salt Lake', 'Kolkata', 'West Bengal', '033-23456789', 'admin@stmarys.edu.in',
 8, 'Grade 9', 'A', 'Grade 9-A', 'C-201', '2024-25',
 12, 'James Martinez', '9876543217', 'james.martinez@stmarys.edu.in',
 'Christopher Martin', '9345678907', 'chris.m@export.com', 'Export Manager', 2200000,
 'Amanda Martin', '9345678908', 'amanda.m@hospital.com', 'Nurse', 900000,
 NULL, NULL, NULL,
 'Christopher Martin', '9345678907', 'Father',
 0, NULL, NULL, NULL, NULL,
 NULL, NULL, NULL, NULL, NULL, NULL, NULL,
 'A-', 89.5, 6, 94.5,
 70000, 35000, 35000, 'Pending', '2024-09-01', 35000, '2025-01-25',
 0, NULL, NULL,
 '2019-04-01', 'Fresh', 156.0, 47.0, 'Indian', 'Christian', 'General', 'General',
 'active', 1, '2024-01-15 15:00:00');


-- =====================================================
-- 7. SUBJECTS TABLE (15 subjects across schools)
-- =====================================================

INSERT INTO `subjects` (
  `id`, `school_id`, `school_name`, `class_id`, `class_name`, `section`, `academic_year`,
  `subject_name`, `subject_code`, `subject_type`, `description`,
  `teacher_id`, `teacher_name`, `teacher_email`, `teacher_phone`,
  `periods_per_week`, `total_hours`, `max_marks`, `min_pass_marks`,
  `practical_marks`, `theory_marks`, `textbook`, `status`, `is_active`
) VALUES
-- Green Valley - Grade 5A
(1, 1, 'Green Valley International School', 1, 'Grade 5', 'A', '2024-25',
 'Mathematics', 'MATH-5A', 'Core', 'Basic Mathematics including Arithmetic, Geometry',
 5, 'Sarah Johnson', 'sarah.johnson@greenvalley.edu.in', '9876543210',
 6, 36, 100, 35, 0, 100, 'NCERT Mathematics Class 5', 'active', 1),

(2, 1, 'Green Valley International School', 1, 'Grade 5', 'A', '2024-25',
 'Science', 'SCI-5A', 'Core', 'General Science - Physics, Chemistry, Biology basics',
 6, 'Michael Brown', 'michael.brown@greenvalley.edu.in', '9876543211',
 5, 30, 100, 35, 20, 80, 'NCERT Science Class 5', 'active', 1),

(3, 1, 'Green Valley International School', 1, 'Grade 5', 'A', '2024-25',
 'English', 'ENG-5A', 'Core', 'English Language and Literature',
 7, 'Emily Davis', 'emily.davis@greenvalley.edu.in', '9876543212',
 5, 30, 100, 35, 0, 100, 'NCERT English Class 5', 'active', 1),

-- Green Valley - Grade 10A
(4, 1, 'Green Valley International School', 3, 'Grade 10', 'A', '2024-25',
 'Physics', 'PHY-10A', 'Core', 'Physics - Mechanics, Optics, Electricity',
 7, 'Emily Davis', 'emily.davis@greenvalley.edu.in', '9876543212',
 5, 30, 100, 35, 30, 70, 'NCERT Physics Class 10', 'active', 1),

(5, 1, 'Green Valley International School', 3, 'Grade 10', 'A', '2024-25',
 'Chemistry', 'CHEM-10A', 'Core', 'Chemistry - Acids, Bases, Metals, Carbon',
 4, 'Patricia Rodriguez', 'patricia.rodriguez@greenvalley.edu.in', '9876543218',
 5, 30, 100, 35, 30, 70, 'NCERT Chemistry Class 10', 'active', 1),

(6, 1, 'Green Valley International School', 3, 'Grade 10', 'A', '2024-25',
 'Mathematics', 'MATH-10A', 'Core', 'Advanced Mathematics - Algebra, Trigonometry, Coordinate Geometry',
 5, 'Sarah Johnson', 'sarah.johnson@greenvalley.edu.in', '9876543210',
 6, 36, 100, 35, 0, 100, 'NCERT Mathematics Class 10', 'active', 1),

-- Sunrise - Grade 6A
(7, 2, 'Sunrise Public School', 4, 'Grade 6', 'A', '2024-25',
 'Mathematics', 'MATH-6A', 'Core', 'Mathematics - Number System, Algebra Basics, Geometry',
 8, 'David Wilson', 'david.wilson@sunriseschool.edu.in', '9876543213',
 6, 36, 100, 35, 0, 100, 'ICSE Mathematics Class 6', 'active', 1),

(8, 2, 'Sunrise Public School', 4, 'Grade 6', 'A', '2024-25',
 'English', 'ENG-6A', 'Core', 'English Language, Grammar, Composition',
 9, 'Lisa Anderson', 'lisa.anderson@sunriseschool.edu.in', '9876543214',
 5, 30, 100, 35, 0, 100, 'ICSE English Class 6', 'active', 1),

-- Sunrise - Grade 8A
(9, 2, 'Sunrise Public School', 5, 'Grade 8', 'A', '2024-25',
 'English', 'ENG-8A', 'Core', 'English Literature and Language',
 9, 'Lisa Anderson', 'lisa.anderson@sunriseschool.edu.in', '9876543214',
 5, 30, 100, 35, 0, 100, 'ICSE English Class 8', 'active', 1),

(10, 2, 'Sunrise Public School', 5, 'Grade 8', 'A', '2024-25',
 'Social Studies', 'SS-8A', 'Core', 'History, Geography, Civics',
 8, 'Jennifer Lee', 'jennifer.lee@sunriseschool.edu.in', '9876543219',
 4, 24, 100, 35, 0, 100, 'ICSE Social Studies Class 8', 'active', 1),

-- Sunrise - Grade 10A
(11, 2, 'Sunrise Public School', 6, 'Grade 10', 'A', '2024-25',
 'Mathematics', 'MATH-10A', 'Core', 'ICSE Board Mathematics',
 10, 'Robert Taylor', 'robert.taylor@sunriseschool.edu.in', '9876543215',
 6, 36, 100, 35, 0, 100, 'ICSE Mathematics Class 10', 'active', 1),

-- St. Mary's - Grade 7A
(12, 3, 'St. Mary\'s Convent School', 7, 'Grade 7', 'A', '2024-25',
 'Science', 'SCI-7A', 'Core', 'General Science',
 11, 'Maria Garcia', 'maria.garcia@stmarys.edu.in', '9876543216',
 5, 30, 100, 35, 20, 80, 'NCERT Science Class 7', 'active', 1),

(13, 3, 'St. Mary\'s Convent School', 7, 'Grade 7', 'A', '2024-25',
 'Mathematics', 'MATH-7A', 'Core', 'Mathematics - Integers, Fractions, Algebra',
 12, 'James Martinez', 'james.martinez@stmarys.edu.in', '9876543217',
 6, 36, 100, 35, 0, 100, 'NCERT Mathematics Class 7', 'active', 1),

-- St. Mary's - Grade 9A
(14, 3, 'St. Mary\'s Convent School', 8, 'Grade 9', 'A', '2024-25',
 'Mathematics', 'MATH-9A', 'Core', 'Mathematics - Polynomials, Linear Equations, Geometry',
 12, 'James Martinez', 'james.martinez@stmarys.edu.in', '9876543217',
 6, 36, 100, 35, 0, 100, 'NCERT Mathematics Class 9', 'active', 1),

(15, 3, 'St. Mary\'s Convent School', 8, 'Grade 9', 'A', '2024-25',
 'Science', 'SCI-9A', 'Core', 'Science - Matter, Organisms, Motion',
 11, 'Maria Garcia', 'maria.garcia@stmarys.edu.in', '9876543216',
 5, 30, 100, 35, 25, 75, 'NCERT Science Class 9', 'active', 1);


-- =====================================================
-- 8. EXAMS TABLE (6 exams)
-- =====================================================

INSERT INTO `exams` (
  `id`, `school_id`, `school_name`, `exam_name`, `exam_code`, `exam_type`, `academic_year`,
  `class_ids`, `class_names`, `start_date`, `end_date`, `result_date`,
  `max_marks`, `min_pass_marks`, `weightage`, `status`, `is_active`
) VALUES
-- Green Valley Exams
(1, 1, 'Green Valley International School', 'Unit Test 1', 'UT1-2024', 'Unit Test', '2024-25',
 '1,2,3', 'Grade 5-A, Grade 5-B, Grade 10-A', '2024-07-15', '2024-07-20', '2024-07-30',
 100, 35, 10.0, 'completed', 1),

(2, 1, 'Green Valley International School', 'Mid-Term Examination', 'MID-2024', 'Mid-term', '2024-25',
 '1,2,3', 'Grade 5-A, Grade 5-B, Grade 10-A', '2024-10-01', '2024-10-10', '2024-10-25',
 100, 35, 40.0, 'completed', 1),

(3, 1, 'Green Valley International School', 'Final Examination', 'FINAL-2024', 'Final', '2024-25',
 '1,2,3', 'Grade 5-A, Grade 5-B, Grade 10-A', '2025-03-01', '2025-03-15', '2025-03-30',
 100, 35, 50.0, 'scheduled', 1),

-- Sunrise Exams
(4, 2, 'Sunrise Public School', 'First Term Exam', 'TERM1-2024', 'Mid-term', '2024-25',
 '4,5,6', 'Grade 6-A, Grade 8-A, Grade 10-A', '2024-09-15', '2024-09-25', '2024-10-05',
 100, 35, 40.0, 'completed', 1),

(5, 2, 'Sunrise Public School', 'Second Term Exam', 'TERM2-2024', 'Final', '2024-25',
 '4,5,6', 'Grade 6-A, Grade 8-A, Grade 10-A', '2025-02-20', '2025-03-05', '2025-03-20',
 100, 35, 60.0, 'scheduled', 1),

-- St. Mary's Exams
(6, 3, 'St. Mary\'s Convent School', 'Quarterly Exam', 'Q1-2024', 'Unit Test', '2024-25',
 '7,8,9', 'Grade 7-A, Grade 9-A, Grade 10-A', '2024-08-20', '2024-08-28', '2024-09-10',
 100, 35, 25.0, 'completed', 1);


-- =====================================================
-- 9. ATTENDANCE TABLE (50 records - sample)
-- =====================================================

INSERT INTO `attendance` (
  `id`, `school_id`, `school_name`, `student_id`, `student_name`, `admission_no`, `roll_no`,
  `class_id`, `class_name`, `section`, `date`, `status`,
  `check_in_time`, `check_out_time`, `subject_id`, `subject_name`,
  `marked_by_id`, `marked_by_name`, `remarks`, `academic_year`, `month`, `week`, `marked_at`
) VALUES
-- John Doe - December attendance
(1, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', '2024-12-02', 'present', '07:55:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', NULL, '2024-25', 12, 49, '2024-12-02 08:00:00'),

(2, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', '2024-12-03', 'present', '07:50:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', NULL, '2024-25', 12, 49, '2024-12-03 08:00:00'),

(3, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', '2024-12-04', 'late', '08:15:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', 'Late by 15 minutes', '2024-25', 12, 49, '2024-12-04 08:15:00'),

(4, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', '2024-12-05', 'present', '07:58:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', NULL, '2024-25', 12, 49, '2024-12-05 08:00:00'),

(5, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', '2024-12-06', 'absent', NULL, NULL, NULL, NULL,
 5, 'Sarah Johnson', 'Sick leave', '2024-25', 12, 49, '2024-12-06 08:00:00'),

-- Alice Williams - December attendance
(6, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', '2024-12-02', 'present', '07:45:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', NULL, '2024-25', 12, 49, '2024-12-02 08:00:00'),

(7, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', '2024-12-03', 'present', '07:48:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', NULL, '2024-25', 12, 49, '2024-12-03 08:00:00'),

(8, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', '2024-12-04', 'present', '07:50:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', NULL, '2024-25', 12, 49, '2024-12-04 08:00:00'),

(9, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', '2024-12-05', 'present', '07:52:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', NULL, '2024-25', 12, 49, '2024-12-05 08:00:00'),

(10, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', '2024-12-06', 'present', '07:47:00', '14:30:00', NULL, NULL,
 5, 'Sarah Johnson', NULL, '2024-25', 12, 49, '2024-12-06 08:00:00'),

-- Emma Jones - December attendance
(11, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', '2024-12-02', 'present', '07:55:00', '15:00:00', NULL, NULL,
 8, 'David Wilson', NULL, '2024-25', 12, 49, '2024-12-02 08:00:00'),

(12, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', '2024-12-03', 'present', '07:58:00', '15:00:00', NULL, NULL,
 8, 'David Wilson', NULL, '2024-25', 12, 49, '2024-12-03 08:00:00'),

(13, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', '2024-12-04', 'present', '07:52:00', '15:00:00', NULL, NULL,
 8, 'David Wilson', NULL, '2024-25', 12, 49, '2024-12-04 08:00:00'),

(14, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', '2024-12-05', 'present', '07:56:00', '15:00:00', NULL, NULL,
 8, 'David Wilson', NULL, '2024-25', 12, 49, '2024-12-05 08:00:00'),

(15, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', '2024-12-06', 'present', '07:54:00', '15:00:00', NULL, NULL,
 8, 'David Wilson', NULL, '2024-25', 12, 49, '2024-12-06 08:00:00');


-- =====================================================
-- 10. MARKS TABLE (30 records - Mid-Term Exam results)
-- =====================================================

INSERT INTO `marks` (
  `id`, `school_id`, `school_name`, `student_id`, `student_name`, `admission_no`, `roll_no`,
  `class_id`, `class_name`, `section`, `exam_id`, `exam_name`, `exam_code`, `exam_type`,
  `subject_id`, `subject_name`, `subject_code`,
  `theory_marks`, `practical_marks`, `total_marks_obtained`, `max_marks`, `percentage`, `grade`,
  `is_absent`, `pass_status`, `entered_by_id`, `entered_by_name`, `academic_year`, `entered_at`
) VALUES
-- John Doe - Mid-Term Marks
(1, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 1, 'Mathematics', 'MATH-5A', 87.0, 0, 87.0, 100, 87.0, 'A',
 0, 'Pass', 5, 'Sarah Johnson', '2024-25', '2024-10-25 10:00:00'),

(2, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 2, 'Science', 'SCI-5A', 78.0, 16.0, 94.0, 100, 94.0, 'A+',
 0, 'Pass', 6, 'Michael Brown', '2024-25', '2024-10-25 10:30:00'),

(3, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 3, 'English', 'ENG-5A', 92.0, 0, 92.0, 100, 92.0, 'A+',
 0, 'Pass', 7, 'Emily Davis', '2024-25', '2024-10-25 11:00:00'),

-- Alice Williams - Mid-Term Marks
(4, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 1, 'Mathematics', 'MATH-5A', 96.0, 0, 96.0, 100, 96.0, 'A+',
 0, 'Pass', 5, 'Sarah Johnson', '2024-25', '2024-10-25 10:00:00'),

(5, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 2, 'Science', 'SCI-5A', 76.0, 19.0, 95.0, 100, 95.0, 'A+',
 0, 'Pass', 6, 'Michael Brown', '2024-25', '2024-10-25 10:30:00'),

(6, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 3, 'English', 'ENG-5A', 96.0, 0, 96.0, 100, 96.0, 'A+',
 0, 'Pass', 7, 'Emily Davis', '2024-25', '2024-10-25 11:00:00'),

-- Bob Smith - Mid-Term Marks
(7, 1, 'Green Valley International School', 3, 'Bob Smith', 'STU2024003', 'GV5B03',
 2, 'Grade 5', 'B', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 1, 'Mathematics', 'MATH-5A', 82.0, 0, 82.0, 100, 82.0, 'A',
 0, 'Pass', 5, 'Sarah Johnson', '2024-25', '2024-10-25 10:00:00'),

(8, 1, 'Green Valley International School', 3, 'Bob Smith', 'STU2024003', 'GV5B03',
 2, 'Grade 5', 'B', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 2, 'Science', 'SCI-5A', 69.0, 16.0, 85.0, 100, 85.0, 'A',
 0, 'Pass', 6, 'Michael Brown', '2024-25', '2024-10-25 10:30:00'),

-- Noah Thompson - Mid-Term Marks (Grade 10)
(9, 1, 'Green Valley International School', 4, 'Noah Thompson', 'STU2024009', 'GV10A09',
 3, 'Grade 10', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 4, 'Physics', 'PHY-10A', 64.0, 27.0, 91.0, 100, 91.0, 'A+',
 0, 'Pass', 7, 'Emily Davis', '2024-25', '2024-10-25 12:00:00'),

(10, 1, 'Green Valley International School', 4, 'Noah Thompson', 'STU2024009', 'GV10A09',
 3, 'Grade 10', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 5, 'Chemistry', 'CHEM-10A', 63.0, 28.0, 91.0, 100, 91.0, 'A+',
 0, 'Pass', 4, 'Patricia Rodriguez', '2024-25', '2024-10-25 12:30:00'),

(11, 1, 'Green Valley International School', 4, 'Noah Thompson', 'STU2024009', 'GV10A09',
 3, 'Grade 10', 'A', 2, 'Mid-Term Examination', 'MID-2024', 'Mid-term',
 6, 'Mathematics', 'MATH-10A', 92.0, 0, 92.0, 100, 92.0, 'A+',
 0, 'Pass', 5, 'Sarah Johnson', '2024-25', '2024-10-25 13:00:00'),

-- Emma Jones - First Term Marks
(12, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', 4, 'First Term Exam', 'TERM1-2024', 'Mid-term',
 7, 'Mathematics', 'MATH-6A', 94.0, 0, 94.0, 100, 94.0, 'A+',
 0, 'Pass', 8, 'David Wilson', '2024-25', '2024-10-05 10:00:00'),

(13, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', 4, 'First Term Exam', 'TERM1-2024', 'Mid-term',
 8, 'English', 'ENG-6A', 91.0, 0, 91.0, 100, 91.0, 'A+',
 0, 'Pass', 9, 'Lisa Anderson', '2024-25', '2024-10-05 10:30:00'),

-- Oliver Thomas - First Term Marks
(14, 2, 'Sunrise Public School', 6, 'Oliver Thomas', 'STU2024005', 'SR8A05',
 5, 'Grade 8', 'A', 4, 'First Term Exam', 'TERM1-2024', 'Mid-term',
 9, 'English', 'ENG-8A', 84.0, 0, 84.0, 100, 84.0, 'A',
 0, 'Pass', 9, 'Lisa Anderson', '2024-25', '2024-10-05 11:00:00'),

(15, 2, 'Sunrise Public School', 6, 'Oliver Thomas', 'STU2024005', 'SR8A05',
 5, 'Grade 8', 'A', 4, 'First Term Exam', 'TERM1-2024', 'Mid-term',
 10, 'Social Studies', 'SS-8A', 88.0, 0, 88.0, 100, 88.0, 'A',
 0, 'Pass', 8, 'Jennifer Lee', '2024-25', '2024-10-05 11:30:00'),

-- Sophia Jackson - First Term Marks (Grade 10)
(16, 2, 'Sunrise Public School', 7, 'Sophia Jackson', 'STU2024006', 'SR10A06',
 6, 'Grade 10', 'A', 4, 'First Term Exam', 'TERM1-2024', 'Mid-term',
 11, 'Mathematics', 'MATH-10A', 97.0, 0, 97.0, 100, 97.0, 'A+',
 0, 'Pass', 10, 'Robert Taylor', '2024-25', '2024-10-05 12:00:00'),

-- Liam Harris - Quarterly Exam Marks
(17, 3, 'St. Mary\'s Convent School', 9, 'Liam Harris', 'STU2024007', 'SM7A07',
 7, 'Grade 7', 'A', 6, 'Quarterly Exam', 'Q1-2024', 'Unit Test',
 12, 'Science', 'SCI-7A', 73.0, 19.0, 92.0, 100, 92.0, 'A+',
 0, 'Pass', 11, 'Maria Garcia', '2024-25', '2024-09-10 10:00:00'),

(18, 3, 'St. Mary\'s Convent School', 9, 'Liam Harris', 'STU2024007', 'SM7A07',
 7, 'Grade 7', 'A', 6, 'Quarterly Exam', 'Q1-2024', 'Unit Test',
 13, 'Mathematics', 'MATH-7A', 94.0, 0, 94.0, 100, 94.0, 'A+',
 0, 'Pass', 12, 'James Martinez', '2024-25', '2024-09-10 10:30:00'),

-- Ava Martin - Quarterly Exam Marks
(19, 3, 'St. Mary\'s Convent School', 10, 'Ava Martin', 'STU2024008', 'SM9A08',
 8, 'Grade 9', 'A', 6, 'Quarterly Exam', 'Q1-2024', 'Unit Test',
 14, 'Mathematics', 'MATH-9A', 88.0, 0, 88.0, 100, 88.0, 'A',
 0, 'Pass', 12, 'James Martinez', '2024-25', '2024-09-10 11:00:00'),

(20, 3, 'St. Mary\'s Convent School', 10, 'Ava Martin', 'STU2024008', 'SM9A08',
 8, 'Grade 9', 'A', 6, 'Quarterly Exam', 'Q1-2024', 'Unit Test',
 15, 'Science', 'SCI-9A', 68.0, 22.0, 90.0, 100, 90.0, 'A+',
 0, 'Pass', 11, 'Maria Garcia', '2024-25', '2024-09-10 11:30:00');


-- =====================================================
-- 11. FEE_STRUCTURES TABLE (12 fee types)
-- =====================================================

INSERT INTO `fee_structures` (
  `id`, `school_id`, `school_name`, `class_id`, `class_name`, `fee_type`, `fee_category`,
  `amount`, `academic_year`, `term`, `due_date`, `description`,
  `is_mandatory`, `late_fee_applicable`, `late_fee_amount`, `status`, `is_active`
) VALUES
-- Green Valley - Grade 5
(1, 1, 'Green Valley International School', 1, 'Grade 5', 'Tuition Fee', 'Academic',
 50000, '2024-25', 'Annual', '2024-04-30', 'Annual tuition fee for Grade 5',
 1, 1, 500, 'active', 1),

(2, 1, 'Green Valley International School', 1, 'Grade 5', 'Transport Fee', 'Transport',
 24000, '2024-25', 'Annual', '2024-04-30', 'Annual transport fee (if opted)',
 0, 1, 200, 'active', 1),

(3, 1, 'Green Valley International School', 1, 'Grade 5', 'Library Fee', 'Academic',
 1000, '2024-25', 'Annual', '2024-05-31', 'Library membership and books',
 1, 0, 0, 'active', 1),

-- Green Valley - Grade 10
(4, 1, 'Green Valley International School', 3, 'Grade 10', 'Tuition Fee', 'Academic',
 65000, '2024-25', 'Annual', '2024-04-30', 'Annual tuition fee for Grade 10',
 1, 1, 650, 'active', 1),

(5, 1, 'Green Valley International School', 3, 'Grade 10', 'Lab Fee', 'Academic',
 5000, '2024-25', 'Annual', '2024-05-31', 'Science lab and computer lab fee',
 1, 1, 100, 'active', 1),

-- Sunrise - Grade 6
(6, 2, 'Sunrise Public School', 4, 'Grade 6', 'Tuition Fee', 'Academic',
 45000, '2024-25', 'Annual', '2024-04-30', 'Annual tuition fee for Grade 6',
 1, 1, 450, 'active', 1),

(7, 2, 'Sunrise Public School', 4, 'Grade 6', 'Transport Fee', 'Transport',
 22800, '2024-25', 'Annual', '2024-04-30', 'Annual transport fee',
 0, 1, 200, 'active', 1),

-- Sunrise - Grade 10
(8, 2, 'Sunrise Public School', 6, 'Grade 10', 'Tuition Fee', 'Academic',
 60000, '2024-25', 'Annual', '2024-04-30', 'Annual tuition fee for Grade 10',
 1, 1, 600, 'active', 1),

(9, 2, 'Sunrise Public School', 6, 'Grade 10', 'Exam Fee', 'Academic',
 5000, '2024-25', 'Annual', '2024-12-31', 'Board exam registration fee',
 1, 0, 0, 'active', 1),

-- St. Mary's - Grade 7
(10, 3, 'St. Mary\'s Convent School', 7, 'Grade 7', 'Tuition Fee', 'Academic',
 42000, '2024-25', 'Annual', '2024-04-30', 'Annual tuition fee for Grade 7',
 1, 1, 420, 'active', 1),

(11, 3, 'St. Mary\'s Convent School', 7, 'Grade 7', 'Transport Fee', 'Transport',
 20400, '2024-25', 'Annual', '2024-04-30', 'Annual transport fee',
 0, 1, 200, 'active', 1),

-- St. Mary's - Grade 9
(12, 3, 'St. Mary\'s Convent School', 8, 'Grade 9', 'Tuition Fee', 'Academic',
 48000, '2024-25', 'Annual', '2024-04-30', 'Annual tuition fee for Grade 9',
 1, 1, 480, 'active', 1);


-- =====================================================
-- 12. FEE_PAYMENTS TABLE (20 payment records)
-- =====================================================

INSERT INTO `fee_payments` (
  `id`, `school_id`, `school_name`, `student_id`, `student_name`, `admission_no`, `roll_no`,
  `class_id`, `class_name`, `section`, `fee_structure_id`, `fee_type`, `fee_category`,
  `receipt_number`, `payment_date`, `total_fee_amount`, `concession_amount`, `late_fee_amount`,
  `net_amount`, `amount_paid`, `balance_amount`, `payment_mode`, `transaction_id`,
  `bank_name`, `payment_status`, `received_by_id`, `received_by_name`, `academic_year`, `created_at`
) VALUES
-- John Doe - Payments
(1, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', 1, 'Tuition Fee', 'Academic',
 'GV-2024-001', '2024-04-15', 50000, 0, 0, 50000, 25000, 25000,
 'Online', 'TXN123456789', 'HDFC Bank', 'Partial', 2, 'Admin Green Valley', '2024-25', '2024-04-15 10:30:00'),

(2, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', 2, 'Transport Fee', 'Transport',
 'GV-2024-002', '2024-04-15', 24000, 0, 0, 24000, 24000, 0,
 'Online', 'TXN123456790', 'HDFC Bank', 'Paid', 2, 'Admin Green Valley', '2024-25', '2024-04-15 10:35:00'),

(3, 1, 'Green Valley International School', 1, 'John Doe', 'STU2024001', 'GV5A01',
 1, 'Grade 5', 'A', 3, 'Library Fee', 'Academic',
 'GV-2024-003', '2024-05-20', 1000, 0, 0, 1000, 1000, 0,
 'Cash', NULL, NULL, 'Paid', 2, 'Admin Green Valley', '2024-25', '2024-05-20 11:00:00'),

-- Alice Williams - Payments (Full with scholarship)
(4, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', 1, 'Tuition Fee', 'Academic',
 'GV-2024-004', '2024-04-10', 50000, 15000, 0, 35000, 35000, 0,
 'Cheque', 'CHQ987654', 'ICICI Bank', 'Paid', 2, 'Admin Green Valley', '2024-25', '2024-04-10 09:00:00'),

(5, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', 2, 'Transport Fee', 'Transport',
 'GV-2024-005', '2024-04-10', 24000, 0, 0, 24000, 24000, 0,
 'Cheque', 'CHQ987655', 'ICICI Bank', 'Paid', 2, 'Admin Green Valley', '2024-25', '2024-04-10 09:05:00'),

(6, 1, 'Green Valley International School', 2, 'Alice Williams', 'STU2024002', 'GV5A02',
 1, 'Grade 5', 'A', 3, 'Library Fee', 'Academic',
 'GV-2024-006', '2024-05-15', 1000, 0, 0, 1000, 1000, 0,
 'Online', 'TXN789456123', 'ICICI Bank', 'Paid', 2, 'Admin Green Valley', '2024-25', '2024-05-15 10:00:00'),

-- Bob Smith - Partial Payment
(7, 1, 'Green Valley International School', 3, 'Bob Smith', 'STU2024003', 'GV5B03',
 2, 'Grade 5', 'B', 1, 'Tuition Fee', 'Academic',
 'GV-2024-007', '2024-04-20', 50000, 0, 0, 50000, 20000, 30000,
 'Cash', NULL, NULL, 'Partial', 2, 'Admin Green Valley', '2024-25', '2024-04-20 11:30:00'),

(8, 1, 'Green Valley International School', 3, 'Bob Smith', 'STU2024003', 'GV5B03',
 2, 'Grade 5', 'B', 1, 'Tuition Fee', 'Academic',
 'GV-2024-008', '2024-09-15', 50000, 0, 0, 50000, 20000, 10000,
 'Online', 'TXN456789123', 'SBI', 'Partial', 2, 'Admin Green Valley', '2024-25', '2024-09-15 14:00:00'),

-- Noah Thompson - Payments
(9, 1, 'Green Valley International School', 4, 'Noah Thompson', 'STU2024009', 'GV10A09',
 3, 'Grade 10', 'A', 4, 'Tuition Fee', 'Academic',
 'GV-2024-009', '2024-04-25', 65000, 0, 0, 65000, 35000, 30000,
 'Online', 'TXN321654987', 'Axis Bank', 'Partial', 2, 'Admin Green Valley', '2024-25', '2024-04-25 10:00:00'),

(10, 1, 'Green Valley International School', 4, 'Noah Thompson', 'STU2024009', 'GV10A09',
 3, 'Grade 10', 'A', 4, 'Tuition Fee', 'Academic',
 'GV-2024-010', '2024-10-15', 65000, 0, 0, 65000, 30000, 0,
 'Online', 'TXN654987321', 'Axis Bank', 'Paid', 2, 'Admin Green Valley', '2024-25', '2024-10-15 11:00:00'),

-- Emma Jones - Full Payment
(11, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', 6, 'Tuition Fee', 'Academic',
 'SR-2024-001', '2024-04-05', 45000, 0, 0, 45000, 45000, 0,
 'Online', 'TXN111222333', 'HDFC Bank', 'Paid', 3, 'Admin Sunrise', '2024-25', '2024-04-05 09:00:00'),

(12, 2, 'Sunrise Public School', 5, 'Emma Jones', 'STU2024004', 'SR6A04',
 4, 'Grade 6', 'A', 7, 'Transport Fee', 'Transport',
 'SR-2024-002', '2024-04-05', 22800, 0, 0, 22800, 22800, 0,
 'Online', 'TXN111222334', 'HDFC Bank', 'Paid', 3, 'Admin Sunrise', '2024-25', '2024-04-05 09:05:00'),

-- Oliver Thomas - Partial Payment
(13, 2, 'Sunrise Public School', 6, 'Oliver Thomas', 'STU2024005', 'SR8A05',
 5, 'Grade 8', 'A', 6, 'Tuition Fee', 'Academic',
 'SR-2024-003', '2024-04-18', 45000, 0, 0, 45000, 18000, 27000,
 'Cash', NULL, NULL, 'Partial', 3, 'Admin Sunrise', '2024-25', '2024-04-18 10:30:00'),

(14, 2, 'Sunrise Public School', 6, 'Oliver Thomas', 'STU2024005', 'SR8A05',
 5, 'Grade 8', 'A', 6, 'Tuition Fee', 'Academic',
 'SR-2024-004', '2024-08-15', 45000, 0, 0, 45000, 18000, 9000,
 'Online', 'TXN444555666', 'ICICI Bank', 'Partial', 3, 'Admin Sunrise', '2024-25', '2024-08-15 11:00:00'),

-- Sophia Jackson - Full Payment with Scholarship
(15, 2, 'Sunrise Public School', 7, 'Sophia Jackson', 'STU2024006', 'SR10A06',
 6, 'Grade 10', 'A', 8, 'Tuition Fee', 'Academic',
 'SR-2024-005', '2024-04-01', 60000, 20000, 0, 40000, 40000, 0,
 'Cheque', 'CHQ555666', 'SBI', 'Paid', 3, 'Admin Sunrise', '2024-25', '2024-04-01 09:00:00'),

(16, 2, 'Sunrise Public School', 7, 'Sophia Jackson', 'STU2024006', 'SR10A06',
 6, 'Grade 10', 'A', 7, 'Transport Fee', 'Transport',
 'SR-2024-006', '2024-04-01', 18000, 0, 0, 18000, 18000, 0,
 'Cheque', 'CHQ555667', 'SBI', 'Paid', 3, 'Admin Sunrise', '2024-25', '2024-04-01 09:05:00'),

(17, 2, 'Sunrise Public School', 7, 'Sophia Jackson', 'STU2024006', 'SR10A06',
 6, 'Grade 10', 'A', 9, 'Exam Fee', 'Academic',
 'SR-2024-007', '2024-11-30', 5000, 0, 0, 5000, 5000, 0,
 'Online', 'TXN777888999', 'SBI', 'Paid', 3, 'Admin Sunrise', '2024-25', '2024-11-30 10:00:00'),

-- Liam Harris - Full Payment
(18, 3, 'St. Mary\'s Convent School', 9, 'Liam Harris', 'STU2024007', 'SM7A07',
 7, 'Grade 7', 'A', 10, 'Tuition Fee', 'Academic',
 'SM-2024-001', '2024-04-08', 42000, 0, 0, 42000, 42000, 0,
 'Online', 'TXN888999000', 'HDFC Bank', 'Paid', 4, 'Admin St Marys', '2024-25', '2024-04-08 09:30:00'),

(19, 3, 'St. Mary\'s Convent School', 9, 'Liam Harris', 'STU2024007', 'SM7A07',
 7, 'Grade 7', 'A', 11, 'Transport Fee', 'Transport',
 'SM-2024-002', '2024-04-08', 20400, 0, 0, 20400, 20400, 0,
 'Online', 'TXN888999001', 'HDFC Bank', 'Paid', 4, 'Admin St Marys', '2024-25', '2024-04-08 09:35:00'),

-- Ava Martin - Partial Payment
(20, 3, 'St. Mary\'s Convent School', 10, 'Ava Martin', 'STU2024008', 'SM9A08',
 8, 'Grade 9', 'A', 12, 'Tuition Fee', 'Academic',
 'SM-2024-003', '2024-04-22', 48000, 0, 0, 48000, 24000, 24000,
 'Cash', NULL, NULL, 'Partial', 4, 'Admin St Marys', '2024-25', '2024-04-22 10:00:00');


-- =====================================================
-- Reset foreign key checks
-- =====================================================

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- Summary
-- =====================================================

SELECT 'Sample data inserted successfully!' AS status;
SELECT 
    (SELECT COUNT(*) FROM schools) AS schools_count,
    (SELECT COUNT(*) FROM users) AS users_count,
    (SELECT COUNT(*) FROM classes) AS classes_count,
    (SELECT COUNT(*) FROM transport_routes) AS routes_count,
    (SELECT COUNT(*) FROM teachers) AS teachers_count,
    (SELECT COUNT(*) FROM students) AS students_count,
    (SELECT COUNT(*) FROM subjects) AS subjects_count,
    (SELECT COUNT(*) FROM exams) AS exams_count,
    (SELECT COUNT(*) FROM attendance) AS attendance_count,
    (SELECT COUNT(*) FROM marks) AS marks_count,
    (SELECT COUNT(*) FROM fee_structures) AS fee_structures_count,
    (SELECT COUNT(*) FROM fee_payments) AS fee_payments_count;
