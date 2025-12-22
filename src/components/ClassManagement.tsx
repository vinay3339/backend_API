import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  School,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Settings as SettingsIcon,
} from 'lucide-react';
import { ClassDetailsTab } from './ClassDetailsTab';
import { ClassSectionsTab } from './ClassSectionsTab';
import { ClassSubjectsTab } from './ClassSubjectsTab';
import { ClassTimetableTab } from './ClassTimetableTab';
import { ClassExamsTab } from './ClassExamsTab';
import { ClassAttendanceTab } from './ClassAttendanceTab';
import { ClassDocumentsTab } from './ClassDocumentsTab';
import { ClassAuditTab } from './ClassAuditTab';
import { ClassCustomFields } from './ClassCustomFields';

interface Class {
  id: string;
  className: string;
  classCode: string;
  academicYear: string;
  medium: string;
  syllabusType: string;
  totalSections: number;
  category: string;
  totalStrength: number;
  boysCount: number;
  girlsCount: number;
  maxCapacity: number;
  status: string;
}

const sampleClasses: Class[] = [
  {
    id: '1',
    className: 'Class 10',
    classCode: 'CLASS10',
    academicYear: '2024-2025',
    medium: 'English',
    syllabusType: 'CBSE',
    totalSections: 4,
    category: 'High School',
    totalStrength: 160,
    boysCount: 85,
    girlsCount: 75,
    maxCapacity: 40,
    status: 'Active',
  },
  {
    id: '2',
    className: 'Class 9',
    classCode: 'CLASS09',
    academicYear: '2024-2025',
    medium: 'English',
    syllabusType: 'CBSE',
    totalSections: 4,
    category: 'High School',
    totalStrength: 155,
    boysCount: 80,
    girlsCount: 75,
    maxCapacity: 40,
    status: 'Active',
  },
  {
    id: '3',
    className: 'Class 8',
    classCode: 'CLASS08',
    academicYear: '2024-2025',
    medium: 'English',
    syllabusType: 'State Board',
    totalSections: 3,
    category: 'Middle School',
    totalStrength: 120,
    boysCount: 65,
    girlsCount: 55,
    maxCapacity: 40,
    status: 'Active',
  },
  {
    id: '4',
    className: 'Class 7',
    classCode: 'CLASS07',
    academicYear: '2024-2025',
    medium: 'English',
    syllabusType: 'State Board',
    totalSections: 3,
    category: 'Middle School',
    totalStrength: 115,
    boysCount: 60,
    girlsCount: 55,
    maxCapacity: 40,
    status: 'Active',
  },
];

type ViewType = 'list' | 'detail' | 'fields';

export function ClassManagement() {
  const [view, setView] = useState<ViewType>('list');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('timetable');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [classes, setClasses] = useState(sampleClasses);
  const [formData, setFormData] = useState({
    className: '',
    classCode: '',
    academicYear: '2024-2025',
    medium: 'English',
    syllabusType: 'CBSE',
    category: 'High School',
    maxCapacity: 40,
  });

  const handleViewDetails = (classItem: Class) => {
    setSelectedClass(classItem);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedClass(null);
  };

  const handleAddClass = () => {
    const newClass: Class = {
      id: String(classes.length + 1),
      className: formData.className,
      classCode: formData.classCode,
      academicYear: formData.academicYear,
      medium: formData.medium,
      syllabusType: formData.syllabusType,
      category: formData.category,
      maxCapacity: formData.maxCapacity,
      totalSections: 0,
      totalStrength: 0,
      boysCount: 0,
      girlsCount: 0,
      status: 'Active',
    };
    
    setClasses([...classes, newClass]);
    setIsAddDialogOpen(false);
    setFormData({
      className: '',
      classCode: '',
      academicYear: '2024-2025',
      medium: 'English',
      syllabusType: 'CBSE',
      category: 'High School',
      maxCapacity: 40,
    });
    alert('Class added successfully!');
  };

  const filteredClasses = classes.filter((classItem) =>
    classItem.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.classCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Custom Fields View
  if (view === 'fields') {
    return <ClassCustomFields onBack={() => setView('list')} />;
  }

  if (view === 'detail' && selectedClass) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="cursor-pointer hover:text-blue-600" onClick={handleBackToList}>
            Dashboard
          </span>
          <span>/</span>
          <span className="cursor-pointer hover:text-blue-600" onClick={handleBackToList}>
            Classes
          </span>
          <span>/</span>
          <span className="text-gray-900">Class Details</span>
        </div>

        {/* Class Header Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <School className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-gray-900 mb-1">{selectedClass.className}</h1>
                <p className="text-sm text-gray-600">Code: {selectedClass.classCode}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Class
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div>
              <Label className="text-gray-500 text-xs">Academic Year</Label>
              <p className="text-sm text-gray-900 mt-1">{selectedClass.academicYear}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-xs">Medium</Label>
              <p className="text-sm text-gray-900 mt-1">{selectedClass.medium}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-xs">Syllabus Type</Label>
              <p className="text-sm text-gray-900 mt-1">{selectedClass.syllabusType}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-xs">Total Sections</Label>
              <p className="text-sm text-gray-900 mt-1">{selectedClass.totalSections}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-xs">Category</Label>
              <p className="text-sm text-gray-900 mt-1">{selectedClass.category}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-xs">Status</Label>
              <Badge className="bg-green-50 text-green-700 border-green-200 mt-1">
                {selectedClass.status}
              </Badge>
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
                  onClick={() => setActiveTab('details')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'details'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Class Details
                </button>
                <button
                  onClick={() => setActiveTab('sections')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'sections'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Sections
                </button>
                <button
                  onClick={() => setActiveTab('subjects')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'subjects'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Subjects
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
                  onClick={() => setActiveTab('documents')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'documents'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Documents
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
                {activeTab === 'details' && <ClassDetailsTab classData={selectedClass} />}
                {activeTab === 'sections' && <ClassSectionsTab classData={selectedClass} />}
                {activeTab === 'subjects' && <ClassSubjectsTab classData={selectedClass} />}
                {activeTab === 'timetable' && <ClassTimetableTab classData={selectedClass} />}
                {activeTab === 'documents' && <ClassDocumentsTab classData={selectedClass} />}
                {activeTab === 'audit' && <ClassAuditTab classData={selectedClass} />}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900">Classes</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900 mb-1">Class Management</h1>
          <p className="text-sm text-gray-600">Manage classes, sections, and curriculum</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setView('fields')}>
            <SettingsIcon className="h-4 w-4 mr-2" />
            Custom Fields
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Class
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <School className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">{classItem.className}</h3>
                  <p className="text-xs text-gray-500">{classItem.classCode}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleViewDetails(classItem)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Academic Year</span>
                <span className="text-gray-900">{classItem.academicYear}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Medium</span>
                <span className="text-gray-900">{classItem.medium}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Syllabus</span>
                <span className="text-gray-900">{classItem.syllabusType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sections</span>
                <Badge variant="secondary">{classItem.totalSections}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Strength</span>
                <span className="text-gray-900">{classItem.totalStrength}</span>
              </div>
              <div className="flex gap-2 pt-2 border-t">
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500">Boys</p>
                  <p className="text-sm text-blue-600">{classItem.boysCount}</p>
                </div>
                <div className="flex-1 text-center border-l">
                  <p className="text-xs text-gray-500">Girls</p>
                  <p className="text-sm text-pink-600">{classItem.girlsCount}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleViewDetails(classItem)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Create a new class for the academic year
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Class Name *</Label>
              <Input
                placeholder="e.g., Class 10"
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Class Code *</Label>
              <Input
                placeholder="e.g., CLASS10"
                value={formData.classCode}
                onChange={(e) => setFormData({ ...formData, classCode: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Academic Year *</Label>
              <Select
                value={formData.academicYear}
                onValueChange={(value) => setFormData({ ...formData, academicYear: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                  <SelectItem value="2026-2027">2026-2027</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Medium *</Label>
              <Select
                value={formData.medium}
                onValueChange={(value) => setFormData({ ...formData, medium: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Bilingual">Bilingual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Syllabus Type *</Label>
              <Select
                value={formData.syllabusType}
                onValueChange={(value) => setFormData({ ...formData, syllabusType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="State Board">State Board</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="IB">IB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Middle School">Middle School</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Junior College">Junior College</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Max Capacity (Per Section) *</Label>
              <Input
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddClass}
              disabled={!formData.className || !formData.classCode}
            >
              Add Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}