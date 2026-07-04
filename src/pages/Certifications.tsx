// src/pages/Certifications.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const DOCUMENTS = [
  {
    id: 1,
    name: 'Form 10AB Approval',
    description: 'Income Tax exemption approval under Section 10AB',
    type: 'pdf',
    logo: '/10ab.png',
    fallbackIcon: '📄',
    color: 'from-red-50 to-red-100',
    borderColor: 'border-red-200',
    labelColor: 'text-red-600',
  },
  {
    id: 2,
    name: 'CSR-1 Registration',
    description: 'Corporate Social Responsibility registration letter AB5600296',
    type: 'pdf',
    logo: '/CSR.png',
    fallbackIcon: '🏛️',
    color: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    labelColor: 'text-blue-600',
  },
  {
    id: 3,
    name: 'List of Members',
    description: 'Official registered list of executive committee members',
    type: 'pdf',
    logo: '/documents/logos/members.png',
    fallbackIcon: '👥',
    color: 'from-green-50 to-green-100',
    borderColor: 'border-green-200',
    labelColor: 'text-green-600',
  },
  {
    id: 4,
    name: 'Prayas Bylaws',
    description: 'Constitutional bylaws and governing rules of the organisation',
    type: 'pdf',
    logo: '/documents/logos/bylaws.png',
    fallbackIcon: '📋',
    color: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    labelColor: 'text-purple-600',
  },
  {
    id: 5,
    name: 'Samiti Panjiyan',
    description: 'Society registration certificate (Samiti Panjiyan)',
    type: 'image',
    logo: '/documents/samatipanjayan.jpeg',
    fallbackIcon: '📜',
    color: 'from-amber-50 to-amber-100',
    borderColor: 'border-amber-200',
    labelColor: 'text-amber-700',
  },
];

export default function Certifications() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">
            {t('documents.title', 'Certifications &')}{' '}
            <span className="text-[#FFF314]">
              {t('documents.titleHighlight', 'Records')}
            </span>
          </h1>
          <p className="text-[#263238]/60 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            {t(
              'documents.subtitle',
              'Official documents, registrations, and important records of Prayas Samaj Sevi Sanstha. Contact us if you need a copy of any document.'
            )}
          </p>
        </div>

        {/* Document cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border ${doc.borderColor} overflow-hidden flex flex-col`}
            >
              {/* Logo area – now with a circular container */}
              <div className={`bg-gradient-to-br ${doc.color} flex items-center justify-center p-4 min-h-[140px] relative`}>
                {/* Circular logo wrapper */}
                <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden border-2 border-white/80">
                  {doc.id === 5 ? (
                    // For image documents: show a round thumbnail
                    <>
                      <img
                        src={doc.logo}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // On error: hide image and show fallback icon
                          const img = e.currentTarget;
                          img.style.display = 'none';
                          const parent = img.parentElement!;
                          const fallbackSpan = parent.querySelector('.fallback-icon');
                          if (fallbackSpan) fallbackSpan.classList.remove('hidden');
                        }}
                      />
                      <span className="fallback-icon hidden text-4xl">{doc.fallbackIcon}</span>
                    </>
                  ) : (
                    // For PDF documents: show the fallback icon inside the circle
                    <span className="text-5xl">{doc.fallbackIcon}</span>
                  )}
                </div>

                {/* Small label (PDF / Image) – placed at bottom of the gradient area */}
                <span className={`absolute bottom-2 text-[10px] font-medium ${doc.labelColor} bg-white/80 px-2 py-0.5 rounded-full`}>
                  {doc.type === 'pdf' ? 'PDF' : 'Image'}
                </span>
              </div>

              {/* Card content – unchanged */}
              <div className="p-5 flex-1 flex flex-col gap-2">
                <h3 className="text-base font-bold text-[#263238] leading-snug">
                  {t(`documents.list.${doc.id}.name`, doc.name)}
                </h3>
                <p className="text-xs text-[#263238]/55 leading-relaxed flex-1">
                  {doc.description}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-[#263238]/50 italic">
                    📩 {t('documents.actions.contactUs', 'Contact us to request a copy of this document.')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center bg-[#263238] rounded-2xl p-8 text-white"
        >
          <p className="text-lg font-semibold mb-2">Need a copy of any document?</p>
          <p className="text-white/60 text-sm mb-5">
            Reach out to us and we will share the required documents promptly.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FFF314] text-[#263238] font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform text-sm"
          >
            Contact Us →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
