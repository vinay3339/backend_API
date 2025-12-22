import React, { useState } from 'react';
import { ArrowLeft, FileText, Users, UserPlus, FileX } from 'lucide-react';
import { StudentMasterReport } from './StudentMasterReport';

interface Report {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export const StudentReports: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports: Report[] = [
    {
      id: 'student-master',
      name: 'Student Master Report',
      description: 'Complete student information with all details',
      icon: FileText,
    },
    {
      id: 'enrollment-strength',
      name: 'Enrollment / Strength Report',
      description: 'Class-wise student strength with gender breakdown',
      icon: Users,
    },
    {
      id: 'new-admissions',
      name: 'New Admissions Report',
      description: 'Recently admitted students in current academic year',
      icon: UserPlus,
    },
    {
      id: 'tc-issued',
      name: 'TC Issued Report',
      description: 'Transfer certificates issued with reasons',
      icon: FileX,
    },
  ];

  if (selectedReport === 'student-master') {
    return <StudentMasterReport onBack={() => setSelectedReport(null)} />;
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={onBack} className="hover:text-gray-700">
          Dashboard
        </button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-gray-700">
          Reports
        </button>
        <span>/</span>
        <span className="text-gray-900">Student Reports</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-gray-900 mb-1">Student Reports</h1>
          <p className="text-gray-600">Access all student-related reports and analytics</p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
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
