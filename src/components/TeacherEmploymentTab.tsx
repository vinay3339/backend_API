import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface TeacherEmploymentTabProps {
  teacher: any;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

export function TeacherEmploymentTab({ teacher, isEditing = false, onFieldChange }: TeacherEmploymentTabProps) {
  const handleChange = (field: string, value: any) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Employment Details */}
      <Card className="p-6">
        <h3 className="mb-6">Employment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Employee ID</Label>
            {isEditing ? (
              <Input 
                value={teacher.employeeId} 
                onChange={(e) => handleChange('employeeId', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.employeeId}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Date of Joining</Label>
            {isEditing ? (
              <Input 
                type="date"
                value={teacher.dateOfJoining} 
                onChange={(e) => handleChange('dateOfJoining', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.dateOfJoining}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Designation</Label>
            {isEditing ? (
              <Input 
                value={teacher.designation} 
                onChange={(e) => handleChange('designation', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.designation}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Department</Label>
            {isEditing ? (
              <Select value={teacher.department} onValueChange={(value) => handleChange('department', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Physical Education">Physical Education</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{teacher.department}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label className="text-gray-500 mb-2 block">Subjects Assigned</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {teacher.subjectsAssigned?.map((subject: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200">
                  {subject}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">Edit subjects in the Assignment section</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label className="text-gray-500 mb-2 block">Classes Assigned</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {teacher.classesAssigned?.map((cls: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                  {cls}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">Edit classes in the Assignment section</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Sections Assigned</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {teacher.sectionsAssigned?.map((section: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 border border-purple-200">
                  {section}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">Edit sections in the Assignment section</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Employment Type</Label>
            {isEditing ? (
              <Select value={teacher.employmentType} onValueChange={(value) => handleChange('employmentType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{teacher.employmentType}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}