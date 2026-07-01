// src/components/VolunteerPopup.tsx
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ArrowRight, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface VolunteerPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function VolunteerPopup({ isOpen, onClose }: VolunteerPopupProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  const handleVolunteerClick = () => {
    onClose()
    window.location.href = 'https://prayassamajsevisanstha.org/volunteer'
  }

  // Portal rendering
  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="volunteer-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            key="volunteer-popup-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-sm overflow-y-auto bg-white rounded-2xl shadow-2xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 100000 }}
          >
            {/* Close Button – higher z-index to stay above everything */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-2 right-2 z-[100001] p-1.5 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-200 hover:border-[#FFF314] cursor-pointer"
              aria-label="Close volunteer popup"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>

            {/* Header with Volunteer Image */}
            <div className="relative h-48 sm:h-56 rounded-t-2xl overflow-hidden flex-shrink-0 bg-[#263238]">
              <img
                src="/IMG-21.jpg"
                alt="Volunteers working together"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&q=80'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 pb-5 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-[#FFF314]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#FFF314]" />
                </div>
              </div>
              
              <h2 className="text-lg font-bold text-[#263238] mb-2">
                {t('volunteer.popup.title', 'Join Our Mission')}
              </h2>
              
              <p className="text-[#000000] text-sm italic leading-relaxed px-1 mb-1">
                <span className="font-bold">{t('volunteer.popup.quote1', 'Be the change')}</span> {t('volunteer.popup.quote2', 'you wish to see in the world.')}
              </p>
              
              <p className="text-[#263238]/60 text-xs mb-4">
                {t('volunteer.popup.desc', "Join our community of passionate volunteers and make a real difference in people's lives.")}
              </p>

              <button
                onClick={handleVolunteerClick}
                className="w-full py-2.5 bg-[#FFF314] text-[#263238] rounded-lg font-bold text-sm hover:bg-[#FFF314]/90 transition-all shadow-lg shadow-[#FFF314]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current" />
                {t('volunteer.popup.cta', 'Become a Volunteer')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body // Portal target
  )
}
