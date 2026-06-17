import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Your NGO stories (replace with your own)
const stories = [
  {
    number: "01",
    title: "From Remote Villages",
    description: "From the remote villages of rural India to bustling urban slums, our dedicated team works tirelessly to bring education, healthcare, and livelihood opportunities.",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    shadow: "rgba(79, 70, 229, 0.6)",
  },
  {
    number: "02",
    title: "Access Creates Change",
    description: "We believe true empowerment begins with access – to classrooms, clean water, and healthcare. We create a ripple effect that lifts entire communities.",
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
    shadow: "rgba(16, 185, 129, 0.6)",
  },
  {
    number: "03",
    title: "Environmental Impact",
    description: "Through grassroots awareness and direct action, we plant trees, clean waterways, and teach the next generation to be stewards of the earth.",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)",
    shadow: "rgba(139, 92, 246, 0.6)",
  },
  {
    number: "04",
    title: "Building Resilience",
    description: "We don't just build infrastructure; we build resilience. By training community members, we ensure every initiative is sustainable long after we leave.",
    gradient: "linear-gradient(135deg, #9d174d 0%, #db2777 100%)",
    shadow: "rgba(236, 72, 153, 0.6)",
  },
]

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardHeights, setCardHeights] = useState<string[]>([])

  // Update card heights on resize (responsive)
  useEffect(() => {
    const updateHeights = () => {
      const vw = window.innerWidth
      let h = ''
      if (vw < 480) h = '55vh'
      else if (vw < 768) h = '70vh'
      else h = '40vw'
      setCardHeights(stories.map(() => h))
    }
    updateHeights()
    window.addEventListener('resize', updateHeights)
    return () => window.removeEventListener('resize', updateHeights)
  }, [])

  // Global scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50 })

  // Progress circle dashoffset
  const circleDashoffset = useTransform(smoothProgress, [0, 1], [251, 0])

  // Header text animation (fill & stroke)
  const titleFill = useTransform(scrollYProgress, [0, 0.3], ['transparent', '#ffffff'])
  const titleStroke = useTransform(scrollYProgress, [0, 0.3], ['2px rgba(255,255,255,0.3)', '0px'])

  // End title animation
  const endFill = useTransform(scrollYProgress, [0.7, 1], ['transparent', '#ffffff'])
  const endStroke = useTransform(scrollYProgress, [0.7, 1], ['2px rgba(255,255,255,0.3)', '0px'])

  return (
    <div ref={containerRef} className="scroll-story-container">
      {/* Header */}
      <header className="story-header">
        <motion.h1 
          className="story-title"
          style={{ color: titleFill, WebkitTextStroke: titleStroke }}
        >
          Beautiful<br />Modern<br />Impact
        </motion.h1>
        <p className="header-subtitle">Driving change through innovation and compassion</p>
      </header>

      {/* Stacking Cards */}
      <ul id="cards" style={{ gridTemplateRows: cardHeights.join(' ') }}>
        {stories.map((story, index) => (
          <Card key={index} story={story} index={index} />
        ))}
      </ul>

      {/* Progress Circle */}
      <svg className="progress-circle" viewBox="0 0 100 100">
        <motion.circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="5"
          transform="rotate(-90 50 50)"
          style={{ strokeDasharray: 251, strokeDashoffset: circleDashoffset }}
        />
      </svg>

      {/* End Section */}
      <header className="end-header">
        <motion.h1 
          className="end-title"
          style={{ color: endFill, WebkitTextStroke: endStroke }}
        >
          The Journey<br />Continues
        </motion.h1>
        <p className="end-subtitle">Together, we build a better tomorrow</p>
      </header>

      <style>{`
        .scroll-story-container {
          background: #0a0a0b;
          color: #ffffff;
          font-family: "Space Grotesk", "Inter", sans-serif;
          min-height: 100vh;
          padding-bottom: 10vh;
        }
        .story-header {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          position: relative;
        }
        .story-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .story-title {
          font-size: clamp(2rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.2;
          background: linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #a78bfa 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.3);
          max-width: 900px;
        }
        .header-subtitle {
          font-size: 1.1rem;
          color: #818cf8;
          font-style: italic;
          margin-top: 1rem;
        }
        .end-header {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }
        .end-title {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.3);
        }
        .end-subtitle {
          font-size: 1.2rem;
          color: #818cf8;
          font-style: italic;
          margin-top: 0.5rem;
        }
        #cards {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 4vw;
          padding-bottom: 16vw;
          max-width: 90vw;
          margin: 0 auto;
        }
        .card {
          position: sticky;
          top: 10vh;
          height: 100%;
          padding-top: calc(var(--index) * 1em);
          perspective: 1000px;
        }
        .card__content {
          box-sizing: border-box;
          padding: clamp(1.5rem, 5vw, 3rem);
          width: 100%;
          height: 100%;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
          transform-origin: 50% 0%;
          will-change: transform;
        }
        .card__content h2 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }
        .card__content p {
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          max-width: 700px;
          line-height: 1.5;
          opacity: 0.9;
        }
        .number {
          font-size: clamp(3rem, 8vw, 6rem);
          position: absolute;
          right: 1rem;
          top: -0.5rem;
          opacity: 0.15;
          font-weight: 800;
          pointer-events: none;
        }
        .progress-circle {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: clamp(50px, 8vw, 70px);
          height: clamp(50px, 8vw, 70px);
          z-index: 100;
        }
        @media (max-width: 768px) {
          #cards { gap: 6vw; }
          .card__content { padding: 1.5rem; }
          .progress-circle { bottom: 20px; right: 20px; }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

// Individual Card with scroll‑based transforms
function Card({ story, index }: { story: any; index: number }) {
  const cardRef = useRef<HTMLLIElement>(null)

  // Track this card's progress as it enters and exits viewport
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"] // triggers when card enters viewport to when it leaves
  })

  // Transforms based on card scroll
  const scale = useTransform(cardScroll, [0, 0.5, 1], [0.95, 1, 0.85])
  const rotateX = useTransform(cardScroll, [0, 0.5, 1], [5, 0, -15])
  const filter = useTransform(cardScroll, [0, 0.5, 1], ['brightness(0.9)', 'brightness(1)', 'brightness(0.6)'])
  const borderRadius = useTransform(cardScroll, [0, 0.5, 1], ['32px', '32px', '20px'])
  const shadow = useTransform(
    cardScroll,
    [0.7, 1],
    [`0px 0px 0px 0px ${story.shadow}`, `0 50px 80px -20px ${story.shadow}`]
  )

  return (
    <li ref={cardRef} className="card" style={{ '--index': index + 1 } as React.CSSProperties}>
      <motion.div
        className="card__content"
        style={{
          background: story.gradient,
          scale,
          rotateX,
          filter,
          borderRadius,
          boxShadow: shadow,
        }}
      >
        <span className="number">{story.number}</span>
        <h2>{story.title}</h2>
        <p>{story.description}</p>
      </motion.div>
    </li>
  )
}
