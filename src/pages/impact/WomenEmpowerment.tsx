import React from 'react'
import { motion } from 'framer-motion'
import { Play, ChevronRight, Sparkles, Users, Heart, Target } from 'lucide-react'

export default function WomenEmpowerment() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* ===== HERO SECTION – SINGLE BACKGROUND IMAGE ===== */}
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

      {/* ===== WHY JOIN US ===== */}
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

      {/* ===== WHERE WE WORK ===== */}
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
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-4">
              One Programme. <span className="text-[#0056B3]">Infinite possibilities.</span>
            </h2>
            <p className="text-gray-600 text-lg">Start your journey with us</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gradient-to-br from-[#0a1628] to-[#1a3a6b] group cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 text-center">
                <div className="bg-[#FFF314] rounded-full p-5 shadow-2xl hover:scale-110 transition-transform inline-block">
                  <Play className="w-8 h-8 text-[#0a1628] fill-[#0a1628]" />
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
                  title: 'Skill Assessment',
                  desc: 'Identify strengths and interests to match with suitable training.'
                },
                {
                  num: '02',
                  title: 'Vocational Training',
                  desc: 'Hands‑on workshops in tailoring, computing, food processing, and more.'
                },
                {
                  num: '03',
                  title: 'Financial Literacy',
                  desc: 'Learn to manage money, access credit, and build savings.'
                },
                {
                  num: '04',
                  title: 'Market Linkages',
                  desc: 'Connect with buyers, cooperatives, and online platforms to sell products.'
                },
                {
                  num: '05',
                  title: 'Leadership & Advocacy',
                  desc: 'Become a community leader and advocate for women’s rights.'
                }
              ].map((step, i) => (
                <div key={i} className="group bg-[#F8FAFC] p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all flex items-start gap-4 hover:border-[#0056B3]/20">
                  <span className="font-mono text-xl font-bold text-[#0056B3] min-w-[44px]">{step.num}</span>
                  <div>
                    <h4 className="font-bold text-[#0a1628] group-hover:text-[#0056B3] transition-colors">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT ===== */}
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

      {/* ===== FINAL CTA ===== */}
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
  )
}
