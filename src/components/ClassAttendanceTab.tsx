import { useState } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Edit2, Save, X } from 'lucide-react';

interface ClassAttendanceTabProps {
  classData: any;
}

export function ClassAttendanceTab({ classData }: ClassAttendanceTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    attendanceType: 'Daily',
    workingDaysPerMonth: 24,
    classTeacherOnly: true,
    lateMarkThreshold: 15,
    allowNotes: true,
    minimumAttendance: 75,
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Attendance settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3>Attendance Settings</h3>
          <p className="text-sm text-gray-600 mt-1">
            Configure attendance rules for {classData.className}
          </p>
        </div>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Settings
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <h3 className="mb-6">General Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Attendance Type</Label>
            {isEditing ? (
              <Select
                value={settings.attendanceType}
                onValueChange={(value) => setSettings({ ...settings, attendanceType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily Attendance</SelectItem>
                  <SelectItem value="Period-wise">Period-wise Attendance</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{settings.attendanceType}</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Working Days per Month</Label>
            {isEditing ? (
              <Input
                type="number"
                value={settings.workingDaysPerMonth}
                onChange={(e) =>
                  setSettings({ ...settings, workingDaysPerMonth: parseInt(e.target.value) })
                }
              />
            ) : (
              <p className="text-gray-900">{settings.workingDaysPerMonth} days</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Minimum Attendance Required</Label>
            {isEditing ? (
              <Input
                type="number"
                value={settings.minimumAttendance}
                onChange={(e) =>
                  setSettings({ ...settings, minimumAttendance: parseInt(e.target.value) })
                }
              />
            ) : (
              <p className="text-gray-900">{settings.minimumAttendance}%</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Late Mark Threshold (minutes)</Label>
            {isEditing ? (
              <Input
                type="number"
                value={settings.lateMarkThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, lateMarkThreshold: parseInt(e.target.value) })
                }
              />
            ) : (
              <p className="text-gray-900">{settings.lateMarkThreshold} minutes</p>
            )}
          </div>
        </div>
      </Card>

      {/* Permission Settings */}
      <Card className="p-6">
        <h3 className="mb-6">Permission Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="text-gray-900">Allow Class Teacher Only</Label>
              <p className="text-sm text-gray-500 mt-1">
                Only class teachers can mark attendance for their sections
              </p>
            </div>
            {isEditing ? (
              <Switch
                checked={settings.classTeacherOnly}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, classTeacherOnly: checked })
                }
              />
            ) : (
              <span className="text-sm text-gray-900">
                {settings.classTeacherOnly ? 'Enabled' : 'Disabled'}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="text-gray-900">Allow Attendance Notes</Label>
              <p className="text-sm text-gray-500 mt-1">
                Teachers can add notes while marking attendance
              </p>
            </div>
            {isEditing ? (
              <Switch
                checked={settings.allowNotes}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowNotes: checked })
                }
              />
            ) : (
              <span className="text-sm text-gray-900">
                {settings.allowNotes ? 'Enabled' : 'Disabled'}
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Attendance Codes */}
      <Card className="p-6">
        <h3 className="mb-6">Attendance Status Codes</h3>
        <div className="space-y-3">
          {[
            { code: 'P', label: 'Present', color: 'bg-green-100 text-green-700 border-green-200' },
            { code: 'A', label: 'Absent', color: 'bg-red-100 text-red-700 border-red-200' },
            { code: 'L', label: 'Late', color: 'bg-orange-100 text-orange-700 border-orange-200' },
            { code: 'H', label: 'Half Day', color: 'bg-blue-100 text-blue-700 border-blue-200' },
            { code: 'E', label: 'Excused', color: 'bg-purple-100 text-purple-700 border-purple-200' },
            { code: 'S', label: 'Sick Leave', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${item.color}`}>
                  <span className="font-semibold">{item.code}</span>
                </div>
                <span className="text-sm text-gray-900">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Holiday Configuration */}
      <Card className="p-6">
        <h3 className="mb-6">Holiday Configuration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure holidays and non-working days for {classData.academicYear}
        </p>
        <Button variant="outline">
          Manage Holidays
        </Button>
      </Card>
    </div>
  );
}
