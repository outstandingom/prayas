import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, ArrowRight, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function PrayasPhotoGrid() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Photo Cards Entrance Animation
      gsap.fromTo(
        '.gsap-photo-tile',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-24 bg-white text-[#263238] font-sans border-b border-gray-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 block">
            Grassroots Field Documentation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
            Over 20 Years of Verified Direct Impact
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full shadow-xs" />
        </div>

        {/* Split Layout: Symmetrical 2x2 Photo Grid + Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Symmetrical 2x2 Photo Grid (7 cols) - Pure Unobstructed Photography */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5">
            
            {/* Tile 1: Sanskarshala Education */}
            <div className="gsap-photo-tile aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200/90 shadow-xl group">
              <img
                src="/P1039409.JPG"
                alt="Prayas Child Education"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Tile 2: Women Empowerment */}
            <div className="gsap-photo-tile aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200/90 shadow-xl group">
              <img
                src="/WOMEN.jpeg"
                alt="Prayas Women Empowerment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Tile 3: Free Healthcare Camps */}
            <div className="gsap-photo-tile aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200/90 shadow-xl group">
              <img
                src="/PRAYASHEALTHCAMP.jpeg"
                alt="Prayas Healthcare Camp"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Tile 4: Kargil Vatika Reforestation */}
            <div className="gsap-photo-tile aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200/90 shadow-xl group">
              <img
                src="/TREEGROW.jpg"
                alt="Prayas Kargil Vatika Reforestation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

          </div>

          {/* Right Column: Mission Narrative & Action CTAs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-700 text-xs font-mono font-bold">
                <ShieldCheck size={14} />
                <span>100% Direct Ground Operations</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238] leading-tight">
                Empowering Rural Families with Dignity & Transparency
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                Founded in 2001 by dedicated social leaders, Prayas works directly with rural families, parents, teachers, and Anganwadi health workers to eliminate poverty, advance child literacy, and foster economic independence for women.
              </p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                Unlike distant charities, 100% of our operations are executed directly on the ground in villages and slums with verified audit tracking and legal compliance.
              </p>
            </div>

            {/* Key Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/donate')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <Heart size={16} className="fill-current" />
                <span>Support Our Programs</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-white text-[#263238] hover:text-red-600 border border-gray-200 hover:border-red-200 shadow-sm transition-all cursor-pointer"
              >
                <span>Read Organization Profile</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
