import React, { useState } from 'react';
import { Plus, Edit2, Search } from 'lucide-react';

export const TransportStudentAssignment: React.FC = () => {
  const [filters, setFilters] = useState({
    academicYear: '2024-2025',
    class: 'all',
    section: 'all',
    searchQuery: '',
  });

  const students = [
    { id: '1', name: 'Aarav Kumar', class: '10', section: 'A', route: 'R-14', stop: 'Vijayawada Central', pickupTime: '07:00 AM', dropTime: '04:30 PM', fee: 3000, paymentStatus: 'paid' },
    { id: '2', name: 'Sai Priya', class: '10', section: 'A', route: 'R-22', stop: 'Guntur Road', pickupTime: '07:15 AM', dropTime: '04:45 PM', fee: 2500, paymentStatus: 'pending' },
    { id: '3', name: 'Divya Rani', class: '10', section: 'A', route: 'R-08', stop: 'Benz Circle', pickupTime: '07:30 AM', dropTime: '05:00 PM', fee: 2000, paymentStatus: 'paid' },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Academic Year</label>
            <select value={filters.academicYear} onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Class</label>
            <select value={filters.class} onChange={(e) => setFilters({ ...filters, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Classes</option>
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Section</label>
            <select value={filters.section} onChange={(e) => setFilters({ ...filters, section: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={filters.searchQuery} onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })} placeholder="Name" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Students</span>
          <p className="text-gray-900 mt-1">{students.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Transport Opted</span>
          <p className="text-green-600 mt-1">{students.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Fees Paid</span>
          <p className="text-blue-600 mt-1">{students.filter(s => s.paymentStatus === 'paid').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Fees Pending</span>
          <p className="text-red-600 mt-1">{students.filter(s => s.paymentStatus === 'pending').length}</p>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Student Transport Assignment</h3>
            <p className="text-sm text-gray-600 mt-1">Manage student route and stop assignments</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Assign Transport
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Class & Section</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Stop</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Pickup Time</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Drop Time</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Fee</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{student.name}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="text-gray-900">{student.class} - {student.section}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{student.route}</span></td>
                  <td className="px-6 py-4"><span className="text-gray-900">{student.stop}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="text-gray-900">{student.pickupTime}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="text-gray-900">{student.dropTime}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><span className="text-gray-900">₹{student.fee.toLocaleString('en-IN')}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center"><span className={`px-2.5 py-1 rounded-full text-xs ${student.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{student.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</span></div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"><Edit2 className="w-4 h-4" /></button>
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
