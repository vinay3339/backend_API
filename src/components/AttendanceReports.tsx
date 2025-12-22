import React from 'react';
import { ArrowLeft, Calendar, Users, AlertTriangle, BarChart3 } from 'lucide-react';

export const AttendanceReports: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const reports = [
    { id: '1', name: 'Daily Attendance Report', description: 'View daily attendance summary with present/absent counts', icon: Calendar },
    { id: '2', name: 'Monthly Attendance Report', description: 'Student-wise monthly attendance with percentages', icon: BarChart3 },
    { id: '3', name: 'Defaulters Report (< 75%)', description: 'Students with attendance below 75%', icon: AlertTriangle },
    { id: '4', name: 'Class-wise Attendance', description: 'Class-wise attendance analysis and trends', icon: Users },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={onBack} className="hover:text-gray-700">Dashboard</button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-gray-700">Reports</button>
        <span>/</span>
        <span className="text-gray-900">Attendance Reports</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-gray-900 mb-1">Attendance Reports</h1>
          <p className="text-gray-600">Access attendance analytics and summaries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Report
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
