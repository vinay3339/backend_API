import React, { useState } from 'react';
import { Save } from 'lucide-react';

export const CommunicationSettingsTab: React.FC = () => {
  const [sms, setSms] = useState({ provider: 'MSG91', senderId: 'RVRSDE', attendanceAlert: 'Dear Parent, {student_name} is absent today.', feeReminder: 'Dear Parent, Fee payment of ₹{amount} is due.', examResult: 'Dear Parent, {student_name} scored {marks}%.', transportDelay: 'Dear Parent, Bus {route} is delayed by {time} mins.' });
  const [email, setEmail] = useState({ smtpHost: 'smtp.gmail.com', smtpUser: 'admin@riverside.edu', smtpPassword: '••••••••', fromEmail: 'noreply@riverside.edu' });
  const [push, setPush] = useState({ enablePush: true, highPriority: true });

  return (
    <div className="space-y-6">
      {/* SMS Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">SMS Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">SMS Provider</label>
              <select value={sms.provider} onChange={(e) => setSms({ ...sms, provider: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="MSG91">MSG91</option>
                <option value="Twilio">Twilio</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Sender ID</label>
              <input type="text" value={sms.senderId} onChange={(e) => setSms({ ...sms, senderId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Attendance Alert Template</label>
            <textarea value={sms.attendanceAlert} onChange={(e) => setSms({ ...sms, attendanceAlert: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Fee Reminder Template</label>
            <textarea value={sms.feeReminder} onChange={(e) => setSms({ ...sms, feeReminder: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Email Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">SMTP Host</label>
            <input type="text" value={email.smtpHost} onChange={(e) => setEmail({ ...email, smtpHost: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">From Email</label>
            <input type="email" value={email.fromEmail} onChange={(e) => setEmail({ ...email, fromEmail: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">SMTP Username</label>
            <input type="text" value={email.smtpUser} onChange={(e) => setEmail({ ...email, smtpUser: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">SMTP Password</label>
            <input type="password" value={email.smtpPassword} onChange={(e) => setEmail({ ...email, smtpPassword: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Push Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={push.enablePush} onChange={(e) => setPush({ ...push, enablePush: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">Enable Push Notifications</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={push.highPriority} onChange={(e) => setPush({ ...push, highPriority: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">High Priority Alerts</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Communication Settings
        </button>
      </div>
    </div>
  );
};
