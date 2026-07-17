import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Target, Award, Users, MapPin, GraduationCap, BookOpen, Handshake, Droplets, Building, Trees } from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop',
    description: 'Empowering communities through capacity building.',
    longDescription:
      'True development happens when communities lead it. Our Community Development efforts focus on capacity building – training community members in participatory planning, financial literacy, and local governance. We facilitate the formation of village development committees and help them access government schemes and funds. This ensures that the village itself becomes the driver of its own progress.',
  },
];

export default function RuralDevelopment() {
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--navbar-height, 100px)' }}>
      
      {/* ===== HERO – using <img> for sharper quality ===== */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src="https://i.ibb.co/1tJR31YR/Whats-App-Image-2026-07-17-at-5-00-16-PM.jpg"
          alt="Rural Development"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
        <h1 className="absolute top-6 right-6 sm:top-12 sm:right-12 z-10 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          Building Better Villages, Together
        </h1>
      </section>

      {/* ===== WHY RURAL DEVELOPMENT ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#B45309] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Why Rural Development
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#78350F] mb-6">
              Strengthening the roots of our nation
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Rural communities are the backbone of India. We work to improve infrastructure, provide clean water, and create sustainable livelihoods.
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
              <div key={i} className="group bg-[#FEF3C7] p-8 rounded-2xl border border-[#B45309]/20 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-[#B45309]/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#B45309]/20 transition-colors">
                  <item.icon className="w-7 h-7 text-[#B45309]" />
                </div>
                <h3 className="text-xl font-bold text-[#78350F] mb-3">{item.title}</h3>
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
            <button className="bg-[#B45309] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
              Join the Movement
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== SUB‑CATEGORIES ===== */}
      {subCategories.map((sub, index) => (
        <section key={sub.id} className="py-20 md:py-28 even:bg-[#FEF3C7] odd:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full">
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="bg-[#B45309]/80 inline-block p-2 rounded-full mb-2">
                    <sub.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">{sub.title}</h3>
                </div>
              </div>

              <div>
                <span className="inline-block text-[#B45309] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-2">
                  {sub.title}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#78350F] mb-4">
                  {sub.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  {sub.description}
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  {sub.longDescription}
                </p>
                <button className="mt-6 bg-[#B45309] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ===== WHERE WE WORK ===== */}
      <section className="py-20 md:py-28 bg-[#FEF3C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#B45309] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Where We Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#78350F] mb-6">
              Making an impact in <span className="text-[#B45309]">rural communities</span>
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
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Education',
                desc: 'Building schools and supporting rural education.'
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: 'Infrastructure',
                desc: 'Roads, community centres, and solar lighting.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Livelihood',
                desc: 'Skill development and micro‑enterprise support.'
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Health & Water',
                desc: 'Clean water, sanitation, and health camps.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#B45309]/20 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="text-[#B45309] mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#78350F] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#78350F] rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Working across 5 states</h3>
                <p className="text-white/60 text-sm">From remote villages to semi‑urban areas</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh', 'Odisha'].map((state) => (
                  <span key={state} className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-white/10">
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 md:py-28 bg-[#78350F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#FEF3C7]" />
              <span className="text-[#FEF3C7] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                Ready to Make a Difference?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Empower a village, transform a community
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Your support helps build infrastructure, provide clean water, and create livelihoods in rural areas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#FEF3C7] text-[#78350F] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
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
