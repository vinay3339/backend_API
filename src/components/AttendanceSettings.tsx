import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { 
  Settings,
  Save,
  Calendar,
  Clock,
  Bell,
  Users,
  Shield
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function AttendanceSettings() {
  const [settings, setSettings] = useState({
    // Attendance Mode
    isPeriodWise: false,
    
    // Permissions
    allowTeachersToMark: true,
    onlyClassTeacherCanMark: false,
    allowBackdatedAttendance: true,
    maxBackdatedDays: 7,
    
    // Cut-off Times
    attendanceCutoffTime: '10:30',
    lateArrivalTime: '08:45',
    
    // Working Days
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    
    // Half Day Rules
    halfDayBeforePeriod: '4',
    
    // Auto Alerts
    enableParentNotification: true,
    minAttendanceThreshold: 75,
    alertOnAbsent: true,
    alertOnBelowThreshold: true,
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleToggleWorkingDay = (day: keyof typeof settings.workingDays) => {
    setSettings({
      ...settings,
      workingDays: {
        ...settings.workingDays,
        [day]: !settings.workingDays[day],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Attendance Mode */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Settings className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">Attendance Mode</h3>
            <p className="text-sm text-gray-600">Choose how attendance is tracked</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="text-gray-900">Period-wise Attendance</Label>
              <p className="text-sm text-gray-500">Enable period-wise attendance tracking instead of daily</p>
            </div>
            <Switch
              checked={settings.isPeriodWise}
              onCheckedChange={(checked) => setSettings({ ...settings, isPeriodWise: checked })}
            />
          </div>
        </div>
      </Card>

      {/* Attendance Permissions */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">Attendance Permissions</h3>
            <p className="text-sm text-gray-600">Control who can mark and modify attendance</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="text-gray-900">Allow Teachers to Mark Attendance</Label>
              <p className="text-sm text-gray-500">Teachers can mark attendance for their classes</p>
            </div>
            <Switch
              checked={settings.allowTeachersToMark}
              onCheckedChange={(checked) => setSettings({ ...settings, allowTeachersToMark: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="text-gray-900">Only Class Teacher Can Mark Attendance</Label>
              <p className="text-sm text-gray-500">Restrict attendance marking to class teachers only</p>
            </div>
            <Switch
              checked={settings.onlyClassTeacherCanMark}
              onCheckedChange={(checked) => setSettings({ ...settings, onlyClassTeacherCanMark: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="text-gray-900">Allow Backdated Attendance</Label>
              <p className="text-sm text-gray-500">Enable marking attendance for previous dates</p>
            </div>
            <Switch
              checked={settings.allowBackdatedAttendance}
              onCheckedChange={(checked) => setSettings({ ...settings, allowBackdatedAttendance: checked })}
            />
          </div>

          {settings.allowBackdatedAttendance && (
            <div className="p-4 border rounded-lg ml-8 bg-gray-50">
              <Label>Maximum Backdated Days</Label>
              <Input
                type="number"
                min="1"
                max="30"
                value={settings.maxBackdatedDays}
                onChange={(e) => setSettings({ ...settings, maxBackdatedDays: parseInt(e.target.value) })}
                className="mt-2 w-32"
              />
              <p className="text-sm text-gray-500 mt-1">Teachers can mark attendance up to {settings.maxBackdatedDays} days in the past</p>
            </div>
          )}
        </div>
      </Card>

      {/* Cut-off Times */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">Cut-off Times</h3>
            <p className="text-sm text-gray-600">Define attendance marking deadlines</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Attendance Cut-off Time</Label>
            <Input
              type="time"
              value={settings.attendanceCutoffTime}
              onChange={(e) => setSettings({ ...settings, attendanceCutoffTime: e.target.value })}
            />
            <p className="text-sm text-gray-500">Attendance must be marked before this time</p>
          </div>

          <div className="space-y-2">
            <Label>Late Arrival Time</Label>
            <Input
              type="time"
              value={settings.lateArrivalTime}
              onChange={(e) => setSettings({ ...settings, lateArrivalTime: e.target.value })}
            />
            <p className="text-sm text-gray-500">Students arriving after this time are marked as late</p>
          </div>
        </div>
      </Card>

      {/* Working Days */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">Working Days</h3>
            <p className="text-sm text-gray-600">Select which days are school working days</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {Object.entries(settings.workingDays).map(([day, isWorking]) => (
            <div
              key={day}
              onClick={() => handleToggleWorkingDay(day as keyof typeof settings.workingDays)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                isWorking
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-center">
                <p className="text-sm text-gray-900 capitalize mb-2">{day.slice(0, 3)}</p>
                <div className={`w-5 h-5 rounded-full mx-auto ${
                  isWorking ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Half Day Rules */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">Half Day Rules</h3>
            <p className="text-sm text-gray-600">Configure half day attendance criteria</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mark Half Day if Student Leaves Before Period</Label>
          <Select
            value={settings.halfDayBeforePeriod}
            onValueChange={(value) => setSettings({ ...settings, halfDayBeforePeriod: value })}
          >
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Period 3</SelectItem>
              <SelectItem value="4">Period 4</SelectItem>
              <SelectItem value="5">Period 5</SelectItem>
              <SelectItem value="6">Period 6</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">Students leaving before this period will be marked as half day</p>
        </div>
      </Card>

      {/* Auto Alerts */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Bell className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">Automatic Alerts</h3>
            <p className="text-sm text-gray-600">Configure automated parent notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="text-gray-900">Enable Parent Notifications</Label>
              <p className="text-sm text-gray-500">Send SMS/Email alerts to parents</p>
            </div>
            <Switch
              checked={settings.enableParentNotification}
              onCheckedChange={(checked) => setSettings({ ...settings, enableParentNotification: checked })}
            />
          </div>

          {settings.enableParentNotification && (
            <div className="p-4 border rounded-lg ml-8 bg-gray-50 space-y-4">
              <div className="space-y-2">
                <Label>Minimum Attendance Threshold (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.minAttendanceThreshold}
                  onChange={(e) => setSettings({ ...settings, minAttendanceThreshold: parseInt(e.target.value) })}
                  className="w-32"
                />
                <p className="text-sm text-gray-500">Alert parents when attendance falls below {settings.minAttendanceThreshold}%</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <Label className="text-gray-900">Alert on Daily Absence</Label>
                <Switch
                  checked={settings.alertOnAbsent}
                  onCheckedChange={(checked) => setSettings({ ...settings, alertOnAbsent: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <Label className="text-gray-900">Alert on Below Threshold</Label>
                <Switch
                  checked={settings.alertOnBelowThreshold}
                  onCheckedChange={(checked) => setSettings({ ...settings, alertOnBelowThreshold: checked })}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
