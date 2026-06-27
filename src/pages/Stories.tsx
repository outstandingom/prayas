// src/components/Stories.tsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase } from '@/lib/supabase'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface StoryItem {
  id: string
  image_url: string
  title: string
  story: string
  name: string
  location: string
  display_order: number
  is_active: boolean
}

export default function Stories() {
  const sphereRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stories, setStories] = useState<StoryItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch stories from Supabase
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (error) {
          console.error('Error fetching stories:', error)
          return
        }

        setStories(data || [])
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  // Build sphere when stories are loaded
  useEffect(() => {
    if (!sphereRef.current || stories.length === 0) return

    // Duplicate for dense sphere (36 items for full sphere)
    const items = [...stories, ...stories, ...stories].slice(0, 36)

    const radius = window.innerWidth < 768 ? 280 : 480
    const sphere = sphereRef.current
    sphere.innerHTML = ''

    items.forEach((item, i) => {
      const card = document.createElement('div')
      card.className = 'clay-card'

      const img = document.createElement('img')
      img.src = item.image_url
      img.alt = item.title
      img.loading = 'lazy'
      card.appendChild(img)

      // Fibonacci sphere distribution for even spacing
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

    // GSAP animation for sphere rotation on scroll
    const tl = gsap.to(sphere, {
      rotateY: 720,
      rotateX: 25,
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
  }, [stories])

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedStory(null)
  }

  if (loading) {
    return (
      <div className="stories-page" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ color: '#4a4a6a' }}>Loading stories...</p>
        </div>
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div className="stories-page" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="text-center">
          <p style={{ color: '#4a4a6a' }}>No stories available yet.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="stories-page" ref={containerRef}>
        {/* Hero Section */}
        <header className="hero">
          <div className="badge trust-badge">✦ Trust & Transparency</div>
          <h1>Real Stories, Real Impact</h1>
          <p>Every image tells a story of hope and transformation. Click on any photo to read the inspiring journey.</p>
        </header>

        {/* 3D Sphere Gallery */}
        <section className="gallery-container">
          <div className="scene">
            <div className="sphere" ref={sphereRef}></div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="trust-section">
          <div className="trust-content">
            <h2>Built on Trust</h2>
            <p>100% of your donation goes directly to those in need</p>
            <div className="trust-stats">
              <div className="stat">
                <span className="stat-number">92%</span>
                <span className="stat-label">Program Efficiency</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Lives Impacted</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years of Service</span>
              </div>
            </div>
            <a href="/donate" className="btn trust-btn large-btn">Support a Story →</a>
          </div>
        </section>
      </div>

      {/* Story Modal */}
      {isModalOpen && selectedStory && (
        <div className="story-modal-overlay" onClick={closeModal}>
          <div className="story-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedStory.image_url} alt={selectedStory.title} />
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
                <button className="btn trust-btn" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --trust-yellow: #FFD700;
          --trust-yellow-light: #FFF8DC;
          --trust-yellow-dark: #DAA520;
          --trust-orange: #FFA500;
          --text-dark: #1a1a2e;
          --text-muted: #4a4a6a;
          --clay-base: #ffffff;
          --clay-shadow: rgba(0, 0, 0, 0.15);
          --clay-inset-light: rgba(255, 255, 255, 0.8);
          --clay-inset-dark: rgba(0, 0, 0, 0.05);
        }

        .stories-page {
          background: linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 50%, #FFD700 100%);
          color: var(--text-dark);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          overflow-x: hidden;
          line-height: 1.5;
          min-height: 100vh;
        }

        /* Hero Section – increased bottom padding */
        .hero {
          padding: 8rem 2rem 10rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .trust-badge {
          background: rgba(255, 215, 0, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #8B6914;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(218, 165, 32, 0.3);
        }

        .hero h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          max-width: 800px;
          font-weight: 700;
          color: #1a1a2e;
          letter-spacing: -0.02em;
        }

        .hero p {
          color: #4a4a6a;
          max-width: 600px;
          font-size: 1.1rem;
        }

        /* 3D Sphere Gallery */
        .gallery-container {
          position: relative;
          height: 250vh;
          width: 100%;
          margin-top: 5rem;
        }

        .scene {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
          overflow: visible;
          transform: translateY(10%);
        }

        .sphere {
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
        }

        /* Clay Cards */
        .clay-card {
          position: absolute;
          width: 180px;
          height: 240px;
          left: -90px;
          top: -120px;
          background: var(--clay-base);
          border-radius: 20px;
          padding: 10px;
          transform-style: preserve-3d;
          backface-visibility: visible;
          border: 1px solid rgba(218, 165, 32, 0.2);
          box-shadow: 10px 10px 20px var(--clay-shadow),
                      -5px -5px 12px var(--clay-inset-light),
                      inset 2px 2px 4px var(--clay-inset-light),
                      inset -2px -2px 4px var(--clay-inset-dark);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .clay-card:hover {
          transform: scale(1.08);
          filter: brightness(1.05);
          box-shadow: 15px 15px 25px var(--clay-shadow);
          border-color: var(--trust-yellow);
        }

        .clay-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 14px;
          transition: all 0.3s ease;
        }

        .clay-card:hover img {
          filter: brightness(1.02);
        }

        /* Trust Section */
        .trust-section {
          position: relative;
          min-height: 80vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        }

        .trust-content {
          text-align: center;
          background: rgba(255, 255, 255, 0.95);
          padding: 3rem;
          border-radius: 32px;
          max-width: 800px;
          margin: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .trust-content h2 {
          font-size: 2.5rem;
          color: #1a1a2e;
          margin-bottom: 1rem;
        }

        .trust-content p {
          color: #4a4a6a;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .trust-stats {
          display: flex;
          justify-content: space-around;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: #FFA500;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #4a4a6a;
        }

        .btn {
          padding: 0.8rem 1.8rem;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }

        .trust-btn {
          background: #FFA500;
          color: white;
          box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
        }

        .trust-btn:hover {
          background: #FF8C00;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 165, 0, 0.4);
        }

        .large-btn {
          font-size: 1.1rem;
          padding: 1rem 2.5rem;
        }

        /* Modal Styles */
        .story-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.3s ease;
        }

        .story-modal {
          background: white;
          border-radius: 28px;
          max-width: 900px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          display: flex;
          flex-direction: row;
          position: relative;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
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
          background: rgba(0, 0, 0, 0.6);
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }

        .modal-close:hover {
          background: #FFA500;
          transform: scale(1.1);
        }

        .modal-image {
          flex: 1;
          min-width: 300px;
          overflow: hidden;
          border-radius: 28px 0 0 28px;
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
          background: #FFF8DC;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #FFA500;
          display: inline-block;
          width: fit-content;
        }

        .modal-content h2 {
          font-size: 1.8rem;
          margin: 0;
          color: #1a1a2e;
        }

        .modal-story {
          color: #4a4a6a;
          line-height: 1.6;
          margin: 0;
        }

        .modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .person-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .person-info strong {
          color: #1a1a2e;
        }

        .person-info span {
          color: #4a4a6a;
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 6rem 1.5rem 6rem;
          }

          .gallery-container {
            margin-top: 2rem;
          }

          .clay-card {
            width: 130px;
            height: 170px;
            left: -65px;
            top: -85px;
          }
          
          .story-modal {
            flex-direction: column;
            max-height: 90vh;
          }
          
          .modal-image {
            min-width: auto;
            height: 220px;
            border-radius: 28px 28px 0 0;
          }
          
          .modal-content {
            padding: 1.5rem;
          }
          
          .modal-content h2 {
            font-size: 1.4rem;
          }
          
          .trust-stats {
            gap: 1rem;
          }
          
          .stat-number {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  )
}
