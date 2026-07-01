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
        if (parsedData.length > 0) setCurrentIndex(0)
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
      const delta = deltaX > deltaY ? e.deltaX : e.deltaY
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
    if ('touches' in e) e.preventDefault()
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragOffset(clientX - startX)
    if ('touches' in e) e.preventDefault()
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragOffset) > 80) {
      goTo(dragOffset < 0 ? 1 : -1)
    } else {
      setDragOffset(0)
    }
  }

  // Loading / empty states
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
        <p className="text-[#263238]/60">No impact categories available.</p>
      </div>
    )
  }

  const containerWidth = containerRef.current?.offsetWidth || 1
  const transformValue = -(currentIndex * 100) + (dragOffset / containerWidth) * 100

  return (
    <div className="w-full bg-white" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── HEADER ── */}
      <div style={{ flexShrink: 0 }} className="bg-white border-b border-[#263238]/10 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Left: label + title */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[#263238] text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
              {t('categories.header.label', 'Our Work')}
            </span>
            <span className="text-[#263238]/20">|</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238]">
              {t('categories.header.title', 'Impact')}{' '}
              <span className="text-[#FFF314] drop-shadow-sm">
                {t('categories.header.titleHighlight', 'Initiatives')}
              </span>
            </h2>
          </div>
          {/* Right: counter + progress */}
          <div className="flex items-center gap-3">
            <span className="text-[#263238] text-base font-bold tabular-nums">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-16 sm:w-24 h-1 bg-[#263238]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#263238] rounded-full"
                animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-[#263238]/40 text-sm tabular-nums">
              {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>
        <p className="text-[#263238]/50 text-sm mt-1 max-w-2xl hidden sm:block">
          {t('categories.header.desc', 'Explore our key focus areas driving meaningful change in communities across India.')}
        </p>
      </div>

      {/* ── CAROUSEL AREA ── */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }} className="px-3 sm:px-6 py-4">
        {/* Draggable container */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-hidden rounded-2xl select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Sliding track */}
          <div
            ref={trackRef}
            className="flex h-full transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `translateX(${transformValue}%)` }}
          >
            {translatedCategories.map((cat) => (
              <div key={cat.id} className="w-full flex-shrink-0 h-full">
                {/* Card */}
                <div className="bg-[#263238] rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col md:flex-row">

                  {/* Image panel */}
                  <div className="md:w-[42%] h-52 sm:h-64 md:h-full relative flex-shrink-0">
                    <img
                      src={cat.image_url}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/800x600/263238/FFF314?text=Prayas'
                      }}
                    />
                    {/* Gradient overlay on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#263238] via-transparent to-transparent md:hidden" />
                    <div className="absolute bottom-3 left-4 md:hidden">
                      <span className="text-[#FFF314] text-xs font-bold tracking-widest uppercase">
                        {cat.title}
                      </span>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 md:p-10 overflow-y-auto">
                    <div className="space-y-4">

                      {/* Category label row */}
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#FFF314]" />
                        <span className="text-[#FFF314] text-sm font-bold tracking-widest uppercase">
                          {cat.title}
                        </span>
                        {(cat.initiatives?.length ?? 0) > 0 && (
                          <>
                            <span className="text-white/20">·</span>
                            <span className="text-white/40 text-sm">
                              {cat.initiatives.length} initiative{cat.initiatives.length !== 1 ? 's' : ''}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Main title */}
                      <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                        {cat.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                        {cat.description}
                      </p>

                      {/* Funds progress bar */}
                      {cat.goal_funds > 0 && (
                        <div className="space-y-2 pt-1">
                          <div className="flex justify-between text-sm text-white/50">
                            <span>₹{cat.funds_collected?.toLocaleString() || 0} raised</span>
                            <span>Goal: ₹{cat.goal_funds?.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#FFF314] rounded-full transition-all duration-700"
                              style={{
                                width: `${Math.min((cat.funds_collected || 0) / (cat.goal_funds || 1) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Initiative tags */}
                      {cat.initiatives && cat.initiatives.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {cat.initiatives.slice(0, 4).map((init, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/8 border border-white/10 rounded-full text-white/70 text-sm"
                            >
                              <span>{init.icon || '📌'}</span>
                              {init.title}
                            </span>
                          ))}
                          {cat.initiatives.length > 4 && (
                            <span className="text-white/40 text-sm px-2 py-1.5">
                              +{cat.initiatives.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* CTA button */}
                    <button
                      onClick={() => navigate(`/impact/${cat.slug}`)}
                      className="mt-6 self-start inline-flex items-center gap-2 px-6 py-3 bg-[#FFF314] text-[#263238] font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      {t('categories.learnMore', 'Learn More')}
                      <span className="text-base">→</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev arrow */}
        <button
          onClick={() => goTo(-1)}
          disabled={currentIndex === 0}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition-all disabled:opacity-25 disabled:cursor-not-allowed text-[#263238]"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next arrow */}
        <button
          onClick={() => goTo(1)}
          disabled={currentIndex === total - 1}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition-all disabled:opacity-25 disabled:cursor-not-allowed text-[#263238]"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {translatedCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? 'w-6 h-2.5 bg-[#FFF314] shadow-[0_0_8px_rgba(255,243,20,0.6)]'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
