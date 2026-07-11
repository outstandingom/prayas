import { motion } from 'framer-motion';
import { HeartHandshake, Play, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

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

  // Load YouTube Player API and create player
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
      className="relative w-full overflow-hidden bg-gray-900 flex items-center justify-center"
      style={{
        paddingTop: 'var(--navbar-height, 80px)',
        minHeight: 'calc(100vh - var(--navbar-height, 80px))',
      }}
    >
      {/* Video Background */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none"></div>

      {/* Dark overlay – lighter on mobile for better readability */}
      <div className="absolute inset-0 bg-black/60 sm:bg-black/40 pointer-events-none"></div>

      {/* Edge gradients – softer on mobile */}
      <div className="absolute inset-y-0 left-0 w-1/3 sm:w-1/4 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/3 sm:w-1/4 bg-gradient-to-l from-black/70 via-black/30 to-transparent pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 sm:h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>

      {/* Content – optimized for all screens */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center py-4 sm:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tagline – smaller on mobile */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full text-white/90 text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-6 border border-white/20">
            <Play size={12} className="fill-[#FFF314] text-[#FFF314]" />
            {t('hero.tagline', 'Watch Our Story Unfold')}
          </div>

          {/* Heading – responsive sizes */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4">
            {t('hero.title', 'Building a Better')}{' '}
            <span className="text-[#FFF314]">{t('hero.titleHighlight', 'Tomorrow')}</span>
          </h1>

          {/* Description – smaller, better line-height on mobile */}
          <p className="text-sm sm:text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
            {t(
              'hero.description',
              'Empowering communities through education, health, and sustainable development. Join us in making a difference.'
            )}
          </p>

          {/* Buttons – full width on mobile, inline on larger */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFF314] text-gray-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm hover:bg-[#FFF314]/90 transition-all duration-300 shadow-lg shadow-[#FFF314]/30"
            >
              {t('hero.donateNow', 'Donate Now')}
              <HeartHandshake size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {t('hero.learnMore', 'Learn More')}
              <ArrowRight size={18} />
            </motion.button>
          </div>

          {/* Stats – smaller numbers on mobile, centered */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">10+</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">Years of Impact</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">50K</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">Lives Transformed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">20+</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
