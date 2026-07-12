import React from 'react';
import { motion } from 'framer-motion';
import { Play, MapPin, Users, Target, Award, BookOpen, ChevronRight } from 'lucide-react';

export default function Education() {
  return (
    <div className="min-h-screen bg-white pt-8 pb-16">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2147] to-[#1a3a6b] py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFF314] opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFF314] opacity-5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[#FFF314] font-mono text-sm tracking-widest uppercase font-bold mb-4 border-l-4 border-[#FFF314] pl-4">
                Education & Skill Development
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Building leaders <br />
                <span className="text-[#FFF314]">in our classrooms</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                Every child deserves a chance to learn, grow, and dream. We provide access to quality education and holistic development.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#FFF314] text-[#0a1628] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                  Register Now
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                  <Play className="w-5 h-5 fill-white" />
                  Watch the Video
                </button>
              </div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=80"
                  alt="Students learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
                <div className="bg-[#FFF314] rounded-full p-3">
                  <Users className="w-6 h-6 text-[#0a1628]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0a1628]">5800+</p>
                  <p className="text-sm text-gray-500">Alumni across the world</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JOIN A MOVEMENT ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-[#0056B3] font-mono text-sm tracking-widest uppercase font-bold mb-4">
              Join a movement
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Become part of a movement of <span className="text-[#0056B3]">5500+ Alumni</span> across India
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Find lifelong partners in this work. Don't just talk about the India you envision. Build an India free of poverty and filled with love.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Target,
                title: 'Find your purpose',
                desc: 'Develop an awareness of how poverty and inequity impacts children in India; and your role in it.'
              },
              {
                icon: Award,
                title: 'Become a leader',
                desc: 'Build concrete leadership skills such as stakeholder management, planning, envisioning, execution and reflection in challenging environments.'
              },
              {
                icon: Users,
                title: 'Join a movement',
                desc: 'Become part of a movement of 5500+ Alumni across India and countless more globally.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-[#0056B3]/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-[#0056B3]" />
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
            <button className="bg-[#0056B3] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2">
              Register Now
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY BE A FELLOW ===== */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-block text-[#0056B3] font-mono text-sm tracking-widest uppercase font-bold mb-4">
                Why Be a Fellow
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0a1628] mb-6">
                The Fellowship will teach you the skills to be a leader
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Steer India's transformational journey. Develop an awareness of how poverty and inequity impacts children in India; and your role in it.
              </p>
              <div className="space-y-4">
                {[
                  'Build concrete leadership skills in challenging environments',
                  'Learn stakeholder management, planning and execution',
                  'Develop reflection and envisioning capabilities'
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-[#FFF314] rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-[#0a1628] rounded-full" />
                    </div>
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&h=600&fit=crop&q=80"
                alt="Students in classroom"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-mono">📸 Building leaders in our classrooms</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHERE YOU WILL TEACH ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block text-[#0056B3] font-mono text-sm tracking-widest uppercase font-bold mb-4">
              Where You Will Teach
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Teach in India's most <span className="text-[#0056B3]">underserved classrooms</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: '🏫',
                title: 'Full-time Teacher',
                desc: 'Placed in an English medium government or affordable private school'
              },
              {
                icon: '📍',
                title: '9 Cities',
                desc: 'Ahmedabad, Bengaluru, Chennai, Delhi, Gurgaon, Hyderabad, Kolkata, Mumbai or Pune'
              },
              {
                icon: '👨‍🏫',
                title: 'Grades 1-10',
                desc: 'Teach between 40 and 80 students in your classroom'
              },
              {
                icon: '📖',
                title: 'Class or Subject Teacher',
                desc: 'Teach all subjects or specialize in English, Maths, Social Studies or Science'
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Cities Map visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#0a1628] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Teach across 9 cities</h3>
                <p className="text-white/70">Join a diverse community of educators across India</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Ahmedabad', 'Bengaluru', 'Chennai', 'Delhi', 'Gurgaon', 'Hyderabad', 'Kolkata', 'Mumbai', 'Pune'].map((city) => (
                  <span key={city} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/10">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT YOU DO (Journey of a Fellow) ===== */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block text-[#0056B3] font-mono text-sm tracking-widest uppercase font-bold mb-4">
              Journey of a Fellow
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0a1628] mb-6">
              One Fellowship. <span className="text-[#0056B3]">Infinite impact.</span>
            </h2>
            <p className="text-gray-600 text-lg">Start your journey with Teach For India</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Video */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-[#0a1628] group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=450&fit=crop&q=80"
                alt="Fellowship journey"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-[#FFF314] rounded-full p-5 shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#0a1628] fill-[#0a1628]" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-mono">🎬 Teach For India: Journey of a Fellow</p>
              </div>
            </motion.div>

            {/* Right: Steps */}
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
                  title: 'Residential Training Institute',
                  desc: 'Learn the skills and mindsets to be teachers equipped to teach in an innovative, reimagined way.'
                },
                {
                  num: '02',
                  title: 'Full-time Teaching Placement',
                  desc: 'Placed as a full-time teacher in a school that serves students from low-income communities.'
                },
                {
                  num: '03',
                  title: 'Learn through Experiences',
                  desc: 'Reflect on your experiences alongside peers and your Program Manager.'
                },
                {
                  num: '04',
                  title: 'Summer Internship',
                  desc: 'After your first year, explore a new dimension of educational equity.'
                },
                {
                  num: '05',
                  title: 'Be The Change Project',
                  desc: 'Build entrepreneurial skills and engage with a career fair to find a job at the intersection of your purpose and passion.'
                }
              ].map((step, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-start gap-4">
                  <span className="font-mono text-2xl font-bold text-[#0056B3] min-w-[50px]">{step.num}</span>
                  <div>
                    <h4 className="font-bold text-[#0a1628]">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-20 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to make a <span className="text-[#FFF314]">difference?</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Join 5800+ Alumni across the world as we build an India free of poverty and filled with love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#FFF314] text-[#0a1628] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2">
                Register Now
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white font-bold px-10 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
