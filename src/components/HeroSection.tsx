import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Users, HeartHandshake, Leaf, Stethoscope, Home, Lightbulb } from 'lucide-react'
import { useState, useEffect } from 'react'

// Slides Data - 7 meaningful slides
const SLIDES = [
  {
    id: 1,
    icon: GraduationCap,
    title: "Education",
    subtitle: "Improving Children for a Better World",
    description: "We provide quality education to underprivileged children, building foundations for lifelong learning and empowering the next generation of leaders.",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "10,000+ Children Educated",
    color: "#FFF314"
  },
  {
    id: 2,
    icon: Users,
    title: "Women Empowerment",
    subtitle: "Building Strong, Independent Women",
    description: "Through skill development, entrepreneurship programs, and leadership training, we help women gain financial independence and social confidence.",
    image: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "5,000+ Women Empowered",
    color: "#FFF314"
  },
  {
    id: 3,
    icon: HeartHandshake,
    title: "Healthcare",
    subtitle: "Ensuring Healthy Communities",
    description: "Our medical camps and health awareness programs bring essential healthcare services to remote and underserved communities.",
    image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "50+ Medical Camps",
    color: "#FFF314"
  },
  {
    id: 4,
    icon: Leaf,
    title: "Environment",
    subtitle: "Protecting Our Planet Together",
    description: "From tree plantation drives to waste management initiatives, we're committed to creating a sustainable and greener future for all.",
    image: "https://images.pexels.com/photos/3192815/pexels-photo-3192815.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "100,000+ Trees Planted",
    color: "#FFF314"
  },
  {
    id: 5,
    icon: Stethoscope,
    title: "Nutrition",
    subtitle: "Nourishing Bodies and Minds",
    description: "Our nutrition programs ensure that children and families receive proper meals, supplements, and education about healthy eating habits.",
    image: "https://images.pexels.com/photos/6646959/pexels-photo-6646959.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "20,000+ Meals Served",
    color: "#FFF314"
  },
  {
    id: 6,
    icon: Home,
    title: "Shelter",
    subtitle: "A Roof Over Every Head",
    description: "We work to provide safe and dignified housing solutions for homeless families, creating secure environments where they can thrive.",
    image: "https://images.pexels.com/photos/2363800/pexels-photo-2363800.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "500+ Homes Built",
    color: "#FFF314"
  },
  {
    id: 7,
    icon: Lightbulb,
    title: "Skill Development",
    subtitle: "Empowering Through Knowledge",
    description: "Our vocational training programs equip youth and adults with practical skills for employment, fostering economic independence and growth.",
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    stats: "3,000+ People Trained",
    color: "#FFF314"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const CurrentIcon = SLIDES[currentSlide].icon;

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-20 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00897B]/10 backdrop-blur-sm border border-[#00897B]/30 text-[#00897B] font-bold font-mono text-xs uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#00897B] animate-pulse" />
              Empowering Communities Globally
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-[#263238]"
            >
              Together We Can Build A <span className="text-[#00897B]">Better World</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-[#263238]/80 max-w-2xl leading-relaxed font-light"
            >
              We are dedicated to creating sustainable impact through grassroots education, comprehensive healthcare, and community-led environmental initiatives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                to="/donate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00897B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#00695C] transition-all duration-300 shadow-lg shadow-[#00897B]/30 hover:shadow-[#00897B]/50 hover:scale-105"
              >
                Donate Now <Heart size={18} />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-[#00897B] border-2 border-[#00897B]/30 hover:bg-[#00897B]/10 transition-all duration-300 hover:border-[#00897B]/50"
              >
                Get Involved
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Image Slider with Sidebar */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '600px' }}>
              
              {/* Main Image Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Slide Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: '#FFF314' }}
                      >
                        <CurrentIcon size={24} className="text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{SLIDES[currentSlide].title}</h3>
                        <p className="text-[#FFF314] font-semibold text-sm">{SLIDES[currentSlide].subtitle}</p>
                      </div>
                    </motion.div>
                    <p className="text-white/90 text-sm md:text-base mb-4">
                      {SLIDES[currentSlide].description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF314]/20 backdrop-blur-sm border border-[#FFF314]/30">
                      <span className="text-[#FFF314] font-bold text-sm">{SLIDES[currentSlide].stats}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              >
                <ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              >
                <ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute top-6 right-6 flex gap-2">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className="relative"
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-[#FFF314] scale-125'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar - Slide Thumbnails */}
            <div className="hidden lg:flex absolute -right-32 top-0 bottom-0 flex-col justify-center gap-3">
              {SLIDES.map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <motion.button
                    key={slide.id}
                    onClick={() => handleDotClick(index)}
                    className={`group flex items-center gap-4 transition-all duration-300 ${
                      index === currentSlide ? 'translate-x-[-16px]' : ''
                    }`}
                    whileHover={{ x: -8 }}
                  >
                    {/* Thumbnail Image */}
                    <div
                      className={`w-24 h-16 rounded-lg bg-cover bg-center transition-all duration-300 border-2 ${
                        index === currentSlide
                          ? 'border-[#FFF314] shadow-lg shadow-[#FFF314]/30 scale-110'
                          : 'border-white/20 hover:border-[#FFF314]/50'
                      }`}
                      style={{ backgroundImage: `url(${slide.image})` }}
                    >
                      <div className="absolute inset-0 bg-black/40 rounded-lg" />
                    </div>
                    
                    {/* Slide Info */}
                    <div className={`transition-all duration-300 ${
                      index === currentSlide ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 overflow-hidden'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-[#FFF314]" />
                        <span className="text-sm font-bold text-gray-800 whitespace-nowrap">{slide.title}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 whitespace-nowrap">{slide.subtitle}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Thumbnail Strip */}
            <div className="lg:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
              {SLIDES.map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <button
                    key={slide.id}
                    onClick={() => handleDotClick(index)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-[#FFF314] text-gray-900 shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-semibold whitespace-nowrap">{slide.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#81C784]/10 blur-[100px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] rounded-full bg-[#00897B]/10 blur-[100px] animate-float-slower pointer-events-none" />

      {/* CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 20px) scale(0.96); }
        }
        
        .animate-float-slow {
          animation: float-slow 14s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
