import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';

export const TeacherStudents: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: '1', rollNo: '1', name: 'Aarav Kumar', admissionNo: 'RA2024001', parentContact: '+91 98765 43210', attendance: '95%', avgMarks: '85%' },
    { id: '2', rollNo: '2', name: 'Ananya Reddy', admissionNo: 'RA2024002', parentContact: '+91 98765 43211', attendance: '92%', avgMarks: '92%' },
    { id: '3', rollNo: '3', name: 'Arjun Singh', admissionNo: 'RA2024003', parentContact: '+91 98765 43212', attendance: '88%', avgMarks: '75%' },
    { id: '4', rollNo: '4', name: 'Diya Sharma', admissionNo: 'RA2024004', parentContact: '+91 98765 43213', attendance: '96%', avgMarks: '88%' },
    { id: '5', rollNo: '5', name: 'Ishaan Patel', admissionNo: 'RA2024005', parentContact: '+91 98765 43214', attendance: '90%', avgMarks: '82%' },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">My Students</h1>
        <p className="text-gray-600">View and manage students from your assigned classes</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Class & Section</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]">
              <option>Class 10-A</option>
              <option>Class 9-A</option>
              <option>Class 9-B</option>
              <option>Class 8-A</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name or admission no..." className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]" />
            </div>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">{selectedClass} - Students ({students.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Roll No</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Admission No</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Parent Contact</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Attendance</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Avg Marks</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{student.rollNo}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{student.name}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{student.admissionNo}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{student.parentContact}</span></td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs ${parseInt(student.attendance) >= 90 ? 'bg-green-100 text-green-700' : parseInt(student.attendance) >= 75 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {student.attendance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs ${parseInt(student.avgMarks) >= 75 ? 'bg-green-100 text-green-700' : parseInt(student.avgMarks) >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {student.avgMarks}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
