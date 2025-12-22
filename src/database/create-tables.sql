-- =====================================================
-- COMPLETE SCHOOL MANAGEMENT SYSTEM - DATABASE SCHEMA
-- =====================================================
-- Database: PostgreSQL Compatible
-- Created: December 2024
-- =====================================================

-- ==================== CORE SYSTEM TABLES ====================

-- Schools Table
CREATE TABLE schools (
    school_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_code VARCHAR(50) UNIQUE NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    logo_url TEXT,
    established_year INT,
    affiliation VARCHAR(100),
    board VARCHAR(100),
    principal_name VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Academic Years Table
CREATE TABLE academic_years (
    academic_year_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    year_code VARCHAR(20) UNIQUE NOT NULL,
    year_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== USER MANAGEMENT TABLES ====================

-- Users Table (Unified for all user types)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL, -- 'Student', 'Teacher', 'School Admin', 'Super Admin'
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_first_login BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Roles Table
CREATE TABLE user_roles (
    role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(100) UNIQUE NOT NULL,
    role_description TEXT,
    permissions JSONB, -- Store permissions as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Sessions Table
CREATE TABLE user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    token VARCHAR(500),
    ip_address VARCHAR(50),
    user_agent TEXT,
    login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logout_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Password History Table
CREATE TABLE password_history (
    history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    password_hash VARCHAR(255) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by UUID REFERENCES users(user_id)
);

-- ==================== STUDENT MANAGEMENT TABLES ====================

-- Students Table
CREATE TABLE students (
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    admission_number VARCHAR(50) UNIQUE NOT NULL,
    roll_number VARCHAR(50),
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    nationality VARCHAR(100),
    religion VARCHAR(100),
    caste_category VARCHAR(50),
    mother_tongue VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    aadhar_number VARCHAR(20),
    photo_url TEXT,
    admission_date DATE,
    academic_year_id UUID REFERENCES academic_years(academic_year_id),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Guardians Table
CREATE TABLE student_guardians (
    guardian_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    guardian_type VARCHAR(50), -- 'Father', 'Mother', 'Guardian'
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    relationship VARCHAR(50),
    occupation VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    office_phone VARCHAR(20),
    annual_income DECIMAL(15,2),
    education VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Addresses Table
CREATE TABLE student_addresses (
    address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    address_type VARCHAR(50), -- 'Permanent', 'Current'
    address_line1 TEXT,
    address_line2 TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Documents Table
CREATE TABLE student_documents (
    document_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    document_type VARCHAR(100),
    document_name VARCHAR(255),
    file_url TEXT NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES users(user_id),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Medical Records Table
CREATE TABLE student_medical_records (
    medical_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    vision_left VARCHAR(20),
    vision_right VARCHAR(20),
    allergies TEXT,
    chronic_conditions TEXT,
    medications TEXT,
    doctor_name VARCHAR(255),
    doctor_phone VARCHAR(20),
    hospital_name VARCHAR(255),
    last_checkup_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Emergency Contacts Table
CREATE TABLE student_emergency_contacts (
    contact_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    contact_name VARCHAR(255) NOT NULL,
    relationship VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    priority INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Previous Schools Table
CREATE TABLE student_previous_schools (
    previous_school_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    school_name VARCHAR(255),
    board VARCHAR(100),
    class_studied VARCHAR(50),
    year_from INT,
    year_to INT,
    tc_number VARCHAR(100),
    tc_date DATE,
    reason_for_leaving TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Enrollment Table
CREATE TABLE student_enrollment (
    enrollment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(academic_year_id),
    class_id UUID REFERENCES classes(class_id),
    section_id UUID REFERENCES class_sections(section_id),
    roll_number VARCHAR(50),
    enrollment_date DATE,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== TEACHER MANAGEMENT TABLES ====================

-- Teachers Table
CREATE TABLE teachers (
    teacher_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    nationality VARCHAR(100),
    religion VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    alternate_phone VARCHAR(20),
    aadhar_number VARCHAR(20),
    pan_number VARCHAR(20),
    photo_url TEXT,
    joining_date DATE,
    department VARCHAR(100),
    designation VARCHAR(100),
    employment_type VARCHAR(50), -- 'Permanent', 'Contract', 'Part-time'
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Qualifications Table
CREATE TABLE teacher_qualifications (
    qualification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    degree_name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    institution VARCHAR(255),
    university VARCHAR(255),
    year_of_passing INT,
    percentage DECIMAL(5,2),
    grade VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Experience Table
CREATE TABLE teacher_experience (
    experience_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    organization VARCHAR(255),
    designation VARCHAR(100),
    from_date DATE,
    to_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    responsibilities TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Subjects Table (What subjects they can teach)
CREATE TABLE teacher_subjects (
    teacher_subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(subject_id),
    proficiency_level VARCHAR(50), -- 'Beginner', 'Intermediate', 'Expert'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Documents Table
CREATE TABLE teacher_documents (
    document_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    document_type VARCHAR(100),
    document_name VARCHAR(255),
    file_url TEXT NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES users(user_id),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== CLASS MANAGEMENT TABLES ====================

-- Classes Table
CREATE TABLE classes (
    class_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    class_name VARCHAR(100) NOT NULL,
    class_code VARCHAR(50) UNIQUE NOT NULL,
    academic_year_id UUID REFERENCES academic_years(academic_year_id),
    medium VARCHAR(50),
    syllabus_type VARCHAR(50),
    category VARCHAR(50),
    max_capacity INT,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class Sections Table
CREATE TABLE class_sections (
    section_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(class_id) ON DELETE CASCADE,
    section_name VARCHAR(50) NOT NULL,
    room_number VARCHAR(50),
    max_students INT,
    current_strength INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(class_id, section_name)
);

-- Subjects Table
CREATE TABLE subjects (
    subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    subject_code VARCHAR(50) UNIQUE NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    subject_type VARCHAR(50), -- 'Core', 'Elective', 'Optional'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class Subjects Table (Map subjects to classes)
CREATE TABLE class_subjects (
    class_subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(class_id) ON DELETE CASCADE,
    section_id UUID REFERENCES class_sections(section_id),
    subject_id UUID REFERENCES subjects(subject_id),
    teacher_id UUID REFERENCES teachers(teacher_id),
    periods_per_week INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class Teachers Table (Assign class teachers)
CREATE TABLE class_teachers (
    class_teacher_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(class_id) ON DELETE CASCADE,
    section_id UUID REFERENCES class_sections(section_id),
    teacher_id UUID REFERENCES teachers(teacher_id),
    is_primary BOOLEAN DEFAULT TRUE,
    academic_year_id UUID REFERENCES academic_years(academic_year_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section_id, academic_year_id, is_primary)
);

-- Timetable Table
CREATE TABLE timetable (
    timetable_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(academic_year_id),
    class_id UUID REFERENCES classes(class_id),
    section_id UUID REFERENCES class_sections(section_id),
    effective_from DATE,
    effective_to DATE,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Timetable Periods Table
CREATE TABLE timetable_periods (
    period_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timetable_id UUID REFERENCES timetable(timetable_id) ON DELETE CASCADE,
    day_of_week INT, -- 1=Monday, 7=Sunday
    period_number INT,
    subject_id UUID REFERENCES subjects(subject_id),
    teacher_id UUID REFERENCES teachers(teacher_id),
    room_number VARCHAR(50),
    start_time TIME,
    end_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== ATTENDANCE TABLES ====================

-- Student Attendance Table
CREATE TABLE student_attendance (
    attendance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(class_id),
    section_id UUID REFERENCES class_sections(section_id),
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL, -- 'Present', 'Absent', 'Late', 'Half Day', 'Leave'
    check_in_time TIME,
    check_out_time TIME,
    marked_by UUID REFERENCES users(user_id),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, attendance_date)
);

-- Student Leave Requests Table
CREATE TABLE student_leave_requests (
    leave_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    leave_type VARCHAR(50), -- 'Sick', 'Casual', 'Planned'
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    total_days INT,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    approved_by UUID REFERENCES users(user_id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Attendance Table
CREATE TABLE teacher_attendance (
    attendance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    marked_by UUID REFERENCES users(user_id),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(teacher_id, attendance_date)
);

-- Teacher Leave Requests Table
CREATE TABLE teacher_leave_requests (
    leave_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    leave_type VARCHAR(50),
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    total_days INT,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    approved_by UUID REFERENCES users(user_id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== MARKS & EXAMS TABLES ====================

-- Exams Table
CREATE TABLE exams (
    exam_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(academic_year_id),
    exam_code VARCHAR(50) UNIQUE NOT NULL,
    exam_name VARCHAR(255) NOT NULL,
    exam_type VARCHAR(50), -- 'Formative', 'Summative', 'Term', 'Internal'
    start_date DATE,
    end_date DATE,
    weightage DECIMAL(5,2),
    max_marks INT,
    min_pass_marks INT,
    status VARCHAR(20) DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam Subjects Table
CREATE TABLE exam_subjects (
    exam_subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES exams(exam_id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(subject_id),
    class_id UUID REFERENCES classes(class_id),
    max_marks INT,
    min_pass_marks INT,
    has_practical BOOLEAN DEFAULT FALSE,
    practical_marks INT,
    has_internal BOOLEAN DEFAULT FALSE,
    internal_marks INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam Timetable Table
CREATE TABLE exam_timetable (
    exam_schedule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES exams(exam_id) ON DELETE CASCADE,
    exam_subject_id UUID REFERENCES exam_subjects(exam_subject_id),
    exam_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    duration_minutes INT,
    room_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Marks Table
CREATE TABLE marks (
    mark_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES exams(exam_id) ON DELETE CASCADE,
    exam_subject_id UUID REFERENCES exam_subjects(exam_subject_id),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    written_marks DECIMAL(5,2),
    practical_marks DECIMAL(5,2),
    internal_marks DECIMAL(5,2),
    total_marks DECIMAL(5,2),
    grade VARCHAR(10),
    remarks TEXT,
    is_absent BOOLEAN DEFAULT FALSE,
    entered_by UUID REFERENCES users(user_id),
    verified_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exam_id, exam_subject_id, student_id)
);

-- Grade System Table
CREATE TABLE grade_system (
    grade_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    grade_name VARCHAR(10) NOT NULL,
    min_percentage DECIMAL(5,2),
    max_percentage DECIMAL(5,2),
    grade_point DECIMAL(3,2),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Report Cards Table
CREATE TABLE report_cards (
    report_card_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(academic_year_id),
    exam_id UUID REFERENCES exams(exam_id),
    class_id UUID REFERENCES classes(class_id),
    total_marks DECIMAL(8,2),
    obtained_marks DECIMAL(8,2),
    percentage DECIMAL(5,2),
    overall_grade VARCHAR(10),
    rank INT,
    attendance_percentage DECIMAL(5,2),
    remarks TEXT,
    generated_by UUID REFERENCES users(user_id),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_url TEXT
);

-- ==================== FINANCE TABLES ====================

-- Fee Categories Table
CREATE TABLE fee_categories (
    category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    category_name VARCHAR(255) NOT NULL,
    category_code VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee Structures Table
CREATE TABLE fee_structures (
    fee_structure_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(academic_year_id),
    class_id UUID REFERENCES classes(class_id),
    fee_category_id UUID REFERENCES fee_categories(category_id),
    amount DECIMAL(10,2) NOT NULL,
    frequency VARCHAR(50), -- 'One Time', 'Monthly', 'Quarterly', 'Annually'
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Fees Table
CREATE TABLE student_fees (
    student_fee_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    fee_structure_id UUID REFERENCES fee_structures(fee_structure_id),
    amount DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    final_amount DECIMAL(10,2),
    due_date DATE,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee Payments Table
CREATE TABLE fee_payments (
    payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_fee_id UUID REFERENCES student_fees(student_fee_id),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_mode VARCHAR(50), -- 'Cash', 'Cheque', 'Online', 'Card'
    transaction_id VARCHAR(255),
    receipt_number VARCHAR(100) UNIQUE,
    collected_by UUID REFERENCES users(user_id),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee Receipts Table
CREATE TABLE fee_receipts (
    receipt_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES fee_payments(payment_id) ON DELETE CASCADE,
    receipt_number VARCHAR(100) UNIQUE NOT NULL,
    receipt_date DATE NOT NULL,
    file_url TEXT,
    generated_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee Concessions Table
CREATE TABLE fee_concessions (
    concession_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    concession_type VARCHAR(100),
    concession_percentage DECIMAL(5,2),
    concession_amount DECIMAL(10,2),
    reason TEXT,
    valid_from DATE,
    valid_to DATE,
    approved_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expense Categories Table
CREATE TABLE expense_categories (
    category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    category_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses Table
CREATE TABLE expenses (
    expense_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    category_id UUID REFERENCES expense_categories(category_id),
    expense_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_mode VARCHAR(50),
    vendor_name VARCHAR(255),
    invoice_number VARCHAR(100),
    description TEXT,
    created_by UUID REFERENCES users(user_id),
    approved_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Salary Structures Table
CREATE TABLE salary_structures (
    salary_structure_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    basic_salary DECIMAL(10,2),
    hra DECIMAL(10,2),
    da DECIMAL(10,2),
    ta DECIMAL(10,2),
    other_allowances DECIMAL(10,2),
    gross_salary DECIMAL(10,2),
    pf_deduction DECIMAL(10,2),
    tax_deduction DECIMAL(10,2),
    other_deductions DECIMAL(10,2),
    net_salary DECIMAL(10,2),
    effective_from DATE,
    effective_to DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Salary Payments Table
CREATE TABLE salary_payments (
    payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    salary_structure_id UUID REFERENCES salary_structures(salary_structure_id),
    payment_month VARCHAR(20),
    payment_year INT,
    amount_paid DECIMAL(10,2),
    payment_date DATE,
    payment_mode VARCHAR(50),
    transaction_id VARCHAR(255),
    processed_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== TRANSPORT TABLES ====================

-- Transport Routes Table
CREATE TABLE transport_routes (
    route_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    route_code VARCHAR(50) UNIQUE NOT NULL,
    route_name VARCHAR(255) NOT NULL,
    start_point VARCHAR(255),
    end_point VARCHAR(255),
    distance_km DECIMAL(6,2),
    estimated_time_minutes INT,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transport Vehicles Table
CREATE TABLE transport_vehicles (
    vehicle_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    vehicle_number VARCHAR(50) UNIQUE NOT NULL,
    vehicle_type VARCHAR(50),
    model VARCHAR(100),
    capacity INT,
    driver_name VARCHAR(255),
    driver_phone VARCHAR(20),
    driver_license VARCHAR(100),
    insurance_number VARCHAR(100),
    insurance_expiry DATE,
    pollution_certificate VARCHAR(100),
    pollution_expiry DATE,
    route_id UUID REFERENCES transport_routes(route_id),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transport Stops Table
CREATE TABLE transport_stops (
    stop_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID REFERENCES transport_routes(route_id) ON DELETE CASCADE,
    stop_name VARCHAR(255) NOT NULL,
    stop_location TEXT,
    stop_order INT,
    arrival_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Transport Table
CREATE TABLE student_transport (
    student_transport_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    route_id UUID REFERENCES transport_routes(route_id),
    stop_id UUID REFERENCES transport_stops(stop_id),
    transport_fee DECIMAL(10,2),
    effective_from DATE,
    effective_to DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle Maintenance Table
CREATE TABLE vehicle_maintenance (
    maintenance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES transport_vehicles(vehicle_id) ON DELETE CASCADE,
    maintenance_date DATE NOT NULL,
    maintenance_type VARCHAR(100),
    description TEXT,
    cost DECIMAL(10,2),
    next_service_date DATE,
    created_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== COMMUNICATION TABLES ====================

-- Announcements Table
CREATE TABLE announcements (
    announcement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    target_audience VARCHAR(50), -- 'All', 'Students', 'Teachers', 'Parents'
    priority VARCHAR(20), -- 'Low', 'Medium', 'High'
    published_by UUID REFERENCES users(user_id),
    published_at TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255),
    message TEXT,
    notification_type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE messages (
    message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES users(user_id),
    receiver_id UUID REFERENCES users(user_id),
    subject VARCHAR(255),
    message_body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== ACADEMIC ACTIVITY TABLES ====================

-- Homework Table
CREATE TABLE homework (
    homework_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(class_id),
    section_id UUID REFERENCES class_sections(section_id),
    subject_id UUID REFERENCES subjects(subject_id),
    teacher_id UUID REFERENCES teachers(teacher_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_date DATE,
    due_date DATE,
    max_marks INT,
    attachments TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Homework Submissions Table
CREATE TABLE homework_submissions (
    submission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    homework_id UUID REFERENCES homework(homework_id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
    submission_text TEXT,
    attachment_urls TEXT[],
    submitted_at TIMESTAMP,
    marks_obtained DECIMAL(5,2),
    feedback TEXT,
    evaluated_by UUID REFERENCES users(user_id),
    evaluated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== LIBRARY TABLES ====================

-- Library Books Table
CREATE TABLE library_books (
    book_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    isbn VARCHAR(50),
    book_title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    publisher VARCHAR(255),
    category VARCHAR(100),
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    rack_number VARCHAR(50),
    purchase_date DATE,
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Library Transactions Table
CREATE TABLE library_transactions (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES library_books(book_id),
    user_id UUID REFERENCES users(user_id),
    transaction_type VARCHAR(20), -- 'Issue', 'Return'
    issue_date DATE,
    due_date DATE,
    return_date DATE,
    fine_amount DECIMAL(10,2),
    issued_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== EVENTS TABLES ====================

-- Events Table
CREATE TABLE events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    event_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    description TEXT,
    event_date DATE,
    start_time TIME,
    end_time TIME,
    venue VARCHAR(255),
    organizer UUID REFERENCES users(user_id),
    max_participants INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Participants Table
CREATE TABLE event_participants (
    participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(event_id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(student_id),
    teacher_id UUID REFERENCES teachers(teacher_id),
    participation_type VARCHAR(50),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== SYSTEM CONFIGURATION TABLES ====================

-- Custom Fields Table
CREATE TABLE custom_fields (
    custom_field_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    entity_type VARCHAR(50), -- 'Student', 'Teacher', 'Class', etc.
    field_name VARCHAR(255) NOT NULL,
    field_type VARCHAR(50), -- 'Text', 'Number', 'Date', 'Dropdown', etc.
    field_options TEXT[], -- For dropdown type
    is_required BOOLEAN DEFAULT FALSE,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Custom Field Values Table
CREATE TABLE custom_field_values (
    value_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    custom_field_id UUID REFERENCES custom_fields(custom_field_id) ON DELETE CASCADE,
    entity_id UUID NOT NULL, -- ID of student/teacher/class etc.
    field_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table
CREATE TABLE settings (
    setting_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(school_id) ON DELETE CASCADE,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== INDEXES FOR PERFORMANCE ====================

-- User indexes
CREATE INDEX idx_users_school_id ON users(school_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);

-- Student indexes
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_admission_number ON students(admission_number);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_student_enrollment_student_id ON student_enrollment(student_id);
CREATE INDEX idx_student_enrollment_class_section ON student_enrollment(class_id, section_id);

-- Teacher indexes
CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_teachers_employee_id ON teachers(employee_id);

-- Attendance indexes
CREATE INDEX idx_student_attendance_student_date ON student_attendance(student_id, attendance_date);
CREATE INDEX idx_student_attendance_date ON student_attendance(attendance_date);
CREATE INDEX idx_teacher_attendance_teacher_date ON teacher_attendance(teacher_id, attendance_date);

-- Marks indexes
CREATE INDEX idx_marks_exam_student ON marks(exam_id, student_id);
CREATE INDEX idx_marks_student ON marks(student_id);

-- Finance indexes
CREATE INDEX idx_fee_payments_student ON fee_payments(student_id);
CREATE INDEX idx_fee_payments_date ON fee_payments(payment_date);

-- Audit log indexes
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- ==================== END OF SCHEMA ====================
