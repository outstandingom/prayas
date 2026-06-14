import { motion } from 'framer-motion'

const stories = [
  {
    number: "01",
    title: "From Remote Villages",
    description: "From the remote villages of rural India to bustling urban slums, our dedicated team of volunteers works tirelessly to bring education, healthcare, and livelihood opportunities to those who need them most.",
    bgColor: "#b9f5b0",
    textColor: "#fff"
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
  return (
    <>
      <div className="scroll-story-container">
        {/* Header Section */}
        <header className="story-header">
          <h1 className="story-title">Beautiful<br />Modern<br />Impact</h1>
        </header>

        {/* Stacking Cards Section */}
        <ul id="cards">
          {stories.map((story, index) => (
            <li 
              key={index} 
              className="card"
              style={{ '--index': index + 1 } as React.CSSProperties}
            >
              <div 
                className="card__content"
                style={{
                  background: story.bgColor,
                  color: story.textColor
                } as React.CSSProperties}
              >
                <span className="number">{story.number}</span>
                <h2>{story.title}</h2>
                <p>{story.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Circular Progress Indicator */}
        <svg className="progress-circle" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>

        {/* End Section */}
        <header className="end-header">
          <h1 className="end-title">The Journey<br />Continues</h1>
        </header>
      </div>

      {/* Complete CSS with white background */}
      <style>{`
        :root {
          --card-height: 40vw;
          --card-margin: 4vw;
          --card-top-offset: 1em;
        }

        .scroll-story-container {
          background: #ffffff;
          color: #000000;
          font-family: "Space Grotesk", sans-serif;
          margin: 0;
          padding-bottom: 10vh;
        }

        .story-header, .end-header {
          height: 80vh;
          display: grid;
          place-items: center;
        }

        .end-header {
          height: 50vh;
        }

        .story-title, .end-title {
          font-size: clamp(3rem, 10vw, 10rem);
          text-transform: uppercase;
          text-align: center;
          line-height: 0.8;
          margin: 0;
          
          /* Typography styles for white background - darker stroke */
          -webkit-text-stroke: 2px rgba(0, 0, 0, 0.3);
          color: transparent;
          background: linear-gradient(to bottom, #000000 0%, transparent 100%);
          background-clip: text;
          -webkit-background-clip: text;
          
          /* Scroll animation */
          animation: fill-text-light linear both;
          animation-timeline: scroll();
          animation-range: 0 50vh;
        }

        @keyframes fill-text-light {
          to {
            -webkit-text-stroke: 0;
            color: #000000;
          }
        }

        #cards {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: repeat(4, var(--card-height));
          gap: var(--card-margin);
          padding-bottom: calc(4 * var(--card-margin));
          margin-bottom: var(--card-margin);
          max-width: 90vw;
          margin: 0 auto;
        }

        .card {
          position: sticky;
          top: 10vh;
          height: var(--card-height);
          padding-top: calc(var(--index) * var(--card-top-offset));
          perspective: 1000px;
        }

        .card__content {
          box-sizing: border-box;
          padding: 50px;
          width: 100%;
          height: 100%;
          border-radius: 50px;
          background: #1c1c1c;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          border: 1px solid rgba(0, 0, 0, 0.1);
          overflow: hidden;
          
          /* Transform config */
          transform-origin: 50% 0%;
          will-change: transform, filter;
          transform-style: preserve-3d;
          
          /* Animate based on viewport visibility */
          animation: scale-card linear forwards;
          animation-timeline: view();
          animation-range: exit-crossing 0% exit-crossing 100%;
        }

        /* Card variants with dynamic shadow colors */
        .card:nth-child(1) .card__content {
          --shadow-color: rgba(255, 42, 109, 0.8);
        }
        
        .card:nth-child(2) .card__content {
          --shadow-color: rgba(5, 217, 232, 0.8);
        }
        
        .card:nth-child(3) .card__content {
          --shadow-color: rgba(255, 230, 0, 0.8);
        }
        
        .card:nth-child(4) .card__content {
          --shadow-color: rgba(250, 250, 198, 0.8);
        }

        @keyframes scale-card {
          to {
            transform: scale(0.8) translateY(-10vh) rotateX(-20deg);
            filter: brightness(0.6);
            border-radius: 20px;
            box-shadow: 0 50px 80px -10px var(--shadow-color);
          }
        }

        /* Content Styling */
        .card__content h2 {
          font-size: clamp(1.5rem, 4vw, 4rem);
          margin: 0;
          font-weight: bold;
        }
        
        .card__content p {
          font-size: clamp(0.9rem, 1.5vw, 1.5rem);
          max-width: 600px;
          line-height: 1.4;
          opacity: 0.9;
          margin-top: 1rem;
        }
        
        .number {
          font-size: clamp(3rem, 10vw, 10rem);
          position: absolute;
          right: 2rem;
          top: -2rem;
          opacity: 0.2;
          font-weight: bold;
          pointer-events: none;
        }
        
        /* Scroll Progress Circle - Dark version for white background */
        .progress-circle {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 80px;
          height: 80px;
          z-index: 100;
        }
        
        .progress-circle circle {
          fill: none;
          stroke: #000000;
          stroke-width: 6;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          
          /* Scroll-linked dashoffset */
          stroke-dasharray: 251;
          stroke-dashoffset: 251;
          
          animation: progress-spin linear;
          animation-timeline: scroll();
        }
        
        @keyframes progress-spin {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          :root {
            --card-height: 70vh;
            --card-margin: 6vw;
          }
          
          .card__content {
            padding: 30px;
          }
          
          .number {
            font-size: 5rem;
            right: 1rem;
            top: -1rem;
          }
          
          .progress-circle {
            width: 60px;
            height: 60px;
            bottom: 20px;
            right: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .card__content {
            padding: 20px;
          }
          
          .card__content h2 {
            font-size: 1.8rem;
          }
          
          .card__content p {
            font-size: 1rem;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  )
}
