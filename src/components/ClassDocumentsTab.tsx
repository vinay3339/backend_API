import { Card } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { FileText, Upload, Eye, Download, Trash2, File, Search } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const documents = [
  // Section A documents
  {
    id: '1a',
    name: 'Class Syllabus PDF',
    fileName: 'class_10_syllabus_2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Mrs. Administrator',
    uploadedOn: '15 Mar 2024',
    section: 'Section A',
    category: 'Syllabus',
  },
  {
    id: '3a',
    name: 'Exam Blueprint',
    fileName: 'exam_blueprint_class10.pdf',
    type: 'PDF',
    size: '890 KB',
    uploadedBy: 'Mrs. Priya Sharma',
    uploadedOn: '05 Mar 2024',
    section: 'Section A',
    category: 'Exam Blueprint',
  },
  {
    id: '4a',
    name: 'Parent Circular - Term 1',
    fileName: 'circular_term1_2024.pdf',
    type: 'PDF',
    size: '456 KB',
    uploadedBy: 'Mrs. Administrator',
    uploadedOn: '01 Mar 2024',
    section: 'Section A',
    category: 'Circulars',
  },
  {
    id: '5a',
    name: 'Lab Manual - Chemistry',
    fileName: 'lab_manual_chemistry.pdf',
    type: 'PDF',
    size: '3.1 MB',
    uploadedBy: 'Mrs. Lakshmi Reddy',
    uploadedOn: '20 Feb 2024',
    section: 'Section A',
    category: 'Lab Manual',
  },
  {
    id: '6a',
    name: 'Assignment - Mathematics',
    fileName: 'math_assignment_march.pdf',
    type: 'PDF',
    size: '756 KB',
    uploadedBy: 'Mrs. Priya Sharma',
    uploadedOn: '18 Mar 2024',
    section: 'Section A',
    category: 'Assignment',
  },
  // Section B documents
  {
    id: '1b',
    name: 'Class Syllabus PDF',
    fileName: 'class_10_syllabus_2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Mrs. Administrator',
    uploadedOn: '15 Mar 2024',
    section: 'Section B',
    category: 'Syllabus',
  },
  {
    id: '3b',
    name: 'Exam Blueprint',
    fileName: 'exam_blueprint_class10.pdf',
    type: 'PDF',
    size: '890 KB',
    uploadedBy: 'Mr. Rajesh Kumar',
    uploadedOn: '05 Mar 2024',
    section: 'Section B',
    category: 'Exam Blueprint',
  },
  {
    id: '4b',
    name: 'Parent Circular - Term 1',
    fileName: 'circular_term1_2024.pdf',
    type: 'PDF',
    size: '456 KB',
    uploadedBy: 'Mrs. Administrator',
    uploadedOn: '01 Mar 2024',
    section: 'Section B',
    category: 'Circulars',
  },
  {
    id: '5b',
    name: 'Lab Manual - Chemistry',
    fileName: 'lab_manual_chemistry.pdf',
    type: 'PDF',
    size: '3.1 MB',
    uploadedBy: 'Mrs. Lakshmi Reddy',
    uploadedOn: '20 Feb 2024',
    section: 'Section B',
    category: 'Lab Manual',
  },
  {
    id: '6b',
    name: 'Assignment - Mathematics',
    fileName: 'math_assignment_march.pdf',
    type: 'PDF',
    size: '756 KB',
    uploadedBy: 'Mr. Arun Kumar',
    uploadedOn: '18 Mar 2024',
    section: 'Section B',
    category: 'Assignment',
  },
  // Section C documents
  {
    id: '1c',
    name: 'Class Syllabus PDF',
    fileName: 'class_10_syllabus_2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Mrs. Administrator',
    uploadedOn: '15 Mar 2024',
    section: 'Section C',
    category: 'Syllabus',
  },
  {
    id: '3c',
    name: 'Exam Blueprint',
    fileName: 'exam_blueprint_class10.pdf',
    type: 'PDF',
    size: '890 KB',
    uploadedBy: 'Mrs. Meena Reddy',
    uploadedOn: '05 Mar 2024',
    section: 'Section C',
    category: 'Exam Blueprint',
  },
  {
    id: '4c',
    name: 'Parent Circular - Term 1',
    fileName: 'circular_term1_2024.pdf',
    type: 'PDF',
    size: '456 KB',
    uploadedBy: 'Mrs. Administrator',
    uploadedOn: '01 Mar 2024',
    section: 'Section C',
    category: 'Circulars',
  },
  {
    id: '5c',
    name: 'Lab Manual - Chemistry',
    fileName: 'lab_manual_chemistry.pdf',
    type: 'PDF',
    size: '3.1 MB',
    uploadedBy: 'Mrs. Lakshmi Reddy',
    uploadedOn: '20 Feb 2024',
    section: 'Section C',
    category: 'Lab Manual',
  },
  {
    id: '6c',
    name: 'Assignment - Mathematics',
    fileName: 'math_assignment_march.pdf',
    type: 'PDF',
    size: '756 KB',
    uploadedBy: 'Mr. Ramesh Babu',
    uploadedOn: '18 Mar 2024',
    section: 'Section C',
    category: 'Assignment',
  },
  // Section D documents
  {
    id: '1d',
    name: 'Class Syllabus PDF',
    fileName: 'class_10_syllabus_2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Mrs. Administrator',
    uploadedOn: '15 Mar 2024',
    section: 'Section D',
    category: 'Syllabus',
  },
  {
    id: '3d',
    name: 'Exam Blueprint',
    fileName: 'exam_blueprint_class10.pdf',
    type: 'PDF',
    size: '890 KB',
    uploadedBy: 'Mrs. Priya Sharma',
    uploadedOn: '05 Mar 2024',
    section: 'Section D',
    category: 'Exam Blueprint',
  },
  {
    id: '4d',
    name: 'Parent Circular - Term 1',
    fileName: 'circular_term1_2024.pdf',
    type: 'PDF',
    size: '456 KB',
    uploadedBy: 'Mrs. Administrator',
    uploadedOn: '01 Mar 2024',
    section: 'Section D',
    category: 'Circulars',
  },
  {
    id: '5d',
    name: 'Lab Manual - Chemistry',
    fileName: 'lab_manual_chemistry.pdf',
    type: 'PDF',
    size: '3.1 MB',
    uploadedBy: 'Mrs. Divya Reddy',
    uploadedOn: '20 Feb 2024',
    section: 'Section D',
    category: 'Lab Manual',
  },
  {
    id: '6d',
    name: 'Assignment - Mathematics',
    fileName: 'math_assignment_march.pdf',
    type: 'PDF',
    size: '756 KB',
    uploadedBy: 'Mrs. Priya Sharma',
    uploadedOn: '18 Mar 2024',
    section: 'Section D',
    category: 'Assignment',
  },
];

interface ClassDocumentsTabProps {
  classData: any;
}

export function ClassDocumentsTab({ classData }: ClassDocumentsTabProps) {
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique sections from documents
  const sections = [...new Set(documents.map(d => d.section).filter(Boolean))];
  
  // Get unique categories from documents
  const categories = [...new Set(documents.map(d => d.category).filter(Boolean))];
  
  // Filter documents by section, search query, and category
  const filteredDocuments = documents.filter(d => {
    const matchesSection = d.section === selectedSection;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    
    return matchesSection && matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3>Class Documents</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage documents for {classData.className}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-48">
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section as string}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">Syllabus</p>
              <p className="text-xs text-gray-500">1 file</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">Exam Blueprint</p>
              <p className="text-xs text-gray-500">1 file</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">Circulars</p>
              <p className="text-xs text-gray-500">1 file</p>
            </div>
          </div>
        </Card>
      </div>

      {/* All Documents List */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-sm">
            {selectedSection === 'all' 
              ? `All Documents (${filteredDocuments.length})`
              : `${selectedSection} - ${filteredDocuments.length} Documents`
            }
          </h3>
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <div className="w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category as string}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <File className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-900">{doc.name}</p>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        {doc.section}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {doc.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{doc.fileName}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{doc.size}</span>
                      <span className="text-xs text-gray-500">
                        Uploaded by {doc.uploadedBy} on {doc.uploadedOn}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <File className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No documents found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </Card>

      {/* Upload Guidelines */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="mb-4 text-blue-900">Upload Guidelines</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Maximum file size: 10 MB</li>
          <li>• Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX</li>
          <li>• All documents should be properly named for easy identification</li>
          <li>• Documents are visible to all teachers and students of this class</li>
        </ul>
      </Card>
    </div>
  );
}