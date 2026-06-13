import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// NGO Photos Data - 50 meaningful images showing real impact
const NGO_PHOTOS = [
  "https://images.pexels.com/photos/6646959/pexels-photo-6646959.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/2363800/pexels-photo-2363800.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7402453/pexels-photo-7402453.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/6994660/pexels-photo-6994660.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/3192815/pexels-photo-3192815.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/6646915/pexels-photo-6646915.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/5698569/pexels-photo-5698569.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4483324/pexels-photo-4483324.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/6646884/pexels-photo-6646884.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4386365/pexels-photo-4386365.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/3985221/pexels-photo-3985221.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/2387795/pexels-photo-2387795.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/3192819/pexels-photo-3192819.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/6646949/pexels-photo-6646949.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4262939/pexels-photo-4262939.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7610704/pexels-photo-7610704.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7109863/pexels-photo-7109863.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/3772667/pexels-photo-3772667.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/8498305/pexels-photo-8498305.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4145192/pexels-photo-4145192.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/8531304/pexels-photo-8531304.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/6646970/pexels-photo-6646970.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4577808/pexels-photo-4577808.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7925426/pexels-photo-7925426.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/6889372/pexels-photo-6889372.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/8618175/pexels-photo-8618175.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/5673501/pexels-photo-5673501.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/5202401/pexels-photo-5202401.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7536565/pexels-photo-7536565.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/3772687/pexels-photo-3772687.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/5699463/pexels-photo-5699463.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7092446/pexels-photo-7092446.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4145357/pexels-photo-4145357.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/8499459/pexels-photo-8499459.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7041675/pexels-photo-7041675.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7655078/pexels-photo-7655078.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4130114/pexels-photo-4130114.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/6646945/pexels-photo-6646945.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/6460436/pexels-photo-6460436.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/3912791/pexels-photo-3912791.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7549982/pexels-photo-7549982.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7680444/pexels-photo-7680444.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/3671392/pexels-photo-3671392.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/4398099/pexels-photo-4398099.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/7655631/pexels-photo-7655631.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  "https://images.pexels.com/photos/8580725/pexels-photo-8580725.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
]

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

// 3D Photo Wall Component
const NGOWall3D = () => {
  return (
    <div className="ngo-photo-wall">
      <div className="column-wrapper">
        <div className="columns">
          {columnsData.map((colImages, colIndex) => (
            <div key={colIndex} className={`column ${columnClasses[colIndex]}`}>
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
      {/* Full screen video background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.pexels.com/photos/6646915/pexels-photo-6646915.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        >
          <source 
            src="https://player.vimeo.com/external/434045862.sd.mp4?s=c27ecc32c1ce7ed4c0f69bf62f4a6dbf0b0d2b2f&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
          {/* Fallback video source - inspirational NGO style */}
          <source 
            src="https://cdn.pixabay.com/video/2022/02/27/108938-683898099_large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/85 via-emerald-800/75 to-navy-900/85 z-10" />
      </div>
      
      {/* Background decorative effects */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[120px] animate-float-slow pointer-events-none z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gold-500/20 blur-[100px] animate-float-slower pointer-events-none z-10" />
      <div className="absolute top-[50%] left-[30%] w-[300px] h-[300px] rounded-full bg-emerald-400/10 blur-[80px] animate-float-slow pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content with improved contrast */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold font-mono text-xs uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Empowering Communities Globally
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
            >
              Together We Can Build A <span className="text-emerald-300">Better World</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-light"
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
              >
                Donate Now <Heart size={18} />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300 hover:border-white/50"
              >
                Get Involved
              </Link>
            </motion.div>
          </div>

          {/* Right side - 3D Photo Wall */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex justify-center items-center"
          >
            <NGOWall3D />
          </motion.div>
        </div>
      </div>

      {/* Add required CSS styles for 3D wall and animations */}
      <style>{`
        :root {
          --column-height: 300px;
          --image-height: 200px;
          --row-gap: 0.5em;
          --column-gap: 0.25em;
        }

        .ngo-photo-wall {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .column-wrapper {
          width: 700px;
          height: 300px;
          perspective: 1000px;
          position: relative;
          margin: 0 auto;
          overflow: clip;
        }

        .columns {
          position: absolute;
          width: 175%;
          top: -300px;
          right: -700px;
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
            #000 15%
          );
        }

        .column {
          display: flex;
          flex-direction: column;
          margin-left: var(--column-gap);
          margin-right: var(--column-gap);
        }

        .column div {
          height: 200px;
          margin-bottom: var(--row-gap);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .column div:hover {
          transform: scale(1.03);
          filter: brightness(1.08);
        }

        .column:nth-child(1) { padding-top: 100px; }
        .column:nth-child(2) { padding-top: 50px; }
        .column:nth-child(3) { padding-top: 0px; }
        .column:nth-child(4) { padding-top: 100px; }
        .column:nth-child(5) { padding-top: 50px; }

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

        @media (max-width: 1024px) {
          .column-wrapper {
            transform: scale(0.8);
          }
        }
      `}</style>
    </section>
  )
}
