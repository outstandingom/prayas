// src/data/teamData.ts

export interface MemberItem {
  id: string;
  name: string;
  role: string;
  photo: string;
  badge?: string;
  badgeColor?: string;
  bio?: string;
  achievements?: string[];
  focusAreas?: string[];
  updatedAt?: string;
}

export const DEFAULT_TEAM_MEMBERS: MemberItem[] = [
  {
    id: 'rekha',
    name: 'Rekha Thakkar',
    role: 'President & Founder Trustee',
    photo: '/images/team/rekha.jpg',
    badge: 'Executive Governing Body',
    badgeColor: 'bg-red-100 text-red-700 border-red-300',
    bio: 'Pioneering grassroots social welfare, education for rural children, and women empowerment initiatives across India for over 20 years. Rekha believes that rural communities are the backbone of self-reliant development.',
    achievements: [
      'Founded Prayas Social Welfare Society in 2001',
      'Spearheaded 50+ village adoption programs across India',
      'Recipient of multiple state social service honors & awards',
    ],
    focusAreas: ['Women Livelihood', 'Rural Development', 'Child Welfare'],
  },
  {
    id: 'pooja',
    name: 'Pooja Dave',
    role: 'Secretary & Operations Lead',
    photo: '/images/team/pooja.jpg',
    badge: 'Operations & Strategy',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    bio: 'Directing community outreach, free health camp logistics, Sabji Wali Didi micro-entrepreneurship programs, and volunteer coordination. Pooja oversees day-to-day ground operations ensuring maximum impact and transparency.',
    achievements: [
      'Managed 100+ free medical & health checkup camps',
      'Empowered 1,200+ women vegetable vendors with UPI & micro-loans',
      'Coordinates nationwide volunteer mobilization & logistics',
    ],
    focusAreas: ['Health Camps', 'Micro-Vendor Support', 'Volunteer Network'],
  },
  {
    id: 'harsh',
    name: 'Harsh Upadhyay',
    role: 'Executive Member & Youth Lead',
    photo: '/images/team/harsh.jpg',
    badge: 'Youth & Tech Initiatives',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bio: 'Spearheading digital literacy initiatives, youth skill development centers, and environmental reforestation projects across adopted villages. Harsh brings technology and youth energy to Prayas grassroots missions.',
    achievements: [
      'Established 45+ Digital Literacy & Smart Labs in rural schools',
      'Lead coordinator for Kargil Vatika tree plantation drives',
      'Drives youth engagement & skill development bootcamps',
    ],
    focusAreas: ['Digital Education', 'Kargil Vatika Reforestation', 'Youth Mentorship'],
  },
  {
    id: 'nasera',
    name: 'नासेरा मंसूरी',
    role: 'Media & Outreach Lead',
    photo: '/images/team/nasera.png',
    badge: 'Media & Communications',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
    bio: 'मैं नासेरा मंसूरी, बीते 14 वर्ष से इंदौर में प्रिंट मीडिया पत्रकार हूं। इन वर्षों में मैंने समाज के विभिन्न पहलुओं, आम लोगों की कहानियों और बदलते शहर को अपनी लेखनी के माध्यम से आम जन के सामने लाने का प्रयास किया है। अब, एक नए कदम के रूप में, मैं इस एनजीओ के साथ जुड़कर अपने इसी अनुभव और संवेदनशीलता को समाज सेवा की दिशा में आगे बढ़ा रही हूं। यह सफर मेरे लिए केवल पेशेवर बदलाव नहीं, बल्कि एक जिम्मेदारी है कि मैं उन लोगों तक पहुंच सकूं और उनकी आवाज बन सकूं, जो अपने लिए सामने नहीं आ सकते। इस प्लेटफॉर्म की मदद से जागरूकता, संवेदनशीलता और सकारात्मक बदलाव सामने लाने में मदद मिलेगी।',
    achievements: [
      '14 वर्षों से इंदौर में प्रिंट मीडिया पत्रकारिता का अनुभव',
      'समाज के विभिन्न पहलुओं और आम लोगों की कहानियों को सामने लाना',
      'एनजीओ के माध्यम से जागरूकता और सकारात्मक बदलाव की दिशा में कार्य',
    ],
    focusAreas: ['Print Media', 'Social Awareness', 'Community Voice'],
  },
  {
    id: 'ruchira',
    name: 'Ruchira',
    role: 'Corporate Partnerships Lead',
    photo: '/images/team/ruchira.png',
    badge: 'Corporate & Strategy',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    bio: 'With a decade of experience in the corporate world, I have realized that this beautiful world truly belongs to the ‘Givers’ and not the ‘Takers’. An NGO platform became the first step in my journey of ‘self discovery’, where I found “myself.” Because when you give, whether it is the smallest portion of your time, knowledge, money, support, or in any form, you ‘grow’, you ‘live’, you ‘smile’ and ‘you’ become the reason for others to ‘Grow’. -Ruchira',
    achievements: [
      'A decade of professional experience in the corporate world',
      'Driving corporate partnerships and CSR strategic initiatives',
      'Fostering self-discovery and community empowerment programs',
    ],
    focusAreas: ['Corporate Social Responsibility', 'Partnerships', 'Community Growth'],
  },
  {
    id: 'harsh_mehta',
    name: 'Harsh Mehta',
    role: 'Media Production & Animal Rights Lead',
    photo: '/images/team/harsh_mehta.jpg',
    badge: 'Media & Advocacy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bio: 'I am Harsh Mehta. I can call me a free soul. I am a professional photographer & cinematographer. Having more than 7 years of experience in this field. Apart from my work, I love traveling, writing, making new friends. Since April 2023, I have been following vegan lifestyle and also do organise animal rights campaigns where we make people aware about their direct/indirect participation in animal cruelty. Protecting nature and working towards betterment of it is also what I am passionate about. I follow and encourage minimalistic lifestyle. I do run marathons and help people in their wellness & fitness journey. Be kind with every kind! :)',
    achievements: [
      '7+ years of experience in professional photography & cinematography',
      'Organizer of local animal rights & vegan awareness campaigns',
      'Active marathoner advocating for wellness, fitness, and minimalist living',
    ],
    focusAreas: ['Photography & Film', 'Animal Rights Campaigns', 'Nature Protection'],
  },
];

const STORAGE_KEY = 'prayas_team_members';

export const getStoredTeamMembers = (): MemberItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load team members:', e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TEAM_MEMBERS));
  return DEFAULT_TEAM_MEMBERS;
};

export const saveStoredTeamMembers = (newList: MemberItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    window.dispatchEvent(new Event('prayas-team-updated'));
  } catch (e) {
    console.error('Failed to save team members:', e);
  }
};
