import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Users, User, Settings as SettingsIcon, FileText, Clock } from 'lucide-react';
import { DailyAttendance } from './DailyAttendance';
import { ClassAttendanceView } from './ClassAttendanceView';
import { StudentAttendanceView } from './StudentAttendanceView';
import { TeacherAttendance } from './TeacherAttendance';
import { AttendanceSettings } from './AttendanceSettings';
import { AttendanceAuditLog } from './AttendanceAuditLog';
import { AttendanceCustomFields } from './AttendanceCustomFields';

type ViewType = 'main' | 'fields';

export function AttendanceManagement() {
  const [activeTab, setActiveTab] = useState('daily');
  const [view, setView] = useState<ViewType>('main');

  if (view === 'fields') {
    return <AttendanceCustomFields onBack={() => setView('main')} />;
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900">Attendance</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900 mb-1">Attendance Management</h1>
          <p className="text-sm text-gray-600">Track and manage student & teacher attendance</p>
        </div>
        <Button variant="outline" onClick={() => setView('fields')}>
          <SettingsIcon className="h-4 w-4 mr-2" />
          Custom Fields
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-white border-b w-full justify-start rounded-none p-0 h-auto">
          <TabsTrigger 
            value="daily"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-3"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Daily Attendance
          </TabsTrigger>
          <TabsTrigger 
            value="class"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-3"
          >
            <Users className="h-4 w-4 mr-2" />
            Class View
          </TabsTrigger>
          <TabsTrigger 
            value="student"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-3"
          >
            <User className="h-4 w-4 mr-2" />
            Student View
          </TabsTrigger>
          <TabsTrigger 
            value="teacher"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-3"
          >
            <Clock className="h-4 w-4 mr-2" />
            Teacher Attendance
          </TabsTrigger>
          <TabsTrigger 
            value="settings"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-3"
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger 
            value="audit"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-3"
          >
            <FileText className="h-4 w-4 mr-2" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <DailyAttendance />
        </TabsContent>

        <TabsContent value="class">
          <ClassAttendanceView />
        </TabsContent>

        <TabsContent value="student">
          <StudentAttendanceView />
        </TabsContent>

        <TabsContent value="teacher">
          <TeacherAttendance />
        </TabsContent>

        <TabsContent value="settings">
          <AttendanceSettings />
        </TabsContent>

        <TabsContent value="audit">
          <AttendanceAuditLog />
        </TabsContent>
      </Tabs>
    </div>
  );
}
