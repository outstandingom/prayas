import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_ASSETS = [
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    title: 'Education for all',
  },
  {
    src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    title: 'Community health',
  },
  {
    src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80',
    title: 'Animal welfare',
  },
  {
    src: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=800&q=80',
    title: 'Food security',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    title: 'Environment',
  },
  {
    src: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&q=80',
    title: 'Women empowerment',
  },
  {
    src: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80',
    title: 'Skill development',
  },
  {
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    title: 'Child welfare',
  },
];

// Duplicating the array to simulate having 100+ images for this example.
// You can replace this entirely with your actual array of 100+ objects.
const ASSETS = Array.from({ length: 120 }, (_, i) => INITIAL_ASSETS[i % INITIAL_ASSETS.length]);

export default function Gallery() {
  const itemsPerView = 4;
  // This calculates the maximum number of times we can slide left 
  // before we hit the end of the 100+ images.
  const maxIndex = Math.max(0, ASSETS.length - itemsPerView);
  const [activeIndex, setActiveIndex] = useState(0);

  const toPrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const toNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#F1F8F5] flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#263238]">
          Our <span className="text-[#FFF314]">Gallery</span>
        </h1>
        <p className="text-[#263238]/60 text-sm mt-2">
          Swipe to explore • 4 images visible at once
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="w-full max-w-6xl mx-auto overflow-hidden z-10">
        <motion.div
          className="flex gap-4"
          // We slide exactly 1 item width (25%) + the gap distance (0.25rem) to the left per index
          animate={{ x: `calc(-${activeIndex} * (25% + 0.25rem))` }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
        >
          {ASSETS.map((item, i) => (
            <div
              key={i}
              // This strictly enforces 4 images per view by calculating 25% width minus the flex gaps
              style={{ width: "calc(25% - 0.75rem)" }}
              className="flex-shrink-0 aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative group"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white font-medium text-sm md:text-base drop-shadow">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-6 left-0 right-0 w-fit mx-auto flex items-center gap-6 justify-center text-[#263238] rounded-full bg-white/90 backdrop-blur-sm px-6 py-3 border border-[#FFF314]/20 shadow-lg z-20">
        <button
          onClick={toPrev}
          disabled={activeIndex === 0}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/20 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Counter Display (Replaces the dots for scalability) */}
        <div className="text-sm font-medium min-w-[100px] text-center tracking-wide">
          {activeIndex + 1} - {activeIndex + itemsPerView} <span className="text-[#263238]/40 mx-1">/</span> {ASSETS.length}
        </div>

        <button
          onClick={toNext}
          disabled={activeIndex === maxIndex}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/20 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
