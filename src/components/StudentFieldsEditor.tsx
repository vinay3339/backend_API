import { useState } from 'react';
import { 
  GripVertical, 
  Lock, 
  Edit2, 
  Trash2, 
  Plus,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CustomField {
  id: string;
  label: string;
  key: string;
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'file';
  required: boolean;
  placeholder?: string;
  hint?: string;
  visibility: {
    admin: boolean;
    teacher: boolean;
    parent: boolean;
  };
  isSystem: boolean;
  order: number;
  options?: string[];
}

interface Section {
  id: string;
  name: string;
  fields: CustomField[];
  isOpen: boolean;
}

type TabType = 'profile' | 'academic' | 'fees' | 'account' | 'audit';

const getInitialSections = (): Record<TabType, Section[]> => ({
  profile: [
    {
      id: 'personal-info',
      name: 'Personal Information',
      isOpen: true,
      fields: [
        { id: '1', label: 'First Name', key: 'first_name', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: '2', label: 'Last Name', key: 'last_name', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: '3', label: 'Date of Birth', key: 'dob', type: 'date', required: true, isSystem: true, order: 2, visibility: { admin: true, teacher: true, parent: true } },
        { id: '4', label: 'Gender', key: 'gender', type: 'dropdown', required: true, isSystem: true, order: 3, options: ['Male', 'Female', 'Other'], visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'contact-info',
      name: 'Contact Information',
      isOpen: true,
      fields: [
        { id: '5', label: 'Email Address', key: 'email', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: '6', label: 'Phone Number', key: 'phone', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: '7', label: 'Address', key: 'address', type: 'text', required: false, isSystem: true, order: 2, visibility: { admin: true, teacher: true, parent: true } },
      ]
    },
    {
      id: 'guardian-info',
      name: 'Guardian Information',
      isOpen: true,
      fields: [
        { id: '8', label: 'Guardian Name', key: 'guardian_name', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: true } },
        { id: '9', label: 'Guardian Phone', key: 'guardian_phone', type: 'text', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: true, parent: true } },
        { id: '10', label: 'Relationship', key: 'relationship', type: 'dropdown', required: true, isSystem: true, order: 2, options: ['Father', 'Mother', 'Guardian'], visibility: { admin: true, teacher: true, parent: true } },
      ]
    }
  ],
  academic: [
    {
      id: 'academic-details',
      name: 'Academic Details',
      isOpen: true,
      fields: [
        { id: '11', label: 'Admission Number', key: 'admission_number', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: true, parent: false } },
        { id: '12', label: 'Class', key: 'class', type: 'dropdown', required: true, isSystem: true, order: 1, options: ['1', '2', '3', '4', '5'], visibility: { admin: true, teacher: true, parent: true } },
        { id: '13', label: 'Section', key: 'section', type: 'dropdown', required: true, isSystem: true, order: 2, options: ['A', 'B', 'C'], visibility: { admin: true, teacher: true, parent: true } },
        { id: '14', label: 'Roll Number', key: 'roll_number', type: 'number', required: true, isSystem: true, order: 3, visibility: { admin: true, teacher: true, parent: true } },
      ]
    }
  ],
  fees: [
    {
      id: 'fee-details',
      name: 'Fee Details',
      isOpen: true,
      fields: [
        { id: '15', label: 'Fee Category', key: 'fee_category', type: 'dropdown', required: true, isSystem: true, order: 0, options: ['Regular', 'Scholarship', 'Financial Aid'], visibility: { admin: true, teacher: false, parent: true } },
        { id: '16', label: 'Annual Fee', key: 'annual_fee', type: 'number', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: true } },
      ]
    }
  ],
  account: [
    {
      id: 'account-settings',
      name: 'Account Settings',
      isOpen: true,
      fields: [
        { id: '17', label: 'Username', key: 'username', type: 'text', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: false } },
        { id: '18', label: 'Status', key: 'status', type: 'dropdown', required: true, isSystem: true, order: 1, options: ['Active', 'Inactive', 'Suspended'], visibility: { admin: true, teacher: false, parent: false } },
      ]
    }
  ],
  audit: [
    {
      id: 'audit-log',
      name: 'Audit Log Settings',
      isOpen: true,
      fields: [
        { id: '19', label: 'Created Date', key: 'created_at', type: 'date', required: true, isSystem: true, order: 0, visibility: { admin: true, teacher: false, parent: false } },
        { id: '20', label: 'Last Modified', key: 'modified_at', type: 'date', required: true, isSystem: true, order: 1, visibility: { admin: true, teacher: false, parent: false } },
      ]
    }
  ]
});

interface DraggableFieldItemProps {
  field: CustomField;
  index: number;
  sectionId: string;
  onMove: (dragIndex: number, hoverIndex: number, sectionId: string) => void;
  onEdit: (field: CustomField, sectionId: string) => void;
  onDelete: (fieldId: string, sectionId: string) => void;
}

function DraggableFieldItem({ field, index, sectionId, onMove, onEdit, onDelete }: DraggableFieldItemProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'field',
    item: { index, sectionId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !field.isSystem
  });

  const [, drop] = useDrop({
    accept: 'field',
    hover: (item: { index: number; sectionId: string }) => {
      if (item.index !== index && item.sectionId === sectionId) {
        onMove(item.index, index, sectionId);
        item.index = index;
      }
    },
  });

  const getFieldTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      text: 'bg-blue-100 text-blue-700',
      number: 'bg-green-100 text-green-700',
      date: 'bg-purple-100 text-purple-700',
      dropdown: 'bg-orange-100 text-orange-700',
      checkbox: 'bg-pink-100 text-pink-700',
      file: 'bg-indigo-100 text-indigo-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div
      ref={(node) => preview(drop(node))}
      className={`
        group bg-white border border-gray-200 rounded-xl p-3 md:p-4 transition-all hover:shadow-md
        ${isDragging ? 'opacity-50' : ''}
        ${field.isSystem ? '' : 'cursor-move'}
      `}
    >
      <div className="flex items-start md:items-center gap-2 md:gap-4">
        <div ref={drag} className={field.isSystem ? 'opacity-0' : 'cursor-grab active:cursor-grabbing'}>
          <GripVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1">
            <h4 className="text-sm md:text-base text-gray-900 mb-0">{field.label}</h4>
            {field.isSystem && (
              <Lock className="w-3 h-3 md:w-4 md:h-4 text-gray-400" title="System Field" />
            )}
            {field.required && (
              <Badge variant="destructive" className="text-xs">Required</Badge>
            )}
            <Badge className={`text-xs ${getFieldTypeColor(field.type)}`}>{field.type}</Badge>
          </div>
          <p className="text-xs text-gray-500 mb-0">Key: {field.key}</p>
          
          <div className="flex md:hidden items-center gap-1 mt-2">
            {field.visibility.admin && <Badge variant="outline" className="text-xs">Admin</Badge>}
            {field.visibility.teacher && <Badge variant="outline" className="text-xs">Teacher</Badge>}
            {field.visibility.parent && <Badge variant="outline" className="text-xs">Parent</Badge>}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {field.visibility.admin && <Badge variant="outline" className="text-xs">Admin</Badge>}
            {field.visibility.teacher && <Badge variant="outline" className="text-xs">Teacher</Badge>}
            {field.visibility.parent && <Badge variant="outline" className="text-xs">Parent</Badge>}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 md:h-8 md:w-8 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            onClick={() => onEdit(field, sectionId)}
            disabled={field.isSystem}
          >
            <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 md:h-8 md:w-8 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(field.id, sectionId)}
            disabled={field.isSystem}
          >
            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface FieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (field: Partial<CustomField>) => void;
  field?: CustomField;
  mode: 'add' | 'edit';
}

function FieldModal({ isOpen, onClose, onSave, field, mode }: FieldModalProps) {
  const [formData, setFormData] = useState<Partial<CustomField>>({
    label: field?.label || '',
    key: field?.key || '',
    type: field?.type || 'text',
    required: field?.required || false,
    placeholder: field?.placeholder || '',
    hint: field?.hint || '',
    visibility: field?.visibility || { admin: true, teacher: true, parent: false },
    options: field?.options || []
  });

  const generateKey = (label: string) => {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  };

  const handleLabelChange = (label: string) => {
    setFormData({
      ...formData,
      label,
      key: mode === 'add' ? generateKey(label) : formData.key
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Field' : 'Edit Field'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Create a custom field for this section' 
              : 'Update the field configuration'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="label">Field Label *</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => handleLabelChange(e.target.value)}
              placeholder="e.g., Middle Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key">Field Key *</Label>
            <Input
              id="key"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              placeholder="e.g., middle_name"
              disabled={mode === 'edit'}
            />
            <p className="text-xs text-gray-500">Auto-generated from label. Used in database.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Field Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="dropdown">Dropdown</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="file">File Upload</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'dropdown' && (
            <div className="space-y-2">
              <Label htmlFor="options">Dropdown Options</Label>
              <Textarea
                id="options"
                value={formData.options?.join('\n') || ''}
                onChange={(e) => setFormData({ ...formData, options: e.target.value.split('\n').filter(o => o.trim()) })}
                placeholder="Enter each option on a new line"
                rows={4}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="placeholder">Placeholder Text</Label>
            <Input
              id="placeholder"
              value={formData.placeholder}
              onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
              placeholder="e.g., Enter middle name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hint">Hint Text</Label>
            <Textarea
              id="hint"
              value={formData.hint}
              onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
              placeholder="Additional information about this field"
              rows={2}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <Label htmlFor="required" className="mb-0">Required Field</Label>
              <p className="text-xs text-gray-500 mb-0">Users must fill this field</p>
            </div>
            <Switch
              id="required"
              checked={formData.required}
              onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
            />
          </div>

          <div className="space-y-3">
            <Label>Visibility</Label>
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <Label htmlFor="vis-admin" className="mb-0">School Admin</Label>
                <Switch
                  id="vis-admin"
                  checked={formData.visibility?.admin}
                  onCheckedChange={(checked) => 
                    setFormData({ 
                      ...formData, 
                      visibility: { ...formData.visibility!, admin: checked }
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="vis-teacher" className="mb-0">Teachers</Label>
                <Switch
                  id="vis-teacher"
                  checked={formData.visibility?.teacher}
                  onCheckedChange={(checked) => 
                    setFormData({ 
                      ...formData, 
                      visibility: { ...formData.visibility!, teacher: checked }
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="vis-parent" className="mb-0">Parents</Label>
                <Switch
                  id="vis-parent"
                  checked={formData.visibility?.parent}
                  onCheckedChange={(checked) => 
                    setFormData({ 
                      ...formData, 
                      visibility: { ...formData.visibility!, parent: checked }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>
            {mode === 'add' ? 'Add Field' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function StudentFieldsEditor() {
  const [selectedTab, setSelectedTab] = useState<TabType>('profile');
  const [sections, setSections] = useState(getInitialSections());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingField, setEditingField] = useState<CustomField | undefined>();
  const [currentSectionId, setCurrentSectionId] = useState<string>('');

  const currentSections = sections[selectedTab];

  const toggleSection = (sectionId: string) => {
    setSections(prev => ({
      ...prev,
      [selectedTab]: prev[selectedTab].map(section =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    }));
  };

  const handleMoveField = (dragIndex: number, hoverIndex: number, sectionId: string) => {
    setSections(prev => {
      const newSections = { ...prev };
      const tabSections = [...newSections[selectedTab]];
      const sectionIndex = tabSections.findIndex(s => s.id === sectionId);
      
      if (sectionIndex === -1) return prev;

      const section = { ...tabSections[sectionIndex] };
      const newFields = [...section.fields];
      const [draggedField] = newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, draggedField);

      section.fields = newFields.map((field, index) => ({ ...field, order: index }));
      tabSections[sectionIndex] = section;

      return {
        ...newSections,
        [selectedTab]: tabSections
      };
    });
  };

  const handleAddField = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setEditingField(undefined);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleEditField = (field: CustomField, sectionId: string) => {
    setCurrentSectionId(sectionId);
    setEditingField(field);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDeleteField = (fieldId: string, sectionId: string) => {
    if (confirm('Are you sure you want to delete this field?')) {
      setSections(prev => ({
        ...prev,
        [selectedTab]: prev[selectedTab].map(section =>
          section.id === sectionId
            ? { ...section, fields: section.fields.filter(f => f.id !== fieldId) }
            : section
        )
      }));
    }
  };

  const handleSaveField = (fieldData: Partial<CustomField>) => {
    setSections(prev => {
      const newSections = { ...prev };
      const tabSections = [...newSections[selectedTab]];
      const sectionIndex = tabSections.findIndex(s => s.id === currentSectionId);

      if (sectionIndex === -1) return prev;

      const section = { ...tabSections[sectionIndex] };

      if (modalMode === 'add') {
        const newField: CustomField = {
          id: `custom_${Date.now()}`,
          label: fieldData.label!,
          key: fieldData.key!,
          type: fieldData.type!,
          required: fieldData.required!,
          placeholder: fieldData.placeholder,
          hint: fieldData.hint,
          visibility: fieldData.visibility!,
          isSystem: false,
          order: section.fields.length,
          options: fieldData.options
        };
        section.fields = [...section.fields, newField];
      } else {
        section.fields = section.fields.map(f =>
          f.id === editingField?.id
            ? { ...f, ...fieldData }
            : f
        );
      }

      tabSections[sectionIndex] = section;

      return {
        ...newSections,
        [selectedTab]: tabSections
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {currentSections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <Collapsible open={section.isOpen} onOpenChange={() => toggleSection(section.id)}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    {section.isOpen ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                    <h3 className="text-gray-900 mb-0">{section.name}</h3>
                    <Badge variant="secondary">{section.fields.length} fields</Badge>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="space-y-3 mb-4">
                    {section.fields.map((field, index) => (
                      <DraggableFieldItem
                        key={field.id}
                        field={field}
                        index={index}
                        sectionId={section.id}
                        onMove={handleMoveField}
                        onEdit={handleEditField}
                        onDelete={handleDeleteField}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => handleAddField(section.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field to this Section
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
        
        <FieldModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveField}
          field={editingField}
          mode={modalMode}
        />
      </div>
    </DndProvider>
  );
}
