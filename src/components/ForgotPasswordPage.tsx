import { useState } from 'react';
import { ArrowLeft, GraduationCap, Mail, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { School } from './SchoolSearchModal';

interface ForgotPasswordPageProps {
  school: School;
  onBackToLogin: () => void;
}

export function ForgotPasswordPage({ school, onBackToLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset email
    setIsSubmitted(true);
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
            {!isSubmitted ? (
              <>
                {/* School Logo and Title */}
                <div className="text-center mb-8">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-md"
                    style={{ backgroundColor: school.color }}
                  >
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-gray-900 mb-1">Forgot Password?</h2>
                  <p className="text-gray-500">
                    Enter your email address and we'll send you instructions to reset your password
                  </p>
                </div>

                {/* Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 rounded-xl border-2 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: school.color }}
                  >
                    Send Reset Instructions
                  </Button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <button
                    onClick={onBackToLogin}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
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
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-gray-900 mb-2">Check Your Email</h2>
                  <p className="text-gray-600 mb-8">
                    We've sent password reset instructions to <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-8">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  <Button
                    onClick={onBackToLogin}
                    className="w-full h-12 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: school.color }}
                  >
                    Back to Login
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
