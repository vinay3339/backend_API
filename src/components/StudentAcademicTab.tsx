import React from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Award, Download, AlertCircle, CheckCircle } from 'lucide-react';

export function StudentAcademicTab() {
  return (
    <div className="space-y-6">
      {/* Exam Structure Selector */}
      <div>
        <h3 className="text-gray-900 mb-4">Exam Structure</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-3 rounded-xl cursor-pointer hover:shadow-md transition-all border-2 border-blue-500 bg-blue-50">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Formative Assessment 1</p>
              <p className="text-gray-900">FA1</p>
              <Badge className="mt-2 bg-blue-100 text-blue-700 border-blue-300 rounded-full">
                Active
              </Badge>
            </div>
          </Card>
          <Card className="p-3 rounded-xl cursor-pointer hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Formative Assessment 2</p>
              <p className="text-gray-900">FA2</p>
              <Badge className="mt-2 bg-gray-100 text-gray-600 rounded-full">
                View
              </Badge>
            </div>
          </Card>
          <Card className="p-3 rounded-xl cursor-pointer hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Summative Assessment 1</p>
              <p className="text-gray-900">SA1</p>
              <Badge className="mt-2 bg-gray-100 text-gray-600 rounded-full">
                View
              </Badge>
            </div>
          </Card>
          <Card className="p-3 rounded-xl cursor-pointer hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Summative Assessment 2</p>
              <p className="text-gray-900">SA2</p>
              <Badge className="mt-2 bg-gray-100 text-gray-600 rounded-full">
                View
              </Badge>
            </div>
          </Card>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Academic Year: 2024-25 | Total Marks: 100 per subject
        </p>
      </div>

      <Separator />

      {/* Overall Performance */}
      <div>
        <h3 className="text-gray-900 mb-4">Overall Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <Label className="text-gray-600 text-xs mb-2 block">Total Marks</Label>
            <p className="text-gray-900 text-2xl">435 / 500</p>
            <Badge className="mt-2 bg-green-100 text-green-700 border-green-300 rounded-full">
              Pass
            </Badge>
          </Card>

          <Card className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <Label className="text-gray-600 text-xs mb-2 block">Percentage</Label>
            <p className="text-gray-900 text-2xl">87%</p>
            <Badge className="mt-2 bg-blue-100 text-blue-700 border-blue-300 rounded-full">
              Excellent
            </Badge>
          </Card>

          <Card className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <Label className="text-gray-600 text-xs mb-2 block">Overall Grade</Label>
            <p className="text-gray-900 text-2xl">A1</p>
            <p className="text-xs text-gray-600 mt-1">Grade Point: 9.5</p>
          </Card>

          <Card className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <Label className="text-gray-600 text-xs mb-2 block">Class Rank</Label>
            <p className="text-gray-900 text-2xl">5th</p>
            <p className="text-xs text-gray-600 mt-1">Out of 45 students</p>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Subject-wise Marks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Subject-wise Marks (FA1)</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Download Marksheet
          </Button>
        </div>
        <Card className="rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 text-xs text-gray-600">Subject Name</th>
                  <th className="text-center p-3 text-xs text-gray-600">Max Marks</th>
                  <th className="text-center p-3 text-xs text-gray-600">Marks Obtained</th>
                  <th className="text-center p-3 text-xs text-gray-600">Grade</th>
                  <th className="text-left p-3 text-xs text-gray-600">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <Award className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-900">Mathematics</span>
                    </div>
                  </td>
                  <td className="p-3 text-center text-sm text-gray-900">100</td>
                  <td className="p-3 text-center text-sm text-gray-900">90</td>
                  <td className="p-3 text-center">
                    <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                      A1
                    </Badge>
                  </td>
                  <td className="p-3 text-xs text-gray-600">Outstanding</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-green-100 rounded-lg">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-900">Science</span>
                    </div>
                  </td>
                  <td className="p-3 text-center text-sm text-gray-900">100</td>
                  <td className="p-3 text-center text-sm text-gray-900">85</td>
                  <td className="p-3 text-center">
                    <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                      A2
                    </Badge>
                  </td>
                  <td className="p-3 text-xs text-gray-600">Excellent</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-900">English</span>
                    </div>
                  </td>
                  <td className="p-3 text-center text-sm text-gray-900">100</td>
                  <td className="p-3 text-center text-sm text-gray-900">92</td>
                  <td className="p-3 text-center">
                    <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                      A1
                    </Badge>
                  </td>
                  <td className="p-3 text-xs text-gray-600">Outstanding</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-orange-100 rounded-lg">
                        <Award className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-sm text-gray-900">Social Studies</span>
                    </div>
                  </td>
                  <td className="p-3 text-center text-sm text-gray-900">100</td>
                  <td className="p-3 text-center text-sm text-gray-900">80</td>
                  <td className="p-3 text-center">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300 rounded-full">
                      B1
                    </Badge>
                  </td>
                  <td className="p-3 text-xs text-gray-600">Good</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-red-100 rounded-lg">
                        <Award className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-sm text-gray-900">Hindi</span>
                    </div>
                  </td>
                  <td className="p-3 text-center text-sm text-gray-900">100</td>
                  <td className="p-3 text-center text-sm text-gray-900">88</td>
                  <td className="p-3 text-center">
                    <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                      A2
                    </Badge>
                  </td>
                  <td className="p-3 text-xs text-gray-600">Excellent</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 text-gray-900">Total</td>
                  <td className="p-3 text-center text-gray-900">500</td>
                  <td className="p-3 text-center text-gray-900">435</td>
                  <td className="p-3 text-center">
                    <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                      A1
                    </Badge>
                  </td>
                  <td className="p-3 text-xs text-gray-600">87%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Separator />

      {/* Attendance Summary */}
      <div>
        <h3 className="text-gray-900 mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 rounded-xl border-2">
            <Label className="text-gray-600 text-xs mb-2 block">Working Days</Label>
            <p className="text-gray-900 text-2xl">200</p>
            <p className="text-xs text-gray-500 mt-1">Till date</p>
          </Card>

          <Card className="p-4 rounded-xl border-2 bg-green-50 border-green-200">
            <Label className="text-gray-600 text-xs mb-2 block">Present Days</Label>
            <p className="text-gray-900 text-2xl">188</p>
            <p className="text-xs text-green-600 mt-1">Good attendance</p>
          </Card>

          <Card className="p-4 rounded-xl border-2 bg-blue-50 border-blue-200">
            <Label className="text-gray-600 text-xs mb-2 block">Attendance %</Label>
            <p className="text-gray-900 text-2xl">94%</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Co-Scholastic Areas */}
      <div>
        <h3 className="text-gray-900 mb-4">Co-Scholastic Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">Discipline</p>
                <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                  A+
                </Badge>
                <p className="text-xs text-gray-600 mt-2">
                  Well-disciplined and follows school rules
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">Work Habits</p>
                <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full">
                  A
                </Badge>
                <p className="text-xs text-gray-600 mt-2">
                  Completes assignments on time
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">Activities (Sports/Art)</p>
                <Badge className="bg-blue-100 text-blue-700 border-blue-300 rounded-full">
                  B+
                </Badge>
                <p className="text-xs text-gray-600 mt-2">
                  Active in sports and cultural events
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Teacher's Remarks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Progress Report</h3>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Report Card
          </Button>
        </div>
        <Card className="p-4 rounded-xl bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 mb-1">Teacher's Remarks</p>
              <p className="text-sm text-gray-600">
                Excellent performance throughout the year. Shows great interest in Mathematics and Science. 
                Needs to improve participation in Social Studies discussions. Overall, a dedicated and hardworking student.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
