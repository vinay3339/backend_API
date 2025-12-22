import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
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
  village?: string;
  mandal?: string;
  district?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  admissionNo: string;
  class: string;
  section: string;
  rollNumber?: string;
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
  guardians: Array<{
    id: number;
    name: string;
    relation: string;
    phone: string;
    occupation?: string;
  }>;
}

interface StudentFormFieldsProps {
  currentStep: number;
  formData: FormData;
  setFormData: (data: FormData) => void;
  errors: Record<string, string>;
}

export function StudentFormFields({ currentStep, formData, setFormData, errors }: StudentFormFieldsProps) {
  // Step 1: Personal Information
  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <h3 className="text-gray-900 mb-4">A. Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={`rounded-xl ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className={`rounded-xl ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label>
            Gender <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="male" />
              <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="female" />
              <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="other" />
              <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dob">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className={`rounded-xl ${errors.dob ? 'border-red-500' : ''}`}
            />
            {errors.dob && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.dob}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <Select
              value={formData.bloodGroup}
              onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="motherTongue">Mother Tongue</Label>
            <Select
              value={formData.motherTongue}
              onValueChange={(value) => setFormData({ ...formData, motherTongue: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select mother tongue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Telugu">Telugu</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Tamil">Tamil</SelectItem>
                <SelectItem value="Urdu">Urdu</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="religion">Religion</Label>
            <Input
              id="religion"
              value={formData.religion}
              onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
              className="rounded-xl"
              placeholder="e.g., Hindu, Muslim, Christian"
            />
          </div>
          <div>
            <Label htmlFor="category">Caste Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OC">OC (Open Category)</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="ST">ST</SelectItem>
                <SelectItem value="BC-A">BC-A</SelectItem>
                <SelectItem value="BC-B">BC-B</SelectItem>
                <SelectItem value="BC-C">BC-C</SelectItem>
                <SelectItem value="BC-D">BC-D</SelectItem>
                <SelectItem value="BC-E">BC-E</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="aadharNumber">Aadhar Number (Optional)</Label>
            <Input
              id="aadharNumber"
              value={formData.aadharNumber}
              onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
              className="rounded-xl"
              placeholder="XXXX XXXX XXXX"
              maxLength={12}
            />
          </div>
          <div>
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Contact Information
  if (currentStep === 2) {
    return (
      <div className="space-y-4">
        <h3 className="text-gray-900 mb-4">B. Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`rounded-xl ${errors.email ? 'border-red-500' : ''}`}
              placeholder="student@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="rounded-xl"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Present Address</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="rounded-xl"
            rows={2}
            placeholder="H.No, Street, Locality"
          />
        </div>
        <div>
          <Label htmlFor="permanentAddress">Permanent Address</Label>
          <Textarea
            id="permanentAddress"
            value={formData.permanentAddress}
            onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
            className="rounded-xl"
            rows={2}
            placeholder="Leave blank if same as present address"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="village">Village / Locality</Label>
            <Input
              id="village"
              value={formData.village}
              onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="mandal">Mandal</Label>
            <Input
              id="mandal"
              value={formData.mandal}
              onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="zipCode">PIN Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="rounded-xl"
              maxLength={6}
            />
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Guardian/Parents Information
  if (currentStep === 3) {
    const father = formData.guardians.find(g => g.relation === 'Father');
    const mother = formData.guardians.find(g => g.relation === 'Mother');
    const otherGuardians = formData.guardians.filter(g => g.relation !== 'Father' && g.relation !== 'Mother');

    const updateGuardian = (relation: string, field: string, value: string) => {
      const guardianIndex = formData.guardians.findIndex(g => g.relation === relation);
      if (guardianIndex >= 0) {
        const updatedGuardians = [...formData.guardians];
        updatedGuardians[guardianIndex] = { ...updatedGuardians[guardianIndex], [field]: value };
        setFormData({ ...formData, guardians: updatedGuardians });
      } else {
        setFormData({
          ...formData,
          guardians: [...formData.guardians, { id: Date.now(), relation, name: '', phone: '', occupation: '', [field]: value }]
        });
      }
    };

    return (
      <div className="space-y-6">
        <h3 className="text-gray-900 mb-4">C. Guardian / Parents Information</h3>
        
        {/* Father Details */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="text-sm text-gray-700 mb-3">Father Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fatherName">Name</Label>
              <Input
                id="fatherName"
                value={father?.name || ''}
                onChange={(e) => updateGuardian('Father', 'name', e.target.value)}
                className="rounded-xl bg-white"
              />
            </div>
            <div>
              <Label htmlFor="fatherPhone">Phone</Label>
              <Input
                id="fatherPhone"
                type="tel"
                value={father?.phone || ''}
                onChange={(e) => updateGuardian('Father', 'phone', e.target.value)}
                className="rounded-xl bg-white"
              />
            </div>
            <div>
              <Label htmlFor="fatherOccupation">Occupation</Label>
              <Input
                id="fatherOccupation"
                value={father?.occupation || ''}
                onChange={(e) => updateGuardian('Father', 'occupation', e.target.value)}
                className="rounded-xl bg-white"
              />
            </div>
          </div>
        </Card>

        {/* Mother Details */}
        <Card className="p-4 bg-pink-50 border-pink-200">
          <h4 className="text-sm text-gray-700 mb-3">Mother Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="motherName">Name</Label>
              <Input
                id="motherName"
                value={mother?.name || ''}
                onChange={(e) => updateGuardian('Mother', 'name', e.target.value)}
                className="rounded-xl bg-white"
              />
            </div>
            <div>
              <Label htmlFor="motherPhone">Phone</Label>
              <Input
                id="motherPhone"
                type="tel"
                value={mother?.phone || ''}
                onChange={(e) => updateGuardian('Mother', 'phone', e.target.value)}
                className="rounded-xl bg-white"
              />
            </div>
            <div>
              <Label htmlFor="motherOccupation">Occupation</Label>
              <Input
                id="motherOccupation"
                value={mother?.occupation || ''}
                onChange={(e) => updateGuardian('Mother', 'occupation', e.target.value)}
                className="rounded-xl bg-white"
              />
            </div>
          </div>
        </Card>

        {/* Other Guardians */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm text-gray-700">Guardian (Optional)</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setFormData({
                  ...formData,
                  guardians: [...formData.guardians, { id: Date.now(), name: '', relation: 'Guardian', phone: '', occupation: '' }]
                });
              }}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Guardian
            </Button>
          </div>
          {otherGuardians.map((guardian, index) => (
            <Card key={guardian.id} className="p-4 bg-gray-50 border-gray-200 mb-3">
              <div className="flex items-start justify-between mb-3">
                <h5 className="text-sm text-gray-600">Guardian {index + 1}</h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      guardians: formData.guardians.filter(g => g.id !== guardian.id)
                    });
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Guardian Name</Label>
                  <Input
                    value={guardian.name}
                    onChange={(e) => {
                      const updatedGuardians = [...formData.guardians];
                      const idx = updatedGuardians.findIndex(g => g.id === guardian.id);
                      updatedGuardians[idx] = { ...updatedGuardians[idx], name: e.target.value };
                      setFormData({ ...formData, guardians: updatedGuardians });
                    }}
                    className="rounded-xl bg-white"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={guardian.phone}
                    onChange={(e) => {
                      const updatedGuardians = [...formData.guardians];
                      const idx = updatedGuardians.findIndex(g => g.id === guardian.id);
                      updatedGuardians[idx] = { ...updatedGuardians[idx], phone: e.target.value };
                      setFormData({ ...formData, guardians: updatedGuardians });
                    }}
                    className="rounded-xl bg-white"
                  />
                </div>
                <div>
                  <Label>Relationship to Student</Label>
                  <Input
                    value={guardian.relation}
                    onChange={(e) => {
                      const updatedGuardians = [...formData.guardians];
                      const idx = updatedGuardians.findIndex(g => g.id === guardian.id);
                      updatedGuardians[idx] = { ...updatedGuardians[idx], relation: e.target.value };
                      setFormData({ ...formData, guardians: updatedGuardians });
                    }}
                    className="rounded-xl bg-white"
                    placeholder="e.g., Uncle, Aunt, Grandfather"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Step 4: Academic Details
  if (currentStep === 4) {
    return (
      <div className="space-y-4">
        <h3 className="text-gray-900 mb-4">D. Academic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="admissionNo">
              Admission Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="admissionNo"
              value={formData.admissionNo}
              onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
              className={`rounded-xl ${errors.admissionNo ? 'border-red-500' : ''}`}
              placeholder="ADM2024XXX"
            />
            {errors.admissionNo && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.admissionNo}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="class">
              Class <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.class}
              onValueChange={(value) => setFormData({ ...formData, class: value })}
            >
              <SelectTrigger className={`rounded-xl ${errors.class ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((cls) => (
                  <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.class && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.class}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="section">
              Section <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.section}
              onValueChange={(value) => setFormData({ ...formData, section: value })}
            >
              <SelectTrigger className={`rounded-xl ${errors.section ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                  <SelectItem key={sec} value={sec}>Section {sec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.section && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.section}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              type="number"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              className="rounded-xl"
              placeholder="01"
            />
          </div>
          <div>
            <Label htmlFor="academicYear">Academic Year</Label>
            <Input
              id="academicYear"
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              className="rounded-xl"
              placeholder="2024-25"
            />
          </div>
          <div>
            <Label htmlFor="dateOfAdmission">Date of Admission</Label>
            <Input
              id="dateOfAdmission"
              type="date"
              value={formData.dateOfAdmission}
              onChange={(e) => setFormData({ ...formData, dateOfAdmission: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="previousSchool">Previous School Name</Label>
            <Input
              id="previousSchool"
              value={formData.previousSchool}
              onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="previousClass">Previous Class</Label>
            <Input
              id="previousClass"
              value={formData.previousClass}
              onChange={(e) => setFormData({ ...formData, previousClass: e.target.value })}
              className="rounded-xl"
              placeholder="Class 9"
            />
          </div>
          <div>
            <Label htmlFor="medium">Medium of Instruction</Label>
            <Select
              value={formData.medium}
              onValueChange={(value) => setFormData({ ...formData, medium: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Telugu">Telugu</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="syllabus">Syllabus</Label>
            <Select
              value={formData.syllabus}
              onValueChange={(value) => setFormData({ ...formData, syllabus: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select syllabus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="State Board">State Board</SelectItem>
                <SelectItem value="CBSE">CBSE</SelectItem>
                <SelectItem value="ICSE">ICSE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="house">House / Group</Label>
            <Select
              value={formData.house}
              onValueChange={(value) => setFormData({ ...formData, house: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select house" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Red">Red House</SelectItem>
                <SelectItem value="Blue">Blue House</SelectItem>
                <SelectItem value="Green">Green House</SelectItem>
                <SelectItem value="Yellow">Yellow House</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Transport Details
  if (currentStep === 5) {
    return (
      <div className="space-y-4">
        <h3 className="text-gray-900 mb-4">E. Transport Details</h3>
        <div>
          <Label>Transport Opted</Label>
          <RadioGroup
            value={formData.transportOpted}
            onValueChange={(value) => setFormData({ ...formData, transportOpted: value })}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id="transportYes" />
              <Label htmlFor="transportYes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id="transportNo" />
              <Label htmlFor="transportNo" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.transportOpted === 'Yes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <Label htmlFor="busRoute">Route Number</Label>
              <Input
                id="busRoute"
                value={formData.busRoute}
                onChange={(e) => setFormData({ ...formData, busRoute: e.target.value })}
                className="rounded-xl"
                placeholder="Route 05"
              />
            </div>
            <div>
              <Label htmlFor="pickupPoint">Pickup Point</Label>
              <Input
                id="pickupPoint"
                value={formData.pickupPoint}
                onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                className="rounded-xl"
                placeholder="Location name"
              />
            </div>
            <div>
              <Label htmlFor="dropPoint">Drop Point</Label>
              <Input
                id="dropPoint"
                value={formData.dropPoint}
                onChange={(e) => setFormData({ ...formData, dropPoint: e.target.value })}
                className="rounded-xl"
                placeholder="Location name"
              />
            </div>
            <div>
              <Label htmlFor="transportFeeCategory">Transport Fee Category</Label>
              <Select
                value={formData.transportFeeCategory}
                onValueChange={(value) => setFormData({ ...formData, transportFeeCategory: value })}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select fee plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly - ₹1,000">Monthly - ₹1,000</SelectItem>
                  <SelectItem value="Quarterly - ₹3,000">Quarterly - ₹3,000</SelectItem>
                  <SelectItem value="Half-Yearly - ₹5,500">Half-Yearly - ₹5,500</SelectItem>
                  <SelectItem value="Yearly - ₹10,000">Yearly - ₹10,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
