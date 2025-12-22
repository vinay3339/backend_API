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

interface TeacherProfileTabProps {
  teacher: any;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: string) => void;
}

export function TeacherProfileTab({ teacher, isEditing = false, onFieldChange }: TeacherProfileTabProps) {
  const handleChange = (field: string, value: string) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="p-6">
        <h3 className="mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">First Name</Label>
            {isEditing ? (
              <Input 
                value={teacher.firstName} 
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.firstName}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Last Name</Label>
            {isEditing ? (
              <Input 
                value={teacher.lastName} 
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.lastName}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Gender</Label>
            {isEditing ? (
              <Select value={teacher.gender} onValueChange={(value) => handleChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{teacher.gender}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Date of Birth</Label>
            {isEditing ? (
              <Input 
                type="date"
                value={teacher.dateOfBirth} 
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.dateOfBirth}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Blood Group</Label>
            {isEditing ? (
              <Select value={teacher.bloodGroup || ''} onValueChange={(value) => handleChange('bloodGroup', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{teacher.bloodGroup || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Mother Tongue</Label>
            {isEditing ? (
              <Input 
                value={teacher.motherTongue || ''} 
                onChange={(e) => handleChange('motherTongue', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.motherTongue || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Religion</Label>
            {isEditing ? (
              <Input 
                value={teacher.religion || ''} 
                onChange={(e) => handleChange('religion', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.religion || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Caste Category</Label>
            {isEditing ? (
              <Select value={teacher.casteCategory || ''} onValueChange={(value) => handleChange('casteCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="OBC">OBC</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="ST">ST</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{teacher.casteCategory || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Aadhar Number</Label>
            {isEditing ? (
              <Input 
                value={teacher.aadharNumber || ''} 
                onChange={(e) => handleChange('aadharNumber', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.aadharNumber || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">PAN Number</Label>
            {isEditing ? (
              <Input 
                value={teacher.panNumber || ''} 
                onChange={(e) => handleChange('panNumber', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.panNumber || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Nationality</Label>
            {isEditing ? (
              <Input 
                value={teacher.nationality || 'Indian'} 
                onChange={(e) => handleChange('nationality', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.nationality || 'Indian'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Marital Status</Label>
            {isEditing ? (
              <Select value={teacher.maritalStatus || ''} onValueChange={(value) => handleChange('maritalStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{teacher.maritalStatus || '-'}</p>
            )}
          </div>
          {teacher.maritalStatus === 'Married' && (
            <div>
              <Label className="text-gray-500 mb-2 block">Spouse Name</Label>
              {isEditing ? (
                <Input 
                  value={teacher.spouseName || ''} 
                  onChange={(e) => handleChange('spouseName', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{teacher.spouseName || '-'}</p>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6">
        <h3 className="mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Email Address</Label>
            {isEditing ? (
              <Input 
                type="email"
                value={teacher.email} 
                onChange={(e) => handleChange('email', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.email}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Primary Phone Number</Label>
            {isEditing ? (
              <Input 
                value={teacher.phoneNumber} 
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.phoneNumber}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Alternate Phone Number</Label>
            {isEditing ? (
              <Input 
                value={teacher.alternatePhone || ''} 
                onChange={(e) => handleChange('alternatePhone', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.alternatePhone || '-'}</p>
            )}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label className="text-gray-500 mb-2 block">Present Address</Label>
            {isEditing ? (
              <Input 
                value={teacher.presentAddress} 
                onChange={(e) => handleChange('presentAddress', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.presentAddress}</p>
            )}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label className="text-gray-500 mb-2 block">Permanent Address</Label>
            {isEditing ? (
              <Input 
                value={teacher.permanentAddress || teacher.presentAddress} 
                onChange={(e) => handleChange('permanentAddress', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.permanentAddress || teacher.presentAddress}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Village / Locality</Label>
            {isEditing ? (
              <Input 
                value={teacher.village || ''} 
                onChange={(e) => handleChange('village', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.village || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Mandal</Label>
            {isEditing ? (
              <Input 
                value={teacher.mandal || ''} 
                onChange={(e) => handleChange('mandal', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.mandal || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">District</Label>
            {isEditing ? (
              <Input 
                value={teacher.district || ''} 
                onChange={(e) => handleChange('district', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.district || '-'}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-6">
        <h3 className="mb-6">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Contact Name</Label>
            {isEditing ? (
              <Input 
                value={teacher.emergencyContactName || ''} 
                onChange={(e) => handleChange('emergencyContactName', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.emergencyContactName || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Relationship</Label>
            {isEditing ? (
              <Input 
                value={teacher.emergencyContactRelation || ''} 
                onChange={(e) => handleChange('emergencyContactRelation', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.emergencyContactRelation || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Contact Number</Label>
            {isEditing ? (
              <Input 
                value={teacher.emergencyContactNumber || ''} 
                onChange={(e) => handleChange('emergencyContactNumber', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.emergencyContactNumber || '-'}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
