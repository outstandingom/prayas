import { useEffect, useRef, useState } from 'react';
import { Heart, ArrowRight, FileText, Award, Users, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface StatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: any;
}

function AnimatedStatCard({ end, suffix = '', prefix = '', label, icon: Icon }: StatProps) {
  const [count, setCount] = useState(0);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 2.2,
        ease: 'power2.out',
        delay: 0.5,
        onUpdate: () => {
          setCount(Math.floor(obj.val));
        },
      });
    }, statRef);

    return () => ctx.revert();
  }, [end]);

  return (
    <div
      ref={statRef}
      className="gsap-hero-metrics p-3.5 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/25 shadow-2xl text-center group transition-all duration-300 hover:scale-[1.03] flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-1">
        <Icon size={16} className="text-[#FFF314] opacity-90 group-hover:scale-110 transition-transform" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFF314] animate-ping" />
      </div>

      <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#FFF314] drop-shadow-md">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>

      <div className="text-[10px] sm:text-xs text-gray-200 font-mono font-bold uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

export default function PrayasDeepIntro() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.gsap-hero-pill',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          '.gsap-hero-title',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.4'
        )
        .fromTo(
          '.gsap-hero-desc',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '.gsap-hero-metrics',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          '.gsap-hero-ctas',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.gsap-hero-collage',
          { scale: 0.94, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1 },
          '-=0.8'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen bg-slate-950 text-white flex flex-col justify-center pt-0 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-12 select-none font-sans overflow-hidden border-b border-slate-800"
      style={{ paddingTop: 'calc(var(--navbar-height, 68px) + 1rem)' }}
    >
      {/* ─── 100% Fully Visible Cinematic Background Video ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100 filter brightness-105 contrast-[105%]"
        >
          <source src="/assets/education/classroom-video.mp4" type="video/mp4" />
          <source src="/education-video-child.mp4" type="video/mp4" />
        </video>
        {/* Minimal Transparent Scrim Gradient to keep video 100% clear & bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40" />
      </div>

      {/* ─── Ambient Glow Accents ─── */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-amber-400/20 via-yellow-300/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-red-500/15 via-amber-400/10 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full my-auto z-10 relative">
        
        {/* ─── Responsive Split-Hero Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* ─── LEFT COLUMN: Masterwork Editorial Content (6 cols) ─── */}
          <div className="lg:col-span-6 space-y-4 lg:space-y-5 text-left z-10">
            
            {/* 1. Pre-header Pill */}
            <div className="gsap-hero-pill">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-xl">
                <span className="w-2 h-2 rounded-full bg-[#FFF314] animate-pulse" />
                <span>Prayas Samaj Sevi Sanstha • Est. 2001</span>
              </div>
            </div>

            {/* 2. Display Headline */}
            <h1 className="gsap-hero-title text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-md">
              Empowering Communities,{' '}
              <span className="text-[#FFF314] underline decoration-amber-400/60 decoration-4 underline-offset-8 inline-block">
                Transforming Lives
              </span>{' '}
              Across India.
            </h1>

            {/* 3. Narrative Copy */}
            <div className="gsap-hero-desc space-y-3 text-sm sm:text-base text-gray-100 leading-relaxed font-sans font-normal drop-shadow-md">
              <p>
                Founded in 2001, <strong className="text-white font-bold">Prayas Samaj Sevi Sanstha</strong> is a premier multi-disciplinary social welfare organization. We operate 100% directly at the grassroots level across rural development, women empowerment, free healthcare, environmental conservation, and education.
              </p>
            </div>

            {/* 4. Premium Animated Stats Cards */}
            <div className="grid grid-cols-3 gap-3.5 pt-1">
              <AnimatedStatCard
                end={20}
                suffix="+"
                label="Yrs Legacy"
                icon={Award}
              />
              <AnimatedStatCard
                end={25000}
                suffix="+"
                label="Lives Touched"
                icon={Users}
              />
              <AnimatedStatCard
                end={50}
                suffix="+"
                label="Villages"
                icon={MapPin}
              />
            </div>

            {/* 5. CTA Action Buttons */}
            <div className="gsap-hero-ctas flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/donate')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold bg-[#FFF314] hover:bg-[#F5B800] text-[#263238] shadow-xl transition-all cursor-pointer border border-amber-400/40 hover:scale-105 active:scale-95"
              >
                <Heart size={16} className="fill-current text-[#263238]" />
                <span>Support Our Cause</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2.5 px-5.5 py-3 rounded-full text-xs sm:text-sm font-extrabold bg-black/60 backdrop-blur-md text-white hover:bg-white/20 border border-white/30 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <FileText size={16} />
                <span>Read Organization Profile</span>
              </button>
            </div>

          </div>

          {/* ─── RIGHT COLUMN: Floating Bento Collage Showcase (Hidden per request) ─── */}
          {/* 
          <div className="lg:col-span-6 relative">
            <div className="gsap-hero-collage grid grid-cols-2 gap-3.5 sm:gap-4">
              
              <div className="col-span-2 aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl group hover:border-[#FFF314] transition-all">
                <img
                  src="/assets/environment/kargil-vatika-forest.jpg"
                  alt="Prayas Reforestation Drive"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-xl group hover:border-[#FFF314] transition-all">
                <img
                  src="/assets/women-empowerment/sewing-training.jpeg"
                  alt="Prayas Women Empowerment"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-xl group hover:border-[#FFF314] transition-all">
                <img
                  src="/assets/healthcare/health-camp.jpeg"
                  alt="Prayas Free Healthcare Camp"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

            </div>
          </div>
          */}

        </div>

      </div>
    </section>
  );
}
