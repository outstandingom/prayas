// src/components/BookGallery.tsx
import { useEffect, useRef } from 'react';

// Replace these with your actual NGO photos
const GALLERY_IMAGES = [
  {
    front: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
    back: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop"
  },
  {
    front: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop",
    back: "https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=600&h=400&fit=crop"
  },
  {
    front: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    back: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=600&h=400&fit=crop"
  },
  {
    front: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop",
    back: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=400&fit=crop"
  },
  {
    front: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&h=400&fit=crop",
    back: "https://images.unsplash.com/photo-1552697664-1505303c2bb6?w=600&h=400&fit=crop"
  },
  {
    front: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
    back: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&h=400&fit=crop"
  }
];

export default function BookGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const items = document.querySelectorAll(".book-gallery__item");
    const container = containerRef.current;

    function updateContainerState() {
      const anyOpen = Array.from(items).some((item) =>
        item.classList.contains("is-open")
      );
      if (container) {
        if (anyOpen) {
          container.classList.add("book-open");
        } else {
          container.classList.remove("book-open");
        }
      }
    }

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        item.classList.toggle("is-open");
        updateContainerState();
      });
    });

    document.addEventListener("click", () => {
      items.forEach((item) => {
        item.classList.remove("is-open");
      });
      updateContainerState();
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div className="book-scene">
      <div className="bg-typography">
        <span>Our</span>
        <span>Gallery</span>
      </div>

      <div className="book-gallery" ref={containerRef}>
        {GALLERY_IMAGES.map((image, index) => (
          <div
            key={index}
            className="book-gallery__item"
            style={{ "--i": index } as React.CSSProperties}
          >
            <img src={image.front} alt={`Gallery ${index + 1} - Front`} />
            <img src={image.back} alt={`Gallery ${index + 1} - Back`} />
          </div>
        ))}
      </div>

      <div className="book-hint">Click a page to flip</div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@800&display=swap');

        @property --page-rotate {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }
        @property --spine-shift {
          syntax: "<length>";
          inherits: true;
          initial-value: 0px;
        }

        .book-scene {
          width: 100%;
          min-height: 100vh;
          perspective: 1000px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
          background: radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 40px 20px;
          position: relative;
        }

        /* Background Typography */
        .bg-typography {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          z-index: 1;
          opacity: 0.06;
          transform: rotate(-8deg) scale(1.2);
        }

        .bg-typography span {
          font-family: "Outfit", system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(6rem, 20vw, 18rem);
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 -0.05em;
          text-shadow: 0 0 40px rgba(255,255,255,0.1);
        }

        /* Book Gallery Container */
        .book-gallery {
          position: relative;
          width: 100%;
          max-width: 800px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          z-index: 2;
          padding: 20px 0;
          transition: all 0.5s ease;
        }

        .book-gallery.book-open {
          gap: 0px;
        }

        /* Individual Book Items */
        .book-gallery__item {
          --page-rotate: 0deg;
          --spine-shift: 0px;
          
          position: relative;
          width: 200px;
          height: 280px;
          flex-shrink: 0;
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          border-radius: 4px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .book-gallery__item:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .book-gallery__item.is-open {
          --page-rotate: -180deg;
          --spine-shift: 10px;
          transform: translateX(calc(var(--i) * 40px - 40px)) scale(1.05);
          z-index: 10;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        }

        /* Front and Back Images */
        .book-gallery__item img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
          backface-visibility: hidden;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .book-gallery__item img:first-child {
          transform: rotateY(var(--page-rotate));
          z-index: 2;
        }

        .book-gallery__item img:last-child {
          transform: rotateY(calc(var(--page-rotate) - 180deg));
          z-index: 1;
        }

        /* Book Spine Effect */
        .book-gallery__item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 4px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.4) 0%,
            transparent 20%,
            transparent 80%,
            rgba(0, 0, 0, 0.4) 100%
          );
          pointer-events: none;
          z-index: 3;
          opacity: 0.3;
          transition: opacity 0.4s ease;
        }

        .book-gallery__item.is-open::before {
          opacity: 0.1;
        }

        /* Book Shadow/Depth */
        .book-gallery__item::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 10%;
          width: 80%;
          height: 20px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%);
          filter: blur(10px);
          opacity: 0.5;
          transition: all 0.4s ease;
          z-index: -1;
        }

        .book-gallery__item.is-open::after {
          opacity: 0.8;
          transform: scale(1.2);
        }

        /* Hint Text */
        .book-hint {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.5);
          font-family: "Outfit", system-ui, sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          z-index: 10;
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 20px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .book-gallery__item {
            width: 160px;
            height: 220px;
          }
          .book-gallery__item.is-open {
            transform: translateX(calc(var(--i) * 30px - 30px)) scale(1.08);
          }
          .bg-typography span {
            font-size: clamp(4rem, 15vw, 12rem);
          }
        }

        @media (max-width: 768px) {
          .book-gallery {
            gap: 10px;
            padding: 10px 0;
          }
          .book-gallery__item {
            width: 120px;
            height: 170px;
          }
          .book-gallery__item.is-open {
            transform: translateX(calc(var(--i) * 20px - 20px)) scale(1.1);
          }
          .book-gallery.book-open {
            gap: 0px;
          }
          .bg-typography span {
            font-size: clamp(2.5rem, 10vw, 8rem);
          }
          .book-hint {
            font-size: 0.7rem;
            padding: 6px 16px;
            bottom: 20px;
          }
        }

        @media (max-width: 480px) {
          .book-gallery__item {
            width: 90px;
            height: 130px;
          }
          .book-gallery__item.is-open {
            transform: translateX(calc(var(--i) * 15px - 15px)) scale(1.15);
          }
          .bg-typography span {
            font-size: clamp(1.8rem, 8vw, 5rem);
          }
          .book-hint {
            font-size: 0.6rem;
            padding: 4px 12px;
            bottom: 12px;
          }
        }

        /* Custom Scrollbar for the scene */
        .book-scene::-webkit-scrollbar {
          width: 6px;
        }
        .book-scene::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .book-scene::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .book-scene::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
