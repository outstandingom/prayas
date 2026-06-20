import React from 'react';
import { motion } from 'framer-motion';

export default function DisasterRelief() {
  return (
    <div className="min-h-screen bg-[#FEF2F2] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1 relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#DC2626]">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1536643155-33d268924c93?w=800&h=800&fit=crop&q=80" 
                alt="Disaster relief workers" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#991B1B]/70 to-transparent mix-blend-multiply" />
            </motion.div>
            
            {/* Urgent Badge */}
            <div className="absolute top-4 left-4 bg-[#DC2626] text-white font-mono text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              EMERGENCY RESPONSE
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="font-mono text-[#DC2626] text-sm tracking-widest uppercase font-bold mb-4 block">
              08 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Disaster <br />
              <span className="text-[#DC2626]">Relief</span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl font-mono mb-8 max-w-md">
              Emergency response, relief distribution, and rehabilitation for disaster-affected communities.
            </p>
            <button className="bg-[#DC2626] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#B91C1C] transition-all">
              Donate to Emergency Fund
            </button>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-12 border-t-4 border-[#DC2626]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">Swift & Effective Action</h2>
            <p className="font-mono text-gray-600 max-w-2xl mx-auto">
              When disaster strikes, every second counts. Our teams are always ready to respond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Immediate Aid", desc: "Distributing food packets, clean water, and emergency medical supplies.", icon: "🚑" },
              { title: "Temporary Shelter", desc: "Setting up relief camps and providing tarpaulins and blankets.", icon: "⛺" },
              { title: "Rehabilitation", desc: "Helping communities rebuild homes and livelihoods post-disaster.", icon: "🏗️" }
            ].map((item, i) => (
              <div key={i} className="bg-[#FEF2F2] p-8 rounded-xl shadow-sm border border-red-100 hover:shadow-md hover:border-red-300 transition-all">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3 text-[#991B1B]">{item.title}</h3>
                <p className="font-mono text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
