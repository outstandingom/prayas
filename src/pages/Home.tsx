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

      <DonatePopup isOpen={showDonatePopup} onClose={handleDonateClose} />
      <VolunteerPopup isOpen={showVolunteerPopup} onClose={() => setShowVolunteerPopup(false)} />
    </div>
  )
}
