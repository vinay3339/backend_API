import { useState } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Edit2, Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface TeacherTimetableTabProps {
  teacher: any;
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6', 'Period 7'];

const defaultTimetable = {
  Monday: [
    { class: 'Class 8-A', subject: 'Mathematics' },
    { class: 'Class 8-B', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
    { class: 'Class 7-A', subject: 'Mathematics' },
    { class: 'Class 7-B', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
    { class: 'Class 9-A', subject: 'Mathematics' },
  ],
  Tuesday: [
    { class: 'Class 9-A', subject: 'Mathematics' },
    { class: 'Class 8-A', subject: 'Mathematics' },
    { class: 'Class 8-B', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
    { class: 'Class 7-A', subject: 'Mathematics' },
    { class: 'Class 7-B', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
  ],
  Wednesday: [
    { class: 'Class 8-A', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
    { class: 'Class 9-A', subject: 'Mathematics' },
    { class: 'Class 8-B', subject: 'Mathematics' },
    { class: 'Class 7-A', subject: 'Mathematics' },
    { class: 'Class 7-B', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
  ],
  Thursday: [
    { class: 'Class 7-A', subject: 'Mathematics' },
    { class: 'Class 8-A', subject: 'Mathematics' },
    { class: 'Class 8-B', subject: 'Mathematics' },
    { class: 'Class 9-A', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
    { class: 'Class 7-B', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
  ],
  Friday: [
    { class: 'Class 9-A', subject: 'Mathematics' },
    { class: 'Class 7-A', subject: 'Mathematics' },
    { class: 'Class 8-A', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
    { class: 'Class 8-B', subject: 'Mathematics' },
    { class: 'Class 7-B', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
  ],
  Saturday: [
    { class: 'Class 8-A', subject: 'Mathematics' },
    { class: 'Class 9-A', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
    { class: 'Class 7-A', subject: 'Mathematics' },
    { class: '-', subject: 'Free Period' },
    { class: '-', subject: 'Free Period' },
    { class: '-', subject: 'Free Period' },
  ],
};

export function TeacherTimetableTab({ teacher }: TeacherTimetableTabProps) {
  const [timetable, setTimetable] = useState(teacher.timetable || defaultTimetable);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editingPeriod, setEditingPeriod] = useState<number | null>(null);
  const [tempClass, setTempClass] = useState('');
  const [tempSubject, setTempSubject] = useState('');

  const availableClasses = teacher.classesAssigned || [
    'Class 7-A', 'Class 7-B', 'Class 8-A', 'Class 8-B', 'Class 9-A', '-'
  ];

  const availableSubjects = teacher.subjectsAssigned || ['Mathematics', 'Free Period'];

  const handleEditSlot = (day: string, periodIdx: number) => {
    setEditingDay(day);
    setEditingPeriod(periodIdx);
    const slot = timetable[day][periodIdx];
    setTempClass(slot.class);
    setTempSubject(slot.subject);
    setIsEditDialogOpen(true);
  };

  const handleSaveSlot = () => {
    if (editingDay && editingPeriod !== null) {
      const newTimetable = { ...timetable };
      newTimetable[editingDay][editingPeriod] = {
        class: tempClass,
        subject: tempClass === '-' ? 'Free Period' : tempSubject,
      };
      setTimetable(newTimetable);
      setIsEditDialogOpen(false);
      setEditingDay(null);
      setEditingPeriod(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
    setEditingDay(null);
    setEditingPeriod(null);
    setTempClass('');
    setTempSubject('');
  };

  const totalPeriods = weekDays.reduce((total, day) => {
    return total + timetable[day].filter((slot: any) => slot.class !== '-').length;
  }, 0);

  const freePeriods = weekDays.reduce((total, day) => {
    return total + timetable[day].filter((slot: any) => slot.class === '-').length;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Class Allocation */}
      <Card className="p-6">
        <h3 className="mb-6">Class Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Label className="text-gray-500 mb-2 block">Assigned Classes</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {teacher.classesAssigned?.map((cls: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200">
                  {cls}
                </Badge>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <Label className="text-gray-500 mb-2 block">Assigned Subjects</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {teacher.subjectsAssigned?.map((subject: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Total Periods per Week</Label>
            <p className="text-gray-900">{totalPeriods} periods</p>
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Max Periods/Day</Label>
            <p className="text-gray-900">6 periods</p>
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Free Periods</Label>
            <p className="text-gray-900">{freePeriods} periods/week</p>
          </div>
        </div>
      </Card>

      {/* Weekly Timetable Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Weekly Timetable</h3>
          <div className="text-sm text-gray-500">Click on any period to edit</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 border-r min-w-[100px]">Day</th>
                {periods.map((period, idx) => (
                  <th key={idx} className="text-left p-3 border-r min-w-[140px]">
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekDays.map((day, dayIdx) => (
                <tr key={dayIdx} className="border-b hover:bg-gray-50">
                  <td className="p-3 border-r bg-gray-50">{day}</td>
                  {timetable[day]?.map((slot: any, slotIdx: number) => (
                    <td 
                      key={slotIdx} 
                      className="p-3 border-r cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => handleEditSlot(day, slotIdx)}
                    >
                      {slot.class !== '-' ? (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900">{slot.class}</p>
                          <p className="text-xs text-gray-500">{slot.subject}</p>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-gray-400">
                          Free Period
                        </Badge>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Period Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Timetable Slot</DialogTitle>
            <DialogDescription>
              {editingDay} - {editingPeriod !== null ? periods[editingPeriod] : ''}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={tempClass} onValueChange={setTempClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {availableClasses.map((cls: string) => (
                    <SelectItem key={cls} value={cls}>
                      {cls === '-' ? 'Free Period' : cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {tempClass !== '-' && (
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={tempSubject} onValueChange={setTempSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject: string) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveSlot}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
