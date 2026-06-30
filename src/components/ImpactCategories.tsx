// src/components/ImpactCategories.tsx
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'

interface Category {
  id: string
  title: string// src/components/ImpactCategories.tsx
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'

interface Category {
  id: string
  title: string
  description: string
  image_url: string
  slug: string
  display_order: number
  is_active: boolean
  initiatives: { icon: string; title: string; description: string }[]
  funds_collected: number
  goal_funds: number
  created_at: string
  updated_at: string
}

export default function ImpactCategories() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('impact_categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (error) {
          console.error('Error fetching categories:', error)
          return
        }

        const parsedData = data?.map(item => ({
          ...item,
          initiatives: typeof item.initiatives === 'string'
            ? JSON.parse(item.initiatives)
            : item.initiatives || []
        })) || []

        setCategories(parsedData)
        // Set initial active to middle
        if (parsedData.length > 0) {
          setCurrentIndex(Math.floor(parsedData.length / 2))
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Translated categories
  const translatedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      title: t(`categories.${cat.slug}.title`, cat.title),
      description: t(`categories.${cat.slug}.desc`, cat.description),
    }))
  }, [categories, t])

  const total = translatedCategories.length

  // --- Carousel 3D configuration ---
  const cardWidth = 260   // card width in px (will be responsive via CSS)
  const cardHeight = 380  // card height
  const radius = 750      // distance from center (adjust for screen size)
  const angleStep = total > 0 ? Math.min(22, 180 / total) : 22 // degrees between cards

  // Update card transforms based on currentIndex
  const updateCards = useCallback(() => {
    if (!trackRef.current) return
    const cards = trackRef.current.children
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement
      const rotation = (i - currentIndex) * angleStep
      card.style.transform = `rotate(${rotation}deg)`
      card.classList.toggle('active', i === currentIndex)
    }
  }, [currentIndex, angleStep])

  // Apply transforms after render or index change
  useEffect(() => {
    updateCards()
  }, [updateCards])

  // Navigation
  const goTo = (dir: number) => {
    const newIndex = currentIndex + dir
    if (newIndex >= 0 && newIndex < total) {
      setCurrentIndex(newIndex)
    }
  }

  // Mouse wheel support (with debounce)
  const lastScrollRef = useRef(0)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Date.now() - lastScrollRef.current < 600) return
      lastScrollRef.current = Date.now()
      goTo(e.deltaY > 0 ? 1 : -1)
    }
    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [total])

  // --- Loading & empty states ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFF314] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#263238]/60">Loading impact categories...</p>
        </div>
      </div>
    )
  }

  if (translatedCategories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <div className="text-center">
          <p className="text-[#263238]/60">No impact categories available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Sticky Header */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-[#263238]/10">
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
              {t('categories.header.title', 'Impact')}{' '}
              <span className="text-[#263238]">
                {t('categories.header.titleHighlight', 'Initiatives')}
              </span>
            </h1>
            <p className="text-[#263238]/60 text-sm sm:text-base max-w-2xl mt-2 sm:mt-3 font-sans">
              {t('categories.header.desc', 'Explore our key focus areas driving meaningful change in communities across the globe.')}
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center gap-3 mt-3 sm:mt-4">
              <div className="flex items-center gap-2">
                <span className="text-[#263238] font-sans text-lg sm:text-xl font-bold">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-[#263238]/30 font-sans text-sm">/ {String(total).padStart(2, '0')}</span>
              </div>
              <div className="h-px flex-1 max-w-[200px] bg-[#263238]/10 relative overflow-hidden">
                <motion.div
                  className="h-full bg-[#263238] absolute left-0 top-0"
                  style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[#263238]/40 font-sans text-xs truncate max-w-[120px] sm:max-w-[200px]">
                {translatedCategories[currentIndex]?.title}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-20 flex items-center justify-between px-2 md:px-4">
        <button
          onClick={() => goTo(-1)}
          disabled={currentIndex === 0}
          className="pointer-events-auto p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#263238] text-xl font-bold"
          aria-label="Previous category"
        >
          ‹
        </button>
        <button
          onClick={() => goTo(1)}
          disabled={currentIndex === total - 1}
          className="pointer-events-auto p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#263238] text-xl font-bold"
          aria-label="Next category"
        >
          ›
        </button>
      </div>

      {/* Right Side Navigation Dots */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1.5 z-30 items-center">
        {translatedCategories.map((cat, i) => (
          <div key={cat.id} className="flex items-center gap-2">
            <div
              className="transition-all duration-300 rounded-full cursor-pointer"
              style={{
                width: i === currentIndex ? '10px' : '5px',
                height: i === currentIndex ? '10px' : '5px',
                backgroundColor: i === currentIndex ? '#FFF314' : '#26323820',
                boxShadow: i === currentIndex ? '0 0 8px rgba(255,243,20,0.5)' : 'none',
              }}
              onClick={() => {
                const newIdx = i
                if (newIdx !== currentIndex) {
                  setCurrentIndex(newIdx)
                }
              }}
            />
            {i === currentIndex && (
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

      {/* 3D Carousel Stage */}
      <div className="stage absolute top-[10%] left-0 right-0 bottom-0 flex items-center justify-center perspective-2000">
        <div
          ref={trackRef}
          className="carousel-track relative"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {translatedCategories.map((cat, i) => (
            <div
              key={cat.id}
              className="card absolute inset-0 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transformOrigin: `50% ${radius}px`,
                backfaceVisibility: 'hidden',
                filter: i === currentIndex ? 'brightness(1)' : 'brightness(0.4)',
                scale: i === currentIndex ? '1.1' : '0.8',
                zIndex: i === currentIndex ? 10 : 1,
                transition: 'transform 0.8s cubic-bezier(0.2,0.8,0.2,1), filter 0.8s, scale 0.8s',
                pointerEvents: i === currentIndex ? 'auto' : 'none',
              }}
            >
              {/* Card Content */}
              <div className="w-full h-full bg-[#263238] p-4 sm:p-5 md:p-6 rounded-2xl border border-[#FFF314]/20 shadow-xl flex flex-col">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#FFF314]/20">
                  <span className="font-sans text-[10px] tracking-[0.15em] text-[#FFF314] font-bold">
                    {String(i + 1).padStart(2, '0')} — {cat.title}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFF314]" />
                </div>

                <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF314] mb-1.5 leading-tight">
                  {cat.title}
                </h3>

                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 flex-1 line-clamp-3">
                  {cat.description}
                </p>

                <div className="w-full h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden mb-3 border-2 border-[#FFF314]/20 flex-shrink-0">
                  <img
                    src={cat.image_url}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/800x500/263238/FFF314?text=No+Image'
                    }}
                  />
                </div>

                {/* Funds */}
                {cat.goal_funds > 0 && (
                  <div className="mb-2 flex-shrink-0">
                    <div className="flex justify-between text-xs text-white/60 mb-1">
                      <span>₹{cat.funds_collected?.toLocaleString() || 0} raised</span>
                      <span>Goal: ₹{cat.goal_funds?.toLocaleString() || 0}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFF314] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((cat.funds_collected || 0) / (cat.goal_funds || 1) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Initiatives */}
                {cat.initiatives && cat.initiatives.length > 0 && (
                  <div className="mb-2 space-y-0.5 flex-shrink-0">
                    {cat.initiatives.slice(0, 2).map((init, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/60 text-xs">
                        <span className="text-sm">{init.icon || '📌'}</span>
                        <span className="truncate">{init.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => navigate(`/impact/${cat.slug}`)}
                  className="mt-auto inline-flex items-center gap-2 text-[#FFF314] font-sans text-xs uppercase tracking-wider font-bold hover:gap-3 transition-all hover:text-white"
                >
                  {t('categories.learnMore', 'Learn More')} <span className="text-base leading-none">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
  description: string
  image_url: string
  slug: string
  display_order: number
  is_active: boolean
  initiatives: { icon: string; title: string; description: string }[]
  funds_collected: number
  goal_funds: number
  created_at: string
  updated_at: string
}

export default function ImpactCategories() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('impact_categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (error) {
          console.error('Error fetching categories:', error)
          return
        }

        const parsedData = data?.map(item => ({
          ...item,
          initiatives: typeof item.initiatives === 'string'
            ? JSON.parse(item.initiatives)
            : item.initiatives || []
        })) || []

        setCategories(parsedData)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Translations
  const translatedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      title: t(`categories.${cat.slug}.title`, cat.title),
      description: t(`categories.${cat.slug}.desc`, cat.description),
    }))
  }, [categories, t])

  const total = translatedCategories.length
  const [activeIndex, setActiveIndex] = useState(0)

  // Container width for drag constraints
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Motion values for drag
  const x = useMotionValue(0)
  const springX = useSpring(x, { damping: 30, stiffness: 200 })

  // Sync activeIndex with position
  const rawIndex = useTransform(springX, (xPos) => {
    if (!containerWidth) return 0
    const index = -xPos / containerWidth
    return Math.round(index)
  })

  useEffect(() => {
    const unsubscribe = rawIndex.onChange((latest) => {
      const clamped = Math.max(0, Math.min(total - 1, latest))
      setActiveIndex(clamped)
    })
    return unsubscribe
  }, [rawIndex, total])

  // Navigate to slide
  const goToSlide = useCallback((index: number) => {
    const target = Math.max(0, Math.min(total - 1, index))
    if (target === activeIndex) return
    setActiveIndex(target)
    if (containerWidth) {
      x.set(-target * containerWidth)
    }
  }, [activeIndex, containerWidth, total, x])

  // Drag end snap
  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    const threshold = containerWidth * 0.2

    let newIndex = activeIndex
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      if (velocity < 0 || offset < 0) {
        newIndex = activeIndex + 1
      } else {
        newIndex = activeIndex - 1
      }
    }
    newIndex = Math.max(0, Math.min(total - 1, newIndex))
    goToSlide(newIndex)
  }

  // Arrow handlers
  const handlePrev = () => goToSlide(activeIndex - 1)
  const handleNext = () => goToSlide(activeIndex + 1)

  // Loading & empty states
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFF314] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#263238]/60">Loading impact categories...</p>
        </div>
      </div>
    )
  }

  if (translatedCategories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <div className="text-center">
          <p className="text-[#263238]/60">No impact categories available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Sticky Header */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-[#263238]/10">
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
              {t('categories.header.desc', 'Explore our key focus areas driving meaningful change in communities across the globe.')}
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center gap-3 mt-3 sm:mt-4">
              <div className="flex items-center gap-2">
                <span className="text-[#263238] font-sans text-lg sm:text-xl font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-[#263238]/30 font-sans text-sm">/ {String(total).padStart(2, '0')}</span>
              </div>
              <div className="h-px flex-1 max-w-[200px] bg-[#263238]/10 relative overflow-hidden">
                <motion.div
                  className="h-full bg-[#263238] absolute left-0 top-0"
                  style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[#263238]/40 font-sans text-xs truncate max-w-[120px] sm:max-w-[200px]">
                {translatedCategories[activeIndex]?.title}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Left/Right Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-20 flex items-center justify-between px-2 md:px-4">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="pointer-events-auto p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#263238] text-xl font-bold"
          aria-label="Previous category"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex === total - 1}
          className="pointer-events-auto p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#263238] text-xl font-bold"
          aria-label="Next category"
        >
          ›
        </button>
      </div>

      {/* Right Side Navigation Dots */}
      <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1.5 z-30 items-center">
        {translatedCategories.map((cat, i) => (
          <div key={cat.id} className="flex items-center gap-2">
            <div
              className="transition-all duration-300 rounded-full cursor-pointer"
              style={{
                width: i === activeIndex ? '10px' : '5px',
                height: i === activeIndex ? '10px' : '5px',
                backgroundColor: i === activeIndex ? '#FFF314' : '#26323820',
                boxShadow: i === activeIndex ? '0 0 8px rgba(255,243,20,0.5)' : 'none'
              }}
              onClick={() => goToSlide(i)}
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

      {/* Carousel Track */}
      <div ref={containerRef} className="w-full h-full overflow-hidden">
        <motion.div
          className="flex h-full"
          drag="x"
          dragConstraints={{ left: -(total - 1) * containerWidth, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x: springX }}
        >
          {translatedCategories.map((cat, i) => (
            <div
              key={cat.id}
              className="flex-shrink-0 w-full h-full flex items-center justify-center px-3 sm:px-4 md:px-12"
            >
              {/* Card Stack with Blueprint Overlay */}
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg perspective-800">
                {/* Blueprint card (behind) */}
                <div
                  className="absolute inset-0 rounded-2xl bg-[#263238]/10 border-2 border-dashed border-[#263238]/30 transform rotate-[-4deg] scale-[0.98] pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(38,50,56,0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(38,50,56,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                >
                  {/* Blueprint content (wireframe copy) */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full opacity-40">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#263238]/30">
                      <span className="font-sans text-[10px] tracking-[0.15em] text-[#263238] font-bold">
                        {String(i + 1).padStart(2, '0')} — {cat.title}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#263238]" />
                    </div>
                    <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#263238] mb-1.5">
                      {cat.title}
                    </h3>
                    <p className="text-[#263238]/50 text-xs sm:text-sm leading-relaxed mb-3 font-sans">
                      {cat.description}
                    </p>
                    <div className="w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden mb-3 border-2 border-[#263238]/20">
                      <img
                        src={cat.image_url}
                        alt={cat.title}
                        className="w-full h-full object-cover grayscale"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500/263238/FFF314?text=No+Image'
                        }}
                      />
                    </div>
                    {/* Funds skeleton */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-[#263238]/40 mb-1">
                        <span>₹0 raised</span>
                        <span>Goal: ₹0</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#263238]/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#263238] rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-[#263238] font-sans text-xs uppercase tracking-wider">
                      Learn More →
                    </div>
                  </div>
                </div>

                {/* Main Card */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="relative z-10 bg-[#263238] p-4 sm:p-5 md:p-6 rounded-2xl shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 border border-[#FFF314]/20"
                >
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#FFF314]/20">
                    <span className="font-sans text-[10px] tracking-[0.15em] text-[#FFF314] font-bold">
                      {String(i + 1).padStart(2, '0')} — {cat.title}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFF314]" />
                  </div>

                  <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF314] mb-1.5">
                    {cat.title}
                  </h3>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 font-sans">
                    {cat.description}
                  </p>

                  <div className="w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden mb-3 opacity-90 hover:opacity-100 transition-opacity border-2 border-[#FFF314]/20">
                    <img
                      src={cat.image_url}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500/263238/FFF314?text=No+Image'
                      }}
                    />
                  </div>

                  {/* Funds Progress Bar */}
                  {cat.goal_funds > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>₹{cat.funds_collected?.toLocaleString() || 0} raised</span>
                        <span>Goal: ₹{cat.goal_funds?.toLocaleString() || 0}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FFF314] rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min((cat.funds_collected || 0) / (cat.goal_funds || 1) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Initiatives */}
                  {cat.initiatives && cat.initiatives.length > 0 && (
                    <div className="mb-3 space-y-1">
                      {cat.initiatives.slice(0, 3).map((init, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-white/60 text-xs">
                          <span className="text-sm">{init.icon || '📌'}</span>
                          <span className="truncate">{init.title}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => navigate(`/impact/${cat.slug}`)}
                    className="inline-flex items-center gap-2 text-[#FFF314] font-sans text-xs uppercase tracking-wider font-bold hover:gap-3 transition-all hover:text-white"
                  >
                    {t('categories.learnMore', 'Learn More')} <span className="text-base leading-none">→</span>
                  </button>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
