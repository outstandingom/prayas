// src/pages/Gallery.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, Heart } from 'lucide-react';
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
  const [activeIndex, setActiveIndex] = useState(0); // index of the first image in the central pair
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.offsetWidth);
    }
  }, [images]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      // Fetch all active images (you can limit if needed)
      const { data, error } = await supabase
        .from('gallery')
        .select('id, image_url, title, description, category, display_order')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setImages(data);
        setActiveIndex(0);
      } else {
        setImages([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalImages = images.length;
  const pairCount = Math.max(1, totalImages - 1); // number of possible pairs (for 2 images, it's 1)

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < totalImages - 2;

  const toPrev = () => {
    if (canPrev) setActiveIndex(activeIndex - 1);
  };

  const toNext = () => {
    if (canNext) setActiveIndex(activeIndex + 1);
  };

  const goToPair = (index: number) => {
    setActiveIndex(Math.min(Math.max(0, index), totalImages - 2));
  };

  // Item width: we want two items to fit in the wrapper, with some margin
  const itemWidth = Math.min(200, wrapperWidth * 0.4); // responsive
  const gap = 16;
  const step = itemWidth + gap;

  // Calculate container translateX to center the active pair
  const getTranslateX = () => {
    if (wrapperWidth === 0) return 0;
    // Center of the active pair in the container's coordinate
    const leftEdge = activeIndex * step;
    const rightEdge = (activeIndex + 1) * step + itemWidth;
    const pairCenter = (leftEdge + rightEdge) / 2;
    // We want pairCenter to align with wrapper center
    return wrapperWidth / 2 - pairCenter;
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
    <div className="bg-[#F1F8F5]">
      {/* GALLERY SECTION */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-4 py-12">
        {/* Background decorations */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Heading */}
        <div className="text-center mb-8 z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#263238]">
            Our <span className="text-[#FFF314]">Gallery</span>
          </h1>
          <p className="text-[#263238]/60 text-sm mt-2">
            {images.length} images • Drag to explore
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div
          ref={wrapperRef}
          className="w-[clamp(120px,80vmin,300px)] overflow-hidden mt-4 z-10"
          style={{ height: itemWidth * 1.1 }} // maintain aspect ratio
        >
          <motion.div
            className="flex h-full items-center"
            animate={{ x: getTranslateX() }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
            style={{ gap: `${gap}px` }}
          >
            {images.map((item, i) => {
              // Calculate distance from the active pair
              const dist = i - activeIndex; // negative = left, 0 or 1 = central, >1 = right
              let scale = 1;
              let rotateY = 0;
              let yOffset = 0;

              if (dist < 0) {
                // images to the left – scale down and tilt left
                const absDist = Math.abs(dist);
                scale = Math.max(0.6, 1 - absDist * 0.2);
                rotateY = -20 * absDist;
                yOffset = -10 * absDist;
              } else if (dist >= 2) {
                // images to the right – scale down and tilt right
                const absDist = dist - 1; // because we have two central
                scale = Math.max(0.6, 1 - absDist * 0.2);
                rotateY = 20 * absDist;
                yOffset = -10 * absDist;
              } else {
                // central two images – full size, no tilt
                scale = 1;
                rotateY = 0;
                yOffset = 0;
              }

              // Determine if this image is in the active pair (for title opacity)
              const isActive = dist === 0 || dist === 1;

              return (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 flex flex-col items-center gap-2"
                  style={{
                    width: itemWidth,
                    height: itemWidth,
                    perspective: 800,
                  }}
                  animate={{
                    rotateY: rotateY,
                    scale: scale,
                    y: yOffset,
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
                >
                  <div
                    className={`text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-70'
                    } text-[#263238] font-medium`}
                  >
                    {item.title || item.category || 'Untitled'}
                  </div>

                  <img
                    src={item.image_url}
                    alt={item.title || 'Gallery image'}
                    className="w-full h-full object-cover rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => goToPair(i - (i >= activeIndex + 2 ? 1 : 0))} // snap to pair
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mt-8 w-fit px-2 mx-auto flex items-center gap-4 justify-center text-[#263238] rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 border border-[#FFF314]/20 shadow-lg z-20">
          <button
            onClick={toPrev}
            disabled={!canPrev}
            className="p-2 cursor-pointer hover:bg-[#FFF314]/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots – one per possible pair */}
          <div className="w-[100px] flex justify-center items-center gap-2">
            {Array.from({ length: Math.max(1, totalImages - 1) }).map((_, i) => (
              <div
                key={i}
                onClick={() => goToPair(i)}
                className={`rounded-full cursor-pointer h-2 transition-[width,background-color] duration-300 ${
                  activeIndex === i
                    ? 'w-7 bg-[#FFF314]'
                    : 'w-2 bg-[#263238]/30 hover:bg-[#263238]/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={toNext}
            disabled={!canNext}
            className="p-2 cursor-pointer hover:bg-[#FFF314]/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#263238]/40 text-xs flex flex-col items-center gap-1 animate-bounce z-10">
          <span>Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* DONATE FOR BIRDS SECTION */}
      <section className="bg-gradient-to-b from-[#F1F8F5] to-[#e8f5ee] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/20 mb-6">
            <Heart className="w-8 h-8 text-[#263238] fill-[#FFF314]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#263238] mb-4">
            Donate for <span className="text-[#FFF314]">Birds</span>
          </h2>
          <p className="text-[#263238]/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Your contribution helps us protect and care for our feathered friends.
            Every donation, big or small, makes a difference in preserving bird
            habitats and supporting wildlife conservation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-3 bg-[#263238] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow hover:bg-[#263238]/90">
              Donate Now
            </button>
            <button className="px-8 py-3 bg-white/80 backdrop-blur-sm text-[#263238] font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow border border-[#FFF314]/30">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#263238] text-white/60 text-center py-6 text-sm">
        <p>© {new Date().getFullYear()} Prayas. All rights reserved.</p>
      </footer>
    </div>
  );
}
