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
  const [showVolunteerPopup, setShowVolunteerPopup] = useState(false)

  useEffect(() => {
    // Show Donate popup first after 2 seconds
    const timer = setTimeout(() => {
      setShowDonatePopup(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // When Donate popup closes, show Volunteer popup
  const handleDonateClose = () => {
    setShowDonatePopup(false)
    // Show Volunteer popup after a short delay
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

      {/* Donate Popup - Shows first */}
      <DonatePopup 
        isOpen={showDonatePopup} 
        onClose={handleDonateClose}
      />

      {/* Volunteer Popup - Shows after Donate popup closes */}
      <VolunteerPopup 
        isOpen={showVolunteerPopup} 
        onClose={() => setShowVolunteerPopup(false)}
      />
    </div>
  )
}
