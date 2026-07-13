import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroBanner() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, ChevronLeft, ChevronRight } from 'lucide-react';
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
      onTouchStart={handleTouchStart}
    >
      <div className="aspect-video md:aspect-auto md:min-h-[calc(100vh-var(--navbar-height,0px))] max-h-[300px] md:max-h-none relative">
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

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between px-4 md:px-8 py-6 md:py-10">
              <div className="flex-1" />

              {/* Heading */}
              <div className="flex-1 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-full max-w-4xl text-center"
                >
                  <h1 className="text-xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-1 md:mb-4 leading-tight">
                    {SLIDES[currentSlide].title}
                  </h1>
                </motion.div>
              </div>

              {/* Bottom block: description + donate button */}
              <div className="w-full max-w-4xl mx-auto text-center pb-2 md:pb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed mb-3 md:mb-6">
                    {SLIDES[currentSlide].description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 bg-[#FFF314] text-gray-900 px-4 md:px-8 py-1.5 md:py-4 rounded-full font-bold text-xs md:text-base hover:bg-[#FFF314]/90 transition-all duration-300 shadow-lg shadow-[#FFF314]/30"
                  >
                    {t('hero.donateNow', 'Donate Now')}
                    <HeartHandshake size={16} className="md:w-5 md:h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 
          ✅ NEW: Visible arrow buttons on the far edges.
          They don't cover the main content, so all buttons are clickable.
        */}
        <button
          onClick={() => handleSlide('prev')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-1 md:p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="md:w-8 md:h-8" />
        </button>
        <button
          onClick={() => handleSlide('next')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-1 md:p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="md:w-8 md:h-8" />
        </button>
      </div>
    </section>
  );
}

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
      onTouchStart={handleTouchStart}
    >
      <div className="aspect-video md:aspect-auto md:min-h-[calc(100vh-var(--navbar-height,0px))] max-h-[300px] md:max-h-none relative">
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

            {/* Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

            {/* Content container */}
            <div className="absolute inset-0 flex flex-col justify-between px-4 md:px-8 py-6 md:py-10">
              <div className="flex-1" />

              {/* Heading – centred vertically */}
              <div className="flex-1 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-full max-w-4xl text-center"
                >
                  <h1 className="text-xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-1 md:mb-4 leading-tight">
                    {SLIDES[currentSlide].title}
                  </h1>
                </motion.div>
              </div>

              {/* Bottom block: description + button */}
              <div className="w-full max-w-4xl mx-auto text-center pb-2 md:pb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed mb-3 md:mb-6">
                    {SLIDES[currentSlide].description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 bg-[#FFF314] text-gray-900 px-4 md:px-8 py-1.5 md:py-4 rounded-full font-bold text-xs md:text-base hover:bg-[#FFF314]/90 transition-all duration-300 shadow-lg shadow-[#FFF314]/30"
                  >
                    {t('hero.donateNow', 'Donate Now')}
                    <HeartHandshake size={16} className="md:w-5 md:h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 
          ✅ FIX: Navigation buttons now cover only 20% of the width each (left & right edges),
          leaving the centre 60% clickable for the Donate button and other content.
        */}
        <button
          onClick={() => handleSlide('prev')}
          className="absolute left-0 top-0 w-1/5 h-full z-10"
          aria-label="Previous slide"
        />
        <button
          onClick={() => handleSlide('next')}
          className="absolute right-0 top-0 w-1/5 h-full z-10"
          aria-label="Next slide"
        />
      </div>
    </section>
  );
}
