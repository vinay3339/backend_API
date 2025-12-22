import React, { useState } from 'react';
import { Save } from 'lucide-react';

export const TeacherSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    homeworkReminders: true,
    attendanceReminders: true,
    parentMessages: true,
    language: 'English',
    theme: 'Light',
  });

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your preferences and notifications</p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <p className="text-gray-900">Homework Reminders</p>
                <p className="text-sm text-gray-600">Get notified about homework deadlines</p>
              </div>
              <input type="checkbox" checked={settings.homeworkReminders} onChange={(e) => setSettings({ ...settings, homeworkReminders: e.target.checked })} className="w-5 h-5 text-[#2D62FF] rounded" />
            </label>
            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <p className="text-gray-900">Attendance Reminders</p>
                <p className="text-sm text-gray-600">Remind when attendance is not marked</p>
              </div>
              <input type="checkbox" checked={settings.attendanceReminders} onChange={(e) => setSettings({ ...settings, attendanceReminders: e.target.checked })} className="w-5 h-5 text-[#2D62FF] rounded" />
            </label>
            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <p className="text-gray-900">Parent Message Alerts</p>
                <p className="text-sm text-gray-600">Get notified when parents send messages</p>
              </div>
              <input type="checkbox" checked={settings.parentMessages} onChange={(e) => setSettings({ ...settings, parentMessages: e.target.checked })} className="w-5 h-5 text-[#2D62FF] rounded" />
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Appearance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Language</label>
              <select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]">
                <option>English</option>
                <option>Telugu</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Theme</label>
              <select value={settings.theme} onChange={(e) => setSettings({ ...settings, theme: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6] flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
