import { useState } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';

interface Subject {
  id: string;
  subjectName: string;
  subjectCode: string;
  subjectType: string;
  teacherAssigned: string;
  periodsPerWeek: number;
  order: number;
  section?: string; // Add section field
}

const sampleSubjects: Subject[] = [
  // Section A subjects
  {
    id: '1a',
    subjectName: 'Mathematics',
    subjectCode: 'MATH10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Priya Sharma',
    periodsPerWeek: 6,
    order: 1,
    section: 'Section A',
  },
  {
    id: '2a',
    subjectName: 'Physics',
    subjectCode: 'PHY10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Rajesh Kumar',
    periodsPerWeek: 5,
    order: 2,
    section: 'Section A',
  },
  {
    id: '3a',
    subjectName: 'Chemistry',
    subjectCode: 'CHEM10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Lakshmi Reddy',
    periodsPerWeek: 5,
    order: 3,
    section: 'Section A',
  },
  {
    id: '4a',
    subjectName: 'Biology',
    subjectCode: 'BIO10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Suresh Babu',
    periodsPerWeek: 5,
    order: 4,
    section: 'Section A',
  },
  {
    id: '5a',
    subjectName: 'English',
    subjectCode: 'ENG10',
    subjectType: 'Language',
    teacherAssigned: 'Mrs. Anjali Patel',
    periodsPerWeek: 4,
    order: 5,
    section: 'Section A',
  },
  {
    id: '6a',
    subjectName: 'Telugu',
    subjectCode: 'TEL10',
    subjectType: 'Language',
    teacherAssigned: 'Mr. Krishna Rao',
    periodsPerWeek: 4,
    order: 6,
    section: 'Section A',
  },
  {
    id: '7a',
    subjectName: 'Social Studies',
    subjectCode: 'SOC10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Meena Reddy',
    periodsPerWeek: 4,
    order: 7,
    section: 'Section A',
  },
  {
    id: '8a',
    subjectName: 'Computer Science',
    subjectCode: 'CS10',
    subjectType: 'Additional',
    teacherAssigned: 'Mr. Karthik Singh',
    periodsPerWeek: 3,
    order: 8,
    section: 'Section A',
  },
  {
    id: '9a',
    subjectName: 'Physical Education',
    subjectCode: 'PE10',
    subjectType: 'Additional',
    teacherAssigned: 'Mr. Ravi Kumar',
    periodsPerWeek: 2,
    order: 9,
    section: 'Section A',
  },
  // Section B subjects
  {
    id: '1b',
    subjectName: 'Mathematics',
    subjectCode: 'MATH10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Priya Sharma',
    periodsPerWeek: 6,
    order: 1,
    section: 'Section B',
  },
  {
    id: '2b',
    subjectName: 'Physics',
    subjectCode: 'PHY10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Arun Kumar',
    periodsPerWeek: 5,
    order: 2,
    section: 'Section B',
  },
  {
    id: '3b',
    subjectName: 'Chemistry',
    subjectCode: 'CHEM10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Lakshmi Reddy',
    periodsPerWeek: 5,
    order: 3,
    section: 'Section B',
  },
  {
    id: '4b',
    subjectName: 'Biology',
    subjectCode: 'BIO10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Divya Reddy',
    periodsPerWeek: 5,
    order: 4,
    section: 'Section B',
  },
  {
    id: '5b',
    subjectName: 'English',
    subjectCode: 'ENG10',
    subjectType: 'Language',
    teacherAssigned: 'Mrs. Anjali Patel',
    periodsPerWeek: 4,
    order: 5,
    section: 'Section B',
  },
  {
    id: '6b',
    subjectName: 'Telugu',
    subjectCode: 'TEL10',
    subjectType: 'Language',
    teacherAssigned: 'Mr. Krishna Rao',
    periodsPerWeek: 4,
    order: 6,
    section: 'Section B',
  },
  {
    id: '7b',
    subjectName: 'Social Studies',
    subjectCode: 'SOC10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Venkat Rao',
    periodsPerWeek: 4,
    order: 7,
    section: 'Section B',
  },
  {
    id: '8b',
    subjectName: 'Computer Science',
    subjectCode: 'CS10',
    subjectType: 'Additional',
    teacherAssigned: 'Mr. Karthik Singh',
    periodsPerWeek: 3,
    order: 8,
    section: 'Section B',
  },
  {
    id: '9b',
    subjectName: 'Physical Education',
    subjectCode: 'PE10',
    subjectType: 'Additional',
    teacherAssigned: 'Mr. Ravi Kumar',
    periodsPerWeek: 2,
    order: 9,
    section: 'Section B',
  },
  // Section C subjects
  {
    id: '1c',
    subjectName: 'Mathematics',
    subjectCode: 'MATH10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Ramesh Babu',
    periodsPerWeek: 6,
    order: 1,
    section: 'Section C',
  },
  {
    id: '2c',
    subjectName: 'Physics',
    subjectCode: 'PHY10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Rajesh Kumar',
    periodsPerWeek: 5,
    order: 2,
    section: 'Section C',
  },
  {
    id: '3c',
    subjectName: 'Chemistry',
    subjectCode: 'CHEM10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Lakshmi Reddy',
    periodsPerWeek: 5,
    order: 3,
    section: 'Section C',
  },
  {
    id: '4c',
    subjectName: 'Biology',
    subjectCode: 'BIO10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Suresh Babu',
    periodsPerWeek: 5,
    order: 4,
    section: 'Section C',
  },
  {
    id: '5c',
    subjectName: 'English',
    subjectCode: 'ENG10',
    subjectType: 'Language',
    teacherAssigned: 'Mrs. Kavitha Reddy',
    periodsPerWeek: 4,
    order: 5,
    section: 'Section C',
  },
  {
    id: '6c',
    subjectName: 'Telugu',
    subjectCode: 'TEL10',
    subjectType: 'Language',
    teacherAssigned: 'Mr. Krishna Rao',
    periodsPerWeek: 4,
    order: 6,
    section: 'Section C',
  },
  {
    id: '7c',
    subjectName: 'Social Studies',
    subjectCode: 'SOC10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Meena Reddy',
    periodsPerWeek: 4,
    order: 7,
    section: 'Section C',
  },
  {
    id: '8c',
    subjectName: 'Computer Science',
    subjectCode: 'CS10',
    subjectType: 'Additional',
    teacherAssigned: 'Mrs. Shalini Kumar',
    periodsPerWeek: 3,
    order: 8,
    section: 'Section C',
  },
  {
    id: '9c',
    subjectName: 'Physical Education',
    subjectCode: 'PE10',
    subjectType: 'Additional',
    teacherAssigned: 'Mr. Ravi Kumar',
    periodsPerWeek: 2,
    order: 9,
    section: 'Section C',
  },
  // Section D subjects
  {
    id: '1d',
    subjectName: 'Mathematics',
    subjectCode: 'MATH10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Priya Sharma',
    periodsPerWeek: 6,
    order: 1,
    section: 'Section D',
  },
  {
    id: '2d',
    subjectName: 'Physics',
    subjectCode: 'PHY10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Arun Kumar',
    periodsPerWeek: 5,
    order: 2,
    section: 'Section D',
  },
  {
    id: '3d',
    subjectName: 'Chemistry',
    subjectCode: 'CHEM10',
    subjectType: 'Core',
    teacherAssigned: 'Mrs. Divya Reddy',
    periodsPerWeek: 5,
    order: 3,
    section: 'Section D',
  },
  {
    id: '4d',
    subjectName: 'Biology',
    subjectCode: 'BIO10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Suresh Babu',
    periodsPerWeek: 5,
    order: 4,
    section: 'Section D',
  },
  {
    id: '5d',
    subjectName: 'English',
    subjectCode: 'ENG10',
    subjectType: 'Language',
    teacherAssigned: 'Mrs. Anjali Patel',
    periodsPerWeek: 4,
    order: 5,
    section: 'Section D',
  },
  {
    id: '6d',
    subjectName: 'Telugu',
    subjectCode: 'TEL10',
    subjectType: 'Language',
    teacherAssigned: 'Mrs. Suma Patel',
    periodsPerWeek: 4,
    order: 6,
    section: 'Section D',
  },
  {
    id: '7d',
    subjectName: 'Social Studies',
    subjectCode: 'SOC10',
    subjectType: 'Core',
    teacherAssigned: 'Mr. Venkat Rao',
    periodsPerWeek: 4,
    order: 7,
    section: 'Section D',
  },
  {
    id: '8d',
    subjectName: 'Computer Science',
    subjectCode: 'CS10',
    subjectType: 'Additional',
    teacherAssigned: 'Mr. Karthik Singh',
    periodsPerWeek: 3,
    order: 8,
    section: 'Section D',
  },
  {
    id: '9d',
    subjectName: 'Physical Education',
    subjectCode: 'PE10',
    subjectType: 'Additional',
    teacherAssigned: 'Mr. Ravi Kumar',
    periodsPerWeek: 2,
    order: 9,
    section: 'Section D',
  },
];

interface ClassSubjectsTabProps {
  classData: any;
}

export function ClassSubjectsTab({ classData }: ClassSubjectsTabProps) {
  const [subjects, setSubjects] = useState(sampleSubjects);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('Section A');
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    subjectType: '',
    teacherAssigned: '',
    periodsPerWeek: 4,
    section: '',
  });

  // Get unique sections from subjects
  const sections = [...new Set(subjects.map(s => s.section).filter(Boolean))];
  
  // Filter subjects by selected section
  const filteredSubjects = subjects.filter(s => s.section === selectedSection);

  const handleAddSubject = () => {
    setIsAddDialogOpen(false);
    alert('Subject added successfully!');
  };

  const handleEditSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setFormData({
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      subjectType: subject.subjectType,
      teacherAssigned: subject.teacherAssigned,
      periodsPerWeek: subject.periodsPerWeek,
      section: subject.section || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setIsEditDialogOpen(false);
    alert('Subject updated successfully!');
  };

  const handleDeleteSubject = (id: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const getSubjectTypeColor = (type: string) => {
    switch (type) {
      case 'Core':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Language':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Additional':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Elective':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3>Subjects</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage subjects for {classData.className}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-48">
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section as string}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </div>
      </div>

      {/* Subjects List */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm">
            {selectedSection === 'all' 
              ? `All Subjects (${filteredSubjects.length})`
              : `${selectedSection} - ${filteredSubjects.length} Subjects`
            }
          </h3>
        </div>
        <div className="space-y-3">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="cursor-move text-gray-400 hover:text-gray-600">
                <GripVertical className="h-5 w-5" />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Subject Name</Label>
                  <p className="text-sm text-gray-900 mt-1">{subject.subjectName}</p>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Subject Code</Label>
                  <p className="text-sm text-gray-900 mt-1">{subject.subjectCode}</p>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Type</Label>
                  <Badge variant="outline" className={`mt-1 ${getSubjectTypeColor(subject.subjectType)}`}>
                    {subject.subjectType}
                  </Badge>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Teacher</Label>
                  <p className="text-sm text-gray-900 mt-1">{subject.teacherAssigned}</p>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Periods/Week</Label>
                  <p className="text-sm text-gray-900 mt-1">{subject.periodsPerWeek}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditSubject(subject)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteSubject(subject.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <Label className="text-gray-500 text-xs">Total Subjects</Label>
          <p className="text-2xl text-gray-900 mt-2">{subjects.length}</p>
        </Card>
        <Card className="p-4">
          <Label className="text-gray-500 text-xs">Core Subjects</Label>
          <p className="text-2xl text-blue-600 mt-2">
            {subjects.filter(s => s.subjectType === 'Core').length}
          </p>
        </Card>
        <Card className="p-4">
          <Label className="text-gray-500 text-xs">Languages</Label>
          <p className="text-2xl text-green-600 mt-2">
            {subjects.filter(s => s.subjectType === 'Language').length}
          </p>
        </Card>
        <Card className="p-4">
          <Label className="text-gray-500 text-xs">Total Periods/Week</Label>
          <p className="text-2xl text-purple-600 mt-2">
            {subjects.reduce((sum, s) => sum + s.periodsPerWeek, 0)}
          </p>
        </Card>
      </div>

      {/* Add Subject Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>
              Add a new subject to {classData.className}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Subject Name</Label>
              <Input
                placeholder="e.g., Mathematics"
                value={formData.subjectName}
                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Subject Code</Label>
              <Input
                placeholder="e.g., MATH10"
                value={formData.subjectCode}
                onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Subject Type</Label>
              <Select
                value={formData.subjectType}
                onValueChange={(value) => setFormData({ ...formData, subjectType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Core">Core</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>
                  <SelectItem value="Additional">Additional</SelectItem>
                  <SelectItem value="Elective">Elective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Teacher Assigned</Label>
              <Select
                value={formData.teacherAssigned}
                onValueChange={(value) => setFormData({ ...formData, teacherAssigned: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mrs. Priya Sharma">Mrs. Priya Sharma</SelectItem>
                  <SelectItem value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</SelectItem>
                  <SelectItem value="Mrs. Lakshmi Reddy">Mrs. Lakshmi Reddy</SelectItem>
                  <SelectItem value="Mr. Suresh Babu">Mr. Suresh Babu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Periods per Week</Label>
              <Input
                type="number"
                value={formData.periodsPerWeek}
                onChange={(e) => setFormData({ ...formData, periodsPerWeek: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Section</Label>
              <Input
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubject}>Add Subject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Update subject details
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Subject Name</Label>
              <Input
                value={formData.subjectName}
                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Subject Code</Label>
              <Input
                value={formData.subjectCode}
                onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Subject Type</Label>
              <Select
                value={formData.subjectType}
                onValueChange={(value) => setFormData({ ...formData, subjectType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Core">Core</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>
                  <SelectItem value="Additional">Additional</SelectItem>
                  <SelectItem value="Elective">Elective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Teacher Assigned</Label>
              <Select
                value={formData.teacherAssigned}
                onValueChange={(value) => setFormData({ ...formData, teacherAssigned: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mrs. Priya Sharma">Mrs. Priya Sharma</SelectItem>
                  <SelectItem value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</SelectItem>
                  <SelectItem value="Mrs. Lakshmi Reddy">Mrs. Lakshmi Reddy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Periods per Week</Label>
              <Input
                type="number"
                value={formData.periodsPerWeek}
                onChange={(e) => setFormData({ ...formData, periodsPerWeek: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Section</Label>
              <Input
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}