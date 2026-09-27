// src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminVolunteers from '@/components/admin/AdminVolunteers';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminContacts from '@/components/admin/AdminContacts';
import AdminSanityGallery from '@/components/admin/AdminSanityGallery';
import AdminImpactCategories from '@/components/admin/AdminImpactCategories';
import AdminStories from '@/components/admin/AdminStories';
import Auth from './Auth';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      // 1. Check local admin session
      const savedSession = localStorage.getItem('prayas_admin_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed?.email) {
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }
      }

      // 2. Check Supabase auth
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.warn('Admin auth check fallback:', err);
      // Check local session again
      const savedSession = localStorage.getItem('prayas_admin_session');
      setIsAuthenticated(!!savedSession);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF9F6]">
        <Loader2 className="w-8 h-8 animate-spin text-[#263238]" />
      </div>
    );
  }

  // If not authenticated, render dedicated Admin Login interface
  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/gallery" replace />} />
        <Route path="/gallery" element={<AdminSanityGallery />} />
        <Route path="/volunteers" element={<AdminVolunteers isSuperAdmin={true} />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/contacts" element={<AdminContacts />} />
        <Route path="/categories" element={<AdminImpactCategories />} />
        <Route path="/stories" element={<AdminStories />} />
        <Route path="*" element={<Navigate to="/admin/gallery" replace />} />
      </Routes>
    </AdminLayout>
  );
}
