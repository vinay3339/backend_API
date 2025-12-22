import { Card } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';

interface TeacherAccountTabProps {
  teacher: any;
}

export function TeacherAccountTab({ teacher }: TeacherAccountTabProps) {
  const permissions = [
    { id: 'attendance', label: 'Can Take Attendance', checked: true },
    { id: 'marks', label: 'Can Upload Marks', checked: true },
    { id: 'homework', label: 'Can Upload Homework / Materials', checked: true },
    { id: 'reports', label: 'Can Submit Reports', checked: true },
    { id: 'message_parents', label: 'Can Message Parents', checked: true },
    { id: 'finance', label: 'Can Access Finance Info', checked: false },
    { id: 'view_reports', label: 'Can Access Reports', checked: false },
    { id: 'behaviour', label: 'Can Update Student Behaviour', checked: true },
  ];

  return (
    <div className="space-y-6">
      {/* Portal Login Information */}
      <Card className="p-6">
        <h3 className="mb-6">Portal Login Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Username</Label>
            <p className="text-gray-900">{teacher.username || teacher.email}</p>
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Default Password</Label>
            <p className="text-gray-900 font-mono">••••••••</p>
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Last Login</Label>
            <p className="text-gray-900">{teacher.lastLogin || 'Nov 28, 2025 at 10:30 AM'}</p>
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Account Status</Label>
            <div className="flex items-center gap-3">
              <Switch defaultChecked={teacher.status === 'Active'} />
              <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                {teacher.status}
              </Badge>
            </div>
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">First Login Status</Label>
            <Badge variant={teacher.firstLoginCompleted ? 'default' : 'secondary'}>
              {teacher.firstLoginCompleted ? 'Completed' : 'Pending'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Permissions Section */}
      <Card className="p-6">
        <h3 className="mb-6">Permissions</h3>
        <div className="space-y-4">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
              <Checkbox id={permission.id} defaultChecked={permission.checked} />
              <label
                htmlFor={permission.id}
                className="flex-1 cursor-pointer"
              >
                {permission.label}
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
