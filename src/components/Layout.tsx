// src/components/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import SmoothLoader from './SmoothLoader'

export default function Layout() {
  const { pathname } = useLocation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Smaller animation offset on mobile for smoother feel
  const initialY = isMobile ? 8 : 20
  const exitY = isMobile ? -8 : -20

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#263238] font-sans flex flex-col relative overflow-x-hidden">
      <SmoothLoader />
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: initialY }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: exitY }}
        transition={{
          duration: isMobile ? 0.3 : 0.4,
          ease: [0.19, 1, 0.22, 1]
        }}
        className="flex-1 w-full"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
