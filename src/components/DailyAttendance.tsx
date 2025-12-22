import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar,
  Lock,
  Save,
  Download,
  AlertCircle,
  Users
} from 'lucide-react';

interface Student {
  id: string;
  rollNo: string;
  name: string;
  admissionNo: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  reason: string;
  remarks: string;
}

const sampleStudents: Student[] = [
  { id: '1', rollNo: '001', name: 'Aarav Sharma', admissionNo: 'STU2024001', status: 'present', reason: '', remarks: '' },
  { id: '2', rollNo: '002', name: 'Diya Patel', admissionNo: 'STU2024002', status: 'present', reason: '', remarks: '' },
  { id: '3', rollNo: '003', name: 'Arjun Reddy', admissionNo: 'STU2024003', status: 'absent', reason: 'Sick', remarks: '' },
  { id: '4', rollNo: '004', name: 'Priya Kumar', admissionNo: 'STU2024004', status: 'present', reason: '', remarks: '' },
  { id: '5', rollNo: '005', name: 'Rohan Singh', admissionNo: 'STU2024005', status: 'late', reason: 'Traffic', remarks: '' },
  { id: '6', rollNo: '006', name: 'Ananya Mehta', admissionNo: 'STU2024006', status: 'present', reason: '', remarks: '' },
  { id: '7', rollNo: '007', name: 'Vihaan Gupta', admissionNo: 'STU2024007', status: 'on-leave', reason: 'Family function', remarks: '' },
  { id: '8', rollNo: '008', name: 'Ishita Verma', admissionNo: 'STU2024008', status: 'present', reason: '', remarks: '' },
];

export function DailyAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isPeriodWise, setIsPeriodWise] = useState(false);
  const [students, setStudents] = useState(sampleStudents);
  const [isLocked, setIsLocked] = useState(false);

  const updateStudentStatus = (id: string, status: Student['status']) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const updateStudentField = (id: string, field: 'reason' | 'remarks', value: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: 'present' as const })));
  };

  const markAllAbsent = () => {
    setStudents(students.map(s => ({ ...s, status: 'absent' as const })));
  };

  const clearAll = () => {
    setStudents(students.map(s => ({ ...s, status: 'present' as const, reason: '', remarks: '' })));
  };

  const saveAttendance = () => {
    alert('Attendance saved successfully!');
  };

  const lockAttendance = () => {
    if (confirm('Are you sure you want to lock attendance for this day? This action cannot be undone.')) {
      setIsLocked(true);
      alert('Attendance locked for ' + selectedDate);
    }
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'present': return 'bg-green-50 text-green-700 border-green-200';
      case 'absent': return 'bg-red-50 text-red-700 border-red-200';
      case 'late': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'half-day': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'on-leave': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: Student['status']) => {
    switch (status) {
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      case 'late': return 'Late';
      case 'half-day': return 'Half Day';
      case 'on-leave': return 'On Leave';
    }
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const leaveCount = students.filter(s => s.status === 'on-leave').length;
  const totalCount = students.length;

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {isLocked && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-yellow-900">Attendance Locked</p>
              <p className="text-sm text-yellow-700">Attendance for this date has been locked and cannot be modified.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label>Date *</Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={isLocked}
            />
          </div>

          <div className="space-y-2">
            <Label>Class *</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass} disabled={isLocked}>
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
            <Label>Section *</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection} disabled={isLocked}>
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

          {isPeriodWise && (
            <>
              <div className="space-y-2">
                <Label>Period</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod} disabled={isLocked}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Day</SelectItem>
                    <SelectItem value="1">Period 1</SelectItem>
                    <SelectItem value="2">Period 2</SelectItem>
                    <SelectItem value="3">Period 3</SelectItem>
                    <SelectItem value="4">Period 4</SelectItem>
                    <SelectItem value="5">Period 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select disabled={isLocked}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="social">Social Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl text-gray-900 mt-1">{totalCount}</p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Present</p>
              <p className="text-2xl text-green-900 mt-1">{presentCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">Absent</p>
              <p className="text-2xl text-red-900 mt-1">{absentCount}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">Late</p>
              <p className="text-2xl text-yellow-900 mt-1">{lateCount}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">On Leave</p>
              <p className="text-2xl text-blue-900 mt-1">{leaveCount}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            onClick={markAllPresent}
            disabled={isLocked}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Present
          </Button>
          <Button 
            variant="outline" 
            onClick={markAllAbsent}
            disabled={isLocked}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Mark All Absent
          </Button>
          <Button 
            variant="outline" 
            onClick={clearAll}
            disabled={isLocked}
          >
            Clear All
          </Button>
          <div className="ml-auto flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={saveAttendance}
              disabled={isLocked}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Attendance
            </Button>
            {!isLocked && (
              <Button 
                onClick={lockAttendance}
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <Lock className="h-4 w-4 mr-2" />
                Lock Attendance
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Attendance Table */}
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
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {student.rollNo}
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{student.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {student.admissionNo}
                  </td>
                  <td className="px-4 py-4">
                    <Select
                      value={student.status}
                      onValueChange={(value) => updateStudentStatus(student.id, value as Student['status'])}
                      disabled={isLocked}
                    >
                      <SelectTrigger className={`w-36 ${getStatusColor(student.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Present
                          </div>
                        </SelectItem>
                        <SelectItem value="absent">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Absent
                          </div>
                        </SelectItem>
                        <SelectItem value="late">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Late
                          </div>
                        </SelectItem>
                        <SelectItem value="half-day">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            Half Day
                          </div>
                        </SelectItem>
                        <SelectItem value="on-leave">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            On Leave
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-4">
                    <Input
                      placeholder="Enter reason..."
                      value={student.reason}
                      onChange={(e) => updateStudentField(student.id, 'reason', e.target.value)}
                      disabled={isLocked}
                      className="w-full"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Input
                      placeholder="Enter remarks..."
                      value={student.remarks}
                      onChange={(e) => updateStudentField(student.id, 'remarks', e.target.value)}
                      disabled={isLocked}
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
