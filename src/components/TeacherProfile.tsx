import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';

export const TeacherProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'contact', label: 'Contact Details' },
    { id: 'employment', label: 'Employment Details' },
    { id: 'assignments', label: 'Subjects & Classes' },
    { id: 'documents', label: 'Documents' },
    { id: 'password', label: 'Change Password' },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">View and update your profile information</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex gap-1 p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[#EBF1FF] text-[#2D62FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'personal' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-[#2D62FF] to-[#1C4FE6] rounded-lg flex items-center justify-center">
              <span className="text-white text-4xl">MR</span>
            </div>
            <div className="flex-1">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Photo
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-700 mb-2">First Name</label><input type="text" value="Mr. Rajesh" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="block text-sm text-gray-700 mb-2">Last Name</label><input type="text" value="Kumar" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="block text-sm text-gray-700 mb-2">Gender</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option>Male</option><option>Female</option></select></div>
            <div><label className="block text-sm text-gray-700 mb-2">Date of Birth</label><input type="date" value="1985-05-15" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6] flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-700 mb-2">Email</label><input type="email" value="rajesh@riverside.edu" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="block text-sm text-gray-700 mb-2">Mobile</label><input type="tel" value="+91 98765 43210" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            <div className="col-span-2"><label className="block text-sm text-gray-700 mb-2">Address</label><textarea rows={3} value="MG Road, Vijayawada" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6] flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'employment' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-700 mb-2">Employee ID</label><input type="text" value="EMP001" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly /></div>
            <div><label className="block text-sm text-gray-700 mb-2">Designation</label><input type="text" value="Senior Teacher" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly /></div>
            <div><label className="block text-sm text-gray-700 mb-2">Joining Date</label><input type="date" value="2015-06-01" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly /></div>
            <div><label className="block text-sm text-gray-700 mb-2">Department</label><input type="text" value="Mathematics" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly /></div>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Assigned Classes & Subjects</h3>
          <div className="space-y-3">
            {['Class 10-A', 'Class 9-A', 'Class 9-B', 'Class 8-A'].map((cls) => (
              <div key={cls} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div><p className="text-gray-900">{cls}</p><p className="text-sm text-gray-600">Mathematics</p></div>
                  {cls === 'Class 10-A' && <span className="px-2.5 py-1 bg-[#FFF5E6] text-[#F1C40F] rounded-full text-xs">Class Teacher</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'password' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="max-w-md space-y-4">
            <div><label className="block text-sm text-gray-700 mb-2">Current Password</label><input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="block text-sm text-gray-700 mb-2">New Password</label><input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="block text-sm text-gray-700 mb-2">Confirm New Password</label><input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            <button className="px-6 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6]">Change Password</button>
          </div>
        </div>
      )}
    </div>
  );
};
