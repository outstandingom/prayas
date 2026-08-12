// src/components/DomeGallery.tsx
import { useEffect, useMemo, useRef, useCallback, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './DomeGallery.css';

export interface DomeGalleryImage {
  src: string;
  alt?: string;
}

export interface DomeGalleryProps {
  images?: (string | DomeGalleryImage)[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  autoRotateSpeed?: number;
}

const DEFAULT_NGO_IMAGES: DomeGalleryImage[] = [
  { src: '/healthcaret.jpg', alt: 'Free Eye & Health Camp' },
  { src: '/EDUCATION.JPG', alt: 'Sanskarshala Learning Centre' },
  { src: '/IMG-23.jpeg', alt: 'Rural Clean Water Project' },
  { src: '/IMG-25.jpeg', alt: 'Volunteer Leadership Drive' },
  { src: '/IMG-27.jpeg', alt: 'Social Awareness Rally' },
  { src: '/healthhj.jpeg', alt: 'Elderly Care & Health Support' },
  { src: '/IMG-24.jpeg', alt: 'Community Skill Training' },
  { src: '/IMG-20.jpg', alt: 'Children Educational Workshop' },
  { src: '/IMG-21.jpg', alt: 'Youth Leadership Program' },
  { src: '/Sindoda/IMG_20191217_133958.jpg', alt: 'Project Sindoda Model Village' },
  { src: '/CHILDRENGROUP.jpg', alt: 'Sanskarshala Children Group' },
  { src: '/PRAYASHEALTHCAMP.jpeg', alt: 'Prayas Health Camp' },
  { src: '/WOMEN.jpeg', alt: 'Women Empowerment Centre' },
  { src: '/TREEGROW.jpg', alt: 'Kargil Vatika Plantation' },
  { src: '/P1039409.JPG', alt: 'Digital Literacy Classroom' },
  { src: '/P1039322.JPG', alt: 'Nutritious Meal Drive' },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

interface TileCoords {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  src: string;
  alt: string;
}

function buildItems(pool: (string | DomeGalleryImage)[], seg: number): TileCoords[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }

  const normalizedImages = pool.map(image => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return { src: image.src || '', alt: image.alt || '' };
  });

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt
  }));
}

export default function DomeGallery({
  images = DEFAULT_NGO_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#F8FAFC',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = false,
  autoRotateSpeed = 0.12
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const sphereRef = useRef<HTMLDivElement | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);

  // Lightbox modal state for clicked images
  const [modalImage, setModalImage] = useState<{ src: string; alt?: string } | null>(null);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  // Continuous smooth horizontal autorotation
  useEffect(() => {
    let animId: number;
    const autoRotate = () => {
      if (!draggingRef.current && !modalImage && !inertiaRAF.current) {
        rotationRef.current.y = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
        applyTransform(rotationRef.current.x, rotationRef.current.y);
      }
      animId = requestAnimationFrame(autoRotate);
    };
    animId = requestAnimationFrame(autoRotate);
    return () => cancelAnimationFrame(animId);
  }, [autoRotateSpeed, modalImage]);

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (modalImage) return;
    stopInertia();
    draggingRef.current = true;
    movedRef.current = false;
    startRotRef.current = { ...rotationRef.current };
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (modalImage || !draggingRef.current || !startPosRef.current) return;
    const dxTotal = e.clientX - startPosRef.current.x;
    const dyTotal = e.clientY - startPosRef.current.y;
    if (!movedRef.current) {
      const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
      if (dist2 > 16) movedRef.current = true;
    }
    const nextX = clamp(
      startRotRef.current.x - dyTotal / dragSensitivity,
      -maxVerticalRotationDeg,
      maxVerticalRotationDeg
    );
    const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
    if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!draggingRef.current || !startPosRef.current) return;
    const dxTotal = e.clientX - startPosRef.current.x;
    const dyTotal = e.clientY - startPosRef.current.y;
    draggingRef.current = false;

    const vx = clamp((dxTotal / dragSensitivity) * 0.05, -1.2, 1.2);
    const vy = clamp((dyTotal / dragSensitivity) * 0.05, -1.2, 1.2);

    if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) {
      startInertia(vx, vy);
    }
  };

  const handleTileClick = (it: TileCoords) => {
    if (movedRef.current) return;
    setModalImage({ src: it.src, alt: it.alt });
  };

  return (
    <>
      <div
        ref={rootRef}
        className="sphere-root"
        style={
          {
            '--segments-x': segments,
            '--segments-y': segments,
            '--overlay-blur-color': overlayBlurColor,
            '--tile-radius': imageBorderRadius,
            '--enlarge-radius': openedImageBorderRadius,
            '--image-filter': grayscale ? 'grayscale(1)' : 'none'
          } as CSSProperties
        }
      >
        <main
          ref={mainRef}
          className="sphere-main"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="item"
                  data-src={it.src}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={
                    {
                      '--offset-x': it.x,
                      '--offset-y': it.y,
                      '--item-size-x': it.sizeX,
                      '--item-size-y': it.sizeY
                    } as CSSProperties
                  }
                >
                  <div
                    className="item__image"
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || 'Open image'}
                    onClick={() => handleTileClick(it)}
                  >
                    <img src={it.src} draggable={false} alt={it.alt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* ===== MINIMAL COMPACT POPUP MODAL ===== */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs"
            onClick={() => setModalImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative max-w-xs sm:max-w-sm w-full bg-white rounded-2xl p-2.5 shadow-2xl border border-gray-100 overflow-hidden flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Minimal Close Button */}
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-4 right-4 z-20 w-7 h-7 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Compact Photo */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-50">
                <img
                  src={modalImage.src}
                  alt={modalImage.alt || 'Gallery photo'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Minimal Caption */}
              {modalImage.alt && (
                <div className="text-center pt-2.5 pb-1 px-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#263238]">
                    {modalImage.alt}
                  </h3>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
