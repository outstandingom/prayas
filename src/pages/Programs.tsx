export default function Programs() { return <div className="pt-32 min-h-screen text-center"><h1 className="text-4xl font-bold">Our Programs</h1></div> }
// src/pages/Programs.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  GraduationCap, Heart, Users, Leaf, Stethoscope, Home, 
  Lightbulb, Utensils, PawPrint, HeartHandshake, ArrowRight, Target 
} from 'lucide-react'

const programs = [
  {
    icon: GraduationCap,
    title: 'Education for All',
    category: 'Education',
    description: 'Providing quality education to underprivileged children through after-school programs, scholarships, and digital literacy initiatives.',
    stats: '10,000+ Children Educated',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
  {
    icon: Stethoscope,
    title: 'Healthcare Camps',
    category: 'Healthcare',
    description: 'Organizing free medical camps, health awareness programs, and providing essential healthcare access to remote communities.',
    stats: '500+ Medical Camps',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
  {
    icon: Users,
    title: 'Women Empowerment',
    category: 'Empowerment',
    description: 'Skill development, self-help groups, and entrepreneurship programs helping women gain financial independence.',
    stats: '5,000+ Women Empowered',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
  {
    icon: Heart,
    title: 'Child Welfare',
    category: 'Welfare',
    description: 'Protecting children\'s rights through nutrition programs, safe shelters, and comprehensive child development initiatives.',
    stats: '15,000+ Children Supported',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
  {
    icon: Leaf,
    title: 'Environmental Action',
    category: 'Environment',
    description: 'Tree plantation drives, waste management programs, and environmental awareness campaigns for sustainable living.',
    stats: '100,000+ Trees Planted',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
  {
    icon: Home,
    title: 'Rural Development',
    category: 'Development',
    description: 'Infrastructure development, clean water access, and sustainable livelihood programs for rural communities.',
    stats: '200+ Villages Developed',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
  {
    icon: Lightbulb,
    title: 'Skill Training',
    category: 'Training',
    description: 'Vocational training programs equipping youth and adults with employable skills for better career opportunities.',
    stats: '8,000+ People Trained',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
  {
    icon: Utensils,
    title: 'Food Security',
    category: 'Nutrition',
    description: 'Food distribution drives, nutrition programs, and sustainable agriculture support for food-insecure communities.',
    stats: '500,000+ Meals Served',
    image: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
  {
    icon: PawPrint,
    title: 'Animal Welfare',
    category: 'Welfare',
    description: 'Rescue operations, shelter homes, and medical care for stray and injured animals in urban and rural areas.',
    stats: '3,000+ Animals Rescued',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop',
    color: '#FFF314'
  },
]

const impactStats = [
  { value: '25,000+', label: 'Lives Impacted' },
  { value: '1,200+', label: 'Active Volunteers' },
  { value: '350+', label: 'Projects Completed' },
  { value: '27', label: 'States Covered' },
]

export default function Programs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #FFF314 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F1F8F5] rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#FFF314] font-mono text-xs uppercase tracking-widest font-semibold bg-[#FFF314]/10 px-4 py-2 rounded-full inline-block mb-6">
              What We Do
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#263238] mb-6 leading-tight">
              Our <span className="text-[#FFF314]">Programs</span>
            </h1>
            <p className="text-[#263238]/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Discover our comprehensive range of programs designed to create lasting impact across education, healthcare, environment, and community development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Bar */}
      <section className="py-10 bg-[#F1F8F5]/50 border-y border-[#FFF314]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-[#FFF314]/10 shadow-lg hover:shadow-xl hover:shadow-[#FFF314]/5 transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#FFF314] text-[#263238] text-xs font-bold rounded-full uppercase tracking-wider">
                      {program.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F1F8F5] flex items-center justify-center">
                      <program.icon className="w-5 h-5 text-[#FFF314]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#263238]">{program.title}</h3>
                  </div>
                  
                  <p className="text-[#263238]/60 text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FFF314] bg-[#FFF314]/5 px-3 py-1 rounded-full">
                      {program.stats}
                    </span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-[#263238]/70 hover:text-[#FFF314] text-sm font-medium transition-colors"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
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
              <HeartHandshake className="w-8 h-8 text-[#263238]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238] mb-4">
              Want to Support Our Programs?
            </h2>
            <p className="text-[#263238]/70 text-lg mb-8 max-w-2xl mx-auto">
              Your contribution can help us expand our reach and impact more lives through our various initiatives.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/donate"
                className="px-8 py-3 bg-[#263238] text-white rounded-full font-semibold hover:bg-[#263238]/90 transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4" /> Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="px-8 py-3 bg-white/30 text-[#263238] rounded-full font-semibold hover:bg-white/50 transition-all hover:scale-105 inline-flex items-center gap-2 backdrop-blur-sm"
              >
                Volunteer With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
