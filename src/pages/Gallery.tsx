// src/pages/Gallery.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Replace these with your actual NGO photos
const ASSETS = [
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
  {
    src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
    title: 'Rural development',
  },
  {
    src: 'https://images.unsplash.com/photo-1552697664-1505303c2bb6?w=800&q=80',
    title: 'Healthcare',
  },
  {
    src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    title: 'Elderly care',
  },
  {
    src: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80',
    title: 'Disaster relief',
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(3);

  const toPrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const toNext = () => {
    setActiveIndex((prev) => Math.min(ASSETS.length - 1, prev + 1));
  };

  const toSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#F1F8F5] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#263238]">
          Our <span className="text-[#FFF314]">Gallery</span>
        </h1>
        <p className="text-[#263238]/60 text-sm mt-2">
          Drag to explore • Scroll to zoom (on desktop)
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="w-[clamp(120px,80vmin,300px)] mt-4 z-10">
        {/* Slides Container */}
        <motion.div
          className="flex w-fit"
          animate={{ x: `${(-activeIndex * 100) / ASSETS.length}%` }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
        >
          {ASSETS.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={i}
                className="w-[clamp(120px,80vmin,300px)] aspect-square flex flex-col items-center gap-2 will-change-[transform,scale]"
                animate={{
                  rotate: (i - activeIndex) * 30,
                  scale: isActive ? 1 : 0.6,
                  y: `${(i - activeIndex) * 50}%`,
                }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
              >
                <div
                  className={`text-xs md:text-sm whitespace-nowrap will-change-[opacity,filter] transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-70'
                  } text-[#263238] font-medium`}
                >
                  {item.title}
                </div>

                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => toSlide(i)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-6 left-0 right-0 w-fit px-2 mx-auto flex items-center gap-4 justify-center text-[#263238] rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 border border-[#FFF314]/20 shadow-lg z-20">
        {/* Previous Button */}
        <button
          onClick={toPrev}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/10 rounded-full transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="w-[180px] flex justify-center items-center gap-2">
          {ASSETS.map((_, i) => (
            <div
              key={i}
              onClick={() => toSlide(i)}
              className={`rounded-full cursor-pointer h-2 transition-[width,background-color] duration-300 ${
                activeIndex === i
                  ? 'w-7 bg-[#FFF314]'
                  : 'w-2 bg-[#263238]/30 hover:bg-[#263238]/50'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={toNext}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/10 rounded-full transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
