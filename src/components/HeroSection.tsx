import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-hero">
      {/* Background Effects */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald/10 blur-[120px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gold/10 blur-[100px] animate-float-slower pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy/5 border border-navy/10 text-navy font-bold font-mono text-xs uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            Empowering Communities Globally
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-navy leading-[1.05]"
          >
            Together We Can Build A <span className="text-gold">Better World</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg md:text-xl text-navy/70 max-w-2xl leading-relaxed font-light"
          >
            We are dedicated to creating sustainable impact through grassroots education, comprehensive healthcare, and community-led environmental initiatives.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald text-white px-8 py-4 rounded-full font-bold hover:bg-navy transition-colors duration-300 shadow-lg shadow-emerald/20 hover-lift"
            >
              Donate Now <Heart size={18} />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-navy border border-navy/20 hover:bg-navy/5 transition-colors duration-300"
            >
              Get Involved
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
