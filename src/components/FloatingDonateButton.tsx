// src/components/FloatingDonateButton.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Define all messages with their image URLs
const MARQUEE_MESSAGES = [
  { 
    id: 'birds',
    text: 'Donate for Birds',
    imageUrl: 'https://i.ibb.co/d01n9H1K/In-Shot-20260621-143002419.png'
  },
  { 
    id: 'education',
    text: 'Donate for Education',
    imageUrl: 'https://i.ibb.co/zWtRCgG0/In-Shot-20260621-143300328.png'
  },
  { 
    id: 'water',
    text: 'Donate for Water',
    imageUrl: 'https://i.ibb.co/5xjFCftw/In-Shot-20260621-143509552.png'
  },
  { 
    id: 'nature',
    text: 'Donate for Nature',
    imageUrl: 'https://i.ibb.co/your-nature-image.png'
  },
  { 
    id: 'food',
    text: 'Donate for Food',
    imageUrl: 'https://i.ibb.co/your-food-image.png'
  },
  { 
    id: 'health',
    text: 'Donate for Healthcare',
    imageUrl: 'https://i.ibb.co/your-health-image.png'
  },
  { 
    id: 'shelter',
    text: 'Donate for Shelter',
    imageUrl: 'https://i.ibb.co/your-shelter-image.png'
  },
]

export default function FloatingDonateButton() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Rotate messages every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MARQUEE_MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const currentMessage = MARQUEE_MESSAGES[currentIndex]

  return (
    <Link
      to={`/donate?cause=${currentMessage.id}`}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-200"
    >
      {/* Circular Image */}
      <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-4 border-white/30">
        <img 
          src={currentMessage.imageUrl} 
          alt={currentMessage.text}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80/FFF314/263238?text=❤️'
          }}
        />
      </div>
      
      {/* Text Below Image - Now with #FFF314 background */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        className="text-sm font-semibold text-[#263238] bg-[#FFF314] px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap"
      >
        {currentMessage.text}
      </motion.div>
    </Link>
  )
}
