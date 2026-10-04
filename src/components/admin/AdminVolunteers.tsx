import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { VolunteerApplication as Volunteer } from '@/data/volunteersData';
import { 
  getStoredVolunteers,
  saveStoredVolunteers,
  updateVolunteerStatus as updateStoredVolunteerStatus,
  fetchVolunteersFromServer,
  DEFAULT_VOLUNTEERS
} from '@/data/volunteersData';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

interface AdminVolunteersProps {
  isSuperAdmin: boolean;
}

export default function AdminVolunteers({ isSuperAdmin }: AdminVolunteersProps) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => getStoredVolunteers());
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const fetchVolunteers = useCallback(async () => {
    setIsRefreshing(true);
    setError('');

    // 1. First load from localStorage immediately for zero latency
    const currentList = getStoredVolunteers();
    setVolunteers(currentList);

    // 2. Fetch from local server API (which synchronizes Incognito, normal windows & all browsers)
    try {
      const serverList = await fetchVolunteersFromServer();
      if (serverList && serverList.length > 0) {
        setVolunteers(serverList);
      }
    } catch (apiErr) {
      console.warn('API sync check:', apiErr);
    }

    // 3. Background fetch from Supabase if connected
    try {
      let query = supabase.from('volunteers').select('*');
      const { data, error: sbError } = await query.order('created_at', { ascending: false });
      if (!sbError && data && data.length > 0) {
        const mergedMap = new Map<string, Volunteer>();
        data.forEach((v: Volunteer) => mergedMap.set(v.id || v.email, v));
        const current = getStoredVolunteers();
        current.forEach((v: Volunteer) => mergedMap.set(v.id || v.email, v));
        const merged = Array.from(mergedMap.values());
        setVolunteers(merged);
        saveStoredVolunteers(merged);
      }
    } catch (err: any) {
      // Supabase is optional/local-first
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Sync on mount, periodic polling (every 3 seconds) for instant cross-window sync, and window events
  useEffect(() => {
    fetchVolunteers();

    // Fast polling so submissions in other windows / Incognito appear in seconds automatically
    const pollInterval = setInterval(() => {
      fetchVolunteersFromServer().then((data) => {
        if (data && data.length > 0) {
          setVolunteers(data);
        }
      });
    }, 3000);

    const handleStorageChange = () => {
      setVolunteers(getStoredVolunteers());
    };

    const handleCustomUpdate = (e: any) => {
      if (e?.detail && Array.isArray(e.detail)) {
        setVolunteers(e.detail);
      } else {
        handleStorageChange();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', () => {
      handleStorageChange();
      fetchVolunteers();
    });
    window.addEventListener('prayas-volunteers-updated', handleCustomUpdate);
    window.addEventListener('prayas_volunteers_updated', handleCustomUpdate);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
      window.removeEventListener('prayas-volunteers-updated', handleCustomUpdate);
      window.removeEventListener('prayas_volunteers_updated', handleCustomUpdate);
    };
  }, [fetchVolunteers]);

  const updateStatus = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    if (!isSuperAdmin) return;
    const updated = await updateStoredVolunteerStatus(id, newStatus);
    setVolunteers(updated);

    try {
      await supabase
        .from('volunteers')
        .update({ status: newStatus })
        .eq('id', id);
    } catch (err: any) {
      console.log('Background Supabase status update note:', err?.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <CheckCircle className="w-3 h-3" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  // Filtered list
  const filteredVolunteers = useMemo(() => {
    if (filter === 'all') return volunteers;
    return volunteers.filter((v) => v.status?.toLowerCase() === filter.toLowerCase());
  }, [volunteers, filter]);

  const pendingCount = useMemo(() => {
    return volunteers.filter((v) => v.status?.toLowerCase() === 'pending').length;
  }, [volunteers]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Volunteer Applications</h2>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold shadow-xs">
                {pendingCount} New
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Total {volunteers.length} volunteer requests submitted. Manage status and contact applicants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchVolunteers()}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs transition active:scale-95 cursor-pointer"
            title="Refresh volunteer applications"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-red-600' : ''}`} />
            <span>Refresh</span>
          </button>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm bg-white text-gray-800 font-medium shadow-2xs focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
          >
            <option value="all">All ({volunteers.length})</option>
            <option value="pending">Pending ({volunteers.filter((v) => v.status === 'pending').length})</option>
            <option value="approved">Approved ({volunteers.filter((v) => v.status === 'approved').length})</option>
            <option value="rejected">Rejected ({volunteers.filter((v) => v.status === 'rejected').length})</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      {filteredVolunteers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <Info className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-base font-bold text-gray-700">No applications found</p>
          <p className="text-xs text-gray-400 mt-1">
            {filter !== 'all' ? `No applications with status "${filter}". Try changing the filter.` : 'No volunteer applications have been received yet.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="text-left p-4">Applicant</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Skills & Role</th>
                  <th className="text-left p-4">Availability</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                  {isSuperAdmin && <th className="text-left p-4">Manage</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVolunteers.map((v) => {
                  const isExpanded = expandedRow === v.id;
                  return (
                    <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Name & Address */}
                      <td className="p-4 align-top">
                        <div className="font-bold text-gray-900">{v.full_name}</div>
                        {v.address && (
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                            <span>{v.address}</span>
                          </div>
                        )}
                        {v.message && (
                          <button
                            onClick={() => setExpandedRow(isExpanded ? null : v.id)}
                            className="mt-1.5 text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isExpanded ? 'Hide message' : 'View message'}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        )}
                        {isExpanded && v.message && (
                          <div className="mt-2 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                            <strong className="block text-[10px] uppercase tracking-wider text-amber-800 mb-0.5">Application Note:</strong>
                            {v.message}
                          </div>
                        )}
                      </td>

                      {/* Contact */}
                      <td className="p-4 align-top">
                        <div className="text-xs text-gray-800 font-medium">{v.email}</div>
                        <div className="text-xs text-gray-500 mt-0.5 font-mono">{v.phone}</div>
                      </td>

                      {/* Skills */}
                      <td className="p-4 align-top">
                        <div className="text-xs text-gray-800 font-medium">{v.skills || '—'}</div>
                      </td>

                      {/* Availability */}
                      <td className="p-4 align-top">
                        <div className="text-xs text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{v.availability || 'Flexible'}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4 align-top">
                        {getStatusBadge(v.status)}
                      </td>

                      {/* Quick Call / WhatsApp Actions */}
                      <td className="p-4 align-top">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCall(v.phone)}
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition cursor-pointer"
                            title="Call Phone"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleWhatsApp(v.phone)}
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition cursor-pointer"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      {/* Manage Actions */}
                      {isSuperAdmin && (
                        <td className="p-4 align-top">
                          <div className="flex items-center gap-1.5">
                            {v.status !== 'approved' && (
                              <button
                                onClick={() => updateStatus(v.id, 'approved')}
                                className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-lg transition cursor-pointer"
                              >
                                Approve
                              </button>
                            )}
                            {v.status !== 'rejected' && (
                              <button
                                onClick={() => updateStatus(v.id, 'rejected')}
                                className="px-2.5 py-1 text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200 rounded-lg transition cursor-pointer"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredVolunteers.map((v) => (
              <div key={v.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{v.full_name}</span>
                      {getStatusBadge(v.status)}
                    </div>
                    <p className="text-xs text-gray-600">{v.email}</p>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{v.phone}</p>
                    {v.skills && (
                      <p className="text-xs text-gray-700 mt-1.5">
                        <span className="font-bold text-gray-500">Skills:</span> {v.skills}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedRow(expandedRow === v.id ? null : v.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition"
                  >
                    {expandedRow === v.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expandable Details */}
                {expandedRow === v.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                    {v.address && (
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{v.address}</span>
                      </p>
                    )}
                    {v.availability && (
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{v.availability}</span>
                      </p>
                    )}
                    {v.message && (
                      <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 text-xs">
                        <strong className="block text-[10px] uppercase font-bold text-amber-700 mb-0.5">Message:</strong>
                        {v.message}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleCall(v.phone)}
                    className="flex-1 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </button>
                  <button
                    onClick={() => handleWhatsApp(v.phone)}
                    className="flex-1 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                  {isSuperAdmin && (
                    <>
                      {v.status !== 'approved' && (
                        <button
                          onClick={() => updateStatus(v.id, 'approved')}
                          className="px-3 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold hover:bg-emerald-200 transition"
                        >
                          Approve
                        </button>
                      )}
                      {v.status !== 'rejected' && (
                        <button
                          onClick={() => updateStatus(v.id, 'rejected')}
                          className="px-3 py-2 bg-rose-100 text-rose-800 rounded-xl text-xs font-bold hover:bg-rose-200 transition"
                        >
                          Reject
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
