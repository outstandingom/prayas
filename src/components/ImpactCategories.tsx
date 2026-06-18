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
    <div ref={containerRef} className="relative w-full bg-white" style={{ height: `${12 * 55}vh` }}>
      
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

      {/* Sequence Counter - Fixed Left Side */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-10 z-30 flex flex-col items-center gap-1">
        {/* Current Number - Large */}
        <motion.div
          key={activeIndex}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-[#00897B] leading-none"
        >
          {category.id}
        </motion.div>
        
        {/* Divider */}
        <div className="w-8 h-[1px] bg-[#00897B]/20 my-1" />
        
        {/* Total */}
        <span className="text-sm sm:text-base font-mono text-[#263238]/30 font-bold">12</span>
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
        >
          {/* Large Background Number */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[120px] sm:text-[180px] md:text-[250px] font-bold text-[#E8F5E9] leading-none">
              {category.id}
            </span>
          </div>

          {/* Category Name (Not description) */}
          <h1 className="relative font-display font-bold text-[#263238] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 tracking-tight leading-none">
            {category.title}
          </h1>

          {/* Short Tagline instead of full description */}
          <p className="relative text-[#263238]/50 text-sm sm:text-base max-w-md leading-relaxed mb-6 font-mono uppercase tracking-wider">
            {category.title === 'EDUCATION' && 'Building brighter futures'}
            {category.title === 'HEALTHCARE' && 'Healing communities'}
            {category.title === 'WOMEN EMPOWERMENT' && 'Strength in independence'}
            {category.title === 'CHILD WELFARE' && 'Protecting innocence'}
            {category.title === 'ENVIRONMENT' && 'Greener tomorrow'}
            {category.title === 'RURAL DEVELOPMENT' && 'Bridging the gap'}
            {category.title === 'SKILL TRAINING' && 'Crafting careers'}
            {category.title === 'DISASTER RELIEF' && 'Hope in crisis'}
            {category.title === 'ANIMAL WELFARE' && 'Voice for the voiceless'}
            {category.title === 'ELDERLY CARE' && 'Wisdom with dignity'}
            {category.title === 'FOOD SECURITY' && 'Nourishing lives'}
            {category.title === 'MENTAL HEALTH' && 'Healing minds'}
          </p>

          {/* Progress Bar */}
          <div className="w-40 sm:w-56 md:w-72 h-[3px] bg-[#E8F5E9] relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#00897B] rounded-full"
              style={{ width: progressWidth }}
            />
          </div>
        </motion.div>

        {/* Right Side Navigation Dots - Show sequence */}
        <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1.5 z-30 items-center">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* Dot */}
              <div 
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeIndex ? '10px' : '5px',
                  height: i === activeIndex ? '10px' : '5px',
                  backgroundColor: i === activeIndex ? '#00897B' : '#E8F5E9',
                  boxShadow: i === activeIndex ? '0 0 6px rgba(0,137,123,0.3)' : 'none'
                }}
              />
              {/* Number - Show only for active */}
              {i === activeIndex && (
                <motion.span 
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-mono font-bold text-[#00897B]"
                >
                  {cat.id}
                </motion.span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Bottom Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:hidden z-20 flex items-center gap-3">
          <motion.span 
            key={activeIndex}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-display font-bold text-[#00897B]"
          >
            {category.id}
          </motion.span>
          <div className="w-px h-4 bg-[#00897B]/20" />
          <span className="text-xs font-mono text-[#263238]/30 font-bold">12</span>
        </div>
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
              className="pointer-events-auto w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-sm border border-[#00897B]/10 p-4 sm:p-5 rounded-2xl shadow-lg shadow-[#263238]/5 hover:shadow-xl hover:shadow-[#00897B]/5 transition-all duration-300"
            >
              {/* Card ID */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#E8F5E9]">
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#00897B] font-bold">
                  {cat.id} — {cat.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00897B]" />
              </div>

              {/* Card Title */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#263238] mb-1.5">
                {cat.title}
              </h3>

              {/* Card Description */}
              <p className="text-[#263238]/60 text-xs sm:text-sm leading-relaxed mb-3">
                {cat.desc}
              </p>

              {/* Card Image - Larger */}
              <div className="w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden mb-3 opacity-90 hover:opacity-100 transition-opacity">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* Card Action */}
              <button className="inline-flex items-center gap-2 text-[#00897B] font-mono text-xs uppercase tracking-wider font-bold hover:gap-3 transition-all">
                Learn More <span className="text-base leading-none">→</span>
              </button>
            </motion.div>
          </section>
        ))}
      </div>

      {/* Bottom Fixed Indicator */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-30">
        <span className="text-[#263238]/15 text-xs font-mono uppercase tracking-widest">
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
