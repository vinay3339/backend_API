import { useState } from 'react';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { School } from './SchoolSearchModal';

interface SchoolLoginPageProps {
  school: School;
  onLogin: (isFirstTimeLogin: boolean, username: string) => void;
  onForgotPassword: () => void;
}

export function SchoolLoginPage({ school, onLogin, onForgotPassword }: SchoolLoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine if this is a first-time login
    // First-time users: student, teacher, admin (require password change)
    // Returning users: student2, teacher2, admin2 (go directly to dashboard)
    const firstTimeUsers = ['student', 'teacher', 'admin'];
    const isFirstTimeLogin = firstTimeUsers.includes(username.toLowerCase());
    
    onLogin(isFirstTimeLogin, username);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header with school branding */}
      <div 
        className="w-full py-4 px-4 shadow-sm"
        style={{ backgroundColor: school.color }}
      >
        <div className="max-w-md mx-auto text-center">
          <div className="text-white text-sm">School Portal</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            {/* School Logo and Name */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-md"
                style={{ backgroundColor: school.color }}
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-gray-900 mb-1">{school.name}</h2>
              <p className="text-gray-500">Login to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-xl border-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm hover:underline transition-all"
                    style={{ color: school.color }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-2 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: school.color }}
              >
                Login
              </Button>
            </form>

            {/* Mobile Demo Credentials */}
            <div className="sm:hidden mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-3">
                <strong className="text-gray-900">Demo Credentials:</strong>
              </p>
              
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-700 mb-2">
                    <strong>First Time</strong> (→ Change Password)
                  </p>
                  <p className="text-xs text-gray-600 font-mono">
                    student / demo123<br />
                    teacher / demo123<br />
                    admin / demo123
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-700 mb-2">
                    <strong>Returning User</strong> (→ Dashboard)
                  </p>
                  <p className="text-xs text-gray-600 font-mono">
                    student2 / demo123<br />
                    teacher2 / demo123<br />
                    admin2 / demo123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Credentials Notice (Remove in production) */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs hidden sm:block border-2 border-gray-200">
        <p className="text-xs text-gray-600 mb-3">
          <strong className="text-gray-900">Demo Credentials:</strong>
        </p>
        
        <div className="space-y-3">
          {/* First Time Login */}
          <div className="pb-3 border-b border-gray-200">
            <p className="text-xs text-blue-700 mb-1.5">
              <strong>First Time Login</strong>
              <span className="text-gray-500"> (→ Change Password)</span>
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Student:</p>
                <p className="text-xs text-gray-500 font-mono">
                  student / demo123
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Teacher:</p>
                <p className="text-xs text-gray-500 font-mono">
                  teacher / demo123
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">School Admin:</p>
                <p className="text-xs text-gray-500 font-mono">
                  admin / demo123
                </p>
              </div>
            </div>
          </div>
          
          {/* Returning User Login */}
          <div>
            <p className="text-xs text-green-700 mb-1.5">
              <strong>Returning User</strong>
              <span className="text-gray-500"> (→ Dashboard)</span>
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Student:</p>
                <p className="text-xs text-gray-500 font-mono">
                  student2 / demo123
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Teacher:</p>
                <p className="text-xs text-gray-500 font-mono">
                  teacher2 / demo123
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">School Admin:</p>
                <p className="text-xs text-gray-500 font-mono">
                  admin2 / demo123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
