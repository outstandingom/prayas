import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  Target,
  Award,
  Users,
  HeartPulse,
  Stethoscope,
  Heart,
  Accessibility,
  Baby,
  UsersRound,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import gsap from 'gsap';

const subCategories = [
  {
    id: 'organ-donation',
    title: 'Organ Donation',
    icon: HeartPulse,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    description: 'Creating awareness and facilitating organ donation.',
    longDescription:
      'Organ donation is a life‑saving gift, yet awareness remains low. Our Organ Donation campaign educates communities about the importance of donating organs, dispels myths, and simplifies the registration process. We partner with hospitals and transplant coordinators to provide end‑to‑end support for donors and recipients. Through our efforts, we have registered thousands of potential donors and facilitated several successful transplants.',
  },
  {
    id: 'health-camps',
    title: 'Health Camps',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    description: 'Free medical camps for underserved communities.',
    longDescription:
      'We organise regular health camps in remote villages, bringing doctors and specialists to people who otherwise have little access to healthcare. Services include general check‑ups, dental, eye, and gynaecological screenings, as well as distribution of free medicines. We also link patients to government hospitals for follow‑up care. Our camps often see hundreds of patients, providing critical early diagnosis and treatment.',
  },
  {
    id: 'elderly-care',
    title: 'Elderly Care',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    description: 'Support and companionship for senior citizens.',
    longDescription:
      'Our elderly population deserves dignity and care. Our Elderly Care programme conducts home visits to provide health check‑ups, medication support, and emotional companionship. We also organise social gatherings and recreational activities to combat loneliness and isolation. Additionally, we help elderly people access government pensions and other entitlements, ensuring they live their golden years with security and respect.',
  },
  {
    id: 'disability-support',
    title: 'Support for Persons with Disabilities',
    icon: Accessibility,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    description: 'Inclusive support and opportunities for persons with disabilities.',
    longDescription:
      'Persons with disabilities often face multiple barriers. Our inclusive programme focuses on providing assistive devices, such as wheelchairs and hearing aids, and making public spaces and schools accessible. We also offer skill‑training tailored to different abilities and work with employers to create inclusive job opportunities. We advocate for the rights of people with disabilities and ensure their voices are heard in community decisions.',
  },
  {
    id: 'child-welfare',
    title: 'Child Welfare',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    description: "Protecting children's rights and well‑being.",
    longDescription:
      'Children are the future, and we are committed to protecting their rights. Our Child Welfare programme includes nutrition supplementation, immunisation drives, and early childhood education. We also work to prevent child labour and child marriage through awareness and legal support. We collaborate with schools and anganwadi centres to ensure every child has access to quality education and healthcare from an early age.',
  },
  {
    id: 'community-welfare',
    title: 'Community Welfare',
    icon: UsersRound,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    description: 'Addressing diverse social needs holistically.',
    longDescription:
      'Community Welfare is the umbrella under which we address diverse social issues – from food security and legal aid to mental health and disaster relief. We run community kitchens during crises, provide counselling services, and facilitate access to government schemes. Our community‑based approach ensures that we are responsive to emerging needs and that no one is left behind.',
  },
];

export default function Healthcare() {
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
      <section ref={heroRef} className="relative min-h-[58vh] sm:min-h-[68vh] lg:min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#115E59]">
        <div className="absolute inset-0 z-0">
          <img
            src="/PRAYASHEALTHCAMP.jpeg"
            alt="Health & Social Welfare"
            className="w-full h-full object-cover object-center sm:object-[center_20%] transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--navbar-height,70px)+3.25rem)] sm:pt-[calc(var(--navbar-height,70px)+4rem)] pb-16 sm:pb-20 text-center text-white">
          <div className="gsap-hero-title inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 text-[#CCFBF1]">
            <Activity className="w-4 h-4" />
            <span>Health & Social Welfare</span>
          </div>

          <h1 className="gsap-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto mb-6">
            Healing Communities,<br />
            <span className="text-[#CCFBF1]">Restoring Hope.</span>
          </h1>

          <p className="gsap-hero-title text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            Free medical camps, organ donation awareness, elderly companionship, disability assistance, and holistic community health initiatives.
          </p>

          <div className="gsap-hero-title flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#CCFBF1] text-[#115E59] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all hover:scale-105 text-sm sm:text-base cursor-pointer"
            >
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <span>Fund A Health Camp</span>
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

      {/* ===== WHY HEALTH & SOCIAL WELFARE ===== */}
      <section className="py-20 sm:py-28 bg-[#F0FDF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Why Health & Social Welfare
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#115E59] tracking-tight mb-6">
              Health is the foundation of a prosperous society
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We deliver preventive, curative, and promotive healthcare to those who need it most – through camps, awareness drives, and community‑based support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Preventive Care',
                desc: 'Organise health camps, vaccination drives, and hygiene awareness to stop diseases before they start.'
              },
              {
                icon: Award,
                title: 'Curative Services',
                desc: 'Provide free check‑ups, medicines, and referrals to ensure timely treatment for all.'
              },
              {
                icon: Users,
                title: 'Promotive Health',
                desc: 'Empower communities with knowledge on nutrition, mental health, and healthy living.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-[#0D9488]/15 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F0FDF4] border border-[#0D9488]/20 flex items-center justify-center text-[#0D9488] mb-6 group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#115E59] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#115E59] text-white font-bold px-9 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm sm:text-base cursor-pointer"
            >
              <span>Support Healthcare Camps</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUB-CATEGORIES SHOWCASE ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Key Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#115E59] tracking-tight">
              Health & Welfare Programmes
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
                      <div className="w-10 h-10 rounded-xl bg-[#0D9488] flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg drop-shadow">{sub.title}</span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-5 text-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#0D9488] font-mono text-xs font-bold uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.title}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#115E59] tracking-tight">
                    {sub.title}
                  </h3>

                  <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed">
                    {sub.description}
                  </p>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                    {sub.longDescription}
                  </p>


                </div>
              </motion.div>
            );
          })}
        </div>
      </section>



      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 bg-[#115E59] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest uppercase mb-6 text-[#CCFBF1]">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Make a Difference?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Heal a life, transform a community
            </h2>

            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Your support provides life‑saving medical care, organ donation awareness, and hope to those who need it most.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate"
                className="bg-[#CCFBF1] hover:bg-white text-[#115E59] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base cursor-pointer"
              >
                Donate for Healthcare
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
