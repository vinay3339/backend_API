-- =====================================================
-- MySQL Database Schema - Denormalized Architecture
-- School Management System
-- All tables designed for single-table queries with filters
-- =====================================================

-- Set character set and collation
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- 1. USERS TABLE (Authentication)
-- =====================================================

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `hashed_password` VARCHAR(255) NOT NULL,
  `role` ENUM('super_admin', 'school_admin', 'teacher', 'student', 'parent') NOT NULL,
  
  -- School info (denormalized)
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Status
  `is_active` TINYINT(1) DEFAULT 1,
  `is_first_login` TINYINT(1) DEFAULT 1,
  `last_login` DATETIME DEFAULT NULL,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX `idx_users_username` (`username`),
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_school_id` (`school_id`),
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 2. SCHOOLS TABLE (Reference)
-- =====================================================

DROP TABLE IF EXISTS `schools`;
CREATE TABLE `schools` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_code` VARCHAR(50) NOT NULL UNIQUE,
  `school_name` VARCHAR(200) NOT NULL,
  `address` TEXT,
  `city` VARCHAR(100),
  `state` VARCHAR(100),
  `pincode` VARCHAR(10),
  `phone` VARCHAR(20),
  `email` VARCHAR(100),
  `principal_name` VARCHAR(100),
  `board` VARCHAR(50) COMMENT 'CBSE, ICSE, State Board',
  `affiliation_no` VARCHAR(50),
  `logo_url` VARCHAR(255),
  `primary_color` VARCHAR(7) COMMENT 'Hex color',
  `secondary_color` VARCHAR(7) COMMENT 'Hex color',
  `is_active` TINYINT(1) DEFAULT 1,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX `idx_schools_code` (`school_code`),
  INDEX `idx_schools_name` (`school_name`),
  INDEX `idx_schools_city` (`city`),
  INDEX `idx_schools_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 3. STUDENTS TABLE (DENORMALIZED - 80+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- User Account Link
  `user_id` INT DEFAULT NULL COMMENT 'Links to users table (not FK)',
  
  -- ==================== PERSONAL INFORMATION ====================
  `admission_no` VARCHAR(50) NOT NULL UNIQUE,
  `roll_no` VARCHAR(50) DEFAULT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) DEFAULT NULL,
  `full_name` VARCHAR(200) DEFAULT NULL COMMENT 'Computed field',
  `date_of_birth` DATE DEFAULT NULL,
  `age` INT DEFAULT NULL COMMENT 'Computed from DOB',
  `gender` VARCHAR(20) DEFAULT NULL,
  `blood_group` VARCHAR(10) DEFAULT NULL,
  `photo_url` VARCHAR(255) DEFAULT NULL,
  
  -- ==================== CONTACT INFORMATION ====================
  `email` VARCHAR(100) DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `alternate_phone` VARCHAR(20) DEFAULT NULL,
  `address` TEXT,
  `city` VARCHAR(100) DEFAULT NULL,
  `state` VARCHAR(100) DEFAULT NULL,
  `pincode` VARCHAR(10) DEFAULT NULL,
  `country` VARCHAR(100) DEFAULT 'India',
  
  -- ==================== SCHOOL INFORMATION (Denormalized) ====================
  `school_id` INT DEFAULT NULL COMMENT 'For filtering, not FK',
  `school_code` VARCHAR(50) DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  `school_address` TEXT,
  `school_city` VARCHAR(100) DEFAULT NULL,
  `school_state` VARCHAR(100) DEFAULT NULL,
  `school_phone` VARCHAR(20) DEFAULT NULL,
  `school_email` VARCHAR(100) DEFAULT NULL,
  
  -- ==================== CLASS INFORMATION (Denormalized) ====================
  `class_id` INT DEFAULT NULL COMMENT 'For filtering, not FK',
  `class_name` VARCHAR(100) DEFAULT NULL,
  `section` VARCHAR(10) DEFAULT NULL,
  `class_section` VARCHAR(120) DEFAULT NULL COMMENT 'Combined "Grade 5-A"',
  `room_number` VARCHAR(20) DEFAULT NULL,
  `academic_year` VARCHAR(20) DEFAULT NULL,
  
  -- Class Teacher Details (Denormalized)
  `class_teacher_id` INT DEFAULT NULL,
  `class_teacher_name` VARCHAR(200) DEFAULT NULL,
  `class_teacher_phone` VARCHAR(20) DEFAULT NULL,
  `class_teacher_email` VARCHAR(100) DEFAULT NULL,
  
  -- ==================== PARENT/GUARDIAN INFORMATION ====================
  -- Father Details
  `father_name` VARCHAR(100) DEFAULT NULL,
  `father_phone` VARCHAR(20) DEFAULT NULL,
  `father_email` VARCHAR(100) DEFAULT NULL,
  `father_occupation` VARCHAR(100) DEFAULT NULL,
  `father_annual_income` DECIMAL(12,2) DEFAULT NULL,
  
  -- Mother Details
  `mother_name` VARCHAR(100) DEFAULT NULL,
  `mother_phone` VARCHAR(20) DEFAULT NULL,
  `mother_email` VARCHAR(100) DEFAULT NULL,
  `mother_occupation` VARCHAR(100) DEFAULT NULL,
  `mother_annual_income` DECIMAL(12,2) DEFAULT NULL,
  
  -- Guardian Details
  `guardian_name` VARCHAR(100) DEFAULT NULL,
  `guardian_relation` VARCHAR(50) DEFAULT NULL,
  `guardian_phone` VARCHAR(20) DEFAULT NULL,
  `guardian_email` VARCHAR(100) DEFAULT NULL,
  `guardian_address` TEXT,
  
  -- Emergency Contact
  `emergency_contact_name` VARCHAR(100) DEFAULT NULL,
  `emergency_contact_phone` VARCHAR(20) DEFAULT NULL,
  `emergency_contact_relation` VARCHAR(50) DEFAULT NULL,
  
  -- ==================== TRANSPORT INFORMATION (Denormalized) ====================
  `transport_required` TINYINT(1) DEFAULT 0,
  `route_id` INT DEFAULT NULL COMMENT 'For filtering, not FK',
  `route_name` VARCHAR(100) DEFAULT NULL,
  `route_number` VARCHAR(50) DEFAULT NULL,
  `vehicle_number` VARCHAR(50) DEFAULT NULL,
  `driver_name` VARCHAR(100) DEFAULT NULL,
  `driver_phone` VARCHAR(20) DEFAULT NULL,
  `pickup_point` VARCHAR(255) DEFAULT NULL,
  `drop_point` VARCHAR(255) DEFAULT NULL,
  `pickup_time` TIME DEFAULT NULL,
  `drop_time` TIME DEFAULT NULL,
  `transport_fee` DECIMAL(10,2) DEFAULT NULL,
  
  -- ==================== ACADEMIC PERFORMANCE ====================
  `current_grade` VARCHAR(10) DEFAULT NULL COMMENT 'A+, A, B+, etc.',
  `current_percentage` DECIMAL(5,2) DEFAULT NULL,
  `current_rank` INT DEFAULT NULL,
  `total_attendance_percentage` DECIMAL(5,2) DEFAULT NULL,
  
  -- Previous Academic Year
  `previous_academic_year` VARCHAR(20) DEFAULT NULL,
  `previous_class` VARCHAR(100) DEFAULT NULL,
  `previous_percentage` DECIMAL(5,2) DEFAULT NULL,
  `previous_rank` INT DEFAULT NULL,
  
  -- ==================== FEE INFORMATION (Denormalized) ====================
  `total_annual_fee` DECIMAL(12,2) DEFAULT NULL,
  `fee_paid` DECIMAL(12,2) DEFAULT NULL,
  `fee_pending` DECIMAL(12,2) DEFAULT NULL,
  `fee_status` VARCHAR(50) DEFAULT NULL COMMENT 'Paid, Pending, Overdue, Partial',
  `last_payment_date` DATE DEFAULT NULL,
  `last_payment_amount` DECIMAL(12,2) DEFAULT NULL,
  `next_due_date` DATE DEFAULT NULL,
  
  -- Fee Concession/Scholarship
  `has_scholarship` TINYINT(1) DEFAULT 0,
  `scholarship_name` VARCHAR(100) DEFAULT NULL,
  `scholarship_amount` DECIMAL(12,2) DEFAULT NULL,
  `scholarship_percentage` DECIMAL(5,2) DEFAULT NULL,
  `fee_concession_amount` DECIMAL(12,2) DEFAULT NULL,
  `fee_concession_reason` VARCHAR(255) DEFAULT NULL,
  
  -- ==================== ADMISSION INFORMATION ====================
  `admission_date` DATE DEFAULT NULL,
  `admission_type` VARCHAR(50) DEFAULT NULL COMMENT 'Fresh, Transfer, Migration',
  `previous_school_name` VARCHAR(200) DEFAULT NULL,
  `previous_school_board` VARCHAR(50) DEFAULT NULL,
  `transfer_certificate_no` VARCHAR(100) DEFAULT NULL,
  `transfer_certificate_date` DATE DEFAULT NULL,
  
  -- ==================== HEALTH INFORMATION ====================
  `height` DECIMAL(5,2) DEFAULT NULL COMMENT 'in cm',
  `weight` DECIMAL(5,2) DEFAULT NULL COMMENT 'in kg',
  `medical_conditions` TEXT,
  `allergies` TEXT,
  `medications` TEXT,
  `doctor_name` VARCHAR(100) DEFAULT NULL,
  `doctor_phone` VARCHAR(20) DEFAULT NULL,
  `health_insurance_number` VARCHAR(100) DEFAULT NULL,
  
  -- ==================== BEHAVIORAL/SPECIAL NEEDS ====================
  `special_needs` TINYINT(1) DEFAULT 0,
  `special_needs_description` TEXT,
  `behavioral_notes` TEXT,
  `learning_disabilities` TEXT,
  `accommodations_required` TEXT,
  
  -- ==================== EXTRACURRICULAR ====================
  `sports` TEXT COMMENT 'Comma-separated or JSON',
  `hobbies` TEXT,
  `achievements` TEXT,
  `clubs` TEXT,
  `house` VARCHAR(50) DEFAULT NULL COMMENT 'Red, Blue, Green, Yellow',
  
  -- ==================== DOCUMENTS ====================
  `birth_certificate_url` VARCHAR(255) DEFAULT NULL,
  `transfer_certificate_url` VARCHAR(255) DEFAULT NULL,
  `marksheet_url` VARCHAR(255) DEFAULT NULL,
  `aadhar_number` VARCHAR(20) DEFAULT NULL,
  `aadhar_url` VARCHAR(255) DEFAULT NULL,
  `passport_number` VARCHAR(50) DEFAULT NULL,
  `nationality` VARCHAR(50) DEFAULT 'Indian',
  `religion` VARCHAR(50) DEFAULT NULL,
  `caste` VARCHAR(50) DEFAULT NULL,
  `category` VARCHAR(50) DEFAULT NULL COMMENT 'General, OBC, SC, ST',
  
  -- ==================== STATUS & METADATA ====================
  `status` VARCHAR(50) DEFAULT 'active' COMMENT 'active, inactive, passed_out, transferred',
  `is_active` TINYINT(1) DEFAULT 1,
  `remarks` TEXT,
  `notes` TEXT,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL COMMENT 'User ID who created',
  `updated_by` INT DEFAULT NULL COMMENT 'User ID who last updated',
  
  -- ==================== FLEXIBLE CUSTOM FIELDS ====================
  `custom_fields` JSON DEFAULT NULL COMMENT 'Store any additional custom data',
  
  -- Search optimization
  `search_text` TEXT COMMENT 'Full-text search field',
  
  -- ==================== INDEXES ====================
  INDEX `idx_students_user_id` (`user_id`),
  INDEX `idx_students_admission_no` (`admission_no`),
  INDEX `idx_students_roll_no` (`roll_no`),
  INDEX `idx_students_first_name` (`first_name`),
  INDEX `idx_students_last_name` (`last_name`),
  INDEX `idx_students_full_name` (`full_name`),
  INDEX `idx_students_school_id` (`school_id`),
  INDEX `idx_students_school_name` (`school_name`),
  INDEX `idx_students_class_id` (`class_id`),
  INDEX `idx_students_class_name` (`class_name`),
  INDEX `idx_students_section` (`section`),
  INDEX `idx_students_academic_year` (`academic_year`),
  INDEX `idx_students_city` (`city`),
  INDEX `idx_students_state` (`state`),
  INDEX `idx_students_gender` (`gender`),
  INDEX `idx_students_transport_required` (`transport_required`),
  INDEX `idx_students_route_id` (`route_id`),
  INDEX `idx_students_route_name` (`route_name`),
  INDEX `idx_students_fee_status` (`fee_status`),
  INDEX `idx_students_fee_pending` (`fee_pending`),
  INDEX `idx_students_has_scholarship` (`has_scholarship`),
  INDEX `idx_students_attendance_pct` (`total_attendance_percentage`),
  INDEX `idx_students_status` (`status`),
  INDEX `idx_students_is_active` (`is_active`),
  INDEX `idx_students_admission_date` (`admission_date`),
  INDEX `idx_students_dob` (`date_of_birth`),
  INDEX `idx_students_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 4. TEACHERS TABLE (DENORMALIZED - 40+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- User Account Link
  `user_id` INT DEFAULT NULL COMMENT 'Links to users table (not FK)',
  
  -- ==================== PERSONAL INFORMATION ====================
  `employee_id` VARCHAR(50) NOT NULL UNIQUE,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) DEFAULT NULL,
  `full_name` VARCHAR(200) DEFAULT NULL,
  `date_of_birth` DATE DEFAULT NULL,
  `age` INT DEFAULT NULL,
  `gender` VARCHAR(20) DEFAULT NULL,
  `blood_group` VARCHAR(10) DEFAULT NULL,
  `photo_url` VARCHAR(255) DEFAULT NULL,
  
  -- ==================== CONTACT INFORMATION ====================
  `email` VARCHAR(100) DEFAULT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `alternate_phone` VARCHAR(20) DEFAULT NULL,
  `address` TEXT,
  `city` VARCHAR(100) DEFAULT NULL,
  `state` VARCHAR(100) DEFAULT NULL,
  `pincode` VARCHAR(10) DEFAULT NULL,
  `country` VARCHAR(100) DEFAULT 'India',
  
  -- ==================== SCHOOL INFORMATION (Denormalized) ====================
  `school_id` INT DEFAULT NULL,
  `school_code` VARCHAR(50) DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  `school_address` TEXT,
  `school_city` VARCHAR(100) DEFAULT NULL,
  `school_phone` VARCHAR(20) DEFAULT NULL,
  
  -- ==================== PROFESSIONAL INFORMATION ====================
  `designation` VARCHAR(100) DEFAULT NULL,
  `department` VARCHAR(100) DEFAULT NULL,
  `subjects` TEXT COMMENT 'Comma-separated subject names',
  `qualifications` TEXT,
  `experience_years` INT DEFAULT NULL,
  `joining_date` DATE DEFAULT NULL,
  `employment_type` VARCHAR(50) DEFAULT NULL COMMENT 'Permanent, Contract, Part-time',
  
  -- ==================== SALARY INFORMATION ====================
  `basic_salary` DECIMAL(12,2) DEFAULT NULL,
  `allowances` DECIMAL(12,2) DEFAULT NULL,
  `deductions` DECIMAL(12,2) DEFAULT NULL,
  `net_salary` DECIMAL(12,2) DEFAULT NULL,
  `salary_account_number` VARCHAR(100) DEFAULT NULL,
  `salary_bank_name` VARCHAR(100) DEFAULT NULL,
  `salary_ifsc_code` VARCHAR(20) DEFAULT NULL,
  `pan_number` VARCHAR(20) DEFAULT NULL,
  
  -- ==================== CLASS ASSIGNMENTS (Denormalized) ====================
  `assigned_classes` TEXT COMMENT 'JSON or comma-separated',
  `is_class_teacher` TINYINT(1) DEFAULT 0,
  `class_teacher_of` VARCHAR(100) DEFAULT NULL COMMENT 'Which class/section',
  
  -- ==================== ATTENDANCE & LEAVES ====================
  `total_leaves_allowed` INT DEFAULT 20,
  `leaves_taken` INT DEFAULT 0,
  `leaves_remaining` INT DEFAULT 20,
  `attendance_percentage` DECIMAL(5,2) DEFAULT NULL,
  
  -- ==================== EMERGENCY CONTACT ====================
  `emergency_contact_name` VARCHAR(100) DEFAULT NULL,
  `emergency_contact_phone` VARCHAR(20) DEFAULT NULL,
  `emergency_contact_relation` VARCHAR(50) DEFAULT NULL,
  
  -- ==================== DOCUMENTS ====================
  `aadhar_number` VARCHAR(20) DEFAULT NULL,
  `pan_number_copy` VARCHAR(255) DEFAULT NULL,
  `resume_url` VARCHAR(255) DEFAULT NULL,
  `certificates_url` TEXT COMMENT 'JSON array of URLs',
  
  -- ==================== STATUS & METADATA ====================
  `status` VARCHAR(50) DEFAULT 'active',
  `is_active` TINYINT(1) DEFAULT 1,
  `remarks` TEXT,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_teachers_user_id` (`user_id`),
  INDEX `idx_teachers_employee_id` (`employee_id`),
  INDEX `idx_teachers_first_name` (`first_name`),
  INDEX `idx_teachers_last_name` (`last_name`),
  INDEX `idx_teachers_full_name` (`full_name`),
  INDEX `idx_teachers_email` (`email`),
  INDEX `idx_teachers_school_id` (`school_id`),
  INDEX `idx_teachers_school_name` (`school_name`),
  INDEX `idx_teachers_designation` (`designation`),
  INDEX `idx_teachers_department` (`department`),
  INDEX `idx_teachers_employment_type` (`employment_type`),
  INDEX `idx_teachers_experience_years` (`experience_years`),
  INDEX `idx_teachers_is_class_teacher` (`is_class_teacher`),
  INDEX `idx_teachers_city` (`city`),
  INDEX `idx_teachers_state` (`state`),
  INDEX `idx_teachers_gender` (`gender`),
  INDEX `idx_teachers_status` (`status`),
  INDEX `idx_teachers_is_active` (`is_active`),
  INDEX `idx_teachers_joining_date` (`joining_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 5. CLASSES TABLE (DENORMALIZED - 20+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info (Denormalized)
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Class Info
  `class_name` VARCHAR(100) NOT NULL,
  `section` VARCHAR(10) DEFAULT NULL,
  `class_section` VARCHAR(120) DEFAULT NULL COMMENT 'Grade 5-A',
  `academic_year` VARCHAR(20) NOT NULL,
  `room_number` VARCHAR(20) DEFAULT NULL,
  `capacity` INT DEFAULT NULL,
  `current_strength` INT DEFAULT NULL,
  
  -- Class Teacher (Denormalized)
  `class_teacher_id` INT DEFAULT NULL,
  `class_teacher_name` VARCHAR(200) DEFAULT NULL,
  `class_teacher_email` VARCHAR(100) DEFAULT NULL,
  `class_teacher_phone` VARCHAR(20) DEFAULT NULL,
  
  -- Subject Teachers (Denormalized - JSON)
  `subject_teachers` JSON DEFAULT NULL COMMENT 'Array of subject-teacher mappings',
  
  -- Timetable
  `timetable` JSON DEFAULT NULL COMMENT 'Store entire timetable',
  
  -- Status
  `status` VARCHAR(50) DEFAULT 'active',
  `is_active` TINYINT(1) DEFAULT 1,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_classes_school_id` (`school_id`),
  INDEX `idx_classes_school_name` (`school_name`),
  INDEX `idx_classes_class_name` (`class_name`),
  INDEX `idx_classes_section` (`section`),
  INDEX `idx_classes_class_section` (`class_section`),
  INDEX `idx_classes_academic_year` (`academic_year`),
  INDEX `idx_classes_class_teacher_id` (`class_teacher_id`),
  INDEX `idx_classes_status` (`status`),
  INDEX `idx_classes_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 6. EXAMS TABLE (DENORMALIZED - 20+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `exams`;
CREATE TABLE `exams` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Exam Info
  `exam_name` VARCHAR(200) NOT NULL,
  `exam_code` VARCHAR(50) DEFAULT NULL,
  `exam_type` VARCHAR(50) DEFAULT NULL COMMENT 'Unit Test, Mid-term, Final',
  `academic_year` VARCHAR(20) DEFAULT NULL,
  
  -- Class Info (Denormalized)
  `class_ids` TEXT COMMENT 'Comma-separated class IDs',
  `class_names` TEXT COMMENT 'Comma-separated class names',
  
  -- Dates
  `start_date` DATE DEFAULT NULL,
  `end_date` DATE DEFAULT NULL,
  `result_date` DATE DEFAULT NULL,
  
  -- Marks
  `max_marks` INT DEFAULT 100,
  `min_pass_marks` INT DEFAULT 35,
  `weightage` DECIMAL(5,2) DEFAULT NULL,
  
  -- Status
  `status` VARCHAR(50) DEFAULT 'scheduled' COMMENT 'scheduled, ongoing, completed',
  `is_active` TINYINT(1) DEFAULT 1,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_exams_school_id` (`school_id`),
  INDEX `idx_exams_school_name` (`school_name`),
  INDEX `idx_exams_exam_name` (`exam_name`),
  INDEX `idx_exams_exam_code` (`exam_code`),
  INDEX `idx_exams_exam_type` (`exam_type`),
  INDEX `idx_exams_academic_year` (`academic_year`),
  INDEX `idx_exams_start_date` (`start_date`),
  INDEX `idx_exams_end_date` (`end_date`),
  INDEX `idx_exams_status` (`status`),
  INDEX `idx_exams_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 7. TRANSPORT_ROUTES TABLE (DENORMALIZED - 25+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `transport_routes`;
CREATE TABLE `transport_routes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Route Info
  `route_name` VARCHAR(100) NOT NULL,
  `route_number` VARCHAR(50) DEFAULT NULL,
  
  -- Vehicle Info
  `vehicle_number` VARCHAR(50) DEFAULT NULL,
  `vehicle_type` VARCHAR(50) DEFAULT NULL COMMENT 'Bus, Van, Auto',
  `vehicle_model` VARCHAR(100) DEFAULT NULL,
  `vehicle_capacity` INT DEFAULT NULL,
  
  -- Driver Info
  `driver_name` VARCHAR(100) DEFAULT NULL,
  `driver_phone` VARCHAR(20) DEFAULT NULL,
  `driver_license` VARCHAR(50) DEFAULT NULL,
  `driver_address` TEXT,
  
  -- Conductor Info
  `conductor_name` VARCHAR(100) DEFAULT NULL,
  `conductor_phone` VARCHAR(20) DEFAULT NULL,
  
  -- Route Details
  `route_stops` JSON DEFAULT NULL COMMENT 'Array of stops with timings',
  `total_distance` DECIMAL(8,2) DEFAULT NULL COMMENT 'in KM',
  `average_time` INT DEFAULT NULL COMMENT 'in minutes',
  
  -- Fee Info
  `monthly_fee` DECIMAL(10,2) DEFAULT NULL,
  `annual_fee` DECIMAL(10,2) DEFAULT NULL,
  
  -- Students on this route (Denormalized)
  `total_students` INT DEFAULT 0,
  `student_list` JSON DEFAULT NULL COMMENT 'Array of student details',
  
  -- Status
  `status` VARCHAR(50) DEFAULT 'active',
  `is_active` TINYINT(1) DEFAULT 1,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_transport_school_id` (`school_id`),
  INDEX `idx_transport_school_name` (`school_name`),
  INDEX `idx_transport_route_name` (`route_name`),
  INDEX `idx_transport_route_number` (`route_number`),
  INDEX `idx_transport_vehicle_number` (`vehicle_number`),
  INDEX `idx_transport_vehicle_type` (`vehicle_type`),
  INDEX `idx_transport_driver_name` (`driver_name`),
  INDEX `idx_transport_status` (`status`),
  INDEX `idx_transport_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 8. SUBJECTS TABLE (DENORMALIZED - 25+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info (Denormalized)
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Class Info (Denormalized)
  `class_id` INT DEFAULT NULL,
  `class_name` VARCHAR(100) DEFAULT NULL,
  `section` VARCHAR(10) DEFAULT NULL,
  `academic_year` VARCHAR(20) DEFAULT NULL,
  
  -- Subject Info
  `subject_name` VARCHAR(100) NOT NULL,
  `subject_code` VARCHAR(50) DEFAULT NULL,
  `subject_type` VARCHAR(50) DEFAULT NULL COMMENT 'Core, Elective, Optional',
  `description` TEXT,
  
  -- Teacher Info (Denormalized)
  `teacher_id` INT DEFAULT NULL,
  `teacher_name` VARCHAR(200) DEFAULT NULL,
  `teacher_email` VARCHAR(100) DEFAULT NULL,
  `teacher_phone` VARCHAR(20) DEFAULT NULL,
  
  -- Schedule
  `periods_per_week` INT DEFAULT NULL,
  `total_hours` DECIMAL(5,2) DEFAULT NULL,
  
  -- Marks Configuration
  `max_marks` INT DEFAULT 100,
  `min_pass_marks` INT DEFAULT 35,
  `practical_marks` INT DEFAULT NULL,
  `theory_marks` INT DEFAULT NULL,
  
  -- Syllabus
  `syllabus_url` VARCHAR(255) DEFAULT NULL,
  `textbook` VARCHAR(200) DEFAULT NULL,
  `reference_books` TEXT,
  
  -- Status
  `status` VARCHAR(50) DEFAULT 'active',
  `is_active` TINYINT(1) DEFAULT 1,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_subjects_school_id` (`school_id`),
  INDEX `idx_subjects_class_id` (`class_id`),
  INDEX `idx_subjects_class_name` (`class_name`),
  INDEX `idx_subjects_section` (`section`),
  INDEX `idx_subjects_academic_year` (`academic_year`),
  INDEX `idx_subjects_subject_name` (`subject_name`),
  INDEX `idx_subjects_subject_code` (`subject_code`),
  INDEX `idx_subjects_subject_type` (`subject_type`),
  INDEX `idx_subjects_teacher_id` (`teacher_id`),
  INDEX `idx_subjects_status` (`status`),
  INDEX `idx_subjects_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 9. ATTENDANCE TABLE (DENORMALIZED - 25+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info (Denormalized)
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Student Info (Denormalized)
  `student_id` INT DEFAULT NULL,
  `student_name` VARCHAR(200) DEFAULT NULL,
  `admission_no` VARCHAR(50) DEFAULT NULL,
  `roll_no` VARCHAR(50) DEFAULT NULL,
  
  -- Class Info (Denormalized)
  `class_id` INT DEFAULT NULL,
  `class_name` VARCHAR(100) DEFAULT NULL,
  `section` VARCHAR(10) DEFAULT NULL,
  
  -- Attendance Info
  `date` DATE NOT NULL,
  `status` VARCHAR(50) NOT NULL COMMENT 'present, absent, late, half_day, on_leave',
  `check_in_time` TIME DEFAULT NULL,
  `check_out_time` TIME DEFAULT NULL,
  
  -- Subject (if subject-wise attendance)
  `subject_id` INT DEFAULT NULL,
  `subject_name` VARCHAR(100) DEFAULT NULL,
  
  -- Teacher who marked (Denormalized)
  `marked_by_id` INT DEFAULT NULL,
  `marked_by_name` VARCHAR(200) DEFAULT NULL,
  
  -- Additional Info
  `remarks` TEXT,
  `reason` VARCHAR(255) DEFAULT NULL COMMENT 'For leave/absence',
  `late_by_minutes` INT DEFAULT NULL,
  
  -- Academic Year
  `academic_year` VARCHAR(20) DEFAULT NULL,
  `month` INT DEFAULT NULL,
  `week` INT DEFAULT NULL,
  
  -- Timestamp
  `marked_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_attendance_school_id` (`school_id`),
  INDEX `idx_attendance_student_id` (`student_id`),
  INDEX `idx_attendance_student_name` (`student_name`),
  INDEX `idx_attendance_admission_no` (`admission_no`),
  INDEX `idx_attendance_class_id` (`class_id`),
  INDEX `idx_attendance_class_name` (`class_name`),
  INDEX `idx_attendance_section` (`section`),
  INDEX `idx_attendance_date` (`date`),
  INDEX `idx_attendance_status` (`status`),
  INDEX `idx_attendance_subject_id` (`subject_id`),
  INDEX `idx_attendance_academic_year` (`academic_year`),
  INDEX `idx_attendance_month` (`month`),
  INDEX `idx_attendance_marked_by_id` (`marked_by_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 10. MARKS TABLE (DENORMALIZED - 30+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `marks`;
CREATE TABLE `marks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info (Denormalized)
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Student Info (Denormalized)
  `student_id` INT DEFAULT NULL,
  `student_name` VARCHAR(200) DEFAULT NULL,
  `admission_no` VARCHAR(50) DEFAULT NULL,
  `roll_no` VARCHAR(50) DEFAULT NULL,
  
  -- Class Info (Denormalized)
  `class_id` INT DEFAULT NULL,
  `class_name` VARCHAR(100) DEFAULT NULL,
  `section` VARCHAR(10) DEFAULT NULL,
  
  -- Exam Info (Denormalized)
  `exam_id` INT DEFAULT NULL,
  `exam_name` VARCHAR(200) DEFAULT NULL,
  `exam_code` VARCHAR(50) DEFAULT NULL,
  `exam_type` VARCHAR(50) DEFAULT NULL,
  
  -- Subject Info (Denormalized)
  `subject_id` INT DEFAULT NULL,
  `subject_name` VARCHAR(100) DEFAULT NULL,
  `subject_code` VARCHAR(50) DEFAULT NULL,
  
  -- Marks Details
  `theory_marks` DECIMAL(6,2) DEFAULT NULL,
  `practical_marks` DECIMAL(6,2) DEFAULT NULL,
  `total_marks_obtained` DECIMAL(6,2) DEFAULT NULL,
  `max_marks` DECIMAL(6,2) DEFAULT 100,
  `percentage` DECIMAL(5,2) DEFAULT NULL,
  `grade` VARCHAR(10) DEFAULT NULL COMMENT 'A+, A, B+, B, C, D, F',
  
  -- Status
  `is_absent` TINYINT(1) DEFAULT 0,
  `pass_status` VARCHAR(20) DEFAULT NULL COMMENT 'Pass, Fail, Absent',
  
  -- Teacher who entered (Denormalized)
  `entered_by_id` INT DEFAULT NULL,
  `entered_by_name` VARCHAR(200) DEFAULT NULL,
  
  -- Additional Info
  `remarks` TEXT,
  `academic_year` VARCHAR(20) DEFAULT NULL,
  
  -- Timestamps
  `entered_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_marks_school_id` (`school_id`),
  INDEX `idx_marks_student_id` (`student_id`),
  INDEX `idx_marks_student_name` (`student_name`),
  INDEX `idx_marks_admission_no` (`admission_no`),
  INDEX `idx_marks_class_id` (`class_id`),
  INDEX `idx_marks_class_name` (`class_name`),
  INDEX `idx_marks_section` (`section`),
  INDEX `idx_marks_exam_id` (`exam_id`),
  INDEX `idx_marks_exam_name` (`exam_name`),
  INDEX `idx_marks_exam_type` (`exam_type`),
  INDEX `idx_marks_subject_id` (`subject_id`),
  INDEX `idx_marks_subject_name` (`subject_name`),
  INDEX `idx_marks_total_marks` (`total_marks_obtained`),
  INDEX `idx_marks_percentage` (`percentage`),
  INDEX `idx_marks_grade` (`grade`),
  INDEX `idx_marks_pass_status` (`pass_status`),
  INDEX `idx_marks_academic_year` (`academic_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 11. FEE_STRUCTURES TABLE (DENORMALIZED - 20+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `fee_structures`;
CREATE TABLE `fee_structures` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info (Denormalized)
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Class Info (Denormalized)
  `class_id` INT DEFAULT NULL,
  `class_name` VARCHAR(100) DEFAULT NULL,
  
  -- Fee Info
  `fee_type` VARCHAR(100) NOT NULL COMMENT 'Tuition, Transport, Library, Lab, etc.',
  `fee_category` VARCHAR(50) DEFAULT NULL COMMENT 'Academic, Extra-curricular, etc.',
  `amount` DECIMAL(12,2) NOT NULL,
  
  -- Academic Info
  `academic_year` VARCHAR(20) DEFAULT NULL,
  `term` VARCHAR(50) DEFAULT NULL COMMENT 'Quarterly, Half-yearly, Annual',
  
  -- Due Date
  `due_date` DATE DEFAULT NULL,
  
  -- Additional Info
  `description` TEXT,
  `is_mandatory` TINYINT(1) DEFAULT 1,
  `late_fee_applicable` TINYINT(1) DEFAULT 1,
  `late_fee_amount` DECIMAL(10,2) DEFAULT NULL,
  
  -- Concession
  `concession_applicable` TINYINT(1) DEFAULT 0,
  `concession_percentage` DECIMAL(5,2) DEFAULT NULL,
  
  -- Status
  `status` VARCHAR(50) DEFAULT 'active',
  `is_active` TINYINT(1) DEFAULT 1,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_fee_structures_school_id` (`school_id`),
  INDEX `idx_fee_structures_class_id` (`class_id`),
  INDEX `idx_fee_structures_fee_type` (`fee_type`),
  INDEX `idx_fee_structures_academic_year` (`academic_year`),
  INDEX `idx_fee_structures_due_date` (`due_date`),
  INDEX `idx_fee_structures_status` (`status`),
  INDEX `idx_fee_structures_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 12. FEE_PAYMENTS TABLE (DENORMALIZED - 30+ Fields)
-- =====================================================

DROP TABLE IF EXISTS `fee_payments`;
CREATE TABLE `fee_payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info (Denormalized)
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Student Info (Denormalized)
  `student_id` INT DEFAULT NULL,
  `student_name` VARCHAR(200) DEFAULT NULL,
  `admission_no` VARCHAR(50) DEFAULT NULL,
  `roll_no` VARCHAR(50) DEFAULT NULL,
  
  -- Class Info (Denormalized)
  `class_id` INT DEFAULT NULL,
  `class_name` VARCHAR(100) DEFAULT NULL,
  `section` VARCHAR(10) DEFAULT NULL,
  
  -- Fee Structure Info (Denormalized)
  `fee_structure_id` INT DEFAULT NULL,
  `fee_type` VARCHAR(100) DEFAULT NULL,
  `fee_category` VARCHAR(50) DEFAULT NULL,
  
  -- Payment Info
  `receipt_number` VARCHAR(100) UNIQUE DEFAULT NULL,
  `payment_date` DATE NOT NULL,
  
  -- Amount Details
  `total_fee_amount` DECIMAL(12,2) DEFAULT NULL,
  `concession_amount` DECIMAL(12,2) DEFAULT 0,
  `late_fee_amount` DECIMAL(12,2) DEFAULT 0,
  `net_amount` DECIMAL(12,2) DEFAULT NULL COMMENT 'total - concession + late_fee',
  `amount_paid` DECIMAL(12,2) NOT NULL,
  `balance_amount` DECIMAL(12,2) DEFAULT NULL,
  
  -- Payment Method
  `payment_mode` VARCHAR(50) DEFAULT NULL COMMENT 'Cash, Cheque, Online, Card, UPI',
  `transaction_id` VARCHAR(100) DEFAULT NULL,
  `bank_name` VARCHAR(100) DEFAULT NULL,
  `cheque_number` VARCHAR(50) DEFAULT NULL,
  
  -- Status
  `payment_status` VARCHAR(50) DEFAULT NULL COMMENT 'Paid, Partial, Pending, Overdue',
  
  -- Received By (Denormalized)
  `received_by_id` INT DEFAULT NULL,
  `received_by_name` VARCHAR(200) DEFAULT NULL,
  
  -- Additional Info
  `academic_year` VARCHAR(20) DEFAULT NULL,
  `remarks` TEXT,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_fee_payments_school_id` (`school_id`),
  INDEX `idx_fee_payments_student_id` (`student_id`),
  INDEX `idx_fee_payments_student_name` (`student_name`),
  INDEX `idx_fee_payments_admission_no` (`admission_no`),
  INDEX `idx_fee_payments_class_id` (`class_id`),
  INDEX `idx_fee_payments_fee_type` (`fee_type`),
  INDEX `idx_fee_payments_receipt_number` (`receipt_number`),
  INDEX `idx_fee_payments_payment_date` (`payment_date`),
  INDEX `idx_fee_payments_payment_mode` (`payment_mode`),
  INDEX `idx_fee_payments_payment_status` (`payment_status`),
  INDEX `idx_fee_payments_academic_year` (`academic_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 13. TIMETABLES TABLE (DENORMALIZED)
-- =====================================================

DROP TABLE IF EXISTS `timetables`;
CREATE TABLE `timetables` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  
  -- School Info (Denormalized)
  `school_id` INT DEFAULT NULL,
  `school_name` VARCHAR(200) DEFAULT NULL,
  
  -- Class Info (Denormalized)
  `class_id` INT DEFAULT NULL,
  `class_name` VARCHAR(100) DEFAULT NULL,
  `section` VARCHAR(10) DEFAULT NULL,
  
  -- Subject Info (Denormalized)
  `subject_id` INT DEFAULT NULL,
  `subject_name` VARCHAR(100) DEFAULT NULL,
  
  -- Teacher Info (Denormalized)
  `teacher_id` INT DEFAULT NULL,
  `teacher_name` VARCHAR(200) DEFAULT NULL,
  
  -- Schedule Info
  `day_of_week` VARCHAR(20) DEFAULT NULL COMMENT 'Monday, Tuesday, etc.',
  `period_number` INT DEFAULT NULL,
  `start_time` TIME DEFAULT NULL,
  `end_time` TIME DEFAULT NULL,
  `duration_minutes` INT DEFAULT NULL,
  
  -- Location
  `room_number` VARCHAR(20) DEFAULT NULL,
  
  -- Academic Info
  `academic_year` VARCHAR(20) DEFAULT NULL,
  `term` VARCHAR(50) DEFAULT NULL,
  
  -- Status
  `is_active` TINYINT(1) DEFAULT 1,
  
  -- Timestamps
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Custom fields
  `custom_fields` JSON DEFAULT NULL,
  
  -- ==================== INDEXES ====================
  INDEX `idx_timetables_school_id` (`school_id`),
  INDEX `idx_timetables_class_id` (`class_id`),
  INDEX `idx_timetables_class_name` (`class_name`),
  INDEX `idx_timetables_section` (`section`),
  INDEX `idx_timetables_subject_id` (`subject_id`),
  INDEX `idx_timetables_teacher_id` (`teacher_id`),
  INDEX `idx_timetables_day_of_week` (`day_of_week`),
  INDEX `idx_timetables_period_number` (`period_number`),
  INDEX `idx_timetables_academic_year` (`academic_year`),
  INDEX `idx_timetables_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- Reset foreign key checks
-- =====================================================

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- END OF SCHEMA
-- =====================================================

-- Success message
SELECT 'All denormalized tables created successfully!' AS status;
SELECT 'Total tables: 13' AS info;
SELECT 'Total fields: 300+' AS info;
SELECT 'Architecture: Denormalized (No foreign keys)' AS info;
SELECT 'Query method: Filter-based (No JOINs)' AS info;
