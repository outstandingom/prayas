// src/components/SpiralGallery.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Replace these with your actual NGO photos
const imageUrls = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
  'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80',
  'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
  'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&q=80',
  'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80',
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
  'https://images.unsplash.com/photo-1552697664-1505303c2bb6?w=800&q=80',
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
  'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80',
];

export default function SpiralGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spiralGroupRef = useRef<THREE.Group | null>(null);
  const scrollOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, z: 0 });
  const currentRotationRef = useRef({ x: 0, z: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- Setup Scene ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // --- Setup Camera ---
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    // --- Setup Renderer ---
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Create Spiral ---
    const group = new THREE.Group();
    spiralGroupRef.current = group;
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    const images = imageUrls;
    const count = images.length;
    const radius = 4.5;
    const turns = 4;

    // Create a placeholder texture while images load
    const placeholderCanvas = document.createElement('canvas');
    placeholderCanvas.width = 512;
    placeholderCanvas.height = 512;
    const ctx = placeholderCanvas.getContext('2d')!;
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Loading...', 256, 256);
    const placeholderTexture = new THREE.CanvasTexture(placeholderCanvas);

    images.forEach((url, i) => {
      const angle = (i / count) * Math.PI * 2 * turns;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (i / count - 0.5) * 6;

      const geometry = new THREE.PlaneGeometry(3, 2);
      
      // Create material with placeholder texture
      const material = new THREE.MeshBasicMaterial({
        map: placeholderTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      
      // Face outward from center
      mesh.lookAt(0, y, 0);
      
      mesh.userData = { index: i, url };
      group.add(mesh);

      // Load actual texture
      textureLoader.load(url, (texture) => {
        material.map = texture;
        material.needsUpdate = true;
        material.opacity = 1;
      });
    });

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // --- Particles Background ---
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Mouse Events ---
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const pos = getMousePosition(e);
      previousMouseRef.current = pos;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePosition(e);
      
      if (isDraggingRef.current) {
        const deltaX = pos.x - previousMouseRef.current.x;
        const deltaY = pos.y - previousMouseRef.current.y;
        
        targetRotationRef.current.x += deltaY * 0.01;
        targetRotationRef.current.z += deltaX * 0.01;
        
        previousMouseRef.current = pos;
      }
      
      // Hover effect - slight follow
      if (!isDraggingRef.current) {
        targetRotationRef.current.x += (pos.y * 0.005 - targetRotationRef.current.x) * 0.02;
        targetRotationRef.current.z += (pos.x * 0.005 - targetRotationRef.current.z) * 0.02;
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollOffsetRef.current += e.deltaY * 0.005;
    };

    const getMousePosition = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        return { x: e.touches[0].clientX / window.innerWidth - 0.5, y: e.touches[0].clientY / window.innerHeight - 0.5 };
      }
      return { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
    };

    // --- Resize ---
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.z += (targetRotationRef.current.z - currentRotationRef.current.z) * 0.05;

      if (group) {
        group.rotation.x = currentRotationRef.current.x + scrollOffsetRef.current;
        group.rotation.z = currentRotationRef.current.z;
        
        // Auto-rotate slowly when not interacting
        if (!isDraggingRef.current && Math.abs(scrollOffsetRef.current) < 0.01) {
          group.rotation.y += 0.001;
        }
      }

      // Animate particles
      particles.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    // --- Event Listeners ---
    const element = renderer.domElement;
    element.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('touchstart', handleMouseDown);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // --- Cleanup ---
    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="spiral-gallery-wrapper">
      <div className="spiral-title">
        <span>Our</span>
        <span>Gallery</span>
      </div>
      
      <div className="spiral-container" ref={containerRef}>
        <div className="spiral-hint">
          🖱️ Drag to rotate • Scroll to zoom
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');

        .spiral-gallery-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          background: radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%);
          overflow: hidden;
        }

        .spiral-title {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          font-family: 'Monoton', cursive;
          font-size: clamp(2rem, 5vw, 4.5rem);
          color: rgba(255, 255, 255, 0.08);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          pointer-events: none;
          text-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
        }

        .spiral-title span {
          display: inline-block;
          margin: 0 0.1em;
        }

        .spiral-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }

        .spiral-container canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        .spiral-hint {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          color: rgba(255, 255, 255, 0.3);
          font-family: 'Segoe UI', sans-serif;
          font-size: clamp(0.7rem, 1.2vw, 0.9rem);
          letter-spacing: 0.1em;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 20px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          pointer-events: none;
          animation: hintPulse 3s ease-in-out infinite;
          white-space: nowrap;
        }

        @keyframes hintPulse {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.05); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .spiral-title {
            top: 20px;
            font-size: clamp(1.5rem, 4vw, 2.5rem);
          }
          .spiral-hint {
            bottom: 20px;
            font-size: 0.6rem;
            padding: 6px 14px;
          }
        }

        @media (max-width: 480px) {
          .spiral-title {
            top: 15px;
            font-size: clamp(1.2rem, 3.5vw, 2rem);
          }
          .spiral-hint {
            bottom: 15px;
            font-size: 0.5rem;
            padding: 4px 12px;
          }
        }
      `}</style>
    </div>
  );
}
