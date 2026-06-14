import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Stories', path: '/stories' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  // Check if we're on gallery page or other dark pages
  const isDarkPage = location.pathname === '/gallery' || location.pathname === '/stories'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isDarkPage
          ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_-20px_rgba(10,37,64,0.5)] py-3'
          : 'bg-white/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo with Image */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-emerald to-[#6366F1] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <img 
                src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg" 
                alt="Prayas Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-xl tracking-tight text-navy group-hover:text-emerald transition-colors">
                Prayas
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-navy/60">
                Samaj Sevi Sanstha
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-2 group ${
                  location.pathname === link.path
                    ? 'text-emerald'
                    : 'text-navy/80 hover:text-navy'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-emerald transition-all ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald text-white px-5 py-2.5 text-sm font-semibold rounded-full hover:bg-emerald/90 transition-all shadow-lg shadow-emerald/30 hover:shadow-emerald/50 hover:scale-105"
            >
              Donate Now
              <Heart className="w-4 h-4" />
            </Link>

            <button
              className="md:hidden text-navy p-2"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-black/5 mt-3"
          >
            <nav className="flex flex-col px-4 py-4 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-medium py-1.5 ${
                    location.pathname === link.path ? 'text-emerald' : 'text-navy/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/donate"
                className="mt-2 w-full text-center rounded-full bg-emerald px-6 py-3 font-semibold text-white flex items-center justify-center gap-2"
              >
                Donate Now <Heart className="w-5 h-5" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
