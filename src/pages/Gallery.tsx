import { motion } from 'framer-motion';

// Replace these with your actual NGO photos
const ASSETS = [
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    title: 'Education for all',
  },
  {
    src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    title: 'Community health',
  },
  {
    src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80',
    title: 'Animal welfare',
  },
  {
    src: 'https://images.unsplash.com/photo-1593113514619-33b934789d6e?w=800&q=80',
    title: 'Food security',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    title: 'Environment',
  },
  {
    src: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&q=80',
    title: 'Women empowerment',
  },
  {
    src: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80',
    title: 'Skill development',
  },
  {
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    title: 'Child welfare',
  },
  {
    src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
    title: 'Rural development',
  },
  {
    src: 'https://images.unsplash.com/photo-1552697664-1505303c2bb6?w=800&q=80',
    title: 'Healthcare',
  },
  {
    src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    title: 'Elderly care',
  },
  {
    src: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80',
    title: 'Disaster relief',
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#F1F8F5] flex flex-col items-center justify-start py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#263238]">
          Our <span className="text-[#FFF314]">Gallery</span>
        </h1>
        <p className="text-[#263238]/60 text-sm mt-2">
          Explore our work and impact
        </p>
      </div>

      {/* Grid Gallery - 4 images per row */}
      <div className="w-full max-w-6xl z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {ASSETS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white font-medium text-sm md:text-base drop-shadow">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
