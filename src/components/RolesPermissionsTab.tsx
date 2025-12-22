import React, { useState } from 'react';
import { Save } from 'lucide-react';

export const RolesPermissionsTab: React.FC = () => {
  const roles = ['Admin', 'Principal', 'Teacher', 'Class Teacher', 'Parent', 'Student'];
  const permissions = [
    'View Attendance', 'Modify Attendance', 'Upload Marks', 'Edit Student Profile',
    'Access Finance', 'Approve Concessions', 'Export Reports', 'Manage Transport',
    'Manage Integrations', 'Manage Users', 'View Reports', 'Delete Records'
  ];

  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>({
    'Admin': { 'View Attendance': true, 'Modify Attendance': true, 'Upload Marks': true, 'Edit Student Profile': true, 'Access Finance': true, 'Approve Concessions': true, 'Export Reports': true, 'Manage Transport': true, 'Manage Integrations': true, 'Manage Users': true, 'View Reports': true, 'Delete Records': true },
    'Principal': { 'View Attendance': true, 'Modify Attendance': true, 'Upload Marks': true, 'Edit Student Profile': true, 'Access Finance': true, 'Approve Concessions': true, 'Export Reports': true, 'Manage Transport': true, 'Manage Integrations': false, 'Manage Users': true, 'View Reports': true, 'Delete Records': false },
    'Teacher': { 'View Attendance': true, 'Modify Attendance': true, 'Upload Marks': true, 'Edit Student Profile': false, 'Access Finance': false, 'Approve Concessions': false, 'Export Reports': true, 'Manage Transport': false, 'Manage Integrations': false, 'Manage Users': false, 'View Reports': true, 'Delete Records': false },
    'Class Teacher': { 'View Attendance': true, 'Modify Attendance': true, 'Upload Marks': true, 'Edit Student Profile': true, 'Access Finance': false, 'Approve Concessions': false, 'Export Reports': true, 'Manage Transport': false, 'Manage Integrations': false, 'Manage Users': false, 'View Reports': true, 'Delete Records': false },
    'Parent': { 'View Attendance': true, 'Modify Attendance': false, 'Upload Marks': false, 'Edit Student Profile': false, 'Access Finance': true, 'Approve Concessions': false, 'Export Reports': false, 'Manage Transport': false, 'Manage Integrations': false, 'Manage Users': false, 'View Reports': false, 'Delete Records': false },
    'Student': { 'View Attendance': true, 'Modify Attendance': false, 'Upload Marks': false, 'Edit Student Profile': false, 'Access Finance': true, 'Approve Concessions': false, 'Export Reports': false, 'Manage Transport': false, 'Manage Integrations': false, 'Manage Users': false, 'View Reports': false, 'Delete Records': false },
  });

  const togglePermission = (role: string, permission: string) => {
    setMatrix(prev => ({
      ...prev,
      [role]: { ...prev[role], [permission]: !prev[role][permission] }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Roles & Permissions Matrix</h3>
        <p className="text-sm text-gray-600 mb-6">Configure access permissions for each role</p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-700 bg-gray-50 border border-gray-200 sticky left-0 z-10">Permission</th>
                {roles.map((role) => (
                  <th key={role} className="px-4 py-3 text-center text-sm text-gray-700 bg-gray-50 border border-gray-200 whitespace-nowrap min-w-[120px]">{role}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border border-gray-200 bg-white sticky left-0">{permission}</td>
                  {roles.map((role) => (
                    <td key={`${role}-${permission}`} className="px-4 py-3 text-center border border-gray-200">
                      <input type="checkbox" checked={matrix[role]?.[permission] || false} onChange={() => togglePermission(role, permission)} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Permissions
        </button>
      </div>
    </div>
  );
};
