import { useState } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Edit2, Save, X } from 'lucide-react';

interface ClassExamsTabProps {
  classData: any;
}

export function ClassExamsTab({ classData }: ClassExamsTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [examPattern, setExamPattern] = useState(
    classData.syllabusType === 'State Board' ? 'State Pattern' : 'CBSE Pattern'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3>Exam Structure</h3>
          <p className="text-sm text-gray-600 mt-1">
            Configure exam patterns for {classData.className}
          </p>
        </div>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Pattern
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={() => setIsEditing(false)}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Exam Pattern Selection */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-gray-500 mb-2 block">Exam Pattern</Label>
            {isEditing ? (
              <Select value={examPattern} onValueChange={setExamPattern}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="State Pattern">State Pattern (FA1, FA2, SA1, SA2)</SelectItem>
                  <SelectItem value="CBSE Pattern">CBSE Pattern (Term 1, Term 2)</SelectItem>
                  <SelectItem value="Custom">Custom Pattern</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{examPattern}</p>
            )}
          </div>
        </div>
      </Card>

      {/* State Pattern */}
      {examPattern === 'State Pattern' && (
        <>
          <Card className="p-6">
            <h3 className="mb-6">FA1 (Formative Assessment 1)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-500 mb-2 block">Max Marks</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="10" />
                ) : (
                  <p className="text-gray-900">10</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Pass Percentage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="35" />
                ) : (
                  <p className="text-gray-900">35%</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Weightage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="10" />
                ) : (
                  <p className="text-gray-900">10%</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6">FA2 (Formative Assessment 2)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-500 mb-2 block">Max Marks</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="10" />
                ) : (
                  <p className="text-gray-900">10</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Pass Percentage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="35" />
                ) : (
                  <p className="text-gray-900">35%</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Weightage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="10" />
                ) : (
                  <p className="text-gray-900">10%</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6">SA1 (Summative Assessment 1)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-500 mb-2 block">Max Marks</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="80" />
                ) : (
                  <p className="text-gray-900">80</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Pass Percentage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="35" />
                ) : (
                  <p className="text-gray-900">35%</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Weightage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="40" />
                ) : (
                  <p className="text-gray-900">40%</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6">SA2 (Summative Assessment 2)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-500 mb-2 block">Max Marks</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="80" />
                ) : (
                  <p className="text-gray-900">80</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Pass Percentage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="35" />
                ) : (
                  <p className="text-gray-900">35%</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Weightage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="40" />
                ) : (
                  <p className="text-gray-900">40%</p>
                )}
              </div>
            </div>
          </Card>
        </>
      )}

      {/* CBSE Pattern */}
      {examPattern === 'CBSE Pattern' && (
        <>
          <Card className="p-6">
            <h3 className="mb-6">Term 1 Examination</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-500 mb-2 block">Max Marks</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="100" />
                ) : (
                  <p className="text-gray-900">100</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Pass Percentage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="33" />
                ) : (
                  <p className="text-gray-900">33%</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Weightage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="50" />
                ) : (
                  <p className="text-gray-900">50%</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6">Term 2 Examination</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-500 mb-2 block">Max Marks</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="100" />
                ) : (
                  <p className="text-gray-900">100</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Pass Percentage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="33" />
                ) : (
                  <p className="text-gray-900">33%</p>
                )}
              </div>
              <div>
                <Label className="text-gray-500 mb-2 block">Weightage</Label>
                {isEditing ? (
                  <Input type="number" defaultValue="50" />
                ) : (
                  <p className="text-gray-900">50%</p>
                )}
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Grading Scheme */}
      <Card className="p-6">
        <h3 className="mb-6">Grading Scheme</h3>
        <div className="space-y-3">
          {[
            { grade: 'A+', range: '91-100', gpa: '10' },
            { grade: 'A', range: '81-90', gpa: '9' },
            { grade: 'B+', range: '71-80', gpa: '8' },
            { grade: 'B', range: '61-70', gpa: '7' },
            { grade: 'C+', range: '51-60', gpa: '6' },
            { grade: 'C', range: '41-50', gpa: '5' },
            { grade: 'D', range: '33-40', gpa: '4' },
            { grade: 'F', range: 'Below 33', gpa: '0' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-4">
                <Badge className="w-12 text-center">{item.grade}</Badge>
                <span className="text-sm text-gray-600">{item.range}%</span>
              </div>
              <span className="text-sm text-gray-900">GPA: {item.gpa}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
