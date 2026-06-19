// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ImpactCounter from '../components/ImpactCounter'
import ScrollStory from '../components/ScrollStory'
import ImpactCategories from '../components/ImpactCategories'
import ImageCarousel from '../components/ImageCarousel'
import VolunteerPopup from '../components/VolunteerPopup'
import DonatePopup from '../components/DonatePopup'

export default function Home() {
  const [showPopup, setShowPopup] = useState(true)

  useEffect(() => {
    // Show popup after 2 seconds when page loads
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full">
      <HeroSection />
      <ImpactCounter />
      <ScrollStory />
      <ImpactCategories />
      <ImageCarousel />

      {/* Popup - Shows automatically */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#00897B] to-[#4DB6AC] p-6 text-white text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Welcome to Prayas</h2>
              <p className="text-white/80 text-sm">Samaj Sevi Sanstha</p>
            </div>

            {/* Options */}
            <div className="p-6 space-y-3">
              <p className="text-[#263238]/70 text-center mb-4">
                Join us in making a difference. How would you like to help?
              </p>

              <VolunteerPopup 
                isOpen={false} 
                onClose={() => {}} 
              />
              <DonatePopup 
                isOpen={false} 
                onClose={() => {}} 
              />

              <button
                onClick={() => setShowPopup(false)}
                className="w-full py-2 text-[#263238]/40 hover:text-[#263238] text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
