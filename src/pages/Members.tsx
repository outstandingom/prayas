// src/pages/Members.tsx
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MEMBERS = [
  {
    id: 'rekha',
    name: 'Rekha Thakkar',
    role: 'President',
    photo: '/images/team/rekha.jpg',
  },
  {
    id: 'pooja',
    name: 'Pooja Dave',
    role: 'Secretary',
    photo: '/images/team/pooja.jpg',
  },
  {
    id: 'harsh',
    name: 'Harsh Upadhyay',
    role: 'Executive Member',
    photo: '/images/team/harsh.jpg',
  },
];

export default function Members() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 mb-4">
            <Users className="w-8 h-8 text-[#263238]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">
            {t('members.title', 'Our')}{' '}
            <span className="text-[#FFF314]">{t('members.titleHighlight', 'Team')}</span>
          </h1>
          <p className="text-[#263238]/60 text-sm mt-2 max-w-2xl mx-auto">
            {t('members.subtitle', 'Meet the governing body of Prayas Samaj Sevi Sanstha, committed to serving the community.')}
          </p>
        </div>

        {/* Members Grid – centred row of 3 */}
        <div className="flex flex-wrap justify-center gap-8">
          {MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#FFF314]/10 w-64 flex flex-col"
            >
              {/* Photo */}
              <div className="w-full aspect-square overflow-hidden bg-[#FFF314]/10">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => (e.currentTarget.src = '/images/placeholder-team.jpg')}
                />
              </div>
              {/* Name & Role */}
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-[#263238]">{member.name}</h3>
                <p className="text-sm font-semibold text-[#FFF314] mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
