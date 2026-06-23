// src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminVolunteers from '@/components/admin/AdminVolunteers';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminContactMessages from '@/components/admin/AdminContactMessages'; // rename if needed
import AdminGallery from '@/components/admin/AdminGallery'; // new component
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'super_admin' | 'sub_admin' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        navigate('/');
        return;
      }

      setRole(data.role as 'super_admin' | 'sub_admin');
    } catch (err) {
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!role) {
    return null;
  }

  const isSuperAdmin = role === 'super_admin';

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/volunteers" replace />} />
        <Route path="/volunteers" element={<AdminVolunteers isSuperAdmin={isSuperAdmin} />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/messages" element={<AdminContactMessages />} /> {/* Match nav */}
        <Route path="/gallery" element={<AdminGallery />} /> {/* New gallery route */}
        <Route path="*" element={<Navigate to="/admin/volunteers" />} />
      </Routes>
    </AdminLayout>
  );
}
