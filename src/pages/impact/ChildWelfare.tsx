import React from 'react';
import { motion } from 'framer-motion';

export default function ChildWelfare() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-mono text-[#EA580C] text-sm tracking-widest uppercase font-bold mb-4 block">
              04 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Child <br />
              <span className="text-[#EA580C]">Welfare</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-mono mb-8 max-w-md">
              Protecting children's rights, nutrition programs, and safe shelter initiatives for vulnerable children.
            </p>
            <button className="bg-[#EA580C] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#C2410C] transition-all">
              Protect a Child
            </button>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] rounded-full overflow-hidden shadow-2xl border-8 border-white">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=800&fit=crop&q=80" 
                alt="Child welfare" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#EA580C]/40 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-12 border-t border-orange-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">Nurturing the Future</h2>
            <p className="font-mono text-gray-500 max-w-2xl mx-auto">
              Every child deserves to feel safe, loved, and nourished.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Safe Shelters", desc: "Providing secure housing for orphans and rescued children.", icon: "🏠" },
              { title: "Nutrition", desc: "Daily meals and supplements to combat childhood malnutrition.", icon: "🍎" },
              { title: "Rights Advocacy", desc: "Fighting against child labor and advocating for child rights.", icon: "⚖️" }
            ].map((item, i) => (
              <div key={i} className="bg-[#FFF7ED] p-8 rounded-3xl border border-orange-200 hover:shadow-lg transition-shadow">
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
