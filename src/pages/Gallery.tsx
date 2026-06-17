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

      <div className="book-hint">📖 Click a page to flip</div>

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
          background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0f3460 100%);
          padding: 100px 20px 80px;
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
          opacity: 0.04;
          transform: rotate(-5deg) scale(1.1);
        }

        .bg-typography span {
          font-family: "Outfit", system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 15vw, 14rem);
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 -0.05em;
          text-shadow: 0 0 60px rgba(255,255,255,0.1);
        }

        /* Book Gallery Container */
        .galeria-book-3d {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          flex-wrap: wrap;
          z-index: 2;
          padding: 30px 0;
          transition: all 0.5s ease;
          max-width: 1100px;
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
          width: 220px;
          height: 300px;
          flex-shrink: 0;
          transform-style: preserve-3d;
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          border-radius: 6px;
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .galeria-book-3d__item:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
        }

        .galeria-book-3d__item.is-open {
          --page-rotate: -180deg;
          --spine-shift: 12px;
          transform: translateX(calc(var(--i) * 35px - 35px)) scale(1.1);
          z-index: 10;
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.9);
        }

        /* Front and Back Images */
        .galeria-book-3d__item img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
          backface-visibility: hidden;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        /* Front image (visible when closed) */
        .galeria-book-3d__item img:first-child {
          transform: rotateY(var(--page-rotate));
          z-index: 2;
        }

        /* Back image (visible when open) */
        .galeria-book-3d__item img:last-child {
          transform: rotateY(calc(var(--page-rotate) - 180deg));
          z-index: 1;
        }

        /* Book Spine Effect - creates the book look */
        .galeria-book-3d__item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.1) 15%,
            rgba(0, 0, 0, 0.05) 30%,
            rgba(0, 0, 0, 0.05) 70%,
            rgba(0, 0, 0, 0.1) 85%,
            rgba(0, 0, 0, 0.6) 100%
          );
          pointer-events: none;
          z-index: 3;
          opacity: 0.5;
          transition: opacity 0.4s ease;
        }

        .galeria-book-3d__item.is-open::before {
          opacity: 0.15;
        }

        /* Book Shadow */
        .galeria-book-3d__item::after {
          content: '';
          position: absolute;
          bottom: -25px;
          left: 10%;
          width: 80%;
          height: 25px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%);
          filter: blur(15px);
          opacity: 0.4;
          transition: all 0.5s ease;
          z-index: -1;
        }

        .galeria-book-3d__item.is-open::after {
          opacity: 0.8;
          transform: scale(1.3);
        }

        /* Book page edge effect - makes it look like a book */
        .galeria-book-3d__item .page-edge {
          display: none;
        }

        /* Hint Text */
        .book-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.6);
          font-family: "Outfit", system-ui, sans-serif;
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          z-index: 10;
          background: rgba(0, 0, 0, 0.4);
          padding: 10px 28px;
          border-radius: 30px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          pointer-events: none;
          animation: pulse 2.5s ease-in-out infinite;
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
            width: 180px;
            height: 250px;
          }
          .galeria-book-3d {
            gap: 18px;
          }
          .galeria-book-3d.book-open {
            gap: 4px;
          }
          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 28px - 28px)) scale(1.08);
          }
          .bg-typography span {
            font-size: clamp(3rem, 12vw, 10rem);
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .book-scene {
            padding: 80px 15px 60px;
            min-height: 100vh;
          }

          .galeria-book-3d {
            gap: 14px;
            padding: 20px 0;
          }
          .galeria-book-3d.book-open {
            gap: 3px;
          }

          .galeria-book-3d__item {
            width: 140px;
            height: 190px;
          }

          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 22px - 22px)) scale(1.08);
          }

          .bg-typography span {
            font-size: clamp(2.5rem, 8vw, 6rem);
          }

          .book-hint {
            font-size: 0.8rem;
            padding: 8px 20px;
            bottom: 25px;
          }
        }

        /* Mobile Landscape */
        @media (max-width: 600px) {
          .galeria-book-3d {
            gap: 10px;
          }
          .galeria-book-3d.book-open {
            gap: 2px;
          }

          .galeria-book-3d__item {
            width: 120px;
            height: 160px;
          }

          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 18px - 18px)) scale(1.1);
          }
        }

        /* Mobile Portrait */
        @media (max-width: 480px) {
          .book-scene {
            padding: 70px 10px 50px;
            min-height: 100svh;
          }

          .galeria-book-3d {
            gap: 8px;
            padding: 15px 0;
          }
          .galeria-book-3d.book-open {
            gap: 2px;
          }

          .galeria-book-3d__item {
            width: 85px;
            height: 115px;
            border-radius: 4px;
          }

          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 14px - 14px)) scale(1.12);
          }

          .bg-typography {
            opacity: 0.03;
          }

          .bg-typography span {
            font-size: clamp(1.5rem, 6vw, 3.5rem);
          }

          .book-hint {
            font-size: 0.65rem;
            padding: 6px 14px;
            bottom: 16px;
            letter-spacing: 0.05em;
          }

          .galeria-book-3d__item::after {
            bottom: -14px;
            height: 14px;
            opacity: 0.3;
          }

          .galeria-book-3d__item:hover {
            transform: translateY(-5px) scale(1.02);
          }

          .galeria-book-3d__item.is-open::after {
            opacity: 0.6;
          }
        }

        /* Extra Small Devices */
        @media (max-width: 380px) {
          .galeria-book-3d__item {
            width: 70px;
            height: 95px;
            border-radius: 3px;
          }

          .galeria-book-3d {
            gap: 6px;
          }
          .galeria-book-3d.book-open {
            gap: 1px;
          }

          .galeria-book-3d__item.is-open {
            transform: translateX(calc(var(--i) * 11px - 11px)) scale(1.15);
          }

          .book-hint {
            font-size: 0.5rem;
            padding: 4px 10px;
            bottom: 12px;
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

        /* Touch-friendly */
        .galeria-book-3d__item {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
