import HeroSection from '../components/HeroSection'
import ImpactCounter from '../components/ImpactCounter'
import ScrollStory from '../components/ScrollStory'
import CubeGallery from '../components/CubeGallery'
import ImageCarousel from '../components/ImageCarousel'

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ImpactCounter />
      <ScrollStory />
      <CubeGallery />
      <ImageCarousel />
    </div>
  )
}
