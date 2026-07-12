import { useState } from 'react'
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
  ChevronDown,
  ChevronUp,
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
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({})

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleCategoryExpand = (id: number) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const scrollToCategory = (id: number) => {
    const el = document.getElementById(`category-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Education category ID = 3
  const EDUCATION_CATEGORY_ID = 3
  const EXTERNAL_URL = 'https://www.teachforindia.org/fellowship'

  const categories: WorkCategory[] = [
    // ... (same as before, no changes)
    // I'll omit the full array for brevity, but it's identical to your original.
    // Keep the Education category as id: 3.
  ]

  // Animation variants (unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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

  return (
    <div className="min-h-screen bg-white pt-8 pb-16">
      {/* Hero Header (unchanged) */}
      {/* ... */}

      {/* Flip Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-[#263238] text-center mb-12"
        >
          Our Focus Areas
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {categories.map((category) => {
            const isFlipped = flipped[category.id] || false
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className="relative h-80 w-full cursor-pointer [perspective:1000px]"
                onClick={() => toggleFlip(category.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* Front - unchanged */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-xl font-bold drop-shadow-md">
                        {category.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#FFF314] text-[#263238] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Click to flip
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden shadow-lg p-6 flex flex-col justify-between"
                    style={{ background: category.bgColor }}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-[#263238] mb-2">
                        {category.title}
                      </h3>
                      <p className="text-[#263238]/70 text-sm leading-relaxed line-clamp-4">
                        {category.longDescription}
                      </p>
                    </div>

                    {/* === MODIFIED: Read More button === */}
                    {category.id === EDUCATION_CATEGORY_ID ? (
                      <a
                        href={EXTERNAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full py-2.5 px-4 bg-[#263238] text-white font-semibold rounded-full hover:bg-[#1a2a2e] transition-colors shadow-md text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read More →
                      </a>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          scrollToCategory(category.id)
                        }}
                        className="mt-4 w-full py-2.5 px-4 bg-[#263238] text-white font-semibold rounded-full hover:bg-[#1a2a2e] transition-colors shadow-md"
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

      {/* Detailed Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {categories.map((category) => {
          const isExpanded = expandedCategories[category.id] || false
          const bgClass = category.bgColor.replace('bg-', '')
          return (
            <motion.div
              key={category.id}
              id={`category-${category.id}`}
              variants={itemVariants}
              className={`relative rounded-2xl p-6 md:p-8 mb-20 last:mb-0 scroll-mt-24 border-l-8 ${category.borderColor} shadow-sm`}
              style={{ backgroundColor: `rgba(var(--${bgClass}-rgb), 0.3)` }}
            >
              {/* Category Banner Image - unchanged */}
              {/* ... */}

              {/* Expanded Category Description - unchanged */}
              {/* ... */}

              {/* Category Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {category.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="group relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                    style={{
                      backgroundImage: `url(https://picsum.photos/seed/${encodeURIComponent(
                        item.title
                      )}/600/400)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                      <div
                        className={`inline-flex p-2.5 rounded-xl ${category.bgColor} ${category.color} mb-3 w-fit group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold mb-1 drop-shadow-md">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* === MODIFIED: Learn More button === */}
                      {category.id === EDUCATION_CATEGORY_ID ? (
                        <a
                          href={EXTERNAL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-3 w-full py-1.5 px-3 text-white text-xs font-semibold rounded-full transition-colors border border-white/20 text-center`}
                          style={{
                            backgroundColor: category.color.replace('text', '').trim(),
                            backdropFilter: 'blur(4px)',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Learn More →
                        </a>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            alert(`Learn more about ${item.title}:\n\n${item.longDescription}`)
                          }}
                          className={`mt-3 w-full py-1.5 px-3 text-white text-xs font-semibold rounded-full transition-colors border border-white/20`}
                          style={{
                            backgroundColor: category.color.replace('text', '').trim(),
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          Learn More →
                        </button>
                      )}
                    </div>

                    {/* Decorative accent line */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 ${category.color.replace(
                        'text',
                        'bg'
                      )} w-0 group-hover:w-full transition-all duration-300`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* CTA Section (unchanged) */}
      {/* ... */}
    </div>
  )
}
