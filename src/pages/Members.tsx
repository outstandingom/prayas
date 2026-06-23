// src/pages/Members.tsx
import { motion } from 'framer-motion';
import { Users, Mail, Phone } from 'lucide-react';

// Replace with actual team member data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Pooja Dave',
    role: 'Founder & Trustee',
    bio: 'Passionate social worker with 15+ years of experience in community development.',
    email: 'pooja@prayas.org',
    phone: '+91 98765 43210',
    image: '/images/team/pooja-dave.jpg',
  },
  {
    id: 2,
    name: 'Raj Parmar',
    role: 'Co-Founder & Secretary',
    bio: 'Dedicated to empowering rural communities through education and health initiatives.',
    email: 'raj@prayas.org',
    phone: '+91 98765 43211',
    image: '/images/team/raj-parmar.jpg',
  },
  {
    id: 3,
    name: 'Om Uikey',
    role: 'Co-Founder & Technical Lead',
    bio: 'Technology enthusiast using digital tools to amplify social impact.',
    email: 'om@prayas.org',
    phone: '+91 98765 43212',
    image: '/images/team/om-uikey.jpg',
  },
  {
    id: 4,
    name: 'Anita Sharma',
    role: 'Program Manager',
    bio: 'Expert in designing and implementing sustainable community programs.',
    email: 'anita@prayas.org',
    phone: '+91 98765 43213',
    image: '/images/team/anita-sharma.jpg',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Field Coordinator',
    bio: 'Ground-level organizer ensuring programs reach the most vulnerable communities.',
    email: 'vikram@prayas.org',
    phone: '+91 98765 43214',
    image: '/images/team/vikram-singh.jpg',
  },
  {
    id: 6,
    name: 'Meera Patel',
    role: 'Health & Nutrition Specialist',
    bio: 'Registered nurse with a focus on maternal and child health in rural areas.',
    email: 'meera@prayas.org',
    phone: '+91 98765 43215',
    image: '/images/team/meera-patel.jpg',
  },
];

export default function Members() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 mb-4">
            <Users className="w-8 h-8 text-[#FFF314]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">
            Our <span className="text-[#FFF314]">Team</span>
          </h1>
          <p className="text-[#263238]/60 text-sm mt-2 max-w-2xl mx-auto">
            Meet the dedicated individuals behind Prayas Samaj Sevi Sanstha, working tirelessly to create positive change.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-[#FFF314]/10"
            >
              <div className="aspect-square overflow-hidden bg-[#FFF314]/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => (e.currentTarget.src = '/images/placeholder-team.jpg')}
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#263238]">{member.name}</h3>
                <p className="text-sm font-medium text-[#FFF314]">{member.role}</p>
                <p className="text-sm text-[#263238]/60 mt-2 leading-relaxed">{member.bio}</p>
                <div className="mt-3 space-y-1.5">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm text-[#263238]/60 hover:text-[#263238] transition-colors"
                  >
                    <Mail className="w-4 h-4" /> {member.email}
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-sm text-[#263238]/60 hover:text-[#263238] transition-colors"
                  >
                    <Phone className="w-4 h-4" /> {member.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
