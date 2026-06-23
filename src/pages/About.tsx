// src/pages/About.tsx
import { motion } from 'framer-motion';
import { Heart, Users, GraduationCap, Leaf, Stethoscope, Home, Lightbulb, Target, Globe, HandHeart } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { number: '25+', label: t('about.stats.years', 'Years of Service') },
    { number: '10K+', label: t('about.stats.lives', 'Lives Impacted') },
    { number: '50+', label: t('about.stats.villages', 'Villages Reached') },
    { number: '200+', label: t('about.stats.volunteers', 'Volunteers') },
  ];

  const values = [
    { icon: Heart, title: t('about.values.compassion.title', 'Compassion'), desc: t('about.values.compassion.desc', 'We approach every initiative with empathy and care for those we serve.') },
    { icon: Target, title: t('about.values.commitment.title', 'Commitment'), desc: t('about.values.commitment.desc', 'We are dedicated to creating lasting change through consistent effort.') },
    { icon: Globe, title: t('about.values.sustainability.title', 'Sustainability'), desc: t('about.values.sustainability.desc', 'We build solutions that endure and empower communities long-term.') },
    { icon: HandHeart, title: t('about.values.collaboration.title', 'Collaboration'), desc: t('about.values.collaboration.desc', 'We work together with communities, donors, and volunteers to maximize impact.') },
  ];

  const initiatives = [
    { icon: GraduationCap, label: t('about.initiatives.education', 'Education') },
    { icon: Stethoscope, label: t('about.initiatives.healthcare', 'Healthcare') },
    { icon: Users, label: t('about.initiatives.empowerment', 'Empowerment') },
    { icon: Leaf, label: t('about.initiatives.environment', 'Environment') },
    { icon: Home, label: t('about.initiatives.shelter', 'Shelter') },
    { icon: Lightbulb, label: t('about.initiatives.skill', 'Skill Development') },
  ];

  return (
    <section className="min-h-screen bg-[#F1F8F5] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFF314]/30 bg-[#FFF314]/10 mb-4 shadow-sm">
            <Heart className="w-4 h-4 text-[#FFF314] fill-[#FFF314]" />
            <span className="text-xs font-bold text-[#263238] uppercase tracking-wider">{t('about.badge', 'About Us')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263238] mb-4">
            {t('about.hero.title', 'Making a Difference')}{' '}
            <span className="text-[#FFF314]">{t('about.hero.titleHighlight', 'Together')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#263238]/70 max-w-3xl mx-auto leading-relaxed">
            {t('about.hero.subtitle', 'For over two decades, Prayas has been at the forefront of social change, empowering communities and transforming lives across India.')}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center border border-[#FFF314]/20 shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-3xl sm:text-4xl font-bold text-[#FFF314]">{stat.number}</p>
              <p className="text-sm text-[#263238]/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Our Story */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#FFF314]/20 shadow-lg">
            <h2 className="text-2xl font-bold text-[#263238] mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#FFF314] fill-[#FFF314]" />
              {t('about.story.title', 'Our Story')}
            </h2>
            <p className="text-[#263238]/70 leading-relaxed mb-4">{t('about.story.p1', 'Prayas is a non-profit organization dedicated to creating meaningful and sustainable change in society. Established in 2001, we have been working towards empowering communities and improving lives through education, healthcare, social awareness, and community development initiatives.')}</p>
            <p className="text-[#263238]/70 leading-relaxed">{t('about.story.p2', 'For over two decades, Prayas has been committed to supporting underprivileged families, children, women, and communities by providing opportunities, resources, and guidance for a better future.')}</p>
          </motion.div>

          {/* Our Mission */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#FFF314]/20 shadow-lg">
            <h2 className="text-2xl font-bold text-[#263238] mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-[#FFF314]" />
              {t('about.mission.title', 'Our Mission')}
            </h2>
            <p className="text-[#263238]/70 leading-relaxed mb-4">{t('about.mission.p1', 'With the support of volunteers, donors, and well-wishers, we have positively impacted thousands of lives across different communities.')}</p>
            <p className="text-[#263238]/70 leading-relaxed">{t('about.mission.p2', 'Our journey is driven by compassion, commitment, and the belief that even small efforts can create a lasting impact. Together, we strive to bring hope, opportunity, and transformation to those who need it the most.')}</p>
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#263238] text-center mb-6">
            {t('about.valuesSection.title', 'Our')} <span className="text-[#FFF314]">{t('about.valuesSection.titleHighlight', 'Values')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center border border-[#FFF314]/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#FFF314]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#FFF314]" />
                  </div>
                  <h3 className="font-bold text-[#263238] mb-1">{value.title}</h3>
                  <p className="text-sm text-[#263238]/60">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Initiatives */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#FFF314]/20 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-[#263238] text-center mb-6">
            {t('about.initiativesSection.title', 'Our')} <span className="text-[#FFF314]">{t('about.initiativesSection.titleHighlight', 'Initiatives')}</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {initiatives.map((item, index) => {
              const Icon = item.icon;
              return (
                <span key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF314]/10 rounded-full border border-[#FFF314]/20 text-sm font-medium text-[#263238]">
                  <Icon className="w-4 h-4 text-[#FFF314]" />
                  {item.label}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="text-center">
          <h2 className="text-2xl font-bold text-[#263238] mb-4">
            {t('about.social.title', 'Connect With')} <span className="text-[#FFF314]">{t('about.social.titleHighlight', 'Us')}</span>
          </h2>
          <p className="text-[#263238]/60 text-sm mb-6">{t('about.social.desc', 'Follow us on social media to stay updated with our latest initiatives and impact stories.')}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://www.facebook.com/prayassamajiksanstha" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl" aria-label="Facebook"><FaFacebook className="w-7 h-7" /></a>
            <a href="https://www.instagram.com/prayas_samajik_sanstha" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl" aria-label="Instagram"><FaInstagram className="w-7 h-7" /></a>
            <a href="https://www.youtube.com/channel/UC16ZbLnP1qJxrKQoKsss12w" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl" aria-label="YouTube"><FaYoutube className="w-7 h-7" /></a>
            <a href="https://www.linkedin.com/company/prayas-samajik-sanstha" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl" aria-label="LinkedIn"><FaLinkedin className="w-7 h-7" /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
