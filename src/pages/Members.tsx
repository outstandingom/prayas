import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, X, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export interface MemberItem {
  id: string;
  name: string;
  role: string;
  photo: string;
  badge: string;
  badgeColor: string;
  bio: string;
  achievements: string[];
  focusAreas: string[];
}

const MEMBERS: MemberItem[] = [
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

export default function Members() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Background Scroll Lock when Modal is Open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [selectedMember]);

  const handleOpenMember = (member: MemberItem) => {
    setSelectedMember(member);
    setIsSidebarOpen(false);
    // Step 2: Open sidebar AFTER icon finishes expanding to full size on screen
    setTimeout(() => {
      setIsSidebarOpen(true);
    }, 360);
  };

  const handleCloseMember = () => {
    // Step 1: Close sidebar panel first
    setIsSidebarOpen(false);
    // Step 2: Shrink icon back into card after sidebar collapses
    setTimeout(() => {
      setSelectedMember(null);
    }, 320);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-[#263238] pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">

      {/* ─── Ambient Subtle Glow Accents ─── */}
      <div className="absolute top-20 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">

        {/* ─── Page Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4 max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#263238] tracking-tight leading-tight">
            {t('members.title', 'Our Dedicated')}{' '}
            <span className="text-red-600">
              {t('members.titleHighlight', 'Leadership Team')}
            </span>
          </h1>
          {/* Premium Underline Bar */}
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full shadow-xs" />
        </motion.div>

        {/* ─── Leadership Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 justify-center">
          {MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleOpenMember(member)}
              className="bg-white rounded-3xl py-6 px-6 sm:px-8 border border-gray-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer relative"
            >
              {/* Compact Circular Photo Frame with LayoutId Morphing */}
              <motion.div
                layoutId={`member-avatar-${member.id}`}
                transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.75 }}
                className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-gray-100 border-4 border-[#FFF314] shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-500 mb-4 shrink-0"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23F1F5F9"/%3E%3Ccircle cx="150" cy="120" r="55" fill="%23CBD5E1"/%3E%3Cpath d="M50 280c0-50 35-80 100-80s100 30 100 80" fill="%23CBD5E1"/%3E%3C/svg%3E';
                  }}
                />

                {/* Subtle Hover Cue Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-[11px] font-bold uppercase tracking-wider">
                  <span>View Details</span>
                </div>
              </motion.div>

              {/* Clean Centered Name & Role */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#263238] group-hover:text-red-600 transition-colors">
                  {member.name}
                </h3>

                <p className="text-[11px] sm:text-xs font-bold text-red-600 font-mono tracking-wider uppercase">
                  {member.role}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 group-hover:text-red-600 font-medium transition-colors">
                <span>Click to view profile</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Join / Volunteer CTA Banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-200/90 shadow-2xl text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-600/10 text-red-600 border border-red-600/20 flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-[#263238]">
            Want to lead or volunteer in our grassroots movement?
          </h2>

          <p className="text-gray-600 text-xs sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            We welcome passionate individuals, student ambassadors, and domain experts to join our team in delivering positive social change.
          </p>

          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/volunteer')}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Join As A Volunteer</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

      </div>

      {/* ─── FULLY RESPONSIVE MODAL & SIDEBAR DRAWER WITH BACKGROUND SCROLL LOCK ─── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleCloseMember}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer z-[999998]"
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-[999999] flex items-center justify-center md:justify-end p-3 sm:p-6 lg:p-8 pt-20 sm:pt-24 pb-6 overflow-hidden pointer-events-none">
        <div className="relative w-full max-w-lg md:max-w-3xl flex flex-col md:flex-row items-center md:items-stretch pointer-events-none md:mr-6 my-auto z-10">

          {/* Step 1: Circular Image Icon Expands FIRST To Display Position */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                layoutId={`member-avatar-${selectedMember.id}`}
                transition={{
                  type: 'spring',
                  damping: 24,
                  stiffness: 220,
                  mass: 0.75,
                }}
                className="w-36 h-36 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl shrink-0 border-4 border-[#FFF314] relative bg-gray-100 mx-auto md:mx-0 -mb-16 md:mb-0 md:-ml-36 self-center z-30 pointer-events-auto"
              >
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23F1F5F9"/%3E%3Ccircle cx="150" cy="120" r="55" fill="%23CBD5E1"/%3E%3Cpath d="M50 280c0-50 35-80 100-80s100 30 100 80" fill="%23CBD5E1"/%3E%3C/svg%3E';
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Sidebar Panel Slides Out AFTER Icon Has Expanded */}
          <AnimatePresence>
            {isSidebarOpen && selectedMember && (
              <motion.div
                initial={{ x: '100%', opacity: 0, scale: 0.95 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: '100%', opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-full bg-white rounded-3xl shadow-2xl p-5 sm:p-8 z-20 text-[#263238] flex flex-col max-h-[82vh] md:max-h-[78vh] mt-0 md:-ml-24 pt-16 md:pt-8 pointer-events-auto overflow-hidden"
              >
                {/* Yellow Circular Close Button */}
                <button
                  onClick={handleCloseMember}
                  className="absolute top-3 right-3 sm:top-5 sm:right-5 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FFF314] hover:bg-[#FBE000] text-black font-extrabold flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer z-40 border-2 border-white"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                </button>

                {/* Content Details */}
                <div className="flex-1 flex flex-col min-h-0 pt-1 pl-0 md:pl-28 overflow-hidden">
                  {/* Header Info */}
                  <div className="border-b border-gray-100 pb-3 mb-3 text-center md:text-left shrink-0">
                    <h2 className="text-xl sm:text-3xl font-extrabold text-[#263238] tracking-tight leading-tight">
                      {selectedMember.name}
                    </h2>

                    <p className="text-xs sm:text-sm font-extrabold text-amber-500 font-sans tracking-widest uppercase mt-1">
                      {selectedMember.role}
                    </p>
                  </div>

                  {/* Scrollable Text Content (With min-h-0 & touch-pan-y for 100% Mobile Touch Scroll Support) */}
                  <div className="overflow-y-auto overscroll-contain touch-pan-y min-h-0 flex-1 pr-1.5 sm:pr-2.5 space-y-4 text-gray-700 text-xs sm:text-sm leading-relaxed font-sans">
                    <p className="font-normal text-gray-700">
                      {selectedMember.bio}
                    </p>

                    {/* Achievements List */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5 justify-center md:justify-start">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Key Leadership Milestones</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedMember.achievements.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-800 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div className="pt-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 mb-2 text-center md:text-left">
                        Core Focus Areas
                      </h4>
                      <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                        {selectedMember.focusAreas.map((area, i) => (
                          <span key={i} className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Footer (Fixed at bottom) */}
                  <div className="pt-3 border-t border-gray-100 mt-2 flex justify-end shrink-0">
                    <button
                      onClick={() => {
                        handleCloseMember();
                        navigate('/contact');
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#263238] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Connect With Leadership</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
