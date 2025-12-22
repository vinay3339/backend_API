import React, { useState } from 'react';
import { Plus, Download, Bus, Users, MapPin, DollarSign, Calendar, History } from 'lucide-react';
import { TransportRoutes } from './TransportRoutes';
import { TransportVehicles } from './TransportVehicles';
import { TransportDrivers } from './TransportDrivers';
import { TransportStops } from './TransportStops';
import { TransportStudentAssignment } from './TransportStudentAssignment';
import { TransportFeesTab } from './TransportFeesTab';
import { TransportAttendance } from './TransportAttendance';
import { TransportAuditLog } from './TransportAuditLog';

export const TransportManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('routes');

  const tabs = [
    { id: 'routes', label: 'Routes', icon: MapPin },
    { id: 'vehicles', label: 'Vehicles', icon: Bus },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'stops', label: 'Stops', icon: MapPin },
    { id: 'student-assignment', label: 'Student Assignment', icon: Users },
    { id: 'transport-fees', label: 'Transport Fees', icon: DollarSign },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'audit-log', label: 'Audit Log', icon: History },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'routes':
        return <TransportRoutes />;
      case 'vehicles':
        return <TransportVehicles />;
      case 'drivers':
        return <TransportDrivers />;
      case 'stops':
        return <TransportStops />;
      case 'student-assignment':
        return <TransportStudentAssignment />;
      case 'transport-fees':
        return <TransportFeesTab />;
      case 'attendance':
        return <TransportAttendance />;
      case 'audit-log':
        return <TransportAuditLog />;
      default:
        return <TransportRoutes />;
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-gray-900">Transport</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900 mb-2">Transport Management</h1>
          <p className="text-gray-600">Manage routes, vehicles, drivers, and student transportation</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Route
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
