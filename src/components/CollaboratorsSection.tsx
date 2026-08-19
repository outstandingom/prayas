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
      <svg className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" fill="#166534" />
        {/* Wheat stalk left */}
        <path d="M35 72 Q30 55 38 42" stroke="#FDE68A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="34" cy="38" rx="5" ry="8" fill="#FDE68A" transform="rotate(-20 34 38)" />
        <ellipse cx="30" cy="48" rx="5" ry="7" fill="#FDE68A" transform="rotate(-30 30 48)" />
        {/* Wheat stalk right */}
        <path d="M65 72 Q70 55 62 42" stroke="#FDE68A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="66" cy="38" rx="5" ry="8" fill="#FDE68A" transform="rotate(20 66 38)" />
        <ellipse cx="70" cy="48" rx="5" ry="7" fill="#FDE68A" transform="rotate(30 70 48)" />
        {/* Person silhouette */}
        <circle cx="50" cy="40" r="7" fill="#FDE68A" />
        <path d="M38 72 Q42 55 50 52 Q58 55 62 72" fill="#FDE68A" />
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-black text-green-800 tracking-wider">NRLM</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-green-700 tracking-wide uppercase leading-tight">
          Nat. Rural Livelihoods<br />Mission
        </span>
      </div>
    </div>
  )
}

function NULMLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <svg className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" fill="#1D4ED8" />
        {/* Buildings */}
        <rect x="20" y="55" width="14" height="25" rx="1" fill="white" opacity="0.9" />
        <rect x="22" y="45" width="10" height="10" rx="1" fill="white" opacity="0.9" />
        <rect x="36" y="42" width="18" height="38" rx="1" fill="white" />
        <rect x="40" y="32" width="10" height="10" rx="1" fill="white" />
        <rect x="56" y="50" width="16" height="30" rx="1" fill="white" opacity="0.9" />
        <rect x="58" y="40" width="12" height="10" rx="1" fill="white" opacity="0.9" />
        {/* Windows */}
        <rect x="39" y="50" width="4" height="5" rx="0.5" fill="#1D4ED8" opacity="0.5" />
        <rect x="47" y="50" width="4" height="5" rx="0.5" fill="#1D4ED8" opacity="0.5" />
        <rect x="39" y="60" width="4" height="5" rx="0.5" fill="#1D4ED8" opacity="0.5" />
        <rect x="47" y="60" width="4" height="5" rx="0.5" fill="#1D4ED8" opacity="0.5" />
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-black text-blue-800 tracking-wider">NULM</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-blue-700 tracking-wide uppercase leading-tight">
          Nat. Urban Livelihoods<br />Mission
        </span>
      </div>
    </div>
  )
}

function IndorePrasashanLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" fill="#7C3AED" stroke="#6D28D9" strokeWidth="2" />
        <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2.5" fill="none" />
        <circle cx="50" cy="50" r="4" fill="white" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180
          return <line key={i}
            x1={50 + 6 * Math.cos(a)} y1={50 + 6 * Math.sin(a)}
            x2={50 + 18 * Math.cos(a)} y2={50 + 18 * Math.sin(a)}
            stroke="white" strokeWidth="1.5" />
        })}
        <text x="50" y="83" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">INDORE</text>
        <text x="50" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PRASASHAN</text>
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm font-black text-purple-900 tracking-wide">Indore</span>
        <span className="text-sm font-black text-purple-700 tracking-wide">Prasashan</span>
        <span className="text-[7px] sm:text-[8px] font-semibold text-purple-500 uppercase tracking-wider">
          District Administration
        </span>
      </div>
    </div>
  )
}

function IMCLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" fill="#0F766E" />
        <rect x="20" y="65" width="60" height="5" rx="1" fill="white" />
        <path d="M30 65 L50 30 L70 65 Z" fill="white" opacity="0.9" />
        <rect x="28" y="50" width="5" height="15" rx="1" fill="white" />
        <rect x="40" y="50" width="5" height="15" rx="1" fill="white" />
        <rect x="52" y="50" width="5" height="15" rx="1" fill="white" />
        <rect x="64" y="50" width="5" height="15" rx="1" fill="white" />
        <circle cx="50" cy="48" r="5" fill="#0F766E" />
        <text x="50" y="51.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">★</text>
        <text x="50" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">IMC</text>
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-lg sm:text-xl font-black text-teal-800 tracking-widest">IMC</span>
        <span className="text-[7px] sm:text-[8px] font-bold text-teal-600 tracking-wide uppercase leading-tight">
          Indore Municipal<br />Corporation
        </span>
      </div>
    </div>
  )
}

function MPGovtLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="8" y="38" width="84" height="10" fill="#FF9933" />
        <rect x="8" y="48" width="84" height="10" fill="white" />
        <rect x="8" y="58" width="84" height="10" fill="#138808" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="50" cy="50" r="8" stroke="#000080" strokeWidth="2" fill="none" />
        <circle cx="50" cy="50" r="2" fill="#000080" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180
          return <line key={i}
            x1={50 + 3 * Math.cos(a)} y1={50 + 3 * Math.sin(a)}
            x2={50 + 7.5 * Math.cos(a)} y2={50 + 7.5 * Math.sin(a)}
            stroke="#000080" strokeWidth="0.8" />
        })}
        <text x="50" y="84" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">मध्यप्रदेश</text>
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm font-black text-slate-800 tracking-wide">Madhya Pradesh</span>
        <span className="text-sm font-bold text-orange-600 tracking-wide">Government</span>
        <span className="text-[7px] sm:text-[8px] font-semibold text-slate-500 uppercase tracking-wider">
          State of India
        </span>
      </div>
    </div>
  )
}

function RuralDevelopmentLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" fill="#92400E" />
        <circle cx="50" cy="28" r="10" fill="#FDE68A" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180
          return <line key={i}
            x1={50 + 12 * Math.cos(a)} y1={28 + 12 * Math.sin(a)}
            x2={50 + 17 * Math.cos(a)} y2={28 + 17 * Math.sin(a)}
            stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
        })}
        <path d="M10 70 Q35 45 50 55 Q65 65 90 45 L90 85 L10 85 Z" fill="#16A34A" />
        <path d="M38 70 L50 52 L62 70 Z" fill="#D97706" />
        <rect x="44" y="62" width="12" height="8" rx="1" fill="#78350F" />
        <path d="M45 85 Q47 75 50 70 Q53 75 55 85" fill="#D97706" opacity="0.6" />
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm font-black text-amber-900 tracking-wide">Rural</span>
        <span className="text-sm font-black text-green-700 tracking-wide">Development</span>
        <span className="text-[7px] sm:text-[8px] font-semibold text-amber-700 uppercase tracking-wider">
          Govt. of India
        </span>
      </div>
    </div>
  )
}

function MahilaBalVikasLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" fill="#BE185D" />
        {/* Woman silhouette */}
        <circle cx="42" cy="30" r="10" fill="#FDE68A" />
        <path d="M28 75 Q32 50 42 47 Q52 50 56 75 Z" fill="#FDE68A" />
        {/* Child silhouette */}
        <circle cx="63" cy="37" r="7" fill="#FEF3C7" />
        <path d="M54 75 Q57 57 63 55 Q69 57 72 75 Z" fill="#FEF3C7" />
        {/* Heart */}
        <path d="M48 43 C48 41,46 39,44 40 C42 41,42 43,44 46 L48 50 L52 46 C54 43,54 41,52 40 C50 39,48 41,48 43 Z" fill="#FB7185" />
        {/* Star */}
        <path d="M50 78 L52 74 L56 76 L53 72 L57 70 L53 70 L52 66 L50 70 L48 66 L47 70 L43 70 L47 72 L44 76 L48 74 Z" fill="#FDE68A" opacity="0.85" />
      </svg>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm font-black text-pink-800 tracking-wide">Mahila & Bal</span>
        <span className="text-sm font-black text-pink-600 tracking-wide">Vikas</span>
        <span className="text-[7px] sm:text-[8px] font-semibold text-pink-500 uppercase tracking-wider">
          Mantralaya
        </span>
      </div>
    </div>
  )
}

// ─── REGISTRY ─────────────────────────────────────────────────────────────────

const COLLABORATORS = [
  { id: 'mpnews',            component: MPNewsLogo },
  { id: 'sos',               component: SOSInfrabullsLogo },
  { id: 'rakuten',           component: RakutenLogo },
  { id: 'globant',           component: GlobantLogo },
  { id: 'ngo-assoc',         component: AllIndiaNGOLogo },
  { id: 'nabard',            component: NabardLogo },
  { id: 'hdfc',              component: HDFCParivartanLogo },
  { id: 'nrlm',              component: NRLMLogo },
  { id: 'nulm',              component: NULMLogo },
  { id: 'indore-prasashan',  component: IndorePrasashanLogo },
  { id: 'imc',               component: IMCLogo },
  { id: 'mp-govt',           component: MPGovtLogo },
  { id: 'rural-dev',         component: RuralDevelopmentLogo },
  { id: 'mahila-bal-vikas',  component: MahilaBalVikasLogo },
]

// ─── SECTION ──────────────────────────────────────────────────────────────────

export default function CollaboratorsSection() {
  const { t } = useTranslation()
  const [isPaused, setIsPaused] = useState(false)

  // 2× duplication → seamless -50% loop
  const marqueeItems = [...COLLABORATORS, ...COLLABORATORS]

  return (
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden select-none">

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
                  className="inline-flex items-center justify-center shrink-0
                    grayscale opacity-75
                    hover:grayscale-0 hover:opacity-100 hover:scale-105
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
