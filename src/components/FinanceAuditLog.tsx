import React, { useState } from 'react';
import { Filter, Calendar, User, ArrowRight, Download } from 'lucide-react';

export const FinanceAuditLog: React.FC = () => {
  const [filters, setFilters] = useState({
    action: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const auditEntries = [
    {
      id: '1',
      action: 'Payment Added',
      student: 'Divya Rani - RA-2024-1004',
      category: 'Tuition Fee - Third Installment',
      oldValue: '₹0',
      newValue: '₹20,000',
      performedBy: 'Mrs. Administrator',
      timestamp: '2024-11-25T14:30:00',
    },
    {
      id: '2',
      action: 'Payment Edited',
      student: 'Aarav Kumar - RA-2024-1001',
      category: 'Lab Fee',
      oldValue: '₹4,500',
      newValue: '₹5,000',
      performedBy: 'Mr. Finance Officer',
      timestamp: '2024-11-24T11:15:00',
    },
    {
      id: '3',
      action: 'Concession Applied',
      student: 'Sai Priya - RA-2024-1002',
      category: 'Tuition Fee',
      oldValue: '₹50,000',
      newValue: '₹45,000 (10% sibling discount)',
      performedBy: 'Mrs. Administrator',
      timestamp: '2024-11-23T09:45:00',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-gray-900">Filter Activity</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Action Type</label>
            <select value={filters.action} onChange={(e) => setFilters({ ...filters, action: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Actions</option>
              <option value="payment-added">Payment Added</option>
              <option value="payment-edited">Payment Edited</option>
              <option value="payment-deleted">Payment Deleted</option>
              <option value="concession-applied">Concession Applied</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">From Date</label>
            <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">To Date</label>
            <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Activities</span>
          <p className="text-gray-900 mt-1">{auditEntries.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Payments Added</span>
          <p className="text-green-600 mt-1">1</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Payments Edited</span>
          <p className="text-blue-600 mt-1">1</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Concessions Applied</span>
          <p className="text-purple-600 mt-1">1</p>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Activity Log</h3>
            <p className="text-sm text-gray-600 mt-1">Track all financial transactions and changes</p>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {auditEntries.map((entry) => (
            <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-gray-900">{entry.action}</span>
                      <p className="text-sm text-gray-600 mt-1">{entry.student} • {entry.category}</p>
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
          ))}
        </div>

        <div className="border-t border-gray-200 p-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700">Load More Activity</button>
        </div>
      </div>
    </div>
  );
};
