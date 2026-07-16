import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Sparkles, Target, Award, Users, Trees, Sprout, Droplets, Leaf } from 'lucide-react';

// Sub‑category data (matches items in OurWork → Environment)
const subCategories = [
  {
    id: 'plantation',
    title: 'Plantation',
    icon: Trees,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
    description: 'Massive tree plantation drives for ecological balance.',
    longDescription:
      'Our Plantation programme is not just about planting trees – it is about creating forests. We select native species, involve local communities in nurturing saplings, and monitor survival rates. We have planted over 50,000 trees across various regions, creating green corridors and improving biodiversity. We also educate farmers about agro‑forestry to enhance soil fertility and provide additional income from timber and fruits.',
  },
  {
    id: 'kargil-vatika',
    title: 'Kargil Vatika',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=500&fit=crop',
    description: 'A tribute forest honouring the brave soldiers of Kargil.',
    longDescription:
      'Kargil Vatika is a special memorial garden dedicated to the martyrs of the Kargil War. We have planted thousands of trees in a dedicated area, each tree symbolising the valour and sacrifice of our soldiers. The Vatika serves as a living tribute, a place for reflection, and a reminder of our duty to protect the nation and its environment. We maintain the garden with the help of local communities and schools, teaching children about patriotism and environmental stewardship.',
  },
  {
    id: 'water-conservation',
    title: 'Water Conservation',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=800&h=500&fit=crop',
    description: 'Water harvesting and sustainable water management.',
    longDescription:
      'Water scarcity affects millions. Our Water Conservation initiatives include constructing check dams, ponds, and rooftop rainwater harvesting systems. We also promote drip irrigation and water‑efficient farming practices. We work with village communities to map water sources and develop sustainable usage plans. Our efforts have significantly raised groundwater levels and reduced water‑borne diseases in many villages.',
  },
];

export default function Environment() {
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--navbar-height, 100px)' }}>
      
      {/* ===== HERO SECTION – FULL SCREEN IMAGE ===== */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-[#15803D]/80 px-4 py-1.5 rounded-full text-sm font-mono tracking-widest uppercase mb-6">
              Environment & Sustainability
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Protecting <span className="text-[#86EFAC]">Our Planet</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
              Tree plantation, water conservation, and sustainable practices for a greener future.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#86EFAC] text-[#14532D] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Plant a Tree
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY ENVIRONMENT & SUSTAINABILITY ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#15803D] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Why Environment & Sustainability
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#14532D] mb-6">
              Protecting the environment for future generations
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We work to restore ecological balance through reforestation, water harvesting, and community awareness – because a healthy planet is the foundation of all life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Target,
                title: 'Restore ecosystems',
                desc: 'Plant native trees, restore wetlands, and protect biodiversity in rural and urban areas.'
              },
              {
                icon: Award,
                title: 'Promote sustainability',
                desc: 'Encourage renewable energy, waste reduction, and sustainable agriculture practices.'
              },
              {
                icon: Users,
                title: 'Educate communities',
                desc: 'Empower people with knowledge on climate action, water conservation, and eco‑friendly living.'
              }
            ].map((item, i) => (
              <div key={i} className="group bg-[#F0FDF4] p-8 rounded-2xl border border-[#15803D]/20 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-[#15803D]/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#15803D]/20 transition-colors">
                  <item.icon className="w-7 h-7 text-[#15803D]" />
                </div>
                <h3 className="text-xl font-bold text-[#14532D] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button className="bg-[#15803D] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
              Join the Movement
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== SUB‑CATEGORIES – each with hero + content ===== */}
      {subCategories.map((sub, index) => (
        <section key={sub.id} className="py-20 md:py-28 even:bg-[#F0FDF4] odd:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Hero Image (left) */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full">
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="bg-[#15803D]/80 inline-block p-2 rounded-full mb-2">
                    <sub.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">{sub.title}</h3>
                </div>
              </div>

              {/* Content (right) */}
              <div>
                <span className="inline-block text-[#15803D] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-2">
                  {sub.title}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#14532D] mb-4">
                  {sub.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  {sub.description}
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  {sub.longDescription}
                </p>
                <button className="mt-6 bg-[#15803D] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ===== WHERE WE WORK ===== */}
      <section className="py-20 md:py-28 bg-[#F0FDF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#15803D] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Where We Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#14532D] mb-6">
              Making an impact in <span className="text-[#15803D]">rural and urban communities</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: 'Tree Plantation',
                desc: 'Massive drives to increase green cover and combat climate change.'
              },
              {
                title: 'Water Conservation',
                desc: 'Rainwater harvesting, check dams, and sustainable water management.'
              },
              {
                title: 'Kargil Vatika',
                desc: 'A tribute forest honouring the brave soldiers of Kargil.'
              },
              {
                title: 'Eco‑Education',
                desc: 'Workshops and awareness campaigns for sustainable living.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#15803D]/20 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="text-4xl mb-4">🌳</div>
                <h3 className="text-lg font-bold text-[#14532D] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#14532D] rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Working across 6 states</h3>
                <p className="text-white/60 text-sm">From forests to urban green spaces</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh', 'Odisha', 'Jharkhand'].map((state) => (
                  <span key={state} className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-white/10">
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT ===== */}
      <section className="py-20 md:py-28 bg-[#F0FDF4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#15803D] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Join the Movement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#14532D] mb-6">
              Be part of a growing community of changemakers
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Help us protect the planet and build a sustainable future for all.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-[#15803D] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Join Us
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#15803D] font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-[#15803D]/30 text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 md:py-28 bg-[#14532D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#86EFAC]" />
              <span className="text-[#86EFAC] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                Ready to Make a Difference?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Plant a tree, protect a future
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Every tree planted and every drop saved creates a healthier planet for generations to come.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#86EFAC] text-[#14532D] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white font-bold px-10 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
