import React from 'react';
import { motion } from 'framer-motion';

export default function SkillTraining() {
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
            <span className="font-mono text-[#0F172A] text-sm tracking-widest uppercase font-bold mb-4 block">
              07 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Skill <br />
              <span className="text-[#3B82F6]">Training</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-mono mb-8 max-w-md">
              Vocational training and skill development programs empowering youth and adults with employable skills.
            </p>
            <button className="bg-[#0F172A] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#1E293B] transition-all">
              Sponsor a Trainee
            </button>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl border-l-8 border-[#3B82F6]">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop&q=80" 
                alt="Skill training workshop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#0F172A] text-white py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6] rounded-full filter blur-[100px] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Unlocking Potential</h2>
            <p className="font-mono text-gray-400 max-w-2xl mx-auto">
              Equipping individuals with the tools they need to build sustainable careers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "IT & Tech", desc: "Basic computer skills, coding bootcamps, and digital literacy.", icon: "💻" },
              { title: "Trades & Crafts", desc: "Carpentry, plumbing, electrical work, and masonry.", icon: "🛠️" },
              { title: "Soft Skills", desc: "Communication, interview preparation, and workplace etiquette.", icon: "🗣️" }
            ].map((item, i) => (
              <div key={i} className="bg-[#1E293B] p-8 rounded-xl border border-gray-700 hover:border-[#3B82F6] transition-colors group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="font-mono text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
