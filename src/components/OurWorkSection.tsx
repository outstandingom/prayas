// src/components/OurWorkSection.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  GraduationCap,
  Trees,
  Bus,
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  X,
  ExternalLink,
  ShoppingBag,
  Scissors,
  Users2,
  Home,
  Laptop,
  Compass,
  Shield,
  Droplets,
  Heart,
  Leaf,
} from 'lucide-react'

export interface WorkInitiative {
  id: string
  title: string
  subtitle: string
  category: string
  categorySlug: string
  icon: any
  image: string
  accentColor: string
  badgeBg: string
  badgeText: string
  description: string
  longDescription: string
  impactStat: { value: string; label: string }
  keyPoints: string[]
  targetRoute: string
}

export const ourWorkInitiatives: WorkInitiative[] = [
  {
    id: 'plastic-free-school',
    title: 'Plastic-Free School Initiative',
    subtitle: 'Sustainable Campuses & Environmental Leadership',
    category: 'Environment & Schools',
    categorySlug: 'environment',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
    accentColor: '#059669',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Eco-Campuses',
    description:
      'Prayas transformed educational institutions into plastic-free campuses by promoting sustainable practices, waste segregation, environmental education, and responsible waste management among students and teachers.',
    longDescription:
      'The Plastic-Free School Initiative instills eco-conscious habits in young minds. Through interactive workshops, campus audit drives, distribution of cloth bags, and setting up zero-waste segregation units, Prayas empowers students and faculty to eliminate single-use plastics from school premises.',
    impactStat: { value: '50+', label: 'Schools Transformed' },
    keyPoints: [
      'Zero-plastic campus policy implementation',
      'Waste segregation & composting workshops',
      'Distribution of cloth & jute alternatives',
      'Student Eco-Club leadership & awards',
    ],
    targetRoute: '/environment',
  },
  {
    id: 'plastic-free-village',
    title: 'Plastic-Free Village Initiative',
    subtitle: 'Community-Driven Waste Reduction & Green Villages',
    category: 'Rural Environment',
    categorySlug: 'rural-development',
    icon: Trees,
    image: '/ruraldevelopment.jpeg',
    accentColor: '#D97706',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    badgeText: 'Green Villages',
    description:
      'Our organization successfully implemented plastic-free village campaigns by encouraging community participation, cloth bag usage, plastic waste reduction, and sustainable village waste management systems.',
    longDescription:
      'By establishing Gram Swachhata Samitis and organizing village door-to-door drives, Prayas transforms rural hamlets into clean, plastic-free zones. We provide households with reusable cloth bags, set up community collection bins, and partner with local recyclers for zero-landfill waste disposal.',
    impactStat: { value: '25+', label: 'Plastic-Free Villages' },
    keyPoints: [
      'Door-to-door plastic collection & recycling',
      'Community cloth bag distribution drives',
      'Gram Panchayat cleanliness pledges',
      'Sustainable village waste management hubs',
    ],
    targetRoute: '/rural-development',
  },
  {
    id: 'pink-city-bus',
    title: 'Pink City Bus for Women',
    subtitle: 'Women-Led Public Mobility & Safe Transport',
    category: 'Women Empowerment',
    categorySlug: 'women-empowerment',
    icon: Bus,
    image: '/WOMEN.jpeg',
    accentColor: '#DB2777',
    badgeBg: 'bg-pink-100 text-pink-800 border-pink-300',
    badgeText: 'Women Mobility',
    description:
      'Prayas promoted women-led public transportation by supporting women drivers and advocating for safer, more inclusive mobility solutions that enhance women\'s independence and employment opportunities.',
    longDescription:
      'The Pink City Bus Initiative breaks gender barriers in public transit. We sponsor commercial driving certification, self-defence training, and financial literacy for aspiring female drivers and conductors, while advocating for dedicated, safe public transit routes for working women and students.',
    impactStat: { value: '100+', label: 'Women Trained & Employed' },
    keyPoints: [
      'Commercial driving & mechanics training for women',
      'Advocacy for safe women-only transit corridors',
      'Financial independence & steady monthly income',
      'Enhanced safety for daily female commuters',
    ],
    targetRoute: '/women-empowerment',
  },
  {
    id: 'rural-women-mental-health',
    title: 'Rural Women Mental Health & Counselling',
    subtitle: 'Emotional Well-Being, Counselling & Dignity',
    category: 'Healthcare & Wellbeing',
    categorySlug: 'healthcare',
    icon: HeartPulse,
    image: '/healthcaret.jpg',
    accentColor: '#6366F1',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    badgeText: 'Mental Wellness',
    description:
      'We organize counselling sessions and awareness programs that support rural women in improving their emotional well-being, self-confidence, and overall mental health awareness.',
    longDescription:
      'Mental health remains heavily stigmatized in rural communities. Prayas deploys trained female psychologists and counsellors to conduct confidential group therapy, stress management workshops, and maternal mental wellness camps.',
    impactStat: { value: '5,000+', label: 'Women Counselled' },
    keyPoints: [
      'Confidential one-on-one & group therapy',
      'De-stigmatizing mental health in Gram Sabhas',
      'Maternal & adolescent wellness workshops',
      'Tele-counseling helpline for rural women',
    ],
    targetRoute: '/healthcare',
  },
  {
    id: 'sabji-wali-didi',
    title: 'Sabji Wali Didi Program',
    subtitle: 'Empowering Women Vegetable Vendors',
    category: 'Women Empowerment',
    categorySlug: 'women-empowerment',
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop',
    accentColor: '#E11D48',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    badgeText: 'Micro-Vendors',
    description:
      'Empowering women vegetable vendors with financial literacy, digital payment equipment, and direct market access to maximize earnings.',
    longDescription:
      'This initiative provides micro-loans, digital weighing balances, and financial planning sessions for women street vendors, enabling them to expand their businesses and escape predatory informal money lenders.',
    impactStat: { value: '1,200+', label: 'Vendors Supported' },
    keyPoints: [
      'Micro-credit & working capital support',
      'Digital payment enablement (UPI QR kits)',
      'Direct farm-to-vendor supply linkages',
      'Financial literacy & savings accounts',
    ],
    targetRoute: '/women-empowerment',
  },
  {
    id: 'sewing-centres',
    title: 'Sewing & Tailoring Training Centres',
    subtitle: 'Vocational Garment-Making & Fashion Skills',
    category: 'Women Empowerment',
    categorySlug: 'women-empowerment',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop',
    accentColor: '#9333EA',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    badgeText: 'Vocational Skills',
    description:
      'Establishing fully equipped tailoring training centres where rural women master stitching, cutting, embroidery, and garment creation.',
    longDescription:
      'Our tailoring centres offer 6-month certified courses in dressmaking and handicraft manufacturing, complete with free sewing machine distribution upon graduation.',
    impactStat: { value: '2,500+', label: 'Graduates Certified' },
    keyPoints: [
      '6-month hands-on tailoring certification',
      'Free sewing machine kit distribution',
      'Boutique & bulk garment order linkages',
      'Self-employment support',
    ],
    targetRoute: '/women-empowerment',
  },
  {
    id: 'women-shgs',
    title: 'Self-Help Groups (SHGs) Alliance',
    subtitle: 'Micro-Finance & Collective Wealth Building',
    category: 'Women Empowerment',
    categorySlug: 'women-empowerment',
    icon: Users2,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop',
    accentColor: '#C026D3',
    badgeBg: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
    badgeText: 'Micro-Finance',
    description:
      'Fostering women-led Self-Help Groups to build community savings, access bank credit, and launch micro-enterprises.',
    longDescription:
      'Prayas forms and nurtures SHGs in rural villages, providing book-keeping training, bank linkage support, and seed capital for collective business ventures.',
    impactStat: { value: '350+', label: 'Active SHGs' },
    keyPoints: [
      'Monthly savings & credit rotation models',
      'Formal banking system integration',
      'Group business enterprise development',
      'Women leadership development in villages',
    ],
    targetRoute: '/women-empowerment',
  },
  {
    id: 'grah-udyog',
    title: 'Grah Udyog Home Enterprises',
    subtitle: 'Cottage Industry & Handmade Product Hubs',
    category: 'Women Empowerment',
    categorySlug: 'women-empowerment',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=800&h=500&fit=crop',
    accentColor: '#EA580C',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-300',
    badgeText: 'Cottage Industry',
    description:
      'Promoting home-based food processing, papad-pickle production, incense making, and artisan handicrafts.',
    longDescription:
      'Grah Udyog helps home-bound women monetize traditional skills by providing quality control, hygienic packaging, and distribution to urban markets.',
    impactStat: { value: '800+', label: 'Artisan Micro-Units' },
    keyPoints: [
      'Quality control & FSSAI food licensing aid',
      'Packaging, branding & urban market sales',
      'Raw material bulk procurement',
      'Fair-trade earnings for rural homemakers',
    ],
    targetRoute: '/women-empowerment',
  },
  {
    id: 'sanskarshala',
    title: 'Sanskarshala Value Education',
    subtitle: 'Holistic Character Building & Values for Children',
    category: 'Education',
    categorySlug: 'education',
    icon: GraduationCap,
    image: '/P1039409.JPG',
    accentColor: '#2563EB',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    badgeText: 'Child Education',
    description:
      'Integrating value-based moral education, ethics, cultural awareness, and academic tutoring for underprivileged children.',
    longDescription:
      'Sanskarshala after-school learning centres provide a safe, joyful environment where children learn values, leadership skills, hygiene habits, and academic fundamentals.',
    impactStat: { value: '15,000+', label: 'Children Reached' },
    keyPoints: [
      'Daily value-education & ethics classes',
      'Free remedial academic tutoring & books',
      'Nutritional mid-day snacks & health checkups',
      'Extracurricular arts & sports activities',
    ],
    targetRoute: '/education',
  },
  {
    id: 'digital-literacy-labs',
    title: 'Digital Literacy & Computer Labs',
    subtitle: 'Bridging the Tech Divide for Rural Youth & Girls',
    category: 'Education',
    categorySlug: 'education',
    icon: Laptop,
    image: '/education1.jpeg',
    accentColor: '#0284C7',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeText: 'Tech Labs',
    description:
      'Setting up computer labs equipped with internet connectivity to teach digital skills, coding basics, and online safety.',
    longDescription:
      'Our Digital Labs bring technology to remote schools, teaching kids computer operations, MS Office skills, internet research, and online safety.',
    impactStat: { value: '45+', label: 'Digital Labs Installed' },
    keyPoints: [
      'Solar-powered smart computer workstations',
      'Certified basic & advanced computer courses',
      'Internet safety & digital financial literacy',
      'Special focus on girl child tech training',
    ],
    targetRoute: '/education',
  },
  {
    id: 'career-guidance',
    title: 'Youth Career Guidance & Counselling',
    subtitle: 'Pathways to Higher Education & Jobs',
    category: 'Education',
    categorySlug: 'education',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
    accentColor: '#0D9488',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    badgeText: 'Youth Guidance',
    description:
      'Conducting psychometric testing, career orientation workshops, and entrance exam guidance for rural students.',
    longDescription:
      'Prayas career counsellors help 10th and 12th grade students discover suitable career paths, apply for government scholarships, and prepare for entrance exams.',
    impactStat: { value: '8,000+', label: 'Students Counselled' },
    keyPoints: [
      'Psychometric aptitude assessment drives',
      'Scholarship application assistance',
      'One-on-one mentorship by professionals',
      'Vocational course recommendations',
    ],
    targetRoute: '/education',
  },
  {
    id: 'self-defence-training',
    title: 'Self-Defence Training for Girls',
    subtitle: 'Physical Empowerment, Safety & Legal Rights',
    category: 'Education',
    categorySlug: 'education',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=500&fit=crop',
    accentColor: '#4338CA',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    badgeText: 'Safety & Defence',
    description:
      'Imparting martial arts self-defence techniques, situational awareness, and legal rights awareness to young women.',
    longDescription:
      'Our certified instructors conduct intensive self-defence bootcamps in schools and colleges, empowering girls with self-confidence and physical protection skills.',
    impactStat: { value: '6,000+', label: 'Girls Trained' },
    keyPoints: [
      'Unarmed combat & martial arts techniques',
      'Situational emergency awareness drills',
      'Awareness of women safety laws & helplines',
      'Confidence building & physical fitness',
    ],
    targetRoute: '/education',
  },
  {
    id: 'kargil-vatika',
    title: 'Kargil Vatika – Memorial Forest',
    subtitle: 'Living Tribute to Martyrs & Biodiversity Restoration',
    category: 'Environment',
    categorySlug: 'environment',
    icon: Leaf,
    image: '/TREEGROW.jpg',
    accentColor: '#16A34A',
    badgeBg: 'bg-green-100 text-green-800 border-green-300',
    badgeText: 'Eco Memorial',
    description:
      'Creating dense memorial forests by planting thousands of native saplings in honor of brave soldiers while restoring local biodiversity.',
    longDescription:
      'Kargil Vatika is a unique environmental tribute where thousands of native trees are planted and nurtured as a living memorial.',
    impactStat: { value: '10,000+', label: 'Trees Planted' },
    keyPoints: [
      'Native species plantation drives',
      'Community tree-adoption programs',
      'Groundwater table recharge pits',
      'Patriotic environmental awareness',
    ],
    targetRoute: '/environment',
  },
  {
    id: 'water-sanitation-plant',
    title: 'Clean Water & RO Filtration Plants',
    subtitle: 'Safe Drinking Water Access for Villages',
    category: 'Healthcare & Rural',
    categorySlug: 'rural-development',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=800&h=500&fit=crop',
    accentColor: '#0284C7',
    badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    badgeText: 'Clean Water',
    description:
      'Installing solar-powered deep borewell filtration units and community RO plants to eradicate water-borne diseases.',
    longDescription:
      'Water-borne illness is a leading cause of missed school and work. Prayas installs high-capacity community RO plants in fluoride-affected villages.',
    impactStat: { value: '60+', label: 'RO Plants Installed' },
    keyPoints: [
      'Solar-powered water filtration units',
      'Free pure drinking water distribution',
      'Routine water quality laboratory testing',
      'Water conservation & rainwater harvesting',
    ],
    targetRoute: '/rural-development',
  },
  {
    id: 'organ-donation-drive',
    title: 'Organ Donation Awareness Campaigns',
    subtitle: 'Pledging Lives & Saving Future Generations',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    icon: Heart,
    image: '/healthhj.jpeg',
    accentColor: '#DC2626',
    badgeBg: 'bg-red-100 text-red-800 border-red-300',
    badgeText: 'Organ Donation',
    description:
      'Conducting mass awareness drives to dispel myths surrounding organ donation and facilitating formal donor pledges.',
    longDescription:
      'Prayas organizes organ donation pledge drives in partnership with state health authorities, educating thousands on how organ donation saves lives.',
    impactStat: { value: '3,200+', label: 'Donors Pledged' },
    keyPoints: [
      'Community education & myth-busting sessions',
      'On-the-spot donor registration camps',
      'Hospital & organ transplant network partnerships',
      'Felicitation of donor family members',
    ],
    targetRoute: '/healthcare',
  },
  {
    id: 'village-adoption-program',
    title: '360° Village Adoption Program',
    subtitle: 'Holistic Rural Transformation & Adarsh Gram',
    category: 'Rural Development',
    categorySlug: 'rural-development',
    icon: Home,
    image: 'https://i.ibb.co/fWWWk9S/Whats-App-Image-2026-07-12-at-2-50-03-PM-1.jpg',
    accentColor: '#78350F',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    badgeText: 'Model Village',
    description:
      'Selecting underserved villages for multi-year comprehensive development including roads, solar lights, schools, and sanitation.',
    longDescription:
      'Our flagship Village Adoption blueprint rebuilds infrastructure, provides solar street lighting, establishes health clinics, and empowers local Gram Panchayats.',
    impactStat: { value: '35+', label: 'Villages Adopted' },
    keyPoints: [
      'Solar street lighting & internal road construction',
      'School refurbishment & digital learning labs',
      'Sanitation blocks & door-to-door waste collection',
      'Gram Panchayat empowerment & self-governance',
    ],
    targetRoute: '/rural-development',
  },
]

const categories = ['All (16)', 'Environment', 'Women Empowerment', 'Education', 'Healthcare & Rural']

function chunkPairs<T>(array: T[]): [T, T?][] {
  const pairs: [T, T?][] = []
  for (let i = 0; i < array.length; i += 2) {
    pairs.push([array[i], array[i + 1]])
  }
  return pairs
}

export default function OurWorkSection() {
  const [selectedFilter, setSelectedFilter] = useState('All (16)')
  const [activeModal, setActiveModal] = useState<WorkInitiative | null>(null)

  const filteredInitiatives = ourWorkInitiatives.filter((item) => {
    if (selectedFilter === 'All (16)') return true
    if (selectedFilter === 'Environment') return item.categorySlug === 'environment' || item.id.includes('plastic')
    if (selectedFilter === 'Women Empowerment') return item.categorySlug === 'women-empowerment'
    if (selectedFilter === 'Education') return item.categorySlug === 'education'
    if (selectedFilter === 'Healthcare & Rural') return item.categorySlug === 'healthcare' || item.categorySlug === 'rural-development'
    return true
  })

  const initiativePairs = chunkPairs(filteredInitiatives)

  return (
    <section className="relative w-full py-16 sm:py-24 bg-white text-[#263238] overflow-hidden select-none font-sans">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── SECTION HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200 text-[#263238] text-xs font-semibold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Synchronized Scroll Entrance</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Work
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full shadow-xs" />

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-light pt-1">
            As you scroll down, initiatives slide in pair-by-pair from the left & right in perfect sync.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#263238] text-white shadow-md scale-105 font-bold'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ─── PAIRED SCROLL-ANIMATED CARDS GRID (2 Cards Per Scroll Row) ─── */}
        <div className="space-y-8 lg:space-y-10">
          {initiativePairs.map((pair, rowIndex) => {
            const leftCard = pair[0]
            const rightCard = pair[1]

            return (
              <motion.div
                key={`row-${rowIndex}-${leftCard.id}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
              >
                {/* LEFT CARD (Slides in from LEFT) */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -90, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.75,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                    <img
                      src={leftCard.image}
                      alt={leftCard.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-95 group-hover:brightness-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect width="800" height="500" fill="%23263238"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="28" fill="%23FFF314" font-weight="bold"%3EPrayas Initiative%3C/text%3E%3C/svg%3E'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${leftCard.badgeBg}`}>
                        {leftCard.badgeText}
                      </span>

                      <span
                        className="p-3 rounded-2xl text-white backdrop-blur-md shadow-lg border border-white/30"
                        style={{ backgroundColor: `${leftCard.accentColor}E6` }}
                      >
                        {<leftCard.icon className="w-5 h-5" />}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-5 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-100 shadow-md">
                      <div className="text-xl font-extrabold" style={{ color: leftCard.accentColor }}>
                        {leftCard.impactStat.value}
                      </div>
                      <div className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
                        {leftCard.impactStat.label}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-5 bg-white">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                        {leftCard.category}
                      </span>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#263238] group-hover:text-red-600 transition-colors leading-tight">
                        {leftCard.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed font-normal line-clamp-3">
                        {leftCard.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-gray-100">
                      {leftCard.keyPoints.slice(0, 2).map((pt, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-3 border-t border-gray-100">
                      <button
                        onClick={() => setActiveModal(leftCard)}
                        className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold border border-gray-200 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Quick Overview</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </button>

                      <Link
                        to={leftCard.targetRoute}
                        className="px-6 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group/btn cursor-pointer"
                        style={{ backgroundColor: leftCard.accentColor }}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* RIGHT CARD (Slides in from RIGHT) */}
                {rightCard && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 90, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          duration: 0.75,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                    whileHover={{ y: -6 }}
                    className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                  >
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                      <img
                        src={rightCard.image}
                        alt={rightCard.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-95 group-hover:brightness-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect width="800" height="500" fill="%23263238"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="28" fill="%23FFF314" font-weight="bold"%3EPrayas Initiative%3C/text%3E%3C/svg%3E'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${rightCard.badgeBg}`}>
                          {rightCard.badgeText}
                        </span>

                        <span
                          className="p-3 rounded-2xl text-white backdrop-blur-md shadow-lg border border-white/30"
                          style={{ backgroundColor: `${rightCard.accentColor}E6` }}
                        >
                          {<rightCard.icon className="w-5 h-5" />}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-5 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-100 shadow-md">
                        <div className="text-xl font-extrabold" style={{ color: rightCard.accentColor }}>
                          {rightCard.impactStat.value}
                        </div>
                        <div className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">
                          {rightCard.impactStat.label}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-5 bg-white">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                          {rightCard.category}
                        </span>
                        
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#263238] group-hover:text-red-600 transition-colors leading-tight">
                          {rightCard.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed font-normal line-clamp-3">
                          {rightCard.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-gray-100">
                        {rightCard.keyPoints.slice(0, 2).map((pt, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-3 border-t border-gray-100">
                        <button
                          onClick={() => setActiveModal(rightCard)}
                          className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold border border-gray-200 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Quick Overview</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </button>

                        <Link
                          to={rightCard.targetRoute}
                          className="px-6 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group/btn cursor-pointer"
                          style={{ backgroundColor: rightCard.accentColor }}
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* ─── IMPRESSIVE YELLOW BOTTOM BANNER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-[#FFF314] text-[#263238] shadow-xl border border-yellow-300 relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-widest bg-white/70 px-3 py-1 rounded-full border border-yellow-400">
              <Award className="w-4 h-4 text-red-600" />
              <span>Ground Level Excellence</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight">
              Want to partner or volunteer for our initiatives?
            </h3>
            <p className="text-[#263238]/80 text-sm font-medium leading-relaxed">
              Collaborate with Prayas Foundation to implement plastic-free campaigns, empower women, or sponsor health drives in your region.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 z-10 shrink-0">
            <Link
              to="/donate"
              className="px-7 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Support Our Work
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-2xl bg-[#263238] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>

      </div>

      {/* ─── INTERACTIVE DETAIL MODAL SPOTLIGHT ─── */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-3xl bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl z-10 text-[#263238] my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/90 text-gray-700 hover:text-black border border-gray-200 shadow-md transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img
                  src={activeModal.image}
                  alt={activeModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block text-white mb-2 shadow-sm"
                    style={{ backgroundColor: activeModal.accentColor }}
                  >
                    {activeModal.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {activeModal.title}
                  </h3>
                  <p className="text-gray-200 text-xs sm:text-sm font-light">
                    {activeModal.subtitle}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-600 mb-2">
                    Program Blueprint & Impact
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed font-normal">
                    {activeModal.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-600 mb-3">
                    Key Deliverables & Action Items
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModal.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4">
                <div className="text-xs text-gray-600 font-medium">
                  Impact achieved: <span className="font-extrabold text-gray-900">{activeModal.impactStat.value} {activeModal.impactStat.label}</span>
                </div>
                
                <Link
                  to={activeModal.targetRoute}
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2 shadow-md transition-transform hover:scale-105"
                  style={{ backgroundColor: activeModal.accentColor }}
                >
                  <span>Go to Initiative Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
