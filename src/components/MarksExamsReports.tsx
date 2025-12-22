import React from 'react';
import { ArrowLeft, BarChart3, Award, TrendingDown, PieChart } from 'lucide-react';

export const MarksExamsReports: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const reports = [
    { id: '1', name: 'Class-wise Marks Report', description: 'Subject-wise average marks with highest and lowest', icon: BarChart3 },
    { id: '2', name: 'Student-wise Marks Report', description: 'Individual student performance across subjects', icon: Award },
    { id: '3', name: 'Topper Report', description: 'Class toppers and subject-wise toppers', icon: Award },
    { id: '4', name: 'Failure Report', description: 'Students who failed in one or more subjects', icon: TrendingDown },
    { id: '5', name: 'Grade Distribution', description: 'Grade-wise student distribution with charts', icon: PieChart },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={onBack} className="hover:text-gray-700">Dashboard</button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-gray-700">Reports</button>
        <span>/</span>
        <span className="text-gray-900">Marks & Exams Reports</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-gray-900 mb-1">Marks & Exams Reports</h1>
          <p className="text-gray-600">Access academic performance reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-purple-600" />
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
