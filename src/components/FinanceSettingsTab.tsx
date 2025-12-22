import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';

export const FinanceSettingsTab: React.FC = () => {
  const [general, setGeneral] = useState({ currency: 'INR', partialPayment: true, lateFee: true, lateFeeType: 'Percentage', lateFeeValue: '2', tax: '0' });
  const [invoice, setInvoice] = useState({ prefix: 'INV', autoGenerate: true, footer: 'Thank you for your payment.' });
  const [receipt, setReceipt] = useState({ prefix: 'RCP', notes: 'Payment received with thanks.', autoNumber: true });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">General Finance Rules</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Currency</label>
            <select value={general.currency} onChange={(e) => setGeneral({ ...general, currency: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Late Fee Type</label>
            <select value={general.lateFeeType} onChange={(e) => setGeneral({ ...general, lateFeeType: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Flat">Flat Amount</option>
              <option value="Percentage">Percentage</option>
              <option value="Per-day">Per-day</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Late Fee Value</label>
            <input type="text" value={general.lateFeeValue} onChange={(e) => setGeneral({ ...general, lateFeeValue: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Default Tax %</label>
            <input type="number" value={general.tax} onChange={(e) => setGeneral({ ...general, tax: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={general.partialPayment} onChange={(e) => setGeneral({ ...general, partialPayment: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Allow Partial Payment</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={general.lateFee} onChange={(e) => setGeneral({ ...general, lateFee: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Enable Late Fee</span></label>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Invoice Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Invoice Prefix</label>
            <input type="text" value={invoice.prefix} onChange={(e) => setInvoice({ ...invoice, prefix: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Signature Upload</label>
            <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Signature
            </button>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Invoice Footer</label>
            <textarea value={invoice.footer} onChange={(e) => setInvoice({ ...invoice, footer: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2"><input type="checkbox" checked={invoice.autoGenerate} onChange={(e) => setInvoice({ ...invoice, autoGenerate: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Auto Generate Invoice Numbers</span></label>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Receipt Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Receipt Prefix</label>
            <input type="text" value={receipt.prefix} onChange={(e) => setReceipt({ ...receipt, prefix: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Custom Notes</label>
            <input type="text" value={receipt.notes} onChange={(e) => setReceipt({ ...receipt, notes: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2"><input type="checkbox" checked={receipt.autoNumber} onChange={(e) => setReceipt({ ...receipt, autoNumber: e.target.checked })} className="w-4 h-4 text-blue-600 rounded" /><span className="text-sm text-gray-700">Auto Numbering</span></label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Finance Settings
        </button>
      </div>
    </div>
  );
};
