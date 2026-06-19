import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, GraduationCap, Users, HeartHandshake, Leaf, Stethoscope, Home, Lightbulb } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// Slides Data - 7 meaningful slides
const SLIDES = [
  {
    id: 1,
    icon: GraduationCap,
    title: "Education",
    subtitle: "Improving Children for a Better World",
    description: "We provide quality education to underprivileged children, building foundations for lifelong learning and empowering the next generation of leaders.",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "10,000+ Children Educated"
  },
  {
    id: 2,
    icon: Users,
    title: "Women Empowerment",
    subtitle: "Building Strong, Independent Women",
    description: "Through skill development, entrepreneurship programs, and leadership training, we help women gain financial independence and social confidence.",
    image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "5,000+ Women Empowered"
  },
  {
    id: 3,
    icon: HeartHandshake,
    title: "Healthcare",
    subtitle: "Ensuring Healthy Communities",
    description: "Our medical camps and health awareness programs bring essential healthcare services to remote and underserved communities.",
    image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "50+ Medical Camps"
  },
  {
    id: 4,
    icon: Leaf,
    title: "Environment",
    subtitle: "Protecting Our Planet Together",
    description: "From tree plantation drives to waste management initiatives, we're committed to creating a sustainable and greener future for all.",
    image: "https://images.pexels.com/photos/3192815/pexels-photo-3192815.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "100,000+ Trees Planted"
  },
  {
    id: 5,
    icon: Stethoscope,
    title: "Nutrition",
    subtitle: "Nourishing Bodies and Minds",
    description: "Our nutrition programs ensure that children and families receive proper meals, supplements, and education about healthy eating habits.",
    image: "https://images.pexels.com/photos/6646959/pexels-photo-6646959.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "20,000+ Meals Served"
  },
  {
    id: 6,
    icon: Home,
    title: "Shelter",
    subtitle: "A Roof Over Every Head",
    description: "We work to provide safe and dignified housing solutions for homeless families, creating secure environments where they can thrive.",
    image: "https://images.pexels.com/photos/2363800/pexels-photo-2363800.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "500+ Homes Built"
  },
  {
    id: 7,
    icon: Lightbulb,
    title: "Skill Development",
    subtitle: "Empowering Through Knowledge",
    description: "Our vocational training programs equip youth and adults with practical skills for employment, fostering economic independence and growth.",
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "3,000+ People Trained"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [queuedSlide, setQueuedSlide] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const handleSlideChange = (nextIndex: number) => {
    if (nextIndex === currentSlide) return;

    if (isAnimating) {
      setQueuedSlide(nextIndex);
      return;
    }

    setIsAutoPlaying(false);
    setIsAnimating(true);

    // Animate out current text
    const currentTexts = contentRef.current?.querySelectorAll('.text-line');
    if (currentTexts) {
      currentTexts.forEach((line, i) => {
        setTimeout(() => {
          (line as HTMLElement).style.transform = 'translateY(100%)';
          (line as HTMLElement).style.opacity = '0';
        }, i * 60);
      });
    }

    // Wait for exit animation, then switch slide
    setTimeout(() => {
      setCurrentSlide(nextIndex);
      
      // Animate in new text after a brief delay
      setTimeout(() => {
        const newTexts = contentRef.current?.querySelectorAll('.text-line');
        if (newTexts) {
          newTexts.forEach((line, i) => {
            setTimeout(() => {
              (line as HTMLElement).style.transform = 'translateY(0)';
              (line as HTMLElement).style.opacity = '1';
            }, i * 60);
          });
        }
        
        setTimeout(() => {
          setIsAnimating(false);
          if (queuedSlide !== null && queuedSlide !== nextIndex) {
            const q = queuedSlide;
            setQueuedSlide(null);
            handleSlideChange(q);
          }
        }, 600);
      }, 50);
    }, 400);
  };

  const handleNext = () => handleSlideChange((currentSlide + 1) % SLIDES.length);
  const handlePrev = () => handleSlideChange((currentSlide - 1 + SLIDES.length) % SLIDES.length);
  const handleDotClick = (index: number) => handleSlideChange(index);

  const CurrentIcon = SLIDES[currentSlide].icon;
  const currentContent = SLIDES[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-gray-900" style={{ height: '100vh', maxHeight: '800px' }}>
      
      {/* Main Banner with Content */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${currentContent.image})` }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        
        {/* Content Overlay with Line Animation */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <div className="max-w-2xl" ref={contentRef}>
              
              {/* Stats Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF314] mb-6"
              >
                <CurrentIcon size={18} className="text-gray-900" />
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  {currentContent.stats}
                </span>
              </motion.div>
              
              {/* Title with line-by-line animation */}
              <AnimatePresence mode="wait">
                <motion.div key={`content-${currentSlide}`}>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight overflow-hidden">
                    <span className="text-line block" style={{ transition: 'transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997), opacity 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997)' }}>
                      {currentContent.title}
                    </span>
                  </h1>
                  
                  <p className="text-2xl md:text-3xl font-semibold text-[#FFF314] mb-6 overflow-hidden">
                    <span className="text-line block" style={{ transition: 'transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997) 0.06s, opacity 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997) 0.06s' }}>
                      {currentContent.subtitle}
                    </span>
                  </p>
                  
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl overflow-hidden">
                    <span className="text-line block" style={{ transition: 'transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997) 0.12s, opacity 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997) 0.12s' }}>
                      {currentContent.description}
                    </span>
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 bg-[#FFF314] text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-[#FFF314]/90 transition-all duration-300 shadow-lg shadow-[#FFF314]/30"
                >
                  Donate Now
                  <HeartHandshake size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white border-2 border-white/50 hover:bg-white/10 transition-all duration-300 hover:border-[#FFF314]"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/50 transition-all duration-300 group z-10"
      >
        <ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/50 transition-all duration-300 group z-10"
      >
        <ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Bottom Navigation Tabs */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 p-1.5 bg-black/30 backdrop-blur-sm rounded-full border border-white/10">
          {SLIDES.map((slide, index) => {
            const Icon = slide.icon;
            const isActive = index === currentSlide;
            
            return (
              <button
                key={slide.id}
                onClick={() => handleDotClick(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#FFF314] text-gray-900'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                <span className="hidden md:inline">{slide.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-10">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
          <span className="text-[#FFF314] font-bold text-lg">{(currentSlide + 1).toString().padStart(2, '0')}</span>
          <span className="text-white/30">/</span>
          <span className="text-white/50 font-semibold">{SLIDES.length.toString().padStart(2, '0')}</span>
        </div>
      </div>

    </section>
  )
}
