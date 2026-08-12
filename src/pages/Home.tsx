import PrayasDeepIntro from '../components/PrayasDeepIntro';
import HeroSection from '../components/HeroSection';
import ImpactCounter from '../components/ImpactCounter';
import FocusAreas from '../components/FocusAreas';
import TrustFlow from '../components/TrustFlow';
import FeaturedProjects from '../components/FeaturedProjects';
import GalleryPreview from '../components/GalleryPreview';
import CollaboratorsSection from '../components/CollaboratorsSection';

export default function Home() {
  return (
    <div className="w-full bg-[#FAF9F6] text-[#263238] overflow-x-hidden font-sans">
      
      {/* ─── SECTION 1: Master Combined Hero Intro & What Is Prayas Showcase ─── */}
      <PrayasDeepIntro />

      {/* ─── SECTION 2: Interactive Showcase Slider (Photo Spray Frame) ─── */}
      <HeroSection />

      {/* ─── SECTION 3: Ground Impact Numbers & Real Metrics (Hidden per request) ─── */}
      {/* <ImpactCounter /> */}

      {/* ─── SECTION 4: 5 Pillar Bento Showcase (What We Do) (Removed per request) ─── */}
      {/* <FocusAreas /> */}

      {/* ─── SECTION 5: Systemic Methodology (Hidden per request) ─── */}
      {/* <TrustFlow /> */}

      {/* ─── SECTION 6: Featured Projects Deck ─── */}
      <FeaturedProjects />

      {/* ─── SECTION 7: Community Gallery Moments ─── */}
      <GalleryPreview />

      {/* ─── SECTION 8: Collaborators & Partners Marquee ─── */}
      <CollaboratorsSection />

    </div>
  );
}
