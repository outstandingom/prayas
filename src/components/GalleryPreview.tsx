import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Masonry, { type MasonryItem } from './Masonry';

// Enriched list of real ground-level NGO photographs from organized assets
const galleryItems: MasonryItem[] = [
  {
    id: '1',
    img: '/assets/impact-gallery/gphoto-impact-1.jpg',
    url: '/gallery',
    height: 680,
    title: 'Prayas Grassroots Field Outreach',
    category: 'Community Welfare'
  },
  {
    id: '2',
    img: '/assets/impact-gallery/gphoto-impact-2.jpg',
    url: '/gallery',
    height: 620,
    title: 'Village Self-Empowerment Drive',
    category: 'Social Empowerment'
  },
  {
    id: '3',
    img: '/assets/impact-gallery/gdrive-impact-1.jpg',
    url: '/gallery',
    height: 640,
    title: 'Rural Community Support Center',
    category: 'Rural Development'
  },
  {
    id: '4',
    img: '/assets/impact-gallery/gdrive-impact-2.jpg',
    url: '/gallery',
    height: 580,
    title: 'Sanskarshala Educational Session',
    category: 'Education'
  },
  {
    id: '5',
    img: '/assets/impact-gallery/gdrive-impact-3.jpg',
    url: '/gallery',
    height: 660,
    title: 'Women Self-Help Group (SHG) Meet',
    category: 'Women Empowerment'
  },
  {
    id: '6',
    img: '/assets/impact-gallery/gdrive-impact-4.jpg',
    url: '/gallery',
    height: 700,
    title: 'Child Nutrition & Schooling Drive',
    category: 'Child Welfare'
  },
  {
    id: '7',
    img: '/assets/impact-gallery/gdrive-impact-5.jpg',
    url: '/gallery',
    height: 540,
    title: 'Free Village Medical Health Camp',
    category: 'Healthcare'
  },
  {
    id: '8',
    img: '/assets/impact-gallery/gdrive-impact-6.jpg',
    url: '/gallery',
    height: 650,
    title: 'Community Tree Plantation Drive',
    category: 'Environment'
  },
  {
    id: '9',
    img: '/assets/impact-gallery/gdrive-impact-7.jpg',
    url: '/gallery',
    height: 600,
    title: 'Humanitarian Relief & Warmth Kits',
    category: 'Relief Aid'
  },
  {
    id: '10',
    img: '/assets/impact-gallery/gdrive-impact-8.jpg',
    url: '/gallery',
    height: 670,
    title: 'Vocational Skill Development Center',
    category: 'Livelihood'
  },
  {
    id: '11',
    img: '/assets/impact-gallery/gdrive-impact-9.jpg',
    url: '/gallery',
    height: 590,
    title: 'Clean Drinking Water Initiative',
    category: 'Sanitation'
  },
  {
    id: '12',
    img: '/assets/impact-gallery/gdrive-impact-10.jpg',
    url: '/gallery',
    height: 630,
    title: 'Youth Mentorship & Tech Training',
    category: 'Education'
  },
  {
    id: '13',
    img: '/assets/impact-gallery/gdrive-impact-11.jpg',
    url: '/gallery',
    height: 610,
    title: 'Elderly Care & Health Support',
    category: 'Healthcare'
  },
  {
    id: '14',
    img: '/assets/impact-gallery/gdrive-impact-12.jpg',
    url: '/gallery',
    height: 550,
    title: 'Model Village Infrastructure Drive',
    category: 'Rural Development'
  },
  {
    id: '15',
    img: '/assets/healthcare/eye-surgery-camp.jpg',
    url: '/gallery',
    height: 600,
    title: 'Free Eye Surgery & Vision Camp',
    category: 'Medical Outreach'
  },
  {
    id: '16',
    img: '/Sindoda/IMG_20191217_133958.jpg',
    url: '/gallery',
    height: 660,
    title: 'Swachh Bharat Shramdaan Campaign',
    category: 'Sanitation'
  }
];

export default function GalleryPreview() {
  const { t } = useTranslation();
  const [items, setItems] = useState<MasonryItem[]>(galleryItems);

  useEffect(() => {
    const loadPhotos = () => {
      try {
        const saved = localStorage.getItem('prayas_live_photo_gallery');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const adminItems: MasonryItem[] = parsed
              .filter((p: any) => p.targetSection === 'impact-gallery' || p.targetSection === 'general')
              .map((p: any) => ({
                id: `admin-${p.id}`,
                img: p.src,
                url: '/gallery',
                height: 640,
                title: p.title,
                category: p.category,
              }));
            setItems([...adminItems, ...galleryItems]);
            return;
          }
        }
      } catch (e) {
        console.error('Error loading live photos:', e);
      }
      setItems(galleryItems);
    };

    loadPhotos();
    window.addEventListener('prayas-photos-updated', loadPhotos);
    return () => window.removeEventListener('prayas-photos-updated', loadPhotos);
  }, []);

  return (
    <section className="bg-gradient-to-b from-slate-50 via-gray-50 to-white py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-amber-700" />
            <span>Visual Ground Impact Archive</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#263238]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('gallery.title', 'Our Impact Gallery')}
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 mx-auto rounded-full shadow-xs" />

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            A glimpse into our ground-level initiatives across education, health camps, women empowerment, Kargil Vatika reforestation, and model village adoption.
          </p>
        </motion.div>

        {/* Integrated React Bits GSAP Masonry Grid */}
        <div className="w-full">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>

        {/* CTA Footer */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-[#263238] text-white hover:bg-[#F5B800] hover:text-[#263238] font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 text-sm"
          >
            <span>View Complete Photo Gallery & Documentaries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
