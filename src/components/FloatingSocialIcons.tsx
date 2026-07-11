import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebook, href: 'https://www.facebook.com/prayassamajiksanstha', label: 'Facebook' },
  { icon: FaTwitter, href: 'https://x.com/pryasaa?s=11', label: 'Twitter' },
  { icon: FaInstagram, href: 'https://www.instagram.com/prayas_samajik_sanstha', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://www.youtube.com/channel/UC16ZbLnP1qJxrKQoKsss12w', label: 'YouTube' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/prayas-samaj-sevi-sastha-undefined-0a468b418/', label: 'LinkedIn' },
];

export default function FloatingSocialIcons() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-[#FFF314] hover:scale-110 transition-all duration-300 border border-gray-200 hover:border-[#FFF314]"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
