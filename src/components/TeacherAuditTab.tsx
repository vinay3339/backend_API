import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  DollarSign,
  Calendar,
  Shield,
  Edit2,
  Key,
  Upload,
  CheckCircle,
} from 'lucide-react';

interface TeacherAuditTabProps {
  teacher: any;
}

interface AuditLog {
  id: string;
  action: string;
  section: string;
  timestamp: string;
  oldValue?: string;
  newValue?: string;
  performedBy: string;
  icon: any;
  iconColor: string;
}

const auditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'Updated salary information',
    section: 'Salary & Bank',
    timestamp: 'Nov 28, 2025 at 2:45 PM',
    oldValue: '₹45,000',
    newValue: '₹48,000',
    performedBy: 'Mrs. Administrator',
    icon: DollarSign,
    iconColor: 'text-green-600 bg-green-50',
  },
  {
    id: '2',
    action: 'Assigned new class',
    section: 'Employment',
    timestamp: 'Nov 25, 2025 at 10:30 AM',
    oldValue: 'Class 7-A, 8-A',
    newValue: 'Class 7-A, 8-A, 9-A',
    performedBy: 'Mrs. Administrator',
    icon: Briefcase,
    iconColor: 'text-blue-600 bg-blue-50',
  },
  {
    id: '3',
    action: 'Updated contact information',
    section: 'Profile',
    timestamp: 'Nov 22, 2025 at 4:15 PM',
    oldValue: '+91 98765 43210',
    newValue: '+91 98765 43211',
    performedBy: 'Ramesh Johnson (Self)',
    icon: User,
    iconColor: 'text-purple-600 bg-purple-50',
  },
  {
    id: '4',
    action: 'Password reset requested',
    section: 'Account',
    timestamp: 'Nov 20, 2025 at 9:00 AM',
    performedBy: 'Mrs. Administrator',
    icon: Key,
    iconColor: 'text-orange-600 bg-orange-50',
  },
  {
    id: '5',
    action: 'Uploaded marks for Class 8-A',
    section: 'Timetable',
    timestamp: 'Nov 18, 2025 at 3:30 PM',
    oldValue: '-',
    newValue: 'Mathematics - Term 1',
    performedBy: 'Ramesh Johnson (Self)',
    icon: Upload,
    iconColor: 'text-indigo-600 bg-indigo-50',
  },
  {
    id: '6',
    action: 'Updated qualifications',
    section: 'Qualifications',
    timestamp: 'Nov 15, 2025 at 11:20 AM',
    oldValue: 'B.Ed, M.Sc Mathematics',
    newValue: 'B.Ed, M.Sc Mathematics, TET Qualified',
    performedBy: 'Mrs. Administrator',
    icon: GraduationCap,
    iconColor: 'text-teal-600 bg-teal-50',
  },
  {
    id: '7',
    action: 'Timetable updated',
    section: 'Timetable',
    timestamp: 'Nov 10, 2025 at 8:45 AM',
    oldValue: '30 periods/week',
    newValue: '32 periods/week',
    performedBy: 'Mrs. Administrator',
    icon: Calendar,
    iconColor: 'text-pink-600 bg-pink-50',
  },
  {
    id: '8',
    action: 'Account activated',
    section: 'Account',
    timestamp: 'Nov 5, 2025 at 10:00 AM',
    performedBy: 'Mrs. Administrator',
    icon: CheckCircle,
    iconColor: 'text-green-600 bg-green-50',
  },
  {
    id: '9',
    action: 'Profile created',
    section: 'Profile',
    timestamp: 'Nov 1, 2025 at 9:00 AM',
    performedBy: 'Mrs. Administrator',
    icon: User,
    iconColor: 'text-blue-600 bg-blue-50',
  },
];

export function TeacherAuditTab({ teacher }: TeacherAuditTabProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Activity Log</h3>
            <p className="text-sm text-gray-500 mt-1">Complete history of all changes and activities</p>
          </div>
        </div>

        <div className="space-y-4">
          {auditLogs.map((log) => {
            const Icon = log.icon;
            return (
              <div
                key={log.id}
                className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${log.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div>
                      <p className="text-gray-900">{log.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {log.section}
                        </Badge>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  {log.oldValue && log.newValue && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Changed from:</span>
                        <code className="px-2 py-1 bg-red-50 text-red-700 rounded border border-red-200">
                          {log.oldValue}
                        </code>
                        <span className="text-gray-400">→</span>
                        <code className="px-2 py-1 bg-green-50 text-green-700 rounded border border-green-200">
                          {log.newValue}
                        </code>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Performed by: <span className="text-gray-700">{log.performedBy}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline">
            Load More Activity
          </Button>
        </div>
      </Card>
    </div>
  );
}
