import { useState, useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform, animate } from 'framer-motion'
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

const ITEM_WIDTH = 200
const TOTAL_ITEMS = ASSETS.length
const TOTAL_WIDTH = TOTAL_ITEMS * ITEM_WIDTH

export default function ImageCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const isInteracting = useRef(false)
  const xOffset = useMotionValue(0)

  // Continuous Marquee Animation Loop
  useAnimationFrame((time, delta) => {
    if (isPaused || isInteracting.current) return
    // Marquee speed: ~60 pixels per second
    const moveBy = 60 * (delta / 1000)
    xOffset.set(xOffset.get() - moveBy)
  })

  // Drag handlers
  const handleDragStart = () => {
    isInteracting.current = true
  }
  const handleDragEnd = () => {
    isInteracting.current = false
  }
  const handleDrag = (e: any, info: PanInfo) => {
    xOffset.set(xOffset.get() + info.delta.x)
  }

  // Button handlers
  const toNext = () => {
    isInteracting.current = true
    animate(xOffset, xOffset.get() - ITEM_WIDTH, { 
      type: "spring", bounce: 0, duration: 0.5,
      onComplete: () => isInteracting.current = false
    })
  }
  const toPrev = () => {
    isInteracting.current = true
    animate(xOffset, xOffset.get() + ITEM_WIDTH, { 
      type: "spring", bounce: 0, duration: 0.5,
      onComplete: () => isInteracting.current = false
    })
  }

  return (
    <div className="relative py-32 bg-surface/50 border-y border-white/5 overflow-hidden select-none">
      <div className="text-center mb-24 px-6">
        <span className="text-emerald font-mono text-xs uppercase tracking-widest font-semibold">Our Reach</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-navy">Explore Our Core Sectors</h2>
      </div>

      <div 
        className="w-full relative flex justify-center items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div 
          className="relative h-[320px] w-full max-w-5xl cursor-grab active:cursor-grabbing flex items-center justify-center perspective-[1200px]"
          drag="x"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0} // Override default elasticity so it perfectly follows the pointer
        >
          {ASSETS.map((item, i) => (
            <CarouselItem key={i} index={i} item={item} xOffset={xOffset} />
          ))}
        </motion.div>
      </div>

      <div className="relative mt-16 flex items-center justify-center gap-6 text-navy z-20">
        <button onClick={toPrev} className="p-3 rounded-full glass hover:bg-emerald hover:text-white transition-all cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={() => setIsPaused(!isPaused)} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/5 hover:bg-navy/10 border border-navy/10 transition-colors text-emerald"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play size={16} className="ml-1" /> : <Pause size={16} />}
        </button>

        <button onClick={toNext} className="p-3 rounded-full glass hover:bg-emerald hover:text-white transition-all cursor-pointer">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

function CarouselItem({ index, item, xOffset }: { index: number, item: any, xOffset: any }) {
  // Map continuous global xOffset into a perfectly wrapped local position for this item
  const rawOffset = useTransform(xOffset, (val: number) => {
    const basePos = val + index * ITEM_WIDTH
    const w = TOTAL_WIDTH
    let wrapped = ((basePos % w) + w) % w
    if (wrapped > w / 2) wrapped -= w
    return wrapped
  })

  // Dynamic 3D Coverflow properties based strictly on its physical X position
  const x = rawOffset
  const scale = useTransform(rawOffset, [-600, -200, 0, 200, 600], [0.75, 0.9, 1.15, 0.9, 0.75])
  const rotateY = useTransform(rawOffset, [-600, -200, 0, 200, 600], [45, 25, 0, -25, -45])
  const zIndex = useTransform(rawOffset, [-600, -200, 0, 200, 600], [0, 5, 20, 5, 0])
  const filter = useTransform(rawOffset, [-400, -200, 0, 200, 400], ['blur(4px)', 'blur(2px)', 'blur(0px)', 'blur(2px)', 'blur(4px)'])
  const opacity = useTransform(rawOffset, [-800, -600, -200, 0, 200, 600, 800], [0, 0.3, 0.8, 1, 0.8, 0.3, 0])

  return (
    <motion.div 
      className="absolute w-[200px]"
      style={{ x, zIndex }}
    >
      <motion.div 
         className="w-48 aspect-[3/4] mx-auto flex flex-col items-center gap-4"
         style={{ scale, rotateY, filter, opacity }}
      >
        <img src={item.src} alt={item.title} className="w-full h-full object-cover rounded-2xl shadow-xl border border-navy/10 pointer-events-none" />
        <motion.div 
          className="text-sm font-medium text-gold whitespace-nowrap bg-navy/95 px-4 py-2 rounded-full border border-navy/20 pointer-events-none" 
        >
          {item.title}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
