// src/pages/impact/ProjectSindoda.tsx
import { motion } from 'framer-motion'
import { Leaf, Recycle, Trash2, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectSindoda() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-mono text-sm tracking-widest uppercase font-bold mb-4 block text-[#15803D]">
              Special Initiative
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Project Sindoda
            </h1>
            <h2 className="text-3xl font-bold text-[#15803D] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Plastic Mukti (Plastic Free)
            </h2>
            <p className="text-gray-700 text-lg md:text-xl font-mono mb-8 max-w-md leading-relaxed">
              Our dedicated campaign to transform Sindoda into a completely plastic-free zone. Through community engagement, sustainable alternatives, and rigorous waste management, we are restoring the natural beauty of the region.
            </p>
            
            <Link
              to="/donate?cause=sindoda"
              className="inline-flex items-center gap-2 text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: '#15803D' }}
            >
              Support Project Sindoda <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src="/Sindoda/IMG_20191022_121001 (1).jpg"
                alt="Plastic Free Sindoda"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: `linear-gradient(to top, #15803D40, transparent)` }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Key Initiatives */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#15803D]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Our Action Plan
            </h2>
            <p className="font-mono text-white/80 max-w-2xl mx-auto text-lg">
              The steps we are taking to achieve complete Plastic Mukti in Sindoda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/project-sindoda/learn-more/cleanliness-drives" className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 group block">
              <Trash2 className="w-12 h-12 text-[#FFF314] mb-6" />
              <h3 className="font-display text-2xl font-bold text-white mb-3">Waste Collection</h3>
              <p className="font-mono text-white/80 text-sm leading-relaxed mb-4">
                Organizing massive community-led cleanup drives to remove existing plastic waste from streets and water bodies.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[#FFF314] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/project-sindoda/learn-more/plastic-mukti" className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 group block">
              <Recycle className="w-12 h-12 text-[#FFF314] mb-6" />
              <h3 className="font-display text-2xl font-bold text-white mb-3">Recycling Setup</h3>
              <p className="font-mono text-white/80 text-sm leading-relaxed mb-4">
                Establishing local recycling centers to properly process gathered plastic and prevent it from returning to the environment.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[#FFF314] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/project-sindoda/learn-more/plastic-mukti" className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 group block">
              <Leaf className="w-12 h-12 text-[#FFF314] mb-6" />
              <h3 className="font-display text-2xl font-bold text-white mb-3">Eco-Alternatives</h3>
              <p className="font-mono text-white/80 text-sm leading-relaxed mb-4">
                Distributing cloth bags and biodegradable materials to shopkeepers and residents to replace single-use plastics.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[#FFF314] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/project-sindoda/learn-more/eco-awareness" className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-2 group block">
              <Users className="w-12 h-12 text-[#FFF314] mb-6" />
              <h3 className="font-display text-2xl font-bold text-white mb-3">Awareness</h3>
              <p className="font-mono text-white/80 text-sm leading-relaxed mb-4">
                Conducting door-to-door educational campaigns to teach families about the long-term dangers of plastic pollution.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[#FFF314] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#F1F8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#263238] mb-4">
              Project Gallery
            </h2>
            <p className="font-mono text-[#263238]/70 max-w-2xl mx-auto text-lg">
              Glimpses of our ongoing efforts to make Sindoda plastic-free.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/Sindoda/IMG_20191022_121001 (1).jpg",
              "/Sindoda/IMG_20191030_112427.jpg",
              "/Sindoda/IMG_20191104_162653.jpg",
              "/Sindoda/IMG_20191106_104516.jpg",
              "/Sindoda/IMG_20191106_111020.jpg",
              "/Sindoda/IMG_20191113_121346.jpg",
              "/Sindoda/IMG_20191115_115816.jpg",
              "/Sindoda/IMG_20191115_115817.jpg",
              "/Sindoda/IMG_20191127_112906.jpg",
              "/Sindoda/IMG_20191127_125013.jpg",
              "/Sindoda/IMG_20191213_152317.jpg",
              "/Sindoda/IMG_20191213_152320.jpg",
              "/Sindoda/IMG_20191213_152330.jpg",
              "/Sindoda/IMG_20191217_133958.jpg",
              "/Sindoda/IMG_20191217_134103.jpg",
              "/Sindoda/IMG_20191217_134432.jpg",
              "/Sindoda/IMG_20191217_140306.jpg",
              "/Sindoda/IMG_20191217_144413.jpg"
            ].map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative h-64 rounded-2xl overflow-hidden shadow-lg group border border-[#15803D]/10"
              >
                <img
                  src={src}
                  alt={`Sindoda Campaign ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Join the Plastic Mukti Movement
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Sindoda is just the beginning. With your support, we can scale this model to more villages and towns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/volunteer"
              className="px-8 py-4 rounded-full font-bold transition-all border-2 border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white"
            >
              Volunteer in Sindoda
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
