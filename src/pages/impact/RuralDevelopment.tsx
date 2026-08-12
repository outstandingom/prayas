import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  Target,
  Award,
  Users,
  MapPin,
  GraduationCap,
  BookOpen,
  Handshake,
  Droplets,
  Building,
  Trees,
  Heart,
  ArrowUpRight
} from 'lucide-react';
import gsap from 'gsap';

const subCategories = [
  {
    id: 'village-adoption',
    title: 'Village Adoption',
    icon: Handshake,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop',
    description: 'Adopting villages to provide holistic development support.',
    longDescription:
      'Under the Village Adoption programme, we select underserved villages and commit to a multi‑year transformation plan. We work with the community to assess needs and priorities – from building roads and schools to setting up health camps and digital literacy centres. Our goal is to make each adopted village self‑sufficient by the end of our engagement, with active community participation and local ownership of all assets created.',
  },
  {
    id: 'water-sanitation',
    title: 'Water & Sanitation',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=800&h=500&fit=crop',
    description: 'Ensuring access to clean drinking water and proper sanitation.',
    longDescription:
      'Access to clean water and proper sanitation is a fundamental right. Our Water & Sanitation projects include installing deep‑bore hand pumps, constructing rainwater harvesting structures, and building individual household toilets. We also conduct hygiene awareness sessions, especially focusing on women and children, to reduce water‑borne diseases and improve overall health outcomes in the villages.',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1574316345009-1c15a0aab7e3?w=800&h=500&fit=crop',
    description: 'Building and improving rural infrastructure.',
    longDescription:
      'We believe that strong infrastructure is the backbone of rural progress. Our infrastructure initiatives range from constructing village community halls and anganwadi centres to laying internal roads and providing solar lighting. These projects not only improve daily life but also create employment opportunities for local labourers and masons, boosting the local economy.',
  },
  {
    id: 'community-development',
    title: 'Community Development',
    icon: Trees,
    image: '/P1039322.JPG',
    description: 'Empowering communities through capacity building.',
    longDescription:
      'True development happens when communities lead it. Our Community Development efforts focus on capacity building – training community members in participatory planning, financial literacy, and local governance. We facilitate the formation of village development committees and help them access government schemes and funds. This ensures that the village itself becomes the driver of its own progress.',
  },
];

export default function RuralDevelopment() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--navbar-height, 80px)' }}>
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-[58vh] sm:min-h-[68vh] lg:min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#78350F]">
        <div className="absolute inset-0 z-0">
          <img
            src="/ruraldevelopment.jpeg"
            alt="Rural Development"
            className="w-full h-full object-cover object-top transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--navbar-height,70px)+1.75rem)] sm:pt-[calc(var(--navbar-height,70px)+2.5rem)] pb-12 sm:pb-16 text-center text-white">
          <div className="gsap-hero-title inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 text-[#F59E0B]">
            <MapPin className="w-4 h-4" />
            <span>Rural Development</span>
          </div>

          <h1 className="gsap-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto mb-6">
            Building Better Villages,<br />
            <span className="text-[#F59E0B]">Together.</span>
          </h1>

          <p className="gsap-hero-title text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            Holistic village adoption, clean drinking water installations, infrastructure development, and self-reliant grassroots growth across India.
          </p>

          <div className="gsap-hero-title flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#78350F] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all hover:scale-105 text-sm sm:text-base cursor-pointer"
            >
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <span>Adopt / Support A Village</span>
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-full border border-white/30 hover:bg-white/20 transition-all text-sm sm:text-base cursor-pointer"
            >
              <span>Become a Volunteer</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY RURAL DEVELOPMENT ===== */}
      <section className="py-20 sm:py-28 bg-[#FFFBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#D97706] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Why Rural Development
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#78350F] tracking-tight mb-6">
              Strengthening the roots of our nation
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Rural communities are the backbone of India. We work to improve infrastructure, provide clean water, and create sustainable livelihoods.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Empower communities',
                desc: 'Build self‑reliant villages through participatory development and local leadership.'
              },
              {
                icon: Award,
                title: 'Improve quality of life',
                desc: 'Provide clean water, sanitation, healthcare, and education to rural families.'
              },
              {
                icon: Users,
                title: 'Create livelihoods',
                desc: 'Promote sustainable agriculture, skill development, and small‑scale enterprises.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-[#D97706]/15 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFFBEB] border border-[#D97706]/20 flex items-center justify-center text-[#D97706] mb-6 group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#78350F] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#78350F] text-white font-bold px-9 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm sm:text-base cursor-pointer"
            >
              <span>Support Rural Livelihoods</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUB-CATEGORIES SHOWCASE ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-[#D97706] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Key Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#78350F] tracking-tight">
              Our Rural Development Initiatives
            </h2>
          </div>

          {subCategories.map((sub, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = sub.icon;

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="absolute -inset-3 bg-[#FFFBEB] rounded-[2.5rem] transform -rotate-1 pointer-events-none" />
                  <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] border-4 border-white group">
                    <img
                      src={sub.image}
                      alt={sub.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-5 left-5 text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D97706] flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg drop-shadow">{sub.title}</span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-5 text-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#D97706] font-mono text-xs font-bold uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.title}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#78350F] tracking-tight">
                    {sub.title}
                  </h3>

                  <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed">
                    {sub.description}
                  </p>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                    {sub.longDescription}
                  </p>


                </div>
              </motion.div>
            );
          })}
        </div>
      </section>



      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 bg-[#78350F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest uppercase mb-6 text-[#F59E0B]">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Make a Difference?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Empower a village, transform a community
            </h2>

            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Your support helps build infrastructure, provide clean water, and create livelihoods in rural areas.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate"
                className="bg-[#F59E0B] hover:bg-white text-[#78350F] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base cursor-pointer"
              >
                Donate for Rural Development
              </Link>
              <Link
                to="/volunteer"
                className="bg-white/10 backdrop-blur-md text-white font-semibold px-10 py-4 rounded-full border border-white/30 hover:bg-white/20 transition-all text-sm sm:text-base cursor-pointer"
              >
                Become a Volunteer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
