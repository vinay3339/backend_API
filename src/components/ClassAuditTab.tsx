import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Users,
  BookOpen,
  Calendar,
  FileText,
  Settings,
  UserPlus,
  Edit2,
  Trash2,
} from 'lucide-react';

const auditLogs = [
  {
    id: '1',
    action: 'Section Added',
    section: 'Sections',
    description: 'Added new section "Section D"',
    performedBy: 'Mrs. Administrator',
    timestamp: '2024-03-15 10:30 AM',
    changes: {
      added: { sectionName: 'D', sectionCode: '10D', classTeacher: 'Mrs. Anjali Patel' },
    },
    icon: UserPlus,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: '2',
    action: 'Subject Updated',
    section: 'Subjects',
    description: 'Updated subject "Mathematics"',
    performedBy: 'Mrs. Administrator',
    timestamp: '2024-03-14 03:15 PM',
    changes: {
      old: { periodsPerWeek: 5 },
      new: { periodsPerWeek: 6 },
    },
    icon: Edit2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: '3',
    action: 'Teacher Assigned',
    section: 'Sections',
    description: 'Assigned co-class teacher to Section A',
    performedBy: 'Mrs. Administrator',
    timestamp: '2024-03-13 11:45 AM',
    changes: {
      old: { coClassTeacher: null },
      new: { coClassTeacher: 'Mr. Rajesh Kumar' },
    },
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: '4',
    action: 'Timetable Edited',
    section: 'Timetable',
    description: 'Updated timetable for Monday, Period 3',
    performedBy: 'Mrs. Priya Sharma',
    timestamp: '2024-03-12 02:20 PM',
    changes: {
      old: { subject: 'English', teacher: 'Mrs. Anjali Patel' },
      new: { subject: 'Chemistry', teacher: 'Mrs. Lakshmi Reddy' },
    },
    icon: Calendar,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: '5',
    action: 'Exam Pattern Updated',
    section: 'Exam Settings',
    description: 'Changed exam pattern to State Board',
    performedBy: 'Mrs. Administrator',
    timestamp: '2024-03-10 09:00 AM',
    changes: {
      old: { examPattern: 'CBSE Pattern' },
      new: { examPattern: 'State Pattern' },
    },
    icon: FileText,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    id: '6',
    action: 'Class Details Updated',
    section: 'Class Details',
    description: 'Updated class information',
    performedBy: 'Mrs. Administrator',
    timestamp: '2024-03-08 04:30 PM',
    changes: {
      old: { maxCapacity: 35 },
      new: { maxCapacity: 40 },
    },
    icon: Settings,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
  {
    id: '7',
    action: 'Subject Removed',
    section: 'Subjects',
    description: 'Removed subject "Art & Craft"',
    performedBy: 'Mrs. Administrator',
    timestamp: '2024-03-05 01:15 PM',
    changes: {
      removed: { subjectName: 'Art & Craft', subjectCode: 'ART10' },
    },
    icon: Trash2,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
];

interface ClassAuditTabProps {
  classData: any;
}

export function ClassAuditTab({ classData }: ClassAuditTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3>Activity Log</h3>
        <p className="text-sm text-gray-600 mt-1">
          Track all changes made to {classData.className}
        </p>
      </div>

      {/* Audit Timeline */}
      <div className="space-y-4">
        {auditLogs.map((log) => {
          const Icon = log.icon;
          return (
            <Card key={log.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className={`w-12 h-12 ${log.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${log.color}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-gray-900">{log.action}</h4>
                      <p className="text-sm text-gray-600 mt-1">{log.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {log.section}
                    </Badge>
                  </div>

                  {/* Changes Table */}
                  {log.changes && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-2">Changes:</p>
                      
                      {log.changes.old && log.changes.new && (
                        <div className="space-y-2">
                          <div className="flex gap-4 text-sm">
                            <div className="flex-1">
                              <span className="text-gray-500">Old Value:</span>
                              <div className="mt-1">
                                {Object.entries(log.changes.old).map(([key, value]) => (
                                  <div key={key} className="text-red-600">
                                    <span className="font-medium">{key}:</span> {String(value)}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex-1">
                              <span className="text-gray-500">New Value:</span>
                              <div className="mt-1">
                                {Object.entries(log.changes.new).map(([key, value]) => (
                                  <div key={key} className="text-green-600">
                                    <span className="font-medium">{key}:</span> {String(value)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {log.changes.added && (
                        <div className="text-sm">
                          <span className="text-gray-500">Added:</span>
                          <div className="mt-1 text-green-600">
                            {Object.entries(log.changes.added).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span> {String(value)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {log.changes.removed && (
                        <div className="text-sm">
                          <span className="text-gray-500">Removed:</span>
                          <div className="mt-1 text-red-600">
                            {Object.entries(log.changes.removed).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span> {String(value)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                    <span>Performed by: <span className="text-gray-900">{log.performedBy}</span></span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Load More Activity
        </Button>
      </div>
    </div>
  );
}
