import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'

// 12 locations with actual NGO work areas + your provided images
const GALLERY_DATA = [
  { tag: '01', title: 'INDORE SLUMS', desc: 'Education & health outreach in 15+ urban slums, reaching 2,000+ children.', align: 'left', img: 'https://i.ibb.co/TMvbMFY6/IMG-0224.avif' },
  { tag: '02', title: 'UJJAIN RURAL', desc: 'Women self-help groups and livelihood training in 30 villages.', align: 'right', img: 'https://i.ibb.co/wndvFC1/IMG-0238.avif' },
  { tag: '03', title: 'DEWAS DISTRICT', desc: 'Mid‑day meal & nutrition programs for 500+ malnourished children.', align: 'left', img: 'https://i.ibb.co/prk4wXVy/d23b2428-1d8f-4e6e-9791-8767b5e2612e.jpg' },
  { tag: '04', title: 'MHOW CANTONMENT', desc: 'Skill development centres for youth – tailoring, computer literacy.', align: 'right', img: 'https://i.ibb.co/zVgvX641/IMG-20250222-122329.jpg' },
  { tag: '05', title: 'PITHAMPUR', desc: 'River cleanup & tree plantation drives in industrial belt.', align: 'left', img: 'https://i.ibb.co/k6Wrqnc2/85233277-c407-43a4-8ea8-dfe661401e54.jpg' },
  { tag: '06', title: 'RAU (INDORE)', desc: 'Mental health awareness camps and free counselling.', align: 'right', img: 'https://i.ibb.co/LX58XTfm/0a85ed14-9582-4e56-bc41-5c9e1784ec45.jpg' },
  { tag: '07', title: 'KHARGONE', desc: 'Toilet construction & hygiene education – 100+ households.', align: 'left', img: 'https://i.ibb.co/7tnXcS54/2f1b8f20-5e95-4b11-b16f-385528a1e0c8.jpg' },
  { tag: '08', title: 'DHAR', desc: 'Tribal livelihood projects – sustainable agriculture & forest rights.', align: 'right', img: 'https://i.ibb.co/jdQP2w5/aa849143-415b-4cf2-a906-862d128af6ff.jpg' },
  { tag: '09', title: 'RATLAM', desc: 'Sports academies for underprivileged youth – football, athletics.', align: 'left', img: 'https://i.ibb.co/hxSBSXYX/IMG-0339.avif' },
  { tag: '10', title: 'BADWAH', desc: 'Special child support – therapy centres & inclusive education.', align: 'right', img: 'https://i.ibb.co/zTK3gdhL/d22833f6-f7be-410d-b7cc-79135da776b9.jpg' },
  { tag: '11', title: 'SANWER BLOCK', desc: 'Digital literacy for rural women – 20 computer kiosks.', align: 'left', img: 'https://i.ibb.co/0jXXjMGw/IMG-2199.jpg' },
  { tag: '12', title: 'INDORE URBAN', desc: 'Slum redevelopment – housing, water connection, and legal aid.', align: 'right', img: 'https://i.ibb.co/TMvbMFY6/IMG-0224.avif' } // repeated first image
]

const getFaceForIndex = (index: number) => {
  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom']
  return faces[index % 6]
}

export default function CubeGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [faceImages, setFaceImages] = useState<Record<string, string>>({
    front: GALLERY_DATA[0].img,
    back: GALLERY_DATA[1].img,
    right: GALLERY_DATA[2].img,
    left: GALLERY_DATA[3].img,
    top: GALLERY_DATA[4].img,
    bottom: GALLERY_DATA[5].img,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50, restDelta: 0.001 })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalSectors = GALLERY_DATA.length
    const currentIndex = Math.min(totalSectors - 1, Math.floor(latest * totalSectors))
    
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
      
      setFaceImages(prev => {
        const next = { ...prev }
        // Load current + next two sets of images (6 faces total)
        const sectorsToLoad = [currentIndex, (currentIndex + 1) % totalSectors, (currentIndex + 2) % totalSectors]
        
        sectorsToLoad.forEach(idx => {
          const face = getFaceForIndex(idx)
          next[face] = GALLERY_DATA[idx].img
        })
        return next
      })
    }
  })

  const rotationAngle = useTransform(smoothProgress, [0, 1], ["0deg", "-360deg"])
  const finalRotation = useSpring(rotationAngle, { damping: 25, stiffness: 40 })

  const percentage = Math.round((activeIndex / (GALLERY_DATA.length - 1)) * 100)

  // Responsive cube dimensions
  const cubeSize = "clamp(160px, 30vw, 280px)"
  const translateZ = "clamp(80px, 15vw, 140px)"

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollBack = () => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })

  return (
    <div ref={containerRef} className="theme-wrapper relative w-full" style={{ height: `${GALLERY_DATA.length * 100}vh` }}>
      
      {/* Sticky Cube Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "clamp(600px, 80vw, 1000px)" }}>
        
        {/* 3D Cube */}
        <div className="relative" style={{ width: cubeSize, height: cubeSize, transformStyle: 'preserve-3d' }}>
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              rotateX: finalRotation,
              rotateY: "25deg",
            }}
          >
            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, idx) => {
              let rotation = ''
              if (face === 'front') rotation = `translateZ(${translateZ})`
              if (face === 'back') rotation = `rotateY(180deg) translateZ(${translateZ})`
              if (face === 'right') rotation = `rotateY(90deg) translateZ(${translateZ})`
              if (face === 'left') rotation = `rotateY(-90deg) translateZ(${translateZ})`
              if (face === 'top') rotation = `rotateX(90deg) translateZ(${translateZ})`
              if (face === 'bottom') rotation = `rotateX(-90deg) translateZ(${translateZ})`
              return (
                <div
                  key={face}
                  className="cube-face absolute inset-0"
                  style={{ backgroundImage: `url(${faceImages[face]})`, transform: rotation }}
                />
              )
            })}
          </motion.div>
        </div>

        {/* HUD – responsive position: bottom-center on mobile, bottom-right on larger screens */}
        <div className="fixed md:absolute bottom-4 left-0 right-0 md:bottom-8 md:right-8 md:left-auto z-50 text-right font-mono bg-black/30 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-2 md:py-0 rounded-full mx-auto w-fit md:w-auto px-4 md:px-0">
          <div className="text-xl md:text-3xl font-bold text-[var(--accent-dark)] tracking-wider text-center md:text-right">
            {String(percentage).padStart(3, '0')}%
          </div>
          <div className="w-32 md:w-32 h-[2px] bg-[var(--dark-muted)] mt-2 mb-1 relative overflow-hidden rounded-full mx-auto md:mx-0">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[var(--accent-dark)] rounded-full"
              style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
          <div className="text-[10px] md:text-xs text-[var(--dark-muted)] uppercase tracking-wider font-semibold font-dm text-center md:text-right">
            {GALLERY_DATA[activeIndex]?.title || 'SCROLL'}
          </div>
        </div>
      </div>

      {/* Text Cards Overlay – 12 locations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        {GALLERY_DATA.map((item, i) => {
          const isLast = i === GALLERY_DATA.length - 1;
          return (
            <section 
              key={i} 
              className="h-screen w-full flex items-end md:items-center pb-20 md:pb-0 px-4 md:px-10 lg:px-20"
              style={{ justifyContent: item.align === 'right' ? 'flex-end' : 'flex-start' }}
            >
              <motion.div 
                initial={{ opacity: 0, x: item.align === 'right' ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="info-card pointer-events-auto"
              >
                <div className="text-[var(--accent-dark)] font-dm text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-4 font-bold">
                  {item.tag} — {item.title}
                </div>
                <h2 className="font-bebas text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[var(--dark-fg)] leading-tight mb-2 md:mb-6">
                  {item.title}
                </h2>
                <p className="text-[var(--dark-muted)] font-dm text-xs sm:text-sm leading-relaxed mb-4 md:mb-8 max-w-sm">
                  {item.desc}
                </p>

                {isLast ? (
                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <button onClick={scrollBack} className="cta-back">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                        <path d="M11 6H1M6 11L1 6l5-5" />
                      </svg>
                      Back
                    </button>
                    <button onClick={scrollToTop} className="cta">
                      Begin again
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                        <path d="M1 6h10M6 1l5 5-5 5" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button className="cta-explore group">
                    Discover More
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform" width="12" height="12">
                      <path d="M1 6h10M6 1l5 5-5 5" />
                    </svg>
                  </button>
                )}
              </motion.div>
            </section>
          )
        })}
      </div>

      {/* Credit – unchanged */}
      <div id="credit" className="fixed bottom-4 left-4 z-50">
        <a 
          href="https://www.linkedin.com/posts/luis-martinez-lr_ai-creativity-reversecreativity-activity-7366853269517651970-zeUD" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[var(--dark-muted)] font-dm text-[10px] md:text-xs hover:text-[var(--accent-dark)] transition-colors underline decoration-[var(--dark-muted)] underline-offset-4"
        >
          Reverse Creativity
        </a>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;700&display=swap");

        .theme-wrapper {
          --dark-bg: #fcfaf8;       
          --dark-fg: #2d3748;       
          --dark-muted: #718096;    
          --light-bg: #276749;      
          --light-fg: #f0fff4;      
          --light-muted: #9ae6b4;   
          --accent-dark: #2f855a;   
          --accent-light: #ecc94b;  
          background-color: var(--dark-bg);
          color: var(--dark-fg);
        }

        .font-bebas { font-family: "Bebas Neue", sans-serif; letter-spacing: 0.05em; }
        .font-dm { font-family: "DM Mono", monospace; }

        .cube-face {
          overflow: hidden;
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: inset 0 0 40px rgba(0,0,0,0.05), 0 25px 50px -12px rgba(0,0,0,0.1);
          backface-visibility: hidden;
          border-radius: 8px;
        }
        .cube-face::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2));
          pointer-events: none;
        }

        .info-card {
          width: 85vw;
          max-width: 380px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(113, 128, 150, 0.2);
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        }

        @media (max-width: 640px) {
          .info-card {
            max-width: 90vw;
            padding: 1.2rem;
            border-radius: 12px;
            margin-bottom: 1rem;
          }
        }

        .cta-explore {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-dark);
          font-family: "DM Mono", monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: bold;
          transition: color 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }
        .cta-explore svg { width: 12px; height: 12px; }

        .cta-back, .cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          font-family: "DM Mono", monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.05em;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
          border: none;
        }

        .cta-back {
          background: transparent;
          color: var(--dark-muted);
          border: 1px solid var(--dark-muted);
        }
        .cta-back:hover {
          color: var(--dark-fg);
          border-color: var(--dark-fg);
        }
        .cta {
          background: var(--dark-fg);
          color: var(--dark-bg);
          border: 1px solid var(--dark-fg);
          font-weight: bold;
        }
        .cta:hover {
          background: var(--accent-dark);
          border-color: var(--accent-dark);
        }

        @media (max-width: 768px) {
          .cta-back, .cta { padding: 0.5rem 0.9rem; font-size: 0.7rem; }
          .cta svg, .cta-back svg { width: 12px; height: 12px; }
        }
      `}</style>
    </div>
  )
}
