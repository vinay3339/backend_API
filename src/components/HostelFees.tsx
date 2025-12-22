import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const HostelFees: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Hostel Students</span>
          <p className="text-gray-900 mt-1">45</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Hostel Fee Collected</span>
          <p className="text-green-600 mt-1">₹22,50,000</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Mess Fee Collected</span>
          <p className="text-green-600 mt-1">₹6,75,000</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Pending</span>
          <p className="text-red-600 mt-1">₹1,25,000</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Hostel Fee Structure</h3>
            <p className="text-sm text-gray-600 mt-1">Manage hostel, mess, and other residential fees</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Hostel Fee Rule
          </button>
        </div>

        <div className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-600">Hostel fee management interface would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};
