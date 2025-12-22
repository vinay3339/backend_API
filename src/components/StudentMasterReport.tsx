import React, { useState } from 'react';
import { ArrowLeft, Download, FileSpreadsheet, Printer, Search, Filter } from 'lucide-react';

interface Student {
  admissionNo: string;
  name: string;
  gender: string;
  class: string;
  section: string;
  dob: string;
  parentContact: string;
  casteCategory: string;
  status: 'active' | 'inactive';
}

export const StudentMasterReport: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [filters, setFilters] = useState({
    academicYear: '2024-2025',
    class: 'all',
    section: 'all',
    gender: 'all',
    status: 'all',
    searchQuery: '',
  });

  const [students] = useState<Student[]>([
    {
      admissionNo: 'RA-2024-1001',
      name: 'Aarav Kumar',
      gender: 'Male',
      class: '10',
      section: 'A',
      dob: '2009-05-15',
      parentContact: '+91 98765 43210',
      casteCategory: 'OC',
      status: 'active',
    },
    {
      admissionNo: 'RA-2024-1002',
      name: 'Sai Priya',
      gender: 'Female',
      class: '10',
      section: 'A',
      dob: '2009-08-22',
      parentContact: '+91 98765 43211',
      casteCategory: 'BC',
      status: 'active',
    },
    {
      admissionNo: 'RA-2024-1004',
      name: 'Divya Rani',
      gender: 'Female',
      class: '10',
      section: 'A',
      dob: '2009-03-10',
      parentContact: '+91 98765 43212',
      casteCategory: 'OC',
      status: 'active',
    },
    {
      admissionNo: 'RA-2024-1005',
      name: 'Krishna Reddy',
      gender: 'Male',
      class: '10',
      section: 'A',
      dob: '2009-11-28',
      parentContact: '+91 98765 43213',
      casteCategory: 'SC',
      status: 'active',
    },
    {
      admissionNo: 'RA-2024-1008',
      name: 'Anjali Sharma',
      gender: 'Female',
      class: '10',
      section: 'A',
      dob: '2009-07-05',
      parentContact: '+91 98765 43214',
      casteCategory: 'OC',
      status: 'active',
    },
  ]);

  const filteredStudents = students.filter((student) => {
    if (filters.class !== 'all' && student.class !== filters.class) return false;
    if (filters.section !== 'all' && student.section !== filters.section) return false;
    if (filters.gender !== 'all' && student.gender.toLowerCase() !== filters.gender) return false;
    if (filters.status !== 'all' && student.status !== filters.status) return false;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        student.name.toLowerCase().includes(query) ||
        student.admissionNo.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const stats = {
    totalStudents: filteredStudents.length,
    maleStudents: filteredStudents.filter((s) => s.gender === 'Male').length,
    femaleStudents: filteredStudents.filter((s) => s.gender === 'Female').length,
    activeStudents: filteredStudents.filter((s) => s.status === 'active').length,
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button className="hover:text-gray-700">Dashboard</button>
        <span>/</span>
        <button className="hover:text-gray-700">Reports</button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-gray-700">
          Student Reports
        </button>
        <span>/</span>
        <span className="text-gray-900">Student Master Report</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-gray-900 mb-1">Student Master Report</h1>
            <p className="text-gray-600">
              Complete student information with all details
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export as Excel
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Export as PDF
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Academic Year</label>
            <select
              value={filters.academicYear}
              onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Class</label>
            <select
              value={filters.class}
              onChange={(e) => setFilters({ ...filters, class: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
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
              <option value="all">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Gender</label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Name or Admission No"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Students</span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm">👥</span>
            </div>
          </div>
          <p className="text-gray-900">{stats.totalStudents}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Male Students</span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm">👨</span>
            </div>
          </div>
          <p className="text-blue-600">{stats.maleStudents}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Female Students</span>
            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-pink-600 text-sm">👩</span>
            </div>
          </div>
          <p className="text-pink-600">{stats.femaleStudents}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Students</span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-sm">✓</span>
            </div>
          </div>
          <p className="text-green-600">{stats.activeStudents}</p>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Student List</h3>
          <p className="text-sm text-gray-600 mt-1">
            Showing {filteredStudents.length} students
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Admission No
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Class & Section
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Parent Contact
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Caste Category
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.admissionNo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600">{student.admissionNo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{student.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs ${
                        student.gender === 'Male'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {student.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">
                      {student.class} - {student.section}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">
                      {new Date(student.dob).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{student.parentContact}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {student.casteCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs ${
                        student.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {student.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination / Load More */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredStudents.length} of {students.length} students
          </p>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
