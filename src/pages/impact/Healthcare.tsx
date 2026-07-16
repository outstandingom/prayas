import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Sparkles, Target, Award, Users, HeartPulse, Stethoscope, Heart, Accessibility, Baby, UsersRound } from 'lucide-react';

// Sub‑category data (matches items in OurWork → Health & Social Welfare)
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
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--navbar-height, 100px)' }}>
      
      {/* ===== HERO SECTION – FULL SCREEN IMAGE ===== */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-[#0D9488]/80 px-4 py-1.5 rounded-full text-sm font-mono tracking-widest uppercase mb-6">
              Health & Social Welfare
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Healing <span className="text-[#CCFBF1]">Communities</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
              Free medical camps, health awareness, and essential care for underserved communities.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#CCFBF1] text-[#0F766E] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Fund a Medical Camp
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY HEALTH & SOCIAL WELFARE (unchanged) ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Why Health & Social Welfare
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F766E] mb-6">
              Health is the foundation of a prosperous society
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We deliver preventive, curative, and promotive healthcare to those who need it most – through camps, awareness drives, and community‑based support.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
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
              <div key={i} className="group bg-[#F0FDF4] p-8 rounded-2xl border border-[#0D9488]/20 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-[#0D9488]/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#0D9488]/20 transition-colors">
                  <item.icon className="w-7 h-7 text-[#0D9488]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F766E] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button className="bg-[#0D9488] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
              Join the Movement
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== SUB‑CATEGORIES – each with hero + content ===== */}
      {subCategories.map((sub, index) => (
        <section key={sub.id} className="py-20 md:py-28 even:bg-[#F0FDF4] odd:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Hero Image (left) */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full">
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="bg-[#0D9488]/80 inline-block p-2 rounded-full mb-2">
                    <sub.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">{sub.title}</h3>
                </div>
              </div>

              {/* Content (right) */}
              <div>
                <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-2">
                  {sub.title}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F766E] mb-4">
                  {sub.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  {sub.description}
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  {sub.longDescription}
                </p>
                <button className="mt-6 bg-[#0D9488] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ===== WHERE WE WORK (unchanged) ===== */}
      <section className="py-20 md:py-28 bg-[#F0FDF4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Where We Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F766E] mb-6">
              Serving communities <span className="text-[#0D9488]">across India</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: 'Organ Donation',
                desc: 'Awareness drives and transplant facilitation.'
              },
              {
                title: 'Health Camps',
                desc: 'Free check‑ups and medicines in remote areas.'
              },
              {
                title: 'Elderly Care',
                desc: 'Companionship and health support for seniors.'
              },
              {
                title: 'Child Welfare',
                desc: 'Nutrition, immunisation, and early education.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#0D9488]/20 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-lg font-bold text-[#0F766E] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#0F766E] rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Serving communities across 6 states</h3>
                <p className="text-white/60 text-sm">From urban slums to remote villages</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh', 'Odisha', 'Jharkhand'].map((state) => (
                  <span key={state} className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-white/10">
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== JOIN THE MOVEMENT (unchanged) ===== */}
      <section className="py-20 md:py-28 bg-[#F0FDF4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#0D9488] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Join the Movement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F766E] mb-6">
              Be part of a growing community of changemakers
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Help us bring healthcare to every doorstep and create a healthier India.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-[#0D9488] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Join Us
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#0D9488] font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-[#0D9488]/30 text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA (unchanged) ===== */}
      <section className="py-20 md:py-28 bg-[#0F766E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#CCFBF1]" />
              <span className="text-[#CCFBF1] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                Ready to Make a Difference?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Heal a life, transform a community
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Your support provides life‑saving medical care and hope to those who need it most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#CCFBF1] text-[#0F766E] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white font-bold px-10 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm sm:text-base">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
