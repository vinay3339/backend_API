import React from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { CheckCircle, AlertCircle, Smartphone, Users, Shield, Link2, RefreshCw } from 'lucide-react';

interface StudentAccountTabProps {
  student: {
    firstName: string;
    lastName: string;
    hasAccount: boolean;
    firstLogin: boolean;
  };
}

export function StudentAccountTab({ student }: StudentAccountTabProps) {
  return (
    <div className="space-y-6">
      {/* Login Information */}
      <div>
        <h3 className="text-gray-900 mb-4">Portal Login Information</h3>
        
        <Card className="p-5 rounded-xl border-2">
          <div className="space-y-5">
            {/* Username */}
            <div>
              <Label className="text-gray-600">Username</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-mono">
                  {student.firstName.toLowerCase()}.{student.lastName.toLowerCase()}
                </p>
              </div>
              {!student.hasAccount && (
                <p className="text-xs text-gray-500 mt-1">
                  Username will be assigned when account is created
                </p>
              )}
            </div>

            <Separator />

            {/* Default Password */}
            <div>
              <Label className="text-gray-600">Default Password</Label>
              <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800 mb-1">Admission@2024</p>
                <p className="text-xs text-amber-600">
                  Student must change this password on first login
                </p>
              </div>
            </div>

            <Separator />

            {/* Last Login */}
            <div>
              <Label className="text-gray-600">Last Login</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900">Nov 22, 2024 at 10:30 AM</p>
                <p className="text-xs text-gray-500">From: Chrome on Windows</p>
              </div>
            </div>

            <Separator />

            {/* Account Status */}
            {student.hasAccount ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div>
                    <Label className="text-gray-600">Account Status</Label>
                    <p className="text-gray-900 mt-1">Active</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <Label className="text-gray-600">First Login Status</Label>
                    <p className="text-gray-900 mt-1">
                      {student.firstLogin ? 'Pending' : 'Completed'}
                    </p>
                  </div>
                  {student.firstLogin && (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-300 rounded-full">
                      Pending
                    </Badge>
                  )}
                  {!student.firstLogin && (
                    <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>

                <Button variant="outline" className="w-full gap-2 rounded-xl">
                  <RefreshCw className="w-4 h-4" />
                  Reset Password
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900 mb-1">No Portal Account</p>
                    <p className="text-sm text-gray-600">
                      This student does not have a portal account yet. Create one to give them access to the student portal.
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                  Create Portal Account
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Separator />

      {/* Parent App Linking */}
      <div>
        <h3 className="text-gray-900 mb-4">Parent App Linking</h3>
        
        <Card className="p-5 rounded-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-600">Link parent mobile numbers to receive updates via the parent app</p>
            </div>

            {/* Primary Mobile */}
            <div>
              <Label className="text-gray-600">Parent Primary Mobile</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  type="tel"
                  value="+91 98765 43210"
                  className="flex-1 rounded-lg"
                  readOnly
                />
                <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Linked
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Father - Rajesh Kumar</p>
            </div>

            <Separator />

            {/* Secondary Mobile */}
            <div>
              <Label className="text-gray-600">Parent Secondary Mobile</Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  type="tel"
                  value="+91 98765 43211"
                  className="flex-1 rounded-lg"
                  readOnly
                />
                <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Linked
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Mother - Priya Kumar</p>
            </div>

            <Separator />

            {/* Linked Guardian Account */}
            <div>
              <Label className="text-gray-600">Linked Guardian Account</Label>
              <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-900">Parent Portal Account</p>
                    <p className="text-xs text-gray-600">Email: parent@example.com</p>
                    <p className="text-xs text-gray-500 mt-1">Last login: Nov 23, 2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                    <Link2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2 rounded-xl mt-4">
              <Smartphone className="w-4 h-4" />
              Send App Link to Parents
            </Button>
          </div>
        </Card>
      </div>

      <Separator />

      {/* Role & Permissions */}
      <div>
        <h3 className="text-gray-900 mb-4">Role & Permissions</h3>
        
        <Card className="p-5 rounded-xl">
          <div className="space-y-4">
            {/* Role */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <Label className="text-gray-600">Role</Label>
                  <p className="text-gray-900 mt-1">Student</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300 rounded-full">
                Fixed
              </Badge>
            </div>

            <Separator />

            {/* Can Access Parent App */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <Label className="text-gray-600">Can Access Parent App?</Label>
                  <p className="text-gray-900 mt-1">Yes</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enabled
              </Badge>
            </div>

            <Separator />

            {/* Multi-child Linked Accounts */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <Label className="text-gray-600">Multi-child Linked Accounts</Label>
                  <p className="text-xs text-gray-500 mt-1">Other siblings linked to same parent account</p>
                </div>
              </div>
              
              <div className="space-y-2 mt-3">
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-900">Aarav Kumar</p>
                      <p className="text-xs text-gray-600">Class 7, Section B</p>
                      <p className="text-xs text-gray-500">Admission No: ADM2024002</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300 rounded-full">
                      Sibling
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-900">Ananya Kumar</p>
                      <p className="text-xs text-gray-600">Class 4, Section A</p>
                      <p className="text-xs text-gray-500">Admission No: ADM2023156</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300 rounded-full">
                      Sibling
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mt-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  Parents can view all linked children's information through a single parent portal account, making it easier to track multiple students.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
