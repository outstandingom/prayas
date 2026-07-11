import { motion } from 'framer-motion';
import { HeartHandshake, Play, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function HeroBanner() {
  const { t } = useTranslation();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(80);

  // Measure navbar height
  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setNavbarHeight(header.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Load YouTube Player
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const createPlayer = () => {
    if (!containerRef.current) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: 'VJC2jqXUgAY',
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: 'VJC2jqXUgAY',
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0,
        playsinline: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.playVideo();
        },
      },
    });
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black flex items-center justify-center"
      style={{
        paddingTop: `${navbarHeight}px`,
        minHeight: `calc(100vh - ${navbarHeight}px)`,
      }}
    >
      {/* Video container – acts like object-fit: cover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Aspect Ratio Wrapper */}
        <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2">
          <div ref={containerRef} className="w-full h-full pointer-events-none"></div>
        </div>
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>

      {/* Content – responsive */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-white/80 text-[8px] sm:text-xs font-medium tracking-wider uppercase mb-3 sm:mb-6 border border-white/10">
            <Play size={10} className="sm:w-3 sm:h-3 fill-[#FFF314] text-[#FFF314]" />
            {t('hero.tagline', 'Watch Our Story Unfold')}
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2 sm:mb-4">
            {t('hero.title', 'Every child deserves')}
            <br />
            <span className="text-[#FFF314]">{t('hero.titleHighlight', 'a chance to learn')}</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-8 px-2">
            {t(
              'hero.description',
              'Empowering communities through education, health, and sustainable development. Join us in making a difference.'
            )}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFF314] text-gray-900 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm hover:bg-[#FFF314]/90 transition-all duration-300 shadow-lg shadow-[#FFF314]/25"
            >
              {t('hero.donateNow', 'Donate Now')}
              <HeartHandshake size={14} className="sm:w-[18px] sm:h-[18px]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {t('hero.learnMore', 'Learn More')}
              <ArrowRight size={14} className="sm:w-[18px] sm:h-[18px]" />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-white/10 flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
            <div>
              <div className="text-base sm:text-2xl md:text-3xl font-bold text-white">10+</div>
              <div className="text-[8px] sm:text-xs text-white/50 uppercase tracking-wider">Years of Impact</div>
            </div>
            <div>
              <div className="text-base sm:text-2xl md:text-3xl font-bold text-white">50K</div>
              <div className="text-[8px] sm:text-xs text-white/50 uppercase tracking-wider">Lives Transformed</div>
            </div>
            <div>
              <div className="text-base sm:text-2xl md:text-3xl font-bold text-white">20+</div>
              <div className="text-[8px] sm:text-xs text-white/50 uppercase tracking-wider">Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
