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
      {/* --- Video Background --- */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none"></div>

      {/* --- Dark overlay --- */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40 pointer-events-none"></div>

      {/* --- Edge gradients --- */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/60 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/60 to-transparent pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>

      {/* --- Content (centered) --- */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
         

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            {t('hero.title', 'Building a Better')}{' '}
            <span className="text-[#FFF314]">{t('hero.titleHighlight', 'Tomorrow')}</span>
          </h1>

          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            {t(
              'hero.description',
              'Empowering communities through education, health, and sustainable development. Join us in making a difference.'
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-[#FFF314] text-gray-900 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#FFF314]/90 transition-all duration-300 shadow-lg shadow-[#FFF314]/30"
            >
              {t('hero.donateNow', 'Donate Now')}
              <HeartHandshake size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {t('hero.learnMore', 'Learn More')}
              <ArrowRight size={18} />
            </motion.button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-8 md:gap-12">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">10+</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Years of Impact</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">50K</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Lives Transformed</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">20+</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
