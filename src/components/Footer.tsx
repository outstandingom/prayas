// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#263238] text-white relative">
      {/* Back to top button */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-[#FFF314] text-[#263238] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FFF314]/90 transition-all hover:scale-110 animate-subtle-float"
          aria-label="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#FFF314] to-[#FFF314]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <img
                  src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg"
                  alt="Prayas Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-white">
                  Prayas
                </span>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-white/50">
                  Samaj Sevi Sanstha
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-xs">
              {t('footer.brand.desc', 'Empowering communities through education, healthcare, and sustainable development initiatives across India since 2015.')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.quickLinks.title', 'Quick Links')}</h4>
            <ul className="space-y-2.5">
              {[
                { name: t('footer.quickLinks.about', 'About Us'), path: '/about' },
                { name: t('footer.quickLinks.programs', 'Programs'), path: '/programs' },
                { name: t('footer.quickLinks.gallery', 'Gallery'), path: '/gallery' },
                { name: t('footer.quickLinks.stories', 'Success Stories'), path: '/stories' },
                { name: t('footer.quickLinks.volunteer', 'Volunteer'), path: '/volunteer' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-[#FFF314] text-sm transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.contact.title', 'Contact Us')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@prayasfoundation.org" className="flex items-start gap-3 text-white/60 hover:text-[#FFF314] text-sm transition-colors group">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>info@prayasfoundation.org</span>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-start gap-3 text-white/60 hover:text-[#FFF314] text-sm transition-colors group">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>123, Community Center,<br />New Delhi - 110001</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.newsletter.title', 'Stay Connected')}</h4>
            <p className="text-white/60 text-sm mb-4">
              {t('footer.newsletter.desc', 'Subscribe to our newsletter for updates on our initiatives and impact stories.')}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder', 'Your email')}
                className="flex-1 bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#FFF314] focus:bg-white/15 transition-all placeholder:text-white/40"
              />
              <button
                type="submit"
                className="bg-[#FFF314] text-[#263238] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#FFF314]/90 transition-all hover:scale-105"
              >
                {t('footer.newsletter.join', 'Join')}
              </button>
            </form>
            <div className="mt-6">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-[#FFF314] text-[#263238] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#FFF314]/90 transition-all hover:scale-105"
              >
                <Heart className="w-4 h-4 text-[#263238] fill-current" />
                {t('footer.newsletter.donate', 'Make a Donation')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Prayas Samaj Sevi Sanstha. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">{t('footer.bottom.privacy', 'Privacy Policy')}</a>
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">{t('footer.bottom.terms', 'Terms of Service')}</a>
            <span className="text-white/20 text-xs">|</span>
            <span className="text-white/40 text-xs flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#FFF314] fill-[#FFF314]" /> in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
