import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  Edit, 
  Award, 
  DollarSign, 
  RefreshCw, 
  UserPlus, 
  CheckCircle,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

interface AuditLog {
  id: string;
  date: string;
  time: string;
  actor: string;
  action: string;
  description: string;
  oldValue?: string;
  newValue?: string;
  type: 'profile' | 'academic' | 'fee' | 'account' | 'document';
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    date: '2024-11-23',
    time: '10:30 AM',
    actor: 'Mrs. Administrator',
    action: 'Updated Profile',
    description: 'Changed phone number',
    oldValue: '+91 98765 43210',
    newValue: '+91 98765 43211',
    type: 'profile',
  },
  {
    id: '2',
    date: '2024-11-22',
    time: '02:15 PM',
    actor: 'Mr. Mathematics Teacher',
    action: 'Updated Marks',
    description: 'Uploaded FA1 Mathematics marks',
    oldValue: 'Not entered',
    newValue: '90/100',
    type: 'academic',
  },
  {
    id: '3',
    date: '2024-11-20',
    time: '11:45 AM',
    actor: 'Student',
    action: 'Password Reset',
    description: 'Changed password after first login',
    type: 'account',
  },
  {
    id: '4',
    date: '2024-11-15',
    time: '09:00 AM',
    actor: 'Accounts Department',
    action: 'Fee Payment',
    description: 'Received Term 2 tuition fee payment',
    oldValue: '₹28,000 pending',
    newValue: '₹21,000 paid',
    type: 'fee',
  },
  {
    id: '5',
    date: '2024-11-10',
    time: '03:30 PM',
    actor: 'Mrs. Class Teacher',
    action: 'Updated Class',
    description: 'Promoted from Class 9 to Class 10',
    oldValue: 'Class 9, Section A',
    newValue: 'Class 10, Section B',
    type: 'profile',
  },
  {
    id: '6',
    date: '2024-11-05',
    time: '01:20 PM',
    actor: 'Dr. Principal',
    action: 'Updated Documents',
    description: 'Verified and approved Aadhar card document',
    oldValue: 'Pending verification',
    newValue: 'Verified',
    type: 'document',
  },
  {
    id: '7',
    date: '2024-10-28',
    time: '10:00 AM',
    actor: 'Transport Coordinator',
    action: 'Updated Profile',
    description: 'Changed transport route details',
    oldValue: 'Route R-12, Pickup: Kothapet',
    newValue: 'Route R-14, Pickup: LB Nagar',
    type: 'profile',
  },
  {
    id: '8',
    date: '2024-10-15',
    time: '12:30 PM',
    actor: 'Mrs. Science Teacher',
    action: 'Updated Marks',
    description: 'Updated Science practical marks',
    oldValue: '18/20',
    newValue: '19/20',
    type: 'academic',
  },
  {
    id: '9',
    date: '2024-09-30',
    time: '04:00 PM',
    actor: 'Accounts Department',
    action: 'Fee Payment',
    description: 'Received Term 1 payment',
    oldValue: '₹35,000 pending',
    newValue: '₹20,000 paid',
    type: 'fee',
  },
  {
    id: '10',
    date: '2024-09-10',
    time: '09:15 AM',
    actor: 'Mrs. Administrator',
    action: 'Account Created',
    description: 'Created student portal account',
    newValue: 'Account activated',
    type: 'account',
  },
];

function getActionIcon(type: string) {
  switch (type) {
    case 'profile':
      return <Edit className="w-4 h-4" />;
    case 'academic':
      return <Award className="w-4 h-4" />;
    case 'fee':
      return <DollarSign className="w-4 h-4" />;
    case 'account':
      return <RefreshCw className="w-4 h-4" />;
    case 'document':
      return <FileText className="w-4 h-4" />;
    default:
      return <Calendar className="w-4 h-4" />;
  }
}

function getActionColor(type: string) {
  switch (type) {
    case 'profile':
      return 'bg-blue-100 text-blue-600';
    case 'academic':
      return 'bg-purple-100 text-purple-600';
    case 'fee':
      return 'bg-green-100 text-green-600';
    case 'account':
      return 'bg-orange-100 text-orange-600';
    case 'document':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

function getBadgeColor(type: string) {
  switch (type) {
    case 'profile':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'academic':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'fee':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'account':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'document':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
}

export function StudentAuditTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900">Recent Activity</h3>
        <p className="text-sm text-gray-500">Last 30 days</p>
      </div>

      <div className="space-y-3">
        {mockAuditLogs.map((log) => (
          <Card
            key={log.id}
            className="p-4 rounded-xl hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`p-2 rounded-lg flex-shrink-0 ${getActionColor(log.type)}`}>
                {getActionIcon(log.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-gray-900">{log.action}</p>
                    <Badge className={`${getBadgeColor(log.type)} rounded-full`}>
                      {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{log.date}</span>
                    <span>{log.time}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 mb-2">{log.description}</p>

                {/* Old Value → New Value */}
                {log.oldValue && log.newValue && (
                  <div className="flex items-center gap-2 mt-3 p-2 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Old Value</p>
                      <p className="text-xs text-gray-700 truncate">{log.oldValue}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">New Value</p>
                      <p className="text-xs text-green-700 truncate">{log.newValue}</p>
                    </div>
                  </div>
                )}

                {/* Only New Value */}
                {!log.oldValue && log.newValue && (
                  <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <p className="text-xs text-green-700">{log.newValue}</p>
                    </div>
                  </div>
                )}

                {/* Actor */}
                <div className="flex items-center gap-1.5 mt-2">
                  <p className="text-xs text-gray-500">
                    by <span className="text-gray-700">{log.actor}</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-2">
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Load More Activity
        </button>
      </div>
    </div>
  );
}
