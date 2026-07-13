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
  ChevronDown,
  ChevronUp,
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
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({})

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleCategoryExpand = (id: number) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const scrollToCategory = (id: number) => {
    const el = document.getElementById(`category-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // ========== ROUTE CONFIGURATION ==========
  const RURAL_CATEGORY_ID = 1
  const RURAL_ROUTE = '/rural-development'

  const WOMEN_CATEGORY_ID = 2
  const WOMEN_ROUTE = '/women-empowerment'

  const EDUCATION_CATEGORY_ID = 3
  const EDUCATION_ROUTE = '/education'

  const HEALTH_CATEGORY_ID = 4          // <-- NEW
  const HEALTH_ROUTE = '/healthcare'    // <-- NEW

  const getCategoryRoute = (id: number) => {
    if (id === RURAL_CATEGORY_ID) return RURAL_ROUTE
    if (id === WOMEN_CATEGORY_ID) return WOMEN_ROUTE
    if (id === EDUCATION_CATEGORY_ID) return EDUCATION_ROUTE
    if (id === HEALTH_CATEGORY_ID) return HEALTH_ROUTE   // <-- NEW
    return null
  }

  // ========== CATEGORIES WITH NEW COLORS ==========
  const categories: WorkCategory[] = [
    // 1. Rural Development – #849989
    {
      id: 1,
      title: 'Rural Development',
      icon: Trees,
      description:
        'Transforming rural communities through sustainable development initiatives that improve quality of life and create self-reliant villages.',
      longDescription:
        'Our Rural Development programme is designed to uplift rural communities by addressing critical gaps in infrastructure, education, healthcare, and livelihood opportunities. We work closely with village panchayats, local leaders, and community members to co‑create solutions that are both sustainable and culturally appropriate. Over the years, we have adopted multiple villages, provided clean drinking water, built sanitation facilities, and empowered local youth with skills for employment. Our holistic approach ensures that every intervention is community‑led and continues to thrive long after we have moved on.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
      color: '#849989',
      bgColor: 'bg-[#849989]/20',
      borderColor: 'border-[#849989]',
      items: [
        {
          icon: Handshake,
          title: 'Village Adoption',
          description: 'Adopting villages to provide holistic development support.',
          longDescription:
            'Under the Village Adoption programme, we select underserved villages and commit to a multi‑year transformation plan. We work with the community to assess needs and priorities – from building roads and schools to setting up health camps and digital literacy centres. Our goal is to make each adopted village self‑sufficient by the end of our engagement, with active community participation and local ownership of all assets created.',
        },
        {
          icon: Droplets,
          title: 'Water & Sanitation',
          description: 'Ensuring access to clean drinking water and proper sanitation.',
          longDescription:
            'Access to clean water and proper sanitation is a fundamental right. Our Water & Sanitation projects include installing deep‑bore hand pumps, constructing rainwater harvesting structures, and building individual household toilets. We also conduct hygiene awareness sessions, especially focusing on women and children, to reduce water‑borne diseases and improve overall health outcomes in the villages.',
        },
        {
          icon: Building,
          title: 'Infrastructure',
          description: 'Building and improving rural infrastructure.',
          longDescription:
            'We believe that strong infrastructure is the backbone of rural progress. Our infrastructure initiatives range from constructing village community halls and anganwadi centres to laying internal roads and providing solar lighting. These projects not only improve daily life but also create employment opportunities for local labourers and masons, boosting the local economy.',
        },
        {
          icon: Users,
          title: 'Community Development',
          description: 'Empowering communities through capacity building.',
          longDescription:
            'True development happens when communities lead it. Our Community Development efforts focus on capacity building – training community members in participatory planning, financial literacy, and local governance. We facilitate the formation of village development committees and help them access government schemes and funds. This ensures that the village itself becomes the driver of its own progress.',
        },
      ],
    },
    // 2. Women Empowerment – #777e91
    {
      id: 2,
      title: 'Women Empowerment & Livelihood',
      icon: Users2,
      description:
        'Empowering women through skill development, financial independence, and sustainable livelihood opportunities.',
      longDescription:
        'Women are at the heart of every community, and empowering them is key to breaking the cycle of poverty. Our Women Empowerment & Livelihood programmes provide women with vocational skills, financial literacy, and access to micro‑credit through Self‑Help Groups (SHGs). We have established tailoring centres, food processing units, and small‑scale manufacturing hubs that enable women to earn a dignified income. We also work closely with women to build their confidence and leadership abilities, ensuring they have a voice in family and community decisions.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
      color: '#777e91',
      bgColor: 'bg-[#777e91]/20',
      borderColor: 'border-[#777e91]',
      items: [
        {
          icon: Scissors,
          title: 'Sewing Centres',
          description: 'Vocational training in tailoring and garment‑making.',
          longDescription:
            'Our Sewing Centres are equipped with modern sewing machines and staffed by experienced instructors. We offer a comprehensive 6‑month course that covers stitching, cutting, embroidery, and garment finishing. Graduates are able to start their own tailoring businesses or find employment in local garment factories. Many of our trainees have gone on to become master trainers themselves, creating a multiplier effect.',
        },
        {
          icon: Users2,
          title: 'SHGs (Self Help Groups)',
          description: 'Forming and strengthening women self‑help groups.',
          longDescription:
            'Self‑Help Groups are the cornerstone of our women empowerment strategy. We facilitate the formation of SHGs, train them in bookkeeping, micro‑savings, and inter‑lending. We also link SHGs to formal banking institutions and government schemes. Beyond finances, SHGs become platforms for women to discuss social issues, health, and legal rights, fostering a strong sense of solidarity and collective action.',
        },
        {
          icon: Factory,
          title: 'Graha Industries',
          description: 'Promoting home‑based industries for sustainable livelihoods.',
          longDescription:
            'Graha Industries supports women to start home‑based enterprises – from pickle making and papad rolling to agarbatti (incense stick) production and handloom weaving. We provide initial raw materials, design training, and market linkages. Our aim is to create sustainable, flexible income opportunities that allow women to work from home while managing their household responsibilities.',
        },
      ],
    },
    // 3. Education – #9eada0
    {
      id: 3,
      title: 'Education & Skill Development',
      icon: GraduationCap,
      description:
        'Providing quality education and skill development opportunities to build a brighter future for children and youth.',
      longDescription:
        'Education is the most powerful tool to break the cycle of poverty and create lasting change. Our Education & Skill Development initiatives go beyond the classroom – we run after‑school tutoring centres, digital literacy labs, and career guidance programmes. We also focus on value‑based education through our Sanskarshala programme, which instils ethics, empathy, and cultural pride in children. For youth, we offer vocational training in computer skills, spoken English, and soft skills to enhance employability.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
      color: '#9eada0',
      bgColor: 'bg-[#9eada0]/20',
      borderColor: 'border-[#9eada0]',
      items: [
        {
          icon: GraduationCap,
          title: 'Sanskarshala',
          description: 'Value‑based education for holistic development.',
          longDescription:
            'Sanskarshala is our flagship programme that integrates moral education with academic learning. We conduct interactive sessions on ethics, environmental stewardship, and civic responsibility, using storytelling, role‑play, and community projects. The programme also includes yoga and meditation to promote mental well‑being. Parents and teachers often report that children become more disciplined, compassionate, and confident after participating in Sanskarshala.',
        },
        {
          icon: Laptop,
          title: 'Digital Literacy',
          description: 'Bridging the digital divide with computer education.',
          longDescription:
            'In today’s world, digital literacy is as essential as reading and writing. Our Digital Literacy programme sets up computer centres in rural areas, equipped with computers and internet connectivity. We train both children and adults in basic computer operations, internet usage, email, and online safety. We also offer advanced courses in programming, graphic design, and data entry for those who wish to pursue careers in IT.',
        },
        {
          icon: Compass,
          title: 'Career Guidance',
          description: 'Helping youth make informed career choices.',
          longDescription:
            'Many young people in rural areas are unaware of the diverse career options available to them. Our Career Guidance programme conducts workshops, aptitude tests, and one‑on‑one counselling sessions. We invite professionals from various fields to speak about their journeys. We also provide information about scholarships, entrance exams, and vocational training institutes, helping youth to make confident decisions about their futures.',
        },
        {
          icon: Shield,
          title: 'Self‑Defence',
          description: 'Training for women and children to ensure safety.',
          longDescription:
            'We believe that every woman and child has the right to feel safe. Our Self‑Defence programme offers practical martial arts training, situational awareness drills, and legal awareness about rights and protections. The programme has been highly popular among school‑going girls and has significantly boosted their confidence. We also train teachers and parents so that they can reinforce these skills at home and in school.',
        },
      ],
    },
    // 4. Health – #8d9159
    {
      id: 4,
      title: 'Health & Social Welfare',
      icon: HeartPulse,
      description:
        'Comprehensive healthcare and social welfare programmes ensuring the well‑being of all community members.',
      longDescription:
        'Health is the foundation of a prosperous society. Our Health & Social Welfare initiatives cover preventive, curative, and promotive healthcare. We organise free health camps, conduct awareness drives on hygiene and nutrition, and facilitate access to government health schemes. We also have specialised programmes for organ donation awareness, elderly care, and support for persons with disabilities. Our community health workers regularly visit households to monitor health parameters and provide basic first aid.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
      color: '#8d9159',
      bgColor: 'bg-[#8d9159]/20',
      borderColor: 'border-[#8d9159]',
      items: [
        {
          icon: HeartPulse,
          title: 'Organ Donation',
          description: 'Creating awareness and facilitating organ donation.',
          longDescription:
            'Organ donation is a life‑saving gift, yet awareness remains low. Our Organ Donation campaign educates communities about the importance of donating organs, dispels myths, and simplifies the registration process. We partner with hospitals and transplant coordinators to provide end‑to‑end support for donors and recipients. Through our efforts, we have registered thousands of potential donors and facilitated several successful transplants.',
        },
        {
          icon: Stethoscope,
          title: 'Health Camps',
          description: 'Free medical camps for underserved communities.',
          longDescription:
            'We organise regular health camps in remote villages, bringing doctors and specialists to people who otherwise have little access to healthcare. Services include general check‑ups, dental, eye, and gynaecological screenings, as well as distribution of free medicines. We also link patients to government hospitals for follow‑up care. Our camps often see hundreds of patients, providing critical early diagnosis and treatment.',
        },
        {
          icon: Heart,
          title: 'Elderly Care',
          description: 'Support and companionship for senior citizens.',
          longDescription:
            'Our elderly population deserves dignity and care. Our Elderly Care programme conducts home visits to provide health check‑ups, medication support, and emotional companionship. We also organise social gatherings and recreational activities to combat loneliness and isolation. Additionally, we help elderly people access government pensions and other entitlements, ensuring they live their golden years with security and respect.',
        },
        {
          icon: Accessibility,
          title: 'Support for Persons with Disabilities',
          description: 'Inclusive support and opportunities for persons with disabilities.',
          longDescription:
            'Persons with disabilities often face multiple barriers. Our inclusive programme focuses on providing assistive devices, such as wheelchairs and hearing aids, and making public spaces and schools accessible. We also offer skill‑training tailored to different abilities and work with employers to create inclusive job opportunities. We advocate for the rights of people with disabilities and ensure their voices are heard in community decisions.',
        },
        {
          icon: Baby,
          title: 'Child Welfare',
          description: "Protecting children's rights and well‑being.",
          longDescription:
            'Children are the future, and we are committed to protecting their rights. Our Child Welfare programme includes nutrition supplementation, immunisation drives, and early childhood education. We also work to prevent child labour and child marriage through awareness and legal support. We collaborate with schools and anganwadi centres to ensure every child has access to quality education and healthcare from an early age.',
        },
        {
          icon: UsersRound,
          title: 'Community Welfare',
          description: 'Addressing diverse social needs holistically.',
          longDescription:
            'Community Welfare is the umbrella under which we address diverse social issues – from food security and legal aid to mental health and disaster relief. We run community kitchens during crises, provide counselling services, and facilitate access to government schemes. Our community‑based approach ensures that we are responsive to emerging needs and that no one is left behind.',
        },
      ],
    },
    // 5. Environment – #9e8b70
    {
      id: 5,
      title: 'Environment & Sustainability',
      icon: Leaf,
      description:
        'Protecting the environment and promoting sustainable practices for a greener and healthier planet.',
      longDescription:
        'Environmental degradation is one of the biggest challenges of our time. Our Environment & Sustainability programmes focus on conservation, reforestation, and sustainable resource management. We organise massive tree plantation drives, promote water harvesting, and educate communities about waste management and renewable energy. We also work with schools to instil environmental values in children, ensuring that the next generation inherits a healthier planet.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
      color: '#9e8b70',
      bgColor: 'bg-[#9e8b70]/20',
      borderColor: 'border-[#9e8b70]',
      items: [
        {
          icon: Trees,
          title: 'Plantation',
          description: 'Massive tree plantation drives for ecological balance.',
          longDescription:
            'Our Plantation programme is not just about planting trees – it is about creating forests. We select native species, involve local communities in nurturing saplings, and monitor survival rates. We have planted over 50,000 trees across various regions, creating green corridors and improving biodiversity. We also educate farmers about agro‑forestry to enhance soil fertility and provide additional income from timber and fruits.',
        },
        {
          icon: Sprout,
          title: 'Water Conservation',
          description: 'Water harvesting and sustainable water management.',
          longDescription:
            'Water scarcity affects millions. Our Water Conservation initiatives include constructing check dams, ponds, and rooftop rainwater harvesting systems. We also promote drip irrigation and water‑efficient farming practices. We work with village communities to map water sources and develop sustainable usage plans. Our efforts have significantly raised groundwater levels and reduced water‑borne diseases in many villages.',
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

  // ========== JSX ==========
  return (
    <div className="min-h-screen bg-white pt-8 pb-16">
      {/* ===== FLIP CARDS SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-[#263238] text-center mb-12"
        >
          Our Focus Areas
        </motion.h2>

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
                className="relative h-80 w-full cursor-pointer [perspective:1000px]"
                onClick={() => toggleFlip(category.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-xl font-bold drop-shadow-md">
                        {category.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#FFF314] text-[#263238] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Click to flip
                    </div>
                  </div>

                  {/* Back – with solid category color */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden shadow-lg p-6 flex flex-col justify-between"
                    style={{ backgroundColor: category.color }}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-4">
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
                          scrollToCategory(category.id)
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

      {/* ===== DETAILED CATEGORIES ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {categories.map((category) => {
          const isExpanded = expandedCategories[category.id] || false
          const route = getCategoryRoute(category.id)
          return (
            <motion.div
              key={category.id}
              id={`category-${category.id}`}
              variants={itemVariants}
              className={`relative rounded-2xl p-6 md:p-8 mb-20 last:mb-0 scroll-mt-24 border-l-8 ${category.borderColor} shadow-sm`}
              style={{ background: category.bgColor }}
            >
              {/* Category Banner Image */}
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-6">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${category.color}80, transparent)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {category.title}
                  </h2>
                  <p className="text-white/90 text-base md:text-lg max-w-2xl drop-shadow">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Expanded Category Description */}
              <div className="mb-8">
                <p className="text-[#263238]/80 text-base md:text-lg leading-relaxed">
                  {category.longDescription}
                </p>
                <button
                  onClick={() => toggleCategoryExpand(category.id)}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#263238] hover:text-[#FFF314] transition-colors"
                >
                  {isExpanded ? (
                    <>Show less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Read more about this area <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-6 bg-[#263238]/5 rounded-xl border border-[#263238]/10"
                  >
                    <p className="text-[#263238]/70 text-base leading-relaxed">
                      {category.longDescription} <br /><br />
                      <span className="font-semibold text-[#263238]">
                        Our impact in this area:
                      </span>{' '}
                      We have reached over 10,000 people through our {category.title.toLowerCase()} programmes,
                      with measurable improvements in quality of life, income, and community cohesion.
                      We continue to scale our efforts with the support of our donors and volunteers.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Category Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {category.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="group relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                    style={{
                      backgroundImage: `url(https://picsum.photos/seed/${encodeURIComponent(
                        item.title
                      )}/600/400)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                      <div
                        className={`inline-flex p-2.5 rounded-xl ${category.bgColor} mb-3 w-fit group-hover:scale-110 transition-transform duration-300`}
                        style={{ color: category.color }}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold mb-1 drop-shadow-md">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {route ? (
                        <Link
                          to={route}
                          className={`mt-3 w-full py-1.5 px-3 text-white text-xs font-semibold rounded-full transition-colors border border-white/20 text-center inline-block`}
                          style={{
                            backgroundColor: category.color,
                            backdropFilter: 'blur(4px)',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Learn More →
                        </Link>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            alert(`Learn more about ${item.title}:\n\n${item.longDescription}`)
                          }}
                          className={`mt-3 w-full py-1.5 px-3 text-white text-xs font-semibold rounded-full transition-colors border border-white/20`}
                          style={{
                            backgroundColor: category.color,
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          Learn More →
                        </button>
                      )}
                    </div>
                    <div
                      className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: category.color }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* ===== CTA SECTION ===== */}
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
