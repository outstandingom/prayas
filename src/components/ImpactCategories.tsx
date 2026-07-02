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

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const lastWheelTime = useRef(0)

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goTo])

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFF314] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
    <div className="w-full bg-white min-h-screen flex flex-col">

      {/* ── HEADER – matches your reference image ── */}
      <div className="flex-shrink-0 bg-white px-4 sm:px-8 pt-6 pb-4 text-center">
        <p className="text-[#263238]/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {t('categories.donationAppeal', 'Your smallest contribution makes a big difference to children’s lives. We count on the generosity of people like you to be able to create real change for India’s children!')}
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#263238] mt-3">
          {t('categories.donationTitle', 'Donate For Happier Childhoods!')}
        </h2>
      </div>

      {/* ── CAROUSEL AREA ── */}
      <div className="flex-1 min-h-0 relative px-2 sm:px-6 py-3 sm:py-4">
        <div
          ref={containerRef}
          className="w-full h-full overflow-hidden rounded-xl sm:rounded-2xl select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            ref={trackRef}
            className="flex h-full transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `translateX(${transformValue}%)` }}
          >
            {translatedCategories.map((cat) => (
              <div key={cat.id} className="w-full flex-shrink-0 h-full">
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-[#263238]/10 h-full flex flex-col md:flex-row">

                  {/* Image – reduced height on mobile */}
                  <div className="md:w-[42%] h-48 sm:h-56 md:h-full relative flex-shrink-0">
                    <img
                      src={cat.image_url}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/800x600/263238/FFF314?text=Prayas'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
                    <div className="absolute bottom-3 left-4 md:hidden">
                      <span className="text-white text-xs font-bold tracking-widest uppercase bg-[#263238]/60 px-3 py-1 rounded-full">
                        {cat.title}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 md:p-10 overflow-y-auto">
                    <div className="space-y-3 sm:space-y-4">
                      {/* Category badge */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#FFF314]" />
                        <span className="text-[#FFF314] bg-[#263238] text-[11px] sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {cat.title}
                        </span>
                        {(cat.initiatives?.length ?? 0) > 0 && (
                          <span className="text-[#263238]/40 text-[11px] sm:text-sm">
                            · {cat.initiatives.length} initiative{cat.initiatives.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <h3 className="text-[#263238] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        {cat.title}
                      </h3>

                      <p className="text-[#263238]/70 text-sm sm:text-base md:text-lg leading-relaxed">
                        {cat.description}
                      </p>

                      {/* Funds progress */}
                      {cat.goal_funds > 0 && (
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[11px] sm:text-sm text-[#263238]/60">
                            <span>₹{cat.funds_collected?.toLocaleString() || 0} raised</span>
                            <span>Goal: ₹{cat.goal_funds?.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-1.5 sm:h-2 bg-[#263238]/10 rounded-full overflow-hidden">
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
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                          {cat.initiatives.slice(0, 4).map((init, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#263238]/5 border border-[#263238]/10 rounded-full text-[#263238]/70 text-[11px] sm:text-sm"
                            >
                              <span>{init.icon || '📌'}</span>
                              {init.title}
                            </span>
                          ))}
                          {cat.initiatives.length > 4 && (
                            <span className="text-[#263238]/40 text-[11px] sm:text-sm px-2 py-1">
                              +{cat.initiatives.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* CTA – full width on mobile, “Send” style */}
                    <button
                      onClick={() => navigate(`/impact/${cat.slug}`)}
                      className="mt-5 sm:mt-6 w-full sm:w-auto self-start inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFF314] text-[#263238] font-bold text-sm uppercase tracking-wider rounded-full hover:bg-[#f0e000] transition-colors shadow-md"
                    >
                      {t('categories.send', 'Send')}
                      <span className="text-base">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => goTo(-1)}
          disabled={currentIndex === 0}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition-all disabled:opacity-25 disabled:cursor-not-allowed text-[#263238]"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => goTo(1)}
          disabled={currentIndex === total - 1}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition-all disabled:opacity-25 disabled:cursor-not-allowed text-[#263238]"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {translatedCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? 'w-5 sm:w-6 h-2 sm:h-2.5 bg-[#FFF314] shadow-[0_0_8px_rgba(255,243,20,0.6)]'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#263238]/30 hover:bg-[#263238]/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
                            }
