// src/pages/Certifications.tsx
import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle } from 'lucide-react';

// Replace with actual certifications and achievements
const CERTIFICATIONS = [
  {
    id: 1,
    title: 'NGO Registration Certificate',
    description: 'Registered under the Societies Registration Act, 1860.',
    year: '2015',
    image: '/images/certificates/registration.jpg',
  },
  {
    id: 2,
    title: '12A Certification',
    description: 'Exemption under Section 12A of the Income Tax Act for NGO donations.',
    year: '2016',
    image: '/images/certificates/12a.jpg',
  },
  {
    id: 3,
    title: '80G Certification',
    description: 'Donors can claim tax deductions under Section 80G of the Income Tax Act.',
    year: '2017',
    image: '/images/certificates/80g.jpg',
  },
  {
    id: 4,
    title: 'CSR Registration',
    description: 'Approved for Corporate Social Responsibility (CSR) funding.',
    year: '2018',
    image: '/images/certificates/csr.jpg',
  },
  {
    id: 5,
    title: 'FCRA Registration',
    description: 'Authorized to receive foreign contributions and donations.',
    year: '2019',
    image: '/images/certificates/fcra.jpg',
  },
  {
    id: 6,
    title: 'Best NGO Award 2022',
    description: 'Recognized for outstanding work in education and community health.',
    year: '2022',
    image: '/images/certificates/award-2022.jpg',
  },
  {
    id: 7,
    title: 'UN SDG Partnership',
    description: 'Partnered with the United Nations for Sustainable Development Goals (SDGs).',
    year: '2023',
    image: '/images/certificates/un-sdg.jpg',
  },
  {
    id: 8,
    title: 'ISO 9001:2015 Certification',
    description: 'Quality management systems certified for NGO operations.',
    year: '2024',
    image: '/images/certificates/iso-9001.jpg',
  },
];

export default function Certifications() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 mb-4">
            <Award className="w-8 h-8 text-[#FFF314]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">
            Certifications & <span className="text-[#FFF314]">Achievements</span>
          </h1>
          <p className="text-[#263238]/60 text-sm mt-2 max-w-2xl mx-auto">
            Recognitions that validate our commitment to transparency, quality, and social impact.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-[#FFF314]/10 flex flex-col"
            >
              <div className="aspect-video overflow-hidden bg-[#FFF314]/10">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => (e.currentTarget.src = '/images/placeholder-cert.jpg')}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-[#263238]">{cert.title}</h3>
                  <span className="flex items-center gap-1 text-xs font-medium text-[#FFF314]">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.year}
                  </span>
                </div>
                <p className="text-sm text-[#263238]/60 mt-2 leading-relaxed flex-1">
                  {cert.description}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#263238]/40">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                  Verified
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
