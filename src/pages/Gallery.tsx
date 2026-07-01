// src/pages/Gallery.tsx
import { useState, useEffect, useRef } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag state
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

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
        setActiveIndex(Math.floor(data.length / 2));
      } else {
        setImages([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const toNext = () => setActiveIndex((prev) => Math.min(images.length - 1, prev + 1));
  const toSlide = (index: number) => setActiveIndex(index);

  // ── Drag / Swipe handlers ──
  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    isDragging.current = true;
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? toNext() : toPrev();
    }
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
      <div className="min-h-screen bg-[#F1F8F5] flex items-center justify-center text-red-600">
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
    <div className="min-h-screen bg-[#F1F8F5] flex flex-col items-center justify-center relative overflow-hidden pb-28">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#263238]">
          Our <span className="text-[#FFF314]">Gallery</span>
        </h1>
        <p className="text-[#263238]/60 text-sm mt-2">
          {images.length} images · Swipe or drag to explore
        </p>
      </div>

      {/* Carousel Wrapper — draggable */}
      <div
        className="w-[clamp(120px,80vmin,300px)] mt-4 z-10 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onMouseLeave={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        <motion.div
          className="flex w-fit"
          animate={{ x: `${(-activeIndex * 100) / images.length}%` }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
        >
          {images.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={item.id}
                className="w-[clamp(120px,80vmin,300px)] aspect-square flex flex-col items-center gap-2 will-change-[transform,scale]"
                animate={{
                  rotate: (i - activeIndex) * 30,
                  scale: isActive ? 1 : 0.6,
                  y: `${(i - activeIndex) * 50}%`,
                }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
              >
                <div
                  className={`text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  } text-[#263238] font-medium`}
                >
                  {item.title || item.category || 'Untitled'}
                </div>

                <img
                  src={item.image_url}
                  alt={item.title || 'Gallery image'}
                  draggable={false}
                  className="w-full h-full object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => toSlide(i)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls — always visible, including mobile */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-20 px-4">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full border border-[#FFF314]/20 shadow-xl">
          {/* Previous */}
          <button
            onClick={toPrev}
            disabled={activeIndex === 0}
            className="p-2 hover:bg-[#FFF314]/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-[#263238]" />
          </button>

          {/* Dots */}
          <div className="flex justify-center items-center gap-1.5 max-w-[160px] overflow-hidden">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => toSlide(i)}
                className={`rounded-full cursor-pointer h-2 transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 bg-[#FFF314]'
                    : 'w-2 bg-[#263238]/30 hover:bg-[#263238]/50'
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={toNext}
            disabled={activeIndex === images.length - 1}
            className="p-2 hover:bg-[#FFF314]/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-[#263238]" />
          </button>
        </div>
      </div>
    </div>
  );
}
