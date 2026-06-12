import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function Counter({ end, suffix = '', label }: { end: number, suffix?: string, label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-navy rounded-2xl hover-lift shadow-xl border border-navy/10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="font-display text-4xl md:text-6xl font-bold text-gold mb-2 drop-shadow-md relative z-10">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/80 font-mono text-sm uppercase tracking-widest text-center relative z-10">
        {label}
      </div>
    </div>
  )
}

export default function ImpactCounter() {
  return (
    <section className="py-20 relative z-20 -mt-10 max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <Counter end={25000} suffix="+" label="Lives Impacted" />
        <Counter end={1200} suffix="+" label="Volunteers" />
        <Counter end={350} suffix="+" label="Projects" />
        <Counter end={500} suffix="+" label="Donors" />
      </div>
    </section>
  )
}
