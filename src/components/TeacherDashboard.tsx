import React, { useState } from 'react';
import { BookOpen, Calendar, ClipboardCheck, FileText, Users, MessageSquare, UserCircle, Settings, LogOut, Home, Bell, Search, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { TeacherHome } from './TeacherHome';
import { TeacherMyClasses } from './TeacherMyClasses';
import { TeacherAttendance } from './TeacherAttendance';
import { TeacherHomework } from './TeacherHomework';
import { TeacherMarksExams } from './TeacherMarksExams';
import { TeacherStudents } from './TeacherStudents';
import { TeacherCommunication } from './TeacherCommunication';
import { TeacherProfile } from './TeacherProfile';
import { TeacherSettings } from './TeacherSettings';

interface TeacherDashboardProps {
  teacherName: string;
  schoolName: string;
  onLogout: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacherName,
  schoolName,
  onLogout,
}) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'my-classes', label: 'My Classes', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'homework', label: 'Homework & Materials', icon: FileText },
    { id: 'marks-exams', label: 'Marks & Exams', icon: TrendingUp },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'my-profile', label: 'My Profile', icon: UserCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <TeacherHome teacherName={teacherName} />;
      case 'my-classes':
        return <TeacherMyClasses />;
      case 'attendance':
        return <TeacherAttendance />;
      case 'homework':
        return <TeacherHomework />;
      case 'marks-exams':
        return <TeacherMarksExams />;
      case 'students':
        return <TeacherStudents />;
      case 'communication':
        return <TeacherCommunication />;
      case 'my-profile':
        return <TeacherProfile />;
      case 'settings':
        return <TeacherSettings />;
      default:
        return <TeacherHome teacherName={teacherName} />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2D62FF] to-[#1C4FE6] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">🎓</span>
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <h2 className="text-gray-900 truncate">Teacher Portal</h2>
                <p className="text-xs text-gray-500 truncate">{schoolName}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                  isActive
                    ? 'bg-[#EBF1FF] text-[#2D62FF]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, classes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Teacher Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm text-gray-900">{teacherName}</p>
                <p className="text-xs text-gray-500">Teacher</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#2D62FF] to-[#1C4FE6] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">{getInitials(teacherName)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
