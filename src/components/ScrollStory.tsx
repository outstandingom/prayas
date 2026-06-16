import { motion } from 'framer-motion'

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

      {/* Complete CSS with white background – fully responsive */}
      <style>{`
        :root {
          /* Default desktop values */
          --card-height: 40vw;
          --card-margin: 4vw;
          --card-top-offset: 1em;
          --header-min-height: 80vh;
          --sticky-top: 10vh;
        }

        /* Tablet (portrait) */
        @media (max-width: 768px) {
          :root {
            --card-height: 70vh;
            --card-margin: 6vw;
            --header-min-height: 70vh;
            --sticky-top: 8vh;
          }
        }

        /* Mobile landscape & small tablets */
        @media (max-width: 640px) {
          :root {
            --card-height: 60vh;
            --card-margin: 8vw;
            --sticky-top: 5vh;
          }
        }

        /* Mobile portrait */
        @media (max-width: 480px) {
          :root {
            --card-height: 55vh;
            --card-margin: 10vw;
            --header-min-height: 60vh;
          }
        }

        .scroll-story-container {
          background: #ffffff;
          color: #000000;
          font-family: "Space Grotesk", sans-serif;
          margin: 0;
          padding-bottom: 10vh;
        }

        .story-header, .end-header {
          min-height: var(--header-min-height);
          display: grid;
          place-items: center;
        }

        .end-header {
          height: 50vh;
          min-height: 300px; /* ensure visibility on very small screens */
        }

        .story-title, .end-title {
          font-size: clamp(2.5rem, 10vw, 10rem);
          text-transform: uppercase;
          text-align: center;
          line-height: 0.85;
          margin: 0;
          padding: 0 1rem;
          
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
          top: var(--sticky-top);
          height: var(--card-height);
          padding-top: calc(var(--index) * var(--card-top-offset));
          perspective: 1000px;
        }

        .card__content {
          box-sizing: border-box;
          padding: clamp(1rem, 5vw, 3rem);
          width: 100%;
          height: 100%;
          border-radius: clamp(1rem, 5vw, 3rem);
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
            transform: scale(0.85) translateY(-8vh) rotateX(-20deg);
            filter: brightness(0.6);
            border-radius: 20px;
            box-shadow: 0 50px 80px -10px var(--shadow-color);
          }
        }

        /* Content Styling – fully responsive */
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
        
        /* On narrow screens, description takes full width */
        @media (max-width: 640px) {
          .card__content p {
            max-width: 100%;
          }
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
        
        /* Scroll Progress Circle – larger touch target on mobile */
        .progress-circle {
          position: fixed;
          bottom: max(20px, 3vh);
          right: max(20px, 3vw);
          width: clamp(50px, 8vw, 80px);
          height: clamp(50px, 8vw, 80px);
          z-index: 100;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        
        .progress-circle:hover {
          transform: scale(1.05);
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
        
        /* Additional small screen optimizations */
        @media (max-width: 480px) {
          .card {
            padding-top: calc(var(--index) * 0.5em); /* reduce stacking offset */
          }
          
          .card__content {
            border-radius: 24px;
          }
          
          @keyframes scale-card {
            to {
              transform: scale(0.9) translateY(-5vh) rotateX(-10deg);
              border-radius: 16px;
            }
          }
        }
        
        /* Landscape orientation fix */
        @media (max-width: 900px) and (orientation: landscape) {
          :root {
            --card-height: 85vh;
            --sticky-top: 5vh;
          }
          .story-header, .end-header {
            min-height: 90vh;
          }
          .card__content p {
            max-width: 70%;
            font-size: 0.9rem;
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
