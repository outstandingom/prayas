import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter, Send } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white/80 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-[#205D24] via-[#2a7a2f] to-[#205D24]" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#205D24] to-[#2a7a2f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <img 
                  src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg" 
                  alt="Prayas Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-[#4CAF50] transition-colors">
                  Prayas
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/60">
                  Samaj Sevi Sanstha
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Empowering communities through education, healthcare, and sustainable development since 2010.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#205D24] transition-all duration-300 flex items-center justify-center text-white/60 hover:text-white group"
                aria-label="Facebook"
              >
                <Facebook size={16} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#205D24] transition-all duration-300 flex items-center justify-center text-white/60 hover:text-white group"
                aria-label="Instagram"
              >
                <Instagram size={16} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#205D24] transition-all duration-300 flex items-center justify-center text-white/60 hover:text-white group"
                aria-label="YouTube"
              >
                <Youtube size={16} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#205D24] transition-all duration-300 flex items-center justify-center text-white/60 hover:text-white group"
                aria-label="Twitter"
              >
                <Twitter size={16} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {['Home', 'About Us', 'Programs', 'Gallery', 'Stories', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-sm text-white/60 hover:text-[#4CAF50] transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <MapPin size={16} className="text-[#4CAF50] flex-shrink-0 mt-0.5" />
                <span>Indore, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <Phone size={16} className="text-[#4CAF50] flex-shrink-0" />
                <a href="tel:+919999999999">+91 99999 99999</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <Mail size={16} className="text-[#4CAF50] flex-shrink-0" />
                <a href="mailto:prayas20269@gmail.com">prayas20269@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Stay Updated</h3>
            <p className="text-sm text-white/60 mb-4">
              Subscribe to our newsletter for updates on our work and impact.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#4CAF50] transition-colors text-sm"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2.5 rounded-lg bg-[#205D24] hover:bg-[#2a7a2f] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                Subscribe
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {currentYear} <span className="text-white/60 font-medium">Prayas Samaj Sevi Sanstha</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/donate" className="flex items-center gap-1.5 text-[#4CAF50] hover:text-white transition-colors font-medium">
              <Heart size={12} className="fill-[#4CAF50] group-hover:fill-white" />
              Donate Now
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#205D24]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#205D24]/5 blur-3xl pointer-events-none" />
    </footer>
  )
}
