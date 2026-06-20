// src/components/SmoothLoader.tsx
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const DURATION_MS = 2600
const expoOut: [number, number, number, number] = [0.19, 1, 0.22, 1]

export default function SmoothLoader() {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading')
  const [isMobile, setIsMobile] = useState(false)

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

  // FIXED: Don't early return, let AnimatePresence handle exit
  const exitDuration = isMobile ? 0.7 : 0.9

  return (
    <AnimatePresence onExitComplete={() => setPhase('done')}>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          initial={{ y: '0%' }}
          animate={phase === 'exiting' ? { y: '-100%' } : { y: '0%' }}
          transition={phase === 'exiting' ? { duration: exitDuration, ease: expoOut } : undefined}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#263238' }}
        >
          {/* Ambient Glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'clamp(200px, 60vw, 520px)',
              height: 'clamp(200px, 60vw, 520px)',
              background: 'rgba(255,243,20,0.12)',
              filter: 'blur(clamp(60px, 15vw, 140px))'
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Secondary Glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'clamp(150px, 40vw, 350px)',
              height: 'clamp(150px, 40vw, 350px)',
              background: 'rgba(255,243,20,0.06)',
              filter: 'blur(clamp(40px, 10vw, 100px))'
            }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: isMobile ? 0.05 : 0.1 }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            {/* Icon Container */}
            <motion.div
              className="flex items-center justify-center rounded-2xl mb-6 sm:mb-7"
              style={{
                width: 'clamp(64px, 16vw, 80px)',
                height: 'clamp(64px, 16vw, 80px)',
                background: 'rgba(255,243,20,0.08)',
                border: '1px solid rgba(255,243,20,0.2)'
              }}
              animate={{ 
                boxShadow: [
                  '0 0 0px rgba(255,243,20,0)', 
                  '0 0 40px rgba(255,243,20,0.3)', 
                  '0 0 0px rgba(255,243,20,0)'
                ] 
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <motion.div
                className="rounded-full bg-gradient-to-br from-[#FFF314] to-[#FFD54F] flex items-center justify-center text-[#263238]"
                style={{
                  width: 'clamp(44px, 12vw, 56px)',
                  height: 'clamp(44px, 12vw, 56px)'
                }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <GraduationCap 
                  style={{ 
                    width: 'clamp(20px, 6vw, 28px)', 
                    height: 'clamp(20px, 6vw, 28px)' 
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: isMobile ? 0.2 : 0.3, ease: expoOut }}
                className="font-display font-bold text-[#FFF314] text-center tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)' }}
              >
                Building a Better World
              </motion.h2>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, delay: isMobile ? 0.4 : 0.55, ease: expoOut }}
                className="text-[#FFF314]/70 font-mono font-semibold uppercase text-center"
                style={{
                  fontSize: 'clamp(0.65rem, 3vw, 0.75rem)',
                  letterSpacing: 'clamp(0.2em, 3vw, 0.35em)'
                }}
              >
                Prayas Foundation
              </motion.div>
            </div>

            {/* Tagline */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.6, delay: isMobile ? 0.6 : 0.75, ease: expoOut }}
                className="text-white/40 text-center font-light"
                style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)' }}
              >
                Empowering Communities, Changing Lives
              </motion.p>
            </div>

            {/* Progress Bar */}
            <div
              className="relative overflow-hidden rounded-full mt-8 sm:mt-10"
              style={{
                width: 'clamp(200px, 60vw, 320px)',
                height: 3,
                background: 'rgba(255,255,255,0.08)'
              }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ 
                  background: 'linear-gradient(90deg, #FFF314, rgba(255,243,20,0.6))' 
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION_MS / 1000 - 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Loading percentage */}
            <motion.p
              className="text-[#FFF314]/30 text-xs mt-3 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {phase === 'exiting' ? '100' : '75'}%
            </motion.p>
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#FFF314]/20 rounded-tl" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#FFF314]/20 rounded-tr" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#FFF314]/20 rounded-bl" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#FFF314]/20 rounded-br" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
