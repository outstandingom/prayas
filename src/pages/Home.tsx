// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ImpactCounter from '../components/ImpactCounter'
import ScrollStory from '../components/ScrollStory'
import ImpactCategories from '../components/ImpactCategories'
import ImageCarousel from '../components/ImageCarousel'
import VolunteerPopup from '../components/VolunteerPopup'

export default function Home() {
  const [showVolunteerPopup, setShowVolunteerPopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVolunteerPopup(true)
    }, 2500) // Slightly longer delay since donate popup is removed
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full">
      <HeroSection />
      <ScrollStory />
      <ImpactCounter />
      <ImpactCategories />
      <ImageCarousel />

      <VolunteerPopup isOpen={showVolunteerPopup} onClose={() => setShowVolunteerPopup(false)} />
    </div>
  )
}
