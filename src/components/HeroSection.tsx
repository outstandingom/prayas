import { motion } from 'framer-motion';
import { HeartHandshake, Play, ChevronRight, ArrowRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroBanner() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Handle video load and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.play().catch(error => {
          // Autoplay was prevented; user will need to interact.
          console.log('Video autoplay prevented:', error);
        });
      };
      video.addEventListener('canplaythrough', handleCanPlay);
      return () => video.removeEventListener('canplaythrough', handleCanPlay);
    }
  }, []);

  // Resume playback if the tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gray-900" style={{ height: '100vh', maxHeight: '800px' }}>
      {/* --- SPLIT SCREEN LAYOUT --- */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full">

        {/* --- LEFT SIDE: Content & Graphics --- */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center md:items-start p-8 md:p-12 lg:p-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          {/* Decorative Graphic Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF314] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-[#FFF314]/20 rounded-full"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 text-center md:text-left max-w-xl"
          >
            {/* Small Tagline with Icon */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/80 text-xs font-semibold tracking-wider uppercase mb-4 border border-white/10">
              <Play size={12} className="fill-[#FFF314] text-[#FFF314]" />
              {t('hero.tagline', 'Watch Our Story Unfold')}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              {t('hero.title', 'Building a Better')}{' '}
              <span className="text-[#FFF314]">{t('hero.titleHighlight', 'Tomorrow')}</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8">
              {t(
                'hero.description',
                'Empowering communities through education, health, and sustainable development. Join us in making a difference.'
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
          </motion.div>

          {/* Bottom Graphic: Stats or Trust Badges */}
          <div className="relative z-20 mt-auto pt-8 w-full flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 border-t border-white/10">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Years of Impact</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-white">50K</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Lives Transformed</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-white">20+</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Projects</div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Video --- */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-black">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            poster="/video-poster.jpg" // Optional: Add a poster image
          >
            <source src="/IMG_09.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Fallback overlay if video doesn't load */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
              <div className="text-white/50 text-sm">Loading video...</div>
            </div>
          )}

          {/* Optional: A subtle gradient overlay on the video for better blending */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none"></div>

          {/* Play/Pause Button (Optional) */}
          <button
            onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.paused) {
                  videoRef.current.play();
                } else {
                  videoRef.current.pause();
                }
              }
            }}
            className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Toggle video playback"
          >
            <Play size={20} className="fill-white ml-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
