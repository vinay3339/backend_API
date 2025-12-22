import React, { useState } from 'react';
import { X, Plus, Download, Upload, FileText, Award, GraduationCap, Calendar, Eye, History } from 'lucide-react';
import { ExamStructure } from './ExamStructure';
import { MarksEntry } from './MarksEntry';
import { ExamResults } from './ExamResults';
import { ReportCards } from './ReportCards';
import { GradeSystem } from './GradeSystem';
import { ExamTimetable } from './ExamTimetable';
import { PublishResults } from './PublishResults';
import { MarksAuditLog } from './MarksAuditLog';

export const MarksExamsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('exam-structure');
  const [showCreateExamModal, setShowCreateExamModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const tabs = [
    { id: 'exam-structure', label: 'Exam Structure', icon: FileText },
    { id: 'marks-entry', label: 'Marks Entry', icon: Award },
    { id: 'results', label: 'Results', icon: GraduationCap },
    { id: 'report-cards', label: 'Report Cards', icon: FileText },
    { id: 'grade-system', label: 'Grade System', icon: Award },
    { id: 'exam-timetable', label: 'Exam Timetable', icon: Calendar },
    { id: 'publish-results', label: 'Publish Results', icon: Eye },
    { id: 'audit-log', label: 'Audit Log', icon: History },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'exam-structure':
        return <ExamStructure />;
      case 'marks-entry':
        return <MarksEntry />;
      case 'results':
        return <ExamResults />;
      case 'report-cards':
        return <ReportCards />;
      case 'grade-system':
        return <GradeSystem />;
      case 'exam-timetable':
        return <ExamTimetable />;
      case 'publish-results':
        return <PublishResults />;
      case 'audit-log':
        return <MarksAuditLog />;
      default:
        return <ExamStructure />;
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900">Marks & Exams</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900 mb-2">Marks & Exams Management</h1>
          <p className="text-gray-600">Configure exams, enter marks, and generate report cards</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Import Marks
          </button>
          <button
            onClick={() => setShowCreateExamModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Exam
          </button>
        </div>
      </div>

      {/* Vertical Sidebar + Content Layout */}
      <div className="flex gap-6">
        {/* Vertical Navigation Sidebar */}
        <div className="w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm p-2 border border-gray-200">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>

      {/* Create Exam Modal */}
      {showCreateExamModal && (
        <CreateExamModal onClose={() => setShowCreateExamModal(false)} />
      )}

      {/* Import Marks Modal */}
      {showImportModal && (
        <ImportMarksModal onClose={() => setShowImportModal(false)} />
      )}
    </div>
  );
};

// Create Exam Modal Component
const CreateExamModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    examName: '',
    examCode: '',
    academicYear: '2024-2025',
    examType: 'formative',
    startDate: '',
    endDate: '',
    maxMarks: '100',
    minPassMarks: '35',
    weightage: '',
    components: {
      written: true,
      internal: false,
      project: false,
      viva: false,
      practical: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating exam:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-gray-900">Create New Exam</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Exam Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.examName}
                  onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                  placeholder="e.g., FA1, Term 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Exam Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.examCode}
                  onChange={(e) => setFormData({ ...formData, examCode: e.target.value })}
                  placeholder="e.g., FA1-2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Academic Year</label>
                <select
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2022-2023">2022-2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Exam Type</label>
                <select
                  value={formData.examType}
                  onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="formative">Formative Assessment</option>
                  <option value="summative">Summative Assessment</option>
                  <option value="term">Term Exam</option>
                  <option value="internal">Internal Assessment</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Maximum Marks</label>
                <input
                  type="number"
                  value={formData.maxMarks}
                  onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Min Pass Marks</label>
                <input
                  type="number"
                  value={formData.minPassMarks}
                  onChange={(e) => setFormData({ ...formData, minPassMarks: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Weightage (%)</label>
                <input
                  type="number"
                  value={formData.weightage}
                  onChange={(e) => setFormData({ ...formData, weightage: e.target.value })}
                  placeholder="e.g., 10, 20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Exam Components */}
            <div>
              <label className="block text-sm text-gray-700 mb-3">Exam Components</label>
              <div className="space-y-2">
                {Object.entries(formData.components).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          components: { ...formData.components, [key]: e.target.checked },
                        })
                      }
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Import Marks Modal Component
const ImportMarksModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">Import Marks from Excel</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">Select Exam</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>FA1 - 2024-2025</option>
              <option>FA2 - 2024-2025</option>
              <option>SA1 - 2024-2025</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">Select Class</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Class 10 - Section A</option>
              <option>Class 10 - Section B</option>
              <option>Class 9 - Section A</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop your Excel file here, or click to browse
            </p>
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" />
            <button className="text-sm text-blue-600 hover:text-blue-700">Browse Files</button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              Download the{' '}
              <a href="#" className="underline">
                template file
              </a>{' '}
              to ensure proper format
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Import Marks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};