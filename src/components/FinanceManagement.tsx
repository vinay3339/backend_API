import React, { useState } from 'react';
import { Plus, Download, Upload, DollarSign, FileText, Users, CreditCard, TrendingUp, History } from 'lucide-react';
import { FeeStructure } from './FeeStructure';
import { StudentFees } from './StudentFees';
import { Payments } from './Payments';
import { Concessions } from './Concessions';
import { TransportFees } from './TransportFees';
import { HostelFees } from './HostelFees';
import { InvoicesReceipts } from './InvoicesReceipts';
import { FinanceReports } from './FinanceReports';
import { FinanceAuditLog } from './FinanceAuditLog';

export const FinanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fee-structure');

  const tabs = [
    { id: 'fee-structure', label: 'Fee Structure', icon: FileText },
    { id: 'student-fees', label: 'Student Fees', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'concessions', label: 'Concessions', icon: TrendingUp },
    { id: 'transport-fees', label: 'Transport Fees', icon: DollarSign },
    { id: 'hostel-fees', label: 'Hostel Fees', icon: DollarSign },
    { id: 'invoices-receipts', label: 'Invoices & Receipts', icon: FileText },
    { id: 'finance-reports', label: 'Finance Reports', icon: TrendingUp },
    { id: 'audit-log', label: 'Audit Log', icon: History },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'fee-structure':
        return <FeeStructure />;
      case 'student-fees':
        return <StudentFees />;
      case 'payments':
        return <Payments />;
      case 'concessions':
        return <Concessions />;
      case 'transport-fees':
        return <TransportFees />;
      case 'hostel-fees':
        return <HostelFees />;
      case 'invoices-receipts':
        return <InvoicesReceipts />;
      case 'finance-reports':
        return <FinanceReports />;
      case 'audit-log':
        return <FinanceAuditLog />;
      default:
        return <FeeStructure />;
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900">Finance</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900 mb-2">Finance Management</h1>
          <p className="text-gray-600">Manage fees, payments, and financial operations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Collect Payment
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-x-auto">
        <div className="flex gap-1 p-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};
