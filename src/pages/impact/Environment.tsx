import React from 'react';
import { motion } from 'framer-motion';

export default function Environment() {
  return (
    <div className="min-h-screen bg-[#F0FDF4] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-mono text-[#15803D] text-sm tracking-widest uppercase font-bold mb-4 block">
              05 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Environmental <br />
              <span className="text-[#15803D]">Conservation</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-mono mb-8 max-w-md">
              Tree plantation drives, waste management, and environmental awareness campaigns for a greener future.
            </p>
            <button className="bg-[#15803D] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#166534] transition-all">
              Plant a Tree
            </button>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-[#15803D]/20">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop&q=80" 
                alt="Planting a sapling" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15803D]/40 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#15803D] text-white py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Protecting Our Earth</h2>
            <p className="font-mono text-green-100 max-w-2xl mx-auto">
              Sustainable actions today for a livable tomorrow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Reforestation", desc: "Large-scale tree planting drives to combat deforestation.", icon: "🌳" },
              { title: "Cleanups", desc: "Community-led cleanups of rivers, beaches, and public spaces.", icon: "🧹" },
              { title: "Eco-Education", desc: "Teaching children and adults sustainable living practices.", icon: "🌱" }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="font-mono text-green-50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
