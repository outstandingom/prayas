import { useTranslation } from 'react-i18next';

export default function ScrollStory() {
  const { t } = useTranslation();

  return (
    <>
      {/* Load Walter Turncoat font from Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Walter+Turncoat&display=swap');
          .walter-turncoat {
            font-family: 'Walter Turncoat', cursive;
          }
        `}
      </style>

      <section className="bg-[#263238]/5 border-y border-[#263238]/10 w-full">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          {/* Heading with Walter Turncoat font */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] mb-10 text-center walter-turncoat">
            {t('story.header.part1', ' ')}
            <span className="text-[#FFF314] drop-shadow-md">{t('story.header.part2', 'About')}</span>
            {t('story.header.part3', ' US')}
          </h2>

          {/* --- YouTube Video Embed --- */}
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

          {/* First paragraph also uses Walter Turncoat for a unique style */}
          <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-[#FFF314] first-letter:mr-2 first-letter:float-left first-letter:drop-shadow-sm font-medium text-[#263238] walter-turncoat">
            {t('story.paragraphs.p1', 'Prayas is a non-profit organization dedicated to creating meaningful and sustainable change in society. Established in 2001, we have been working towards empowering communities and improving lives through education, healthcare, social awareness, and community development initiatives.')}
          </p>
          <p>
            {t('story.paragraphs.p2', 'For over two decades, Prayas has been committed to supporting underprivileged families, children, women, and communities by providing opportunities, resources, and guidance for a better future. Our efforts focus on building a society where every individual gets the chance to learn, grow, and live with dignity.')}
          </p>
          <p>
            {t('story.paragraphs.p3', 'With the support of volunteers, donors, and well-wishers, we have positively impacted thousands of lives across different communities. Through our various initiatives, we continue to work towards education, empowerment, environmental awareness, skill development, and social welfare. Our journey is driven by compassion, commitment, and the belief that even small efforts can create a lasting impact. Together, we strive to bring hope, opportunity, and transformation to those who need it the most.')}
          </p>
        </div>
      </section>
    </>
  );
}
