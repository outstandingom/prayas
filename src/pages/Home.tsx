// src/pages/Home.tsx
import HeroSection from '../components/HeroSection'
import ImpactCounter from '../components/ImpactCounter'
import ScrollStory from '../components/ScrollStory'
import ImpactCategories from '../components/ImpactCategories'
import ImageCarousel from '../components/ImageCarousel'

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ImpactCounter />
      <ScrollStory />
      <ImpactCategories />
      <ImageCarousel />
    </div>
  )
}
