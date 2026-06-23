// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection'
import ImpactCounter from '../components/ImpactCounter'
import ScrollStory from '../components/ScrollStory'
import ImpactCategories from '../components/ImpactCategories'
import ImageCarousel from '../components/ImageCarousel'
import VolunteerPopup from '../components/VolunteerPopup'

export default function Home() {
  const { t } = useTranslation();
  const [showVolunteerPopup, setShowVolunteerPopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVolunteerPopup(true)
    }, 2500)
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