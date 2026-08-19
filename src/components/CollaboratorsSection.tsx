// src/components/CollaboratorsSection.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// ─── EXISTING LOGO COMPONENTS ───

function MPNewsLogo() {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none">
        <path d="M20 30 C30 10, 70 10, 80 30 C90 50, 80 80, 50 85 C20 85, 10 50, 20 30 Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />
        <path d="M30 40 L50 25 L70 40 L60 65 L40 65 Z" fill="#F59E0B" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black text-red-700 tracking-tighter">mp<span className="text-yellow-600">news</span></span>
        <span className="text-[9px] font-bold text-red-800 tracking-wider">www.mpnews.com</span>
      </div>
    </div>
  )
}

function SOSInfrabullsLogo() {
  return (
    <div className="flex items-center gap-3.5 px-3 py-1">
      <svg className="w-9 h-9 shrink-0 text-blue-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
        <circle cx="50" cy="50" r="42" strokeWidth="6" />
        <ellipse cx="50" cy="50" rx="42" ry="18" />
        <ellipse cx="50" cy="50" rx="18" ry="42" />
        <line x1="8" y1="50" x2="92" y2="50" strokeWidth="6" />
        <line x1="50" y1="8" x2="50" y2="92" strokeWidth="6" />
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-xl font-extrabold text-blue-900 tracking-wider">SOS</span>
        <span className="text-[9px] font-bold text-blue-700 tracking-widest uppercase">INFRABULLS INTERNATIONAL PVT. LTD.</span>
      </div>
    </div>
  )
}

function RakutenLogo() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-1">
      <span className="text-3xl font-black text-[#BF0000] tracking-tight font-sans">Rakuten</span>
      <div className="w-full h-1 bg-[#BF0000] rounded-full transform -skew-x-12 mt-0.5" />
    </div>
  )
}

function GlobantLogo() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-1">
      <span className="text-3xl font-extrabold text-black tracking-tight font-sans">Globant</span>
      <svg className="w-6 h-6 text-[#A3E635] shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5l9 7-9 7V5z" />
      </svg>
    </div>
  )
}

function AllIndiaNGOLogo() {
  return (
    <div className="flex flex-col items-center text-center px-4 py-1 leading-tight">
      <span className="text-base font-extrabold text-[#B91C1C] tracking-wider uppercase font-sans">ALL INDIA</span>
      <span className="text-lg font-black text-[#991B1B] tracking-widest uppercase font-sans">NGO ASSOCIATION</span>
    </div>
  )
}

function NabardLogo() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1">
      <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs tracking-tighter shadow-xs">
        NABARD
      </div>
      <span className="text-base font-extrabold text-emerald-900 tracking-wide font-sans">NABARD</span>
    </div>
  )
}

function HDFCParivartanLogo() {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <div className="w-7 h-7 bg-red-600 border-2 border-blue-900 flex items-center justify-center">
        <div className="w-3 h-3 bg-white" />
      </div>
      <div className="flex flex-col leading-none text-left">
        <span className="text-xs font-bold text-blue-950">HDFC BANK</span>
        <span className="text-sm font-extrabold text-red-600 tracking-wider">Parivartan</span>
      </div>
    </div>
  )
}

// ─── NEW COLLABORATOR COMPONENTS ───

function NRLMLogo() {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <svg className="w-9 h-9 text-green-700 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C17 5.24 14.76 3 12 3S7 5.24 7 8c0 2.21 1.43 4.08 3.42 4.74L9 21h6l-1.42-8.26C15.57 12.08 17 10.21 17 8z" />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-xl font-black text-green-800 tracking-tight">NRLM</span>
        <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Aajeevika</span>
      </div>
    </div>
  )
}

function NULMLogo() {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <svg className="w-9 h-9 text-blue-700 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.7l5.5 5.5H16v6H8v-6H6.5L12 5.7z" />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-xl font-black text-blue-800 tracking-tight">NULM</span>
        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Urban Livelihoods</span>
      </div>
    </div>
  )
}

function IndorePrashasanLogo() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-1 leading-tight border-l-2 border-r-2 border-slate-300">
      <span className="text-lg font-extrabold text-slate-800 tracking-wider font-serif uppercase">
        Indore
      </span>
      <span className="text-xs font-bold text-slate-600 tracking-widest font-serif uppercase">
        Prashasan
      </span>
    </div>
  )
}

function IMCLogo() {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <div className="w-9 h-9 rounded-full border-[3px] border-emerald-600 flex items-center justify-center shrink-0">
        <span className="text-[10px] font-black text-emerald-700">IMC</span>
      </div>
      <div className="flex flex-col text-left leading-none">
        <span className="text-sm font-extrabold text-emerald-800 uppercase">Indore Municipal</span>
        <span className="text-[10px] font-bold text-emerald-600 tracking-widest">CORPORATION</span>
      </div>
    </div>
  )
}

function MPGovtLogo() {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <svg className="w-9 h-9 text-red-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <circle cx="12" cy="12" r="7" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="M12 8v4l2 2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-black text-red-800 uppercase tracking-wider">Govt. of</span>
        <span className="text-base font-extrabold text-red-700 uppercase">Madhya Pradesh</span>
      </div>
    </div>
  )
}

function RuralDevLogo() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-1 text-center">
      <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase font-sans">
        Department of
      </span>
      <span className="text-sm font-extrabold text-amber-900 tracking-wider uppercase font-sans">
        Rural Development
      </span>
    </div>
  )
}

function WCDMinistryLogo() {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <svg className="w-8 h-8 text-pink-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-bold text-pink-700 uppercase tracking-wider">Mahila & Bal Vikas</span>
        <span className="text-sm font-extrabold text-pink-900 uppercase tracking-widest">Mantralaya</span>
      </div>
    </div>
  )
}

// ─── COMPONENT REGISTRY ───

const COLLABORATORS = [
  { id: 'mpnews', component: MPNewsLogo },
  { id: 'sos', component: SOSInfrabullsLogo },
  { id: 'rakuten', component: RakutenLogo },
  { id: 'globant', component: GlobantLogo },
  { id: 'ngo-assoc', component: AllIndiaNGOLogo },
  { id: 'nabard', component: NabardLogo },
  { id: 'hdfc', component: HDFCParivartanLogo },
  { id: 'nrlm', component: NRLMLogo },
  { id: 'nulm', component: NULMLogo },
  { id: 'indore-prashasan', component: IndorePrashasanLogo },
  { id: 'imc', component: IMCLogo },
  { id: 'mp-govt', component: MPGovtLogo },
  { id: 'rural-dev', component: RuralDevLogo },
  { id: 'wcd-ministry', component: WCDMinistryLogo },
]

export default function CollaboratorsSection() {
  const { t } = useTranslation()
  const [isPaused, setIsPaused] = useState(false)

  // Double the array for seamless infinite right-scrolling loop
  // Note: Since the array is much longer now, we might only need to duplicate it twice, but three ensures wide screens never break.
  const marqueeItems = [...COLLABORATORS, ...COLLABORATORS, ...COLLABORATORS]

  return (
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] px-2 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('collaborators.title', 'Our Collaborators')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 mx-auto mt-4 rounded-full shadow-xs" />
        </div>

        {/* ─── AUTO ROTATE RIGHT MOVING LOGOS MARQUEE ─── */}
        <div
          className="relative w-full overflow-hidden flex items-center py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Left Gradient Blur Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Infinite Motion Container moving RIGHT (-50% to 0%) */}
          <motion.div
            className="flex items-center gap-12 sm:gap-16 md:gap-20 whitespace-nowrap min-w-full"
            animate={isPaused ? { x: undefined } : { x: ['-50%', '0%'] }}
            transition={{
              ease: 'linear',
              duration: 35, // Increased duration slightly so it doesn't spin too fast with more items
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((item, index) => {
              const LogoComp = item.component
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="inline-flex items-center justify-center shrink-0 grayscale opacity-85 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <LogoComp />
                </div>
              )
            })}
          </motion.div>

          {/* Subtle Right Gradient Blur Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
