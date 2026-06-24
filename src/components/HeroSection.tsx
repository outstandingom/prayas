import { motion, AnimatePresence } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function HeroBanner() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slides Data - 7 meaningful slides with local images
  const SLIDES = useMemo(() => [
    {
      id: 1,
      title: t('hero.slides.education.title', 'Education'),
      description: t('hero.slides.education.desc', 'Opening doors to a better future through the power of education.'),
      image: "/EDUCATION.JPG",
      imagePosition: "center",
    },
    {
      id: 2,
      title: t('hero.slides.women.title', 'Women Empowerment'),
      description: t('hero.slides.women.desc', 'Empowering women to break away from the vicious cycle of poverty.'),
      image: "/women.JPG",
      imagePosition: "right",
    },
    {
      id: 3,
      title: t('hero.slides.healthcare.title', 'Healthcare'),
      description: t('hero.slides.healthcare.desc', 'Our medical camps and health awareness programs bring essential healthcare services to remote and underserved communities.'),
      image: "/IMG-23.jpeg",
      imagePosition: "center",
    },
    {
      id: 4,
      title: t('hero.slides.environment.title', 'Environment'),
      description: t('hero.slides.environment.desc', 'Nurturing the environment through awareness, action, and responsibility.'),
      image: "/IMG-21.jpg",
      imagePosition: "right",
    },
    {
      id: 5,
      title: t('hero.slides.nutrition.title', 'Nutrition'),
      description: t('hero.slides.nutrition.desc', 'Our nutrition programs ensure that children and families receive proper meals, supplements, and education about healthy eating habits.'),
      image: "/IMG-26.jpeg",
      imagePosition: "center",
    },
    {
      id: 6,
      title: t('hero.slides.shelter.title', 'Shelter'),
      description: t('hero.slides.shelter.desc', 'Transforming rural lives through sustainable development and hope.'),
      image: "/IMG-25.jpeg",
      imagePosition: "right",
    },
    {
      id: 7,
      title: t('hero.slides.skill.title', 'Skill Development'),
      description: t('hero.slides.skill.desc', 'Our vocational training programs equip youth and adults with practical skills for employment, fostering economic independence and growth.'),
      image: "/IMG-20.jpg",
      imagePosition: "center",
    }
  ], [t]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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
      
      {/* Main Banner Image with Smooth Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="w-full h-full bg-cover bg-no-repeat"
            style={{ 
              backgroundImage: `url(${SLIDES[currentSlide].image})`,
              backgroundPosition: SLIDES[currentSlide].imagePosition === 'right' 
                ? '70% center'
                : 'center center'
            }}
          />
          
          {/* No dark overlays – images are full colour */}

          {/* Content - Title, Description, and Donate Button */}
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

      {/* Touch Areas for Swipe Navigation (Invisible) */}
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
  )
}
