// src/components/BookGallery.tsx (Enhanced Book Style)
import { useEffect } from 'react';

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
    const items = document.querySelectorAll(".book-item");
    const container = document.querySelector(".book-shelf");

    function updateContainerState() {
      const anyOpen = Array.from(items).some((item) =>
        item.classList.contains("is-open")
      );
      if (anyOpen) {
        container?.classList.add("book-shelf-open");
      } else {
        container?.classList.remove("book-shelf-open");
      }
    }

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        // Close all other books
        items.forEach((other) => {
          if (other !== item) other.classList.remove("is-open");
        });
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
      <div className="book-scene-title">Our Gallery</div>

      <div className="book-shelf">
        {GALLERY_IMAGES.map((image, index) => (
          <div key={index} className="book-item" style={{ "--index": index } as React.CSSProperties}>
            <div className="book-cover">
              <img src={image.front} alt={`Book ${index + 1}`} className="book-front" />
              <div className="book-spine"></div>
              <img src={image.back} alt={`Book ${index + 1} Back`} className="book-back" />
            </div>
            <div className="book-number">{index + 1}</div>
          </div>
        ))}
      </div>

      <div className="book-hint">📖 Click a book to open it</div>

      <style>{`
        .book-scene {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 100px 20px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .book-scene-title {
          font-family: 'Georgia', serif;
          font-size: clamp(2rem, 5vw, 4rem);
          color: #fff;
          margin-bottom: 40px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
          letter-spacing: 2px;
          position: relative;
          z-index: 2;
        }

        .book-shelf {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          max-width: 1200px;
          width: 100%;
          padding: 20px;
          position: relative;
          z-index: 2;
          transition: gap 0.5s ease;
        }

        .book-shelf.book-shelf-open {
          gap: 10px;
        }

        .book-item {
          position: relative;
          width: 200px;
          height: 280px;
          perspective: 800px;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-shrink: 0;
        }

        .book-item:hover {
          transform: translateY(-10px);
        }

        .book-item.is-open {
          transform: translateX(calc(var(--index) * 30px - 30px)) scale(1.05);
          z-index: 10;
        }

        .book-cover {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 6px 12px 12px 6px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
        }

        .book-item.is-open .book-cover {
          transform: rotateY(-180deg);
        }

        .book-front,
        .book-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px 12px 12px 6px;
          backface-visibility: hidden;
        }

        .book-front {
          z-index: 2;
          border-radius: 6px 12px 12px 6px;
        }

        .book-back {
          transform: rotateY(180deg);
          border-radius: 12px 6px 6px 12px;
        }

        /* Book spine */
        .book-spine {
          position: absolute;
          left: 0;
          top: 0;
          width: 20px;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.6) 0%,
            rgba(0,0,0,0.3) 40%,
            rgba(255,255,255,0.05) 60%,
            rgba(0,0,0,0.1) 100%
          );
          z-index: 3;
          border-radius: 6px 0 0 6px;
          pointer-events: none;
        }

        .book-number {
          position: absolute;
          bottom: 10px;
          right: 15px;
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          font-family: 'Georgia', serif;
          z-index: 4;
          background: rgba(0,0,0,0.3);
          padding: 2px 10px;
          border-radius: 10px;
          backdrop-filter: blur(4px);
        }

        .book-item.is-open .book-number {
          display: none;
        }

        .book-hint {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
          background: rgba(0,0,0,0.3);
          padding: 10px 24px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 10;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .book-item { width: 160px; height: 220px; }
          .book-shelf { gap: 20px; }
        }

        @media (max-width: 768px) {
          .book-item { width: 130px; height: 180px; }
          .book-shelf { gap: 15px; }
          .book-hint { font-size: 0.75rem; padding: 8px 16px; bottom: 20px; }
        }

        @media (max-width: 480px) {
          .book-item { width: 90px; height: 130px; }
          .book-shelf { gap: 10px; padding: 10px; }
          .book-shelf.book-shelf-open { gap: 5px; }
          .book-hint { font-size: 0.6rem; padding: 6px 12px; bottom: 15px; }
          .book-item.is-open {
            transform: translateX(calc(var(--index) * 15px - 15px)) scale(1.08);
          }
        }

        @media (max-width: 380px) {
          .book-item { width: 70px; height: 100px; }
          .book-shelf { gap: 6px; }
        }
      `}</style>
    </div>
  );
}
