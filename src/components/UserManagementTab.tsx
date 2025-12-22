import React, { useState } from 'react';
import { Plus, Eye, RefreshCw, Ban, Search } from 'lucide-react';

export const UserManagementTab: React.FC = () => {
  const [filters, setFilters] = useState({ search: '', role: 'all' });
  const users = [
    { id: '1', name: 'Mrs. Administrator', role: 'Admin', username: 'admin2', email: 'admin@riverside.edu', status: 'active', lastLogin: '2024-11-30 09:15 AM' },
    { id: '2', name: 'Mr. Rajesh Kumar', role: 'Teacher', username: 'teacher1', email: 'rajesh@riverside.edu', status: 'active', lastLogin: '2024-11-29 02:30 PM' },
    { id: '3', name: 'Mrs. Priya Sharma', role: 'Teacher', username: 'teacher2', email: 'priya@riverside.edu', status: 'active', lastLogin: '2024-11-29 11:45 AM' },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Search User</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="Search by name, username, or email" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Role Filter</label>
            <select value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Parent">Parent</option>
              <option value="Student">Student</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">All Users</h3>
            <p className="text-sm text-gray-600 mt-1">Manage system users and access</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Last Login</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{user.name}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{user.role}</span></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{user.username}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{user.email}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span></div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="text-sm text-gray-900">{user.lastLogin}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="View"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded" title="Reset Password"><RefreshCw className="w-4 h-4" /></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Disable"><Ban className="w-4 h-4" /></button>
                    </div>
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
