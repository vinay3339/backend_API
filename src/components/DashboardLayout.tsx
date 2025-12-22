import { useState, ReactNode } from 'react';
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Award,
  DollarSign,
  Bus,
  Library,
  Settings,
  User,
  ChevronDown,
  Bell,
  Search,
  Users,
  GraduationCap,
  ClipboardList,
  FileText,
  BarChart3,
  School,
  BookMarked,
  Clock,
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
  activeModule?: string;
  onModuleChange?: (module: string) => void;
  schoolName?: string;
  schoolLogo?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

// Menu items for Student role
const studentMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'homework', label: 'Homework', icon: BookOpen },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'my-marks', label: 'My Marks', icon: Award },
  { id: 'fees', label: 'Fees', icon: DollarSign },
  { id: 'transport', label: 'Transport', icon: Bus },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Menu items for Teacher role
const teacherMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'my-classes', label: 'My Classes', icon: School },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'marks-entry', label: 'Marks Entry', icon: Award },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'resources', label: 'Resources', icon: BookMarked },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Menu items for School Admin role
const adminMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'teachers', label: 'Teachers', icon: GraduationCap },
  { id: 'classes', label: 'Classes', icon: School },
  { id: 'marks-exams', label: 'Marks & Exams', icon: Award },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'transport', label: 'Transport', icon: Bus },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Get menu items based on user role
const getMenuItems = (userRole: string) => {
  if (userRole.includes('Admin')) return adminMenuItems;
  if (userRole.includes('Teacher')) return teacherMenuItems;
  return studentMenuItems;
};

export function DashboardLayout({
  children,
  activeModule = 'attendance',
  onModuleChange,
  schoolName = 'Greenwood Academy',
  schoolLogo,
  userName = 'John Doe',
  userRole = 'Student',
  userAvatar,
  onLogout,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get menu items based on user role
  const menuItems = getMenuItems(userRole);

  const handleModuleClick = (moduleId: string) => {
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-slate-800 text-gray-100 transition-all duration-300 z-40
          hidden lg:block
          ${sidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white">🎓</span>
              </div>
              <div>
                <h2 className="text-white text-sm mb-0">{schoolName}</h2>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
              <span className="text-white">🎓</span>
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeModule;

            return (
              <button
                key={item.id}
                onClick={() => handleModuleClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                  }
                  ${!sidebarOpen && 'justify-center'}
                `}
              >
                <Icon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} flex-shrink-0`} />
                {sidebarOpen && (
                  <span className="text-sm">{item.label}</span>
                )}
                {isActive && sidebarOpen && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border-2 border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
        >
          <svg
            className={`w-3 h-3 text-gray-300 transition-transform ${!sidebarOpen && 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Mobile Header/Navbar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🎓</span>
          </div>
          <span className="text-gray-900">{schoolName}</span>
        </div>

        <Avatar className="w-8 h-8">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 mt-16"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-slate-800 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeModule;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleModuleClick(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                      ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-slate-700/50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
          pt-16 lg:pt-0
        `}
      >
        {/* Desktop Header */}
        <header className="hidden lg:block sticky top-0 z-30 h-16 bg-white border-b border-gray-200 shadow-sm">
          <div className="h-full px-6 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative rounded-xl">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-xl transition-all">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden xl:block">
                      <p className="text-sm text-gray-900 mb-0">{userName}</p>
                      <p className="text-xs text-gray-500 mb-0">{userRole}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onModuleChange?.('settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={onLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-screen pb-20 lg:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg safe-area-bottom">
        <div className="grid grid-cols-5 h-16">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeModule;

            return (
              <button
                key={item.id}
                onClick={() => handleModuleClick(item.id)}
                className={`
                  relative flex flex-col items-center justify-center gap-1 transition-all
                  ${isActive ? 'text-blue-600' : 'text-gray-500 active:bg-gray-50'}
                `}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive && 'scale-110'}`} />
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}