// src/components/ImpactCategories.tsx
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'

const CATEGORIES = [
  { id: '01', title: 'EDUCATION', desc: 'Quality education for underprivileged children through modern learning centers and dedicated teaching staff.', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=500&fit=crop&q=80' },
  { id: '02', title: 'HEALTHCARE', desc: 'Free medical camps, health awareness programs, and essential healthcare access for underserved communities.', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&q=80' },
  { id: '03', title: 'WOMEN EMPOWERMENT', desc: 'Skill development, self-help groups, and financial independence programs transforming women\'s lives.', img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop&q=80' },
  { id: '04', title: 'CHILD WELFARE', desc: 'Protecting children\'s rights, nutrition programs, and safe shelter initiatives for vulnerable children.', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop&q=80' },
  { id: '05', title: 'ENVIRONMENT', desc: 'Tree plantation drives, waste management, and environmental awareness campaigns for a greener future.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop&q=80' },
  { id: '06', title: 'RURAL DEVELOPMENT', desc: 'Infrastructure development, clean water access, and livelihood programs for rural communities.', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=500&fit=crop&q=80' },
  { id: '07', title: 'SKILL TRAINING', desc: 'Vocational training and skill development programs empowering youth and adults with employable skills.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop&q=80' },
  { id: '08', title: 'DISASTER RELIEF', desc: 'Emergency response, relief distribution, and rehabilitation for disaster-affected communities.', img: 'https://images.unsplash.com/photo-1536643155-33d268924c93?w=800&h=500&fit=crop&q=80' },
  { id: '09', title: 'ANIMAL WELFARE', desc: 'Rescue, shelter, and medical care for stray and injured animals in both urban and rural areas.', img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=500&fit=crop&q=80' },
  { id: '10', title: 'ELDERLY CARE', desc: 'Support, healthcare, and dignity for senior citizens through dedicated community programs.', img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop&q=80' },
  { id: '11', title: 'FOOD SECURITY', desc: 'Food distribution, nutrition programs, and sustainable agriculture for vulnerable communities.', img: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=800&h=500&fit=crop&q=80' },
  { id: '12', title: 'MENTAL HEALTH', desc: 'Mental health awareness, counseling services, and emotional wellbeing programs for all age groups.', img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=500&fit=crop&q=80' },
]

export default function ImpactCategories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50, restDelta: 0.001 })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalSectors = CATEGORIES.length
    const currentIndex = Math.min(totalSectors - 1, Math.floor(latest * totalSectors))
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }
  })

  const category = CATEGORIES[activeIndex]

  return (
    <div ref={containerRef} className="relative w-full bg-black" style={{ height: `${CATEGORIES.length * 100}vh` }}>
      
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)'
      }} />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.8) 100%)'
      }} />

      {/* HUD Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 py-3 flex items-center justify-between border-b border-white/10 bg-black/90 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-[#00f3ff] font-mono text-xs tracking-[0.2em]">PRAYAS.ORG</span>
          <div className="w-px h-3 bg-white/20" />
          <span className="text-white/40 font-mono text-xs">12 IMPACT SECTORS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/40 font-mono text-xs">FPS <strong className="text-[#ccff00]">60</strong></span>
          <div className="w-px h-3 bg-white/20" />
          <span className="text-[#ccff00] font-mono text-xs font-bold">
            {String(Math.round((activeIndex / (CATEGORIES.length - 1)) * 100)).padStart(3, '0')}%
          </span>
        </div>
      </div>

      {/* HUD Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-6 py-3 flex items-center justify-between border-t border-white/10 bg-black/90 backdrop-blur-sm">
        <span className="text-white/40 font-mono text-xs">SECTION: {category.id}/12</span>
        <span className="text-white/40 font-mono text-xs">SCROLL TO NAVIGATE</span>
        <span className="text-white/40 font-mono text-xs">{category.title}</span>
      </div>

      {/* Sticky Main Display */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        {/* Large Background Image */}
        <motion.div 
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.img})` }}
        />

        {/* Center Content */}
        <motion.div 
          key={activeIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl"
        >
          {/* ID Badge */}
          <div className="mb-8">
            <span className="text-[#ff003c] font-mono text-sm tracking-[0.3em] font-bold border border-[#ff003c]/30 px-4 py-2">
              {category.id} / 12
            </span>
          </div>

          {/* Title */}
          <h1 className="font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 tracking-tighter leading-none"
            style={{ 
              fontFamily: '"Syncopate", "Bebas Neue", sans-serif',
              textShadow: '0 0 60px rgba(255,0,60,0.3), 0 0 120px rgba(0,243,255,0.2)'
            }}>
            {category.title}
          </h1>

          {/* Description */}
          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-2xl font-mono leading-relaxed mb-8">
            {category.desc}
          </p>

          {/* Progress Bar */}
          <div className="w-64 md:w-96 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full"
              style={{ 
                width: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
                background: 'linear-gradient(90deg, #ff003c, #00f3ff, #ccff00)'
              }}
            />
          </div>

          {/* Corner Decorations */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#ff003c]/30" />
          <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#00f3ff]/30" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-[#ccff00]/30" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#ff003c]/30" />
        </motion.div>

        {/* Side Navigation Dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-30">
          {CATEGORIES.map((cat, i) => (
            <div 
              key={i} 
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? '12px' : '6px',
                height: i === activeIndex ? '12px' : '6px',
                backgroundColor: i === activeIndex ? '#00f3ff' : 'rgba(255,255,255,0.2)',
                boxShadow: i === activeIndex ? '0 0 12px #00f3ff' : 'none'
              }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <span className="text-white/25 text-xs font-mono tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>

      {/* Detail Cards Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        {CATEGORIES.map((cat, i) => (
          <section 
            key={i} 
            className="h-screen w-full flex items-end md:items-center pb-28 md:pb-0 px-6 md:px-20"
            style={{ justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}
          >
            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="pointer-events-auto w-full max-w-md bg-black/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 relative group"
              style={{
                boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.5)'
              }}
            >
              {/* Card Accent Corners */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-[#ff003c]/50 group-hover:w-full group-hover:h-full transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-[#00f3ff]/50 group-hover:w-full group-hover:h-full transition-all duration-500" />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="font-mono text-xs tracking-[0.2em] text-[#ff003c]">ID-{cat.id}</span>
                <span className="font-mono text-xs text-white/30">{cat.title}</span>
              </div>

              {/* Card Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3" style={{ fontFamily: '"Syncopate", "Bebas Neue", sans-serif' }}>
                {cat.title}
              </h3>

              {/* Card Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-6 font-mono">
                {cat.desc}
              </p>

              {/* Card Image */}
              <div className="w-full h-40 rounded overflow-hidden mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
              </div>

              {/* Card Action */}
              <button className="inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold text-black bg-[#00f3ff] hover:bg-[#00f3ff]/80 transition-colors">
                EXPLORE <span className="text-lg leading-none">→</span>
              </button>
            </motion.div>
          </section>
        ))}
      </div>

      {/* Styles */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Syncopate:wght@400;700&family=Bebas+Neue&display=swap");
        
        .font-mono {
          font-family: "JetBrains Mono", monospace;
        }
      `}</style>
    </div>
  )
}
