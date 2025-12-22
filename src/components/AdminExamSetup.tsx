import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  FileText,
  BookOpen,
  Award,
  BarChart3,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Exam {
  id: string;
  name: string;
  type: 'FA' | 'SA';
  term: 'Term 1' | 'Term 2';
  startDate: string;
  endDate: string;
  weightage: number;
  maxMarks: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

const mockExams: Exam[] = [
  {
    id: '1',
    name: 'FA1',
    type: 'FA',
    term: 'Term 1',
    startDate: '2025-06-15',
    endDate: '2025-06-25',
    weightage: 10,
    maxMarks: 20,
    status: 'Completed',
  },
  {
    id: '2',
    name: 'FA2',
    type: 'FA',
    term: 'Term 1',
    startDate: '2025-08-01',
    endDate: '2025-08-10',
    weightage: 10,
    maxMarks: 20,
    status: 'Completed',
  },
  {
    id: '3',
    name: 'SA1',
    type: 'SA',
    term: 'Term 1',
    startDate: '2025-09-15',
    endDate: '2025-09-30',
    weightage: 30,
    maxMarks: 80,
    status: 'Ongoing',
  },
  {
    id: '4',
    name: 'FA3',
    type: 'FA',
    term: 'Term 2',
    startDate: '2025-12-01',
    endDate: '2025-12-10',
    weightage: 10,
    maxMarks: 20,
    status: 'Upcoming',
  },
  {
    id: '5',
    name: 'FA4',
    type: 'FA',
    term: 'Term 2',
    startDate: '2026-01-15',
    endDate: '2026-01-25',
    weightage: 10,
    maxMarks: 20,
    status: 'Upcoming',
  },
  {
    id: '6',
    name: 'SA2',
    type: 'SA',
    term: 'Term 2',
    startDate: '2026-03-01',
    endDate: '2026-03-15',
    weightage: 30,
    maxMarks: 80,
    status: 'Upcoming',
  },
];

export function AdminExamSetup() {
  const [activeTab, setActiveTab] = useState('exam-setup');
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [formData, setFormData] = useState<Partial<Exam>>({});

  const handleAddExam = () => {
    setEditingExam(null);
    setFormData({
      type: 'FA',
      term: 'Term 1',
      weightage: 10,
      maxMarks: 20,
      status: 'Upcoming',
    });
    setShowAddDialog(true);
  };

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setFormData(exam);
    setShowAddDialog(true);
  };

  const handleSaveExam = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingExam) {
      setExams(exams.map((e) => (e.id === editingExam.id ? { ...formData as Exam, id: editingExam.id } : e)));
      toast.success('Exam updated successfully');
    } else {
      const newExam: Exam = {
        ...formData as Exam,
        id: Date.now().toString(),
      };
      setExams([...exams, newExam]);
      toast.success('Exam added successfully');
    }
    setShowAddDialog(false);
  };

  const handleDeleteExam = (examId: string) => {
    setExams(exams.filter((e) => e.id !== examId));
    toast.success('Exam deleted successfully');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Upcoming: 'bg-blue-100 text-blue-700',
      Ongoing: 'bg-green-100 text-green-700',
      Completed: 'bg-gray-100 text-gray-700',
    };
    return variants[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-gray-900 mb-1">Marks & Exams (CCE Format)</h1>
            <p className="text-sm text-gray-600">
              Continuous and Comprehensive Evaluation - AP SSC/CBSE Pattern
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={academicYear} onValueChange={setAcademicYear}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-25">Academic Year 2024-25</SelectItem>
                <SelectItem value="2025-26">Academic Year 2025-26</SelectItem>
                <SelectItem value="2026-27">Academic Year 2026-27</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex-wrap h-auto gap-2">
          <TabsTrigger value="exam-setup" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Exam Setup</span>
          </TabsTrigger>
          <TabsTrigger value="subjects" className="gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Subjects</span>
          </TabsTrigger>
          <TabsTrigger value="grade-scale" className="gap-2">
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Grade Scale</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>

        {/* Exam Setup Tab */}
        <TabsContent value="exam-setup" className="space-y-6">
          <Card className="rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-gray-900 mb-1">Examination Schedule</h3>
                  <p className="text-xs text-gray-600">
                    Configure FA (Formative Assessment) and SA (Summative Assessment) exams
                  </p>
                </div>

                <Button onClick={handleAddExam} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  Add Exam
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-center">Weightage (%)</TableHead>
                    <TableHead className="text-center">Max Marks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>{exam.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{exam.type}</Badge>
                      </TableCell>
                      <TableCell>{exam.term}</TableCell>
                      <TableCell>{new Date(exam.startDate).toLocaleDateString('en-IN')}</TableCell>
                      <TableCell>{new Date(exam.endDate).toLocaleDateString('en-IN')}</TableCell>
                      <TableCell className="text-center">{exam.weightage}%</TableCell>
                      <TableCell className="text-center">{exam.maxMarks}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(exam.status)}>
                          {exam.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditExam(exam)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteExam(exam.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Exams</p>
                  <p className="text-2xl text-gray-900">{exams.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Ongoing Exams</p>
                  <p className="text-2xl text-gray-900">
                    {exams.filter((e) => e.status === 'Ongoing').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Upcoming Exams</p>
                  <p className="text-2xl text-gray-900">
                    {exams.filter((e) => e.status === 'Upcoming').length}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects">
          <Card className="p-6 rounded-2xl">
            <p className="text-gray-600">Subject configuration coming soon...</p>
          </Card>
        </TabsContent>

        {/* Grade Scale Tab */}
        <TabsContent value="grade-scale">
          <Card className="p-6 rounded-2xl">
            <h3 className="text-gray-900 mb-4">CBSE Grading Scale</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grade</TableHead>
                    <TableHead>Marks Range</TableHead>
                    <TableHead>Grade Point</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell><Badge className="bg-green-100 text-green-700">A1</Badge></TableCell>
                    <TableCell>91-100</TableCell>
                    <TableCell>10.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Badge className="bg-green-100 text-green-700">A2</Badge></TableCell>
                    <TableCell>81-90</TableCell>
                    <TableCell>9.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Badge className="bg-blue-100 text-blue-700">B1</Badge></TableCell>
                    <TableCell>71-80</TableCell>
                    <TableCell>8.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Badge className="bg-blue-100 text-blue-700">B2</Badge></TableCell>
                    <TableCell>61-70</TableCell>
                    <TableCell>7.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Badge className="bg-yellow-100 text-yellow-700">C1</Badge></TableCell>
                    <TableCell>51-60</TableCell>
                    <TableCell>6.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Badge className="bg-yellow-100 text-yellow-700">C2</Badge></TableCell>
                    <TableCell>41-50</TableCell>
                    <TableCell>5.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Badge className="bg-orange-100 text-orange-700">D</Badge></TableCell>
                    <TableCell>33-40</TableCell>
                    <TableCell>4.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Badge className="bg-red-100 text-red-700">E</Badge></TableCell>
                    <TableCell>0-32</TableCell>
                    <TableCell>0.0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card className="p-6 rounded-2xl">
            <p className="text-gray-600">Reports and analytics coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Exam Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingExam ? 'Edit Exam' : 'Add New Exam'}</DialogTitle>
            <DialogDescription>
              Configure examination details for CCE pattern
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Exam Name *</Label>
              <Input
                id="name"
                placeholder="e.g. FA1, SA1"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'FA' | 'SA') => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FA">FA (Formative)</SelectItem>
                    <SelectItem value="SA">SA (Summative)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="term">Term *</Label>
                <Select
                  value={formData.term}
                  onValueChange={(value: 'Term 1' | 'Term 2') =>
                    setFormData({ ...formData, term: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Term 1">Term 1</SelectItem>
                    <SelectItem value="Term 2">Term 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="weightage">Weightage (%)</Label>
                <Input
                  id="weightage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.weightage || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, weightage: parseInt(e.target.value) })
                  }
                  className="rounded-xl"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxMarks">Max Marks</Label>
                <Input
                  id="maxMarks"
                  type="number"
                  min="0"
                  value={formData.maxMarks || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, maxMarks: parseInt(e.target.value) })
                  }
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'Upcoming' | 'Ongoing' | 'Completed') =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveExam} className="bg-blue-600 hover:bg-blue-700">
              {editingExam ? 'Update' : 'Add'} Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
