import { useState } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { LandingPage } from './components/LandingPage';
import { SchoolSearchModal } from './components/SchoolSearchModal';
import { SchoolLoginPage } from './components/SchoolLoginPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ChangePasswordPage } from './components/ChangePasswordPage';
import { ApplicationManagerLogin } from './components/ApplicationManagerLogin';
import { ApplicationManagerForgotPassword } from './components/ApplicationManagerForgotPassword';
import { Dashboard } from './components/Dashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import type { School } from './components/SchoolSearchModal';

type AppState = 'landing' | 'login' | 'forgot-password' | 'change-password' | 'dashboard' | 'admin-login' | 'admin-forgot-password' | 'admin-dashboard';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string>('');

  const handleSchoolsClick = () => {
    setIsSearchModalOpen(true);
  };

  const handleApplicationManagerClick = () => {
    setAppState('admin-login');
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    setIsSearchModalOpen(false);
    setAppState('login');
  };

  const handleLogin = (isFirstTimeLogin: boolean, username: string) => {
    setCurrentUsername(username);
    // First-time users go to change password, returning users go to dashboard
    if (isFirstTimeLogin) {
      setAppState('change-password');
    } else {
      setAppState('dashboard');
    }
  };

  const handleForgotPassword = () => {
    setAppState('forgot-password');
  };

  const handleBackToLogin = () => {
    setAppState('login');
  };

  const handlePasswordChanged = () => {
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setAppState('landing');
    setSelectedSchool(null);
  };

  const handleAdminLogin = () => {
    setAppState('admin-dashboard');
  };

  const handleAdminForgotPassword = () => {
    setAppState('admin-forgot-password');
  };

  const handleBackToAdminLogin = () => {
    setAppState('admin-login');
  };

  // Get display name based on username
  const getDisplayName = (username: string): string => {
    const userMap: Record<string, string> = {
      'student': 'John Doe',
      'student2': 'Sarah Smith',
      'teacher': 'Mr. Anderson',
      'teacher2': 'Ms. Wilson',
      'admin': 'Dr. Principal',
      'admin2': 'Mrs. Administrator',
    };
    return userMap[username.toLowerCase()] || 'User';
  };

  // Get user role based on username
  const getUserRole = (username: string): string => {
    const lowerUsername = username.toLowerCase();
    if (lowerUsername.includes('admin')) return 'School Admin';
    if (lowerUsername.includes('teacher')) return 'Teacher';
    if (lowerUsername.includes('student')) return 'Student';
    return 'User';
  };

  // Dashboard with full layout
  if (appState === 'dashboard' && selectedSchool) {
    return (
      <Dashboard
        schoolName={selectedSchool.name}
        userName={getDisplayName(currentUsername)}
        userRole={getUserRole(currentUsername)}
        onLogout={() => {
          setAppState('landing');
          setSelectedSchool(null);
          setCurrentUsername('');
        }}
      />
    );
  }

  // Admin Dashboard placeholder
  if (appState === 'admin-dashboard') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg bg-[#2563EB]">
            <span className="text-white text-2xl">🛡️</span>
          </div>
          <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-8">Super administrator panel would appear here</p>
          <button
            onClick={() => setAppState('landing')}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Return to Landing Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      
      {appState === 'landing' && (
        <>
          <LandingPage
            onSchoolsClick={handleSchoolsClick}
            onApplicationManagerClick={handleApplicationManagerClick}
          />
          <SchoolSearchModal
            open={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            onSelectSchool={handleSelectSchool}
          />
        </>
      )}

      {appState === 'login' && selectedSchool && (
        <SchoolLoginPage
          school={selectedSchool}
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
        />
      )}

      {appState === 'forgot-password' && selectedSchool && (
        <ForgotPasswordPage
          school={selectedSchool}
          onBackToLogin={handleBackToLogin}
        />
      )}

      {appState === 'change-password' && selectedSchool && (
        <ChangePasswordPage
          school={selectedSchool}
          onPasswordChanged={handlePasswordChanged}
          onLogout={handleLogout}
        />
      )}

      {appState === 'admin-login' && (
        <ApplicationManagerLogin
          onLogin={handleAdminLogin}
          onForgotPassword={handleAdminForgotPassword}
        />
      )}

      {appState === 'admin-forgot-password' && (
        <ApplicationManagerForgotPassword
          onBackToLogin={handleBackToAdminLogin}
        />
      )}
    </>
  );
}