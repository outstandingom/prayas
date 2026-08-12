// src/pages/LearnMoreDetail.tsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HeartHandshake,
  Users,
  CheckCircle2,
  HelpCircle,
  Share2,
  Maximize2,
  X,
  Compass,
  Award,
  Layers,
  ArrowUpRight,
  BookOpen,
  Play,
  ShieldCheck,
  History
} from 'lucide-react';
import { getInitiativeDetail, learnMoreData, type InitiativeDetail } from '../data/learnMoreData';

gsap.registerPlugin(ScrollTrigger);

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`;
  }
  return url;
}

export default function LearnMoreDetail() {
  const { categorySlug = 'rural-development', itemSlug = 'village-adoption' } = useParams<{
    categorySlug?: string;
    itemSlug?: string;
  }>();

  const navigate = useNavigate();
  
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const isDraggingRef = useRef(false);

  // GSAP animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<any>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Retrieve current initiative data or construct fallback
  const initiative: InitiativeDetail =
    getInitiativeDetail(categorySlug, itemSlug) ||
    learnMoreData[`rural-development/village-adoption`];

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug, itemSlug]);

  // Auto-play gallery every 8 seconds
  useEffect(() => {
    if (!initiative.gallery || initiative.gallery.length <= 1) return;
    const interval = setInterval(() => {
      setGalleryIndex((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, [initiative.gallery.length]);

  // GSAP Animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax zoom effect on Hero Image/Video
      if (heroMediaRef.current && heroRef.current) {
        gsap.to(heroMediaRef.current, {
          scale: 1.12,
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Stats card staggered entrance
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 25, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [categorySlug, itemSlug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: initiative.title,
        text: initiative.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Get related initiatives from same or other categories
  const relatedInitiatives = Object.values(learnMoreData).filter(
    (item) => item.id !== initiative.id
  ).slice(0, 3);

  const primaryColor = initiative.accentColor || '#B45309';
  const videoEmbedUrl = getYouTubeEmbedUrl(initiative.videoUrl);

  return (
    <div className="min-h-screen bg-white text-[#263238] font-sans selection:bg-[#FFF314] selection:text-[#263238] pb-24 overflow-x-hidden">
      
      {/* ─── TOP GLASS NAVIGATION BAR ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 sm:p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#263238] transition-all duration-300 hover:scale-105 active:scale-95 border border-slate-200"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <nav className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
              <Link to="/" className="hover:text-[#263238] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              <Link to="/our-work" className="hover:text-[#263238] transition-colors">What We Do</Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              <span className="text-[#263238] font-semibold line-clamp-1">{initiative.categoryName}</span>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#263238] text-xs sm:text-sm font-semibold border border-slate-200 transition-all flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <Link
              to={`/donate?cause=${initiative.id}`}
              className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
              style={{ backgroundColor: primaryColor }}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Support Cause</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION WITH PARALLAX BANNER ─── */}
      <section ref={heroRef} className="relative pt-20 sm:pt-24 pb-12 overflow-hidden bg-gradient-to-b from-slate-50 via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Banner Container */}
          <div className="relative h-[55vh] sm:h-[65vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 group">
            
            {/* Background Parallax Media */}
            {initiative.heroImage.toLowerCase().includes('.mp4') ? (
              <video
                ref={heroMediaRef}
                src={initiative.heroImage}
                className="absolute inset-0 w-full h-full object-cover object-center brightness-95"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                ref={heroMediaRef}
                src={initiative.heroImage}
                alt={initiative.title}
                className="absolute inset-0 w-full h-full object-cover object-center brightness-95"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/ruraldevelopment.jpeg';
                }}
              />
            )}

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

            {/* Content Over Banner */}
            <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-end items-start text-left z-10">
              
              {/* Category Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFF314]" />
                <span>{initiative.categoryName}</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight drop-shadow-lg max-w-4xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {initiative.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-6 drop-shadow-md"
              >
                {initiative.subtitle}
              </motion.p>

              {/* CTA Buttons inside hero */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3"
              >
                <a
                  href="#details-hub"
                  className="px-6 py-3 rounded-full bg-white text-[#263238] font-bold text-xs sm:text-sm shadow-xl hover:bg-[#FFF314] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                >
                  <span>Explore Details</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                {videoEmbedUrl && (
                  <button
                    onClick={() => {
                      const el = document.getElementById('video-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-full bg-[#15803D] text-white font-bold text-xs sm:text-sm shadow-xl hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-emerald-400/40"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Video</span>
                  </button>
                )}

                <Link
                  to="/volunteer"
                  className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold text-xs sm:text-sm border border-white/30 hover:bg-white/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Join as Volunteer</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEY IMPACT STATS COUNTER BAR ─── */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-16">
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl"
        >
          {initiative.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/80 hover:shadow-md transition-all duration-300 text-center group"
            >
              <div
                className="text-2xl sm:text-4xl font-extrabold mb-1 tracking-tight font-heading"
                style={{ color: primaryColor }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTERACTIVE TABS & CONTENT HUB ─── */}
      
      {/* ─── INTERACTIVE CONTENT HUB (SCROLLING LAYOUT) ─── */}
      <section id="details-hub" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Sticky Navigation Bar */}
        <div className="sticky top-20 sm:top-24 z-40 bg-white/80 backdrop-blur-md py-4 border-b border-slate-200/50 mb-12 flex overflow-x-auto gap-2 no-scrollbar">
          {[
            { id: 'overview-section', label: 'Overview & Mission', icon: Compass },
            ...(videoEmbedUrl ? [{ id: 'video-section', label: 'Watch Video', icon: Play }] : []),
            { id: 'impact-section', label: 'Impact Story', icon: Award },
            { id: 'gallery-section', label: 'Photo Gallery', icon: Maximize2 },
            { id: 'faqs-section', label: 'FAQs & Support', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  const el = document.getElementById(tab.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 bg-slate-50 text-slate-600 hover:text-[#263238] hover:bg-white border border-slate-200/80 shadow-sm hover:shadow-md"
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SECTION 1: OVERVIEW & OBJECTIVES */}
        <motion.div
          id="overview-section"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-12 scroll-mt-32"
        >
          {/* Deep Narrative Box */}
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#263238] mb-4 flex items-center gap-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <BookOpen className="w-7 h-7" style={{ color: primaryColor }} />
              <span>Initiative Overview</span>
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              {initiative.longDescription}
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {initiative.shortDescription}
            </p>
          </div>

          {/* Key Objectives Grid */}
          <div>
            <h3
              className="text-xl sm:text-2xl font-bold text-[#263238] mb-6 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
              <span>Core Objectives & Key Pillars</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initiative.objectives.map((obj, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: `${primaryColor}1A`, color: primaryColor }}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#263238] mb-2 group-hover:text-amber-700 transition-colors">
                    {obj.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {obj.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* SECTION: VIDEO DOCUMENTARY */}
        {videoEmbedUrl && (
          <motion.div
            id="video-section"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-gray-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden scroll-mt-32"
          >
            {/* Top Decorative Color Accent Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(to right, #FFF314, ${primaryColor}, #15803D)`
              }}
            />

            {/* Left Column: Styled YouTube Video Showcase (6 cols) */}
            <div className="lg:col-span-6 relative group">
              <div className="relative p-2.5 sm:p-3 bg-white rounded-3xl border border-gray-200 shadow-2xl">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-950 shadow-inner group">
                  <iframe
                    className="w-full h-full object-cover"
                    src={videoEmbedUrl}
                    title={initiative.videoTitle || initiative.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              {/* Subtle Badge Overlay */}
              <div className="mt-3 flex items-center justify-between px-2 text-xs font-mono font-bold text-gray-500">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <Play className="w-3.5 h-3.5 fill-current" /> Official Impact Video
                </span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Ground Work
                </span>
              </div>
            </div>

            {/* Right Column: Text Overview & Key Impact Pillars (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-[#15803D] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Featured Video Documentary</span>
                </span>

                <h3
                  className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {initiative.videoTitle || `A Green Tribute to the Heroes on Kargil Vijay Diwas 🇮🇳🌱`}
                </h3>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-sans font-medium">
                  On the solemn occasion of Kargil Vijay Diwas, Prayas Samaj Sevi Sanstha, in collaboration with the Indore Municipal Corporation, organized a meaningful tree plantation drive at Chhota Bilawali Talab, Indore, as a tribute to the brave soldiers who made the supreme sacrifice for our nation.
                </p>

                <p className="text-emerald-800 text-xs sm:text-sm font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-200/80">
                  As part of this initiative, 5,270 trees were planted in memory of 527 brave martyrs — 10 trees dedicated to each martyr. 🌳🇮🇳
                </p>
              </div>

              {/* 2 Key Stats / Highlight Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-xs flex items-start gap-3 hover:bg-white hover:shadow-md transition-all">
                  <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-700 shrink-0 mt-0.5">
                    <History size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#263238]">5,270 Trees Planted</h4>
                    <p className="text-xs text-gray-500 mt-0.5">10 trees dedicated to each martyr</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-xs flex items-start gap-3 hover:bg-white hover:shadow-md transition-all">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 shrink-0 mt-0.5">
                    <HeartHandshake size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#263238]">527 Brave Martyrs</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Honoured at Chhota Bilawali Talab</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SECTION 3: IMPACT STORY */}
        <motion.div
          id="impact-section"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8 scroll-mt-32"
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238]" style={{ fontFamily: 'var(--font-heading)' }}>Impact Story</h2>
          </div>
          {initiative.impactStory ? (
            <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-50 to-white border border-amber-200 shadow-lg overflow-hidden">
              <div className="text-7xl text-amber-500/15 font-serif font-black absolute top-2 left-6 select-none">
                “
              </div>

              <blockquote className="relative z-10 text-lg sm:text-2xl text-slate-800 font-serif italic leading-relaxed mb-8">
                "{initiative.impactStory.quote}"
              </blockquote>

              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <div
                  className="w-12 h-12 rounded-full font-bold flex items-center justify-center text-lg uppercase shadow-md text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {initiative.impactStory.author.charAt(0)}
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-[#263238]">
                    {initiative.impactStory.author}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500">
                    {initiative.impactStory.role} • {initiative.impactStory.location}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
              Impact stories for this section are currently being updated.
            </div>
          )}
        </motion.div>

        {/* SECTION 4: PHOTO GALLERY WITH SMOOTH SLIDER */}
        <motion.div
          id="gallery-section"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="scroll-mt-32 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-6 h-6" style={{ color: primaryColor }} />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#263238]" style={{ fontFamily: 'var(--font-heading)' }}>
                Photo Gallery
              </h2>
            </div>
          </div>

          {/* Ultra-Smooth Hardware Accelerated Gallery Slider */}
          <div className="relative w-full overflow-hidden rounded-3xl py-2 select-none">
            <div className="relative w-full h-[340px] sm:h-[480px] md:h-[520px] flex items-center justify-center overflow-hidden">
              {[-2, -1, 0, 1, 2].map((offset) => {
                const absoluteIndex = galleryIndex + offset;
                const length = initiative.gallery.length;
                if (length === 0) return null;
                
                const actualIdx = ((absoluteIndex % length) + length) % length;
                const imgSrc = initiative.gallery[actualIdx];

                const absOffset = Math.abs(offset);
                const translateX = offset * 56; 
                const scale = 1 - absOffset * 0.12; 
                const opacity = 1; 
                const zIndex = 50 - absOffset;
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={absoluteIndex}
                    drag={isCenter ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragStart={() => {
                      isDraggingRef.current = true;
                    }}
                    onDragEnd={(e, { offset: dragOffset, velocity }) => {
                      const swipeThreshold = 25;
                      if (dragOffset.x < -swipeThreshold || velocity.x < -120) {
                        setGalleryIndex((prev) => prev + 1);
                      } else if (dragOffset.x > swipeThreshold || velocity.x > 120) {
                        setGalleryIndex((prev) => prev - 1);
                      }
                      setTimeout(() => {
                        isDraggingRef.current = false;
                      }, 120);
                    }}
                    onClick={() => {
                      if (isDraggingRef.current) return;
                      if (isCenter) setSelectedImage(imgSrc);
                      else setGalleryIndex(absoluteIndex);
                    }}
                    className={`absolute w-[84%] sm:w-[58%] md:w-[52%] h-full rounded-3xl overflow-hidden shadow-2xl ${
                      isCenter
                        ? 'cursor-grab active:cursor-grabbing border border-amber-400/50 shadow-2xl shadow-amber-500/10'
                        : 'cursor-pointer hover:brightness-110'
                    }`}
                    initial={false}
                    animate={{
                      scale,
                      opacity,
                      x: `${translateX}%`,
                      zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                      mass: 0.8,
                    }}
                    style={{ transformOrigin: 'center center', willChange: 'transform' }}
                  >
                    {imgSrc.endsWith('.mp4') ? (
                      <video
                        src={imgSrc}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={imgSrc}
                        alt={`Gallery photo ${actualIdx + 1}`}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        draggable={false}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between mt-4 px-2 sm:px-6">
              <button
                onClick={() => setGalleryIndex((prev) => prev - 1)}
                className="p-3.5 rounded-full bg-slate-100 hover:bg-[#F5B800] hover:text-[#263238] text-slate-700 font-bold transition-all shadow-sm hover:scale-110 active:scale-95 cursor-pointer border border-slate-200"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-2">
                {initiative.gallery.map((_, idx) => {
                  const activeIdx = ((galleryIndex % initiative.gallery.length) + initiative.gallery.length) % initiative.gallery.length;
                  return (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === activeIdx ? 'w-8 bg-[#F5B800]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to photo ${idx + 1}`}
                    />
                  );
                })}
              </div>

              <button
                onClick={() => setGalleryIndex((prev) => prev + 1)}
                className="p-3.5 rounded-full bg-slate-100 hover:bg-[#F5B800] hover:text-[#263238] text-slate-700 font-bold transition-all shadow-sm hover:scale-110 active:scale-95 cursor-pointer border border-slate-200"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* SECTION 5: FAQS */}
        <motion.div
          id="faqs-section"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-4xl mx-auto scroll-mt-32"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263238]" style={{ fontFamily: 'var(--font-heading)' }}>FAQs & Support</h2>
          </div>
          {initiative.faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-base sm:text-lg text-[#263238] flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isOpen ? 'rotate-90 text-amber-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 font-normal"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </section>
{/* ─── CALL TO ACTION BANNER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 text-white shadow-2xl"
          style={{ background: `linear-gradient(135deg, #263238 0%, ${primaryColor} 100%)` }}
        >
          <div className="relative z-10 max-w-3xl">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {initiative.ctaTitle}
            </h2>
            <p className="text-white/90 text-base sm:text-lg font-light mb-8 leading-relaxed">
              {initiative.ctaDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={`/donate?cause=${initiative.id}`}
                className="px-8 py-4 rounded-full bg-[#FFF314] text-[#263238] font-bold text-sm sm:text-base hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <span>Support Cause Now</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold text-sm sm:text-base hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
              >
                Contact Program Lead
              </Link>
            </div>
          </div>

          {/* Decorative Subtle Icon Background */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
            <HeartHandshake className="w-96 h-96 text-white" />
          </div>
        </div>
      </section>

      {/* ─── RELATED INITIATIVES DISCOVERY GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#263238] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explore Other Focus Fields
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Discover more ways Prayas Foundation creates positive community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedInitiatives.map((rel) => (
            <Link
              key={rel.id}
              to={`/${rel.categorySlug}/learn-more/${rel.id}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div className="h-48 w-full relative overflow-hidden">
                <img
                  src={rel.heroImage}
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/ruraldevelopment.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/90 text-[#263238] shadow-sm backdrop-blur-md">
                  {rel.categoryName}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-[#263238] mb-2 group-hover:text-amber-700 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-light mb-4">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-[#263238] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage?.endsWith('.mp4') ? (
              <video
                src={selectedImage}
                className="max-w-[85vw] md:max-w-4xl max-h-[70vh] rounded-2xl object-contain shadow-2xl"
                autoPlay
                controls
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={selectedImage}
                alt="Enlarged preview"
                className="max-w-[85vw] md:max-w-4xl max-h-[70vh] rounded-2xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
