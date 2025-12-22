/**
 * COMPLETE SCHOOL ERP - UNIFIED DATA MODEL
 * Single Source of Truth for all entities
 * For Private Schools in Andhra Pradesh
 */

// ============================================
// CORE ENTITIES
// ============================================

/**
 * Academic Year Entity
 * Used across all modules for year-based filtering
 */
export interface AcademicYear {
  id: string;
  name: string; // "2024-2025"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: 'active' | 'archived';
}

/**
 * Student Entity
 * Central student record used everywhere
 */
export interface Student {
  id: string;
  admissionNumber: string;
  
  // Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string; // Computed
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  aadharNumber?: string;
  religion?: string;
  caste?: string;
  category?: 'General' | 'OBC' | 'SC' | 'ST';
  motherTongue?: string;
  
  // Contact Information
  email?: string;
  mobile?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Parent Information
  fatherName: string;
  fatherMobile: string;
  fatherOccupation?: string;
  fatherEmail?: string;
  motherName: string;
  motherMobile: string;
  motherOccupation?: string;
  motherEmail?: string;
  guardianName?: string;
  guardianRelation?: string;
  guardianMobile?: string;
  
  // Academic Information
  academicYearId: string;
  classId: string;
  sectionId: string;
  rollNumber?: string;
  admissionDate: string;
  previousSchool?: string;
  
  // Transport Information
  useTransport: boolean;
  routeId?: string;
  stopId?: string;
  
  // Fee Information
  feePlanId?: string;
  concessionId?: string;
  
  // System Fields
  status: 'active' | 'inactive' | 'passedOut' | 'leftSchool';
  userId?: string; // Link to User account
  profilePhoto?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  
  // Custom Fields (dynamic)
  customFields?: Record<string, any>;
}

/**
 * Teacher Entity
 * Central teacher record
 */
export interface Teacher {
  id: string;
  employeeId: string;
  
  // Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  aadharNumber?: string;
  
  // Contact Information
  email: string;
  mobile: string;
  alternatePhone?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  emergencyContact?: string;
  
  // Employment Information
  joiningDate: string;
  designation: 'Teacher' | 'Senior Teacher' | 'HOD' | 'Vice Principal' | 'Principal';
  employmentType: 'Permanent' | 'Contract' | 'Part-time';
  department?: string;
  salary?: number;
  
  // Educational Qualification
  qualification: string;
  specialization?: string;
  experience?: number; // years
  
  // Subjects & Classes
  subjects: string[]; // Array of subject IDs
  assignedSections: string[]; // Array of section IDs
  isClassTeacher: boolean;
  classTeacherOfSection?: string; // Section ID
  
  // System Fields
  status: 'active' | 'inactive' | 'onLeave' | 'retired';
  userId?: string; // Link to User account
  profilePhoto?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  
  // Custom Fields
  customFields?: Record<string, any>;
}

/**
 * Class Entity
 * Defines grade levels (Class 1, Class 2, etc.)
 */
export interface Class {
  id: string;
  name: string; // "Class 1", "Class 10"
  numericGrade: number; // 1, 2, 3, ..., 10
  medium: 'English' | 'Telugu' | 'Urdu';
  category: 'Primary' | 'High School' | 'Junior College';
  academicYearId: string;
  
  // Fee Information
  defaultFeePlanId?: string;
  
  // System Fields
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Section Entity
 * Divisions within a class (A, B, C)
 */
export interface Section {
  id: string;
  classId: string;
  name: string; // "A", "B", "C"
  displayName: string; // "Class 10-A"
  
  // Teacher Assignment
  classTeacherId?: string;
  
  // Student Information
  maxStudents?: number;
  currentStudentCount: number;
  
  // System Fields
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Subject Entity
 * Subjects taught in the school
 */
export interface Subject {
  id: string;
  name: string; // "Mathematics", "Telugu"
  code: string; // "MATH", "TEL"
  description?: string;
  type: 'core' | 'elective' | 'language' | 'coScholastic';
  
  // System Fields
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Subject Assignment
 * Links subjects to sections with teachers
 */
export interface SubjectAssignment {
  id: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
  periodsPerWeek?: number;
  
  createdAt: string;
  updatedAt: string;
}

// ============================================
// ATTENDANCE ENTITIES
// ============================================

export interface AttendanceRecord {
  id: string;
  studentId: string;
  sectionId: string;
  academicYearId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'halfDay' | 'leave';
  remarks?: string;
  markedBy: string;
  markedAt: string;
  period?: number; // For period-wise attendance
}

// ============================================
// EXAM & MARKS ENTITIES
// ============================================

/**
 * Exam Template
 * Defines exam patterns (FA1, FA2, SA1, etc.)
 */
export interface ExamTemplate {
  id: string;
  name: string; // "FA1", "SA1", "Term 1"
  code: string;
  type: 'FA' | 'SA' | 'Term' | 'Unit Test' | 'Final';
  description?: string;
  defaultMaxMarks: number;
  defaultPassMarks: number;
  weightage?: number; // For grade calculation
  
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Exam Instance
 * Actual exam conducted for a specific class/section
 */
export interface ExamInstance {
  id: string;
  examTemplateId: string;
  academicYearId: string;
  classId: string;
  sectionId?: string; // Optional, can be class-wide
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'published';
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Subject Exam
 * Specific subject exam within an exam instance
 */
export interface SubjectExam {
  id: string;
  examInstanceId: string;
  subjectId: string;
  examDate: string;
  maxMarks: number;
  passMarks: number;
  duration?: number; // minutes
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Marks Entry
 * Student marks for a subject exam
 */
export interface MarksEntry {
  id: string;
  studentId: string;
  subjectExamId: string;
  marksObtained: number;
  grade?: string;
  remarks?: string;
  isAbsent: boolean;
  
  enteredBy: string;
  enteredAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

// ============================================
// FINANCE ENTITIES
// ============================================

/**
 * Fee Category
 * Types of fees (Tuition, Transport, etc.)
 */
export interface FeeCategory {
  id: string;
  name: string; // "Tuition Fee", "Transport Fee"
  code: string;
  description?: string;
  type: 'academic' | 'transport' | 'hostel' | 'exam' | 'other';
  
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Fee Plan
 * Fee structure for a class/category
 */
export interface FeePlan {
  id: string;
  name: string;
  classId?: string; // Optional, can be general
  academicYearId: string;
  
  items: FeePlanItem[];
  totalAmount: number;
  
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface FeePlanItem {
  feeCategoryId: string;
  amount: number;
  dueDate?: string;
  installments?: number;
}

/**
 * Student Fee
 * Fee assignment to individual student
 */
export interface StudentFee {
  id: string;
  studentId: string;
  feePlanId: string;
  academicYearId: string;
  
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  concessionAmount: number;
  
  status: 'pending' | 'partial' | 'paid' | 'overdue';
  dueDate?: string;
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Payment
 * Individual payment record
 */
export interface Payment {
  id: string;
  studentFeeId: string;
  studentId: string;
  amount: number;
  paymentMode: 'cash' | 'card' | 'upi' | 'netBanking' | 'cheque';
  transactionId?: string;
  paymentDate: string;
  receiptNumber: string;
  
  receivedBy: string;
  remarks?: string;
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Concession
 * Fee concessions/discounts
 */
export interface Concession {
  id: string;
  studentId: string;
  type: 'percentage' | 'fixed';
  value: number;
  reason: string;
  approvedBy: string;
  approvedAt: string;
  validFrom: string;
  validTo: string;
  
  status: 'active' | 'expired';
  createdAt: string;
  updatedAt: string;
}

// ============================================
// TRANSPORT ENTITIES
// ============================================

/**
 * Transport Route
 */
export interface TransportRoute {
  id: string;
  routeNumber: string;
  name: string;
  description?: string;
  totalDistance?: number; // km
  
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Transport Stop
 */
export interface TransportStop {
  id: string;
  routeId: string;
  name: string;
  address?: string;
  arrivalTime?: string;
  departureTime?: string;
  distance?: number;
  fee?: number;
  sequenceNumber: number;
  
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Vehicle
 */
export interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: 'Bus' | 'Van' | 'Car';
  capacity: number;
  routeId?: string;
  
  // Registration Details
  registrationNumber: string;
  registrationDate?: string;
  registrationExpiry?: string;
  
  // Insurance Details
  insuranceNumber?: string;
  insuranceExpiry?: string;
  
  // Fitness Details
  fitnessExpiry?: string;
  pollutionExpiry?: string;
  
  status: 'active' | 'maintenance' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Driver
 */
export interface Driver {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  
  // License Details
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: string;
  
  // Employment Details
  joiningDate: string;
  salary?: number;
  
  // Verification
  backgroundVerified: boolean;
  backgroundVerificationDate?: string;
  backgroundVerificationExpiry?: string;
  
  // Assignment
  assignedVehicleId?: string;
  
  status: 'active' | 'inactive' | 'onLeave';
  createdAt: string;
  updatedAt: string;
}

/**
 * Student Transport Assignment
 */
export interface StudentTransportAssignment {
  id: string;
  studentId: string;
  routeId: string;
  stopId: string;
  academicYearId: string;
  pickupTime?: string;
  dropTime?: string;
  monthlyFee: number;
  
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// ============================================
// USER & PERMISSION ENTITIES
// ============================================

/**
 * User Account
 */
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  
  // Role Information
  roleId: string;
  
  // Linked Entity
  entityType: 'student' | 'teacher' | 'admin' | 'parent';
  entityId?: string;
  
  // Security
  isActive: boolean;
  isFirstTimeLogin: boolean;
  lastLogin?: string;
  failedLoginAttempts: number;
  
  // Settings
  preferences?: Record<string, any>;
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Role
 */
export interface Role {
  id: string;
  name: string; // "Admin", "Teacher", "Student", etc.
  description?: string;
  permissions: string[]; // Array of permission codes
  
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Permission
 */
export interface Permission {
  code: string; // "students.view", "attendance.modify"
  module: string; // "students", "attendance"
  action: 'view' | 'create' | 'modify' | 'delete' | 'export';
  description: string;
}

// ============================================
// CUSTOM FIELDS
// ============================================

/**
 * Custom Field Definition
 */
export interface CustomFieldDefinition {
  id: string;
  entityType: 'student' | 'teacher' | 'class' | 'exam' | 'finance' | 'transport';
  sectionName: string; // "Personal Information", "Contact Information"
  fieldKey: string;
  fieldLabel: string;
  fieldType: 'text' | 'textarea' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'toggle' | 'file';
  
  // Validation
  isRequired: boolean;
  isSystem: boolean; // Cannot be edited/deleted
  
  // Visibility
  visibleToAdmin: boolean;
  visibleToTeacher: boolean;
  visibleToParent: boolean;
  
  // Options (for dropdown)
  dropdownOptions?: string[];
  
  // Order
  sequenceNumber: number;
  
  createdAt: string;
  updatedAt: string;
}

// ============================================
// AUDIT LOG
// ============================================

/**
 * Audit Log Entry
 */
export interface AuditLogEntry {
  id: string;
  module: string; // "students", "attendance", etc.
  action: string; // "created", "updated", "deleted"
  entityType: string;
  entityId: string;
  userId: string;
  userName: string;
  
  // Changes
  oldValue?: any;
  newValue?: any;
  fieldChanged?: string;
  
  // Context
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

// ============================================
// SYSTEM SETTINGS
// ============================================

/**
 * System Settings
 */
export interface SystemSettings {
  // School Profile
  schoolName: string;
  schoolCode: string;
  schoolLogo?: string;
  establishmentYear?: string;
  
  // Academic Settings
  currentAcademicYearId: string;
  syllabusType: 'State Board' | 'CBSE' | 'ICSE';
  medium: 'English' | 'Telugu' | 'Urdu';
  
  // Attendance Settings
  attendanceMode: 'daily' | 'period-wise';
  minAttendanceForPromotion: number;
  
  // Exam Settings
  examPattern: 'FA-SA' | 'Term' | 'Semester';
  defaultMaxMarks: number;
  defaultPassMarks: number;
  enableGPA: boolean;
  
  // Finance Settings
  currency: string;
  allowPartialPayment: boolean;
  enableLateFee: boolean;
  lateFeeType: 'flat' | 'percentage' | 'per-day';
  
  // Communication Settings
  smsProvider?: 'MSG91' | 'Twilio';
  smtpHost?: string;
  enablePushNotifications: boolean;
  
  // Transport Settings
  defaultPickupTime?: string;
  defaultDropTime?: string;
  enableGPSTracking: boolean;
  
  updatedAt: string;
  updatedBy: string;
}

// ============================================
// TYPE EXPORTS
// ============================================

export type EntityType = 'student' | 'teacher' | 'class' | 'section' | 'subject' | 
  'attendance' | 'exam' | 'marks' | 'fee' | 'payment' | 'transport' | 'user';

export type Status = 'active' | 'inactive';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'halfDay' | 'leave';

export type ExamStatus = 'scheduled' | 'ongoing' | 'completed' | 'published';

export type PaymentMode = 'cash' | 'card' | 'upi' | 'netBanking' | 'cheque';
