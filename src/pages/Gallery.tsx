// src/pages/Gallery.tsx
import { motion } from 'framer-motion';

import DomeGallery, { type DomeGalleryImage } from '@/components/DomeGallery';

// Pure list of ground-level NGO photographs (strictly excluding hero banner duplicates and certificates)
const ngoGalleryImages: DomeGalleryImage[] = [
  { src: '/assets/education/children-group.jpg', alt: 'Children Group' },
  { src: '/assets/education/digital-literacy-lab.jpg', alt: 'Digital Literacy Lab' },
  { src: '/assets/education/EDUCATION.JPG', alt: 'EDUCATION' },
  { src: '/assets/education/education1.jpeg', alt: 'Education1' },
  { src: '/assets/education/educational-workshop.jpg', alt: 'Educational Workshop' },
  { src: '/assets/education/primary-learning.jpeg', alt: 'Primary Learning' },
  { src: '/assets/education/sanskarshala-classroom.jpg', alt: 'Sanskarshala Classroom' },
  { src: '/assets/education/value-education.jpg', alt: 'Value Education' },
  { src: '/assets/environment/kargil-vatika-forest.jpg', alt: 'Kargil Vatika Forest' },
  { src: '/assets/environment/kargil-vatika-lakefront.jpg', alt: 'Kargil Vatika Lakefront' },
  { src: '/assets/environment/tree-plantation.png', alt: 'Tree Plantation' },
  { src: '/assets/healthcare/elderly-care.jpeg', alt: 'Elderly Care' },
  { src: '/assets/healthcare/eye-surgery-camp.jpg', alt: 'Eye Surgery Camp' },
  { src: '/assets/healthcare/health-camp.jpeg', alt: 'Health Camp' },
  { src: '/assets/healthcare/medical-aid.png', alt: 'Medical Aid' },
  { src: '/assets/relief/clean-water-tanker.jpeg', alt: 'Clean Water Tanker' },
  { src: '/assets/relief/eshram-labour-rights.jpeg', alt: 'Eshram Labour Rights' },
  { src: '/assets/relief/rural-development.jpeg', alt: 'Rural Development' },
  { src: '/assets/relief/volunteer-leadership.jpeg', alt: 'Volunteer Leadership' },
  { src: '/assets/women-empowerment/2women-empowerment-hero.jpg', alt: '2women Empowerment Hero' },
  { src: '/assets/women-empowerment/handicraft-center.jpeg', alt: 'Handicraft Center' },
  { src: '/assets/women-empowerment/sabji-wali-didi.jpeg', alt: 'Sabji Wali Didi' },
  { src: '/assets/women-empowerment/sewing-training.jpeg', alt: 'Sewing Training' },
  { src: '/assets/women-empowerment/shg-collective.jpg', alt: 'Shg Collective' },
  { src: '/assets/women-empowerment/women-empowerment.jpg', alt: 'Women Empowerment' },
  { src: '/assets/women-empowerment/women-empowerment2.jpg', alt: 'Women Empowerment2' },
  { src: '/CHILDRENGROUP.jpg', alt: 'CHILDRENGROUP' },
  { src: '/education4.JPG', alt: 'Education4' },
  { src: '/empowering_section_image.png', alt: 'Empowering Section Image' },
  { src: '/healthcaret.jpg', alt: 'Healthcaret' },
  { src: '/healthhj.jpeg', alt: 'Healthhj' },
  { src: '/IMG-20.jpg', alt: 'IMG 20' },
  { src: '/IMG-21.jpg', alt: 'IMG 21' },
  { src: '/IMG-23.jpeg', alt: 'IMG 23' },
  { src: '/IMG-24.jpeg', alt: 'IMG 24' },
  { src: '/IMG-25.jpeg', alt: 'IMG 25' },
  { src: '/IMG-26.jpeg', alt: 'IMG 26' },
  { src: '/IMG-27.jpeg', alt: 'IMG 27' },
  { src: '/P1039322.JPG', alt: 'P1039322' },
  { src: '/P1039409.JPG', alt: 'P1039409' },
  { src: '/plastic-mukti-hero-rotated.jpg', alt: 'Plastic Mukti Hero Rotated' },
  { src: '/plastic-mukti-hero.jpg', alt: 'Plastic Mukti Hero' },
  { src: '/PRAYASHEALTHCAMP.jpeg', alt: 'PRAYASHEALTHCAMP' },
  { src: '/ruraldevelopment.jpeg', alt: 'Ruraldevelopment' },
  { src: '/Sindoda/IMG_20191022_121001 (1).jpg', alt: 'IMG 20191022 121001 (1)' },
  { src: '/Sindoda/IMG_20191030_112427.jpg', alt: 'IMG 20191030 112427' },
  { src: '/Sindoda/IMG_20191104_162653.jpg', alt: 'IMG 20191104 162653' },
  { src: '/Sindoda/IMG_20191106_104516.jpg', alt: 'IMG 20191106 104516' },
  { src: '/Sindoda/IMG_20191106_111020.jpg', alt: 'IMG 20191106 111020' },
  { src: '/Sindoda/IMG_20191113_121346.jpg', alt: 'IMG 20191113 121346' },
  { src: '/Sindoda/IMG_20191115_115816.jpg', alt: 'IMG 20191115 115816' },
  { src: '/Sindoda/IMG_20191115_115817.jpg', alt: 'IMG 20191115 115817' },
  { src: '/Sindoda/IMG_20191127_112906.jpg', alt: 'IMG 20191127 112906' },
  { src: '/Sindoda/IMG_20191127_125013.jpg', alt: 'IMG 20191127 125013' },
  { src: '/Sindoda/IMG_20191213_152317.jpg', alt: 'IMG 20191213 152317' },
  { src: '/Sindoda/IMG_20191213_152320.jpg', alt: 'IMG 20191213 152320' },
  { src: '/Sindoda/IMG_20191213_152330.jpg', alt: 'IMG 20191213 152330' },
  { src: '/Sindoda/IMG_20191217_133958.jpg', alt: 'IMG 20191217 133958' },
  { src: '/Sindoda/IMG_20191217_134103.jpg', alt: 'IMG 20191217 134103' },
  { src: '/Sindoda/IMG_20191217_134432.jpg', alt: 'IMG 20191217 134432' },
  { src: '/Sindoda/IMG_20191217_140306.jpg', alt: 'IMG 20191217 140306' },
  { src: '/Sindoda/IMG_20191217_144413.jpg', alt: 'IMG 20191217 144413' },
  { src: '/Tree.png', alt: 'Tree' },
  { src: '/TREEGROW.jpg', alt: 'TREEGROW' },
  { src: '/TREEGROW2.jpg', alt: 'TREEGROW2' },
  { src: '/women-empowerment-hero.jpg', alt: 'Women Empowerment Hero' },
  { src: '/WOMEN.jpeg', alt: 'WOMEN' },
  { src: '/women.JPG', alt: 'Women' },
  { src: '/WOMEN2.jpeg', alt: 'WOMEN2' },
];

export default function Gallery() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-50 via-gray-50 to-white text-[#263238] flex flex-col pt-[var(--navbar-height,80px)] relative overflow-hidden">
      {/* ===== HEADER BAR ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-center shrink-0">


        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#263238]"
        >
          Our <span className="text-red-600">Gallery</span>
        </motion.h1>
      </div>

      {/* ===== 3D DOME GALLERY CANVAS ===== */}
      <div className="relative w-full flex-1 min-h-0">
        <DomeGallery
          images={ngoGalleryImages}
          fit={0.4}
          fitBasis="auto"
          minRadius={450}
          maxRadius={1100}
          padFactor={0.2}
          overlayBlurColor="#F8FAFC"
          maxVerticalRotationDeg={10}
          dragSensitivity={18}
          enlargeTransitionMs={350}
          segments={35}
          dragDampening={2}
          openedImageWidth="440px"
          openedImageHeight="440px"
          imageBorderRadius="24px"
          openedImageBorderRadius="24px"
          grayscale={false}
          autoRotateSpeed={0.12}
        />
      </div>


    </div>
  );
}
