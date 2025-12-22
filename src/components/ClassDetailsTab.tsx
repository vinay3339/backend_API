import { useState } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Edit2, Save, X } from 'lucide-react';

interface ClassDetailsTabProps {
  classData: any;
}

export function ClassDetailsTab({ classData }: ClassDetailsTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...classData });

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    alert('Class details updated successfully!');
  };

  const handleCancel = () => {
    setEditedData({ ...classData });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setEditedData({ ...editedData, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Class Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Class Information</h3>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Class Name</Label>
            {isEditing ? (
              <Input
                value={editedData.className}
                onChange={(e) => handleChange('className', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{editedData.className}</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Class Code</Label>
            {isEditing ? (
              <Input
                value={editedData.classCode}
                onChange={(e) => handleChange('classCode', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{editedData.classCode}</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Academic Year</Label>
            {isEditing ? (
              <Input
                value={editedData.academicYear}
                onChange={(e) => handleChange('academicYear', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{editedData.academicYear}</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Medium</Label>
            {isEditing ? (
              <Select
                value={editedData.medium}
                onValueChange={(value) => handleChange('medium', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Bilingual">Bilingual</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{editedData.medium}</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Syllabus Type</Label>
            {isEditing ? (
              <Select
                value={editedData.syllabusType}
                onValueChange={(value) => handleChange('syllabusType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="State Board">State Board</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="IB">IB</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{editedData.syllabusType}</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Category</Label>
            {isEditing ? (
              <Select
                value={editedData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Middle School">Middle School</SelectItem>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Junior College">Junior College</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{editedData.category}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Class Capacity & Strength */}
      <Card className="p-6">
        <h3 className="mb-6">Class Capacity & Strength</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Max Capacity (Per Section)</Label>
            {isEditing ? (
              <Input
                type="number"
                value={editedData.maxCapacity}
                onChange={(e) => handleChange('maxCapacity', parseInt(e.target.value))}
              />
            ) : (
              <p className="text-gray-900">{editedData.maxCapacity}</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Total Strength</Label>
            <p className="text-gray-900">{editedData.totalStrength}</p>
            <p className="text-xs text-gray-500 mt-1">Auto-calculated</p>
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Boys Count</Label>
            <p className="text-blue-600">{editedData.boysCount}</p>
            <p className="text-xs text-gray-500 mt-1">Auto-calculated</p>
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Girls Count</Label>
            <p className="text-pink-600">{editedData.girlsCount}</p>
            <p className="text-xs text-gray-500 mt-1">Auto-calculated</p>
          </div>
        </div>
      </Card>

      {/* Additional Settings */}
      <Card className="p-6">
        <h3 className="mb-6">Additional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Class Incharge</Label>
            {isEditing ? (
              <Select defaultValue="Mrs. Priya Sharma">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mrs. Priya Sharma">Mrs. Priya Sharma</SelectItem>
                  <SelectItem value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</SelectItem>
                  <SelectItem value="Mrs. Lakshmi Reddy">Mrs. Lakshmi Reddy</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">Mrs. Priya Sharma</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Promotion To</Label>
            {isEditing ? (
              <Select defaultValue="Class 11">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 11">Class 11</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">Class 11</p>
            )}
          </div>

          <div>
            <Label className="text-gray-500 mb-2 block">Minimum Attendance %</Label>
            {isEditing ? (
              <Input type="number" defaultValue="75" />
            ) : (
              <p className="text-gray-900">75%</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
