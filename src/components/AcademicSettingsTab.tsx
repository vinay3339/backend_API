import React, { useState } from 'react';
import { Save } from 'lucide-react';

export const AcademicSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState({
    academicYear: '2024-2025',
    minAttendance: '75',
    minPassPercentage: '35',
    enableGPA: true,
    examPattern: 'FA-SA',
    maxMarks: '100',
    passMarks: '35',
    coScholasticGrade: 'A-B-C-D-E',
    allowTeacherEdit: true,
    attendanceMode: 'Period-wise',
    cutoffTime: '10:00',
    backdatedWindow: '2',
    autoAlerts: true,
  });

  return (
    <div className="space-y-6">
      {/* Academic Rules */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Academic Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Default Academic Year</label>
            <select value={settings.academicYear} onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Minimum Attendance % for Promotion</label>
            <input type="number" value={settings.minAttendance} onChange={(e) => setSettings({ ...settings, minAttendance: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Minimum Pass Percentage</label>
            <input type="number" value={settings.minPassPercentage} onChange={(e) => setSettings({ ...settings, minPassPercentage: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.enableGPA} onChange={(e) => setSettings({ ...settings, enableGPA: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-sm text-gray-700">Enable GPA Calculation</span>
            </label>
          </div>
        </div>
      </div>

      {/* Exams/Grading */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Exams & Grading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Exam Pattern Template</label>
            <select value={settings.examPattern} onChange={(e) => setSettings({ ...settings, examPattern: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="FA-SA">FA/SA System</option>
              <option value="Term">Term 1/Term 2</option>
              <option value="Semester">Semester System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Max Marks</label>
            <input type="number" value={settings.maxMarks} onChange={(e) => setSettings({ ...settings, maxMarks: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Pass Marks</label>
            <input type="number" value={settings.passMarks} onChange={(e) => setSettings({ ...settings, passMarks: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Co-Scholastic Grade System</label>
            <input type="text" value={settings.coScholasticGrade} onChange={(e) => setSettings({ ...settings, coScholasticGrade: e.target.value })} placeholder="A-B-C-D-E" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.allowTeacherEdit} onChange={(e) => setSettings({ ...settings, allowTeacherEdit: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-sm text-gray-700">Allow Teachers to Edit Grades</span>
            </label>
          </div>
        </div>
      </div>

      {/* Attendance Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Attendance Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Attendance Mode</label>
            <select value={settings.attendanceMode} onChange={(e) => setSettings({ ...settings, attendanceMode: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Daily">Daily</option>
              <option value="Period-wise">Period-wise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Cut-off Time</label>
            <input type="time" value={settings.cutoffTime} onChange={(e) => setSettings({ ...settings, cutoffTime: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Backdated Attendance Window (days)</label>
            <input type="number" value={settings.backdatedWindow} onChange={(e) => setSettings({ ...settings, backdatedWindow: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.autoAlerts} onChange={(e) => setSettings({ ...settings, autoAlerts: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-sm text-gray-700">Auto Parent Alerts</span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Academic Settings
        </button>
      </div>
    </div>
  );
};
