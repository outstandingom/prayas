// src/components/CubeGallery.tsx
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

// 12 NGO Categories with specific images for each face
const GALLERY_DATA = [
  { 
    id: 0,
    tag: '01', 
    title: 'EDUCATION', 
    desc: 'Providing quality education to underprivileged children through schools and learning centers.', 
    align: 'left',
    images: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 1,
    tag: '02', 
    title: 'HEALTHCARE', 
    desc: 'Free medical camps, health awareness programs, and support for patients in need.', 
    align: 'right',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 2,
    tag: '03', 
    title: 'WOMEN EMPOWERMENT', 
    desc: 'Skill development, self-help groups, and financial independence for women.', 
    align: 'left',
    images: [
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544717297-fa4c8b6df2e8?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 3,
    tag: '04', 
    title: 'CHILD WELFARE', 
    desc: 'Protecting children\'s rights, nutrition programs, and safe shelter initiatives.', 
    align: 'right',
    images: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516627145497-ae6969145dae?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 4,
    tag: '05', 
    title: 'ENVIRONMENT', 
    desc: 'Tree plantation drives, waste management, and environmental awareness campaigns.', 
    align: 'left',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-7b3ec3e27f1d?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 5,
    tag: '06', 
    title: 'RURAL DEVELOPMENT', 
    desc: 'Infrastructure development, clean water access, and livelihood programs for rural communities.', 
    align: 'right',
    images: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548839143-5e75c9bca701?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 6,
    tag: '07', 
    title: 'SKILL TRAINING', 
    desc: 'Vocational training and skill development programs for youth and adults.', 
    align: 'left',
    images: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 7,
    tag: '08', 
    title: 'DISASTER RELIEF', 
    desc: 'Emergency response, relief distribution, and rehabilitation for disaster-affected communities.', 
    align: 'right',
    images: [
      'https://images.unsplash.com/photo-1536643155-33d268924c93?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507908708918-778587c9e563?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1557425493-6f90ae4659fc?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495592822108-9e6261896da8?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 8,
    tag: '09', 
    title: 'ANIMAL WELFARE', 
    desc: 'Rescue, shelter, and medical care for stray and injured animals.', 
    align: 'left',
    images: [
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 9,
    tag: '10', 
    title: 'ELDERLY CARE', 
    desc: 'Support, healthcare, and dignity for senior citizens through dedicated programs.', 
    align: 'right',
    images: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543948549-6b4e7c5b9c4a?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517433670263-6d0b7c2e81c8?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494363247633-927487f5911a?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544717297-fa4c8b6df2e8?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 10,
    tag: '11', 
    title: 'COMMUNITY HEALTH', 
    desc: 'Mental health awareness, hygiene education, and accessible healthcare for all.', 
    align: 'left',
    images: [
      'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&q=80'
    ]
  },
  { 
    id: 11,
    tag: '12', 
    title: 'FOOD SECURITY', 
    desc: 'Food distribution, nutrition programs, and sustainable agriculture for vulnerable communities.', 
    align: 'right',
    images: [
      'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop&q=80'
    ]
  }
];

export default function CubeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [faceImages, setFaceImages] = useState<string[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 30, 
    stiffness: 50, 
    restDelta: 0.001 
  });

  // Update active index and face images based on scroll
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalSectors = GALLERY_DATA.length;
    const currentIndex = Math.min(totalSectors - 1, Math.floor(latest * totalSectors));
    
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
      
      // Update all 6 faces with images from the current category
      const category = GALLERY_DATA[currentIndex];
      if (category && category.images) {
        // Use the 6 images from the category (or cycle if less than 6)
        const images = category.images;
        const faceCount = 6;
        const newFaceImages = [];
        for (let i = 0; i < faceCount; i++) {
          newFaceImages.push(images[i % images.length]);
        }
        setFaceImages(newFaceImages);
      }
    }
  });

  // Initialize face images
  useEffect(() => {
    const category = GALLERY_DATA[0];
    if (category && category.images) {
      const images = category.images;
      const faceCount = 6;
      const initialImages = [];
      for (let i = 0; i < faceCount; i++) {
        initialImages.push(images[i % images.length]);
      }
      setFaceImages(initialImages);
    }
  }, []);

  // Cube rotation based on scroll
  const rotationAngle = useTransform(smoothProgress, [0, 1], ["0deg", "-360deg"]);
  const finalRotation = useSpring(rotationAngle, { damping: 25, stiffness: 40 });

  const percentage = Math.round((activeIndex / (GALLERY_DATA.length - 1)) * 100);

  // Responsive cube size
  const cubeSize = isMobile ? "clamp(160px, 55vw, 280px)" : "clamp(200px, 35vw, 350px)";
  const translateZ = isMobile ? "clamp(80px, 28vw, 140px)" : "clamp(100px, 18vw, 175px)";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollBack = () => {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  };

  const currentCategory = GALLERY_DATA[activeIndex];

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
              backgroundImage: `url(${faceImages[0] || ''})`, 
              transform: `translateZ(${translateZ})` 
            }} />
            {/* Back */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages[1] || ''})`, 
              transform: `rotateY(180deg) translateZ(${translateZ})` 
            }} />
            {/* Right */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages[2] || ''})`, 
              transform: `rotateY(90deg) translateZ(${translateZ})` 
            }} />
            {/* Left */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages[3] || ''})`, 
              transform: `rotateY(-90deg) translateZ(${translateZ})` 
            }} />
            {/* Top */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages[4] || ''})`, 
              transform: `rotateX(90deg) translateZ(${translateZ})` 
            }} />
            {/* Bottom */}
            <div className="cube-face" style={{ 
              backgroundImage: `url(${faceImages[5] || ''})`, 
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
          <div className="cube-label">{currentCategory?.title || 'SCROLL'}</div>
        </div>

        {/* Dot Navigation */}
        <div className="cube-dots desktop-only">
          {GALLERY_DATA.map((_, i) => (
            <div key={i} className={`cube-dot ${i === activeIndex ? 'active' : ''}`} />
          ))}
        </div>

        {/* Face Caption */}
        <div className="cube-caption">
          <div className="cube-caption-num">{currentCategory?.tag || '01'}</div>
          <div className="cube-caption-name">{currentCategory?.title || ''}</div>
        </div>

        {/* Mobile Hint */}
        {isMobile && (
          <div className="cube-mobile-hint">
            <span>↓ Scroll to explore</span>
          </div>
        )}
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
      <div className="cube-credit desktop-only">
        <span>Prayas Samaj Sevi Sanstha · 12 Impact Areas</span>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;700&display=swap");

        .cube-gallery-wrapper {
          position: relative;
          width: 100%;
          background: #ffffff;
          color: #1a1a2e;
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
          background: #ffffff;
          perspective: 1200px;
          z-index: 10;
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
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: inset 0 0 60px rgba(0,0,0,0.05);
          backface-visibility: hidden;
          border-radius: 4px;
          background-color: #f5f5f5;
        }

        .cube-face::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.05));
        }

        /* HUD */
        .cube-hud {
          position: fixed;
          top: clamp(16px, 3vh, 30px);
          right: clamp(16px, 3vw, 30px);
          z-index: 50;
          text-align: right;
          font-family: "DM Mono", monospace;
        }

        .cube-percentage {
          font-size: clamp(1.2rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #2f855a;
          letter-spacing: 0.05em;
        }

        .cube-progress-bar {
          width: clamp(60px, 15vw, 120px);
          height: 2px;
          background: rgba(0, 0, 0, 0.1);
          margin-top: 6px;
          margin-bottom: 4px;
          margin-left: auto;
          overflow: hidden;
        }

        .cube-progress-fill {
          height: 100%;
          background: #2f855a;
        }

        .cube-label {
          font-size: clamp(7px, 1vw, 11px);
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
        }

          /* Dots */
        .desktop-only {
          display: block;
        }

        .cube-dots {
          position: fixed;
          left: clamp(20px, 3vw, 35px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cube-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .cube-dot.active {
          background: #2f855a;
          transform: scale(2);
        }

        /* Caption */
        .cube-caption {
          position: fixed;
          bottom: clamp(16px, 3vh, 30px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          text-align: center;
          pointer-events: none;
        }

        .cube-caption-num {
          font-size: clamp(0.5rem, 1vw, 0.6rem);
          letter-spacing: 0.3em;
          color: #2f855a;
          text-transform: uppercase;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .cube-caption-name {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(1.2rem, 4vw, 3rem);
          color: rgba(0, 0, 0, 0.08);
          letter-spacing: 0.08em;
        }

        /* Mobile Hint */
        .cube-mobile-hint {
          position: fixed;
          bottom: 70px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 40;
          color: rgba(0, 0, 0, 0.2);
          font-family: "DM Mono", monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.3; }
          50% { transform: translateX(-50%) translateY(-8px); opacity: 1; }
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
          padding: 0 clamp(16px, 4vw, 40px) clamp(60px, 8vh, 40px) clamp(16px, 4vw, 40px);
        }

        .cube-info-card {
          width: min(400px, 85vw);
          padding: clamp(20px, 3vw, 30px) clamp(18px, 2.5vw, 28px);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-left: 3px solid #2f855a;
          pointer-events: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          transition: background 0.3s ease;
        }

        .cube-info-card:has(.right) {
          border-left: none;
          border-right: 3px solid #2f855a;
        }

        .cube-tag {
          font-family: "DM Mono", monospace;
          font-size: clamp(7px, 1vw, 11px);
          color: #2f855a;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: clamp(10px, 1.5vw, 16px);
          font-weight: 600;
        }

        .cube-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(1.8rem, 5vw, 4rem);
          color: #1a1a2e;
          line-height: 0.95;
          letter-spacing: 0.03em;
          margin-bottom: clamp(8px, 1.5vw, 12px);
        }

        .cube-desc {
          font-family: "DM Mono", monospace;
          font-size: clamp(0.65rem, 1vw, 0.85rem);
          color: rgba(26, 26, 46, 0.6);
          line-height: 1.7;
          max-width: 320px;
        }

        .cube-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: clamp(16px, 2.5vw, 24px);
          flex-wrap: wrap;
        }

        .cube-btn-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: clamp(6px, 1vw, 8px) clamp(12px, 1.5vw, 16px);
          font-family: "DM Mono", monospace;
          font-size: clamp(0.55rem, 0.8vw, 0.65rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: transparent;
          color: #718096;
          border: 1px solid rgba(113, 128, 150, 0.3);
          border-radius: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cube-btn-back:hover {
          color: #1a1a2e;
          border-color: #718096;
        }

        .cube-btn-back svg {
          width: 12px;
          height: 12px;
        }

        .cube-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: clamp(6px, 1vw, 8px) clamp(16px, 2vw, 20px);
          font-family: "DM Mono", monospace;
          font-size: clamp(0.55rem, 0.8vw, 0.65rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: #2f855a;
          color: #ffffff;
          border: none;
          border-radius: 0;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .cube-btn-primary:hover {
          background: #276749;
        }

        .cube-btn-primary svg {
          width: 12px;
          height: 12px;
        }

        .cube-btn-explore {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: clamp(12px, 2vw, 16px);
          color: #2f855a;
          font-family: "DM Mono", monospace;
          font-size: clamp(0.55rem, 0.8vw, 0.65rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
          font-weight: 600;
        }

        .cube-btn-explore:hover {
          color: #276749;
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
          right: clamp(20px, 3vw, 30px);
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: right center;
          z-index: 50;
          font-family: "DM Mono", monospace;
          font-size: clamp(0.5rem, 0.8vw, 0.6rem);
          color: rgba(113, 128, 150, 0.4);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          pointer-events: none;
        }

        /* Responsive - Mobile */
        @media (max-width: 768px) {
          .cube-sticky-container {
            perspective: 800px;
          }
          
          .cube-hud {
            top: 12px;
            right: 12px;
          }
          
          .cube-dots {
            display: none;
          }
          
          .desktop-only {
            display: none !important;
          }
          
          .cube-caption {
            bottom: 12px;
          }
          
          .cube-text-section {
            padding: 0 12px 80px 12px;
            align-items: flex-end;
          }
          
          .cube-info-card {
            padding: 16px 14px;
            width: 92vw;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          
          .cube-actions {
            flex-wrap: wrap;
          }
          
          .cube-btn-back, .cube-btn-primary {
            font-size: 0.5rem;
            padding: 6px 12px;
          }
        }

        @media (max-width: 480px) {
          .cube-text-section {
            padding: 0 10px 70px 10px;
          }
          
          .cube-info-card {
            padding: 14px 12px;
            width: 94vw;
          }
          
          .cube-title {
            font-size: 1.5rem;
          }
          
          .cube-desc {
            font-size: 0.6rem;
          }
          
          .cube-tag {
            font-size: 0.55rem;
          }
          
          .cube-caption-name {
            font-size: 1rem;
          }
        }

        /* Touch-friendly */
        .cube-btn-back, .cube-btn-primary, .cube-btn-explore {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
}
