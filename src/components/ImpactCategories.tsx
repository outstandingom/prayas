// src/components/ImpactCategories.tsx
import { useRef, useState, useEffect, useMemo } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)

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

        // Artificially inject Project Sindoda so it appears in the slider
        const projectSindoda = {
          id: 'project-sindoda',
          title: 'Project Sindoda (Plastic Mukti)',
          description: 'Transforming Sindoda into a completely plastic-free zone.',
          image_url: '/Sindoda/IMG_20191022_121001 (1).jpg',
          slug: 'project-sindoda',
          display_order: -1, 
          is_active: true,
          initiatives: [],
          funds_collected: 0,
          goal_funds: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        const fullData = [projectSindoda, ...parsedData].sort((a, b) => a.display_order - b.display_order)
        setCategories(fullData)
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

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFF314] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#263238]/60">Loading impact categories...</p>
        </div>
      </div>
    )
  }

  if (translatedCategories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-white">
        <p className="text-[#263238]/60">No impact categories available.</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white py-12 sm:py-16 flex flex-col">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* HEADER */}
      <div className="flex-shrink-0 bg-white px-4 sm:px-8 pb-8 text-center max-w-4xl mx-auto">
        <p className="text-[#263238]/70 text-sm sm:text-base leading-relaxed mb-4">
          {t('categories.donationAppeal', 'Your smallest contribution makes a big difference to children’s lives. We count on the generosity of people like you to be able to create real change for India’s children!')}
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-[#263238] font-bold mt-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Donate For Happier Childhoods!
        </h2>
      </div>

      {/* CAROUSEL AREA */}
      <div className="relative w-full max-w-7xl mx-auto mt-4 group">
        
        {/* Navigation arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 sm:left-4 top-[35%] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition-transform text-[#263238] border border-gray-100 opacity-90 hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-2 sm:right-4 top-[35%] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition-transform text-[#263238] border border-gray-100 opacity-90 hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 px-4 sm:px-12 snap-x snap-mandatory no-scrollbar pb-8 pt-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {translatedCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                if (cat.slug === 'project-sindoda') navigate('/project-sindoda')
                else navigate(`/impact/${cat.slug}`)
              }}
              className="w-[85vw] sm:w-[320px] md:w-[350px] flex-shrink-0 snap-center cursor-pointer group/card"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border-b-[6px] border-[#FFF314]">
                
                {/* Image */}
                <div className="h-56 sm:h-64 w-full relative overflow-hidden">
                  <img
                    src={cat.image_url}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/800x600/263238/FFF314?text=Prayas'
                    }}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center text-center p-6 sm:p-8 bg-white">
                  <h3
                    className="text-[#263238] text-lg sm:text-xl font-bold uppercase tracking-wider mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-[#263238]/80 text-sm sm:text-base font-medium line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
