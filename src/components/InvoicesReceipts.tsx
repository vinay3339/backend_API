import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';

export const InvoicesReceipts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('invoices');

  const invoices = [
    { id: '1', invoiceNumber: 'INV-2024-001', studentName: 'Aarav Kumar', class: '10', section: 'A', amountDue: 20000, dueDate: '2024-12-31', status: 'pending' },
    { id: '2', invoiceNumber: 'INV-2024-002', studentName: 'Sai Priya', class: '10', section: 'A', amountDue: 20000, dueDate: '2024-09-30', status: 'overdue' },
  ];

  const receipts = [
    { id: '1', receiptNumber: 'REC-2024-001', date: '2024-11-25', studentName: 'Divya Rani', amountPaid: 20000, paymentMode: 'UPI', categoriesPaid: 'Tuition Fee - Third Installment' },
    { id: '2', receiptNumber: 'REC-2024-002', date: '2024-11-25', studentName: 'Aarav Kumar', amountPaid: 20000, paymentMode: 'Card', categoriesPaid: 'Tuition Fee - Second Installment' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex gap-1 p-1 border-b border-gray-200">
          <button onClick={() => setActiveTab('invoices')} className={`flex-1 px-4 py-2.5 rounded-lg transition-all ${activeTab === 'invoices' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>Invoices</button>
          <button onClick={() => setActiveTab('receipts')} className={`flex-1 px-4 py-2.5 rounded-lg transition-all ${activeTab === 'receipts' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>Receipts</button>
        </div>

        {activeTab === 'invoices' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Invoice Number</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Class & Section</th>
                  <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Amount Due</th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4"><span className="text-blue-600">{invoice.invoiceNumber}</span></td>
                    <td className="px-6 py-4"><span className="text-gray-900">{invoice.studentName}</span></td>
                    <td className="px-6 py-4"><span className="text-gray-900">{invoice.class} - {invoice.section}</span></td>
                    <td className="px-6 py-4 text-right"><span className="text-gray-900">₹{invoice.amountDue.toLocaleString('en-IN')}</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-gray-900">{new Date(invoice.dueDate).toLocaleDateString('en-IN')}</span></td>
                    <td className="px-6 py-4"><div className="flex justify-center"><span className={`px-2.5 py-1 rounded-full text-xs ${invoice.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{invoice.status === 'overdue' ? 'Overdue' : 'Pending'}</span></div></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"><Download className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'receipts' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Receipt Number</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Amount Paid</th>
                  <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase">Payment Mode</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Categories Paid</th>
                  <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4"><span className="text-blue-600">{receipt.receiptNumber}</span></td>
                    <td className="px-6 py-4"><span className="text-gray-900">{new Date(receipt.date).toLocaleDateString('en-IN')}</span></td>
                    <td className="px-6 py-4"><span className="text-gray-900">{receipt.studentName}</span></td>
                    <td className="px-6 py-4 text-right"><span className="text-green-600">₹{receipt.amountPaid.toLocaleString('en-IN')}</span></td>
                    <td className="px-6 py-4 text-center"><span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">{receipt.paymentMode}</span></td>
                    <td className="px-6 py-4"><span className="text-gray-900">{receipt.categoriesPaid}</span></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"><Download className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
