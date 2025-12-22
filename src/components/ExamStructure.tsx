import React, { useState } from 'react';
import { Edit2, Trash2, Plus, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface Exam {
  id: string;
  name: string;
  code: string;
  academicYear: string;
  type: 'formative' | 'summative' | 'term' | 'internal';
  weightage: number;
  maxMarks: number;
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  subjectsConfigured: number;
  totalSubjects: number;
}

export const ExamStructure: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      name: 'FA1 (Formative Assessment 1)',
      code: 'FA1-2024',
      academicYear: '2024-2025',
      type: 'formative',
      weightage: 10,
      maxMarks: 20,
      status: 'active',
      startDate: '2024-06-15',
      endDate: '2024-06-30',
      subjectsConfigured: 8,
      totalSubjects: 8,
    },
    {
      id: '2',
      name: 'FA2 (Formative Assessment 2)',
      code: 'FA2-2024',
      academicYear: '2024-2025',
      type: 'formative',
      weightage: 10,
      maxMarks: 20,
      status: 'active',
      startDate: '2024-08-01',
      endDate: '2024-08-15',
      subjectsConfigured: 6,
      totalSubjects: 8,
    },
    {
      id: '3',
      name: 'SA1 (Summative Assessment 1)',
      code: 'SA1-2024',
      academicYear: '2024-2025',
      type: 'summative',
      weightage: 40,
      maxMarks: 80,
      status: 'active',
      startDate: '2024-09-15',
      endDate: '2024-09-30',
      subjectsConfigured: 8,
      totalSubjects: 8,
    },
    {
      id: '4',
      name: 'SA2 (Summative Assessment 2)',
      code: 'SA2-2025',
      academicYear: '2024-2025',
      type: 'summative',
      weightage: 40,
      maxMarks: 80,
      status: 'inactive',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      subjectsConfigured: 0,
      totalSubjects: 8,
    },
    {
      id: '5',
      name: 'Term 1 Exam',
      code: 'TERM1-2024',
      academicYear: '2024-2025',
      type: 'term',
      weightage: 50,
      maxMarks: 100,
      status: 'active',
      startDate: '2024-10-01',
      endDate: '2024-10-20',
      subjectsConfigured: 8,
      totalSubjects: 8,
    },
  ]);

  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'formative':
        return 'bg-blue-100 text-blue-700';
      case 'summative':
        return 'bg-purple-100 text-purple-700';
      case 'term':
        return 'bg-green-100 text-green-700';
      case 'internal':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'formative':
        return 'Formative';
      case 'summative':
        return 'Summative';
      case 'term':
        return 'Term';
      case 'internal':
        return 'Internal';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Exams</span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-900">{exams.length}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Exams</span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-gray-900">{exams.filter((e) => e.status === 'active').length}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Weightage</span>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600">%</span>
            </div>
          </div>
          <p className="text-gray-900">{exams.reduce((sum, e) => sum + e.weightage, 0)}%</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Academic Year</span>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-sm">AY</span>
            </div>
          </div>
          <p className="text-gray-900">2024-2025</p>
        </div>
      </div>

      {/* Exams List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-gray-900">Exam Structure</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Exam
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {exams.map((exam) => (
            <div key={exam.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-gray-900">{exam.name}</h4>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs ${getTypeColor(exam.type)}`}
                    >
                      {getTypeLabel(exam.type)}
                    </span>
                    {exam.status === 'active' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 block mb-1">Exam Code</span>
                      <span className="text-gray-900">{exam.code}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Academic Year</span>
                      <span className="text-gray-900">{exam.academicYear}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Weightage</span>
                      <span className="text-gray-900">{exam.weightage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Max Marks</span>
                      <span className="text-gray-900">{exam.maxMarks}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Duration</span>
                      <span className="text-gray-900">
                        {new Date(exam.startDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}{' '}
                        -{' '}
                        {new Date(exam.endDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Subjects</span>
                      <span className="text-gray-900">
                        {exam.subjectsConfigured}/{exam.totalSubjects} configured
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {exam.subjectsConfigured < exam.totalSubjects && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Subject Configuration Progress</span>
                        <span>
                          {Math.round((exam.subjectsConfigured / exam.totalSubjects) * 100)}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{
                            width: `${(exam.subjectsConfigured / exam.totalSubjects) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setSelectedExam(exam.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Configure Subjects"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Configuration View */}
      {selectedExam && (
        <SubjectConfiguration
          examId={selectedExam}
          onClose={() => setSelectedExam(null)}
        />
      )}
    </div>
  );
};

// Subject Configuration Component
const SubjectConfiguration: React.FC<{ examId: string; onClose: () => void }> = ({
  examId,
  onClose,
}) => {
  const [subjects] = useState([
    {
      id: '1',
      name: 'Mathematics',
      code: 'MATH',
      maxMarks: 80,
      minPassMarks: 35,
      weightage: 100,
      teacher: 'Dr. Ramarao',
    },
    {
      id: '2',
      name: 'Physics',
      code: 'PHY',
      maxMarks: 80,
      minPassMarks: 35,
      weightage: 100,
      teacher: 'Prof. Lakshmi',
    },
    {
      id: '3',
      name: 'Chemistry',
      code: 'CHEM',
      maxMarks: 80,
      minPassMarks: 35,
      weightage: 100,
      teacher: 'Dr. Krishna',
    },
    {
      id: '4',
      name: 'English',
      code: 'ENG',
      maxMarks: 80,
      minPassMarks: 35,
      weightage: 100,
      teacher: 'Ms. Priya',
    },
    {
      id: '5',
      name: 'Telugu',
      code: 'TEL',
      maxMarks: 80,
      minPassMarks: 35,
      weightage: 100,
      teacher: 'Mr. Venkat',
    },
  ]);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">Subject-wise Exam Configuration</h3>
          <p className="text-sm text-gray-600 mt-1">Configure marks and teachers for each subject</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Subject Config
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Subject Name
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Subject Code
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Max Marks
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Min Pass Marks
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Weightage (%)
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Teacher Assigned
              </th>
              <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{subject.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-600">{subject.code}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{subject.maxMarks}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{subject.minPassMarks}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{subject.weightage}%</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{subject.teacher}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
