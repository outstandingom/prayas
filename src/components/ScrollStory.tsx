// src/components/ScrollStory.tsx
export default function ScrollStory() {
  return (
    <section className="bg-[#263238]/5 border-y border-[#263238]/10 w-full">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] mb-10 text-center">
          Our <span className="text-[#FFF314] drop-shadow-md">Journey</span> & Mission
        </h2>
        <div className="space-y-8 text-[#263238]/80 text-base sm:text-lg md:text-xl leading-relaxed">
          <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-[#FFF314] first-letter:mr-2 first-letter:float-left first-letter:drop-shadow-sm font-medium text-[#263238]">
            Prayas is a non-profit organization dedicated to creating meaningful and sustainable change in society. Established in 2001, we have been working towards empowering communities and improving lives through education, healthcare, social awareness, and community development initiatives.
          </p>
          <p>
            For over two decades, Prayas has been committed to supporting underprivileged families, children, women, and communities by providing opportunities, resources, and guidance for a better future. Our efforts focus on building a society where every individual gets the chance to learn, grow, and live with dignity.
          </p>
          <p>
            With the support of volunteers, donors, and well-wishers, we have positively impacted thousands of lives across different communities. Through our various initiatives, we continue to work towards education, empowerment, environmental awareness, skill development, and social welfare. Our journey is driven by compassion, commitment, and the belief that even small efforts can create a lasting impact. Together, we strive to bring hope, opportunity, and transformation to those who need it the most.
          </p>
        </div>
      </div>
    </section>
  )
}
