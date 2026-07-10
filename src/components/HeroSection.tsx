import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroBanner() {
  const { t } = useTranslation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slides Data for overlay text content
  const SLIDES = [
    {
      id: 1,
      title: t('hero.slides.rural.title', 'Rural Development'),
      description: t(
        'hero.slides.rural.desc',
        'Transforming rural communities through village adoption, water & sanitation, infrastructure, and comprehensive community development.'
      ),
    },
    {
      id: 2,
      title: t('hero.slides.women.title', 'Women Empowerment & Livelihood'),
      description: t(
        'hero.slides.women.desc',
        'Empowering women through Sabji Wali Didi, sewing centres, SHGs, entrepreneurship, and Grah Udyog initiatives.'
      ),
    },
    {
      id: 3,
      title: t('hero.slides.education.title', 'Education & Skill Development'),
      description: t(
        'hero.slides.education.desc',
        'Nurturing young minds through Sanskarshala, digital literacy, career guidance, self-defence, and youth leadership programs.'
      ),
    },
    {
      id: 4,
      title: t('hero.slides.health.title', 'Health & Social Welfare'),
      description: t(
        'hero.slides.health.desc',
        'Promoting organ donation, health camps, elderly care, support for persons with disabilities, child welfare, and community welfare.'
      ),
    },
    {
      id: 5,
      title: t('hero.slides.environment.title', 'Environment & Sustainability'),
      description: t(
        'hero.slides.environment.desc',
        'Committed to plantation drives, Kargil Vatika, and water conservation for a sustainable future.'
      ),
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play text slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, SLIDES.length]);

  // Handle video load
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoad = () => {
        setIsVideoLoaded(true);
        video.play().catch(error => {
          console.log('Video autoplay prevented:', error);
        });
      };
      
      video.addEventListener('loadeddata', handleLoad);
      return () => video.removeEventListener('loadeddata', handleLoad);
    }
  }, []);

  // Handle visibility change to resume video
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleTouchStart = () => {
    setIsAutoPlaying(false);
  };

  const handleSlide = (direction: 'next' | 'prev') => {
    setIsAutoPlaying(false);
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      style={{ height: '100vh', maxHeight: '800px' }}
      onTouchStart={handleTouchStart}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video-poster.jpg" // Optional: add a poster image
        >
          <source src="/IMG_09.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback gradient overlay if video doesn't load */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60" />
        )}
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 z-20"
        >
          <div className="absolute inset-0 flex items-end md:items-center pb-24 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-center md:text-left"
                >
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-2 md:mb-4 leading-tight font-sans">
                    {SLIDES[currentSlide].title}
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto md:mx-0 px-2 md:px-0 font-sans">
                    {SLIDES[currentSlide].description}
                  </p>

                  <div className="flex justify-center md:justify-start">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center gap-2 bg-[#FFF314] text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-[#FFF314]/90 transition-all duration-300 shadow-lg shadow-[#FFF314]/30"
                    >
                      {t('hero.donateNow', 'Donate Now')}
                      <HeartHandshake size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Touch / Click areas for navigation */}
      <button
        onClick={() => handleSlide('prev')}
        className="absolute left-0 top-0 w-1/2 h-full z-30"
        aria-label="Previous slide"
      />
      <button
        onClick={() => handleSlide('next')}
        className="absolute right-0 top-0 w-1/2 h-full z-30"
        aria-label="Next slide"
      />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-[#FFF314]' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
