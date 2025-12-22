import React, { useState } from 'react';
import { Users, Calendar, Award, GraduationCap, DollarSign, Bus, Settings, FileText, TrendingUp, ChevronRight } from 'lucide-react';
import { StudentReports } from './StudentReports';
import { AttendanceReports } from './AttendanceReports';
import { MarksExamsReports } from './MarksExamsReports';
import { TeacherReports } from './TeacherReports';
import { FinanceReportsCategory } from './FinanceReportsCategory';
import { TransportReports } from './TransportReports';
import { SystemReports } from './SystemReports';

export const ReportsManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const reportCategories = [
    {
      id: 'student-reports',
      title: 'Student Reports',
      subtitle: 'View all student-related reports',
      icon: Users,
      color: 'blue',
      quickLinks: [
        'Student Master Report',
        'Enrollment / Strength Report',
        'New Admissions Report',
        'TC Issued Report',
      ],
    },
    {
      id: 'attendance-reports',
      title: 'Attendance Reports',
      subtitle: 'View attendance analytics and summaries',
      icon: Calendar,
      color: 'green',
      quickLinks: [
        'Daily Attendance Report',
        'Monthly Attendance Report',
        'Defaulters Report (< 75%)',
        'Class-wise Attendance',
      ],
    },
    {
      id: 'marks-exams-reports',
      title: 'Marks & Exams Reports',
      subtitle: 'View academic performance reports',
      icon: Award,
      color: 'purple',
      quickLinks: [
        'Class-wise Marks Report',
        'Student-wise Marks Report',
        'Topper Report',
        'Grade Distribution',
      ],
    },
    {
      id: 'teacher-reports',
      title: 'Teacher Reports',
      subtitle: 'View teacher-related analytics',
      icon: GraduationCap,
      color: 'orange',
      quickLinks: [
        'Teacher Master Report',
        'Teacher Workload Report',
        'Teacher Attendance Report',
        'Leave Analysis',
      ],
    },
    {
      id: 'finance-reports',
      title: 'Finance Reports',
      subtitle: 'View financial reports and analytics',
      icon: DollarSign,
      color: 'emerald',
      quickLinks: [
        'Daily Collection Report',
        'Outstanding Report',
        'Defaulters Fee Report',
        'Category-wise Collection',
      ],
    },
    {
      id: 'transport-reports',
      title: 'Transport Reports',
      subtitle: 'View transport and route analytics',
      icon: Bus,
      color: 'cyan',
      quickLinks: [
        'Route Strength Report',
        'Transport Attendance',
        'Driver/Vehicle Report',
        'Route-wise Collection',
      ],
    },
    {
      id: 'system-reports',
      title: 'System Reports',
      subtitle: 'View system logs and activities',
      icon: Settings,
      color: 'gray',
      quickLinks: [
        'Login Report',
        'Activity Log Report',
        'Data Export Center',
        'User Activity Analysis',
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600',
      emerald: 'bg-emerald-50 text-emerald-600',
      cyan: 'bg-cyan-50 text-cyan-600',
      gray: 'bg-gray-50 text-gray-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (selectedCategory) {
    switch (selectedCategory) {
      case 'student-reports':
        return <StudentReports onBack={() => setSelectedCategory(null)} />;
      case 'attendance-reports':
        return <AttendanceReports onBack={() => setSelectedCategory(null)} />;
      case 'marks-exams-reports':
        return <MarksExamsReports onBack={() => setSelectedCategory(null)} />;
      case 'teacher-reports':
        return <TeacherReports onBack={() => setSelectedCategory(null)} />;
      case 'finance-reports':
        return <FinanceReportsCategory onBack={() => setSelectedCategory(null)} />;
      case 'transport-reports':
        return <TransportReports onBack={() => setSelectedCategory(null)} />;
      case 'system-reports':
        return <SystemReports onBack={() => setSelectedCategory(null)} />;
      default:
        return null;
    }
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900">Reports</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Reports Dashboard</h1>
        <p className="text-gray-600">
          Access comprehensive reports and analytics across all modules
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Reports</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-gray-900">35+</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Categories</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-gray-900">{reportCategories.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">This Month</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-gray-900">248 Generated</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Most Used</span>
            <Award className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-gray-900">Daily Collection</p>
        </div>
      </div>

      {/* Report Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${getColorClasses(category.color)} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-sm text-gray-700 mb-3">Quick Access</h4>
                <div className="space-y-2">
                  {category.quickLinks.map((link, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category.id);
                      }}
                    >
                      <span>{link}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-6">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  View All Reports
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
