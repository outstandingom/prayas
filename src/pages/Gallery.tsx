import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Image assets with stories
interface StoryItem {
  src: string
  title: string
  story: string
  name: string
  location: string
}

const galleryItemsWithStories: StoryItem[] = [
  { 
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500", 
    title: "Education for All", 
    story: "Meet Priya, a 12-year-old girl from a remote village in Rajasthan. Through our education program, she learned to read and write. Today, she dreams of becoming a doctor and serving her community.",
    name: "Priya Sharma",
    location: "Rajasthan, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500", 
    title: "Healthcare Heroes", 
    story: "Dr. Rajesh Kumar has been running free health camps in slum areas for 5 years. He has treated over 10,000 patients and provided life-saving medicines to those who cannot afford them.",
    name: "Dr. Rajesh Kumar",
    location: "Mumbai, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=500", 
    title: "Women Empowerment", 
    story: "Sunita Devi started her own tailoring business after completing our skill development program. She now employs 15 women from her village and is financially independent.",
    name: "Sunita Devi",
    location: "Uttar Pradesh, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=500", 
    title: "Clean Water Initiative", 
    story: "Thanks to our clean water project, the village of Budhpur now has access to safe drinking water. Water-borne diseases have reduced by 80% in the last year.",
    name: "Village Community",
    location: "Madhya Pradesh, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500", 
    title: "Green Earth Project", 
    story: "Ramesh and his team of volunteers have planted over 50,000 trees across deforested areas. Their efforts are restoring natural habitats and fighting climate change.",
    name: "Ramesh Patel",
    location: "Kerala, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=500", 
    title: "Urban Development", 
    story: "The slum of Dharavi now has proper sanitation facilities and community centers thanks to our urban development program, benefiting over 5,000 families.",
    name: "Community Leaders",
    location: "Mumbai, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=500", 
    title: "Special Needs Care", 
    story: "Arjun, a child with autism, found hope through our special needs program. He now attends school regularly and has shown remarkable progress in communication.",
    name: "Arjun & Family",
    location: "Delhi, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500", 
    title: "Cultural Preservation", 
    story: "We helped local artisans preserve traditional crafts by connecting them with global markets. Their income has tripled, and ancient art forms are thriving again.",
    name: "Artisan Collective",
    location: "Gujarat, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=500", 
    title: "Sports for Change", 
    story: "Through our sports program, underprivileged youth are finding purpose and discipline. Many have gone on to represent their states in national competitions.",
    name: "Young Athletes",
    location: "Punjab, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1552697664-1505303c2bb6?w=500", 
    title: "Mental Health Support", 
    story: "Our counseling center has helped over 1,000 individuals dealing with depression and anxiety. Free therapy sessions are changing lives every day.",
    name: "Mental Health Team",
    location: "Bangalore, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500", 
    title: "Disaster Relief", 
    story: "When floods hit Assam, our team reached affected areas within 24 hours, providing food, shelter, and medical aid to over 2,000 families.",
    name: "Relief Workers",
    location: "Assam, India"
  },
  { 
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=500", 
    title: "Global Partnership", 
    story: "Collaborating with international NGOs, we've brought sustainable farming techniques to 100 villages, increasing crop yields by 200%.",
    name: "Farming Communities",
    location: "Multiple States, India"
  }
]

// Duplicate for dense sphere
const galleryItems: StoryItem[] = [...galleryItemsWithStories, ...galleryItemsWithStories, ...galleryItemsWithStories].slice(0, 36)

export default function Stories() {
  const sphereRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Build sphere on mount
  useEffect(() => {
    if (!sphereRef.current) return

    const radius = window.innerWidth < 768 ? 250 : 450
    const items = galleryItems
    const sphere = sphereRef.current
    sphere.innerHTML = ''

    items.forEach((item, i) => {
      const card = document.createElement('div')
      card.className = 'clay-card'

      const img = document.createElement('img')
      img.src = item.src
      img.alt = item.title
      card.appendChild(img)

      // Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / items.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)

      // Calculate rotation to face outward
      const rotY = Math.atan2(x, z) * (180 / Math.PI)
      const rotX = Math.asin(-y / radius) * (180 / Math.PI)

      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`
      
      // Add click handler
      card.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation()
        setSelectedStory(item)
        setIsModalOpen(true)
      })

      sphere.appendChild(card)
    })

    // GSAP animation
    const tl = gsap.to(sphere, {
      rotateY: 720,
      rotateX: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill())
    }
  }, [])

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedStory(null)
  }

  return (
    <>
      <div className="stories-page" ref={containerRef}>
        <div className="grid-overlay"></div>

        {/* Hero Section */}
        <header className="hero">
          <div className="badge chunky-badge">✦ Our Impact Stories</div>
          <h1>Capturing Moments, Transforming Lives</h1>
          <p>Every image tells a story of hope, resilience, and change. Click on any photo to read the inspiring journey behind it.</p>
        </header>

        {/* 3D Sphere Gallery */}
        <section className="gallery-container">
          <div className="scene">
            <div className="sphere" ref={sphereRef}></div>
          </div>
          <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
            <path d="M20,0 L80,100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.2" fill="none" />
          </svg>
        </section>

        {/* Journey Section */}
        <section className="journey-section">
          <div className="constellation" id="constellation"></div>
          <div className="journey-content">
            <h2>Start Your Journey</h2>
            <p>Join us in creating more stories of impact and transformation</p>
            <a href="/donate" className="btn chunky-btn large-btn">Support a Story</a>
          </div>
        </section>
      </div>

      {/* Story Modal */}
      {isModalOpen && selectedStory && (
        <div className="story-modal-overlay" onClick={closeModal}>
          <div className="story-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedStory.src} alt={selectedStory.title} />
            </div>
            <div className="modal-content">
              <span className="modal-badge">Impact Story</span>
              <h2>{selectedStory.title}</h2>
              <p className="modal-story">{selectedStory.story}</p>
              <div className="modal-footer">
                <div className="person-info">
                  <strong>{selectedStory.name}</strong>
                  <span>{selectedStory.location}</span>
                </div>
                <button className="btn chunky-btn" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --bg-dark: #0a0a0b;
          --text-main: #f4f4f5;
          --text-muted: #a1a1aa;
          --clay-base: #18181b;
          --clay-highlight: rgba(255, 255, 255, 0.08);
          --clay-shadow: rgba(0, 0, 0, 0.9);
          --clay-inset-light: rgba(255, 255, 255, 0.04);
          --clay-inset-dark: rgba(0, 0, 0, 0.6);
        }

        .stories-page {
          background-color: var(--bg-dark);
          color: var(--text-main);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          overflow-x: hidden;
          line-height: 1.5;
          min-height: 100vh;
        }

        .grid-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .hero {
          padding: 8rem 2rem 4rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .chunky-badge {
          background: var(--clay-base);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          color: var(--text-muted);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 4px 4px 8px var(--clay-shadow),
                      inset 2px 2px 4px var(--clay-inset-light),
                      inset -2px -2px 4px var(--clay-inset-dark);
        }

        .hero h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          max-width: 800px;
          font-weight: 500;
          letter-spacing: -0.03em;
        }

        .hero p {
          color: var(--text-muted);
          max-width: 600px;
        }

        .gallery-container {
          position: relative;
          height: 300vh;
          width: 100%;
        }

        .scene {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          overflow: hidden;
        }

        .sphere {
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
        }

        .clay-card {
          position: absolute;
          width: 160px;
          height: 220px;
          left: -80px;
          top: -110px;
          background: var(--clay-base);
          border-radius: 16px;
          padding: 8px;
          transform-style: preserve-3d;
          backface-visibility: visible;
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 8px 8px 16px var(--clay-shadow),
                      -4px -4px 10px rgba(255,255,255,0.02),
                      inset 3px 3px 6px var(--clay-inset-light),
                      inset -3px -3px 6px var(--clay-inset-dark);
          transition: filter 0.3s ease, transform 0.2s ease;
          cursor: pointer;
        }

        .clay-card:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .clay-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          filter: grayscale(50%) brightness(0.7);
          transition: all 0.3s ease;
        }

        .clay-card:hover img {
          filter: grayscale(0%) brightness(1);
        }

        .network-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .journey-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: radial-gradient(circle at center, #111113 0%, var(--bg-dark) 70%);
        }

        .journey-content {
          text-align: center;
          z-index: 2;
          background: rgba(10,10,11,0.6);
          padding: 3rem;
          border-radius: 24px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .journey-content h2 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .journey-content p {
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .constellation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .btn {
          padding: 0.6rem 1.2rem;
          border-radius: 30px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          color: var(--bg-dark);
          background: var(--text-main);
          transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
          text-decoration: none;
          display: inline-block;
        }

        .chunky-btn {
          box-shadow: 0px 4px 0px rgba(161,161,170,0.4),
                      0px 6px 10px rgba(0,0,0,0.4),
                      inset 0px -2px 5px rgba(0,0,0,0.1),
                      inset 0px 2px 5px rgba(255,255,255,0.8);
        }

        .chunky-btn:active {
          transform: translateY(4px);
          box-shadow: 0px 0px 0px rgba(161,161,170,0.4),
                      0px 2px 5px rgba(0,0,0,0.4);
        }

        .large-btn {
          font-size: 1.1rem;
          padding: 1rem 2.5rem;
          border-radius: 40px;
        }

        /* Modal Styles */
        .story-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.3s ease;
        }

        .story-modal {
          background: var(--clay-base);
          border-radius: 24px;
          max-width: 900px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          display: flex;
          flex-direction: row;
          position: relative;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          animation: slideUp 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 20px;
          background: rgba(0,0,0,0.5);
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }

        .modal-close:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.1);
        }

        .modal-image {
          flex: 1;
          min-width: 300px;
          overflow: hidden;
          border-radius: 24px 0 0 24px;
        }

        .modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-content {
          flex: 1.5;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-badge {
          background: var(--clay-shadow);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          color: var(--text-muted);
          display: inline-block;
          width: fit-content;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .modal-content h2 {
          font-size: 1.8rem;
          margin: 0;
        }

        .modal-story {
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        .modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .person-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .person-info strong {
          color: var(--text-main);
        }

        .person-info span {
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .clay-card {
            width: 120px;
            height: 160px;
            left: -60px;
            top: -80px;
          }
          
          .story-modal {
            flex-direction: column;
            max-height: 90vh;
          }
          
          .modal-image {
            min-width: auto;
            height: 250px;
            border-radius: 24px 24px 0 0;
          }
          
          .modal-content {
            padding: 1.5rem;
          }
          
          .modal-content h2 {
            font-size: 1.4rem;
          }
          
          .journey-content h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  )
}
