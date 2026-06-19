import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const stories = [import { useRef, useEffect, useState } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardHeights, setCardHeights] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const queuedIndexRef = useRef<number | null>(null)

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

  // Tab click handler with animation queue
  const switchTab = (nextIndex: number) => {
    if (nextIndex === activeIndex) return

    if (isAnimating) {
      queuedIndexRef.current = nextIndex
      return
    }

    setIsAnimating(true)
    setActiveIndex(nextIndex)

    // Complete animation after duration
    setTimeout(() => {
      setIsAnimating(false)
      if (queuedIndexRef.current !== null && queuedIndexRef.current !== nextIndex) {
        const q = queuedIndexRef.current
        queuedIndexRef.current = null
        switchTab(q)
      }
    }, 400) // DURATION
  }

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

      {/* Tab Navigation */}
      <div className="tabs-container">
        <div className="tabs">
          {stories.map((story, index) => (
            <button
              key={index}
              onClick={() => switchTab(index)}
              className={`tab ${index === activeIndex ? 'active' : ''}`}
            >
              {story.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content with SplitText animation */}
      <div className="content-wrapper">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            className="role-content"
            initial={false}
            animate={{
              opacity: index === activeIndex ? 1 : 0,
              pointerEvents: index === activeIndex ? 'auto' : 'none'
            }}
            transition={{ duration: 0.3 }}
          >
            <SplitTextContent 
              text={story.description}
              isActive={index === activeIndex}
            />
          </motion.div>
        ))}
      </div>

      {/* Stacking Cards */}
      <ul id="cards" style={{ gridTemplateRows: cardHeights.join(' ') }}>
        {stories.map((story, index) => (
          <Card key={index} story={story} index={index} isActive={index === activeIndex} />
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

        /* Tab Navigation Styles */
        .tabs-container {
          position: sticky;
          top: 20px;
          z-index: 50;
          padding: 20px 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          margin-bottom: 32px;
        }
        .tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          max-width: 1020px;
          margin: 0 auto;
          padding: 0 clamp(2rem, 8vw, 5rem);
        }
        .tab {
          border: none;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #000;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.08);
          transition: all 0.25s cubic-bezier(0.256, 0.009, 0.125, 0.997);
        }
        .tab:hover {
          background: rgba(0, 0, 0, 0.16);
        }
        .tab.active {
          background: #111;
          color: #fff;
        }

        /* Content Wrapper with SplitText Animation */
        .content-wrapper {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          max-width: 1020px;
          margin: 0 auto 60px;
          padding: 0 clamp(2rem, 8vw, 5rem);
        }
        .role-content {
          grid-column: 1;
          grid-row: 1;
          text-align: center;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #000;
        }

        /* SplitText mask */
        .card-line {
          overflow: hidden;
          display: block;
          margin-bottom: 0.1em;
        }
        .card-line span {
          display: inline-block;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997),
                      opacity 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997);
        }

        /* Cards */
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
          transition: transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997);
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
          .role-content {
            font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

// SplitText Content Component with line animation
function SplitTextContent({ text, isActive }: { text: string; isActive: boolean }) {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    // Split text into lines based on approximate character width
    const words = text.split(' ')
    const lineArray: string[] = []
    let currentLine = ''
    
    words.forEach((word, i) => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word
      if (testLine.length > 45 && currentLine) {
        lineArray.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
      if (i === words.length - 1) {
        lineArray.push(currentLine)
      }
    })
    
    setLines(lineArray)
  }, [text])

  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} className="card-line">
          <span style={{ 
            transform: isActive ? 'translateY(0)' : 'translateY(100%)',
            opacity: isActive ? 1 : 0,
            transitionDelay: isActive ? `${i * 0.06}s` : `${(lines.length - 1 - i) * 0.06}s`
          }}>
            {line}
          </span>
        </div>
      ))}
    </div>
  )
}

// Individual Card Component
function Card({ story, index, isActive }: { story: any; index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLLIElement>(null)

  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

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
        <h2>
          <div className="card-line">
            <span style={{ transform: 'translateY(0)', opacity: 1 }}>{story.title}</span>
          </div>
        </h2>
        <SplitTextContent text={story.description} isActive={isActive} />
      </motion.div>
    </li>
  )
}
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

// Custom hook for SplitText-like line animation
function useSplitTextAnimation(ref: React.RefObject<HTMLDivElement>, isActive: boolean) {
  const [lines, setLines] = useState<HTMLElement[]>([])
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!ref.current) return

    // Split text into lines (simulating SplitText)
    const element = ref.current
    const text = element.textContent || ''
    const words = text.split(' ')
    const tempDiv = document.createElement('div')
    tempDiv.style.cssText = window.getComputedStyle(element).cssText
    tempDiv.style.position = 'absolute'
    tempDiv.style.visibility = 'hidden'
    tempDiv.style.width = element.offsetWidth + 'px'
    document.body.appendChild(tempDiv)

    // Create lines by measuring word widths
    const lineElements: HTMLElement[] = []
    let currentLine = document.createElement('span')
    currentLine.className = 'card-line'
    currentLine.style.display = 'block'
    currentLine.style.overflow = 'hidden'
    
    const lineContent = document.createElement('span')
    lineContent.style.display = 'inline-block'
    lineContent.style.transform = isActive ? 'translateY(0)' : 'translateY(100%)'
    lineContent.style.transition = 'transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997), opacity 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997)'
    
    currentLine.appendChild(lineContent)
    tempDiv.appendChild(currentLine)

    words.forEach((word, i) => {
      const testLine = lineContent.textContent + (lineContent.textContent ? ' ' : '') + word
      lineContent.textContent = testLine
      
      if (tempDiv.offsetHeight > 50 && lineContent.textContent.includes(' ')) {
        // Line is full, create new line
        lineContent.textContent = lineContent.textContent.replace(' ' + word, '')
        lineElements.push(currentLine.cloneNode(true) as HTMLElement)
        
        currentLine = document.createElement('span')
        currentLine.className = 'card-line'
        currentLine.style.display = 'block'
        currentLine.style.overflow = 'hidden'
        
        const newLineContent = document.createElement('span')
        newLineContent.style.display = 'inline-block'
        newLineContent.style.transform = isActive ? 'translateY(0)' : 'translateY(100%)'
        newLineContent.style.transition = 'transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997), opacity 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997)'
        newLineContent.textContent = word
        
        currentLine.appendChild(newLineContent)
        tempDiv.innerHTML = ''
        tempDiv.appendChild(currentLine)
      }
    })
    
    if (lineContent.textContent) {
      lineElements.push(currentLine.cloneNode(true) as HTMLElement)
    }

    document.body.removeChild(tempDiv)
    setLines(lineElements)

    // Clear element and append lines
    element.innerHTML = ''
    lineElements.forEach(line => element.appendChild(line))
  }, [ref.current, text])

  // Animate lines when active state changes
  useEffect(() => {
    if (!ref.current || lines.length === 0) return

    const lineSpans = ref.current.querySelectorAll('.card-line span')
    
    if (isActive) {
      // Animate in
      lineSpans.forEach((span, i) => {
        setTimeout(() => {
          (span as HTMLElement).style.transform = 'translateY(0)'
          (span as HTMLElement).style.opacity = '1'
        }, i * 60) // 60ms stagger = STAGGER
      })
    } else {
      // Animate out
      lineSpans.forEach((span, i) => {
        setTimeout(() => {
          (span as HTMLElement).style.transform = 'translateY(100%)'
          (span as HTMLElement).style.opacity = '0'
        }, i * 60)
      })
    }
  }, [isActive, lines])

  return lines
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardHeights, setCardHeights] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const queuedIndexRef = useRef<number | null>(null)

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

  // Tab click handler with animation queue
  const switchTab = (nextIndex: number) => {
    if (nextIndex === activeIndex) return

    if (isAnimating) {
      queuedIndexRef.current = nextIndex
      return
    }

    setIsAnimating(true)
    setActiveIndex(nextIndex)

    // Complete animation after duration
    setTimeout(() => {
      setIsAnimating(false)
      if (queuedIndexRef.current !== null && queuedIndexRef.current !== nextIndex) {
        const q = queuedIndexRef.current
        queuedIndexRef.current = null
        switchTab(q)
      }
    }, 400) // DURATION
  }

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

      {/* Tab Navigation */}
      <div className="tabs-container">
        <div className="tabs">
          {stories.map((story, index) => (
            <button
              key={index}
              onClick={() => switchTab(index)}
              className={`tab ${index === activeIndex ? 'active' : ''}`}
            >
              {story.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content with SplitText animation */}
      <div className="content-wrapper">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            className="role-content"
            initial={false}
            animate={{
              opacity: index === activeIndex ? 1 : 0,
              pointerEvents: index === activeIndex ? 'auto' : 'none'
            }}
            transition={{ duration: 0.3 }}
          >
            <SplitTextContent 
              text={story.description}
              isActive={index === activeIndex}
            />
          </motion.div>
        ))}
      </div>

      {/* Stacking Cards */}
      <ul id="cards" style={{ gridTemplateRows: cardHeights.join(' ') }}>
        {stories.map((story, index) => (
          <Card key={index} story={story} index={index} isActive={index === activeIndex} />
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

        /* Tab Navigation Styles */
        .tabs-container {
          position: sticky;
          top: 20px;
          z-index: 50;
          padding: 20px 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          margin-bottom: 32px;
        }
        .tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          max-width: 1020px;
          margin: 0 auto;
          padding: 0 clamp(2rem, 8vw, 5rem);
        }
        .tab {
          border: none;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #000;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.08);
          transition: all 0.25s cubic-bezier(0.256, 0.009, 0.125, 0.997);
        }
        .tab:hover {
          background: rgba(0, 0, 0, 0.16);
        }
        .tab.active {
          background: #111;
          color: #fff;
        }

        /* Content Wrapper with SplitText Animation */
        .content-wrapper {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          max-width: 1020px;
          margin: 0 auto 60px;
          padding: 0 clamp(2rem, 8vw, 5rem);
        }
        .role-content {
          grid-column: 1;
          grid-row: 1;
          text-align: center;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #000;
        }

        /* SplitText mask */
        .card-line {
          overflow: hidden;
          display: block;
          margin-bottom: 0.1em;
        }
        .card-line span {
          display: inline-block;
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997),
                      opacity 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997);
        }

        /* Cards */
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
          transition: transform 0.4s cubic-bezier(0.256, 0.009, 0.125, 0.997);
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
          .role-content {
            font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

// SplitText Content Component with line animation
function SplitTextContent({ text, isActive }: { text: string; isActive: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    // Split text into lines based on approximate character width
    const words = text.split(' ')
    const lineArray: string[] = []
    let currentLine = ''
    
    words.forEach((word, i) => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word
      if (testLine.length > 45 && currentLine) {
        lineArray.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
      if (i === words.length - 1) {
        lineArray.push(currentLine)
      }
    })
    
    setLines(lineArray)
  }, [text])

  return (
    <div ref={contentRef}>
      {lines.map((line, i) => (
        <div key={i} className="card-line">
          <span style={{ 
            transform: isActive ? 'translateY(0)' : 'translateY(100%)',
            transitionDelay: isActive ? `${i * 0.06}s` : `${(lines.length - 1 - i) * 0.06}s`
          }}>
            {line}
          </span>
        </div>
      ))}
    </div>
  )
}

// Individual Card Component
function Card({ story, index, isActive }: { story: any; index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLLIElement>(null)

  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

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
        <h2>
          <div className="card-line">
            <span style={{ transform: 'translateY(0)' }}>{story.title}</span>
          </div>
        </h2>
        <SplitTextContent text={story.description} isActive={isActive} />
      </motion.div>
    </li>
  )
}
