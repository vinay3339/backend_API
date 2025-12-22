import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

interface TeacherQualificationTabProps {
  teacher: any;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

export function TeacherQualificationTab({ teacher, isEditing = false, onFieldChange }: TeacherQualificationTabProps) {
  const handleChange = (field: string, value: any) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Qualification Details */}
      <Card className="p-6">
        <h3 className="mb-6">Qualification Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Highest Qualification</Label>
            {isEditing ? (
              <Input 
                value={teacher.highestQualification} 
                onChange={(e) => handleChange('highestQualification', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.highestQualification}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Specialization</Label>
            {isEditing ? (
              <Input 
                value={teacher.specialization} 
                onChange={(e) => handleChange('specialization', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.specialization}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">University Name</Label>
            {isEditing ? (
              <Input 
                value={teacher.universityName} 
                onChange={(e) => handleChange('universityName', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.universityName}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Year of Passing</Label>
            {isEditing ? (
              <Input 
                value={teacher.yearOfPassing} 
                onChange={(e) => handleChange('yearOfPassing', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.yearOfPassing}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Total Experience</Label>
            {isEditing ? (
              <Input 
                type="number"
                value={teacher.totalExperience} 
                onChange={(e) => handleChange('totalExperience', parseInt(e.target.value))}
              />
            ) : (
              <p className="text-gray-900">{teacher.totalExperience} years</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label className="text-gray-500 mb-2 block">Previous School Name</Label>
            {isEditing ? (
              <Input 
                value={teacher.previousSchool || ''} 
                onChange={(e) => handleChange('previousSchool', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.previousSchool || '-'}</p>
            )}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label className="text-gray-500 mb-2 block">Previous Experience Description</Label>
            {isEditing ? (
              <Textarea 
                value={teacher.previousExperienceDescription || ''} 
                onChange={(e) => handleChange('previousExperienceDescription', e.target.value)}
                rows={3}
              />
            ) : (
              <p className="text-gray-900">{teacher.previousExperienceDescription || '-'}</p>
            )}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label className="text-gray-500 mb-2 block">Certifications</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {teacher.certifications?.map((cert: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {cert}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">Add or remove certifications in the advanced editor</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
