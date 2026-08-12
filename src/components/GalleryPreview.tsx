// src/components/GalleryPreview.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Masonry, { type MasonryItem } from './Masonry';

// Enriched list of real ground-level NGO photographs from organized assets
const galleryItems: MasonryItem[] = [
  {
    id: '1',
    img: '/assets/healthcare/eye-surgery-camp.jpg',
    url: '/gallery',
    height: 600,
    title: 'Free Eye Checkup & Surgery Camp',
    category: 'Healthcare'
  },
  {
    id: '2',
    img: '/assets/education/sanskarshala-classroom.jpg',
    url: '/gallery',
    height: 700,
    title: 'Sanskarshala Learning Centre',
    category: 'Education'
  },
  {
    id: '3',
    img: '/assets/relief/clean-water-tanker.jpeg',
    url: '/gallery',
    height: 520,
    title: 'Rural Clean Drinking Water Initiative',
    category: 'Rural Relief'
  },
  {
    id: '4',
    img: '/assets/education/digital-literacy-lab.jpg',
    url: '/gallery',
    height: 660,
    title: 'Smart Computer & Digital Literacy Lab',
    category: 'Digital Education'
  },
  {
    id: '5',
    img: '/assets/women-empowerment/sewing-training.jpeg',
    url: '/gallery',
    height: 580,
    title: 'Vocational Sewing & Tailoring Center',
    category: 'Women Livelihood'
  },
  {
    id: '6',
    img: '/assets/healthcare/elderly-care.jpeg',
    url: '/gallery',
    height: 720,
    title: 'Elderly Health & Care Support',
    category: 'Healthcare'
  },
  {
    id: '7',
    img: '/assets/women-empowerment/sabji-wali-didi.jpeg',
    url: '/gallery',
    height: 540,
    title: 'Sabji Wali Didi Micro-Vendor Support',
    category: 'Women Enterprise'
  },
  {
    id: '8',
    img: '/assets/education/children-group.jpg',
    url: '/gallery',
    height: 640,
    title: 'Sanskarshala Students Collective',
    category: 'Child Welfare'
  },
  {
    id: '9',
    img: '/assets/environment/kargil-vatika-forest.jpg',
    url: '/gallery',
    height: 680,
    title: 'Kargil Vatika 5,270 Tree Memorial Forest',
    category: 'Environment'
  },
  {
    id: '10',
    img: '/Sindoda/IMG_20191217_133958.jpg',
    url: '/gallery',
    height: 660,
    title: 'Project Sindoda Model Village Infrastructure',
    category: 'Rural Development'
  },
  {
    id: '11',
    img: '/assets/relief/dry-ration-drive.jpg',
    url: '/gallery',
    height: 560,
    title: 'Nutritious Meal & Dry Ration Drive',
    category: 'Food Security'
  },
  {
    id: '12',
    img: '/assets/healthcare/health-camp.jpeg',
    url: '/gallery',
    height: 620,
    title: 'Free Rural Multi-Specialty Health Camp',
    category: 'Medical Outreach'
  },
  {
    id: '13',
    img: '/Sindoda/IMG_20191106_111020.jpg',
    url: '/gallery',
    height: 580,
    title: 'Swachh Sindoda Shramdaan Drive',
    category: 'Sanitation'
  },
  {
    id: '14',
    img: '/assets/women-empowerment/shg-collective.jpg',
    url: '/gallery',
    height: 650,
    title: 'Self-Help Group (SHG) Women Meet',
    category: 'Women Empowerment'
  },
  {
    id: '15',
    img: '/assets/education/educational-workshop.jpg',
    url: '/gallery',
    height: 530,
    title: 'Children Interactive Educational Workshop',
    category: 'Education'
  },
  {
    id: '16',
    img: '/Sindoda/IMG_20191213_152317.jpg',
    url: '/gallery',
    height: 610,
    title: 'Nukkad Natak Street Theater Eco-Awareness',
    category: 'Community Awareness'
  }
];

export default function GalleryPreview() {
  const { t } = useTranslation();

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
            items={galleryItems}
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
