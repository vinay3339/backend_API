import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Save, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface StudentMark {
  rollNo: string;
  studentName: string;
  maxMarks: number;
  marksObtained: number | null;
  grade: string;
  remarks: string;
}

const gradeMapping = [
  { min: 91, max: 100, grade: 'A1', gp: 10 },
  { min: 81, max: 90, grade: 'A2', gp: 9 },
  { min: 71, max: 80, grade: 'B1', gp: 8 },
  { min: 61, max: 70, grade: 'B2', gp: 7 },
  { min: 51, max: 60, grade: 'C1', gp: 6 },
  { min: 41, max: 50, grade: 'C2', gp: 5 },
  { min: 33, max: 40, grade: 'D', gp: 4 },
  { min: 0, max: 32, grade: 'E', gp: 0 },
];

const calculateGrade = (marks: number | null, maxMarks: number): string => {
  if (marks === null) return '-';
  const percentage = (marks / maxMarks) * 100;
  const grade = gradeMapping.find((g) => percentage >= g.min && percentage <= g.max);
  return grade?.grade || '-';
};

const mockStudents: StudentMark[] = [
  { rollNo: '001', studentName: 'Aarav Kumar', maxMarks: 20, marksObtained: 18, grade: 'A1', remarks: '' },
  { rollNo: '002', studentName: 'Diya Sharma', maxMarks: 20, marksObtained: 16, grade: 'B1', remarks: '' },
  { rollNo: '003', studentName: 'Arjun Patel', maxMarks: 20, marksObtained: 19, grade: 'A1', remarks: '' },
  { rollNo: '004', studentName: 'Ananya Reddy', maxMarks: 20, marksObtained: null, grade: '-', remarks: '' },
  { rollNo: '005', studentName: 'Vivaan Singh', maxMarks: 20, marksObtained: 17, grade: 'A2', remarks: '' },
  { rollNo: '006', studentName: 'Aanya Gupta', maxMarks: 20, marksObtained: 15, grade: 'B1', remarks: '' },
  { rollNo: '007', studentName: 'Rohan Verma', maxMarks: 20, marksObtained: null, grade: '-', remarks: '' },
  { rollNo: '008', studentName: 'Ishita Nair', maxMarks: 20, marksObtained: 18, grade: 'A1', remarks: '' },
  { rollNo: '009', studentName: 'Aditya Rao', maxMarks: 20, marksObtained: 14, grade: 'B2', remarks: '' },
  { rollNo: '010', studentName: 'Saanvi Desai', maxMarks: 20, marksObtained: 19, grade: 'A1', remarks: '' },
];

export function TeacherMarksEntry() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [selectedExam, setSelectedExam] = useState('FA1');
  const [students, setStudents] = useState<StudentMark[]>(mockStudents);
  const [isDraft, setIsDraft] = useState(true);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const handleMarksChange = (rollNo: string, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    const student = students.find((s) => s.rollNo === rollNo);
    
    if (student && numValue !== null && numValue > student.maxMarks) {
      toast.error(`Marks cannot exceed ${student.maxMarks}`);
      return;
    }

    if (numValue !== null && numValue < 0) {
      toast.error('Marks cannot be negative');
      return;
    }

    setStudents((prev) =>
      prev.map((s) => {
        if (s.rollNo === rollNo) {
          const grade = calculateGrade(numValue, s.maxMarks);
          return { ...s, marksObtained: numValue, grade };
        }
        return s;
      })
    );
  };

  const handleRemarksChange = (rollNo: string, value: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.rollNo === rollNo ? { ...s, remarks: value } : s))
    );
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    toast.success('Marks saved as draft');
  };

  const handleSubmit = () => {
    const missingMarks = students.filter((s) => s.marksObtained === null).length;
    
    if (missingMarks > 0) {
      toast.error(`${missingMarks} students have missing marks`);
      return;
    }

    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    setIsDraft(false);
    setShowSubmitDialog(false);
    toast.success('Marks submitted successfully');
  };

  const getCompletionPercentage = () => {
    const total = students.length;
    const completed = students.filter((s) => s.marksObtained !== null).length;
    return (completed / total) * 100;
  };

  const getGradeBadgeClass = (grade: string) => {
    if (grade === 'A1' || grade === 'A2') return 'bg-green-100 text-green-700';
    if (grade === 'B1' || grade === 'B2') return 'bg-blue-100 text-blue-700';
    if (grade === 'C1' || grade === 'C2') return 'bg-yellow-100 text-yellow-700';
    if (grade === 'D') return 'bg-orange-100 text-orange-700';
    if (grade === 'E') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  const completionPercentage = getCompletionPercentage();
  const missingCount = students.filter((s) => s.marksObtained === null).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-gray-900 mb-1">Enter Marks</h1>
            <p className="text-sm text-gray-600">
              Record student marks for formative and summative assessments
            </p>
          </div>
        </div>
      </div>

      {/* Filters Card */}
      <Card className="p-4 md:p-6 rounded-2xl shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs mb-2 block text-gray-600">Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9-A">Class 9 - Section A</SelectItem>
                <SelectItem value="10-A">Class 10 - Section A</SelectItem>
                <SelectItem value="10-B">Class 10 - Section B</SelectItem>
                <SelectItem value="11-A">Class 11 - Section A</SelectItem>
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
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="social">Social Studies</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="telugu">Telugu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs mb-2 block text-gray-600">Exam</label>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FA1">FA1 - Formative Assessment 1</SelectItem>
                <SelectItem value="FA2">FA2 - Formative Assessment 2</SelectItem>
                <SelectItem value="SA1">SA1 - Summative Assessment 1</SelectItem>
                <SelectItem value="FA3">FA3 - Formative Assessment 3</SelectItem>
                <SelectItem value="FA4">FA4 - Formative Assessment 4</SelectItem>
                <SelectItem value="SA2">SA2 - Summative Assessment 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Progress Card */}
      <Card className="p-4 md:p-6 rounded-2xl shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-gray-900">Completion Progress</h3>
            <Badge variant={isDraft ? 'secondary' : 'default'}>
              {isDraft ? 'Draft' : 'Submitted'}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">
              {students.length - missingCount}/{students.length} students
            </span>
            {missingCount > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="w-3 h-3" />
                {missingCount} pending
              </Badge>
            )}
          </div>
        </div>
        <Progress value={completionPercentage} className="h-2" />
        <p className="text-xs text-gray-500 mt-2">{completionPercentage.toFixed(0)}% complete</p>
      </Card>

      {/* Marks Entry Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-gray-900 mb-1">Marks Entry</h3>
              <p className="text-xs text-gray-600">
                Class {selectedClass} • {selectedSubject} • {selectedExam}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Draft</span>
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={missingCount > 0 || !isDraft}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Submit</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Roll No</TableHead>
                <TableHead className="min-w-[200px]">Student Name</TableHead>
                <TableHead className="text-center w-[120px]">Max Marks</TableHead>
                <TableHead className="text-center w-[150px]">Marks Obtained</TableHead>
                <TableHead className="text-center w-[100px]">Grade</TableHead>
                <TableHead className="min-w-[200px]">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const isMissing = student.marksObtained === null;
                return (
                  <TableRow key={student.rollNo} className={isMissing ? 'bg-red-50' : ''}>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {student.studentName}
                        {isMissing && <AlertCircle className="w-4 h-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{student.maxMarks}</TableCell>
                    <TableCell className="text-center">
                      <Input
                        type="number"
                        min="0"
                        max={student.maxMarks}
                        step="0.5"
                        value={student.marksObtained ?? ''}
                        onChange={(e) => handleMarksChange(student.rollNo, e.target.value)}
                        className={`w-24 text-center rounded-lg mx-auto ${
                          isMissing ? 'border-red-300 bg-white' : ''
                        }`}
                        placeholder="-"
                        disabled={!isDraft}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getGradeBadgeClass(student.grade)}>
                        {student.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={student.remarks}
                        onChange={(e) => handleRemarksChange(student.rollNo, e.target.value)}
                        className="rounded-lg"
                        placeholder="Optional remarks"
                        disabled={!isDraft}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Submit Marks?
            </DialogTitle>
            <DialogDescription>
              You are about to submit marks for <strong>{students.length} students</strong> in{' '}
              <strong>
                Class {selectedClass} - {selectedSubject} - {selectedExam}
              </strong>
              .
              <br />
              <br />
              Once submitted, you will not be able to edit the marks unless unlocked by an administrator.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSubmit} className="bg-blue-600 hover:bg-blue-700">
              Confirm Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
