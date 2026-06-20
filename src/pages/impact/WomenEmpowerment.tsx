import React from 'react';
import { motion } from 'framer-motion';

export default function WomenEmpowerment() {
  return (
    <div className="min-h-screen bg-[#FAF5FF] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1 relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=800&fit=crop&q=80" 
                alt="Women working together" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7E22CE]/40 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <span className="font-mono text-[#7E22CE] text-sm tracking-widest uppercase font-bold mb-4 block">
              03 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Women <br />
              <span className="text-[#D946EF]">Empowerment</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-mono mb-8 max-w-md">
              Skill development, self-help groups, and financial independence programs transforming women's lives.
            </p>
            <button className="bg-[#7E22CE] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#6B21A8] transition-all">
              Empower a Woman Today
            </button>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#7E22CE] text-white py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Fostering Independence</h2>
            <p className="font-mono text-purple-200 max-w-2xl mx-auto">
              When women thrive, entire communities succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Vocational Skills", desc: "Training in tailoring, crafts, and computer literacy.", icon: "🧵" },
              { title: "Microfinance", desc: "Providing small loans to help women start their own businesses.", icon: "📈" },
              { title: "Self-Help Groups", desc: "Creating networks of support and collective savings.", icon: "🤝" }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-8 rounded-2xl border border-[#D946EF]/30 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="font-mono text-purple-100 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
