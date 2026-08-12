import React from 'react';
import { motion } from 'framer-motion';

export default function FoodSecurity() {
  return (
    <div className="min-h-screen bg-[#FFFBEB] pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1 relative h-[400px] md:h-[600px] rounded-full overflow-hidden shadow-2xl border-8 border-white">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=800&h=800&fit=crop&q=80" 
                alt="Food distribution" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#D97706]/40 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <span className="font-mono text-[#D97706] text-sm tracking-widest uppercase font-bold mb-4 block">
              11 — Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Food <br />
              <span className="text-[#F59E0B]">Security</span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl font-mono mb-8 max-w-md">
              Food distribution, nutrition programs, and sustainable agriculture for vulnerable communities.
            </p>
            <button className="bg-[#D97706] text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#B45309] transition-all">
              Feed a Family
            </button>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-12 border-t-2 border-yellow-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">Zero Hunger</h2>
            <p className="font-mono text-gray-500 max-w-2xl mx-auto">
              Working relentlessly to ensure no one goes to bed hungry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Community Kitchens", desc: "Serving hot, nutritious meals daily to the homeless and needy.", icon: "🍲" },
              { title: "Dry Rations", desc: "Providing monthly grocery kits to struggling families.", icon: "🌾" },
              { title: "Farming Support", desc: "Training farmers in sustainable agriculture for long-term food security.", icon: "🚜" }
            ].map((item, i) => (
              <div key={i} className="bg-[#FFFBEB] p-8 rounded-3xl border border-yellow-200 hover:-translate-y-2 transition-transform">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3 text-[#B45309]">{item.title}</h3>
                <p className="font-mono text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
