import React from 'react';
import { motion } from 'framer-motion';

export default function ElderlyCare() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-mono text-[#475569] text-sm tracking-widest uppercase font-bold mb-4 block">
              10 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Elderly <br />
              <span className="text-[#64748B]">Care</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-mono mb-8 max-w-md">
              Support, healthcare, and dignity for senior citizens through dedicated community programs.
            </p>
            <button className="bg-[#475569] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#334155] transition-all">
              Adopt a Grandparent
            </button>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=800&fit=crop&q=80" 
                alt="Elderly care" 
                className="w-full h-full object-cover grayscale-[30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#475569]/40 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-[#334155]">Dignity & Respect</h2>
            <p className="font-mono text-slate-500 max-w-2xl mx-auto">
              Ensuring our elders spend their twilight years with comfort and joy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Old Age Homes", desc: "Safe, comfortable, and loving residential facilities.", icon: "🏠" },
              { title: "Healthcare", desc: "Regular medical checkups, medicines, and specialized geriatric care.", icon: "💊" },
              { title: "Companionship", desc: "Social events and recreational activities to combat loneliness.", icon: "🤝" }
            ].map((item, i) => (
              <div key={i} className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3 text-[#334155]">{item.title}</h3>
                <p className="font-mono text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
