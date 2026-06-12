import { motion } from 'framer-motion'

const paragraphs = [
  "From the remote villages of rural India to bustling urban slums, our dedicated team of volunteers works tirelessly to bring education, healthcare, and livelihood opportunities to those who need them most.",
  "We believe that true empowerment begins with access. Access to a classroom. Access to clean drinking water. Access to a doctor who understands. By addressing these foundational needs, we create a ripple effect of change that lifts entire communities.",
  "Pellentesque imperdiet vehicula sem vitae porttitor. Vestibulum non venenatis massa. Donec ac venenatis lacus. Fusce sodales leo non enim eleifend aliquam. Cras eget nisl eu metus tincidunt porta. Donec mattis, quam eget varius pellentesque.",
  "Over the last decade, our focus has expanded to include critical environmental interventions. Through grassroots awareness and direct action, we are planting trees, cleaning waterways, and teaching the next generation to be stewards of the earth.",
  "We don't just build infrastructure; we build resilience. By partnering with local leaders and training community members, we ensure that every initiative we start is sustainable long after we leave. This is not charity—this is partnership."
]

export default function ScrollStory() {
  return (
    <section className="bg-white text-navy py-32 px-6 overflow-x-hidden relative z-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-emerald font-mono text-xs uppercase tracking-widest font-semibold">Our Journey</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-navy">The story of our impact</h2>
          <div className="mt-8 text-navy/40 font-mono text-sm flex flex-col items-center gap-2">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              Scroll &darr;
            </motion.div>
          </div>
        </div>

        <div className="space-y-16">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ x: "-50vw", opacity: 0.1 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="text-xl md:text-2xl leading-relaxed text-navy/80 font-medium"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
