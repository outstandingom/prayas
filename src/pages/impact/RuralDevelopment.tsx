import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Sparkles, Target, Award, Users, MapPin, GraduationCap, BookOpen } from 'lucide-react';

export default function RuralDevelopment() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION – SINGLE FULL-SCREEN IMAGE ===== */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.ibb.co/WN2LLm4L/IMG-20191115-115817.jpg')`,
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Centered content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-[#B45309]/80 px-4 py-1.5 rounded-full text-sm font-mono tracking-widest uppercase mb-6">
              Rural Development
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Building <span className="text-[#FEF3C7]">Stronger Villages</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
              Infrastructure, clean water, and livelihood programs for rural communities.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#FEF3C7] text-[#78350F] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Involved
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
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

      {/* ===== YOUR JOURNEY ===== */}
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
              Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#78350F] mb-4">
              One Mission. <span className="text-[#B45309]">Infinite impact.</span>
            </h2>
            <p className="text-gray-600 text-lg">Start your journey with us</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video placeholder – gradient, no image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gradient-to-br from-[#78350F] to-[#B45309] group cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 text-center">
                <div className="bg-[#FEF3C7] rounded-full p-5 shadow-2xl hover:scale-110 transition-transform inline-block">
                  <Play className="w-8 h-8 text-[#78350F] fill-[#78350F]" />
                </div>
                <p className="text-white text-sm font-mono mt-4 opacity-80">Watch our journey</p>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                {
                  num: '01',
                  title: 'Community Assessment',
                  desc: 'Understand the needs and priorities of the village community.'
                },
                {
                  num: '02',
                  title: 'Infrastructure Projects',
                  desc: 'Build roads, water systems, and community centres.'
                },
                {
                  num: '03',
                  title: 'Skill Development',
                  desc: 'Train youth and women in sustainable livelihoods.'
                },
                {
                  num: '04',
                  title: 'Health & Sanitation',
                  desc: 'Set up health camps and clean water facilities.'
                },
                {
                  num: '05',
                  title: 'Empowerment & Leadership',
                  desc: 'Develop local leaders to ensure long‑term sustainability.'
                }
              ].map((step, i) => (
                <div key={i} className="group bg-[#FEF3C7] p-5 rounded-xl border border-[#B45309]/20 hover:shadow-md transition-all flex items-start gap-4 hover:border-[#B45309]">
                  <span className="font-mono text-xl font-bold text-[#B45309] min-w-[44px]">{step.num}</span>
                  <div>
                    <h4 className="font-bold text-[#78350F] group-hover:text-[#B45309] transition-colors">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT ===== */}
      <section className="py-20 md:py-28 bg-[#FEF3C7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#B45309] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Join the Movement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#78350F] mb-6">
              Be part of a growing community of changemakers
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Help us build stronger villages and create lasting change in rural India.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-[#B45309] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Join Us
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#B45309] font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-[#B45309]/30 text-sm sm:text-base">
                Learn More
              </button>
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
