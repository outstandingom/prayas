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
          // Zoom the iframe to cover the container (no black bars)
          const iframe = event.target.getIframe();
          if (iframe) {
            iframe.style.transform = 'scale(1.5)';
            iframe.style.transformOrigin = 'center center';
          }
        },
      },
    });
  };

  const navbarHeight = 'var(--navbar-height, 80px)';

  return (
    <section
      className="relative w-full overflow-hidden bg-black flex items-center justify-center"
      style={{
        paddingTop: navbarHeight,
        minHeight: `calc(100vh - ${navbarHeight})`,
      }}
    >
      {/* Video container – fills entire area with no black space */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={containerRef} className="absolute inset-0 w-full h-full"></div>
      </div>

      {/* Minimal overlay – just enough for text readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>

      {/* Content – clean and centered like Reliance Foundation */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tagline – small and elegant */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/80 text-xs font-medium tracking-wider uppercase mb-6 border border-white/10">
            <Play size={12} className="fill-[#FFF314] text-[#FFF314]" />
            {t('hero.tagline', 'Watch Our Story Unfold')}
          </div>

          {/* Main heading – bold and clear */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            {t('hero.title', 'Every child deserves')}
            <br />
            <span className="text-[#FFF314]">{t('hero.titleHighlight', 'a chance to learn')}</span>
          </h1>

          {/* Description – subtle and readable */}
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
            {t(
              'hero.description',
              'Empowering communities through education, health, and sustainable development. Join us in making a difference.'
            )}
          </p>

          {/* CTA Buttons – clean and prominent */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFF314] text-gray-900 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#FFF314]/90 transition-all duration-300 shadow-lg shadow-[#FFF314]/25"
            >
              {t('hero.donateNow', 'Donate Now')}
              <HeartHandshake size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {t('hero.learnMore', 'Learn More')}
              <ArrowRight size={18} />
            </motion.button>
          </div>

          {/* Stats – minimal and elegant */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-12">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">10+</div>
              <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Years of Impact</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">50K</div>
              <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Lives Transformed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">20+</div>
              <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
