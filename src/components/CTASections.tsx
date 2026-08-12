// src/components/CTASections.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Users, Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function CTASections() {
  const { t } = useTranslation()

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('cta.title', 'Get Involved')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-4 rounded-full shadow-xs" />

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Donate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#F8FAFC] p-8 rounded-2xl shadow-md text-center border-t-4 border-[#FFF314]"
          >
            <div className="bg-[#FFF314]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#263238]" />
            </div>
            <h3 className="text-xl font-bold text-[#263238] mb-2">Donate Now</h3>
            <p className="text-[#263238]/70 text-sm leading-relaxed mb-6">
              Every contribution, big or small, helps us reach more communities.
            </p>
            <Link
              to="/donate"
              className="inline-block bg-[#263238] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#263238]/90 transition-colors"
            >
              Donate
            </Link>
          </motion.div>

          {/* Volunteer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#F8FAFC] p-8 rounded-2xl shadow-md text-center border-t-4 border-[#FFF314]"
          >
            <div className="bg-[#FFF314]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#263238]" />
            </div>
            <h3 className="text-xl font-bold text-[#263238] mb-2">Volunteer</h3>
            <p className="text-[#263238]/70 text-sm leading-relaxed mb-6">
              Share your time and skills to make a difference in people's lives.
            </p>
            <Link
              to="/volunteer"
              className="inline-block bg-[#263238] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#263238]/90 transition-colors"
            >
              Join Us
            </Link>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#F8FAFC] p-8 rounded-2xl shadow-md text-center border-t-4 border-[#FFF314]"
          >
            <div className="bg-[#FFF314]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[#263238]" />
            </div>
            <h3 className="text-xl font-bold text-[#263238] mb-2">Contact Us</h3>
            <p className="text-[#263238]/70 text-sm leading-relaxed mb-6">
              Have questions? Reach out – we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#263238] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#263238]/90 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
