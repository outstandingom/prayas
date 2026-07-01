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
  const goTo = (dir: number) => {
    const newIndex = currentIndex + dir
    if (newIndex >= 0 && newIndex < total) {
      setCurrentIndex(newIndex)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, total])

  // Touch swipe support
  const [touchStartX, setTouchStartX] = useState(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? 1 : -1)
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

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Sticky Header */}
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

      {/* Carousel Section */}
      <div className="relative flex items-center justify-center w-full px-4 sm:px-8 py-6" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-6xl overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {translatedCategories.map((cat) => (
              <div
                key={cat.id}
                className="w-full flex-shrink-0 px-0 py-2"
              >
                <div className="bg-[#263238] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-2/5 h-64 md:h-auto relative flex-shrink-0">
                    <img
                      src={cat.image_url}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/800x600/263238/FFF314?text=No+Image'
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:hidden">
                      <span className="text-white/80 text-xs font-bold tracking-widest">
                        {cat.title}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#FFF314] text-xs font-bold tracking-widest">
                          {cat.title}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#FFF314]" />
                        <span className="text-white/40 text-xs">
                          {cat.initiatives?.length || 0} initiatives
                        </span>
                      </div>

                      <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">
                        {cat.title}
                      </h3>

                      <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
                        {cat.description}
                      </p>

                      {cat.goal_funds > 0 && (
                        <div className="mb-4">
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

                      {cat.initiatives && cat.initiatives.length > 0 && (
                        <div className="space-y-1 mb-4">
                          {cat.initiatives.slice(0, 3).map((init, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-white/60 text-sm">
                              <span className="text-base">{init.icon || '📌'}</span>
                              <span>{init.title}</span>
                            </div>
                          ))}
                          {cat.initiatives.length > 3 && (
                            <div className="text-white/40 text-xs">
                              +{cat.initiatives.length - 3} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/impact/${cat.slug}`)}
                      className="inline-flex items-center gap-2 text-[#FFF314] font-sans text-sm uppercase tracking-wider font-bold hover:gap-3 transition-all hover:text-white w-fit"
                    >
                      {t('categories.learnMore', 'Learn More')} <span className="text-lg leading-none">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (inside the carousel) */}
          <button
            onClick={() => goTo(-1)}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#263238]"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={() => goTo(1)}
            disabled={currentIndex === total - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#263238]"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {translatedCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? 'w-3 h-3 bg-[#FFF314] shadow-[0_0_8px_rgba(255,243,20,0.5)]'
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
