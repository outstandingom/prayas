import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroBanner() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const SLIDES = useMemo(
    () => [
      {
        id: 1,
        title: t('hero.slides.rural.title', 'Rural Development'),
        description: t(
          'hero.slides.rural.desc',
          'Village Adoption · Water & Sanitation · Infrastructure · Community Development'
        ),
        image: '/EDUCATION.JPG',
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

  const getBackgroundPosition = (slide: (typeof SLIDES)[0]) => {
    if (slide.backgroundPosition) return slide.backgroundPosition;
    return slide.imagePosition === 'right' ? '70% center' : 'center center';
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      style={{
        marginTop: 'var(--navbar-height, 0px)',
      }}
      // Responsive height: 60vh on mobile, full remaining on larger screens
      // Using min-height ensures content doesn't overflow if text is long
      // You can replace '60vh' with '400px' if you prefer a fixed height
      onTouchStart={handleTouchStart}
    >
      <div className="min-h-[60vh] md:min-h-[calc(100vh-var(--navbar-height,0px))] relative">
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

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

            {/* Content - centered on mobile, left-aligned on larger screens */}
            <div className="absolute inset-0 flex items-center justify-center md:justify-start px-4 md:px-8">
              <div className="max-w-2xl w-full md:ml-0 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4 leading-tight">
                    {SLIDES[currentSlide].title}
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto md:mx-0">
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
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
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
      </div>
    </section>
  );
}
