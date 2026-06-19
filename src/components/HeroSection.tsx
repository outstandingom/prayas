import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// NGO Photos Data - 50 meaningful images showing real impact
const NGO_PHOTOS = [
  // Real NGO photos from ibb.co
  "https://i.ibb.co/vx3hCL1w/IMG-0168.avif",
  "https://i.ibb.co/fdRGxny2/IMG-0236.avif",
  "https://i.ibb.co/NgGSdsmN/IMG-1658.avif",
  "https://i.ibb.co/fzhHbdJr/IMG-0250.avif",
  "https://i.ibb.co/qMsCwRYs/IMG-20191104-162653.jpg",
  "https://i.ibb.co/DDD78cWr/IMG-20241227-132947.jpg",
  "https://i.ibb.co/k63wYXTs/IMG-20250222-122329.jpg",
  "https://i.ibb.co/hxSBSXYX/IMG-0339.avif",
  "https://i.ibb.co/zTK3gdhL/d22833f6-f7be-410d-b7cc-79135da776b9.jpg",
  "https://i.ibb.co/0jXXjMGw/IMG-2199.jpg",
  "https://i.ibb.co/LX58XTfm/0a85ed14-9582-4e56-bc41-5c9e1784ec45.jpg",
  "https://i.ibb.co/7tnXcS54/2f1b8f20-5e95-4b11-b16f-385528a1e0c8.jpg",
  "https://i.ibb.co/jdQP2w5/aa849143-415b-4cf2-a906-862d128af6ff.jpg",
  "https://i.ibb.co/k6Wrqnc2/85233277-c407-43a4-8ea8-dfe661401e54.jpg",
   "https://i.ibb.co/vx3hCL1w/IMG-0168.avif",
  "https://i.ibb.co/fdRGxny2/IMG-0236.avif",
  "https://i.ibb.co/NgGSdsmN/IMG-1658.avif",
  "https://i.ibb.co/fzhHbdJr/IMG-0250.avif",
  "https://i.ibb.co/qMsCwRYs/IMG-20191104-162653.jpg",
  "https://i.ibb.co/DDD78cWr/IMG-20241227-132947.jpg",
  "https://i.ibb.co/k63wYXTs/IMG-20250222-122329.jpg",
  "https://i.ibb.co/hxSBSXYX/IMG-0339.avif",
  "https://i.ibb.co/zTK3gdhL/d22833f6-f7be-410d-b7cc-79135da776b9.jpg",
  "https://i.ibb.co/0jXXjMGw/IMG-2199.jpg",
  "https://i.ibb.co/LX58XTfm/0a85ed14-9582-4e56-bc41-5c9e1784ec45.jpg",
  "https://i.ibb.co/7tnXcS54/2f1b8f20-5e95-4b11-b16f-385528a1e0c8.jpg",
  "https://i.ibb.co/jdQP2w5/aa849143-415b-4cf2-a906-862d128af6ff.jpg",
  "https://i.ibb.co/k6Wrqnc2/85233277-c407-43a4-8ea8-dfe661401e54.jpg",
   "https://i.ibb.co/vx3hCL1w/IMG-0168.avif",
  "https://i.ibb.co/fdRGxny2/IMG-0236.avif",
  "https://i.ibb.co/NgGSdsmN/IMG-1658.avif",
  "https://i.ibb.co/fzhHbdJr/IMG-0250.avif",
  "https://i.ibb.co/qMsCwRYs/IMG-20191104-162653.jpg",
  "https://i.ibb.co/DDD78cWr/IMG-20241227-132947.jpg",
  "https://i.ibb.co/k63wYXTs/IMG-20250222-122329.jpg",
  "https://i.ibb.co/hxSBSXYX/IMG-0339.avif",
  "https://i.ibb.co/zTK3gdhL/d22833f6-f7be-410d-b7cc-79135da776b9.jpg",
  "https://i.ibb.co/0jXXjMGw/IMG-2199.jpg",
  "https://i.ibb.co/LX58XTfm/0a85ed14-9582-4e56-bc41-5c9e1784ec45.jpg",
  "https://i.ibb.co/7tnXcS54/2f1b8f20-5e95-4b11-b16f-385528a1e0c8.jpg",
  "https://i.ibb.co/jdQP2w5/aa849143-415b-4cf2-a906-862d128af6ff.jpg",
  "https://i.ibb.co/k6Wrqnc2/85233277-c407-43a4-8ea8-dfe661401e54.jpg",
];
// Prepare columns data (5 columns, 10 images each)
const columnsData = (() => {
  const columns: string[][] = [[], [], [], [], []]
  NGO_PHOTOS.forEach((img, idx) => {
    const colIdx = idx % 5
    columns[colIdx].push(img)
  })
  return columns
})()

const columnClasses = ["up", "down", "up", "down", "up"]

// 3D Photo Wall Component - Preserving original photo size but scaling the container
const NGOWall3DBackground = () => {
  return (
    <div className="ngo-photo-wall-background">
      <div className="column-wrapper-background">
        <div className="columns-background">
          {columnsData.map((colImages, colIndex) => (
            <div key={colIndex} className={`column-background ${columnClasses[colIndex]}`}>
              {colImages.map((imgUrl, imgIdx) => (
                <div 
                  key={imgIdx} 
                  style={{ backgroundImage: `url(${imgUrl})` }}
                  title="NGO impact in action"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center pt-24 pb-16 overflow-hidden">
      {/* 3D Photo Wall as Full Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <NGOWall3DBackground />
        {/* Lighter overlay that fades toward bottom-right, keeping photos much more visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-[#F1F8F5]/40 to-transparent z-10" />
      </div>
      
      {/* Background decorative effects – Teal and Light Green accents */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00897B]/20 blur-[120px] animate-float-slow pointer-events-none z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#81C784]/20 blur-[100px] animate-float-slower pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-20">
        <div className="max-w-3xl">
          {/* Text Content – Dark Gray (#263238) for text, Teal (#00897B) for accents */}
          <div className="text-[#263238]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00897B]/10 backdrop-blur-sm border border-[#00897B]/30 text-[#00897B] font-bold font-mono text-xs uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#00897B] animate-pulse" />
              Empowering Communities Globally
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
            >
              Together We Can Build A <span className="text-[#00897B]">Better World</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-[#263238]/80 max-w-2xl leading-relaxed font-light"
            >
              We are dedicated to creating sustainable impact through grassroots education, comprehensive healthcare, and community-led environmental initiatives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                to="/donate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00897B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#00695C] transition-all duration-300 shadow-lg shadow-[#00897B]/30 hover:shadow-[#00897B]/50 hover:scale-105"
              >
                Donate Now <Heart size={18} />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-[#00897B] border-2 border-[#00897B]/30 hover:bg-[#00897B]/10 transition-all duration-300 hover:border-[#00897B]/50"
              >
                Get Involved
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CSS styles - Preserving original photo dimensions, scaling the container */}
      <style>{`
        :root {
          --column-height: 300px;
          --image-height: 200px;
          --row-gap: 0.5em;
          --column-gap: 0.25em;
        }

        /* Full screen background 3D wall - scaled down container */
        .ngo-photo-wall-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .column-wrapper-background {
          width: 100%;
          height: 100%;
          perspective: 1000px;
          position: relative;
          overflow: hidden;
          /* Scale down the entire container to show more photos */
          transform: scale(0.7);
        }

        .columns-background {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          transform: rotateX(45deg) rotateY(20deg) rotate(-25deg) translate3d(-6em, 8em, 8em);
          transform-origin: 50%;
          transform-style: preserve-3d;
          mask-image: linear-gradient(
            #0000 0%,
            #00000005 2.3%,
            #00000009 2.57%,
            #00000013 3.65%,
            #00000026 5.25%,
            #0000004d 7.5%,
            #000 30%
          );
        }

        .column-background {
          display: flex;
          flex-direction: column;
          margin-left: var(--column-gap);
          margin-right: var(--column-gap);
        }

        /* Original photo size preserved */
        .column-background div {
          height: 200px;
          margin-bottom: var(--row-gap);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .column-background div:hover {
          transform: scale(1.03);
          filter: brightness(1.08);
        }

        .column-background:nth-child(1) { padding-top: 100px; }
        .column-background:nth-child(2) { padding-top: 50px; }
        .column-background:nth-child(3) { padding-top: 0px; }
        .column-background:nth-child(4) { padding-top: 100px; }
        .column-background:nth-child(5) { padding-top: 50px; }

        .up {
          animation: imageScrollingUp 25s linear infinite alternate;
        }

        .down {
          animation: imageScrollingDown 25s linear infinite alternate;
        }

        @keyframes imageScrollingUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-1 * (((200px + 0.5em) * 10) - 300px))); }
        }

        @keyframes imageScrollingDown {
          0% { transform: translateY(calc(-1 * (((200px + 0.5em) * 10) - 300px))); }
          100% { transform: translateY(0); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 20px) scale(0.96); }
        }
        
        .animate-float-slow {
          animation: float-slow 14s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 18s ease-in-out infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .column-wrapper-background {
            transform: scale(0.9);
          }
        }
        
        @media (max-width: 768px) {
          .column-wrapper-background {
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  )
}
