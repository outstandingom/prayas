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

// Map each sector to a cube face (循环6个面)
const getFaceForIndex = (index: number) => {
  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom']
  return faces[index % 6]
}

export default function CubeGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [faceImages, setFaceImages] = useState<Record<string, string>>({
    front: NGO_SECTORS[0].img,
    back: NGO_SECTORS[1].img,
    right: NGO_SECTORS[2].img,
    left: NGO_SECTORS[3].img,
    top: NGO_SECTORS[4].img,
    bottom: NGO_SECTORS[5].img,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50, restDelta: 0.001 })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalSectors = NGO_SECTORS.length
    const currentIndex = Math.min(totalSectors - 1, Math.floor(latest * totalSectors))
    
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
      
      // Update face images for current and adjacent sectors
      setFaceImages(prev => {
        const next = { ...prev }
        const sectorsToLoad = [currentIndex, (currentIndex + 1) % totalSectors, (currentIndex + 2) % totalSectors]
        
        sectorsToLoad.forEach(idx => {
          const face = getFaceForIndex(idx)
          next[face] = NGO_SECTORS[idx].img
        })
        return next
      })
    }
  })

  // Calculate rotation - each sector is 60 degrees (360/6)
  const rotationAngle = useTransform(smoothProgress, [0, 1], ["0deg", "-360deg"])
  const finalRotation = useSpring(rotationAngle, { damping: 25, stiffness: 40 })

  const percentage = Math.round((activeIndex / (NGO_SECTORS.length - 1)) * 100)

  // Responsive cube size
  const cubeSize = "clamp(180px, 35vw, 300px)"
  const translateZ = "clamp(90px, 18vw, 150px)"

  return (
    <div ref={containerRef} className="relative w-full" style={{ backgroundColor: "#0B2E63", height: `${NGO_SECTORS.length * 100}vh` }}>
      
      {/* Sticky Cube Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
        
        {/* 3D Cube Container */}
        <div
          className="relative"
          style={{
            width: cubeSize,
            height: cubeSize,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Rotating Cube Group */}
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              rotateX: finalRotation,
              rotateY: "25deg",
            }}
          >
            {/* Front Face */}
            <div
              className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl"
              style={{
                backgroundImage: `url(${faceImages.front})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `translateZ(${translateZ})`,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Back Face */}
            <div
              className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl"
              style={{
                backgroundImage: `url(${faceImages.back})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `rotateY(180deg) translateZ(${translateZ})`,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Right Face */}
            <div
              className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl"
              style={{
                backgroundImage: `url(${faceImages.right})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `rotateY(90deg) translateZ(${translateZ})`,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Left Face */}
            <div
              className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl"
              style={{
                backgroundImage: `url(${faceImages.left})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `rotateY(-90deg) translateZ(${translateZ})`,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Top Face */}
            <div
              className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl"
              style={{
                backgroundImage: `url(${faceImages.top})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `rotateX(90deg) translateZ(${translateZ})`,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Bottom Face */}
            <div
              className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl"
              style={{
                backgroundImage: `url(${faceImages.bottom})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `rotateX(-90deg) translateZ(${translateZ})`,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </motion.div>
        </div>

        {/* HUD - Progress Indicator */}
        <div className="absolute bottom-6 right-4 md:bottom-8 md:right-8 z-50 text-right font-mono">
          <div className="text-2xl md:text-3xl font-bold text-[#F9A825] tracking-wider">
            {String(percentage).padStart(3, '0')}%
          </div>
          <div className="w-24 md:w-32 h-[2px] bg-white/20 mt-2 mb-1 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[#F9A825] rounded-full"
              style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
          <div className="text-[10px] md:text-xs text-[#2E8B57] uppercase tracking-wider font-semibold">
            {NGO_SECTORS[activeIndex]?.tag?.split('—')[1] || 'IMPACT'}
          </div>
        </div>
      </div>

      {/* Text Cards Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        {NGO_SECTORS.map((sector, i) => (
          <section 
            key={i} 
            className="h-screen w-full flex items-end md:items-center pb-24 md:pb-0 px-4 md:px-10 lg:px-20"
            style={{ justifyContent: sector.align === 'right' ? 'flex-end' : 'flex-start' }}
          >
            <motion.div 
              initial={{ opacity: 0, x: sector.align === 'right' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-[85vw] sm:w-[380px] md:w-[420px] bg-white/95 backdrop-blur-md border border-[#0B2E63]/10 p-6 md:p-8 pointer-events-auto shadow-2xl relative overflow-hidden rounded-2xl"
            >
              <div className={`absolute top-0 ${sector.align === 'right' ? 'right-0' : 'left-0'} w-20 md:w-24 h-1 bg-[#F9A825]`} />
              <div className="text-[#2E8B57] font-mono text-[10px] md:text-xs uppercase tracking-wider mb-3 md:mb-4 font-bold">
                {sector.tag}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B2E63] leading-tight mb-3 md:mb-6 whitespace-pre-line">
                {sector.title}
              </h2>
              <p className="text-[#0B2E63]/70 text-xs sm:text-sm leading-relaxed mb-5 md:mb-8 font-light">
                {sector.desc}
              </p>
              <button className="flex items-center gap-2 text-[#F9A825] font-mono text-[10px] md:text-xs uppercase tracking-wider hover:text-[#2E8B57] transition-colors group font-bold">
                Discover More
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 group-hover:translate-x-1 transition-transform">
                  <path d="M1 6h10M6 1l5 5-5 5" />
                </svg>
              </button>
            </motion.div>
          </section>
        ))}
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .cube-face {
          backface-visibility: visible;
        }
        
        @media (max-width: 768px) {
          .sticky {
            perspective: 800px;
          }
        }
      `}</style>
    </div>
  )
}
