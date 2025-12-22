import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

export const TeacherCommunication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Communication</h1>
        <p className="text-gray-600">Send announcements and messages to students & parents</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex gap-1 p-1">
          <button onClick={() => setActiveTab('announcements')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'announcements' ? 'bg-[#EBF1FF] text-[#2D62FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
            Announcements
          </button>
          <button onClick={() => setActiveTab('messages')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'messages' ? 'bg-[#EBF1FF] text-[#2D62FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
            Messages
          </button>
        </div>
      </div>

      {activeTab === 'announcements' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Create Announcement</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Class & Section (Multi-select)</label>
              <select multiple className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]" size={4}>
                <option>Class 10-A</option>
                <option>Class 9-A</option>
                <option>Class 9-B</option>
                <option>Class 8-A</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Announcement Title</label>
              <input type="text" placeholder="e.g., Important Notice - FA1 Exam" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Message</label>
              <textarea rows={6} placeholder="Type your announcement here..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Send To</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 text-[#2D62FF] rounded" /><span className="text-sm">Students</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 text-[#2D62FF] rounded" /><span className="text-sm">Parents</span></label>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6] flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
