import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { copyToClipboard } from '../utils/clipboard';
import { StudentProfileFields } from './StudentProfileFields';
import { StudentFormFields } from './StudentFormFields';
import { StudentAcademicTab } from './StudentAcademicTab';
import { StudentFeeTab } from './StudentFeeTab';
import { StudentAccountTab } from './StudentAccountTab';
import { StudentAuditTab } from './StudentAuditTab';
import { StudentFieldsEditorV2 } from './StudentFieldsEditorV2';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Upload,
  MoreVertical,
  Eye,
  Edit,
  KeyRound,
  UserX,
  Users,
  X,
  Check,
  Calendar,
  Mail,
  Phone,
  MapPin,
  UserPlus,
  Trash2,
  AlertCircle,
  EyeOff,
  Copy,
  Printer,
  RefreshCw,
  CheckCircle,
  Download,
  Award,
  DollarSign,
  Settings2,
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { downloadCSVTemplate } from '../utils/csvTemplate';

// Types
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  admissionNo: string;
  class: string;
  section: string;
  rollNumber?: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Transferred';
  email?: string;
  phone?: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup?: string;
  motherTongue?: string;
  religion?: string;
  category?: string;
  aadharNumber?: string;
  nationality?: string;
  address?: string;
  permanentAddress?: string;
  city?: string;
  village?: string;
  mandal?: string;
  district?: string;
  state?: string;
  zipCode?: string;
  academicYear?: string;
  dateOfAdmission?: string;
  previousSchool?: string;
  previousClass?: string;
  medium?: string;
  syllabus?: string;
  house?: string;
  transportOpted?: string;
  busRoute?: string;
  pickupPoint?: string;
  dropPoint?: string;
  transportFeeCategory?: string;
  guardians: Guardian[];
  hasAccount: boolean;
  firstLogin: boolean;
  avatar?: string;
  updatedAt: string;
}

interface Guardian {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
  occupation?: string;
  isPrimary?: boolean;
}

interface AuditLog {
  id: string;
  date: string;
  actor: string;
  action: string;
  changes: string;
}

// Mock Data
const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Johnson',
    admissionNo: 'ADM2024001',
    class: '10',
    section: 'A',
    status: 'Active',
    email: 'emma.johnson@school.edu',
    phone: '+1 234-567-8901',
    gender: 'Female',
    dob: '2009-05-15',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    guardians: [
      {
        id: 'g1',
        name: 'Michael Johnson',
        relation: 'Father',
        phone: '+1 234-567-8900',
        email: 'michael.j@email.com',
        isPrimary: true,
      },
    ],
    hasAccount: true,
    firstLogin: false,
    updatedAt: '2024-11-05',
  },
  {
    id: '2',
    firstName: 'Liam',
    lastName: 'Smith',
    admissionNo: 'ADM2024002',
    class: '10',
    section: 'A',
    status: 'Active',
    email: 'liam.smith@school.edu',
    phone: '+1 234-567-8902',
    gender: 'Male',
    dob: '2009-08-22',
    address: '456 Oak Avenue',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62702',
    guardians: [
      {
        id: 'g2',
        name: 'Sarah Smith',
        relation: 'Mother',
        phone: '+1 234-567-8903',
        email: 'sarah.s@email.com',
        isPrimary: true,
      },
    ],
    hasAccount: true,
    firstLogin: true,
    updatedAt: '2024-11-08',
  },
  {
    id: '3',
    firstName: 'Olivia',
    lastName: 'Williams',
    admissionNo: 'ADM2024003',
    class: '9',
    section: 'B',
    status: 'Active',
    email: 'olivia.w@school.edu',
    phone: '+1 234-567-8904',
    gender: 'Female',
    dob: '2010-03-10',
    guardians: [
      {
        id: 'g3',
        name: 'Robert Williams',
        relation: 'Father',
        phone: '+1 234-567-8905',
        email: 'robert.w@email.com',
        isPrimary: true,
      },
    ],
    hasAccount: false,
    firstLogin: false,
    updatedAt: '2024-11-03',
  },
  {
    id: '4',
    firstName: 'Noah',
    lastName: 'Brown',
    admissionNo: 'ADM2023045',
    class: '11',
    section: 'A',
    status: 'Inactive',
    email: 'noah.brown@school.edu',
    gender: 'Male',
    dob: '2008-12-01',
    guardians: [],
    hasAccount: true,
    firstLogin: false,
    updatedAt: '2024-10-20',
  },
  {
    id: '5',
    firstName: 'Ava',
    lastName: 'Davis',
    admissionNo: 'ADM2020112',
    class: '12',
    section: 'B',
    status: 'Graduated',
    email: 'ava.davis@school.edu',
    gender: 'Female',
    dob: '2007-07-18',
    guardians: [],
    hasAccount: true,
    firstLogin: false,
    updatedAt: '2024-06-15',
  },
  {
    id: '6',
    firstName: 'Ethan',
    lastName: 'Martinez',
    admissionNo: 'ADM2023078',
    class: '10',
    section: 'B',
    status: 'Transferred',
    email: 'ethan.m@school.edu',
    gender: 'Male',
    dob: '2009-01-25',
    guardians: [],
    hasAccount: false,
    firstLogin: false,
    updatedAt: '2024-09-10',
  },
];

const mockAuditLogs: AuditLog[] = [
  {
    id: 'a1',
    date: '2024-11-08 10:30 AM',
    actor: 'Mrs. Administrator',
    action: 'Updated Profile',
    changes: 'Changed phone number',
  },
  {
    id: 'a2',
    date: '2024-11-05 02:15 PM',
    actor: 'Dr. Principal',
    action: 'Updated Class',
    changes: 'Promoted to Grade 10',
  },
  {
    id: 'a3',
    date: '2024-10-28 09:00 AM',
    actor: 'System',
    action: 'Account Created',
    changes: 'Student account activated',
  },
];

type ViewMode = 'list' | 'add' | 'details' | 'fields';

export function StudentManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string[]>(['Active']);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 10;

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchQuery === '' ||
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesSection = selectedSection === 'all' || student.section === selectedSection;
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(student.status);
    return matchesSearch && matchesClass && matchesSection && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewStudent = (student: Student) => {
    console.log('🔍 View student clicked:', student);
    setSelectedStudent(student);
    setViewMode('details');
  };

  const handleEditStudent = (student: Student) => {
    console.log('✏️ Edit student clicked:', student);
    setSelectedStudent(student);
    setViewMode('add'); // Reuse add form in edit mode
  };

  const handleDeleteStudent = (student: Student) => {
    console.log('🗑️ Delete student clicked:', student);
    setStudentToDelete(student);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete.id));
      setShowDeleteDialog(false);
      setStudentToDelete(null);
    }
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleCSVImport = () => {
    fileInputRef.current?.click();
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      return { data: [], errors: ['CSV file is empty or has no data rows'] };
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const requiredHeaders = ['firstName', 'lastName', 'admissionNo', 'class', 'section', 'email', 'phone', 'gender', 'dob'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      return { 
        data: [], 
        errors: [`Missing required columns: ${missingHeaders.join(', ')}`] 
      };
    }

    const data: any[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) {
        errors.push(`Row ${i + 1}: Column count mismatch`);
        continue;
      }

      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      // Validate required fields
      if (!row.firstName || !row.lastName || !row.admissionNo) {
        errors.push(`Row ${i + 1}: Missing required fields (firstName, lastName, or admissionNo)`);
        continue;
      }

      // Check for duplicate admission number
      if (students.some(s => s.admissionNo === row.admissionNo)) {
        errors.push(`Row ${i + 1}: Admission number ${row.admissionNo} already exists`);
        continue;
      }

      data.push(row);
    }

    return { data, errors };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please select a valid CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const { data, errors } = parseCSV(text);
      
      setCsvData(data);
      setImportErrors(errors);
      
      if (data.length > 0) {
        setShowImportDialog(true);
      } else if (errors.length > 0) {
        toast.error(`CSV import failed: ${errors[0]}`);
      }
    };
    
    reader.readAsText(file);
    
    // Reset file input
    if (e.target) {
      e.target.value = '';
    }
  };

  const confirmImport = () => {
    const newStudents = csvData.map((row, index) => ({
      id: `imported-${Date.now()}-${index}`,
      firstName: row.firstName,
      lastName: row.lastName,
      admissionNo: row.admissionNo,
      class: row.class,
      section: row.section,
      status: row.status || 'Active',
      email: row.email || '',
      phone: row.phone || '',
      gender: row.gender,
      dob: row.dob,
      address: row.address || '',
      city: row.city || '',
      state: row.state || '',
      zipCode: row.zipCode || '',
      guardians: [],
      hasAccount: false,
      firstLogin: false,
      updatedAt: new Date().toISOString().split('T')[0],
    }));

    setStudents([...students, ...newStudents]);
    setShowImportDialog(false);
    setCsvData([]);
    setImportErrors([]);
    toast.success(`Successfully imported ${newStudents.length} student(s)`);
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
    setViewMode('list');
  };

  if (viewMode === 'add') {
    return (
      <AddStudentForm
        onCancel={() => {
          setSelectedStudent(null);
          setViewMode('list');
        }}
        onSubmit={handleAddStudent}
        existingStudent={selectedStudent}
      />
    );
  }

  if (viewMode === 'details' && selectedStudent) {
    return (
      <StudentDetails
        student={selectedStudent}
        onBack={() => {
          setSelectedStudent(null);
          setViewMode('list');
        }}
        onEdit={() => handleEditStudent(selectedStudent)}
      />
    );
  }

  if (viewMode === 'fields') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <p className="text-sm text-gray-600 mb-1">Dashboard / Students / Student Custom Fields</p>
                <h1 className="text-2xl font-semibold text-gray-900 mb-0">Student Custom Fields</h1>
                <p className="text-sm text-gray-600 mb-0">Configure custom fields for student profiles</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-4 md:px-6 lg:px-8 py-6">
          <Tabs defaultValue="profile" className="w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
              <div className="overflow-x-auto border-b border-gray-200">
                <TabsList className="w-full justify-start h-auto p-0 bg-transparent inline-flex min-w-full">
                  <TabsTrigger 
                    value="profile" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 px-6 py-4 text-sm whitespace-nowrap"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="academic" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 px-6 py-4 text-sm whitespace-nowrap"
                  >
                    Academic Performance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="fees" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 px-6 py-4 text-sm whitespace-nowrap"
                  >
                    Fee Payment
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 px-6 py-4 text-sm whitespace-nowrap"
                  >
                    Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="audit" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 px-6 py-4 text-sm whitespace-nowrap"
                  >
                    Audit Log
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="profile">
              <StudentFieldsEditorV2 activeTab="profile" />
            </TabsContent>
            <TabsContent value="academic">
              <StudentFieldsEditorV2 activeTab="academic" />
            </TabsContent>
            <TabsContent value="fees">
              <StudentFieldsEditorV2 activeTab="fees" />
            </TabsContent>
            <TabsContent value="account">
              <StudentFieldsEditorV2 activeTab="account" />
            </TabsContent>
            <TabsContent value="audit">
              <StudentFieldsEditorV2 activeTab="audit" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-gray-900 mb-1">Students</h1>
            <p className="text-sm text-gray-600">Admin &gt; Students</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Test Dropdown - Remove after confirming it works */}
            <Button 
              type="button" 
              variant="outline" 
              className="gap-2"
              onClick={() => setViewMode('fields')}
            >
              <Settings2 className="w-4 h-4" />
              <span className="hidden sm:inline">Custom Fields</span>
              <span className="sm:hidden">Fields</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Import CSV</span>
                  <span className="sm:hidden">Import</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={handleCSVImport} className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload CSV File
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => {
                  downloadCSVTemplate();
                  toast.success('CSV template downloaded');
                }} className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button type="button" onClick={() => {
              console.log('Add Student button clicked');
              setViewMode('add');
            }} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Student</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 md:p-6 mb-6 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or admission number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
          </div>

          {/* Class Filter */}
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="9">Class 9</SelectItem>
              <SelectItem value="10">Class 10</SelectItem>
              <SelectItem value="11">Class 11</SelectItem>
              <SelectItem value="12">Class 12</SelectItem>
            </SelectContent>
          </Select>

          {/* Section Filter */}
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="All Sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              <SelectItem value="A">Section A</SelectItem>
              <SelectItem value="B">Section B</SelectItem>
              <SelectItem value="C">Section C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Status:</span>
          {['Active', 'Inactive', 'Graduated', 'Transferred'].map((status) => (
            <Badge
              key={status}
              variant={statusFilter.includes(status) ? 'default' : 'outline'}
              className={`cursor-pointer rounded-full ${
                statusFilter.includes(status)
                  ? status === 'Active'
                    ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                    : status === 'Inactive'
                    ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    : status === 'Graduated'
                    ? 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200'
                    : 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200'
                  : ''
              }`}
              onClick={() => toggleStatusFilter(status)}
            >
              {status}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        {paginatedStudents.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedClass !== 'all' || selectedSection !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by adding your first student'}
            </p>
            {!searchQuery && selectedClass === 'all' && selectedSection === 'all' && (
              <Button type="button" onClick={() => setViewMode('add')} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Admission No</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {student.firstName[0]}
                              {student.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="text-xs text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{student.admissionNo}</TableCell>
                      <TableCell className="text-sm">Class {student.class}</TableCell>
                      <TableCell className="text-sm">Section {student.section}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-full ${
                            student.status === 'Active'
                              ? 'bg-green-50 text-green-700 border-green-300'
                              : student.status === 'Inactive'
                              ? 'bg-gray-50 text-gray-700 border-gray-300'
                              : student.status === 'Graduated'
                              ? 'bg-purple-50 text-purple-700 border-purple-300'
                              : 'bg-orange-50 text-orange-700 border-orange-300'
                          }`}
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(student.updatedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="z-50">
                            <DropdownMenuItem 
                              onSelect={() => {
                                console.log('✅ View Details clicked for:', student.firstName, student.lastName);
                                handleViewStudent(student);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onSelect={() => {
                                console.log('✏️ Edit clicked for:', student.firstName, student.lastName);
                                handleEditStudent(student);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onSelect={() => {
                                console.log('🔑 Reset password clicked for:', student.firstName, student.lastName);
                              }}
                            >
                              <KeyRound className="w-4 h-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => {
                                console.log('🗑️ Deactivate clicked for:', student.firstName, student.lastName);
                                handleDeleteStudent(student);
                              }}
                              className="text-red-600"
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{' '}
                  {filteredStudents.length} students
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      type="button"
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate {studentToDelete?.firstName}{' '}
              {studentToDelete?.lastName}? This action can be reversed later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSV Import Preview Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import Students from CSV</DialogTitle>
            <DialogDescription>
              Review the students below before importing. {csvData.length} student(s) will be added.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {importErrors.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-amber-800">
                    <p className="mb-1"><strong>Import Warnings:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                      {importErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Admission No</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.slice(0, 10).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.firstName} {row.lastName}</TableCell>
                      <TableCell>{row.admissionNo}</TableCell>
                      <TableCell>{row.class}-{row.section}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.email || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {csvData.length > 10 && (
                <div className="p-2 bg-gray-50 text-center text-xs text-gray-600">
                  ... and {csvData.length - 10} more student(s)
                </div>
              )}
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Students will be created with default "Active" status. 
                  You can edit individual student details after import.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setShowImportDialog(false);
                setCsvData([]);
                setImportErrors([]);
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={confirmImport}
              disabled={csvData.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Import {csvData.length} Student(s)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Add Student Form Component
interface AddStudentFormProps {
  onCancel: () => void;
  onSubmit: (student: Student) => void;
  existingStudent?: Student | null;
}

function AddStudentForm({ onCancel, onSubmit, existingStudent }: AddStudentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Student>>(
    existingStudent || {
      firstName: '',
      lastName: '',
      admissionNo: '',
      gender: 'Male',
      dob: '',
      class: '',
      section: '',
      rollNumber: '',
      bloodGroup: '',
      motherTongue: '',
      religion: '',
      category: '',
      aadharNumber: '',
      nationality: 'Indian',
      status: 'Active',
      email: '',
      phone: '',
      address: '',
      permanentAddress: '',
      city: '',
      village: '',
      mandal: '',
      district: '',
      state: '',
      zipCode: '',
      academicYear: '2024-25',
      dateOfAdmission: '',
      previousSchool: '',
      previousClass: '',
      medium: '',
      syllabus: '',
      house: '',
      transportOpted: 'No',
      busRoute: '',
      pickupPoint: '',
      dropPoint: '',
      transportFeeCategory: '',
      guardians: [],
      hasAccount: false,
      firstLogin: true,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tempPassword, setTempPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forcePasswordChange, setForcePasswordChange] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const totalSteps = 6;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Personal Information
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
    } else if (step === 2) {
      // Contact Information
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    } else if (step === 3) {
      // Guardian Information - optional
    } else if (step === 4) {
      // Academic Details
      if (!formData.admissionNo) newErrors.admissionNo = 'Admission number is required';
      if (!formData.class) newErrors.class = 'Class is required';
      if (!formData.section) newErrors.section = 'Section is required';
    } else if (step === 5) {
      // Transport Details - optional
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    
    // Ensure at least one of each required character type
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
    password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
    password += '!@#$%^&*'[Math.floor(Math.random() * 8)]; // Special
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setTempPassword(password);
    toast.success('Password generated successfully');
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(totalSteps, s + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const createAccount = tempPassword.length > 0;
      
      const newStudent: Student = {
        id: existingStudent?.id || Date.now().toString(),
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        admissionNo: formData.admissionNo || '',
        class: formData.class || '',
        section: formData.section || '',
        status: formData.status || 'Active',
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender || 'Male',
        dob: formData.dob || '',
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        guardians: formData.guardians || [],
        hasAccount: createAccount,
        firstLogin: createAccount ? forcePasswordChange : false,
        updatedAt: new Date().toISOString().split('T')[0],
      };
      
      if (createAccount) {
        setGeneratedPassword(tempPassword);
        setShowPasswordModal(true);
      } else {
        onSubmit(newStudent);
      }
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    const newStudent: Student = {
      id: existingStudent?.id || Date.now().toString(),
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      admissionNo: formData.admissionNo || '',
      class: formData.class || '',
      section: formData.section || '',
      status: formData.status || 'Active',
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender || 'Male',
      dob: formData.dob || '',
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      guardians: formData.guardians || [],
      hasAccount: true,
      firstLogin: forcePasswordChange,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    onSubmit(newStudent);
  };

  const addGuardian = () => {
    setFormData({
      ...formData,
      guardians: [
        ...(formData.guardians || []),
        {
          id: Date.now().toString(),
          name: '',
          relation: '',
          phone: '',
          email: '',
          isPrimary: formData.guardians?.length === 0,
        },
      ],
    });
  };

  const updateGuardian = (index: number, field: keyof Guardian, value: any) => {
    const updatedGuardians = [...(formData.guardians || [])];
    updatedGuardians[index] = { ...updatedGuardians[index], [field]: value };
    setFormData({ ...formData, guardians: updatedGuardians });
  };

  const removeGuardian = (index: number) => {
    const updatedGuardians = formData.guardians?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, guardians: updatedGuardians });
  };

  const setPrimaryGuardian = (index: number) => {
    const updatedGuardians = formData.guardians?.map((g, i) => ({
      ...g,
      isPrimary: i === index,
    })) || [];
    setFormData({ ...formData, guardians: updatedGuardians });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button type="button" variant="ghost" onClick={onCancel} className="mb-4 -ml-2">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Students
        </Button>
        <h1 className="text-gray-900 mb-1">
          {existingStudent ? 'Edit Student' : 'Add New Student'}
        </h1>
        <p className="text-sm text-gray-600">
          Admin &gt; Students &gt; {existingStudent ? 'Edit' : 'Add New'}
        </p>
      </div>

      {/* Progress */}
      <Card className="p-6 mb-6 rounded-2xl shadow-sm">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-600">{(currentStep / totalSteps) * 100}%</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Personal Info', 'Contact Info', 'Guardians', 'Academic Details', 'Transport', 'Account'].map((label, idx) => (
            <Badge
              key={idx}
              variant={currentStep > idx + 1 ? 'default' : 'outline'}
              className={`rounded-full ${
                currentStep === idx + 1
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : currentStep > idx + 1
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : ''
              }`}
            >
              {currentStep > idx + 1 && <Check className="w-3 h-3 mr-1" />}
              {label}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Form */}
      <Card className="p-6 rounded-2xl shadow-sm">
        {/* Steps 1-5: Use StudentFormFields Component */}
        {currentStep <= 5 && (
          <StudentFormFields
            currentStep={currentStep}
            formData={formData as any}
            setFormData={setFormData as any}
            errors={errors}
          />
        )}

        {/* Step 6: Account */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-2">Portal Account</h3>
              <p className="text-sm text-gray-600 mb-4">
                Create a portal account for the student (optional)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username (Read-only)</Label>
                <Input
                  id="username"
                  value={`${formData.firstName?.toLowerCase() || ''}.${formData.lastName?.toLowerCase() || ''}`}
                  readOnly
                  className="rounded-xl bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Auto-generated based on student name
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="text-gray-900 mb-3">Set Temporary Password</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tempPassword">Temporary Password</Label>
                    <div className="flex gap-2 mt-1">
                      <div className="relative flex-1">
                        <Input
                          id="tempPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={tempPassword}
                          onChange={(e) => setTempPassword(e.target.value)}
                          className="rounded-xl pr-10"
                          placeholder="Enter or generate a password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generatePassword}
                        className="gap-2 rounded-xl"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Generate
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters with uppercase, lowercase, number, and
                      special character
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="forceChange"
                      checked={forcePasswordChange}
                      onCheckedChange={(checked) => setForcePasswordChange(checked as boolean)}
                    />
                    <Label
                      htmlFor="forceChange"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Force change at first login (recommended)
                    </Label>
                  </div>

                  {tempPassword && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-blue-800">
                          After creating the account, the temporary password will be shown only once.
                          Make sure to copy or print it for the student.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button type="button" variant="outline" onClick={currentStep === 1 ? onCancel : handleBack}>
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          {currentStep < totalSteps ? (
            <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              Next
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 gap-2">
              <Check className="w-4 h-4" />
              {existingStudent ? 'Save Changes' : 'Create Student'}
            </Button>
          )}
        </div>
      </Card>

      {/* Temporary Password Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Account Created Successfully
            </DialogTitle>
            <DialogDescription>
              Temporary password (shown only once)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-blue-200">
              <p className="text-xs text-gray-600 mb-2">Temporary Password</p>
              <p className="text-2xl font-mono text-gray-900 tracking-wide break-all">
                {generatedPassword}
              </p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800">
                  <strong>Important:</strong> For security reasons, this password will not be shown
                  again. Please copy or print it now.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const success = await copyToClipboard(generatedPassword);
                  if (success) {
                    toast.success('Password copied to clipboard');
                  } else {
                    toast.error('Failed to copy password. Please copy manually.');
                  }
                }}
                className="flex-1 gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Password
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Slip
              </Button>
            </div>

            {(formData.email || formData.phone) && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600">
                  Password can also be sent via:
                </p>
                <div className="flex gap-2 text-xs">
                  {formData.email && (
                    <Badge variant="outline" className="gap-1">
                      <Mail className="w-3 h-3" />
                      Email: {formData.email}
                    </Badge>
                  )}
                  {formData.phone && (
                    <Badge variant="outline" className="gap-1">
                      <Phone className="w-3 h-3" />
                      SMS: {formData.phone}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              onClick={handlePasswordModalClose}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Student Details Component
interface StudentDetailsProps {
  student: Student;
  onBack: () => void;
  onEdit: () => void;
}

function StudentDetails({ student, onBack, onEdit }: StudentDetailsProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [tempPassword, setTempPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forcePasswordChange, setForcePasswordChange] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    
    // Ensure at least one of each required character type
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
    password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
    password += '!@#$%^&*'[Math.floor(Math.random() * 8)]; // Special
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setTempPassword(password);
    toast.success('Password generated successfully');
  };

  const handleCreateAccount = () => {
    if (!tempPassword) {
      toast.error('Please enter or generate a password');
      return;
    }
    setGeneratedPassword(tempPassword);
    setShowPasswordModal(true);
  };

  const handleResetPassword = () => {
    if (!tempPassword) {
      toast.error('Please enter or generate a password');
      return;
    }
    setGeneratedPassword(tempPassword);
    setShowPasswordModal(true);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button type="button" variant="ghost" onClick={onBack} className="mb-4 -ml-2">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Students
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                {student.firstName[0]}
                {student.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-gray-900 mb-2">
                {student.firstName} {student.lastName}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className={`rounded-full ${
                    student.status === 'Active'
                      ? 'bg-green-50 text-green-700 border-green-300'
                      : student.status === 'Inactive'
                      ? 'bg-gray-50 text-gray-700 border-gray-300'
                      : student.status === 'Graduated'
                      ? 'bg-purple-50 text-purple-700 border-purple-300'
                      : 'bg-orange-50 text-orange-700 border-orange-300'
                  }`}
                >
                  {student.status}
                </Badge>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{student.admissionNo}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-900">Class {student.class}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-900">Section {student.section}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="gap-2">
              <KeyRound className="w-4 h-4" />
              Reset Password
            </Button>
            <Button type="button" onClick={onEdit} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div>
        {/* Main Content */}
        <div className="flex gap-6">
          {/* Vertical Navigation Sidebar */}
          <div className="w-60 flex-shrink-0">
            <Card className="rounded-2xl shadow-sm p-2">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'account'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Account
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'audit'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Audit Log
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content Card */}
          <div className="flex-1">
            <Card className="rounded-2xl shadow-sm">
              <div className="p-6">
                {activeTab === 'profile' && <StudentProfileFields student={student} />}
                {activeTab === 'account' && <StudentAccountTab student={student} />}
                {activeTab === 'audit' && <StudentAuditTab />}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Temporary Password Modal - START KEEPING FROM HERE */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Account Created Successfully
            </DialogTitle>
            <DialogDescription>
              The temporary password has been generated. Please share this with the student securely.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-blue-200">
              <p className="text-xs text-gray-600 mb-2">Temporary Password</p>
              <p className="text-2xl font-mono text-gray-900 tracking-wide break-all">
                {generatedPassword}
              </p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800">
                  <strong>Important:</strong> For security reasons, this password will not be shown
                  again. Please copy or print it now.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const success = await copyToClipboard(generatedPassword);
                  if (success) {
                    toast.success('Password copied to clipboard');
                  } else {
                    toast.error('Failed to copy password. Please copy manually.');
                  }
                }}
                className="flex-1 gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Password
              </Button>
              <Button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// AddStudentDialog Component
function AddStudentDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rollNumber: '',
    class: '',
    section: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    emergencyContact: '',
  });
  const [forcePasswordChange, setForcePasswordChange] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const totalSteps = 6;

  const handleInputChange = (field: string, value: string) => {
    setStudent({ ...student, [field]: value });
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const newStudent: Student = {
      id: Date.now().toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      rollNumber: student.rollNumber,
      class: student.class,
      section: student.section,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      address: student.address,
      city: student.city,
      state: student.state,
      zipCode: student.zipCode,
      parentName: student.parentName,
      parentEmail: student.parentEmail,
      parentPhone: student.parentPhone,
      emergencyContact: student.emergencyContact,
      status: 'Active',
      hasAccount: false,
      firstLogin: false,
      attendance: 0,
      fees: { paid: 0, pending: 0, total: 0 },
      examResults: []
    };
    
    toast.success('Student added successfully');
    onOpenChange(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Step {step} of {totalSteps}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3>Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={student.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={student.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={student.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {step === 2 && (
            <div className="space-y-4">
              <h3>Academic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rollNumber">Roll Number *</Label>
                  <Input
                    id="rollNumber"
                    value={student.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="class">Class *</Label>
                  <Input
                    id="class"
                    value={student.class}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="section">Section *</Label>
                  <Input
                    id="section"
                    value={student.section}
                    onChange={(e) => handleInputChange('section', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personal Information */}
          {step === 3 && (
            <div className="space-y-4">
              <h3>Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={student.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    value={student.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-gray-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input
                    id="bloodGroup"
                    value={student.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Address Information */}
          {step === 4 && (
            <div className="space-y-4">
              <h3>Address Information</h3>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={student.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={student.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={student.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={student.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Parent/Guardian Information */}
          {step === 5 && (
            <div className="space-y-4">
              <h3>Parent/Guardian Information</h3>
              <div>
                <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                <Input
                  id="parentName"
                  value={student.parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentEmail">Parent Email *</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={student.parentEmail}
                    onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="parentPhone">Parent Phone *</Label>
                  <Input
                    id="parentPhone"
                    value={student.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                <Input
                  id="emergencyContact"
                  value={student.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 6: Review and Submit */}
          {step === 6 && (
            <div className="space-y-4">
              <h3>Review Information</h3>
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                <p><strong>Class:</strong> {student.class} {student.section}</p>
                <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
                <p><strong>Parent/Guardian:</strong> {student.parentName}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Previous
            </Button>
            {step < totalSteps ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
