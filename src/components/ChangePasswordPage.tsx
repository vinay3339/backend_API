import { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import type { School } from './SchoolSearchModal';

interface ChangePasswordPageProps {
  school: School;
  onPasswordChanged: () => void;
  onLogout?: () => void;
}

export function ChangePasswordPage({ school, onPasswordChanged, onLogout }: ChangePasswordPageProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calculate password strength
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (newPassword.length >= 8) strength += 25;
    if (newPassword.length >= 12) strength += 15;
    if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) strength += 20;
    if (/\d/.test(newPassword)) strength += 20;
    if (/[^a-zA-Z0-9]/.test(newPassword)) strength += 20;

    setPasswordStrength(Math.min(strength, 100));
  }, [newPassword]);

  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const validatePassword = () => {
    const newErrors: { [key: string]: string } = {};

    // Check if old password is entered
    if (!oldPassword) {
      newErrors.oldPassword = 'Old password is required';
    }

    // Check password strength requirements
    if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/[a-z]/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/\d/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number';
    } else if (!/[^a-zA-Z0-9]/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one symbol';
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }

    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      
      // Show success toast
      toast.success('✅ Password updated! Redirecting to your dashboard...', {
        duration: 2000,
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        onPasswordChanged();
      }, 2000);
    }, 1500);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default behavior - reload or redirect
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Breadcrumb Navigation */}
      <div className="w-full bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Login</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2563EB]">Change Password</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400">Dashboard</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
            {/* Lock Icon and Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <h1 className="text-gray-900 mb-1">Change Password</h1>
                <p className="text-gray-600">Please update your password to continue.</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Old Password */}
              <div className="space-y-2">
                <Label htmlFor="old-password">Old Password</Label>
                <div className="relative">
                  <Input
                    id="old-password"
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                      setErrors({ ...errors, oldPassword: '' });
                    }}
                    className={`h-12 rounded-xl border-2 pr-12 ${errors.oldPassword ? 'border-red-500' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showOldPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.oldPassword && (
                  <p className="text-sm text-red-600">{errors.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setErrors({ ...errors, newPassword: '' });
                    }}
                    className={`h-12 rounded-xl border-2 pr-12 ${errors.newPassword ? 'border-red-500' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="space-y-1 pt-1">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {errors.newPassword && (
                  <p className="text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors({ ...errors, confirmPassword: '' });
                    }}
                    className={`h-12 rounded-xl border-2 pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Password Policy */}
              <div className="bg-[#F3F4F6] rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Use at least 8 characters including uppercase, lowercase, number, and symbol.
                </p>
              </div>

              {/* Update Button */}
              <Button
                type="submit"
                disabled={isUpdating}
                className="w-full h-12 rounded-xl text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 bg-[#2563EB] hover:bg-[#1d4ed8]"
              >
                {isUpdating ? 'Updating...' : 'Update Password'}
              </Button>

              {/* Log out Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
                >
                  Log out instead
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
