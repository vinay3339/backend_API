import React, { useState } from 'react';
import { Save, Download, Check } from 'lucide-react';

export const TeacherMarksExams: React.FC = () => {
  const [filters, setFilters] = useState({ exam: 'FA1', class: '10-A', subject: 'Mathematics' });

  const students = [
    { id: '1', rollNo: '1', name: 'Aarav Kumar', marks: '85', absent: false },
    { id: '2', rollNo: '2', name: 'Ananya Reddy', marks: '92', absent: false },
    { id: '3', rollNo: '3', name: 'Arjun Singh', marks: '', absent: true },
    { id: '4', rollNo: '4', name: 'Diya Sharma', marks: '78', absent: false },
    { id: '5', rollNo: '5', name: 'Ishaan Patel', marks: '88', absent: false },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Marks & Exams</h1>
        <p className="text-gray-600">Enter and manage exam marks for your subjects</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Exam</label>
            <select value={filters.exam} onChange={(e) => setFilters({ ...filters, exam: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]">
              <option>FA1</option>
              <option>FA2</option>
              <option>SA1</option>
              <option>SA2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Class & Section</label>
            <select value={filters.class} onChange={(e) => setFilters({ ...filters, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]">
              <option>Class 10-A</option>
              <option>Class 9-A</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Subject</label>
            <select value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]">
              <option>Mathematics</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Exam Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-blue-600">Max Marks</p>
            <p className="text-xl text-blue-900">100</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Pass Marks</p>
            <p className="text-xl text-blue-900">35</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Total Students</p>
            <p className="text-xl text-blue-900">42</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Marks Entered</p>
            <p className="text-xl text-blue-900">4/42</p>
          </div>
        </div>
      </div>

      {/* Marks Entry Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Marks Entry - {filters.exam} - {filters.subject}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Roll No</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Marks Obtained (Max: 100)</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Grade</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Absent</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{student.rollNo}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{student.name}</span></td>
                  <td className="px-6 py-4 text-center">
                    <input type="number" min="0" max="100" value={student.marks} disabled={student.absent} className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-[#2D62FF]" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {student.marks ? (parseInt(student.marks) >= 90 ? 'A+' : parseInt(student.marks) >= 75 ? 'A' : parseInt(student.marks) >= 60 ? 'B' : parseInt(student.marks) >= 50 ? 'C' : parseInt(student.marks) >= 35 ? 'D' : 'F') : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="checkbox" checked={student.absent} className="w-4 h-4 text-[#2D62FF] rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <input type="text" placeholder="Optional..." className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2D62FF]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button className="px-4 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6] flex items-center gap-2">
            <Check className="w-4 h-4" />
            Submit Marks
          </button>
        </div>
      </div>
    </div>
  );
};
