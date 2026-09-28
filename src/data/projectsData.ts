// src/data/projectsData.ts

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string | number;
  title: string;
  category: 'Environment & Sustainability' | 'Women Empowerment & Livelihood' | 'Education & Skill Development' | 'Health & Social Welfare' | 'Rural Development';
  categorySlug?: 'environment' | 'women-empowerment' | 'education' | 'healthcare' | 'rural-development';
  status?: 'Ongoing' | 'Completed';
  description: string;
  longDescription: string;
  image: string;
  videoUrl?: string;
  badge: string;
  isFeatured?: boolean;
  route?: string;
  icon?: any;
  accentColor?: string;
  bgLight?: string;
  stats?: ProjectStat[];
  highlights?: string[];
  updatedAt?: string;
}

export const DEFAULT_NGO_PROJECTS: ProjectItem[] = [
  {
    id: 19,
    title: 'Ongoing Community Initiatives',
    category: 'Rural Development',
    categorySlug: 'rural-development',
    status: 'Ongoing',
    description: 'Our active, ongoing initiatives focusing on holistic community development, immediate relief, and sustainable solutions across various rural districts.',
    longDescription: 'Currently, Prayas is running multiple grassroots campaigns simultaneously to address urgent community needs. From ongoing health check-up camps and continuous education support in slums to active rural livelihood training programs, our volunteers are on the ground every single day making a tangible difference.',
    image: '/CHILDRENGROUP.jpg',
    badge: 'Running Project',
    isFeatured: true,
    route: '/rural-development',
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
    status: 'Ongoing',
    description: 'Transforming Sindoda into a completely plastic‑free model village through community action, waste segregation drives, and sustainable rural alternatives.',
    longDescription: 'In model village Sindoda, Prayas spearheaded a holistic plastic elimination drive. We established community composting units, replaced plastic carry bags with hand-stitched cloth bags made by local women, organized village cleanup drives, and created a self-reliant waste collection system managed by local Gram Panchayats.',
    image: '/plastic-mukti-hero-rotated.jpg',
    badge: 'Flagship Rural Model',
    isFeatured: true,
    route: '/project-sindoda/plastic-mukti',
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
    status: 'Completed',
    description: 'A living tribute to our brave soldiers – planting 5,270 native trees to build a lush memorial forest and restore green ecological balance on Kargil Vijay Diwas.',
    longDescription: 'On the solemn occasion of Kargil Vijay Diwas, Prayas Samaj Sevi Sanstha in collaboration with the Indore Municipal Corporation organized a massive tree plantation drive at Chhota Bilawali Talab, Indore. 5,270 native trees were planted in memory of 527 brave martyrs — 10 trees dedicated to each martyr as a living green tribute.',
    image: '/TREEGROW.jpg',
    badge: 'Reforestation Drive',
    isFeatured: true,
    route: '/environment/kargil-vatika',
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
    status: 'Ongoing',
    description: 'Prayas transformed educational institutions into plastic-free campuses by promoting sustainable practices, waste segregation, environmental education, and responsible waste management among students and teachers.',
    longDescription: 'Through the Plastic-Free School Initiative, Prayas partners with primary and secondary schools across Madhya Pradesh to eliminate single-use plastics from school premises. We install color-coded waste segregation bins, conduct interactive green workshops, set up student-led Eco-Clubs, and distribute reusable cloth bags to foster lifelong eco-friendly habits in young minds.',
    image: '/Sindoda/IMG_20191030_112427.jpg',
    badge: 'Eco-Education',
    route: '/environment/plastic-free-school',
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
    status: 'Completed',
    description: 'Our organization successfully implemented plastic-free village campaigns by encouraging community participation, cloth bag usage, plastic waste reduction, and sustainable village waste management systems.',
    longDescription: 'In model villages like Sindoda, Prayas spearheaded a door-to-door plastic elimination drive. We established community composting units, replaced plastic carry bags with hand-stitched cloth bags made by local women, organized village cleanup drives, and created a self-reliant waste collection system managed by local Gram Panchayats.',
    image: '/Sindoda/IMG_20191022_121001 (1).jpg',
    badge: 'Rural Sanitation',
    route: '/environment/plastic-free-village',
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
    status: 'Ongoing',
    description: 'Prayas promoted women-led public transportation by supporting women drivers and advocating for safer, more inclusive mobility solutions that enhance women\'s independence and employment opportunities.',
    longDescription: 'The Pink City Bus initiative creates safe urban transit for women while opening non-traditional employment opportunities for female commercial vehicle drivers. Prayas provides driving instruction, licensing assistance, self-defense training, and gender-sensitization workshops to municipal transport staff.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&fit=crop',
    badge: 'Inclusive Mobility',
    route: '/women-empowerment/pink-city-bus',
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
    status: 'Ongoing',
    description: 'We organize counselling sessions and awareness programs that support rural women in improving their emotional well-being, self-confidence, stress management, and overall mental health.',
    longDescription: 'Mental health support remains severely neglected in rural communities. Prayas deploys trained female counsellors and psychologists to rural hamlets to host confidential support circles, domestic harmony workshops, stress relief techniques, and psychiatric referrals for women facing trauma, anxiety, or social isolation.',
    image: '/healthhj.jpeg',
    badge: 'Mental Wellness',
    route: '/healthcare/mental-health',
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
    status: 'Ongoing',
    description: 'Prayas has established community-based potato chips manufacturing units for rural women, providing entrepreneurship training, food processing skills, quality production practices, packaging support, and market linkage to create sustainable livelihoods.',
    longDescription: 'By leveraging local agricultural produce, Prayas created micro-enterprises where rural women process, hygiene-pack, and market crispy potato chips. We supply automated slicing and frying machines, FSSAI licensing support, brand packaging, and distribution connections to local grocery chains and retail outlets.',
    image: '/WOMEN.jpeg',
    badge: 'Micro-Enterprise',
    route: '/women-empowerment/potato-chips-unit',
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
    status: 'Ongoing',
    description: 'We provide skill training in handicrafts and home-based enterprises, enabling women to create marketable products and achieve financial independence through self-employment.',
    longDescription: 'Prayas runs vocational craft centers in rural clusters teaching traditional embroidery, jute bag tailoring, terracotta decor, incense stick making, and herbal soap crafting. We help women organize into Self-Help Groups (SHGs) and sell products directly at state craft fairs and corporate exhibition stalls.',
    image: '/IMG-24.jpeg',
    badge: 'Handicraft & Skills',
    route: '/women-empowerment/handicrafts',
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
    status: 'Ongoing',
    description: 'Our evening classes offer academic support, personality development, communication skills, values, etiquette, and life skills to underprivileged children, helping them become confident and responsible individuals.',
    longDescription: 'Designed for children of daily-wage laborers and slum dwellers, Prayas Sanskarshala evening centers bridge educational gaps. Volunteer teachers provide free tuition in Math, English, and Science, along with computer practice, moral stories, sports, and nutritious evening snacks to keep children engaged and off the streets.',
    image: '/EDUCATION.JPG',
    badge: 'Sanskarshala Education',
    route: '/education/sanskarshala',
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
    status: 'Ongoing',
    description: 'Prayas conducts awareness sessions on personal hygiene, menstrual health, nutrition, sanitation, disease prevention, and healthy living for children, women, and families.',
    longDescription: 'Preventable infections cause widespread illness in underprivileged communities. Prayas conducts mobile health lectures, dispelling myths around menstrual hygiene, distributing free biodegradable sanitary napkins, teaching WHO handwashing protocols, and installing clean drinking water filtration systems in village centers.',
    image: '/healthcaret.jpg',
    badge: 'Public Health',
    route: '/healthcare/health-hygiene',
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
    status: 'Ongoing',
    description: 'For more than five years, we have organized large-scale plantation drives, biodiversity conservation activities, and environmental awareness campaigns to create greener and healthier communities.',
    longDescription: 'Prayas is committed to expanding green cover across urban and rural belts. Our annual tree plantation drives involve planting native shade, fruit, and medicinal trees near school grounds, public parks, and road dividers. We track tree survival rates through local volunteer guardians and drip-irrigation setups.',
    image: '/TREEGROW.jpg',
    badge: 'Reforestation',
    route: '/environment/plantation',
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
    status: 'Completed',
    description: 'We educate workers and labour communities about legal rights, government welfare schemes, workplace safety, and social security benefits through awareness campaigns and outreach programs.',
    longDescription: 'Unorganized construction workers, factory laborers, and domestic helpers often miss out on entitled benefits. Prayas organizes legal literacy camps informing workers about e-Shram cards, minimum wage guarantees, provident funds, safety gear requirements, and free health insurance enrollments under Ayushman Bharat.',
    image: '/IMG-27.jpeg',
    badge: 'Social Justice',
    route: '/healthcare/labour-rights',
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
    status: 'Ongoing',
    description: 'Prayas provides vocational and employability training for Class 12 students, youth, and adults, helping them develop practical skills for employment, entrepreneurship, and self-reliance.',
    longDescription: 'Our skill development academies offer market-aligned courses in computer fundamentals, graphic design basics, Tally accounting, retail sales, spoken English, and customer service. We host job fairs with local companies to secure placements for qualified youth from underprivileged backgrounds.',
    image: '/P1039409.JPG',
    badge: 'Youth Livelihoods',
    route: '/education/digital-literacy',
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
    status: 'Ongoing',
    description: 'We distribute food, clothing, educational supplies, hygiene kits, blankets, and other essential items to vulnerable families in rural and urban slum communities based on seasonal and emergency needs.',
    longDescription: 'Extreme winter cold and heavy monsoon rain disproportionately affect pavement dwellers and tribal hamlets. Prayas conducts seasonal warmth drives distributing heavy wool blankets, warm clothes, dry ration kits, school bags, and stationery sets to children and elderly citizens across needy clusters.',
    image: '/P1039322.JPG',
    badge: 'Community Relief',
    route: '/healthcare/essential-relief',
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
    status: 'Completed',
    description: 'During the COVID-19 pandemic, Prayas delivered emergency relief through food distribution, ration kits, medicines, masks, hygiene supplies, and community awareness programs, supporting thousands of vulnerable families.',
    longDescription: 'When the pandemic struck, Prayas deployed frontline volunteers to cook and distribute over 1,00,000 fresh hot meals to stranded migrant workers and daily wagers. We set up mask-making units with local women, supplied N95 masks, sanitizers, oxygen concentrators, and established medical helpline centers.',
    image: '/PRAYASHEALTHCAMP.jpeg',
    badge: 'Emergency Response',
    route: '/healthcare/covid-relief',
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
    status: 'Ongoing',
    description: 'We promote sustainable agriculture by conducting awareness programs on organic farming, natural cultivation techniques, soil health improvement, water conservation, and eco-friendly farming practices.',
    longDescription: 'Chemical pesticides degrade soil health and increase agricultural debt. Prayas trains smallholder farmers in preparing organic bio-pesticides (Jeevamrut, Neemastra), vermicomposting, crop rotation, rainwater harvesting, and securing organic certification to earn premium prices in urban markets.',
    image: '/Sindoda/IMG_20191217_133958.jpg',
    badge: 'Agri-Sustainability',
    route: '/rural-development/organic-farming',
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
    status: 'Completed',
    description: 'Prayas regularly conducts cleanliness drives at lakes, ponds, and public spaces to restore natural ecosystems, improve sanitation, and encourage community participation in environmental conservation.',
    longDescription: 'Water bodies around towns and villages face severe plastic clutter and siltation. Prayas coordinates weekend water body revival drives where youth volunteers, municipal authorities, and local residents remove plastic trash, clear invasive hyacinth weeds, and plant native trees along lake embankments.',
    image: '/IMG-23.jpeg',
    badge: 'Water Bodies Restoration',
    route: '/environment/water-conservation',
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
    status: 'Completed',
    description: 'Our organization conducts need-based community surveys to identify local challenges, assess social and environmental needs, and support evidence-based planning for sustainable urban and rural development.',
    longDescription: 'True development starts with listening to people. Prayas conducts baseline socio-economic household surveys, mapping local literacy levels, drinking water quality, unemployment, and healthcare access. The data collected guides Gram Panchayat development plans and CSR partnership proposals.',
    image: '/Sindoda/IMG_20191127_112906.jpg',
    badge: 'Civic Planning',
    route: '/rural-development/community-surveys',
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

const STORAGE_KEY = 'prayas_live_projects';

export const getStoredProjects = (): ProjectItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load live projects:', e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NGO_PROJECTS));
  return DEFAULT_NGO_PROJECTS;
};

export const saveStoredProjects = (newList: ProjectItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    window.dispatchEvent(new Event('prayas-projects-updated'));
  } catch (e) {
    console.error('Failed to save live projects:', e);
  }
};
