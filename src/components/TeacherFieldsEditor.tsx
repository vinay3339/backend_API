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
    principal: boolean;
    teacherSelf: boolean;
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

type TabType = 'profile' | 'employment' | 'qualifications' | 'salary' | 'timetable' | 'account' | 'audit';

const getInitialSections = (): Record<TabType, Section[]> => ({
  profile: [
    {
      id: 'personal-info',
      name: 'Personal Information',
      isOpen: true,
      fields: [
        { id: 'f1', label: 'First Name', key: 'first_name', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'f2', label: 'Last Name', key: 'last_name', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'f3', label: 'Gender', key: 'gender', type: 'dropdown', required: true, isSystem: true, order: 2, options: ['Male', 'Female', 'Other'], visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'f4', label: 'Date of Birth', key: 'dob', type: 'date', required: true, isSystem: true, order: 3, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'f5', label: 'Blood Group', key: 'blood_group', type: 'dropdown', required: false, isSystem: true, order: 4, options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'f6', label: 'Mother Tongue', key: 'mother_tongue', type: 'dropdown', required: false, isSystem: true, order: 5, options: ['Hindi', 'English', 'Telugu', 'Tamil', 'Kannada'], visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'f7', label: 'Religion', key: 'religion', type: 'dropdown', required: false, isSystem: true, order: 6, options: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'], visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'f8', label: 'Caste Category', key: 'caste_category', type: 'dropdown', required: false, isSystem: true, order: 7, options: ['General', 'OBC', 'SC', 'ST'], visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'f9', label: 'Aadhar Number', key: 'aadhar_number', type: 'text', required: false, isSystem: true, order: 8, placeholder: 'XXXX XXXX XXXX', visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'f10', label: 'PAN Number', key: 'pan_number', type: 'text', required: false, isSystem: true, order: 9, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'f11', label: 'Nationality', key: 'nationality', type: 'text', required: false, isSystem: true, order: 10, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'f12', label: 'Marital Status', key: 'marital_status', type: 'dropdown', required: false, isSystem: true, order: 11, options: ['Single', 'Married', 'Divorced', 'Widowed'], visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'f13', label: 'Spouse Name', key: 'spouse_name', type: 'text', required: false, isSystem: true, order: 12, visibility: { admin: true, principal: true, teacherSelf: true } },
      ]
    },
    {
      id: 'contact-info',
      name: 'Contact Information',
      isOpen: true,
      fields: [
        { id: 'c1', label: 'Email Address', key: 'email', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c2', label: 'Primary Phone Number', key: 'phone', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c3', label: 'Alternate Phone Number', key: 'alternate_phone', type: 'text', required: false, isSystem: true, order: 2, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c4', label: 'Present Address', key: 'present_address', type: 'textarea', required: true, isSystem: true, order: 3, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c5', label: 'Permanent Address', key: 'permanent_address', type: 'textarea', required: false, isSystem: true, order: 4, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c6', label: 'Village / Locality', key: 'village', type: 'text', required: false, isSystem: true, order: 5, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c7', label: 'Mandal', key: 'mandal', type: 'text', required: false, isSystem: true, order: 6, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c8', label: 'District', key: 'district', type: 'text', required: false, isSystem: true, order: 7, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c9', label: 'Emergency Contact Name', key: 'emergency_contact_name', type: 'text', required: false, isSystem: true, order: 8, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c10', label: 'Emergency Contact Relationship', key: 'emergency_contact_relation', type: 'text', required: false, isSystem: true, order: 9, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'c11', label: 'Emergency Contact Number', key: 'emergency_contact_number', type: 'text', required: false, isSystem: true, order: 10, visibility: { admin: true, principal: true, teacherSelf: true } },
      ]
    },
  ],
  employment: [
    {
      id: 'employment-details',
      name: 'Employment Details',
      isOpen: true,
      fields: [
        { id: 'e1', label: 'Employee ID', key: 'employee_id', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'e2', label: 'Date of Joining', key: 'date_of_joining', type: 'date', required: true, isSystem: true, order: 1, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'e3', label: 'Designation', key: 'designation', type: 'dropdown', required: true, isSystem: true, order: 2, options: ['High School Teacher', 'Primary Teacher', 'PET', 'Art Teacher', 'Music Teacher'], visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'e4', label: 'Department', key: 'department', type: 'dropdown', required: true, isSystem: true, order: 3, options: ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Telugu'], visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'e5', label: 'Subjects Assigned', key: 'subjects_assigned', type: 'text', required: false, isSystem: true, order: 4, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'e6', label: 'Classes Assigned', key: 'classes_assigned', type: 'text', required: false, isSystem: true, order: 5, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'e7', label: 'Sections Assigned', key: 'sections_assigned', type: 'text', required: false, isSystem: true, order: 6, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'e8', label: 'Employment Type', key: 'employment_type', type: 'dropdown', required: true, isSystem: true, order: 7, options: ['Full-time', 'Part-time', 'Contract'], visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'e9', label: 'Salary Structure Type', key: 'salary_structure', type: 'dropdown', required: false, isSystem: true, order: 8, options: ['Monthly', 'Per-period'], visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'e10', label: 'Working Hours', key: 'working_hours', type: 'text', required: false, isSystem: true, order: 9, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'e11', label: 'Probation Status', key: 'probation_status', type: 'dropdown', required: false, isSystem: true, order: 10, options: ['On Probation', 'Completed'], visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'e12', label: 'Confirmation Date', key: 'confirmation_date', type: 'date', required: false, isSystem: true, order: 11, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'e13', label: 'Payroll Category', key: 'payroll_category', type: 'dropdown', required: false, isSystem: true, order: 12, options: ['Teaching', 'Non-teaching'], visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'e14', label: 'PF Account Number', key: 'pf_account_number', type: 'text', required: false, isSystem: true, order: 13, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'e15', label: 'ESI Number', key: 'esi_number', type: 'text', required: false, isSystem: true, order: 14, visibility: { admin: true, principal: false, teacherSelf: false } },
      ]
    },
  ],
  qualifications: [
    {
      id: 'qualification-details',
      name: 'Qualification Details',
      isOpen: true,
      fields: [
        { id: 'q1', label: 'Highest Qualification', key: 'highest_qualification', type: 'dropdown', required: true, isSystem: true, order: 0, options: ['B.Ed', 'M.Ed', 'B.Sc', 'M.Sc', 'BA', 'MA', 'PhD'], visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'q2', label: 'Specialization', key: 'specialization', type: 'dropdown', required: true, isSystem: true, order: 1, options: ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Social Studies'], visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'q3', label: 'University Name', key: 'university_name', type: 'text', required: true, isSystem: true, order: 2, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'q4', label: 'Year of Passing', key: 'year_of_passing', type: 'number', required: true, isSystem: true, order: 3, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'q5', label: 'Total Experience (Years)', key: 'total_experience', type: 'number', required: true, isSystem: true, order: 4, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'q6', label: 'Previous School Name', key: 'previous_school', type: 'text', required: false, isSystem: true, order: 5, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'q7', label: 'Previous Experience Description', key: 'previous_experience_desc', type: 'textarea', required: false, isSystem: true, order: 6, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'q8', label: 'Certifications', key: 'certifications', type: 'text', required: false, isSystem: true, order: 7, visibility: { admin: true, principal: true, teacherSelf: true } },
      ]
    },
  ],
  salary: [
    {
      id: 'bank-details',
      name: 'Bank Details',
      isOpen: true,
      fields: [
        { id: 's1', label: 'Account Holder Name', key: 'account_holder_name', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 's2', label: 'Bank Name', key: 'bank_name', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 's3', label: 'Branch Name', key: 'branch_name', type: 'text', required: true, isSystem: true, order: 2, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 's4', label: 'Account Number', key: 'account_number', type: 'text', required: true, isSystem: true, order: 3, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 's5', label: 'IFSC Code', key: 'ifsc_code', type: 'text', required: true, isSystem: true, order: 4, visibility: { admin: true, principal: false, teacherSelf: false } },
      ]
    },
    {
      id: 'salary-details',
      name: 'Salary Details',
      isOpen: true,
      fields: [
        { id: 'sal1', label: 'Salary Type', key: 'salary_type', type: 'dropdown', required: true, isSystem: true, order: 0, options: ['Monthly', 'Per class', 'Per hour'], visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'sal2', label: 'Monthly Salary Amount', key: 'monthly_salary', type: 'number', required: true, isSystem: true, order: 1, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'sal3', label: 'Allowances', key: 'allowances', type: 'textarea', required: false, isSystem: true, order: 2, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'sal4', label: 'Deductions', key: 'deductions', type: 'textarea', required: false, isSystem: true, order: 3, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'sal5', label: 'Net Salary', key: 'net_salary', type: 'number', required: false, isSystem: true, order: 4, visibility: { admin: true, principal: false, teacherSelf: false } },
      ]
    },
  ],
  timetable: [
    {
      id: 'class-allocation',
      name: 'Class Allocation',
      isOpen: true,
      fields: [
        { id: 't1', label: 'Assigned Classes', key: 'assigned_classes', type: 'text', required: false, isSystem: true, order: 0, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 't2', label: 'Assigned Subjects', key: 'assigned_subjects', type: 'text', required: false, isSystem: true, order: 1, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 't3', label: 'Total Periods per Week', key: 'total_periods', type: 'number', required: false, isSystem: true, order: 2, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 't4', label: 'Max Periods/Day', key: 'max_periods_day', type: 'number', required: false, isSystem: true, order: 3, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 't5', label: 'Free Periods', key: 'free_periods', type: 'number', required: false, isSystem: true, order: 4, visibility: { admin: true, principal: true, teacherSelf: true } },
      ]
    },
  ],
  account: [
    {
      id: 'login-info',
      name: 'Portal Login Information',
      isOpen: true,
      fields: [
        { id: 'a1', label: 'Username', key: 'username', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'a2', label: 'Default Password', key: 'default_password', type: 'text', required: false, isSystem: true, order: 1, visibility: { admin: true, principal: false, teacherSelf: false } },
        { id: 'a3', label: 'Last Login', key: 'last_login', type: 'text', required: false, isSystem: true, order: 2, visibility: { admin: true, principal: true, teacherSelf: true } },
        { id: 'a4', label: 'Account Status', key: 'account_status', type: 'toggle', required: false, isSystem: true, order: 3, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'a5', label: 'First Login Status', key: 'first_login_status', type: 'text', required: false, isSystem: true, order: 4, visibility: { admin: true, principal: true, teacherSelf: true } },
      ]
    },
    {
      id: 'permissions',
      name: 'Permissions',
      isOpen: true,
      fields: [
        { id: 'p1', label: 'Can Take Attendance', key: 'perm_attendance', type: 'checkbox', required: false, isSystem: true, order: 0, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'p2', label: 'Can Upload Marks', key: 'perm_marks', type: 'checkbox', required: false, isSystem: true, order: 1, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'p3', label: 'Can Upload Homework / Materials', key: 'perm_homework', type: 'checkbox', required: false, isSystem: true, order: 2, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'p4', label: 'Can Submit Reports', key: 'perm_reports', type: 'checkbox', required: false, isSystem: true, order: 3, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'p5', label: 'Can Message Parents', key: 'perm_message_parents', type: 'checkbox', required: false, isSystem: true, order: 4, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'p6', label: 'Can Access Finance Info', key: 'perm_finance', type: 'checkbox', required: false, isSystem: true, order: 5, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'p7', label: 'Can Access Reports', key: 'perm_view_reports', type: 'checkbox', required: false, isSystem: true, order: 6, visibility: { admin: true, principal: true, teacherSelf: false } },
        { id: 'p8', label: 'Can Update Student Behaviour', key: 'perm_behaviour', type: 'checkbox', required: false, isSystem: true, order: 7, visibility: { admin: true, principal: true, teacherSelf: false } },
      ]
    },
  ],
  audit: [
    {
      id: 'audit-log',
      name: 'Activity Log',
      isOpen: true,
      fields: [
        { id: 'au1', label: 'Log Entry Type', key: 'log_type', type: 'text', required: false, isSystem: true, order: 0, visibility: { admin: true, principal: true, teacherSelf: false } },
      ]
    },
  ],
});

const DraggableField = ({ field, index, moveField, onEdit, onDelete }: any) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'field',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'field',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-all ${
        isDragging ? 'opacity-50' : ''
      } ${field.isSystem ? 'border-gray-200' : 'border-blue-200 bg-blue-50/30'}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-900">{field.label}</span>
            {field.required && (
              <Badge variant="secondary" className="text-xs bg-red-50 text-red-700 border-red-200">
                Required
              </Badge>
            )}
            {field.isSystem && (
              <Lock className="h-3 w-3 text-gray-400" />
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Badge variant="outline" className="text-xs">
              {field.type}
            </Badge>
            <span>•</span>
            <span>Key: {field.key}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              {field.visibility.admin && <Badge variant="outline" className="text-xs">Admin</Badge>}
              {field.visibility.principal && <Badge variant="outline" className="text-xs">Principal</Badge>}
              {field.visibility.teacherSelf && <Badge variant="outline" className="text-xs">Teacher Self</Badge>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!field.isSystem && (
          <>
            <Button variant="ghost" size="sm" onClick={() => onEdit(field)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(field.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export function TeacherFieldsEditor() {
  const [sections, setSections] = useState<Record<TabType, Section[]>>(getInitialSections());
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  
  // New field form state
  const [newField, setNewField] = useState<Partial<CustomField>>({
    label: '',
    key: '',
    type: 'text',
    required: false,
    visibility: { admin: true, principal: true, teacherSelf: true },
    options: [],
  });

  const toggleSection = (sectionId: string) => {
    setSections((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((section) =>
        section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
      ),
    }));
  };

  const moveField = (sectionId: string, fromIndex: number, toIndex: number) => {
    setSections((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((section) => {
        if (section.id === sectionId) {
          const updatedFields = [...section.fields];
          const [movedField] = updatedFields.splice(fromIndex, 1);
          updatedFields.splice(toIndex, 0, movedField);
          return { ...section, fields: updatedFields.map((f, idx) => ({ ...f, order: idx })) };
        }
        return section;
      }),
    }));
  };

  const handleAddField = (sectionId: string) => {
    setSelectedSection(sectionId);
    setEditingField(null);
    setNewField({
      label: '',
      key: '',
      type: 'text',
      required: false,
      visibility: { admin: true, principal: true, teacherSelf: true },
      options: [],
    });
    setShowAddFieldModal(true);
  };

  const handleEditField = (field: CustomField) => {
    setEditingField(field);
    setNewField(field);
    setShowAddFieldModal(true);
  };

  const handleDeleteField = (sectionId: string, fieldId: string) => {
    setSections((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((section) =>
        section.id === sectionId
          ? { ...section, fields: section.fields.filter((f) => f.id !== fieldId) }
          : section
      ),
    }));
  };

  const saveField = () => {
    if (!newField.label || !newField.key) return;

    const fieldToSave: CustomField = {
      id: editingField?.id || `custom-${Date.now()}`,
      label: newField.label!,
      key: newField.key!,
      type: newField.type!,
      required: newField.required!,
      visibility: newField.visibility!,
      isSystem: false,
      order: 0,
      options: newField.options,
      placeholder: newField.placeholder,
      hint: newField.hint,
      maxLength: newField.maxLength,
      minValue: newField.minValue,
      maxValue: newField.maxValue,
      minDate: newField.minDate,
      maxDate: newField.maxDate,
      fileTypes: newField.fileTypes,
      maxFileSize: newField.maxFileSize,
      defaultChecked: newField.defaultChecked,
      allowMultiple: newField.allowMultiple,
    };

    setSections((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((section) => {
        if (section.id === selectedSection) {
          if (editingField) {
            return {
              ...section,
              fields: section.fields.map((f) => (f.id === editingField.id ? fieldToSave : f)),
            };
          } else {
            return {
              ...section,
              fields: [...section.fields, { ...fieldToSave, order: section.fields.length }],
            };
          }
        }
        return section;
      }),
    }));

    setShowAddFieldModal(false);
    setEditingField(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Teacher Custom Fields</h1>
            <p className="text-gray-600">Configure custom fields for teacher profiles</p>
          </div>

          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                <TabsTrigger value="salary">Salary & Bank</TabsTrigger>
                <TabsTrigger value="timetable">Timetable</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="audit">Audit Log</TabsTrigger>
              </TabsList>

              {(['profile', 'employment', 'qualifications', 'salary', 'timetable', 'account', 'audit'] as TabType[]).map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-6">
                  {sections[tab].map((section) => (
                    <Collapsible key={section.id} open={section.isOpen} onOpenChange={() => toggleSection(section.id)}>
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex items-center gap-2">
                            {section.isOpen ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                            <h3 className="text-gray-900">{section.name}</h3>
                            <Badge variant="secondary">{section.fields.length} fields</Badge>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <Separator />
                          <div className="p-4 space-y-3">
                            {section.fields.map((field, index) => (
                              <DraggableField
                                key={field.id}
                                field={field}
                                index={index}
                                moveField={(from: number, to: number) => moveField(section.id, from, to)}
                                onEdit={handleEditField}
                                onDelete={(id: string) => handleDeleteField(section.id, id)}
                              />
                            ))}
                            <Button
                              variant="outline"
                              className="w-full mt-4 border-dashed"
                              onClick={() => handleAddField(section.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Field to This Section
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        {/* Add/Edit Field Modal */}
        <Dialog open={showAddFieldModal} onOpenChange={setShowAddFieldModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingField ? 'Edit Field' : 'Add New Field'}</DialogTitle>
              <DialogDescription>
                Configure the field properties and visibility settings
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Field Label */}
              <div>
                <Label htmlFor="field-label">Field Label</Label>
                <Input
                  id="field-label"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="e.g., Date of Birth"
                />
              </div>

              {/* Field Key */}
              <div>
                <Label htmlFor="field-key">Field Key</Label>
                <Input
                  id="field-key"
                  value={newField.key}
                  onChange={(e) => setNewField({ ...newField, key: e.target.value })}
                  placeholder="e.g., date_of_birth"
                />
              </div>

              {/* Field Type */}
              <div>
                <Label htmlFor="field-type">Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value: any) => setNewField({ ...newField, type: value })}
                >
                  <SelectTrigger id="field-type">
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

              {/* Conditional fields based on type */}
              {newField.type === 'dropdown' && (
                <div>
                  <Label htmlFor="field-options">Dropdown Options (comma-separated)</Label>
                  <Input
                    id="field-options"
                    value={newField.options?.join(', ')}
                    onChange={(e) =>
                      setNewField({ ...newField, options: e.target.value.split(',').map((s) => s.trim()) })
                    }
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}

              {/* Required Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="field-required"
                  checked={newField.required}
                  onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                />
                <Label htmlFor="field-required">Required Field</Label>
              </div>

              {/* Visibility Settings */}
              <div>
                <Label className="mb-3 block">Visibility</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vis-admin"
                      checked={newField.visibility?.admin}
                      onCheckedChange={(checked) =>
                        setNewField({
                          ...newField,
                          visibility: { ...newField.visibility!, admin: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="vis-admin">Admin</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vis-principal"
                      checked={newField.visibility?.principal}
                      onCheckedChange={(checked) =>
                        setNewField({
                          ...newField,
                          visibility: { ...newField.visibility!, principal: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="vis-principal">Principal</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vis-teacher"
                      checked={newField.visibility?.teacherSelf}
                      onCheckedChange={(checked) =>
                        setNewField({
                          ...newField,
                          visibility: { ...newField.visibility!, teacherSelf: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="vis-teacher">Teacher Self</label>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddFieldModal(false)}>
                Cancel
              </Button>
              <Button onClick={saveField}>
                {editingField ? 'Update Field' : 'Add Field'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}
