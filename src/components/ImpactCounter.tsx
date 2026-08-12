import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, HeartHandshake, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface CounterCardProps {
  end: number;
  suffix?: string;
  label: string;
  description: string;
  icon: any;
}

function CounterCard({ end, suffix = '+', label, description, icon: Icon }: CounterCardProps) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: end,
              duration: 2.4,
              ease: 'power3.out',
              onUpdate: function () {
                setCount(Math.floor(this.targets()[0].val));
              },
            }
          );
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [end]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="gsap-impact-card bg-white rounded-3xl p-8 border border-gray-200/90 shadow-xl hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-full"
    >
      {/* Top Gold Gradient Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400" />

      <div className="space-y-4">
        {/* Icon & Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 flex items-center justify-center group-hover:bg-[#F5B800] group-hover:text-[#263238] transition-all shadow-sm">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-800 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            REAL IMPACT
          </span>
        </div>

        {/* Premium Monospace Counter Number */}
        <div className="text-4xl sm:text-5xl lg:text-5xl font-black font-mono tracking-tighter bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform origin-left">
          {count.toLocaleString()}
          <span className="text-amber-500">{suffix}</span>
        </div>

        {/* Label */}
        <h3 className="text-sm font-extrabold font-sans text-[#263238] uppercase tracking-wider">
          {label}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-normal">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ImpactCounter() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const counters = useMemo(
    () => [
      {
        end: 25000,
        suffix: '+',
        label: t('impact.counters.lives.label', 'LIVES IMPACTED'),
        description: t(
          'impact.counters.lives.desc',
          'Through healthcare camps, education programs, and women empowerment initiatives across rural India.'
        ),
        icon: Users,
      },
      {
        end: 1200,
        suffix: '+',
        label: t('impact.counters.volunteers.label', 'ACTIVE VOLUNTEERS'),
        description: t(
          'impact.counters.volunteers.desc',
          'Dedicated individuals working tirelessly in 27 states to bring change at the grassroots level.'
        ),
        icon: HeartHandshake,
      },
      {
        end: 350,
        suffix: '+',
        label: t('impact.counters.projects.label', 'PROJECTS COMPLETED'),
        description: t(
          'impact.counters.projects.desc',
          'From building schools to organizing health camps, each project has transformed communities.'
        ),
        icon: Award,
      },
      {
        end: 500,
        suffix: '+',
        label: t('impact.counters.donors.label', 'REGULAR DONORS'),
        description: t(
          'impact.counters.donors.desc',
          'Compassionate supporters who believe in our mission and contribute monthly to sustain our work.'
        ),
        icon: ShieldCheck,
      },
    ],
    [t]
  );

  // GSAP ScrollTrigger Section Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-impact-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-impact-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white text-[#263238] relative overflow-hidden select-none"
    >
      {/* ─── Ambient Glow Backdrop ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Section Header ─── */}
        <div className="gsap-impact-header text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight font-sans">
            {t('impact.header.title', 'Making a Difference Together')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 mx-auto rounded-full shadow-xs" />


        </div>

        {/* ─── Counters Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {counters.map((counter, index) => (
            <CounterCard
              key={index}
              end={counter.end}
              suffix={counter.suffix}
              label={counter.label}
              description={counter.description}
              icon={counter.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
