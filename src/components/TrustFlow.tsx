// src/components/TrustFlow.tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Trust-related images (replace with your own if needed)
const TRUST_IMAGES = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80', // children
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=400&q=80', // community
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80', // teamwork
  'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?auto=format&fit=crop&w=400&q=80', // education
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=400&q=80', // help
]

const cardsData = [
  { id: 1, title: 'Trust in Action', badge: '+30%', overlay: 'rgba(255, 243, 20, 0.75)' }, // #FFF314
  { id: 2, title: 'Community First', badge: '+12%', overlay: 'rgba(38, 50, 56, 0.75)' }, // #263238
  { id: 3, title: 'Empowerment', badge: '-7.4%', overlay: 'rgba(255, 243, 20, 0.75)' },
  { id: 4, title: 'Sustainable Change', badge: '+45%', overlay: 'rgba(38, 50, 56, 0.75)' },
  { id: 5, title: 'Success Together', badge: '100%', overlay: 'rgba(255, 243, 20, 0.75)' },
]

export default function TrustFlow() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      // Reveal animations for all .gs-reveal elements
      gsap.fromTo(
        '.gs-reveal',
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.scroll-wrapper',
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Draw the lines (path) with stroke-dashoffset
      gsap.fromTo(
        '.line-path',
        { strokeDashoffset: 2000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          scrollTrigger: {
            trigger: '.scroll-wrapper',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <div ref={wrapperRef} className="trust-flow-container">
      {/* Scroll instruction */}
      <div className="scroll-instruction text-center text-sm text-[#263238] py-4">
        ↓ Scroll down to trace the flow ↓
      </div>

      <div className="scroll-wrapper relative overflow-x-auto">
        <div className="canvas relative w-[2500px] h-[1000px]">

          {/* SVG Lines */}
          <svg className="lines-layer absolute inset-0 w-full h-full" viewBox="0 0 2500 1000">
            <path className="line-path" d="M 100 500 L 400 500" stroke="#263238" strokeWidth="3" fill="none" strokeDasharray="2000" />
            <path className="line-path" d="M 640 500 C 750 500, 800 200, 1000 200" stroke="#263238" strokeWidth="3" fill="none" strokeDasharray="2000" />
            <path className="line-path" d="M 640 500 L 1000 500" stroke="#263238" strokeWidth="3" fill="none" strokeDasharray="2000" />
            <path className="line-path" d="M 640 500 C 750 500, 800 800, 1000 800" stroke="#263238" strokeWidth="3" fill="none" strokeDasharray="2000" />
            <path className="line-path" d="M 1240 500 L 1600 500" stroke="#263238" strokeWidth="3" fill="none" strokeDasharray="2000" />
          </svg>

          {/* Connector Dots and Plus Buttons (static positions) */}
          <div className="clay-element connector-dot gs-reveal absolute w-4 h-4 rounded-full bg-[#FFF314] shadow-lg" style={{ left: 100, top: 500 }} />
          <div className="clay-element plus-btn gs-reveal absolute w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF314] text-[#263238] font-bold text-lg shadow-lg" style={{ left: 250, top: 500 }}>+</div>

          <div className="clay-element connector-dot gs-reveal absolute w-4 h-4 rounded-full bg-[#FFF314] shadow-lg" style={{ left: 400, top: 500 }} />

          {/* Card 1 */}
          <div className="clay-element card gs-reveal absolute" style={{ left: 520, top: 500 }}>
            <div className="card-video-wrap relative w-48 h-32 rounded-xl overflow-hidden shadow-xl">
              <div className="overlay absolute inset-0" style={{ background: cardsData[0].overlay }} />
              <img className="thumbnail w-full h-full object-cover" src={TRUST_IMAGES[0]} alt="Trust" />
              <div className="header-badges absolute top-2 left-2 right-2 flex justify-between">
                <div className="badge-group flex gap-1">
                  <span className="badge bg-[#263238] text-white px-2 py-0.5 text-xs rounded-full">1</span>
                  <span className="badge bg-[#FFF314] text-[#263238] px-2 py-0.5 text-xs rounded-full">{cardsData[0].badge}</span>
                </div>
                <div className="badge icon bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs">💬</div>
              </div>
              <div className="title absolute bottom-2 left-2 text-white font-bold text-sm">{cardsData[0].title}</div>
            </div>
            <div className="card-stats flex gap-2 mt-2 text-xs text-[#263238]">
              <span>👤 100</span>
              <span>👁️ 78</span>
              <span>✅ 70</span>
            </div>
          </div>

          <div className="clay-element connector-dot gs-reveal absolute w-4 h-4 rounded-full bg-[#FFF314] shadow-lg" style={{ left: 640, top: 500 }} />

          <div className="clay-element plus-btn gs-reveal absolute w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF314] text-[#263238] font-bold text-lg shadow-lg" style={{ left: 790, top: 350 }}>+</div>
          <div className="clay-element plus-btn gs-reveal absolute w-8 h-8 flex items-center justify-center rounded-full bg-[#263238] text-[#FFF314] font-bold text-lg shadow-lg" style={{ left: 820, top: 500 }}>+</div>
          <div className="clay-element plus-btn gs-reveal absolute w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF314] text-[#263238] font-bold text-lg shadow-lg" style={{ left: 790, top: 650 }}>+</div>

          {/* Cards 2,3,4 (top, middle, bottom) */}
          {[1, 2, 3].map((idx) => {
            const yPos = idx === 1 ? 200 : idx === 2 ? 500 : 800
            return (
              <div key={idx} className="clay-element card gs-reveal absolute" style={{ left: 1120, top: yPos }}>
                <div className="card-video-wrap relative w-48 h-32 rounded-xl overflow-hidden shadow-xl">
                  <div className="overlay absolute inset-0" style={{ background: cardsData[idx].overlay }} />
                  <img className="thumbnail w-full h-full object-cover" src={TRUST_IMAGES[idx]} alt="Trust" />
                  <div className="header-badges absolute top-2 left-2 right-2 flex justify-between">
                    <div className="badge-group flex gap-1">
                      <span className="badge bg-[#263238] text-white px-2 py-0.5 text-xs rounded-full">{idx+1}</span>
                      <span className="badge bg-[#FFF314] text-[#263238] px-2 py-0.5 text-xs rounded-full">{cardsData[idx].badge}</span>
                    </div>
                    <div className="badge icon bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs">🎥</div>
                  </div>
                  <div className="title absolute bottom-2 left-2 text-white font-bold text-sm">{cardsData[idx].title}</div>
                </div>
                <div className="card-stats flex gap-2 mt-2 text-xs text-[#263238]">
                  <span>👤 {80 - idx*20}</span>
                  <span>👁️ {70 - idx*20}</span>
                  <span>✅ {60 - idx*20}</span>
                </div>
              </div>
            )
          })}

          {/* Card 5 (success end) */}
          <div className="clay-element card gs-reveal absolute" style={{ left: 1720, top: 500 }}>
            <div className="card-video-wrap relative w-48 h-32 rounded-xl overflow-hidden shadow-xl">
              <div className="overlay absolute inset-0" style={{ background: cardsData[4].overlay }} />
              <img className="thumbnail w-full h-full object-cover" src={TRUST_IMAGES[4]} alt="Trust" />
              <div className="header-badges absolute top-2 left-2 right-2 flex justify-between">
                <div className="badge-group flex gap-1">
                  <span className="badge bg-[#263238] text-white px-2 py-0.5 text-xs rounded-full">5</span>
                  <span className="badge bg-[#FFF314] text-[#263238] px-2 py-0.5 text-xs rounded-full">100%</span>
                </div>
                <div className="badge icon bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs">🎉</div>
              </div>
              <div className="title absolute bottom-2 left-2 text-white font-bold text-sm">Success Together</div>
            </div>
            <div className="card-stats flex gap-2 mt-2 text-xs text-[#263238]">
              <span>👤 40</span>
              <span>👁️ 40</span>
              <span>✅ 40</span>
            </div>
          </div>

          <div className="clay-element connector-dot gs-reveal absolute w-4 h-4 rounded-full bg-[#FFF314] shadow-lg" style={{ left: 1240, top: 500 }} />
          <div className="clay-element plus-btn gs-reveal absolute w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF314] text-[#263238] font-bold text-lg shadow-lg" style={{ left: 1420, top: 500 }}>+</div>
          <div className="clay-element connector-dot gs-reveal absolute w-4 h-4 rounded-full bg-[#FFF314] shadow-lg" style={{ left: 1600, top: 500 }} />
        </div>
      </div>

      {/* Text description – placed below the flow */}
      <div className="trust-description max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#263238] mb-4">
          Our approach is modeled around bringing change at all levels
        </h2>
        <p className="text-base md:text-lg text-[#263238]/80 leading-relaxed">
          With your support, we address children’s critical needs by working with parents, teachers, 
          Anganwadi workers, communities, district and state level governments as well as the children themselves.
          <br /><br />
          We focus on changing behaviours and practices at the grassroots level and influencing public policy 
          at a systemic level – thereby creating an ecosystem where children are made the nation’s priority.
        </p>
      </div>

      {/* Inline styles (you can move to a CSS file) */}
      <style>{`
        .trust-flow-container {
          font-family: sans-serif;
          background: #fff;
        }
        .scroll-instruction {
          color: #263238;
        }
        .scroll-wrapper {
          overflow-x: auto;
          padding: 20px 0;
        }
        .canvas {
          position: relative;
          min-height: 1000px;
          width: 2500px;
        }
        .line-path {
          stroke: #263238;
          stroke-width: 3;
          fill: none;
          stroke-dasharray: 2000;
        }
        .clay-element {
          transition: all 0.3s ease;
        }
        .card {
          width: 200px;
        }
        /* Mobile responsiveness: reduce card sizes */
        @media (max-width: 640px) {
          .card {
            width: 150px;
          }
          .card-video-wrap {
            width: 150px;
            height: 100px;
          }
          .title {
            font-size: 0.7rem;
          }
          .badge {
            font-size: 0.6rem;
          }
          .plus-btn {
            width: 28px;
            height: 28px;
            font-size: 0.9rem;
          }
          .connector-dot {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </div>
  )
}
