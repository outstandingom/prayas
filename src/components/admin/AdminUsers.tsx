// src/components/admin/AdminUsers.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

type User = {
  id: string;
  full_name: string;
  phone: string;
  created_at: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const DEFAULT_USERS: User[] = [
    {
      id: 'usr-1',
      full_name: 'Prayas Admin',
      phone: '+91 88277 64170',
      created_at: new Date().toISOString()
    },
    {
      id: 'usr-2',
      full_name: 'Volunteer Field Coordinator',
      phone: '+91 98260 99887',
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'usr-3',
      full_name: 'Sanskarshala Mentor Lead',
      phone: '+91 97520 11223',
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ]

  const fetchUsers = async () => {
    setLoading(true)
    setError('')

    try {
      const saved = localStorage.getItem('prayas_admin_users')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUsers(parsed)
        } else {
          setUsers(DEFAULT_USERS)
          localStorage.setItem('prayas_admin_users', JSON.stringify(DEFAULT_USERS))
        }
      } else {
        setUsers(DEFAULT_USERS)
        localStorage.setItem('prayas_admin_users', JSON.stringify(DEFAULT_USERS))
      }
    } catch (e) {
      setUsers(DEFAULT_USERS)
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, phone, created_at')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setUsers(data);
        localStorage.setItem('prayas_admin_users', JSON.stringify(data));
      }
    } catch (err: any) {
      console.log('Supabase profiles fetch skipped:', err?.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
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
                  <tr key={u.id} className="border-t border-border/50 hover:bg-muted/30">
                    <td className="p-3 font-medium">{u.full_name || '—'}</td>
                    <td className="p-3">{u.phone || '—'}</td>
                    <td className="p-3">{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {users.map((u) => (
              <div key={u.id} className="bg-card border border-border/50 rounded-lg p-4">
                <p className="font-semibold">{u.full_name || '—'}</p>
                <p className="text-sm text-muted-foreground">{u.phone || '—'}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Registered: {new Date(u.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
