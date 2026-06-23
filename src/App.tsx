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
// Impact pages
import Education from './pages/impact/Education';
import Healthcare from './pages/impact/Healthcare';
import WomenEmpowerment from './pages/impact/WomenEmpowerment';
import ChildWelfare from './pages/impact/ChildWelfare';
import Environment from './pages/impact/Environment';
import RuralDevelopment from './pages/impact/RuralDevelopment';
import SkillTraining from './pages/impact/SkillTraining';
import DisasterRelief from './pages/impact/DisasterRelief';
import AnimalWelfare from './pages/impact/AnimalWelfare';
import ElderlyCare from './pages/impact/ElderlyCare';
import FoodSecurity from './pages/impact/FoodSecurity';
import MentalHealth from './pages/impact/MentalHealth';
// New About sub‑pages
import Members from './pages/Members';
import Certifications from './pages/Certifications';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Auth page – standalone (no layout) */}
        <Route path="/auth" element={<Auth />} />

        {/* All other pages with the common Layout (includes Navbar & Footer) */}
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

          {/* Impact Category Pages */}
          <Route path="/impact/education" element={<Education />} />
          <Route path="/impact/healthcare" element={<Healthcare />} />
          <Route path="/impact/women-empowerment" element={<WomenEmpowerment />} />
          <Route path="/impact/child-welfare" element={<ChildWelfare />} />
          <Route path="/impact/environment" element={<Environment />} />
          <Route path="/impact/rural-development" element={<RuralDevelopment />} />
          <Route path="/impact/skill-training" element={<SkillTraining />} />
          <Route path="/impact/disaster-relief" element={<DisasterRelief />} />
          <Route path="/impact/animal-welfare" element={<AnimalWelfare />} />
          <Route path="/impact/elderly-care" element={<ElderlyCare />} />
          <Route path="/impact/food-security" element={<FoodSecurity />} />
          <Route path="/impact/mental-health" element={<MentalHealth />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
