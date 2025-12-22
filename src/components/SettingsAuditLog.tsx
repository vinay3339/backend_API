import React, { useState } from 'react';
import { Calendar, User, Settings, ArrowRight } from 'lucide-react';

export const SettingsAuditLog: React.FC = () => {
  const [filters, setFilters] = useState({ module: 'all', user: 'all', dateFrom: '', dateTo: '' });

  const activities = [
    { id: '1', action: 'School Profile Updated', module: 'School Profile', user: 'Mrs. Administrator', oldValue: 'Phone: +91 98765 00000', newValue: 'Phone: +91 98765 43210', timestamp: '2024-11-30T14:30:00', device: '192.168.1.100' },
    { id: '2', action: 'Academic Year Changed', module: 'Academic Settings', user: 'Mrs. Administrator', oldValue: '2023-2024', newValue: '2024-2025', timestamp: '2024-11-29T11:15:00', device: '192.168.1.100' },
    { id: '3', action: 'User Role Assigned', module: 'User Management', user: 'Mrs. Administrator', oldValue: 'Teacher', newValue: 'Class Teacher', timestamp: '2024-11-28T09:45:00', device: '192.168.1.100' },
    { id: '4', action: 'Permission Updated', module: 'Roles & Permissions', user: 'Mrs. Administrator', oldValue: 'View Only', newValue: 'Edit Allowed', timestamp: '2024-11-27T16:20:00', device: '192.168.1.100' },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Module</label>
            <select value={filters.module} onChange={(e) => setFilters({ ...filters, module: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Modules</option>
              <option value="school-profile">School Profile</option>
              <option value="academic">Academic Settings</option>
              <option value="user-mgmt">User Management</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">User</label>
            <select value={filters.user} onChange={(e) => setFilters({ ...filters, user: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Users</option>
              <option value="admin">Mrs. Administrator</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Date From</label>
            <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Date To</label>
            <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Activity Log</h3>
          <p className="text-sm text-gray-600 mt-1">Track all settings changes and modifications</p>
        </div>

        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-gray-900">{activity.action}</span>
                      <p className="text-sm text-gray-600 mt-1">Module: {activity.module}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(activity.timestamp).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm">
                    <span className="text-red-600">{activity.oldValue}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-green-600">{activity.newValue}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Device/IP: {activity.device}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700">Load More Activity</button>
        </div>
      </div>
    </div>
  );
};
