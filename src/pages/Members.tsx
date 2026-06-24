// src/pages/Members.tsx
import { motion } from 'framer-motion';
import { Users, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Member IDs – all translatable fields (name, role, bio) are fetched via i18n
const MEMBER_IDS = ['rekha', 'sudha', 'pooja', 'anjali', 'amit', 'dharmendra', 'neetu'];

// Static contact info (email and phone) – these are the same in all languages
const MEMBER_CONTACTS: Record<string, { email: string; phone: string }> = {
  rekha: { email: 'info@prayas.org', phone: '+91 7000705284' },
  sudha: { email: 'info@prayas.org', phone: '+91 9755555916' },
  pooja: { email: 'info@prayas.org', phone: '+91 8827764170' },
  anjali: { email: 'info@prayas.org', phone: '+91 9425333116' },
  amit: { email: 'info@prayas.org', phone: '+91 8878841115' },
  dharmendra: { email: 'info@prayas.org', phone: '+91 9977980011' },
  neetu: { email: 'info@prayas.org', phone: '+91 9993052350' },
};

export default function Members() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 mb-4">
            <Users className="w-8 h-8 text-[#FFF314]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">
            {t('members.title', 'Our')} <span className="text-[#FFF314]">{t('members.titleHighlight', 'Team')}</span>
          </h1>
          <p className="text-[#263238]/60 text-sm mt-2 max-w-2xl mx-auto">
            {t('members.subtitle', 'Meet the governing body of Prayas Samaj Sevi Sanstha, committed to serving the community.')}
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMBER_IDS.map((id, index) => {
            const contact = MEMBER_CONTACTS[id];
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-[#FFF314]/10"
              >
                <div className="aspect-square overflow-hidden bg-[#FFF314]/10">
                  <img
                    src={`/images/team/${id}.jpg`}
                    alt={t(`members.list.${id}.name`)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => (e.currentTarget.src = '/images/placeholder-team.jpg')}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#263238]">{t(`members.list.${id}.name`)}</h3>
                  <p className="text-sm font-medium text-[#FFF314]">{t(`members.list.${id}.role`)}</p>
                  <p className="text-sm text-[#263238]/60 mt-2 leading-relaxed">{t(`members.list.${id}.bio`)}</p>
                  <div className="mt-3 space-y-1.5">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-sm text-[#263238]/60 hover:text-[#263238] transition-colors"
                    >
                      <Mail className="w-4 h-4" /> {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-sm text-[#263238]/60 hover:text-[#263238] transition-colors"
                    >
                      <Phone className="w-4 h-4" /> {contact.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
