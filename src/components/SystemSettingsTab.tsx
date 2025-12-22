import React, { useState } from 'react';
import { Save, Download } from 'lucide-react';

export const SystemSettingsTab: React.FC = () => {
  const [security, setSecurity] = useState({ passwordStrength: 'Medium', enable2FA: false, ipWhitelist: '', sessionTimeout: '30', loginAlerts: true });
  const [backup, setBackup] = useState({ frequency: 'Daily' });
  const [ui, setUi] = useState({ theme: 'Light', language: 'English', dashboardLayout: 'Default' });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Security Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Password Strength Policy</label>
            <select value={security.passwordStrength} onChange={(e) => setSecurity({ ...security, passwordStrength: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input type="number" value={security.sessionTimeout} onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-2">IP Whitelist (comma separated)</label>
            <textarea value={security.ipWhitelist} onChange={(e) => setSecurity({ ...security, ipWhitelist: e.target.value })} rows={2} placeholder="192.168.1.1, 10.0.0.1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={security.enable2FA} onChange={(e) => setSecurity({ ...security, enable2FA: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Enable 2FA (Two-Factor Authentication)</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={security.loginAlerts} onChange={(e) => setSecurity({ ...security, loginAlerts: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Login Alerts</span></label>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Backup & Restore</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Auto-backup Frequency</label>
            <select value={backup.frequency} onChange={(e) => setBackup({ ...backup, frequency: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Manual Backup</label>
            <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Create Backup Now
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">UI Preferences</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Theme</label>
            <select value={ui.theme} onChange={(e) => setUi({ ...ui, theme: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Language</label>
            <select value={ui.language} onChange={(e) => setUi({ ...ui, language: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="English">English</option>
              <option value="Telugu">Telugu</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Dashboard Layout</label>
            <select value={ui.dashboardLayout} onChange={(e) => setUi({ ...ui, dashboardLayout: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Default">Default</option>
              <option value="Compact">Compact</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save System Settings
        </button>
      </div>
    </div>
  );
};
