import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroBanner() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Updated slides for the 5 categories
  const SLIDES = useMemo(
    () => [
      {
        id: 1,
        title: t('hero.slides.rural.title', 'Rural Development'),
        description: t(
          'hero.slides.rural.desc',
          'Village Adoption · Water & Sanitation · Infrastructure · Community Development'
        ),
        image: '/EDUCATION.JPG', // Replace with relevant image
        imagePosition: 'right',
        backgroundPosition: '85% center',
      },
      {
        id: 2,
        title: t('hero.slides.women.title', 'Women Empowerment & Livelihood'),
        description: t(
          'hero.slides.women.desc',
          'Sabji Wali Didi · Sewing Centres · SHGs · Entrepreneurship · Grah Udyog'
        ),
        image: '/P1039322.JPG',
        imagePosition: 'right',
      },
      {
        id: 3,
        title: t('hero.slides.education.title', 'Education & Skill Development'),
        description: t(
          'hero.slides.education.desc',
          'Sanskarshala · Digital Literacy · Career Guidance · Self‑Defence · Youth Leadership'
        ),
        image: '/P1039409.JPG',
        imagePosition: 'center',
      },
      {
        id: 4,
        title: t('hero.slides.health.title', 'Health & Social Welfare'),
        description: t(
          'hero.slides.health.desc',
          'Organ Donation · Health Camps · Elderly Care · Support for Persons with Disabilities · Child Welfare · Community Welfare'
        ),
        image: '/PRAYASHEALTHCAMP.jpeg',
        imagePosition: 'center',
      },
      {
        id: 5,
        title: t('hero.slides.environment.title', 'Environment & Sustainability'),
        description: t(
          'hero.slides.environment.desc',
          'Plantation · Kargil Vatika · Water Conservation'
        ),
        image: '/TREEGROW.jpg',
        imagePosition: 'center',
      },
    ],
    [t]
  );

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, SLIDES.length]);

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

  // Determine background position: use custom if provided, else fallback to imagePosition logic
  const getBackgroundPosition = (slide: (typeof SLIDES)[0]) => {
    if (slide.backgroundPosition) return slide.backgroundPosition;
    return slide.imagePosition === 'right' ? '70% center' : 'center center';
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      style={{ height: '100vh', maxHeight: '800px' }}
      onTouchStart={handleTouchStart}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${SLIDES[currentSlide].image})`,
              backgroundPosition: getBackgroundPosition(SLIDES[currentSlide]),
            }}
          />

          {/* Content */}
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
        className="absolute left-0 top-0 w-1/2 h-full z-10"
        aria-label="Previous slide"
      />
      <button
        onClick={() => handleSlide('next')}
        className="absolute right-0 top-0 w-1/2 h-full z-10"
        aria-label="Next slide"
      />
    </section>
  );
}
