import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, History, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ScrollStory() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 bg-white text-[#263238] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight"
          >
            Empowering Communities Since 2001
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans"
          >
            Dedicated to creating meaningful, self-sustaining social transformation through education, healthcare, women empowerment, and rural development.
          </motion.p>
        </div>

        {/* ─── Main 50/50 Content Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Styled Video Frame Showcase (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            {/* Outer Decorative Frame Border */}
            <div className="relative p-2.5 sm:p-3 bg-white rounded-3xl border border-gray-200 shadow-2xl">
              
              {/* YouTube Aspect Ratio Frame */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 shadow-inner group">
                <iframe
                  className="w-full h-full object-cover"
                  src="https://www.youtube.com/embed/8fA5MBs4mr0?rel=0"
                  title="Prayas NGO Story"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>


            </div>
          </motion.div>

          {/* Right Column: Editorial Text & Key Pillars (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-sans">
              <p className="font-medium text-[#263238]">
                Prayas Social Welfare Society is a grassroot non-profit organization dedicated to enabling dignity, hope, and self-reliance for vulnerable populations across India.
              </p>
              <p>
                For over two decades, our team and dedicated volunteers have worked tirelessly to support underprivileged families, children, and women through actionable programs in rural development, vocational skill centers, digital education, and healthcare outreach.
              </p>
            </div>

            {/* 3 Key Impact Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
                <div className="p-2 rounded-lg bg-teal-600/10 text-teal-700 shrink-0 mt-0.5">
                  <History size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#263238]">20+ Years Legacy</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Consistent ground impact & community trust</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 shrink-0 mt-0.5">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#263238]">Grassroot Reach</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Direct aid in villages & urban slums</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-[#263238] hover:bg-[#1a2328] text-white transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Read Full Story</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
