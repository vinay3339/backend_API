import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { TeacherDashboard } from './TeacherDashboard';
import { StudentAttendanceContent } from './StudentAttendanceContent';
import { StudentManagement } from './StudentManagement';
import { TeacherManagement } from './TeacherManagement';
import { ClassManagement } from './ClassManagement';
import { ClassCustomFields } from './ClassCustomFields';
import { AttendanceManagement } from './AttendanceManagement';
import { MarksExamsManagement } from './MarksExamsManagement';
import { FinanceManagement } from './FinanceManagement';
import { ReportsManagement } from './ReportsManagement';
import { TransportManagement } from './TransportManagement';
import { ExamsGrades } from './ExamsGrades';
import { SettingsManagement } from './SettingsManagement';
import { AdminExamSetup } from './AdminExamSetup';
import { TeacherMarksEntry } from './TeacherMarksEntry';
import { StudentMarksView } from './StudentMarksView';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Award,
  DollarSign,
  Bus,
  Library,
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  GraduationCap,
  ClipboardList,
  FileText,
  BarChart3,
  School,
  BookMarked,
  UserCheck,
  FileSpreadsheet,
  Settings,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface DashboardProps {
  schoolName: string;
  userName: string;
  userRole: string;
  onLogout: () => void;
}

export const Dashboard = ({ schoolName, userName, userRole, onLogout }: DashboardProps) => {
  // Route teachers to TeacherDashboard
  if (userRole === 'Teacher') {
    return <TeacherDashboard teacherName={userName} schoolName={schoolName} onLogout={onLogout} />;
  }

  const [activeModule, setActiveModule] = useState('dashboard');

  const handleModuleChange = (module: string) => {
    setActiveModule(module);
  };

  const renderModuleContent = () => {
    // Determine which dashboard to show based on role
    const isAdmin = userRole.includes('Admin');
    const isTeacher = userRole.includes('Teacher');

    switch (activeModule) {
      // Common modules
      case 'attendance':
        if (isAdmin) {
          return <AttendanceManagement />;
        } else if (isTeacher) {
          return <ModulePlaceholder title="Mark Attendance" icon={Calendar} description="Mark and manage attendance for your classes" />;
        }
        return <StudentAttendanceContent />;
      
      case 'settings':
        return <SettingsManagement />;
      
      // Student-specific modules
      case 'homework':
        return <ModulePlaceholder title="Homework" icon={BookOpen} description="View and submit your homework assignments" />;
      
      case 'marks':
      case 'my-marks':
        return <StudentMarksView />;
      
      case 'fees':
        return <ModulePlaceholder title="Fees" icon={DollarSign} description="View and pay your school fees" />;
      
      case 'transport':
        if (isAdmin) {
          return <TransportManagement />;
        }
        return <ModulePlaceholder title="Transport" icon={Bus} description="Track your school bus and transportation" />;
      
      case 'library':
        return <ModulePlaceholder title="Library" icon={Library} description="Browse and manage your library books" />;
      
      // Teacher-specific modules
      case 'my-classes':
        return <ModulePlaceholder title="My Classes" icon={School} description="View and manage your teaching classes" />;
      
      case 'assignments':
        return <ModulePlaceholder title="Assignments" icon={ClipboardList} description="Create and manage student assignments" />;
      
      case 'gradebook':
      case 'marks-entry':
        return <TeacherMarksEntry />;
      
      case 'schedule':
        return <ModulePlaceholder title="Schedule" icon={Clock} description="View your teaching schedule and timetable" />;
      
      case 'resources':
        return <ModulePlaceholder title="Resources" icon={BookMarked} description="Access teaching materials and resources" />;
      
      // Admin-specific modules
      case 'students':
        return <StudentManagement />;
      
      case 'teachers':
        return <TeacherManagement />;
      
      case 'classes':
        return <ClassManagement />;
      
      case 'marks-exams':
        return <MarksExamsManagement />;
      
      case 'exams-grades':
        return <ExamsGrades />;
      
      case 'attendance-reports':
        return <ModulePlaceholder title="Attendance Reports" icon={Calendar} description="View comprehensive attendance analytics" />;
      
      case 'finance':
        return <FinanceManagement />;
      
      case 'reports':
        return <ReportsManagement />;
      
      case 'dashboard':
      default:
        if (isAdmin) {
          return <AdminDashboardOverview onNavigate={handleModuleChange} />;
        } else if (isTeacher) {
          return <TeacherDashboardOverview onNavigate={handleModuleChange} />;
        }
        return <StudentDashboardOverview onNavigate={handleModuleChange} userRole={userRole} />;
    }
  };

  return (
    <DashboardLayout
      activeModule={activeModule}
      onModuleChange={handleModuleChange}
      schoolName={schoolName}
      userName={userName}
      userRole={userRole}
      onLogout={onLogout}
    >
      {renderModuleContent()}
    </DashboardLayout>
  );
}

// Student Dashboard Overview Component
interface DashboardOverviewProps {
  onNavigate: (module: string) => void;
  userRole?: string;
}

function StudentDashboardOverview({ onNavigate, userRole = 'Student' }: DashboardOverviewProps) {
  const quickStats = [
    { label: 'Attendance Rate', value: '94%', icon: Calendar, color: 'blue', change: '+2%' },
    { label: 'Pending Homework', value: '3', icon: BookOpen, color: 'orange', change: '-1' },
    { label: 'Average Marks', value: '85%', icon: Award, color: 'green', change: '+5%' },
    { label: 'Library Books', value: '2', icon: Library, color: 'purple', change: '0' },
  ];

  const recentActivities = [
    { title: 'Math Homework Submitted', time: '2 hours ago', icon: CheckCircle, color: 'green' },
    { title: 'Science Quiz - Score: 18/20', time: '1 day ago', icon: Award, color: 'blue' },
    { title: 'Marked Present', time: '2 days ago', icon: Calendar, color: 'green' },
    { title: 'Library Book Due Soon', time: '3 days ago', icon: Clock, color: 'orange' },
  ];

  // Get role badge color
  const getRoleBadgeColor = () => {
    if (userRole.includes('Admin')) return 'bg-purple-100 text-purple-700 border-purple-300';
    if (userRole.includes('Teacher')) return 'bg-blue-100 text-blue-700 border-blue-300';
    return 'bg-green-100 text-green-700 border-green-300';
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-gray-900 mb-0">Welcome Back! 👋</h1>
          <span className={`px-3 py-1 rounded-full text-xs border ${getRoleBadgeColor()}`}>
            {userRole}
          </span>
        </div>
        <p className="text-gray-600">Here's what's happening with your academics today.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            orange: 'bg-orange-50 text-orange-600 border-orange-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            purple: 'bg-purple-50 text-purple-600 border-purple-200',
          };

          return (
            <Card key={index} className="p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl ${colors[stat.color as keyof typeof colors]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-gray-900 mb-0">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 mb-0">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              const colors = {
                green: 'bg-green-100 text-green-600',
                blue: 'bg-blue-100 text-blue-600',
                orange: 'bg-orange-100 text-orange-600',
              };

              return (
                <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${colors[activity.color as keyof typeof colors]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm mb-0">{activity.title}</p>
                    <p className="text-gray-500 text-xs mb-0">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('attendance')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">View Attendance</p>
                <p className="text-xs text-gray-500 mb-0">Check your monthly record</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('homework')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all"
            >
              <BookOpen className="w-5 h-5 text-orange-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">Pending Homework</p>
                <p className="text-xs text-gray-500 mb-0">3 assignments due</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('marks')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <Award className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">View Marks</p>
                <p className="text-xs text-gray-500 mb-0">Check your grades</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('library')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              <Library className="w-5 h-5 text-purple-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">Library</p>
                <p className="text-xs text-gray-500 mb-0">2 books issued</p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Teacher Dashboard Overview Component
function TeacherDashboardOverview({ onNavigate }: { onNavigate: (module: string) => void }) {
  const quickStats = [
    { label: 'My Classes', value: '5', icon: School, color: 'blue', change: '+0' },
    { label: 'Total Students', value: '142', icon: Users, color: 'green', change: '+8' },
    { label: 'Pending Assignments', value: '12', icon: ClipboardList, color: 'orange', change: '-3' },
    { label: 'Avg Class Performance', value: '82%', icon: Award, color: 'purple', change: '+4%' },
  ];

  const recentActivities = [
    { title: 'Assignment submitted by Class 10-A', time: '1 hour ago', icon: CheckCircle, color: 'green' },
    { title: 'Grade 9-B - Math Quiz graded', time: '3 hours ago', icon: Award, color: 'blue' },
    { title: 'Class 10-A attendance marked', time: '1 day ago', icon: Calendar, color: 'green' },
    { title: 'New resource uploaded', time: '2 days ago', icon: BookMarked, color: 'purple' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-gray-900 mb-0">Teacher Dashboard 📚</h1>
          <span className="px-3 py-1 rounded-full text-xs border bg-blue-100 text-blue-700 border-blue-300">
            Teacher
          </span>
        </div>
        <p className="text-gray-600">Manage your classes and track student progress.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            orange: 'bg-orange-50 text-orange-600 border-orange-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            purple: 'bg-purple-50 text-purple-600 border-purple-200',
          };

          return (
            <Card key={index} className="p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl ${colors[stat.color as keyof typeof colors]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-gray-900 mb-0">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 mb-0">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              const colors = {
                green: 'bg-green-100 text-green-600',
                blue: 'bg-blue-100 text-blue-600',
                purple: 'bg-purple-100 text-purple-600',
              };

              return (
                <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${colors[activity.color as keyof typeof colors]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm mb-0">{activity.title}</p>
                    <p className="text-gray-500 text-xs mb-0">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('attendance')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">Mark Attendance</p>
                <p className="text-xs text-gray-500 mb-0">For today's classes</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('assignments')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all"
            >
              <ClipboardList className="w-5 h-5 text-orange-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">Create Assignment</p>
                <p className="text-xs text-gray-500 mb-0">Assign work to students</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('gradebook')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <Award className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">Enter Grades</p>
                <p className="text-xs text-gray-500 mb-0">Update gradebook</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('my-classes')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              <School className="w-5 h-5 text-purple-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">My Classes</p>
                <p className="text-xs text-gray-500 mb-0">View all classes</p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Admin Dashboard Overview Component
function AdminDashboardOverview({ onNavigate }: { onNavigate: (module: string) => void }) {
  const quickStats = [
    { label: 'Total Students', value: '1,248', icon: Users, color: 'blue', change: '+42' },
    { label: 'Total Teachers', value: '78', icon: GraduationCap, color: 'green', change: '+3' },
    { label: 'Active Classes', value: '45', icon: School, color: 'purple', change: '+2' },
    { label: 'Monthly Revenue', value: '$84.5k', icon: DollarSign, color: 'orange', change: '+12%' },
  ];

  const recentActivities = [
    { title: 'New student enrollment - Grade 9', time: '30 minutes ago', icon: UserCheck, color: 'green' },
    { title: 'Monthly fees report generated', time: '2 hours ago', icon: FileSpreadsheet, color: 'blue' },
    { title: 'Teacher Ms. Wilson added', time: '1 day ago', icon: GraduationCap, color: 'purple' },
    { title: 'Attendance rate: 94% this week', time: '2 days ago', icon: BarChart3, color: 'green' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-gray-900 mb-0">Admin Dashboard 🏫</h1>
          <span className="px-3 py-1 rounded-full text-xs border bg-purple-100 text-purple-700 border-purple-300">
            School Admin
          </span>
        </div>
        <p className="text-gray-600">Manage your school operations and monitor performance.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            orange: 'bg-orange-50 text-orange-600 border-orange-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            purple: 'bg-purple-50 text-purple-600 border-purple-200',
          };

          return (
            <Card key={index} className="p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl ${colors[stat.color as keyof typeof colors]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-gray-900 mb-0">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 mb-0">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              const colors = {
                green: 'bg-green-100 text-green-600',
                blue: 'bg-blue-100 text-blue-600',
                purple: 'bg-purple-100 text-purple-600',
              };

              return (
                <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${colors[activity.color as keyof typeof colors]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm mb-0">{activity.title}</p>
                    <p className="text-gray-500 text-xs mb-0">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('students')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <Users className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">Manage Students</p>
                <p className="text-xs text-gray-500 mb-0">1,248 total students</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('teachers')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <GraduationCap className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">Manage Teachers</p>
                <p className="text-xs text-gray-500 mb-0">78 active teachers</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('reports')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">View Reports</p>
                <p className="text-xs text-gray-500 mb-0">Analytics & insights</p>
              </div>
            </Button>

            <Button
              onClick={() => onNavigate('finance')}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all"
            >
              <DollarSign className="w-5 h-5 text-orange-600" />
              <div className="text-left">
                <p className="text-sm text-gray-900 mb-0">Finance</p>
                <p className="text-xs text-gray-500 mb-0">Fees & payments</p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Module Placeholder Component
function ModulePlaceholder({ title, icon: Icon, description }: { title: string; icon: any; description?: string }) {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">{title}</h1>
        <p className="text-gray-600">{description || 'This module is under development'}</p>
      </div>

      <Card className="p-12 rounded-2xl shadow-lg text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
          <Icon className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          This feature is coming soon. We're working hard to bring you the best experience.
        </p>
      </Card>
    </div>
  );
}