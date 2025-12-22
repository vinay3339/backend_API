import React, { useState } from 'react';
import { Plus, FileText, Calendar, Eye, Edit, Trash2, Upload } from 'lucide-react';

export const TeacherHomework: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');

  const homeworkList = [
    { id: '1', title: 'Chapter 5 - Quadratic Equations', class: 'Class 10-A', subject: 'Mathematics', givenOn: '2024-11-28', dueDate: '2024-12-05', status: 'active', submissions: 35 },
    { id: '2', title: 'Chapter 4 - Linear Equations Practice', class: 'Class 9-A', subject: 'Mathematics', givenOn: '2024-11-25', dueDate: '2024-12-02', status: 'active', submissions: 28 },
    { id: '3', title: 'Geometry Worksheet', class: 'Class 8-A', subject: 'Mathematics', givenOn: '2024-11-20', dueDate: '2024-11-27', status: 'past', submissions: 32 },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Homework & Materials</h1>
          <p className="text-gray-600">Assign and manage homework for your classes</p>
        </div>
        <button
          onClick={() => setActiveTab('create')}
          className="px-4 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Homework
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex gap-1 p-1">
          <button onClick={() => setActiveTab('list')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'list' ? 'bg-[#EBF1FF] text-[#2D62FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
            Homework List
          </button>
          <button onClick={() => setActiveTab('materials')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'materials' ? 'bg-[#EBF1FF] text-[#2D62FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
            Study Materials
          </button>
          <button onClick={() => setActiveTab('create')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'create' ? 'bg-[#EBF1FF] text-[#2D62FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
            Create New
          </button>
        </div>
      </div>

      {activeTab === 'list' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Class & Section</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Given On</th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Submissions</th>
                  <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {homeworkList.map((hw) => (
                  <tr key={hw.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4"><span className="text-gray-900">{hw.title}</span></td>
                    <td className="px-6 py-4"><span className="text-gray-900">{hw.class}</span></td>
                    <td className="px-6 py-4"><span className="text-gray-900">{hw.subject}</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-sm text-gray-900">{hw.givenOn}</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-sm text-gray-900">{hw.dueDate}</span></td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${hw.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {hw.status === 'active' ? 'Active' : 'Past'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center"><span className="text-gray-900">{hw.submissions}/42</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Create New Homework</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Class & Section <span className="text-red-500">*</span></label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent">
                <option>Class 10-A</option>
                <option>Class 9-A</option>
                <option>Class 9-B</option>
                <option>Class 8-A</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Subject <span className="text-red-500">*</span></label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent">
                <option>Mathematics</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Homework Title <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g., Chapter 5 - Quadratic Equations" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Instructions <span className="text-red-500">*</span></label>
              <textarea rows={4} placeholder="Enter detailed instructions..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Due Date <span className="text-red-500">*</span></label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D62FF] focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Attachments</label>
              <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Save Draft</button>
            <button className="px-4 py-2 bg-[#2D62FF] text-white rounded-lg hover:bg-[#1C4FE6] transition-colors">Publish Homework</button>
          </div>
        </div>
      )}

      {activeTab === 'materials' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600">Study materials will appear here</p>
        </div>
      )}
    </div>
  );
};
