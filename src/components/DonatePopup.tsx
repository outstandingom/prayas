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

            {/* Header with Children Image - No text overlay */}
            <div className="relative h-80 sm:h-96 md:h-[32rem] rounded-t-2xl overflow-hidden flex-shrink-0 bg-[#263238]">
              <img
                src="/IMG-20.jpg"
                alt="Children smiling"
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: 'center 20%' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80'
                }}
              />
              {/* Gradient overlay only for visual depth, no text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content - Only Donate Button and "Maybe later" */}
            <div className="p-6 pb-8 text-center">
              <Link
                to="/donate"
                onClick={handleClose}
                className="w-full py-4 bg-[#FFF314] text-[#263238] rounded-lg font-bold text-lg hover:bg-[#FFF314]/90 transition-all shadow-lg shadow-[#FFF314]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-current" />
                Donate Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <button
                type="button"
                onClick={handleClose}
                className="mt-5 text-sm text-[#263238]/40 hover:text-[#263238]/60 transition-colors"
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
