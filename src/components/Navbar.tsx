// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, Shield, ChevronDown, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { name: 'nav.home', path: '/' },
  { 
    name: 'nav.about', 
    path: '/about',
    submenu: [
      { name: 'nav.about.story', path: '/about' },
      { name: 'nav.about.members', path: '/about/members' },
      { name: 'nav.about.certifications', path: '/about/certifications' },
    ]
  },
  { name: 'nav.programs', path: '/programs' },
  { name: 'nav.gallery', path: '/gallery' },
  { name: 'nav.stories', path: '/stories' },
  { name: 'nav.volunteer', path: '/volunteer' },
  { name: 'nav.contact', path: '/contact' },
];

const LANGUAGES = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  // Auth logic (unchanged)
  useEffect(() => {
    checkAuthAndAdmin();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        const { data, error } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        setIsAdmin(!error && !!data);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function checkAuthAndAdmin() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session?.user) {
        const { data, error } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        setIsAdmin(!error && !!data);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
    setMobileSubmenuOpen(null);
    setLangDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
        setMobileSubmenuOpen(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAuthPage = location.pathname === '/auth';
  const showAuthLink = !isAuthPage;

  const isLightText = isHome;
  const textColor = isLightText ? 'text-white' : 'text-[#263238]';
  const textColorHover = isLightText ? 'hover:text-[#FFF314]' : 'hover:text-[#FFF314]';
  const textColorMuted = isLightText ? 'text-white/70' : 'text-[#263238]/70';
  const borderColor = isLightText ? 'border-white/30' : 'border-[#263238]/30';
  const bgButton = isLightText ? 'bg-white/10 hover:bg-white/20' : 'bg-[#263238]/5 hover:bg-[#263238]/10';
  
  const bgHeader = isHome 
    ? (isScrolled ? 'bg-black/30 backdrop-blur-md' : 'bg-transparent')
    : (isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white border-b border-[#263238]/5');

  const handleMouseEnter = (name: string) => setOpenDropdown(name);
  const handleMouseLeave = () => setOpenDropdown(null);

  const toggleMobileSubmenu = (name: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === name ? null : name);
  };

  const isSubmenuActive = (submenu: { path: string }[]) => {
    return submenu.some(item => location.pathname === item.path);
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangDropdownOpen(false);
  };

  const currentLangLabel = LANGUAGES.find(l => l.code === i18n.language)?.label || 'English';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${bgHeader} py-2 sm:py-3`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#FFF314] to-[#FFF314]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <img
                src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg"
                alt="Prayas Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-display font-bold text-lg sm:text-xl tracking-tight transition-colors ${textColor} group-hover:text-[#FFF314]`}>
                Prayas
              </span>
              <span className={`hidden min-[480px]:block text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.18em] transition-colors ${textColorMuted}`}>
                Samaj Sevi Sanstha
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-7">
            {navLinks.map((link) => {
              const hasSubmenu = link.submenu && link.submenu.length > 0;
              const isActive = location.pathname === link.path || (hasSubmenu && isSubmenuActive(link.submenu!));
              
              if (hasSubmenu) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`text-sm font-medium transition-colors relative py-2 group flex items-center gap-1 whitespace-nowrap ${
                        isActive ? 'text-[#FFF314]' : `${textColor} ${textColorHover}`
                      }`}
                    >
                      {t(link.name)}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-[#FFF314] transition-all ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-1 bg-white dark:bg-[#1a1a2e] rounded-xl shadow-xl border border-[#263238]/10 dark:border-white/10 min-w-[220px] py-2 z-50"
                        >
                          {link.submenu!.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className={`block px-5 py-2.5 text-sm transition-colors ${
                                location.pathname === sub.path
                                  ? 'text-[#FFF314] bg-[#FFF314]/10'
                                  : `text-[#263238] dark:text-white hover:bg-[#FFF314]/10 hover:text-[#FFF314]`
                              }`}
                            >
                              {t(sub.name)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-2 group whitespace-nowrap ${
                    location.pathname === link.path
                      ? 'text-[#FFF314]'
                      : `${textColor} ${textColorHover}`
                  }`}
                >
                  {t(link.name)}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#FFF314] transition-all ${
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher – Desktop (FIXED) */}
            <div className="hidden sm:relative sm:inline-block z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangDropdownOpen(!langDropdownOpen);
                }}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full border transition-all hover:scale-105 cursor-pointer ${borderColor} ${textColor} ${isLightText ? 'hover:bg-white/10' : 'hover:bg-[#263238]/5'} hover:border-[#FFF314] hover:text-[#FFF314]`}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLangLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-white dark:bg-[#1a1a2e] rounded-xl shadow-xl border border-[#263238]/10 dark:border-white/10 min-w-[150px] py-2 z-50 pointer-events-auto"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                        }}
                        className={`block w-full text-left px-5 py-2.5 text-sm transition-colors cursor-pointer ${
                          i18n.language === lang.code
                            ? 'text-[#FFF314] bg-[#FFF314]/10'
                            : 'text-[#263238] dark:text-white hover:bg-[#FFF314]/10 hover:text-[#FFF314]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold rounded-full transition-all shadow-lg hover:shadow-[#FFF314]/30 hover:scale-105 bg-[#FFF314] text-[#263238] shadow-[#FFF314]/40 hover:bg-[#FFF314]/90"
            >
              {t('nav.donate')}
              <Heart className="w-4 h-4" />
            </Link>

            {!loading && isAdmin && (
              <Link
                to="/admin"
                className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border transition-all hover:scale-105 ${borderColor} ${textColor} ${isLightText ? 'hover:bg-white/10' : 'hover:bg-[#263238]/5'} hover:border-[#FFF314] hover:text-[#FFF314]`}
              >
                <Shield className="w-4 h-4" />
                {t('nav.admin')}
              </Link>
            )}

            {showAuthLink && !loading && (
              <Link
                to={isAuthenticated ? "/profile" : "/auth"}
                className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border transition-all hover:scale-105 ${borderColor} ${textColor} ${isLightText ? 'hover:bg-white/10' : 'hover:bg-[#263238]/5'} hover:border-[#FFF314] hover:text-[#FFF314]`}
              >
                <User className="w-4 h-4" />
                {isAuthenticated ? t('nav.profile') : t('nav.signin')}
              </Link>
            )}

            <button
              className={`md:hidden p-2.5 -m-1 rounded-full transition-colors ${textColor} ${textColorHover} ${bgButton}`}
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
            className="md:hidden bg-black/80 backdrop-blur-lg border-t border-white/10 mt-2 overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col px-4 py-3 sm:py-4 gap-1">
              {navLinks.map((link) => {
                const hasSubmenu = link.submenu && link.submenu.length > 0;
                const isActive = location.pathname === link.path || (hasSubmenu && isSubmenuActive(link.submenu!));

                if (hasSubmenu) {
                  const isOpen = mobileSubmenuOpen === link.name;
                  return (
                    <div key={link.name} className="border-b border-white/5 last:border-0">
                      <button
                        onClick={() => toggleMobileSubmenu(link.name)}
                        className={`w-full text-left text-lg font-medium py-3 px-2 rounded-lg transition-colors flex items-center justify-between ${
                          isActive
                            ? 'text-[#FFF314] bg-[#FFF314]/10'
                            : 'text-white hover:text-[#FFF314] hover:bg-white/5'
                        }`}
                      >
                        {t(link.name)}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 flex flex-col gap-0.5">
                              {link.submenu!.map((sub) => (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  className={`py-2 px-2 rounded-lg text-sm transition-colors ${
                                    location.pathname === sub.path
                                      ? 'text-[#FFF314] bg-[#FFF314]/10'
                                      : 'text-white/70 hover:text-[#FFF314] hover:bg-white/5'
                                  }`}
                                >
                                  {t(sub.name)}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium py-3 px-2 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'text-[#FFF314] bg-[#FFF314]/10'
                        : 'text-white hover:text-[#FFF314] hover:bg-white/5'
                    }`}
                  >
                    {t(link.name)}
                  </Link>
                );
              })}

              {/* Language Switcher – Mobile */}
              <div className="border-t border-white/10 pt-3 mt-2">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-2 px-2">Language</p>
                <div className="grid grid-cols-2 gap-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsMobileOpen(false);
                      }}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        i18n.language === lang.code
                          ? 'bg-[#FFF314] text-[#263238]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/donate"
                className="mt-3 w-full text-center rounded-full bg-[#FFF314] px-6 py-3.5 font-semibold text-[#263238] flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform"
              >
                {t('nav.donate')} <Heart className="w-5 h-5" />
              </Link>

              {!loading && isAdmin && (
                <Link
                  to="/admin"
                  className="w-full text-center rounded-full border border-[#FFF314]/40 px-6 py-3.5 font-semibold text-[#FFF314] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <Shield className="w-5 h-5" />
                  {t('nav.admin')}
                </Link>
              )}

              {showAuthLink && !loading && (
                <Link
                  to={isAuthenticated ? "/profile" : "/auth"}
                  className="mt-2 w-full text-center rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white hover:text-[#FFF314] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated ? t('nav.profile') : t('nav.signin')}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}