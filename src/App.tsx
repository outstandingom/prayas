// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Stories from './pages/Stories';
import Children from './pages/Children';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Volunteer from './pages/Volunteer';
import AdminDashboard from './pages/AdminDashboard';
import ImpactPage from './pages/ImpactPage';
import Members from './pages/Members';
import Certifications from './pages/Certifications';
import VolunteerPopup from './components/VolunteerPopup';

export default function App() {
  const [isVolunteerPopupOpen, setIsVolunteerPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVolunteerPopupOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/members" element={<Members />} />
            <Route path="/about/certifications" element={<Certifications />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/children" element={<Children />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/impact/:slug" element={<ImpactPage />} />
          </Route>
        </Routes>
      </AnimatePresence>

      <VolunteerPopup
        isOpen={isVolunteerPopupOpen}
        onClose={() => setIsVolunteerPopupOpen(false)}
      />
    </>
  );
}
