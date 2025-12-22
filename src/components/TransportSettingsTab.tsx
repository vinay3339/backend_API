import React, { useState } from 'react';
import { Save } from 'lucide-react';

export const TransportSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState({
    defaultPickup: '07:00',
    defaultDrop: '16:30',
    defaultFee: '2500',
    enableGPS: true,
    maxCapacity: '50',
    licenseRenewal: '30',
    bgVerification: '90',
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">General Transport Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Default Pickup Time</label>
            <input type="time" value={settings.defaultPickup} onChange={(e) => setSettings({ ...settings, defaultPickup: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Default Drop Time</label>
            <input type="time" value={settings.defaultDrop} onChange={(e) => setSettings({ ...settings, defaultDrop: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Default Transport Fee (₹)</label>
            <input type="number" value={settings.defaultFee} onChange={(e) => setSettings({ ...settings, defaultFee: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Max Vehicle Capacity Warning</label>
            <input type="number" value={settings.maxCapacity} onChange={(e) => setSettings({ ...settings, maxCapacity: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={settings.enableGPS} onChange={(e) => setSettings({ ...settings, enableGPS: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">Enable GPS Integration</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Driver Compliance Reminders</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">License Renewal Reminder (days before)</label>
            <input type="number" value={settings.licenseRenewal} onChange={(e) => setSettings({ ...settings, licenseRenewal: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Background Verification Reminder (days before)</label>
            <input type="number" value={settings.bgVerification} onChange={(e) => setSettings({ ...settings, bgVerification: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Transport Settings
        </button>
      </div>
    </div>
  );
};
