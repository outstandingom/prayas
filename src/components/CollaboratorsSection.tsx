// src/components/CollaboratorsSection.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// ─── COLLABORATOR LOGOS ───────────────────────────────────────────────────────

function NRLMLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1 font-sans">
      <img
        src="/nrlm-logo.png"
        alt="NRLM - National Rural Livelihoods Mission"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-extrabold tracking-wide text-gray-900 font-sans">
          NRLM
        </span>
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gray-600 font-sans">
          Nat. Rural Livelihoods Mission
        </span>
      </div>
    </div>
  )
}

function NULMLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1 font-sans">
      <img
        src="/nulm-logo.png"
        alt="NULM-MP"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-extrabold tracking-wide text-gray-900 font-sans">
          NULM-MP
        </span>
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gray-600 font-sans">
          Nat. Urban Livelihoods Mission
        </span>
      </div>
    </div>
  )
}

function IndorePrasashanLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1 font-sans">
      <img
        src="/indore-prasashan-logo.png"
        alt="Indore Prasashan"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-extrabold tracking-wide text-gray-900 font-sans">
          Indore Prasashan
        </span>
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gray-600 font-sans">
          District Administration
        </span>
      </div>
    </div>
  )
}

function IMCLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1 font-sans">
      <img
        src="/imc-logo.png"
        alt="Indore Municipal Corporation"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-extrabold tracking-wide text-gray-900 font-sans">
          IMC
        </span>
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gray-600 font-sans">
          Indore Municipal Corporation
        </span>
      </div>
    </div>
  )
}

function MPGovtLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1 font-sans">
      <img
        src="/mp-govt-logo.png"
        alt="Madhya Pradesh Government"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-extrabold tracking-wide text-gray-900 font-sans">
          Madhyapradesh Govt.
        </span>
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gray-600 font-sans">
          मध्यप्रदेश शासन
        </span>
      </div>
    </div>
  )
}

function RuralDevelopmentLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1 font-sans">
      <img
        src="/rural-dev-logo.png"
        alt="Ministry of Rural Development"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-extrabold tracking-wide text-gray-900 font-sans">
          Rural Development
        </span>
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gray-600 font-sans">
          Govt. of India
        </span>
      </div>
    </div>
  )
}

function MahilaBalVikasLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1 font-sans">
      <img
        src="/mahila-bal-vikas-logo.png"
        alt="Mahila and Bal Vikas Mantralaya"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0 drop-shadow-sm"
      />
      <div className="flex flex-col leading-tight text-left">
        <span className="text-base sm:text-xl font-extrabold tracking-wide text-gray-900 font-sans">
          Mahila & Bal Vikas
        </span>
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-gray-600 font-sans">
          Mantralaya
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
    <section className="w-full py-10 sm:py-14 bg-white overflow-hidden select-none border-t border-gray-100 font-sans">

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
          animation: collaborator-scroll 35s linear infinite;
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
                    opacity-95 hover:opacity-100 hover:scale-105
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

