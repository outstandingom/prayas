import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'

const GALLERY_DATA = [
  { tag: '01', title: 'DESCENT', desc: 'The beginning of the fall into the creative unknown.', align: 'left', img: 'https://assets.codepen.io/573855/demo-raw-01.webp' },
  { tag: '02', title: 'REBELLION', desc: 'Breaking the established rules of design and layout.', align: 'right', img: 'https://assets.codepen.io/573855/demo-raw-02.webp' },
  { tag: '03', title: 'MOO WALK', desc: 'A surreal journey through unconventional spaces.', align: 'left', img: 'https://assets.codepen.io/573855/demo-raw-03.webp' },
  { tag: '04', title: 'BAD ART', desc: 'Embracing imperfections to find unique aesthetics.', align: 'right', img: 'https://assets.codepen.io/573855/demo-raw-04.webp' },
  { tag: '05', title: 'NO RULES', desc: 'Shattering the grid to redefine user experience.', align: 'left', img: 'https://assets.codepen.io/573855/demo-raw-05.webp' },
  { tag: '06', title: 'SUPER', desc: 'The climax of creative expression and structural form.', align: 'right', img: 'https://assets.codepen.io/573855/demo-raw-06.webp' }
]

export default function CubeGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const TOTAL_ITEMS = GALLERY_DATA.length
  const ANGLE_STEP = 360 / TOTAL_ITEMS // 60 degrees per item

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the scroll physics
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 25, 
    stiffness: 45, 
    restDelta: 0.001 
  })

  // Track the active index for the UI HUD
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const currentIndex = Math.min(TOTAL_ITEMS - 1, Math.round(latest * (TOTAL_ITEMS - 1)))
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }
  })

  // Map the 0-1 scroll progress to the exact negative rotation required to view the final face
  const rotationAngle = useTransform(
    smoothProgress, 
    [0, 1], 
    ["0deg", `-${ANGLE_STEP * (TOTAL_ITEMS - 1)}deg`]
  )

  const percentage = Math.round((activeIndex / (TOTAL_ITEMS - 1)) * 100)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollBack = () => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })

  return (
    <div ref={containerRef} className="theme-wrapper relative w-full" style={{ height: `${TOTAL_ITEMS * 100}vh` }}>
      
      {/* Sticky 3D Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "1200px" }}>
        
        {/* Container positioned with an isometric tilt */}
        <div
          className="relative"
          style={{ 
            width: 'var(--cube-size)', 
            height: 'var(--cube-size)', 
            transformStyle: 'preserve-3d',
            rotateY: "-15deg", // Gives the 3D showcase perspective
            rotateZ: "-2deg",
          } as React.CSSProperties}
        >
          {/* The Rotating Hexagonal Drum */}
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              rotateX: rotationAngle,
            }}
          >
            {GALLERY_DATA.map((item, i) => (
              <div 
                key={i}
                className="cube-face absolute inset-0 rounded-lg shadow-2xl" 
                style={{ 
                  backgroundImage: `url(${item.img})`, 
                  // Math: Rotate to slot, then push outward by the hexagon apothem (radius)
                  transform: `rotateX(${i * ANGLE_STEP}deg) translateZ(var(--radius))` 
                }} 
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* HUD - Progress Indicator */}
        <div className="absolute bottom-6 right-4 md:bottom-8 md:right-8 z-50 text-right font-mono">
          <div className="text-2xl md:text-3xl font-bold text-[var(--accent-dark)] tracking-wider drop-shadow-md">
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

      {/* Text Cards Overlay - Triggers naturally via scroll */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        {GALLERY_DATA.map((item, i) => {
          const isLast = i === TOTAL_ITEMS - 1;

          return (
            <section 
              key={i} 
              className="h-screen w-full flex items-end md:items-center pb-24 md:pb-0 px-4 md:px-10 lg:px-20"
              style={{ justifyContent: item.align === 'right' ? 'flex-end' : 'flex-start' }}
            >
              <motion.div 
                initial={{ opacity: 0, x: item.align === 'right' ? 40 : -40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Custom easing
                className="info-card pointer-events-auto shadow-2xl relative overflow-hidden"
              >
                <div className={`absolute top-0 ${item.align === 'right' ? 'right-0' : 'left-0'} w-16 h-1 bg-[var(--accent-dark)]`} />
                <div className="text-[var(--accent-dark)] font-dm text-[10px] md:text-xs uppercase tracking-wider mb-3 md:mb-4 font-bold">
                  {item.tag} — {item.title}
                </div>
                <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--dark-fg)] leading-tight mb-3 md:mb-6">
                  {item.title}
                </h2>
                <p className="text-[var(--dark-muted)] font-dm text-xs sm:text-sm leading-relaxed mb-5 md:mb-8 max-w-sm">
                  {item.desc}
                </p>

                {/* Exactly matches your provided CTA HTML structure */}
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

      {/* Persistent Credit Element */}
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
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400&display=swap");

        .theme-wrapper {
          --dark-bg: #1c1814;
          --dark-fg: #ede8df;
          --dark-muted: #8a7b6e;
          --light-bg: #f0ece3;
          --light-fg: #0d0d14;
          --light-muted: #9a9aaa;
          --accent-dark: #d4a84b;
          --accent-light: #3a6e00;

          /* Hexagon specific math */
          --cube-size: clamp(200px, 35vw, 360px);
          /* Calculate Apothem for 60 degrees: size * 0.866 */
          --radius: calc(var(--cube-size) * 0.866);

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
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 60px rgba(0,0,0,0.6), 0 25px 50px -12px rgba(0,0,0,0.8);
          /* Prevents seeing the "inside" of faces facing away */
          backface-visibility: hidden;
        }

        .info-card {
          width: 85vw;
          max-width: 440px;
          background: rgba(28, 24, 20, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(138, 123, 110, 0.15);
          padding: 2.5rem;
          border-radius: 6px;
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
