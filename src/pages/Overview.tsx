// src/pages/Overview.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Trees,
  Users,
  GraduationCap,
  HeartPulse,
  Leaf,
  Handshake,
  Building,
  ShoppingBag,
  Factory,
  Bus,
  BookOpen,
  Laptop,
  Stethoscope,
  Shield,
  Gift,
  Sprout,
  Droplets,
  ArrowRight,
  X,
  ChevronRight
} from 'lucide-react';

export interface OverviewItem {
  icon: React.ElementType;
  title: string;
  description: string;
  longDescription: string;
}

export interface OverviewCategory {
  id: number;
  title: string;
  icon: React.ElementType;
  description: string;
  longDescription: string;
  items: OverviewItem[];
  color: string;
  bgColor: string;
  borderColor: string;
  image: string;
  route: string;
}

export const OVERVIEW_CATEGORIES: OverviewCategory[] = [
  {
    id: 1,
    title: 'Rural Development',
    icon: Trees,
    description: 'Transforming rural communities through sustainable development initiatives that improve quality of life and create self-reliant villages.',
    longDescription: 'Our Rural Development programme is designed to uplift rural communities by addressing critical gaps in infrastructure, education, healthcare, and livelihood opportunities. We work closely with village panchayats and local leaders to co-create sustainable solutions.',
    image: 'https://i.ibb.co/fWWWk9S/Whats-App-Image-2026-07-12-at-2-50-03-PM-1.jpg',
    color: '#849989',
    bgColor: 'bg-[#849989]/20',
    borderColor: 'border-[#849989]',
    route: '/rural-development',
    items: [
      {
        icon: Handshake,
        title: 'Village Adoption',
        description: 'Adopting villages to provide holistic development support.',
        longDescription: 'Selecting underserved villages for multi-year comprehensive development blueprints.'
      },
      {
        icon: Building,
        title: 'Infrastructure',
        description: 'Building essential infrastructure like roads and community halls.',
        longDescription: 'Paving all-weather roads and constructing solar-powered PanchayatBhawan halls.'
      },
      {
        icon: Users,
        title: 'Community Development',
        description: 'Fostering local leadership and participatory growth.',
        longDescription: 'Training Village Development Committees and financial literacy groups.'
      }
    ]
  },
  {
    id: 2,
    title: 'Women Empowerment & Livelihood',
    icon: Users,
    description: 'Empowering women through skill development, financial independence, and micro-enterprises.',
    longDescription: 'Prayas Foundation focuses on economic self-reliance for women by setting up self-help groups, providing skill training in handicrafts, tailoring, and micro-enterprises, and driving legal awareness.',
    image: '/WOMEN.jpeg',
    color: '#DB2777',
    bgColor: 'bg-[#DB2777]/20',
    borderColor: 'border-[#DB2777]',
    route: '/women-empowerment',
    items: [
      {
        icon: ShoppingBag,
        title: 'Self-Help Groups',
        description: 'Forming SHGs for financial security and micro-loans.',
        longDescription: 'Organizing women into savings cooperatives and micro-enterprise units.'
      },
      {
        icon: Factory,
        title: 'Livelihood Units',
        description: 'Potato chips processing & food micro-enterprises.',
        longDescription: 'Community chips production units generating sustainable monthly incomes.'
      },
      {
        icon: Bus,
        title: 'Pink City Bus',
        description: 'Safe mobility and female commercial driver training.',
        longDescription: 'Training women drivers for public transit while ensuring commuter safety.'
      }
    ]
  },
  {
    id: 3,
    title: 'Education & Skill Development',
    icon: GraduationCap,
    description: 'Providing quality education, digital literacy, and skill development.',
    longDescription: 'Education is the cornerstone of development. We run Sanskarshala evening learning centers, digital literacy labs, and vocational training academies for youth.',
    image: '/EDUCATION.JPG',
    color: '#2563EB',
    bgColor: 'bg-[#2563EB]/20',
    borderColor: 'border-[#2563EB]',
    route: '/education',
    items: [
      {
        icon: BookOpen,
        title: 'Sanskarshala',
        description: 'Evening remedial learning and life skills for kids.',
        longDescription: 'Free academic tuition, moral values, and nutritional snacks for slum children.'
      },
      {
        icon: Laptop,
        title: 'Digital Literacy',
        description: 'Computer training and tech skills for young girls.',
        longDescription: 'Teaching software fundamentals, internet safety, and job-ready skills.'
      }
    ]
  },
  {
    id: 4,
    title: 'Health & Social Welfare',
    icon: HeartPulse,
    description: 'Comprehensive healthcare and social welfare programmes.',
    longDescription: 'From mobile health checkups and menstrual hygiene awareness to winter blanket distribution and COVID-19 relief, Prayas stands by vulnerable families in times of need.',
    image: '/healthcaret.jpg',
    color: '#DC2626',
    bgColor: 'bg-[#DC2626]/20',
    borderColor: 'border-[#DC2626]',
    route: '/healthcare',
    items: [
      {
        icon: Stethoscope,
        title: 'Health Camps',
        description: 'Free medical checkups and diagnostic care in villages.',
        longDescription: 'Deploying doctor teams, diagnostic tests, and free medicines.'
      },
      {
        icon: Shield,
        title: 'Labour Rights',
        description: 'Social security and e-Shram registration for workers.',
        longDescription: 'Educating unorganized laborers on legal rights and workplace safety.'
      },
      {
        icon: Gift,
        title: 'Community Relief',
        description: 'Essential ration and winter warmth blanket drives.',
        longDescription: 'Distributing dry ration kits and heavy wool blankets to vulnerable families.'
      }
    ]
  },
  {
    id: 5,
    title: 'Environment & Sustainability',
    icon: Leaf,
    description: 'Protecting the environment and promoting sustainable living.',
    longDescription: 'Protecting the planet for future generations. We organize 50,000+ native tree plantations including Kargil Vatika, rainwater harvesting, and plastic-free village drives.',
    image: '/TREEGROW.jpg',
    color: '#16A34A',
    bgColor: 'bg-[#16A34A]/20',
    borderColor: 'border-[#16A34A]',
    route: '/environment',
    items: [
      {
        icon: Sprout,
        title: 'Plantation',
        description: 'Massive tree plantation drives for green cover.',
        longDescription: 'Planting native shade and fruit trees with geotagged care monitoring.'
      },
      {
        icon: Leaf,
        title: 'Kargil Vatika',
        description: 'A 5,270 tree memorial forest for Kargil martyrs.',
        longDescription: 'Dedicated green memorial forest at Bilawali Talab, Indore.'
      },
      {
        icon: Droplets,
        title: 'Water Conservation',
        description: 'Lake cleaning, check dams, and rainwater harvesting.',
        longDescription: 'Restoring local ponds, desilting lakes, and recharging aquifers.'
      }
    ]
  }
];

export default function Overview() {
  const { t } = useTranslation();
  const [hoveredCategory, setHoveredCategory] = useState<OverviewCategory | null>(null);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pb-24 relative"
      style={{ paddingTop: 'var(--navbar-height, 100px)' }}
    >
      {/* FULL-SCREEN BACKDROP BLUR WHEN ANY CARD IS HOVERED */}
      <AnimatePresence>
        {hoveredCategory !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 pointer-events-auto"
            onClick={() => setHoveredCategory(null)}
          />
        )}
      </AnimatePresence>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* TOP HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-2 text-xs font-semibold uppercase tracking-wider text-[#263238] bg-amber-100/90 rounded-full border border-amber-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Focus Area Overview
          </span>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-normal text-[#263238] tracking-tight"
            style={{ fontFamily: 'var(--font-heading, "Caveat", "Comic Sans MS", cursive, sans-serif)' }}
          >
            what we do
          </h1>

          <p className="text-base sm:text-lg text-[#263238]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Hover over any initiative to separate it and explore details in full screen focus.
          </p>

          <div className="pt-4 flex justify-center">
            <Link
              to="/our-work"
              className="inline-flex items-center gap-2 bg-[#263238] hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <span>Explore All 18 Detailed Projects</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </Link>
          </div>
        </motion.div>

        {/* 5 VERTICAL GRID CARDS (MATCHING EXACT USER SCREENSHOT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {OVERVIEW_CATEGORIES.map((category) => {
            const isHovered = hoveredCategory?.id === category.id;
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                onMouseEnter={() => setHoveredCategory(category)}
                className={`relative group h-[440px] w-full rounded-[2rem] overflow-hidden cursor-pointer border border-gray-200/80 bg-white transition-all duration-300 ${
                  isHovered ? 'z-50 opacity-0 scale-95 pointer-events-none' : 'hover:border-white/50 z-10 shadow-xl hover:-translate-y-1.5'
                }`}
                style={{
                  boxShadow: `0 10px 30px -10px ${category.color}35`,
                }}
              >
                <Link
                  to={category.route}
                  className="block w-full h-full relative overflow-hidden rounded-[2rem]"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  </div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-center">
                      <span
                        className="p-3 rounded-2xl text-white backdrop-blur-md shadow-lg border border-white/20"
                        style={{ backgroundColor: `${category.color}E6` }}
                      >
                        <Icon className="w-6 h-6" />
                      </span>
                    </div>

                    <div>
                      <h3
                        className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md"
                        style={{ fontFamily: 'var(--font-heading, "Caveat", sans-serif)' }}
                      >
                        {category.title}
                      </h3>
                      <p className="text-white/80 text-xs line-clamp-3 leading-relaxed font-light">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CENTERED EXPANDED SPOTLIGHT CARD (WIDER SPLIT VIEW ON HOVER) */}
      <AnimatePresence>
        {hoveredCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: '-45%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.85, y: '-45%', x: '-50%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="fixed top-1/2 left-1/2 z-50 w-[94vw] max-w-4xl h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/30 text-white grid grid-cols-1 md:grid-cols-12 bg-slate-900"
            style={{
              boxShadow: `0 30px 70px -15px ${hoveredCategory.color}90, 0 0 50px rgba(0,0,0,0.6)`,
            }}
          >
            {/* LEFT SIDE: FEATURED IMAGE */}
            <div className="md:col-span-5 relative h-48 md:h-full overflow-hidden bg-slate-950">
              <img
                src={hoveredCategory.image}
                alt={hoveredCategory.title}
                className="w-full h-full object-cover scale-105 transition-transform duration-700 brightness-90"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%), linear-gradient(to right, transparent 50%, rgba(15, 23, 42, 0.95) 100%)`,
                }}
              />

              {/* Floating Badge on Image */}
              <div className="absolute top-5 left-5 flex items-center gap-2.5 z-10">
                <span
                  className="p-3 rounded-2xl text-white backdrop-blur-md shadow-xl border border-white/30"
                  style={{ backgroundColor: `${hoveredCategory.color}F0` }}
                >
                  <hoveredCategory.icon className="w-6 h-6" />
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 hidden md:block">
                <span className="bg-black/50 backdrop-blur-md text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-300/30 uppercase tracking-widest">
                  {hoveredCategory.items.length} Key Projects Included
                </span>
              </div>
            </div>

            {/* RIGHT SIDE: CONTENT & DETAILS */}
            <div
              className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-y-auto"
              style={{
                background: `linear-gradient(135deg, ${hoveredCategory.color}E6 0%, rgba(15, 23, 42, 0.96) 100%)`,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setHoveredCategory(null)}
                className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* TOP HEADER */}
              <div className="border-b border-white/20 pb-4 pr-10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Focus Area Spotlight
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {hoveredCategory.title}
                </h3>
              </div>

              {/* MIDDLE BODY */}
              <div className="my-3 space-y-4">
                <p className="text-white/90 text-sm leading-relaxed font-light line-clamp-4">
                  {hoveredCategory.longDescription}
                </p>

                {/* Sub-item Initiatives Grid */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Included Programs
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hoveredCategory.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/20 text-white px-3 py-1.5 rounded-xl backdrop-blur-md font-medium border border-white/20 shadow-xs flex items-center gap-1.5"
                      >
                        <item.icon className="w-3.5 h-3.5 text-amber-300" />
                        {item.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTTOM CTA BUTTON */}
              <div className="pt-4 border-t border-white/20">
                <Link
                  to={hoveredCategory.route}
                  className="w-full py-3.5 px-6 bg-white text-[#263238] font-bold rounded-2xl shadow-xl hover:bg-amber-300 transition-all duration-300 flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider group"
                >
                  <span>Explore {hoveredCategory.title} Page</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
