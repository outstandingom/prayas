import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DURATION_MS = 2600
const expoOut: [number, number, number, number] = [0.19, 1, 0.22, 1]

export default function SmoothLoader() {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading')

  const finish = useCallback(() => setPhase('exiting'), [])

  useEffect(() => {
    const t = setTimeout(finish, DURATION_MS)
    return () => clearTimeout(t)
  }, [finish])

  if (phase === 'done') return null

  return (
    <AnimatePresence onExitComplete={() => setPhase('done')}>
      <motion.div
        key="loader"
          initial={{ y: '0%' }}
          animate={phase === 'exiting' ? { y: '-100%' } : { y: '0%' }}
          transition={phase === 'exiting' ? { duration: 0.9, ease: expoOut } : undefined}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--navy)' }}
        >
          {/* Ambient Glow */}
          <motion.div
            className="absolute rounded-full blur-[140px]"
            style={{ width: '40vw', maxWidth: 520, height: '40vw', maxHeight: 520, background: 'rgba(0,168,107,0.18)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Icon */}
            <motion.div
              className="flex items-center justify-center rounded-2xl mb-7"
              style={{ width: 72, height: 72, background: 'rgba(0,168,107,0.08)', border: '1px solid rgba(0,168,107,0.18)' }}
              animate={{ boxShadow: ['0 0 0px rgba(0,168,107,0)', '0 0 30px rgba(0,168,107,0.3)', '0 0 0px rgba(0,168,107,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-[#6366F1] flex items-center justify-center text-white font-bold text-xl">P</div>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.3, ease: expoOut }}
                className="font-display text-2xl md:text-4xl font-bold text-gold text-center tracking-tight"
              >
                Building a Better World
              </motion.h2>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, delay: 0.55, ease: expoOut }}
                className="text-emerald font-mono text-xs font-semibold uppercase tracking-[0.35em] text-center"
              >
                Prayas Foundation
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="relative overflow-hidden rounded-full mt-10" style={{ width: 280, height: 3, background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--emerald), rgba(0,168,107,0.6))' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION_MS / 1000 - 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}
