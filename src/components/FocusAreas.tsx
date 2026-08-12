// src/components/FocusAreas.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Trees, Users, GraduationCap, HeartPulse, Leaf, ArrowRight, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const areas = [
  {
    icon: Trees,
    title: 'Rural Development',
    description: 'Transforming villages with infrastructure, clean water, sanitation, and holistic community empowerment.',
    slug: 'rural-development',
    color: '#849989',
    bottomColor: '#2e7d32',
    image: '/ruraldevelopment.jpeg',
  },
  {
    icon: Users,
    title: 'Women Empowerment',
    description: 'Vocational skill development, tailoring centres, financial independence, and SHGs for women.',
    slug: 'women-empowerment',
    color: '#777e91',
    bottomColor: '#dd2a7b',
    image: '/WOMEN.jpeg',
  },
  {
    icon: GraduationCap,
    title: 'Education & Skills',
    description: 'Sanskarshala value education, digital literacy labs, career counselling, and youth leadership.',
    slug: 'education',
    color: '#5b8266',
    bottomColor: '#e91e63',
    image: '/assets/education/digital-literacy-lab.jpg',
  },
  {
    icon: HeartPulse,
    title: 'Health & Welfare',
    description: 'Free rural health camps, organ donation drives, elderly support, and child welfare initiatives.',
    slug: 'healthcare',
    color: '#8d6e63',
    bottomColor: '#d32f2f',
    image: '/healthcaret.jpg',
  },
  {
    icon: Leaf,
    title: 'Environment',
    description: 'Massive tree plantation drives, Kargil Vatika tribute forest, and rainwater harvesting projects.',
    slug: 'environment',
    color: '#43a047',
    bottomColor: '#388e3c',
    image: '/TREEGROW.jpg',
  },
]

export default function FocusAreas() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? areas.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === areas.length - 1 ? 0 : prev + 1))
  }

  const currentArea = areas[currentIndex]

  return (
    <section className="bg-white py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── SECTION HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] mt-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('focus.title', 'What We Do')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-3 rounded-full shadow-xs" />

        </motion.div>

        {/* ─── DESKTOP GRID (Hidden on mobile) ─── */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {areas.map((area, index) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative h-[360px] w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/80 bg-slate-900"
              style={{
                boxShadow: `0 10px 30px -10px ${area.color}40`,
              }}
            >
              <Link to={`/${area.slug}`} className="block w-full h-full relative overflow-hidden rounded-3xl">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-[2px] brightness-95 group-hover:brightness-75"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23263238"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23FFF314"%3EPrayas%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  {/* Default Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                </div>

                {/* UNHOVERED CARD CONTENT */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-3 z-10">
                  <div className="flex justify-between items-center">
                    <span
                      className="p-2.5 rounded-2xl text-white backdrop-blur-md shadow-md border border-white/20"
                      style={{ backgroundColor: `${area.color}E6` }}
                    >
                      <area.icon className="w-5 h-5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1.5 drop-shadow-md">
                      {area.title}
                    </h3>
                    <p className="text-white/80 text-xs line-clamp-2 leading-relaxed font-light">
                      {area.description}
                    </p>
                  </div>
                </div>

                {/* HOVERED POP-UP PANEL INSIDE CARD */}
                <div
                  className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 backdrop-blur-md rounded-3xl border border-white/20"
                  style={{
                    background: `linear-gradient(145deg, ${area.color}E6 0%, rgba(15, 23, 42, 0.94) 100%)`,
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 border-b border-white/20 pb-2.5">
                      <span className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-md border border-white/30">
                        <area.icon className="w-4 h-4" />
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        {area.title}
                      </h3>
                    </div>

                    <p className="text-white/95 text-xs leading-relaxed font-light pt-1">
                      {area.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/20">
                    <div className="w-full py-2.5 px-4 bg-white text-[#263238] font-bold rounded-xl shadow-lg hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider group/btn">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ─── MOBILE RESPONSIVE CAROUSEL CARD ─── */}
        <div className="block md:hidden px-1 py-2">
          {/* Main Card Container */}
          <div className="relative w-full rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-2xl p-4 sm:p-6 pt-6">

            {/* Top Children Header Illustration / Banner Image */}
            <div className="absolute top-0 left-0 right-0 h-36 overflow-hidden">
              <img
                src="/P1039409.JPG"
                alt="Prayas Children Header"
                className="w-full h-full object-cover object-top opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
            </div>

            {/* Middle Card Slider Area with Arrow Buttons */}
            <div className="relative mt-4 mb-4 px-2">

              {/* Left Arrow Button */}
              <button
                onClick={prevSlide}
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white text-[#263238] shadow-xl border border-gray-200 flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={nextSlide}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white text-[#263238] shadow-xl border border-gray-200 flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Focus Card - 100% Filled Image with Text Overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentArea.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="mx-auto w-[85%] sm:w-[75%] h-[360px] sm:h-[400px] rounded-3xl shadow-2xl relative overflow-hidden cursor-pointer group"
                  style={{
                    borderBottomWidth: '6px',
                    borderBottomColor: currentArea.bottomColor,
                  }}
                >
                  <Link to={`/${currentArea.slug}`} className="block w-full h-full relative overflow-hidden">
                    {/* Background Image - Fully Filled 100% */}
                    <img
                      src={currentArea.image}
                      alt={currentArea.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23263238"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23FFF314"%3EPrayas%3C/text%3E%3C/svg%3E'
                      }}
                    />

                    {/* Dark Gradient Scrim Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Top Icon Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className="p-2.5 rounded-2xl text-white backdrop-blur-md shadow-md border border-white/20 inline-block"
                        style={{ backgroundColor: `${currentArea.bottomColor}E6` }}
                      >
                        <currentArea.icon className="w-5 h-5" />
                      </span>
                    </div>

                    {/* Text Overlay Written Directly on Image */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center z-10">
                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 font-sans drop-shadow-md">
                        {currentArea.title}
                      </h3>

                      {/* Small Accent Line */}
                      <div
                        className="w-12 h-1 rounded-full mb-2.5"
                        style={{ backgroundColor: currentArea.bottomColor }}
                      />

                      {/* Description Subtext */}
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-light line-clamp-2 mb-3 max-w-xs">
                        {currentArea.description}
                      </p>

                      {/* Explore Pill Button */}
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30 shadow-md">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Dots Pagination */}
            <div className="flex justify-center items-center gap-2 pt-2">
              {areas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'w-7 bg-[#263238]' : 'w-2.5 bg-[#263238]/30'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
