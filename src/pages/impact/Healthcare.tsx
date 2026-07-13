import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Sparkles, Target, Award, Users, HeartPulse, Stethoscope, Heart, Baby, UsersRound } from 'lucide-react';

export default function Healthcare() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION – FULL SCREEN IMAGE ===== */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-[#0D9488]/80 px-4 py-1.5 rounded-full text-sm font-mono tracking-widest uppercase mb-6">
              Health & Social Welfare
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Healing <span className="text-[#CCFBF1]">Communities</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
              Free medical camps, health awareness, and essential care for underserved communities.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#CCFBF1] text-[#0F766E] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Fund a Medical Camp
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY HEALTH & SOCIAL WELFARE ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Why Health & Social Welfare
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F766E] mb-6">
              Health is the foundation of a prosperous society
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We deliver preventive, curative, and promotive healthcare to those who need it most – through camps, awareness drives, and community‑based support.
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
                title: 'Preventive Care',
                desc: 'Organise health camps, vaccination drives, and hygiene awareness to stop diseases before they start.'
              },
              {
                icon: Award,
                title: 'Curative Services',
                desc: 'Provide free check‑ups, medicines, and referrals to ensure timely treatment for all.'
              },
              {
                icon: Users,
                title: 'Promotive Health',
                desc: 'Empower communities with knowledge on nutrition, mental health, and healthy living.'
              }
            ].map((item, i) => (
              <div key={i} className="group bg-[#F0FDF4] p-8 rounded-2xl border border-[#0D9488]/20 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-[#0D9488]/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#0D9488]/20 transition-colors">
                  <item.icon className="w-7 h-7 text-[#0D9488]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F766E] mb-3">{item.title}</h3>
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
            <button className="bg-[#0D9488] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
              Join the Movement
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHERE WE WORK ===== */}
      <section className="py-20 md:py-28 bg-[#F0FDF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Our Key Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F766E] mb-6">
              Delivering care <span className="text-[#0D9488]">across the spectrum</span>
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
                icon: <HeartPulse className="w-8 h-8" />,
                title: 'Organ Donation',
                desc: 'Raising awareness and facilitating life‑saving transplants.'
              },
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: 'Health Camps',
                desc: 'Free check‑ups, medicines, and specialist consultations.'
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Elderly Care',
                desc: 'Companionship, health checks, and support for senior citizens.'
              },
              {
                icon: <Baby className="w-8 h-8" />,
                title: 'Child Welfare',
                desc: 'Nutrition, immunisation, and early childhood development.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#0D9488]/20 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="text-[#0D9488] mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#0F766E] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#0F766E] rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Serving communities across 6 states</h3>
                <p className="text-white/60 text-sm">From urban slums to remote villages</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh', 'Odisha', 'Jharkhand'].map((state) => (
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
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F766E] mb-4">
              One Mission. <span className="text-[#0D9488]">Infinite impact.</span>
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
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gradient-to-br from-[#0F766E] to-[#0D9488] group cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 text-center">
                <div className="bg-[#F0FDF4] rounded-full p-5 shadow-2xl hover:scale-110 transition-transform inline-block">
                  <Play className="w-8 h-8 text-[#0F766E] fill-[#0F766E]" />
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
                  title: 'Community Outreach',
                  desc: 'Identify health needs through local partnerships and surveys.'
                },
                {
                  num: '02',
                  title: 'Health Camps',
                  desc: 'Organise free medical camps with specialists and medicines.'
                },
                {
                  num: '03',
                  title: 'Awareness Drives',
                  desc: 'Educate communities on hygiene, nutrition, and disease prevention.'
                },
                {
                  num: '04',
                  title: 'Follow-up & Referral',
                  desc: 'Link patients to hospitals and track their recovery.'
                },
                {
                  num: '05',
                  title: 'Community Empowerment',
                  desc: 'Train local health volunteers to sustain long‑term well‑being.'
                }
              ].map((step, i) => (
                <div key={i} className="group bg-[#F0FDF4] p-5 rounded-xl border border-[#0D9488]/20 hover:shadow-md transition-all flex items-start gap-4 hover:border-[#0D9488]">
                  <span className="font-mono text-xl font-bold text-[#0D9488] min-w-[44px]">{step.num}</span>
                  <div>
                    <h4 className="font-bold text-[#0F766E] group-hover:text-[#0D9488] transition-colors">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT ===== */}
      <section className="py-20 md:py-28 bg-[#F0FDF4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Join the Movement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F766E] mb-6">
              Be part of a growing community of changemakers
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Help us bring healthcare to every doorstep and create a healthier India.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-[#0D9488] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Join Us
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#0D9488] font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-[#0D9488]/30 text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 md:py-28 bg-[#0F766E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#CCFBF1]" />
              <span className="text-[#CCFBF1] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                Ready to Make a Difference?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Heal a life, transform a community
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Your support provides life‑saving medical care and hope to those who need it most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#CCFBF1] text-[#0F766E] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
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
