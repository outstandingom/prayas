// src/components/ImpactCategories.tsx
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowRight, ArrowLeft, RotateCcw, Heart, Users, GraduationCap, Stethoscope, Leaf, Home, Briefcase, AlertTriangle, PawPrint, UserCheck, Utensils, Brain } from 'lucide-react'

// 12 NGO Categories with real images
const CATEGORIES = [
  { 
    id: '01', 
    title: 'EDUCATION', 
    desc: 'Quality education for underprivileged children through modern learning centers.',
    icon: GraduationCap,
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop&q=80',
    color: '#FF003C'
  },
  { 
    id: '02', 
    title: 'HEALTHCARE', 
    desc: 'Free medical camps and essential healthcare access for underserved communities.',
    icon: Stethoscope,
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&q=80',
    color: '#00F3FF'
  },
  { 
    id: '03', 
    title: 'WOMEN EMPOWERMENT', 
    desc: 'Skill development and financial independence programs for women.',
    icon: Users,
    img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop&q=80',
    color: '#CCFF00'
  },
  { 
    id: '04', 
    title: 'CHILD WELFARE', 
    desc: 'Protecting children\'s rights with nutrition and safe shelter initiatives.',
    icon: Heart,
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&q=80',
    color: '#FF003C'
  },
  { 
    id: '05', 
    title: 'ENVIRONMENT', 
    desc: 'Tree plantation drives and environmental awareness for a greener future.',
    icon: Leaf,
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop&q=80',
    color: '#00F3FF'
  },
  { 
    id: '06', 
    title: 'RURAL DEVELOPMENT', 
    desc: 'Infrastructure, clean water, and livelihood programs for rural communities.',
    icon: Home,
    img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop&q=80',
    color: '#CCFF00'
  },
  { 
    id: '07', 
    title: 'SKILL TRAINING', 
    desc: 'Vocational training empowering youth with employable skills.',
    icon: Briefcase,
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
    color: '#FF003C'
  },
  { 
    id: '08', 
    title: 'DISASTER RELIEF', 
    desc: 'Emergency response and rehabilitation for disaster-affected communities.',
    icon: AlertTriangle,
    img: 'https://images.unsplash.com/photo-1536643155-33d268924c93?w=600&h=400&fit=crop&q=80',
    color: '#00F3FF'
  },
  { 
    id: '09', 
    title: 'ANIMAL WELFARE', 
    desc: 'Rescue, shelter, and medical care for stray and injured animals.',
    icon: PawPrint,
    img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&q=80',
    color: '#CCFF00'
  },
  { 
    id: '10', 
    title: 'ELDERLY CARE', 
    desc: 'Support and dignity for senior citizens through community programs.',
    icon: UserCheck,
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop&q=80',
    color: '#FF003C'
  },
  { 
    id: '11', 
    title: 'FOOD SECURITY', 
    desc: 'Food distribution and sustainable agriculture for vulnerable communities.',
    icon: Utensils,
    img: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=600&h=400&fit=crop&q=80',
    color: '#00F3FF'
  },
  { 
    id: '12', 
    title: 'MENTAL HEALTH', 
    desc: 'Mental health awareness and counseling services for all age groups.',
    icon: Brain,
    img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&h=400&fit=crop&q=80',
    color: '#CCFF00'
  },
]

export default function ImpactCategories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 30, 
    stiffness: 50, 
    restDelta: 0.001 
  })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalSectors = CATEGORIES.length
    const currentIndex = Math.min(totalSectors - 1, Math.floor(latest * totalSectors))
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }
  })

  const percentage = Math.round((activeIndex / (CATEGORIES.length - 1)) * 100)
  const category = CATEGORIES[activeIndex]
  const IconComponent = category.icon

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0a]" style={{ height: `${CATEGORIES.length * 100}vh` }}>
      
      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)'
      }} />
      
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)'
      }} />

      {/* HUD - Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-[#00F3FF] font-mono text-xs tracking-widest">SYS.READY</span>
          <div className="w-px h-3 bg-white/20" />
          <span className="text-white/40 font-mono text-xs">12 SECTORS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/40 font-mono text-xs">FPS: <strong className="text-[#CCFF00]">60</strong></span>
          <div className="w-px h-3 bg-white/20" />
          <span className="text-[#CCFF00] font-mono text-xs font-bold">
            {String(percentage).padStart(3, '0')}%
          </span>
        </div>
      </div>

      {/* Sticky Content Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Central Display */}
        <motion.div 
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl"
        >
          {/* Category ID */}
          <div className="mb-4 sm:mb-6">
            <span className="text-[#FF003C] font-mono text-sm sm:text-base tracking-[0.3em] font-bold">
              {category.id} / 12
            </span>
          </div>

          {/* Category Icon */}
          <motion.div
            animate={{ 
              boxShadow: [
                `0 0 20px ${category.color}20`,
                `0 0 40px ${category.color}40`,
                `0 0 20px ${category.color}20`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <IconComponent className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" style={{ color: category.color }} />
          </motion.div>

          {/* Category Title */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-none"
            style={{ textShadow: `0 0 40px ${category.color}40` }}>
            {category.title}
          </h2>

          {/* Category Description */}
          <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-lg font-mono leading-relaxed">
            {category.desc}
          </p>

          {/* Progress Bar */}
          <div className="mt-6 sm:mt-8 w-48 sm:w-64 md:w-80 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 rounded-full"
              style={{ 
                width: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
                background: `linear-gradient(90deg, #FF003C, #00F3FF, #CCFF00)`
              }}
            />
          </div>
        </motion.div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-white/20" />

        {/* Navigation Dots - Desktop */}
        {!isMobile && (
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
            {CATEGORIES.map((cat, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === activeIndex ? cat.color : 'rgba(255,255,255,0.2)',
                  boxShadow: i === activeIndex ? `0 0 10px ${cat.color}` : 'none',
                  transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs font-mono tracking-widest uppercase">
              {isMobile ? 'Swipe' : 'Scroll'}
            </span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Category Detail Cards - Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        {CATEGORIES.map((cat, i) => {
          const isLast = i === CATEGORIES.length - 1
          const CatIcon = cat.icon

          return (
            <section 
              key={i} 
              className="h-screen w-full flex items-end md:items-center pb-44 sm:pb-48 md:pb-0 px-4 sm:px-6 md:px-16 lg:px-24"
              style={{ justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}
            >
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="pointer-events-auto w-full max-w-sm sm:max-w-md bg-black/90 backdrop-blur-xl border border-white/10 p-4 sm:p-6 md:p-8 relative group"
              >
                {/* Card corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: cat.color }} />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: cat.color }} />

                {/* Card Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="font-mono text-xs tracking-wider" style={{ color: cat.color }}>
                    ID-{cat.id}
                  </span>
                  <CatIcon className="w-5 h-5 text-white/40" />
                </div>

                {/* Card Title */}
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
                  {cat.title}
                </h3>

                {/* Card Description */}
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {cat.desc}
                </p>

                {/* Action */}
                {isLast ? (
                  <button 
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-black rounded"
                    style={{ backgroundColor: cat.color }}
                  >
                    <RotateCcw className="w-3 h-3" />
                    RESTART
                  </button>
                ) : (
                  <button className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider hover:gap-3 transition-all"
                    style={{ color: cat.color }}>
                    EXPLORE <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </motion.div>
            </section>
          )
        })}
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Syncopate:wght@400;700&family=Bebas+Neue&display=swap");

        .font-display {
          font-family: "Bebas Neue", "Syncopate", sans-serif;
          letter-spacing: 0.05em;
        }

        .font-mono {
          font-family: "JetBrains Mono", monospace;
        }
      `}</style>
    </div>
  )
}
