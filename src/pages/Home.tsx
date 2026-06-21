// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import ImpactCounter from '../components/ImpactCounter'
import ScrollStory from '../components/ScrollStory'
import ImpactCategories from '../components/ImpactCategories'
import ImageCarousel from '../components/ImageCarousel'
import VolunteerPopup from '../components/VolunteerPopup'
import DonatePopup from '../components/DonatePopup'

export default function Home() {
  const [showDonatePopup, setShowDonatePopup] = useState(false)
  const [showVolunteerPopup, setShowVolunteerPopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDonatePopup(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDonateClose = () => {
    setShowDonatePopup(false)
    setTimeout(() => {
      setShowVolunteerPopup(true)
    }, 500)
  }

  return (
    <div className="w-full">
      <HeroSection />
      <ScrollStory />
      <ImpactCounter />
      <ImpactCategories />
      <ImageCarousel />

      {/* Floating Donate Button */}
      <Link
        to="/donate"
        className="fixed bottom-6 right-6 z-50 bg-[#FFF314] text-[#263238] p-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 group animate-pulse hover:animate-none"
      >
        <Heart className="w-6 h-6 fill-current group-hover:fill-[#263238]" />
        <span className="hidden sm:inline font-bold">Donate Now</span>
      </Link>

      {/* Popups */}
      <DonatePopup 
        isOpen={showDonatePopup} 
        onClose={handleDonateClose}
      />

      <VolunteerPopup 
        isOpen={showVolunteerPopup} 
        onClose={() => setShowVolunteerPopup(false)}
      />
    </div>
  )
}
