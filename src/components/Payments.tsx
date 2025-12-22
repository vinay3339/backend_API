import React, { useState } from 'react';
import { Plus, Eye, Download, Filter, CreditCard, Smartphone, Banknote, Building2 } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  receiptNumber: string;
  studentName: string;
  class: string;
  section: string;
  categoryPaid: string;
  amount: number;
  paymentMode: 'upi' | 'card' | 'cash' | 'bank-transfer' | 'cheque';
  receivedBy: string;
  status: 'completed' | 'pending' | 'failed';
}

export const Payments: React.FC = () => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    class: 'all',
    section: 'all',
    paymentMode: 'all',
  });

  const [showCollectPaymentModal, setShowCollectPaymentModal] = useState(false);

  const [payments] = useState<Payment[]>([
    {
      id: '1',
      date: '2024-11-25',
      receiptNumber: 'REC-2024-001',
      studentName: 'Divya Rani',
      class: '10',
      section: 'A',
      categoryPaid: 'Tuition Fee - Third Installment',
      amount: 20000,
      paymentMode: 'upi',
      receivedBy: 'Mrs. Administrator',
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-11-25',
      receiptNumber: 'REC-2024-002',
      studentName: 'Aarav Kumar',
      class: '10',
      section: 'A',
      categoryPaid: 'Tuition Fee - Second Installment',
      amount: 20000,
      paymentMode: 'card',
      receivedBy: 'Mrs. Administrator',
      status: 'completed',
    },
    {
      id: '3',
      date: '2024-11-24',
      receiptNumber: 'REC-2024-003',
      studentName: 'Sai Priya',
      class: '10',
      section: 'A',
      categoryPaid: 'Lab Fee',
      amount: 5000,
      paymentMode: 'cash',
      receivedBy: 'Mr. Finance Officer',
      status: 'completed',
    },
    {
      id: '4',
      date: '2024-11-24',
      receiptNumber: 'REC-2024-004',
      studentName: 'Krishna Reddy',
      class: '10',
      section: 'A',
      categoryPaid: 'Tuition Fee - First Installment',
      amount: 20000,
      paymentMode: 'bank-transfer',
      receivedBy: 'Mrs. Administrator',
      status: 'completed',
    },
    {
      id: '5',
      date: '2024-11-23',
      receiptNumber: 'REC-2024-005',
      studentName: 'Anjali Sharma',
      class: '10',
      section: 'A',
      categoryPaid: 'Sports Fee',
      amount: 3000,
      paymentMode: 'upi',
      receivedBy: 'Mr. Finance Officer',
      status: 'completed',
    },
  ]);

  const getPaymentModeIcon = (mode: string) => {
    switch (mode) {
      case 'upi':
        return Smartphone;
      case 'card':
        return CreditCard;
      case 'cash':
        return Banknote;
      case 'bank-transfer':
      case 'cheque':
        return Building2;
      default:
        return CreditCard;
    }
  };

  const getPaymentModeColor = (mode: string) => {
    switch (mode) {
      case 'upi':
        return 'bg-purple-100 text-purple-700';
      case 'card':
        return 'bg-blue-100 text-blue-700';
      case 'cash':
        return 'bg-green-100 text-green-700';
      case 'bank-transfer':
        return 'bg-orange-100 text-orange-700';
      case 'cheque':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentModeLabel = (mode: string) => {
    switch (mode) {
      case 'upi':
        return 'UPI';
      case 'card':
        return 'Card';
      case 'cash':
        return 'Cash';
      case 'bank-transfer':
        return 'Bank Transfer';
      case 'cheque':
        return 'Cheque';
      default:
        return mode;
    }
  };

  const stats = {
    totalPayments: payments.length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    todayPayments: payments.filter(
      (p) => p.date === new Date().toISOString().split('T')[0]
    ).length,
    todayAmount: payments
      .filter((p) => p.date === new Date().toISOString().split('T')[0])
      .reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-gray-900">Filter Payments</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Class</label>
            <select
              value={filters.class}
              onChange={(e) => setFilters({ ...filters, class: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
              <option value="8">Class 8</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Section</label>
            <select
              value={filters.section}
              onChange={(e) => setFilters({ ...filters, section: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Payment Mode</label>
            <select
              value={filters.paymentMode}
              onChange={(e) => setFilters({ ...filters, paymentMode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Modes</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
              <option value="cash">Cash</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Payments</span>
          <p className="text-gray-900 mt-1">{stats.totalPayments}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Total Amount</span>
          <p className="text-green-600 mt-1">₹{stats.totalAmount.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Today's Payments</span>
          <p className="text-blue-600 mt-1">{stats.todayPayments}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <span className="text-sm text-gray-600">Today's Collection</span>
          <p className="text-green-600 mt-1">₹{stats.todayAmount.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Payment Collection</h3>
            <p className="text-sm text-gray-600 mt-1">Track all fee payments and transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setShowCollectPaymentModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Collect Payment
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Receipt No
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Class & Section
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Category Paid
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 uppercase tracking-wider">
                  Payment Mode
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Received By
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => {
                const PaymentIcon = getPaymentModeIcon(payment.paymentMode);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">
                        {new Date(payment.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600">{payment.receiptNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{payment.studentName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">
                        {payment.class} - {payment.section}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{payment.categoryPaid}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-green-600">
                        ₹{payment.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 ${getPaymentModeColor(payment.paymentMode)}`}
                        >
                          <PaymentIcon className="w-3 h-3" />
                          {getPaymentModeLabel(payment.paymentMode)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{payment.receivedBy}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Payment Modal */}
      {showCollectPaymentModal && (
        <CollectPaymentModal onClose={() => setShowCollectPaymentModal(false)} />
      )}
    </div>
  );
};

// Collect Payment Modal
const CollectPaymentModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    student: '',
    academicYear: '2024-2025',
    selectedCategories: [] as string[],
    amount: '',
    paymentMode: 'upi',
    notes: '',
  });

  const feeCategories = [
    { id: '1', name: 'Tuition Fee - Third Installment', amount: 20000, pending: 20000 },
    { id: '2', name: 'Lab Fee', amount: 5000, pending: 5000 },
    { id: '3', name: 'Library Fee', amount: 2000, pending: 2000 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Collecting payment:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">Collect Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Plus className="w-5 h-5 rotate-45" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Student <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.student}
                  onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Student</option>
                  <option value="1001">Aarav Kumar - RA-2024-1001</option>
                  <option value="1002">Sai Priya - RA-2024-1002</option>
                  <option value="1004">Divya Rani - RA-2024-1004</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Academic Year</label>
                <select
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-3">
                Fee Categories <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {feeCategories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.selectedCategories.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              selectedCategories: [...formData.selectedCategories, category.id],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              selectedCategories: formData.selectedCategories.filter(
                                (c) => c !== category.id
                              ),
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <div>
                        <p className="text-sm text-gray-900">{category.name}</p>
                        <p className="text-xs text-gray-600">
                          Pending: ₹{category.pending.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-900">
                      ₹{category.amount.toLocaleString('en-IN')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Amount to Pay (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="20000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Payment Mode</label>
                <select
                  value={formData.paymentMode}
                  onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Add any notes about this payment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
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
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
