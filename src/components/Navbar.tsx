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

  // ... (auth and admin logic remains unchanged) ...

  // Close mobile menu on route change and resize
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthPage = location.pathname === '/auth';
  const showAuthLink = !isAuthPage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-[0_10px_30px_-20px_rgba(38,50,56,0.15)] py-2 sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 z-[1000] relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#FFF314] to-[#FFF314]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <img
                src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg"
                alt="Prayas Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#263238] group-hover:text-[#FFF314] transition-colors">
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
                    ? 'text-[#FFF314]'
                    : 'text-[#263238] hover:text-[#FFF314]'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#FFF314] transition-all ${
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
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#FFF314] text-[#263238] px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold rounded-full hover:bg-[#FFF314]/90 transition-all shadow-lg shadow-[#FFF314]/20 hover:shadow-[#FFF314]/30 hover:scale-105"
            >
              Donate Now
              <Heart className="w-4 h-4" />
            </Link>

            {!loading && isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-[#FFF314]/40 text-[#FFF314] hover:bg-[#FFF314]/10 transition-all hover:scale-105"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}

            {showAuthLink && !loading && (
              <Link
                to={isAuthenticated ? "/profile" : "/auth"}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-[#FFF314]/40 text-[#263238] hover:text-[#FFF314] hover:bg-[#FFF314]/10 transition-all hover:scale-105"
              >
                <User className="w-4 h-4" />
                {isAuthenticated ? "Profile" : "Sign In"}
              </Link>
            )}

            <button
              className="md:hidden text-[#263238] p-2.5 -m-1 rounded-full hover:bg-[#FFF314]/10 active:bg-[#FFF314]/20 transition-colors z-[1000] relative cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
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
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-[#FFF314]/10 mt-2 overflow-hidden shadow-xl"
            style={{ position: 'relative', zIndex: 1000 }}
          >
            <nav className="flex flex-col px-4 py-3 sm:py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-medium py-3 px-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#FFF314] bg-[#FFF314]/10'
                      : 'text-[#263238] hover:text-[#FFF314] hover:bg-[#FFF314]/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/donate"
                className="mt-3 w-full text-center rounded-full bg-[#FFF314] px-6 py-3.5 font-semibold text-[#263238] flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform"
              >
                Donate Now <Heart className="w-5 h-5" />
              </Link>

              {!loading && isAdmin && (
                <Link
                  to="/admin"
                  className="w-full text-center rounded-full border border-[#FFF314]/40 px-6 py-3.5 font-semibold text-[#FFF314] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <Shield className="w-5 h-5" />
                  Admin Dashboard
                </Link>
              )}

              {showAuthLink && !loading && (
                <Link
                  to={isAuthenticated ? "/profile" : "/auth"}
                  className="mt-2 w-full text-center rounded-full border border-[#FFF314]/40 px-6 py-3.5 font-semibold text-[#263238] hover:text-[#FFF314] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
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
