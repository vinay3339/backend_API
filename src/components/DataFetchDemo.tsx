/**
 * Demo component to fetch and display data from MySQL database
 */
import React, { useState, useEffect } from 'react';
import { 
  fetchAllData, 
  testConnection,
  fetchSchools,
  fetchUsers,
  fetchStudents,
  fetchAcademicYears 
} from '../services/api';
import { Database, Users, GraduationCap, School, Calendar, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export const DataFetchDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'schools' | 'users' | 'students' | 'academic_years'>('all');

  // Test connection on mount
  useEffect(() => {
    handleTestConnection();
  }, []);

  const handleTestConnection = async () => {
    try {
      const result = await testConnection();
      setConnectionStatus(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setConnectionStatus(null);
    }
  };

  const handleFetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAllData();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchSchools = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSchools();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchUsers();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchStudents();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAcademicYears = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAcademicYears();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHandlers: Record<string, () => Promise<void>> = {
    all: handleFetchAll,
    schools: handleFetchSchools,
    users: handleFetchUsers,
    students: handleFetchStudents,
    academic_years: handleFetchAcademicYears,
  };

  const tabs = [
    { id: 'all', label: 'All Data', icon: Database },
    { id: 'schools', label: 'Schools', icon: School },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'academic_years', label: 'Academic Years', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-gray-900 mb-2">MySQL Database Connection</h1>
              <p className="text-gray-600">
                Fetch data from your MySQL database (EduPortal)
              </p>
            </div>
            <button
              onClick={handleTestConnection}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Test Connection
            </button>
          </div>

          {/* Connection Status */}
          {connectionStatus && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">
                  {connectionStatus.message}
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Database: <span className="font-mono">{connectionStatus.database}</span> | 
                  Version: <span className="font-mono">{connectionStatus.version}</span>
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Connection Error</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
                <p className="text-red-600 text-sm mt-2">
                  Make sure the backend server is running: <code className="bg-red-100 px-2 py-1 rounded">python backend/main.py</code>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-1 -mb-px overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setData(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-700 font-medium'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fetch Button */}
          <div className="p-6">
            <button
              onClick={fetchHandlers[activeTab]}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Fetching data...
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  Fetch {tabs.find(t => t.id === activeTab)?.label}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Data Display */}
        {data && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Fetched Data</h2>
              {data.counts && (
                <div className="flex items-center gap-4 text-sm">
                  {Object.entries(data.counts).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-1">
                      <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                      <span className="font-medium text-blue-600">{value as number}</span>
                    </div>
                  ))}
                </div>
              )}
              {data.count !== undefined && (
                <div className="text-sm">
                  <span className="text-gray-600">Total Records:</span>
                  <span className="font-medium text-blue-600 ml-2">{data.count}</span>
                </div>
              )}
            </div>

            {/* JSON Display */}
            <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-[600px]">
              <pre className="text-green-400 text-sm font-mono">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>

            {/* Quick Stats */}
            {activeTab === 'all' && data.data && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <School className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-900 font-medium">Schools</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">
                    {data.data.schools?.length || 0}
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="text-green-900 font-medium">Users</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600">
                    {data.data.users?.length || 0}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-900 font-medium">Students</span>
                  </div>
                  <p className="text-3xl font-bold text-purple-600">
                    {data.data.students?.length || 0}
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span className="text-orange-900 font-medium">Academic Years</span>
                  </div>
                  <p className="text-3xl font-bold text-orange-600">
                    {data.data.academic_years?.length || 0}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
          <h3 className="text-blue-900 font-medium mb-3">📋 How to Use:</h3>
          <ol className="text-blue-800 text-sm space-y-2 list-decimal list-inside">
            <li>Make sure your MySQL server is running</li>
            <li>Start the backend server: <code className="bg-blue-100 px-2 py-1 rounded">cd backend && python main.py</code></li>
            <li>The backend will connect to your MySQL database using credentials from config.py</li>
            <li>Click "Test Connection" to verify the database connection</li>
            <li>Select a tab and click "Fetch" to retrieve data from your database</li>
            <li>The data will be displayed below in JSON format</li>
          </ol>
        </div>

        {/* API Endpoints */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-gray-900 font-medium mb-4">Available API Endpoints:</h3>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">GET</span>
              <span className="text-gray-600">http://localhost:8000/api/v1/data/test-connection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">GET</span>
              <span className="text-gray-600">http://localhost:8000/api/v1/data/all</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">GET</span>
              <span className="text-gray-600">http://localhost:8000/api/v1/data/schools</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">GET</span>
              <span className="text-gray-600">http://localhost:8000/api/v1/data/users</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">GET</span>
              <span className="text-gray-600">http://localhost:8000/api/v1/data/students</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">GET</span>
              <span className="text-gray-600">http://localhost:8000/api/v1/data/academic-years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
