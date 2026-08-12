import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CAUSE_CARDS = [
  {
    id: 1,
    image: '/P1039409.JPG',
    title: 'SEND CHILDREN BACK TO SCHOOL',
    subtitle: 'If not now they might never return',
    route: '/education',
  },
  {
    id: 2,
    image: '/P1039322.JPG',
    title: 'POORI PADHAI, DESH KI BHALAI',
    subtitle: 'Help girls complete their education',
    route: '/women-empowerment',
  },
  {
    id: 3,
    image: '/PRAYASHEALTHCAMP.jpeg',
    title: 'HEALTHCARE FOR EVERY CHILD',
    subtitle: 'Provide lifesaving checkups & medicine',
    route: '/healthcare',
  },
  {
    id: 4,
    image: '/TREEGROW.jpg',
    title: 'GREEN FUTURE FOR CHILDREN',
    subtitle: 'Plant trees for a clean & green environment',
    route: '/environment',
  },
  {
    id: 5,
    image: '/CHILDRENGROUP.jpg',
    title: 'NUTRITION & CHILDCARE',
    subtitle: 'Ensure no child sleeps on an empty stomach',
    route: '/donate',
  },
];

export default function HelpChildrenSection() {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAUSE_CARDS.length - 1 : prev - 1));
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CAUSE_CARDS.length - 1 ? 0 : prev + 1));
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-16 sm:py-20 bg-white text-[#263238] overflow-hidden select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ─── LEFT COLUMN: Headline & Subtext ─── */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-[1.2]">
              How would you like to{' '}
              <span className="text-[#F5B800] font-heading font-normal relative inline-block">
                create change
              </span>{' '}
              today?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mt-3 rounded-full shadow-xs" />

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans max-w-md">
              Every small act of kindness creates a ripple of hope. Your support helps us build stronger communities through education, women empowerment, rural development, healthcare, and environmental sustainability.
            </p>
          </div>

          {/* ─── RIGHT COLUMN: Horizontal Carousel Track ─── */}
          <div className="lg:col-span-7 relative overflow-hidden py-4">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-2 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CAUSE_CARDS.map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={{ y: -8, scale: 1.015 }}
                  onClick={() => navigate(card.route)}
                  className="w-[280px] sm:w-[320px] md:w-[330px] shrink-0 bg-white rounded-[28px] overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.13)] transition-all duration-300 border border-gray-100/90 cursor-pointer group flex flex-col justify-between relative"
                >
                  {/* Photo Frame */}
                  <div className="w-full h-48 sm:h-56 overflow-hidden relative bg-gray-950">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 text-center bg-white flex flex-col justify-center min-h-[120px] relative">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#263238] tracking-wider uppercase font-mono group-hover:text-red-600 transition-colors mb-1.5 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-sans font-medium line-clamp-2">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Ultra-Smooth Gradient Accent Line */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#FFD400] via-amber-400 to-[#DC2626] group-hover:h-2 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
