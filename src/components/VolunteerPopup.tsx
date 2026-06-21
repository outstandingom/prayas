// src/components/VolunteerPopup.tsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ArrowRight, Users } from 'lucide-react'

interface VolunteerPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function VolunteerPopup({ isOpen, onClose }: VolunteerPopupProps) {
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
    // Redirect to external volunteer page
    window.location.href = 'https://prayassamajsevisanstha.org/volunteer'
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="volunteer-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <motion.div
            key="volunteer-popup-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl mt-16 sm:mt-20 md:mt-24 lg:mt-28"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 100000 }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-200 hover:border-[#FFF314] cursor-pointer"
              aria-label="Close volunteer popup"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Header with Volunteer Image */}
            <div className="relative h-64 sm:h-80 md:h-96 rounded-t-2xl overflow-hidden flex-shrink-0 bg-[#263238]">
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
            <div className="p-4 sm:p-6 pb-6 sm:pb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFF314]/10 flex items-center justify-center">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFF314]" />
                </div>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-3">
                Join Our Mission
              </h2>
              
              <p className="text-[#000000] text-sm sm:text-base md:text-lg italic leading-relaxed px-2 mb-2">
                <span className="font-bold">Be the change</span> you wish to see in the world.
              </p>
              
              <p className="text-[#263238]/60 text-sm mb-6">
                Join our community of passionate volunteers and make a real difference in people's lives.
              </p>

              <button
                onClick={handleVolunteerClick}
                className="w-full py-3 sm:py-4 bg-[#FFF314] text-[#263238] rounded-lg font-bold text-base sm:text-lg hover:bg-[#FFF314]/90 transition-all shadow-lg shadow-[#FFF314]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                Become a Volunteer
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
