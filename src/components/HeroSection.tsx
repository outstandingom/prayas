import { motion } from 'framer-motion';
import { HeartHandshake, Play, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HeroBanner() {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900 pt-[80px] sm:pt-[144px] h-[calc(100vh-80px)] sm:h-[calc(100vh-144px)]"
    >
      <div className="flex flex-col-reverse md:flex-row w-full h-full">

        {/* --- Content Side (left) --- */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center md:items-start p-8 md:p-12 lg:p-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden z-10">
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

        {/* --- Video Side (pure background, no overlay) --- */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-black overflow-hidden">
          {/* YouTube iframe – completely hidden branding, auto-plays muted */}
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none"
            src="https://www.youtube-nocookie.com/embed/VJC2jqXUgAY?autoplay=1&mute=1&loop=1&playlist=VJC2jqXUgAY&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&color=white&disablekb=1&fs=0&playsinline=1"
            title="Background"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 'none' }}
          ></iframe>

          {/* ─── Dark overlay to dim video ─── */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/20 pointer-events-none"></div>

          {/* ─── GRADIENT PATCHES (transparent borders for blending) ─── */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black/30 to-transparent pointer-events-none"></div>
          <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>

          {/* ─── Extra mask to hide any residual YouTube logo (bottom-right) ─── */}
          <div className="absolute bottom-0 right-0 w-32 h-16 bg-gradient-to-tl from-black/80 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
