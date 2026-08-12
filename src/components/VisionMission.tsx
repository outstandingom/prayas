import { motion } from 'framer-motion';
import { Eye, Target, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VisionMission() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 bg-white text-[#263238] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Section Header ─── */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#263238] tracking-tight"
          >
            Vision & Mission
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full shadow-xs" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed"
          >
            Driving sustainable social change and human dignity through grassroot execution.
          </motion.p>
        </div>

        {/* ─── Cards Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Our Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/90 hover:border-teal-600/40 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
          >
            {/* Top Colored Accent Border Line */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-full" />

            <div className="space-y-6">
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-2xl bg-teal-600/10 border border-teal-600/20 flex items-center justify-center text-teal-700 shadow-sm">
                <Eye size={24} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                  {t(
                    'vision.desc',
                    'To build a just, equitable, and empowered society where every individual has access to quality education, healthcare, sustainable livelihood, and living with dignity.'
                  )}
                </p>
              </div>

              {/* Key Pillars */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-sans">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <span>Equal Education & Skill Development Opportunities</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-sans">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <span>Dignified Livelihoods & Female Self-Reliance</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-sans">
                  <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                  <span>Accessible Healthcare & Environmental Balance</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Our Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/90 hover:border-amber-500/40 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
          >
            {/* Top Colored Accent Border Line */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-t-full" />

            <div className="space-y-6">
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 shadow-sm">
                <Target size={24} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                  {t(
                    'mission.desc',
                    'To empower underserved communities through sustainable development programs in education, healthcare, livelihood, and environmental stewardship, while fostering local leadership and collective action.'
                  )}
                </p>
              </div>

              {/* Key Pillars */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-sans">
                  <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                  <span>Village Adoption & Clean Water Infrastructure</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-sans">
                  <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                  <span>Organ Donation Advocacy & Health Camps</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-sans">
                  <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                  <span>Kargil Vatika & Reforestation Initiatives</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
