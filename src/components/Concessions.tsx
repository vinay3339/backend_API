import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Concession {
  id: string;
  name: string;
  type: 'percentage' | 'amount';
  value: number;
  applicableClasses: string[];
  applicableCategories: string[];
  validityPeriod: string;
  approvedBy: string;
}

export const Concessions: React.FC = () => {
  const [concessions] = useState<Concession[]>([
    {
      id: '1',
      name: 'Sibling Discount',
      type: 'percentage',
      value: 10,
      applicableClasses: ['10', '9', '8'],
      applicableCategories: ['Tuition Fee'],
      validityPeriod: '2024-2025',
      approvedBy: 'Principal',
    },
    {
      id: '2',
      name: 'Merit Scholarship',
      type: 'percentage',
      value: 25,
      applicableClasses: ['10', '9'],
      applicableCategories: ['Tuition Fee'],
      validityPeriod: '2024-2025',
      approvedBy: 'Principal',
    },
    {
      id: '3',
      name: 'Staff Ward Concession',
      type: 'percentage',
      value: 50,
      applicableClasses: ['10', '9', '8', '7', '6'],
      applicableCategories: ['Tuition Fee', 'Lab Fee'],
      validityPeriod: '2024-2025',
      approvedBy: 'Management',
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Concessions</span>
          <p className="text-gray-900 mt-1">{concessions.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Percentage Based</span>
          <p className="text-blue-600 mt-1">
            {concessions.filter((c) => c.type === 'percentage').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Amount Based</span>
          <p className="text-green-600 mt-1">
            {concessions.filter((c) => c.type === 'amount').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Academic Year</span>
          <p className="text-gray-900 mt-1">2024-2025</p>
        </div>
      </div>

      {/* Concessions Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Fee Concessions</h3>
            <p className="text-sm text-gray-600 mt-1">Manage fee discounts and scholarships</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Concession
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Concession Name
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Applicable Classes
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Applicable Categories
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Validity
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Approved By
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {concessions.map((concession) => (
                <tr key={concession.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{concession.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs ${
                          concession.type === 'percentage'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {concession.type === 'percentage' ? 'Percentage' : 'Amount'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">
                      {concession.type === 'percentage'
                        ? `${concession.value}%`
                        : `₹${concession.value.toLocaleString('en-IN')}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {concession.applicableClasses.map((cls) => (
                        <span
                          key={cls}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          Class {cls}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {concession.applicableCategories.map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-900">{concession.validityPeriod}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{concession.approvedBy}</span>
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

      {/* Add Concession Modal */}
      {showModal && <AddConcessionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

// Add Concession Modal
const AddConcessionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">Add Concession</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600">Concession form would go here...</p>
        </div>
      </div>
    </div>
  );
};
