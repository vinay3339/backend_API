import React from 'react';
import { Plus, Edit2 } from 'lucide-react';

export const TransportFeesTab: React.FC = () => {
  const fees = [
    { id: '1', student: 'Aarav Kumar', class: '10', route: 'R-14', monthlyFee: 3000, yearlyFee: 36000, paid: 18000, pending: 18000, dueDate: '2024-12-31', lastPayment: '2024-06-15' },
    { id: '2', student: 'Sai Priya', class: '10', route: 'R-22', monthlyFee: 2500, yearlyFee: 30000, paid: 15000, pending: 15000, dueDate: '2024-12-31', lastPayment: '2024-06-15' },
    { id: '3', student: 'Divya Rani', class: '10', route: 'R-08', monthlyFee: 2000, yearlyFee: 24000, paid: 24000, pending: 0, dueDate: '2024-12-31', lastPayment: '2024-11-15' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Collection</span>
          <p className="text-green-600 mt-1">₹{fees.reduce((s, f) => s + f.paid, 0).toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Pending</span>
          <p className="text-red-600 mt-1">₹{fees.reduce((s, f) => s + f.pending, 0).toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Fully Paid</span>
          <p className="text-blue-600 mt-1">{fees.filter(f => f.pending === 0).length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Partial Payment</span>
          <p className="text-orange-600 mt-1">{fees.filter(f => f.pending > 0 && f.paid > 0).length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Transport Fees</h3>
            <p className="text-sm text-gray-600 mt-1">Manage transport fee collection</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Update Fee Rules
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Class</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Monthly Fee</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Yearly Fee</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Paid</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Pending</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Last Payment</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-gray-900">{fee.student}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="text-gray-900">{fee.class}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{fee.route}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><span className="text-gray-900">₹{fee.monthlyFee.toLocaleString('en-IN')}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><span className="text-gray-900">₹{fee.yearlyFee.toLocaleString('en-IN')}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><span className="text-green-600">₹{fee.paid.toLocaleString('en-IN')}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><span className="text-red-600">₹{fee.pending.toLocaleString('en-IN')}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="text-gray-900">{new Date(fee.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center"><span className="text-gray-900">{new Date(fee.lastPayment).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"><Edit2 className="w-4 h-4" /></button>
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
