// src/components/ImpactCategories.tsx
import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { id: '01', title: 'Child growth & Education', desc: 'Every child deserves a chance to learn, grow, and dream.', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=500&fit=crop&q=80', path: '/impact/education' },
  { id: '02', title: 'HEALTHCARE', desc: 'Free medical camps, health awareness programs, and essential healthcare access for underserved communities.', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&q=80', path: '/impact/healthcare' },
  { id: '03', title: 'WOMEN EMPOWERMENT', desc: 'Skill development, self-help groups, and financial independence programs transforming women\'s lives.', img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop&q=80', path: '/impact/women-empowerment' },
  { id: '04', title: 'CHILD WELFARE', desc: 'Protecting children\'s rights, nutrition programs, and safe shelter initiatives for vulnerable children.', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop&q=80', path: '/impact/child-welfare' },
  { id: '05', title: 'ENVIRONMENT', desc: 'Tree plantation drives, waste management, and environmental awareness campaigns for a greener future.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop&q=80', path: '/impact/environment' },
  { id: '06', title: 'RURAL DEVELOPMENT', desc: 'Infrastructure development, clean water access, and livelihood programs for rural communities.', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=500&fit=crop&q=80', path: '/impact/rural-development' },
  { id: '07', title: 'SKILL TRAINING', desc: 'Vocational training and skill development programs empowering youth and adults with employable skills.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop&q=80', path: '/impact/skill-training' },
  { id: '08', title: 'DISASTER RELIEF', desc: 'Emergency response, relief distribution, and rehabilitation for disaster-affected communities.', img: 'https://images.unsplash.com/photo-1536643155-33d268924c93?w=800&h=500&fit=crop&q=80', path: '/impact/disaster-relief' },
  { id: '09', title: 'ANIMAL WELFARE', desc: 'Rescue, shelter, and medical care for stray and injured animals in both urban and rural areas.', img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=500&fit=crop&q=80', path: '/impact/animal-welfare' },
  { id: '10', title: 'ELDERLY CARE', desc: 'Support, healthcare, and dignity for senior citizens through dedicated community programs.', img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop&q=80', path: '/impact/elderly-care' },
  { id: '11', title: 'FOOD SECURITY', desc: 'Food distribution, nutrition programs, and sustainable agriculture for vulnerable communities.', img: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=800&h=500&fit=crop&q=80', path: '/impact/food-security' },
  { id: '12', title: 'MENTAL HEALTH', desc: 'Mental health awareness, counseling services, and emotional wellbeing programs for all age groups.', img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=500&fit=crop&q=80', path: '/impact/mental-health' },
]

export default function ImpactCategories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50, restDelta: 0.001 })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const currentIndex = Math.min(11, Math.floor(latest * 12))
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }
  })

  return (
    <div ref={containerRef} className="relative w-full bg-white" style={{ height: `${12 * 55 + 30}vh` }}>
      
      {/* Heading Section at the Start */}
      <div className="sticky top-0 z-30 bg-white px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-[#263238]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[#263238] text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
              Our Work
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#263238] mt-1 sm:mt-2">
              Impact <span className="text-[#263238]">Initiatives</span>
            </h1>
            <p className="text-[#263238]/60 text-sm sm:text-base max-w-2xl mt-2 sm:mt-3 font-mono">
              Explore our 12 key focus areas driving meaningful change in communities across the globe.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-3 mt-3 sm:mt-4">
              <div className="flex items-center gap-2">
                <span className="text-[#263238] font-mono text-lg sm:text-xl font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-[#263238]/30 font-mono text-sm">/ {String(CATEGORIES.length).padStart(2, '0')}</span>
              </div>
              <div className="h-px flex-1 max-w-[200px] bg-[#263238]/10 relative overflow-hidden">
                <motion.div 
                  className="h-full bg-[#263238] absolute left-0 top-0"
                  style={{ width: `${((activeIndex + 1) / CATEGORIES.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[#263238]/40 font-mono text-xs truncate max-w-[120px] sm:max-w-[200px]">
                {CATEGORIES[activeIndex]?.title}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side Navigation Dots */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1.5 z-30 items-center">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="flex items-center gap-2">
            <div 
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? '10px' : '5px',
                height: i === activeIndex ? '10px' : '5px',
                backgroundColor: i === activeIndex ? '#FFF314' : '#26323820',
                boxShadow: i === activeIndex ? '0 0 8px rgba(255,243,20,0.5)' : 'none'
              }}
            />
            {i === activeIndex && (
              <motion.span 
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-mono font-bold text-[#263238]"
              >
                {cat.id}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Detail Cards Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" style={{ paddingTop: '40vh' }}>
        {CATEGORIES.map((cat, i) => (
          <section 
            key={i} 
            className="h-[55vh] w-full flex items-end md:items-center pb-20 md:pb-0 px-3 sm:px-4 md:px-12"
            style={{ justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}
          >
            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-5% 0px -5% 0px" }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="pointer-events-auto w-full max-w-sm sm:max-w-md bg-[#263238] p-4 sm:p-5 rounded-2xl shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 border border-[#FFF314]/20"
            >
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#FFF314]/20">
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#FFF314] font-bold">
                  {cat.id} — {cat.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFF314]" />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FFF314] mb-1.5">
                {cat.title}
              </h3>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3">
                {cat.desc}
              </p>

              <div className="w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden mb-3 opacity-90 hover:opacity-100 transition-opacity border-2 border-[#FFF314]/20">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              <button 
                onClick={() => navigate(cat.path)}
                className="inline-flex items-center gap-2 text-[#FFF314] font-mono text-xs uppercase tracking-wider font-bold hover:gap-3 transition-all hover:text-white"
              >
                Learn More <span className="text-base leading-none">→</span>
              </button>
            </motion.div>
          </section>
        ))}
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap");
        
        .font-mono {
          font-family: "JetBrains Mono", monospace;
        }

        .font-display {
          font-family: "Outfit", sans-serif;
        }
      `}</style>
    </div>
  )
}
