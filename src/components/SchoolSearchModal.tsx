import { useState } from 'react';
import { Search, X, ArrowRight, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface School {
  id: string;
  name: string;
  city: string;
  color: string;
  logo?: string;
}

interface SchoolSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectSchool: (school: School) => void;
}

const MOCK_SCHOOLS: School[] = [
  { id: '1', name: 'Springfield High School', city: 'Springfield, MA', color: '#2563EB' },
  { id: '2', name: 'Riverside Academy', city: 'Portland, OR', color: '#F97316' },
  { id: '3', name: 'Mountain View College', city: 'Denver, CO', color: '#10B981' },
  { id: '4', name: 'Oceanside Institute', city: 'San Diego, CA', color: '#8B5CF6' },
  { id: '5', name: 'Central City University', city: 'Chicago, IL', color: '#EF4444' },
  { id: '6', name: 'Greenfield School', city: 'Seattle, WA', color: '#14B8A6' },
  { id: '7', name: 'Lakeside Learning Center', city: 'Austin, TX', color: '#F59E0B' },
  { id: '8', name: 'Northbrook Academy', city: 'Boston, MA', color: '#3B82F6' },
];

export function SchoolSearchModal({ open, onClose, onSelectSchool }: SchoolSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchools = searchQuery.trim()
    ? MOCK_SCHOOLS.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 bg-transparent border-none shadow-none">
        {/* Visually hidden title and description for accessibility */}
        <DialogTitle className="sr-only">Find your school</DialogTitle>
        <DialogDescription className="sr-only">
          Search for your school by name or code to access the login page
        </DialogDescription>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by school name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-14 rounded-2xl border-none bg-white shadow-2xl text-gray-900 placeholder:text-gray-400"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* School List - Only show when there's a search query */}
        {searchQuery.trim() && (
          <div className="mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <ScrollArea className="max-h-[400px]">
              <div className="p-2">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <button
                      key={school.id}
                      onClick={() => {
                        onSelectSchool(school);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                    >
                      {/* School Logo */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: school.color }}
                      >
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>

                      {/* School Info */}
                      <div className="flex-1 text-left">
                        <div className="text-gray-900">{school.name}</div>
                        <div className="text-gray-500 text-sm">{school.city}</div>
                      </div>

                      {/* Arrow Icon */}
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No schools found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export type { School };
