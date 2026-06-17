// src/components/admin/AdminVolunteers.tsx
import { useState, useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import { Phone, MessageCircle, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

type Volunteer = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  availability: string;
  skills: string;
  message: string;
  status: string;
  created_at: string;
};

interface AdminVolunteersProps {
  isSuperAdmin: boolean;
}

export default function AdminVolunteers({ isSuperAdmin }: AdminVolunteersProps) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      let query = supabase.from('volunteers').select('*');
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      setVolunteers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if (!isSuperAdmin) return;
    try {
      const { error } = await supabase
        .from('volunteers')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      // Refresh
      fetchVolunteers();
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs"><XCircle className="w-3 h-3" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (error) {
    return <div className="text-destructive p-4">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Volunteer Applications</h2>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); fetchVolunteers(); }}
            className="border border-border/50 rounded-md px-3 py-1.5 text-sm bg-background"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {volunteers.length === 0 ? (
        <p className="text-muted-foreground">No volunteer applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Skills</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
                {isSuperAdmin && <th className="text-left p-3">Manage</th>}
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v) => (
                <tr key={v.id} className="border-t border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium">{v.full_name}</td>
                  <td className="p-3">{v.email}</td>
                  <td className="p-3">{v.phone}</td>
                  <td className="p-3">{v.skills || '—'}</td>
                  <td className="p-3">{getStatusBadge(v.status)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCall(v.phone)}
                        className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                        title="Call"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleWhatsApp(v.phone)}
                        className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  {isSuperAdmin && (
                    <td className="p-3">
                      <div className="flex gap-1">
                        {v.status !== 'approved' && (
                          <button
                            onClick={() => updateStatus(v.id, 'approved')}
                            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            Approve
                          </button>
                        )}
                        {v.status !== 'rejected' && (
                          <button
                            onClick={() => updateStatus(v.id, 'rejected')}
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
          }
