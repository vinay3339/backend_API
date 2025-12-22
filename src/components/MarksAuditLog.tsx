import React, { useState } from 'react';
import {
  Edit,
  Eye,
  Send,
  Trash2,
  Filter,
  Calendar,
  User,
  FileText,
  ArrowRight,
  Download,
} from 'lucide-react';

interface AuditEntry {
  id: string;
  action: 'marks_updated' | 'marks_published' | 'structure_edited' | 'grade_changed' | 'exam_created' | 'exam_deleted' | 'result_published';
  examName: string;
  class?: string;
  section?: string;
  subject?: string;
  studentName?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
  performedBy: string;
  role: string;
  details?: string;
}

export const MarksAuditLog: React.FC = () => {
  const [filters, setFilters] = useState({
    action: 'all',
    exam: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const [auditEntries] = useState<AuditEntry[]>([
    {
      id: '1',
      action: 'marks_updated',
      examName: 'SA1 - 2024-2025',
      class: '10',
      section: 'A',
      subject: 'Mathematics',
      studentName: 'Aarav Kumar',
      oldValue: '72',
      newValue: '75',
      timestamp: '2024-09-25T14:30:00',
      performedBy: 'Dr. Ramarao',
      role: 'Teacher',
      details: 'Marks updated after re-evaluation',
    },
    {
      id: '2',
      action: 'marks_published',
      examName: 'FA1 - 2024-2025',
      class: '10',
      section: 'A',
      timestamp: '2024-07-15T10:00:00',
      performedBy: 'Mrs. Administrator',
      role: 'Admin',
      details: 'Results published to students and parents',
    },
    {
      id: '3',
      action: 'structure_edited',
      examName: 'SA2 - 2024-2025',
      oldValue: 'Weightage: 35%',
      newValue: 'Weightage: 40%',
      timestamp: '2024-09-20T11:15:00',
      performedBy: 'Mrs. Administrator',
      role: 'Admin',
      details: 'Updated exam weightage configuration',
    },
    {
      id: '4',
      action: 'grade_changed',
      examName: 'FA2 - 2024-2025',
      class: '10',
      section: 'A',
      subject: 'Physics',
      studentName: 'Sai Priya',
      oldValue: 'B+',
      newValue: 'A',
      timestamp: '2024-08-18T16:45:00',
      performedBy: 'Prof. Lakshmi',
      role: 'Teacher',
      details: 'Grade adjusted after marks correction',
    },
    {
      id: '5',
      action: 'exam_created',
      examName: 'Term 1 - 2024-2025',
      timestamp: '2024-06-01T09:00:00',
      performedBy: 'Mrs. Administrator',
      role: 'Admin',
      details: 'New exam structure created for Term 1',
    },
    {
      id: '6',
      action: 'marks_updated',
      examName: 'SA1 - 2024-2025',
      class: '10',
      section: 'B',
      subject: 'Chemistry',
      studentName: 'Krishna Reddy',
      oldValue: '42',
      newValue: '45',
      timestamp: '2024-09-24T13:20:00',
      performedBy: 'Dr. Krishna',
      role: 'Teacher',
      details: 'Practical marks added',
    },
    {
      id: '7',
      action: 'result_published',
      examName: 'SA1 - 2024-2025',
      class: '10',
      section: 'A',
      timestamp: '2024-10-01T14:00:00',
      performedBy: 'Mrs. Administrator',
      role: 'Admin',
      details: 'Results and report cards published',
    },
  ]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'marks_updated':
        return Edit;
      case 'marks_published':
      case 'result_published':
        return Send;
      case 'structure_edited':
        return FileText;
      case 'grade_changed':
        return Edit;
      case 'exam_created':
        return FileText;
      case 'exam_deleted':
        return Trash2;
      default:
        return FileText;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'marks_updated':
      case 'grade_changed':
        return 'bg-blue-100 text-blue-600';
      case 'marks_published':
      case 'result_published':
        return 'bg-green-100 text-green-600';
      case 'structure_edited':
        return 'bg-orange-100 text-orange-600';
      case 'exam_created':
        return 'bg-purple-100 text-purple-600';
      case 'exam_deleted':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'marks_updated':
        return 'Marks Updated';
      case 'marks_published':
        return 'Marks Published';
      case 'result_published':
        return 'Results Published';
      case 'structure_edited':
        return 'Structure Edited';
      case 'grade_changed':
        return 'Grade Changed';
      case 'exam_created':
        return 'Exam Created';
      case 'exam_deleted':
        return 'Exam Deleted';
      default:
        return action;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const filteredEntries = auditEntries.filter((entry) => {
    if (filters.action !== 'all' && entry.action !== filters.action) return false;
    if (filters.exam !== 'all' && entry.examName !== filters.exam) return false;
    if (filters.dateFrom && new Date(entry.timestamp) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(entry.timestamp) > new Date(filters.dateTo)) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-gray-900">Filter Activity</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Action Type</label>
            <select
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Actions</option>
              <option value="marks_updated">Marks Updated</option>
              <option value="marks_published">Marks Published</option>
              <option value="result_published">Results Published</option>
              <option value="structure_edited">Structure Edited</option>
              <option value="grade_changed">Grade Changed</option>
              <option value="exam_created">Exam Created</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Exam</label>
            <select
              value={filters.exam}
              onChange={(e) => setFilters({ ...filters, exam: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Exams</option>
              <option value="FA1 - 2024-2025">FA1 - 2024-2025</option>
              <option value="SA1 - 2024-2025">SA1 - 2024-2025</option>
              <option value="Term 1 - 2024-2025">Term 1 - 2024-2025</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Activities</span>
          <p className="text-gray-900 mt-1">{filteredEntries.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Marks Updates</span>
          <p className="text-blue-600 mt-1">
            {filteredEntries.filter((e) => e.action === 'marks_updated').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Publications</span>
          <p className="text-green-600 mt-1">
            {
              filteredEntries.filter(
                (e) => e.action === 'marks_published' || e.action === 'result_published'
              ).length
            }
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Structure Changes</span>
          <p className="text-orange-600 mt-1">
            {filteredEntries.filter((e) => e.action === 'structure_edited').length}
          </p>
        </div>
      </div>

      {/* Audit Log Entries */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Activity Log</h3>
            <p className="text-sm text-gray-600 mt-1">
              Showing {filteredEntries.length} activities
            </p>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredEntries.map((entry) => {
            const ActionIcon = getActionIcon(entry.action);
            return (
              <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getActionColor(entry.action)}`}>
                    <ActionIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-900">{getActionLabel(entry.action)}</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {entry.examName}
                          </span>
                        </div>
                        {entry.class && entry.section && (
                          <p className="text-sm text-gray-600">
                            Class {entry.class} - Section {entry.section}
                            {entry.subject && ` • ${entry.subject}`}
                            {entry.studentName && ` • ${entry.studentName}`}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatTimestamp(entry.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>
                            {entry.performedBy} ({entry.role})
                          </span>
                        </div>
                      </div>
                    </div>

                    {entry.details && (
                      <p className="text-sm text-gray-600 mb-2">{entry.details}</p>
                    )}

                    {entry.oldValue && entry.newValue && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm">
                        <span className="text-red-600">{entry.oldValue}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-green-600">{entry.newValue}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="border-t border-gray-200 p-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Load More Activity
          </button>
        </div>
      </div>
    </div>
  );
};
