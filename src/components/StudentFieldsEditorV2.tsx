import { useState } from 'react';
import { 
  GripVertical, 
  Lock, 
  Edit2, 
  Trash2, 
  Plus,
  ChevronDown,
  ChevronRight,
  Info,
  X,
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from './ui/separator';

interface CustomField {
  id: string;
  label: string;
  key: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'toggle' | 'file';
  required: boolean;
  placeholder?: string;
  hint?: string;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  minDate?: string;
  maxDate?: string;
  fileTypes?: string;
  maxFileSize?: number;
  defaultChecked?: boolean;
  allowMultiple?: boolean;
  visibility: {
    admin: boolean;
    teacher: boolean;
    parent: boolean;
  };
  isSystem: boolean;
  order: number;
  options?: string[];
}

interface Section {
  id: string;
  name: string;
  fields: CustomField[];
  isOpen: boolean;
}

type TabType = 'profile' | 'academic' | 'fees' | 'account' | 'audit';

const getInitialSections = (): Record<TabType, Section[]> => ({
  profile: [
    {
      id: 'personal-info',
      name: 'Personal Information',
      isOpen: true,
      fields: [
        { id: 'f1', label: 'First Name', key: 'first_name', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'f2', label: 'Last Name', key: 'last_name', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'f3', label: 'Gender', key: 'gender', type: 'dropdown', required: true, isSystem: true, order: 2, options: ['Male', 'Female', 'Other'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'f4', label: 'Date of Birth', key: 'dob', type: 'date', required: true, isSystem: true, order: 3, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'f5', label: 'Blood Group', key: 'blood_group', type: 'dropdown', required: false, isSystem: true, order: 4, options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'f6', label: 'Mother Tongue', key: 'mother_tongue', type: 'dropdown', required: false, isSystem: true, order: 5, options: ['Hindi', 'English', 'Telugu', 'Tamil', 'Kannada'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'f7', label: 'Religion', key: 'religion', type: 'dropdown', required: false, isSystem: true, order: 6, options: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'f8', label: 'Caste Category', key: 'caste_category', type: 'dropdown', required: false, isSystem: true, order: 7, options: ['General', 'OBC', 'SC', 'ST'], visibility: { admin: true, teacher: true, parent: false } },
        { id: 'f9', label: 'Aadhar Number', key: 'aadhar_number', type: 'text', required: false, isSystem: true, order: 8, placeholder: 'XXXX XXXX XXXX', visibility: { admin: true, teacher: false, parent: false } },
        { id: 'f10', label: 'Nationality', key: 'nationality', type: 'text', required: false, isSystem: true, order: 9, visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'contact-info',
      name: 'Contact Information',
      isOpen: true,
      fields: [
        { id: 'c1', label: 'Email', key: 'email', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'c2', label: 'Phone', key: 'phone', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'c3', label: 'Present Address', key: 'present_address', type: 'textarea', required: false, isSystem: true, order: 2, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'c4', label: 'Permanent Address', key: 'permanent_address', type: 'textarea', required: false, isSystem: true, order: 3, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'c5', label: 'Village / Locality', key: 'village', type: 'text', required: false, isSystem: true, order: 4, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'c6', label: 'Mandal', key: 'mandal', type: 'text', required: false, isSystem: true, order: 5, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'c7', label: 'District', key: 'district', type: 'text', required: false, isSystem: true, order: 6, visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'guardian-info',
      name: 'Guardian / Parents Information',
      isOpen: true,
      fields: [
        { id: 'g1', label: 'Father Name', key: 'father_name', type: 'text', required: false, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'g2', label: 'Father Phone', key: 'father_phone', type: 'text', required: false, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'g3', label: 'Father Occupation', key: 'father_occupation', type: 'text', required: false, isSystem: true, order: 2, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'g4', label: 'Mother Name', key: 'mother_name', type: 'text', required: false, isSystem: true, order: 3, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'g5', label: 'Mother Phone', key: 'mother_phone', type: 'text', required: false, isSystem: true, order: 4, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'g6', label: 'Mother Occupation', key: 'mother_occupation', type: 'text', required: false, isSystem: true, order: 5, visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'academic-details',
      name: 'Academic Details',
      isOpen: true,
      fields: [
        { id: 'a1', label: 'Admission Number', key: 'admission_number', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a2', label: 'Class', key: 'class', type: 'dropdown', required: true, isSystem: true, order: 1, options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a3', label: 'Section', key: 'section', type: 'dropdown', required: true, isSystem: true, order: 2, options: ['A', 'B', 'C', 'D'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a4', label: 'Roll Number', key: 'roll_number', type: 'number', required: false, isSystem: true, order: 3, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a5', label: 'Academic Year', key: 'academic_year', type: 'dropdown', required: false, isSystem: true, order: 4, options: ['2023-24', '2024-25', '2025-26'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a6', label: 'Date of Admission', key: 'date_of_admission', type: 'date', required: false, isSystem: true, order: 5, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a7', label: 'Previous School Name', key: 'previous_school', type: 'text', required: false, isSystem: true, order: 6, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a8', label: 'Previous Class', key: 'previous_class', type: 'text', required: false, isSystem: true, order: 7, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a9', label: 'Medium of Instruction', key: 'medium', type: 'dropdown', required: false, isSystem: true, order: 8, options: ['English', 'Hindi', 'Telugu', 'Tamil'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a10', label: 'Syllabus', key: 'syllabus', type: 'dropdown', required: false, isSystem: true, order: 9, options: ['CBSE', 'ICSE', 'State Board', 'IB'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'a11', label: 'House / Group', key: 'house', type: 'dropdown', required: false, isSystem: true, order: 10, options: ['Red', 'Blue', 'Green', 'Yellow'], visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'transport-details',
      name: 'Transport Details',
      isOpen: false,
      fields: [
        { id: 't1', label: 'Transport Opted', key: 'transport_opted', type: 'toggle', required: false, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'documents',
      name: 'Uploadable Documents',
      isOpen: false,
      fields: [
        { id: 'd1', label: 'Student Photo', key: 'student_photo', type: 'file', required: false, isSystem: true, order: 0, fileTypes: 'JPG, PNG', visibility: { admin: true, teacher: true, parent: true } },
        { id: 'd2', label: 'Birth Certificate', key: 'birth_certificate', type: 'file', required: false, isSystem: true, order: 1, fileTypes: 'PDF, JPG', visibility: { admin: true, teacher: true, parent: true } },
        { id: 'd3', label: 'Transfer Certificate (TC)', key: 'tc', type: 'file', required: false, isSystem: true, order: 2, fileTypes: 'PDF', visibility: { admin: true, teacher: true, parent: true } },
        { id: 'd4', label: 'Aadhar', key: 'aadhar_file', type: 'file', required: false, isSystem: true, order: 3, fileTypes: 'PDF, JPG', visibility: { admin: true, teacher: false, parent: false } },
        { id: 'd5', label: 'Caste Certificate', key: 'caste_certificate_file', type: 'file', required: false, isSystem: true, order: 4, fileTypes: 'PDF, JPG', visibility: { admin: true, teacher: false, parent: false } },
        { id: 'd6', label: 'Address Proof', key: 'address_proof_file', type: 'file', required: false, isSystem: true, order: 5, fileTypes: 'PDF, JPG', visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
  ],
  academic: [
    {
      id: 'exam-structure',
      name: 'Exam Structure',
      isOpen: true,
      fields: [
        { id: 'e1', label: 'Exam Name', key: 'exam_name', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'e2', label: 'Exam Type', key: 'exam_type', type: 'dropdown', required: true, isSystem: true, order: 1, options: ['Unit Test', 'Mid Term', 'Final'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'e3', label: 'Maximum Marks', key: 'max_marks', type: 'number', required: true, isSystem: true, order: 2, visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'subject-fields',
      name: 'Subject-wise Fields',
      isOpen: true,
      fields: [
        { id: 's1', label: 'Subject Name', key: 'subject_name', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 's2', label: 'Marks Obtained', key: 'marks_obtained', type: 'number', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: 's3', label: 'Grade', key: 'grade', type: 'dropdown', required: false, isSystem: true, order: 2, options: ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'], visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'overall-performance',
      name: 'Overall Performance',
      isOpen: false,
      fields: [
        { id: 'o1', label: 'Total Marks', key: 'total_marks', type: 'number', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'o2', label: 'Percentage', key: 'percentage', type: 'number', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'o3', label: 'Rank', key: 'rank', type: 'number', required: false, isSystem: true, order: 2, visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'attendance-summary',
      name: 'Attendance Summary',
      isOpen: false,
      fields: [
        { id: 'att1', label: 'Attendance Percentage', key: 'attendance_percentage', type: 'number', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'att2', label: 'Days Present', key: 'days_present', type: 'number', required: false, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'att3', label: 'Days Absent', key: 'days_absent', type: 'number', required: false, isSystem: true, order: 2, visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'co-scholastic',
      name: 'Co-Scholastic Areas',
      isOpen: false,
      fields: [
        { id: 'cs1', label: 'Sports', key: 'sports', type: 'dropdown', required: false, isSystem: true, order: 0, options: ['A', 'B', 'C'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'cs2', label: 'Arts', key: 'arts', type: 'dropdown', required: false, isSystem: true, order: 1, options: ['A', 'B', 'C'], visibility: { admin: true, teacher: true, parent: true } },
        { id: 'cs3', label: 'Discipline', key: 'discipline', type: 'dropdown', required: false, isSystem: true, order: 2, options: ['A', 'B', 'C'], visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'teacher-remarks',
      name: 'Teacher Remarks',
      isOpen: false,
      fields: [
        { id: 'r1', label: 'Class Teacher Remarks', key: 'class_teacher_remarks', type: 'textarea', required: false, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: 'r2', label: 'Principal Remarks', key: 'principal_remarks', type: 'textarea', required: false, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: true } },
      ]
    },
  ],
  fees: [
    {
      id: 'payment-overview',
      name: 'Payment Overview',
      isOpen: true,
      fields: [
        { id: 'p1', label: 'Total Annual Fee', key: 'total_annual_fee', type: 'number', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: true } },
        { id: 'p2', label: 'Amount Paid', key: 'amount_paid', type: 'number', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: true } },
        { id: 'p3', label: 'Balance Due', key: 'balance_due', type: 'number', required: true, isSystem: true, order: 2, visibility: { admin: true, teacher: false, parent: true } },
      ]
    },
    {
      id: 'fee-structure',
      name: 'Fee Structure Breakdown',
      isOpen: true,
      fields: [
        { id: 'fs1', label: 'Tuition Fee', key: 'tuition_fee', type: 'number', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: true } },
        { id: 'fs2', label: 'Transport Fee', key: 'transport_fee', type: 'number', required: false, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: true } },
        { id: 'fs3', label: 'Activity Fee', key: 'activity_fee', type: 'number', required: false, isSystem: true, order: 2, visibility: { admin: true, teacher: false, parent: true } },
      ]
    },
    {
      id: 'payment-history',
      name: 'Payment History Fields',
      isOpen: false,
      fields: [
        { id: 'ph1', label: 'Payment Date', key: 'payment_date', type: 'date', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: true } },
        { id: 'ph2', label: 'Payment Method', key: 'payment_method', type: 'dropdown', required: true, isSystem: true, order: 1, options: ['Cash', 'Card', 'UPI', 'Bank Transfer'], visibility: { admin: true, teacher: false, parent: true } },
        { id: 'ph3', label: 'Receipt Number', key: 'receipt_number', type: 'text', required: true, isSystem: true, order: 2, visibility: { admin: true, teacher: false, parent: true } },
      ]
    },
    {
      id: 'upcoming-payment',
      name: 'Upcoming Payment Fields',
      isOpen: false,
      fields: [
        { id: 'up1', label: 'Next Due Date', key: 'next_due_date', type: 'date', required: false, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: true } },
        { id: 'up2', label: 'Installment Amount', key: 'installment_amount', type: 'number', required: false, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: true } },
      ]
    },
  ],
  account: [
    {
      id: 'login-info',
      name: 'Portal Login Information',
      isOpen: true,
      fields: [
        { id: 'l1', label: 'Username', key: 'username', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: false } },
        { id: 'l2', label: 'Email (Login)', key: 'login_email', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: false } },
        { id: 'l3', label: 'Account Status', key: 'account_status', type: 'dropdown', required: true, isSystem: true, order: 2, options: ['Active', 'Inactive', 'Suspended'], visibility: { admin: true, teacher: false, parent: false } },
        { id: 'l4', label: 'Last Login', key: 'last_login', type: 'date', required: false, isSystem: true, order: 3, visibility: { admin: true, teacher: false, parent: false } },
      ]
    },
    {
      id: 'parent-app',
      name: 'Parent App Linking',
      isOpen: false,
      fields: [
        { id: 'pa1', label: 'Parent App Linked', key: 'parent_app_linked', type: 'toggle', required: false, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: false } },
        { id: 'pa2', label: 'Parent Phone (Linked)', key: 'parent_phone_linked', type: 'text', required: false, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: false } },
      ]
    },
    {
      id: 'roles-permissions',
      name: 'Role & Permissions',
      isOpen: false,
      fields: [
        { id: 'rp1', label: 'User Role', key: 'user_role', type: 'dropdown', required: true, isSystem: true, order: 0, options: ['Student', 'Parent', 'Guardian'], visibility: { admin: true, teacher: false, parent: false } },
      ]
    },
    {
      id: 'multi-child',
      name: 'Multi-child Linked Accounts',
      isOpen: false,
      fields: [
        { id: 'mc1', label: 'Number of Linked Children', key: 'linked_children_count', type: 'number', required: false, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: false } },
      ]
    },
  ],
  audit: [
    {
      id: 'log-entries',
      name: 'Log Entry Fields',
      isOpen: true,
      fields: [
        { id: 'log1', label: 'Action', key: 'action', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: false } },
        { id: 'log2', label: 'Area', key: 'area', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: false } },
        { id: 'log3', label: 'Timestamp', key: 'timestamp', type: 'date', required: true, isSystem: true, order: 2, visibility: { admin: true, teacher: false, parent: false } },
        { id: 'log4', label: 'Old Value', key: 'old_value', type: 'textarea', required: false, isSystem: true, order: 3, visibility: { admin: true, teacher: false, parent: false } },
        { id: 'log5', label: 'New Value', key: 'new_value', type: 'textarea', required: false, isSystem: true, order: 4, visibility: { admin: true, teacher: false, parent: false } },
        { id: 'log6', label: 'Performed By', key: 'performed_by', type: 'text', required: true, isSystem: true, order: 5, visibility: { admin: true, teacher: false, parent: false } },
      ]
    },
  ],
});

interface DraggableFieldItemProps {
  field: CustomField;
  index: number;
  sectionId: string;
  onMove: (dragIndex: number, hoverIndex: number, sectionId: string) => void;
  onEdit: (field: CustomField, sectionId: string) => void;
  onDelete: (fieldId: string, sectionId: string) => void;
}

function DraggableFieldItem({ field, index, sectionId, onMove, onEdit, onDelete }: DraggableFieldItemProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'field',
    item: { index, sectionId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !field.isSystem
  });

  const [, drop] = useDrop({
    accept: 'field',
    hover: (item: { index: number; sectionId: string }) => {
      if (item.index !== index && item.sectionId === sectionId) {
        onMove(item.index, index, sectionId);
        item.index = index;
      }
    },
  });

  const getFieldTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      text: 'bg-blue-100 text-blue-700 border-blue-200',
      textarea: 'bg-blue-100 text-blue-700 border-blue-200',
      number: 'bg-green-100 text-green-700 border-green-200',
      date: 'bg-purple-100 text-purple-700 border-purple-200',
      dropdown: 'bg-orange-100 text-orange-700 border-orange-200',
      checkbox: 'bg-pink-100 text-pink-700 border-pink-200',
      toggle: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      file: 'bg-teal-100 text-teal-700 border-teal-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getFieldTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      text: 'Text',
      textarea: 'Text Area',
      number: 'Number',
      date: 'Date',
      dropdown: 'Dropdown',
      checkbox: 'Checkbox',
      toggle: 'Toggle',
      file: 'File Upload',
    };
    return labels[type] || type;
  };

  return (
    <div
      ref={(node) => preview(drop(node))}
      className={`
        group bg-white border border-gray-200 rounded-lg p-4 transition-all
        ${isDragging ? 'opacity-50' : 'hover:shadow-md hover:border-blue-200'}
        ${field.isSystem ? '' : 'cursor-move'}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div 
          ref={drag} 
          className={`mt-1 ${field.isSystem ? 'opacity-0 pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>

        {/* Field Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="text-sm font-medium text-gray-900 mb-0">{field.label}</h4>
            {field.isSystem && (
              <div className="flex items-center gap-1 text-gray-400" title="System field – cannot be deleted or reordered">
                <Lock className="w-3.5 h-3.5" />
              </div>
            )}
            <Badge 
              variant={field.required ? 'destructive' : 'secondary'} 
              className="text-xs px-2 py-0.5"
            >
              {field.required ? 'Required' : 'Optional'}
            </Badge>
            <Badge 
              className={`text-xs px-2 py-0.5 border ${getFieldTypeColor(field.type)}`}
              variant="outline"
            >
              {getFieldTypeLabel(field.type)}
            </Badge>
          </div>

          <p className="text-xs text-gray-500 mb-2">
            Key: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{field.key}</code>
          </p>
          
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-500">Visible to:</span>
            {field.visibility.admin && (
              <Badge variant="outline" className="text-xs px-2 py-0 bg-blue-50 text-blue-700 border-blue-200">
                Admin
              </Badge>
            )}
            {field.visibility.teacher && (
              <Badge variant="outline" className="text-xs px-2 py-0 bg-green-50 text-green-700 border-green-200">
                Teacher
              </Badge>
            )}
            {field.visibility.parent && (
              <Badge variant="outline" className="text-xs px-2 py-0 bg-purple-50 text-purple-700 border-purple-200">
                Parent
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onEdit(field, sectionId)}
            disabled={field.isSystem}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(field.id, sectionId)}
            disabled={field.isSystem}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface FieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (field: Partial<CustomField>) => void;
  field?: CustomField;
  mode: 'add' | 'edit';
  sectionName: string;
}

function FieldModal({ isOpen, onClose, onSave, field, mode, sectionName }: FieldModalProps) {
  const [formData, setFormData] = useState<Partial<CustomField>>({
    label: field?.label || '',
    key: field?.key || '',
    type: field?.type || 'text',
    required: field?.required || false,
    placeholder: field?.placeholder || '',
    hint: field?.hint || '',
    maxLength: field?.maxLength,
    minValue: field?.minValue,
    maxValue: field?.maxValue,
    minDate: field?.minDate,
    maxDate: field?.maxDate,
    fileTypes: field?.fileTypes || '',
    maxFileSize: field?.maxFileSize,
    defaultChecked: field?.defaultChecked || false,
    allowMultiple: field?.allowMultiple || false,
    visibility: field?.visibility || { admin: true, teacher: true, parent: false },
    options: field?.options || ['Option 1', 'Option 2']
  });

  const generateKey = (label: string) => {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  };

  const handleLabelChange = (label: string) => {
    setFormData({
      ...formData,
      label,
      key: mode === 'add' ? generateKey(label) : formData.key
    });
  };

  const handleSave = () => {
    if (!formData.label || !formData.key) {
      alert('Please fill in required fields');
      return;
    }
    onSave(formData);
    onClose();
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...(formData.options || []), `Option ${(formData.options?.length || 0) + 1}`]
    });
  };

  const removeOption = (index: number) => {
    setFormData({
      ...formData,
      options: formData.options?.filter((_, i) => i !== index)
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Create a custom field for this section' : 'Edit Field'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? `This field will appear in the "${sectionName}" section for all students.`
              : 'Update the field configuration'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Field Label */}
          <div className="space-y-2">
            <Label htmlFor="label">
              Field Label <span className="text-red-500">*</span>
            </Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => handleLabelChange(e.target.value)}
              placeholder="e.g., State Name"
            />
          </div>

          {/* Field Key */}
          <div className="space-y-2">
            <Label htmlFor="key">
              Field Key <span className="text-red-500">*</span>
            </Label>
            <Input
              id="key"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              placeholder="e.g., state_name"
              disabled={mode === 'edit'}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Auto-generated from label. Used in database and API.
            </p>
          </div>

          {/* Field Type */}
          <div className="space-y-2">
            <Label htmlFor="type">
              Field Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="textarea">Text Area</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="dropdown">Dropdown</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="toggle">Toggle</SelectItem>
                <SelectItem value="file">File Upload</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Dynamic Section Based on Type */}
          {(formData.type === 'text' || formData.type === 'textarea') && (
            <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-0">Text Field Options</h4>
              
              <div className="space-y-2">
                <Label htmlFor="placeholder">Placeholder Text</Label>
                <Input
                  id="placeholder"
                  value={formData.placeholder}
                  onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                  placeholder="e.g., Enter your state name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hint">Hint Text</Label>
                <Textarea
                  id="hint"
                  value={formData.hint}
                  onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                  placeholder="Additional information about this field"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxLength">Maximum Length (characters)</Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={formData.maxLength || ''}
                  onChange={(e) => setFormData({ ...formData, maxLength: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder="e.g., 100"
                />
              </div>
            </div>
          )}

          {formData.type === 'number' && (
            <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-0">Number Field Options</h4>
              
              <div className="space-y-2">
                <Label htmlFor="placeholder">Placeholder Text</Label>
                <Input
                  id="placeholder"
                  value={formData.placeholder}
                  onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                  placeholder="e.g., Enter a number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hint">Hint Text</Label>
                <Textarea
                  id="hint"
                  value={formData.hint}
                  onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                  placeholder="Additional information about this field"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minValue">Minimum Value</Label>
                  <Input
                    id="minValue"
                    type="number"
                    value={formData.minValue || ''}
                    onChange={(e) => setFormData({ ...formData, minValue: e.target.value ? parseInt(e.target.value) : undefined })}
                    placeholder="e.g., 0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxValue">Maximum Value</Label>
                  <Input
                    id="maxValue"
                    type="number"
                    value={formData.maxValue || ''}
                    onChange={(e) => setFormData({ ...formData, maxValue: e.target.value ? parseInt(e.target.value) : undefined })}
                    placeholder="e.g., 100"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.type === 'date' && (
            <div className="space-y-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-0">Date Field Options</h4>
              
              <div className="space-y-2">
                <Label htmlFor="hint">Hint Text</Label>
                <Textarea
                  id="hint"
                  value={formData.hint}
                  onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                  placeholder="Additional information about this field"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minDate">Minimum Date</Label>
                  <Input
                    id="minDate"
                    type="date"
                    value={formData.minDate || ''}
                    onChange={(e) => setFormData({ ...formData, minDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDate">Maximum Date</Label>
                  <Input
                    id="maxDate"
                    type="date"
                    value={formData.maxDate || ''}
                    onChange={(e) => setFormData({ ...formData, maxDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {formData.type === 'dropdown' && (
            <div className="space-y-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 mb-0">Dropdown Options</h4>
                <Button type="button" size="sm" variant="outline" onClick={addOption}>
                  <Plus className="w-3 h-3 mr-1" />
                  Add Option
                </Button>
              </div>

              <div className="space-y-2">
                {formData.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(index)}
                      disabled={formData.options!.length <= 2}
                      className="flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                <Label htmlFor="allowMultiple" className="mb-0 text-sm">
                  Allow multiple selection?
                </Label>
                <Switch
                  id="allowMultiple"
                  checked={formData.allowMultiple}
                  onCheckedChange={(checked) => setFormData({ ...formData, allowMultiple: checked })}
                />
              </div>
            </div>
          )}

          {(formData.type === 'checkbox' || formData.type === 'toggle') && (
            <div className="space-y-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-0">
                {formData.type === 'checkbox' ? 'Checkbox' : 'Toggle'} Options
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="hint">Hint Text</Label>
                <Textarea
                  id="hint"
                  value={formData.hint}
                  onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                  placeholder="Additional information about this field"
                  rows={2}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-indigo-200">
                <Label htmlFor="defaultChecked" className="mb-0 text-sm">
                  Checked by default?
                </Label>
                <Switch
                  id="defaultChecked"
                  checked={formData.defaultChecked}
                  onCheckedChange={(checked) => setFormData({ ...formData, defaultChecked: checked })}
                />
              </div>
            </div>
          )}

          {formData.type === 'file' && (
            <div className="space-y-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-0">File Upload Options</h4>
              
              <div className="space-y-2">
                <Label htmlFor="hint">Hint Text</Label>
                <Textarea
                  id="hint"
                  value={formData.hint}
                  onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                  placeholder="Additional information about this field"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileTypes">Accepted file types</Label>
                <Input
                  id="fileTypes"
                  value={formData.fileTypes}
                  onChange={(e) => setFormData({ ...formData, fileTypes: e.target.value })}
                  placeholder="e.g., PDF, JPG, PNG"
                />
                <p className="text-xs text-gray-500">Comma-separated list of file extensions</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Max file size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={formData.maxFileSize || ''}
                  onChange={(e) => setFormData({ ...formData, maxFileSize: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder="e.g., 5"
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Required Field */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="required" className="mb-0">Required Field</Label>
              <p className="text-xs text-gray-500 mb-0">Users must fill this field</p>
            </div>
            <Switch
              id="required"
              checked={formData.required}
              onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
            />
          </div>

          {/* Visibility */}
          <div className="space-y-3">
            <Label>Visibility</Label>
            <p className="text-xs text-gray-500 -mt-2">Choose who can see this field</p>
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="vis-admin"
                    checked={formData.visibility?.admin}
                    onCheckedChange={(checked) => 
                      setFormData({ 
                        ...formData, 
                        visibility: { ...formData.visibility!, admin: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="vis-admin" className="mb-0 cursor-pointer">School Admin</Label>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Admin
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="vis-teacher"
                    checked={formData.visibility?.teacher}
                    onCheckedChange={(checked) => 
                      setFormData({ 
                        ...formData, 
                        visibility: { ...formData.visibility!, teacher: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="vis-teacher" className="mb-0 cursor-pointer">Teachers</Label>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Teacher
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="vis-parent"
                    checked={formData.visibility?.parent}
                    onCheckedChange={(checked) => 
                      setFormData({ 
                        ...formData, 
                        visibility: { ...formData.visibility!, parent: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="vis-parent" className="mb-0 cursor-pointer">Parents</Label>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Parent
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            {mode === 'add' ? 'Add Field' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface StudentFieldsEditorV2Props {
  onAddNewField?: () => void;
  activeTab?: TabType;
}

export function StudentFieldsEditorV2({ onAddNewField, activeTab = 'profile' }: StudentFieldsEditorV2Props) {
  const [sections, setSections] = useState(getInitialSections());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingField, setEditingField] = useState<CustomField | undefined>();
  const [currentSectionId, setCurrentSectionId] = useState<string>('');

  const currentSections = sections[activeTab];
  const currentSection = currentSections.find(s => s.id === currentSectionId);

  const toggleSection = (sectionId: string) => {
    setSections(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(section =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    }));
  };

  const handleMoveField = (dragIndex: number, hoverIndex: number, sectionId: string) => {
    setSections(prev => {
      const newSections = { ...prev };
      const tabSections = [...newSections[activeTab]];
      const sectionIndex = tabSections.findIndex(s => s.id === sectionId);
      
      if (sectionIndex === -1) return prev;

      const section = { ...tabSections[sectionIndex] };
      const newFields = [...section.fields];
      const [draggedField] = newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, draggedField);

      section.fields = newFields.map((field, index) => ({ ...field, order: index }));
      tabSections[sectionIndex] = section;

      return {
        ...newSections,
        [activeTab]: tabSections
      };
    });
  };

  const handleAddField = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setEditingField(undefined);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleEditField = (field: CustomField, sectionId: string) => {
    setCurrentSectionId(sectionId);
    setEditingField(field);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDeleteField = (fieldId: string, sectionId: string) => {
    if (confirm('Are you sure you want to delete this custom field?')) {
      setSections(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(section =>
          section.id === sectionId
            ? { ...section, fields: section.fields.filter(f => f.id !== fieldId) }
            : section
        )
      }));
    }
  };

  const handleSaveField = (fieldData: Partial<CustomField>) => {
    setSections(prev => {
      const newSections = { ...prev };
      const tabSections = [...newSections[activeTab]];
      const sectionIndex = tabSections.findIndex(s => s.id === currentSectionId);

      if (sectionIndex === -1) return prev;

      const section = { ...tabSections[sectionIndex] };

      if (modalMode === 'add') {
        const newField: CustomField = {
          id: `custom_${Date.now()}`,
          label: fieldData.label!,
          key: fieldData.key!,
          type: fieldData.type!,
          required: fieldData.required!,
          placeholder: fieldData.placeholder,
          hint: fieldData.hint,
          maxLength: fieldData.maxLength,
          minValue: fieldData.minValue,
          maxValue: fieldData.maxValue,
          minDate: fieldData.minDate,
          maxDate: fieldData.maxDate,
          fileTypes: fieldData.fileTypes,
          maxFileSize: fieldData.maxFileSize,
          defaultChecked: fieldData.defaultChecked,
          allowMultiple: fieldData.allowMultiple,
          visibility: fieldData.visibility!,
          isSystem: false,
          order: section.fields.length,
          options: fieldData.options
        };
        section.fields = [...section.fields, newField];
      } else {
        section.fields = section.fields.map(f =>
          f.id === editingField?.id
            ? { ...f, ...fieldData }
            : f
        );
      }

      tabSections[sectionIndex] = section;

      return {
        ...newSections,
        [activeTab]: tabSections
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {currentSections.map((section) => (
          <Card key={section.id} className="overflow-hidden shadow-sm">
            <Collapsible open={section.isOpen} onOpenChange={() => toggleSection(section.id)}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    {section.isOpen ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                    <h3 className="text-base font-medium text-gray-900 mb-0">
                      {section.name}
                    </h3>
                    <span className="text-sm text-gray-500">· {section.fields.length} fields</span>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-5 bg-gray-50">
                  <div className="space-y-3 mb-4">
                    {section.fields.map((field, index) => (
                      <DraggableFieldItem
                        key={field.id}
                        field={field}
                        index={index}
                        sectionId={section.id}
                        onMove={handleMoveField}
                        onEdit={handleEditField}
                        onDelete={handleDeleteField}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
                    onClick={() => handleAddField(section.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field to this Section
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
        
        <FieldModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveField}
          field={editingField}
          mode={modalMode}
          sectionName={currentSection?.name || ''}
        />

        {/* Helper Panel */}
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <h3 className="text-base font-medium text-gray-900 mb-0">
              How to Use Custom Fields
            </h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                1
              </div>
              <p className="mb-0">
                <strong>Add Fields:</strong> Click "+ Add Field to this Section" to create custom fields like State Name, Aadhar Number, Blood Group, etc.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                2
              </div>
              <p className="mb-0">
                <strong>Drag to Reorder:</strong> Drag custom fields to change their display order in forms.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                3
              </div>
              <p className="mb-0">
                <strong>System Fields:</strong> Fields with lock icons are system fields and cannot be deleted.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs">
                4
              </div>
              <p className="mb-0">
                <strong>Visibility Control:</strong> Set who can see each field (Admin/Teacher/Parent) for data privacy.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DndProvider>
  );
}