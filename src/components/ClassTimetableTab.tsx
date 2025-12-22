import { useState } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Edit2, Plus } from 'lucide-react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Lunch', 'Period 5', 'Period 6', 'Period 7'];

const defaultTimetable: any = {
  'Section A': {
    Monday: [
      { subject: 'Mathematics', teacher: 'Mrs. Priya Sharma' },
      { subject: 'Physics', teacher: 'Mr. Rajesh Kumar' },
      { subject: 'Chemistry', teacher: 'Mrs. Lakshmi Reddy' },
      { subject: 'English', teacher: 'Mrs. Anjali Patel' },
      { subject: 'Lunch', teacher: '-' },
      { subject: 'Biology', teacher: 'Mr. Suresh Babu' },
      { subject: 'Telugu', teacher: 'Mr. Krishna Rao' },
      { subject: 'PE', teacher: 'Mr. Ravi Kumar' },
    ],
    Tuesday: [
      { subject: 'English', teacher: 'Mrs. Anjali Patel' },
      { subject: 'Mathematics', teacher: 'Mrs. Priya Sharma' },
      { subject: 'Physics', teacher: 'Mr. Rajesh Kumar' },
      { subject: 'Chemistry', teacher: 'Mrs. Lakshmi Reddy' },
      { subject: 'Lunch', teacher: '-' },
      { subject: 'Social Studies', teacher: 'Mrs. Meena Reddy' },
      { subject: 'Computer Science', teacher: 'Mr. Karthik Singh' },
      { subject: 'Biology', teacher: 'Mr. Suresh Babu' },
    ],
  },
};

interface ClassTimetableTabProps {
  classData: any;
}

export function ClassTimetableTab({ classData }: ClassTimetableTabProps) {
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [timetable, setTimetable] = useState(defaultTimetable);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCell, setEditingCell] = useState<{
    day: string;
    period: number;
  } | null>(null);
  const [editSubject, setEditSubject] = useState('');
  const [editTeacher, setEditTeacher] = useState('');

  const sections = ['Section A', 'Section B', 'Section C', 'Section D'];

  const handleEditCell = (day: string, periodIdx: number) => {
    if (periods[periodIdx] === 'Lunch') return;
    
    const currentTimetable = timetable[selectedSection] || {};
    const slot = currentTimetable[day]?.[periodIdx];
    
    setEditingCell({ day, period: periodIdx });
    setEditSubject(slot?.subject || '');
    setEditTeacher(slot?.teacher || '');
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingCell) return;

    const newTimetable = { ...timetable };
    if (!newTimetable[selectedSection]) {
      newTimetable[selectedSection] = {};
    }
    if (!newTimetable[selectedSection][editingCell.day]) {
      newTimetable[selectedSection][editingCell.day] = [];
    }

    newTimetable[selectedSection][editingCell.day][editingCell.period] = {
      subject: editSubject,
      teacher: editTeacher,
    };

    setTimetable(newTimetable);
    setIsEditDialogOpen(false);
    setEditingCell(null);
  };

  const currentTimetable = timetable[selectedSection] || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3>Class Timetable</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage weekly timetable for {classData.className}
          </p>
        </div>
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => (
              <SelectItem key={section} value={section}>
                {section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Timetable Grid */}
      <Card className="p-6">
        <div className="mb-4 text-sm text-gray-600">
          Click on any cell to edit. Lunch period is fixed.
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 border-r min-w-[100px]">Day / Period</th>
                {periods.map((period, idx) => (
                  <th
                    key={idx}
                    className={`text-left p-3 border-r min-w-[140px] ${
                      period === 'Lunch' ? 'bg-orange-50' : ''
                    }`}
                  >
                    {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekDays.map((day, dayIdx) => (
                <tr key={dayIdx} className="border-b hover:bg-gray-50">
                  <td className="p-3 border-r bg-gray-50">{day}</td>
                  {periods.map((period, periodIdx) => {
                    if (period === 'Lunch') {
                      return (
                        <td
                          key={periodIdx}
                          className="p-3 border-r bg-orange-50 text-center"
                        >
                          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                            Lunch Break
                          </Badge>
                        </td>
                      );
                    }

                    const slot = currentTimetable[day]?.[periodIdx];

                    return (
                      <td
                        key={periodIdx}
                        className="p-3 border-r cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => handleEditCell(day, periodIdx)}
                      >
                        {slot ? (
                          <div className="space-y-1">
                            <p className="text-sm text-gray-900">{slot.subject}</p>
                            <p className="text-xs text-gray-500">{slot.teacher}</p>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 text-sm">
                            <Plus className="h-4 w-4 mx-auto" />
                          </div>
                        )}
                      </td>
                    );
                  })}
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
              {editingCell && `${editingCell.day} - ${periods[editingCell.period]} (${selectedSection})`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={editSubject} onValueChange={setEditSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="PE">Physical Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Teacher</Label>
              <Select value={editTeacher} onValueChange={setEditTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mrs. Priya Sharma">Mrs. Priya Sharma</SelectItem>
                  <SelectItem value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</SelectItem>
                  <SelectItem value="Mrs. Lakshmi Reddy">Mrs. Lakshmi Reddy</SelectItem>
                  <SelectItem value="Mr. Suresh Babu">Mr. Suresh Babu</SelectItem>
                  <SelectItem value="Mrs. Anjali Patel">Mrs. Anjali Patel</SelectItem>
                  <SelectItem value="Mr. Krishna Rao">Mr. Krishna Rao</SelectItem>
                  <SelectItem value="Mrs. Meena Reddy">Mrs. Meena Reddy</SelectItem>
                  <SelectItem value="Mr. Karthik Singh">Mr. Karthik Singh</SelectItem>
                  <SelectItem value="Mr. Ravi Kumar">Mr. Ravi Kumar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
