import { useState, useRef, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform, animate, useSpring } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const ASSETS = [
  { src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=500&auto=format&fit=crop', title: 'Women Welfare' },
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop', title: 'Child Education' },
  { src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=500&auto=format&fit=crop', title: 'Health & Hygiene' },
  { src: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?q=80&w=500&auto=format&fit=crop', title: 'Nature Activity' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=500&auto=format&fit=crop', title: 'Rural Development' },
  { src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=500&auto=format&fit=crop', title: 'Mental Counseling' },
  { src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=500&auto=format&fit=crop', title: 'Art & Culture' },
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop', title: 'Sports' },
  { src: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?q=80&w=500&auto=format&fit=crop', title: 'Special Child Support' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=500&auto=format&fit=crop', title: 'Slum Development' },
]

// Helper hook to get current item width based on viewport
function useResponsiveItemWidth() {
  const [itemWidth, setItemWidth] = useState(200) // default desktop

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth
      if (width < 480) setItemWidth(130)      // small mobile
      else if (width < 640) setItemWidth(150) // mobile landscape
      else if (width < 768) setItemWidth(170) // tablet portrait
      else if (width < 1024) setItemWidth(190) // tablet landscape
      else setItemWidth(220)                  // desktop
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return itemWidth
}

export default function ImageCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const isInteracting = useRef(false)
  const xOffset = useMotionValue(0)
  const itemWidth = useResponsiveItemWidth()
  const totalItems = ASSETS.length
  const totalWidth = totalItems * itemWidth

  // Use spring for smoother dragging on touch devices
  const dragXSpring = useSpring(xOffset, { damping: 30, stiffness: 300 })

  // Continuous marquee animation (only when not paused and not interacting)
  useAnimationFrame((time, delta) => {
    if (isPaused || isInteracting.current) return
    // Speed adapted to item width: ~30% of item width per second (feels natural on all sizes)
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
    <div className="relative py-16 sm:py-24 md:py-32 bg-surface/50 border-y border-white/5 overflow-hidden select-none">
      <div className="text-center mb-12 sm:mb-16 md:mb-24 px-4 sm:px-6">
        <span className="text-emerald font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold">Our Reach</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-navy px-2">
          Explore Our Core Sectors
        </h2>
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
          dragElastic={0.1} // slight elasticity for better touch feel
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

      <div className="relative mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-6 text-navy z-20">
        <button
          onClick={toPrev}
          className="p-2 sm:p-3 rounded-full glass hover:bg-emerald hover:text-white transition-all cursor-pointer touch-manipulation"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-navy/5 hover:bg-navy/10 border border-navy/10 transition-colors text-emerald touch-manipulation"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play size={16} className="ml-0.5 sm:ml-1" /> : <Pause size={16} />}
        </button>

        <button
          onClick={toNext}
          className="p-2 sm:p-3 rounded-full glass hover:bg-emerald hover:text-white transition-all cursor-pointer touch-manipulation"
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
  // Map continuous global xOffset into a perfectly wrapped local position
  const rawOffset = useTransform(xOffset, (val: number) => {
    const basePos = val + index * itemWidth
    let wrapped = ((basePos % totalWidth) + totalWidth) % totalWidth
    if (wrapped > totalWidth / 2) wrapped -= totalWidth
    return wrapped
  })

  // Dynamic 3D properties based on position (values tuned for responsive width)
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

  // Responsive card aspect ratio stays 3:4
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
          className="relative rounded-2xl shadow-xl border border-navy/10 overflow-hidden bg-navy/5"
          style={{ width: cardWidth, height: cardHeight }}
        >
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
        </div>
        <motion.div
          className="text-xs sm:text-sm font-medium text-gold whitespace-nowrap bg-navy/95 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-navy/20 pointer-events-none shadow-sm"
          style={{ maxWidth: cardWidth + 20, overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {item.title}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
