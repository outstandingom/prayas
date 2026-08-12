import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import SmoothLoader from './SmoothLoader'
import FloatingDonateButton from './FloatingDonateButton'
// FloatingVolunteerButton import removed
import FloatingSocialIcons from './FloatingSocialIcons'
import ScrollToTopButton from './ScrollToTopButton'

export default function Layout() {
  const { pathname } = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const timer = setTimeout(() => setLoaderVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#263238] font-sans flex flex-col relative overflow-x-clip">
      {loaderVisible && <SmoothLoader />}
      
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: isMobile ? 0.25 : 0.35,
          ease: 'easeInOut'
        }}
        className="flex-1 w-full pointer-events-auto relative z-10"
      >
        <Outlet />
      </motion.main>
      {pathname !== '/contact' && <Footer />}
      
      {/* Floating elements */}
      <FloatingDonateButton />
      {/* <FloatingVolunteerButton /> removed */}
      <ScrollToTopButton />
    </div>
  )
}
