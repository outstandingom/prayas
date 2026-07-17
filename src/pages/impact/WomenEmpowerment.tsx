import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Sub‑category data (unchanged)
const subCategories = [
  {
    id: 'sabji-wali-didi',
    title: 'Sabji Wali Didi',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
    description: 'Empowering women vegetable vendors with financial literacy and market access.',
    longDescription:
      'The Sabji Wali Didi programme supports women who sell vegetables in local markets. We provide them with financial literacy training, access to micro‑credit, and linkages to better supply chains. They learn to manage their earnings, invest in quality produce, and build a loyal customer base. This initiative has helped hundreds of women double their daily income and gain respect in their communities.',
  },
  {
    id: 'sewing-centres',
    title: 'Sewing Centres',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
    description: 'Vocational training in tailoring and garment‑making for economic independence.',
    longDescription:
      'Our Sewing Centres are equipped with modern machines and staffed by experienced instructors. We offer a comprehensive 6‑month course covering stitching, cutting, embroidery, and garment finishing. Graduates start their own tailoring businesses or find employment in local garment factories. Many trainees become master trainers themselves, creating a multiplier effect that empowers even more women.',
  },
  {
    id: 'shgs',
    title: 'SHGs (Self Help Groups)',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop',
    description: 'Forming and strengthening women self‑help groups for collective action and savings.',
    longDescription:
      'Self‑Help Groups are the cornerstone of our women empowerment strategy. We facilitate the formation of SHGs, train them in bookkeeping, micro‑savings, and inter‑lending. We link SHGs to formal banking institutions and government schemes. Beyond finances, SHGs become platforms for women to discuss social issues, health, and legal rights, fostering solidarity and collective action.',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop',
    description: 'Supporting women to start and scale their own businesses.',
    longDescription:
      'Our Entrepreneurship programme guides women through the entire business lifecycle – from ideation to scaling. We offer mentoring, business plan development, access to seed funding, and connections to markets. We focus on sectors where women have a natural advantage, such as food processing, handicrafts, and beauty services. Many of our entrepreneurs now run successful enterprises and employ other women in their communities.',
  },
  {
    id: 'grah-udyog',
    title: 'Grah Udyog',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
    description: 'Promoting home‑based industries for sustainable livelihoods.',
    longDescription:
      'Grah Udyog supports women to start home‑based enterprises – from pickle making and papad rolling to agarbatti (incense stick) production and handloom weaving. We provide initial raw materials, design training, and market linkages. Our aim is to create sustainable, flexible income opportunities that allow women to work from home while managing their household responsibilities.',
  },
];

export default function WomenEmpowerment() {
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--navbar-height, 100px)' }}>
      
      {/* ===== HERO – centered heading over image ===== */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src="/WOMEN.jpeg"
          alt="Women Empowerment"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
        {/* Centered heading – both axes */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="text-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg px-4">
            Empowering Women's Potential,<br />
            <span className="text-[#FFF314]">Shaping a Better World.</span>
          </h1>
        </div>
      </section>

      {/* ===== SUB‑CATEGORIES (unchanged) ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Our Programmes
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628]">
              How we empower women
            </h2>
          </motion.div>

          <div className="space-y-20">
            {subCategories.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="even:flex-row-reverse flex flex-col lg:flex-row gap-12 items-center"
              >
                <div className="lg:w-1/2 relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full">
                  <img
                    src={sub.image}
                    alt={sub.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold drop-shadow-lg">{sub.title}</h3>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-2">
                    {sub.title}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4">
                    {sub.title}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed mb-4">
                    {sub.description}
                  </p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {sub.longDescription}
                  </p>
                  <button className="mt-6 bg-[#0056B3] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm">
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
