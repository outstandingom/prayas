import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Heart, Shield, Users, Award } from 'lucide-react'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy via-navy/95 to-[#0a1628]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-repeat" />
      </div>

      {/* Floating Glow Effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#205D24]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#205D24]/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#205D24]/20 border border-[#205D24]/30 backdrop-blur-sm"
            >
              <Shield size={16} className="text-[#4CAF50]" />
              <span className="text-xs font-semibold text-[#4CAF50] uppercase tracking-wider">
                Trusted NGO Since 2010
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
            >
              Empowering Lives,
              <br />
              <span className="bg-gradient-to-r from-[#4CAF50] via-[#205D24] to-[#4CAF50] bg-clip-text text-transparent">
                Building Futures
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg text-white/70 leading-relaxed max-w-lg"
            >
              Join us in our mission to create lasting change through education, 
              healthcare, and community development across India.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/donate"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#205D24] hover:bg-[#2a7a2f] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#205D24]/30"
              >
                <Heart size={20} />
                Donate Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-[#4CAF50] text-white font-semibold rounded-full transition-all duration-300 hover:bg-[#205D24]/10"
              >
                Explore Programs
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-wrap gap-8 pt-4"
            >
              {[
                { icon: Users, value: '25K+', label: 'Lives Impacted' },
                { icon: Heart, value: '350+', label: 'Projects' },
                { icon: Award, value: '27+', label: 'States' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#205D24]/20">
                    <stat.icon size={20} className="text-[#4CAF50]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#205D24]/20">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
                alt="Prayas NGO Impact"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              
              {/* Play Button Overlay */}
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#205D24] hover:bg-[#2a7a2f] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-[#205D24]/30 group">
                <Play size={24} className="text-white fill-white ml-1" />
              </button>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#205D24] to-[#2a7a2f] border-2 border-white/20" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#205D24] to-[#2a7a2f] border-2 border-white/20" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#205D24] to-[#2a7a2f] border-2 border-white/20" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">200+ Volunteers</p>
                  <p className="text-white/60 text-xs">Active across India</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Social Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-6"
      >
        <a href="#" className="text-white/40 hover:text-[#4CAF50] transition-colors">
          <FaFacebook size={20} />
        </a>
        <a href="#" className="text-white/40 hover:text-[#4CAF50] transition-colors">
          <FaInstagram size={20} />
        </a>
        <a href="#" className="text-white/40 hover:text-[#4CAF50] transition-colors">
          <FaYoutube size={20} />
        </a>
        <a href="#" className="text-white/40 hover:text-[#4CAF50] transition-colors">
          <FaTwitter size={20} />
        </a>
      </motion.div>
    </section>
  )
}
