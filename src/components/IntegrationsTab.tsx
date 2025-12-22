import React from 'react';
import { CreditCard, MessageSquare, Mail, MapPin, Shield, CheckCircle, XCircle } from 'lucide-react';

export const IntegrationsTab: React.FC = () => {
  const integrations = [
    { id: '1', name: 'Razorpay', description: 'Payment Gateway', icon: CreditCard, status: 'connected', color: 'blue' },
    { id: '2', name: 'MSG91', description: 'SMS Gateway', icon: MessageSquare, status: 'connected', color: 'green' },
    { id: '3', name: 'SMTP Email', description: 'Email Service', icon: Mail, status: 'connected', color: 'purple' },
    { id: '4', name: 'GPS Tracking', description: 'Vehicle Tracking', icon: MapPin, status: 'not-connected', color: 'orange' },
    { id: '5', name: 'Google OAuth', description: 'Single Sign-On', icon: Shield, status: 'not-connected', color: 'red' },
    { id: '6', name: 'Paytm', description: 'Payment Gateway', icon: CreditCard, status: 'not-connected', color: 'blue' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => {
        const Icon = integration.icon;
        const isConnected = integration.status === 'connected';
        return (
          <div key={integration.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-${integration.color}-100 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${integration.color}-600`} />
              </div>
              {isConnected ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <h3 className="text-gray-900 mb-1">{integration.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full text-xs ${isConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {isConnected ? 'Connected' : 'Not Connected'}
              </span>
              <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                {isConnected ? 'Configure' : 'Connect'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
