// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Heart, User, ChevronDown, Globe, UserPlus, Handshake
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';
import BrandLogo from './BrandLogo';

// ---------- NAV LINKS ----------
const navLinks = [
  { name: 'nav.home', path: '/' },
  {
    name: 'Who We Are',
    path: '/about',
    submenu: [
      { name: 'About Us', path: '/aboutus' },
      { name: 'nav.about.story', path: '/about' },
      { name: 'nav.about.members', path: '/about/members' },
      { name: 'nav.about.certifications', path: '/about/certifications' },
    ]
  },
  {
    name: 'What We Do',
    path: '/our-work',
    submenu: [

      { name: 'Overview', path: '/overview' },
      { name: 'Our work', path: '/our-work' },
      { name: 'Rural Development', path: '/rural-development' },
      { name: 'Women Empowerment & Livelihood', path: '/women-empowerment' },
      { name: 'Education & Skill Development', path: '/education' },
      { name: 'Health & Social Welfare', path: '/healthcare' },
      { name: 'Environment & Sustainability', path: '/environment' },
    ]
  },
  {
    name: 'Media',
    path: '/media',
    submenu: [
      { name: 'nav.gallery', path: '/gallery' },
    ]
  },
  { name: 'nav.contact', path: '/contact' },
];

const LANGUAGES = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isStripVisible, setIsStripVisible] = useState(true);
  const location = useLocation();

  // ---------- DYNAMIC NAVBAR HEIGHT ----------
  useEffect(() => {
    const updateNavbarHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, [isStripVisible]);

  // ---------- Auth logic ----------
  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    } catch (err) {
      console.error('Auth check error:', err);
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
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
        setMobileSubmenuOpen(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const isAuthPage = location.pathname === '/auth';
  const showAuthLink = !isAuthPage;

  const textColor = 'text-[#263238]';
  const textColorHover = 'hover:text-red-600';
  const borderColor = 'border-[#263238]/30';
  const bgButton = 'bg-[#263238]/5 hover:bg-[#263238]/10';

  const bgHeader = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-sm'
    : 'bg-white border-b border-[#263238]/5';

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

  const safeT = (key: string) => {
    const translated = t(key);
    return translated === key ? key : translated;
  };

  const donateText = t('nav.donateNow', 'Donate Now');
  const volunteerText = safeT('nav.volunteer');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999]">
        {/* ---------- TOP STRIP ---------- */}
        {isStripVisible && (
          <div className="hidden sm:flex bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-2 px-4 sm:px-8 items-center justify-between w-full shadow-md text-xs z-50">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-[#FFF314] hidden md:inline">Prayas NGO:</span>
              <img 
                src="/assets/brand/certifications-banner.png" 
                alt="Certifications - 80G, 12A Registered" 
                className="h-5 md:h-7 object-contain rounded-sm"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              />
            </div>
            <div className="flex items-center gap-4 shrink-0">
              {/* Social icons */}
              <div className="flex items-center gap-3 text-white/70">
                <a
                  href="https://www.facebook.com/prayassamajiksanstha"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-red-500 transition"
                >
                  <FaFacebook size={14} />
                </a>
                <a
                  href="https://x.com/pryasaa?s=11"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="hover:text-red-500 transition"
                >
                  <FaTwitter size={14} />
                </a>
                <a
                  href="https://www.instagram.com/prayas_samajik_sanstha"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-red-500 transition"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC16ZbLnP1qJxrKQoKsss12w"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:text-red-500 transition"
                >
                  <FaYoutube size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/prayas-samaj-sevi-sastha-undefined-0a468b418/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-red-500 transition"
                >
                  <FaLinkedin size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ---------- MAIN NAVBAR ---------- */}
        <div
          className={`transition-all duration-500 ${bgHeader} 
            min-h-[58px] sm:min-h-[64px] lg:min-h-[68px] flex items-center py-1 px-3 sm:px-6 lg:px-8`}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-3">
            {/* Logo on Left */}
            <div className="flex-shrink-0 z-50">
              <BrandLogo to="/" variant="navbar" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 mx-auto">
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
                        className={`text-sm xl:text-base font-medium transition-colors relative py-2 group flex items-center gap-1 whitespace-nowrap ${isActive ? 'text-red-600' : `${textColor} ${textColorHover}`
                          }`}
                      >
                        {safeT(link.name)}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                        <span
                          className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
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
                            className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[220px] py-2 z-50 overflow-hidden"
                          >
                            {link.submenu!.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`block px-5 py-2.5 text-sm font-medium transition-colors ${location.pathname === sub.path
                                  ? 'text-red-600 bg-red-50 font-semibold'
                                  : 'text-gray-800 hover:bg-red-50 hover:text-red-600'
                                  }`}
                              >
                                {safeT(sub.name)}
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
                    className={`text-sm xl:text-base font-medium transition-colors relative py-2 group whitespace-nowrap ${location.pathname === link.path
                      ? 'text-red-600'
                      : `${textColor} ${textColorHover}`
                      }`}
                  >
                    {safeT(link.name)}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions - Sequence: 1. Donate Now (Yellow BG), 2. Volunteer, 3. Language (most right) */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto lg:ml-0">
              {/* 1. DONATE NOW BUTTON (LIGHT YELLOW BG) */}
              <Link
                to="/donate"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-extrabold rounded-full bg-[#FFF314] hover:bg-[#FBE000] text-red-600 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer border border-[#E6DB00] whitespace-nowrap"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 fill-red-600" />
                <span className="hidden sm:inline">{t('nav.donateNow', 'Donate Now')}</span>
                <span className="sm:hidden">Donate</span>
              </Link>

              {/* 2. VOLUNTEER BUTTON */}
              <Link
                to="/volunteer"
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-sm font-medium rounded-full border transition-all hover:scale-105 cursor-pointer ${borderColor} ${textColor} hover:bg-[#263238]/5 hover:border-amber-500 hover:text-amber-800`}
              >
                <UserPlus className="w-4 h-4 text-amber-700" />
                <span className="hidden md:inline">{volunteerText}</span>
              </Link>

              {/* 3. PARTNER BUTTON */}
              <Link
                to="/partner"
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-sm font-medium rounded-full border transition-all hover:scale-105 cursor-pointer ${borderColor} ${textColor} hover:bg-[#263238]/5 hover:border-blue-500 hover:text-blue-800`}
              >
                <Handshake className="w-4 h-4 text-blue-700" />
                <span className="hidden md:inline">Partner</span>
              </Link>

              {/* 3. LANGUAGE SELECTOR (AT THE MOST RIGHT) */}
              <div className="relative z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLangDropdownOpen(!langDropdownOpen);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-sm font-medium rounded-full border transition-all hover:scale-105 cursor-pointer ${borderColor} ${textColor} hover:bg-[#263238]/5 hover:border-amber-500 hover:text-amber-800`}
                >
                  <Globe className="w-4 h-4 text-amber-700" />
                  <span className="hidden md:inline">{currentLangLabel}</span>
                </button>
                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[160px] py-2 z-50 pointer-events-auto overflow-hidden"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`block w-full text-left px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer ${i18n.language === lang.code
                            ? 'text-amber-800 bg-amber-500/10 font-semibold'
                            : 'text-gray-800 hover:bg-amber-50 hover:text-amber-800'
                            }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                className={`lg:hidden p-2.5 -m-1 rounded-full transition-colors ${textColor} ${textColorHover} ${bgButton}`}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- MOBILE MENU ---------- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-[var(--navbar-height,70px)] bottom-0 z-[9998] bg-white shadow-xl border-t border-[#263238]/10 overflow-y-auto"
          >
            <nav className="flex flex-col px-4 py-3 sm:py-4 gap-1">
              {navLinks.map((link) => {
                const hasSubmenu = link.submenu && link.submenu.length > 0;
                const isActive = location.pathname === link.path || (hasSubmenu && isSubmenuActive(link.submenu!));

                if (hasSubmenu) {
                  const isOpen = mobileSubmenuOpen === link.name;
                  return (
                    <div key={link.name} className="border-b border-[#263238]/5 last:border-0">
                      <button
                        onClick={() => toggleMobileSubmenu(link.name)}
                        className={`w-full text-left text-lg font-medium py-3 px-2 rounded-lg transition-colors flex items-center justify-between ${isActive
                          ? 'text-red-600 bg-red-600/10'
                          : 'text-[#263238] hover:text-red-600 hover:bg-[#263238]/5'
                          }`}
                      >
                        {safeT(link.name)}
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
                                  className={`py-2 px-2 rounded-lg text-sm transition-colors ${location.pathname === sub.path
                                    ? 'text-red-600 bg-red-600/10'
                                    : 'text-[#263238]/70 hover:text-red-600 hover:bg-[#263238]/5'
                                    }`}
                                >
                                  {safeT(sub.name)}
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
                    className={`text-lg font-medium py-3 px-2 rounded-lg transition-colors ${location.pathname === link.path
                      ? 'text-red-600 bg-red-600/10'
                      : 'text-[#263238] hover:text-red-600 hover:bg-[#263238]/5'
                      }`}
                  >
                    {safeT(link.name)}
                  </Link>
                );
              })}

              <div className="border-t border-[#263238]/10 pt-3 mt-2">
                <p className="text-xs text-[#263238]/50 uppercase tracking-wider mb-2 px-2">Language</p>
                <div className="grid grid-cols-2 gap-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsMobileOpen(false);
                      }}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${i18n.language === lang.code
                        ? 'bg-red-600 text-white'
                        : 'bg-[#263238]/5 text-[#263238] hover:bg-red-600/10 hover:text-red-600'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/donate"
                className="mt-3 w-full text-center rounded-full bg-[#FFF314] hover:bg-[#FBE000] px-6 py-3.5 font-bold text-red-600 border border-[#E6DB00] shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                {t('nav.donateNow', 'Donate Now')} <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              </Link>

              <Link
                to="/volunteer"
                className="mt-2 w-full text-center rounded-full border border-[#263238]/30 px-6 py-3.5 font-semibold text-[#263238] hover:text-red-600 hover:border-red-600 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                {volunteerText} <UserPlus className="w-5 h-5" />
              </Link>

              <Link
                to="/partner"
                className="mt-2 w-full text-center rounded-full border border-[#263238]/30 px-6 py-3.5 font-semibold text-[#263238] hover:text-blue-600 hover:border-blue-600 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                Partner With Us <Handshake className="w-5 h-5" />
              </Link>

              {showAuthLink && !loading && (
                <Link
                  to={isAuthenticated ? "/profile" : "/auth"}
                  className="mt-2 w-full text-center rounded-full border border-[#263238]/30 px-6 py-3.5 font-semibold text-[#263238] hover:text-red-600 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated ? safeT('nav.profile') : safeT('nav.signin')}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
