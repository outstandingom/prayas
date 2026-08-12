import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const projects = [
  {
    id: 1,
    title: 'Project Sindoda (Plastic Mukti)',
    description: 'Transforming Sindoda into a completely plastic‑free zone through community action, waste segregation drives, and sustainable rural alternatives.',
    image: '/Sindoda/IMG_20191217_133958.jpg',
    date: '2023 – Ongoing',
    link: '/project-sindoda',
    badge: 'Environmental Action',
  },
  {
    id: 2,
    title: 'Kargil Vatika – Memorial Forest',
    description: 'A living tribute to our brave soldiers – planting thousands of native trees to build a lush memorial forest and restore green ecological balance.',
    image: '/TREEGROW.jpg',
    date: '2022 – Ongoing',
    link: '/environment/kargil-vatika',
    badge: 'Reforestation Drive',
  },
  {
    id: 3,
    title: 'Health Camp in Rural Uttar Pradesh',
    description: 'Organizing free specialized medical check‑ups, diagnostic care, free medicines, and health awareness drives for over 500+ underserved villagers.',
    image: '/healthhj.jpeg',
    date: 'January 2025',
    link: '/healthcare/health-camps',
    badge: 'Medical Outreach',
  },
  {
    id: 4,
    title: 'Digital Literacy for 1000 Girls',
    description: 'Empowering young women and girls with computer literacy, coding basics, digital skills, and internet safety training to build self-reliant futures.',
    image: '/assets/education/primary-learning.jpeg',
    date: '2024 – Ongoing',
    link: '/education/digital-literacy',
    badge: 'Education & Tech',
  },
];

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      scrollRight();
    }, 4500); // Wait for a few seconds on each section
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-white text-[#263238] py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-gray-200/80">
      
      {/* ─── Section Header ─── */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight">
          {t('featured.title', 'Featured Projects & Events')}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 mx-auto rounded-full shadow-xs" />
        <p className="text-xs sm:text-sm text-gray-500 font-mono uppercase tracking-wider pt-1">
          Swipe or use arrows to explore our initiatives
        </p>
      </div>

      {/* ─── Horizontal Scrollable Card Slider ─── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Buttons */}
        <button 
          onClick={scrollLeft}
          className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#263238] shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={scrollRight}
          className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#263238] shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="w-full overflow-x-auto hide-scrollbar pb-6 snap-x snap-mandatory rounded-3xl"
        >
          <div className="flex w-max">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] lg:w-[calc(72rem-4rem)] max-w-full shrink-0 snap-center relative px-1 sm:px-2"
              >
                <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/90 shadow-xl overflow-hidden flex flex-col lg:flex-row gap-6 items-center">
                  {/* Top Accent Stripe (Horizontal Layout now) */}
                  <div className="absolute top-0 left-2 right-2 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-t-3xl" />

                  {/* Photo Column */}
                  <div className="relative w-full lg:w-1/2 aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-sm border border-gray-100 group shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-800 shadow-sm border border-gray-100">
                      {project.badge}
                    </div>

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 text-white text-xs font-mono font-semibold flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                      <Calendar size={14} className="text-amber-400" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="w-full lg:w-1/2 space-y-4 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-amber-800 uppercase tracking-widest">
                        <Sparkles size={14} />
                        <span>FEATURED INITIATIVE</span>
                      </div>
                      {/* Card Index Counter */}
                      <div className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-[#263238] text-xs font-mono font-extrabold tracking-widest">
                        0{idx + 1} / 0{projects.length}
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#263238] tracking-tight leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans font-normal">
                      {project.description}
                    </p>

                    <div className="pt-2">
                      <Link
                        to={project.link}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold bg-[#F5B800] hover:bg-[#E5AA00] text-[#263238] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-amber-400/40 w-max"
                      >
                        <span>Explore Initiative</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom Action Button ─── */}
      <div className="text-center pt-2 pb-4">
        <Link
          to="/our-work"
          className="inline-flex items-center gap-2 bg-[#263238] hover:bg-[#F5B800] text-white hover:text-[#263238] font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm border border-gray-200"
        >
          <span>View All NGO Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Hide scrollbar styles for this component */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
