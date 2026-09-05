import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  statBadge: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Creator • 650K',
    quote:
      'I don\'t have to think about the editing anymore. I send my footage and know a broadcast-ready cut will be waiting for me.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    statBadge: '+30 Hours Saved / Wk',
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Tech Host • 420K',
    quote:
      'The quality and how well the edit matched my style blew me away. They kept my voice intact while making everything tighter.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    statBadge: 'Style Matched',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Filmmaker • 890K',
    quote:
      'Our audience response jumped immediately. The retention, the story flow, and the sound design make our videos feel like cinema.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    statBadge: 'Audience Retention Surged',
  },
  {
    id: 'jake-donovan',
    name: 'Jake Donovan',
    role: 'Growth Lead • Apex',
    quote:
      'Clear communication, fast turnarounds, and zero friction. We scaled our social video production 4x without hiring in-house.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    statBadge: '4x Video Output',
  },
  {
    id: 'david-morales',
    name: 'David Morales',
    role: 'Host • Modern Founder',
    quote:
      'Multi-cam sync, audio cleanup, and social cutdowns all handled in one place. Best creative decision we made this year.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    statBadge: 'Turnkey Multi-Cam',
  },
];

export default function SectionTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with center card active (Elena Rostova)
  const total = TESTIMONIALS.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // 5 visible indices relative to currentIndex: -2, -1, 0, +1, +2
  const getIndex = (offset: number) => (currentIndex + offset + total * 2) % total;

  const visibleCards = [
    { offset: -2, index: getIndex(-2), position: 'far-left' },
    { offset: -1, index: getIndex(-1), position: 'mid-left' },
    { offset: 0, index: getIndex(0), position: 'center' },
    { offset: 1, index: getIndex(1), position: 'mid-right' },
    { offset: 2, index: getIndex(2), position: 'far-right' },
  ];

  return (
    <section
      id="testimonials"
      className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-16 bg-black text-white select-none overflow-hidden"
    >
      {/* Soft Ambient Radial Glow behind the stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* GIANT BACKDROP STAGE PANEL (Exact match to reference image floating container) */}
        <div className="w-full rounded-[36px] sm:rounded-[44px] bg-neutral-950/90 border border-white/[0.12] backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.15)] relative pt-12 sm:pt-16 pb-48 sm:pb-56 px-6 sm:px-12 overflow-hidden flex flex-col items-center text-center">
          
          {/* Subtle Ambient Radial Glow Inside the Panel */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-amber-500/[0.06] blur-[90px] pointer-events-none" />

          {/* Huge Decorative Watermark Quotation Mark on Top-Left (Exact Reference Match) */}
          <div className="absolute top-4 left-6 sm:top-8 sm:left-12 select-none pointer-events-none text-white/[0.06] font-serif text-[110px] sm:text-[140px] leading-none">
            “
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-3 relative z-10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
            <span className="text-white">FROM PEOPLE WHO'VE WORKED WITH US</span>
          </div>

          {/* Section Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-white relative z-10">
            We'll let our clients <span className="font-editorial-serif italic font-normal text-amber-300">explain this bit.</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto font-normal leading-relaxed pt-2 relative z-10">
            The nicest thing someone can say about an editor is probably: “I don't have to think about the editing anymore.”
          </p>

          {/* Centered Accent Divider Line */}
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 rounded-full mt-3.5 shadow-[0_0_12px_rgba(245,158,11,0.5)] relative z-10" />

        </div>

        {/* 5-CARD OVERLAPPING CAROUSEL ROW (Hangs down over the bottom edge of the backdrop panel) */}
        <div className="relative w-full max-w-6xl -mt-40 sm:-mt-48 flex items-end justify-center px-2 z-20">
          
          {/* Desktop/Tablet 5-Card Staggered Layout */}
          <div className="hidden md:flex items-end justify-center gap-3 lg:gap-4 xl:gap-5 w-full">
            {visibleCards.map(({ offset, index }) => {
              const item = TESTIMONIALS[index];
              const isCenter = offset === 0;
              const isMid = Math.abs(offset) === 1;

              return (
                <div
                  key={`${item.id}-${offset}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative rounded-[28px] transition-all duration-500 ease-out cursor-pointer select-none flex flex-col items-center text-center p-6 ${
                    isCenter
                      ? 'w-[290px] lg:w-[320px] min-h-[380px] bg-[#121212] border-2 border-amber-500/50 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)] translate-y-10 sm:translate-y-12 z-30 justify-between'
                      : isMid
                      ? 'w-[220px] lg:w-[245px] min-h-[320px] bg-[#0d0d0d]/95 border border-white/10 shadow-2xl opacity-75 hover:opacity-100 hover:scale-[1.02] translate-y-2 z-20 justify-between'
                      : 'w-[180px] lg:w-[205px] min-h-[290px] bg-[#090909]/80 border border-white/[0.06] shadow-xl opacity-35 hover:opacity-70 -translate-y-2 z-10 justify-between'
                  }`}
                >
                  {/* Card Header: Avatar & Name */}
                  <div className="flex flex-col items-center w-full">
                    {/* Top Avatar Portrait with Specular Ring */}
                    <div className="relative mb-2.5">
                      <div
                        className={`rounded-full p-0.5 transition-all ${
                          isCenter
                            ? 'ring-4 ring-amber-400/30 bg-gradient-to-tr from-amber-500 to-orange-400'
                            : 'ring-2 ring-white/10 bg-neutral-800'
                        }`}
                      >
                        <div className={`rounded-full overflow-hidden bg-neutral-800 shrink-0 ${isCenter ? 'w-14 h-14' : 'w-11 h-11'}`}>
                          <img
                            src={item.avatar}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Client Name */}
                    <h3 className={`font-extrabold tracking-tight ${isCenter ? 'text-base sm:text-lg text-white' : 'text-sm text-neutral-200'}`}>
                      {item.name}
                    </h3>

                    {/* Channel / Role Subline */}
                    <p className="text-[10px] font-mono-tech text-neutral-400 mt-0.5 truncate max-w-[180px]">
                      {item.role}
                    </p>

                    {/* Verified Star Rating (Center card only) */}
                    {isCenter && (
                      <div className="flex items-center gap-1 text-amber-400 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Body: Quote with Large Quotation Marks (Exact Reference Match) */}
                  <div className="relative my-3 px-1 w-full flex-1 flex flex-col justify-center">
                    <span className="text-2xl font-serif text-neutral-600 select-none leading-none -mb-1 block text-left">
                      “
                    </span>
                    <p className={`leading-relaxed font-normal ${
                      isCenter
                        ? 'text-xs sm:text-[13px] text-neutral-200 px-1'
                        : 'text-[11px] text-neutral-400 line-clamp-4'
                    }`}>
                      {item.quote}
                    </p>
                    <span className="text-2xl font-serif text-neutral-600 select-none leading-none -mt-1 block text-right">
                      ”
                    </span>
                  </div>

                  {/* Bottom Stat Badge (Center card only) */}
                  {isCenter && item.statBadge && (
                    <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono-tech font-bold text-amber-400 shadow-sm">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{item.statBadge}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile View: Single Focal Center Card */}
          <div className="flex md:hidden w-full max-w-sm flex-col items-center">
            {(() => {
              const item = TESTIMONIALS[currentIndex];
              return (
                <div className="w-full rounded-[28px] bg-[#121212] border-2 border-amber-500/50 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25)] p-6 flex flex-col items-center text-center translate-y-6">
                  <div className="relative mb-3">
                    <div className="rounded-full p-0.5 ring-4 ring-amber-400/30 bg-gradient-to-tr from-amber-500 to-orange-400">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-800 shrink-0">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-white tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-[10px] font-mono-tech text-neutral-400 mt-0.5 mb-2">
                    {item.role}
                  </p>

                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="relative my-2 px-1">
                    <span className="text-2xl font-serif text-neutral-600 select-none leading-none -mb-1 block text-left">“</span>
                    <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                      {item.quote}
                    </p>
                    <span className="text-2xl font-serif text-neutral-600 select-none leading-none -mt-1 block text-right">”</span>
                  </div>

                  {item.statBadge && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono-tech font-bold text-amber-400">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{item.statBadge}</span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

        </div>

        {/* BOTTOM CAROUSEL CONTROLS: Arrow Buttons & Pagination Dots */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 mt-6 sm:mt-8 relative z-30">
          
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900/90 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Pagination Indicator Dots */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-950/80 border border-white/10 backdrop-blur-md">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900/90 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Section CTA */}
        <div className="pt-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-mono-tech text-amber-400 hover:text-amber-300 font-bold transition-all"
          >
            <span>SEE MORE CLIENT STORIES →</span>
          </a>
        </div>

      </div>
    </section>
  );
}
