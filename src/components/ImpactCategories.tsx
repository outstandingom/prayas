// src/components/ImpactCategories.tsx
import { useState, useEffect, useMemo } from 'react'
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

  const translatedCategories = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      title: t(`categories.${cat.slug}.title`, cat.title),
      description: t(`categories.${cat.slug}.desc`, cat.description),
    }))
  }, [categories, t])

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

  return (
    <div className="w-full bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">

      {/* ── Header – matches the image ── */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <p className="text-[#263238]/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {t('categories.donationAppeal', 'Your smallest contribution makes a big difference to children’s lives. We count on the generosity of people like you to be able to create real change for India’s children!')}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] mt-4">
          {t('categories.donationTitle', 'Donate For Happier Childhoods!')}
        </h2>
      </div>

      {/* ── Cards grid ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {translatedCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl shadow-lg border border-[#263238]/10 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Image (optional, but we keep it) */}
            {cat.image_url && (
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={cat.image_url}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/800x600/263238/FFF314?text=Prayas'
                  }}
                />
              </div>
            )}

            <div className="p-5 flex flex-col flex-1">
              {/* Category label with icon if available */}
              <div className="flex items-center gap-2 mb-2">
                {cat.initiatives?.[0]?.icon && (
                  <span className="text-2xl">{cat.initiatives[0].icon}</span>
                )}
                <span className="text-[#FFF314] bg-[#263238] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {cat.title}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#263238] leading-tight">
                {cat.title}
              </h3>

              <p className="text-[#263238]/70 text-sm sm:text-base mt-2 flex-1">
                {cat.description}
              </p>

              {/* Funds progress */}
              {cat.goal_funds > 0 && (
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs text-[#263238]/60">
                    <span>₹{cat.funds_collected?.toLocaleString() || 0} raised</span>
                    <span>Goal: ₹{cat.goal_funds?.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#263238]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFF314] rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min((cat.funds_collected || 0) / (cat.goal_funds || 1) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Initiative tags (max 3) */}
              {cat.initiatives && cat.initiatives.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cat.initiatives.slice(0, 3).map((init, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#263238]/5 rounded-full text-[#263238]/70 text-xs"
                    >
                      <span>{init.icon || '📌'}</span>
                      {init.title}
                    </span>
                  ))}
                  {cat.initiatives.length > 3 && (
                    <span className="text-[#263238]/40 text-xs px-2">
                      +{cat.initiatives.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* CTA button – "SEND" styled like the image */}
              <button
                onClick={() => navigate(`/impact/${cat.slug}`)}
                className="mt-5 w-full py-3 bg-[#FFF314] text-[#263238] font-bold text-sm uppercase tracking-wider rounded-full hover:bg-[#f0e000] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                {t('categories.send', 'Send')}
                <span className="text-base">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
