import React from 'react';
import { motion } from 'framer-motion';

export default function Healthcare() {
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
            <span className="font-mono text-[#0D9488] text-sm tracking-widest uppercase font-bold mb-4 block">
              02 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Essential <br />
              <span className="text-[#0D9488]">Healthcare</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-mono mb-8 max-w-md">
              Free medical camps, health awareness programs, and essential healthcare access for underserved communities.
            </p>
            <button className="bg-[#0D9488] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#0F766E] transition-all">
              Fund a Medical Camp
            </button>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=800&fit=crop&q=80" 
                alt="Healthcare workers" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D9488]/40 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">Healing Communities</h2>
            <p className="font-mono text-gray-500 max-w-2xl mx-auto">
              Delivering critical care where it is needed most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Mobile Clinics", desc: "Reaching remote villages with fully equipped mobile medical units.", icon: "🚐" },
              { title: "Maternal Health", desc: "Supporting expectant mothers with nutrition and pre-natal care.", icon: "🤱" },
              { title: "Vaccination Drives", desc: "Ensuring children receive life-saving immunizations on time.", icon: "💉" }
            ].map((item, i) => (
              <div key={i} className="bg-[#F0FDF4] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="font-mono text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
