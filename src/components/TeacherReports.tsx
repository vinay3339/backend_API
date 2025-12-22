import React from 'react';
import { ArrowLeft, FileText, BarChart3, Calendar, Coffee } from 'lucide-react';

export const TeacherReports: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const reports = [
    { id: '1', name: 'Teacher Master Report', description: 'Complete teacher information with department and designation', icon: FileText },
    { id: '2', name: 'Teacher Workload Report', description: 'Teaching hours, periods, and classes assigned', icon: BarChart3 },
    { id: '3', name: 'Teacher Attendance Report', description: 'Teacher attendance with present/absent days and leaves', icon: Calendar },
    { id: '4', name: 'Leave Analysis', description: 'Leave patterns and balance analysis', icon: Coffee },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={onBack} className="hover:text-gray-700">Dashboard</button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-gray-700">Reports</button>
        <span>/</span>
        <span className="text-gray-900">Teacher Reports</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-gray-900 mb-1">Teacher Reports</h1>
          <p className="text-gray-600">Access teacher-related analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-orange-600" />
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
