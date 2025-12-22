import React from 'react';
import { Clock, CalendarDays, ClipboardCheck, FileText, TrendingUp, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

interface TeacherHomeProps {
  teacherName: string;
}

export const TeacherHome: React.FC<TeacherHomeProps> = ({ teacherName }) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

  const todayTimetable = [
    { period: '1', time: '08:00 - 08:45', class: 'Class 10-A', subject: 'Mathematics' },
    { period: '2', time: '08:50 - 09:35', class: 'Class 9-B', subject: 'Mathematics' },
    { period: '3', time: '09:40 - 10:25', class: 'Class 10-A', subject: 'Mathematics' },
    { period: '4', time: '10:50 - 11:35', class: 'Class 8-A', subject: 'Mathematics' },
    { period: '6', time: '12:30 - 13:15', class: 'Class 9-A', subject: 'Mathematics' },
  ];

  const pendingTasks = [
    { id: '1', type: 'attendance', message: 'Attendance not marked for Class 10-A', priority: 'high' },
    { id: '2', type: 'marks', message: 'FA1 marks pending for Class 9-B - Mathematics', priority: 'medium' },
    { id: '3', type: 'homework', message: '15 homework submissions pending review (Class 8-A)', priority: 'low' },
  ];

  const recentActivity = [
    { id: '1', action: 'Homework posted', detail: 'Chapter 5 - Quadratic Equations (Class 10-A)', time: '2 hours ago', icon: FileText },
    { id: '2', action: 'Marks updated', detail: 'FA1 Mathematics - Class 9-A (35 students)', time: '5 hours ago', icon: TrendingUp },
    { id: '3', action: 'Attendance marked', detail: 'Class 10-A - 40/42 present', time: '1 day ago', icon: CheckCircle },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Greeting Section */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">{greeting}, {teacherName.split(' ')[1] || teacherName} 👋</h1>
        <p className="text-gray-600">Here's what's happening with your classes today</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#2D62FF] hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-[#EBF1FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2D62FF] transition-colors">
            <ClipboardCheck className="w-6 h-6 text-[#2D62FF] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-gray-900 mb-1">Mark Attendance</h3>
          <p className="text-sm text-gray-600">Take attendance for your classes</p>
        </button>

        <button className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#2D62FF] hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-[#FFF5E6] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#F1C40F] transition-colors">
            <FileText className="w-6 h-6 text-[#F1C40F] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-gray-900 mb-1">Give Homework</h3>
          <p className="text-sm text-gray-600">Assign homework to students</p>
        </button>

        <button className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#2D62FF] hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-[#E6F7F1] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2ECC71] transition-colors">
            <TrendingUp className="w-6 h-6 text-[#2ECC71] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-gray-900 mb-1">Enter Marks</h3>
          <p className="text-sm text-gray-600">Update exam marks</p>
        </button>

        <button className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#2D62FF] hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-[#F3E6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#9B59B6] transition-colors">
            <MessageSquare className="w-6 h-6 text-[#9B59B6] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-gray-900 mb-1">Make Announcement</h3>
          <p className="text-sm text-gray-600">Send message to students/parents</p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-[#2D62FF]" />
              <h3 className="text-gray-900">Today's Timetable</h3>
            </div>
            <span className="text-sm text-gray-600">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {todayTimetable.map((slot) => (
                <div key={slot.period} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 text-center">
                    <div className="w-12 h-12 bg-[#EBF1FF] rounded-lg flex items-center justify-center">
                      <span className="text-[#2D62FF]">{slot.period}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900">{slot.class}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-[#2D62FF]">{slot.subject}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{slot.time}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm text-[#2D62FF] hover:bg-[#EBF1FF] rounded-lg transition-colors">
                    Mark Attendance
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#F1C40F]" />
            <h3 className="text-gray-900">Pending Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className={`p-4 rounded-lg border ${task.priority === 'high' ? 'border-red-200 bg-red-50' : task.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                    <p className="text-sm text-gray-900 flex-1">{task.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#EBF1FF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#2D62FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
