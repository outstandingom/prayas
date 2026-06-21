// src/components/FloatingDonateButton.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, X, Utensils, GraduationCap, Leaf, HeartPulse, Home, Droplets, Dog, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const donationCauses = [
  { id: 'food', label: 'Food Security', icon: Utensils, color: 'text-orange-500' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-blue-500' },
  { id: 'health', label: 'Healthcare', icon: HeartPulse, color: 'text-red-500' },
  { id: 'environment', label: 'Environment', icon: Leaf, color: 'text-green-500' },
  { id: 'shelter', label: 'Shelter & Housing', icon: Home, color: 'text-yellow-600' },
  { id: 'water', label: 'Clean Water', icon: Droplets, color: 'text-cyan-500' },
  { id: 'animals', label: 'Animal Welfare', icon: Dog, color: 'text-purple-500' },
  { id: 'community', label: 'Community Support', icon: Users, color: 'text-indigo-500' },
]

// Marquee messages that rotate
const MARQUEE_MESSAGES = [
  '❤️ Donate for Food',
  '📚 Donate for Education',
  '🏥 Donate for Healthcare',
  '🌿 Donate for Environment',
  '🏠 Donate for Shelter',
  '💧 Donate for Clean Water',
  '🐾 Donate for Animals',
  '🤝 Donate for Community',
]

export default function FloatingDonateButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  // Rotate marquee messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % MARQUEE_MESSAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-4 w-56 mb-2"
          >
            <div className="grid grid-cols-2 gap-2">
              {donationCauses.map((cause) => (
                <Link
                  key={cause.id}
                  to={`/donate?cause=${cause.id}`}
                  onClick={close}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-[#FFF314]/10 transition-colors group"
                >
                  <cause.icon className={`w-6 h-6 ${cause.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs text-[#263238] mt-1 text-center leading-tight">{cause.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        className="bg-[#FFF314] text-[#263238] px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-3 group min-w-[180px] sm:min-w-[200px]"
        aria-label="Donate"
      >
        <Heart className="w-5 h-5 fill-current flex-shrink-0" />
        
        {/* Marquee Text */}
        <div className="overflow-hidden relative flex-1 h-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentMessageIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute left-0 top-0 text-sm font-medium whitespace-nowrap"
            >
              {MARQUEE_MESSAGES[currentMessageIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {isOpen ? (
          <X className="w-5 h-5 flex-shrink-0" />
        ) : (
          <span className="text-xs font-bold bg-[#263238] text-[#FFF314] px-2 py-0.5 rounded-full flex-shrink-0">
            DONATE
          </span>
        )}
      </button>
    </div>
  )
}
