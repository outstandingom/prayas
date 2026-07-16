import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  Accessibility,
  Baby,
  UsersRound,
  Leaf,
  Sprout,
  ShoppingBag,
  Home,
} from 'lucide-react'

interface WorkItem {
  icon: React.ElementType
  title: string
  description: string
  longDescription: string
}

interface WorkCategory {
  id: number
  title: string
  icon: React.ElementType
  description: string
  longDescription: string
  items: WorkItem[]
  color: string
  bgColor: string
  borderColor: string
  image: string
}

export default function OurWork() {
  const { t } = useTranslation()
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // ========== ROUTE CONFIGURATION ==========
  const RURAL_CATEGORY_ID = 1
  const RURAL_ROUTE = '/rural-development'
  const WOMEN_CATEGORY_ID = 2
  const WOMEN_ROUTE = '/women-empowerment'
  const EDUCATION_CATEGORY_ID = 3
  const EDUCATION_ROUTE = '/education'
  const HEALTH_CATEGORY_ID = 4
  const HEALTH_ROUTE = '/healthcare'
  const ENVIRONMENT_CATEGORY_ID = 5
  const ENVIRONMENT_ROUTE = '/environment'

  const getCategoryRoute = (id: number) => {
    if (id === RURAL_CATEGORY_ID) return RURAL_ROUTE
    if (id === WOMEN_CATEGORY_ID) return WOMEN_ROUTE
    if (id === EDUCATION_CATEGORY_ID) return EDUCATION_ROUTE
    if (id === HEALTH_CATEGORY_ID) return HEALTH_ROUTE
    if (id === ENVIRONMENT_CATEGORY_ID) return ENVIRONMENT_ROUTE
    return null
  }

  // ========== CATEGORIES (same data as before, but with updated items) ==========
  const categories: WorkCategory[] = [
    // 1. Rural Development
    {
      id: 1,
      title: 'Rural Development',
      icon: Trees,
      description:
        'Transforming rural communities through sustainable development initiatives that improve quality of life and create self-reliant villages.',
      longDescription:
        'Our Rural Development programme is designed to uplift rural communities by addressing critical gaps in infrastructure, education, healthcare, and livelihood opportunities. We work closely with village panchayats, local leaders, and community members to co‑create solutions that are both sustainable and culturally appropriate. Over the years, we have adopted multiple villages, provided clean drinking water, built sanitation facilities, and empowered local youth with skills for employment. Our holistic approach ensures that every intervention is community‑led and continues to thrive long after we have moved on.',
      image: 'https://i.ibb.co/fWWWk9S/Whats-App-Image-2026-07-12-at-2-50-03-PM-1.jpg',
      color: '#849989',
      bgColor: 'bg-[#849989]/20',
      borderColor: 'border-[#849989]',
      items: [
        {
          icon: Handshake,
          title: 'Village Adoption',
          description: 'Adopting villages to provide holistic development support.',
          longDescription: 'Under the Village Adoption programme, we select underserved villages and commit to a multi‑year transformation plan...',
        },
        {
          icon: Droplets,
          title: 'Water & Sanitation',
          description: 'Ensuring access to clean drinking water and proper sanitation.',
          longDescription: 'Access to clean water and proper sanitation is a fundamental right...',
        },
        {
          icon: Building,
          title: 'Infrastructure',
          description: 'Building and improving rural infrastructure.',
          longDescription: 'We believe that strong infrastructure is the backbone of rural progress...',
        },
        {
          icon: Users,
          title: 'Community Development',
          description: 'Empowering communities through capacity building.',
          longDescription: 'True development happens when communities lead it...',
        },
      ],
    },
    // 2. Women Empowerment & Livelihood
    {
      id: 2,
      title: 'Women Empowerment & Livelihood',
      icon: Users2,
      description:
        'Empowering women through skill development, financial independence, and sustainable livelihood opportunities.',
      longDescription:
        'Women are at the heart of every community, and empowering them is key to breaking the cycle of poverty. Our Women Empowerment & Livelihood programmes provide women with vocational skills, financial literacy, and access to micro‑credit through Self‑Help Groups (SHGs)...',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
      color: '#777e91',
      bgColor: 'bg-[#777e91]/20',
      borderColor: 'border-[#777e91]',
      items: [
        {
          icon: ShoppingBag,
          title: 'Sabji Wali Didi',
          description: 'Empowering women vegetable vendors with financial literacy and market access.',
          longDescription: 'The Sabji Wali Didi programme supports women who sell vegetables in local markets...',
        },
        {
          icon: Scissors,
          title: 'Sewing Centres',
          description: 'Vocational training in tailoring and garment‑making.',
          longDescription: 'Our Sewing Centres are equipped with modern sewing machines...',
        },
        {
          icon: Users2,
          title: 'SHGs (Self Help Groups)',
          description: 'Forming and strengthening women self‑help groups.',
          longDescription: 'Self‑Help Groups are the cornerstone of our women empowerment strategy...',
        },
        {
          icon: Factory,
          title: 'Entrepreneurship',
          description: 'Supporting women to start and scale their own businesses.',
          longDescription: 'Our Entrepreneurship programme guides women through the entire business lifecycle...',
        },
        {
          icon: Home,
          title: 'Grah Udyog',
          description: 'Promoting home‑based industries for sustainable livelihoods.',
          longDescription: 'Grah Udyog supports women to start home‑based enterprises...',
        },
      ],
    },
    // 3. Education & Skill Development
    {
      id: 3,
      title: 'Education & Skill Development',
      icon: GraduationCap,
      description:
        'Providing quality education and skill development opportunities to build a brighter future for children and youth.',
      longDescription:
        'Education is the most powerful tool to break the cycle of poverty and create lasting change. Our Education & Skill Development initiatives go beyond the classroom...',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
      color: '#9eada0',
      bgColor: 'bg-[#9eada0]/20',
      borderColor: 'border-[#9eada0]',
      items: [
        {
          icon: GraduationCap,
          title: 'Sanskarshala',
          description: 'Value‑based education for holistic development.',
          longDescription: 'Sanskarshala is our flagship programme that integrates moral education with academic learning...',
        },
        {
          icon: Laptop,
          title: 'Digital Literacy',
          description: 'Bridging the digital divide with computer education.',
          longDescription: 'In today’s world, digital literacy is as essential as reading and writing...',
        },
        {
          icon: Compass,
          title: 'Career Guidance',
          description: 'Helping youth make informed career choices.',
          longDescription: 'Many young people in rural areas are unaware of the diverse career options...',
        },
        {
          icon: Shield,
          title: 'Self‑Defence',
          description: 'Training for women and children to ensure safety.',
          longDescription: 'We believe that every woman and child has the right to feel safe...',
        },
        {
          icon: Users2,
          title: 'Youth Leadership',
          description: 'Developing young leaders for community transformation.',
          longDescription: 'Our Youth Leadership programme identifies and nurtures young individuals...',
        },
      ],
    },
    // 4. Health & Social Welfare
    {
      id: 4,
      title: 'Health & Social Welfare',
      icon: HeartPulse,
      description:
        'Comprehensive healthcare and social welfare programmes ensuring the well‑being of all community members.',
      longDescription:
        'Health is the foundation of a prosperous society. Our Health & Social Welfare initiatives cover preventive, curative, and promotive healthcare...',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
      color: '#8d9159',
      bgColor: 'bg-[#8d9159]/20',
      borderColor: 'border-[#8d9159]',
      items: [
        {
          icon: HeartPulse,
          title: 'Organ Donation',
          description: 'Creating awareness and facilitating organ donation.',
          longDescription: 'Organ donation is a life‑saving gift, yet awareness remains low...',
        },
        {
          icon: Stethoscope,
          title: 'Health Camps',
          description: 'Free medical camps for underserved communities.',
          longDescription: 'We organise regular health camps in remote villages...',
        },
        {
          icon: Heart,
          title: 'Elderly Care',
          description: 'Support and companionship for senior citizens.',
          longDescription: 'Our elderly population deserves dignity and care...',
        },
        {
          icon: Accessibility,
          title: 'Support for Persons with Disabilities',
          description: 'Inclusive support and opportunities for persons with disabilities.',
          longDescription: 'Persons with disabilities often face multiple barriers...',
        },
        {
          icon: Baby,
          title: 'Child Welfare',
          description: "Protecting children's rights and well‑being.",
          longDescription: 'Children are the future, and we are committed to protecting their rights...',
        },
        {
          icon: UsersRound,
          title: 'Community Welfare',
          description: 'Addressing diverse social needs holistically.',
          longDescription: 'Community Welfare is the umbrella under which we address diverse social issues...',
        },
      ],
    },
    // 5. Environment & Sustainability
    {
      id: 5,
      title: 'Environment & Sustainability',
      icon: Leaf,
      description:
        'Protecting the environment and promoting sustainable practices for a greener and healthier planet.',
      longDescription:
        'Environmental degradation is one of the biggest challenges of our time. Our Environment & Sustainability programmes focus on conservation, reforestation, and sustainable resource management...',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
      color: '#9e8b70',
      bgColor: 'bg-[#9e8b70]/20',
      borderColor: 'border-[#9e8b70]',
      items: [
        {
          icon: Trees,
          title: 'Plantation',
          description: 'Massive tree plantation drives for ecological balance.',
          longDescription: 'Our Plantation programme is not just about planting trees – it is about creating forests...',
        },
        {
          icon: Leaf,
          title: 'Kargil Vatika',
          description: 'A tribute forest honouring the brave soldiers of Kargil.',
          longDescription: 'Kargil Vatika is a special memorial garden dedicated to the martyrs of the Kargil War...',
        },
        {
          icon: Sprout,
          title: 'Water Conservation',
          description: 'Water harvesting and sustainable water management.',
          longDescription: 'Water scarcity affects millions. Our Water Conservation initiatives include constructing check dams...',
        },
      ],
    },
  ]

  // ========== ANIMATION VARIANTS ==========
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
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

  // ========== JSX ==========
  return (
    <div
      className="min-h-screen bg-white pb-16"
      style={{ paddingTop: 'var(--navbar-height, 100px)' }}
    >
      {/* ===== WHAT WE DO SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-normal text-[#263238] mb-4"
            style={{ fontFamily: 'Forte, cursive' }}
          >
            what we do
          </h2>
          <p className="text-lg text-[#263238]/60 max-w-2xl mx-auto">
            Explore our five key focus areas where we create lasting impact in communities across India.
          </p>
        </motion.div>

        {/* ===== FLIP CARDS GRID ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {categories.map((category) => {
            const isFlipped = flipped[category.id] || false
            const route = getCategoryRoute(category.id)
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className="relative h-96 w-full cursor-pointer [perspective:1000px]"
                onClick={() => toggleFlip(category.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* ===== FRONT – new design (like screenshot) ===== */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-lg"
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content centered */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center text-white">
                      <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-1">
                        {category.title}
                      </h2>
                      <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#FFF314] mb-3">
                        WHAT WE DO
                      </p>
                      <hr className="w-12 border-t-2 border-white/50 mb-3" />
                      <p className="text-sm text-white/80 leading-relaxed max-w-xs">
                        {category.description}
                      </p>
                      <div className="mt-4 px-6 py-2 border border-white/30 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors">
                        Learn More
                      </div>
                    </div>
                  </div>

                  {/* ===== BACK ===== */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden shadow-lg p-6 flex flex-col justify-between border-4"
                    style={{
                      backgroundColor: category.color,
                      borderColor: category.color,
                    }}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-5">
                        {category.longDescription}
                      </p>
                    </div>

                    {route ? (
                      <Link
                        to={route}
                        className="mt-4 w-full py-2.5 px-4 bg-white text-[#263238] font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-md text-center inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read More →
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          alert(`Learn more about ${category.title}`)
                        }}
                        className="mt-4 w-full py-2.5 px-4 bg-white text-[#263238] font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-md"
                      >
                        Read More →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </div>
  )
}
