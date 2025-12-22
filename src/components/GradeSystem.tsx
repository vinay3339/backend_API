import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Grade {
  id: string;
  name: string;
  marksFrom: number;
  marksTo: number;
  gradePoints: number;
  description: string;
}

export const GradeSystem: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([
    { id: '1', name: 'A1', marksFrom: 91, marksTo: 100, gradePoints: 10.0, description: 'Outstanding' },
    { id: '2', name: 'A+', marksFrom: 81, marksTo: 90, gradePoints: 9.0, description: 'Excellent' },
    { id: '3', name: 'A', marksFrom: 71, marksTo: 80, gradePoints: 8.0, description: 'Very Good' },
    { id: '4', name: 'B+', marksFrom: 61, marksTo: 70, gradePoints: 7.0, description: 'Good' },
    { id: '5', name: 'B', marksFrom: 51, marksTo: 60, gradePoints: 6.0, description: 'Above Average' },
    { id: '6', name: 'C', marksFrom: 41, marksTo: 50, gradePoints: 5.0, description: 'Average' },
    { id: '7', name: 'D', marksFrom: 35, marksTo: 40, gradePoints: 4.0, description: 'Pass' },
    { id: '8', name: 'F', marksFrom: 0, marksTo: 34, gradePoints: 0.0, description: 'Fail' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  const getGradeColor = (name: string) => {
    if (name.startsWith('A')) return 'bg-green-100 text-green-700';
    if (name.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (name.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    if (name.startsWith('D')) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Grades</span>
          <p className="text-gray-900 mt-1">{grades.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Passing Grade</span>
          <p className="text-green-600 mt-1">D (35+)</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Highest Grade</span>
          <p className="text-blue-600 mt-1">A1 (Outstanding)</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Grade Points Range</span>
          <p className="text-gray-900 mt-1">0.0 - 10.0</p>
        </div>
      </div>

      {/* Grade System Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Grade Configuration</h3>
            <p className="text-sm text-gray-600 mt-1">Define grade ranges and grade points</p>
          </div>
          <button
            onClick={() => {
              setEditingGrade(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Grade Range
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Grade Name
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Marks From
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Marks To
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Grade Points
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm ${getGradeColor(grade.name)}`}>
                      {grade.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">{grade.marksFrom}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">{grade.marksTo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">{grade.gradePoints.toFixed(1)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{grade.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingGrade(grade);
                          setShowModal(true);
                        }}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
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

      {/* Visual Grade Scale */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Visual Grade Scale</h3>
        <div className="space-y-3">
          {grades.map((grade) => (
            <div key={grade.id} className="flex items-center gap-4">
              <div className="w-16">
                <span className={`px-3 py-1 rounded-full text-sm ${getGradeColor(grade.name)}`}>
                  {grade.name}
                </span>
              </div>
              <div className="flex-1">
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className={`h-full ${getGradeColor(grade.name).replace('text-', 'bg-').replace('100', '200')} transition-all`}
                    style={{ width: `${grade.marksTo}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-700">
                    {grade.marksFrom} - {grade.marksTo} marks ({grade.description})
                  </span>
                </div>
              </div>
              <div className="w-20 text-right">
                <span className="text-sm text-gray-600">{grade.gradePoints.toFixed(1)} GP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Grade Modal */}
      {showModal && (
        <GradeModal
          grade={editingGrade}
          onClose={() => {
            setShowModal(false);
            setEditingGrade(null);
          }}
          onSave={(grade) => {
            if (editingGrade) {
              setGrades(grades.map((g) => (g.id === grade.id ? grade : g)));
            } else {
              setGrades([...grades, { ...grade, id: Date.now().toString() }]);
            }
            setShowModal(false);
            setEditingGrade(null);
          }}
        />
      )}
    </div>
  );
};

// Grade Modal Component
const GradeModal: React.FC<{
  grade: Grade | null;
  onClose: () => void;
  onSave: (grade: Grade) => void;
}> = ({ grade, onClose, onSave }) => {
  const [formData, setFormData] = useState<Grade>(
    grade || {
      id: '',
      name: '',
      marksFrom: 0,
      marksTo: 0,
      gradePoints: 0,
      description: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">{grade ? 'Edit Grade' : 'Add Grade Range'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Grade Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., A1, A+, B"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">From Marks</label>
                <input
                  type="number"
                  value={formData.marksFrom}
                  onChange={(e) => setFormData({ ...formData, marksFrom: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">To Marks</label>
                <input
                  type="number"
                  value={formData.marksTo}
                  onChange={(e) => setFormData({ ...formData, marksTo: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Grade Points</label>
              <input
                type="number"
                step="0.1"
                value={formData.gradePoints}
                onChange={(e) => setFormData({ ...formData, gradePoints: parseFloat(e.target.value) })}
                placeholder="e.g., 10.0, 9.0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Outstanding, Excellent"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {grade ? 'Update Grade' : 'Add Grade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
