import { Link } from 'react-router-dom'
import { Globe, MessageCircle, Camera, Link2, Mail, Phone, MapPin, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-navy/10 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-[#6366F1] flex items-center justify-center text-white font-bold text-lg shadow-lg">P</div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">Prayas</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              A global non-profit dedicated to creating sustainable impact through education, healthcare, and community empowerment.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {[Globe, MessageCircle, Camera, Link2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald hover:border-emerald hover:text-navy transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-5 text-gold">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Programs', path: '/programs' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Success Stories', path: '/stories' },
                { name: 'Contact', path: '/contact' },
              ].map((l) => (
                <li key={l.name}>
                  <Link to={l.path} className="text-white/60 hover:text-emerald transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-5 text-gold">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald shrink-0 mt-0.5" size={18} />
                <span className="text-white/60 text-sm">123 Global Impact Way,<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-emerald shrink-0" size={18} />
                <span className="text-white/60 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-emerald shrink-0" size={18} />
                <span className="text-white/60 text-sm">hello@prayas.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-5 text-gold">Newsletter</h3>
            <p className="text-white/60 text-sm mb-4">Subscribe to get latest updates on our initiatives.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald text-white placeholder:text-white/40"
              />
              <button type="submit" className="bg-emerald text-white font-semibold rounded-lg px-4 py-3 text-sm hover:bg-emerald/80 transition-colors">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Prayas Foundation. All rights reserved.</p>
          <div className="flex items-center gap-1">Made with <Heart size={12} className="text-emerald mx-1" /> for a better world</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
