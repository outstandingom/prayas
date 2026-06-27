// src/components/admin/AdminLayout.tsx
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Heart, LogOut, Menu, X, MessageSquare, 
  ImageIcon, Layers, BookOpen, Settings, Shield, Home, 
  ChevronDown, ChevronRight, FileText, Calendar, Award
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { 
    name: 'Dashboard', 
    path: '/admin', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Volunteers', 
    path: '/admin/volunteers', 
    icon: Heart 
  },
  { 
    name: 'Users', 
    path: '/admin/users', 
    icon: Users 
  },
  { 
    name: 'Contact Messages', 
    path: '/admin/contacts', 
    icon: MessageSquare 
  },
  { 
    name: 'Gallery', 
    path: '/admin/gallery', 
    icon: ImageIcon 
  },
  { 
    name: 'Impact Categories', 
    path: '/admin/categories', 
    icon: Layers 
  },
  { 
    name: 'Impact Stories', 
    path: '/admin/stories', 
    icon: BookOpen 
  },
  { 
    name: 'Settings', 
    path: '/admin/settings', 
    icon: Settings 
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Get user email
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    };
    getUser();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isPathActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50/80">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#263238] rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-[#FFF314]" />
          </div>
          <span className="font-bold text-lg text-[#263238]">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-[#263238]" /> : <Menu className="w-5 h-5 text-[#263238]" />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className={`fixed md:relative z-40 w-64 bg-white border-r border-gray-200 h-full transition-transform duration-300 shadow-sm ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-4 h-full flex flex-col">
          {/* Logo - Desktop only */}
          <div className="hidden md:flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <div className="w-10 h-10 bg-[#263238] rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#FFF314]" />
            </div>
            <div>
              <span className="font-bold text-lg text-[#263238] block">Admin Panel</span>
              <span className="text-xs text-gray-500">Impact Dashboard</span>
            </div>
          </div>

          {/* Mobile - Close button inside sidebar */}
          {isMobile && (
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#263238] rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-[#FFF314]" />
                </div>
                <span className="font-bold text-lg text-[#263238]">Admin Panel</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-[#263238]" />
              </button>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isPathActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#FFF314]/20 text-[#263238] font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-[#263238]'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#263238]' : 'text-gray-400 group-hover:text-[#263238]'}`} />
                  <span className="text-sm">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="text-sm font-medium text-[#263238] truncate">
                {userEmail || 'Admin User'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 w-full transition-all duration-200 group"
            >
              <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-4 md:p-6 ${isMobile ? 'mt-16' : ''}`}>
        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Home className="w-4 h-4" />
          <span className="text-gray-300">/</span>
          <span className="text-[#263238] font-medium">Admin</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600">
            {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
          </span>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
