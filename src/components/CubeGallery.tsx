import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'

const NGO_SECTORS = [
  { tag: '01 — Education', title: 'EMPOWERING\nMINDS', desc: 'Providing quality education to children in remote villages, building schools, and training teachers to create a sustainable learning ecosystem.', align: 'left', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800' },
  { tag: '02 — Healthcare', title: 'HEALING\nCOMMUNITIES', desc: 'Delivering essential medical supplies, organizing health camps, and building local clinics to ensure everyone has access to basic healthcare.', align: 'right', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800' },
  { tag: '03 — Women Welfare', title: 'FOSTERING\nLEADERS', desc: 'Empowering women through skill development, micro-finance initiatives, and leadership workshops to build stronger, self-reliant communities.', align: 'left', img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800' },
  { tag: '04 — Rural Dev', title: 'BUILDING\nINFRASTRUCTURE', desc: 'Constructing clean water facilities, solar power setups, and vital infrastructure to bridge the gap between urban and rural living standards.', align: 'right', img: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?q=80&w=800' },
  { tag: '05 — Environment', title: 'NURTURING\nNATURE', desc: 'Planting trees, cleaning waterways, and teaching sustainable farming practices to protect our planet for future generations.', align: 'left', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800' },
  { tag: '06 — Slum Dev', title: 'UPLIFTING\nLIVES', desc: 'Transforming urban slums through sanitation projects, youth programs, and community centers that provide safe spaces for growth.', align: 'right', img: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=800' },
  { tag: '07 — Special Needs', title: 'INCLUSIVE\nCARE', desc: 'Providing specialized equipment, therapy, and inclusive education programs for children and adults with special needs.', align: 'left', img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=800' },
  { tag: '08 — Arts & Culture', title: 'PRESERVING\nHERITAGE', desc: 'Supporting local artisans, funding traditional art schools, and organizing cultural festivals to keep our rich history alive.', align: 'right', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800' },
  { tag: '09 — Sports', title: 'CHAMPIONING\nYOUTH', desc: 'Building community sports facilities, organizing local tournaments, and providing equipment to foster teamwork and physical health.', align: 'left', img: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800' },
  { tag: '10 — Mental Health', title: 'SUPPORTING\nMINDS', desc: 'Creating awareness campaigns, establishing free counseling centers, and training community leaders in psychological first aid.', align: 'right', img: 'https://images.unsplash.com/photo-1552697664-1505303c2bb6?q=80&w=800' },
  { tag: '11 — Disaster Relief', title: 'RESPONDING\nFAST', desc: 'Deploying emergency food, shelter, and medical aid to regions affected by natural disasters within the first crucial 48 hours.', align: 'left', img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800' },
  { tag: '12 — Global Impact', title: 'SCALING\nSOLUTIONS', desc: 'Partnering with international organizations to share knowledge, scale successful models, and create a worldwide network of change-makers.', align: 'right', img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800' }
]

const FACE_MAPPING = [
  'front', 'top', 'back', 'bottom',
  'front', 'top', 'back', 'bottom',
  'front', 'top', 'back', 'bottom'
]

export default function CubeGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 40, restDelta: 0.001 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [faceImages, setFaceImages] = useState<Record<string, string>>({
    front: NGO_SECTORS[0].img,
    top: NGO_SECTORS[1].img,
    back: NGO_SECTORS[2].img,
    bottom: NGO_SECTORS[3].img,
  })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalStops = NGO_SECTORS.length - 1
    const exactStop = latest * totalStops
    const currentIndex = Math.min(totalStops, Math.max(0, Math.round(exactStop)))
    
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
      setFaceImages(prev => {
        const next = { ...prev }
        for (let i = Math.max(0, currentIndex - 1); i <= Math.min(totalStops, currentIndex + 1); i++) {
          const physicalFace = FACE_MAPPING[i]
          next[physicalFace] = NGO_SECTORS[i].img
        }
        return next
      })
    }
  })

  const rotateX = useTransform(smoothProgress, [0, 1], ["0deg", "-990deg"])

  // Responsive cube size – much smaller on mobile, larger on desktop
  // Use CSS clamp with different values at different breakpoints via a media query inside style
  // Or we can use a React state + useEffect to read window width, but simpler: use CSS variables with media queries.
  // We'll define a CSS class that sets --cube-size and --cube-translate-z based on screen size.

  return (
    <div ref={containerRef} className="relative w-full" style={{ backgroundColor: "var(--navy, #0B2E63)", height: `${NGO_SECTORS.length * 100}vh` }}>
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "clamp(800px, 80vw, 1200px)" }}>
        
        {/* HUD - hidden on mobile */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-right font-mono text-[10px] md:text-xs text-gold/60 uppercase tracking-widest hidden sm:block">
          <div>{Math.round(activeIndex * (100 / (NGO_SECTORS.length - 1)))}%</div>
          <div className="w-20 md:w-32 h-[1px] bg-white/20 mt-2 mb-1 relative overflow-hidden">
            <motion.div className="absolute top-0 left-0 bottom-0 bg-gold" style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }} />
          </div>
          <div className="text-[9px] md:text-[10px] text-emerald">{NGO_SECTORS[activeIndex].tag.split('—')[1]}</div>
        </div>

        {/* 3D Cube with device‑aware size */}
        <motion.div
          className="cube-device-sized pointer-events-none -translate-y-12 md:-translate-y-0"
          style={{
            transformStyle: 'preserve-3d',
            rotateX,
            rotateY: "0deg"
          }}
        >
          {['front', 'top', 'back', 'bottom', 'left', 'right'].map((faceId) => {
            const getTransform = () => {
              // translateZ uses CSS variable that changes with media query
              const tz = `translateZ(clamp(60px, var(--cube-translate-z, 100px), 150px))`
              switch (faceId) {
                case 'front': return `${tz}`
                case 'top': return `rotateX(90deg) ${tz}`
                case 'back': return `rotateX(180deg) ${tz}`
                case 'bottom': return `rotateX(270deg) ${tz}`
                case 'left': return `rotateY(-90deg) ${tz}`
                case 'right': return `rotateY(90deg) ${tz}`
                default: return ''
              }
            }

            const isSideFace = faceId === 'left' || faceId === 'right'

            return (
              <div
                key={faceId}
                className="absolute inset-0 overflow-hidden"
                style={{
                  background: isSideFace ? "var(--navy, #0B2E63)" : "var(--surface, #F5F8F6)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transform: getTransform(),
                  backfaceVisibility: 'hidden'
                }}
              >
                {!isSideFace && (
                  <img 
                    src={faceImages[faceId]} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80" 
                  />
                )}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, clamp(20px, 5vw, 40px)), 
                                 repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, clamp(20px, 5vw, 40px))`
                  }}
                />
                {!isSideFace && <div className="absolute inset-0 bg-navy/40 mix-blend-multiply" />}
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Text Cards Overlay (unchanged) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {NGO_SECTORS.map((sector, i) => (
          <section 
            key={i} 
            className="h-screen w-full flex items-end md:items-center pb-20 md:pb-0 px-4 md:px-10 lg:px-20"
            style={{ justifyContent: sector.align === 'right' ? 'flex-end' : 'flex-start' }}
          >
            <motion.div 
              initial={{ opacity: 0, x: sector.align === 'right' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-[85vw] sm:w-96 md:w-[420px] bg-white/95 backdrop-blur-md border border-navy/10 p-5 md:p-8 pointer-events-auto shadow-xl relative overflow-hidden"
            >
              <div className={`absolute top-0 ${sector.align === 'right' ? 'right-0' : 'left-0'} w-16 md:w-24 h-1 bg-gold`} />
              <div className="text-emerald font-mono text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4">{sector.tag}</div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight md:leading-[0.95] mb-3 md:mb-6 whitespace-pre-line">{sector.title}</h2>
              <p className="text-navy/70 text-xs sm:text-sm leading-relaxed mb-5 md:mb-8 font-light">{sector.desc}</p>
              <button className="flex items-center gap-2 text-gold font-mono text-[10px] md:text-xs uppercase tracking-widest hover:text-emerald transition-colors group">
                Discover More
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 group-hover:translate-x-1 transition-transform">
                  <path d="M1 6h10M6 1l5 5-5 5" />
                </svg>
              </button>
            </motion.div>
          </section>
        ))}
      </div>

      {/* Inline CSS to set cube size and translateZ based on device */}
      <style>{`
        .cube-device-sized {
          width: clamp(140px, 40vw, 220px);
          height: clamp(140px, 40vw, 220px);
          --cube-translate-z: clamp(60px, 15vw, 90px);
        }
        @media (min-width: 640px) {
          .cube-device-sized {
            width: clamp(220px, 35vw, 320px);
            height: clamp(220px, 35vw, 320px);
            --cube-translate-z: clamp(90px, 20vw, 130px);
          }
        }
        @media (min-width: 1024px) {
          .cube-device-sized {
            width: clamp(320px, 28vw, 400px);
            height: clamp(320px, 28vw, 400px);
            --cube-translate-z: clamp(120px, 22vw, 180px);
          }
        }
      `}</style>
    </div>
  )
}
