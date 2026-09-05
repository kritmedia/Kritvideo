import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Youtube, 
  Smartphone, 
  Mic2, 
  Briefcase, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface EditFormat {
  id: string;
  number: string;
  title: string;
  tagline: string;
  statement: string;
  format: string;
  specs: string;
  turnaround: string;
  icon: React.ElementType;
}

const EDIT_FORMATS: EditFormat[] = [
  {
    id: 'youtube',
    number: '01',
    title: 'YOUTUBE VIDEO EDITING',
    tagline: '16:9 • LONG-FORM • 4K',
    statement: 'Talking heads, interviews, documentaries, educational videos and everything in between. We turn your raw footage into a YouTube video that\'s clear, engaging and ready to upload.',
    format: '16:9 • LONG-FORM • 4K',
    specs: 'EXPLORE YOUTUBE EDITING →',
    turnaround: 'YOUTUBE',
    icon: Youtube,
  },
  {
    id: 'vertical',
    number: '02',
    title: 'SHORTS & REELS',
    tagline: '9:16 • SHORT-FORM • SOCIAL',
    statement: 'Got a great moment buried inside a longer video? We\'ll find it, tighten it and turn it into a short-form edit made for Reels, Shorts and TikTok.',
    format: '9:16 • SHORT-FORM • SOCIAL',
    specs: 'EXPLORE SHORT-FORM EDITING →',
    turnaround: 'SHORT-FORM',
    icon: Smartphone,
  },
  {
    id: 'podcast',
    number: '03',
    title: 'PODCAST EDITING',
    tagline: 'MULTI-CAM • AUDIO • CLIPS',
    statement: 'We\'ll sync the cameras, clean up the conversation, switch angles naturally and turn the best moments into clips you can share across your channels.',
    format: 'MULTI-CAM • AUDIO • CLIPS',
    specs: 'EXPLORE PODCAST EDITING →',
    turnaround: 'PODCAST',
    icon: Mic2,
  },
  {
    id: 'ads',
    number: '04',
    title: 'COMMERCIAL & BRAND VIDEO',
    tagline: 'ADS • BRAND FILMS • SOCIAL',
    statement: 'Product videos, social ads, launch films and branded content. We take the footage and turn it into something polished, clear and ready to put in front of your audience.',
    format: 'ADS • BRAND FILMS • SOCIAL',
    specs: 'EXPLORE BRAND VIDEO →',
    turnaround: 'BRAND VIDEO',
    icon: Briefcase,
  },
];

export default function SectionServices() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Continuous floating position [0..3]
  const targetPosRef = useRef<number>(1);
  const currentPosRef = useRef<number>(1);
  const [activeIdx, setActiveIdx] = useState<number>(1);

  // Direct GPU Transform Application (Bypasses React VDOM reconciliation for 120 FPS fluid speed)
  const applyTransforms = useCallback((pos: number) => {
    EDIT_FORMATS.forEach((_, idx) => {
      const el = cardRefs.current[idx];
      if (!el) return;

      const diff = idx - pos;
      const absDiff = Math.abs(diff);

      // Hide offscreen cards to preserve GPU fill-rate
      if (absDiff > 2.4) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.visibility = 'hidden';
        return;
      }

      el.style.visibility = 'visible';

      const translateX = diff * 420;
      const translateZ = -absDiff * 80;
      const rotateY = Math.max(-25, Math.min(25, -diff * 18));
      const rotateZ = Math.max(-4, Math.min(4, diff * 3));
      const translateY = absDiff * 20;
      const scale = Math.max(0.75, 1.05 - absDiff * 0.12);
      const opacity = Math.max(0, 1 - absDiff * 0.42);
      const zIndex = Math.round(30 - absDiff * 10);
      const isCenter = absDiff < 0.4;

      el.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${zIndex}`;
      el.style.pointerEvents = isCenter || absDiff < 1.2 ? 'auto' : 'none';

      // Dynamic rim lighting
      if (isCenter) {
        el.style.borderColor = 'rgba(245, 158, 11, 0.55)';
        el.style.boxShadow = '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 45px rgba(245, 158, 11, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
      } else {
        el.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        el.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.08)';
      }
    });
  }, []);

  // High-performance inertial RAF animation loop
  useEffect(() => {
    let animationFrameId: number;
    let isRunning = true;

    // Apply initial state
    applyTransforms(currentPosRef.current);

    const loop = () => {
      if (!isRunning) return;

      const diff = targetPosRef.current - currentPosRef.current;
      if (Math.abs(diff) > 0.001) {
        currentPosRef.current += diff * 0.20; // Snappy 0.20 damping for zero-lag tracking
        applyTransforms(currentPosRef.current);

        const newActive = Math.round(currentPosRef.current);
        setActiveIdx((prev) => (prev !== newActive ? newActive : prev));
      } else if (currentPosRef.current !== targetPosRef.current) {
        currentPosRef.current = targetPosRef.current;
        applyTransforms(currentPosRef.current);

        const newActive = Math.round(currentPosRef.current);
        setActiveIdx((prev) => (prev !== newActive ? newActive : prev));
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [applyTransforms]);

  // Scroll listener for sticky 3D card transitions
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionRef.current.offsetHeight - windowHeight;

      if (totalScrollable <= 50) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

      // Continuous target position across the 4 cards [0..3]
      const mappedPos = progress * (EDIT_FORMATS.length - 1);
      targetPosRef.current = Math.min(EDIT_FORMATS.length - 1, Math.max(0, mappedPos));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToCard = (index: number) => {
    targetPosRef.current = index;
  };

  const nextCard = () => {
    const next = Math.min(EDIT_FORMATS.length - 1, Math.round(targetPosRef.current) + 1);
    goToCard(next);
  };

  const prevCard = () => {
    const prev = Math.max(0, Math.round(targetPosRef.current) - 1);
    goToCard(prev);
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative lg:h-[260vh] select-none"
    >
      {/* Pinned 3D Perspective Viewport (Sticky on Desktop) */}
      <div className="sticky top-0 min-h-screen flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 pt-28 pb-12 overflow-hidden">
        
        {/* Background Ambient Wireframe Laser Lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="6%" y1="0%" x2="24%" y2="46%" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="24%" y1="46%" x2="50%" y2="88%" stroke="rgba(245,158,11,0.18)" strokeWidth="1.2" />
          <line x1="50%" y1="88%" x2="76%" y2="34%" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="76%" y1="34%" x2="94%" y2="0%" stroke="rgba(245,158,11,0.14)" strokeWidth="1.2" />
        </svg>

        {/* Ambient Warm Underglow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent blur-[140px] pointer-events-none" />

        {/* Section Header */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
              <span className="text-white">VIDEO EDITING SERVICES</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-white">
              Tell us what you're making.{' '}
              <span className="font-editorial-serif italic font-normal text-amber-300 block sm:inline">
                We'll handle the edit.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-normal leading-relaxed pt-1">
              We edit different kinds of video for different kinds of teams. The common part? You send us the footage and get a finished video back.
            </p>
          </div>

          {/* Section CTA */}
          <div className="flex items-center gap-3 text-xs font-mono-tech text-neutral-400 shrink-0">
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/services');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="px-4 py-2 rounded-full bg-neutral-950/80 border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white flex items-center gap-2 backdrop-blur-md shadow-sm transition-all cursor-pointer"
            >
              <span>VIEW ALL SERVICES ↗</span>
            </a>
          </div>
        </div>

        {/* 3D PERSPECTIVE CAROUSEL STAGE (Hardware Accelerated, Smooth Continuous Motion) */}
        <div 
          className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center my-3 z-10"
          style={{ perspective: '1600px' }}
        >
          <div className="relative w-full h-[470px] sm:h-[500px] flex items-center justify-center">
            
            {EDIT_FORMATS.map((format, idx) => {
              const Icon = format.icon;

              return (
                <div
                  key={format.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onClick={() => goToCard(idx)}
                  className="absolute w-[320px] sm:w-[360px] md:w-[390px] h-[450px] sm:h-[480px] rounded-[36px] cursor-pointer p-7 sm:p-8 flex flex-col justify-between select-none will-change-transform border border-white/[0.08]"
                  style={{
                    backgroundColor: 'rgba(16, 16, 20, 0.94)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  {/* Top Row: Technical Bracket Index { 01 } */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-xs font-bold tracking-wider text-neutral-300">
                      {`{ ${format.number} }`}
                    </span>
                    <span className="text-[10px] font-mono-tech uppercase font-bold px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300">
                      {format.turnaround}
                    </span>
                  </div>

                  {/* CENTER OBJECT: Floating 3D Glass Lens & Glowing Amber Core */}
                  <div className="relative w-full h-[180px] sm:h-[195px] flex items-center justify-center pointer-events-none my-1">
                    
                    {/* Glowing Amber Liquid Core Sphere */}
                    <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 blur-[2px] shadow-[0_0_50px_rgba(245,158,11,0.6)]" />

                    {/* Secondary Overlapping Ambient Orb */}
                    <div className="absolute -top-1 -right-3 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/80 to-transparent blur-[1px] opacity-75" />

                    {/* Background Tilted Glass Plate (Clean Specular Gradient, Zero GPU Blur Stalls) */}
                    <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] bg-gradient-to-br from-white/15 to-white/5 border border-white/25 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.6)] rotate-[-12deg]" />

                    {/* Foreground Glass Crystal Lens with Specular Highlight */}
                    <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] bg-gradient-to-br from-white/20 to-white/5 border border-white/35 shadow-[inset_0_1px_3px_rgba(255,255,255,0.6),0_15px_35px_rgba(0,0,0,0.5)] rotate-[8deg] flex items-center justify-center">
                      <Icon className="w-9 h-9 sm:w-10 sm:h-10 text-white drop-shadow-md" />
                    </div>

                  </div>

                  {/* BOTTOM: Service Title, Statement & Explore Link */}
                  <div className="space-y-2 pt-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      {format.title}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {format.statement}
                    </p>

                    {/* Platform Tag & Specs Link */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px] font-mono-tech">
                      <span className="text-neutral-400">
                        {format.format}
                      </span>
                      <span className="font-bold text-amber-400 group-hover:text-amber-300">
                        {format.specs}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pt-3 text-xs font-mono-tech text-neutral-400 relative z-10">
          
          {/* Left Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevCard}
              disabled={activeIdx === 0}
              aria-label="Previous service"
              className="w-8 h-8 rounded-full bg-neutral-900 border border-white/15 text-white flex items-center justify-center hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextCard}
              disabled={activeIdx === EDIT_FORMATS.length - 1}
              aria-label="Next service"
              className="w-8 h-8 rounded-full bg-neutral-900 border border-white/15 text-white flex items-center justify-center hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-neutral-400 ml-2 hidden sm:inline">
              SCROLL OR CLICK TO SCRUB CARDS
            </span>
          </div>

          {/* Center Pagination Dots */}
          <div className="flex items-center gap-2">
            {EDIT_FORMATS.map((f, idx) => (
              <button
                key={f.id}
                onClick={() => goToCard(idx)}
                aria-label={`Go to ${f.title}`}
                className={`transition-all rounded-full cursor-pointer ${
                  activeIdx === idx
                    ? 'w-6 h-2 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Right Indicator */}
          <div className="text-neutral-300 hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>UNLIMITED REVISIONS ON ALL FORMATS</span>
          </div>

        </div>

      </div>
    </section>
  );
}
