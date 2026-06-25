// src/pages/ImpactPage.tsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

interface Initiative {
  icon: string
  title: string
  description: string
}

interface CategoryData {
  id: string
  title: string
  description: string
  image_url: string
  slug: string
  initiatives: Initiative[]
  funds_collected: number
  goal_funds: number
}

export default function ImpactPage() {
  const { slug } = useParams<{ slug: string }>()
  const [data, setData] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return
      setLoading(true)
      const { data, error } = await supabase
        .from('impact_categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) {
        setError(error.message)
      } else if (data) {
        const parsed = {
          ...data,
          initiatives: typeof data.initiatives === 'string'
            ? JSON.parse(data.initiatives)
            : data.initiatives || []
        }
        setData(parsed)
      } else {
        setError('Category not found')
      }
      setLoading(false)
    }
    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-24 px-4">
        <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1>
        <p className="text-gray-500 mt-2">{error || 'The requested impact area does not exist.'}</p>
      </div>
    )
  }

  const accentColorMap: Record<string, string> = {
    'education': '#0056B3',
    'healthcare': '#0D9488',
    'women-empowerment': '#7E22CE',
    'child-welfare': '#EA580C',
    'environment': '#15803D',
    'rural-development': '#B45309',
    'skill-training': '#3B82F6',
    'disaster-relief': '#DC2626',
    'animal-welfare': '#8B5A2B',
    'elderly-care': '#475569',
    'food-security': '#D97706',
    'mental-health': '#6D28D9',
  }
  const accentColor = accentColorMap[data.slug] || '#263238'

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: '#F8FAFC' }}>
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="font-mono text-sm tracking-widest uppercase font-bold mb-4 block" style={{ color: accentColor }}>
              Impact Area
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {data.title}
            </h1>
            <p className="text-gray-700 text-lg md:text-xl font-mono mb-8 max-w-md">
              {data.description}
            </p>
            {data.goal_funds > 0 && (
              <div className="mb-6">
                <div className="flex justify-between text-sm font-mono">
                  <span>₹{data.funds_collected.toLocaleString()} raised</span>
                  <span>Goal: ₹{data.goal_funds.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((data.funds_collected / data.goal_funds) * 100, 100)}%`,
                      backgroundColor: accentColor
                    }}
                  />
                </div>
              </div>
            )}
            <button
              className="text-white font-mono font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: accentColor }}
              onClick={() => window.location.href = '/donate'}
            >
              Support This Cause
            </button>
          </div>

          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={data.image_url}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: `linear-gradient(to top, ${accentColor}40, transparent)` }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-12" style={{ backgroundColor: accentColor }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Our Key Initiatives
            </h2>
            <p className="font-mono text-white/80 max-w-2xl mx-auto">
              Explore the programs driving change in this area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.initiatives && data.initiatives.length > 0 ? (
              data.initiatives.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <div className="text-4xl mb-6">{item.icon || '📌'}</div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="font-mono text-white/80 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))
            ) : (
              <p className="text-white/60 col-span-3 text-center">No initiatives added yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
