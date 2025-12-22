import React, { useState } from 'react';
import { Search, Download, Eye, User, Award, Calendar, CheckCircle } from 'lucide-react';

interface SubjectMarks {
  subject: string;
  maxMarks: number;
  obtained: number;
  grade: string;
  teacherRemarks: string;
}

interface CoScholastic {
  area: string;
  grade: string;
}

export const ReportCards: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    exam: 'SA1-2024',
    class: '10',
    section: 'A',
  });
  const [selectedStudent, setSelectedStudent] = useState<string | null>('1004');

  // Student report data
  const studentReport = {
    studentId: '1004',
    photo: null,
    name: 'Divya Rani',
    admissionNumber: 'RA-2024-1004',
    class: '10',
    section: 'A',
    examName: 'Summative Assessment 1 (SA1)',
    academicYear: '2024-2025',
    
    // Score Summary
    totalMarks: 500,
    obtainedMarks: 456,
    percentage: 91.2,
    overallGrade: 'A1',
    gradePoints: 10.0,
    classRank: 1,
    resultStatus: 'PASS',
    
    // Subject-wise marks
    subjects: [
      {
        subject: 'Mathematics',
        maxMarks: 100,
        obtained: 95,
        grade: 'A1',
        teacherRemarks: 'Excellent problem-solving skills',
      },
      {
        subject: 'Physics',
        maxMarks: 100,
        obtained: 92,
        grade: 'A1',
        teacherRemarks: 'Very good understanding of concepts',
      },
      {
        subject: 'Chemistry',
        maxMarks: 100,
        obtained: 89,
        grade: 'A1',
        teacherRemarks: 'Strong practical knowledge',
      },
      {
        subject: 'English',
        maxMarks: 100,
        obtained: 90,
        grade: 'A1',
        teacherRemarks: 'Excellent communication skills',
      },
      {
        subject: 'Telugu',
        maxMarks: 100,
        obtained: 90,
        grade: 'A1',
        teacherRemarks: 'Good grasp of the language',
      },
    ] as SubjectMarks[],
    
    // Co-Scholastic
    coScholastic: [
      { area: 'Discipline', grade: 'A' },
      { area: 'Work Habits', grade: 'A' },
      { area: 'Sports', grade: 'B+' },
      { area: 'Arts & Music', grade: 'A' },
      { area: 'Attitude', grade: 'A' },
      { area: 'Values', grade: 'A' },
    ] as CoScholastic[],
    
    // Attendance
    workingDays: 120,
    presentDays: 118,
    attendancePercent: 98.3,
    
    // Remarks
    classTeacherRemarks: 'Divya is an outstanding student who consistently demonstrates excellence in academics. She shows great dedication to her studies and actively participates in class discussions. Keep up the excellent work!',
    
    // Signatures
    classTeacher: 'Mrs. Lakshmi Devi',
    principal: 'Dr. K. Ramarao',
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name or Roll Number"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Exam</label>
            <select
              value={filters.exam}
              onChange={(e) => setFilters({ ...filters, exam: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="FA1-2024">FA1 - 2024-2025</option>
              <option value="SA1-2024">SA1 - 2024-2025</option>
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
            </select>
          </div>
        </div>
      </div>

      {/* Report Card */}
      {selectedStudent && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-white mb-2">{studentReport.name}</h2>
                  <div className="space-y-1 text-blue-100 text-sm">
                    <p>Admission No: {studentReport.admissionNumber}</p>
                    <p>Class: {studentReport.class} - Section {studentReport.section}</p>
                    <p>Exam: {studentReport.examName}</p>
                    <p>Academic Year: {studentReport.academicYear}</p>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Score Summary */}
            <div>
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Score Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Total Marks</span>
                  <p className="text-gray-900 mt-1">{studentReport.totalMarks}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Obtained Marks</span>
                  <p className="text-gray-900 mt-1">{studentReport.obtainedMarks}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Percentage</span>
                  <p className="text-green-600 mt-1">{studentReport.percentage}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Overall Grade</span>
                  <p className="text-blue-600 mt-1">{studentReport.overallGrade}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Grade Points (GPA)</span>
                  <p className="text-gray-900 mt-1">{studentReport.gradePoints.toFixed(1)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Class Rank</span>
                  <p className="text-yellow-600 mt-1">#{studentReport.classRank}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                  <span className="text-sm text-gray-600">Result Status</span>
                  <p className="text-green-600 mt-1 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {studentReport.resultStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Subject-wise Performance */}
            <div>
              <h3 className="text-gray-900 mb-4">Subject-wise Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider border-b">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider border-b">
                        Max Marks
                      </th>
                      <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider border-b">
                        Obtained
                      </th>
                      <th className="px-4 py-3 text-center text-xs text-gray-500 uppercase tracking-wider border-b">
                        Grade
                      </th>
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider border-b">
                        Teacher Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentReport.subjects.map((subject, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <span className="text-gray-900">{subject.subject}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-gray-900">{subject.maxMarks}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-gray-900">{subject.obtained}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            {subject.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">{subject.teacherRemarks}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Co-Scholastic Areas */}
            <div>
              <h3 className="text-gray-900 mb-4">Co-Scholastic Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {studentReport.coScholastic.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-2">{item.area}</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {item.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Summary */}
            <div>
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Attendance Summary
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Working Days</span>
                  <p className="text-gray-900 mt-1">{studentReport.workingDays}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Present Days</span>
                  <p className="text-green-600 mt-1">{studentReport.presentDays}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Attendance Percent</span>
                  <p className="text-blue-600 mt-1">{studentReport.attendancePercent}%</p>
                </div>
              </div>
            </div>

            {/* Class Teacher Remarks */}
            <div>
              <h3 className="text-gray-900 mb-3">Class Teacher Remarks</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {studentReport.classTeacherRemarks}
                </p>
              </div>
            </div>

            {/* Signatures */}
            <div>
              <h3 className="text-gray-900 mb-4">Signatures</h3>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="h-16 border-b-2 border-gray-300 mb-2"></div>
                  <p className="text-sm text-gray-600">Class Teacher</p>
                  <p className="text-sm text-gray-900">{studentReport.classTeacher}</p>
                </div>
                <div className="text-center">
                  <div className="h-16 border-b-2 border-gray-300 mb-2"></div>
                  <p className="text-sm text-gray-600">Principal</p>
                  <p className="text-sm text-gray-900">{studentReport.principal}</p>
                </div>
                <div className="text-center">
                  <div className="h-16 border-b-2 border-gray-300 mb-2"></div>
                  <p className="text-sm text-gray-600">Parent/Guardian</p>
                  <p className="text-sm text-gray-900">________________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
