// src/components/FloatingDonateButton.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, X, Utensils, GraduationCap, Leaf, HeartPulse, Home, Droplets, Dog, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Replace these with your actual image URLs
const CAUSE_IMAGES = {
  birds: 'https://i.ibb.co/d01n9H1K/In-Shot-20260621-143002419.png',
  education: 'https://i.ibb.co/zWtRCgG0/In-Shot-20260621-143300328.png',
  water: 'https://i.ibb.co/5xjFCftw/In-Shot-20260621-143509552.png',
  // Add more images as needed
}

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

// Marquee messages with image icons instead of emojis
const MARQUEE_MESSAGES = [
  { 
    icon: '🌿', 
    text: 'Donate for Nature',
    imageUrl: null // You can add image URLs for specific messages
  },
  { 
    icon: '✍️', 
    text: 'Donate for Education',
    imageUrl: CAUSE_IMAGES.education // This will use your custom image
  },
  { 
    icon: '🍲', 
    text: 'Donate for Food',
    imageUrl: null
  },
  { 
    icon: '🏥', 
    text: 'Donate for Healthcare',
    imageUrl: null
  },
  { 
    icon: '🏠', 
    text: 'Donate for Shelter',
    imageUrl: null
  },
  { 
    icon: '💧', 
    text: 'Donate for Water',
    imageUrl: CAUSE_IMAGES.water // This will use your custom image
  },
  { 
    icon: '🐾', 
    text: 'Donate for Animals',
    imageUrl: null
  },
  { 
    icon: '🕊️', 
    text: 'Donate for Birds',
    imageUrl: CAUSE_IMAGES.birds // This will use your custom image
  },
]

export default function FloatingDonateButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Rotate messages every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MARQUEE_MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  const currentMessage = MARQUEE_MESSAGES[currentIndex]

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
        className="bg-[#FFF314] text-[#263238] px-4 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2.5 group"
        aria-label="Donate"
      >
        {/* Icon - Use image if available, otherwise fallback to emoji */}
        {currentMessage.imageUrl ? (
          <img 
            src={currentMessage.imageUrl} 
            alt={currentMessage.text}
            className="w-6 h-6 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <span className="text-xl leading-none">{currentMessage.icon}</span>
        )}
        
        {/* Rotating Text */}
        <div className="overflow-hidden relative h-6 min-w-[140px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.4,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="absolute left-0 top-0 text-sm font-medium whitespace-nowrap"
            >
              {currentMessage.text}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Small heart indicator */}
        <Heart className="w-4 h-4 fill-current flex-shrink-0 opacity-60" />
      </button>
    </div>
  )
}
