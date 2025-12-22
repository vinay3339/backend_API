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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';

interface Section {
  id: string;
  sectionName: string;
  sectionCode: string;
  classTeacher: string;
  coClassTeacher?: string;
  roomNumber: string;
  strength: number;
  boysCount: number;
  girlsCount: number;
  maxCapacity: number;
  status: string;
}

const sampleSections: Section[] = [
  {
    id: '1',
    sectionName: 'A',
    sectionCode: '10A',
    classTeacher: 'Mrs. Priya Sharma',
    coClassTeacher: 'Mr. Rajesh Kumar',
    roomNumber: '201',
    strength: 40,
    boysCount: 22,
    girlsCount: 18,
    maxCapacity: 40,
    status: 'Active',
  },
  {
    id: '2',
    sectionName: 'B',
    sectionCode: '10B',
    classTeacher: 'Mrs. Lakshmi Reddy',
    roomNumber: '202',
    strength: 38,
    boysCount: 20,
    girlsCount: 18,
    maxCapacity: 40,
    status: 'Active',
  },
  {
    id: '3',
    sectionName: 'C',
    sectionCode: '10C',
    classTeacher: 'Mr. Suresh Babu',
    roomNumber: '203',
    strength: 42,
    boysCount: 23,
    girlsCount: 19,
    maxCapacity: 40,
    status: 'Active',
  },
  {
    id: '4',
    sectionName: 'D',
    sectionCode: '10D',
    classTeacher: 'Mrs. Anjali Patel',
    roomNumber: '204',
    strength: 40,
    boysCount: 20,
    girlsCount: 20,
    maxCapacity: 40,
    status: 'Active',
  },
];

interface ClassSectionsTabProps {
  classData: any;
}

export function ClassSectionsTab({ classData }: ClassSectionsTabProps) {
  const [sections, setSections] = useState(sampleSections);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState({
    sectionName: '',
    sectionCode: '',
    classTeacher: '',
    coClassTeacher: '',
    roomNumber: '',
    maxCapacity: 40,
  });

  const handleAddSection = () => {
    setIsAddDialogOpen(false);
    alert('Section added successfully!');
  };

  const handleEditSection = (section: Section) => {
    setSelectedSection(section);
    setFormData({
      sectionName: section.sectionName,
      sectionCode: section.sectionCode,
      classTeacher: section.classTeacher,
      coClassTeacher: section.coClassTeacher || '',
      roomNumber: section.roomNumber,
      maxCapacity: section.maxCapacity,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setIsEditDialogOpen(false);
    alert('Section updated successfully!');
  };

  const handleDeleteSection = (id: string) => {
    if (confirm('Are you sure you want to delete this section?')) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3>Sections</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage sections for {classData.className}
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Section
        </Button>
      </div>

      {/* Sections Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              <TableHead>Section Code</TableHead>
              <TableHead>Class Teacher</TableHead>
              <TableHead>Co-Class Teacher</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Strength</TableHead>
              <TableHead>Gender Dist.</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.map((section) => (
              <TableRow key={section.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">{section.sectionName}</span>
                    </div>
                    <span>Section {section.sectionName}</span>
                  </div>
                </TableCell>
                <TableCell>{section.sectionCode}</TableCell>
                <TableCell>{section.classTeacher}</TableCell>
                <TableCell className="text-gray-500">
                  {section.coClassTeacher || '-'}
                </TableCell>
                <TableCell>{section.roomNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    {section.strength}/{section.maxCapacity}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {section.boysCount}M
                    </Badge>
                    <Badge variant="outline" className="text-pink-600 border-pink-200">
                      {section.girlsCount}F
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    {section.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSection(section)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSection(section.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Section Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogDescription>
              Create a new section for {classData.className}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Section Name</Label>
              <Input
                placeholder="e.g., A, B, C"
                value={formData.sectionName}
                onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Section Code</Label>
              <Input
                placeholder="e.g., 10A"
                value={formData.sectionCode}
                onChange={(e) => setFormData({ ...formData, sectionCode: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Class Teacher</Label>
              <Select
                value={formData.classTeacher}
                onValueChange={(value) => setFormData({ ...formData, classTeacher: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mrs. Priya Sharma">Mrs. Priya Sharma</SelectItem>
                  <SelectItem value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</SelectItem>
                  <SelectItem value="Mrs. Lakshmi Reddy">Mrs. Lakshmi Reddy</SelectItem>
                  <SelectItem value="Mr. Suresh Babu">Mr. Suresh Babu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Co-Class Teacher (Optional)</Label>
              <Select
                value={formData.coClassTeacher}
                onValueChange={(value) => setFormData({ ...formData, coClassTeacher: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select co-teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="Mrs. Priya Sharma">Mrs. Priya Sharma</SelectItem>
                  <SelectItem value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</SelectItem>
                  <SelectItem value="Mrs. Lakshmi Reddy">Mrs. Lakshmi Reddy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Room Number</Label>
              <Input
                placeholder="e.g., 201"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Max Capacity</Label>
              <Input
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSection}>Add Section</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Section Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>
              Update section details for {selectedSection?.sectionCode}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Section Name</Label>
              <Input
                value={formData.sectionName}
                onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Section Code</Label>
              <Input
                value={formData.sectionCode}
                onChange={(e) => setFormData({ ...formData, sectionCode: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Class Teacher</Label>
              <Select
                value={formData.classTeacher}
                onValueChange={(value) => setFormData({ ...formData, classTeacher: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mrs. Priya Sharma">Mrs. Priya Sharma</SelectItem>
                  <SelectItem value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</SelectItem>
                  <SelectItem value="Mrs. Lakshmi Reddy">Mrs. Lakshmi Reddy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Co-Class Teacher</Label>
              <Select
                value={formData.coClassTeacher}
                onValueChange={(value) => setFormData({ ...formData, coClassTeacher: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="Mrs. Priya Sharma">Mrs. Priya Sharma</SelectItem>
                  <SelectItem value="Mr. Rajesh Kumar">Mr. Rajesh Kumar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Room Number</Label>
              <Input
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Max Capacity</Label>
              <Input
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
