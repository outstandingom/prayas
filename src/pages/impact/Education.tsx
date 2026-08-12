import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  Laptop,
  Compass,
  Shield,
  Users,
  BookOpen,
  Heart,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  GraduationCap
} from 'lucide-react';
import gsap from 'gsap';

const subCategories = [
  {
    id: 'sanskarshala',
    title: 'Sanskarshala',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
    description: 'Value‑based education for holistic development of children.',
    longDescription:
      'Sanskarshala is our flagship programme that integrates moral education with academic learning. We conduct interactive sessions on ethics, environmental stewardship, and civic responsibility, using storytelling, role‑play, and community projects. The programme also includes yoga and meditation to promote mental well‑being. Parents and teachers often report that children become more disciplined, compassionate, and confident after participating in Sanskarshala.',
  },
  {
    id: 'digital-literacy',
    title: 'Digital Literacy',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&fit=crop',
    description: 'Bridging the digital divide with computer education.',
    longDescription:
      'In today’s world, digital literacy is as essential as reading and writing. Our Digital Literacy programme sets up computer centres in rural areas, equipped with computers and internet connectivity. We train both children and adults in basic computer operations, internet usage, email, and online safety. We also offer advanced courses in programming, graphic design, and data entry for those who wish to pursue careers in IT.',
  },
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
    description: 'Helping youth make informed career choices.',
    longDescription:
      'Many young people in rural areas are unaware of the diverse career options available to them. Our Career Guidance programme conducts workshops, aptitude tests, and one‑on‑one counselling sessions. We invite professionals from various fields to speak about their journeys. We also provide information about scholarships, entrance exams, and vocational training institutes, helping youth to make confident decisions about their futures.',
  },
  {
    id: 'self-defence',
    title: 'Self‑Defence',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
    description: 'Training for women and children to ensure safety.',
    longDescription:
      'We believe that every woman and child has the right to feel safe. Our Self‑Defence programme offers practical martial arts training, situational awareness drills, and legal awareness about rights and protections. The programme has been highly popular among school‑going girls and has significantly boosted their confidence. We also train teachers and parents so that they can reinforce these skills at home and in school.',
  },
  {
    id: 'youth-leadership',
    title: 'Youth Leadership',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop',
    description: 'Developing young leaders for community transformation.',
    longDescription:
      'Our Youth Leadership programme identifies and nurtures young individuals with the potential to lead. We offer training in communication, project management, conflict resolution, and social entrepreneurship. Participants work on real‑world community projects, mentored by experienced professionals. Many of our alumni now hold leadership positions in government, NGOs, and the corporate sector, continuing to drive positive change.',
  },
];

export default function Education() {
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
      <section ref={heroRef} className="relative min-h-[58vh] sm:min-h-[68vh] lg:min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#075985]">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-90"
          >
            <source src="/assets/education/mentorship-video.mp4" type="video/mp4" />
            <source src="/education-video-child2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--navbar-height,70px)+1.75rem)] sm:pt-[calc(var(--navbar-height,70px)+2.5rem)] pb-12 sm:pb-16 text-center text-white">
          <div className="gsap-hero-title inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 text-[#FFF314]">
            <GraduationCap className="w-4 h-4" />
            <span>Education & Skill Development</span>
          </div>

          <h1 className="gsap-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto mb-6">
            Building Leaders,<br />
            <span className="text-[#FFF314]">One Classroom at a Time.</span>
          </h1>

          <p className="gsap-hero-title text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            Providing quality education, Sanskarshala moral centers, digital literacy, and youth leadership training so every child learns and thrives with dignity.
          </p>

          <div className="gsap-hero-title flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#FFF314] text-[#075985] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all hover:scale-105 text-sm sm:text-base cursor-pointer"
            >
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <span>Support Education Today</span>
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

      {/* ===== WHY EDUCATION / CORE PILLARS ===== */}
      <section className="py-20 sm:py-28 bg-[#F0F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0284C7] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Why Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#075985] tracking-tight mb-6">
              The Program will teach you the skills to be a leader
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Develop an awareness of how poverty and inequity impacts children, and your role in creating meaningful change.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Find your purpose',
                desc: 'Develop a deep understanding of social challenges and discover how you can contribute meaningfully.'
              },
              {
                num: '02',
                title: 'Become a leader',
                desc: 'Build concrete leadership skills – planning, execution, reflection, and stakeholder management.'
              },
              {
                num: '03',
                title: 'Join a community',
                desc: 'Connect with like-minded individuals and work together towards a shared mission.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-[#0284C7]/15 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F0F9FF] border border-[#0284C7]/20 flex items-center justify-center text-[#0284C7] font-extrabold text-xl mb-6 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                  {item.num}
                </div>
                <h3 className="text-xl font-bold text-[#075985] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#075985] text-white font-bold px-9 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm sm:text-base cursor-pointer"
            >
              <span>Apply / Support Now</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUB-CATEGORIES SHOWCASE ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-[#0284C7] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-3">
              Key Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#075985] tracking-tight">
              Our Education Programmes
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
                  <div className="absolute -inset-3 bg-[#F0F9FF] rounded-[2.5rem] transform -rotate-1 pointer-events-none" />
                  <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] border-4 border-white group">
                    <img
                      src={sub.image}
                      alt={sub.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-5 left-5 text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0284C7] flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg drop-shadow">{sub.title}</span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-5 text-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] font-mono text-xs font-bold uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.title}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#075985] tracking-tight">
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
      <section className="py-20 sm:py-28 bg-[#075985] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest uppercase mb-6 text-[#FFF314]">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Make a Difference?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Join us in building a brighter future
            </h2>

            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Every child deserves quality education and moral guidance. Your contribution directly transforms young lives.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate"
                className="bg-[#FFF314] hover:bg-white text-[#075985] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base cursor-pointer"
              >
                Donate for Education
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
