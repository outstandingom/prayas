// src/components/SmoothLoader.tsx
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DURATION_MS = 2600
const expoOut: [number, number, number, number] = [0.19, 1, 0.22, 1]

export default function SmoothLoader() {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading')
  const [isMobile, setIsMobile] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const finish = useCallback(() => setPhase('exiting'), [])

  useEffect(() => {
    const t = setTimeout(finish, DURATION_MS)
    return () => clearTimeout(t)
  }, [finish])

  const exitDuration = isMobile ? 0.6 : 0.8

  return (
    <AnimatePresence onExitComplete={() => setPhase('done')}>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={phase === 'exiting' ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
          transition={phase === 'exiting' ? { duration: exitDuration, ease: expoOut } : undefined}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' 
          }}
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #FFF314 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />

          {/* Ambient Glow - Yellow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'clamp(250px, 70vw, 600px)',
              height: 'clamp(250px, 70vw, 600px)',
              background: 'radial-gradient(circle, rgba(255,243,20,0.08), transparent 70%)',
              filter: 'blur(clamp(40px, 10vw, 80px))'
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Secondary Glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'clamp(200px, 50vw, 400px)',
              height: 'clamp(200px, 50vw, 400px)',
              background: 'radial-gradient(circle, rgba(255,243,20,0.05), transparent 70%)',
              filter: 'blur(clamp(30px, 8vw, 60px))'
            }}
            animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: isMobile ? 0.05 : 0.1 }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            {/* Logo - Same as Navbar */}
            <motion.div
              className="mb-8 sm:mb-10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#FFF314] to-[#FFF314]/80 flex items-center justify-center shadow-[0_0_40px_rgba(255,243,20,0.3)] mx-auto">
                {logoError ? (
                  <span className="text-2xl sm:text-3xl font-bold text-[#263238]">P</span>
                ) : (
                  <img
                    src="https://i.ibb.co/N6Cft6S3/IMG-20260614-015637.jpg"
                    alt="Prayas Logo"
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                )}
              </div>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, delay: isMobile ? 0.3 : 0.4, ease: expoOut }}
                className="font-bold text-[#FFF314] text-center tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 6vw, 2.2rem)' }}
              >
                Prayas Foundation
              </motion.h2>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mb-1">
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.6, delay: isMobile ? 0.5 : 0.6, ease: expoOut }}
                className="text-white/50 text-center font-light"
                style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}
              >
                Building a Better World Together
              </motion.p>
            </div>

            {/* Tagline */}
            <div className="overflow-hidden mb-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: isMobile ? 0.8 : 1 }}
                className="text-white/30 text-center text-xs uppercase tracking-[0.2em]"
              >
                Empowering Communities
              </motion.p>
            </div>

            {/* Progress Bar */}
            <div
              className="relative overflow-hidden rounded-full"
              style={{
                width: 'clamp(180px, 50vw, 280px)',
                height: 2,
                background: 'rgba(255,255,255,0.06)'
              }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ 
                  background: 'linear-gradient(90deg, #FFF314, rgba(255,243,20,0.4))' 
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION_MS / 1000 - 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
              
              {/* Glow on progress */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full blur-sm"
                style={{ 
                  background: 'linear-gradient(90deg, rgba(255,243,20,0.3), transparent)' 
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION_MS / 1000 - 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </motion.div>

          {/* Bottom text */}
          <motion.p
            className="absolute bottom-8 text-white/10 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Samaj Sevi Sanstha
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
