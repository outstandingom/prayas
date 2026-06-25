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

  useEffect(() => {
    fetchImages();
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
        // Position starting pair in the middle of the dataset
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
    // Keep at least 2 images viewable in the center frame
    setActiveIndex((prev) => Math.min(images.length - 2, prev + 1));
  };

  const toSlide = (index: number) => {
    if (index >= images.length - 1) {
      setActiveIndex(Math.max(0, images.length - 2));
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F8F5] flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-8 z-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#263238]">
          Our <span className="text-[#FFF314]">Gallery</span>
        </h1>
        <p className="text-[#263238]/60 text-sm mt-2 font-medium">
          {images.length} images • Click to explore pairs
        </p>
      </div>

      {/* Carousel Wrapper Stage */}
      <div className="w-[clamp(260px,85vmin,640px)] h-[320px] sm:h-[400px] flex items-center justify-center relative z-10">
        
        {images.map((item, i) => {
          const isLeftActive = i === activeIndex;
          const isRightActive = i === activeIndex + 1;
          const isActivePair = isLeftActive || isRightActive;

          // Target calculations for the continuous cascade sequence
          let offsetFactor = 0;
          if (!isActivePair) {
            // Symmetrical offset cascading logic relative to the active pair cluster
            offsetFactor = i < activeIndex ? i - activeIndex : i - (activeIndex + 1);
          }

          return (
            <motion.div
              key={item.id}
              className="absolute w-[calc(50%-12px)] sm:w-[calc(50%-16px)] aspect-square flex flex-col items-center gap-2 will-change-[transform,scale,opacity]"
              animate={{
                // 1. HORIZONTAL TRACK POSITIONING
                // If it is the active pair, lock left/right sides. Otherwise, offset outward.
                x: isLeftActive 
                  ? "-52%" 
                  : isRightActive 
                  ? "52%" 
                  : offsetFactor < 0 
                  ? `${-52 + offsetFactor * 45}%` 
                  : `${52 + offsetFactor * 45}%`,

                // 2. ROTATION TRANSITION (From your original layout style)
                rotate: offsetFactor * 30,

                // 3. SCALE TRANSITION (From your original layout style)
                scale: isActivePair ? 1 : 0.6,

                // 4. VERTICAL CASCADE DROP (From your original layout style applied symmetrically)
                y: `${Math.abs(offsetFactor) * 35}%`,

                // 5. LAYER DEPTH & OPACITY
                zIndex: isActivePair ? 50 : 40 - Math.abs(offsetFactor),
                opacity: isActivePair ? 1 : Math.max(0.2, 1 - Math.abs(offsetFactor) * 0.25)
              }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.75 }}
            >
              {/* Title Text */}
              <div
                className={`text-xs md:text-sm whitespace-nowrap will-change-[opacity,transform] transition-all duration-300 font-medium text-[#263238] truncate max-w-full ${
                  isActivePair ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                {item.title || item.category || 'Untitled'}
              </div>

              {/* Image Frame */}
              <img
                src={item.image_url}
                alt={item.title || 'Gallery image'}
                className="w-full h-full object-cover rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow border border-white/60"
                onClick={() => toSlide(i)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-0 right-0 w-fit px-2 mx-auto flex items-center gap-4 justify-center text-[#263238] rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 border border-[#FFF314]/20 shadow-lg z-20">
        {/* Previous Button */}
        <button
          onClick={toPrev}
          disabled={activeIndex === 0}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dynamic Pagination Dots */}
        <div className="w-[180px] flex justify-center items-center gap-2 overflow-x-auto no-scrollbar">
          {images.map((_, i) => {
            const isDotInActivePair = i === activeIndex || i === activeIndex + 1;
            return (
              <div
                key={i}
                onClick={() => toSlide(i)}
                className={`rounded-full cursor-pointer h-2 transition-all duration-300 flex-shrink-0 ${
                  isDotInActivePair
                    ? 'w-7 bg-[#FFF314]'
                    : 'w-2 bg-[#263238]/30 hover:bg-[#263238]/50'
                }`}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={toNext}
          disabled={activeIndex >= images.length - 2}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
