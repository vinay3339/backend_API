import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface AttendanceDay {
  date: number;
  status: 'present' | 'absent' | 'holiday' | null;
  reason?: string;
}

export function StudentAttendanceContent() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // November 2025
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Generate calendar data for the current month
  const generateCalendarDays = (): AttendanceDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: AttendanceDay[] = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: 0, status: null });
    }
    
    // Add actual days with mock attendance data
    for (let date = 1; date <= daysInMonth; date++) {
      const dayOfWeek = new Date(year, month, date).getDay();
      let status: 'present' | 'absent' | 'holiday' | null;
      let reason: string | undefined;
      
      // Mock data: weekends are holidays, random absences
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        status = 'holiday';
        reason = 'Weekend';
      } else if ([11, 26].includes(date)) {
        status = 'holiday';
        reason = date === 26 ? 'Thanksgiving' : 'Veterans Day';
      } else if ([5, 12, 19].includes(date)) {
        status = 'absent';
        reason = date === 5 ? 'Sick Leave' : date === 12 ? 'Medical Appointment' : 'Family Emergency';
      } else if (date <= new Date().getDate() && month === new Date().getMonth()) {
        status = 'present';
      } else {
        status = null; // Future dates
      }
      
      days.push({ date, status, reason });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && 
                         currentMonth.getFullYear() === today.getFullYear();

  // Calculate summary statistics
  const summary = {
    totalWorkingDays: calendarDays.filter(d => d.status === 'present' || d.status === 'absent').length,
    presents: calendarDays.filter(d => d.status === 'present').length,
    absents: calendarDays.filter(d => d.status === 'absent').length,
    holidays: calendarDays.filter(d => d.status === 'holiday').length,
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setIsAnimating(true);
    setTimeout(() => {
      const newMonth = new Date(currentMonth);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      setCurrentMonth(newMonth);
      setIsAnimating(false);
    }, 150);
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'present':
        return 'bg-green-50 border-2 border-green-300 hover:bg-green-100 hover:border-green-400';
      case 'absent':
        return 'bg-red-50 border-2 border-red-300 hover:bg-red-100 hover:border-red-400';
      case 'holiday':
        return 'bg-gray-50 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400';
      default:
        return 'bg-white border-2 border-gray-200 hover:bg-gray-50';
    }
  };

  const getStatusTextColor = (status: string | null) => {
    switch (status) {
      case 'present':
        return 'text-green-700';
      case 'absent':
        return 'text-red-700';
      case 'holiday':
        return 'text-gray-600';
      default:
        return 'text-gray-900';
    }
  };

  const getStatusBorder = (date: number) => {
    if (isCurrentMonth && date === today.getDate()) {
      return 'ring-2 ring-blue-500 ring-offset-2';
    }
    return '';
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Home className="w-4 h-4" />
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Attendance</span>
      </div>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Attendance</h1>
        <p className="text-gray-600">View your monthly attendance record</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-3">
          <Card className={`p-4 md:p-6 shadow-lg rounded-2xl transition-all duration-300 ${isAnimating ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            {/* Month Selector */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('prev')}
                className="rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-gray-900 mb-0">{monthName}</h2>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('next')}
                className="rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-3">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-gray-600 py-2 text-xs md:text-sm">
                    <span className="hidden sm:inline">{day}</span>
                    <span className="sm:hidden">{day.charAt(0)}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className="relative aspect-square"
                  >
                    {day.date > 0 && (
                      <div
                        className={`
                          w-full h-full rounded-lg md:rounded-xl transition-all duration-300 cursor-pointer
                          ${getStatusColor(day.status)}
                          ${getStatusBorder(day.date)}
                          shadow-sm hover:shadow-md
                          group
                        `}
                        title={day.reason || ''}
                      >
                        <div className="absolute top-1 right-1 md:top-2 md:right-2 text-xs md:text-sm">
                          <span className={getStatusTextColor(day.status)}>
                            {day.date}
                          </span>
                        </div>
                        
                        {/* Tooltip on hover - hidden on mobile, shown on desktop */}
                        {day.reason && (
                          <div className="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {day.status === 'present' ? 'Present' : day.status === 'absent' ? `Absent — ${day.reason}` : day.reason}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-3 md:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-green-50 border-2 border-green-300 rounded"></div>
                  <span className="text-gray-700 text-sm md:text-base">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-red-50 border-2 border-red-300 rounded"></div>
                  <span className="text-gray-700 text-sm md:text-base">Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-50 border-2 border-gray-300 rounded"></div>
                  <span className="text-gray-700 text-sm md:text-base">Holiday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-blue-500 rounded bg-blue-50"></div>
                  <span className="text-gray-700 text-sm md:text-base">Today</span>
                </div>
              </div>
              <p className="text-gray-500 mt-3 text-xs md:text-sm">
                <span className="md:hidden">Tap a date for details.</span>
                <span className="hidden md:inline">Tap or hover over a date for details.</span>
              </p>
            </div>
          </Card>
        </div>

        {/* Summary Statistics Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 md:p-6 shadow-lg rounded-2xl lg:sticky lg:top-24">
            <h3 className="text-gray-900 mb-4 md:mb-6">Monthly Summary</h3>
            
            {/* Mobile: Grid layout, Desktop: Stack layout */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:space-y-0 lg:gap-4">
              {/* Total Working Days */}
              <div className="bg-blue-50 rounded-xl p-3 md:p-4">
                <p className="text-blue-600 text-xs md:text-sm mb-1">Total Working Days</p>
                <p className="text-blue-900 mb-0 text-lg md:text-2xl">{summary.totalWorkingDays}</p>
              </div>

              {/* Presents */}
              <div className="bg-green-50 rounded-xl p-3 md:p-4">
                <p className="text-green-600 text-xs md:text-sm mb-1">Present</p>
                <p className="text-green-900 mb-0 text-lg md:text-2xl">{summary.presents}</p>
              </div>

              {/* Absents */}
              <div className="bg-red-50 rounded-xl p-3 md:p-4">
                <p className="text-red-600 text-xs md:text-sm mb-1">Absent</p>
                <p className="text-red-900 mb-0 text-lg md:text-2xl">{summary.absents}</p>
              </div>

              {/* Holidays */}
              <div className="bg-gray-100 rounded-xl p-3 md:p-4">
                <p className="text-gray-600 text-xs md:text-sm mb-1">Holidays</p>
                <p className="text-gray-900 mb-0 text-lg md:text-2xl">{summary.holidays}</p>
              </div>

              {/* Attendance Percentage - Full width on mobile */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 md:p-4 text-white col-span-2 lg:col-span-1">
                <p className="text-blue-100 text-xs md:text-sm mb-1">Attendance Rate</p>
                <p className="text-white mb-0 text-lg md:text-2xl">
                  {summary.totalWorkingDays > 0 
                    ? Math.round((summary.presents / summary.totalWorkingDays) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation Flow Indicator */}
      <div className="mt-8">
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 rounded-xl">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-blue-700">
            <span className="hidden md:inline">Navigation Flow:</span>
            <span className="text-blue-500">Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-500">Sidebar</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-900">Attendance</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-500">Monthly Calendar</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
