// src/components/admin/AdminUsers.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

type User = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch from auth.users is not directly allowed; we need to use profiles table.
      // So we'll fetch from profiles joined with auth.users via RPC or we can query profiles directly.
      // We'll assume profiles table exists.
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, phone, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      // For email, we need to get from auth.users – but we can't directly join.
      // Alternatively, we can store email in profiles too, or use a view.
      // Let's assume we have email in profiles (we can add).
      // For now, we'll show a placeholder or we can fetch from auth via RPC.
      // Simpler: we'll fetch from auth.users using admin API (not recommended for client-side).
      // Instead, we'll fetch from profiles and show those fields.
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (error) {
    return <div className="text-destructive p-4">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Registered Users</h2>
      {users.length === 0 ? (
        <p className="text-muted-foreground">No users registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Registered</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-border/50">
                  <td className="p-3 font-medium">{u.full_name || '—'}</td>
                  <td className="p-3">{u.phone || '—'}</td>
                  <td className="p-3">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
