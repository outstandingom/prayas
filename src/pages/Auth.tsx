import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, User, Phone, ArrowRight, Loader2, Heart } from 'lucide-react';

type AuthMode = 'signin' | 'signup';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleModeSwitch = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === 'signin') {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (signInError) throw signInError;

        if (data.session) {
          navigate('/profile');
        }
      } else {
        // Sign Up Flow
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          // Immediately upsert profile data just in case the trigger didn't fire
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName.trim(),
            phone: phone.trim(),
            updated_at: new Date().toISOString(),
          });

          if (profileError) {
            console.warn('Profile record creation warning:', profileError.message);
          }

          if (data.session) {
            // Autologin on signup is supported in this Supabase configuration
            navigate('/profile');
          } else {
            setSuccessMsg('Registration successful! Please check your email to verify your account.');
            // Clear inputs
            setFullName('');
            setPhone('');
            setEmail('');
            setPassword('');
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F1F8F5] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Decorative background components */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-[#FFF314]/20 rounded-2xl p-6 md:p-8 shadow-xl relative z-10">
        {/* Brand header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#FFF314] to-[#FFF314]/80 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <img
                src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg"
                alt="Prayas Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-xl text-[#263238]">Prayas</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#263238] tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-[#263238]/60 mt-1">
            {mode === 'signin'
              ? 'Sign in to access your profile and dashboards'
              : 'Join our mission and make a difference today'}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-[#FFF314]/20 mb-6 relative">
          <button
            onClick={() => handleModeSwitch('signin')}
            className={`flex-1 py-2.5 text-center font-medium text-sm transition-colors relative cursor-pointer ${
              mode === 'signin' ? 'text-[#263238]' : 'text-[#263238]/50 hover:text-[#263238]/80'
            }`}
          >
            Sign In
            {mode === 'signin' && (
              <motion.div
                layoutId="auth-tab-active"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFF314]"
              />
            )}
          </button>
          <button
            onClick={() => handleModeSwitch('signup')}
            className={`flex-1 py-2.5 text-center font-medium text-sm transition-colors relative cursor-pointer ${
              mode === 'signup' ? 'text-[#263238]' : 'text-[#263238]/50 hover:text-[#263238]/80'
            }`}
          >
            Register
            {mode === 'signup' && (
              <motion.div
                layoutId="auth-tab-active"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFF314]"
              />
            )}
          </button>
        </div>

        {/* Status Alerts */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm mb-4"
            >
              {error}
            </motion.div>
          )}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm mb-4"
            >
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                key="signup-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-hidden"
              >
                <div>
                  <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#263238]/40">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required={mode === 'signup'}
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/15 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#263238]/40">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/15 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#263238]/40">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/15 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#263238]/40">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/15 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-[#FFF314] text-[#263238] font-bold rounded-lg hover:bg-[#FFF314]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FFF314]/20 disabled:opacity-50 cursor-pointer text-sm btn-hover"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : mode === 'signin' ? (
              <>
                Sign In <ArrowRight size={16} />
              </>
            ) : (
              <>
                Create Account <Heart size={16} className="fill-[#263238]" />
              </>
            )}
          </button>
        </form>

        {/* Footer info links */}
        <div className="mt-6 pt-4 border-t border-[#FFF314]/10 text-center">
          <Link
            to="/"
            className="text-xs text-[#263238]/60 hover:text-[#263238] hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
