import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const stories = [
  {
    number: "01",
    title: "From Remote Villages",
    description: "From the remote villages of rural India to bustling urban slums, our dedicated team works tirelessly to bring education, healthcare, and livelihood opportunities to those who need them most.",
    bgColor: "#b9f5b0",
    textColor: "#000"
  },
  {
    number: "02",
    title: "Access Creates Change",
    description: "We believe true empowerment begins with access – to classrooms, clean water, and healthcare. We create a ripple effect that lifts entire communities.",
    bgColor: "#a6d9e3",
    textColor: "#000"
  },
  {
    number: "03",
    title: "Environmental Impact",
    description: "Through grassroots awareness and direct action, we plant trees, clean waterways, and teach the next generation to be stewards of the earth.",
    bgColor: "#dabdf2",
    textColor: "#000"
  },
  {
    number: "04",
    title: "Building Resilience",
    description: "We don't just build infrastructure; we build resilience. By training community members, we ensure every initiative is sustainable long after we leave.",
    bgColor: "#eaedd1",
    textColor: "#000"
  }
]

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardHeights, setCardHeights] = useState<string[]>([])

  // Responsive card heights
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

  // Global scroll for progress circle
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 50 })
  const circleDashoffset = useTransform(smoothProgress, [0, 1], [251, 0])

  return (
    <div ref={containerRef} className="scroll-story-container">
      {/* Header */}
      <header className="story-header">
        <motion.h1 
          className="story-title"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.256, 0.009, 0.125, 0.997] }}
          viewport={{ once: true }}
        >
          Beautiful<br />Modern<br />Impact
        </motion.h1>
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
          stroke="#000000"
          strokeWidth="5"
          transform="rotate(-90 50 50)"
          style={{ strokeDasharray: 251, strokeDashoffset: circleDashoffset }}
        />
      </svg>

      {/* End Section */}
      <header className="end-header">
        <motion.h1 
          className="end-title"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.256, 0.009, 0.125, 0.997] }}
          viewport={{ once: true }}
        >
          The Journey<br />Continues
        </motion.h1>
      </header>

      <style>{`
        .scroll-story-container {
          background: #ffffff;
          color: #000000;
          font-family: "Space Grotesk", "Inter", sans-serif;
          min-height: 100vh;
          padding-bottom: 10vh;
        }
        .story-header {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }
        .story-title {
          font-size: clamp(2rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.2;
          max-width: 900px;
          color: #000;
        }
        .end-header {
          min-height: 60vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }
        .end-title {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 800;
          color: #000;
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
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }
        
        /* Line animation styles */
        .card-line {
          overflow: hidden;
          display: block;
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

// Individual Card with tab-style line animation
function Card({ story, index }: { story: any; index: number }) {
  const cardRef = useRef<HTMLLIElement>(null)
  const [lines, setLines] = useState<{ title: string[], description: string[] }>({ title: [], description: [] })

  // Split text into lines on mount
  useEffect(() => {
    // Split title and description into individual words for line animation
    const titleWords = story.title.split(' ')
    const descWords = story.description.split(' ')
    
    // Group words into lines (simulate SplitText lines)
    const titleLines: string[] = [story.title] // Single line for title
    const descLines: string[] = []
    
    let currentLine = ''
    descWords.forEach((word: string, i: number) => {
      if (currentLine.length + word.length < 50) {
        currentLine += (currentLine ? ' ' : '') + word
      } else {
        descLines.push(currentLine)
        currentLine = word
      }
      if (i === descWords.length - 1) {
        descLines.push(currentLine)
      }
    })
    
    setLines({ title: titleLines, description: descLines })
  }, [story])

  // Track when the card enters/exits viewport
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Map scroll progress to transform values
  const scale = useTransform(cardScroll, [0.5, 1], [1, 0.85])
  const y = useTransform(cardScroll, [0.5, 1], ['0vh', '-10vh'])
  const rotateX = useTransform(cardScroll, [0.5, 1], [0, -15])
  const filterBrightness = useTransform(cardScroll, [0.5, 1], [1, 0.7])
  const borderRadius = useTransform(cardScroll, [0.5, 1], [32, 20])
  const boxShadow = useTransform(
    cardScroll,
    [0.7, 1],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 50px 80px -20px rgba(0,0,0,0.25)']
  )

  // Text line animation - slide up when card enters view
  const textProgress = useTransform(cardScroll, [0, 0.3], [100, 0])
  const textOpacity = useTransform(cardScroll, [0, 0.3], [0, 1])

  return (
    <li ref={cardRef} className="card" style={{ '--index': index + 1 } as React.CSSProperties}>
      <motion.div
        className="card__content"
        style={{
          background: story.bgColor,
          color: story.textColor,
          scale,
          y,
          rotateX,
          filter: useTransform(filterBrightness, (v) => `brightness(${v})`),
          borderRadius,
          boxShadow,
        }}
      >
        <span className="number">{story.number}</span>
        
        {/* Title with line animation */}
        <h2>
          {lines.title.map((line, i) => (
            <span key={i} className="card-line">
              <motion.span
                style={{
                  display: 'inline-block',
                  y: textProgress,
                  opacity: textOpacity,
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.256, 0.009, 0.125, 0.997]
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        
        {/* Description with line animation */}
        <p>
          {lines.description.map((line, i) => (
            <span key={i} className="card-line">
              <motion.span
                style={{
                  display: 'inline-block',
                  y: textProgress,
                  opacity: textOpacity,
                }}
                transition={{
                  duration: 0.6,
                  delay: (i + 1) * 0.12,
                  ease: [0.256, 0.009, 0.125, 0.997]
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </p>
      </motion.div>
    </li>
  )
}
