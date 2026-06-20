import React from 'react';
import { motion } from 'framer-motion';

export default function RuralDevelopment() {
  return (
    <div className="min-h-screen bg-[#FEF3C7] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1 relative h-[400px] md:h-[600px] rounded-bl-[4rem] rounded-tr-[4rem] overflow-hidden shadow-2xl">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=800&fit=crop&q=80" 
                alt="Rural village" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#B45309]/50 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <span className="font-mono text-[#B45309] text-sm tracking-widest uppercase font-bold mb-4 block">
              06 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Rural <br />
              <span className="text-[#B45309]">Development</span>
            </h1>
            <p className="text-gray-800 text-lg md:text-xl font-mono mb-8 max-w-md">
              Infrastructure development, clean water access, and livelihood programs for rural communities.
            </p>
            <button className="bg-[#B45309] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#92400E] transition-all">
              Empower a Village
            </button>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-12 border-t border-[#B45309]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-[#78350F]">Building Foundations</h2>
            <p className="font-mono text-gray-600 max-w-2xl mx-auto">
              Strengthening the roots of our nation by developing rural areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Clean Water", desc: "Installing hand pumps and water purification systems.", icon: "💧" },
              { title: "Solar Power", desc: "Providing solar panels to off-grid remote villages.", icon: "☀️" },
              { title: "Infrastructure", desc: "Building essential community centers and improving local roads.", icon: "🏗️" }
            ].map((item, i) => (
              <div key={i} className="bg-[#FEF3C7] p-8 rounded-2xl shadow-sm border border-[#B45309]/20 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3 text-[#78350F]">{item.title}</h3>
                <p className="font-mono text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
