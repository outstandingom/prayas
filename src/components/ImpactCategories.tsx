// src/components/ImpactCategories.tsx
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'

// Define type matching DB
interface Category {
  id: string
  title: string
  description: string
  image_url: string
  slug: string
  display_order: number
  is_active: boolean
}

export default function ImpactCategories() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Fetch from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('impact_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
      if (!error && data) {
        setCategories(data)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50, restDelta: 0.001 })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const total = categories.length
    if (total === 0) return
    const currentIndex = Math.min(total - 1, Math.floor(latest * total))
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }
  })

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  if (categories.length === 0) {
    return <div className="h-screen flex items-center justify-center">No categories available</div>
  }

  // Build path based on slug
  const getPath = (slug: string) => `/impact/${slug}`

  return (
    <div ref={containerRef} className="relative w-full bg-white" style={{ height: `${categories.length * 55 + 30}vh` }}>
      {/* Heading Section – same as before, but using categories length */}
      <div className="sticky top-0 z-30 bg-white px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-[#263238]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans text-[#263238] text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
              {t('categories.header.label', 'Our Work')}
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#263238] mt-1 sm:mt-2">
              {t('categories.header.title', 'Impact')} <span className="text-[#263238]">{t('categories.header.titleHighlight', 'Initiatives')}</span>
            </h1>
            <p className="text-[#263238]/60 text-sm sm:text-base max-w-2xl mt-2 sm:mt-3 font-sans">
              {t('categories.header.desc', 'Explore our')} {categories.length} {t('categories.header.desc2', 'focus areas driving meaningful change')}.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-3 mt-3 sm:mt-4">
              <div className="flex items-center gap-2">
                <span className="text-[#263238] font-sans text-lg sm:text-xl font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-[#263238]/30 font-sans text-sm">/ {String(categories.length).padStart(2, '0')}</span>
              </div>
              <div className="h-px flex-1 max-w-[200px] bg-[#263238]/10 relative overflow-hidden">
                <motion.div 
                  className="h-full bg-[#263238] absolute left-0 top-0"
                  style={{ width: `${((activeIndex + 1) / categories.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[#263238]/40 font-sans text-xs truncate max-w-[120px] sm:max-w-[200px]">
                {categories[activeIndex]?.title}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side Navigation Dots */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1.5 z-30 items-center">
        {categories.map((cat, i) => (
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
                className="text-xs font-sans font-bold text-[#263238]"
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Detail Cards Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" style={{ paddingTop: '40vh' }}>
        {categories.map((cat, i) => (
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
                <span className="font-sans text-[10px] tracking-[0.15em] text-[#FFF314] font-bold">
                  {String(i + 1).padStart(2, '0')} — {cat.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFF314]" />
              </div>

              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#FFF314] mb-1.5">
                {cat.title}
              </h3>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 font-sans">
                {cat.description}
              </p>

              <div className="w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden mb-3 opacity-90 hover:opacity-100 transition-opacity border-2 border-[#FFF314]/20">
                <img src={cat.image_url} alt={cat.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              <button 
                onClick={() => navigate(getPath(cat.slug))}
                className="inline-flex items-center gap-2 text-[#FFF314] font-sans text-xs uppercase tracking-wider font-bold hover:gap-3 transition-all hover:text-white"
              >
                {t('categories.learnMore', 'Learn More')} <span className="text-base leading-none">→</span>
              </button>
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  )
}
