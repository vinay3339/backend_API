import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Edit,
  Save,
  Lock,
  Calendar,
  RefreshCw,
  ArrowRight,
  Filter
} from 'lucide-react';

interface AuditLogEntry {
  id: string;
  action: string;
  icon: 'edit' | 'save' | 'lock' | 'change';
  date: string;
  time: string;
  class: string;
  section: string;
  subject?: string;
  markedBy: string;
  oldValue?: string;
  newValue?: string;
  description: string;
}

const sampleAuditLogs: AuditLogEntry[] = [
  {
    id: '1',
    action: 'Attendance Marked',
    icon: 'save',
    date: '2024-11-29',
    time: '09:15 AM',
    class: '10',
    section: 'A',
    markedBy: 'Mrs. Priya Kumar',
    description: 'Daily attendance marked for Class 10A',
  },
  {
    id: '2',
    action: 'Status Changed',
    icon: 'change',
    date: '2024-11-29',
    time: '10:30 AM',
    class: '10',
    section: 'A',
    markedBy: 'Mrs. Priya Kumar',
    oldValue: 'Absent',
    newValue: 'Present',
    description: 'Aarav Sharma - Status changed from Absent to Present',
  },
  {
    id: '3',
    action: 'Attendance Locked',
    icon: 'lock',
    date: '2024-11-28',
    time: '05:00 PM',
    class: '10',
    section: 'A',
    markedBy: 'Admin',
    description: 'Attendance locked for Class 10A on 2024-11-28',
  },
  {
    id: '4',
    action: 'Backdated Attendance',
    icon: 'edit',
    date: '2024-11-27',
    time: '02:30 PM',
    class: '9',
    section: 'B',
    markedBy: 'Mr. Rajesh Singh',
    description: 'Backdated attendance added for 2024-11-25',
  },
  {
    id: '5',
    action: 'Attendance Marked',
    icon: 'save',
    date: '2024-11-27',
    time: '09:10 AM',
    class: '9',
    section: 'B',
    subject: 'Mathematics',
    markedBy: 'Mr. Rajesh Singh',
    description: 'Period 2 attendance marked for Class 9B - Mathematics',
  },
  {
    id: '6',
    action: 'Status Changed',
    icon: 'change',
    date: '2024-11-27',
    time: '11:45 AM',
    class: '8',
    section: 'C',
    markedBy: 'Mrs. Anita Verma',
    oldValue: 'Present',
    newValue: 'Late',
    description: 'Priya Kumar - Status changed from Present to Late',
  },
  {
    id: '7',
    action: 'Attendance Locked',
    icon: 'lock',
    date: '2024-11-26',
    time: '05:00 PM',
    class: '10',
    section: 'B',
    markedBy: 'Admin',
    description: 'Attendance locked for Class 10B on 2024-11-26',
  },
  {
    id: '8',
    action: 'Attendance Marked',
    icon: 'save',
    date: '2024-11-26',
    time: '09:20 AM',
    class: '7',
    section: 'A',
    markedBy: 'Mrs. Lakshmi Nair',
    description: 'Daily attendance marked for Class 7A',
  },
];

export function AttendanceAuditLog() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'edit': return <Edit className="h-5 w-5" />;
      case 'save': return <Save className="h-5 w-5" />;
      case 'lock': return <Lock className="h-5 w-5" />;
      case 'change': return <RefreshCw className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getIconColor = (icon: string) => {
    switch (icon) {
      case 'edit': return 'bg-blue-100 text-blue-600';
      case 'save': return 'bg-green-100 text-green-600';
      case 'lock': return 'bg-orange-100 text-orange-600';
      case 'change': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'Attendance Marked':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Marked</Badge>;
      case 'Status Changed':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Modified</Badge>;
      case 'Attendance Locked':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">Locked</Badge>;
      case 'Backdated Attendance':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Backdated</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Other</Badge>;
    }
  };

  const filteredLogs = sampleAuditLogs.filter(log => {
    if (selectedClass !== 'all' && log.class !== selectedClass) return false;
    if (selectedAction !== 'all' && log.action !== selectedAction) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Time Period</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="60">Last 60 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Action Type</Label>
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="Attendance Marked">Attendance Marked</SelectItem>
                <SelectItem value="Status Changed">Status Changed</SelectItem>
                <SelectItem value="Attendance Locked">Attendance Locked</SelectItem>
                <SelectItem value="Backdated Attendance">Backdated Attendance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="invisible">Filter</Label>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Showing <span className="text-gray-900">{filteredLogs.length}</span> activities from the last {selectedPeriod} days
          </p>
        </div>
      </div>

      {/* Audit Log Timeline */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(log.icon)}`}>
                {getIconComponent(log.icon)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-gray-900">{log.action}</h4>
                      {getActionBadge(log.action)}
                    </div>
                    <p className="text-sm text-gray-600">{log.description}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p>{log.time}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Class:</span>
                    <Badge variant="outline">{log.class}{log.section}</Badge>
                  </div>
                  {log.subject && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Subject:</span>
                      <Badge variant="outline">{log.subject}</Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">By:</span>
                    <span className="text-gray-900">{log.markedBy}</span>
                  </div>
                  
                  {log.oldValue && log.newValue && (
                    <div className="flex items-center gap-2 text-sm">
                      <Badge className="bg-red-50 text-red-700 border-red-200">{log.oldValue}</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge className="bg-green-50 text-green-700 border-green-200">{log.newValue}</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Activity
        </Button>
      </div>
    </div>
  );
}
