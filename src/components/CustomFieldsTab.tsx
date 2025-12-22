import React, { useState } from 'react';
import { GripVertical, Plus, Edit2, Trash2, Lock } from 'lucide-react';

export const CustomFieldsTab: React.FC = () => {
  const [activeModule, setActiveModule] = useState('student');

  const modules = [
    { id: 'student', label: 'Student' },
    { id: 'teacher', label: 'Teacher' },
    { id: 'class', label: 'Class' },
    { id: 'exam', label: 'Exam' },
    { id: 'finance', label: 'Finance' },
    { id: 'transport', label: 'Transport' },
  ];

  const fields = [
    { id: '1', label: 'Full Name', type: 'text', required: true, system: true, section: 'Personal Information' },
    { id: '2', label: 'Date of Birth', type: 'date', required: true, system: true, section: 'Personal Information' },
    { id: '3', label: 'Blood Group', type: 'dropdown', required: false, system: false, section: 'Personal Information' },
    { id: '4', label: 'Aadhar Number', type: 'text', required: false, system: false, section: 'Personal Information' },
    { id: '5', label: 'Parent Mobile', type: 'text', required: true, system: true, section: 'Contact Information' },
    { id: '6', label: 'Emergency Contact', type: 'text', required: false, system: false, section: 'Contact Information' },
  ];

  const groupedFields = fields.reduce((acc, field) => {
    if (!acc[field.section]) acc[field.section] = [];
    acc[field.section].push(field);
    return acc;
  }, {} as Record<string, typeof fields>);

  return (
    <div className="space-y-6">
      {/* Module Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-1">
        <div className="flex gap-1">
          {modules.map((module) => (
            <button key={module.id} onClick={() => setActiveModule(module.id)} className={`px-4 py-2 rounded-lg transition-all ${activeModule === module.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              {module.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fields by Section */}
      {Object.entries(groupedFields).map(([section, sectionFields]) => (
        <div key={section} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">{section}</h3>
            <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Field
            </button>
          </div>

          <div className="space-y-2">
            {sectionFields.map((field) => (
              <div key={field.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                {field.system && <Lock className="w-4 h-4 text-gray-400" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{field.label}</span>
                    {field.required && <span className="text-xs text-red-500">*</span>}
                  </div>
                  <span className="text-xs text-gray-500">{field.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!field.system && (
                    <>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
