import { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, ChevronRight, Moon, Sun, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface ApplicationManagerLoginProps {
  onLogin: () => void;
  onForgotPassword: () => void;
}

export function ApplicationManagerLogin({ onLogin, onForgotPassword }: ApplicationManagerLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation (in real app, this would be server-side)
      if (email === 'admin@example.com' && password === 'admin123') {
        onLogin();
      } else {
        setError('Invalid credentials.');
      }
    }, 1500);
  };

  const bgClass = isDarkMode 
    ? 'bg-[#1F2937]' 
    : 'bg-gradient-to-br from-blue-50 via-gray-50 to-slate-100';
  
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const subtextClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const cardClass = isDarkMode 
    ? 'bg-[#374151] border border-gray-600' 
    : 'bg-white';
  
  return (
    <div className={`min-h-screen flex flex-col ${bgClass} transition-colors duration-300`}>
      {/* Header with Logo and Theme Toggle */}
      <div className={`w-full ${isDarkMode ? 'bg-[#1E3A8A]' : 'bg-[#1E3A8A]'} py-4 px-4 sm:px-6`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#1E3A8A]" />
            </div>
            <span className="text-white">SchoolHub</span>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className={`w-full ${isDarkMode ? 'bg-[#374151]' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} px-4 py-3`}>
        <div className="max-w-6xl mx-auto">
          <div className={`flex items-center gap-2 text-sm ${subtextClass}`}>
            <span>Landing</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2563EB]">Application Manager</span>
            <ChevronRight className="w-4 h-4" />
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Admin Dashboard</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className={`${cardClass} rounded-2xl shadow-xl p-8 sm:p-10 transition-colors duration-300`}>
            {/* Header with Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2563EB]/10 rounded-xl mb-4">
                <ShieldCheck className="w-7 h-7 text-[#2563EB]" />
              </div>
              <h1 className={`${textClass} mb-2`}>Application Manager Login</h1>
              <p className={subtextClass}>
                Sign in to manage schools and administrators.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email/Username */}
              <div className="space-y-2">
                <Label htmlFor="email" className={isDarkMode ? 'text-gray-200' : ''}>
                  Email or Username
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`h-12 rounded-xl border-2 ${
                    isDarkMode 
                      ? 'bg-[#1F2937] border-gray-600 text-white placeholder:text-gray-400' 
                      : 'border-[#E5E7EB]'
                  } ${error ? 'border-red-500' : ''}`}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className={isDarkMode ? 'text-gray-200' : ''}>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className={`h-12 rounded-xl border-2 pr-12 ${
                      isDarkMode 
                        ? 'bg-[#1F2937] border-gray-600 text-white placeholder:text-gray-400' 
                        : 'border-[#E5E7EB]'
                    } ${error ? 'border-red-500' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-600 pt-1">{error}</p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className={isDarkMode ? 'border-gray-600' : ''}
                />
                <label
                  htmlFor="remember"
                  className={`text-sm ${subtextClass} cursor-pointer`}
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 bg-[#2563EB] hover:bg-[#1d4ed8]"
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </Button>

              {/* Forgot Password Link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-[#2563EB] hover:underline transition-all"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className={`text-sm ${subtextClass}`}>
              © 2025 SchoolHub — <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>For Super Administrators Only</span>
            </p>
          </div>
        </div>
      </div>

      {/* Demo Credentials Notice (Remove in production) */}
      <div className={`fixed bottom-4 right-4 ${isDarkMode ? 'bg-[#374151]' : 'bg-white'} rounded-lg shadow-lg p-4 max-w-xs hidden sm:block`}>
        <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
          <strong className={textClass}>Demo Credentials:</strong>
        </p>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-mono`}>
          Email: admin@example.com<br />
          Password: admin123
        </p>
      </div>
    </div>
  );
}
