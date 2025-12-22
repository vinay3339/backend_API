import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import {
  BookOpen,
  Calendar,
  Download,
  Upload,
  Lock,
  Unlock,
  Send,
  Search,
  Filter,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  FileText,
  TrendingUp,
  Users,
  ClipboardList,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Assessment {
  id: string;
  name: string;
  type: 'Quiz' | 'Assignment' | 'Midterm' | 'Final' | 'Project';
  maxMarks: number;
  weight: number;
}

interface StudentGrade {
  studentId: string;
  studentName: string;
  admissionNo: string;
  grades: { [assessmentId: string]: number | null };
}

const mockAssessments: Assessment[] = [
  { id: 'a1', name: 'Quiz 1', type: 'Quiz', maxMarks: 20, weight: 10 },
  { id: 'a2', name: 'Assignment 1', type: 'Assignment', maxMarks: 30, weight: 15 },
  { id: 'a3', name: 'Midterm Exam', type: 'Midterm', maxMarks: 50, weight: 25 },
  { id: 'a4', name: 'Final Exam', type: 'Final', maxMarks: 100, weight: 50 },
];

const mockStudentGrades: StudentGrade[] = [
  {
    studentId: '1',
    studentName: 'Emma Johnson',
    admissionNo: 'ADM2024001',
    grades: { a1: 18, a2: 28, a3: 45, a4: null },
  },
  {
    studentId: '2',
    studentName: 'Liam Williams',
    admissionNo: 'ADM2024002',
    grades: { a1: 16, a2: 25, a3: 42, a4: null },
  },
  {
    studentId: '3',
    studentName: 'Olivia Brown',
    admissionNo: 'ADM2024003',
    grades: { a1: 19, a2: 29, a3: 48, a4: null },
  },
  {
    studentId: '4',
    studentName: 'Noah Davis',
    admissionNo: 'ADM2024004',
    grades: { a1: 17, a2: null, a3: 44, a4: null },
  },
  {
    studentId: '5',
    studentName: 'Ava Martinez',
    admissionNo: 'ADM2024005',
    grades: { a1: 20, a2: 30, a3: 50, a4: null },
  },
];

export function ExamsGrades() {
  const [activeTab, setActiveTab] = useState('grade-entry');
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [selectedTerm, setSelectedTerm] = useState('term-1');
  const [studentGrades, setStudentGrades] = useState<StudentGrade[]>(mockStudentGrades);
  const [isLocked, setIsLocked] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateTotal = (grades: { [key: string]: number | null }) => {
    let total = 0;
    let maxTotal = 0;
    mockAssessments.forEach((assessment) => {
      const grade = grades[assessment.id];
      if (grade !== null && grade !== undefined) {
        total += grade;
      }
      maxTotal += assessment.maxMarks;
    });
    return { total, maxTotal, percentage: maxTotal > 0 ? (total / maxTotal) * 100 : 0 };
  };

  const handleGradeChange = (studentId: string, assessmentId: string, value: string) => {
    if (isLocked) {
      toast.error('Grades are locked. Unlock to make changes.');
      return;
    }

    const numValue = value === '' ? null : parseFloat(value);
    const assessment = mockAssessments.find((a) => a.id === assessmentId);
    
    if (numValue !== null && assessment && numValue > assessment.maxMarks) {
      toast.error(`Grade cannot exceed ${assessment.maxMarks}`);
      return;
    }

    setStudentGrades((prev) =>
      prev.map((student) =>
        student.studentId === studentId
          ? {
              ...student,
              grades: { ...student.grades, [assessmentId]: numValue },
            }
          : student
      )
    );
  };

  const handleLockGrades = () => {
    setIsLocked(true);
    setShowLockDialog(false);
    toast.success('Grades locked successfully');
  };

  const handleUnlockGrades = () => {
    setIsLocked(false);
    toast.success('Grades unlocked');
  };

  const handlePublishGrades = () => {
    if (!isLocked) {
      toast.error('Please lock grades before publishing');
      return;
    }
    setIsPublished(true);
    setShowPublishDialog(false);
    toast.success('Grades published to students');
  };

  const handleCSVImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please select a valid CSV file');
      return;
    }

    // Simple CSV parsing simulation
    toast.success('CSV imported successfully');
    if (e.target) {
      e.target.value = '';
    }
  };

  const getMissingCount = () => {
    let count = 0;
    studentGrades.forEach((student) => {
      mockAssessments.forEach((assessment) => {
        if (student.grades[assessment.id] === null || student.grades[assessment.id] === undefined) {
          count++;
        }
      });
    });
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-gray-900 mb-1">Exams & Grades</h1>
            <p className="text-sm text-gray-600">
              Manage assessments, enter grades, and generate reports
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex-wrap h-auto gap-2">
          <TabsTrigger value="overview" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="terms" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Terms & Exam Types</span>
          </TabsTrigger>
          <TabsTrigger value="assessments" className="gap-2">
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Assessments</span>
          </TabsTrigger>
          <TabsTrigger value="grade-entry" className="gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Grade Entry</span>
          </TabsTrigger>
          <TabsTrigger value="moderation" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Moderation</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card className="p-6 rounded-2xl">
            <p className="text-gray-600">Overview content coming soon...</p>
          </Card>
        </TabsContent>

        {/* Terms & Exam Types Tab */}
        <TabsContent value="terms">
          <Card className="p-6 rounded-2xl">
            <p className="text-gray-600">Terms & Exam Types configuration coming soon...</p>
          </Card>
        </TabsContent>

        {/* Assessments Tab */}
        <TabsContent value="assessments">
          <Card className="p-6 rounded-2xl">
            <p className="text-gray-600">Assessments management coming soon...</p>
          </Card>
        </TabsContent>

        {/* Grade Entry Tab */}
        <TabsContent value="grade-entry" className="space-y-6">
          {/* Filters */}
          <Card className="p-4 md:p-6 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs mb-2 block text-gray-600">Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-A">Grade 9 - Section A</SelectItem>
                    <SelectItem value="10-A">Grade 10 - Section A</SelectItem>
                    <SelectItem value="10-B">Grade 10 - Section B</SelectItem>
                    <SelectItem value="11-A">Grade 11 - Section A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs mb-2 block text-gray-600">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs mb-2 block text-gray-600">Term</label>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="term-1">Term 1 (2024-25)</SelectItem>
                    <SelectItem value="term-2">Term 2 (2024-25)</SelectItem>
                    <SelectItem value="term-3">Term 3 (2024-25)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-2">
              <Badge variant={isLocked ? 'default' : 'secondary'} className="gap-1">
                {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                {isLocked ? 'Locked' : 'Unlocked'}
              </Badge>
              <Badge variant={isPublished ? 'default' : 'secondary'} className="gap-1">
                {isPublished ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {isPublished ? 'Published' : 'Draft'}
              </Badge>
              {getMissingCount() > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {getMissingCount()} Missing Marks
                </Badge>
              )}
            </div>
          </Card>

          {/* Grade Entry Table */}
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-gray-900 mb-1">Grade Entry</h3>
                  <p className="text-xs text-gray-600">
                    Grade 10-A • Mathematics • Term 1
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="w-4 h-4" />
                        <span className="hidden sm:inline">Import</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={handleCSVImport}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload CSV
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
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

                  {isLocked ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={handleUnlockGrades}
                    >
                      <Unlock className="w-4 h-4" />
                      <span className="hidden sm:inline">Unlock</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => setShowLockDialog(true)}
                    >
                      <Lock className="w-4 h-4" />
                      <span className="hidden sm:inline">Lock</span>
                    </Button>
                  )}

                  <Button
                    size="sm"
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowPublishDialog(true)}
                    disabled={!isLocked || isPublished}
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Publish</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Student</TableHead>
                    {mockAssessments.map((assessment) => (
                      <TableHead key={assessment.id} className="text-center min-w-[120px]">
                        <div>{assessment.name}</div>
                        <div className="text-xs text-gray-500 font-normal">
                          /{assessment.maxMarks} ({assessment.weight}%)
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="text-center min-w-[100px]">Total</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentGrades.map((student) => {
                    const { total, maxTotal, percentage } = calculateTotal(student.grades);
                    return (
                      <TableRow key={student.studentId}>
                        <TableCell>
                          <div>
                            <div className="text-sm">{student.studentName}</div>
                            <div className="text-xs text-gray-500">{student.admissionNo}</div>
                          </div>
                        </TableCell>
                        {mockAssessments.map((assessment) => (
                          <TableCell key={assessment.id} className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max={assessment.maxMarks}
                              value={student.grades[assessment.id] ?? ''}
                              onChange={(e) =>
                                handleGradeChange(student.studentId, assessment.id, e.target.value)
                              }
                              className={`w-20 text-center rounded-lg ${
                                student.grades[assessment.id] === null ||
                                student.grades[assessment.id] === undefined
                                  ? 'border-red-300 bg-red-50'
                                  : ''
                              }`}
                              placeholder="-"
                              disabled={isLocked}
                            />
                          </TableCell>
                        ))}
                        <TableCell className="text-center">
                          <div className="text-sm">
                            {total.toFixed(0)}/{maxTotal}
                          </div>
                          <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Add Comment</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Moderation Tab */}
        <TabsContent value="moderation">
          <Card className="p-6 rounded-2xl">
            <p className="text-gray-600">Grade moderation tools coming soon...</p>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card className="p-6 rounded-2xl">
            <p className="text-gray-600">Reports and analytics coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lock Confirmation Dialog */}
      <Dialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lock Grades?</DialogTitle>
            <DialogDescription>
              Locking grades will prevent further edits until unlocked. This is recommended before
              publishing grades to students.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLockDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLockGrades}>Lock Grades</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Confirmation Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Grades?</DialogTitle>
            <DialogDescription>
              Publishing will make grades visible to students and parents. Ensure all grades are
              entered and verified before publishing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handlePublishGrades}>
              Publish Grades
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
