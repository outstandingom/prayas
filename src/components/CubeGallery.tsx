// src/components/CubeGallery.tsx
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

// NGO Work Categories (12 categories based on the proposal)
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

const getFaceForIndex = (index: number) => {
  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
  return faces[index % 6];
};

export default function CubeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [faceImages, setFaceImages] = useState<Record<string, string>>({
    front: GALLERY_DATA[0].img,
    back: GALLERY_DATA[1].img,
    right: GALLERY_DATA[2].img,
    left: GALLERY_DATA[3].img,
    top: GALLERY_DATA[4].img,
    bottom: GALLERY_DATA[5].img,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50, restDelta: 0.001 });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalSectors = GALLERY_DATA.length;
    const currentIndex = Math.min(totalSectors - 1, Math.floor(latest * totalSectors));
    
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
      
      setFaceImages(prev => {
        const next = { ...prev };
        const sectorsToLoad = [currentIndex, (currentIndex + 1) % totalSectors, (currentIndex + 2) % totalSectors];
        
        sectorsToLoad.forEach(idx => {
          const face = getFaceForIndex(idx);
          next[face] = GALLERY_DATA[idx].img;
        });
        return next;
      });
    }
  });

  const rotationAngle = useTransform(smoothProgress, [0, 1], ["0deg", "-360deg"]);
  const finalRotation = useSpring(rotationAngle, { damping: 25, stiffness: 40 });

  const percentage = Math.round((activeIndex / (GALLERY_DATA.length - 1)) * 100);

  // Responsive cube size
  const cubeSize = "clamp(200px, 35vw, 320px)";
  const translateZ = "clamp(100px, 18vw, 160px)";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollBack = () => {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="cube-gallery-wrapper" style={{ height: `${GALLERY_DATA.length * 100}vh` }}>
      
      {/* Sticky Cube Container */}
      <div className="cube-sticky-container" style={{ perspective: "1000px" }}>
        
        {/* 3D Cube Container */}
        <div className="cube-container" style={{ width: cubeSize, height: cubeSize, transformStyle: 'preserve-3d' }}>
          
          {/* Rotating Cube Group */}
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

        {/* Progress Indicator */}
        <div className="cube-progress">
          <div className="cube-percentage">
            {String(percentage).padStart(3, '0')}%
          </div>
          <div className="cube-progress-bar">
            <motion.div 
              className="cube-progress-fill"
              style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
          <div className="cube-category-label">
            {GALLERY_DATA[activeIndex]?.title || 'SCROLL'}
          </div>
        </div>
      </div>

      {/* Text Cards Overlay */}
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
                initial={{ opacity: 0, x: item.align === 'right' ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="cube-info-card"
              >
                <div className="cube-card-tag">
                  {item.tag} — {item.title}
                </div>
                <h2 className="cube-card-title">
                  {item.title}
                </h2>
                <p className="cube-card-desc">
                  {item.desc}
                </p>

                {/* Last Section CTAs */}
                {isLast ? (
                  <div className="cube-card-actions">
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
          background: #fcfaf8;
          color: #2d3748;
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
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: inset 0 0 40px rgba(0,0,0,0.05), 0 25px 50px -12px rgba(0,0,0,0.1);
          backface-visibility: hidden;
          border-radius: 4px;
        }

        .cube-face::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2));
        }

        .cube-progress {
          position: absolute;
          bottom: 30px;
          right: 30px;
          z-index: 50;
          text-align: right;
          font-family: "DM Mono", monospace;
        }

        .cube-percentage {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #2f855a;
          letter-spacing: 0.05em;
        }

        .cube-progress-bar {
          width: clamp(80px, 15vw, 120px);
          height: 2px;
          background: rgba(0,0,0,0.1);
          margin-top: 6px;
          margin-bottom: 4px;
          border-radius: 2px;
          overflow: hidden;
        }

        .cube-progress-fill {
          height: 100%;
          background: #2f855a;
          border-radius: 2px;
        }

        .cube-category-label {
          font-size: clamp(8px, 1vw, 11px);
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

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
          align-items: flex-end;
          padding: 0 20px 100px 20px;
        }

        @media (min-width: 768px) {
          .cube-text-section {
            align-items: center;
            padding: 0 40px 0 40px;
          }
        }

        .cube-info-card {
          width: min(85vw, 420px);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(113, 128, 150, 0.15);
          padding: clamp(1.25rem, 3vw, 2rem);
          border-radius: 8px;
          pointer-events: auto;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }

        .cube-card-tag {
          color: #2f855a;
          font-family: "DM Mono", monospace;
          font-size: clamp(8px, 1vw, 11px);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
          margin-bottom: clamp(8px, 1.5vw, 16px);
        }

        .cube-card-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(2rem, 6vw, 4.5rem);
          color: #2d3748;
          line-height: 1.1;
          letter-spacing: 0.03em;
          margin-bottom: clamp(8px, 1.5vw, 16px);
        }

        .cube-card-desc {
          font-family: "DM Mono", monospace;
          font-size: clamp(0.7rem, 1vw, 0.9rem);
          color: #718096;
          line-height: 1.6;
          max-width: 320px;
        }

        .cube-card-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: clamp(16px, 3vw, 30px);
        }

        .cube-btn-back {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 16px;
          font-family: "DM Mono", monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.05em;
          border-radius: 4px;
          cursor: pointer;
          background: transparent;
          color: #718096;
          border: 1px solid #718096;
          transition: all 0.3s ease;
        }

        .cube-btn-back:hover {
          color: #2d3748;
          border-color: #2d3748;
        }

        .cube-btn-back svg {
          width: 14px;
          height: 14px;
        }

        .cube-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 20px;
          font-family: "DM Mono", monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.05em;
          border-radius: 4px;
          cursor: pointer;
          background: #2d3748;
          color: #fcfaf8;
          border: 1px solid #2d3748;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .cube-btn-primary:hover {
          background: #2f855a;
          border-color: #2f855a;
        }

        .cube-btn-primary svg {
          width: 14px;
          height: 14px;
        }

        .cube-btn-explore {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: clamp(12px, 2vw, 20px);
          color: #2f855a;
          font-family: "DM Mono", monospace;
          font-size: clamp(0.6rem, 0.8vw, 0.75rem);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .cube-btn-explore:hover {
          color: #1a4735;
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
          bottom: 30px;
          left: 30px;
          z-index: 50;
          font-family: "DM Mono", monospace;
          font-size: clamp(8px, 1vw, 11px);
          color: #718096;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .cube-text-section {
            padding: 0 16px 80px 16px;
          }
          .cube-progress {
            bottom: 20px;
            right: 20px;
          }
          .cube-credit {
            bottom: 20px;
            left: 20px;
            font-size: 8px;
          }
          .cube-btn-back, .cube-btn-primary {
            font-size: 0.6rem;
            padding: 6px 12px;
          }
        }

        @media (max-width: 480px) {
          .cube-info-card {
            padding: 16px;
            width: 90vw;
          }
          .cube-text-section {
            padding: 0 12px 60px 12px;
          }
          .cube-card-actions {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
