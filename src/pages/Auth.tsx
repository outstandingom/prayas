import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanEmail = email.trim();

    // Check pre-authorized Admin credentials
    if (cleanEmail === 'prayas20269@gmail.com' && password === 'Prayas@12345') {
      const adminSession = {
        email: cleanEmail,
        role: 'super_admin',
        authenticatedAt: new Date().toISOString(),
      };
      localStorage.setItem('prayas_admin_session', JSON.stringify(adminSession));
      setLoading(false);
      navigate('/admin');
      return;
    }

    // Fallback to Supabase Auth if credentials match a configured user
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (signInError) {
        // If Supabase network error or invalid credentials
        throw signInError;
      }

      if (data.session) {
        const adminSession = {
          email: cleanEmail,
          role: 'super_admin',
          authenticatedAt: new Date().toISOString(),
        };
        localStorage.setItem('prayas_admin_session', JSON.stringify(adminSession));
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials or connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4 py-16 relative overflow-hidden select-none">
      {/* Decorative background blur accents */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-[#FFF314]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#263238]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 space-y-6">
        {/* Admin Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-1 group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#263238] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-white/20">
              <img
                src="/prayas-logo.png"
                alt="Prayas Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-2xl text-[#263238]">Prayas</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>Admin Portal Portal Login</span>
          </div>

          <h1 className="text-2xl font-extrabold text-[#263238] tracking-tight">
            Sign In to Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Access live photo uploads, website content, and volunteer records
          </p>
        </div>

        {/* Error Alert */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#263238]/70 uppercase tracking-wider mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                placeholder="prayas20269@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition-all text-[#263238] placeholder:text-gray-400 text-sm font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#263238]/70 uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition-all text-[#263238] placeholder:text-gray-400 text-sm font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-[#FFF314] hover:bg-[#F5B800] text-[#263238] font-extrabold rounded-full shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/40 disabled:opacity-50 cursor-pointer text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#263238]" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In to Admin Panel <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer info links */}
        <div className="pt-2 border-t border-gray-100 text-center">
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-[#263238] font-semibold hover:underline"
          >
            ← Back to Prayas Website
          </Link>
        </div>
      </div>
    </section>
  );
}
