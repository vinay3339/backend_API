import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const TransportFees: React.FC = () => {
  const [routes] = useState([
    { id: '1', routeNumber: 'R1', pickupPoint: 'Vijayawada Central', transportFee: 3000, frequency: 'Monthly', paid: 24000, pending: 6000 },
    { id: '2', routeNumber: 'R2', pickupPoint: 'Guntur Road', transportFee: 2500, frequency: 'Monthly', paid: 20000, pending: 5000 },
    { id: '3', routeNumber: 'R3', pickupPoint: 'Benz Circle', transportFee: 2000, frequency: 'Monthly', paid: 16000, pending: 4000 },
  ]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Routes</span>
          <p className="text-gray-900 mt-1">{routes.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Collected</span>
          <p className="text-green-600 mt-1">₹{routes.reduce((s, r) => s + r.paid, 0).toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Pending</span>
          <p className="text-red-600 mt-1">₹{routes.reduce((s, r) => s + r.pending, 0).toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Academic Year</span>
          <p className="text-gray-900 mt-1">2024-2025</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Transport Fee Structure</h3>
            <p className="text-sm text-gray-600 mt-1">Manage route-wise transport fees</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Transport Fee Rule
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Route Number</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Pickup Point</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Transport Fee</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Frequency</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Paid</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Pending</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {routes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{route.routeNumber}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{route.pickupPoint}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><span className="text-gray-900">₹{route.transportFee.toLocaleString('en-IN')}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{route.frequency}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><span className="text-green-600">₹{route.paid.toLocaleString('en-IN')}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><span className="text-red-600">₹{route.pending.toLocaleString('en-IN')}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
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
