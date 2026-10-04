// src/components/BrandLogo.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BrandLogoProps {
  variant?: 'navbar' | 'footer' | 'small' | 'large';
  to?: string;
  className?: string;
}

export default function BrandLogo({
  variant = 'navbar',
  to,
  className = ''
}: BrandLogoProps) {
  // ─── Animation state (switches every 3s) ───
  const [brandLangIndex, setBrandLangIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBrandLangIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isEnglish = brandLangIndex === 0;
  const imageSrc = isEnglish ? '/Prayas english.png' : '/Prayashindi.png';

  // ─── Size classes per variant ───
  let logoSizeClasses = 'w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14';
  let brandImageMaxHeight = 'h-7 sm:h-9 lg:h-10';
  let containerClasses = 'min-w-[60px] sm:min-w-[100px] lg:min-w-[140px]';
  let gapClasses = 'gap-1 sm:gap-1.5';

  if (variant === 'footer') {
    logoSizeClasses = 'w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16';
    brandImageMaxHeight = 'h-8 sm:h-12 md:h-14';
    containerClasses = 'min-w-[60px] sm:min-w-[100px] md:min-w-[130px]';
    gapClasses = 'gap-1 sm:gap-2';
  } else if (variant === 'small') {
    logoSizeClasses = 'w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14';
    brandImageMaxHeight = 'h-6 sm:h-10 md:h-12';
    containerClasses = 'min-w-[50px] sm:min-w-[80px] md:min-w-[110px]';
    gapClasses = 'gap-1 sm:gap-2';
  } else if (variant === 'large') {
    logoSizeClasses = 'w-16 h-16 sm:w-28 sm:h-28 md:w-32 md:h-32';
    brandImageMaxHeight = 'h-14 sm:h-24 md:h-28 lg:h-32';
    containerClasses = 'min-w-[100px] sm:min-w-[180px] md:min-w-[220px]';
    gapClasses = 'gap-3 sm:gap-4';
  }

  // ─── Content (logo + animated brand image) ───
  const content = (
    <>
      {/* Logo */}
      <div 
        className={`rounded-full overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${logoSizeClasses}`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <img
          src="/prayas-logo.png"
          alt="Prayas Logo"
          className="w-full h-full object-contain"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Animated brand name as image – positioned slightly closer to logo */}
      <motion.div
        key={brandLangIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.4 }}
        className={`flex-1 flex items-center justify-start -ml-1 sm:-ml-1.5 ${containerClasses}`}
      >
        <img
          src={imageSrc}
          alt={isEnglish ? 'Prayas Samaj Sevi Sanstha' : 'प्रयास समाज सेवी संस्था'}
          className={`w-full object-contain object-left ${brandImageMaxHeight} mt-0.5`}
          style={{ maxWidth: '100%' }}
        />
      </motion.div>
    </>
  );

  // ─── Wrap in Link or div ───
  const wrapperClasses = `flex items-center ${gapClasses} group ${className}`;

  if (to) {
    return (
      <a
        href={to}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = to;
        }}
        className={wrapperClasses}
      >
        {content}
      </a>
    );
  }

  return <div className={wrapperClasses}>{content}</div>;
}
