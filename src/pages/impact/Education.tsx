import React from 'react';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-12">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-mono text-[#0056B3] text-sm tracking-widest uppercase font-bold mb-4 block">
              01 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Child Growth <br />
              <span className="text-[#0056B3]">& Education</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-mono mb-8 max-w-md">
              Every child deserves a chance to learn, grow, and dream. We provide access to quality education and holistic development.
            </p>
            <button className="bg-[#FFF314] text-black font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Support Our Schools
            </button>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=800&fit=crop&q=80" 
                alt="Children learning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0056B3]/40 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Key Initiatives */}
      <section className="bg-[#0056B3] text-white py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Key Initiatives</h2>
              <p className="font-mono text-white/80 max-w-lg">
                Building foundations for a brighter tomorrow through targeted educational programs.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "School Building", desc: "Constructing safe and inspiring learning environments in rural areas.", icon: "🏫" },
              { title: "Scholarships", desc: "Providing financial aid to bright students from marginalized communities.", icon: "📚" },
              { title: "Digital Literacy", desc: "Equipping schools with computers and internet access for modern learning.", icon: "💻" }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="font-mono text-white/80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
