// src/components/FloatingVolunteerButton.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function FloatingVolunteerButton() {
  return (
    <Link
      to="/volunteer"
      className="fixed bottom-24 left-4 sm:bottom-8 sm:left-8 z-50 flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-200 group"
    >
      {/* Circular icon */}
      <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-4 border-white/30 bg-[#263238] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <Heart className="w-9 h-9 text-[#FFF314] fill-[#FFF314]" />
        </motion.div>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm font-semibold text-[#263238] bg-[#FFF314] px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap"
      >
        Become a Volunteer
      </motion.div>
    </Link>
  )
}
