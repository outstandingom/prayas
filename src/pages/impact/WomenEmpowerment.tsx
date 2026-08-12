import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  Heart,
  ArrowUpRight,
  Scissors,
  Users,
  Briefcase,
  Home,
  ShoppingBag,
  Shield,
  Award,
  CircleDollarSign
} from 'lucide-react';
import gsap from 'gsap';

const subCategories = [
  {
    id: 'sabji-wali-didi',
    title: 'Sabji Wali Didi',
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
    description: 'Empowering women vegetable vendors with financial literacy and market access.',
    longDescription:
      'The Sabji Wali Didi programme supports women who sell vegetables in local markets. We provide them with financial literacy training, access to micro‑credit, and linkages to better supply chains. They learn to manage their earnings, invest in quality produce, and build a loyal customer base. This initiative has helped hundreds of women double their daily income and gain respect in their communities.',
  },
  {
    id: 'sewing-centres',
    title: 'Sewing Centres',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
    description: 'Vocational training in tailoring and garment‑making for economic independence.',
    longDescription:
      'Our Sewing Centres are equipped with modern machines and staffed by experienced instructors. We offer a comprehensive 6‑month course covering stitching, cutting, embroidery, and garment finishing. Graduates start their own tailoring businesses or find employment in local garment factories. Many trainees become master trainers themselves, creating a multiplier effect that empowers even more women.',
  },
  {
    id: 'shgs',
    title: 'SHGs (Self Help Groups)',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop',
    description: 'Forming and strengthening women self‑help groups for collective action and savings.',
    longDescription:
      'Self‑Help Groups are the cornerstone of our women empowerment strategy. We facilitate the formation of SHGs, train them in bookkeeping, micro‑savings, and inter‑lending. We link SHGs to formal banking institutions and government schemes. Beyond finances, SHGs become platforms for women to discuss social issues, health, and legal rights, fostering solidarity and collective action.',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop',
    description: 'Supporting women to start and scale their own businesses.',
    longDescription:
      'Our Entrepreneurship programme guides women through the entire business lifecycle – from ideation to scaling. We offer mentoring, business plan development, access to seed funding, and connections to markets. We focus on sectors where women have a natural advantage, such as food processing, handicrafts, and beauty services. Many of our entrepreneurs now run successful enterprises and employ other women in their communities.',
  },
  {
    id: 'grah-udyog',
    title: 'Grah Udyog',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
    description: 'Promoting home‑based industries for sustainable livelihoods.',
    longDescription:
      'Grah Udyog supports women to start home‑based enterprises – from pickle making and papad rolling to agarbatti (incense stick) production and handloom weaving. We provide initial raw materials, design training, and market linkages. Our aim is to create sustainable, flexible income opportunities that allow women to work from home while managing their household responsibilities.',
  },
];

export default function WomenEmpowerment() {
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
      <section ref={heroRef} className="relative min-h-[58vh] sm:min-h-[68vh] lg:min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#881337]">
        <div className="absolute inset-0 z-0">
          <img
            src="/women-empowerment-hero.jpg"
            alt="Women Empowerment"
            className="w-full h-full object-cover object-center sm:object-[center_25%] transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--navbar-height,70px)+3.25rem)] sm:pt-[calc(var(--navbar-height,70px)+4rem)] pb-16 sm:pb-20 text-center text-white">
          <div className="gsap-hero-title inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 text-[#FFF314]">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>Women Empowerment & Livelihood</span>
          </div>

          <h1 className="gsap-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto mb-6">
            Empowering Women's Potential,<br />
            <span className="text-[#FFF314]">Shaping a Better World.</span>
          </h1>

          <p className="gsap-hero-title text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            Fostering female leadership through vocational sewing centers, Sabji Wali Didi micro‑entrepreneurship, Grah Udyog, and Self‑Help Group financial freedom.
          </p>

          <div className="gsap-hero-title flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#FFF314] text-[#881337] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all hover:scale-105 text-sm sm:text-base cursor-pointer"
            >
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <span>Empower A Woman Today</span>
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

      {/* ===== WHY WOMEN EMPOWERMENT ===== */}
      <section className="py-20 sm:py-28 bg-[#FFF1F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#DC2626] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#881337] tracking-tight mb-6">
              How we empower women
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              When a woman is financially independent, her entire family and community thrive. We build pathways to sustainable income and leadership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CircleDollarSign,
                title: 'Financial Independence',
                desc: 'Micro-credit, savings, and bank linkages to build economic confidence and security.'
              },
              {
                icon: Award,
                title: 'Skill Mastery',
                desc: 'Hands-on training in tailoring, micro-enterprises, and home-based production.'
              },
              {
                icon: Shield,
                title: 'Community Leadership',
                desc: 'Empowering women to lead Self-Help Groups and drive positive local change.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-[#DC2626]/15 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF1F2] border border-[#DC2626]/20 flex items-center justify-center text-[#DC2626] mb-6 group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#881337] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#881337] text-white font-bold px-9 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm sm:text-base cursor-pointer"
            >
              <span>Support Women Entrepreneurs</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUB-CATEGORIES SHOWCASE ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-[#DC2626] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Key Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#881337] tracking-tight">
              Women Livelihood Programmes
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
                  <div className="absolute -inset-3 bg-[#FFF1F2] rounded-[2.5rem] transform -rotate-1 pointer-events-none" />
                  <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] border-4 border-white group">
                    <img
                      src={sub.image}
                      alt={sub.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-5 left-5 text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DC2626] flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg drop-shadow">{sub.title}</span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-5 text-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1F2] text-[#DC2626] font-mono text-xs font-bold uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.title}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#881337] tracking-tight">
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
      <section className="py-20 sm:py-28 bg-[#881337] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest uppercase mb-6 text-[#FFF314]">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Make a Difference?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Empower a woman, elevate a generation
            </h2>

            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Your contribution sponsors vocational sewing centers, micro-credit seed funds, and women entrepreneurship tools.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate"
                className="bg-[#FFF314] hover:bg-white text-[#881337] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base cursor-pointer"
              >
                Empower A Woman Today
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
