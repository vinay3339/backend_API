import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface ClassStudent {
  id: string;
  rollNo: string;
  name: string;
  admissionNo: string;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendancePercentage: number;
}

const sampleClassStudents: ClassStudent[] = [
  { id: '1', rollNo: '001', name: 'Aarav Sharma', admissionNo: 'STU2024001', presentDays: 22, absentDays: 2, lateDays: 1, attendancePercentage: 88 },
  { id: '2', rollNo: '002', name: 'Diya Patel', admissionNo: 'STU2024002', presentDays: 24, absentDays: 0, lateDays: 1, attendancePercentage: 96 },
  { id: '3', rollNo: '003', name: 'Arjun Reddy', admissionNo: 'STU2024003', presentDays: 18, absentDays: 6, lateDays: 1, attendancePercentage: 72 },
  { id: '4', rollNo: '004', name: 'Priya Kumar', admissionNo: 'STU2024004', presentDays: 23, absentDays: 1, lateDays: 1, attendancePercentage: 92 },
  { id: '5', rollNo: '005', name: 'Rohan Singh', admissionNo: 'STU2024005', presentDays: 21, absentDays: 3, lateDays: 1, attendancePercentage: 84 },
  { id: '6', rollNo: '006', name: 'Ananya Mehta', admissionNo: 'STU2024006', presentDays: 25, absentDays: 0, lateDays: 0, attendancePercentage: 100 },
  { id: '7', rollNo: '007', name: 'Vihaan Gupta', admissionNo: 'STU2024007', presentDays: 20, absentDays: 4, lateDays: 1, attendancePercentage: 80 },
  { id: '8', rollNo: '008', name: 'Ishita Verma', admissionNo: 'STU2024008', presentDays: 24, absentDays: 1, lateDays: 0, attendancePercentage: 96 },
  { id: '9', rollNo: '009', name: 'Aditya Jain', admissionNo: 'STU2024009', presentDays: 17, absentDays: 7, lateDays: 1, attendancePercentage: 68 },
  { id: '10', rollNo: '010', name: 'Kavya Nair', admissionNo: 'STU2024010', presentDays: 23, absentDays: 2, lateDays: 0, attendancePercentage: 92 },
];

export function ClassAttendanceView() {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedMonth, setSelectedMonth] = useState('November');

  const workingDays = 25;
  const totalPresent = sampleClassStudents.reduce((sum, s) => sum + s.presentDays, 0);
  const totalAbsent = sampleClassStudents.reduce((sum, s) => sum + s.absentDays, 0);
  const classAverage = Math.round(
    sampleClassStudents.reduce((sum, s) => sum + s.attendancePercentage, 0) / sampleClassStudents.length
  );

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 90) {
      return <Badge className="bg-green-100 text-green-800 border-green-300">Excellent</Badge>;
    } else if (percentage >= 75) {
      return <Badge className="bg-orange-100 text-orange-800 border-orange-300">Good</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-300">Below Threshold</Badge>;
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Academic Year</Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Section</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
                <SelectItem value="D">Section D</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Month</Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Working Days</p>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl text-gray-900">{workingDays}</p>
          <p className="text-xs text-gray-500 mt-1">in {selectedMonth}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Class Average</p>
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-3xl text-blue-600">{classAverage}%</p>
          <p className="text-xs text-gray-500 mt-1">Overall attendance</p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-green-700">Total Present</p>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl text-green-900">{totalPresent}</p>
          <p className="text-xs text-green-600 mt-1">Student-days</p>
        </Card>

        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-red-700">Total Absent</p>
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-3xl text-red-900">{totalAbsent}</p>
          <p className="text-xs text-red-600 mt-1">Student-days</p>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-gray-900">Class {selectedClass}{selectedSection} - Student Attendance Summary</h3>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Excel
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Student Attendance Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Admission No
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                  Present Days
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                  Absent Days
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                  Late Days
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                  Attendance %
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleClassStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {student.rollNo}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm text-blue-700">{student.name.charAt(0)}</span>
                      </div>
                      <p className="text-sm text-gray-900">{student.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {student.admissionNo}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      {student.presentDays}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                      {student.absentDays}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      {student.lateDays}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-lg ${getPercentageColor(student.attendancePercentage)}`}>
                      {student.attendancePercentage}%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {getAttendanceBadge(student.attendancePercentage)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Status Legend:</p>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">≥90% Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-gray-600">75-89% Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600">&lt;75% Below Threshold</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
