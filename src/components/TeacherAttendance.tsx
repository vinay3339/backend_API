import React, { useState } from 'react';
import { Calendar, Save, Check, X, Clock, AlertTriangle } from 'lucide-react';

export const TeacherAttendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const students = [
    { id: '1', rollNo: '1', name: 'Aarav Kumar', status: 'present' },
    { id: '2', rollNo: '2', name: 'Ananya Reddy', status: 'present' },
    { id: '3', rollNo: '3', name: 'Arjun Singh', status: 'absent' },
    { id: '4', rollNo: '4', name: 'Diya Sharma', status: 'present' },
    { id: '5', rollNo: '5', name: 'Ishaan Patel', status: 'late' },
    { id: '6', rollNo: '6', name: 'Kavya Nair', status: 'present' },
    { id: '7', rollNo: '7', name: 'Krishna Rao', status: 'present' },
    { id: '8', rollNo: '8', name: 'Lakshmi Menon', status: 'present' },
    { id: '9', rollNo: '9', name: 'Rahul Verma', status: 'halfDay' },
    { id: '10', rollNo: '10', name: 'Saanvi Gupta', status: 'present' },
  ];

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = student.status;
      return acc;
    }, {} as Record<string, string>)
  );

  const toggleAttendance = (studentId: string, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const markAllPresent = () => {
    const allPresent = students.reduce((acc, student) => {
      acc[student.id] = 'present';
      return acc;
    }, {} as Record<string, string>);
    setAttendance(allPresent);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700 border-green-200';
      case 'absent': return 'bg-red-100 text-red-700 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'halfDay': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const presentCount = Object.values(attendance).filter(s => s === 'present').length;
  const absentCount = Object.values(attendance).filter(s => s === 'absent').length;
  const lateCount = Object.values(attendance).filter(s => s === 'late').length;
  const halfDayCount = Object.values(attendance).filter(s => s === 'halfDay').length;

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Mark Attendance</h1>
        <p className="text-gray-600">Take attendance for your assigned classes</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Class & Section</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent"
            >
              <option value="10-A">Class 10-A</option>
              <option value="9-A">Class 9-A</option>
              <option value="9-B">Class 9-B</option>
              <option value="8-A">Class 8-A</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Period (if period-wise)</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent"
            >
              <option value="all">All Day</option>
              <option value="1">Period 1</option>
              <option value="2">Period 2</option>
              <option value="3">Period 3</option>
              <option value="4">Period 4</option>
              <option value="5">Period 5</option>
              <option value="6">Period 6</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={markAllPresent}
              className="w-full px-4 py-2 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27AE60] transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Mark All Present
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-center">
            <p className="text-2xl text-gray-900">{students.length}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
          <div className="text-center">
            <p className="text-2xl text-green-700">{presentCount}</p>
            <p className="text-sm text-green-600">Present</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-red-200 bg-red-50">
          <div className="text-center">
            <p className="text-2xl text-red-700">{absentCount}</p>
            <p className="text-sm text-red-600">Absent</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-200 bg-yellow-50">
          <div className="text-center">
            <p className="text-2xl text-yellow-700">{lateCount}</p>
            <p className="text-sm text-yellow-600">Late</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200 bg-blue-50">
          <div className="text-center">
            <p className="text-2xl text-blue-700">{halfDayCount}</p>
            <p className="text-sm text-blue-600">Half Day</p>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Student Attendance - {selectedClass}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Roll No</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Reason (if absent)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{student.rollNo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{student.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleAttendance(student.id, 'present')}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${attendance[student.id] === 'present' ? getStatusColor('present') : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => toggleAttendance(student.id, 'absent')}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${attendance[student.id] === 'absent' ? getStatusColor('absent') : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => toggleAttendance(student.id, 'late')}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${attendance[student.id] === 'late' ? getStatusColor('late') : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        Late
                      </button>
                      <button
                        onClick={() => toggleAttendance(student.id, 'halfDay')}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${attendance[student.id] === 'halfDay' ? getStatusColor('halfDay') : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        Half Day
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {attendance[student.id] === 'absent' && (
                      <input
                        type="text"
                        placeholder="Enter reason..."
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Last saved: Never</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button className="px-4 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6] transition-colors flex items-center gap-2">
              <Check className="w-4 h-4" />
              Submit Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
