import { motion, AnimatePresence, type Variants } from 'framer-motion';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<number>(1);

  const SLIDES = useMemo(
    () => [
      {
        id: 1,
        mainPrefix: '',
        highlight: 'Rural Development',
        mainSuffix: '',
        description: t(
          'hero.slides.rural.desc',
          'Transforming villages with infrastructure, clean water, sanitation, and holistic community empowerment.'
        ),
        image: '/ruraldevelopment.jpeg',
        objectPosition: 'center center',
        ctaText: 'Learn More',
        route: '/rural-development',
      },
      {
        id: 2,
        mainPrefix: '',
        highlight: 'Women Empowerment',
        mainSuffix: '',
        description: t(
          'hero.slides.women.desc',
          'Vocational skill development, tailoring centres, financial independence, and SHGs for women.'
        ),
        image: '/WOMEN.jpeg',
        objectPosition: 'center center',
        ctaText: 'Learn More',
        route: '/women-empowerment',
      },
      {
        id: 3,
        mainPrefix: '',
        highlight: 'Education & Skills',
        mainSuffix: '',
        description: t(
          'hero.slides.education.desc',
          'Sanskarshala value education, digital literacy labs, career counselling, and youth leadership.'
        ),
        image: '/assets/education/digital-literacy-lab.jpg',
        objectPosition: 'center 25%',
        ctaText: 'Learn More',
        route: '/education',
      },
      {
        id: 4,
        mainPrefix: '',
        highlight: 'Health & Welfare',
        mainSuffix: '',
        description: t(
          'hero.slides.health.desc',
          'Free rural health camps, organ donation drives, elderly support, and child welfare initiatives.'
        ),
        image: '/healthcaret.jpg',
        objectPosition: 'center center',
        ctaText: 'Learn More',
        route: '/healthcare',
      },
      {
        id: 5,
        mainPrefix: '',
        highlight: 'Environment',
        mainSuffix: '',
        description: t(
          'hero.slides.environment.desc',
          'Massive tree plantation drives, Kargil Vatika tribute forest, and rainwater harvesting projects.'
        ),
        image: '/TREEGROW.jpg',
        objectPosition: 'center center',
        ctaText: 'Learn More',
        route: '/environment',
      },
    ],
    [t]
  );

  const slideDuration = 5500; // ms

  const handleNextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, [SLIDES.length]);

  const handlePrevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, [SLIDES.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Continuous Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, slideDuration);
    return () => clearInterval(timer);
  }, [handleNextSlide, slideDuration]);

  // Touch Swipe Handling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextSlide();
      else handlePrevSlide();
    }
    setTouchStartX(null);
  };

  const activeSlide = SLIDES[currentSlide];

  // Motion variants for synced left text transition
  const textVariants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 25 : -25,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: (dir: number) => ({
      y: dir < 0 ? 25 : -25,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <section
      className="relative w-full lg:min-h-[calc(100vh-var(--navbar-height,68px))] bg-white text-[#263238] overflow-hidden select-none flex flex-col justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── Main Hero Split Layout Grid ─── */}
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 items-start relative z-10 pt-0 pb-4 lg:pb-6">

        {/* ─── LEFT COLUMN: Clean White Side with Synced Text & Hand-Drawn Highlights (Order 2 on Mobile, Order 1 on Desktop) ─── */}
        <div className="lg:col-span-5 px-6 sm:px-10 lg:px-10 xl:px-14 py-2 lg:py-4 flex flex-col justify-center relative z-30 order-2 lg:order-1 self-center">

          <div className="my-auto py-1 space-y-4 lg:space-y-5 xl:space-y-8 max-w-xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4 lg:space-y-5 xl:space-y-6"
              >
                {/* Hand-lettered Headline with Yellow Sparkle Highlight */}
                <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-6xl font-extrabold text-[#263238] leading-[1.15] tracking-tight font-sans">
                  {activeSlide.mainPrefix}{' '}
                  <span className="relative inline-block text-[#F5B800] dark:text-[#F5B800] font-heading font-normal underline decoration-[#FFF314] decoration-4 underline-offset-4">
                    {activeSlide.highlight}
                    {/* Crown / Sparkle rays decoration over highlighted text */}
                    <svg
                      className="absolute -top-4 -right-5 w-7 h-7 text-[#FFF314]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 2v4M5 5l2.5 2.5M19 5l-2.5 2.5M2 12h4M18 12h4" />
                    </svg>
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  {activeSlide.mainSuffix}
                </h1>

                {/* Description Subtext */}
                <p className="text-sm sm:text-base lg:text-base xl:text-lg text-gray-600 leading-relaxed font-sans max-w-lg">
                  {activeSlide.description}
                </p>

                {/* Pill Yellow CTA Button with Heart Icon */}
                <div className="pt-1 lg:pt-2">
                  <button
                    onClick={() => navigate(activeSlide.route)}
                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold bg-[#FFF314] hover:bg-[#FBE000] text-[#263238] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#E6DB00]"
                  >
                    <span>{activeSlide.ctaText}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Moon-Border Curved Photo Frame (Order 1 on Mobile, Order 2 on Desktop) ─── */}
        <div className="lg:col-span-7 pr-0 sm:pr-0 lg:pr-0 pl-0 sm:pl-4 lg:pl-6 relative flex items-start justify-end pt-0 pb-1 mt-0 z-20 order-1 lg:order-2">

          {/* Yellow Canvas Container with Lunar Arc / Moon Curve on Bottom-Left Corner */}
          <div className="relative w-full h-[340px] sm:h-[440px] md:h-[480px] lg:h-[calc(100vh-var(--navbar-height,68px)-48px)] lg:max-h-[480px] lg:min-h-[380px] xl:h-[620px] xl:max-h-[650px] p-2.5 sm:p-4 rounded-tr-none rounded-tl-none sm:rounded-tl-3xl rounded-br-none sm:rounded-br-none rounded-bl-[100px] sm:rounded-bl-[180px] lg:rounded-bl-[240px] xl:rounded-bl-[300px] bg-[#FFF314] shadow-2xl transition-transform duration-500 hover:scale-[1.01] mt-0">

            {/* Spray Paint Splatters - Moon Curve Bottom Left Accent */}
            <svg className="absolute -bottom-6 -left-6 w-28 h-28 text-[#FFF314] pointer-events-none z-20" viewBox="0 0 100 100">
              <path d="M50,50 Q20,10 0,30 Q30,70 10,90 Q60,70 50,50 Z" fill="currentColor" opacity="0.9" />
              <circle cx="20" cy="85" r="5" fill="currentColor" />
              <circle cx="8" cy="60" r="6" fill="currentColor" />
              <circle cx="35" cy="90" r="4" fill="currentColor" />
              <circle cx="70" cy="82" r="5" fill="currentColor" />
            </svg>

            {/* Spray Paint Splatters - Top Right Corner */}
            <svg className="absolute -top-3 -right-3 w-20 h-20 text-[#FFF314] pointer-events-none z-20" viewBox="0 0 100 100">
              <path d="M50,50 Q80,90 100,70 Q70,30 90,10 Q40,30 50,50 Z" fill="currentColor" opacity="0.9" />
              <circle cx="85" cy="15" r="5" fill="currentColor" />
              <circle cx="95" cy="40" r="4" fill="currentColor" />
              <circle cx="65" cy="10" r="6" fill="currentColor" />
            </svg>

            {/* Inner Photo Container - Conforming to the Moon Arc Shape */}
            <div className="relative w-full h-full rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-[130px] sm:rounded-bl-[208px] lg:rounded-bl-[285px] overflow-hidden bg-gray-950 shadow-inner group">

              {/* Animated Photo Transition with Precise Focal Alignment */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={activeSlide.id}
                  src={activeSlide.image}
                  alt={activeSlide.highlight}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.6, ease: 'easeInOut' },
                    scale: { duration: 5, ease: 'easeOut' },
                  }}
                  style={{ objectPosition: activeSlide.objectPosition || 'center center' }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[102%] contrast-[103%]"
                />
              </AnimatePresence>

              {/* Subtle Gradient Scrim at Bottom for Control Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Slide Category Indicator Dots */}
              <div className="absolute top-5 right-5 z-30 flex items-center gap-1.5 bg-gray-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === currentSlide ? 'bg-[#FFF314] w-6' : 'bg-white/60 hover:bg-white'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
