// src/components/BookGallery.tsx
import { useEffect } from 'react';

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
  useEffect(() => {
    const items = document.querySelectorAll(".galeria-book-3d__item");
    const container = document.querySelector(".galeria-book-3d");

    function updateContainerState() {
      const anyOpen = Array.from(items).some((item) =>
        item.classList.contains("is-open")
      );
      if (anyOpen) {
        container?.classList.add("book-open");
      } else {
        container?.classList.remove("book-open");
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

      <div className="galeria-book-3d">
        {GALLERY_IMAGES.map((image, index) => (
          <div
            key={index}
            className="galeria-book-3d__item"
            style={{ "--i": index } as React.CSSProperties}
          >
            <img src={image.front} alt={`Gallery ${index + 1}`} />
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
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
          background: radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 80px 20px 60px;
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
          opacity: 0.05;
        }

        .bg-typography span {
          font-family: "Outfit", system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 15vw, 12rem);
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 -0.05em;
          text-shadow: 0 0 40px rgba(255,255,255,0.1);
        }

        /* Book Gallery Container */
        .galeria-book-3d {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          z-index: 2;
          padding: 20px 0;
          transition: all 0.5s ease;
          max-width: 1000px;
          width: 100%;
        }

        .galeria-book-3d.book-open {
          gap: 5px;
        }

        /* Individual Book Items */
        .galeria-book-3d__item {
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
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .galeria-book-3d__item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .galeria-book-3d__item.is-open {
          --page-rotate: -180deg;
          --spine-shift: 10px;
          transform: translateX(calc(var(--i) * 30px - 30px)) scale(1.08);
          z-index: 10;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
        }

        /* Front and Back Images */
        .galeria-book-3d__item img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
          backface-visibility: hidden;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .galeria-book-3d__item img:first-child {
          transform: rotateY(var(--page-rotate));
          z-index: 2;
        }

        .galeria-book-3d__item img:last-child {
          transform: rotateY(calc(var(--page-rotate) - 180deg));
          z-index: 1;
        }

        /* Book Spine Effect */
        .galeria-book-3d__item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 4px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.5) 0%,
            transparent 20%,
            transparent 80%,
            rgba(0, 0, 0, 0.5) 100%
          );
          pointer-events: none;
          z-index: 3;
          opacity: 0.4;
          transition: opacity 0.4s ease;
        }

        .galeria-book-3d__item.is-open::before {
          opacity: 0.1;
        }

        /* Book Shadow */
        .galeria-book-3d__item::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 10%;
          width: 80%;
          height: 20px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%);
          filter: blur(10px);
          opacity: 0.4;
          transition: all 0.4s ease;
          z-index: -1;
        }

        .galeria-book-3d__item.is-open::after {
          opacity: 0.7;
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
          padding: 8px 24px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        }

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */

        /* Large Tablets & Small Desktops */
        @media (max-width: 1024px) {
          .galeria-book-3d__item {
            width: 160px;
            height: 220px;
          }
          .galeria-book-3d {
            gap: 15px;
          }
          .galeria-book-3d.book-open {
            gap: 4px;
          }
          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 25px - 25px)) scale(1.06);
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .book-scene {
            padding: 70px 15px 50px;
            min-height: 100vh;
          }

          .galeria-book-3d {
            gap: 12px;
            padding: 15px 0;
          }
          .galeria-book-3d.book-open {
            gap: 3px;
          }

          .galeria-book-3d__item {
            width: 130px;
            height: 180px;
          }

          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 20px - 20px)) scale(1.08);
          }

          .bg-typography span {
            font-size: clamp(3rem, 10vw, 6rem);
          }

          .book-hint {
            font-size: 0.75rem;
            padding: 6px 16px;
            bottom: 20px;
          }
        }

        /* Mobile Landscape & Small Tablets */
        @media (max-width: 600px) {
          .galeria-book-3d {
            gap: 10px;
          }
          .galeria-book-3d.book-open {
            gap: 2px;
          }

          .galeria-book-3d__item {
            width: 110px;
            height: 150px;
          }

          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 16px - 16px)) scale(1.1);
          }
        }

        /* Mobile Portrait */
        @media (max-width: 480px) {
          .book-scene {
            padding: 60px 10px 40px;
            min-height: 100svh;
          }

          .galeria-book-3d {
            gap: 8px;
            padding: 10px 0;
          }
          .galeria-book-3d.book-open {
            gap: 2px;
          }

          .galeria-book-3d__item {
            width: 80px;
            height: 110px;
            border-radius: 3px;
          }

          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 12px - 12px)) scale(1.12);
          }

          .bg-typography span {
            font-size: clamp(1.8rem, 6vw, 3.5rem);
          }

          .bg-typography {
            opacity: 0.04;
          }

          .book-hint {
            font-size: 0.6rem;
            padding: 4px 12px;
            bottom: 12px;
            letter-spacing: 0.05em;
          }

          .galeria-book-3d__item::after {
            bottom: -12px;
            height: 12px;
            opacity: 0.3;
          }

          .galeria-book-3d__item:hover {
            transform: translateY(-4px) scale(1.02);
          }

          .galeria-book-3d__item.is-open::after {
            opacity: 0.5;
          }
        }

        /* Extra Small Devices */
        @media (max-width: 380px) {
          .galeria-book-3d__item {
            width: 65px;
            height: 90px;
          }

          .galeria-book-3d {
            gap: 6px;
          }
          .galeria-book-3d.book-open {
            gap: 1px;
          }

          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 10px - 10px)) scale(1.15);
          }

          .book-hint {
            font-size: 0.5rem;
            padding: 3px 10px;
            bottom: 10px;
          }
        }

        /* Custom Scrollbar */
        .book-scene::-webkit-scrollbar {
          width: 4px;
        }
        .book-scene::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .book-scene::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .book-scene::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Touch-friendly adjustments */
        .galeria-book-3d__item {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
}
