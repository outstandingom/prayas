import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

const stories = [
  {
    number: "01",
    title: "From Remote Villages",
    description: "From the remote villages of rural India to bustling urban slums, our dedicated team of volunteers works tirelessly to bring education, healthcare, and livelihood opportunities to those who need them most.",
    bgColor: "#b9f5b0",
    textColor: "#000"
  },
  {
    number: "02",
    title: "Access Creates Change",
    description: "We believe that true empowerment begins with access. Access to a classroom. Access to clean drinking water. Access to a doctor who understands. By addressing these foundational needs, we create a ripple effect of change that lifts entire communities.",
    bgColor: "#a6d9e3",
    textColor: "#000"
  },
  {
    number: "03",
    title: "Environmental Impact",
    description: "Over the last decade, our focus has expanded to include critical environmental interventions. Through grassroots awareness and direct action, we are planting trees, cleaning waterways, and teaching the next generation to be stewards of the earth.",
    bgColor: "#dabdf2",
    textColor: "#000"
  },
  {
    number: "04",
    title: "Building Resilience",
    description: "We don't just build infrastructure; we build resilience. By partnering with local leaders and training community members, we ensure that every initiative we start is sustainable long after we leave. This is not charity—this is partnership.",
    bgColor: "#eaedd1",
    textColor: "#000"
  }
]

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardHeights, setCardHeights] = useState<string[]>([])
  
  // Responsive: update card heights on resize
  useEffect(() => {
    const updateHeights = () => {
      const vw = window.innerWidth
      let cardHeight = ''
      if (vw < 480) cardHeight = '55vh'
      else if (vw < 768) cardHeight = '70vh'
      else cardHeight = '40vw'
      setCardHeights(stories.map(() => cardHeight))
    }
    updateHeights()
    window.addEventListener('resize', updateHeights)
    return () => window.removeEventListener('resize', updateHeights)
  }, [])

  // Global scroll progress for the whole container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50 })
  
  // Progress circle stroke
  const circleDashoffset = useTransform(smoothProgress, [0, 1], [251, 0])

  // Header title fill & stroke – animate with scroll
  const titleFill = useTransform(scrollYProgress, [0, 0.3], ['transparent', '#000000'])
  const titleStroke = useTransform(scrollYProgress, [0, 0.3], ['2px rgba(0,0,0,0.3)', '0px'])

  // End title fill & stroke – animate near the bottom (70% – 100% scroll)
  const endTitleFill = useTransform(scrollYProgress, [0.7, 1], ['transparent', '#000000'])
  const endTitleStroke = useTransform(scrollYProgress, [0.7, 1], ['2px rgba(0,0,0,0.3)', '0px'])

  return (
    <div ref={containerRef} className="scroll-story-container">
      {/* Header Section */}
      <header className="story-header">
        <motion.h1 
          className="story-title"
          style={{ 
            color: titleFill, 
            WebkitTextStroke: titleStroke 
          }}
        >
          Beautiful<br />Modern<br />Impact
        </motion.h1>
      </header>

      {/* Stacking Cards Section */}
      <ul id="cards" style={{ gridTemplateRows: cardHeights.map(h => h).join(' ') }}>
        {stories.map((story, index) => (
          <Card 
            key={index}
            story={story}
            index={index}
          />
        ))}
      </ul>

      {/* Circular Progress Indicator */}
      <svg className="progress-circle" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#000000"
          strokeWidth="6"
          transform="rotate(-90 50 50)"
          style={{ strokeDasharray: 251, strokeDashoffset: circleDashoffset }}
        />
      </svg>

      {/* End Section */}
      <header className="end-header">
        <motion.h1 
          className="end-title"
          style={{ 
            color: endTitleFill, 
            WebkitTextStroke: endTitleStroke 
          }}
        >
          The Journey<br />Continues
        </motion.h1>
      </header>

      <style>{`
        .scroll-story-container {
          background: #ffffff;
          color: #000000;
          font-family: "Space Grotesk", sans-serif;
          margin: 0;
          padding-bottom: 10vh;
        }
        .story-header, .end-header {
          min-height: 80vh;
          display: grid;
          place-items: center;
        }
        .end-header {
          height: 50vh;
          min-height: 300px;
        }
        .story-title, .end-title {
          font-size: clamp(2.5rem, 10vw, 10rem);
          text-transform: uppercase;
          text-align: center;
          line-height: 0.85;
          margin: 0;
          padding: 0 1rem;
          background: linear-gradient(to bottom, #000000 0%, transparent 100%);
          background-clip: text;
          -webkit-background-clip: text;
          /* fallback if inline style fails */
          -webkit-text-stroke: 2px rgba(0,0,0,0.3);
          color: transparent;
          transition: none; /* animated via Framer Motion */
        }
        #cards {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 4vw;
          padding-bottom: 16vw;
          margin: 0 auto;
          max-width: 90vw;
        }
        .card {
          position: sticky;
          top: 10vh;
          height: 100%;
          padding-top: calc(var(--index, 1) * 1em);
          perspective: 1000px;
        }
        .card__content {
          box-sizing: border-box;
          padding: clamp(1rem, 5vw, 3rem);
          width: 100%;
          height: 100%;
          border-radius: clamp(1rem, 5vw, 3rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          border: 1px solid rgba(0,0,0,0.1);
          overflow: hidden;
          transform-origin: 50% 0%;
          will-change: transform;
        }
        .card__content h2 {
          font-size: clamp(1.3rem, 4vw, 3.5rem);
          margin: 0 0 0.5rem 0;
          font-weight: bold;
          line-height: 1.2;
        }
        .card__content p {
          font-size: clamp(0.85rem, 1.5vw, 1.2rem);
          max-width: 80%;
          line-height: 1.5;
          opacity: 0.9;
          margin-top: 0.5rem;
        }
        @media (max-width: 640px) {
          .card__content p { max-width: 100%; }
        }
        .number {
          font-size: clamp(3rem, 15vw, 8rem);
          position: absolute;
          right: clamp(0.5rem, 3vw, 2rem);
          top: clamp(-1rem, -2vw, -1.5rem);
          opacity: 0.2;
          font-weight: bold;
          pointer-events: none;
          line-height: 1;
        }
        .progress-circle {
          position: fixed;
          bottom: max(20px, 3vh);
          right: max(20px, 3vw);
          width: clamp(50px, 8vw, 80px);
          height: clamp(50px, 8vw, 80px);
          z-index: 100;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          #cards { gap: 6vw; }
          .card__content { padding: 30px; }
          .number { font-size: 5rem; right: 1rem; top: -1rem; }
        }
        @media (max-width: 480px) {
          .card__content { padding: 20px; }
          .card__content h2 { font-size: 1.8rem; }
          .card__content p { font-size: 1rem; }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

// Individual Card with scroll‑based transform (using useScroll per card)
function Card({ story, index }: { story: any, index: number }) {
  const cardRef = useRef<HTMLLIElement>(null)
  
  // Track this card's scroll progress relative to viewport
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"] // when card enters to when it leaves
  })
  
  // Transforms based on card scroll
  const scale = useTransform(cardScroll, [0, 0.5, 1], [0.95, 1, 0.85])
  const rotateX = useTransform(cardScroll, [0, 0.5, 1], [5, 0, -15])
  const filter = useTransform(cardScroll, [0, 0.5, 1], ['brightness(0.9)', 'brightness(1)', 'brightness(0.6)'])
  const borderRadius = useTransform(cardScroll, [0, 0.5, 1], ['clamp(1rem,5vw,3rem)', 'clamp(1rem,5vw,3rem)', '20px'])
  
  // Dynamic shadow color per card
  const shadowColors = [
    'rgba(255,42,109,0.8)',
    'rgba(5,217,232,0.8)',
    'rgba(255,230,0,0.8)',
    'rgba(250,250,198,0.8)'
  ]
  const shadowOpacity = useTransform(cardScroll, [0.7, 1], [0, 0.8])
  
  // We combine the shadow with opacity to avoid using useTransform for boxShadow directly
  // Simpler: just use a fixed shadow with opacity mapped, but we'll use a static shadow with the color and let opacity animate via a separate wrapper?
  // For simplicity, we'll just set a fixed shadow with the color and use opacity on the whole card__content? But we have multiple transforms.
  // Better: use a boxShadow style that changes via useTransform – we can output a string.
  // Let's do that:
  const shadow = useTransform(
    cardScroll,
    [0.7, 1],
    [`0px 0px 0px 0px ${shadowColors[index]}`, `0 50px 80px -10px ${shadowColors[index]}`]
  )
  
  return (
    <li 
      ref={cardRef}
      className="card"
      style={{ '--index': index + 1 } as React.CSSProperties}
    >
      <motion.div 
        className="card__content"
        style={{
          background: story.bgColor,
          color: story.textColor,
          scale,
          rotateX,
          filter,
          borderRadius,
          boxShadow: shadow
        }}
      >
        <span className="number">{story.number}</span>
        <h2>{story.title}</h2>
        <p>{story.description}</p>
      </motion.div>
    </li>
  )
}
