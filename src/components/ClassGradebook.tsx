import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
import { Badge } from './ui/badge';
import {
  Save,
  Lock,
  Unlock,
  Send,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner@2.0.3';

interface Assessment {
  id: string;
  name: string;
  maxMarks: number;
  weight: number;
}

interface StudentGrade {
  id: string;
  name: string;
  admissionNo: string;
  grades: { [assessmentId: string]: number | null };
}

const mockAssessments: Assessment[] = [
  { id: 'q1', name: 'Quiz 1', maxMarks: 20, weight: 10 },
  { id: 'a1', name: 'Assignment 1', maxMarks: 30, weight: 15 },
  { id: 'mid', name: 'Midterm', maxMarks: 50, weight: 25 },
  { id: 'final', name: 'Final Exam', maxMarks: 100, weight: 50 },
];

const mockStudents: StudentGrade[] = [
  {
    id: 's1',
    name: 'Emma Johnson',
    admissionNo: 'ADM2024001',
    grades: { q1: 18, a1: 28, mid: 45, final: 92 },
  },
  {
    id: 's2',
    name: 'Liam Williams',
    admissionNo: 'ADM2024002',
    grades: { q1: 16, a1: 25, mid: 42, final: null },
  },
  {
    id: 's3',
    name: 'Olivia Brown',
    admissionNo: 'ADM2024003',
    grades: { q1: 19, a1: 29, mid: 48, final: 95 },
  },
  {
    id: 's4',
    name: 'Noah Davis',
    admissionNo: 'ADM2024004',
    grades: { q1: 17, a1: null, mid: 44, final: null },
  },
  {
    id: 's5',
    name: 'Ava Martinez',
    admissionNo: 'ADM2024005',
    grades: { q1: 20, a1: 30, mid: 50, final: 98 },
  },
  {
    id: 's6',
    name: 'Ethan Anderson',
    admissionNo: 'ADM2024006',
    grades: { q1: 15, a1: 24, mid: 40, final: 82 },
  },
  {
    id: 's7',
    name: 'Sophia Taylor',
    admissionNo: 'ADM2024007',
    grades: { q1: 18, a1: 27, mid: 46, final: null },
  },
  {
    id: 's8',
    name: 'Mason Thomas',
    admissionNo: 'ADM2024008',
    grades: { q1: 19, a1: 28, mid: 47, final: 90 },
  },
];

interface ClassGradebookProps {
  className?: string;
  classSection?: string;
  subject?: string;
}

export function ClassGradebook({
  className = '10',
  classSection = 'A',
  subject = 'Mathematics',
}: ClassGradebookProps) {
  const [students, setStudents] = useState<StudentGrade[]>(mockStudents);
  const [selectedTerm, setSelectedTerm] = useState('term-1');
  const [isLocked, setIsLocked] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [editingCell, setEditingCell] = useState<{
    studentId: string;
    assessmentId: string;
  } | null>(null);

  const handleGradeChange = (studentId: string, assessmentId: string, value: string) => {
    if (isLocked) {
      toast.error('Gradebook is locked. Unlock to make changes.');
      return;
    }

    const numValue = value === '' ? null : parseFloat(value);
    const assessment = mockAssessments.find((a) => a.id === assessmentId);

    if (numValue !== null && assessment && numValue > assessment.maxMarks) {
      toast.error(`Grade cannot exceed ${assessment.maxMarks}`);
      return;
    }

    if (numValue !== null && numValue < 0) {
      toast.error('Grade cannot be negative');
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              grades: { ...student.grades, [assessmentId]: numValue },
            }
          : student
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    setShowSaveDialog(false);
    toast.success('Grades saved successfully');
  };

  const handleLock = () => {
    if (hasUnsavedChanges) {
      toast.error('Please save changes before locking');
      return;
    }
    setIsLocked(true);
    setShowLockDialog(false);
    toast.success('Gradebook locked successfully');
  };

  const handleUnlock = () => {
    setIsLocked(false);
    toast.success('Gradebook unlocked');
  };

  const handlePublish = () => {
    if (!isLocked) {
      toast.error('Please lock gradebook before publishing');
      return;
    }
    setIsPublished(true);
    setShowPublishDialog(false);
    toast.success('Grades published to students and parents');
  };

  const calculateTotal = (grades: { [key: string]: number | null }) => {
    let total = 0;
    let maxTotal = 0;
    let completed = 0;

    mockAssessments.forEach((assessment) => {
      const grade = grades[assessment.id];
      if (grade !== null && grade !== undefined) {
        total += grade;
        completed++;
      }
      maxTotal += assessment.maxMarks;
    });

    return {
      total,
      maxTotal,
      percentage: maxTotal > 0 ? (total / maxTotal) * 100 : 0,
      completed,
      total_assessments: mockAssessments.length,
    };
  };

  const getMissingCount = () => {
    let count = 0;
    students.forEach((student) => {
      mockAssessments.forEach((assessment) => {
        if (
          student.grades[assessment.id] === null ||
          student.grades[assessment.id] === undefined
        ) {
          count++;
        }
      });
    });
    return count;
  };

  const getCompletionRate = () => {
    const totalCells = students.length * mockAssessments.length;
    const filledCells = totalCells - getMissingCount();
    return totalCells > 0 ? (filledCells / totalCells) * 100 : 0;
  };

  const handleExport = () => {
    toast.success('Exporting gradebook to CSV...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Gradebook</h2>
          <p className="text-sm text-gray-600">
            Grade {className}-{classSection} • {subject}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-[180px] rounded-xl">
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

      {/* Status Card */}
      <Card className="p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                {getMissingCount()} Missing
              </Badge>
            )}
            <Badge variant="outline">
              {getCompletionRate().toFixed(0)}% Complete
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>

            {hasUnsavedChanges && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSaveDialog(true)}
                className="gap-2 border-green-200 text-green-700 hover:bg-green-50"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            )}

            {isLocked ? (
              <Button variant="outline" size="sm" onClick={handleUnlock} className="gap-2">
                <Unlock className="w-4 h-4" />
                <span className="hidden sm:inline">Unlock</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLockDialog(true)}
                className="gap-2"
              >
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">Lock</span>
              </Button>
            )}

            <Button
              size="sm"
              onClick={() => setShowPublishDialog(true)}
              disabled={!isLocked || isPublished}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Publish</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Gradebook Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white z-10 min-w-[200px] border-r">
                  Student
                </TableHead>
                {mockAssessments.map((assessment) => (
                  <TableHead key={assessment.id} className="text-center min-w-[120px]">
                    <div className="text-sm">{assessment.name}</div>
                    <div className="text-xs text-gray-500 font-normal">
                      /{assessment.maxMarks}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-center min-w-[120px] bg-gray-50">
                  <div className="text-sm">Total</div>
                  <div className="text-xs text-gray-500 font-normal">Score</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const stats = calculateTotal(student.grades);
                return (
                  <TableRow key={student.id}>
                    <TableCell className="sticky left-0 bg-white z-10 border-r">
                      <div>
                        <div className="text-sm">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.admissionNo}</div>
                      </div>
                    </TableCell>
                    {mockAssessments.map((assessment) => {
                      const grade = student.grades[assessment.id];
                      const isMissing = grade === null || grade === undefined;
                      const isEditing =
                        editingCell?.studentId === student.id &&
                        editingCell?.assessmentId === assessment.id;

                      return (
                        <TableCell key={assessment.id} className="text-center p-2">
                          <Input
                            type="number"
                            min="0"
                            max={assessment.maxMarks}
                            step="0.5"
                            value={grade ?? ''}
                            onChange={(e) =>
                              handleGradeChange(student.id, assessment.id, e.target.value)
                            }
                            onFocus={() =>
                              setEditingCell({ studentId: student.id, assessmentId: assessment.id })
                            }
                            onBlur={() => setEditingCell(null)}
                            className={`w-20 text-center rounded-lg mx-auto ${
                              isMissing
                                ? 'border-red-300 bg-red-50 placeholder:text-red-300'
                                : isEditing
                                ? 'border-blue-400 ring-2 ring-blue-100'
                                : 'border-gray-200'
                            }`}
                            placeholder="-"
                            disabled={isLocked}
                          />
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center bg-gray-50">
                      <div className="text-sm font-medium">
                        {stats.total.toFixed(1)}/{stats.maxTotal}
                      </div>
                      <div className="text-xs text-gray-500">{stats.percentage.toFixed(1)}%</div>
                      <div className="text-xs text-gray-400">
                        {stats.completed}/{stats.total_assessments}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Footer Summary */}
        <div className="border-t bg-gray-50 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-600">
            <div>
              <strong>{students.length}</strong> students • <strong>{mockAssessments.length}</strong>{' '}
              assessments
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border-2 border-red-300 bg-red-50"></div>
                <span>Missing marks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border-2 border-blue-400 bg-blue-50"></div>
                <span>Editing</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Changes?</DialogTitle>
            <DialogDescription>
              You have unsaved changes in the gradebook. Save your changes before continuing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lock Dialog */}
      <Dialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lock Gradebook?</DialogTitle>
            <DialogDescription>
              Locking the gradebook will prevent further edits until unlocked. This is recommended
              before publishing grades.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLockDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLock}>Lock Gradebook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Grades?</DialogTitle>
            <DialogDescription>
              Publishing will make grades visible to students and parents. Ensure all grades are
              entered and verified. {getMissingCount() > 0 && (
                <span className="text-red-600 block mt-2">
                  Warning: {getMissingCount()} marks are still missing.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700">
              Publish Grades
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
