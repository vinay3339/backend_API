import React, { useState } from 'react';
import { Download, FileText, TrendingUp } from 'lucide-react';

export const FinanceReports: React.FC = () => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    class: 'all',
    section: 'all',
    category: 'all',
    paymentMode: 'all',
  });

  const reports = [
    { id: '1', name: 'Daily Fee Collection Report', description: 'View daily fee collection summary', icon: FileText },
    { id: '2', name: 'Monthly Fee Collection', description: 'Month-wise fee collection analysis', icon: TrendingUp },
    { id: '3', name: 'Outstanding Report', description: 'Students with pending fees', icon: FileText },
    { id: '4', name: 'Defaulters List', description: 'Students with overdue payments', icon: FileText },
    { id: '5', name: 'Category-wise Collection', description: 'Fee collection by category', icon: TrendingUp },
    { id: '6', name: 'Class-wise Collection', description: 'Fee collection by class', icon: TrendingUp },
    { id: '7', name: 'Concession Report', description: 'Applied concessions summary', icon: FileText },
    { id: '8', name: 'Transport Fee Report', description: 'Transport fee collection', icon: FileText },
    { id: '9', name: 'Hostel Fee Report', description: 'Hostel fee collection', icon: FileText },
    { id: '10', name: 'Payment Mode Breakdown', description: 'Analysis by payment mode', icon: TrendingUp },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Report Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">From Date</label>
            <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">To Date</label>
            <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Class</label>
            <select value={filters.class} onChange={(e) => setFilters({ ...filters, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Classes</option>
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Collection</span>
          <p className="text-green-600 mt-1">₹45,50,000</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Outstanding</span>
          <p className="text-red-600 mt-1">₹8,50,000</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Collection Rate</span>
          <p className="text-blue-600 mt-1">84.3%</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Defaulters</span>
          <p className="text-orange-600 mt-1">12</p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 mb-1">{report.name}</h4>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">View Report</button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
