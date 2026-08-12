// src/pages/OurWork.tsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Filter,
  ArrowRight,
  ChevronRight,
  X,
  Heart,
  Trees,
  Users,
  Droplets,
  Building,
  GraduationCap,
  Laptop,
  Shield,
  HeartPulse,
  Stethoscope,
  Leaf,
  Sprout,
  ShoppingBag,
  Bus,
  Brain,
  Utensils,
  BookOpen,
  Briefcase,
  Gift,
  Activity,
  FileCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

export interface ProjectItem {
  id: number;
  title: string;
  category: 'Environment & Sustainability' | 'Women Empowerment & Livelihood' | 'Education & Skill Development' | 'Health & Social Welfare' | 'Rural Development';
  categorySlug: 'environment' | 'women-empowerment' | 'education' | 'healthcare' | 'rural-development';
  description: string;
  longDescription: string;
  image: string;
  badge: string;
  isFeatured?: boolean;
  stats?: { label: string; value: string }[];
  highlights?: string[];
  route?: string;
  icon: React.ElementType;
  accentColor: string;
  bgLight: string;
}

export const ALL_NGO_PROJECTS: ProjectItem[] = [
  {
    id: 19,
    title: 'Ongoing Community Initiatives',
    category: 'Rural Development',
    categorySlug: 'rural-development',
    description: 'Our active, ongoing initiatives focusing on holistic community development, immediate relief, and sustainable solutions across various rural districts.',
    longDescription: 'Currently, Prayas is running multiple grassroots campaigns simultaneously to address urgent community needs. From ongoing health check-up camps and continuous education support in slums to active rural livelihood training programs, our volunteers are on the ground every single day making a tangible difference.',
    image: '/CHILDRENGROUP.jpg',
    badge: 'Running Project',
    isFeatured: true,
    route: '/rural-development',
    icon: Activity,
    accentColor: '#EAB308',
    bgLight: '#FEFCE8',
    stats: [
      { label: 'Active Sites', value: '12+' },
      { label: 'Daily Beneficiaries', value: '500+' },
      { label: 'Volunteers Active', value: '150+' },
    ],
    highlights: [
      'Continuous daily operations across multiple rural and urban slum centers',
      'Adaptive and immediate response to community needs as they arise',
      'Integration of health, education, and livelihood support in real-time',
    ]
  },
  {
    id: 1,
    title: 'Project Sindoda (Plastic Mukti)',
    category: 'Rural Development',
    categorySlug: 'rural-development',
    description: 'Transforming Sindoda into a completely plastic‑free model village through community action, waste segregation drives, and sustainable rural alternatives.',
    longDescription: 'In model village Sindoda, Prayas spearheaded a holistic plastic elimination drive. We established community composting units, replaced plastic carry bags with hand-stitched cloth bags made by local women, organized village cleanup drives, and created a self-reliant waste collection system managed by local Gram Panchayats.',
    image: '/plastic-mukti-hero-rotated.jpg',
    badge: 'Flagship Rural Model',
    isFeatured: true,
    route: '/project-sindoda/plastic-mukti',
    icon: Trees,
    accentColor: '#16A34A',
    bgLight: '#F0FDF4',
    stats: [
      { label: 'Village Population Covered', value: '5,000+' },
      { label: 'Plastic Banned', value: '100%' },
      { label: 'Compost Units Active', value: '25' },
    ],
    highlights: [
      'Door-to-door waste segregation education for all village households',
      'Establishment of village composting pits for organic kitchen waste',
      'Ban on polythene carry bags enforced through Gram Panchayat resolutions',
    ]
  },
  {
    id: 2,
    title: 'Kargil Vatika – Memorial Forest',
    category: 'Environment & Sustainability',
    categorySlug: 'environment',
    description: 'A living tribute to our brave soldiers – planting 5,270 native trees to build a lush memorial forest and restore green ecological balance on Kargil Vijay Diwas.',
    longDescription: 'On the solemn occasion of Kargil Vijay Diwas, Prayas Samaj Sevi Sanstha in collaboration with the Indore Municipal Corporation organized a massive tree plantation drive at Chhota Bilawali Talab, Indore. 5,270 native trees were planted in memory of 527 brave martyrs — 10 trees dedicated to each martyr as a living green tribute.',
    image: '/TREEGROW.jpg',
    badge: 'Reforestation Drive',
    isFeatured: true,
    route: '/environment/kargil-vatika',
    icon: Leaf,
    accentColor: '#15803D',
    bgLight: '#ECFDF5',
    stats: [
      { label: 'Martyrs Honoured', value: '527' },
      { label: 'Trees Dedicated', value: '5,270' },
      { label: 'Location', value: 'Bilawali Talab' },
    ],
    highlights: [
      'Planting and nurturing 10 individual named trees for each of the 527 Kargil bravehearts',
      'Joint execution with Indore Municipal Corporation, Mayor & regional MLA leadership',
      'Transforming lakefront areas into a lush green protected memorial forest zone',
    ]
  },
  {
    id: 3,
    title: 'Plastic-Free School Initiative',
    category: 'Environment & Sustainability',
    categorySlug: 'environment',
    description: 'Prayas transformed educational institutions into plastic-free campuses by promoting sustainable practices, waste segregation, environmental education, and responsible waste management among students and teachers.',
    longDescription: 'Through the Plastic-Free School Initiative, Prayas partners with primary and secondary schools across Madhya Pradesh to eliminate single-use plastics from school premises. We install color-coded waste segregation bins, conduct interactive green workshops, set up student-led Eco-Clubs, and distribute reusable cloth bags to foster lifelong eco-friendly habits in young minds.',
    image: '/Sindoda/IMG_20191030_112427.jpg',
    badge: 'Eco-Education',
    route: '/environment/plastic-free-school',
    icon: Leaf,
    accentColor: '#16A34A',
    bgLight: '#F0FDF4',
    stats: [
      { label: 'Schools Transformed', value: '45+' },
      { label: 'Students Educated', value: '12,000+' },
      { label: 'Plastic Banned', value: '100% On-Campus' },
    ],
    highlights: [
      'Installation of color-coded waste segregation bins in all classrooms',
      'Student Eco-Club formation and Green Ambassador leadership programs',
      'Distribution of stainless steel water bottles and cotton bags to students',
    ]
  },
  {
    id: 4,
    title: 'Plastic-Free Village Initiative',
    category: 'Environment & Sustainability',
    categorySlug: 'environment',
    description: 'Our organization successfully implemented plastic-free village campaigns by encouraging community participation, cloth bag usage, plastic waste reduction, and sustainable village waste management systems.',
    longDescription: 'In model villages like Sindoda, Prayas spearheaded a door-to-door plastic elimination drive. We established community composting units, replaced plastic carry bags with hand-stitched cloth bags made by local women, organized village cleanup drives, and created a self-reliant waste collection system managed by local Gram Panchayats.',
    image: '/Sindoda/IMG_20191022_121001 (1).jpg',
    badge: 'Rural Sanitation',
    route: '/environment/plastic-free-village',
    icon: Trees,
    accentColor: '#15803D',
    bgLight: '#ECFDF5',
    stats: [
      { label: 'Model Villages', value: '8' },
      { label: 'Plastic Reduced', value: '85%' },
      { label: 'Cloth Bags Distributed', value: '25,000+' },
    ],
    highlights: [
      'Door-to-door waste segregation education for rural households',
      'Establishment of village composting pits for organic kitchen waste',
      'Ban on polythene carry bags enforced through Gram Panchayat resolutions',
    ]
  },
  {
    id: 5,
    title: 'Pink City Bus for Women',
    category: 'Women Empowerment & Livelihood',
    categorySlug: 'women-empowerment',
    description: 'Prayas promoted women-led public transportation by supporting women drivers and advocating for safer, more inclusive mobility solutions that enhance women\'s independence and employment opportunities.',
    longDescription: 'The Pink City Bus initiative creates safe urban transit for women while opening non-traditional employment opportunities for female commercial vehicle drivers. Prayas provides driving instruction, licensing assistance, self-defense training, and gender-sensitization workshops to municipal transport staff.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&fit=crop',
    badge: 'Inclusive Mobility',
    route: '/women-empowerment/pink-city-bus',
    icon: Bus,
    accentColor: '#DB2777',
    bgLight: '#FDF2F8',
    stats: [
      { label: 'Women Commuters Safe', value: '50,000+' },
      { label: 'Female Drivers Trained', value: '60+' },
      { label: 'City Routes Covered', value: '14' },
    ],
    highlights: [
      'Commercial heavy-vehicle driving scholarships for low-income women',
      'Safety audits and emergency panic button installations on transit routes',
      'Advocacy for reserved women-only commuter services in urban centers',
    ]
  },
  {
    id: 6,
    title: 'Rural Women Mental Health & Counselling',
    category: 'Health & Social Welfare',
    categorySlug: 'healthcare',
    description: 'We organize counselling sessions and awareness programs that support rural women in improving their emotional well-being, self-confidence, stress management, and overall mental health.',
    longDescription: 'Mental health support remains severely neglected in rural communities. Prayas deploys trained female counsellors and psychologists to rural hamlets to host confidential support circles, domestic harmony workshops, stress relief techniques, and psychiatric referrals for women facing trauma, anxiety, or social isolation.',
    image: '/healthhj.jpeg',
    badge: 'Mental Wellness',
    route: '/healthcare/mental-health',
    icon: Brain,
    accentColor: '#9333EA',
    bgLight: '#FAF5FF',
    stats: [
      { label: 'Women Counsilled', value: '4,500+' },
      { label: 'Support Circles', value: '120+' },
      { label: 'Rural Camps Held', value: '80+' },
    ],
    highlights: [
      'Confidential 1-on-1 emotional counselling sessions in village health centers',
      'Community stress relief and mindfulness workshops for mothers and elders',
      'De-stigmatization drives on mental illness with local Accredited Social Health Activists (ASHA)',
    ]
  },
  {
    id: 7,
    title: 'Rural Potato Chips Manufacturing Unit',
    category: 'Women Empowerment & Livelihood',
    categorySlug: 'women-empowerment',
    description: 'Prayas has established community-based potato chips manufacturing units for rural women, providing entrepreneurship training, food processing skills, quality production practices, packaging support, and market linkage to create sustainable livelihoods.',
    longDescription: 'By leveraging local agricultural produce, Prayas created micro-enterprises where rural women process, hygiene-pack, and market crispy potato chips. We supply automated slicing and frying machines, FSSAI licensing support, brand packaging, and distribution connections to local grocery chains and retail outlets.',
    image: '/WOMEN.jpeg',
    badge: 'Micro-Enterprise',
    route: '/women-empowerment/potato-chips-unit',
    icon: Utensils,
    accentColor: '#EAB308',
    bgLight: '#FEFCE8',
    stats: [
      { label: 'Women Employed', value: '150+' },
      { label: 'Units Operational', value: '5' },
      { label: 'Avg Income Increase', value: '300%' },
    ],
    highlights: [
      'Hands-on training in hygienic food processing and automated machinery operation',
      'FSSAI food safety compliance, quality assurance, and eco-packaging design',
      'Direct market linkages with regional wholesalers, retail outlets, and online platforms',
    ]
  },
  {
    id: 8,
    title: 'Handicraft & Home Industry Development',
    category: 'Women Empowerment & Livelihood',
    categorySlug: 'women-empowerment',
    description: 'We provide skill training in handicrafts and home-based enterprises, enabling women to create marketable products and achieve financial independence through self-employment.',
    longDescription: 'Prayas runs vocational craft centers in rural clusters teaching traditional embroidery, jute bag tailoring, terracotta decor, incense stick making, and herbal soap crafting. We help women organize into Self-Help Groups (SHGs) and sell products directly at state craft fairs and corporate exhibition stalls.',
    image: '/IMG-24.jpeg',
    badge: 'Handicraft & Skills',
    route: '/women-empowerment/handicrafts',
    icon: ShoppingBag,
    accentColor: '#C026D3',
    bgLight: '#FDF4FF',
    stats: [
      { label: 'Artisans Skilled', value: '1,200+' },
      { label: 'SHGs Formed', value: '35' },
      { label: 'Exhibitions Hosted', value: '50+' },
    ],
    highlights: [
      'Tailoring, embroidery, and handicraft masterclasses led by professional artisans',
      'Supply of sewing machines, craft raw materials, and design templates to rural mothers',
      'Micro-finance loans and bank account opening assistance for women entrepreneurs',
    ]
  },
  {
    id: 9,
    title: 'Evening Learning & Life Skills Program',
    category: 'Education & Skill Development',
    categorySlug: 'education',
    description: 'Our evening classes offer academic support, personality development, communication skills, values, etiquette, and life skills to underprivileged children, helping them become confident and responsible individuals.',
    longDescription: 'Designed for children of daily-wage laborers and slum dwellers, Prayas Sanskarshala evening centers bridge educational gaps. Volunteer teachers provide free tuition in Math, English, and Science, along with computer practice, moral stories, sports, and nutritious evening snacks to keep children engaged and off the streets.',
    image: '/EDUCATION.JPG',
    badge: 'Sanskarshala Education',
    route: '/education/sanskarshala',
    icon: GraduationCap,
    accentColor: '#2563EB',
    bgLight: '#EFF6FF',
    stats: [
      { label: 'Children Enrolled', value: '2,800+' },
      { label: 'Sanskarshala Centers', value: '18' },
      { label: 'Pass Rate Boost', value: '94%' },
    ],
    highlights: [
      'After-school remedial academic tutoring for Class 1 to 10 students',
      'Personality development, public speaking, hygiene habits, and value education',
      'Daily wholesome nutritional supplement (milk, fruits, biscuits) provided free',
    ]
  },
  {
    id: 10,
    title: 'Health & Hygiene Awareness',
    category: 'Health & Social Welfare',
    categorySlug: 'healthcare',
    description: 'Prayas conducts awareness sessions on personal hygiene, menstrual health, nutrition, sanitation, disease prevention, and healthy living for children, women, and families.',
    longDescription: 'Preventable infections cause widespread illness in underprivileged communities. Prayas conducts mobile health lectures, dispelling myths around menstrual hygiene, distributing free biodegradable sanitary napkins, teaching WHO handwashing protocols, and installing clean drinking water filtration systems in village centers.',
    image: '/healthcaret.jpg',
    badge: 'Public Health',
    route: '/healthcare/health-hygiene',
    icon: Stethoscope,
    accentColor: '#DC2626',
    bgLight: '#FEF2F2',
    stats: [
      { label: 'Hygiene Kits Given', value: '15,000+' },
      { label: 'Awareness Sessions', value: '250+' },
      { label: 'Beneficiaries Reached', value: '40,000+' },
    ],
    highlights: [
      'Free distribution of eco-friendly sanitary napkins and personal grooming kits',
      'Demystifying menstrual health taboo with adolescent schoolgirls and mothers',
      'Vector-borne disease awareness (Dengue, Malaria, Typhoid) before monsoon seasons',
    ]
  },
  {
    id: 11,
    title: 'Plantation & Environmental Conservation',
    category: 'Environment & Sustainability',
    categorySlug: 'environment',
    description: 'For more than five years, we have organized large-scale plantation drives, biodiversity conservation activities, and environmental awareness campaigns to create greener and healthier communities.',
    longDescription: 'Prayas is committed to expanding green cover across urban and rural belts. Our annual tree plantation drives involve planting native shade, fruit, and medicinal trees near school grounds, public parks, and road dividers. We track tree survival rates through local volunteer guardians and drip-irrigation setups.',
    image: '/TREEGROW.jpg',
    badge: 'Reforestation',
    route: '/environment/plantation',
    icon: Sprout,
    accentColor: '#16A34A',
    bgLight: '#F0FDF4',
    stats: [
      { label: 'Trees Planted', value: '50,000+' },
      { label: 'Survival Rate', value: '88%' },
      { label: 'Volunteers Engaged', value: '3,500+' },
    ],
    highlights: [
      'Selection of native fruit and shade trees suited for regional climate resilience',
      'Adoption of geotagged sapling care protocols by student green ambassadors',
      'Commemorative green drives on Independence Day, Kargil Vijay Diwas, and Earth Day',
    ]
  },
  {
    id: 12,
    title: 'Labour Rights Awareness',
    category: 'Health & Social Welfare',
    categorySlug: 'healthcare',
    description: 'We educate workers and labour communities about legal rights, government welfare schemes, workplace safety, and social security benefits through awareness campaigns and outreach programs.',
    longDescription: 'Unorganized construction workers, factory laborers, and domestic helpers often miss out on entitled benefits. Prayas organizes legal literacy camps informing workers about e-Shram cards, minimum wage guarantees, provident funds, safety gear requirements, and free health insurance enrollments under Ayushman Bharat.',
    image: '/IMG-27.jpeg',
    badge: 'Social Justice',
    route: '/healthcare/labour-rights',
    icon: Shield,
    accentColor: '#0284C7',
    bgLight: '#F0F9FF',
    stats: [
      { label: 'Workers Registered', value: '8,000+' },
      { label: 'Legal Camps Held', value: '65' },
      { label: 'Welfare Cards Issued', value: '5,500+' },
    ],
    highlights: [
      'Assistance in registering unorganized laborers on government e-Shram portals',
      'Workplace hazard prevention training and distribution of safety helmets and boots',
      'Legal guidance for dispute resolution, wage delays, and maternity benefits',
    ]
  },
  {
    id: 13,
    title: 'Skill Development & Employability Training',
    category: 'Education & Skill Development',
    categorySlug: 'education',
    description: 'Prayas provides vocational and employability training for Class 12 students, youth, and adults, helping them develop practical skills for employment, entrepreneurship, and self-reliance.',
    longDescription: 'Our skill development academies offer market-aligned courses in computer fundamentals, graphic design basics, Tally accounting, retail sales, spoken English, and customer service. We host job fairs with local companies to secure placements for qualified youth from underprivileged backgrounds.',
    image: '/P1039409.JPG',
    badge: 'Youth Livelihoods',
    route: '/education/digital-literacy',
    icon: Laptop,
    accentColor: '#4F46E5',
    bgLight: '#EEF2FF',
    stats: [
      { label: 'Youth Trained', value: '3,200+' },
      { label: 'Placement Rate', value: '78%' },
      { label: 'Partner Employers', value: '40+' },
    ],
    highlights: [
      'Certified computer literacy and office software application modules',
      'Spoken English fluency, resume building, and interview mock preparation',
      'Job placement drives and internship linkages with local businesses and retail stores',
    ]
  },
  {
    id: 14,
    title: 'Distribution of Essential Relief Materials',
    category: 'Health & Social Welfare',
    categorySlug: 'healthcare',
    description: 'We distribute food, clothing, educational supplies, hygiene kits, blankets, and other essential items to vulnerable families in rural and urban slum communities based on seasonal and emergency needs.',
    longDescription: 'Extreme winter cold and heavy monsoon rain disproportionately affect pavement dwellers and tribal hamlets. Prayas conducts seasonal warmth drives distributing heavy wool blankets, warm clothes, dry ration kits, school bags, and stationery sets to children and elderly citizens across needy clusters.',
    image: '/P1039322.JPG',
    badge: 'Community Relief',
    route: '/healthcare/essential-relief',
    icon: Gift,
    accentColor: '#EA580C',
    bgLight: '#FFF7ED',
    stats: [
      { label: 'Blankets Distributed', value: '10,000+' },
      { label: 'Ration Kits Given', value: '20,000+' },
      { label: 'Slums Covered', value: '150+' },
    ],
    highlights: [
      'Annual "Warmth of Humanity" winter blanket and sweater distribution drives',
      'School kit distribution (notebooks, bags, shoes, uniforms) before new academic sessions',
      'Emergency dry ration provision for families facing sudden loss of employment',
    ]
  },
  {
    id: 15,
    title: 'COVID-19 Relief & Disaster Response',
    category: 'Health & Social Welfare',
    categorySlug: 'healthcare',
    description: 'During the COVID-19 pandemic, Prayas delivered emergency relief through food distribution, ration kits, medicines, masks, hygiene supplies, and community awareness programs, supporting thousands of vulnerable families.',
    longDescription: 'When the pandemic struck, Prayas deployed frontline volunteers to cook and distribute over 1,00,000 fresh hot meals to stranded migrant workers and daily wagers. We set up mask-making units with local women, supplied N95 masks, sanitizers, oxygen concentrators, and established medical helpline centers.',
    image: '/PRAYASHEALTHCAMP.jpeg',
    badge: 'Emergency Response',
    route: '/healthcare/covid-relief',
    icon: Activity,
    accentColor: '#B91C1C',
    bgLight: '#FEF2F2',
    stats: [
      { label: 'Hot Meals Served', value: '1,00,000+' },
      { label: 'Masks Made & Gifted', value: '50,000+' },
      { label: 'Families Supported', value: '12,000+' },
    ],
    highlights: [
      'Daily cooked food distribution for stranded migrant laborers during lockdowns',
      'Home delivery of medicine and grocery kits to COVID-positive isolated families',
      'Setup of community oxygen concentrator banks and medical referral helplines',
    ]
  },
  {
    id: 16,
    title: 'Organic Farming Awareness',
    category: 'Rural Development',
    categorySlug: 'rural-development',
    description: 'We promote sustainable agriculture by conducting awareness programs on organic farming, natural cultivation techniques, soil health improvement, water conservation, and eco-friendly farming practices.',
    longDescription: 'Chemical pesticides degrade soil health and increase agricultural debt. Prayas trains smallholder farmers in preparing organic bio-pesticides (Jeevamrut, Neemastra), vermicomposting, crop rotation, rainwater harvesting, and securing organic certification to earn premium prices in urban markets.',
    image: '/Sindoda/IMG_20191217_133958.jpg',
    badge: 'Agri-Sustainability',
    route: '/rural-development/organic-farming',
    icon: Leaf,
    accentColor: '#65A30D',
    bgLight: '#F7FEE7',
    stats: [
      { label: 'Farmers Trained', value: '1,800+' },
      { label: 'Organic Acres', value: '450+' },
      { label: 'Fertilizer Savings', value: '40%' },
    ],
    highlights: [
      'Demonstration farms teaching natural farming and Jeevamrut preparation',
      'Soil testing camps and vermicompost bed installation support for small farmers',
      'Creation of Farmer Producer Groups (FPGs) for direct organic grain sales',
    ]
  },
  {
    id: 17,
    title: 'Lake & Pond Cleaning Drives',
    category: 'Environment & Sustainability',
    categorySlug: 'environment',
    description: 'Prayas regularly conducts cleanliness drives at lakes, ponds, and public spaces to restore natural ecosystems, improve sanitation, and encourage community participation in environmental conservation.',
    longDescription: 'Water bodies around towns and villages face severe plastic clutter and siltation. Prayas coordinates weekend water body revival drives where youth volunteers, municipal authorities, and local residents remove plastic trash, clear invasive hyacinth weeds, and plant native trees along lake embankments.',
    image: '/IMG-23.jpeg',
    badge: 'Water Bodies Restoration',
    route: '/environment/water-conservation',
    icon: Droplets,
    accentColor: '#0D9488',
    bgLight: '#F0FDFA',
    stats: [
      { label: 'Lakes Cleaned', value: '12' },
      { label: 'Trash Removed', value: '35 Tons' },
      { label: 'Volunteers Engaged', value: '2,200+' },
    ],
    highlights: [
      'Desiltation and plastic removal drives at Chhota Bilawali Talab and regional ponds',
      'Installation of floating trash traps and warning signboards against littering',
      'Community eco-pledges and tree planting around revived lakefront promenades',
    ]
  },
  {
    id: 18,
    title: 'Community Surveys & Development Planning',
    category: 'Rural Development',
    categorySlug: 'rural-development',
    description: 'Our organization conducts need-based community surveys to identify local challenges, assess social and environmental needs, and support evidence-based planning for sustainable urban and rural development.',
    longDescription: 'True development starts with listening to people. Prayas conducts baseline socio-economic household surveys, mapping local literacy levels, drinking water quality, unemployment, and healthcare access. The data collected guides Gram Panchayat development plans and CSR partnership proposals.',
    image: '/Sindoda/IMG_20191127_112906.jpg',
    badge: 'Civic Planning',
    route: '/rural-development/community-surveys',
    icon: FileCheck,
    accentColor: '#475569',
    bgLight: '#F8FAFC',
    stats: [
      { label: 'Surveys Conducted', value: '18,000+ HH' },
      { label: 'Villages Mapped', value: '25' },
      { label: 'Panchayat Reports', value: '30+' },
    ],
    highlights: [
      'Comprehensive door-to-door socio-economic data collection in rural clusters',
      'GIS mapping of community water sources, sanitation gaps, and school distance',
      'Presentation of evidence-based development blueprints to district collectors',
    ]
  }
];

const CATEGORIES = [
  'All Projects',
  'Environment & Sustainability',
  'Women Empowerment & Livelihood',
  'Education & Skill Development',
  'Health & Social Welfare',
  'Rural Development'
];

export default function OurWork() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    return ALL_NGO_PROJECTS.filter((proj) => {
      return selectedCategory === 'All Projects' || proj.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-slate-50 pt-[var(--navbar-height,80px)] pb-24 text-[#263238]">

      {/* ===== HERO HEADER SECTION WITH CLEAR CRISP PHOTO (NO HEAVY DARK FADE) ===== */}
      <section className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        {/* Crisp Clear Background Image - Zero Dark or White Fade */}
        <div className="absolute inset-0 z-0">
          <img
            src="/CHILDRENGROUP.jpg"
            alt="Prayas NGO Initiatives"
            className="w-full h-full object-cover object-top filter brightness-[0.88] saturate-[1.15]"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-bold text-[#FFF314] uppercase tracking-widest mb-4 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#FFF314]" />
            <span>Our Work & Ground-Level Impact</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-xl text-white"
          >
            Empowering Communities Through <span className="text-[#FFF314]">Action</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-base sm:text-lg max-w-3xl mx-auto mt-4 font-semibold leading-relaxed drop-shadow bg-black/35 backdrop-blur-xs p-4 rounded-2xl border border-white/20"
          >
            Explore all 18 core community initiatives driven by Prayas Samaj Sevi Sanstha — including flagship projects like Project Sindoda (Plastic Mukti) and Kargil Vatika (Memorial Forest).
          </motion.p>
        </div>
      </section>

      {/* ===== CONTROLS & FILTER SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-200/80 flex items-center justify-center">

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30 scale-105'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ===== PREMIUM PROJECTS GRID (STRAIGHT, UNTILTED PERFECT CARDS) ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-[#263238]">No projects match your search</h3>
            <p className="text-gray-500 text-sm mt-1">Try resetting your search query or filter selection.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Projects');
              }}
              className="mt-4 px-6 py-2.5 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-red-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 relative transform-none"
                >
                  {/* Accent Top Border */}
                  <div
                    className="h-2 w-full"
                    style={{ backgroundColor: proj.accentColor }}
                  />

                  {/* Card Content Top */}
                  <div>
                    {/* Perfectly Straight Image Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-b-none transform-none">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Index Badge */}
                      <span className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-white/20">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>

                      {/* Optional Status Badge */}
                      {proj.badge && (
                        <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md shadow-red-600/30">
                          {proj.badge}
                        </span>
                      )}
                    </div>

                    {/* Body Info */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shadow-xs"
                          style={{ backgroundColor: proj.bgLight, color: proj.accentColor }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider">
                          {proj.category}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#263238] tracking-tight group-hover:text-red-600 transition-colors line-clamp-2">
                        {proj.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed font-normal line-clamp-3">
                        {proj.description}
                      </p>

                      {/* Highlights preview */}
                      {proj.highlights && (
                        <ul className="space-y-1.5 pt-2 border-t border-gray-100">
                          {proj.highlights.slice(0, 2).map((hl, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalProject(proj)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#263238] hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <span>Quick Preview</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {proj.route ? (
                      <Link
                        to={proj.route}
                        className="inline-flex items-center gap-1.5 bg-[#263238] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => setActiveModalProject(proj)}
                        className="inline-flex items-center gap-1.5 bg-[#263238] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </section>

      {/* ===== SPOTLIGHT PROJECT DETAIL MODAL ===== */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md bg-gray-100 mb-6">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow">
                    {activeModalProject.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Project Overview
                  </h4>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
                    {activeModalProject.longDescription}
                  </p>
                </div>

                {/* Key Metrics */}
                {activeModalProject.stats && (
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Verified Impact Stats
                    </h4>
                    <div className="grid grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      {activeModalProject.stats.map((st, i) => (
                        <div key={i} className="text-center">
                          <span className="block text-lg sm:text-xl font-extrabold text-red-600">
                            {st.value}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {st.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Items */}
                {activeModalProject.highlights && (
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Key Program Pillars
                    </h4>
                    <div className="space-y-2">
                      {activeModalProject.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer CTAs */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>

                  <div className="flex items-center gap-3">
                    {activeModalProject.route && (
                      <Link
                        to={activeModalProject.route}
                        className="px-6 py-3 rounded-2xl bg-[#263238] hover:bg-[#1e272c] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <span>Full Page View</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}

                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
