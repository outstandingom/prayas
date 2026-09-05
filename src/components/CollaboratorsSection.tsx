// src/components/CollaboratorsSection.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// ─── EXISTING LOGOS ───────────────────────────────────────────────────────────

function MPNewsLogo() {
  return (
    <div className="flex items-center gap-2 px-2 sm:px-3 py-1">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" viewBox="0 0 100 100" fill="none">
        <path
          d="M20 30 C30 10, 70 10, 80 30 C90 50, 80 80, 50 85 C20 85, 10 50, 20 30 Z"
          fill="#D97706" stroke="#92400E" strokeWidth="3"
        />
        <path d="M30 40 L50 25 L70 40 L60 65 L40 65 Z" fill="#F59E0B" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-lg sm:text-2xl font-black text-red-700 tracking-tighter">
          mp<span className="text-yellow-600">news</span>
        </span>
        <span className="text-[8px] sm:text-[9px] font-bold text-red-800 tracking-wider">
          www.mpnews.com
        </span>
      </div>
    </div>
  )
}

function SOSInfrabullsLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3.5 px-2 sm:px-3 py-1">
      <svg className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 text-blue-600"
        viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
        <circle cx="50" cy="50" r="42" strokeWidth="6" />
        <ellipse cx="50" cy="50" rx="42" ry="18" />
        <ellipse cx="50" cy="50" rx="18" ry="42" />
        <line x1="8" y1="50" x2="92" y2="50" strokeWidth="6" />
        <line x1="50" y1="8" x2="50" y2="92" strokeWidth="6" />
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-extrabold text-blue-900 tracking-wider">SOS</span>
        <span className="text-[8px] sm:text-[9px] font-bold text-blue-700 tracking-widest uppercase">
          INFRABULLS INTL. PVT. LTD.
        </span>
      </div>
    </div>
  )
}

function RakutenLogo() {
  return (
    <div className="flex flex-col items-center justify-center px-3 sm:px-4 py-1">
      <span className="text-2xl sm:text-3xl font-black text-[#BF0000] tracking-tight font-sans">
        Rakuten
      </span>
      <div className="w-full h-1 bg-[#BF0000] rounded-full transform -skew-x-12 mt-0.5" />
    </div>
  )
}

function GlobantLogo() {
  return (
    <div className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1">
      <span className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight font-sans">
        Globant
      </span>
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#A3E635] shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5l9 7-9 7V5z" />
      </svg>
    </div>
  )
}

function AllIndiaNGOLogo() {
  return (
    <div className="flex flex-col items-center text-center px-3 sm:px-4 py-1 leading-tight">
      <span className="text-sm sm:text-base font-extrabold text-[#B91C1C] tracking-wider uppercase font-sans">
        ALL INDIA
      </span>
      <span className="text-base sm:text-lg font-black text-[#991B1B] tracking-widest uppercase font-sans">
        NGO ASSOCIATION
      </span>
    </div>
  )
}

function NabardLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[9px] sm:text-xs tracking-tighter shadow-sm">
        NABARD
      </div>
      <span className="text-sm sm:text-base font-extrabold text-emerald-900 tracking-wide font-sans">
        NABARD
      </span>
    </div>
  )
}

function HDFCParivartanLogo() {
  return (
    <div className="flex items-center gap-2 px-2 sm:px-3 py-1">
      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-red-600 border-2 border-blue-900 flex items-center justify-center">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white" />
      </div>
      <div className="flex flex-col leading-none text-left">
        <span className="text-[10px] sm:text-xs font-bold text-blue-950">HDFC BANK</span>
        <span className="text-xs sm:text-sm font-extrabold text-red-600 tracking-wider">Parivartan</span>
      </div>
    </div>
  )
}

// ─── NEW LOGOS ────────────────────────────────────────────────────────────────

function NRLMLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <img
        src="/nrlm-logo.png"
        alt="NRLM - National Rural Livelihoods Mission"
        className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-black text-green-900 tracking-wider">NRLM</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-green-800 tracking-wide uppercase leading-tight">
          Nat. Rural Livelihoods<br />Mission
        </span>
      </div>
    </div>
  )
}

function NULMLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <img
        src="/nulm-logo.png"
        alt="NULM-MP"
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-black text-orange-600 tracking-wider">NULM-MP</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-orange-700 tracking-wide uppercase leading-tight">
          Nat. Urban Livelihoods<br />Mission
        </span>
      </div>
    </div>
  )
}

function IndorePrasashanLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <img
        src="/indore-prasashan-logo.png"
        alt="Indore Prasashan"
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm sm:text-base font-black text-purple-950 tracking-wide">Indore</span>
        <span className="text-xs sm:text-sm font-black text-purple-800 tracking-wide">Prasashan</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-purple-700 uppercase tracking-wider">
          District Administration
        </span>
      </div>
    </div>
  )
}

function IMCLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <img
        src="/imc-logo.png"
        alt="Indore Municipal Corporation"
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-lg sm:text-xl font-black text-blue-900 tracking-widest">IMC</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-blue-800 tracking-wide uppercase leading-tight">
          Indore Municipal<br />Corporation
        </span>
      </div>
    </div>
  )
}

function MPGovtLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <img
        src="/mp-govt-logo.png"
        alt="Madhya Pradesh Government"
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm sm:text-base font-black text-red-900 tracking-wide">Madhya Pradesh</span>
        <span className="text-xs sm:text-sm font-black text-amber-700 tracking-wide">Government</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-red-800 uppercase tracking-wider">
          मध्यप्रदेश शासन
        </span>
      </div>
    </div>
  )
}

function RuralDevelopmentLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <img
        src="/rural-dev-logo.png"
        alt="Ministry of Rural Development"
        className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0 drop-shadow-sm bg-black rounded-lg p-0.5"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm sm:text-base font-black text-amber-950 tracking-wide">Rural</span>
        <span className="text-xs sm:text-sm font-black text-green-800 tracking-wide">Development</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-amber-800 uppercase tracking-wider">
          Govt. of India
        </span>
      </div>
    </div>
  )
}

function MahilaBalVikasLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <img
        src="/mahila-bal-vikas-logo.png"
        alt="Mahila & Bal Vikas Mantralaya"
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm sm:text-base font-black text-pink-900 tracking-wide">Mahila & Bal</span>
        <span className="text-xs sm:text-sm font-black text-pink-700 tracking-wide">Vikas</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-pink-800 uppercase tracking-wider">
          Department of Women & Child Development
        </span>
      </div>
    </div>
  )
}
function PrayasFoundationLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <img src="/prayas-logo.png" alt="Prayas Samaj Sevi Sanstha" className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0" />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-black text-red-700 tracking-wider">Prayas</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-red-800 tracking-wide uppercase leading-tight">
          Social Welfare Society
        </span>
      </div>
    </div>
  )
}

// ─── REGISTRY ─────────────────────────────────────────────────────────────────

const COLLABORATORS = [
  { id: 'nrlm',              name: 'NRLM (National Rural Livelihoods Mission)',        component: NRLMLogo },
  { id: 'nulm',              name: 'NULM (National Urban Livelihoods Mission)',        component: NULMLogo },
  { id: 'indore-prasashan',  name: 'Indore Prasashan (District Administration)',        component: IndorePrasashanLogo },
  { id: 'imc',               name: 'IMC (Indore Municipal Corporation)',           component: IMCLogo },
  { id: 'mp-govt',           name: 'Madhya Pradesh Government',                     component: MPGovtLogo },
  { id: 'rural-dev',         name: 'Ministry of Rural Development',                 component: RuralDevelopmentLogo },
  { id: 'mahila-bal-vikas',  name: 'Mahila and Bal Vikas Mantralaya',               component: MahilaBalVikasLogo },
]

// ─── SECTION ──────────────────────────────────────────────────────────────────

export default function CollaboratorsSection() {
  const { t } = useTranslation()
  const [isPaused, setIsPaused] = useState(false)

  // 2× duplication → seamless -50% loop
  const marqueeItems = [...COLLABORATORS, ...COLLABORATORS]

  return (
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden select-none border-t border-gray-100">

      {/*
        CSS keyframe injected inline — no global stylesheet needed.
        translate(-50%) on a w-max element moves exactly one full set of logos,
        creating a perfectly seamless loop on every screen size.
      */}
      <style>{`
        @keyframes collaborator-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .collaborator-track {
          animation: collaborator-scroll 40s linear infinite;
          will-change: transform;
        }
        .collaborator-track--paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] px-2 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('collaborators.title', 'Our Collaborators')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* ── MARQUEE ── */}
        <div
          className="relative w-full overflow-hidden py-4"
          /* pause on desktop hover */
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left fade */}
          <div className="absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/*
            KEY FIX — w-max lets the div grow to its natural content width
            so translateX(-50%) always scrolls exactly one set of logos,
            regardless of whether we're on a 375 px phone or a 1440 px desktop.
          */}
          <div
            className={`flex items-center w-max gap-6 sm:gap-10 md:gap-14
              collaborator-track${isPaused ? ' collaborator-track--paused' : ''}`}
          >
            {marqueeItems.map((item, i) => {
              const Logo = item.component
              return (
                <div
                  key={`${item.id}-${i}`}
                  title={item.name}
                  className="inline-flex items-center justify-center shrink-0
                    opacity-90 hover:opacity-100 hover:scale-105
                    transition-all duration-300 cursor-pointer"
                >
                  <Logo />
                </div>
              )
            })}
          </div>

          {/* Right fade */}
          <div className="absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
