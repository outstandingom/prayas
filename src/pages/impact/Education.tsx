import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, GraduationCap, Laptop, Compass, Shield, Users, BookOpen } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--navbar-height, 100px)' }}>
      
      {/* ===== HERO – right side visible on mobile ===== */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img
          src="/education1.jpeg"
          alt="Education"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
        <h1 className="absolute top-6 left-6 sm:top-12 sm:left-12 z-10 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          Building Leaders,<br />
          <span className="text-[#FFF314]">One Classroom at a Time</span>
        </h1>
      </section>

      {/* ===== Rest of the page – unchanged ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Why Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              The Program will teach you the skills to be a leader
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Develop an awareness of how poverty and inequity impacts children; and your role in creating change.
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
                title: 'Find your purpose',
                desc: 'Develop a deep understanding of social challenges and discover how you can contribute meaningfully.'
              },
              {
                title: 'Become a leader',
                desc: 'Build concrete leadership skills – planning, execution, reflection, and stakeholder management.'
              },
              {
                title: 'Join a community',
                desc: 'Connect with like-minded individuals and work together towards a shared mission.'
              }
            ].map((item, i) => (
              <div key={i} className="group bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-[#0056B3]/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#0056B3]/20 transition-colors">
                  <span className="text-2xl font-bold text-[#0056B3]">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">{item.title}</h3>
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
            <button className="bg-[#0056B3] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
              Apply Now
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {subCategories.map((sub, index) => (
        <section key={sub.id} className="py-20 md:py-28 even:bg-[#F8FAFC] odd:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full">
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="bg-[#0056B3]/80 inline-block p-2 rounded-full mb-2">
                    <sub.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">{sub.title}</h3>
                </div>
              </div>

              <div>
                <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-2">
                  {sub.title}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4">
                  {sub.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  {sub.description}
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  {sub.longDescription}
                </p>
                <button className="mt-6 bg-[#0056B3] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Where You Will Serve
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Make an impact in <span className="text-[#0056B3]">underserved communities</span>
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
                title: 'Full-time Teaching',
                desc: 'Placed in government or affordable private schools.'
              },
              {
                title: 'Multiple Locations',
                desc: 'Work in urban and rural communities across the region.'
              },
              {
                title: 'Grades 1-10',
                desc: 'Teach between 40 and 80 students in your classroom.'
              },
              {
                title: 'Subject or Class Teacher',
                desc: 'Teach all subjects or specialize in key areas.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="text-4xl mb-4">🏫</div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#0a1628] rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Serve across 9 locations</h3>
                <p className="text-white/60 text-sm">Join a diverse community of educators</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Ahmedabad', 'Bengaluru', 'Chennai', 'Delhi', 'Gurgaon', 'Hyderabad', 'Kolkata', 'Mumbai', 'Pune'].map((city) => (
                  <span key={city} className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-white/10">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#0056B3] font-mono text-xs tracking-[0.2em] uppercase font-bold mb-4">
              Join the Movement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Be part of a growing community of changemakers
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Find lifelong partners in this work. Don't just talk about change – build it.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-[#0056B3] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
                Apply Now
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#0056B3] font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-[#0056B3]/20 text-sm sm:text-base">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#FFF314]" />
              <span className="text-[#FFF314] font-mono text-xs tracking-[0.2em] uppercase font-bold">
                Ready to Make a Difference?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Join us in building a brighter future
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Every contribution, big or small, creates lasting impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#FFF314] text-[#0a1628] font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 text-sm sm:text-base">
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
