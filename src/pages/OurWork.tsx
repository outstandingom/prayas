// src/pages/OurWork.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Trees,
  Users,
  Droplets,
  Building,
  Handshake,
  Scissors,
  Users2,
  Factory,
  GraduationCap,
  Laptop,
  Compass,
  Shield,
  HeartPulse,
  Stethoscope,
  Heart,
  Accessibility, // ← REPLACED Wheelchair with Accessibility
  Baby,
  UsersRound,
  Leaf,
  Sprout,
} from 'lucide-react'

interface WorkItem {
  icon: React.ElementType
  title: string
  description: string
}

interface WorkCategory {
  id: number
  title: string
  icon: React.ElementType
  description: string
  items: WorkItem[]
  color: string
  bgColor: string
}

export default function OurWork() {
  const { t } = useTranslation()

  const categories: WorkCategory[] = [
    {
      id: 1,
      title: 'Rural Development',
      icon: Trees,
      description:
        'Transforming rural communities through sustainable development initiatives that improve quality of life and create self-reliant villages.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      items: [
        {
          icon: Handshake,
          title: 'Village Adoption',
          description:
            'Adopting villages to provide holistic development support including infrastructure, education, and healthcare services.',
        },
        {
          icon: Droplets,
          title: 'Water & Sanitation',
          description:
            'Ensuring access to clean drinking water and proper sanitation facilities for rural communities.',
        },
        {
          icon: Building,
          title: 'Infrastructure',
          description:
            'Building and improving rural infrastructure including roads, community centres, and basic amenities.',
        },
        {
          icon: Users,
          title: 'Community Development',
          description:
            'Empowering communities through capacity building, awareness programs, and participatory development.',
        },
      ],
    },
    {
      id: 2,
      title: 'Women Empowerment & Livelihood',
      icon: Users2,
      description:
        'Empowering women through skill development, financial independence, and sustainable livelihood opportunities.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      items: [
        {
          icon: Scissors,
          title: 'Sewing Centres',
          description:
            'Vocational training centres teaching tailoring and garment-making skills for economic independence.',
        },
        {
          icon: Users2,
          title: 'SHGs (Self Help Groups)',
          description:
            'Forming and strengthening women self-help groups for savings, credit, and collective enterprise.',
        },
        {
          icon: Factory,
          title: 'Graha Industries',
          description:
            'Promoting home-based industries and micro-enterprises for sustainable women livelihoods.',
        },
      ],
    },
    {
      id: 3,
      title: 'Education & Skill Development',
      icon: GraduationCap,
      description:
        'Providing quality education and skill development opportunities to build a brighter future for children and youth.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        {
          icon: GraduationCap,
          title: 'Sanskarshala',
          description:
            'Value-based education program focusing on holistic development, cultural values, and character building.',
        },
        {
          icon: Laptop,
          title: 'Digital Literacy',
          description:
            'Bridging the digital divide by providing computer education and digital skills training to rural communities.',
        },
        {
          icon: Compass,
          title: 'Career Guidance',
          description:
            'Career counselling and guidance programs to help youth make informed career choices and build successful futures.',
        },
        {
          icon: Shield,
          title: 'Self-Defence',
          description:
            'Self-defence training programs for women and children to ensure personal safety and build confidence.',
        },
      ],
    },
    {
      id: 4,
      title: 'Health & Social Welfare',
      icon: HeartPulse,
      description:
        'Comprehensive healthcare and social welfare programs ensuring the well-being of all community members.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      items: [
        {
          icon: HeartPulse,
          title: 'Organ Donation',
          description:
            'Creating awareness about organ donation and facilitating the noble act of giving life to others.',
        },
        {
          icon: Stethoscope,
          title: 'Health Camps',
          description:
            'Free medical camps providing essential healthcare services, check-ups, and medicines to underserved communities.',
        },
        {
          icon: Heart,
          title: 'Elderly Care',
          description:
            'Special care and support programs for senior citizens including health check-ups, companionship, and assistance.',
        },
        {
          icon: Accessibility, // ← REPLACED Wheelchair with Accessibility
          title: 'Support for Persons with Disabilities',
          description:
            'Inclusive programs providing support, accessibility, and opportunities for persons with disabilities.',
        },
        {
          icon: Baby,
          title: 'Child Welfare',
          description:
            "Protecting children's rights and ensuring their well-being through education, nutrition, and care programs.",
        },
        {
          icon: UsersRound,
          title: 'Community Welfare',
          description:
            'Holistic community welfare programs addressing various social needs and improving overall quality of life.',
        },
      ],
    },
    {
      id: 5,
      title: 'Environment & Sustainability',
      icon: Leaf,
      description:
        'Protecting the environment and promoting sustainable practices for a greener and healthier planet.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        {
          icon: Trees,
          title: 'Plantation',
          description:
            'Massive tree plantation drives to increase green cover, combat climate change, and restore ecological balance.',
        },
        {
          icon: Sprout,
          title: 'Water Conservation',
          description:
            'Implementing water harvesting, conservation techniques, and sustainable water management practices.',
        },
      ],
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-white pt-8 pb-16">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-[#263238] via-[#1a2a2e] to-[#0d1a1e] py-16 md:py-24 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF314] opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFF314] opacity-5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Our{' '}
              <span className="text-[#FFF314] drop-shadow-lg">Work</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We work across multiple sectors to create lasting impact in the
              lives of communities. Our holistic approach addresses critical
              needs and builds sustainable futures.
            </p>
          </motion.div>

          {/* Category Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#category-${cat.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-[#FFF314] hover:text-[#263238] text-white text-sm font-medium rounded-full transition-all duration-300 border border-white/20 hover:border-transparent"
              >
                <cat.icon className="w-4 h-4" />
                {cat.title}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            id={`category-${category.id}`}
            variants={itemVariants}
            className="mb-16 last:mb-0 scroll-mt-24"
          >
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 mb-6"
            >
              <div
                className={`p-3 rounded-2xl ${category.bgColor} ${category.color} shrink-0`}
              >
                <category.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#263238]">
                  {category.title}
                </h2>
                <p className="text-[#263238]/60 text-base md:text-lg mt-1 max-w-2xl">
                  {category.description}
                </p>
              </div>
            </motion.div>

            {/* Category Items Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {category.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-[#263238]/10 hover:border-[#FFF314]/50 overflow-hidden`}
                >
                  {/* Hover Gradient */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${category.bgColor} opacity-10`}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl ${category.bgColor} ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#263238] mb-2 group-hover:text-[#263238] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#263238]/60 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 ${category.color.replace('text', 'bg')} w-0 group-hover:w-full transition-all duration-300`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
      >
        <div className="bg-gradient-to-br from-[#263238] to-[#1a2a2e] rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Want to Make a Difference?
          </h3>
          <p className="text-white/70 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            Join us in our mission to create sustainable change. Every
            contribution, big or small, makes a lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FFF314] text-[#263238] font-bold rounded-full hover:bg-[#f0e000] transition-all shadow-lg shadow-[#FFF314]/30 hover:shadow-[#FFF314]/50 hover:scale-105"
            >
              Donate Now
            </a>
            <a
              href="/volunteer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/30 hover:border-white/50"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
