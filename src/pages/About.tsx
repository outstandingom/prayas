// src/pages/About.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Users, Target, Eye, Award, Handshake, ArrowRight, Quote } from 'lucide-react'

const stats = [
  { value: '15+', label: 'Years of Service' },
  { value: '25,000+', label: 'Lives Impacted' },
  { value: '1,200+', label: 'Volunteers' },
  { value: '27', label: 'States Covered' },
]

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    desc: 'We believe in serving with empathy and kindness, treating every individual with dignity and respect.'
  },
  {
    icon: Target,
    title: 'Integrity',
    desc: 'Transparency and accountability are the cornerstones of our operations and relationships.'
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'We empower local communities to become active participants in their own development journey.'
  },
  {
    icon: Eye,
    title: 'Innovation',
    desc: 'We embrace creative solutions and modern approaches to address age-old social challenges.'
  },
]

const milestones = [
  { year: '2010', title: 'Foundation', desc: 'Prayas Samaj Sevi Sanstha was founded with a vision to serve underprivileged communities.' },
  { year: '2013', title: 'First 100 Villages', desc: 'Expanded our reach to 100+ villages across 5 states with healthcare and education programs.' },
  { year: '2016', title: 'National Recognition', desc: 'Received national award for outstanding contribution to rural development and women empowerment.' },
  { year: '2019', title: '10,000+ Beneficiaries', desc: 'Crossed the milestone of impacting 10,000+ lives through our various initiatives.' },
  { year: '2022', title: 'Digital Transformation', desc: 'Launched digital literacy programs and online education platforms reaching remote areas.' },
  { year: '2024', title: 'Pan-India Presence', desc: 'Operating in 27 states with 1,200+ active volunteers and 350+ completed projects.' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #00897B 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        {/* Gradient Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E8F5E9] rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#00897B]/5 rounded-full blur-[100px] opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#00897B] font-mono text-xs uppercase tracking-widest font-semibold bg-[#00897B]/10 px-4 py-2 rounded-full inline-block mb-6">
              About Us
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#263238] mb-6 leading-tight">
              Empowering Communities,{' '}
              <span className="text-[#00897B]">Transforming Lives</span>
            </h1>
            <p className="text-[#263238]/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Prayas Samaj Sevi Sanstha is a non-profit organization dedicated to creating lasting change through education, healthcare, and community development across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#E8F5E9]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00897B] mb-2">{stat.value}</div>
                <div className="text-sm text-[#263238]/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-[#00897B] to-[#4DB6AC] rounded-2xl p-8 md:p-10 text-white shadow-xl shadow-[#00897B]/20"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/90 leading-relaxed">
                To empower underprivileged communities through sustainable development initiatives in education, healthcare, and livelihood, creating a society where every individual has the opportunity to thrive with dignity.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white border border-[#00897B]/10 rounded-2xl p-8 md:p-10 shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#00897B]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#263238] mb-4">Our Vision</h2>
              <p className="text-[#263238]/60 leading-relaxed">
                A world where every person, regardless of their background, has access to quality education, proper healthcare, and the resources needed to build a dignified and self-reliant life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 bg-[#E8F5E9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#00897B] font-mono text-xs uppercase tracking-widest font-semibold bg-[#00897B]/10 px-4 py-2 rounded-full inline-block mb-4">
              What Drives Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238]">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-white rounded-2xl p-6 border border-[#00897B]/10 shadow-lg hover:shadow-xl hover:shadow-[#00897B]/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-4 group-hover:bg-[#00897B] transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-[#00897B] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-[#263238] mb-2">{value.title}</h3>
                <p className="text-[#263238]/60 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey / Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#00897B] font-mono text-xs uppercase tracking-widest font-semibold bg-[#00897B]/10 px-4 py-2 rounded-full inline-block mb-4">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238]">
              Our Journey So Far
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#00897B]/20 md:-translate-x-px" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#00897B] rounded-full -translate-x-1/2 mt-1.5 z-10 shadow-lg shadow-[#00897B]/30" />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-white border border-[#00897B]/10 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                      <span className="text-[#00897B] font-mono text-xs font-bold tracking-wider">{milestone.year}</span>
                      <h3 className="text-lg font-bold text-[#263238] mt-1 mb-1">{milestone.title}</h3>
                      <p className="text-[#263238]/60 text-sm">{milestone.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="py-20 bg-gradient-to-br from-[#00897B] to-[#4DB6AC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Quote className="w-10 h-10 text-white/30 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-6">
              "The best way to find yourself is to lose yourself in the service of others. At Prayas, we don't just change lives – we transform communities, one person at a time."
            </blockquote>
            <div className="text-white/70 font-semibold">— Founder, Prayas Samaj Sevi Sanstha</div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-[#00897B]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#263238] mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-[#263238]/60 text-lg mb-8 max-w-xl mx-auto">
              Join hands with us in our mission to create a better tomorrow. Every contribution, big or small, brings us closer to our goal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/volunteer"
                className="px-8 py-3 bg-[#00897B] text-white rounded-full font-semibold hover:bg-[#00897B]/90 transition-all shadow-lg shadow-[#00897B]/20 hover:scale-105 inline-flex items-center gap-2"
              >
                Become a Volunteer <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/donate"
                className="px-8 py-3 bg-[#E8F5E9] text-[#263238] rounded-full font-semibold hover:bg-[#00897B]/10 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#00897B]" /> Donate Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
