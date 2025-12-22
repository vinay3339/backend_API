import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Download, Award, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SubjectMarks {
  subject: string;
  fa1: number | null;
  fa2: number | null;
  sa1: number | null;
  termTotal: number;
  termMax: number;
  percentage: number;
  grade: string;
}

const term1Marks: SubjectMarks[] = [
  {
    subject: 'Mathematics',
    fa1: 18,
    fa2: 17,
    sa1: 75,
    termTotal: 110,
    termMax: 120,
    percentage: 91.67,
    grade: 'A1',
  },
  {
    subject: 'Science',
    fa1: 17,
    fa2: 18,
    sa1: 72,
    termTotal: 107,
    termMax: 120,
    percentage: 89.17,
    grade: 'A2',
  },
  {
    subject: 'Social Studies',
    fa1: 16,
    fa2: 17,
    sa1: 70,
    termTotal: 103,
    termMax: 120,
    percentage: 85.83,
    grade: 'A2',
  },
  {
    subject: 'English',
    fa1: 19,
    fa2: 18,
    sa1: 76,
    termTotal: 113,
    termMax: 120,
    percentage: 94.17,
    grade: 'A1',
  },
  {
    subject: 'Hindi',
    fa1: 17,
    fa2: 16,
    sa1: 68,
    termTotal: 101,
    termMax: 120,
    percentage: 84.17,
    grade: 'A2',
  },
  {
    subject: 'Telugu',
    fa1: 18,
    fa2: 19,
    sa1: 74,
    termTotal: 111,
    termMax: 120,
    percentage: 92.5,
    grade: 'A1',
  },
];

const term2Marks: SubjectMarks[] = [
  {
    subject: 'Mathematics',
    fa3: 19,
    fa4: 18,
    sa2: 78,
    termTotal: 115,
    termMax: 120,
    percentage: 95.83,
    grade: 'A1',
  },
  {
    subject: 'Science',
    fa3: 18,
    fa4: 19,
    sa2: 76,
    termTotal: 113,
    termMax: 120,
    percentage: 94.17,
    grade: 'A1',
  },
  {
    subject: 'Social Studies',
    fa3: null,
    fa4: null,
    sa2: null,
    termTotal: 0,
    termMax: 120,
    percentage: 0,
    grade: '-',
  },
  {
    subject: 'English',
    fa3: null,
    fa4: null,
    sa2: null,
    termTotal: 0,
    termMax: 120,
    percentage: 0,
    grade: '-',
  },
  {
    subject: 'Hindi',
    fa3: null,
    fa4: null,
    sa2: null,
    termTotal: 0,
    termMax: 120,
    percentage: 0,
    grade: '-',
  },
  {
    subject: 'Telugu',
    fa3: null,
    fa4: null,
    sa2: null,
    termTotal: 0,
    termMax: 120,
    percentage: 0,
    grade: '-',
  },
] as any[];

export function StudentMarksView() {
  const [activeTerm, setActiveTerm] = useState('term-1');

  const calculateOverallGPA = (marks: SubjectMarks[]) => {
    const validMarks = marks.filter((m) => m.percentage > 0);
    if (validMarks.length === 0) return { gpa: 0, grade: '-', percentage: 0 };

    const totalPercentage = validMarks.reduce((sum, m) => sum + m.percentage, 0);
    const avgPercentage = totalPercentage / validMarks.length;

    // CBSE Grading
    let grade = '-';
    let gpa = 0;

    if (avgPercentage >= 91) {
      grade = 'A1';
      gpa = 10.0;
    } else if (avgPercentage >= 81) {
      grade = 'A2';
      gpa = 9.0;
    } else if (avgPercentage >= 71) {
      grade = 'B1';
      gpa = 8.0;
    } else if (avgPercentage >= 61) {
      grade = 'B2';
      gpa = 7.0;
    } else if (avgPercentage >= 51) {
      grade = 'C1';
      gpa = 6.0;
    } else if (avgPercentage >= 41) {
      grade = 'C2';
      gpa = 5.0;
    } else if (avgPercentage >= 33) {
      grade = 'D';
      gpa = 4.0;
    } else {
      grade = 'E';
      gpa = 0.0;
    }

    return { gpa, grade, percentage: avgPercentage };
  };

  const getGradeBadgeClass = (grade: string) => {
    if (grade === 'A1' || grade === 'A2') return 'bg-green-100 text-green-700';
    if (grade === 'B1' || grade === 'B2') return 'bg-blue-100 text-blue-700';
    if (grade === 'C1' || grade === 'C2') return 'bg-yellow-100 text-yellow-700';
    if (grade === 'D') return 'bg-orange-100 text-orange-700';
    if (grade === 'E') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  const handlePrintReport = () => {
    toast.success('Generating report card...');
    setTimeout(() => {
      toast.success('Report card downloaded successfully');
    }, 1500);
  };

  const term1Overall = calculateOverallGPA(term1Marks);
  const term2Overall = calculateOverallGPA(term2Marks);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-1">My Marks</h1>
            <p className="text-sm text-gray-600">
              View your academic performance - CCE Format
            </p>
          </div>

          <Button onClick={handlePrintReport} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Print Report Card
          </Button>
        </div>
      </div>

      {/* Term Switcher */}
      <Tabs value={activeTerm} onValueChange={setActiveTerm}>
        <TabsList className="mb-6">
          <TabsTrigger value="term-1">Term 1</TabsTrigger>
          <TabsTrigger value="term-2">Term 2</TabsTrigger>
        </TabsList>

        {/* Term 1 Content */}
        <TabsContent value="term-1" className="space-y-6">
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">Term 1 - Academic Year 2025-26</h3>
                  <p className="text-sm text-gray-600">
                    Formative Assessments (FA1, FA2) + Summative Assessment (SA1)
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Subject</TableHead>
                    <TableHead className="text-center">
                      <div>FA1</div>
                      <div className="text-xs text-gray-500 font-normal">/20</div>
                    </TableHead>
                    <TableHead className="text-center">
                      <div>FA2</div>
                      <div className="text-xs text-gray-500 font-normal">/20</div>
                    </TableHead>
                    <TableHead className="text-center">
                      <div>SA1</div>
                      <div className="text-xs text-gray-500 font-normal">/80</div>
                    </TableHead>
                    <TableHead className="text-center">
                      <div>Term-1 Total</div>
                      <div className="text-xs text-gray-500 font-normal">/120</div>
                    </TableHead>
                    <TableHead className="text-center">Percentage</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {term1Marks.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject.subject}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm">{subject.fa1 ?? '-'}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm">{subject.fa2 ?? '-'}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm">{subject.sa1 ?? '-'}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm">
                          {subject.termTotal}/{subject.termMax}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm">{subject.percentage.toFixed(2)}%</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getGradeBadgeClass(subject.grade)}>
                          {subject.grade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Term 1 Summary */}
          <Card className="p-6 rounded-2xl shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Term 1 Overall Summary</h3>
                <p className="text-sm text-gray-600">Academic Performance Report</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-xs text-gray-600 mb-1">CGPA (10-Point Scale)</div>
                <div className="text-4xl text-green-600">{term1Overall.gpa.toFixed(1)}</div>
                <div className="text-xs text-gray-500">Cumulative Grade Point Average</div>
              </div>

              <div>
                <div className="text-xs text-gray-600 mb-1">Overall Grade</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`${getGradeBadgeClass(term1Overall.grade)} text-2xl px-4 py-2`}>
                    {term1Overall.grade}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mt-2">Grade Point: {term1Overall.gpa}</div>
              </div>

              <div>
                <div className="text-xs text-gray-600 mb-1">Average Percentage</div>
                <div className="text-4xl text-green-600">{term1Overall.percentage.toFixed(1)}%</div>
                <div className="text-xs text-gray-500">Across all subjects</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Term 2 Content */}
        <TabsContent value="term-2" className="space-y-6">
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">Term 2 - Academic Year 2025-26</h3>
                  <p className="text-sm text-gray-600">
                    Formative Assessments (FA3, FA4) + Summative Assessment (SA2)
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Subject</TableHead>
                    <TableHead className="text-center">
                      <div>FA3</div>
                      <div className="text-xs text-gray-500 font-normal">/20</div>
                    </TableHead>
                    <TableHead className="text-center">
                      <div>FA4</div>
                      <div className="text-xs text-gray-500 font-normal">/20</div>
                    </TableHead>
                    <TableHead className="text-center">
                      <div>SA2</div>
                      <div className="text-xs text-gray-500 font-normal">/80</div>
                    </TableHead>
                    <TableHead className="text-center">
                      <div>Term-2 Total</div>
                      <div className="text-xs text-gray-500 font-normal">/120</div>
                    </TableHead>
                    <TableHead className="text-center">Percentage</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {term2Marks.map((subject, index) => {
                    const isPublished = subject.termTotal > 0;
                    return (
                      <TableRow key={index} className={!isPublished ? 'bg-gray-50' : ''}>
                        <TableCell>{subject.subject}</TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm">{subject.fa3 ?? '-'}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm">{subject.fa4 ?? '-'}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm">{subject.sa2 ?? '-'}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm">
                            {isPublished ? `${subject.termTotal}/${subject.termMax}` : '-'}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm">
                            {isPublished ? `${subject.percentage.toFixed(2)}%` : '-'}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getGradeBadgeClass(subject.grade)}>
                            {subject.grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Term 2 Summary or Notice */}
          {term2Overall.percentage > 0 ? (
            <Card className="p-6 rounded-2xl shadow-sm bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">Term 2 Overall Summary</h3>
                  <p className="text-sm text-gray-600">Academic Performance Report</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs text-gray-600 mb-1">CGPA (10-Point Scale)</div>
                  <div className="text-4xl text-purple-600">{term2Overall.gpa.toFixed(1)}</div>
                  <div className="text-xs text-gray-500">Cumulative Grade Point Average</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">Overall Grade</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={`${getGradeBadgeClass(term2Overall.grade)} text-2xl px-4 py-2`}>
                      {term2Overall.grade}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Grade Point: {term2Overall.gpa}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">Average Percentage</div>
                  <div className="text-4xl text-purple-600">{term2Overall.percentage.toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">Across all subjects</div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-12 rounded-2xl text-center shadow-sm bg-gray-50">
              <div className="text-gray-400 mb-4">
                <Award className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-gray-900 mb-2">Term 2 Results Not Published</h3>
              <p className="text-sm text-gray-600">
                Your Term 2 examination results will be available once published by your school.
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
