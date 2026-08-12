import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Heart,
  Users,
  GraduationCap,
  Leaf,
  Stethoscope,
  Target,
  Globe,
  HandHeart,
  ArrowRight,
  Award,
  Quote,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  const [activeTab, setActiveTab] = useState<'story' | 'mission'>('story');

  const stats = [
    { number: '25+', label: t('about.stats.years', 'Years of Dedicated Service'), sub: 'Founded in 2001', color: '#D4AF37' },
    { number: '10K+', label: t('about.stats.lives', 'Lives Directly Impacted'), sub: 'Across 50+ Villages', color: '#DC2626' },
    { number: '50+', label: t('about.stats.villages', 'Villages Adopted'), sub: 'Rural & Tribal Regions', color: '#059669' },
    { number: '200+', label: t('about.stats.volunteers', 'Active Community Volunteers'), sub: 'Selfless Grassroots Force', color: '#2563EB' },
  ];

  const values = [
    {
      icon: Heart,
      title: t('about.values.compassion.title', 'Compassion'),
      desc: t('about.values.compassion.desc', 'We approach every initiative with empathy and deep care for those we serve.'),
    },
    {
      icon: Target,
      title: t('about.values.commitment.title', 'Commitment'),
      desc: t('about.values.commitment.desc', 'We are dedicated to creating lasting, self-sustaining change through consistent action.'),
    },
    {
      icon: Globe,
      title: t('about.values.sustainability.title', 'Sustainability'),
      desc: t('about.values.sustainability.desc', 'We build solutions that endure and empower communities for generations to come.'),
    },
    {
      icon: HandHeart,
      title: t('about.values.collaboration.title', 'Collaboration'),
      desc: t('about.values.collaboration.desc', 'We work hand-in-hand with local leaders, donors, and volunteers to maximize impact.'),
    },
  ];

  // Reliance Foundation style Organic Tree Timeline Data
  const treeMilestones = [
    {
      period: '2001-05',
      title: 'Foundation & Grassroots Outreach',
      image: '/CHILDRENGROUP.jpg',
      points: [
        'Prayas Social Welfare Society is established with a vision to inspire and drive transformative change and build an inclusive, self-reliant India.',
        'Launch of direct village outreach and child welfare initiatives across underprivileged regions.',
        'Introduction of free emergency relief distribution, healthcare support, and community awareness drives.'
      ]
    },
    {
      period: '2008-12',
      title: 'Sanskarshala & Digital Education',
      image: '/P1039409.JPG',
      points: [
        'Establishment of Sanskarshala value-based evening education tutorial labs for underprivileged children.',
        'Distribution of free study kits, digital literacy modules, and youth mentorship.',
        'Empowered over 5,000+ students with foundational learning, moral values, and school enrollment support.'
      ]
    },
    {
      period: '2015-18',
      title: 'Women Livelihood & Empowerment',
      image: '/P1039322.JPG',
      points: [
        'Setting up vocational sewing and tailoring centers for rural mothers to achieve financial independence.',
        'Launch of Sabji Wali Didi micro-entrepreneurship support enabling sustainable daily income for families.',
        'Formation of active Self-Help Groups (SHGs) driving financial literacy and dignity for 2,500+ women.'
      ]
    },
    {
      period: '2022-24',
      title: 'Kargil Vatika & Environmental Action',
      image: '/TREEGROW.jpg',
      points: [
        'Planted thousands of native trees to create Kargil Vatika memorial forests honoring Indian army martyrs.',
        'Implementation of rainwater harvesting systems and plastic-mukti drives across adopted villages.',
        'Promoting ecological balance, organic farming awareness, and clean community environments.'
      ]
    },
    {
      period: '2025-26',
      title: 'Systemic Village Adoption & Policy',
      image: '/PRAYASHEALTHCAMP.jpeg',
      points: [
        'Holistic adoption of 50+ villages providing clean water, sanitation infrastructure, and health outreach.',
        'Organized specialized medical camps, diagnostic care, and organ donation drives impacting 15,000+ lives.',
        'Advocating public policy changes to ensure sustainable long-term development for future generations.'
      ]
    }
  ];

  const initiatives = [
    { icon: GraduationCap, label: t('about.initiatives.education', 'Education & Skill Development'), img: '/P1039409.JPG', count: '5,000+ Youth Mentored', link: '/education' },
    { icon: Stethoscope, label: t('about.initiatives.healthcare', 'Health Camps & Organ Advocacy'), img: '/PRAYASHEALTHCAMP.jpeg', count: '15,000+ Patients Served', link: '/healthcare' },
    { icon: Users, label: t('about.initiatives.empowerment', 'Women Empowerment & Livelihood'), img: '/P1039322.JPG', count: '2,500+ Women Empowered', link: '/women-empowerment' },
    { icon: Leaf, label: t('about.initiatives.environment', 'Environment & Reforestation'), img: '/TREEGROW.jpg', count: '100,000+ Trees Planted', link: '/environment' },
  ];

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Title & Subtitle Entrance
      gsap.fromTo(
        '.gsap-hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.gsap-hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      // 2. Parallax Image Zoom in Hero
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          scale: 1.1,
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 3. Stats Cards Stagger
      gsap.fromTo(
        '.gsap-stat-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-stats-wrapper',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-white text-[#263238] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans select-none"
    >
      {/* ─── Ambient Glow Backdrops ─── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/5 via-red-500/5 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ─── 1. Luxury Hero Header ─── */}
        <div className="text-center mb-14 sm:mb-20 space-y-6 max-w-4xl mx-auto">

          <h1 className="gsap-hero-title text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#263238] tracking-tight leading-[1.12] font-sans">
            Transforming Lives with{' '}
            <span className="relative inline-block text-red-600">
              Hope & Dignity
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-400" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="gsap-hero-sub text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans font-normal">
            {t(
              'about.hero.subtitle',
              'For over two decades, Prayas has been at the forefront of social change, empowering communities and transforming lives across India.'
            )}
          </p>
        </div>

        {/* ─── 2. GSAP Parallax Editorial Banner Showcase ─── */}
        <div className="relative mb-20 sm:mb-24 rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] sm:aspect-[21/9] w-full max-h-[520px] group">
          <img
            ref={heroImageRef}
            src="/CHILDRENGROUP.jpg"
            alt="Prayas NGO Community Impact"
            className="w-full h-full object-cover object-center transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263238]/90 via-[#263238]/40 to-transparent" />

          {/* Floating Glassmorphism Quote on Banner */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white max-w-3xl flex items-start gap-4 bg-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFF314] shrink-0 opacity-90 mt-1" />
            <div>
              <p className="text-sm sm:text-lg font-medium italic leading-relaxed text-gray-100 font-sans">
                "Our mission is simple yet profound: to nurture self-reliance in every village and bring dignity to every human life we touch."
              </p>
              <span className="text-xs sm:text-sm font-bold text-[#FFF314] mt-2 block tracking-wider uppercase font-mono">
                — Prayas Social Welfare Society
              </span>
            </div>
          </div>
        </div>

        {/* ─── 3. Impact Stats Grid ─── */}
        <div className="gsap-stats-wrapper grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 sm:mb-28">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="gsap-stat-card bg-white rounded-3xl p-6 sm:p-8 text-center border border-gray-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-amber-500" />
              <p
                className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight group-hover:scale-105 transition-transform"
                style={{ color: stat.color }}
              >
                {stat.number}
              </p>
              <p className="text-sm sm:text-base font-extrabold text-[#263238] mt-3 font-sans">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ─── 4. Interactive Editorial Story & Mission Showcase (Tabs) ─── */}
        <div className="gsap-story-wrapper mb-24 sm:mb-32">

          {/* Tab Switchers */}
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveTab('story')}
              className={`relative px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all cursor-pointer ${activeTab === 'story'
                  ? 'bg-[#263238] text-white shadow-xl scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
            >
              <span>Our Story & Legacy</span>
            </button>

            <button
              onClick={() => setActiveTab('mission')}
              className={`relative px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all cursor-pointer ${activeTab === 'mission'
                  ? 'bg-[#263238] text-white shadow-xl scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
            >
              <span>Our Mission & Vision</span>
            </button>
          </div>

          {/* Tab Content Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 border border-gray-200/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {activeTab === 'story' ? (
                <>
                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" />
                      <span>OUR HERITAGE SINCE 2001</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight">
                      Two Decades of Grassroots Compassion
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-sans">
                      {t(
                        'about.story.p1',
                        'Prayas is a non-profit organization dedicated to creating meaningful and sustainable change in society. Established in 2001, we have been working towards empowering communities and improving lives through education, healthcare, social awareness, and community development initiatives.'
                      )}
                    </p>

                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-sans">
                      {t(
                        'about.story.p2',
                        'For over two decades, Prayas has been committed to supporting underprivileged families, children, women, and communities by providing opportunities, resources, and guidance for a better future.'
                      )}
                    </p>

                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => navigate('/contact')}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      >
                        <span>Support Our Cause</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 group">
                    <img
                      src="/EDUCATION.JPG"
                      alt="Prayas Story in Action"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#263238]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white flex items-center gap-2 bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                      <CheckCircle2 size={20} className="text-amber-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold font-sans">
                        Grassroots Impact Across 50+ Adopted Villages
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 group">
                    <img
                      src="/PRAYASHEALTHCAMP.jpeg"
                      alt="Prayas Mission in Action"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#263238]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white flex items-center gap-2 bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                      <CheckCircle2 size={20} className="text-red-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold font-sans">
                        Free Rural Medical Camps & Lifesaving Organ Advocacy
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-red-600/10 text-red-600 text-xs font-mono font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>OUR CORE PURPOSE</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight">
                      Igniting Self-Reliance & Purpose
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-sans">
                      {t(
                        'about.mission.p1',
                        'With the support of volunteers, donors, and well-wishers, we have positively impacted thousands of lives across different communities.'
                      )}
                    </p>

                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-sans">
                      {t(
                        'about.mission.p2',
                        'Our journey is driven by compassion, commitment, and the belief that even small efforts can create a lasting impact. Together, we strive to bring hope, opportunity, and transformation to those who need it the most.'
                      )}
                    </p>

                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => navigate('/volunteer')}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#263238] hover:bg-[#1a2328] text-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      >
                        <span>Become a Volunteer</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── 5. ORGANIC VINE TREE TIMELINE SECTION (Reliance Foundation Style) ─── */}
        <div className="mb-24 sm:mb-36 relative">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#263238] font-sans tracking-tight">
              Our Journey Over The Years
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto font-normal">
              A timeline of key transformation initiatives empowering communities across India.
            </p>
          </div>

          {/* Organic Tree Vine Container */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

            {/* Continuous S-Shaped Organic Tree Vine in Center for Both Mobile & Desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-12 sm:w-16 -translate-x-1/2 pointer-events-none z-0 overflow-visible">
              <svg className="w-full h-full text-[#9C7A58]" viewBox="0 0 100 1200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="organic-vine-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B8946E" />
                    <stop offset="50%" stopColor="#9C7A58" />
                    <stop offset="100%" stopColor="#806243" />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 0 C 110 180, -10 360, 50 540 C 110 720, -10 900, 50 1080 C 110 1260, 50 1400, 50 1500"
                  stroke="url(#organic-vine-gradient)"
                  strokeWidth="7"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Timeline Items Grid: Alternating Left/Right Image & Text on Desktop, Centered on Mobile */}
            <div className="space-y-16 sm:space-y-24">
              {treeMilestones.map((m, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center"
                  >
                    {/* Photo Column */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`lg:col-span-5 relative z-10 ${isEven ? 'lg:order-1' : 'lg:order-3'}`}
                    >
                      {/* Soft Mint Outer Framing Box */}
                      <div className="absolute -inset-3 bg-[#E6F4EA] rounded-[2.2rem] transform -rotate-1 pointer-events-none" />

                      <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-900 border-4 border-white group">
                        <img
                          src={m.image}
                          alt={m.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono font-bold bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-center lg:text-left">
                          {m.title}
                        </div>
                      </div>
                    </motion.div>

                    {/* Center Column: Single Unified Dual-Leaf Cluster Element Centered Directly on the Vine */}
                    <div className="flex lg:col-span-2 justify-center items-center relative z-20 my-2 lg:my-0 lg:order-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: 'spring', stiffness: 300 }}
                        className={`relative flex items-center justify-center pointer-events-none ${idx === 0
                            ? 'lg:translate-x-2'
                            : idx === 1
                              ? 'lg:-translate-x-1.5'
                              : idx === 2
                                ? 'lg:translate-x-3'
                                : idx === 3
                                  ? 'lg:-translate-x-1'
                                  : 'lg:translate-x-2'
                          }`}
                      >
                        {/* Single Unified SVG Leaf Pair Element */}
                        <svg className="w-20 h-12 sm:w-24 sm:h-14 text-[#00A859] fill-current drop-shadow-md overflow-visible" viewBox="0 0 160 80">
                          {/* Left Leaf Sprouting Up & Left */}
                          <path d="M 80 50 Q 30 10, 5 30 Q 40 70, 80 50 Z" stroke="#007A3E" strokeWidth="3" />
                          <path d="M 80 50 Q 45 35, 15 32" stroke="#007A3E" strokeWidth="2" fill="none" />

                          {/* Right Leaf Sprouting Up & Right */}
                          <path d="M 80 50 Q 130 10, 155 30 Q 120 70, 80 50 Z" stroke="#007A3E" strokeWidth="3" />
                          <path d="M 80 50 Q 115 35, 145 32" stroke="#007A3E" strokeWidth="2" fill="none" />

                          {/* Central Stem Node Bud joining both leaves seamlessly */}
                          <circle cx="80" cy="50" r="4" fill="#007A3E" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Information Column */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`lg:col-span-5 text-left space-y-5 relative z-10 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xl lg:bg-transparent lg:p-0 lg:border-none lg:shadow-none ${isEven ? 'lg:order-3' : 'lg:order-1'}`}
                    >
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#263238] font-sans tracking-tight text-center lg:text-left">
                        {m.period}
                      </h3>

                      <div className="space-y-4 pt-1">
                        {m.points.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3.5">
                            <span className="w-5 h-5 rounded-full border-2 border-[#00A859] flex items-center justify-center shrink-0 mt-1 bg-emerald-50 shadow-xs">
                              <span className="w-2 h-2 rounded-full bg-[#00A859]" />
                            </span>
                            <p className="text-sm sm:text-base text-gray-700 font-normal leading-relaxed font-sans">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* ─── 6. Framer Motion Core Values Grid ─── */}
        <div className="gsap-values-wrapper mb-24 sm:mb-32">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
              {t('about.valuesSection.title', 'Our')}{' '}
              <span className="text-red-600">{t('about.valuesSection.titleHighlight', 'Values')}</span>
            </h2>
            <p className="text-gray-600 text-base max-w-xl mx-auto">The foundational ethical principles guiding every grassroots initiative we lead.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="gsap-value-card bg-white rounded-3xl p-8 text-center border border-gray-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-600 flex items-center justify-center mx-auto mb-5 group-hover:bg-red-600 group-hover:text-white transition-all shadow-md">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#263238] mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── 7. Focus Initiatives Visual Grid ─── */}
        <div className="gsap-initiatives-wrapper bg-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 border border-gray-200/90 shadow-2xl mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
              {t('about.initiativesSection.title', 'Our')}{' '}
              <span className="text-red-600">{t('about.initiativesSection.titleHighlight', 'Initiatives')}</span>
            </h2>
            <p className="text-gray-600 text-base">Targeted programs delivering tangible human impact across India.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(item.link)}
                  className="gsap-initiative-card rounded-3xl overflow-hidden border border-gray-200/90 shadow-xl hover:shadow-2xl transition-all bg-white group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#263238]/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-white/95 text-red-600 backdrop-blur-md shadow-md border border-gray-100">
                      <Icon size={18} />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-base font-extrabold text-[#263238] leading-snug group-hover:text-red-600 transition-colors">{item.label}</h4>
                    <span className="text-xs font-mono font-bold text-red-600 block">{item.count}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── 8. Social Connect Hub ─── */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238]">
            {t('about.social.title', 'Connect With')}{' '}
            <span className="text-red-600">{t('about.social.titleHighlight', 'Us')}</span>
          </h2>
          <p className="text-gray-600 text-base max-w-lg mx-auto leading-relaxed">
            {t('about.social.desc', 'Follow us on social media to stay updated with our latest initiatives and impact stories.')}
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-3">
            <a
              href="https://www.facebook.com/prayassamajiksanstha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-lg hover:shadow-2xl cursor-pointer"
              aria-label="Facebook"
            >
              <FaFacebook className="w-7 h-7" />
            </a>
            <a
              href="https://www.instagram.com/prayas_samajik_sanstha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-lg hover:shadow-2xl cursor-pointer"
              aria-label="Instagram"
            >
              <FaInstagram className="w-7 h-7" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC16ZbLnP1qJxrKQoKsss12w"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-lg hover:shadow-2xl cursor-pointer"
              aria-label="YouTube"
            >
              <FaYoutube className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/prayas-samaj-sevi-sastha-undefined-0a468b418/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-lg hover:shadow-2xl cursor-pointer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
            <a
              href="https://x.com/pryasaa?s=11"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-[#000000] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-lg hover:shadow-2xl cursor-pointer"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-7 h-7" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
