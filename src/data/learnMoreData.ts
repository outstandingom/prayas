// src/data/learnMoreData.ts

export interface InitiativeDetail {
  id: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  subtitle: string;
  heroImage: string;
  accentColor: string;
  secondaryColor: string;
  gradientBg: string;
  shortDescription: string;
  longDescription: string;
  videoUrl?: string;
  videoTitle?: string;
  stats: { label: string; value: string; icon?: string }[];
  objectives: { title: string; desc: string; iconName?: string }[];
  methodology: { step: string; title: string; desc: string }[];
  impactStory?: {
    quote: string;
    author: string;
    location: string;
    role: string;
    avatar?: string;
  };
  gallery: string[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaDescription: string;
}

export const learnMoreData: Record<string, InitiativeDetail> = {
  // ─── RURAL DEVELOPMENT INITIATIVES ───
  'rural-development/village-adoption': {
    id: 'village-adoption',
    categorySlug: 'rural-development',
    categoryName: 'Rural Development',
    title: 'Village Adoption Program',
    subtitle: 'Holistic transformation & self-reliance for rural communities',
    heroImage: '/ruraldevelopment.jpeg',
    accentColor: '#B45309',
    secondaryColor: '#FEF3C7',
    gradientBg: 'from-[#78350F] via-[#B45309] to-[#D97706]',
    shortDescription: 'Selecting underserved villages and committing to multi-year, end-to-end community development plans.',
    longDescription:
      'Under the Village Adoption programme, Prayas Foundation identifies remote and economically vulnerable villages to implement comprehensive 360° development blueprints. We collaborate closely with Gram Panchayats, village elders, and youth groups to rebuild essential infrastructure, set up clean water facilities, provide solar street lighting, and revitalize local schools. Our goal is to transform every adopted village into a self-sustaining model village (Adarsh Gram) governed by empowered local leadership.',
    stats: [
      { label: 'Villages Adopted', value: '35+' },
      { label: 'Lives Transformed', value: '48,000+' },
      { label: 'Solar Lights Installed', value: '1,200+' },
      { label: 'Sustainability Rate', value: '96%' },
    ],
    objectives: [
      { title: 'Infrastructure Revamp', desc: 'Building durable internal roads, community halls, sanitation blocks, and solar power setups.' },
      { title: 'Youth & Adult Livelihoods', desc: 'Setting up micro-enterprises, agricultural training, and self-help group financial linkages.' },
      { title: 'Health & Hygiene Access', desc: 'Establishing telemedicine centers, clean drinking water filtration plants, and medical checkups.' },
      { title: 'Education & Digital Literacy', desc: 'Upgrading village primary schools with smart learning kits and computer labs.' },
    ],
    methodology: [
      { step: '01', title: 'Baseline Assessment', desc: 'Detailed socio-economic survey and community town-hall meetings to map vital village needs.' },
      { step: '02', title: 'Panchayat & Community MoUs', desc: 'Forming Village Development Committees (VDCs) with 50% female representation.' },
      { step: '03', title: 'Infrastructure & Skill Execution', desc: 'Deploying engineering teams, healthcare units, and vocational instructors over 18-36 months.' },
      { step: '04', title: 'Handover & Self-Governance', desc: 'Transitioning management and maintenance of assets fully to the local VDC.' },
    ],
    impactStory: {
      quote: "Before Prayas adopted our village, we had no streetlights and drinking water was 3 kilometers away. Today, our children study under solar lights and every household has clean tap water.",
      author: "Rameshwar Prasad",
      location: "Sindoda Village, Madhya Pradesh",
      role: "Gram Sarpanch",
    },
    gallery: [
      '/ruraldevelopment.jpeg',
      '/P1039322.JPG',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=800&h=500&fit=crop',
    ],
    faqs: [
      { question: 'How do you select a village for adoption?', answer: 'We evaluate economic indicators, access to basic utilities, local willingness to participate, and distance from government infrastructure.' },
      { question: 'How long does a village adoption project take?', answer: 'Typical engagements last between 2 to 4 years to guarantee long-term self-reliance.' },
      { question: 'Can individuals or corporates sponsor a village?', answer: 'Yes! Corporate CSR partners and individual donors can sponsor specific villages or components like solar lighting and water plants.' },
    ],
    ctaTitle: 'Adopt or Sponsor a Village Today',
    ctaDescription: 'Your support provides electricity, clean water, and self-reliance to an entire community.',
  },

  'rural-development/water-sanitation': {
    id: 'water-sanitation',
    categorySlug: 'rural-development',
    categoryName: 'Rural Development',
    title: 'Clean Water & Sanitation Initiative',
    subtitle: 'Bringing safe drinking water and dignified hygiene to rural homes',
    heroImage: 'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=1200&fit=crop',
    accentColor: '#0284C7',
    secondaryColor: '#E0F2FE',
    gradientBg: 'from-[#0369A1] via-[#0284C7] to-[#38BDF8]',
    shortDescription: 'Installing deep borewells, RO purification units, rainwater harvesting, and household toilets.',
    longDescription:
      'Water-borne diseases and lack of proper sanitation are major causes of health issues and school dropouts in rural areas. Prayas Foundation works tirelessly to install community water filtration plants, deep-well hand pumps, and rooftop rainwater harvesters. Furthermore, we construct eco-friendly household pit toilets and run intensive hygiene awareness campaigns (Swachhata Abhiyan) to eradicate open defecation and improve public health.',
    stats: [
      { label: 'Clean Water Units', value: '140+' },
      { label: 'Toilets Built', value: '3,200+' },
      { label: 'Daily Water Liters', value: '500,000+' },
      { label: 'Reduction in Water Diseases', value: '78%' },
    ],
    objectives: [
      { title: 'Safe Drinking Water Access', desc: 'Deploying solar-powered RO water ATMs and deep aquifer borewells.' },
      { title: 'Total Sanitation Drive', desc: 'Constructing private, safe toilet facilities for women and families.' },
      { title: 'Rainwater Harvesting', desc: 'Building rooftop collection systems for schools and public buildings.' },
      { title: 'Hygiene Education', desc: 'Conducting handwashing workshops in schools and Anganwadis.' },
    ],
    methodology: [
      { step: '01', title: 'Hydro-geological Survey', desc: 'Testing soil and groundwater levels to locate optimal aquifer sources.' },
      { step: '02', title: 'Filtration Plant Setup', desc: 'Installing multi-stage RO & UV purification equipment powered by solar panels.' },
      { step: '03', title: 'Toilet Construction', desc: 'Building twin-pit pour-flush toilets in households with zero sanitation.' },
      { step: '04', title: 'Pani Samiti Formation', desc: 'Training local women caretakers to operate and maintain water points.' },
    ],
    impactStory: {
      quote: "My daughters used to walk 2 hours every morning to fetch muddy well water. Now clean drinking water is available right at our doorstep.",
      author: "Sunita Devi",
      location: "Barwani District, MP",
      role: "Resident & Water Committee Member",
    },
    gallery: [
      'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=800&h=500&fit=crop',
      '/P1039322.JPG',
      '/ruraldevelopment.jpeg',
    ],
    faqs: [
      { question: 'How is water purity guaranteed?', answer: 'We conduct regular chemical and bacteriological testing every quarter.' },
      { question: 'Who maintains the water filtration units?', answer: 'Local Pani Samitis collected nominal user fees that fund filter replacements and maintenance.' },
    ],
    ctaTitle: 'Sponsor a Clean Water Tank or Toilet',
    ctaDescription: 'Help us protect rural children and mothers from water-borne illnesses.',
  },

  'rural-development/infrastructure': {
    id: 'infrastructure',
    categorySlug: 'rural-development',
    categoryName: 'Rural Development',
    title: 'Rural Infrastructure Development',
    subtitle: 'Constructing the physical backbone for rural prosperity',
    heroImage: 'https://images.unsplash.com/photo-1574316345009-1c15a0aab7e3?w=1200&fit=crop',
    accentColor: '#B45309',
    secondaryColor: '#FEF3C7',
    gradientBg: 'from-[#78350F] via-[#B45309] to-[#F59E0B]',
    shortDescription: 'Paving roads, constructing Anganwadis, installing solar grids, and building community centers.',
    longDescription:
      'Strong physical infrastructure converts isolated hamlets into connected, thriving economies. We build all-weather concrete pathways, multipurpose community halls (Panchayat Bhawans), child-friendly Anganwadis, and off-grid solar mini-grids. By utilizing local labor and sustainable materials, we generate immediate employment while constructing assets that last for decades.',
    stats: [
      { label: 'KM Roads Laid', value: '42 km' },
      { label: 'Community Halls', value: '18' },
      { label: 'Solar Grids Installed', value: '25' },
      { label: 'Local Jobs Created', value: '850+' },
    ],
    objectives: [
      { title: 'All-Weather Connectivity', desc: 'Connecting remote hamlets to main market roads.' },
      { title: 'Smart Anganwadis', desc: 'Upgrading early childhood care centers with colorful, safe facilities.' },
      { title: 'Solar Street Lighting', desc: 'Illuminating dark village pathways for safety and night mobility.' },
      { title: 'Community Centers', desc: 'Providing sheltered spaces for meetings, health camps, and events.' },
    ],
    methodology: [
      { step: '01', title: 'Panchayat Need Mapping', desc: 'Identifying critical structural gaps in accessibility and public spaces.' },
      { step: '02', title: 'Engineering Blueprint', desc: 'Designing climate-resilient structures adhering to national building codes.' },
      { step: '03', title: 'Community Construction', desc: 'Hiring and training local masons and workers for asset creation.' },
      { step: '04', title: 'Quality & Safety Audit', desc: 'Inspecting material durability and structural safety before official commissioning.' },
    ],
    impactStory: {
      quote: "During monsoons our village was cut off from the doctor. The new concrete road built by Prayas saved three emergency patients this year alone.",
      author: "Vikram Singh",
      location: "Rajasthan",
      role: "Village Youth Leader",
    },
    gallery: [
      'https://images.unsplash.com/photo-1574316345009-1c15a0aab7e3?w=800&h=500&fit=crop',
      '/P1039322.JPG',
      '/ruraldevelopment.jpeg',
    ],
    faqs: [
      { question: 'Do you work in partnership with local governments?', answer: 'Yes, all infrastructure projects obtain official Panchayat permissions and align with government schemes.' },
    ],
    ctaTitle: 'Build Infrastructure that Transforms Lives',
    ctaDescription: 'Contribute towards a solar streetlight or a community center brick.',
  },

  'rural-development/community-development': {
    id: 'community-development',
    categorySlug: 'rural-development',
    categoryName: 'Rural Development',
    title: 'Community Empowerment & Capacity Building',
    subtitle: 'Fostering local leadership, governance & participatory growth',
    heroImage: '/P1039322.JPG',
    accentColor: '#15803D',
    secondaryColor: '#DCFCE7',
    gradientBg: 'from-[#14532D] via-[#15803D] to-[#22C55E]',
    shortDescription: 'Training village committees, women leaders, and youth in financial literacy and governance.',
    longDescription:
      'True empowerment is when a community no longer relies on external aid. Prayas Foundation invests heavily in social capital by setting up Village Development Committees (VDCs), training women in financial literacy and governance, and linking farmers with government welfare policies. We equip villagers with the knowledge to access bank credit, government subsidies, and legal entitlements.',
    stats: [
      { label: 'VDCs Formed', value: '50+' },
      { label: 'Leaders Trained', value: '1,400+' },
      { label: 'Govt Schemes Claimed', value: '₹2.4 Cr+' },
      { label: 'Female Participation', value: '55%' },
    ],
    objectives: [
      { title: 'Participatory Governance', desc: 'Building democratic local committees to plan village budgets and priorities.' },
      { title: 'Government Scheme Facilitation', desc: 'Helping villagers enroll in PM-Kisan, Ayushman Bharat, and MNREGA.' },
      { title: 'Financial Inclusion', desc: 'Opening bank accounts, digital UPI usage, and financial planning workshops.' },
      { title: 'Conflict Resolution', desc: 'Fostering social cohesion, harmony, and collective problem solving.' },
    ],
    methodology: [
      { step: '01', title: 'Mobilization Meetings', desc: 'Gathering all hamlets to elect inclusive committee members.' },
      { step: '02', title: 'Rights & Schemes Training', desc: 'Conducting workshops on government portals, paperwork, and rights.' },
      { step: '03', title: 'Action Plan Execution', desc: 'Mentoring VDCs as they execute community welfare projects independently.' },
      { step: '04', title: 'Federation Building', desc: 'Connecting neighboring VDCs into regional networks for collective bargaining.' },
    ],
    impactStory: {
      quote: "I never thought a woman from a small village could address the Sarpanch. Today I lead our village welfare committee proudly.",
      author: "Manju Bai",
      location: "Madhya Pradesh",
      role: "VDC President",
    },
    gallery: [
      '/P1039322.JPG',
      '/ruraldevelopment.jpeg',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop',
    ],
    faqs: [
      { question: 'How do you ensure marginalized groups are included?', answer: 'Our bylaws mandate equal representation for women, youth, and marginalized castes in every committee.' },
    ],
    ctaTitle: 'Empower a Community Leader Today',
    ctaDescription: 'Help us train local leaders who drive sustainable progress from within.',
  },

  // ─── EDUCATION INITIATIVES ───
  'education/sanskarshala': {
    id: 'sanskarshala',
    categorySlug: 'education',
    categoryName: 'Education & Skills',
    title: 'Sanskarshala - Moral & Academic Education',
    subtitle: 'Nurturing values, wisdom, and character alongside academic excellence',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&fit=crop',
    accentColor: '#0056B3',
    secondaryColor: '#DBEAFE',
    gradientBg: 'from-[#1E3A8A] via-[#0056B3] to-[#3B82F6]',
    shortDescription: 'Integrating value-based ethics, civic duty, yoga, and interactive learning for underprivileged children.',
    longDescription:
      'Sanskarshala is Prayas Foundation flagship educational movement designed to nurture holistic, compassionate human beings. Operating in rural and slum areas, Sanskarshala complements formal schooling by offering moral science, civic consciousness, environmental ethics, Indian heritage, art, and mental mindfulness. Through storytelling, puppet shows, group discussions, and interactive activities, children build strong character, empathy, and academic confidence.',
    stats: [
      { label: 'Sanskarshala Centers', value: '65+' },
      { label: 'Children Enrolled', value: '12,500+' },
      { label: 'Volunteer Mentors', value: '450+' },
      { label: 'School Retention Rate', value: '94%' },
    ],
    objectives: [
      { title: 'Moral & Ethical Foundation', desc: 'Teaching honesty, respect, non-violence, and social responsibility.' },
      { title: 'Academic Support', desc: 'Remedial tutoring in mathematics, science, Hindi, and English.' },
      { title: 'Mindfulness & Health', desc: 'Daily yoga, meditation, and personal hygiene habit tracking.' },
      { title: 'Creative Expression', desc: 'Encouraging music, drama, drawing, and public speaking.' },
    ],
    methodology: [
      { step: '01', title: 'Community Center Setup', desc: 'Securing safe spaces in village temples, schools, or community halls.' },
      { step: '02', title: 'Teacher & Mentor Training', desc: 'Training local youth as certified Sanskarshala educators.' },
      { step: '03', title: 'Interactive Learning Modules', desc: 'Using audio-visual stories, moral games, and activity workbooks.' },
      { step: '04', title: 'Parental & Community Showcase', desc: 'Hosting monthly cultural fests and parent progress meetings.' },
    ],
    impactStory: {
      quote: "Before Sanskarshala, my son was shy and struggling in school. Now he leads morning assembly and helps younger kids with homework.",
      author: "Geeta Sharma",
      location: "Indore, MP",
      role: "Parent",
    },
    gallery: [
      '/education1.jpeg',
      '/P1039409.JPG',
      '/EDUCATION.JPG',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
    ],
    faqs: [
      { question: 'What age group does Sanskarshala cater to?', answer: 'Children aged 5 to 16 years (Grades 1 to 10).' },
      { question: 'Are Sanskarshala classes free of cost?', answer: 'Yes, 100% free of charge for all participating children.' },
    ],
    ctaTitle: 'Sponsor a Child’s Sanskarshala Education',
    ctaDescription: 'Just ₹500/month provides learning kits, books, and mentorship for a child.',
  },

  'education/digital-literacy': {
    id: 'digital-literacy',
    categorySlug: 'education',
    categoryName: 'Education & Skills',
    title: 'Digital Literacy & Computer Labs',
    subtitle: 'Bridging the digital divide for rural and slum youth',
    heroImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&fit=crop',
    accentColor: '#7C3AED',
    secondaryColor: '#EDE9FE',
    gradientBg: 'from-[#4C1D95] via-[#7C3AED] to-[#A78BFA]',
    shortDescription: 'Setting up computer labs, teaching basic computing, internet navigation, coding basics, and AI tools.',
    longDescription:
      'In today’s digital age, lack of computer access limits career opportunities for rural youth. Prayas Foundation establishes state-of-the-art Digital Literacy Labs equipped with refurbished computers, high-speed internet, and interactive e-learning software. We train students and youth in operating Windows/Linux, MS Office, typing, internet research, online government services, graphic design, and basic programming.',
    stats: [
      { label: 'Digital Labs Built', value: '28' },
      { label: 'Students Certified', value: '8,200+' },
      { label: 'Computers Deployed', value: '450+' },
      { label: 'Job Placement Rate', value: '68%' },
    ],
    objectives: [
      { title: 'Computer Hardware & OS Basics', desc: 'Familiarizing students with keyboards, mice, operating systems, and file management.' },
      { title: 'Office Productivity Skills', desc: 'Mastering MS Word, Excel spreadsheets, PowerPoint, and email communication.' },
      { title: 'Internet & Cyber Safety', desc: 'Teaching online research, e-banking safety, avoiding fraud, and digital identity.' },
      { title: 'Advanced Vocational Coding', desc: 'Introductions to HTML, CSS, Python, and digital freelancing tools.' },
    ],
    methodology: [
      { step: '01', title: 'Solar Powered Lab Setup', desc: 'Equipping classrooms with PCs, UPS battery backups, and fiber/4G internet.' },
      { step: '02', title: 'Curriculum & Certification', desc: 'Collaborating with certified IT trainers for structured 3-month courses.' },
      { step: '03', title: 'Practical Project Assessment', desc: 'Students build real websites, resumes, and data spreadsheets.' },
      { step: '04', title: 'Career & Internship Drive', desc: 'Connecting top graduates with local businesses, call centers, and data entry roles.' },
    ],
    impactStory: {
      quote: "I learned computers at Prayas lab in my village. Today I work as a digital data associate in a city tech firm.",
      author: "Aakash Verma",
      location: "Ujjain District, MP",
      role: "Digital Lab Graduate",
    },
    gallery: [
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&fit=crop',
      '/EDUCATION.JPG',
      '/education1.jpeg',
    ],
    faqs: [
      { question: 'Can old laptops or desktop computers be donated?', answer: 'Yes! We accept working laptops and PCs to set up new digital centers.' },
    ],
    ctaTitle: 'Donate a Computer or Fund a Lab',
    ctaDescription: 'Empower a rural youth with the digital skills needed for 21st century jobs.',
  },

  'education/career-guidance': {
    id: 'career-guidance',
    categorySlug: 'education',
    categoryName: 'Education & Skills',
    title: 'Career Guidance & Counselling',
    subtitle: 'Unlocking potential and shaping bright professional futures',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&fit=crop',
    accentColor: '#2563EB',
    secondaryColor: '#DBEAFE',
    gradientBg: 'from-[#1E40AF] via-[#2563EB] to-[#60A5FA]',
    shortDescription: 'Aptitude tests, one-on-one mentorship, scholarship assistance, and career workshops for Grade 9-12 students.',
    longDescription:
      'Millions of high school students in rural areas drop out or choose unsuited paths due to lack of awareness about modern careers. Our Career Guidance program organizes psychometric aptitude assessments, interactive seminars by industry professionals, and step-by-step guidance on higher education entrance exams, vocational diplomas, and government scholarships.',
    stats: [
      { label: 'Students Guided', value: '18,000+' },
      { label: 'Workshops Held', value: '120+' },
      { label: 'Scholarships Secured', value: '₹45 Lakhs+' },
      { label: 'Partner Mentors', value: '150+' },
    ],
    objectives: [
      { title: 'Aptitude & Passion Mapping', desc: 'Conducting standard psychometric tests to identify individual strengths.' },
      { title: 'Scholarship Navigation', desc: 'Assisting students in applying for central and state government scholarships.' },
      { title: 'Competitive Exam Prep', desc: 'Providing guidance for ITI, Polytechnic, Nursing, Banking, and Defense exams.' },
      { title: 'Industry Expert Sessions', desc: 'Hosting live Q&A with engineers, doctors, entrepreneurs, and IAS/IPS officers.' },
    ],
    methodology: [
      { step: '01', title: 'School Outreach', desc: 'Partnering with government high schools to conduct career awareness weeks.' },
      { step: '02', title: 'Psychometric Testing', desc: 'Administering offline & online interest inventory assessments.' },
      { step: '03', title: 'One-on-One Counselling', desc: 'Personalized sessions with students and their parents.' },
      { step: '04', title: 'Application Support Cell', desc: 'Free assistance for college admissions and scholarship documentation.' },
    ],
    impactStory: {
      quote: "I thought my education would stop after 12th standard. Prayas counselors helped me win a full scholarship for engineering.",
      author: "Pooja Choudhary",
      location: "Dewas, MP",
      role: "Engineering Student",
    },
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
      '/education1.jpeg',
    ],
    faqs: [
      { question: 'Do you charge students for career counselling?', answer: 'No, all counselling sessions and tests are completely free.' },
    ],
    ctaTitle: 'Become a Career Mentor',
    ctaDescription: 'Share your professional expertise to guide aspiring young minds.',
  },

  'education/self-defence': {
    id: 'self-defence',
    categorySlug: 'education',
    categoryName: 'Education & Skills',
    title: 'Women & Girls Self-Defence Program',
    subtitle: 'Building physical strength, mental grit, and safety awareness',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&fit=crop',
    accentColor: '#DC2626',
    secondaryColor: '#FEE2E2',
    gradientBg: 'from-[#991B1B] via-[#DC2626] to-[#F87171]',
    shortDescription: 'Martial arts training, situational threat assessment, emergency numbers awareness, and legal rights workshops.',
    longDescription:
      'Safety and confidence are prerequisites for female education and freedom. Prayas Foundation provides intense 30-day self-defence workshops led by certified martial arts instructors. Schoolgirls and women learn practical strikes, escape techniques against physical assault, situational awareness, how to use everyday items for self-protection, and legal rights regarding women helpline numbers.',
    stats: [
      { label: 'Girls Trained', value: '15,000+' },
      { label: 'Schools Covered', value: '95+' },
      { label: 'Black Belt Trainers', value: '25+' },
      { label: 'Confidence Score Surge', value: '+92%' },
    ],
    objectives: [
      { title: 'Practical Martial Arts Strikes', desc: 'Mastering high-impact defensive moves, blocks, and release techniques.' },
      { title: 'Threat Awareness & De-escalation', desc: 'Recognizing unsafe environments and neutralizing conflict quickly.' },
      { title: 'Legal & Police Helplines', desc: 'Familiarizing participants with POSHCO, IPC sections, and 112/1090 emergency response.' },
      { title: 'Mental Resilience', desc: 'Overcoming fear and developing decisive self-assurance.' },
    ],
    methodology: [
      { step: '01', title: 'School & College Camps', desc: 'Organizing 15 to 30 day practical physical training bootcamps.' },
      { step: '02', title: 'Simulation & Drill Exercises', desc: 'Simulating real-world scenarios to build muscle memory.' },
      { step: '03', title: 'Legal & Helpline Briefing', desc: 'Interactive sessions with female police officers and legal experts.' },
      { step: '04', title: 'Master Trainer Certification', desc: 'Selecting standout girls to train others in their villages.' },
    ],
    impactStory: {
      quote: "I used to feel scared walking home from evening tuition. After 1 month of Prayas self-defence training, I feel fearless.",
      author: "Neha Sharma",
      location: "Indore",
      role: "High School Student",
    },
    gallery: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
      '/education1.jpeg',
    ],
    faqs: [
      { question: 'Is prior athletic experience required?', answer: 'Not at all. The techniques are designed for girls of all physical builds.' },
    ],
    ctaTitle: 'Sponsor a Girl’s Self-Defence Bootcamp',
    ctaDescription: 'Empower young women with the strength and confidence to stay safe anywhere.',
  },

  'education/youth-leadership': {
    id: 'youth-leadership',
    categorySlug: 'education',
    categoryName: 'Education & Skills',
    title: 'Youth Leadership & Social Innovation',
    subtitle: 'Nurturing the next generation of social entrepreneurs and changemakers',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&fit=crop',
    accentColor: '#D97706',
    secondaryColor: '#FEF3C7',
    gradientBg: 'from-[#92400E] via-[#D97706] to-[#FBBF24]',
    shortDescription: 'Leadership bootcamps, project management, public speaking, and funding support for youth-led social projects.',
    longDescription:
      'Youth possess unmatched energy to transform society. Our Youth Leadership program selects high-potential young men and women from rural and urban communities for a year-long fellowship. Fellows receive intensive training in public speaking, project management, conflict resolution, design thinking, and community mobilization, executing live social impact projects in their own neighborhoods.',
    stats: [
      { label: 'Youth Fellows', value: '450+' },
      { label: 'Projects Executed', value: '180+' },
      { label: 'Community Beneficiaries', value: '35,000+' },
      { label: 'Alumni Network', value: '1,200+' },
    ],
    objectives: [
      { title: 'Project Management & Budgeting', desc: 'Learning how to design, resource, and execute social impact projects.' },
      { title: 'Public Speaking & Advocacy', desc: 'Articulating social challenges convincingly to authorities and donors.' },
      { title: 'Design Thinking & Innovation', desc: 'Creating scalable solutions for local sanitation, education, and waste problems.' },
      { title: 'Mentorship & Networking', desc: 'Pairing fellows with experienced leaders from industry and civil society.' },
    ],
    methodology: [
      { step: '01', title: 'Talent Search Fellowship', desc: 'Competitive selection process identifying passionate grassroots leaders.' },
      { step: '02', title: 'Residential Leadership Camp', desc: '7-day immersive training on leadership principles and team building.' },
      { step: '03', title: 'Field Project Execution', desc: 'Fellows receive seed micro-grants to launch community initiatives.' },
      { step: '04', title: 'Impact Showcase Summit', desc: 'Presenting project outcomes before national panellists and investors.' },
    ],
    impactStory: {
      quote: "The Prayas Youth Fellowship taught me how to turn my concern for plastic waste into a community enterprise employing 12 youth.",
      author: "Siddharth Jaiswal",
      location: "Bhopal",
      role: "Youth Fellow & Social Entrepreneur",
    },
    gallery: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop',
      '/education1.jpeg',
    ],
    faqs: [
      { question: 'Who can apply for the Youth Fellowship?', answer: 'Youth aged 18 to 28 with a passion for community service.' },
    ],
    ctaTitle: 'Sponsor a Youth Fellow',
    ctaDescription: 'Fuel the leadership journey of a promising young changemaker.',
  },

  // ─── WOMEN EMPOWERMENT INITIATIVES ───
  'women-empowerment/sabji-wali-didi': {
    id: 'sabji-wali-didi',
    categorySlug: 'women-empowerment',
    categoryName: 'Women Empowerment',
    title: 'Sabji Wali Didi Program',
    subtitle: 'Empowering female vegetable vendors with micro-credit, digital tools & market dignity',
    heroImage: '/WOMEN.jpeg',
    accentColor: '#15803D',
    secondaryColor: '#DCFCE7',
    gradientBg: 'from-[#14532D] via-[#15803D] to-[#4ADE80]',
    shortDescription: 'Providing zero-interest working capital micro-loans, digital weighing scales, UPI QR codes, and financial training.',
    longDescription:
      'Women vegetable vendors (Sabji Wali Didis) work up to 14 hours a day under harsh conditions, often trapped in debt cycles with high-interest local moneylenders. Prayas Foundation provides zero-interest revolving micro-loans, electronic digital weighing scales, eco-friendly cloth vending carts, UPI digital payment QR codes, and financial literacy training. This doubles their daily margins and gives them economic independence and dignity.',
    stats: [
      { label: 'Vendors Supported', value: '2,400+' },
      { label: 'Micro-Loans Disbursed', value: '₹1.8 Cr+' },
      { label: 'Income Increase', value: '+115%' },
      { label: 'Repayment Rate', value: '99.2%' },
    ],
    objectives: [
      { title: 'Zero-Interest Micro-Loans', desc: 'Freeing vendors from high-interest moneylenders with affordable working capital.' },
      { title: 'Digital & Financial Inclusion', desc: 'Providing electronic scales, UPI QR stands, and bank savings accounts.' },
      { title: 'Direct Wholesale Supply Linkages', desc: 'Connecting vendors directly to Mandi wholesalers to lower procurement costs.' },
      { title: 'Health & Safety Support', desc: 'Distributing sun-protection umbrellas, ergonomic carts, and health insurance.' },
    ],
    methodology: [
      { step: '01', title: 'Vendor Identification', desc: 'Mapping daily vegetable markets to identify vulnerable female vendors.' },
      { step: '02', title: 'Financial Literacy Workshop', desc: 'Teaching profit calculation, digital payments, and micro-savings.' },
      { step: '03', title: 'Equipment & Loan Disbursal', desc: 'Providing digital scales, umbrellas, and direct bank transfer working capital.' },
      { step: '04', title: 'Market Self-Help Collective', desc: 'Forming vendor collectives to negotiate wholesale rates.' },
    ],
    impactStory: {
      quote: "I used to pay ₹100 daily interest to moneylenders. With Prayas zero-interest micro-loan and QR code, I cleared all debt and now save ₹400 daily.",
      author: "Kalyani Didi",
      location: "Indore Mandi",
      role: "Vegetable Vendor",
    },
    gallery: [
      '/WOMEN.jpeg',
      'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
    ],
    faqs: [
      { question: 'What is the loan size provided?', answer: 'Initial working capital ranges from ₹5,000 to ₹15,000 per vendor.' },
    ],
    ctaTitle: 'Sponsor a Sabji Wali Didi Kit',
    ctaDescription: '₹3,500 provides a digital scale, umbrella, and micro-working capital loan to a vendor.',
  },

  'women-empowerment/sewing-centres': {
    id: 'sewing-centres',
    categorySlug: 'women-empowerment',
    categoryName: 'Women Empowerment',
    title: 'Vocational Sewing & Tailoring Centers',
    subtitle: 'Stitching paths to economic independence and entrepreneurship',
    heroImage: 'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=1200&fit=crop',
    accentColor: '#E11D48',
    secondaryColor: '#FFE4E6',
    gradientBg: 'from-[#9F1239] via-[#E11D48] to-[#FB7185]',
    shortDescription: '6-month intensive tailoring, garment design, embroidery, and boutique business training with free sewing machine support.',
    longDescription:
      'Garment production offers sustainable self-employment for women in rural and semi-urban regions. Prayas Foundation operates full-fledged Vocational Sewing Centers equipped with modern electric and manual sewing machines, motorized overlockers, and cutting tables. Our 6-month certified course teaches pattern drafting, stitching, embroidery, fashion design, and business accounting, empowering women to run home boutiques or fulfill bulk uniform orders.',
    stats: [
      { label: 'Sewing Centers', value: '42' },
      { label: 'Women Graduated', value: '6,500+' },
      { label: 'Machines Distributed', value: '1,800+' },
      { label: 'Average Monthly Income', value: '₹8,500+' },
    ],
    objectives: [
      { title: 'Mastering Garment Construction', desc: 'From basic mending to stitching traditional wear, school uniforms, and modern attire.' },
      { title: 'Embroidery & Handwork', desc: 'Preserving and monetizing traditional handicraft stitching.' },
      { title: 'Commercial Bulk Orders', desc: 'Linking centers to schools and corporate clients for uniform manufacturing.' },
      { title: 'Free Machine Distribution', desc: 'Gifting top graduates sewing machines to launch home enterprises immediately.' },
    ],
    methodology: [
      { step: '01', title: 'Center Setup in Villages', desc: 'Securing accessible spaces with 10-15 machines and master instructors.' },
      { step: '02', title: 'Structured 6-Month Course', desc: 'Daily 2-hour practical stitching classes and theory sessions.' },
      { step: '03', title: 'Quality & Production Testing', desc: 'Graduates stitch real orders for local schools and NGOs.' },
      { step: '04', title: 'Boutique & Enterprise Launch', desc: 'Helping alumni register micro-businesses and obtain bank credit.' },
    ],
    impactStory: {
      quote: "After finishing the 6-month course at Prayas Sewing Center, I got a contract to stitch 300 school uniforms. I bought my second machine and hired two neighbors!",
      author: "Shanti Solanki",
      location: "Dhar District, MP",
      role: "Boutique Owner & Master Trainer",
    },
    gallery: [
      'https://images.unsplash.com/photo-1581090464777-f3220bbe2b8b?w=800&h=500&fit=crop',
      '/WOMEN.jpeg',
    ],
    faqs: [
      { question: 'Do participants receive a certificate?', answer: 'Yes, all successful graduates receive a government-recognized vocational certificate.' },
    ],
    ctaTitle: 'Gift a Sewing Machine to a Graduate',
    ctaDescription: '₹6,000 gifts a brand-new sewing machine that provides lifelong income.',
  },

  'women-empowerment/shgs': {
    id: 'shgs',
    categorySlug: 'women-empowerment',
    categoryName: 'Women Empowerment',
    title: 'Self-Help Groups (SHG) Federation',
    subtitle: 'Mobilizing collective financial strength and social leadership',
    heroImage: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&fit=crop',
    accentColor: '#9333EA',
    secondaryColor: '#F3E8FF',
    gradientBg: 'from-[#581C87] via-[#9333EA] to-[#C084FC]',
    shortDescription: 'Forming, training, and federating women self-help groups for thrift savings, bank linkage, and collective decision making.',
    longDescription:
      'Self-Help Groups (SHGs) are the engine of grassroots women empowerment. Prayas Foundation mobilizes groups of 10-20 rural women into cohesive SHGs, teaching them systematic weekly savings, book-keeping, inter-lending, and banking protocols. We link SHGs to NABARD and public banks for low-interest credit while utilizing group meetings to tackle local social issues like domestic violence, girl child education, and sanitation.',
    stats: [
      { label: 'SHGs Formed', value: '550+' },
      { label: 'Women Members', value: '7,800+' },
      { label: 'Collective Savings', value: '₹3.2 Cr+' },
      { label: 'Bank Credit Linked', value: '₹6.5 Cr+' },
    ],
    objectives: [
      { title: 'Systematic Micro-Savings', desc: 'Promoting weekly savings habits and transparent ledger maintenance.' },
      { title: 'Bank Linkage & Credit', desc: 'Facilitating low-interest bank loans for group business ventures.' },
      { title: 'Social Advocacy', desc: 'Addressing community issues like alcoholism, child marriage, and health.' },
      { title: 'Leadership Rotation', desc: 'Rotating President and Treasurer roles to build leadership among all members.' },
    ],
    methodology: [
      { step: '01', title: 'Neighborhood Mobilization', desc: 'Gathering women to explain SHG benefits and principles.' },
      { step: '02', title: 'Group Formation & By-Laws', desc: 'Drafting group rules, monthly saving targets, and opening bank accounts.' },
      { step: '03', title: 'Book-keeping Training', desc: 'Training SHG secretaries in maintaining passbooks and meeting minutes.' },
      { step: '04', title: 'Bank Credit Rating', desc: 'Achieving high bank credit ratings to access major government loan schemes.' },
    ],
    impactStory: {
      quote: "Our SHG saved ₹500 every month. Last year we took a bank loan together to buy a tractor for community farming.",
      author: "Kamla Patel",
      location: "Khargone, MP",
      role: "SHG President",
    },
    gallery: [
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop',
      '/WOMEN.jpeg',
    ],
    faqs: [
      { question: 'What is the typical size of an SHG?', answer: 'Each group consists of 10 to 20 women from the same neighborhood.' },
    ],
    ctaTitle: 'Support an SHG Enterprise',
    ctaDescription: 'Help us provide seed capital for collective women-owned businesses.',
  },

  'women-empowerment/entrepreneurship': {
    id: 'entrepreneurship',
    categorySlug: 'women-empowerment',
    categoryName: 'Women Empowerment',
    title: 'Women Entrepreneurship & Business Incubation',
    subtitle: 'Nurturing women leaders to build, scale, and manage enterprises',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&fit=crop',
    accentColor: '#C026D3',
    secondaryColor: '#FAE8FF',
    gradientBg: 'from-[#701A75] via-[#C026D3] to-[#E879F9]',
    shortDescription: 'Incubation, business plan mentoring, seed grants, branding, and market access for women entrepreneurs.',
    longDescription:
      'Women possess incredible entrepreneurial potential but face hurdles in seed capital, branding, and market distribution. Our Women Entrepreneurship Incubator provides seed grants, business plan development, legal registration support (MSME/GST/FSSAI), branding & packaging assistance, and direct linkages to e-commerce and urban exhibitions.',
    stats: [
      { label: 'Entrepreneurs Incubated', value: '380+' },
      { label: 'Seed Grants Awarded', value: '₹75 Lakhs+' },
      { label: 'Jobs Created by Women', value: '1,400+' },
      { label: 'Business Survival Rate', value: '91%' },
    ],
    objectives: [
      { title: 'Business Plan Coaching', desc: 'Assisting women in market research, pricing, and revenue forecasting.' },
      { title: 'Regulatory Compliance', desc: 'Obtaining FSSAI food safety licenses, MSME Udyam certificates, and GST.' },
      { title: 'Branding & Packaging', desc: 'Designing high-quality logos, eco-friendly packaging, and product labels.' },
      { title: 'E-commerce & Retail Linkages', desc: 'Listing products on Amazon, ONDC, and local retail stores.' },
    ],
    methodology: [
      { step: '01', title: 'Business Idea Pitching', desc: 'Selecting innovative women-led business ideas through pitch contests.' },
      { step: '02', title: 'Bootcamp & Seed Grant', desc: '3-week intensive business management training followed by initial seed funding.' },
      { step: '03', title: 'Prototyping & Packaging', desc: 'Refining product quality, food testing, and professional packaging.' },
      { step: '04', title: 'Market Acceleration', desc: 'Connecting founders with bulk buyers, corporate gifting contracts, and expos.' },
    ],
    impactStory: {
      quote: "Prayas helped me transform my home spice grinding into an FSSAI certified brand. Now my spices are sold in 40 retail stores!",
      author: "Rekha Rathore",
      location: "Indore",
      role: "Founder, Griha Udyog Spices",
    },
    gallery: [
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop',
      '/WOMEN.jpeg',
    ],
    faqs: [
      { question: 'What businesses do women start?', answer: 'Food processing, eco-friendly handicrafts, beauty salons, textiles, and organic farming.' },
    ],
    ctaTitle: 'Fund a Woman-Led Micro-Enterprise',
    ctaDescription: '₹15,000 seed grant launch a woman’s dream business into reality.',
  },

  'women-empowerment/grah-udyog': {
    id: 'grah-udyog',
    categorySlug: 'women-empowerment',
    categoryName: 'Women Empowerment',
    title: 'Grah Udyog - Home-Based Cottage Industries',
    subtitle: 'Flexible home income generation through traditional food & crafts',
    heroImage: '/WOMEN.jpeg',
    accentColor: '#EA580C',
    secondaryColor: '#FFEDD5',
    gradientBg: 'from-[#9A3412] via-[#EA580C] to-[#FB923C]',
    shortDescription: 'Papad making, pickle processing, incense sticks (agarbatti), and handicraft units designed for work-from-home women.',
    longDescription:
      'Many rural women cannot leave their young children or household chores to work outside. Grah Udyog creates flexible, home-based cottage industry micro-clusters. We provide raw materials, specialized processing machinery (like papad rollers and incense makers), quality control standards, and guaranteed buy-back of finished goods, ensuring steady home earnings without compromising family responsibilities.',
    stats: [
      { label: 'Active Micro-Clusters', value: '35' },
      { label: 'Home Workers', value: '1,950+' },
      { label: 'Products Manufactured', value: '15+ Types' },
      { label: 'Monthly Earnings Surge', value: '₹4,500 - ₹9,000' },
    ],
    objectives: [
      { title: 'Work-from-Home Flexibility', desc: 'Enabling women to generate income on their own flexible daily schedules.' },
      { title: 'Raw Material Provision', desc: 'Delivering top-grade pulses, spices, and bamboo sticks to home workers.' },
      { title: 'Guaranteed Buy-Back Scheme', desc: 'Prayas purchases 100% of quality-checked goods at fair trade prices.' },
      { title: 'Centralized Packaging & Sales', desc: 'Processing, packaging, and marketing under unified brand labels.' },
    ],
    methodology: [
      { step: '01', title: 'Cluster Mapping', desc: 'Grouping 20-30 women per village into product-specific manufacturing cells.' },
      { step: '02', title: 'Machinery & Recipe Training', desc: 'Distributing hygienic processing tools and standardized recipes.' },
      { step: '03', title: 'Doorstep Collection', desc: 'Weekly collection of finished goods and immediate cash/bank payout.' },
      { step: '04', title: 'Mass Retail Distribution', desc: 'Selling products through super-markets, festivals, and CSR stalls.' },
    ],
    impactStory: {
      quote: "I make papad at home while taking care of my elderly mother-in-law. This home income paid for my children's school fees.",
      author: "Sunita Yadav",
      location: "Dhar, MP",
      role: "Grah Udyog Artisan",
    },
    gallery: [
      '/WOMEN.jpeg',
    ],
    faqs: [
      { question: 'Is prior experience needed?', answer: 'No, we provide complete hands-on training for all recipes and tools.' },
    ],
    ctaTitle: 'Support Home Cottage Workers',
    ctaDescription: 'Help us supply raw material kits to rural mothers working from home.',
  },

  // ─── HEALTHCARE INITIATIVES ───
  'healthcare/organ-donation': {
    id: 'organ-donation',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Organ Donation Awareness & Pledge Drive',
    subtitle: 'Transforming grief into life-saving hope through organ pledges',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&fit=crop',
    accentColor: '#0D9488',
    secondaryColor: '#CCFBF1',
    gradientBg: 'from-[#115E59] via-[#0D9488] to-[#2DD4BF]',
    shortDescription: 'Public awareness campaigns, organ donor pledge registrations, hospital transplant linkages, and family counseling.',
    longDescription:
      'Thousands of lives are lost every year in India due to organ failure, despite the possibility of life-saving transplants. Prayas Foundation conducts massive organ donation awareness drives, dispelling myths and religious misconceptions around organ pledge. We partner with SOTO/NOTTO government bodies, hospitals, and medical colleges to issue donor pledge cards and maintain a 24/7 hotline for donor family counseling.',
    stats: [
      { label: 'Organ Pledges Collected', value: '14,200+' },
      { label: 'Awareness Camps', value: '180+' },
      { label: 'Successful Transplants Facilitated', value: '48' },
      { label: 'Hospital Partners', value: '25+' },
    ],
    objectives: [
      { title: 'Dispelling Myths & Stigma', desc: 'Educating citizens through doctor talks, street plays, and digital campaigns.' },
      { title: 'Digital Pledge Registration', desc: 'Simplifying donor card enrollment via NOTTO official registry.' },
      { title: 'Family Grief Counseling', desc: 'Providing sensitive guidance to families during brain-dead declarations in ICUs.' },
      { title: 'Green Corridor Coordination', desc: 'Collaborating with traffic police and hospitals for rapid organ transport.' },
    ],
    methodology: [
      { step: '01', title: 'College & Corporate Drives', desc: 'Hosting organ donation registration kiosks across institutions.' },
      { step: '02', title: 'Medical & Legal Briefings', desc: 'Explaining brain death criteria and legal donor consent laws clearly.' },
      { step: '03', title: 'Pledge Card Issuance', desc: 'Issuing official donor cards and sending automated notifications to family members.' },
      { step: '04', title: 'Hospital Emergency Helpline', desc: 'Deploying trained counselors to assist hospitals upon donor availability.' },
    ],
    impactStory: {
      quote: "When my brother suffered a brain hemorrhage, Prayas counselors guided us to pledge his organs. Knowing his heart beat saves someone else gives us solace.",
      author: "Dr. Ananya Joshi",
      location: "Indore",
      role: "Donor Sister",
    },
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
      '/PRAYASHEALTHCAMP.jpeg',
      '/healthcaret.jpg',
    ],
    faqs: [
      { question: 'Who can pledge their organs?', answer: 'Anyone above 18 years of age regardless of background or medical history.' },
    ],
    ctaTitle: 'Pledge Your Organs Today',
    ctaDescription: 'One donor can save up to 8 lives and enhance 50 more.',
  },

  'healthcare/health-camps': {
    id: 'health-camps',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Free Rural Health & Multi-Specialty Camps',
    subtitle: 'Bringing specialist doctors and free medicines to remote doorsteps',
    heroImage: '/PRAYASHEALTHCAMP.jpeg',
    accentColor: '#0284C7',
    secondaryColor: '#E0F2FE',
    gradientBg: 'from-[#0369A1] via-[#0284C7] to-[#38BDF8]',
    shortDescription: 'Free multi-specialty health camps, eye surgeries, blood tests, dental care, and medicine distribution.',
    longDescription:
      'For villagers in remote regions, visiting a city hospital costs days of wages and travel expenses. Prayas Foundation organizes mega multi-specialty medical camps in rural areas. Our mobile medical vans transport volunteer cardiologists, gynecologists, pediatricians, ophthalmologists, and dentists directly to villages. Patients receive free diagnostic tests, prescription drugs, reading glasses, and referrals for free hospital surgeries.',
    stats: [
      { label: 'Medical Camps Held', value: '320+' },
      { label: 'Patients Treated', value: '85,000+' },
      { label: 'Free Cataract Surgeries', value: '1,450+' },
      { label: 'Medicines Distributed', value: '₹60 Lakhs+' },
    ],
    objectives: [
      { title: 'Multi-Specialty Consultation', desc: 'Free access to general physicians, eye surgeons, gynecologists, and pediatricians.' },
      { title: 'Free Diagnostic Blood Tests', desc: 'On-spot blood sugar, hemoglobin, BP, ECG, and eye vision checks.' },
      { title: 'Free Pharmacy Distribution', desc: 'Providing complete course prescription medicines at zero cost.' },
      { title: 'Surgical Referral & Coverage', desc: 'Sponsoring hospital surgeries for critical cardiac, eye, and orthopedic cases.' },
    ],
    methodology: [
      { step: '01', title: 'Village Survey & Screening', desc: 'Mapping health needs and distributing patient tokens 1 week prior.' },
      { step: '02', title: 'Camp Setup & Mobile Diagnostic', desc: 'Setting up registration desks, doctor chambers, lab units, and pharmacy stalls.' },
      { step: '03', title: 'Examination & Medicine Dispensing', desc: 'Doctors examine patients and dispense free full-course medications.' },
      { step: '04', title: 'Surgical Follow-up Drive', desc: 'Transporting surgery candidates to partner hospitals for free operations.' },
    ],
    impactStory: {
      quote: "I could barely see for two years due to cataract. Prayas health camp tested my eyes and got my surgery done for free. Now I can see my grandchildren clearly!",
      author: "Babulal Ji",
      location: "Sanwer Village",
      role: "Health Camp Patient",
    },
    gallery: [
      '/PRAYASHEALTHCAMP.jpeg',
      '/healthcaret.jpg',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    ],
    faqs: [
      { question: 'How often are medical camps conducted?', answer: 'We conduct 3 to 4 health camps every month in different underserved districts.' },
    ],
    ctaTitle: 'Sponsor a Medical Camp',
    ctaDescription: '₹25,000 funds a complete health camp serving 300+ rural villagers.',
  },

  'healthcare/elderly-care': {
    id: 'elderly-care',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Senior Citizen Support & Elderly Care',
    subtitle: 'Ensuring health, dignity, and companionship for our senior elders',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&fit=crop',
    accentColor: '#475569',
    secondaryColor: '#F1F5F9',
    gradientBg: 'from-[#1E293B] via-[#475569] to-[#94A3B8]',
    shortDescription: 'Monthly health checkups, chronic disease medicine distribution, pension assistance, and emotional companionship.',
    longDescription:
      'Isolated senior citizens in rural and urban slums often suffer from unmanaged chronic illnesses, loneliness, and financial destitution. Our Elderly Care initiative provides doorstep doctor visits, free monthly supplies of hypertension/diabetes medicines, assistance in claiming government old-age pensions, distribution of walking sticks and hearing aids, and volunteer companionship to restore happiness and self-respect.',
    stats: [
      { label: 'Elders Supported', value: '3,800+' },
      { label: 'Monthly Medicine Kits', value: '25,000+' },
      { label: 'Pensions Claimed', value: '1,200+' },
      { label: 'Mobility Aids Gifting', value: '850+' },
    ],
    objectives: [
      { title: 'Doorstep Chronic Disease Care', desc: 'Regular delivery of monthly BP, diabetes, and heart medications.' },
      { title: 'Mobility & Hearing Aids', desc: 'Free distribution of walking sticks, wheelchairs, quad-canes, and hearing devices.' },
      { title: 'Old Age Pension Assistance', desc: 'Filling forms and clearing bureaucratic roadblocks for government pensions.' },
      { title: 'Companionship & Social Clubs', desc: 'Organizing weekly senior recreational meets, bhajan sessions, and picnics.' },
    ],
    methodology: [
      { step: '01', title: 'Senior Citizen Registry', desc: 'Cataloging destitute elderly individuals needing urgent medical and financial care.' },
      { step: '02', title: 'Doctor Home Visits', desc: 'Monthly medical checkups conducted by visiting physicians.' },
      { step: '03', title: 'Medicine Delivery', desc: 'Distributing pre-packed 30-day medicine boxes every month.' },
      { step: '04', title: 'Pension & Legal Aid', desc: 'Helping elders access senior rights, wills, and state financial support.' },
    ],
    impactStory: {
      quote: "My children moved away and I had no money for my diabetes medicine. Prayas volunteers deliver my medicines every single month and visit me to talk.",
      author: "Ramcharan Ji (74 yrs)",
      location: "Indore",
      role: "Elderly Care Beneficiary",
    },
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
      '/healthcaret.jpg',
    ],
    faqs: [
      { question: 'How can I sponsor an elder person?', answer: '₹1,000/month covers complete medical supplies, food, and care for one senior citizen.' },
    ],
    ctaTitle: 'Adopt a Senior Citizen',
    ctaDescription: 'Provide monthly medicines, food, and dignity to a lonely elder.',
  },

  'healthcare/disability-support': {
    id: 'disability-support',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Support for Persons with Disabilities (Divyangjan)',
    subtitle: 'Fostering inclusion, mobility, assistive technology & equal rights',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&fit=crop',
    accentColor: '#0891B2',
    secondaryColor: '#CFFAFE',
    gradientBg: 'from-[#155E75] via-[#0891B2] to-[#22D3EE]',
    shortDescription: 'Free distribution of wheelchairs, tricycles, prosthetic limbs, hearing aids, barrier-free ramps, and adaptive skill training.',
    longDescription:
      'Persons with disabilities (Divyangjan) face severe barriers to education, jobs, and physical movement. Prayas Foundation runs comprehensive rehabilitation programs providing custom motorized tricycles, wheelchairs, prosthetic limbs, digital hearing aids, Braille kits, barrier-free school ramps, and specialized job skill training.',
    stats: [
      { label: 'Assistive Devices Gifted', value: '2,600+' },
      { label: 'Tricycles & Wheelchairs', value: '980+' },
      { label: 'Prosthetic Limbs Fitted', value: '340+' },
      { label: 'Disabled Youth Employed', value: '420+' },
    ],
    objectives: [
      { title: 'Custom Assistive Devices', desc: 'Gifting motorized tricycles, wheelchairs, crutches, and hearing aids.' },
      { title: 'Prosthetic Limb Alignment', desc: 'Camp-based custom measuring and fitting of Jaipur Foot prosthetics.' },
      { title: 'Accessible Ramp Building', desc: 'Constructing wheelchair ramps in schools, Panchayats, and public parks.' },
      { title: 'Vocational Skill Placement', desc: 'Computer, tele-calling, and handicraft training tailored for Divyangjan.' },
    ],
    methodology: [
      { step: '01', title: 'Measurement Camps', desc: 'Specialist doctors measure limb, hearing, and vision specs.' },
      { step: '02', title: 'Device Procurement & Testing', desc: 'Procuring heavy-duty, ISO-certified assistive equipment.' },
      { step: '03', title: 'Distribution & Training Fest', desc: 'Hosting public distribution events and training recipients on device usage.' },
      { step: '04', title: 'Job & Enterprise Linkages', desc: 'Placing skilled recipients in inclusive workplaces.' },
    ],
    impactStory: {
      quote: "I used to crawl to school on my hands. The motorized tricycle from Prayas changed my life — I completed my graduation and now work at a bank!",
      author: "Deepak Solanki",
      location: "Ujjain",
      role: "Bank Employee & Divyang Advocate",
    },
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    ],
    faqs: [
      { question: 'Are these devices given free of charge?', answer: 'Yes, 100% free for verified low-income individuals.' },
    ],
    ctaTitle: 'Gift a Wheelchair or Motorized Tricycle',
    ctaDescription: '₹8,500 gifts a heavy-duty wheelchair or assistive device.',
  },

  'healthcare/child-welfare': {
    id: 'child-welfare',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Child Welfare & Nutrition Drive',
    subtitle: 'Protecting rights, eradicating malnutrition & safeguarding childhood',
    heroImage: '/CHILDRENGROUP.jpg',
    accentColor: '#EA580C',
    secondaryColor: '#FFEDD5',
    gradientBg: 'from-[#9A3412] via-[#EA580C] to-[#FB923C]',
    shortDescription: 'Supplementary nutrition for SAM/MAM children, immunization drives, anti-child labor rescue, and shelter care.',
    longDescription:
      'Childhood malnutrition and exploitation stunt the future of our nation. Prayas Foundation operates intensive Child Welfare initiatives focusing on identifying Severely Acute Malnourished (SAM) children, providing therapeutic nutrition kits (RUTF, protein porridge), organizing pediatric health checkups, facilitating government immunization, and rescuing children from forced labor.',
    stats: [
      { label: 'Children Nourished', value: '14,000+' },
      { label: 'SAM Kids Recovered', value: '1,850+' },
      { label: 'Immunization Drives', value: '110+' },
      { label: 'Rescued from Labor', value: '320+' },
    ],
    objectives: [
      { title: 'Malnutrition Eradication', desc: 'Providing daily protein supplements, iron syrups, and energy meals.' },
      { title: 'Pediatric Health Camps', desc: 'Regular growth monitoring (height/weight MUAC tape checks) by pediatricians.' },
      { title: 'Child Protection & Anti-Labor', desc: 'Rescuing children from hazardous workplaces and enrolling them in schools.' },
      { title: 'Safe Shelter & Care', desc: 'Supporting shelter homes with clothing, books, and psychological care.' },
    ],
    methodology: [
      { step: '01', title: 'Anganwadi Screening', desc: 'Measuring MUAC circumferences and weight charts of toddlers.' },
      { step: '02', title: 'Therapeutic Food Distribution', desc: 'Supplying 90-day nutrient-dense food packs to mothers.' },
      { step: '03', title: 'Pediatric Medical Follow-Up', desc: 'Bi-weekly doctor checks to monitor weight gain milestones.' },
      { step: '04', title: 'School Integration', desc: 'Ensuring recovered children are enrolled in formal schools.' },
    ],
    impactStory: {
      quote: "My 2-year-old daughter was underweight and falling ill constantly. The 3-month nutrition program from Prayas restored her health and radiant smile.",
      author: "Pinky Yadav",
      location: "Slum Settlement, Indore",
      role: "Mother",
    },
    gallery: [
      '/CHILDRENGROUP.jpg',
      '/P1039409.JPG',
    ],
    faqs: [
      { question: 'What does a child nutrition kit contain?', answer: 'Protein powders, fortified peanut paste, multi-vitamins, iron supplements, and jaggery-peanut chikki.' },
    ],
    ctaTitle: 'Feed & Save a Malnourished Child',
    ctaDescription: '₹1,200 provides a 3-month therapeutic nutrition kit for a child in need.',
  },

  'healthcare/community-welfare': {
    id: 'community-welfare',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Community Welfare & Crisis Relief',
    subtitle: 'Rapid response kitchens, mental wellness & social safety nets',
    heroImage: '/PRAYASHEALTHCAMP.jpeg',
    accentColor: '#16A34A',
    secondaryColor: '#DCFCE7',
    gradientBg: 'from-[#14532D] via-[#16A34A] to-[#4ADE80]',
    shortDescription: 'Community emergency kitchens, mental health counseling, legal aid desks, and crisis relief supplies.',
    longDescription:
      'Unforeseen crises like local floods, fires, or economic shocks push vulnerable families into destitution. Prayas Foundation runs Community Welfare hubs providing emergency hot meal kitchens, mental wellness tele-counseling, legal literacy aid for women, and distribution of dry ration kits during emergencies.',
    stats: [
      { label: 'Meals Served in Crises', value: '250,000+' },
      { label: 'Ration Kits Distributed', value: '18,500+' },
      { label: 'Counseling Sessions', value: '3,200+' },
      { label: 'Families Assisted', value: '12,000+' },
    ],
    objectives: [
      { title: 'Emergency Meal Kitchens', desc: 'Deploying mobile kitchens during natural disasters and seasonal hardships.' },
      { title: 'Mental Health & Counseling', desc: 'Free confidential counseling for anxiety, depression, and trauma.' },
      { title: 'Legal Aid Desks', desc: 'Assisting victims of domestic abuse and property fraud with pro-bono lawyers.' },
      { title: 'Winter Blanket Drives', desc: 'Distributing warm blankets and coats to homeless individuals.' },
    ],
    methodology: [
      { step: '01', title: 'Crisis Control Desk', desc: '24/7 hotline receiving distress alerts from ground teams.' },
      { step: '02', title: 'Relief Procurement & Cooking', desc: 'Preparing thousands of hygienic meals and relief boxes daily.' },
      { step: '03', title: 'Doorstep Ground Distribution', desc: 'Volunteers deliver ration kits directly to affected families.' },
      { step: '04', title: 'Rehabilitation & Recovery', desc: 'Helping families rebuild livelihoods after crisis resolution.' },
    ],
    impactStory: {
      quote: "When the winter flood hit our slum, Prayas volunteers came at 1 AM with hot food, dry blankets, and medicines. They saved us.",
      author: "Salma Begum",
      location: "Riverbank Basti",
      role: "Resident",
    },
    gallery: [
      '/PRAYASHEALTHCAMP.jpeg',
    ],
    faqs: [
      { question: 'How quickly do relief teams deploy?', answer: 'Our emergency teams deploy within 4 hours of any local disaster call.' },
    ],
    ctaTitle: 'Support Community Relief Funds',
    ctaDescription: 'Help us maintain emergency food stocks and medicine reserves.',
  },

  // ─── ENVIRONMENT INITIATIVES ───
  'environment/plantation': {
    id: 'plantation',
    categorySlug: 'environment',
    categoryName: 'Environment & Sustainability',
    title: 'Massive Tree Plantation & Afforestation Drive',
    subtitle: 'Restoring green cover, combating climate change & nurturing biodiversity',
    heroImage: '/TREEGROW.jpg',
    accentColor: '#15803D',
    secondaryColor: '#DCFCE7',
    gradientBg: 'from-[#14532D] via-[#15803D] to-[#4ADE80]',
    shortDescription: 'Planting 50,000+ native saplings, Miyawaki dense urban forests, tree adoption drives, and agro-forestry.',
    longDescription:
      'Deforestation and rising urban temperatures threaten our ecological balance. Prayas Foundation leads massive afforestation drives, planting indigenous species like Neem, Peepal, Banyan, Amla, and Jamun. Utilizing the Miyawaki dense forest method, we turn degraded lands and school grounds into thriving mini-forests. Every sapling is geotagged and nurtured by tree guardians for 3 years to ensure over 92% survival rate.',
    stats: [
      { label: 'Trees Planted', value: '50,000+' },
      { label: 'Survival Rate', value: '92.4%' },
      { label: 'Miyawaki Forests Created', value: '14' },
      { label: 'CO2 Offset / Year', value: '1,200 Tons' },
    ],
    objectives: [
      { title: 'Native Species Afforestation', desc: 'Planting indigenous trees that support local bird, insect, and soil ecosystems.' },
      { title: 'Miyawaki Ultra-Dense Forests', desc: 'Growing forests 10x faster and 30x denser in urban and semi-urban pockets.' },
      { title: 'Geotagged Tree Adoption', desc: 'Enabling donors to track their planted tree’s growth via mobile GPS updates.' },
      { title: 'Farmer Agro-Forestry', desc: 'Providing fruit-bearing trees to farmers to boost agricultural income.' },
    ],
    methodology: [
      { step: '01', title: 'Soil & Water Testing', desc: 'Testing land nutrients to select appropriate native tree species.' },
      { step: '02', title: 'Pitting & Organic Compost', desc: 'Preparing pits with coco-peat, vermicompost, and bio-fertilizers.' },
      { step: '03', title: 'Community Tree Guardians', desc: 'Appointing local youth and school students to water and protect saplings.' },
      { step: '04', title: 'Quarterly GPS Monitoring', desc: 'Capturing height and health metrics of every planted tree.' },
    ],
    impactStory: {
      quote: "We planted 2,000 trees on our barren school hill 3 years ago. Today it is a lush green forest where birds nest and temperatures feel 4 degrees cooler!",
      author: "Principal S. K. Verma",
      location: "Govt School Campus",
      role: "School Administrator",
    },
    gallery: [
      '/TREEGROW.jpg',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
    ],
    faqs: [
      { question: 'What is the cost of planting and maintaining a tree?', answer: '₹250 per sapling covers planting, tree guard protection, watering, and 3-year care.' },
    ],
    ctaTitle: 'Plant a Tree in Memory or Honor',
    ctaDescription: 'Plant geotagged native trees today and track their green growth online.',
  },

  'environment/kargil-vatika': {
    id: 'kargil-vatika',
    categorySlug: 'environment',
    categoryName: 'Environment & Sustainability',
    title: 'A Green Tribute to the Heroes on Kargil Vijay Diwas 🇮🇳🌱',
    subtitle: '5,270 Trees Planted in Memory of 527 Brave Martyrs',
    heroImage: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1200&fit=crop',
    accentColor: '#15803D',
    secondaryColor: '#DCFCE7',
    gradientBg: 'from-[#14532D] via-[#15803D] to-[#86EFAC]',
    shortDescription: 'On Kargil Vijay Diwas, Prayas Samaj Sevi Sanstha with Indore Municipal Corporation planted 5,270 trees at Chhota Bilawali Talab, Indore — 10 trees dedicated to each of the 527 brave martyrs.',
    longDescription:
      'On the solemn occasion of Kargil Vijay Diwas, Prayas Samaj Sevi Sanstha, in collaboration with the Indore Municipal Corporation, organized a meaningful tree plantation drive at Chhota Bilawali Talab, Indore, as a tribute to the brave soldiers who made the supreme sacrifice for our nation. As part of this initiative, 5,270 trees were planted in memory of 527 brave martyrs — 10 trees dedicated to each martyr. This initiative was more than just a plantation drive. It was a heartfelt Green Tribute to the courage, sacrifice, and patriotism of our soldiers. Through every tree planted, we aim to keep the memory of our heroes alive while creating a greener and healthier environment for future generations. The event was graced by the presence of Shri Pushyamitra Bhargava Ji, Mayor of Indore; Smt. Madhu Verma Ji, MLA, Rau; and Shri Rajendra Rathore Ji, MIC Member, Indore Municipal Corporation, along with citizens and supporters who came together to honour our nation\'s heroes.',
    videoUrl: 'https://youtu.be/2xQGt3tTGDI?si=bgL4YicocapUktKN',
    videoTitle: 'A Green Tribute to the Heroes on Kargil Vijay Diwas 🇮🇳🌱',
    stats: [
      { label: 'Brave Martyrs Honoured', value: '527' },
      { label: 'Trees Planted', value: '5,270' },
      { label: 'Trees Dedicated / Martyr', value: '10' },
      { label: 'Green Tribute Location', value: 'Bilawali Talab' },
    ],
    objectives: [
      { title: '10 Trees Dedicated per Martyr', desc: 'Planting and nurturing 10 individual named trees for each of the 527 Kargil bravehearts.' },
      { title: 'Civic & Leadership Support', desc: 'Organized with Indore Municipal Corporation, Mayor Shri Pushyamitra Bhargava Ji, and MLA Smt. Madhu Verma Ji.' },
      { title: 'Chhota Bilawali Talab Reforestation', desc: 'Transforming lakefront areas into a lush green memorial forest zone in Indore.' },
      { title: 'Patriotic Eco-Citizenship', desc: 'Inspiring citizens to remember our heroes while protecting nature for future generations.' },
    ],
    methodology: [
      { step: '01', title: '527 Martyrs Tribute Mapping', desc: 'Allocating 10 saplings per martyr across designated green blocks.' },
      { step: '02', title: 'Indore Municipal Collaboration', desc: 'Joint execution with Shri Pushyamitra Bhargava Ji (Mayor) and Smt. Madhu Verma Ji (MLA).' },
      { step: '03', title: 'Bilawali Lakefront Planting', desc: 'Planting resilient native trees around Chhota Bilawali Talab.' },
      { step: '04', title: 'Long-Term Green Care', desc: 'Ensuring daily irrigation and nurturing so every tree grows as a permanent living tribute.' },
    ],
    impactStory: {
      quote: "One Martyr. Ten Trees. One Green Tribute. Through this initiative, Prayas continues its commitment to honouring our heroes, protecting nature, and building a greener future. Jai Hind! 🇮🇳 Salute to our Kargil Heroes. 🌱❤️",
      author: "Prayas & Indore Municipal Corporation",
      location: "Chhota Bilawali Talab, Indore",
      role: "Kargil Vijay Diwas Initiative",
    },
    gallery: [
      '/TREEGROW.jpg',
      '/Tree.png',
      '/P1039409.JPG',
      '/CHILDRENGROUP.jpg',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&fit=crop',
      'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1200&fit=crop',
    ],
    faqs: [
      { question: 'How many trees were planted in memory of each Kargil martyr?', answer: '10 trees were dedicated to each of the 527 brave martyrs, totaling 5,270 trees.' },
      { question: 'Where did the Kargil Vijay Diwas plantation take place?', answer: 'It was organized at Chhota Bilawali Talab, Indore, in partnership with the Indore Municipal Corporation.' },
    ],
    ctaTitle: 'Support the Green Tribute Initiative',
    ctaDescription: 'Help us care for the 5,270 trees planted for our 527 Kargil heroes.',
  },

  'environment/water-conservation': {
    id: 'water-conservation',
    categorySlug: 'environment',
    categoryName: 'Environment & Sustainability',
    title: 'Rainwater Harvesting & Water Conservation',
    subtitle: 'Recharging aquifers, building check dams & securing water security',
    heroImage: 'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=1200&fit=crop',
    accentColor: '#0284C7',
    secondaryColor: '#E0F2FE',
    gradientBg: 'from-[#0369A1] via-[#0284C7] to-[#38BDF8]',
    shortDescription: 'Constructing check dams, rooftop rainwater harvesting systems, farm ponds, and groundwater recharge pits.',
    longDescription:
      'Depleting groundwater tables threaten agriculture and drinking water access across India. Prayas Foundation designs and constructs check dams, farm ponds (Khet Talab), rooftop rainwater harvesting units in public buildings, and percolation pits. Our water conservation projects capture millions of liters of monsoon rainfall, raising water tables in surrounding wells by up to 15 feet.',
    stats: [
      { label: 'Check Dams Constructed', value: '22' },
      { label: 'Rainwater Harvested / Yr', value: '45 Million Liters' },
      { label: 'Groundwater Rise', value: '+12 Feet' },
      { label: 'Farmers Benefited', value: '3,400+' },
    ],
    objectives: [
      { title: 'Check Dam & Embankment Building', desc: 'Building stone masonry and earthen check dams across seasonal streams.' },
      { title: 'Rooftop Rainwater Harvesting', desc: 'Directing school and government building roof rain into underground recharge wells.' },
      { title: 'Farm Ponds (Khet Talab)', desc: 'Digging farm ponds to store irrigation water for multi-crop farming.' },
      { title: 'Community Water Audits', desc: 'Training villagers in water budget management and drip irrigation.' },
    ],
    methodology: [
      { step: '01', title: 'Topographical Elevation Survey', desc: 'Mapping natural water runoff paths using satellite GIS and drones.' },
      { step: '02', title: 'Community Dam Construction', desc: 'Constructing check dams before monsoon season begins.' },
      { step: '03', title: 'Filter Pit Installation', desc: 'Fitting sand-gravel filters to rooftop pipes before aquifer injection.' },
      { step: '04', title: 'Water Table Monitoring', desc: 'Measuring nearby well water levels across summer and winter months.' },
    ],
    impactStory: {
      quote: "Our village wells used to dry up by February. After Prayas built the check dam, our wells hold water all 12 months, allowing us to grow a second wheat crop!",
      author: "Devram Patel",
      location: "Dhar District",
      role: "Farmer",
    },
    gallery: [
      'https://images.unsplash.com/photo-1548839149-27c2b2178e5b?w=800&h=500&fit=crop',
      '/TREEGROW.jpg',
    ],
    faqs: [
      { question: 'How much rainwater can a single rooftop system harvest?', answer: 'A 1,000 sq ft roof can harvest over 60,000 liters of clean water per monsoon.' },
    ],
    ctaTitle: 'Fund a Water Harvesting Structure',
    ctaDescription: 'Help us recharge groundwater tables and prevent summer water crises.',
  },

  // ─── PROJECT SINDODA INITIATIVES ───
  'project-sindoda/plastic-mukti': {
    id: 'plastic-mukti',
    categorySlug: 'project-sindoda',
    categoryName: 'Project Sindoda',
    title: 'Plastic Mukti - Plastic Free Sindoda Movement',
    subtitle: 'Transforming Sindoda into a zero single-use plastic model village',
    heroImage: '/plastic-mukti-hero.jpg',
    accentColor: '#15803D',
    secondaryColor: '#DCFCE7',
    gradientBg: 'from-[#14532D] via-[#15803D] to-[#4ADE80]',
    shortDescription: 'Distributing cloth bags, banning poly-bags, door-to-door waste collection, and recycling setup in Sindoda.',
    longDescription:
      'Project Sindoda is Prayas Foundation flagship environmental campaign dedicated to creating a completely Plastic-Free Zone (Plastic Mukti). Through intensive door-to-door canvassing, we replaced single-use plastic bags in all retail shops with reusable cloth bags stitched by women self-help groups. We installed dual segregation dustbins, set up a local plastic compaction and recycling hub, and established a plastic-free code of conduct in Gram Panchayat meetings.',
    stats: [
      { label: 'Single-Use Plastic Cut', value: '98%' },
      { label: 'Cloth Bags Distributed', value: '12,000+' },
      { label: 'Plastic Recycled', value: '45 Tons' },
      { label: 'Shops Pledged', value: '140+' },
    ],
    objectives: [
      { title: 'Cloth Bag Exchange Banks', desc: 'Replacing all plastic carry bags with durable cloth bags across shops.' },
      { title: 'Door-to-Door Waste Segregation', desc: 'Collecting wet and dry waste separately in every household.' },
      { title: 'Local Plastic Compactor Hub', desc: 'Baling collected plastic to sell directly to certified recycling factories.' },
      { title: 'Panchayat By-Law Enforcement', desc: 'Formally penalizing single-use plastic usage in public functions.' },
    ],
    methodology: [
      { step: '01', title: 'Community Pledges', desc: 'Gathering shopkeepers and families to sign Plastic Mukti pledges.' },
      { step: '02', title: 'Cloth Bag Supply', desc: 'Supplying cloth bags stitched by local women sewing centers.' },
      { step: '03', title: 'Daily Waste Collection', desc: 'Deploying eco-rickshaws for daily segregated garbage pick-up.' },
      { step: '04', title: 'Zero Waste Certification', desc: 'Auditing village streets and awarding Sindoda model plastic-free status.' },
    ],
    impactStory: {
      quote: "Not a single shopkeeper in Sindoda gives plastic polythene bags anymore. Customers bring cloth bags or use our village bag bank!",
      author: "Dharmendra Sahu",
      location: "Sindoda Market",
      role: "Merchant Association President",
    },
    gallery: [
      '/Sindoda/IMG_20191022_121001 (1).jpg',
      '/Sindoda/IMG_20191030_112427.jpg',
      '/Sindoda/IMG_20191104_162653.jpg',
      '/Sindoda/IMG_20191106_104516.jpg',
    ],
    faqs: [
      { question: 'Can this plastic-free model be replicated in other villages?', answer: 'Yes! We are currently expanding the Sindoda model to 10 neighboring villages.' },
    ],
    ctaTitle: 'Support the Plastic Mukti Model',
    ctaDescription: 'Help us distribute cloth bag banks and waste segregation bins.',
  },

  'project-sindoda/cleanliness-drives': {
    id: 'cleanliness-drives',
    categorySlug: 'project-sindoda',
    categoryName: 'Project Sindoda',
    title: 'Swachh Sindoda Cleanliness Drives',
    subtitle: 'Community-led shramdaan, dustbin installation & pristine village streets',
    heroImage: '/Sindoda/IMG_20191106_111020.jpg',
    accentColor: '#0284C7',
    secondaryColor: '#E0F2FE',
    gradientBg: 'from-[#0369A1] via-[#0284C7] to-[#38BDF8]',
    shortDescription: 'Weekly voluntary cleanup drives (Shramdaan), street sweeping, gutter cleaning, and dustbin deployment.',
    longDescription:
      'Cleanliness starts with collective civic action. Every Sunday morning, Prayas Foundation organizes "Swachh Sindoda Shramdaan" where hundreds of village youth, elders, and volunteers gather to sweep public streets, clean drainage channels, clear trash hotspots, paint village walls with environmental art, and install color-coded waste bins across public junctions.',
    stats: [
      { label: 'Cleanliness Drives Held', value: '140+' },
      { label: 'Volunteer Hours', value: '15,000+' },
      { label: 'Dustbins Installed', value: '180' },
      { label: 'Blackspots Eliminated', value: '35' },
    ],
    objectives: [
      { title: 'Weekly Voluntary Cleanups', desc: 'Engaging citizens in hands-on street sweeping and trash collection.' },
      { title: 'Color-Coded Dustbins', desc: 'Installing green (wet) and blue (dry) bins every 100 meters.' },
      { title: 'Drainage Channel De-silting', desc: 'Preventing waterlogging and mosquito breeding in open drains.' },
      { title: 'Wall Art & Beautification', desc: 'Transforming dirty walls into colorful environmental messaging canvases.' },
    ],
    methodology: [
      { step: '01', title: 'Blackspot Identification', desc: 'Mapping illegal dumping spots across village crossroads.' },
      { step: '02', title: 'Sunday Shramdaan Mobilization', desc: 'Rallying volunteers equipped with brooms, gloves, and tractor trolleys.' },
      { step: '03', title: 'Dustbin Fixing', desc: 'Installing vandal-proof metal dustbin stands.' },
      { step: '04', title: 'Maintenance Handover', desc: 'Assigning street maintenance responsibilities to local shop units.' },
    ],
    impactStory: {
      quote: "Our village square used to be an eyesore. Now it is so clean that children play here every evening.",
      author: "Mahesh Chouhan",
      location: "Sindoda Square",
      role: "Resident",
    },
    gallery: [
      '/Sindoda/IMG_20191106_111020.jpg',
      '/Sindoda/IMG_20191113_121346.jpg',
      '/Sindoda/IMG_20191115_115816.jpg',
    ],
    faqs: [
      { question: 'Who maintains the installed dustbins?', answer: 'The Gram Panchayat sanitation team empties them daily into municipal collection trucks.' },
    ],
    ctaTitle: 'Sponsor Dustbins for Swachh Sindoda',
    ctaDescription: '₹1,500 sponsors a set of color-coded public waste bins.',
  },

  'project-sindoda/eco-awareness': {
    id: 'eco-awareness',
    categorySlug: 'project-sindoda',
    categoryName: 'Project Sindoda',
    title: 'Eco-Awareness & Community Canvassing',
    subtitle: 'Transforming mindsets through door-to-door education & street plays',
    heroImage: '/Sindoda/IMG_20191127_112906.jpg',
    accentColor: '#D97706',
    secondaryColor: '#FEF3C7',
    gradientBg: 'from-[#92400E] via-[#D97706] to-[#FBBF24]',
    shortDescription: 'Nukkad Natak street theater, school eco-clubs, household visits, and green rallies in Sindoda.',
    longDescription:
      'Infrastructure alone cannot change behavior without awareness. Prayas Foundation conducts energetic eco-awareness campaigns in Sindoda. Using Nukkad Natak (street plays), school art competitions, rallies, and home visits by green ambassadors, we educate residents about plastic hazards, composting kitchen waste, and protecting village ponds.',
    stats: [
      { label: 'Households Canvassed', value: '100%' },
      { label: 'Street Plays Staged', value: '45' },
      { label: 'School Eco-Clubs', value: '6' },
      { label: 'Youth Ambassadors', value: '120+' },
    ],
    objectives: [
      { title: 'Door-to-Door Canvassing', desc: 'Visiting every family to demonstrate wet and dry waste segregation.' },
      { title: 'Nukkad Natak Street Theater', desc: 'Performing engaging, humorous plays on plastic pollution.' },
      { title: 'School Eco-Clubs', desc: 'Training school children as green champions in their homes.' },
      { title: 'Composting Workshops', desc: 'Teaching households to convert kitchen scraps into organic garden manure.' },
    ],
    methodology: [
      { step: '01', title: 'Green Ambassador Training', desc: 'Training enthusiastic village youth in communication techniques.' },
      { step: '02', title: 'Street Theater Performances', desc: 'Staging plays at weekly markets and temple squares.' },
      { step: '03', title: 'Household Composting Distribution', desc: 'Providing home compost bins for kitchen waste.' },
      { step: '04', title: 'Eco-Pledge Ceremonies', desc: 'Administering green pledges in morning school assemblies.' },
    ],
    impactStory: {
      quote: "My 8-year-old daughter saw the Prayas street play. Now she stops me if I ever bring a plastic bag into the house!",
      author: "Sunita Mukati",
      location: "Sindoda",
      role: "Parent & Homemaker",
    },
    gallery: [
      '/Sindoda/IMG_20191127_112906.jpg',
      '/Sindoda/IMG_20191127_125013.jpg',
      '/Sindoda/IMG_20191213_152317.jpg',
    ],
    faqs: [
      { question: 'How can I volunteer for street campaigns?', answer: 'You can join our weekend eco-rallies and drama troupes by registering on our Volunteer page.' },
    ],
    ctaTitle: 'Fund an Eco-Awareness Campaign',
    ctaDescription: 'Help us bring green education to more schools and neighborhoods.',
  },

  'environment/plastic-free-school': {
    id: 'plastic-free-school',
    categorySlug: 'environment',
    categoryName: 'Environment & Sustainability',
    title: 'Plastic-Free School Initiative',
    subtitle: 'Transforming campuses into zero-plastic zones through student eco-clubs',
    heroImage: '/Sindoda/IMG_20191030_112427.jpg',
    accentColor: '#16A34A',
    secondaryColor: '#DCFCE7',
    gradientBg: 'from-[#14532D] via-[#16A34A] to-[#4ADE80]',
    shortDescription: 'Prayas transformed educational institutions into plastic-free campuses by promoting sustainable practices, waste segregation, environmental education, and responsible waste management among students and teachers.',
    longDescription:
      'Through the Plastic-Free School Initiative, Prayas partners with primary and secondary schools across Madhya Pradesh to eliminate single-use plastics from school premises. We install color-coded waste segregation bins, conduct interactive green workshops, set up student-led Eco-Clubs, and distribute reusable cloth bags and stainless steel water bottles to foster lifelong eco-friendly habits in young minds.',
    stats: [
      { label: 'Schools Transformed', value: '45+' },
      { label: 'Students Educated', value: '12,000+' },
      { label: 'Plastic Banned', value: '100% On-Campus' },
      { label: 'Eco-Clubs Active', value: '45' },
    ],
    objectives: [
      { title: 'Campus Plastic Ban', desc: 'Eliminating polythene, plastic wrappers, and single-use bottles from school canteens.' },
      { title: 'Classroom Segregation Bins', desc: 'Installing wet and dry waste segregation stations in every corridor.' },
      { title: 'Student Eco-Club Leadership', desc: 'Appointing student Green Captains to monitor daily waste segregation.' },
      { title: 'Eco-Art & Tree Planting', desc: 'Organizing art competitions using recycled waste and planting school mini-forests.' },
    ],
    methodology: [
      { step: '01', title: 'School Audit & Baseline', desc: 'Assessing existing plastic usage in canteens and school events.' },
      { step: '02', title: 'Teacher & Staff Workshops', desc: 'Training educators to lead eco-awareness in morning assemblies.' },
      { step: '03', title: 'Bin Installation & Kit Distribution', desc: 'Providing steel bottles, cloth bags, and waste collection bins.' },
      { step: '04', title: 'Green Campus Certification', desc: 'Awarding Green Flag certifications to schools achieving zero-plastic status.' },
    ],
    impactStory: {
      quote: "Our school canteen completely stopped selling items packaged in single-use plastic. Students now carry cloth bags proudly!",
      author: "Principal Rajesh Verma",
      location: "Indore District, MP",
      role: "School Administrator",
    },
    gallery: [
      '/Sindoda/IMG_20191030_112427.jpg',
      '/Sindoda/IMG_20191022_121001 (1).jpg',
      '/TREEGROW.jpg',
    ],
    faqs: [
      { question: 'How can our school join the Plastic-Free School drive?', answer: 'Contact Prayas through our contact page to schedule a green campus audit.' },
    ],
    ctaTitle: 'Sponsor a Plastic-Free School Kit',
    ctaDescription: '₹2,500 equips a school classroom with waste segregation bins and student eco-kits.',
  },

  'environment/plastic-free-village': {
    id: 'plastic-free-village',
    categorySlug: 'environment',
    categoryName: 'Environment & Sustainability',
    title: 'Plastic-Free Village Initiative',
    subtitle: 'Community-led plastic elimination & village sanitation',
    heroImage: '/Sindoda/IMG_20191022_121001 (1).jpg',
    accentColor: '#15803D',
    secondaryColor: '#ECFDF5',
    gradientBg: 'from-[#064E3B] via-[#15803D] to-[#34D399]',
    shortDescription: 'Our organization successfully implemented plastic-free village campaigns by encouraging community participation, cloth bag usage, plastic waste reduction, and sustainable village waste management systems.',
    longDescription:
      'In model villages like Sindoda, Prayas spearheaded a door-to-door plastic elimination drive. We established community composting units, replaced plastic carry bags with hand-stitched cloth bags made by local women, organized village cleanup drives, and created a self-reliant waste collection system managed by local Gram Panchayats.',
    stats: [
      { label: 'Model Villages', value: '8' },
      { label: 'Plastic Reduced', value: '85%' },
      { label: 'Cloth Bags Distributed', value: '25,000+' },
      { label: 'Composting Pits', value: '30+' },
    ],
    objectives: [
      { title: 'Panchayat Plastic Resolution', desc: 'Passing official village resolutions banning thin plastic carry bags.' },
      { title: 'Door-to-Door Canvassing', desc: 'Educating mothers and families on separating wet organic and dry plastic waste.' },
      { title: 'Cloth Bag Stitching Hubs', desc: 'Employing village women to craft affordable, washable cotton shopping bags.' },
      { title: 'Community Compost Pits', desc: 'Converting kitchen food waste into rich organic bio-fertilizer for local crops.' },
    ],
    methodology: [
      { step: '01', title: 'Community Samvad', desc: 'Hosting evening townhall meetings with village elders and shopkeepers.' },
      { step: '02', title: 'Merchant Transition', desc: 'Replacing plastic rolls with paper and cloth bags in village grocery stores.' },
      { step: '03', title: 'Cleanliness Abhiyan', desc: 'Mobilizing youth for weekend pond and roadside plastic collection drives.' },
      { step: '04', title: 'Gram Panchayat Handover', desc: 'Setting up permanent waste collection trucks operated by Gram Panchayat staff.' },
    ],
    impactStory: {
      quote: "Sindoda is now clean and green. Cattle are safe from consuming plastic litter, and our fields produce better crops with home compost.",
      author: "Sarpanch Rameshwar Mukati",
      location: "Sindoda Village, MP",
      role: "Gram Panchayat Leader",
    },
    gallery: [
      '/Sindoda/IMG_20191022_121001 (1).jpg',
      '/Sindoda/IMG_20191127_112906.jpg',
      '/Sindoda/IMG_20191217_133958.jpg',
    ],
    faqs: [
      { question: 'How is plastic waste disposed of?', answer: 'Segregated dry plastic is baled and sent to authorized recycling facilities.' },
    ],
    ctaTitle: 'Support Plastic-Free Village Drives',
    ctaDescription: '₹1,000 provides 50 cloth bags to rural families.',
  },

  'women-empowerment/pink-city-bus': {
    id: 'pink-city-bus',
    categorySlug: 'women-empowerment',
    categoryName: 'Women Empowerment',
    title: 'Pink City Bus for Women',
    subtitle: 'Women-led safe transit & professional female driver training',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&fit=crop',
    accentColor: '#DB2777',
    secondaryColor: '#FDF2F8',
    gradientBg: 'from-[#831843] via-[#DB2777] to-[#F472B6]',
    shortDescription: 'Prayas promoted women-led public transportation by supporting women drivers and advocating for safer, more inclusive mobility solutions that enhance women\'s independence and employment opportunities.',
    longDescription:
      'The Pink City Bus initiative creates safe urban transit for women while opening non-traditional employment opportunities for female commercial vehicle drivers. Prayas provides driving instruction, licensing assistance, self-defense training, and gender-sensitization workshops to municipal transport staff.',
    stats: [
      { label: 'Women Commuters Safe', value: '50,000+' },
      { label: 'Female Drivers Trained', value: '60+' },
      { label: 'City Routes Covered', value: '14' },
      { label: 'Safety Index Rating', value: '99%' },
    ],
    objectives: [
      { title: 'Female Commercial Driving', desc: 'Providing professional heavy-vehicle driving certification for underprivileged women.' },
      { title: 'Women-Only Safe Transit', desc: 'Advocating for dedicated Pink buses on high-density commuter corridors.' },
      { title: 'Self-Defense & SOS Safety', desc: 'Training female drivers and conductors in martial arts defense and panic button response.' },
      { title: 'Gender Sensitization', desc: 'Conducting workshops for male drivers and transit staff.' },
    ],
    methodology: [
      { step: '01', title: 'Trainee Selection', desc: 'Identifying ambitious women from low-income households seeking sustainable livelihoods.' },
      { step: '02', title: 'Driving Simulator Training', desc: 'Interactive driving simulation and road safety regulations course.' },
      { step: '03', title: 'Commercial Licensing', desc: 'Assisting trainees in securing official RTO commercial driving permits.' },
      { step: '04', title: 'Fleet Deployment', desc: 'Placing trained women drivers with city municipal bus authorities.' },
    ],
    impactStory: {
      quote: "Driving a city bus gave me financial dignity. I earn ₹18,000 monthly and send both my daughters to college.",
      author: "Rekha Parmar",
      location: "Indore",
      role: "Pink Bus Commercial Driver",
    },
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop',
      '/WOMEN.jpeg',
      '/P1039409.JPG',
    ],
    faqs: [
      { question: 'Who qualifies for the female driver scholarship program?', answer: 'Women aged 20-35 from low-income families holding a valid basic driving permit.' },
    ],
    ctaTitle: 'Sponsor a Female Driver Training',
    ctaDescription: 'Help a woman earn a commercial driving license and financial freedom.',
  },

  'healthcare/mental-health': {
    id: 'mental-health',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Rural Women Mental Health & Counselling',
    subtitle: 'Breaking stigma, emotional wellness & rural psychiatric care',
    heroImage: '/healthhj.jpeg',
    accentColor: '#9333EA',
    secondaryColor: '#FAF5FF',
    gradientBg: 'from-[#581C87] via-[#9333EA] to-[#C084FC]',
    shortDescription: 'We organize counselling sessions and awareness programs that support rural women in improving their emotional well-being, self-confidence, stress management, and overall mental health.',
    longDescription:
      'Mental health support remains severely neglected in rural communities. Prayas deploys trained female counsellors and psychologists to rural hamlets to host confidential support circles, domestic harmony workshops, stress relief techniques, and psychiatric referrals for women facing trauma, anxiety, or social isolation.',
    stats: [
      { label: 'Women Counsilled', value: '4,500+' },
      { label: 'Support Circles', value: '120+' },
      { label: 'Rural Camps Held', value: '80+' },
      { label: 'ASHA Workers Trained', value: '200+' },
    ],
    objectives: [
      { title: 'De-stigmatizing Mental Illness', desc: 'Teaching villagers that mental health is as important as physical health.' },
      { title: 'Confidential Support Circles', desc: 'Creating safe space group discussions for mothers and young wives.' },
      { title: 'Stress & Trauma Relief', desc: 'Providing breathing exercises, yoga techniques, and 1-on-1 counseling.' },
      { title: 'Psychiatric Medical Referrals', desc: 'Connecting severe cases with government hospital psychiatric specialists.' },
    ],
    methodology: [
      { step: '01', title: 'ASHA Worker Collaboration', desc: 'Training local healthcare workers to spot signs of depression and anxiety.' },
      { step: '02', title: 'Village Health Camp Setup', desc: 'Hosting wellness camps at Anganwadi centers.' },
      { step: '03', title: '1-on-1 Clinical Sessions', desc: 'Providing private counseling sessions with certified female psychologists.' },
      { step: '04', title: 'Community Support Networks', desc: 'Forming peer-led mental health support circles in hamlets.' },
    ],
    impactStory: {
      quote: "After losing my husband, I felt hopeless. Prayas counseling sessions gave me emotional strength and the courage to rebuild my life.",
      author: "Kamla Bai",
      location: "Dhar District, MP",
      role: "Homemaker & Community Participant",
    },
    gallery: [
      '/healthhj.jpeg',
      '/healthcaret.jpg',
      '/PRAYASHEALTHCAMP.jpeg',
    ],
    faqs: [
      { question: 'Are counseling sessions free for villagers?', answer: 'Yes, all mental health counseling camps and follow-ups are 100% free.' },
    ],
    ctaTitle: 'Sponsor Rural Mental Health Camps',
    ctaDescription: '₹3,000 funds a full-day counseling camp for 50 rural women.',
  },

  'women-empowerment/potato-chips-unit': {
    id: 'potato-chips-unit',
    categorySlug: 'women-empowerment',
    categoryName: 'Women Empowerment',
    title: 'Rural Potato Chips Manufacturing Unit',
    subtitle: 'Agro-processing, micro-entrepreneurship & sustainable livelihoods',
    heroImage: '/chips_hero_section_video.mp4',
    accentColor: '#EAB308',
    secondaryColor: '#FEFCE8',
    gradientBg: 'from-[#713F12] via-[#EAB308] to-[#FDE047]',
    shortDescription: 'Prayas has established community-based potato chips manufacturing units for rural women, providing entrepreneurship training, food processing skills, quality production practices, packaging support, and market linkage to create sustainable livelihoods.',
    longDescription:
      'By leveraging local agricultural produce, Prayas created micro-enterprises where rural women process, hygiene-pack, and market crispy potato chips. We supply automated slicing and frying machines, FSSAI licensing support, brand packaging, and distribution connections to local grocery chains and retail outlets.',
    stats: [
      { label: 'Women Employed', value: '150+' },
      { label: 'Units Operational', value: '5' },
      { label: 'Avg Income Increase', value: '300%' },
      { label: 'Daily Output', value: '500 kg' },
    ],
    objectives: [
      { title: 'Agro-Value Addition', desc: 'Processing raw village potatoes into high-margin packaged snack products.' },
      { title: 'FSSAI Quality Compliance', desc: 'Ensuring food safety, hygiene protocols, and nutritional standard compliance.' },
      { title: 'Brand & Eco-Packaging', desc: 'Creating professional brand packaging for local retail and wholesale distribution.' },
      { title: 'Women Self-Governance', desc: 'Forming women-led cooperatives that manage daily unit operations and revenues.' },
    ],
    methodology: [
      { step: '01', title: 'Machinery Procurement', desc: 'Installing stainless steel slicers, hydro-extractors, and vacuum sealers.' },
      { step: '02', title: 'Food Hygiene Certification', desc: 'Training women workers in FSSAI food handler safety protocols.' },
      { step: '03', title: 'Trial Production & Quality Test', desc: 'Refining frying temperatures, seasoning blends, and shelf-life.' },
      { step: '04', title: 'Market Linkage & Retail Sales', desc: 'Distributing packaged chips across regional retail stores and fairs.' },
    ],
    impactStory: {
      quote: "Before this manufacturing unit, I had no independent earnings. Now I earn ₹9,000 monthly and contribute to my family's savings.",
      author: "Shanti Solanki",
      location: "Indore Rural",
      role: "Micro-Unit Supervisor",
    },
    gallery: [
      '/chips_video.mp4',
      '/WOMEN.jpeg',
      '/IMG-24.jpeg',
      '/Sindoda/IMG_20191022_121001 (1).jpg',
    ],
    faqs: [
      { question: 'Where can I buy products made by Prayas women units?', answer: 'Products are available at local retail outlets and annual NGO craft exhibitions.' },
    ],
    ctaTitle: 'Fund a Micro-Livelihood Machine',
    ctaDescription: 'Help us set up new processing units for rural mother groups.',
  },

  'women-empowerment/handicrafts': {
    id: 'handicrafts',
    categorySlug: 'women-empowerment',
    categoryName: 'Women Empowerment',
    title: 'Handicraft & Home Industry Development',
    subtitle: 'Preserving traditional crafts & fostering women self-employment',
    heroImage: '/IMG-24.jpeg',
    accentColor: '#C026D3',
    secondaryColor: '#FDF4FF',
    gradientBg: 'from-[#701A75] via-[#C026D3] to-[#F0ABFC]',
    shortDescription: 'We provide skill training in handicrafts and home-based enterprises, enabling women to create marketable products and achieve financial independence through self-employment.',
    longDescription:
      'Prayas runs vocational craft centers in rural clusters teaching traditional embroidery, jute bag tailoring, terracotta decor, incense stick making, and herbal soap crafting. We help women organize into Self-Help Groups (SHGs) and sell products directly at state craft fairs and corporate exhibition stalls.',
    stats: [
      { label: 'Artisans Skilled', value: '1,200+' },
      { label: 'SHGs Formed', value: '35' },
      { label: 'Exhibitions Hosted', value: '50+' },
      { label: 'Monthly Earnings', value: '₹7,500+' },
    ],
    objectives: [
      { title: 'Vocational Skill Mastery', desc: 'Training rural women in high-demand tailoring, craft, and home product designs.' },
      { title: 'SHG Micro-Finance', desc: 'Setting up Self-Help Groups with bank accounts for micro-credit access.' },
      { title: 'Raw Material Bank', desc: 'Supplying quality cloth, jute, incense powder, and machinery to artisan homes.' },
      { title: 'Exhibition & Corporate Sales', desc: 'Connecting artisans directly with bulk corporate gifting orders.' },
    ],
    methodology: [
      { step: '01', title: 'Skill Assessment', desc: 'Identifying existing traditional craft skills in rural women clusters.' },
      { step: '02', title: 'Master Artisan Classes', desc: '3-month intensive vocational design and quality control course.' },
      { step: '03', title: 'Equipment Supply', desc: 'Gifting sewing machines and craft toolkits to certified graduates.' },
      { step: '04', title: 'Market Stalls', desc: 'Setting up sales stalls at Shilpgram, Saras Mela, and online marketplaces.' },
    ],
    impactStory: {
      quote: "Creating hand-embroidered bags allowed me to work from home while caring for my children. I am proud to be self-reliant.",
      author: "Anita Rathore",
      location: "Ujjain District",
      role: "SHG Craft Lead",
    },
    gallery: [
      '/IMG-24.jpeg',
      '/WOMEN.jpeg',
      '/P1039409.JPG',
    ],
    faqs: [
      { question: 'Can corporate clients order bulk customized gifts?', answer: 'Yes! We supply eco-friendly jute bags and corporate craft hampers.' },
    ],
    ctaTitle: 'Gift a Sewing Machine to an Artisan',
    ctaDescription: '₹7,500 provides a heavy-duty sewing machine and starter craft kit.',
  },

  'healthcare/health-hygiene': {
    id: 'health-hygiene',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Health & Hygiene Awareness',
    subtitle: 'Preventive healthcare, menstrual dignity & community sanitation',
    heroImage: '/healthcaret.jpg',
    accentColor: '#DC2626',
    secondaryColor: '#FEF2F2',
    gradientBg: 'from-[#7F1D1D] via-[#DC2626] to-[#F87171]',
    shortDescription: 'Prayas conducts awareness sessions on personal hygiene, menstrual health, nutrition, sanitation, disease prevention, and healthy living for children, women, and families.',
    longDescription:
      'Preventable infections cause widespread illness in underprivileged communities. Prayas conducts mobile health lectures, dispelling myths around menstrual hygiene, distributing free biodegradable sanitary napkins, teaching WHO handwashing protocols, and installing clean drinking water filtration systems in village centers.',
    stats: [
      { label: 'Hygiene Kits Given', value: '15,000+' },
      { label: 'Awareness Sessions', value: '250+' },
      { label: 'Beneficiaries Reached', value: '40,000+' },
      { label: 'School Lectures', value: '180+' },
    ],
    objectives: [
      { title: 'Menstrual Health & Dignity', desc: 'Breaking taboo and distributing eco-friendly sanitary pads to schoolgirls.' },
      { title: 'Preventive Disease Control', desc: 'Educating families on vector-borne disease prevention (Dengue, Malaria).' },
      { title: 'Child Nutrition & Hygiene', desc: 'Teaching WHO 7-step handwashing and clean eating habits in Anganwadis.' },
      { title: 'Sanitation Infrastructure', desc: 'Installing public handwashing stations in village markets.' },
    ],
    methodology: [
      { step: '01', title: 'Mobile Medical Van Outreach', desc: 'Visiting remote slums with female doctor teams.' },
      { step: '02', title: 'Interactive Audio-Visual Workshops', desc: 'Using animation films to demonstrate virus transmission.' },
      { step: '03', title: 'Free Kit Distribution', desc: 'Gifting soap, sanitary napkins, nail clippers, and toothbrushes.' },
      { step: '04', title: 'Community Health Audits', desc: 'Quarterly checking of village water purity and drainage sanitation.' },
    ],
    impactStory: {
      quote: "School attendance among teenage girls increased dramatically once we began distributing free sanitary kits and counseling.",
      author: "Teacher Savita Sharma",
      location: "Dewas District",
      role: "Senior Educator",
    },
    gallery: [
      '/healthcaret.jpg',
      '/healthhj.jpeg',
      '/PRAYASHEALTHCAMP.jpeg',
    ],
    faqs: [
      { question: 'Are the distributed sanitary napkins biodegradable?', answer: 'Yes, we distribute high-quality, eco-friendly cotton sanitary napkins.' },
    ],
    ctaTitle: 'Sponsor Menstrual Hygiene Kits',
    ctaDescription: '₹500 provides a year\'s supply of sanitary napkins to a schoolgirl.',
  },

  'healthcare/labour-rights': {
    id: 'labour-rights',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Labour Rights & Welfare Awareness',
    subtitle: 'Social security, e-Shram registration & worker safety',
    heroImage: '/IMG-27.jpeg',
    accentColor: '#0284C7',
    secondaryColor: '#F0F9FF',
    gradientBg: 'from-[#075985] via-[#0284C7] to-[#38BDF8]',
    shortDescription: 'We educate workers and labour communities about legal rights, government welfare schemes, workplace safety, and social security benefits through awareness campaigns and outreach programs.',
    longDescription:
      'Unorganized construction workers, factory laborers, and domestic helpers often miss out on entitled benefits. Prayas organizes legal literacy camps informing workers about e-Shram cards, minimum wage guarantees, provident funds, safety gear requirements, and free health insurance enrollments under Ayushman Bharat.',
    stats: [
      { label: 'Workers Registered', value: '8,000+' },
      { label: 'Legal Camps Held', value: '65' },
      { label: 'Welfare Cards Issued', value: '5,500+' },
      { label: 'Safety Helmets Given', value: '1,200+' },
    ],
    objectives: [
      { title: 'e-Shram Portal Enrollment', desc: 'Registering unorganized laborers on national social security databases.' },
      { title: 'Workplace Safety Training', desc: 'Demonstrating helmet, harness, and glove safety for high-risk workers.' },
      { title: 'Legal & Wage Entitlements', desc: 'Educating workers on minimum wage rights and maternity support schemes.' },
      { title: 'Free Medical Screening', desc: 'Organizing occupational health checkups for dust and chemical exposure.' },
    ],
    methodology: [
      { step: '01', title: 'Labor Chowk Camps', desc: 'Setting up early morning registration desks at daily worker gathering points.' },
      { step: '02', title: 'Aadhaar & Bank Linking', desc: 'Helping workers open bank accounts to receive direct benefit transfers.' },
      { step: '03', title: 'Safety Equipment Drive', desc: 'Distributing industrial helmets, reflective vests, and safety boots.' },
      { step: '04', title: 'Legal Consultation Helpdesk', desc: 'Providing free legal advice for unpaid wages and workplace injuries.' },
    ],
    impactStory: {
      quote: "When I fell at the construction site, Prayas helped me access ₹50,000 accident insurance compensation through my e-Shram card.",
      author: "Ramlal Yadav",
      location: "Indore Labour Colony",
      role: "Construction Mason",
    },
    gallery: [
      '/IMG-27.jpeg',
      '/P1039322.JPG',
      '/PRAYASHEALTHCAMP.jpeg',
    ],
    faqs: [
      { question: 'What documents are required for e-Shram registration?', answer: 'Aadhaar card, active mobile number, and bank account details.' },
    ],
    ctaTitle: 'Support Worker Legal Literacy Camps',
    ctaDescription: '₹1,500 sponsors a legal helpdesk at a laborer colony.',
  },

  'healthcare/essential-relief': {
    id: 'essential-relief',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'Distribution of Essential Relief Materials',
    subtitle: 'Winter warmth, dry ration kits & emergency humanitarian aid',
    heroImage: '/P1039322.JPG',
    accentColor: '#EA580C',
    secondaryColor: '#FFF7ED',
    gradientBg: 'from-[#9A3412] via-[#EA580C] to-[#FB923C]',
    shortDescription: 'We distribute food, clothing, educational supplies, hygiene kits, blankets, and other essential items to vulnerable families in rural and urban slum communities based on seasonal and emergency needs.',
    longDescription:
      'Extreme winter cold and heavy monsoon rain disproportionately affect pavement dwellers and tribal hamlets. Prayas conducts seasonal warmth drives distributing heavy wool blankets, warm clothes, dry ration kits, school bags, and stationery sets to children and elderly citizens across needy clusters.',
    stats: [
      { label: 'Blankets Distributed', value: '10,000+' },
      { label: 'Ration Kits Given', value: '20,000+' },
      { label: 'Slums Covered', value: '150+' },
      { label: 'Winter Drives Held', value: '40+' },
    ],
    objectives: [
      { title: 'Winter Warmth Drive', desc: 'Distributing heavy wool blankets and sweaters to pavement dwellers before extreme cold waves.' },
      { title: 'Dry Ration Food Security', desc: 'Providing monthly pulse, rice, oil, and wheat flour kits to vulnerable families.' },
      { title: 'Children School Kits', desc: 'Gifting school bags, shoes, uniforms, and books before academic sessions.' },
      { title: 'Elderly Compassion Kits', desc: 'Delivering specialized medical and grooming aid to destitute senior citizens.' },
    ],
    methodology: [
      { step: '01', title: 'Slum Vulnerability Survey', desc: 'Identifying families with zero income or elderly dependents.' },
      { step: '02', title: 'Quality Sourcing', desc: 'Procuring heavy-duty wool blankets and fresh sealed grocery items.' },
      { step: '03', title: 'Night Distribution Squads', desc: 'Deploying volunteer vans to reach street sleepers during winter nights.' },
      { step: '04', title: 'Transparent Audit', desc: 'Recording recipient signatures and geotagged distribution logs.' },
    ],
    impactStory: {
      quote: "The heavy wool blanket Prayas gave us kept my young grandchildren warm through the harsh December freezing nights.",
      author: "Kashiram Old Elder",
      location: "Bhopal Slum Cluster",
      role: "Beneficiary",
    },
    gallery: [
      '/P1039322.JPG',
      '/healthcaret.jpg',
      '/EDUCATION.JPG',
    ],
    faqs: [
      { question: 'Can I donate gently-used warm clothes?', answer: 'Yes! We collect wearable clothes, wash them, and distribute them to families.' },
    ],
    ctaTitle: 'Donate a Winter Warmth Kit',
    ctaDescription: '₹500 provides a heavy wool blanket to an elderly street sleeper.',
  },

  'healthcare/covid-relief': {
    id: 'covid-relief',
    categorySlug: 'healthcare',
    categoryName: 'Health & Social Welfare',
    title: 'COVID-19 Relief & Disaster Response',
    subtitle: 'Frontline emergency food, oxygen banks & pandemic support',
    heroImage: '/PRAYASHEALTHCAMP.jpeg',
    accentColor: '#B91C1C',
    secondaryColor: '#FEF2F2',
    gradientBg: 'from-[#7F1D1D] via-[#B91C1C] to-[#EF4444]',
    shortDescription: 'During the COVID-19 pandemic, Prayas delivered emergency relief through food distribution, ration kits, medicines, masks, hygiene supplies, and community awareness programs, supporting thousands of vulnerable families.',
    longDescription:
      'When the pandemic struck, Prayas deployed frontline volunteers to cook and distribute over 1,00,000 fresh hot meals to stranded migrant workers and daily wagers. We set up mask-making units with local women, supplied N95 masks, sanitizers, oxygen concentrators, and established medical helpline centers.',
    stats: [
      { label: 'Hot Meals Served', value: '1,00,000+' },
      { label: 'Masks Made & Gifted', value: '50,000+' },
      { label: 'Families Supported', value: '12,000+' },
      { label: 'Oxygen Concentrators', value: '35 Units' },
    ],
    objectives: [
      { title: 'Migrant Worker Food Lines', desc: 'Cooking and delivering fresh packed meals to highways and railway shelters during lockdowns.' },
      { title: 'Women-Led Mask Production', desc: 'Employing rural women to stitch double-layered washable cotton masks.' },
      { title: 'Oxygen Concentrator Bank', desc: 'Providing free oxygen machines to critical patients isolated at home.' },
      { title: 'Tele-Medicine Helpline', desc: 'Connecting anxious families with volunteer doctors for symptom guidance.' },
    ],
    methodology: [
      { step: '01', title: 'Emergency Kitchen Setup', desc: 'Operating 24/7 hygienic community kitchens preparing nutrient-dense food.' },
      { step: '02', title: 'Highway Relief Booths', desc: 'Handing out water bottles, footwear, and food packets to walking migrants.' },
      { step: '03', title: 'Medicine Kit Door Delivery', desc: 'Delivering pulse oximeters, zinc, and fever medicines to isolated homes.' },
      { step: '04', title: 'Vaccination Drive Support', desc: 'Assisting elderly villagers with online CoWIN registrations.' },
    ],
    impactStory: {
      quote: "When my father's oxygen dropped during the second wave, Prayas delivered an oxygen concentrator to our home within two hours. They saved his life.",
      author: "Deepak Sharma",
      location: "Indore",
      role: "Citizen",
    },
    gallery: [
      '/PRAYASHEALTHCAMP.jpeg',
      '/healthcaret.jpg',
      '/P1039322.JPG',
    ],
    faqs: [
      { question: 'Is Prayas equipped for disaster response?', answer: 'Yes, our volunteer network mobilizes within 6 hours during floods or health crises.' },
    ],
    ctaTitle: 'Support Emergency Relief Funds',
    ctaDescription: 'Help us maintain disaster response reserves for immediate crisis aid.',
  },

  'rural-development/organic-farming': {
    id: 'organic-farming',
    categorySlug: 'rural-development',
    categoryName: 'Rural Development',
    title: 'Organic Farming Awareness',
    subtitle: 'Sustainable agriculture, bio-pesticides & farmer prosperity',
    heroImage: '/Sindoda/IMG_20191217_133958.jpg',
    accentColor: '#65A30D',
    secondaryColor: '#F7FEE7',
    gradientBg: 'from-[#365314] via-[#65A30D] to-[#A3E635]',
    shortDescription: 'We promote sustainable agriculture by conducting awareness programs on organic farming, natural cultivation techniques, soil health improvement, water conservation, and eco-friendly farming practices.',
    longDescription:
      'Chemical pesticides degrade soil health and increase agricultural debt. Prayas trains smallholder farmers in preparing organic bio-pesticides (Jeevamrut, Neemastra), vermicomposting, crop rotation, rainwater harvesting, and securing organic certification to earn premium prices in urban markets.',
    stats: [
      { label: 'Farmers Trained', value: '1,800+' },
      { label: 'Organic Acres', value: '450+' },
      { label: 'Fertilizer Savings', value: '40%' },
      { label: 'Bio-Compost Beds', value: '120+' },
    ],
    objectives: [
      { title: 'Zero-Cost Natural Farming', desc: 'Training farmers to make Jeevamrut bio-fertilizer using local cow dung and urine.' },
      { title: 'Soil Fertility Restoration', desc: 'Eliminating synthetic chemical fertilizers to restore earthworm and microbial balance.' },
      { title: 'Water-Efficient Agriculture', desc: 'Promoting drip irrigation, mulching, and rainwater harvesting ponds.' },
      { title: 'Organic Market Premium', desc: 'Forming Farmer Producer Groups (FPGs) for direct sales to organic food stores.' },
    ],
    methodology: [
      { step: '01', title: 'Demonstration Farms', desc: 'Setting up model organic plots side-by-side with chemical farms.' },
      { step: '02', title: 'Bio-Pesticide Preparation', desc: 'Hands-on workshops preparing Neemastra, Agniastra, and vermicompost.' },
      { step: '03', title: 'Soil Health Testing', desc: 'Analyzing soil organic carbon levels before and after harvest seasons.' },
      { step: '04', title: 'Organic Certification Support', desc: 'Assisting small farmers with Participatory Guarantee System (PGS) certification.' },
    ],
    impactStory: {
      quote: "Switching to organic farming reduced my cultivation cost by ₹15,000 per acre. My soil is fertile again and my wheat commands higher market price.",
      author: "Farmer Babulal Patidar",
      location: "Sindoda Village",
      role: "Organic Farmer Leader",
    },
    gallery: [
      '/Sindoda/IMG_20191217_133958.jpg',
      '/TREEGROW.jpg',
      '/Sindoda/IMG_20191022_121001 (1).jpg',
    ],
    faqs: [
      { question: 'Does organic farming reduce crop yield initially?', answer: 'Yield stabilizes by the second season while input costs drop drastically from day one.' },
    ],
    ctaTitle: 'Sponsor an Organic Farmer Kit',
    ctaDescription: '₹2,000 provides a farmer with vermicompost beds and bio-fertilizer starter kits.',
  },

  'rural-development/community-surveys': {
    id: 'community-surveys',
    categorySlug: 'rural-development',
    categoryName: 'Rural Development',
    title: 'Community Surveys & Development Planning',
    subtitle: 'Evidence-based planning, GIS mapping & Panchayat blueprints',
    heroImage: '/Sindoda/IMG_20191127_112906.jpg',
    accentColor: '#475569',
    secondaryColor: '#F8FAFC',
    gradientBg: 'from-[#1E293B] via-[#475569] to-[#94A3B8]',
    shortDescription: 'Our organization conducts need-based community surveys to identify local challenges, assess social and environmental needs, and support evidence-based planning for sustainable urban and rural development.',
    longDescription:
      'True development starts with listening to people. Prayas conducts baseline socio-economic household surveys, mapping local literacy levels, drinking water quality, unemployment, and healthcare access. The data collected guides Gram Panchayat development plans and CSR partnership proposals.',
    stats: [
      { label: 'Surveys Conducted', value: '18,000+ HH' },
      { label: 'Villages Mapped', value: '25' },
      { label: 'Panchayat Reports', value: '30+' },
      { label: 'Data Accuracy', value: '99%' },
    ],
    objectives: [
      { title: 'Household Needs Mapping', desc: 'Documenting income, sanitation, water access, and school dropout rates.' },
      { title: 'GIS Water & Asset Mapping', desc: 'Mapping water table levels, school distances, and road connectivity.' },
      { title: 'Participatory Rural Appraisal', desc: 'Hosting village mapping sessions where residents draw community priority maps.' },
      { title: 'District Blueprint Presentation', desc: 'Submitting evidence-based data reports to district collectors for policy action.' },
    ],
    methodology: [
      { step: '01', title: 'Digital Mobile Survey App', desc: 'Equipping youth surveyors with offline mobile data collection tools.' },
      { step: '02', title: 'Door-to-Door Household Visits', desc: 'Interviewing mothers, youth, and elders to capture ground realities.' },
      { step: '03', title: 'Statistical Analysis', desc: 'Processing data to spot critical gaps in health, water, or literacy.' },
      { step: '04', title: 'Development Blueprint Handover', desc: 'Presenting findings at Gram Sabha meetings for village planning.' },
    ],
    impactStory: {
      quote: "The Prayas survey revealed that 40% of village homes lacked clean water taps. With this data, our Panchayat secured state water pipeline sanctions.",
      author: "Secretary Anand Joshi",
      location: "Indore Rural",
      role: "Panchayat Administrator",
    },
    gallery: [
      '/Sindoda/IMG_20191127_112906.jpg',
      '/Sindoda/IMG_20191022_121001 (1).jpg',
      '/P1039322.JPG',
    ],
    faqs: [
      { question: 'How is household privacy protected during surveys?', answer: 'All survey data is anonymized and aggregated strictly for community development planning.' },
    ],
    ctaTitle: 'Fund a Village Survey Blueprint',
    ctaDescription: '₹5,000 enables a full GIS socio-economic mapping survey of an adopted village.',
  },
};

// Helper function to fetch item or fallback
export function getInitiativeDetail(categorySlug: string, itemSlug: string): InitiativeDetail | null {
  const key = `${categorySlug}/${itemSlug}`;
  if (learnMoreData[key]) {
    return learnMoreData[key];
  }

  // Search by itemSlug only if full key fails
  const matchedKey = Object.keys(learnMoreData).find((k) => k.endsWith(`/${itemSlug}`));
  if (matchedKey && learnMoreData[matchedKey]) {
    return learnMoreData[matchedKey];
  }

  return null;
}
