import React from 'react';
import { motion } from 'framer-motion';

export default function AnimalWelfare() {
  return (
    <div className="min-h-screen bg-[#FDF8F5] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1 relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#8B5A2B]/20">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=800&fit=crop&q=80" 
                alt="Animal rescue" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B5A2B]/50 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <span className="font-mono text-[#8B5A2B] text-sm tracking-widest uppercase font-bold mb-4 block">
              09 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Animal <br />
              <span className="text-[#A0522D]">Welfare</span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl font-mono mb-8 max-w-md">
              Rescue, shelter, and medical care for stray and injured animals in both urban and rural areas.
            </p>
            <button className="bg-[#8B5A2B] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#6B4423] transition-all">
              Sponsor an Animal
            </button>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#8B5A2B] text-white py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Voice for the Voiceless</h2>
            <p className="font-mono text-[#EEDC82] max-w-2xl mx-auto">
              Extending compassion and care to our furry and feathered friends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Rescue Operations", desc: "24/7 ambulance service for injured and abandoned strays.", icon: "🚑" },
              { title: "Animal Shelters", desc: "Providing safe havens and nourishment for rescued animals.", icon: "🏡" },
              { title: "Medical Care", desc: "Vaccinations, sterilizations, and life-saving surgeries.", icon: "🩺" }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-8 rounded-2xl border border-[#A0522D]/50 hover:bg-white/20 transition-all">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="font-mono text-[#FDF8F5] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
