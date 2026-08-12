import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  CheckCircle2,
  Sparkles,
  Compass,
  ShieldCheck,
  History,
  HeartHandshake,
  Eye,
  Rocket
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function About2() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-about-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.gsap-vision-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-vision-wrapper',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-[#FBF9F5] text-[#263238] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans select-none"
    >
      {/* ─── Ambient Glow Gradients ─── */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FFF314]/20 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20 sm:space-y-28">

        {/* ─── 1. HERO SECTION ─── */}
        <div className="gsap-about-hero text-center max-w-4xl mx-auto space-y-5 pt-4">


          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#263238] tracking-tight leading-[1.15]">
            Empowering Communities <br className="hidden sm:inline" />
            <span className="text-red-600 underline decoration-[#FFF314] decoration-4 underline-offset-8">
              Since 2001
            </span>
          </h1>


        </div>

        {/* ─── 2. MAIN STORY SECTION WITH YOUTUBE VIDEO ─── */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-gray-200/90 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: High-Impact Ground Photo Showcase (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative p-2.5 sm:p-3 bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden group">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-950 shadow-inner">
                <img
                  src="/CHILDRENGROUP.jpg"
                  alt="Prayas Ground Impact"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[98%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono font-bold bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
                  Prayas Grassroots Community Initiative
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text Overview & Key Impact Pillars (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-sans">
              <p className="font-semibold text-[#263238]">
                Prayas is a non-profit organization dedicated to creating meaningful and sustainable change in society. Established in 2001, we have been working towards empowering communities and improving lives through education, healthcare, social awareness, and community development initiatives.
              </p>
              <p className="text-gray-600">
                For over two decades, Prayas has been committed to supporting underprivileged families, children, women, and communities by providing opportunities, resources, and guidance for a better future. Our efforts focus on building a society where every individual gets the chance to learn, grow, and live with dignity.
              </p>
            </div>

            {/* 2 Key Stats Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-xs flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-600/10 text-red-600 shrink-0 mt-0.5">
                  <History size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#263238]">20+ Years Legacy</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Consistent ground impact & community trust</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 shadow-xs flex items-start gap-3">
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
            <div className="pt-2">
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#263238] hover:bg-red-600 text-white transition-all shadow-md hover:shadow-xl cursor-pointer"
              >
                <span>Read Full Story</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

        </div>

        {/* ─── 3. VISION & MISSION SECTION ─── */}
        <div className="gsap-vision-wrapper space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>CORE PURPOSE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#263238] tracking-tight">
              Vision & Mission
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto rounded-full" />

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
              Driving sustainable social change and human dignity through grassroot execution.
            </p>
          </div>

          {/* Vision & Mission 2-Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* OUR VISION CARD */}
            <motion.div
              whileHover={{ y: -6 }}
              className="gsap-vision-card bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 to-amber-600" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    <Eye className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">OUR DESTINATION</span>
                    <h3 className="text-2xl font-extrabold text-[#263238]">Our Vision</h3>
                  </div>
                </div>

                <p className="text-gray-700 text-base leading-relaxed font-sans font-medium">
                  To build a just, equitable, and empowered society where every individual has access to quality education, healthcare, sustainable livelihood, and living with dignity.
                </p>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Equal Education & Skill Development Opportunities</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Dignified Livelihoods & Female Self-Reliance</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Accessible Healthcare & Environmental Balance</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* OUR MISSION CARD */}
            <motion.div
              whileHover={{ y: -6 }}
              className="gsap-vision-card bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-red-700" />

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-red-600/10 text-red-600 border border-red-600/20">
                    <Rocket className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest block">OUR ACTION PLAN</span>
                    <h3 className="text-2xl font-extrabold text-[#263238]">Our Mission</h3>
                  </div>
                </div>

                <p className="text-gray-700 text-base leading-relaxed font-sans font-medium">
                  To empower underserved communities through sustainable development programs in education, healthcare, livelihood, and environmental stewardship, while fostering local leadership and collective action.
                </p>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>Village Adoption & Clean Water Infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>Organ Donation Advocacy & Health Camps</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>Kargil Vatika & Reforestation Initiatives</span>
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ─── 4. SOCIAL MEDIA CONNECT ─── */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200/90 shadow-xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238]">Connect With Prayas Sanstha</h3>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Stay updated with our latest field updates, social drives, and impact stories.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <a
              href="https://www.facebook.com/prayassamajiksanstha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
              aria-label="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/prayas_samajik_sanstha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC16ZbLnP1qJxrKQoKsss12w"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
              aria-label="YouTube"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/prayas-samaj-sevi-sastha-undefined-0a468b418/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/pryasaa?s=11"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#000000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
