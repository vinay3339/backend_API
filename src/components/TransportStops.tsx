import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const TransportStops: React.FC = () => {
  const stops = [
    { id: '1', stopName: 'Vijayawada Central Bus Stand', landmark: 'Near Railway Station', route: 'R-14', pickupTime: '07:00 AM', dropTime: '04:30 PM', stopOrder: 1 },
    { id: '2', stopName: 'Benz Circle', landmark: 'Main Circle', route: 'R-14', pickupTime: '07:15 AM', dropTime: '04:15 PM', stopOrder: 2 },
    { id: '3', stopName: 'Guntur Road Junction', landmark: 'Highway Junction', route: 'R-22', pickupTime: '07:15 AM', dropTime: '04:45 PM', stopOrder: 1 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Stops</span>
          <p className="text-gray-900 mt-1">{stops.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Routes Covered</span>
          <p className="text-blue-600 mt-1">3</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Avg Stops/Route</span>
          <p className="text-purple-600 mt-1">5</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Students Assigned</span>
          <p className="text-green-600 mt-1">125</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">All Stops</h3>
            <p className="text-sm text-gray-600 mt-1">Manage pickup and drop points</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Stop
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Stop Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Landmark</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Pickup Time</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Drop Time</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Order</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stops.map((stop) => (
                <tr key={stop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><span className="text-gray-900">{stop.stopName}</span></td>
                  <td className="px-6 py-4"><span className="text-gray-600">{stop.landmark}</span></td>
                  <td className="px-6 py-4 text-center"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{stop.route}</span></td>
                  <td className="px-6 py-4 text-center"><span className="text-gray-900">{stop.pickupTime}</span></td>
                  <td className="px-6 py-4 text-center"><span className="text-gray-900">{stop.dropTime}</span></td>
                  <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{stop.stopOrder}</span></td>
                  <td className="px-6 py-4 text-right">
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
