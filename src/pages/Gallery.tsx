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
  const [activeIndex, setActiveIndex] = useState(0); // leftmost image of the central pair

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
        // start with the middle pair (if possible)
        const mid = Math.floor((data.length - 1) / 2);
        setActiveIndex(Math.min(mid, data.length - 2));
      } else {
        setImages([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = images.length;
  const maxIndex = total - 2; // last possible pair start

  const toPrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const toNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const toSlide = (index: number) => {
    setActiveIndex(Math.min(Math.max(0, index), maxIndex));
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

  // Each image takes full wrapper width; we'll have two central images.
  const imageWidth = 'clamp(120px, 80vmin, 300px)';

  // Translate X to center the pair: we want the middle of the two central images
  // to align with the center of the wrapper.
  // The total width is total * imageWidth. We shift so that the pair's center
  // (at index activeIndex + 0.5) is at the center of the wrapper.
  // Using percentage: - (activeIndex + 0.5) / total * 100%
  const translateX = `-${((activeIndex + 0.5) / total) * 100}%`;

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
          {images.length} images • Drag to explore
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className={`w-[${imageWidth}] mt-4 z-10 overflow-hidden`}>
        <motion.div
          className="flex w-fit"
          animate={{ x: translateX }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
        >
          {images.map((item, i) => {
            // Distance from the leftmost central image
            const dist = i - activeIndex;
            // Two central images: dist = 0 or 1
            const isCentral = dist === 0 || dist === 1;
            // For left side (dist < 0) we rotate negatively; for right side (dist > 1) positively.
            // Use the distance to compute rotation, scale, and y offset.
            let rotate = 0;
            let scale = 1;
            let yOffset = 0;
            if (dist < 0) {
              const absDist = Math.abs(dist);
              rotate = -30 * absDist;
              scale = 1 - 0.4 * Math.min(absDist, 1.5); // scale down to 0.6 min
              yOffset = -50 * absDist;
            } else if (dist > 1) {
              const absDist = dist - 1; // because the first right image (dist=2) should be like dist=1 on right
              rotate = 30 * absDist;
              scale = 1 - 0.4 * Math.min(absDist, 1.5);
              yOffset = 50 * absDist;
            } else {
              // central pair: no rotation, full scale, no y offset
              rotate = 0;
              scale = 1;
              yOffset = 0;
            }

            return (
              <motion.div
                key={item.id}
                className={`w-[${imageWidth}] aspect-square flex flex-col items-center gap-2 will-change-[transform,scale]`}
                animate={{
                  rotate: rotate,
                  scale: scale,
                  y: `${yOffset}%`,
                }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
              >
                <div
                  className={`text-xs md:text-sm whitespace-nowrap will-change-[opacity,filter] transition-all duration-300 ${
                    isCentral ? 'opacity-100 scale-100' : 'opacity-0 scale-70'
                  } text-[#263238] font-medium`}
                >
                  {item.title || item.category || 'Untitled'}
                </div>

                <img
                  src={item.image_url}
                  alt={item.title || 'Gallery image'}
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
          disabled={activeIndex === 0}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots – one per pair */}
        <div className="w-[180px] flex justify-center items-center gap-2">
          {Array.from({ length: Math.max(1, total - 1) }).map((_, i) => (
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
          disabled={activeIndex === maxIndex}
          className="p-2 cursor-pointer hover:bg-[#FFF314]/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
