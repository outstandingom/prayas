// src/components/ScrollStory.tsx
import { useRef } from 'react'

const CONTENT = [
  "From the remote villages of rural India to bustling urban slums, our dedicated team works tirelessly to bring education, healthcare, and livelihood opportunities to those who need them most.",
  "We believe true empowerment begins with access – to classrooms, clean water, and healthcare. We create a ripple effect that lifts entire communities.",
  "Through grassroots awareness and direct action, we plant trees, clean waterways, and teach the next generation to be stewards of the earth.",
  "We don't just build infrastructure; we build resilience. By training community members, we ensure every initiative is sustainable long after we leave."
]

export default function ScrollStory() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="space-y-6 text-[#263238] text-base sm:text-lg leading-relaxed">
        <p>{CONTENT[0]}</p>
        <p>{CONTENT[1]} {CONTENT[2]}</p>
        <p>{CONTENT[3]}</p>
      </div>
    </div>
  )
}
