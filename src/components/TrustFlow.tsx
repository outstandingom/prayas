// src/components/TrustFlow.tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── YOUR LOCAL IMAGES ───
const TRUST_IMAGES = [
  '/HEALTH.jpg',
  '/PRAYASHEALTHCAMP.jpeg',
  '/WOMEN.jpeg',
  '/education1.jpeg',
  '/healthhj.jpeg',
  '/CHILDRENGROUP.jpg',
]

const cards = [
  { title: 'Trust in Action', badge: '+30%', description: 'Building trust with communities' },
  { title: 'Community First', badge: '+12%', description: 'Empowering local leaders' },
  { title: 'Empowerment', badge: '-7.4%', description: 'Capacity building at grassroots' },
  { title: 'Sustainable Change', badge: '+45%', description: 'Long‑term impact' },
  { title: 'Success Together', badge: '100%', description: 'Collective achievements' },
]

export default function TrustFlow() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Staggered fade‑in for cards
      gsap.fromTo(
        '.trust-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Timeline line grows from top to bottom
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 1,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="trust-flow w-full max-w-5xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#263238] mb-4">
          Our approach is modeled around bringing change at all levels
        </h2>
        <p className="text-base md:text-lg text-[#263238]/80 max-w-3xl mx-auto leading-relaxed">
          With your support, we address children’s critical needs by working with parents, teachers,
          Anganwadi workers, communities, district and state level governments as well as the children themselves.
          <br /><br />
          We focus on changing behaviours and practices at the grassroots level and influencing public policy
          at a systemic level – thereby creating an ecosystem where children are made the nation’s priority.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-[#263238] origin-top timeline-line" />

        {cards.map((card, index) => (
          <div
            key={index}
            className={`trust-card flex items-center mb-12 md:mb-16 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className="w-5/12 hidden md:block" />

            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFF314] border-4 border-[#263238] shadow-lg z-10 mx-4 md:mx-8" />

            <div className="flex-1 md:w-5/12">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                <div className="relative h-48 md:h-56">
                  <img
                    src={TRUST_IMAGES[index % TRUST_IMAGES.length]}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  {/* ─── NO YELLOW OVERLAY – only the image ─── */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <div className="flex gap-2">
                      <span className="bg-[#263238] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {index + 1}
                      </span>
                      <span className="bg-[#FFF314] text-[#263238] text-xs font-bold px-3 py-1 rounded-full">
                        {card.badge}
                      </span>
                    </div>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {index % 2 === 0 ? '💬' : '🎯'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                      {card.title}
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
                {/* ─── REMOVED THE RANDOM VIEW COUNTS BAR ─── */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
