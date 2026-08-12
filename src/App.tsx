// src/App.tsx
import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';

// Dynamic lazy loading of page components for optimal bundle splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const About2 = lazy(() => import('./pages/About2'));
const OurWork = lazy(() => import('./pages/OurWork'));
const Overview = lazy(() => import('./pages/Overview'));
const Programs = lazy(() => import('./pages/Programs'));
import Gallery from './pages/Gallery';
const Stories = lazy(() => import('./pages/Stories'));
const Children = lazy(() => import('./pages/Children'));
const Donate = lazy(() => import('./pages/Donate'));
const Contact = lazy(() => import('./pages/Contact'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));
const Volunteer = lazy(() => import('./pages/Volunteer'));
const Partner = lazy(() => import('./pages/Partner'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ImpactPage = lazy(() => import('./pages/ImpactPage'));
const Members = lazy(() => import('./pages/Members'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Education = lazy(() => import('./pages/impact/Education'));
const WomenEmpowerment = lazy(() => import('./pages/impact/WomenEmpowerment'));
const RuralDevelopment = lazy(() => import('./pages/impact/RuralDevelopment'));
const Healthcare = lazy(() => import('./pages/impact/Healthcare'));
const Environment = lazy(() => import('./pages/impact/Environment'));
const ProjectSindoda = lazy(() => import('./pages/impact/ProjectSindoda'));
const LearnMoreDetail = lazy(() => import('./pages/LearnMoreDetail'));
import VolunteerPopup from './components/VolunteerPopup';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RouteFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-[#FFF314] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [isVolunteerPopupOpen, setIsVolunteerPopupOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling & Sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => setIsVolunteerPopupOpen(true), 15000);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about2" element={<About2 />} />
              <Route path="/aboutus" element={<About2 />} />
              <Route path="/about/members" element={<Members />} />
              <Route path="/about/certifications" element={<Certifications />} />
              <Route path="/our-work" element={<OurWork />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/children" element={<Children />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/impact/:slug" element={<ImpactPage />} />

              {/* Dedicated category pages */}
              <Route path="/rural-development" element={<RuralDevelopment />} />
              <Route path="/education" element={<Education />} />
              <Route path="/women-empowerment" element={<WomenEmpowerment />} />
              <Route path="/healthcare" element={<Healthcare />} />
              <Route path="/environment" element={<Environment />} />
              <Route path="/project-sindoda" element={<ProjectSindoda />} />

              {/* Dedicated Learn More sub-field detail pages */}
              <Route path="/:categorySlug/learn-more/:itemSlug" element={<LearnMoreDetail />} />
              <Route path="/learn-more/:categorySlug/:itemSlug" element={<LearnMoreDetail />} />
              <Route path="/learn-more/:itemSlug" element={<LearnMoreDetail />} />
              <Route path="/rural-development/:itemSlug" element={<LearnMoreDetail />} />
              <Route path="/education/:itemSlug" element={<LearnMoreDetail />} />
              <Route path="/women-empowerment/:itemSlug" element={<LearnMoreDetail />} />
              <Route path="/healthcare/:itemSlug" element={<LearnMoreDetail />} />
              <Route path="/environment/:itemSlug" element={<LearnMoreDetail />} />
              <Route path="/project-sindoda/:itemSlug" element={<LearnMoreDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>

      <VolunteerPopup
        isOpen={isVolunteerPopupOpen}
        onClose={() => setIsVolunteerPopupOpen(false)}
      />
    </>
  );
}

