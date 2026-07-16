import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Trees,
  Users,
  Droplets,
  Building,
  Handshake,
  Scissors,
  Users2,
  Factory,
  GraduationCap,
  Laptop,
  Compass,
  Shield,
  HeartPulse,
  Stethoscope,
  Heart,
  Accessibility,
  Baby,
  UsersRound,
  Leaf,
  Sprout,
  ShoppingBag,
  Home,
} from 'lucide-react'

interface WorkItem {
  icon: React.ElementType
  title: string
  description: string
  longDescription: string
}

interface WorkCategory {
  id: number
  title: string
  icon: React.ElementType
  description: string
  longDescription: string
  items: WorkItem[]
  color: string
  bgColor: string
  borderColor: string
  image: string
}

export default function OurWork() {
  const { t } = useTranslation()
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // ========== ROUTE CONFIGURATION ==========
  const RURAL_CATEGORY_ID = 1
  const RURAL_ROUTE = '/rural-development'

  const WOMEN_CATEGORY_ID = 2
  const WOMEN_ROUTE = '/women-empowerment'

  const EDUCATION_CATEGORY_ID = 3
  const EDUCATION_ROUTE = '/education'

  const HEALTH_CATEGORY_ID = 4
  const HEALTH_ROUTE = '/healthcare'

  const ENVIRONMENT_CATEGORY_ID = 5
  const ENVIRONMENT_ROUTE = '/environment'

  const getCategoryRoute = (id: number) => {
    if (id === RURAL_CATEGORY_ID) return RURAL_ROUTE
    if (id === WOMEN_CATEGORY_ID) return WOMEN_ROUTE
    if (id === EDUCATION_CATEGORY_ID) return EDUCATION_ROUTE
    if (id === HEALTH_CATEGORY_ID) return HEALTH_ROUTE
    if (id === ENVIRONMENT_CATEGORY_ID) return ENVIRONMENT_ROUTE
    return null
  }

  // ========== CATEGORIES ==========
  const categories: WorkCategory[] = [
    // ... (your existing category data – unchanged) ...
    // I'll keep it short for brevity – you can use your full data.
    // But you need to include all categories and items as before.
    // I'll show a placeholder – you should copy your full categories array from your original code.
  ]

  // ========== ANIMATION VARIANTS ==========
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  // ========== JSX ==========
  return (
    <div 
      className="min-h-screen bg-white pb-16"
      style={{ paddingTop: 'var(--navbar-height, 100px)' }}
    >
      {/* ===== WHAT WE DO SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-normal text-[#263238] mb-4"
            style={{ fontFamily: 'Forte, cursive' }}
          >
            what we do
          </h2>
          <p className="text-lg text-[#263238]/60 max-w-2xl mx-auto">
            Explore our five key focus areas where we create lasting impact in communities across India.
          </p>
        </motion.div>

        {/* ===== FLIP CARDS GRID ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {categories.map((category) => {
            const isFlipped = flipped[category.id] || false
            const route = getCategoryRoute(category.id)
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className="relative h-96 w-full cursor-pointer [perspective:1000px]"
                onClick={() => toggleFlip(category.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* ===== FRONT – with image and overlay ===== */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-lg border-8"
                    style={{
                      borderColor: `${category.color}4D`,
                    }}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    {/* Dark overlay for text */}
                    <div className="absolute inset-0 bg-black/40" />
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-end h-full p-6 text-center text-white">
                      <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/80 mb-1">
                        WHAT WE DO
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                        {category.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/90 mt-2 max-w-xs leading-relaxed line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* ===== BACK – unchanged ===== */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden shadow-lg p-6 flex flex-col justify-between border-4"
                    style={{
                      backgroundColor: category.color,
                      borderColor: category.color,
                    }}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-5">
                        {category.longDescription}
                      </p>
                    </div>

                    {route ? (
                      <Link
                        to={route}
                        className="mt-4 w-full py-2.5 px-4 bg-white text-[#263238] font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-md text-center inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read More →
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          alert(`Learn more about ${category.title}`)
                        }}
                        className="mt-4 w-full py-2.5 px-4 bg-white text-[#263238] font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-md"
                      >
                        Read More →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </div>
  )
}
