// src/components/FloatingVolunteerButton.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function FloatingVolunteerButton() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

 return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        // Increased bottom values to move it much higher above the donate button
        className="fixed bottom-64 right-8 sm:bottom-48 sm:right-16 z-50 flex flex-col items-center gap-1.5"
      >
        <Link
          to="/volunteer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#263238] shadow-2xl border-4 border-white/30 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FFF314] focus:ring-offset-2"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <Heart className="h-6 w-6 text-[#FFF314] fill-[#FFF314]" />
          </motion.div>
        </Link>

        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs font-semibold text-[#263238] bg-[#FFF314] px-3 py-1 rounded-full shadow-md whitespace-nowrap"
        >
          Volunteer
        </motion.span>

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setVisible(false)
          }}
          className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700 shadow-md transition-colors hover:bg-gray-300 hover:text-gray-900 focus:outline-none"
          aria-label="Remove volunteer button"
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
