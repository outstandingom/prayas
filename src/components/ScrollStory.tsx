import { motion } from 'framer-motion'

const stories = [
  {
    number: "01",
    title: "From Remote Villages",
    description: "From the remote villages of rural India to bustling urban slums, our dedicated team of volunteers works tirelessly to bring education, healthcare, and livelihood opportunities to those who need them most.",
    bgColor: "#ff2a6d",
    textColor: "#fff"
  },
  {
    number: "02",
    title: "Access Creates Change",
    description: "We believe that true empowerment begins with access. Access to a classroom. Access to clean drinking water. Access to a doctor who understands. By addressing these foundational needs, we create a ripple effect of change that lifts entire communities.",
    bgColor: "#05d9e8",
    textColor: "#000"
  },
  {
    number: "03",
    title: "Environmental Impact",
    description: "Over the last decade, our focus has expanded to include critical environmental interventions. Through grassroots awareness and direct action, we are planting trees, cleaning waterways, and teaching the next generation to be stewards of the earth.",
    bgColor: "#ffe600",
    textColor: "#000"
  },
  {
    number: "04",
    title: "Building Resilience",
    description: "We don't just build infrastructure; we build resilience. By partnering with local leaders and training community members, we ensure that every initiative we start is sustainable long after we leave. This is not charity—this is partnership.",
    bgColor: "#fafac6",
    textColor: "#000"
  }
]

export default function ScrollStory() {
  return (
    <>
      <section className="relative bg-black text-white overflow-hidden">
        {/* Header Section */}
        <header className="h-[80vh] flex items-center justify-center relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="text-emerald font-mono text-xs uppercase tracking-widest font-semibold">Our Journey</span>
            </motion.div>
            <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.8]">
              Beautiful<br />Modern<br />Impact
            </h1>
          </div>
        </header>

        {/* Stacking Cards Section */}
        <ul id="cards" className="relative z-20">
          {stories.map((story, index) => (
            <li 
              key={index} 
              className="card"
              style={{ 
                '--index': index + 1,
                '--card-height': '40vw',
                '--card-margin': '4vw',
                '--card-top-offset': '1em',
                '--shadow-color': `${story.bgColor}cc`
              } as React.CSSProperties}
            >
              <div 
                className="card__content"
                style={{
                  background: story.bgColor,
                  color: story.textColor,
                  '--shadow-color': story.bgColor
                } as React.CSSProperties}
              >
                <span className="number">{story.number}</span>
                <h2>{story.title}</h2>
                <p>{story.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* End Section */}
        <header className="h-[50vh] flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold uppercase">The Journey<br />Continues</h1>
        </header>
      </section>

      {/* Styles for the stacking cards effect */}
      <style>{`
        :root {
          --card-height: 40vw;
          --card-margin: 4vw;
          --card-top-offset: 1em;
        }

        .hero-title {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
          color: transparent;
          background: linear-gradient(to bottom, #fff 0%, transparent 100%);
          background-clip: text;
          -webkit-background-clip: text;
          animation: fill-text linear both;
          animation-timeline: scroll();
          animation-range: 0 50vh;
        }

        @keyframes fill-text {
          to {
            -webkit-text-stroke: 0;
            color: #fff;
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
          position: relative;
          z-index: 20;
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
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          transform-origin: 50% 0%;
          will-change: transform, filter;
          transform-style: preserve-3d;
          animation: scale-card linear forwards;
          animation-timeline: view();
          animation-range: exit-crossing 0% exit-crossing 100%;
          position: relative;
        }

        @keyframes scale-card {
          to {
            transform: scale(0.8) translateY(-10vh) rotateX(-20deg);
            filter: brightness(0.6);
            border-radius: 20px;
            box-shadow: 0 50px 80px -10px var(--shadow-color);
          }
        }

        .card__content h2 {
          font-size: clamp(2rem, 4vw, 4rem);
          margin: 0;
          font-weight: bold;
        }

        .card__content p {
          font-size: clamp(1rem, 1.5vw, 1.5rem);
          max-width: 600px;
          line-height: 1.4;
          opacity: 0.9;
          margin-top: 1rem;
        }

        .number {
          font-size: clamp(5rem, 10vw, 10rem);
          position: absolute;
          right: 2rem;
          top: -2rem;
          opacity: 0.3;
          font-weight: bold;
          pointer-events: none;
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
