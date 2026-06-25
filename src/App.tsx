// src/App.tsx
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
// NEW: single dynamic impact page (replaces the 12 static imports)
import ImpactPage from './pages/ImpactPage';
// About sub‑pages
import Members from './pages/Members';
import Certifications from './pages/Certifications';

export default function App() {
  return (
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

          {/* 🆕 Dynamic impact page – works for any slug like /impact/education, /impact/healthcare, etc. */}
          <Route path="/impact/:slug" element={<ImpactPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
