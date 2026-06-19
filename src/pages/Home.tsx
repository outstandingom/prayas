// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ImpactCounter from '../components/ImpactCounter'
import ScrollStory from '../components/ScrollStory'
import ImpactCategories from '../components/ImpactCategories'
import ImageCarousel from '../components/ImageCarousel'
import VolunteerPopup from '../components/VolunteerPopup'
import DonatePopup from '../components/DonatePopup'
import { Heart, Users, ArrowRight } from 'lucide-react'

export default function Home() {
  const [showVolunteerPopup, setShowVolunteerPopup] = useState(false)
  const [showDonatePopup, setShowDonatePopup] = useState(false)
  const [showWelcomePopup, setShowWelcomePopup] = useState(true)

  // Show welcome popup when website loads
  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = sessionStorage.getItem('hasSeenWelcomePopup')
    if (!hasSeenPopup) {
      setShowWelcomePopup(true)
      sessionStorage.setItem('hasSeenWelcomePopup', 'true')
    }
  }, [])

  return (
    <div className="w-full">
      <HeroSection />
      <ImpactCounter />
      <ScrollStory />
      <ImpactCategories />
      <ImageCarousel />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle, #00897B 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[#00897B] font-mono text-xs uppercase tracking-widest font-semibold bg-[#00897B]/10 px-4 py-2 rounded-full inline-block mb-4">
              Take Action
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238] mb-4">
              Make a Difference Today
            </h2>
            <p className="text-[#263238]/60 max-w-2xl mx-auto">
              Your support can transform lives. Join our community of changemakers and help us build a better future for those in need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {/* Volunteer Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white rounded-2xl p-6 md:p-8 border border-[#00897B]/10 shadow-lg shadow-[#263238]/5 hover:shadow-xl hover:shadow-[#00897B]/10 transition-all duration-300 cursor-pointer"
              onClick={() => setShowVolunteerPopup(true)}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] flex items-center justify-center mb-5 group-hover:bg-[#00897B] transition-colors duration-300">
                <Users className="w-7 h-7 text-[#00897B] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#263238] mb-2">Become a Volunteer</h3>
              <p className="text-[#263238]/60 text-sm mb-4">
                Join our team of dedicated volunteers and make a direct impact in communities that need it most.
              </p>
              <div className="flex items-center gap-2 text-[#00897B] font-semibold text-sm group-hover:gap-3 transition-all">
                Get Started <ArrowRight className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00897B]/0 to-[#00897B]/0 group-hover:from-[#00897B]/3 group-hover:to-[#4DB6AC]/3 transition-all duration-300 pointer-events-none" />
            </motion.div>

            {/* Donate Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="group relative bg-gradient-to-br from-[#00897B] to-[#4DB6AC] rounded-2xl p-6 md:p-8 shadow-lg shadow-[#00897B]/20 hover:shadow-xl hover:shadow-[#00897B]/30 transition-all duration-300 cursor-pointer"
              onClick={() => setShowDonatePopup(true)}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Donate Now</h3>
              <p className="text-white/80 text-sm mb-4">
                Your generous donation can provide education, healthcare, and hope to those who need it most.
              </p>
              <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                Support Us <ArrowRight className="w-4 h-4" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00897B]/20 via-[#4DB6AC]/20 to-[#00897B]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-12 text-[#263238]/40 text-xs font-medium"
          >
            <span>✓ 80G Tax Benefits</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ Secure Donations</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ Transparency Guaranteed</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ Regular Updates</span>
          </motion.div>
        </div>
      </section>

      {/* Welcome Popup - Shows on page load */}
      <WelcomePopup 
        isOpen={showWelcomePopup} 
        onClose={() => setShowWelcomePopup(false)}
        onVolunteer={() => {
          setShowWelcomePopup(false)
          setTimeout(() => setShowVolunteerPopup(true), 300)
        }}
        onDonate={() => {
          setShowWelcomePopup(false)
          setTimeout(() => setShowDonatePopup(true), 300)
        }}
      />

      {/* Volunteer Popup */}
      <VolunteerPopup 
        isOpen={showVolunteerPopup} 
        onClose={() => setShowVolunteerPopup(false)} 
      />

      {/* Donate Popup */}
      <DonatePopup 
        isOpen={showDonatePopup} 
        onClose={() => setShowDonatePopup(false)} 
      />
    </div>
  )
}

// Welcome Popup Component
function WelcomePopup({ isOpen, onClose, onVolunteer, onDonate }: {
  isOpen: boolean
  onClose: () => void
  onVolunteer: () => void
  onDonate: () => void
}) {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-[#00897B] to-[#4DB6AC] p-6 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4"
              >
                <Heart className="w-8 h-8" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-1">Welcome to Prayas</h2>
              <p className="text-white/80 text-sm">Samaj Sevi Sanstha</p>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <p className="text-[#263238]/70 mb-6 leading-relaxed">
                Join us in making a difference. Choose how you'd like to contribute to our mission of empowering communities.
              </p>

              <div className="space-y-3">
                {/* Donate Button */}
                <button
                  onClick={onDonate}
                  className="w-full py-3 bg-[#00897B] text-white rounded-xl font-semibold hover:bg-[#00897B]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00897B]/20"
                >
                  <Heart className="w-5 h-5" />
                  Donate Now
                </button>

                {/* Volunteer Button */}
                <button
                  onClick={onVolunteer}
                  className="w-full py-3 bg-[#E8F5E9] text-[#263238] rounded-xl font-semibold hover:bg-[#00897B]/10 transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5 text-[#00897B]" />
                  Become a Volunteer
                </button>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-[#263238]/50 hover:text-[#263238] text-sm font-medium transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
