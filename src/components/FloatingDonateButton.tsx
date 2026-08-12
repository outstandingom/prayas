// src/components/FloatingDonateButton.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Crisp SVG graphic badges for causes
const SVG_BADGES: Record<string, string> = {
  education: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" y1="0" x2="1" y2="1"%3E%3Cstop offset="0%25" stop-color="%230284C7"/%3E%3Cstop offset="100%25" stop-color="%23075985"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="100" rx="50" fill="url(%23g)"/%3E%3Cpath d="M50 25 L80 40 L50 55 L20 40 Z" fill="%23FFF314"/%3E%3Cpath d="M32 48 L32 65 C32 70 68 70 68 65 L68 48" stroke="%23FFF314" stroke-width="4" fill="none" stroke-linecap="round"/%3E%3C/svg%3E',
  food: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" y1="0" x2="1" y2="1"%3E%3Cstop offset="0%25" stop-color="%23D97706"/%3E%3Cstop offset="100%25" stop-color="%2378350F"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100" height="100" rx="50" fill="url(%23g)"/%3E%3Cpath d="M25 45 C25 68, 75 68, 75 45 Z" fill="%23FFF314"/%3E%3Ccircle cx="50" cy="35" r="10" fill="%23FFF"/%3E%3Cpath d="M20 45 L80 45" stroke="%23FFF" stroke-width="4" stroke-linecap="round"/%3E%3C/svg%3E',
};

// Define all marquee causes with relevant graphic badge URLs
const MARQUEE_MESSAGES = [
  {
    id: 'birds',
    text: 'Donate for Birds',
    imageUrl: 'https://i.ibb.co/d01n9H1K/In-Shot-20260621-143002419.png',
    fallback: SVG_BADGES.education
  },
  {
    id: 'water',
    text: 'Donate for Water',
    imageUrl: 'https://i.ibb.co/5xjFCftw/In-Shot-20260621-143509552.png',
    fallback: SVG_BADGES.education
  },
  {
    id: 'health',
    text: 'Donate for Healthcare',
    imageUrl: '/Donatehealth.png',
    fallback: SVG_BADGES.education
  },
  {
    id: 'nature',
    text: 'Donate for Nature',
    imageUrl: '/Tree.png',
    fallback: SVG_BADGES.education
  },
  {
    id: 'education',
    text: 'Donate for Education',
    imageUrl: SVG_BADGES.education,
    fallback: SVG_BADGES.education
  },
  {
    id: 'food',
    text: 'Donate for Food',
    imageUrl: SVG_BADGES.food,
    fallback: SVG_BADGES.food
  },
  {
    id: 'shelter',
    text: 'Donate for Shelter',
    imageUrl: '/InShot_20260721_094914841.png',
    fallback: SVG_BADGES.education
  },
];

export default function FloatingDonateButton() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate causes every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MARQUEE_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = MARQUEE_MESSAGES[currentIndex];

  return (
    <Link
      to={`/donate?cause=${currentMessage.id}`}
      className="fixed bottom-20 right-3 sm:bottom-8 sm:right-8 z-50 flex flex-col items-center gap-1.5 hover:scale-105 transition-transform duration-200"
    >
      {/* Circular Badge Image */}
      <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-white/90 bg-white p-0.5">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentMessage.id}
            src={currentMessage.imageUrl}
            alt={currentMessage.text}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = currentMessage.fallback;
            }}
          />
        </AnimatePresence>
      </div>

      {/* Cause Label Pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-xs sm:text-sm font-semibold text-[#263238] bg-[#FFF314] px-3 py-1 rounded-full shadow-lg whitespace-nowrap border border-[#E6DB00]"
        >
          {currentMessage.text}
        </motion.div>
      </AnimatePresence>
    </Link>
  );
}
