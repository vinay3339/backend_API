import { GraduationCap } from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onSchoolsClick: () => void;
  onApplicationManagerClick: () => void;
}

export function LandingPage({ onSchoolsClick, onApplicationManagerClick }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          {/* Logo and App Name */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-blue-600 rounded-3xl mb-6 shadow-lg">
              <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-gray-900 mb-2">EduPortal</h1>
            <p className="text-gray-600">Your Gateway to Learning Management</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <Button
              onClick={onSchoolsClick}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Schools
            </Button>
            
            <Button
              onClick={onApplicationManagerClick}
              variant="outline"
              className="w-full h-14 border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              Application Manager
            </Button>
          </div>

          {/* Optional Illustration Text */}
          <div className="mt-12 text-gray-500 text-sm">
            <p>Trusted by schools worldwide</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © 2025 EduPortal — All rights reserved
      </footer>
    </div>
  );
}
