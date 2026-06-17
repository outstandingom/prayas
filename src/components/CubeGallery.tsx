import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'

// Data Source
const GALLERY_DATA = [
  { tag: '01', title: 'DESCENT', desc: 'The beginning of the fall into the creative unknown.', align: 'left', img: 'https://assets.codepen.io/573855/demo-raw-01.webp' },
  { tag: '02', title: 'REBELLION', desc: 'Breaking the established rules of design and layout.', align: 'right', img: 'https://assets.codepen.io/573855/demo-raw-02.webp' },
  { tag: '03', title: 'MOO WALK', desc: 'A surreal journey through unconventional spaces.', align: 'left', img: 'https://assets.codepen.io/573855/demo-raw-03.webp' },
  { tag: '04', title: 'BAD ART', desc: 'Embracing imperfections to find unique aesthetics.', align: 'right', img: 'https://assets.codepen.io/573855/demo-raw-04.webp' },
  { tag: '05', title: 'NO RULES', desc: 'Shattering the grid to redefine user experience.', align: 'left', img: 'https://assets.codepen.io/573855/demo-raw-05.webp' },
  { tag: '06', title: 'SUPER', desc: 'The climax of creative expression and structural form.', align: 'right', img: 'https://assets.codepen.io/573855/demo-raw-06.webp' }
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
        const sectorsToLoad = [currentIndex, (currentIndex + 1) % totalSectors, (currentIndex + 2) % totalSectors]
        
        sectorsToLoad.forEach(idx => {
          const face = getFaceForIndex(idx)
          next[face] = GALLERY_DATA[idx].img
        })
        return next
      })
    }
  })

  // Calculate rotation mapping progress to a full 360deg spin
  const rotationAngle = useTransform(smoothProgress, [0, 1], ["0deg", "-360deg"])
  const finalRotation = useSpring(rotationAngle, { damping: 25, stiffness: 40 })

  const percentage = Math.round((activeIndex / (GALLERY_DATA.length - 1)) * 100)

  // Responsive cube size
  const cubeSize = "clamp(180px, 35vw, 300px)"
  const translateZ = "clamp(90px, 18vw, 150px)"

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollBack = () => {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="theme-wrapper relative w-full" style={{ height: `${GALLERY_DATA.length * 100}vh` }}>
      
      {/* Sticky Cube Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
        
        {/* 3D Cube Container */}
        <div
          className="relative"
          style={{ width: cubeSize, height: cubeSize, transformStyle: 'preserve-3d' }}
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
            {/* Front */}
            <div className="cube-face absolute inset-0" style={{ backgroundImage: `url(${faceImages.front})`, transform: `translateZ(${translateZ})` }} />
            {/* Back */}
            <div className="cube-face absolute inset-0" style={{ backgroundImage: `url(${faceImages.back})`, transform: `rotateY(180deg) translateZ(${translateZ})` }} />
            {/* Right */}
            <div className="cube-face absolute inset-0" style={{ backgroundImage: `url(${faceImages.right})`, transform: `rotateY(90deg) translateZ(${translateZ})` }} />
            {/* Left */}
            <div className="cube-face absolute inset-0" style={{ backgroundImage: `url(${faceImages.left})`, transform: `rotateY(-90deg) translateZ(${translateZ})` }} />
            {/* Top */}
            <div className="cube-face absolute inset-0" style={{ backgroundImage: `url(${faceImages.top})`, transform: `rotateX(90deg) translateZ(${translateZ})` }} />
            {/* Bottom */}
            <div className="cube-face absolute inset-0" style={{ backgroundImage: `url(${faceImages.bottom})`, transform: `rotateX(-90deg) translateZ(${translateZ})` }} />
          </motion.div>
        </div>

        {/* HUD - Progress Indicator */}
        <div className="absolute bottom-6 right-4 md:bottom-8 md:right-8 z-50 text-right font-mono">
          <div className="text-2xl md:text-3xl font-bold text-[var(--accent-dark)] tracking-wider">
            {String(percentage).padStart(3, '0')}%
          </div>
          <div className="w-24 md:w-32 h-[2px] bg-[var(--dark-muted)] mt-2 mb-1 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[var(--accent-dark)] rounded-full"
              style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
          <div className="text-[10px] md:text-xs text-[var(--dark-muted)] uppercase tracking-wider font-semibold font-dm">
            {GALLERY_DATA[activeIndex]?.title || 'SCROLL'}
          </div>
        </div>
      </div>

      {/* Text Cards Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        {GALLERY_DATA.map((item, i) => {
          const isLast = i === GALLERY_DATA.length - 1;

          return (
            <section 
              key={i} 
              className="h-screen w-full flex items-end md:items-center pb-24 md:pb-0 px-4 md:px-10 lg:px-20"
              style={{ justifyContent: item.align === 'right' ? 'flex-end' : 'flex-start' }}
            >
              <motion.div 
                initial={{ opacity: 0, x: item.align === 'right' ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="info-card pointer-events-auto"
              >
                <div className="text-[var(--accent-dark)] font-dm text-[10px] md:text-xs uppercase tracking-wider mb-3 md:mb-4 font-bold">
                  {item.tag} — {item.title}
                </div>
                <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--dark-fg)] leading-tight mb-3 md:mb-6">
                  {item.title}
                </h2>
                <p className="text-[var(--dark-muted)] font-dm text-xs sm:text-sm leading-relaxed mb-5 md:mb-8 max-w-sm">
                  {item.desc}
                </p>

                {/* Last Section CTAs */}
                {isLast ? (
                  <div className="flex items-center gap-4 mt-6">
                    <button onClick={scrollBack} className="cta-back">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M11 6H1M6 11L1 6l5-5" />
                      </svg>
                      Back
                    </button>
                    <button onClick={scrollToTop} className="cta">
                      Begin again
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 6h10M6 1l5 5-5 5" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button className="cta-explore group">
                    Discover More
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M1 6h10M6 1l5 5-5 5" />
                    </svg>
                  </button>
                )}
              </motion.div>
            </section>
          )
        })}
      </div>

      {/* Credit Element */}
      <div id="credit" className="fixed bottom-6 left-6 z-50">
        <a 
          href="https://www.linkedin.com/posts/luis-martinez-lr_ai-creativity-reversecreativity-activity-7366853269517651970-zeUD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFq1dzgByK1x_NMrcq582OMbK-_3q0DthYY" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[var(--dark-muted)] font-dm text-xs hover:text-[var(--accent-dark)] transition-colors underline decoration-[var(--dark-muted)] underline-offset-4"
        >
          Reverse Creativity
        </a>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;700&display=swap");

        .theme-wrapper {
          /* Flipped: Acts as the main LIGHT theme */
          --dark-bg: #fcfaf8;       
          --dark-fg: #2d3748;       
          --dark-muted: #718096;    
          
          /* Flipped: Acts as the inverted/dark sections */
          --light-bg: #276749;      
          --light-fg: #f0fff4;      
          --light-muted: #9ae6b4;   
          
          /* Accents */
          --accent-dark: #2f855a;   
          --accent-light: #ecc94b;  

          background-color: var(--dark-bg);
          color: var(--dark-fg);
        }

        .font-bebas {
          font-family: "Bebas Neue", sans-serif;
          letter-spacing: 0.05em;
        }

        .font-dm {
          font-family: "DM Mono", monospace;
        }

        .cube-face {
          overflow: hidden;
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: inset 0 0 40px rgba(0,0,0,0.05), 0 25px 50px -12px rgba(0,0,0,0.1);
          backface-visibility: hidden;
        }
        
        .cube-face::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3));
        }

        .info-card {
          width: 85vw;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(113, 128, 150, 0.2);
          padding: 2rem;
          border-radius: 4px;
        }

        .cta-explore {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-dark);
          font-family: "DM Mono", monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: bold;
          transition: color 0.3s ease;
        }
        .cta-explore svg { width: 12px; height: 12px; }

        .cta-back, .cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-family: "DM Mono", monospace;
          font-size: 0.85rem;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.05em;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
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
        .cta-back svg { width: 14px; height: 14px; }

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
        .cta svg { width: 14px; height: 14px; }

        @media (max-width: 768px) {
          .sticky { perspective: 800px; }
        }
      `}</style>
    </div>
  )
}
