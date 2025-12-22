import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Download, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SubjectMark {
  subject: string;
  assessments: {
    name: string;
    marks: number;
    maxMarks: number;
    weight: number;
  }[];
  total: number;
  maxTotal: number;
  percentage: number;
  grade: string;
  remarks: string;
}

const mockMarksData: { [term: string]: SubjectMark[] } = {
  'term-1': [
    {
      subject: 'Mathematics',
      assessments: [
        { name: 'Quiz 1', marks: 18, maxMarks: 20, weight: 10 },
        { name: 'Assignment 1', marks: 28, maxMarks: 30, weight: 15 },
        { name: 'Midterm Exam', marks: 45, maxMarks: 50, weight: 25 },
        { name: 'Final Exam', marks: 92, maxMarks: 100, weight: 50 },
      ],
      total: 183,
      maxTotal: 200,
      percentage: 91.5,
      grade: 'A+',
      remarks: 'Excellent performance',
    },
    {
      subject: 'English',
      assessments: [
        { name: 'Quiz 1', marks: 16, maxMarks: 20, weight: 10 },
        { name: 'Assignment 1', marks: 25, maxMarks: 30, weight: 15 },
        { name: 'Midterm Exam', marks: 42, maxMarks: 50, weight: 25 },
        { name: 'Final Exam', marks: 85, maxMarks: 100, weight: 50 },
      ],
      total: 168,
      maxTotal: 200,
      percentage: 84.0,
      grade: 'A',
      remarks: 'Good work',
    },
    {
      subject: 'Science',
      assessments: [
        { name: 'Quiz 1', marks: 17, maxMarks: 20, weight: 10 },
        { name: 'Assignment 1', marks: 27, maxMarks: 30, weight: 15 },
        { name: 'Midterm Exam', marks: 46, maxMarks: 50, weight: 25 },
        { name: 'Final Exam', marks: 88, maxMarks: 100, weight: 50 },
      ],
      total: 178,
      maxTotal: 200,
      percentage: 89.0,
      grade: 'A',
      remarks: 'Very good',
    },
    {
      subject: 'History',
      assessments: [
        { name: 'Quiz 1', marks: 15, maxMarks: 20, weight: 10 },
        { name: 'Assignment 1', marks: 26, maxMarks: 30, weight: 15 },
        { name: 'Midterm Exam', marks: 40, maxMarks: 50, weight: 25 },
        { name: 'Final Exam', marks: 80, maxMarks: 100, weight: 50 },
      ],
      total: 161,
      maxTotal: 200,
      percentage: 80.5,
      grade: 'A',
      remarks: 'Good understanding',
    },
  ],
};

interface StudentMarksTabProps {
  studentName?: string;
  studentClass?: string;
  studentSection?: string;
}

export function StudentMarksTab({
  studentName = 'Emma Johnson',
  studentClass = '10',
  studentSection = 'A',
}: StudentMarksTabProps) {
  const [selectedTerm, setSelectedTerm] = useState('term-1');

  const currentMarks = mockMarksData[selectedTerm] || [];
  
  const calculateOverallGPA = () => {
    if (currentMarks.length === 0) return { gpa: 0, percentage: 0 };
    
    const totalPercentage = currentMarks.reduce((sum, subject) => sum + subject.percentage, 0);
    const avgPercentage = totalPercentage / currentMarks.length;
    const gpa = (avgPercentage / 100) * 4.0;
    
    return { gpa: gpa.toFixed(2), percentage: avgPercentage.toFixed(1) };
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-100 text-green-800';
    if (grade === 'B+' || grade === 'B') return 'bg-blue-100 text-blue-800';
    if (grade === 'C+' || grade === 'C') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getTrendIcon = (percentage: number) => {
    if (percentage >= 85) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (percentage >= 70) return <Minus className="w-4 h-4 text-gray-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const handleDownloadTranscript = () => {
    toast.success('Downloading transcript...');
    // Simulate PDF download
    setTimeout(() => {
      toast.success('Transcript downloaded successfully');
    }, 1500);
  };

  const overall = calculateOverallGPA();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Academic Marks</h2>
          <p className="text-sm text-gray-600">
            {studentName} • Grade {studentClass}-{studentSection}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-[200px] rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="term-1">Term 1 (2024-25)</SelectItem>
              <SelectItem value="term-2">Term 2 (2024-25)</SelectItem>
              <SelectItem value="term-3">Term 3 (2024-25)</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleDownloadTranscript} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Transcript</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </div>

      {/* Overall Performance Card */}
      <Card className="p-6 rounded-2xl shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900">Overall Performance</h3>
            <p className="text-sm text-gray-600">Term 1 (2024-25)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-gray-600 mb-1">GPA</div>
            <div className="text-3xl text-blue-600">{overall.gpa}</div>
            <div className="text-xs text-gray-500">out of 4.0</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-600 mb-1">Percentage</div>
            <div className="text-3xl text-blue-600">{overall.percentage}%</div>
            <div className="text-xs text-gray-500">average across subjects</div>
          </div>

          <div>
            <div className="text-xs text-gray-600 mb-1">Subjects</div>
            <div className="text-3xl text-blue-600">{currentMarks.length}</div>
            <div className="text-xs text-gray-500">total enrolled</div>
          </div>
        </div>
      </Card>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentMarks.map((subject, index) => (
          <Card key={index} className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            {/* Subject Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{subject.subject}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getGradeColor(subject.grade)}>
                    Grade: {subject.grade}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {getTrendIcon(subject.percentage)}
                    <span>{subject.percentage}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl text-gray-900">
                  {subject.total}/{subject.maxTotal}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress value={subject.percentage} className="h-2" />
            </div>

            {/* Assessments Breakdown */}
            <div className="space-y-3">
              <div className="text-xs text-gray-600 mb-2">Assessment Breakdown</div>
              {subject.assessments.map((assessment, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{assessment.name}</span>
                    <span className="text-xs text-gray-500">({assessment.weight}%)</span>
                  </div>
                  <div className="font-medium text-gray-900">
                    {assessment.marks}/{assessment.maxMarks}
                  </div>
                </div>
              ))}
            </div>

            {/* Remarks */}
            {subject.remarks && (
              <div className="mt-4 pt-4 border-t">
                <div className="text-xs text-gray-600 mb-1">Teacher's Remarks</div>
                <p className="text-sm text-gray-700 italic">{subject.remarks}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {currentMarks.length === 0 && (
        <Card className="p-12 rounded-2xl text-center">
          <div className="text-gray-400 mb-4">
            <Award className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-gray-900 mb-2">No Marks Available</h3>
          <p className="text-sm text-gray-600">
            Marks for this term have not been published yet.
          </p>
        </Card>
      )}
    </div>
  );
}
