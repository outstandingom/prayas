// src/components/ImpactCounter.tsx

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CounterProps {
  end: number
  suffix?: string
  label: string
  description: string
  duration?: number
}

function Counter({ end, suffix = '', label, description, duration = 2000 }: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
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
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#00897B]/10 relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full hover-lift">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00897B]/5 to-[#E8F5E9]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Number */}
      <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#00897B] mb-2 drop-shadow-md relative z-10">
        {count.toLocaleString()}{suffix}
      </div>
      
      {/* Label */}
      <div className="text-[#263238]/80 font-mono text-xs md:text-sm uppercase tracking-widest text-center relative z-10 font-semibold">
        {label}
      </div>
      
      {/* Description */}
      <div className="text-[#263238]/60 text-xs md:text-sm text-center relative z-10 mt-3 leading-relaxed max-w-xs">
        {description}
      </div>
    </div>
  )
}

export default function ImpactCounter() {
  const counters = [
    { 
      end: 25000, 
      suffix: "+", 
      label: "LIVES IMPACTED",
      description: "Through our healthcare camps, education programs, and women empowerment initiatives across rural India",
      duration: 2000 
    },
    { 
      end: 1200, 
      suffix: "+", 
      label: "ACTIVE VOLUNTEERS",
      description: "Dedicated individuals working tirelessly in 27 states to bring change at the grassroots level",
      duration: 1800 
    },
    { 
      end: 350, 
      suffix: "+", 
      label: "PROJECTS COMPLETED",
      description: "From building schools to organizing health camps, each project has transformed communities",
      duration: 1500 
    },
    { 
      end: 500, 
      suffix: "+", 
      label: "REGULAR DONORS",
      description: "Compassionate supporters who believe in our mission and contribute monthly to sustain our work",
      duration: 1700 
    }
  ]

  return (
    <section className="py-16 md:py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#00897B] font-mono text-xs uppercase tracking-widest font-semibold bg-[#00897B]/10 px-4 py-2 rounded-full inline-block">
            Our Impact in Numbers
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238] mt-4">
            Making a Difference Together
          </h2>
          <div className="w-20 h-1 bg-[#00897B] mx-auto mt-4 rounded-full"></div>
          <p className="text-[#263238]/60 mt-4 max-w-2xl mx-auto">
            Every number represents a life touched, a community empowered, and hope restored.
          </p>
        </motion.div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {counters.map((counter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Counter 
                end={counter.end}
                suffix={counter.suffix}
                label={counter.label}
                description={counter.description}
                duration={counter.duration}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00897B] to-transparent rounded-full"></div>
        </motion.div>
      </div>
    </section>
  )
}
