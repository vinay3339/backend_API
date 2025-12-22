import React from 'react';
import { Calendar, User, ArrowRight, MapPin, Bus, Users as UsersIcon } from 'lucide-react';

export const TransportAuditLog: React.FC = () => {
  const auditEntries = [
    {
      id: '1',
      action: 'Route Updated',
      icon: MapPin,
      affected: 'R-14 (Vijayawada Central)',
      oldValue: 'Pickup: 7:00 AM',
      newValue: 'Pickup: 7:15 AM',
      performedBy: 'Mrs. Administrator',
      timestamp: '2024-11-25T14:30:00',
    },
    {
      id: '2',
      action: 'Driver Assigned',
      icon: UsersIcon,
      affected: 'Ramesh Kumar → AP 16 AX 1234',
      oldValue: 'Unassigned',
      newValue: 'Assigned to Route R-14',
      performedBy: 'Mr. Transport Manager',
      timestamp: '2024-11-24T11:15:00',
    },
    {
      id: '3',
      action: 'Stop Added',
      icon: MapPin,
      affected: 'Benz Circle Stop',
      oldValue: '—',
      newValue: 'Added to Route R-14',
      performedBy: 'Mrs. Administrator',
      timestamp: '2024-11-23T09:45:00',
    },
    {
      id: '4',
      action: 'Vehicle Updated',
      icon: Bus,
      affected: 'AP 16 BX 5678',
      oldValue: 'Insurance: 2024-12-31',
      newValue: 'Insurance: 2025-12-31',
      performedBy: 'Mr. Transport Manager',
      timestamp: '2024-11-22T16:20:00',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Activities</span>
          <p className="text-gray-900 mt-1">{auditEntries.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Route Changes</span>
          <p className="text-blue-600 mt-1">1</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Vehicle Updates</span>
          <p className="text-green-600 mt-1">1</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Driver Changes</span>
          <p className="text-purple-600 mt-1">1</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Activity Log</h3>
          <p className="text-sm text-gray-600 mt-1">Track all transport management activities</p>
        </div>

        <div className="divide-y divide-gray-200">
          {auditEntries.map((entry) => {
            const Icon = entry.icon;
            return (
              <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-gray-900">{entry.action}</span>
                        <p className="text-sm text-gray-600 mt-1">{entry.affected}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(entry.timestamp).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{entry.performedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm">
                      <span className="text-red-600">{entry.oldValue}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-green-600">{entry.newValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 p-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700">Load More</button>
        </div>
      </div>
    </div>
  );
};
