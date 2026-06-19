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
  const [showDonatePopup, setShowDonatePopup] = useState(false)

  useEffect(() => {
    // Show popup automatically after 2 seconds
    const timer = setTimeout(() => {
      setShowDonatePopup(true)
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

      {/* Donate Popup - Shows automatically */}
      <DonatePopup 
        isOpen={showDonatePopup} 
        onClose={() => setShowDonatePopup(false)} 
      />
    </div>
  )
}
