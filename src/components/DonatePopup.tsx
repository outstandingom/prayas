// src/components/DonatePopup.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DonatePopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function DonatePopup({ isOpen, onClose }: DonatePopupProps) {
  // Lock body scroll when popup is open
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

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="donate-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <motion.div
            key="donate-popup-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 10000 }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-200 hover:border-[#FFF314] cursor-pointer"
              aria-label="Close donation popup"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF314]/10 mb-6"
              >
                <Heart className="w-10 h-10 text-[#FFF314] fill-[#FFF314]" />
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-[#263238] mb-3">
                Support Our Cause
              </h2>

              {/* Tagline */}
              <p className="text-[#263238]/60 text-sm mb-6">
                "Every contribution, no matter how small, creates a ripple of change."
              </p>

              {/* Donate Button */}
              <Link
                to="/donate"
                onClick={handleClose}
                className="w-full py-3.5 bg-[#FFF314] text-[#263238] rounded-lg font-bold text-lg hover:bg-[#FFF314]/90 transition-all shadow-lg shadow-[#FFF314]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-current" />
                Donate Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 text-sm text-[#263238]/40 hover:text-[#263238]/60 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
