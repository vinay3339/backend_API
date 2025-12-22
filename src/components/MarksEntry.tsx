import React, { useState } from 'react';
import { Save, Eye, Download, Upload, UserX, Shield } from 'lucide-react';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  marks: string;
  grade: string;
  absent: boolean;
  exempted: boolean;
  remarks: string;
}

export const MarksEntry: React.FC = () => {
  const [filters, setFilters] = useState({
    exam: 'FA1-2024',
    academicYear: '2024-2025',
    class: '10',
    section: 'A',
    subject: 'MATH',
  });

  const [maxMarks] = useState(80);
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      rollNumber: '1001',
      name: 'Aarav Kumar',
      marks: '75',
      grade: 'A',
      absent: false,
      exempted: false,
      remarks: '',
    },
    {
      id: '2',
      rollNumber: '1002',
      name: 'Sai Priya',
      marks: '68',
      grade: 'B+',
      absent: false,
      exempted: false,
      remarks: '',
    },
    {
      id: '3',
      rollNumber: '1003',
      name: 'Ravi Teja',
      marks: '',
      grade: '',
      absent: true,
      exempted: false,
      remarks: 'Medical leave',
    },
    {
      id: '4',
      rollNumber: '1004',
      name: 'Divya Rani',
      marks: '82',
      grade: 'A+',
      absent: false,
      exempted: false,
      remarks: 'Excellent performance',
    },
    {
      id: '5',
      rollNumber: '1005',
      name: 'Krishna Reddy',
      marks: '45',
      grade: 'C',
      absent: false,
      exempted: false,
      remarks: '',
    },
    {
      id: '6',
      rollNumber: '1006',
      name: 'Lakshmi Devi',
      marks: '70',
      grade: 'B+',
      absent: false,
      exempted: false,
      remarks: '',
    },
    {
      id: '7',
      rollNumber: '1007',
      name: 'Venkat Rao',
      marks: '',
      grade: '',
      absent: false,
      exempted: true,
      remarks: 'Sports quota exemption',
    },
    {
      id: '8',
      rollNumber: '1008',
      name: 'Anjali Sharma',
      marks: '78',
      grade: 'A',
      absent: false,
      exempted: false,
      remarks: '',
    },
  ]);

  const calculateGrade = (marks: number): string => {
    if (marks >= 90) return 'A1';
    if (marks >= 80) return 'A+';
    if (marks >= 70) return 'A';
    if (marks >= 60) return 'B+';
    if (marks >= 50) return 'B';
    if (marks >= 40) return 'C';
    if (marks >= 35) return 'D';
    return 'F';
  };

  const updateStudent = (id: string, field: keyof Student, value: any) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === id) {
          const updated = { ...student, [field]: value };
          // Auto-calculate grade when marks change
          if (field === 'marks' && value && !updated.absent && !updated.exempted) {
            updated.grade = calculateGrade(parseFloat(value));
          }
          // Clear marks and grade if absent or exempted
          if (field === 'absent' && value) {
            updated.marks = '';
            updated.grade = '';
            updated.exempted = false;
          }
          if (field === 'exempted' && value) {
            updated.marks = '';
            updated.grade = '';
            updated.absent = false;
          }
          return updated;
        }
        return student;
      })
    );
  };

  const stats = {
    total: students.length,
    entered: students.filter((s) => s.marks && !s.absent && !s.exempted).length,
    absent: students.filter((s) => s.absent).length,
    exempted: students.filter((s) => s.exempted).length,
    pending: students.filter((s) => !s.marks && !s.absent && !s.exempted).length,
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Select Exam & Class</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Exam</label>
            <select
              value={filters.exam}
              onChange={(e) => setFilters({ ...filters, exam: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="FA1-2024">FA1 - 2024-2025</option>
              <option value="FA2-2024">FA2 - 2024-2025</option>
              <option value="SA1-2024">SA1 - 2024-2025</option>
              <option value="SA2-2025">SA2 - 2024-2025</option>
              <option value="TERM1-2024">Term 1 - 2024-2025</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Class</label>
            <select
              value={filters.class}
              onChange={(e) => setFilters({ ...filters, class: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
              <option value="8">Class 8</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Section</label>
            <select
              value={filters.section}
              onChange={(e) => setFilters({ ...filters, section: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Subject</label>
            <select
              value={filters.subject}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="MATH">Mathematics</option>
              <option value="PHY">Physics</option>
              <option value="CHEM">Chemistry</option>
              <option value="ENG">English</option>
              <option value="TEL">Telugu</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Max Marks</label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
              {maxMarks}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Students</span>
          <p className="text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Marks Entered</span>
          <p className="text-green-600 mt-1">{stats.entered}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Absent</span>
          <p className="text-orange-600 mt-1">{stats.absent}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Exempted</span>
          <p className="text-blue-600 mt-1">{stats.exempted}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Pending</span>
          <p className="text-red-600 mt-1">{stats.pending}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Marks
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Publish Marks
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Blank Sheet
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Marks
          </button>
        </div>
      </div>

      {/* Marks Entry Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Marks Obtained
                  <br />
                  <span className="text-gray-400">(Out of {maxMarks})</span>
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  <UserX className="w-4 h-4 inline mr-1" />
                  Absent
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Exempted
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-gray-900">{student.rollNumber}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-gray-900">{student.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max={maxMarks}
                      value={student.marks}
                      onChange={(e) => updateStudent(student.id, 'marks', e.target.value)}
                      disabled={student.absent || student.exempted}
                      className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                      placeholder="--"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      {student.grade ? (
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs ${
                            student.grade.startsWith('A')
                              ? 'bg-green-100 text-green-700'
                              : student.grade.startsWith('B')
                              ? 'bg-blue-100 text-blue-700'
                              : student.grade.startsWith('C')
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {student.grade}
                        </span>
                      ) : (
                        <span className="text-gray-400">--</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={student.absent}
                        onChange={(e) => updateStudent(student.id, 'absent', e.target.checked)}
                        className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={student.exempted}
                        onChange={(e) => updateStudent(student.id, 'exempted', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={student.remarks}
                      onChange={(e) => updateStudent(student.id, 'remarks', e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Optional"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helper Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm text-blue-900 mb-2">Quick Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Grades are automatically calculated based on marks entered</li>
          <li>Check "Absent" if student was not present for the exam</li>
          <li>Check "Exempted" for students with special permissions</li>
          <li>Use remarks field for any additional notes</li>
          <li>Don't forget to save your changes before leaving this page</li>
        </ul>
      </div>
    </div>
  );
};
