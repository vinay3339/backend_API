import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

export const TransportDrivers: React.FC = () => {
  const drivers = [
    { id: '1', name: 'Ramesh Kumar', phone: '+91 98765 43210', vehicle: 'AP 16 AX 1234', licenseNumber: 'AP1234567890', licenseExpiry: '2025-08-15', verified: true, status: 'active' },
    { id: '2', name: 'Suresh Reddy', phone: '+91 98765 43211', vehicle: 'AP 16 BX 5678', licenseNumber: 'AP9876543210', licenseExpiry: '2025-11-20', verified: true, status: 'active' },
    { id: '3', name: 'Venkat Rao', phone: '+91 98765 43212', vehicle: 'AP 16 CX 9012', licenseNumber: 'AP5555666677', licenseExpiry: '2024-12-31', verified: true, status: 'active' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Drivers</span>
          <p className="text-gray-900 mt-1">{drivers.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Active Drivers</span>
          <p className="text-green-600 mt-1">{drivers.filter(d => d.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Verified</span>
          <p className="text-blue-600 mt-1">{drivers.filter(d => d.verified).length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">License Expiring</span>
          <p className="text-yellow-600 mt-1">1</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">All Drivers</h3>
            <p className="text-sm text-gray-600 mt-1">Manage driver information and compliance</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Driver
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Driver Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Assigned Vehicle</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">License Number</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">License Expiry</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Verification</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{driver.name}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{driver.phone}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-blue-600">{driver.vehicle}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{driver.licenseNumber}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="text-gray-900">{new Date(driver.licenseExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center"><span className={`px-2.5 py-1 rounded-full text-xs ${driver.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{driver.verified ? 'Verified' : 'Pending'}</span></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span></div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
