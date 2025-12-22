import { useState } from 'react';
import { ArrowLeft, ShieldCheck, Mail, CheckCircle, ChevronRight, Moon, Sun, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ApplicationManagerForgotPasswordProps {
  onBackToLogin: () => void;
}

export function ApplicationManagerForgotPassword({ onBackToLogin }: ApplicationManagerForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset email
    setIsSubmitted(true);
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
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Reset Password</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <div className={`${cardClass} rounded-2xl shadow-xl p-8 sm:p-10 transition-colors duration-300`}>
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2563EB]/10 rounded-xl mb-4">
                    <ShieldCheck className="w-7 h-7 text-[#2563EB]" />
                  </div>
                  <h1 className={`${textClass} mb-2`}>Forgot Password?</h1>
                  <p className={subtextClass}>
                    Enter your email address and we'll send you instructions to reset your password
                  </p>
                </div>

                {/* Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className={isDarkMode ? 'text-gray-200' : ''}>
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-400'
                      }`} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`h-12 rounded-xl border-2 pl-10 ${
                          isDarkMode 
                            ? 'bg-[#1F2937] border-gray-600 text-white placeholder:text-gray-400' 
                            : 'border-[#E5E7EB]'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-white shadow-md hover:shadow-lg transition-all bg-[#2563EB] hover:bg-[#1d4ed8]"
                  >
                    Send Reset Instructions
                  </Button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <button
                    onClick={onBackToLogin}
                    className={`inline-flex items-center gap-2 ${subtextClass} hover:${textClass} transition-colors`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                    isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
                  }`}>
                    <CheckCircle className={`w-7 h-7 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <h2 className={`${textClass} mb-2`}>Check Your Email</h2>
                  <p className={`${subtextClass} mb-8`}>
                    We've sent password reset instructions to <span className={`${textClass}`}>{email}</span>
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-8`}>
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  <Button
                    onClick={onBackToLogin}
                    className="w-full h-12 rounded-xl text-white shadow-md hover:shadow-lg transition-all bg-[#2563EB] hover:bg-[#1d4ed8]"
                  >
                    Back to Login
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className={`text-sm ${subtextClass}`}>
              © 2025 SchoolHub — <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>For Super Administrators Only</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
