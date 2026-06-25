// src/pages/Gallery.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type GalleryImage = {
  id: string;
  image_url: string;
  title: string;
  description: string;
  category: string;
  display_order: number;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // activeIndex represents the LEFT image of the centered active pair
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Responsive card width tracker to ensure layout doesn't overflow smaller screens
  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    fetchImages();
  }, []);

  // Track viewport dimensions to adapt card sizing dynamically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth(160); // Mobile sizes
      } else if (window.innerWidth < 1024) {
        setCardWidth(230); // Tablet sizes
      } else {
        setCardWidth(300); // Desktop sizes
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('id, image_url, title, description, category, display_order')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setImages(data);
        // Position the starting pair roughly in the middle of the stack
        const middleIndex = Math.floor(data.length / 2) - 1;
        setActiveIndex(Math.max(0, middleIndex));
      } else {
        setImages([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toPrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const toNext = () => {
    // Upper bound is length - 2 to ensure there's always a right-side partner image
    setActiveIndex((prev) => Math.min(images.length - 2, prev + 1));
  };

  const toSlide = (index: number) => {
    // If the user selects the very last image, make it the right side of the centered pair
    if (index >= images.length - 1) {
      setActiveIndex(Math.max(0, images.length - 2));
    } else {
      setActiveIndex(index);
    }
  };

  // Dynamic Cover-Flow 3D positioning logic relative to the active pair
  const getCardStyles = (index: number) => {
    const isLeftActive = index === activeIndex;
    const isRightActive = index === activeIndex + 1;
    
    const gap = window.innerWidth < 640 ? 12 : 24; // Dynamic structural spacing between active cards
    const step = cardWidth * 0.35; // How tightly background cards stack over each other

    let x = 0;
    let rotateY = 0;
    let scale = 0.6;
    let zIndex = 10;
    let opacity = 1;

    if (isLeftActive) {
      x = -(cardWidth / 2 + gap / 2);
      rotateY = 0;
      scale = 1;
      zIndex = 50;
    } else if (isRightActive) {
      x = cardWidth / 2 + gap / 2;
      rotateY = 0;
      scale = 1;
      zIndex = 50;
    } else if (index < activeIndex) {
      // Logic for cards cascading out to the left
      const depth = activeIndex - index;
      x = -(cardWidth / 2 + gap / 2) - cardWidth * 0.25 - depth * step;
      rotateY = 45; // Angled outward
      scale = Math.max(0.4, 0.65 - depth * 0.05);
      zIndex = 40 - depth;
      opacity = Math.max(0.2, 1 - depth * 0.25);
    } else {
      // Logic for cards cascading out to the right
      const depth = index - (activeIndex + 1);
      x = cardWidth / 2 + gap / 2 + cardWidth * 0.25 + depth * step;
      rotateY = -45; // Angled outward
      scale = Math.max(0.4, 0.65 - depth * 0.05);
      zIndex = 40 - depth;
      opacity = Math.max(0.2, 1 - depth * 0.25);
    }

    return { x, rotateY, scale, zIndex, opacity };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F8F5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#263238]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F1F8F5] flex items-center justify-center text-red-600 font-medium">
        Error loading gallery: {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-[#F1F8F5] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-[#263238]">Our Gallery</h1>
        <p className="text-[#263238]/60 mt-2">No images added yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F8F5] flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-6 sm:mb-10 z-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#263238]">
          Our <span className="text-[#FFF314] drop-shadow-sm">Gallery</span>
        </h1>
        <p className="text-[#263238]/60 text-sm mt-2 font-medium">
          {images.length} images • Click to explore pairs
        </p>
      </div>

      {/* 3D Carousel Stage Wrapper */}
      <div 
        className="relative w-full h-[260px] sm:h-[420px] flex items-center justify-center overflow-visible z-10"
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      >
        {images.map((item, i) => {
          const styles = getCardStyles(i);
          const isActivePair = i === activeIndex || i === activeIndex + 1;

          return (
            <motion.div
              key={item.id}
              className="absolute flex flex-col items-center gap-2 sm:gap-4 will-change-transform"
              style={{ width: cardWidth, transformStyle: 'preserve-3d' }}
              animate={{
                x: styles.x,
                rotateY: styles.rotateY,
                scale: styles.scale,
                zIndex: styles.zIndex,
                opacity: styles.opacity,
              }}
              transition={{ type: 'spring', bounce: 0.12, duration: 0.65 }}
            >
              {/* Active Image Title Card */}
              <div
                className={`text-xs sm:text-sm font-semibold text-[#263238] tracking-wide text-center h-5 transition-all duration-300 pointer-events-none truncate max-w-full ${
                  isActivePair ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                {item.title || item.category || 'Untitled'}
              </div>

              {/* Cover Flow Card Frame */}
              <div 
                className="w-full aspect-square relative rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-[#263238]/5 overflow-hidden group border border-white/40"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src={item.image_url}
                  alt={item.title || 'Gallery image'}
                  className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                  onClick={() => toSlide(i)}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Interface Controls */}
      <div className="mt-8 sm:mt-12 w-fit px-4 py-2 mx-auto flex items-center gap-4 justify-center text-[#263238] rounded-full bg-white/80 backdrop-blur-md border border-[#FFF314]/20 shadow-xl z-20">
        {/* Previous Action Button */}
        <button
          onClick={toPrev}
          disabled={activeIndex === 0}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/20 rounded-full transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Dynamic Pagination Ribbon */}
        <div className="max-w-[160px] sm:max-w-[240px] flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
          {images.map((_, i) => {
            const isDotInPair = i === activeIndex || i === activeIndex + 1;
            return (
              <div
                key={i}
                onClick={() => toSlide(i)}
                className={`rounded-full cursor-pointer h-2 flex-shrink-0 transition-all duration-300 ${
                  isDotInPair
                    ? 'w-6 bg-[#FFF314] shadow-sm'
                    : 'w-2 bg-[#263238]/20 hover:bg-[#263238]/40'
                }`}
              />
            );
          })}
        </div>

        {/* Next Action Button */}
        <button
          onClick={toNext}
          disabled={activeIndex >= images.length - 2}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/20 rounded-full transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
