// src/pages/Gallery.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Replace these with your actual NGO photos - Added more images for fuller spiral
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

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup with WHITE background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5); // Light gray/white background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 22);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- Create Infinite Spiral ---
    const group = new THREE.Group();
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    const images = imageUrls;
    const count = images.length;
    const radius = 7;
    const turns = 4.5; // More turns for fuller spiral
    const imageWidth = 2.8;
    const imageHeight = 2;

    // Store all meshes for animation
    const meshes: THREE.Mesh[] = [];

    images.forEach((url, i) => {
      const angle = (i / count) * Math.PI * 2 * turns;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (i / count - 0.5) * 9;

      const geometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
      
      // Create material with placeholder - white background
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      
      // Face outward from center
      mesh.lookAt(0, y, 0);
      
      // Add slight random rotation for organic feel
      mesh.rotation.z += (Math.random() - 0.5) * 0.1;
      
      group.add(mesh);
      meshes.push(mesh);

      // Load actual texture
      textureLoader.load(url, (texture: THREE.Texture) => {
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
        material.opacity = 1;
      });
    });

    // --- Add Decorative Light Particles ---
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 15;
      
      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = r * Math.cos(phi);
      particlePos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      
      // Pastel colors for light background
      const color = new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.6, 0.7 + Math.random() * 0.2);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse Interaction ---
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let autoRotate = true;
    let velocityX = 0;
    let velocityY = 0;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      autoRotate = false;
      const pos = getMousePosition(e);
      previousMouse = pos;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePosition(e);
      
      if (isDragging) {
        const deltaX = pos.x - previousMouse.x;
        const deltaY = pos.y - previousMouse.y;
        
        velocityY += deltaX * 0.02;
        velocityX += deltaY * 0.02;
        
        previousMouse = pos;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      setTimeout(() => { autoRotate = true; }, 2000);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoom = camera.position.z + e.deltaY * 0.01;
      camera.position.z = Math.max(10, Math.min(35, zoom));
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

      // Smooth rotation with inertia
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      // Apply rotation with inertia
      if (autoRotate) {
        // Auto rotate slowly
        group.rotation.y += 0.004;
        group.rotation.x = Math.sin(Date.now() * 0.0003) * 0.08;
      } else {
        // Apply drag rotation with inertia
        velocityX *= 0.95;
        velocityY *= 0.95;
        
        targetRotationX += velocityX;
        targetRotationY += velocityY;
        
        group.rotation.x = currentRotationX;
        group.rotation.y = currentRotationY;
      }

      // Animate particles
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      // Pulse individual meshes slightly
      meshes.forEach((mesh, i) => {
        const scale = 1 + Math.sin(Date.now() * 0.001 + i * 0.5) * 0.02;
        mesh.scale.set(scale, scale, 1);
      });

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
    <div className="gallery-wrapper">
      <div className="gallery-overlay">
        <h1 className="gallery-title">Our Gallery</h1>
        <p className="gallery-subtitle">Drag to explore • Scroll to zoom</p>
      </div>
      
      <div className="gallery-container" ref={containerRef}></div>

      <style>{`
        .gallery-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #f5f5f5;
          overflow: hidden;
        }

        .gallery-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }

        .gallery-container canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        .gallery-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          pointer-events: none;
          opacity: 0.12;
          transition: opacity 0.5s ease;
        }

        .gallery-overlay:hover {
          opacity: 0.2;
        }

        .gallery-title {
          font-family: 'Georgia', serif;
          font-size: clamp(3rem, 8vw, 8rem);
          color: rgba(0, 0, 0, 0.08);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-shadow: 0 0 60px rgba(99, 102, 241, 0.05);
          margin: 0;
          font-weight: 700;
        }

        .gallery-subtitle {
          font-family: 'Segoe UI', sans-serif;
          font-size: clamp(0.8rem, 1.2vw, 1.2rem);
          color: rgba(0, 0, 0, 0.15);
          letter-spacing: 0.2em;
          margin-top: 10px;
          text-transform: uppercase;
        }

        /* Hide scrollbar */
        .gallery-container::-webkit-scrollbar {
          display: none;
        }
        .gallery-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .gallery-title {
            font-size: clamp(2rem, 6vw, 4rem);
          }
          .gallery-subtitle {
            font-size: 0.6rem;
            letter-spacing: 0.1em;
          }
          .gallery-overlay {
            opacity: 0.08;
          }
        }

        @media (max-width: 480px) {
          .gallery-title {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
          }
          .gallery-subtitle {
            font-size: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
