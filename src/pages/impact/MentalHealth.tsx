import React from 'react';
import { motion } from 'framer-motion';

export default function MentalHealth() {
  return (
    <div className="min-h-screen bg-[#F5F3FF] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-mono text-[#6D28D9] text-sm tracking-widest uppercase font-bold mb-4 block">
              12 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Mental <br />
              <span className="text-[#8B5CF6]">Health</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-mono mb-8 max-w-md">
              Mental health awareness, counseling services, and emotional wellbeing programs for all age groups.
            </p>
            <button className="bg-[#6D28D9] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#5B21B6] transition-all">
              Support Our Counselors
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
                src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=800&fit=crop&q=80" 
                alt="Mental health support" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6D28D9]/40 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#6D28D9] text-white py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Minds Matter</h2>
            <p className="font-mono text-purple-200 max-w-2xl mx-auto">
              Breaking the stigma and providing accessible mental health care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Helplines", desc: "24/7 confidential helplines manned by trained professionals.", icon: "📞" },
              { title: "Counseling", desc: "Free or subsidized therapy sessions for marginalized individuals.", icon: "🛋️" },
              { title: "Awareness", desc: "Workshops in schools and workplaces to promote emotional well-being.", icon: "🧠" }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-8 rounded-2xl border border-purple-400/30 backdrop-blur-md hover:bg-white/20 transition-all">
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
