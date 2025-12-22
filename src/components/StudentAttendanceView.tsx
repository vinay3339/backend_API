import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search
} from 'lucide-react';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
  reason: string;
  markedBy: string;
}

const sampleAttendanceRecords: AttendanceRecord[] = [
  { date: '2024-11-29', status: 'present', reason: '', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-28', status: 'present', reason: '', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-27', status: 'late', reason: 'Traffic', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-26', status: 'present', reason: '', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-25', status: 'present', reason: '', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-22', status: 'absent', reason: 'Sick', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-21', status: 'present', reason: '', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-20', status: 'present', reason: '', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-19', status: 'present', reason: '', markedBy: 'Mrs. Kumar' },
  { date: '2024-11-18', status: 'on-leave', reason: 'Family function', markedBy: 'Mrs. Kumar' },
];

export function StudentAttendanceView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('November');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Sample student data
  const student = {
    id: '1',
    name: 'Aarav Sharma',
    admissionNo: 'STU2024001',
    rollNo: '001',
    class: '10',
    section: 'A',
    photo: null,
  };

  const workingDays = 25;
  const presentDays = sampleAttendanceRecords.filter(r => r.status === 'present').length;
  const absentDays = sampleAttendanceRecords.filter(r => r.status === 'absent').length;
  const lateDays = sampleAttendanceRecords.filter(r => r.status === 'late').length;
  const halfDays = sampleAttendanceRecords.filter(r => r.status === 'half-day').length;
  const attendancePercentage = Math.round((presentDays / workingDays) * 100);

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 90) return { label: 'Excellent', color: 'bg-green-100 text-green-800 border-green-300' };
    if (percentage >= 75) return { label: 'Good', color: 'bg-orange-100 text-orange-800 border-orange-300' };
    return { label: 'Needs Attention', color: 'bg-red-100 text-red-800 border-red-300' };
  };

  const statusBadge = getStatusBadge(attendancePercentage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-50 text-green-700 border-green-200';
      case 'absent': return 'bg-red-50 text-red-700 border-red-200';
      case 'late': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'half-day': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'on-leave': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'absent': return <XCircle className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      case 'half-day': return <AlertTriangle className="h-4 w-4" />;
      case 'on-leave': return <Calendar className="h-4 w-4" />;
    }
  };

  // Generate calendar days
  const generateCalendar = () => {
    const year = parseInt(selectedYear);
    const monthIndex = new Date(`${selectedMonth} 1, ${year}`).getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDayOfWeek) {
          week.push(null);
        } else if (day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      calendar.push(week);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  const getDateStatus = (day: number | null) => {
    if (!day) return null;
    const dateStr = `${selectedYear}-${String(new Date(`${selectedMonth} 1, ${selectedYear}`).getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = sampleAttendanceRecords.find(r => r.date === dateStr);
    return record?.status || null;
  };

  const getDayColor = (status: string | null) => {
    if (!status) return 'bg-white';
    switch (status) {
      case 'present': return 'bg-green-200 hover:bg-green-300';
      case 'absent': return 'bg-red-200 hover:bg-red-300';
      case 'late': return 'bg-yellow-200 hover:bg-yellow-300';
      case 'half-day': return 'bg-orange-200 hover:bg-orange-300';
      case 'on-leave': return 'bg-blue-200 hover:bg-blue-300';
      default: return 'bg-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search/Filter Section */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label>Search Student</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, admission no, or roll no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
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
                <SelectItem value="November">November 2024</SelectItem>
                <SelectItem value="October">October 2024</SelectItem>
                <SelectItem value="September">September 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Student Header */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl text-gray-900 mb-1">{student.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Admission No: <span className="text-gray-900">{student.admissionNo}</span></span>
                  <span>Roll No: <span className="text-gray-900">{student.rollNo}</span></span>
                  <span>Class: <span className="text-gray-900">{student.class}{student.section}</span></span>
                </div>
              </div>
              <Badge className={statusBadge.color}>
                {statusBadge.label}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Working Days</p>
            <p className="text-2xl text-gray-900">{workingDays}</p>
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-sm text-green-700 mb-1">Present</p>
            <p className="text-2xl text-green-900">{presentDays}</p>
          </div>
        </Card>

        <Card className="p-4 bg-red-50 border-red-200">
          <div className="text-center">
            <p className="text-sm text-red-700 mb-1">Absent</p>
            <p className="text-2xl text-red-900">{absentDays}</p>
          </div>
        </Card>

        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <p className="text-sm text-yellow-700 mb-1">Late</p>
            <p className="text-2xl text-yellow-900">{lateDays}</p>
          </div>
        </Card>

        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="text-center">
            <p className="text-sm text-orange-700 mb-1">Half Days</p>
            <p className="text-2xl text-orange-900">{halfDays}</p>
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-center">
            <p className="text-sm text-blue-700 mb-1">Attendance %</p>
            <p className="text-2xl text-blue-900">{attendancePercentage}%</p>
          </div>
        </Card>
      </div>

      {/* Attendance Calendar */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Attendance Calendar - {selectedMonth} {selectedYear}</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <th key={day} className="p-2 text-sm text-gray-600 border">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateCalendar().map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map((day, dayIndex) => {
                    const status = getDateStatus(day);
                    return (
                      <td key={dayIndex} className="border p-0">
                        {day ? (
                          <div
                            className={`aspect-square flex items-center justify-center cursor-pointer transition-colors ${getDayColor(status)}`}
                            title={status ? status.charAt(0).toUpperCase() + status.slice(1) : 'No record'}
                          >
                            <span className="text-sm text-gray-900">{day}</span>
                          </div>
                        ) : (
                          <div className="aspect-square bg-gray-50"></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calendar Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 border"></div>
            <span className="text-gray-600">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 border"></div>
            <span className="text-gray-600">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 border"></div>
            <span className="text-gray-600">Late</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-200 border"></div>
            <span className="text-gray-600">Half Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 border"></div>
            <span className="text-gray-600">On Leave</span>
          </div>
        </div>
      </Card>

      {/* Detailed Attendance Table */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Detailed Attendance Records</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Marked By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleAttendanceRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={`flex items-center gap-2 w-fit ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1).replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {record.reason || '-'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {record.markedBy}
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
