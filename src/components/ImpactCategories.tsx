// src/components/ImpactCategories.tsx
import { useRef, useState } from 'react'
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
    const currentIndex = Math.min(11, Math.floor(latest * 12))
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }
  })

  const category = CATEGORIES[activeIndex]
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className="relative w-full bg-white" style={{ height: `${12 * 100}vh` }}>
      
      {/* Section Header - Fixed */}
      <div className="fixed top-20 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <span className="text-[#00897B] font-mono text-xs uppercase tracking-widest font-semibold bg-[#00897B]/10 px-4 py-2 rounded-full inline-block">
              Our Impact Areas
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Main Display */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle, #00897B 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        {/* Center Content */}
        <motion.div 
          key={activeIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
        >
          {/* ID Badge */}
          <div className="mb-6">
            <span className="text-[#00897B] font-mono text-sm tracking-[0.2em] font-bold border border-[#00897B]/20 px-4 py-2 rounded-full bg-[#00897B]/5">
              {category.id} / 12
            </span>
          </div>

          {/* Large Background Number */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[180px] sm:text-[250px] md:text-[350px] font-bold text-[#E8F5E9] leading-none">
              {category.id}
            </span>
          </div>

          {/* Title */}
          <h1 className="relative font-display font-bold text-[#263238] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight leading-none">
            {category.title}
          </h1>

          {/* Description */}
          <p className="relative text-[#263238]/60 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-8">
            {category.desc}
          </p>

          {/* Progress Bar */}
          <div className="w-48 sm:w-64 md:w-80 h-[3px] bg-[#E8F5E9] relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#00897B] rounded-full"
              style={{ width: progressWidth }}
            />
          </div>

          {/* Corner Decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#00897B]/20 rounded-tl-lg" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#00897B]/20 rounded-tr-lg" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#00897B]/20 rounded-bl-lg" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#00897B]/20 rounded-br-lg" />
        </motion.div>

        {/* Side Navigation Dots */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-30">
          {CATEGORIES.map((_, i) => (
            <div 
              key={i} 
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIndex ? '10px' : '6px',
                height: i === activeIndex ? '10px' : '6px',
                backgroundColor: i === activeIndex ? '#00897B' : '#E8F5E9',
                boxShadow: i === activeIndex ? '0 0 8px rgba(0,137,123,0.3)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Mobile Category Counter */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 md:hidden z-20">
          <span className="text-[#263238]/40 text-xs font-mono tracking-widest">
            {category.id} / 12
          </span>
        </div>
      </div>

      {/* Detail Cards Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        {CATEGORIES.map((cat, i) => (
          <section 
            key={i} 
            className="h-screen w-full flex items-end md:items-center pb-24 md:pb-0 px-4 sm:px-6 md:px-16"
            style={{ justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}
          >
            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="pointer-events-auto w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-sm border border-[#00897B]/10 p-5 sm:p-6 rounded-2xl shadow-xl shadow-[#263238]/5 hover:shadow-2xl hover:shadow-[#00897B]/5 transition-all duration-300"
            >
              {/* Card ID */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E8F5E9]">
                <span className="font-mono text-xs tracking-[0.15em] text-[#00897B] font-bold">
                  {cat.id} — {cat.title}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00897B]" />
              </div>

              {/* Card Title */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#263238] mb-2">
                {cat.title}
              </h3>

              {/* Card Description */}
              <p className="text-[#263238]/60 text-sm leading-relaxed mb-4">
                {cat.desc}
              </p>

              {/* Card Image */}
              <div className="w-full h-32 sm:h-40 rounded-xl overflow-hidden mb-4 opacity-80 hover:opacity-100 transition-opacity">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* Card Action */}
              <button className="inline-flex items-center gap-2 text-[#00897B] font-mono text-xs uppercase tracking-wider font-bold hover:gap-3 transition-all">
                Learn More <span className="text-lg leading-none">→</span>
              </button>
            </motion.div>
          </section>
        ))}
      </div>

      {/* Bottom Indicator */}
      <div className="fixed bottom-6 left-6 z-30">
        <span className="text-[#263238]/20 text-xs font-mono uppercase tracking-widest">
          12 Impact Areas
        </span>
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
