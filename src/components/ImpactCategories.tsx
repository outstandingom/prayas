// src/components/ImpactCategories.tsx
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  // Wheel throttle
  const lastWheelTime = useRef(0)

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
        if (parsedData.length > 0) {
          setCurrentIndex(0)
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const translatedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      title: t(`categories.${cat.slug}.title`, cat.title),
      description: t(`categories.${cat.slug}.desc`, cat.description),
    }))
  }, [categories, t])

  const total = translatedCategories.length

  // Navigation
  const goTo = useCallback((dir: number) => {
    const newIndex = currentIndex + dir
    if (newIndex >= 0 && newIndex < total) {
      setCurrentIndex(newIndex)
      setDragOffset(0)
    }
  }, [currentIndex, total])

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < total) {
      setCurrentIndex(index)
      setDragOffset(0)
    }
  }, [total])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goTo])

  // Mouse wheel navigation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheelTime.current < 500) return
      lastWheelTime.current = now
      const deltaX = Math.abs(e.deltaX)
      const deltaY = Math.abs(e.deltaY)
      let delta = deltaX > deltaY ? e.deltaX : e.deltaY
      if (delta === 0) return
      goTo(delta > 0 ? 1 : -1)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [goTo])

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setIsDragging(true)
    setStartX(clientX)
    setDragOffset(0)
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing'
    }
    if ('touches' in e) e.preventDefault()
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - startX
    setDragOffset(diff)
    if ('touches' in e) e.preventDefault()
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab'
    }
    const threshold = 80
    if (Math.abs(dragOffset) > threshold) {
      goTo(dragOffset < 0 ? 1 : -1)
    } else {
      setDragOffset(0)
    }
  }

  const handleDragLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Loading / empty
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

  const slideWidth = 100
  const containerWidth = containerRef.current?.offsetWidth || 1
  const transformValue = -(currentIndex * slideWidth) + (dragOffset / containerWidth) * 100

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Header – minimal but with clean spacing */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white px-4 sm:px-6 py-2 border-b border-[#263238]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-1">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[#263238] text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold">
              {t('categories.header.label', 'Our Work')}
            </span>
            <span className="text-[#263238]/20 hidden sm:inline">|</span>
            <h1 className="font-sans text-sm sm:text-lg md:text-xl font-bold text-[#263238]">
              {t('categories.header.title', 'Impact')}{' '}
              <span className="text-[#263238]">
                {t('categories.header.titleHighlight', 'Initiatives')}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#263238] font-sans text-xs sm:text-sm font-bold">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-[#263238]/30 font-sans text-[10px]">/ {String(total).padStart(2, '0')}</span>
            <div className="h-px w-12 sm:w-20 bg-[#263238]/10 relative overflow-hidden hidden sm:block">
              <motion.div
                className="h-full bg-[#263238] absolute left-0 top-0"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
        <p className="text-[#263238]/60 text-[10px] sm:text-xs max-w-2xl hidden sm:block mt-0.5">
          {t('categories.header.desc', 'Explore our key focus areas driving meaningful change in communities across the globe.')}
        </p>
      </div>

      {/* Carousel container – no empty space */}
      <div
        className="absolute top-[40px] sm:top-[50px] left-0 right-0 bottom-0 flex items-stretch px-2 sm:px-4"
      >
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl h-full overflow-hidden rounded-xl select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragLeave}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ touchAction: 'none' }}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="flex h-full transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translateX(${transformValue}%)`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {translatedCategories.map((cat) => (
              <div
                key={cat.id}
                className="w-full flex-shrink-0 h-full px-0 py-1"
              >
                {/* Card – redesigned with balanced spacing */}
                <div className="bg-[#263238] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full">
                  {/* Image */}
                  <div className="md:w-2/5 h-48 sm:h-56 md:h-full relative flex-shrink-0">
                    <img
                      src={cat.image_url}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/800x600/263238/FFF314?text=No+Image'
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 md:hidden">
                      <span className="text-white/80 text-xs font-bold tracking-widest">
                        {cat.title}
                      </span>
                    </div>
                  </div>

                  {/* Content – balanced padding, no empty gaps */}
                  <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-2 sm:space-y-3">
                      {/* Header: title + initiatives count */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#FFF314] text-xs font-bold tracking-widest">
                          {cat.title}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#FFF314]" />
                        <span className="text-white/40 text-xs">
                          {cat.initiatives?.length || 0} initiatives
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                        {cat.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                        {cat.description}
                      </p>

                      {/* Funds */}
                      {cat.goal_funds > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-white/60">
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
                        <div className="flex flex-wrap gap-1.5">
                          {cat.initiatives.slice(0, 3).map((init, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full text-white/70 text-xs"
                            >
                              <span className="text-sm">{init.icon || '📌'}</span>
                              {init.title}
                            </span>
                          ))}
                          {cat.initiatives.length > 3 && (
                            <span className="text-white/40 text-xs px-2 py-1">
                              +{cat.initiatives.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => navigate(`/impact/${cat.slug}`)}
                      className="mt-4 inline-flex items-center gap-2 text-[#FFF314] font-sans text-sm uppercase tracking-wider font-bold hover:gap-3 transition-all hover:text-white w-fit"
                    >
                      {t('categories.learnMore', 'Learn More')} <span className="text-base leading-none">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => goTo(-1)}
            disabled={currentIndex === 0}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/80 shadow-lg hover:bg-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#263238] hidden sm:flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => goTo(1)}
            disabled={currentIndex === total - 1}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/80 shadow-lg hover:bg-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#263238] hidden sm:flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {translatedCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? 'w-2.5 h-2.5 bg-[#FFF314] shadow-[0_0_10px_rgba(255,243,20,0.4)]'
                  : 'w-2 h-2 bg-[#263238]/30 hover:bg-[#263238]/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
