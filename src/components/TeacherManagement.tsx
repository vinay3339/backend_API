import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  KeyRound,
  UserX,
  ChevronLeft,
  Settings2,
  Upload,
  Download,
} from 'lucide-react';
import { Separator } from './ui/separator';
import { TeacherProfileTab } from './TeacherProfileTab';
import { TeacherEmploymentTab } from './TeacherEmploymentTab';
import { TeacherQualificationTab } from './TeacherQualificationTab';
import { TeacherSalaryTab } from './TeacherSalaryTab';
import { TeacherTimetableTab } from './TeacherTimetableTab';
import { TeacherAccountTab } from './TeacherAccountTab';
import { TeacherAuditTab } from './TeacherAuditTab';
import { TeacherFieldsEditor } from './TeacherFieldsEditor';

// Types
interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  designation: string;
  department: string;
  status: 'Active' | 'Inactive';
  email: string;
  phoneNumber: string;
  dateOfJoining: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup?: string;
  motherTongue?: string;
  religion?: string;
  casteCategory?: string;
  aadharNumber?: string;
  panNumber?: string;
  nationality?: string;
  maritalStatus?: string;
  spouseName?: string;
  alternatePhone?: string;
  presentAddress: string;
  permanentAddress?: string;
  village?: string;
  mandal?: string;
  district?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContactNumber?: string;
  subjectsAssigned?: string[];
  classesAssigned?: string[];
  sectionsAssigned?: string[];
  employmentType: string;
  salaryStructure?: string;
  workingHours?: string;
  probationStatus?: string;
  confirmationDate?: string;
  payrollCategory?: string;
  pfAccountNumber?: string;
  esiNumber?: string;
  highestQualification: string;
  specialization: string;
  universityName: string;
  yearOfPassing: string;
  totalExperience: number;
  previousSchool?: string;
  previousExperienceDescription?: string;
  certifications?: string[];
  bankAccountHolderName?: string;
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
  ifscCode?: string;
  salaryType?: string;
  monthlySalary?: number;
  allowances?: Array<{ name: string; amount: number }>;
  deductions?: Array<{ name: string; amount: number }>;
  netSalary?: number;
  timetable?: any;
  username?: string;
  lastLogin?: string;
  firstLoginCompleted?: boolean;
}

// Sample data
const sampleTeachers: Teacher[] = [
  {
    id: '1',
    firstName: 'Ramesh',
    lastName: 'Johnson',
    employeeId: 'EMP2024015',
    designation: 'High School Teacher',
    department: 'Mathematics',
    status: 'Active',
    email: 'ramesh.johnson@riverside.edu',
    phoneNumber: '+91 98765 43210',
    dateOfJoining: '2020-06-15',
    gender: 'Male',
    dateOfBirth: '1985-04-20',
    bloodGroup: 'B+',
    motherTongue: 'Telugu',
    religion: 'Hindu',
    casteCategory: 'OBC',
    aadharNumber: '1234 5678 9012',
    panNumber: 'ABCDE1234F',
    nationality: 'Indian',
    maritalStatus: 'Married',
    spouseName: 'Priya Johnson',
    alternatePhone: '+91 87654 32109',
    presentAddress: '123, MG Road, Vijayawada',
    permanentAddress: '123, MG Road, Vijayawada',
    village: 'Vijayawada',
    mandal: 'Vijayawada Urban',
    district: 'Krishna',
    emergencyContactName: 'Priya Johnson',
    emergencyContactRelation: 'Spouse',
    emergencyContactNumber: '+91 87654 32109',
    subjectsAssigned: ['Mathematics', 'Statistics'],
    classesAssigned: ['Class 7-A', 'Class 8-A', 'Class 8-B', 'Class 9-A'],
    sectionsAssigned: ['A', 'B'],
    employmentType: 'Full-time',
    salaryStructure: 'Monthly',
    workingHours: '8 hours/day',
    probationStatus: 'Completed',
    confirmationDate: '2020-12-15',
    payrollCategory: 'Teaching',
    pfAccountNumber: 'PF123456789',
    esiNumber: 'ESI987654321',
    highestQualification: 'M.Sc Mathematics',
    specialization: 'Pure Mathematics',
    universityName: 'Andhra University',
    yearOfPassing: '2010',
    totalExperience: 12,
    previousSchool: 'St. Mary\'s High School',
    previousExperienceDescription: 'Taught Mathematics for classes 8-10 for 8 years',
    certifications: ['TET', 'B.Ed', 'Advanced Mathematics Workshop'],
    bankName: 'State Bank of India',
    branchName: 'Vijayawada Main',
    accountNumber: '1234567890123',
    ifscCode: 'SBIN0001234',
    salaryType: 'Monthly',
    monthlySalary: 48000,
    allowances: [
      { name: 'House Rent Allowance', amount: 10000 },
      { name: 'Transport Allowance', amount: 3000 },
    ],
    deductions: [
      { name: 'Provident Fund', amount: 2400 },
      { name: 'Professional Tax', amount: 200 },
    ],
    netSalary: 58400,
    username: 'ramesh.johnson',
    lastLogin: 'Nov 28, 2025 at 10:30 AM',
    firstLoginCompleted: true,
  },
  {
    id: '2',
    firstName: 'Lakshmi',
    lastName: 'Devi',
    employeeId: 'EMP2024016',
    designation: 'High School Teacher',
    department: 'English',
    status: 'Active',
    email: 'lakshmi.devi@riverside.edu',
    phoneNumber: '+91 98765 43211',
    dateOfJoining: '2019-08-10',
    gender: 'Female',
    dateOfBirth: '1982-07-15',
    bloodGroup: 'A+',
    motherTongue: 'Telugu',
    religion: 'Hindu',
    casteCategory: 'General',
    nationality: 'Indian',
    maritalStatus: 'Married',
    presentAddress: '456, Gandhi Road, Vijayawada',
    subjectsAssigned: ['English', 'English Literature'],
    classesAssigned: ['Class 9-A', 'Class 9-B', 'Class 10-A'],
    sectionsAssigned: ['A', 'B'],
    employmentType: 'Full-time',
    highestQualification: 'MA English',
    specialization: 'English Literature',
    universityName: 'Osmania University',
    yearOfPassing: '2005',
    totalExperience: 15,
    certifications: ['TET', 'CTET', 'B.Ed'],
    monthlySalary: 52000,
    netSalary: 52000,
    username: 'lakshmi.devi',
    firstLoginCompleted: true,
  },
  {
    id: '3',
    firstName: 'Suresh',
    lastName: 'Kumar',
    employeeId: 'EMP2024017',
    designation: 'Primary Teacher',
    department: 'Science',
    status: 'Active',
    email: 'suresh.kumar@riverside.edu',
    phoneNumber: '+91 98765 43212',
    dateOfJoining: '2021-04-01',
    gender: 'Male',
    dateOfBirth: '1990-02-10',
    bloodGroup: 'O+',
    motherTongue: 'Hindi',
    religion: 'Hindu',
    casteCategory: 'SC',
    nationality: 'Indian',
    maritalStatus: 'Single',
    presentAddress: '789, Station Road, Vijayawada',
    subjectsAssigned: ['Science', 'Environmental Science'],
    classesAssigned: ['Class 6-A', 'Class 6-B', 'Class 7-A'],
    sectionsAssigned: ['A', 'B'],
    employmentType: 'Full-time',
    highestQualification: 'B.Sc Physics',
    specialization: 'Physics',
    universityName: 'JNTU Kakinada',
    yearOfPassing: '2012',
    totalExperience: 8,
    certifications: ['TET', 'B.Ed'],
    monthlySalary: 38000,
    netSalary: 38000,
    username: 'suresh.kumar',
    firstLoginCompleted: false,
  },
];

type ViewType = 'list' | 'detail' | 'custom-fields';

export function TeacherManagement() {
  const [view, setView] = useState<ViewType>('list');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editedTeacher, setEditedTeacher] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const handleViewDetails = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setEditedTeacher({ ...teacher });
    setView('detail');
    setIsEditing(false);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setEditedTeacher({ ...teacher });
    setView('detail');
    setIsEditing(true);
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedTeacher(null);
    setEditedTeacher(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    if (editedTeacher) {
      setEditedTeacher({
        ...editedTeacher,
        [field]: value,
      });
    }
  };

  const handleSaveEdit = () => {
    // Here you would normally save the changes to the backend
    if (editedTeacher) {
      setSelectedTeacher(editedTeacher);
    }
    setIsEditing(false);
    // Show success message
    alert('Teacher information updated successfully!');
  };

  const handleCancelEdit = () => {
    // Restore original data
    if (selectedTeacher) {
      setEditedTeacher({ ...selectedTeacher });
    }
    setIsEditing(false);
  };

  const filteredTeachers = sampleTeachers.filter((teacher) => {
    const matchesSearch = 
      teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || teacher.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (view === 'custom-fields') {
    return <TeacherFieldsEditor />;
  }

  if (view === 'detail' && selectedTeacher) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={handleBackToList} className="hover:text-gray-900">
              Dashboard
            </button>
            <span>/</span>
            <button onClick={handleBackToList} className="hover:text-gray-900">
              Teachers
            </button>
            <span>/</span>
            <span className="text-gray-900">Teacher Details</span>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <Card className="p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl">
                      {getInitials(selectedTeacher.firstName, selectedTeacher.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-gray-900">{selectedTeacher.firstName} {selectedTeacher.lastName}</h1>
                      <Badge variant={selectedTeacher.status === 'Active' ? 'default' : 'secondary'}>
                        {selectedTeacher.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="text-gray-600">
                        <span className="text-gray-500">Employee ID:</span> {selectedTeacher.employeeId}
                      </div>
                      <div className="text-gray-600">
                        <span className="text-gray-500">Department:</span> {selectedTeacher.department}
                      </div>
                      <div className="text-gray-600">
                        <span className="text-gray-500">Designation:</span> {selectedTeacher.designation}
                      </div>
                      <div className="text-gray-600">
                        <span className="text-gray-500">Date of Joining:</span> {selectedTeacher.dateOfJoining}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <KeyRound className="h-4 w-4 mr-2" />
                    Reset Password
                  </Button>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveEdit}>
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* Tabs */}
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
                      onClick={() => setActiveTab('employment')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeTab === 'employment'
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Employment
                    </button>
                    <button
                      onClick={() => setActiveTab('qualifications')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeTab === 'qualifications'
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Qualifications
                    </button>
                    <button
                      onClick={() => setActiveTab('timetable')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeTab === 'timetable'
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Timetable
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
                    {activeTab === 'profile' && (
                      <TeacherProfileTab 
                        teacher={editedTeacher || selectedTeacher} 
                        isEditing={isEditing}
                        onFieldChange={handleFieldChange}
                      />
                    )}
                    {activeTab === 'employment' && (
                      <TeacherEmploymentTab 
                        teacher={editedTeacher || selectedTeacher}
                        isEditing={isEditing}
                        onFieldChange={handleFieldChange}
                      />
                    )}
                    {activeTab === 'qualifications' && (
                      <TeacherQualificationTab 
                        teacher={editedTeacher || selectedTeacher}
                        isEditing={isEditing}
                        onFieldChange={handleFieldChange}
                      />
                    )}
                    {activeTab === 'timetable' && (
                      <TeacherTimetableTab teacher={selectedTeacher} />
                    )}
                    {activeTab === 'account' && (
                      <TeacherAccountTab teacher={selectedTeacher} />
                    )}
                    {activeTab === 'audit' && (
                      <TeacherAuditTab teacher={selectedTeacher} />
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="hover:text-gray-900 cursor-pointer">Dashboard</span>
          <span>/</span>
          <span className="text-gray-900">Teachers</span>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-gray-900 mb-2">Teachers</h1>
              <p className="text-gray-600">Manage teacher profiles and assignments</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setView('custom-fields')}>
                <Settings2 className="h-4 w-4 mr-2" />
                Custom Fields
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, employee ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Teachers Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            {getInitials(teacher.firstName, teacher.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-gray-900">
                            {teacher.firstName} {teacher.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{teacher.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900">{teacher.employeeId}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{teacher.department}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{teacher.designation}</TableCell>
                    <TableCell className="text-gray-600">{teacher.phoneNumber}</TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(teacher)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditTeacher(teacher)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <KeyRound className="h-4 w-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <UserX className="h-4 w-4 mr-2" />
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-1">Total Teachers</p>
              <p className="text-2xl text-gray-900">{sampleTeachers.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-1">Active</p>
              <p className="text-2xl text-green-600">
                {sampleTeachers.filter(t => t.status === 'Active').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-1">Inactive</p>
              <p className="text-2xl text-gray-600">
                {sampleTeachers.filter(t => t.status === 'Inactive').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-1">Departments</p>
              <p className="text-2xl text-blue-600">6</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}