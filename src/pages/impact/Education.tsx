import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Target, Award, ChevronRight, MapPin, GraduationCap, BookOpen, Shield, Sparkles } from 'lucide-react';

export default function Education() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2147] to-[#1a3a6b] py-20 md:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFF314] opacity-[0.08] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFF314] opacity-[0.08] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-0.5 bg-[#FFF314]" />
                <span className="text-[#FFF314] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                  Education & Skill Development
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                Building leaders
                <br />
                <span className="text-[#FFF314]">in our classrooms</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                Every child deserves a chance to learn, grow, and dream. We provide access to quality education and holistic development.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#FFF314] text-[#0a1628] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 text-sm sm:text-base">
                  Register Now
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 text-sm sm:text-base">
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
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=80"
                  alt="Students learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-4">
                <div className="bg-[#FFF314] rounded-full p-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a1628]" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#0a1628]">5800+</p>
                  <p className="text-xs sm:text-sm text-gray-500">Alumni worldwide</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WHY BE A FELLOW ===== */}
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
              Why Be a Fellow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              The Fellowship will teach you the skills to be a leader
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Steer India's transformational journey. Develop an awareness of how poverty and inequity impacts children in India; and your role in it.
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
              <div key={i} className="group bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-[#0056B3]/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#0056B3]/20 transition-colors">
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
            <button className="bg-[#0056B3] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
              Register Now
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHERE YOU WILL TEACH ===== */}
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
              Where You Will Teach
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Teach in India's most <span className="text-[#0056B3]">underserved classrooms</span>
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
                title: 'Full-time Teacher',
                desc: 'Placed in an English medium government or affordable private school'
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: '9 Cities',
                desc: 'Ahmedabad, Bengaluru, Chennai, Delhi, Gurgaon, Hyderabad, Kolkata, Mumbai or Pune'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Grades 1-10',
                desc: 'Teach between 40 and 80 students in your classroom'
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Class or Subject Teacher',
                desc: 'Teach all subjects or specialize in English, Maths, Social Studies or Science'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="text-[#0056B3] mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Cities visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#0a1628] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Teach across 9 cities</h3>
                <p className="text-white/60 text-sm">Join a diverse community of educators across India</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Ahmedabad', 'Bengaluru', 'Chennai', 'Delhi', 'Gurgaon', 'Hyderabad', 'Kolkata', 'Mumbai', 'Pune'].map((city) => (
                  <span key={city} className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-white/10">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== JOURNEY OF A FELLOW ===== */}
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
              Journey of a Fellow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-4">
              One Fellowship. <span className="text-[#0056B3]">Infinite impact.</span>
            </h2>
            <p className="text-gray-600 text-lg">Start your journey with Teach For India</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-[#0a1628] group cursor-pointer"
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
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-xs font-mono opacity-80">🎬 Teach For India: Journey of a Fellow</p>
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

      {/* ===== JOIN A MOVEMENT ===== */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Join a Movement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Become part of a movement of <span className="text-[#0056B3]">5500+ Alumni</span> across India
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Find lifelong partners in this work. Don't just talk about the India you envision. Build an India free of poverty and filled with love.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-[#0056B3] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Register Now
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#0056B3] font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-[#0056B3]/20 text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
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
              Join 5800+ Alumni across the world
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Build an India free of poverty and filled with love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#FFF314] text-[#0a1628] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Register Now
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white font-bold px-10 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
