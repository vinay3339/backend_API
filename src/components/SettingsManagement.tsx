import React, { useState } from 'react';
import { Building2, GraduationCap, Users, Shield, Sliders, MessageSquare, DollarSign, Bus, Plug, Settings as SettingsIcon, History } from 'lucide-react';
import { SchoolProfileTab } from './SchoolProfileTab';
import { AcademicSettingsTab } from './AcademicSettingsTab';
import { UserManagementTab } from './UserManagementTab';
import { RolesPermissionsTab } from './RolesPermissionsTab';
import { CustomFieldsTab } from './CustomFieldsTab';
import { CommunicationSettingsTab } from './CommunicationSettingsTab';
import { FinanceSettingsTab } from './FinanceSettingsTab';
import { TransportSettingsTab } from './TransportSettingsTab';
import { IntegrationsTab } from './IntegrationsTab';
import { SystemSettingsTab } from './SystemSettingsTab';
import { SettingsAuditLog } from './SettingsAuditLog';

export const SettingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('school-profile');

  const tabs = [
    { id: 'school-profile', label: 'School Profile', icon: Building2 },
    { id: 'academic-settings', label: 'Academic Settings', icon: GraduationCap },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'roles-permissions', label: 'Roles & Permissions', icon: Shield },
    { id: 'custom-fields', label: 'Custom Fields', icon: Sliders },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'finance-settings', label: 'Finance Settings', icon: DollarSign },
    { id: 'transport-settings', label: 'Transport Settings', icon: Bus },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'system-settings', label: 'System Settings', icon: SettingsIcon },
    { id: 'audit-log', label: 'Audit Log', icon: History },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'school-profile':
        return <SchoolProfileTab />;
      case 'academic-settings':
        return <AcademicSettingsTab />;
      case 'user-management':
        return <UserManagementTab />;
      case 'roles-permissions':
        return <RolesPermissionsTab />;
      case 'custom-fields':
        return <CustomFieldsTab />;
      case 'communication':
        return <CommunicationSettingsTab />;
      case 'finance-settings':
        return <FinanceSettingsTab />;
      case 'transport-settings':
        return <TransportSettingsTab />;
      case 'integrations':
        return <IntegrationsTab />;
      case 'system-settings':
        return <SystemSettingsTab />;
      case 'audit-log':
        return <SettingsAuditLog />;
      default:
        return <SchoolProfileTab />;
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900">Settings</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage school configuration and system preferences</p>
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
