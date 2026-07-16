import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Sparkles, Users, Heart, Target, Scissors, Users2, Factory, ShoppingBag, Home } from 'lucide-react';

// Sub‑category data (matches the items in OurWork → Women Empowerment)
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
    icon: Users2,
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop',
    description: 'Forming and strengthening women self‑help groups for collective action and savings.',
    longDescription:
      'Self‑Help Groups are the cornerstone of our women empowerment strategy. We facilitate the formation of SHGs, train them in bookkeeping, micro‑savings, and inter‑lending. We link SHGs to formal banking institutions and government schemes. Beyond finances, SHGs become platforms for women to discuss social issues, health, and legal rights, fostering solidarity and collective action.',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    icon: Factory,
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
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--navbar-height, 100px)' }}>
      
      {/* ===== MAIN HERO – Women Empowerment ===== */}
      <section className="relative overflow-hidden bg-[#0a1628] min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1920&q=80"
            alt="Women empowerment background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#FFF314] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-6">
              Women Empowerment & Livelihood
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Empowering women
              <br />
              <span className="text-[#FFF314]">to lead and thrive</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Through skill development, financial independence, and collective action, we help women build sustainable livelihoods and shape their own futures.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#FFF314] text-[#0a1628] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 text-sm sm:text-base">
                Get Involved
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 text-sm sm:text-base">
                <Play className="w-5 h-5 fill-white" />
                Watch the Video
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY JOIN US (unchanged) ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Why Women Empowerment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Investing in women transforms communities
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              When women are empowered, they reinvest in their families, educate their children, and drive economic growth. Join us to make a lasting difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Build skills for life',
                desc: 'Learn vocational trades, financial literacy, and leadership abilities that open doors to economic independence.'
              },
              {
                title: 'Create lasting impact',
                desc: 'Support women to become entrepreneurs, community leaders, and role models for the next generation.'
              },
              {
                title: 'Join a sisterhood',
                desc: 'Become part of a network of strong, supportive women who uplift each other and drive collective progress.'
              }
            ].map((item, i) => (
              <div key={i} className="group bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-[#0056B3]/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#0056B3]/20 transition-colors">
                  <span className="text-2xl font-bold text-[#0056B3]">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button className="bg-[#0056B3] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
              Join the Movement
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== SUB‑CATEGORIES – each with hero + content ===== */}
      {subCategories.map((sub, index) => (
        <section key={sub.id} className="py-20 md:py-28 even:bg-[#F8FAFC] odd:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Hero Image (left) */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full">
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="bg-[#0056B3]/80 inline-block p-2 rounded-full mb-2">
                    <sub.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">{sub.title}</h3>
                </div>
              </div>

              {/* Content (right) */}
              <div>
                <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-2">
                  {sub.title}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4">
                  {sub.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  {sub.description}
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  {sub.longDescription}
                </p>
                <button className="mt-6 bg-[#0056B3] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ===== WHERE WE WORK (unchanged) ===== */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Where We Empower
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Making an impact in <span className="text-[#0056B3]">rural and urban communities</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: 'Self-Help Groups',
                desc: 'Women come together to save, lend, and support each other.'
              },
              {
                title: 'Vocational Training',
                desc: 'Tailoring, food processing, and computer courses.'
              },
              {
                title: 'Micro-Entrepreneurship',
                desc: 'Start and scale home‑based businesses.'
              },
              {
                title: 'Leadership Development',
                desc: 'Train women to lead in local governance and community decisions.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="text-4xl mb-4">👩‍💼</div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#0a1628] rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Empowering women across 9 states</h3>
                <p className="text-white/60 text-sm">From rural villages to urban centers</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Bihar', 'Uttar Pradesh', 'Rajasthan', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'West Bengal', 'Odisha', 'Assam'].map((state) => (
                  <span key={state} className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-white/10">
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT (unchanged) ===== */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Join the Movement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Be part of a growing community of changemakers
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Connect with women who are breaking barriers and building a better future for themselves and their communities.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-[#0056B3] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Apply Now
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#0056B3] font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-[#0056B3]/20 text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA (unchanged) ===== */}
      <section className="py-20 md:py-28 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#FFF314]" />
              <span className="text-[#FFF314] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                Ready to Make a Difference?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Empower a woman, transform a community
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Your support creates opportunities for women to achieve economic independence and become leaders.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#FFF314] text-[#0a1628] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white font-bold px-10 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
