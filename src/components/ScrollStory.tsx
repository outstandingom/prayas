export default function ScrollStory() {
  return (
    <section className="bg-[#263238]/5 border-y border-[#263238]/10 w-full">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Heading – pure Forte font */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] mb-10 text-center"
          style={{ fontFamily: 'Forte, cursive' }}
        >
          About Us
        </h2>

        {/* YouTube Video Embed */}
        <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/rvmEz9RiDZ8?si=UEfDMTTiGRuajtfi"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* First paragraph with dropped capital */}
        <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-[#FFF314] first-letter:mr-2 first-letter:float-left first-letter:drop-shadow-sm font-medium text-[#263238]">
          Prayas is a non-profit organization dedicated to creating meaningful and sustainable change in society. Established in 2001, we have been working towards empowering communities and improving lives through education, healthcare, social awareness, and community development initiatives.
        </p>
        <p className="text-[#263238]">
          For over two decades, Prayas has been committed to supporting underprivileged families, children, women, and communities by providing opportunities, resources, and guidance for a better future. Our efforts focus on building a society where every individual gets the chance to learn, grow, and live with dignity.
        </p>
        <p className="text-[#263238]">
          With the support of volunteers, donors, and well-wishers, we have positively impacted thousands of lives across different communities. Through our various initiatives, we continue to work towards education, empowerment, environmental awareness, skill development, and social welfare. Our journey is driven by compassion, commitment, and the belief that even small efforts can create a lasting impact. Together, we strive to bring hope, opportunity, and transformation to those who need it the most.
        </p>
      </div>
    </section>
  );
}
