// src/App.tsx
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import VolunteerPopup from './components/VolunteerPopup'
import Home from './pages/Home'
// ... other page imports

function App() {
  const [isVolunteerPopupOpen, setIsVolunteerPopupOpen] = useState(false)

  // Show popup once when the app loads
  useEffect(() => {
    // Only show after a short delay, or immediately
    const timer = setTimeout(() => setIsVolunteerPopupOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* other routes */}
        </Route>
      </Routes>
      
      <VolunteerPopup 
        isOpen={isVolunteerPopupOpen} 
        onClose={() => setIsVolunteerPopupOpen(false)} 
      />
    </BrowserRouter>
  )
}

export default App
