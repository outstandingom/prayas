// src/components/ImageCarousel.tsx

import { useState, useRef, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform, animate, useSpring } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ASSETS = [
  { src: '/WOMEN.jpeg', title: 'Women Welfare' },
  { src: '/P1039409.JPG', title: 'Child Education' },
  { src: '/healthcaret.jpg', title: 'Health & Hygiene' },
  { src: '/TREEGROW.jpg', title: 'Nature Activity' },
  { src: '/ruraldevelopment.jpeg', title: 'Rural Development' },
  { src: '/P1039322.JPG', title: 'Mental Counseling' },
  { src: '/IMG-27.jpeg', title: 'Art & Culture' },
  { src: '/IMG-25.jpeg', title: 'Sports' },
  { src: '/CHILDRENGROUP.jpg', title: 'Special Child Support' },
  { src: '/SAMATI.jpeg', title: 'Slum Development' },
]

function useResponsiveItemWidth() {
  const [itemWidth, setItemWidth] = useState(200)

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth
      if (width < 480) setItemWidth(130)
      else if (width < 640) setItemWidth(150)
      else if (width < 768) setItemWidth(170)
      else if (width < 1024) setItemWidth(190)
      else setItemWidth(220)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return itemWidth
}

export default function ImageCarousel() {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false)
  const isInteracting = useRef(false)
  const xOffset = useMotionValue(0)
  const itemWidth = useResponsiveItemWidth()
  const totalItems = ASSETS.length
  const totalWidth = totalItems * itemWidth

  const dragXSpring = useSpring(xOffset, { damping: 30, stiffness: 300 })

  useAnimationFrame((time, delta) => {
    if (isPaused || isInteracting.current) return
    const speed = itemWidth * 0.3
    const moveBy = speed * (delta / 1000)
    xOffset.set(xOffset.get() - moveBy)
  })

  const handleDragStart = () => { isInteracting.current = true }
  const handleDragEnd = () => { isInteracting.current = false }
  const handleDrag = (e: any, info: PanInfo) => {
    xOffset.set(xOffset.get() + info.delta.x)
  }

  const toNext = () => {
    isInteracting.current = true
    animate(xOffset, xOffset.get() - itemWidth, {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      onComplete: () => isInteracting.current = false
    })
  }

  const toPrev = () => {
    isInteracting.current = true
    animate(xOffset, xOffset.get() + itemWidth, {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      onComplete: () => isInteracting.current = false
    })
  }

  return (
    <div className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden select-none">
      <div className="text-center mb-12 sm:mb-16 md:mb-24 px-4 sm:px-6">

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-[#263238] px-2">
          {t('carousel.title', 'Achievement & Accreditations')}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-4 rounded-full shadow-xs" />
      </div>

      <div
        className="w-full relative flex justify-center items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="relative h-[280px] sm:h-[320px] md:h-[380px] w-full max-w-7xl mx-auto cursor-grab active:cursor-grabbing flex items-center justify-center perspective-[1200px]"
          drag="x"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        >
          {ASSETS.map((item, i) => (
            <CarouselItem
              key={i}
              index={i}
              item={item}
              xOffset={dragXSpring}
              itemWidth={itemWidth}
              totalWidth={totalWidth}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-6 text-[#263238] z-20">
        <button
          onClick={toPrev}
          className="p-2 sm:p-3 rounded-full glass hover:bg-[#FFF314] hover:text-[#263238] transition-all cursor-pointer touch-manipulation"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#263238] hover:bg-[#263238]/90 border border-[#FFF314]/20 transition-colors text-[#FFF314] shadow-md touch-manipulation"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play size={16} className="ml-0.5 sm:ml-1" /> : <Pause size={16} />}
        </button>

        <button
          onClick={toNext}
          className="p-2 sm:p-3 rounded-full glass hover:bg-[#FFF314] hover:text-[#263238] transition-all cursor-pointer touch-manipulation"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

function CarouselItem({ index, item, xOffset, itemWidth, totalWidth }: {
  index: number
  item: any
  xOffset: any
  itemWidth: number
  totalWidth: number
}) {
  const rawOffset = useTransform(xOffset, (val: number) => {
    const basePos = val + index * itemWidth
    let wrapped = ((basePos % totalWidth) + totalWidth) % totalWidth
    if (wrapped > totalWidth / 2) wrapped -= totalWidth
    return wrapped
  })

  const x = rawOffset
  const scale = useTransform(
    rawOffset,
    [-itemWidth * 3, -itemWidth, 0, itemWidth, itemWidth * 3],
    [0.65, 0.85, 1.15, 0.85, 0.65]
  )
  const rotateY = useTransform(
    rawOffset,
    [-itemWidth * 3, -itemWidth, 0, itemWidth, itemWidth * 3],
    [45, 25, 0, -25, -45]
  )
  const zIndex = useTransform(
    rawOffset,
    [-itemWidth * 3, -itemWidth, 0, itemWidth, itemWidth * 3],
    [0, 5, 20, 5, 0]
  )
  const filter = useTransform(
    rawOffset,
    [-itemWidth * 2, -itemWidth, 0, itemWidth, itemWidth * 2],
    ['blur(4px)', 'blur(2px)', 'blur(0px)', 'blur(2px)', 'blur(4px)']
  )
  const opacity = useTransform(
    rawOffset,
    [-itemWidth * 4, -itemWidth * 3, -itemWidth, 0, itemWidth, itemWidth * 3, itemWidth * 4],
    [0, 0.3, 0.8, 1, 0.8, 0.3, 0]
  )

  const cardWidth = itemWidth
  const cardHeight = itemWidth * (4 / 3)

  return (
    <motion.div
      className="absolute"
      style={{ x, zIndex, width: cardWidth }}
    >
      <motion.div
        className="mx-auto flex flex-col items-center gap-3 sm:gap-4"
        style={{ scale, rotateY, filter, opacity, width: cardWidth }}
      >
        <div
          className="relative rounded-2xl shadow-xl border border-[#FFF314]/10 overflow-hidden bg-[#263238]/5"
          style={{ width: cardWidth, height: cardHeight }}
        >
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="600" viewBox="0 0 500 600"%3E%3Crect width="500" height="600" fill="%23263238"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23FFF314" font-weight="bold"%3EPrayas Foundation%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>
        <motion.div
          className="text-xs sm:text-sm font-medium text-[#EF4444] whitespace-nowrap bg-[#263238]/95 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#263238]/20 pointer-events-none shadow-sm"
          style={{ maxWidth: cardWidth + 20, overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {item.title}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
