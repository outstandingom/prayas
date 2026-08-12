// src/pages/Children.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Heart, GraduationCap, Apple, Shield, Smile, Users, 
  Star, ArrowRight, HandHeart, Gift 
} from 'lucide-react'
import { useState } from 'react'

const childPrograms = [
  {
    icon: GraduationCap,
    title: 'Education Support',
    description: 'Providing school supplies, uniforms, and tuition support to help children stay in school and complete their education.',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    stats: '10,000+ Children Supported',
    color: '#FFF314'
  },
  {
    icon: Apple,
    title: 'Nutrition Program',
    description: 'Daily nutritious meals and supplements to combat malnutrition and ensure healthy physical development.',
    image: 'https://images.pexels.com/photos/6646959/pexels-photo-6646959.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    stats: '500,000+ Meals Served',
    color: '#FFF314'
  },
  {
    icon: Shield,
    title: 'Child Protection',
    description: 'Creating safe spaces and protecting children from abuse, exploitation, and child labor through community awareness.',
    image: 'https://images.pexels.com/photos/1488521787991-ed7bbaae773c?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    stats: '5,000+ Children Protected',
    color: '#FFF314'
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Regular health check-ups, vaccinations, and medical care ensuring every child has access to basic healthcare.',
    image: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    stats: '20,000+ Health Checkups',
    color: '#FFF314'
  },
  {
    icon: Smile,
    title: 'Recreation & Sports',
    description: 'Organizing sports events, art workshops, and recreational activities for holistic child development.',
    image: 'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    stats: '300+ Events Organized',
    color: '#FFF314'
  },
  {
    icon: Users,
    title: 'Orphan Support',
    description: 'Providing shelter, care, and emotional support to orphaned and abandoned children in a nurturing environment.',
    image: 'https://images.pexels.com/photos/2363800/pexels-photo-2363800.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    stats: '1,200+ Children Cared For',
    color: '#FFF314'
  },
]

const childrenStories = [
  {
    name: 'Priya, Age 8',
    story: 'From a remote village with no school, Priya now attends our learning center daily. She dreams of becoming a teacher.',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
  },
  {
    name: 'Rahul, Age 12',
    story: 'Once a child laborer, Rahul now excels in mathematics through our bridge education program.',
    image: 'https://images.pexels.com/photos/6646959/pexels-photo-6646959.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
  },
  {
    name: 'Ananya, Age 6',
    story: 'Malnourished when she arrived, Ananya is now healthy and active thanks to our nutrition program.',
    image: 'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
  },
]

export default function Children() {
  const [showDonateModal, setShowDonateModal] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-[#FFF314]/10 to-[#F1F8F5]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #FFF314 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#81C784]/10 rounded-full blur-[100px] opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#FFF314] font-mono text-xs uppercase tracking-widest font-semibold bg-[#FFF314]/10 px-4 py-2 rounded-full inline-block mb-6">
                Child Welfare Program
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#263238] mb-6 leading-tight">
                Every Child Deserves a{' '}
                <span className="text-[#FFF314]">Bright Future</span>
              </h1>
              <p className="text-[#263238]/60 text-lg leading-relaxed mb-8">
                We're committed to protecting, educating, and nurturing underprivileged children, giving them the tools they need to build a better tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="px-8 py-3 bg-[#FFF314] text-[#263238] rounded-full font-bold hover:bg-[#FFF314]/90 transition-all shadow-lg shadow-[#FFF314]/20 hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" /> Sponsor a Child
                </button>
                <Link
                  to="/volunteer"
                  className="px-8 py-3 border-2 border-[#FFF314]/30 text-[#263238] rounded-full font-semibold hover:bg-[#FFF314]/10 transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Volunteer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Happy children"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-[#FFF314]/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFF314]/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#FFF314]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#263238]">15,000+</div>
                    <div className="text-xs text-[#263238]/60">Children Helped</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-[#F1F8F5]/50 border-y border-[#FFF314]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '15,000+', label: 'Children Helped' },
              { value: '500+', label: 'Education Centers' },
              { value: '50,000+', label: 'Meals Provided' },
              { value: '200+', label: 'Child Care Workers' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#FFF314] mb-1">{stat.value}</div>
                <div className="text-sm text-[#263238]/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#FFF314] font-mono text-xs uppercase tracking-widest font-semibold bg-[#FFF314]/10 px-4 py-2 rounded-full inline-block mb-4">
              Our Programs
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238]">
              How We Help Children
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {childPrograms.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-[#FFF314]/10 shadow-lg hover:shadow-xl hover:shadow-[#FFF314]/5 transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center">
                      <program.icon className="w-5 h-5 text-[#FFF314]" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#263238] mb-2">{program.title}</h3>
                  <p className="text-[#263238]/60 text-sm leading-relaxed mb-4">{program.description}</p>
                  <span className="text-xs font-bold text-[#FFF314] bg-[#FFF314]/5 px-3 py-1 rounded-full">
                    {program.stats}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-[#F1F8F5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#FFF314] font-mono text-xs uppercase tracking-widest font-semibold bg-[#FFF314]/10 px-4 py-2 rounded-full inline-block mb-4">
              Success Stories
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#263238]">
              Lives We've Changed
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {childrenStories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white rounded-2xl p-6 border border-[#FFF314]/10 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#FFF314]"
                  />
                  <h3 className="font-bold text-[#263238]">{story.name}</h3>
                </div>
                <p className="text-[#263238]/60 text-sm leading-relaxed">{story.story}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFF314] to-[#FFF314]/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/30 flex items-center justify-center mx-auto mb-6">
              <HandHeart className="w-8 h-8 text-[#263238]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238] mb-4">
              Be the Reason a Child Smiles Today
            </h2>
            <p className="text-[#263238]/70 text-lg mb-8 max-w-2xl mx-auto">
              Your support can provide education, nutrition, and a safe environment for a child in need. Every contribution matters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowDonateModal(true)}
                className="px-8 py-3 bg-[#263238] text-white rounded-full font-semibold hover:bg-[#263238]/90 transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2"
              >
                <Gift className="w-4 h-4" /> Sponsor Now
              </button>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white/30 text-[#263238] rounded-full font-semibold hover:bg-white/50 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
