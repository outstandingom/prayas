// src/components/TeamPreview.tsx
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// ─── Only the three actual team members ───
const teamMembers = [
  {
    name: 'Rekha Thakkar',
    role: 'President',
    image: '/images/team/rekha.jpg',
  },
  {
    name: 'Pooja Dave',
    role: 'Secretary',
    image: '/images/team/pooja.jpg',
  },
  {
    name: 'Harsh Upadhyay',
    role: 'Executive Member',
    image: '/images/team/harsh.jpg',
  },
]

export default function TeamPreview() {
  const { t } = useTranslation()

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] mt-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('team.title', 'Our Leadership')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-3 rounded-full shadow-xs" />

        </motion.div>

        {/* ─── Centered row of 3 members ─── */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center w-36 sm:w-44"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full overflow-hidden border-4 border-red-600/20 shadow-lg mb-3 bg-[#263238]/10 flex items-center justify-center">
                <img
                  src={member.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Crect width="128" height="128" fill="%23263238"/%3E%3Ccircle cx="64" cy="48" r="24" fill="%23DC2626"/%3E%3Cpath d="M24 112c0-24 16-36 40-36s40 12 40 36" fill="%23DC2626"/%3E%3C/svg%3E'}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Crect width="128" height="128" fill="%23263238"/%3E%3Ccircle cx="64" cy="48" r="24" fill="%23DC2626"/%3E%3Cpath d="M24 112c0-24 16-36 40-36s40 12 40 36" fill="%23DC2626"/%3E%3C/svg%3E'
                  }}
                />
              </div>
              <h4 className="font-extrabold text-[#263238] text-base sm:text-lg">{member.name}</h4>
              <p className="text-red-600 font-semibold text-xs sm:text-sm font-mono mt-0.5">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/about/members"
            className="inline-flex items-center gap-2 text-[#263238] font-bold hover:text-red-600 transition-colors"
          >
            View Full Leadership Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
