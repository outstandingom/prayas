// src/components/ImpactCategories.tsx
import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'

const CATEGORIES = [
  { id: '01', title: 'Child growth & Education', desc: 'Every child deserves a chance to learn, grow, and dream.', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=500&fit=crop&q=80' },
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
    const currentIndex = Math.min(11, Math.floor(latest * 12))
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }
  })

  return (
    <div ref={containerRef} className="relative w-full bg-white" style={{ height: `${12 * 55}vh` }}>
      
      {/* Right Side Navigation Dots */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1.5 z-30 items-center">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="flex items-center gap-2">
            <div 
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? '10px' : '5px',
                height: i === activeIndex ? '10px' : '5px',
                backgroundColor: i === activeIndex ? '#FFF314' : '#F1F8F5',
                boxShadow: i === activeIndex ? '0 0 8px rgba(255,243,20,0.5)' : 'none'
              }}
            />
            {i === activeIndex && (
              <motion.span 
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-mono font-bold text-[#FFF314]"
              >
                {cat.id}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Detail Cards Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
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
              className="pointer-events-auto w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-sm border border-[#FFF314]/10 p-4 sm:p-5 rounded-2xl shadow-lg shadow-[#263238]/5 hover:shadow-xl hover:shadow-[#FFF314]/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#FFF314]/10">
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#FFF314] font-bold">
                  {cat.id} — {cat.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFF314]" />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#263238] mb-1.5">
                {cat.title}
              </h3>

              <p className="text-[#263238]/60 text-xs sm:text-sm leading-relaxed mb-3">
                {cat.desc}
              </p>

              <div className="w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden mb-3 opacity-90 hover:opacity-100 transition-opacity">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              <button className="inline-flex items-center gap-2 text-[#FFF314] font-mono text-xs uppercase tracking-wider font-bold hover:gap-3 transition-all">
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
