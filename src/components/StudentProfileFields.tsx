import { Card } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Upload, FileText, Download } from 'lucide-react';

interface Student {
  id: number;
  admissionNo: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  class: string;
  section: string;
  rollNumber?: string;
  bloodGroup?: string;
  motherTongue?: string;
  religion?: string;
  category?: string;
  aadharNumber?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  address?: string;
  permanentAddress?: string;
  city?: string;
  village?: string;
  mandal?: string;
  district?: string;
  state?: string;
  zipCode?: string;
  academicYear?: string;
  dateOfAdmission?: string;
  previousSchool?: string;
  previousClass?: string;
  medium?: string;
  syllabus?: string;
  house?: string;
  transportOpted?: string;
  busRoute?: string;
  pickupPoint?: string;
  dropPoint?: string;
  transportFeeCategory?: string;
  status: string;
  guardians: Array<{
    id: number;
    name: string;
    relation: string;
    phone: string;
    email: string;
    occupation?: string;
  }>;
}

interface StudentProfileFieldsProps {
  student: Student;
}

export function StudentProfileFields({ student }: StudentProfileFieldsProps) {
  // Find parent/guardian details
  const father = student.guardians.find(g => g.relation === 'Father');
  const mother = student.guardians.find(g => g.relation === 'Mother');
  const guardian = student.guardians.find(g => g.relation !== 'Father' && g.relation !== 'Mother');

  return (
    <div className="space-y-6">
      {/* A. Personal Information */}
      <Card className="p-5 rounded-xl border-2">
        <h3 className="text-gray-900 mb-4">A. Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-gray-600 text-xs">First Name</Label>
            <p className="text-gray-900 mt-1">{student.firstName}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Last Name</Label>
            <p className="text-gray-900 mt-1">{student.lastName}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Gender</Label>
            <p className="text-gray-900 mt-1">{student.gender}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Date of Birth</Label>
            <p className="text-gray-900 mt-1">
              {new Date(student.dob).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Blood Group</Label>
            <p className="text-gray-900 mt-1">{student.bloodGroup || 'B+'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Mother Tongue</Label>
            <p className="text-gray-900 mt-1">{student.motherTongue || 'Telugu'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Religion</Label>
            <p className="text-gray-900 mt-1">{student.religion || 'Hindu'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Caste Category</Label>
            <p className="text-gray-900 mt-1">{student.category || 'OC'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Aadhar Number</Label>
            <p className="text-gray-900 mt-1">{student.aadharNumber || 'XXXX XXXX 1234'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Nationality</Label>
            <p className="text-gray-900 mt-1">{student.nationality || 'Indian'}</p>
          </div>
        </div>
      </Card>

      {/* B. Contact Information */}
      <Card className="p-5 rounded-xl border-2">
        <h3 className="text-gray-900 mb-4">B. Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-600 text-xs">Email</Label>
            <p className="text-gray-900 mt-1">{student.email || 'Not provided'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Phone</Label>
            <p className="text-gray-900 mt-1">{student.phone || '+91 98765 43210'}</p>
          </div>
          <div className="md:col-span-2">
            <Label className="text-gray-600 text-xs">Present Address</Label>
            <p className="text-gray-900 mt-1">
              {student.address || 'H.No 12-34, Street Name, Locality'}
              {student.city && `, ${student.city}`}
              {student.state && `, ${student.state}`}
              {student.zipCode && ` - ${student.zipCode}`}
            </p>
          </div>
          <div className="md:col-span-2">
            <Label className="text-gray-600 text-xs">Permanent Address</Label>
            <p className="text-gray-900 mt-1">{student.permanentAddress || 'Same as Present Address'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Village / Locality</Label>
            <p className="text-gray-900 mt-1">{student.village || student.city || 'Locality Name'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Mandal</Label>
            <p className="text-gray-900 mt-1">{student.mandal || 'Mandal Name'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">District</Label>
            <p className="text-gray-900 mt-1">{student.district || student.state || 'District Name'}</p>
          </div>
        </div>
      </Card>

      {/* C. Guardian / Parents Information */}
      <Card className="p-5 rounded-xl border-2">
        <h3 className="text-gray-900 mb-4">C. Guardian / Parents Information</h3>
        
        {/* Father Details */}
        <div className="mb-5">
          <h4 className="text-sm text-gray-700 mb-3">Father Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-600 text-xs">Name</Label>
              <p className="text-gray-900 mt-1">{father?.name || 'Not provided'}</p>
            </div>
            <div>
              <Label className="text-gray-600 text-xs">Phone</Label>
              <p className="text-gray-900 mt-1">{father?.phone || 'Not provided'}</p>
            </div>
            <div>
              <Label className="text-gray-600 text-xs">Occupation</Label>
              <p className="text-gray-900 mt-1">{father?.occupation || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Mother Details */}
        <div className="mb-5">
          <h4 className="text-sm text-gray-700 mb-3">Mother Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-600 text-xs">Name</Label>
              <p className="text-gray-900 mt-1">{mother?.name || 'Not provided'}</p>
            </div>
            <div>
              <Label className="text-gray-600 text-xs">Phone</Label>
              <p className="text-gray-900 mt-1">{mother?.phone || 'Not provided'}</p>
            </div>
            <div>
              <Label className="text-gray-600 text-xs">Occupation</Label>
              <p className="text-gray-900 mt-1">{mother?.occupation || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Guardian (Optional) */}
        {guardian && (
          <>
            <div className="border-t border-gray-200 my-4"></div>
            <div>
              <h4 className="text-sm text-gray-700 mb-3">Guardian (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-600 text-xs">Guardian Name</Label>
                  <p className="text-gray-900 mt-1">{guardian.name}</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-xs">Phone</Label>
                  <p className="text-gray-900 mt-1">{guardian.phone}</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-xs">Relationship to Student</Label>
                  <p className="text-gray-900 mt-1">{guardian.relation}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* D. Academic Details */}
      <Card className="p-5 rounded-xl border-2">
        <h3 className="text-gray-900 mb-4">D. Academic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-gray-600 text-xs">Admission Number</Label>
            <p className="text-gray-900 mt-1">{student.admissionNo}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Class</Label>
            <p className="text-gray-900 mt-1">Class {student.class}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Section</Label>
            <p className="text-gray-900 mt-1">Section {student.section}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Roll Number</Label>
            <p className="text-gray-900 mt-1">{student.rollNumber || Math.floor(Math.random() * 50) + 1}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Academic Year</Label>
            <p className="text-gray-900 mt-1">{student.academicYear || '2024-25'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Date of Admission</Label>
            <p className="text-gray-900 mt-1">{student.dateOfAdmission || 'April 15, 2024'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Previous School Name</Label>
            <p className="text-gray-900 mt-1">{student.previousSchool || 'ABC High School'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Previous Class</Label>
            <p className="text-gray-900 mt-1">{student.previousClass || `Class ${parseInt(student.class) - 1}`}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Medium of Instruction</Label>
            <p className="text-gray-900 mt-1">{student.medium || 'English'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">Syllabus</Label>
            <p className="text-gray-900 mt-1">{student.syllabus || 'State Board'}</p>
          </div>
          <div>
            <Label className="text-gray-600 text-xs">House / Group</Label>
            <p className="text-gray-900 mt-1">
              <Badge className={`rounded-full ${
                student.house === 'Red' ? 'bg-red-100 text-red-700 border-red-300' :
                student.house === 'Blue' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                student.house === 'Green' ? 'bg-green-100 text-green-700 border-green-300' :
                student.house === 'Yellow' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                'bg-red-100 text-red-700 border-red-300'
              }`}>
                {student.house || 'Red House'}
              </Badge>
            </p>
          </div>
        </div>
      </Card>

      {/* E. Transport Details */}
      <Card className="p-5 rounded-xl border-2">
        <h3 className="text-gray-900 mb-4">E. Transport Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-gray-600 text-xs">Transport Opted</Label>
            <p className="text-gray-900 mt-1">
              <Badge className={`rounded-full ${
                student.transportOpted === 'Yes' 
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}>
                {student.transportOpted || 'No'}
              </Badge>
            </p>
          </div>
          {(student.transportOpted === 'Yes') && (
            <>
              <div>
                <Label className="text-gray-600 text-xs">Route Number</Label>
                <p className="text-gray-900 mt-1">{student.busRoute || 'Route 05'}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-xs">Pickup Point</Label>
                <p className="text-gray-900 mt-1">{student.pickupPoint || 'Gandhi Nagar Junction'}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-xs">Drop Point</Label>
                <p className="text-gray-900 mt-1">{student.dropPoint || 'Gandhi Nagar Junction'}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-xs">Transport Fee Category</Label>
                <p className="text-gray-900 mt-1">{student.transportFeeCategory || 'Quarterly - ₹3,000'}</p>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* F. Uploadable Documents */}
      <Card className="p-5 rounded-xl border-2">
        <h3 className="text-gray-900 mb-4">F. Uploadable Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-600 text-xs mb-2 block">Student Photo</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
              <span className="text-xs text-gray-500">No file uploaded</span>
            </div>
          </div>
          <div>
            <Label className="text-gray-600 text-xs mb-2 block">Birth Certificate</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                View
              </Button>
              <span className="text-xs text-green-600">✓ Uploaded</span>
            </div>
          </div>
          <div>
            <Label className="text-gray-600 text-xs mb-2 block">TC (Transfer Certificate)</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                View
              </Button>
              <span className="text-xs text-green-600">✓ Uploaded</span>
            </div>
          </div>
          <div>
            <Label className="text-gray-600 text-xs mb-2 block">Aadhar</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                View
              </Button>
              <span className="text-xs text-green-600">✓ Uploaded</span>
            </div>
          </div>
          <div>
            <Label className="text-gray-600 text-xs mb-2 block">Caste Certificate</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
              <span className="text-xs text-gray-500">Not uploaded</span>
            </div>
          </div>
          <div>
            <Label className="text-gray-600 text-xs mb-2 block">Address Proof</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                View
              </Button>
              <span className="text-xs text-green-600">✓ Uploaded</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
