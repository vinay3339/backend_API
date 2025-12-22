import React, { useState } from 'react';
import { Search, User, Eye, ChevronRight, Calendar, AlertCircle } from 'lucide-react';

interface StudentFee {
  id: string;
  studentId: string;
  name: string;
  admissionNumber: string;
  class: string;
  section: string;
  photo?: string;
  totalAnnualFee: number;
  totalPaid: number;
  outstanding: number;
  nextDueDate: string;
  nextDueAmount: number;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
}

export const StudentFees: React.FC = () => {
  const [filters, setFilters] = useState({
    academicYear: '2024-2025',
    class: 'all',
    section: 'all',
    searchQuery: '',
  });

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const [studentFees] = useState<StudentFee[]>([
    {
      id: '1',
      studentId: '1004',
      name: 'Divya Rani',
      admissionNumber: 'RA-2024-1004',
      class: '10',
      section: 'A',
      totalAnnualFee: 60000,
      totalPaid: 60000,
      outstanding: 0,
      nextDueDate: '2024-12-31',
      nextDueAmount: 0,
      status: 'paid',
    },
    {
      id: '2',
      studentId: '1001',
      name: 'Aarav Kumar',
      admissionNumber: 'RA-2024-1001',
      class: '10',
      section: 'A',
      totalAnnualFee: 60000,
      totalPaid: 40000,
      outstanding: 20000,
      nextDueDate: '2024-12-31',
      nextDueAmount: 20000,
      status: 'partial',
    },
    {
      id: '3',
      studentId: '1002',
      name: 'Sai Priya',
      admissionNumber: 'RA-2024-1002',
      class: '10',
      section: 'A',
      totalAnnualFee: 60000,
      totalPaid: 20000,
      outstanding: 40000,
      nextDueDate: '2024-09-30',
      nextDueAmount: 20000,
      status: 'overdue',
    },
    {
      id: '4',
      studentId: '1005',
      name: 'Krishna Reddy',
      admissionNumber: 'RA-2024-1005',
      class: '10',
      section: 'A',
      totalAnnualFee: 60000,
      totalPaid: 0,
      outstanding: 60000,
      nextDueDate: '2024-06-30',
      nextDueAmount: 20000,
      status: 'overdue',
    },
    {
      id: '5',
      studentId: '1008',
      name: 'Anjali Sharma',
      admissionNumber: 'RA-2024-1008',
      class: '10',
      section: 'A',
      totalAnnualFee: 60000,
      totalPaid: 40000,
      outstanding: 20000,
      nextDueDate: '2024-12-31',
      nextDueAmount: 20000,
      status: 'partial',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'partial':
        return 'bg-orange-100 text-orange-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Fully Paid';
      case 'partial':
        return 'Partially Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };

  const filteredStudents = studentFees.filter((student) => {
    if (filters.class !== 'all' && student.class !== filters.class) return false;
    if (filters.section !== 'all' && student.section !== filters.section) return false;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        student.name.toLowerCase().includes(query) ||
        student.admissionNumber.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const stats = {
    totalStudents: filteredStudents.length,
    fullyPaid: filteredStudents.filter((s) => s.status === 'paid').length,
    partiallyPaid: filteredStudents.filter((s) => s.status === 'partial').length,
    overdue: filteredStudents.filter((s) => s.status === 'overdue').length,
    totalOutstanding: filteredStudents.reduce((sum, s) => sum + s.outstanding, 0),
    totalCollected: filteredStudents.reduce((sum, s) => sum + s.totalPaid, 0),
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <label className="block text-sm text-gray-700 mb-2">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Name or Roll No"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Students</span>
          <p className="text-gray-900 mt-1">{stats.totalStudents}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Fully Paid</span>
          <p className="text-green-600 mt-1">{stats.fullyPaid}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Partially Paid</span>
          <p className="text-orange-600 mt-1">{stats.partiallyPaid}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Overdue</span>
          <p className="text-red-600 mt-1">{stats.overdue}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Collected</span>
          <p className="text-green-600 mt-1">₹{stats.totalCollected.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Outstanding</span>
          <p className="text-red-600 mt-1">₹{stats.totalOutstanding.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Student Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-900 truncate">{student.name}</h4>
                <p className="text-sm text-gray-600">{student.admissionNumber}</p>
                <p className="text-sm text-gray-600">
                  Class {student.class} - {student.section}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Annual Fee</span>
                <span className="text-gray-900">
                  ₹{student.totalAnnualFee.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Paid</span>
                <span className="text-green-600">
                  ₹{student.totalPaid.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Outstanding</span>
                <span className="text-red-600">
                  ₹{student.outstanding.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Payment Progress</span>
                  <span>{Math.round((student.totalPaid / student.totalAnnualFee) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{
                      width: `${(student.totalPaid / student.totalAnnualFee) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {student.outstanding > 0 && (
              <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 border border-orange-200 rounded-lg mb-4">
                {student.status === 'overdue' ? (
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                ) : (
                  <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={student.status === 'overdue' ? 'text-red-700' : 'text-orange-700'}>
                    Next Due: ₹{student.nextDueAmount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(student.nextDueDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full text-xs ${getStatusColor(student.status)}`}>
                {getStatusLabel(student.status)}
              </span>
              <button
                onClick={() => setSelectedStudent(student.id)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
};
