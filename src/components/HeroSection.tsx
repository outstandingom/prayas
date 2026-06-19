import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronLeft, ChevronRight, GraduationCap, Users, HeartHandshake, Leaf, Stethoscope, Home, Lightbulb } from 'lucide-react'
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
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#F1F8F5]">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-20 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#00897B]/20 text-[#00897B] font-bold font-mono text-xs uppercase tracking-widest mb-6"
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

          {/* Right Side - Image Slider with Blended Design */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '550px' }}>
              
              {/* Main Image Display with Blended Overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {/* Background Image */}
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
                  />
                  
                  {/* Blended Gradient Overlay - White/Mint fade from left, transparent on right */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                  
                  {/* Text Content Overlay on Image */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-4"
                    >
                      {/* Icon with frosted glass effect */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm border border-white flex items-center justify-center shadow-lg">
                        <CurrentIcon size={28} className="text-[#00897B]" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF314]/90 backdrop-blur-sm mb-3">
                          <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                            {SLIDES[currentSlide].stats}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#263238] mb-2">
                          {SLIDES[currentSlide].title}
                        </h3>
                        <p className="text-[#00897B] font-semibold text-lg mb-3">
                          {SLIDES[currentSlide].subtitle}
                        </p>
                        <p className="text-[#263238]/70 text-sm md:text-base leading-relaxed max-w-md">
                          {SLIDES[currentSlide].description}
                        </p>
                        
                        {/* Learn More Link */}
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="mt-4 inline-flex items-center gap-2 text-[#00897B] font-semibold text-sm group"
                        >
                          Learn More 
                          <svg 
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Frosted Glass */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/90 transition-all duration-300 shadow-lg group"
              >
                <ChevronLeft size={20} className="text-[#263238] group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/90 transition-all duration-300 shadow-lg group"
              >
                <ChevronRight size={20} className="text-[#263238] group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Sidebar Navigation - Clean, Light Design */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 p-2 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-lg">
                {SLIDES.map((slide, index) => {
                  const Icon = slide.icon;
                  const isActive = index === currentSlide;
                  
                  return (
                    <motion.button
                      key={slide.id}
                      onClick={() => handleDotClick(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-white shadow-md'
                          : 'hover:bg-white/50'
                      }`}
                    >
                      {/* Thumbnail Preview on Hover */}
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-lg bg-cover bg-center transition-all duration-300 ${
                          isActive ? 'ring-2 ring-[#FFF314] ring-offset-2' : ''
                        }`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                        />
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFF314] rounded-full border-2 border-white"
                          />
                        )}
                      </div>
                      
                      {/* Label - Visible on larger screens */}
                      <div className="hidden xl:block">
                        <div className="flex items-center gap-1.5">
                          <Icon size={14} className={isActive ? 'text-[#00897B]' : 'text-gray-500'} />
                          <span className={`text-sm font-semibold whitespace-nowrap ${
                            isActive ? 'text-[#263238]' : 'text-gray-500'
                          }`}>
                            {slide.title}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
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
