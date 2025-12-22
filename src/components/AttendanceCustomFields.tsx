import { useState } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  GripVertical,
  Plus,
  Edit2,
  Trash2,
  Lock,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface CustomField {
  id: string;
  label: string;
  fieldKey: string;
  fieldType: string;
  required: boolean;
  visibleToAdmin: boolean;
  visibleToTeacher: boolean;
  isSystemField: boolean;
  dropdownOptions?: string[];
  section: string;
}

const systemFields: CustomField[] = [
  // Daily Attendance
  { id: 's1', label: 'Date', fieldKey: 'date', fieldType: 'Date', required: true, visibleToAdmin: true, visibleToTeacher: true, isSystemField: true, section: 'Daily Attendance' },
  { id: 's2', label: 'Status', fieldKey: 'status', fieldType: 'Dropdown', required: true, visibleToAdmin: true, visibleToTeacher: true, isSystemField: true, section: 'Daily Attendance', dropdownOptions: ['Present', 'Absent', 'Late'] },
  { id: 's3', label: 'Reason', fieldKey: 'reason', fieldType: 'Text', required: false, visibleToAdmin: true, visibleToTeacher: true, isSystemField: true, section: 'Daily Attendance' },
  
  // Class Summary
  { id: 's4', label: 'Class', fieldKey: 'class', fieldType: 'Dropdown', required: true, visibleToAdmin: true, visibleToTeacher: true, isSystemField: true, section: 'Class Summary' },
  { id: 's5', label: 'Section', fieldKey: 'section', fieldType: 'Dropdown', required: true, visibleToAdmin: true, visibleToTeacher: true, isSystemField: true, section: 'Class Summary' },
  { id: 's6', label: 'Present Count', fieldKey: 'presentCount', fieldType: 'Number', required: true, visibleToAdmin: true, visibleToTeacher: true, isSystemField: true, section: 'Class Summary' },
  
  // Student Summary
  { id: 's7', label: 'Student Name', fieldKey: 'studentName', fieldType: 'Text', required: true, visibleToAdmin: true, visibleToTeacher: true, isSystemField: true, section: 'Student Summary' },
  { id: 's8', label: 'Attendance %', fieldKey: 'attendancePercentage', fieldType: 'Number', required: true, visibleToAdmin: true, visibleToTeacher: true, isSystemField: true, section: 'Student Summary' },
];

const customFieldsData: CustomField[] = [
  { id: 'c1', label: 'Arrival Time', fieldKey: 'arrivalTime', fieldType: 'Text', required: false, visibleToAdmin: true, visibleToTeacher: true, isSystemField: false, section: 'Daily Attendance' },
  { id: 'c2', label: 'Parent Notified', fieldKey: 'parentNotified', fieldType: 'Toggle', required: false, visibleToAdmin: true, visibleToTeacher: false, isSystemField: false, section: 'Daily Attendance' },
  { id: 'c3', label: 'Minimum Attendance Target', fieldKey: 'minAttendanceTarget', fieldType: 'Number', required: false, visibleToAdmin: true, visibleToTeacher: true, isSystemField: false, section: 'Settings' },
];

interface AttendanceCustomFieldsProps {
  onBack?: () => void;
}

export function AttendanceCustomFields({ onBack }: AttendanceCustomFieldsProps = {}) {
  const [activeTab, setActiveTab] = useState('daily');
  const [expandedSections, setExpandedSections] = useState<string[]>(['Attendance Record', 'Class Summary', 'Student Summary']);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [customFields, setCustomFields] = useState(customFieldsData);
  const [selectedSection, setSelectedSection] = useState('');
  const [formData, setFormData] = useState({
    label: '',
    fieldKey: '',
    fieldType: 'Text',
    required: false,
    visibleToAdmin: true,
    visibleToTeacher: false,
    dropdownOptions: [''],
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleAddField = () => {
    const newField: CustomField = {
      id: `c${customFields.length + 1}`,
      label: formData.label,
      fieldKey: formData.fieldKey,
      fieldType: formData.fieldType,
      required: formData.required,
      visibleToAdmin: formData.visibleToAdmin,
      visibleToTeacher: formData.visibleToTeacher,
      isSystemField: false,
      section: selectedSection,
      dropdownOptions: formData.fieldType === 'Dropdown' ? formData.dropdownOptions.filter(opt => opt.trim() !== '') : undefined,
    };

    setCustomFields([...customFields, newField]);
    setIsAddDialogOpen(false);
    setFormData({
      label: '',
      fieldKey: '',
      fieldType: 'Text',
      required: false,
      visibleToAdmin: true,
      visibleToTeacher: false,
      dropdownOptions: [''],
    });
    alert('Custom field added successfully!');
  };

  const handleDeleteField = (id: string) => {
    if (confirm('Are you sure you want to delete this custom field?')) {
      setCustomFields(customFields.filter(f => f.id !== id));
    }
  };

  const getFieldsBySection = (tabSection: string) => {
    return [
      ...systemFields.filter(f => f.section === tabSection),
      ...customFields.filter(f => f.section === tabSection),
    ];
  };

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'Text': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Number': return 'bg-green-50 text-green-700 border-green-200';
      case 'Dropdown': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Date': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Toggle': return 'bg-pink-50 text-pink-700 border-pink-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const renderFieldsList = (tabSection: string, sections: string[]) => {
    return sections.map(section => {
      const fields = getFieldsBySection(tabSection);
      const isExpanded = expandedSections.includes(section);

      return (
        <Card key={section} className="overflow-hidden">
          <button
            onClick={() => toggleSection(section)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
              <h3 className="text-gray-900">{section}</h3>
              <Badge variant="outline">{fields.length} fields</Badge>
            </div>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSection(tabSection);
                setIsAddDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </button>

          {isExpanded && (
            <div className="border-t p-4 space-y-3 bg-gray-50">
              {fields.map(field => (
                <div
                  key={field.id}
                  className="flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="cursor-move text-gray-400 hover:text-gray-600">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Field Label</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-900">{field.label}</p>
                        {field.isSystemField && (
                          <Lock className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Field Key</Label>
                      <p className="text-sm text-gray-600 mt-1 font-mono text-xs">{field.fieldKey}</p>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Type</Label>
                      <Badge variant="outline" className={`mt-1 ${getFieldTypeColor(field.fieldType)}`}>
                        {field.fieldType}
                      </Badge>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Required</Label>
                      <p className="text-sm text-gray-900 mt-1">
                        {field.required ? '✓ Yes' : '✗ No'}
                      </p>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Visibility</Label>
                      <div className="flex gap-1 mt-1">
                        {field.visibleToAdmin && (
                          <Badge variant="outline" className="text-xs">Admin</Badge>
                        )}
                        {field.visibleToTeacher && (
                          <Badge variant="outline" className="text-xs">Teacher</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!field.isSystemField && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteField(field.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      );
    });
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header with Back Button */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <span>Dashboard</span>
              <span>/</span>
              <span>Attendance</span>
              <span>/</span>
              <span className="text-gray-900">Custom Fields</span>
            </div>
            <h1 className="text-gray-900 mb-1">Attendance Custom Fields</h1>
            <p className="text-sm text-gray-600">
              Customize attendance data collection by adding custom fields
            </p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600">ℹ️</span>
            </div>
          </div>
          <div>
            <h3 className="text-blue-900 mb-1">About Custom Fields</h3>
            <p className="text-sm text-blue-800">
              Custom fields allow you to extend attendance tracking beyond standard fields. Fields marked with a lock icon are system fields and cannot be modified.
            </p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="class">Class Summary</TabsTrigger>
          <TabsTrigger value="student">Student Summary</TabsTrigger>
          <TabsTrigger value="teacher">Teacher Attendance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          {renderFieldsList('Daily Attendance', ['Attendance Record'])}
        </TabsContent>

        <TabsContent value="class" className="space-y-4">
          {renderFieldsList('Class Summary', ['Class Summary'])}
        </TabsContent>

        <TabsContent value="student" className="space-y-4">
          {renderFieldsList('Student Summary', ['Student Summary'])}
        </TabsContent>

        <TabsContent value="teacher" className="space-y-4">
          {renderFieldsList('Teacher Attendance', ['Teacher Records'])}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {renderFieldsList('Settings', ['Configuration'])}
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          {renderFieldsList('Audit Log', ['Log Entries'])}
        </TabsContent>
      </Tabs>

      {/* Add Custom Field Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Custom Field</DialogTitle>
            <DialogDescription>
              Create a new custom field for the attendance system
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Field Label *</Label>
                <Input
                  placeholder="e.g., Arrival Time"
                  value={formData.label}
                  onChange={(e) => {
                    const label = e.target.value;
                    const key = label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                    setFormData({ ...formData, label, fieldKey: key });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Field Key (Auto-generated)</Label>
                <Input
                  value={formData.fieldKey}
                  disabled
                  className="bg-gray-50 font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Field Type *</Label>
              <Select
                value={formData.fieldType}
                onValueChange={(value) => setFormData({ ...formData, fieldType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Text Area">Text Area</SelectItem>
                  <SelectItem value="Number">Number</SelectItem>
                  <SelectItem value="Date">Date</SelectItem>
                  <SelectItem value="Dropdown">Dropdown</SelectItem>
                  <SelectItem value="Checkbox">Checkbox</SelectItem>
                  <SelectItem value="Toggle">Toggle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.fieldType === 'Dropdown' && (
              <div className="space-y-2">
                <Label>Dropdown Options</Label>
                {formData.dropdownOptions.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.dropdownOptions];
                        newOptions[index] = e.target.value;
                        setFormData({ ...formData, dropdownOptions: newOptions });
                      }}
                    />
                    {index === formData.dropdownOptions.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            dropdownOptions: [...formData.dropdownOptions, ''],
                          });
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className="text-gray-900">Required Field</Label>
                <p className="text-sm text-gray-500">This field must be filled in</p>
              </div>
              <Switch
                checked={formData.required}
                onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
              />
            </div>

            <div className="space-y-3">
              <Label>Field Visibility</Label>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label className="text-gray-900">Visible to Admin</Label>
                <Switch
                  checked={formData.visibleToAdmin}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, visibleToAdmin: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label className="text-gray-900">Visible to Teacher</Label>
                <Switch
                  checked={formData.visibleToTeacher}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, visibleToTeacher: checked })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddField} disabled={!formData.label || !formData.fieldKey}>
              Add Field
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
