// src/components/ImpactCategories.tsx
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react'

// 12 NGO Categories with real images
const GALLERY_DATA = [
  { 
    tag: '01', 
    title: 'EDUCATION', 
    desc: 'Providing quality education to underprivileged children through modern learning centers and dedicated teaching staff.', 
    align: 'left' as const, 
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '02', 
    title: 'HEALTHCARE', 
    desc: 'Free medical camps, health awareness programs, and essential healthcare access for underserved communities.', 
    align: 'right' as const, 
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '03', 
    title: 'WOMEN EMPOWERMENT', 
    desc: 'Skill development, self-help groups, and financial independence programs transforming women\'s lives.', 
    align: 'left' as const, 
    img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '04', 
    title: 'CHILD WELFARE', 
    desc: 'Protecting children\'s rights, nutrition programs, and safe shelter initiatives for vulnerable children.', 
    align: 'right' as const, 
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '05', 
    title: 'ENVIRONMENT', 
    desc: 'Tree plantation drives, waste management, and environmental awareness campaigns for a greener future.', 
    align: 'left' as const, 
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '06', 
    title: 'RURAL DEVELOPMENT', 
    desc: 'Infrastructure development, clean water access, and livelihood programs for rural communities.', 
    align: 'right' as const, 
    img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '07', 
    title: 'SKILL TRAINING', 
    desc: 'Vocational training and skill development programs empowering youth and adults with employable skills.', 
    align: 'left' as const, 
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '08', 
    title: 'DISASTER RELIEF', 
    desc: 'Emergency response, relief distribution, and rehabilitation for disaster-affected communities.', 
    align: 'right' as const, 
    img: 'https://images.unsplash.com/photo-1536643155-33d268924c93?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '09', 
    title: 'ANIMAL WELFARE', 
    desc: 'Rescue, shelter, and medical care for stray and injured animals in both urban and rural areas.', 
    align: 'left' as const, 
    img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '10', 
    title: 'ELDERLY CARE', 
    desc: 'Support, healthcare, and dignity for senior citizens through dedicated community programs.', 
    align: 'right' as const, 
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '11', 
    title: 'FOOD SECURITY', 
    desc: 'Food distribution, nutrition programs, and sustainable agriculture for vulnerable communities.', 
    align: 'left' as const, 
    img: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=600&h=400&fit=crop&q=80' 
  },
  { 
    tag: '12', 
    title: 'MENTAL HEALTH', 
    desc: 'Mental health awareness, counseling services, and emotional wellbeing programs for all age groups.', 
    align: 'right' as const, 
    img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&h=400&fit=crop&q=80' 
  },
]

const getFaceForIndex = (index: number) => {
  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom']
  return faces[index % 6]
}

export default function ImpactCategories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [faceImages, setFaceImages] = useState<Record<string, string>>({
    front: GALLERY_DATA[0].img,
    back: GALLERY_DATA[1].img,
    right: GALLERY_DATA[2].img,
    left: GALLERY_DATA[3].img,
    top: GALLERY_DATA[4].img,
    bottom: GALLERY_DATA[5].img,
  })

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
    const totalSectors = GALLERY_DATA.length
    const currentIndex = Math.min(totalSectors - 1, Math.floor(latest * totalSectors))
    
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
      
      setFaceImages(prev => {
        const next = { ...prev }
        const sectorsToLoad = [currentIndex, (currentIndex + 1) % totalSectors, (currentIndex + 2) % totalSectors]
        
        sectorsToLoad.forEach(idx => {
          const face = getFaceForIndex(idx)
          next[face] = GALLERY_DATA[idx].img
        })
        return next
      })
    }
  })

  const rotationAngle = useTransform(smoothProgress, [0, 1], ["0deg", "-360deg"])
  const finalRotation = useSpring(rotationAngle, { damping: 25, stiffness: 40 })

  const percentage = Math.round((activeIndex / (GALLERY_DATA.length - 1)) * 100)

  // Responsive cube size
  const cubeSize = isMobile ? "clamp(140px, 50vw, 240px)" : "clamp(180px, 30vw, 320px)"
  const translateZ = isMobile ? "clamp(70px, 25vw, 120px)" : "clamp(90px, 15vw, 160px)"

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollBack = () => {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative bg-white" ref={containerRef} style={{ height: `${GALLERY_DATA.length * 100}vh` }}>
      
      {/* Section Header - Fixed */}
      <div className="fixed top-24 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#00897B] font-mono text-xs uppercase tracking-widest font-semibold bg-[#00897B]/10 px-4 py-2 rounded-full inline-block"
            >
              Our Impact Areas
            </motion.span>
          </div>
        </div>
      </div>

      {/* Sticky Cube Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white" style={{ perspective: isMobile ? "800px" : "1200px" }}>
        
        {/* Ambient Glow behind cube */}
        <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#00897B]/5 blur-[100px] pointer-events-none" />

        {/* 3D Cube */}
        <div className="relative" style={{ width: cubeSize, height: cubeSize }}>
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              rotateX: finalRotation,
              rotateY: "25deg",
            }}
          >
            {/* Front */}
            <div 
              className="absolute inset-0 overflow-hidden bg-cover bg-center border border-[#00897B]/10 shadow-2xl"
              style={{ 
                backgroundImage: `url(${faceImages.front})`, 
                transform: `translateZ(${translateZ})`,
                backfaceVisibility: 'hidden'
              }} 
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
            {/* Back */}
            <div 
              className="absolute inset-0 overflow-hidden bg-cover bg-center border border-[#00897B]/10 shadow-2xl"
              style={{ 
                backgroundImage: `url(${faceImages.back})`, 
                transform: `rotateY(180deg) translateZ(${translateZ})`,
                backfaceVisibility: 'hidden'
              }} 
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
            {/* Right */}
            <div 
              className="absolute inset-0 overflow-hidden bg-cover bg-center border border-[#00897B]/10 shadow-2xl"
              style={{ 
                backgroundImage: `url(${faceImages.right})`, 
                transform: `rotateY(90deg) translateZ(${translateZ})`,
                backfaceVisibility: 'hidden'
              }} 
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
            {/* Left */}
            <div 
              className="absolute inset-0 overflow-hidden bg-cover bg-center border border-[#00897B]/10 shadow-2xl"
              style={{ 
                backgroundImage: `url(${faceImages.left})`, 
                transform: `rotateY(-90deg) translateZ(${translateZ})`,
                backfaceVisibility: 'hidden'
              }} 
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
            {/* Top */}
            <div 
              className="absolute inset-0 overflow-hidden bg-cover bg-center border border-[#00897B]/10 shadow-2xl"
              style={{ 
                backgroundImage: `url(${faceImages.top})`, 
                transform: `rotateX(90deg) translateZ(${translateZ})`,
                backfaceVisibility: 'hidden'
              }} 
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
            {/* Bottom */}
            <div 
              className="absolute inset-0 overflow-hidden bg-cover bg-center border border-[#00897B]/10 shadow-2xl"
              style={{ 
                backgroundImage: `url(${faceImages.bottom})`, 
                transform: `rotateX(-90deg) translateZ(${translateZ})`,
                backfaceVisibility: 'hidden'
              }} 
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
          </motion.div>
        </div>

        {/* HUD - Progress */}
        <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 text-right">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00897B] tracking-wider font-mono">
            {String(percentage).padStart(3, '0')}%
          </div>
          <div className="w-20 sm:w-24 md:w-32 h-[2px] bg-[#263238]/10 mt-2 mb-1 relative overflow-hidden rounded-full ml-auto">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[#00897B] rounded-full"
              style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-xs text-[#263238]/40 uppercase tracking-wider font-semibold font-mono">
            {GALLERY_DATA[activeIndex]?.title || 'SCROLL'}
          </div>
        </div>

        {/* Dot Navigation - Desktop */}
        {!isMobile && (
          <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
            {GALLERY_DATA.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex 
                    ? 'bg-[#00897B] scale-150 shadow-lg shadow-[#00897B]/30' 
                    : 'bg-[#263238]/15 hover:bg-[#263238]/30'
                }`} 
              />
            ))}
          </div>
        )}

        {/* Cube Watermark Text */}
        <div className="fixed bottom-16 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
          <div className="text-[8px] sm:text-[10px] text-[#00897B] uppercase tracking-[0.3em] mb-1 font-semibold font-mono">
            {String(activeIndex + 1).padStart(2, '0')} / 12
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#263238]/5 whitespace-nowrap">
            {GALLERY_DATA[activeIndex]?.title || ''}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        {isMobile && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
            <span className="text-[#263238]/20 text-xs font-mono uppercase tracking-wider">
              ↓ Scroll
            </span>
          </div>
        )}
      </div>

      {/* Text Cards Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        {GALLERY_DATA.map((item, i) => {
          const isLast = i === GALLERY_DATA.length - 1;

          return (
            <section 
              key={i} 
              className="h-screen w-full flex items-end md:items-center pb-36 sm:pb-40 md:pb-0 px-4 sm:px-6 md:px-10 lg:px-20"
              style={{ justifyContent: item.align === 'right' ? 'flex-end' : 'flex-start' }}
            >
              <motion.div 
                initial={{ opacity: 0, x: item.align === 'right' ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="pointer-events-auto w-full max-w-[380px] sm:max-w-[420px] bg-white/90 backdrop-blur-lg border border-[#00897B]/10 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl shadow-[#263238]/5"
              >
                <div className="text-[#00897B] font-mono text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3 md:mb-4 font-bold">
                  {item.tag} — {item.title}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238] leading-tight mb-2 sm:mb-3 md:mb-5">
                  {item.title}
                </h2>
                <p className="text-[#263238]/60 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 md:mb-8 max-w-sm">
                  {item.desc}
                </p>

                {/* Last Section CTAs */}
                {isLast ? (
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                    <button 
                      onClick={scrollBack} 
                      className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-[#263238]/60 border border-[#263238]/20 rounded-lg hover:text-[#263238] hover:border-[#263238]/40 transition-all font-mono uppercase tracking-wider"
                    >
                      <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                      Back
                    </button>
                    <button 
                      onClick={scrollToTop} 
                      className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold bg-[#00897B] text-white rounded-lg hover:bg-[#00897B]/90 transition-all shadow-lg shadow-[#00897B]/20 hover:shadow-[#00897B]/30 hover:scale-105 font-mono uppercase tracking-wider"
                    >
                      <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                      Begin Again
                    </button>
                  </div>
                ) : (
                  <button className="inline-flex items-center gap-2 text-[#00897B] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold hover:text-[#00695C] transition-colors group">
                    Discover More
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </motion.div>
            </section>
          )
        })}
      </div>

      {/* Page Indicator */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 md:bottom-8 md:left-8 z-50">
        <span className="text-[#263238]/20 text-xs font-mono uppercase tracking-widest">
          12 Impact Areas
        </span>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;700&family=Inter:wght@300;400;500;600;700;800&display=swap");

        .font-display {
          font-family: "Bebas Neue", "Inter", sans-serif;
          letter-spacing: 0.03em;
        }

        .font-mono {
          font-family: "DM Mono", monospace;
        }
      `}</style>
    </section>
  )
      }
