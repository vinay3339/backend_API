import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, X, MapPin, Clock, Users as UsersIcon } from 'lucide-react';

interface Route {
  id: string;
  routeName: string;
  routeCode: string;
  startLocation: string;
  endLocation: string;
  vehicleAssigned: string;
  driverAssigned: string;
  pickupTime: string;
  dropTime: string;
  totalStudents: number;
  status: 'active' | 'inactive';
}

export const TransportRoutes: React.FC = () => {
  const [routes] = useState<Route[]>([
    {
      id: '1',
      routeName: 'Vijayawada Central Route',
      routeCode: 'R-14',
      startLocation: 'Vijayawada Central',
      endLocation: 'Riverside Academy',
      vehicleAssigned: 'AP 16 AX 1234',
      driverAssigned: 'Ramesh Kumar',
      pickupTime: '07:00 AM',
      dropTime: '04:30 PM',
      totalStudents: 45,
      status: 'active',
    },
    {
      id: '2',
      routeName: 'Guntur Road Route',
      routeCode: 'R-22',
      startLocation: 'Guntur Road Junction',
      endLocation: 'Riverside Academy',
      vehicleAssigned: 'AP 16 BX 5678',
      driverAssigned: 'Suresh Reddy',
      pickupTime: '07:15 AM',
      dropTime: '04:45 PM',
      totalStudents: 38,
      status: 'active',
    },
    {
      id: '3',
      routeName: 'Benz Circle Route',
      routeCode: 'R-08',
      startLocation: 'Benz Circle',
      endLocation: 'Riverside Academy',
      vehicleAssigned: 'AP 16 CX 9012',
      driverAssigned: 'Venkat Rao',
      pickupTime: '07:30 AM',
      dropTime: '05:00 PM',
      totalStudents: 42,
      status: 'active',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Routes</span>
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-gray-900">{routes.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Routes</span>
            <MapPin className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-green-600">{routes.filter((r) => r.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Students</span>
            <UsersIcon className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-gray-900">{routes.reduce((sum, r) => sum + r.totalStudents, 0)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Students/Route</span>
            <UsersIcon className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-gray-900">
            {Math.round(routes.reduce((sum, r) => sum + r.totalStudents, 0) / routes.length)}
          </p>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">All Routes</h3>
            <p className="text-sm text-gray-600 mt-1">Manage transportation routes and schedules</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Route
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Start Location
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  End Location
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Timing
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {routes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-gray-900">{route.routeName}</span>
                      <p className="text-sm text-gray-600 mt-0.5">{route.routeCode}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{route.startLocation}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{route.endLocation}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600">{route.vehicleAssigned}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900">{route.driverAssigned}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col items-center text-sm">
                      <span className="text-gray-900">{route.pickupTime}</span>
                      <span className="text-gray-500">{route.dropTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {route.totalStudents}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs ${
                          route.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {route.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
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

      {/* Add Route Modal */}
      {showAddModal && <AddRouteModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

// Add Route Modal
const AddRouteModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    routeName: '',
    routeCode: '',
    startPoint: '',
    endPoint: '',
    distance: '',
    estimatedTime: '',
    vehicleAssigned: '',
    driverAssigned: '',
    conductorAssigned: '',
    maxCapacity: '',
    status: 'active',
    morningPickupStart: '',
    morningArrival: '',
    eveningDropStart: '',
    eveningDropEnd: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding route:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">Add New Route</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Route Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.routeName}
                    onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
                    placeholder="Vijayawada Central Route"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Route Code</label>
                  <input
                    type="text"
                    value={formData.routeCode}
                    onChange={(e) => setFormData({ ...formData, routeCode: e.target.value })}
                    placeholder="R-14"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Start Point</label>
                  <input
                    type="text"
                    value={formData.startPoint}
                    onChange={(e) => setFormData({ ...formData, startPoint: e.target.value })}
                    placeholder="Vijayawada Central"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">End Point</label>
                  <input
                    type="text"
                    value={formData.endPoint}
                    onChange={(e) => setFormData({ ...formData, endPoint: e.target.value })}
                    placeholder="Riverside Academy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Distance (km)</label>
                  <input
                    type="number"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    placeholder="15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Estimated Time (mins)</label>
                  <input
                    type="number"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                    placeholder="45"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div>
              <h3 className="text-gray-900 mb-4">Assignment</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Vehicle Assigned</label>
                  <select
                    value={formData.vehicleAssigned}
                    onChange={(e) => setFormData({ ...formData, vehicleAssigned: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Vehicle</option>
                    <option value="AP 16 AX 1234">AP 16 AX 1234</option>
                    <option value="AP 16 BX 5678">AP 16 BX 5678</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Driver Assigned</label>
                  <select
                    value={formData.driverAssigned}
                    onChange={(e) => setFormData({ ...formData, driverAssigned: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Driver</option>
                    <option value="Ramesh Kumar">Ramesh Kumar</option>
                    <option value="Suresh Reddy">Suresh Reddy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Conductor (Optional)</label>
                  <input
                    type="text"
                    value={formData.conductorAssigned}
                    onChange={(e) => setFormData({ ...formData, conductorAssigned: e.target.value })}
                    placeholder="Conductor Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Max Capacity</label>
                  <input
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                    placeholder="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Timings */}
            <div>
              <h3 className="text-gray-900 mb-4">Pickup & Drop Timings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Morning Pickup Start</label>
                  <input
                    type="time"
                    value={formData.morningPickupStart}
                    onChange={(e) => setFormData({ ...formData, morningPickupStart: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Morning Arrival</label>
                  <input
                    type="time"
                    value={formData.morningArrival}
                    onChange={(e) => setFormData({ ...formData, morningArrival: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Evening Drop Start</label>
                  <input
                    type="time"
                    value={formData.eveningDropStart}
                    onChange={(e) => setFormData({ ...formData, eveningDropStart: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Evening Drop End</label>
                  <input
                    type="time"
                    value={formData.eveningDropEnd}
                    onChange={(e) => setFormData({ ...formData, eveningDropEnd: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.status === 'active'}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.checked ? 'active' : 'inactive' })
                  }
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active Route</span>
              </label>
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
              Add Route
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
