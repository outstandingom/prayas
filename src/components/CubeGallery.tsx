// src/components/CubeGallery.tsx
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

// 12 NGO Categories
const GALLERY_DATA = [
  { 
    tag: '01', 
    title: 'EDUCATION', 
    desc: 'Providing quality education to underprivileged children through schools and learning centers.', 
    align: 'left', 
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80' 
  },
  { 
    tag: '02', 
    title: 'HEALTHCARE', 
    desc: 'Free medical camps, health awareness programs, and support for patients in need.', 
    align: 'right', 
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80' 
  },
  { 
    tag: '03', 
    title: 'WOMEN EMPOWERMENT', 
    desc: 'Skill development, self-help groups, and financial independence for women.', 
    align: 'left', 
    img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80' 
  },
  { 
    tag: '04', 
    title: 'CHILD WELFARE', 
    desc: 'Protecting children\'s rights, nutrition programs, and safe shelter initiatives.', 
    align: 'right', 
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80' 
  },
  { 
    tag: '05', 
    title: 'ENVIRONMENT', 
    desc: 'Tree plantation drives, waste management, and environmental awareness campaigns.', 
    align: 'left', 
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80' 
  },
  { 
    tag: '06', 
    title: 'RURAL DEVELOPMENT', 
    desc: 'Infrastructure development, clean water access, and livelihood programs for rural communities.', 
    align: 'right', 
    img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80' 
  },
  { 
    tag: '07', 
    title: 'SKILL TRAINING', 
    desc: 'Vocational training and skill development programs for youth and adults.', 
    align: 'left', 
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80' 
  },
  { 
    tag: '08', 
    title: 'DISASTER RELIEF', 
    desc: 'Emergency response, relief distribution, and rehabilitation for disaster-affected communities.', 
    align: 'right', 
    img: 'https://images.unsplash.com/photo-1536643155-33d268924c93?w=800&q=80' 
  },
  { 
    tag: '09', 
    title: 'ANIMAL WELFARE', 
    desc: 'Rescue, shelter, and medical care for stray and injured animals.', 
    align: 'left', 
    img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80' 
  },
  { 
    tag: '10', 
    title: 'ELDERLY CARE', 
    desc: 'Support, healthcare, and dignity for senior citizens through dedicated programs.', 
    align: 'right', 
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80' 
  },
  { 
    tag: '11', 
    title: 'COMMUNITY HEALTH', 
    desc: 'Mental health awareness, hygiene education, and accessible healthcare for all.', 
    align: 'left', 
    img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80' 
  },
  { 
    tag: '12', 
    title: 'FOOD SECURITY', 
    desc: 'Food distribution, nutrition programs, and sustainable agriculture for vulnerable communities.', 
    align: 'right', 
    img: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=800&q=80' 
  },
];

// Face mapping for cube rotation
const getFaceImage = (index: number) => {
  return GALLERY_DATA[index % GALLERY_DATA.length].img;
};

export default function CubeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 30, 
    stiffness: 50, 
    restDelta: 0.001 
  });

  // Track active index
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalSectors = GALLERY_DATA.length;
    const currentIndex = Math.min(totalSectors - 1, Math.floor(latest * totalSectors));
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  });

  // Calculate cube rotation based on scroll
  const rotationAngle = useTransform(smoothProgress, [0, 1], ["0deg", "-360deg"]);
  const finalRotation = useSpring(rotationAngle, { damping: 25, stiffness: 40 });

  const percentage = Math.round((activeIndex / (GALLERY_DATA.length - 1)) * 100);

  // Cube size
  const cubeSize = "clamp(200px, 35vw, 350px)";
  const translateZ = "clamp(100px, 18vw, 175px)";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollBack = () => {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  };

  // Get current 6 faces for the cube
  const getFaceImages = () => {
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    const faceImages: Record<string, string> = {};
    faces.forEach((face, i) => {
      const idx = (activeIndex + i) % GALLERY_DATA.length;
      faceImages[face] = GALLERY_DATA[idx].img;
    });
    return faceImages;
  };

  const faceImages = getFaceImages();

  return (
    <div ref={containerRef} className="cube-gallery-wrapper" style={{ height: `${GALLERY_DATA.length * 100}vh` }}>
      
      {/* Sticky Cube Container */}
      <div className="cube-sticky-container">
        
        {/* 3D Cube */}
        <div className="cube-container" style={{ width: cubeSize, height: cubeSize }}>
          <motion.div
            className="cube-group"
            style={{
              transformStyle: 'preserve-3d',
              rotateX: finalRotation,
              rotateY: "25deg",
            }}
          >
            {/* Front */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages.front})`, 
              transform: `translateZ(${translateZ})` 
            }} />
            {/* Back */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages.back})`, 
              transform: `rotateY(180deg) translateZ(${translateZ})` 
            }} />
            {/* Right */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages.right})`, 
              transform: `rotateY(90deg) translateZ(${translateZ})` 
            }} />
            {/* Left */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages.left})`, 
              transform: `rotateY(-90deg) translateZ(${translateZ})` 
            }} />
            {/* Top */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages.top})`, 
              transform: `rotateX(90deg) translateZ(${translateZ})` 
            }} />
            {/* Bottom */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages.bottom})`, 
              transform: `rotateX(-90deg) translateZ(${translateZ})` 
            }} />
          </motion.div>
        </div>

        {/* HUD - Progress */}
        <div className="cube-hud">
          <div className="cube-percentage">{String(percentage).padStart(3, '0')}%</div>
          <div className="cube-progress-bar">
            <motion.div 
              className="cube-progress-fill"
              style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
          <div className="cube-label">{GALLERY_DATA[activeIndex]?.title || 'SCROLL'}</div>
        </div>

        {/* Dot Navigation */}
        <div className="cube-dots">
          {GALLERY_DATA.map((_, i) => (
            <div key={i} className={`cube-dot ${i === activeIndex ? 'active' : ''}`} />
          ))}
        </div>

        {/* Face Caption */}
        <div className="cube-caption">
          <div className="cube-caption-num">{String(activeIndex + 1).padStart(2, '0')}</div>
          <div className="cube-caption-name">{GALLERY_DATA[activeIndex]?.title || ''}</div>
        </div>
      </div>

      {/* Text Cards */}
      <div className="cube-text-overlay">
        {GALLERY_DATA.map((item, i) => {
          const isLast = i === GALLERY_DATA.length - 1;
          return (
            <section 
              key={i} 
              className="cube-text-section"
              style={{ justifyContent: item.align === 'right' ? 'flex-end' : 'flex-start' }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="cube-info-card"
              >
                <div className="cube-tag">{item.tag} — {item.title}</div>
                <h2 className="cube-title">{item.title}</h2>
                <p className="cube-desc">{item.desc}</p>

                {isLast ? (
                  <div className="cube-actions">
                    <button onClick={scrollBack} className="cube-btn-back">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M11 6H1M6 11L1 6l5-5" />
                      </svg>
                      Back
                    </button>
                    <button onClick={scrollToTop} className="cube-btn-primary">
                      Begin again
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 6h10M6 1l5 5-5 5" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button className="cube-btn-explore">
                    Discover More
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="cube-btn-icon">
                      <path d="M1 6h10M6 1l5 5-5 5" />
                    </svg>
                  </button>
                )}
              </motion.div>
            </section>
          );
        })}
      </div>

      {/* Credit */}
      <div className="cube-credit">
        <span>Prayas Samaj Sevi Sanstha · 12 Impact Areas</span>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;700&display=swap");

        .cube-gallery-wrapper {
          position: relative;
          width: 100%;
          background: #1c1814;
          color: #ede8df;
          overflow: hidden;
        }

        .cube-sticky-container {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #1c1814;
          perspective: 1200px;
        }

        .cube-container {
          position: relative;
        }

        .cube-group {
          position: absolute;
          inset: 0;
        }

        .cube-face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 0 60px rgba(0,0,0,0.3);
          backface-visibility: hidden;
          border-radius: 4px;
          background-color: #14100d;
        }

        .cube-face::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4));
        }

        /* HUD */
        .cube-hud {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 50;
          text-align: right;
          font-family: "DM Mono", monospace;
        }

        .cube-percentage {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #d4a84b;
          letter-spacing: 0.05em;
        }

        .cube-progress-bar {
          width: clamp(80px, 15vw, 120px);
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          margin-top: 6px;
          margin-bottom: 4px;
          margin-left: auto;
          overflow: hidden;
        }

        .cube-progress-fill {
          height: 100%;
          background: #d4a84b;
        }

        .cube-label {
          font-size: clamp(8px, 1vw, 11px);
          color: #8a7b6e;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 400;
        }

        /* Dots */
        .cube-dots {
          position: fixed;
          left: 35px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cube-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .cube-dot.active {
          background: #d4a84b;
          transform: scale(2);
        }

        /* Caption */
        .cube-caption {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          text-align: center;
          pointer-events: none;
        }

        .cube-caption-num {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          color: #d4a84b;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .cube-caption-name {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(1.5rem, 4vw, 3rem);
          color: rgba(255, 255, 255, 0.15);
          letter-spacing: 0.08em;
        }

        /* Text Cards */
        .cube-text-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 20;
        }

        .cube-text-section {
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0 40px 40px 40px;
        }

        @media (max-width: 768px) {
          .cube-text-section {
            padding: 0 20px 80px 20px;
            align-items: flex-end;
          }
        }

        .cube-info-card {
          width: min(400px, 85vw);
          padding: 30px 28px;
          background: rgba(28, 24, 20, 0.85);
          backdrop-filter: blur(12px);
          border-left: 1px solid rgba(212, 168, 75, 0.2);
          pointer-events: auto;
          transition: background 0.3s ease;
        }

        .cube-info-card:has(.right) {
          border-left: none;
          border-right: 1px solid rgba(212, 168, 75, 0.2);
        }

        .cube-tag {
          font-family: "DM Mono", monospace;
          font-size: clamp(8px, 1vw, 11px);
          color: #d4a84b;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 16px;
        }

        .cube-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          color: #ede8df;
          line-height: 0.95;
          letter-spacing: 0.03em;
          margin-bottom: 12px;
        }

        .cube-desc {
          font-family: "DM Mono", monospace;
          font-size: clamp(0.7rem, 1vw, 0.85rem);
          color: rgba(237, 232, 223, 0.55);
          line-height: 1.7;
          max-width: 320px;
        }

        .cube-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .cube-btn-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          font-family: "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: transparent;
          color: #8a7b6e;
          border: 1px solid rgba(138, 123, 110, 0.3);
          border-radius: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cube-btn-back:hover {
          color: #ede8df;
          border-color: #8a7b6e;
        }

        .cube-btn-back svg {
          width: 12px;
          height: 12px;
        }

        .cube-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          font-family: "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: #d4a84b;
          color: #1c1814;
          border: none;
          border-radius: 0;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .cube-btn-primary:hover {
          background: #c49a3e;
        }

        .cube-btn-primary svg {
          width: 12px;
          height: 12px;
        }

        .cube-btn-explore {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          color: #d4a84b;
          font-family: "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .cube-btn-explore:hover {
          color: #c49a3e;
        }

        .cube-btn-icon {
          width: 12px;
          height: 12px;
          transition: transform 0.3s ease;
        }

        .cube-btn-explore:hover .cube-btn-icon {
          transform: translateX(4px);
        }

        .cube-credit {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: right center;
          z-index: 50;
          font-family: "DM Mono", monospace;
          font-size: 0.6rem;
          color: rgba(138, 123, 110, 0.5);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .cube-hud {
            top: 16px;
            right: 16px;
          }
          .cube-dots {
            display: none;
          }
          .cube-caption {
            bottom: 16px;
          }
          .cube-credit {
            display: none;
          }
          .cube-info-card {
            padding: 20px 18px;
            width: 90vw;
          }
          .cube-actions {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .cube-hud {
            top: 12px;
            right: 12px;
          }
          .cube-text-section {
            padding: 0 12px 60px 12px;
          }
          .cube-info-card {
            padding: 16px 14px;
          }
        }
      `}</style>
    </div>
  );
}
