// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Stories', path: '/stories' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthAndAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const isAuth = !!session;
        setIsAuthenticated(isAuth);

        if (isAuth && session?.user) {
          const { data, error } = await supabase
            .from('admin_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (!error && data) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const isAuth = !!session;
      setIsAuthenticated(isAuth);

      if (isAuth && session?.user) {
        const { data, error } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (!error && data) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const isAuthPage = location.pathname === '/auth';
  const showAuthLink = !isAuthPage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_-20px_rgba(38,50,56,0.3)] py-2 sm:py-3'
          : 'bg-white/80 backdrop-blur-sm py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#00897B] to-[#4DB6AC] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <img
                src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg"
                alt="Prayas Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#263238] group-hover:text-[#00897B] transition-colors">
                Prayas
              </span>
              <span className="hidden min-[480px]:block text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[#263238]/60">
                Samaj Sevi Sanstha
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-2 group whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-[#00897B]'
                    : 'text-[#263238]/80 hover:text-[#263238]'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#00897B] transition-all ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#00897B] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold rounded-full hover:bg-[#00897B]/90 transition-all shadow-lg shadow-[#00897B]/20 hover:shadow-[#00897B]/30 hover:scale-105"
            >
              Donate Now
              <Heart className="w-4 h-4" />
            </Link>

            {!loading && isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-[#00897B]/30 text-[#00897B] hover:bg-[#00897B]/10 transition-all hover:scale-105"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}

            {showAuthLink && !loading && (
              <Link
                to={isAuthenticated ? "/profile" : "/auth"}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-[#00897B]/30 text-[#00897B] hover:bg-[#00897B]/10 transition-all hover:scale-105"
              >
                <User className="w-4 h-4" />
                {isAuthenticated ? "Profile" : "Sign In"}
              </Link>
            )}

            <button
              className="md:hidden text-[#263238] p-2.5 -m-1 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-black/5 mt-2 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-3 sm:py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-medium py-3 px-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#00897B] bg-[#00897B]/5'
                      : 'text-[#263238]/80 hover:text-[#263238] hover:bg-black/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/donate"
                className="mt-3 w-full text-center rounded-full bg-[#00897B] px-6 py-3.5 font-semibold text-white flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform"
              >
                Donate Now <Heart className="w-5 h-5" />
              </Link>

              {!loading && isAdmin && (
                <Link
                  to="/admin"
                  className="w-full text-center rounded-full border border-[#00897B]/30 px-6 py-3.5 font-semibold text-[#00897B] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <Shield className="w-5 h-5" />
                  Admin Dashboard
                </Link>
              )}

              {showAuthLink && !loading && (
                <Link
                  to={isAuthenticated ? "/profile" : "/auth"}
                  className="mt-2 w-full text-center rounded-full border border-[#00897B]/30 px-6 py-3.5 font-semibold text-[#00897B] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated ? "Profile" : "Sign In"}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
                    }
