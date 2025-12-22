import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, AlertCircle } from 'lucide-react';

interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: string;
  seatingCapacity: number;
  assignedRoute: string;
  insuranceExpiry: string;
  fitnessExpiry: string;
  lastService: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export const TransportVehicles: React.FC = () => {
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      vehicleNumber: 'AP 16 AX 1234',
      type: 'Bus',
      seatingCapacity: 50,
      assignedRoute: 'R-14 (Vijayawada Central)',
      insuranceExpiry: '2025-06-30',
      fitnessExpiry: '2025-12-31',
      lastService: '2024-10-15',
      status: 'active',
    },
    {
      id: '2',
      vehicleNumber: 'AP 16 BX 5678',
      type: 'Bus',
      seatingCapacity: 45,
      assignedRoute: 'R-22 (Guntur Road)',
      insuranceExpiry: '2025-03-15',
      fitnessExpiry: '2025-08-20',
      lastService: '2024-11-01',
      status: 'active',
    },
    {
      id: '3',
      vehicleNumber: 'AP 16 CX 9012',
      type: 'Van',
      seatingCapacity: 25,
      assignedRoute: 'R-08 (Benz Circle)',
      insuranceExpiry: '2024-12-31',
      fitnessExpiry: '2025-05-15',
      lastService: '2024-09-20',
      status: 'active',
    },
  ]);

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  const getExpiryStatus = (date: string) => {
    if (isExpired(date)) return { label: 'Expired', color: 'bg-red-100 text-red-700' };
    if (isExpiringSoon(date)) return { label: 'Due Soon', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Valid', color: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Vehicles</span>
          <p className="text-gray-900 mt-1">{vehicles.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Active Vehicles</span>
          <p className="text-green-600 mt-1">{vehicles.filter((v) => v.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Capacity</span>
          <p className="text-blue-600 mt-1">{vehicles.reduce((sum, v) => sum + v.seatingCapacity, 0)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Expiring Soon</span>
          <p className="text-yellow-600 mt-1">
            {vehicles.filter((v) => isExpiringSoon(v.insuranceExpiry) || isExpiringSoon(v.fitnessExpiry)).length}
          </p>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">All Vehicles</h3>
            <p className="text-sm text-gray-600 mt-1">Manage fleet vehicles and compliance</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Vehicle
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Vehicle Number</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Capacity</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Assigned Route</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Insurance</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Fitness</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Last Service</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => {
                const insuranceStatus = getExpiryStatus(vehicle.insuranceExpiry);
                const fitnessStatus = getExpiryStatus(vehicle.fitnessExpiry);
                return (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600">{vehicle.vehicleNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {vehicle.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-gray-900">{vehicle.seatingCapacity}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{vehicle.assignedRoute}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm text-gray-900">
                          {new Date(vehicle.insuranceExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${insuranceStatus.color}`}>
                          {insuranceStatus.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm text-gray-900">
                          {new Date(vehicle.fitnessExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${fitnessStatus.color}`}>
                          {fitnessStatus.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm text-gray-900">
                        {new Date(vehicle.lastService).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs ${vehicle.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {vehicle.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
