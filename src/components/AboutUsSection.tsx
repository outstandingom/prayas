import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, History, HeartHandshake, Play, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AboutUsSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 text-[#263238] overflow-hidden select-none font-sans relative">
      {/* ─── Ambient Glow Background Accents ─── */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-[#FFF314]/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">


          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#263238] tracking-tight leading-[1.15]"
          >
            Empowering Communities <br className="hidden sm:inline" />
            <span className="text-red-600 underline decoration-[#FFF314] decoration-4 underline-offset-8">
              Since 2001
            </span>
          </motion.h2>


        </div>

        {/* ─── MAIN STORY CARD WITH YOUTUBE VIDEO (First Card from AboutUs Page) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-gray-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden"
        >
          {/* Top Decorative Color Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FFF314] via-amber-400 to-red-600" />

          {/* Left Column: Styled YouTube Video Showcase (6 cols) */}
          <div className="lg:col-span-6 relative group">
            <div className="relative p-2.5 sm:p-3 bg-white rounded-3xl border border-gray-200 shadow-2xl">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-950 shadow-inner group">
                <iframe
                  className="w-full h-full object-cover"
                  src="https://www.youtube.com/embed/8fA5MBs4mr0?rel=0"
                  title="Prayas NGO Official Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            {/* Subtle Badge Overlay */}
            <div className="mt-3 flex items-center justify-between px-2 text-xs font-mono font-bold text-gray-500">
              <span className="flex items-center gap-1.5 text-red-600">
                <Play className="w-3.5 h-3.5 fill-current" /> Official Impact Video
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" /> Registered NGO
              </span>
            </div>
          </div>

          {/* Right Column: Text Overview & Key Impact Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-sans">
              <p className="font-semibold text-[#263238]">
                Prayas is a non-profit organization dedicated to creating meaningful and sustainable change in society. Established in 2001, we have been working towards empowering communities and improving lives through education, healthcare, social awareness, and community development initiatives.
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                For over two decades, Prayas has been committed to supporting underprivileged families, children, women, and communities by providing opportunities, resources, and guidance for a better future. Our efforts focus on building a society where every individual gets the chance to learn, grow, and live with dignity.
              </p>
            </div>

            {/* 2 Key Stats Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-xs flex items-start gap-3 hover:bg-white hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-red-600/10 text-red-600 shrink-0 mt-0.5">
                  <History size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#263238]">20+ Years Legacy</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Consistent ground impact & community trust</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-xs flex items-start gap-3 hover:bg-white hover:shadow-md transition-all">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 shrink-0 mt-0.5">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#263238]">Grassroot Reach</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Direct aid in villages & urban slums</p>
                </div>
              </div>
            </div>

            {/* Read Full Story Action Button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => navigate('/aboutus')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#263238] hover:bg-red-600 text-white transition-all shadow-md hover:shadow-xl cursor-pointer"
              >
                <span>Read Full Story</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
