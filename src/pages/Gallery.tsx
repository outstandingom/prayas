import { useEffect, useRef, useCallback } from 'react'

// NGO Impact Images for Gallery - Replace with your actual NGO photos
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1000",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1000",
  "https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=1000",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000",
  "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=1000",
  "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1000",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000",
  "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1000",
  "https://images.unsplash.com/photo-1552697664-1505303c2bb6?w=1000",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000",
  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1000",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1000",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1000",
  "https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=1000",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000",
  "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=1000",
  "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1000",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1000",
  "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1000",
  "https://images.unsplash.com/photo-1552697664-1505303c2bb6?w=1000",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000",
  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1000"
]

const CLONE_COUNT = 3
const SNAP_ENABLED = true
const SNAP_DELAY = 300
const SNAP_STRENGTH = 0.08
const INERTIA_DAMPING = 0.92
const SCROLL_SMOOTHING = 0.15

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const imagesRef = useRef<HTMLImageElement[]>([])
  
  // Animation state
  const targetScroll = useRef<number>(0)
  const currentScroll = useRef<number>(0)
  const velocity = useRef<number>(0)
  const isDragging = useRef<boolean>(false)
  const isLooping = useRef<boolean>(false)
  const offsets = useRef<number[]>([])
  
  // Cache for calculations
  const cachedContainerCenter = useRef<number>(window.innerWidth / 2)
  const cachedItemsCenters = useRef<number[]>([])
  const cachedItemsBounds = useRef<DOMRect[]>([])
  
  let snapTimeout: ReturnType<typeof setTimeout> | null = null
  const originalSetSize = GALLERY_IMAGES.length

  // Build infinite gallery
  const buildGallery = useCallback(() => {
    if (!galleryRef.current) return
    
    galleryRef.current.innerHTML = ''
    itemsRef.current = []
    imagesRef.current = []
    
    for (let c = 0; c < CLONE_COUNT; c++) {
      GALLERY_IMAGES.forEach((src, index) => {
        const item = document.createElement('div')
        item.className = 'gallery-item'
        
        const img = document.createElement('img')
        img.src = src
        img.alt = 'Gallery Image ' + (index + 1)
        img.loading = 'eager'
        
        item.appendChild(img)
        if (galleryRef.current) {
          galleryRef.current.appendChild(item)
        }
        
        itemsRef.current.push(item)
        imagesRef.current.push(img)
      })
    }
    
    offsets.current = new Array(imagesRef.current.length).fill(0)
  }, [])

  // Get width of one set of original images
  const getOriginalSetWidth = useCallback(() => {
    if (itemsRef.current.length === 0) return 0
    const firstRect = itemsRef.current[0].getBoundingClientRect()
    const lastRect = itemsRef.current[originalSetSize - 1].getBoundingClientRect()
    return (lastRect.right - firstRect.left) + 15
  }, [originalSetSize])

  // Update cached item centers
  const updateItemsCenters = useCallback(() => {
    if (!galleryRef.current) return
    for (let i = 0; i < itemsRef.current.length; i++) {
      const rect = itemsRef.current[i].getBoundingClientRect()
      cachedItemsCenters.current[i] = rect.left + rect.width / 2
      cachedItemsBounds.current[i] = rect
    }
  }, [])

  // Handle infinite scroll looping
  const handleInfiniteScroll = useCallback(() => {
    if (!galleryRef.current || isLooping.current) return
    
    const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth
    const setWidth = getOriginalSetWidth()
    const threshold = setWidth * 0.3
    
    if (targetScroll.current > maxScroll - threshold && !isLooping.current) {
      isLooping.current = true
      const newScroll = targetScroll.current - setWidth
      targetScroll.current = newScroll
      currentScroll.current = newScroll
      galleryRef.current.scrollLeft = currentScroll.current
      requestAnimationFrame(() => { isLooping.current = false })
    } else if (targetScroll.current < threshold && !isLooping.current) {
      isLooping.current = true
      const newScroll = targetScroll.current + setWidth
      targetScroll.current = newScroll
      currentScroll.current = newScroll
      galleryRef.current.scrollLeft = currentScroll.current
      requestAnimationFrame(() => { isLooping.current = false })
    }
  }, [getOriginalSetWidth])

  // Trigger snap to nearest item
  const triggerSnap = useCallback(() => {
    if (!SNAP_ENABLED) return
    
    if (snapTimeout) clearTimeout(snapTimeout)
    snapTimeout = setTimeout(() => {
      if (Math.abs(velocity.current) > 0.5) return
      
      updateItemsCenters()
      const containerCenter = window.innerWidth / 2
      let closest = 0
      let minDist = Infinity
      
      for (let i = 0; i < itemsRef.current.length; i++) {
        const dist = Math.abs(containerCenter - cachedItemsCenters.current[i])
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      }
      
      const targetItem = itemsRef.current[closest]
      const rect = targetItem.getBoundingClientRect()
      const targetPosition = targetScroll.current + (rect.left + rect.width / 2 - containerCenter)
      if (galleryRef.current) {
        const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth
        let newTarget = Math.max(0, Math.min(targetPosition, maxScroll))
        const snapVelocity = (newTarget - targetScroll.current) * SNAP_STRENGTH
        velocity.current += snapVelocity
      }
    }, SNAP_DELAY)
  }, [updateItemsCenters])

  // Reset snap timer
  const resetSnap = useCallback(() => {
    if (snapTimeout) clearTimeout(snapTimeout)
    if (SNAP_ENABLED) {
      snapTimeout = setTimeout(triggerSnap, SNAP_DELAY)
    }
  }, [triggerSnap])

  // Lerp function for smooth interpolation
  const lerp = (start: number, end: number, amt: number) => {
    return start + (end - start) * amt
  }

  // Animation loop
  const animate = useCallback(() => {
    if (!galleryRef.current) return
    
    if (!isDragging.current) {
      targetScroll.current += velocity.current
      velocity.current *= INERTIA_DAMPING
      if (Math.abs(velocity.current) < 0.05) velocity.current = 0
    }
    
    const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth
    targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll))
    
    handleInfiniteScroll()
    
    currentScroll.current = lerp(currentScroll.current, targetScroll.current, SCROLL_SMOOTHING)
    galleryRef.current.scrollLeft = currentScroll.current
    
    updateItemsCenters()
    
    // Apply parallax effect to images
    for (let i = 0; i < imagesRef.current.length; i++) {
      let offset = (cachedContainerCenter.current - cachedItemsCenters.current[i]) / 6
      offset = Math.max(-80, Math.min(80, offset))
      offsets.current[i] = lerp(offsets.current[i], offset, 0.12)
      if (imagesRef.current[i]) {
        imagesRef.current[i].style.transform = 'translate(calc(-50% + ' + offsets.current[i].toFixed(1) + 'px), -50%)'
      }
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }, [handleInfiniteScroll, updateItemsCenters, lerp])

  // Wheel event handler
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    let delta = e.deltaY
    if (Math.abs(delta) > 100) delta = delta * 0.5
    if (Math.abs(delta) < 20) delta = delta * 1.5
    velocity.current += delta * 0.6
    resetSnap()
  }, [resetSnap])

  // Pointer events for drag
  const handlePointerDown = useCallback((e: PointerEvent) => {
    isDragging.current = true
    const startX = e.clientX
    const startScroll = targetScroll.current
    let lastMoveX = e.clientX
    let lastMoveTime = Date.now()
    
    if (snapTimeout) clearTimeout(snapTimeout)
    if (galleryRef.current) galleryRef.current.style.cursor = 'grabbing'
    
    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!isDragging.current) return
      moveEvent.preventDefault()
      
      const now = Date.now()
      const dx = startX - moveEvent.clientX
      let newScroll = startScroll + dx
      if (galleryRef.current) {
        const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth
        newScroll = Math.max(0, Math.min(newScroll, maxScroll))
      }
      
      targetScroll.current = newScroll
      currentScroll.current = newScroll
      if (galleryRef.current) galleryRef.current.scrollLeft = currentScroll.current
      
      const timeDiff = now - lastMoveTime
      if (timeDiff > 0 && timeDiff < 100) {
        const moveDelta = lastMoveX - moveEvent.clientX
        velocity.current = moveDelta / timeDiff * 8
      }
      
      lastMoveX = moveEvent.clientX
      lastMoveTime = now
    }
    
    const handlePointerUp = () => {
      isDragging.current = false
      if (galleryRef.current) galleryRef.current.style.cursor = 'grab'
      triggerSnap()
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
    }
    
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
  }, [triggerSnap])

  // Resize handler
  const handleResize = useCallback(() => {
    cachedContainerCenter.current = window.innerWidth / 2
    updateItemsCenters()
    if (galleryRef.current) {
      const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth
      targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll))
      currentScroll.current = targetScroll.current
      galleryRef.current.scrollLeft = currentScroll.current
    }
  }, [updateItemsCenters])

  // Initialize
  useEffect(() => {
    buildGallery()
    updateItemsCenters()
    cachedContainerCenter.current = window.innerWidth / 2
    
    // Preload images
    GALLERY_IMAGES.forEach(src => {
      const img = new Image()
      img.src = src
    })
    
    // Set up event listeners
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', handleResize)
    
    if (galleryRef.current) {
      galleryRef.current.addEventListener('pointerdown', handlePointerDown)
      galleryRef.current.style.cursor = 'grab'
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
      if (galleryRef.current) {
        galleryRef.current.removeEventListener('pointerdown', handlePointerDown)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (snapTimeout) clearTimeout(snapTimeout)
    }
  }, [buildGallery, updateItemsCenters, handleWheel, handleResize, handlePointerDown, animate])

  return (
    <div className="gallery-page" style={{ paddingTop: '80px' }}>
      <div className="title">OUR<br />GALLERY</div>
      <div className="page-wrapper">
        <div className="gallery-container" ref={galleryRef}></div>
      </div>
      <div className="sub-title">horizontal parallax gallery</div>
      <div id="ui" className="hint">
        Drag or scroll → Explore our impact moments
      </div>
      <div className="copy">&copy; Prayas Samaj Sevi Sanstha</div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');
        
        .gallery-page {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #0B2E63 0%, #1a4a7a 100%);
          overflow-x: hidden;
          position: relative;
          width: 100%;
          min-height: 100vh;
        }
        
        /* Ensure navbar is visible - don't cover it */
        .gallery-page::before {
          display: none;
        }
        
        .title {
          font-family: "Limelight", sans-serif;
          font-weight: 400;
          position: absolute;
          right: 40px;
          top: 100px;
          z-index: 10;
          padding: 8px;
          border-radius: 8px;
          opacity: 0.95;
          font-size: clamp(2rem, 8vw, 6rem);
          color: #fff;
          pointer-events: none;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          line-height: 1;
          text-align: right;
        }
        
        .sub-title {
          position: fixed;
          font-family: "Limelight", sans-serif;
          font-weight: 200;
          bottom: 100px;
          left: 40px;
          z-index: 10;
          padding: 8px;
          border-radius: 8px;
          opacity: 0.85;
          font-size: clamp(1rem, 3vw, 2rem);
          color: #F9A825;
          pointer-events: none;
        }
        
        .hint {
          position: fixed;
          left: 12px;
          bottom: 12px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.8);
          padding: 8px 16px;
          border-radius: 8px;
          opacity: 0.85;
          font-size: 12px;
          color: #fff;
          pointer-events: none;
          backdrop-filter: blur(8px);
        }
        
        .copy {
          position: fixed;
          bottom: 20px;
          right: 20px;
          color: #fff;
          background: rgba(0, 0, 0, 0.6);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 11px;
          z-index: 10;
          pointer-events: none;
          backdrop-filter: blur(4px);
          font-family: monospace;
        }
        
        .page-wrapper {
          width: 100%;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          min-height: calc(100vh - 80px);
        }
        
        .gallery-container {
          display: flex;
          overflow-x: hidden;
          padding: 20px;
          gap: 15px;
          scroll-behavior: auto;
          width: 100%;
          cursor: grab;
          user-select: none;
        }
        
        .gallery-container:active { cursor: grabbing; }
        
        .gallery-item {
          position: relative;
          flex: 0 0 600px;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          will-change: transform;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .gallery-item:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        
        .gallery-item img {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 130%;
          height: 100%;
          object-fit: cover;
          transform: translate(-50%, -50%);
          will-change: transform;
          pointer-events: none;
        }
        
        @media (max-width: 1200px) { .gallery-item { flex: 0 0 450px; height: 320px; } }
        
        @media (max-width: 1024px) {
          .gallery-item { flex: 0 0 350px; height: 250px; }
          .title { right: 20px; top: 100px; }
          .sub-title { left: 20px; bottom: 80px; }
        }
        
        @media (max-width: 768px) {
          .gallery-item { flex: 0 0 280px; height: 200px; }
          .title { font-size: clamp(1.5rem, 6vw, 3rem); right: 16px; top: 100px; }
          .sub-title { font-size: clamp(0.8rem, 2.5vw, 1.2rem); left: 16px; bottom: 70px; }
          .hint { font-size: 10px; bottom: 8px; left: 8px; }
          .copy { font-size: 9px; bottom: 8px; right: 8px; }
        }
        
        @media (max-width: 480px) {
          .gallery-item { flex: 0 0 220px; height: 160px; border-radius: 12px; }
          .gallery-container { gap: 12px; padding: 12px; }
        }
        
        .gallery-container::-webkit-scrollbar { display: none; }
        .gallery-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
