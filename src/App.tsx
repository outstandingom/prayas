// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Stories from './pages/Stories';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Volunteer from './pages/Volunteer';
import AdminDashboard from './pages/AdminDashboard';

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
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          
          {/* Profile now lives inside Layout, so it gets Navbar & Footer */}
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
