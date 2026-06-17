
  // src/pages/Profile.tsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { User, Mail, Phone, Edit, LogOut, Loader2, Shield } from 'lucide-react';

interface ProfileData {
  full_name: string;
  phone: string;
  avatar_url?: string;
  email: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [updating, setUpdating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchProfile();
    checkAdminStatus();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        navigate('/auth');
        return;
      }

      // Fetch profile from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, phone, avatar_url')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 = row not found (no profile yet)
        throw profileError;
      }

      setProfile({
        email: user.email || '',
        full_name: profileData?.full_name || user.user_metadata?.full_name || '',
        phone: profileData?.phone || user.user_metadata?.phone || '',
        avatar_url: profileData?.avatar_url || '',
      });
      setFullName(profileData?.full_name || user.user_metadata?.full_name || '');
      setPhone(profileData?.phone || user.user_metadata?.phone || '');
    } catch (err: any) {
      setError(err.message || 'Failed to load profile.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!error && data) {
          setIsAdmin(true);
        }
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      // Update profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          phone: phone,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      if (updateError) throw updateError;

      // Also update user metadata (optional)
      const { error: metaError } = await supabase.auth.updateUser({
        data: { full_name: fullName, phone }
      });
      if (metaError) console.warn('Metadata update failed:', metaError);

      setProfile(prev => prev ? { ...prev, full_name: fullName, phone } : null);
      setEditing(false);
    } catch (err: any) {
      setError(err.message || 'Update failed.');
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <div className="flex gap-3">
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md border border-destructive/30 text-destructive hover:bg-destructive/10 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Admin Dashboard Button */}
        {isAdmin && (
          <Link
            to="/admin"
            className="mb-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary/10 text-primary border border-primary/30 rounded-md hover:bg-primary/20 transition font-medium text-sm"
          >
            <Shield className="w-4 h-4" />
            Go to Admin Dashboard
          </Link>
        )}

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        {profile ? (
          <div className="space-y-6">
            {/* Avatar placeholder */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald to-primary/70 flex items-center justify-center text-white text-3xl font-bold">
                {profile.full_name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-lg font-semibold">{profile.full_name || 'No name'}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="w-4 h-4" /> {profile.email}
                </p>
                {profile.phone && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-4 h-4" /> {profile.phone}
                  </p>
                )}
                {isAdmin && (
                  <p className="text-xs text-primary font-medium mt-1 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Administrator
                  </p>
                )}
              </div>
            </div>

            {/* Edit form */}
            {editing ? (
              <form onSubmit={handleUpdate} className="border-t border-border/30 pt-6 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFullName(profile.full_name || '');
                      setPhone(profile.phone || '');
                    }}
                    className="px-6 py-2 border border-border/50 rounded-md hover:bg-muted"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // View mode
              <div className="border-t border-border/30 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="font-medium">{profile.full_name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile.phone || 'Not set'}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">No profile data found.</p>
        )}
      </div>
    </section>
  );
      }
