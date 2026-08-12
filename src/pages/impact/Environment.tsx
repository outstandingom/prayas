import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  Target,
  Award,
  Users,
  Trees,
  Sprout,
  Droplets,
  Leaf,
  Heart,
  ArrowUpRight,
  SunMedium
} from 'lucide-react';
import gsap from 'gsap';

const subCategories = [
  {
    id: 'plantation',
    title: 'Plantation',
    icon: Trees,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
    description: 'Massive tree plantation drives for ecological balance.',
    longDescription:
      'Our Plantation programme is not just about planting trees – it is about creating forests. We select native species, involve local communities in nurturing saplings, and monitor survival rates. We have planted over 50,000 trees across various regions, creating green corridors and improving biodiversity. We also educate farmers about agro‑forestry to enhance soil fertility and provide additional income from timber and fruits.',
  },
  {
    id: 'kargil-vatika',
    title: 'Kargil Vatika',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=500&fit=crop',
    description: 'A tribute forest honouring the brave soldiers of Kargil.',
    longDescription:
      'Kargil Vatika is a special memorial garden dedicated to the martyrs of the Kargil War. We have planted thousands of trees in a dedicated area, each tree symbolising the valour and sacrifice of our soldiers. The Vatika serves as a living tribute, a place for reflection, and a reminder of our duty to protect the nation and its environment. We maintain the garden with the help of local communities and schools, teaching children about patriotism and environmental stewardship.',
  },
  {
    id: 'water-conservation',
    title: 'Water Conservation',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=800&h=500&fit=crop',
    description: 'Water harvesting and sustainable water management.',
    longDescription:
      'Water scarcity affects millions. Our Water Conservation initiatives include constructing check dams, ponds, and rooftop rainwater harvesting systems. We also promote drip irrigation and water‑efficient farming practices. We work with village communities to map water sources and develop sustainable usage plans. Our efforts have significantly raised groundwater levels and reduced water‑borne diseases in many villages.',
  },
];

export default function Environment() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--navbar-height, 80px)' }}>
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-[58vh] sm:min-h-[68vh] lg:min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#14532D]">
        <div className="absolute inset-0 z-0">
          <img
            src="/TREEGROW.jpg"
            alt="Environment & Sustainability"
            className="w-full h-full object-cover object-center transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--navbar-height,70px)+3.25rem)] sm:pt-[calc(var(--navbar-height,70px)+4rem)] pb-16 sm:pb-20 text-center text-white">
          <div className="gsap-hero-title inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 text-[#86EFAC]">
            <Sprout className="w-4 h-4 text-[#86EFAC]" />
            <span>Environment & Sustainability</span>
          </div>

          <h1 className="gsap-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto mb-6">
            Protecting Our Planet,<br />
            <span className="text-[#86EFAC]">Preserving Our Future.</span>
          </h1>

          <p className="gsap-hero-title text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            Dedicated to tree plantation drives, Kargil Vatika memorial forests, rainwater harvesting, and community eco-education for a green sustainable future.
          </p>

          <div className="gsap-hero-title flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#86EFAC] text-[#14532D] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all hover:scale-105 text-sm sm:text-base cursor-pointer"
            >
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <span>Plant A Tree Today</span>
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-full border border-white/30 hover:bg-white/20 transition-all text-sm sm:text-base cursor-pointer"
            >
              <span>Become a Volunteer</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY ENVIRONMENT ===== */}
      <section className="py-20 sm:py-28 bg-[#F0FDF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#16A34A] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Why Environment & Sustainability
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14532D] tracking-tight mb-6">
              Protecting the environment for future generations
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We work to restore ecological balance through reforestation, water harvesting, and community awareness – because a healthy planet is the foundation of all life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Restore ecosystems',
                desc: 'Plant native trees, restore wetlands, and protect biodiversity in rural and urban areas.'
              },
              {
                icon: Award,
                title: 'Promote sustainability',
                desc: 'Encourage renewable energy, waste reduction, and sustainable agriculture practices.'
              },
              {
                icon: Users,
                title: 'Educate communities',
                desc: 'Empower people with knowledge on climate action, water conservation, and eco‑friendly living.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-[#16A34A]/15 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F0FDF4] border border-[#16A34A]/20 flex items-center justify-center text-[#16A34A] mb-6 group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#14532D] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#14532D] text-white font-bold px-9 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm sm:text-base cursor-pointer"
            >
              <span>Sponsor Tree Plantation</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUB-CATEGORIES SHOWCASE ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-[#16A34A] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Key Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14532D] tracking-tight">
              Environment & Green Initiatives
            </h2>
          </div>

          {subCategories.map((sub, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = sub.icon;

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="absolute -inset-3 bg-[#F0FDF4] rounded-[2.5rem] transform -rotate-1 pointer-events-none" />
                  <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] border-4 border-white group">
                    <img
                      src={sub.image}
                      alt={sub.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-5 left-5 text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg drop-shadow">{sub.title}</span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-5 text-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] font-mono text-xs font-bold uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.title}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#14532D] tracking-tight">
                    {sub.title}
                  </h3>

                  <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed">
                    {sub.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/environment/learn-more/${sub.id}`}
                      className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#14532D] text-white font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
                    >
                      <span>Explore {sub.title} Gallery & Story</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>



      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 bg-[#14532D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest uppercase mb-6 text-[#86EFAC]">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Make a Difference?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Plant a tree, protect a future
            </h2>

            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Every tree planted and every drop saved creates a healthier planet for generations to come.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate"
                className="bg-[#86EFAC] hover:bg-white text-[#14532D] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base cursor-pointer"
              >
                Plant A Tree Today
              </Link>
              <Link
                to="/volunteer"
                className="bg-white/10 backdrop-blur-md text-white font-semibold px-10 py-4 rounded-full border border-white/30 hover:bg-white/20 transition-all text-sm sm:text-base cursor-pointer"
              >
                Become a Volunteer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
