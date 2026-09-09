import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Calibrated vertical offsets so Card 0 starts 100% fully visible and centered
const START_OFFSET = 440;
const TOTAL_TRAVEL = 600;
const CARD_SPACING = 300;

export default function SectionWhyUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const targetOffsetRef = useRef<number>(START_OFFSET);
  const currentOffsetRef = useRef<number>(START_OFFSET);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // Direct GPU transform update for 120 FPS vertical gliding on desktop
  const applyScrollTransform = useCallback((offsetY: number) => {
    if (trackRef.current && window.innerWidth >= 1024) {
      trackRef.current.style.transform = `translate3d(0px, ${offsetY}px, 0px)`;
    }
  }, []);

  // RAF inertial loop for silky smooth gliding on desktop
  useEffect(() => {
    let animationFrameId: number;
    let isRunning = true;

    applyScrollTransform(currentOffsetRef.current);

    const loop = () => {
      if (!isRunning) return;

      if (window.innerWidth >= 1024) {
        const diff = targetOffsetRef.current - currentOffsetRef.current;
        if (Math.abs(diff) > 0.5) {
          currentOffsetRef.current += diff * 0.16;
          applyScrollTransform(currentOffsetRef.current);

          const normalized = (START_OFFSET - currentOffsetRef.current) / CARD_SPACING;
          const currentActive = Math.max(0, Math.min(2, Math.round(normalized)));
          setActiveCardIndex((prev) => (prev !== currentActive ? currentActive : prev));
        } else if (currentOffsetRef.current !== targetOffsetRef.current) {
          currentOffsetRef.current = targetOffsetRef.current;
          applyScrollTransform(currentOffsetRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [applyScrollTransform]);

  // Sticky scroll listener on desktop
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || window.innerWidth < 1024) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = sectionRef.current.offsetHeight - windowHeight;

      if (totalScrollable <= 50) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      targetOffsetRef.current = START_OFFSET - progress * TOTAL_TRAVEL;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    setActiveCardIndex(idx);
    targetOffsetRef.current = START_OFFSET - idx * CARD_SPACING;
  };

  return (
    <section 
      id="why-us" 
      ref={sectionRef}
      className="relative lg:h-[210vh] select-none text-white py-12 lg:py-0"
    >
      {/* Pinned Viewport Container (Sticky on Desktop, Natural Flow on Mobile) */}
      <div className="relative lg:sticky lg:top-0 min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-20 pt-16 lg:pt-24 pb-8 overflow-visible lg:overflow-hidden">
        
        {/* Ambient Warm Golden Underglows */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 30% 30%, rgba(245, 158, 11, 0.08), transparent 70%), radial-gradient(ellipse 50% 40% at 75% 75%, rgba(234, 88, 12, 0.05), transparent 70%)'
          }}
        />

        {/* MAIN STAGE: Left Side Fixed Typography & Right Side Cards */}
        <div className="relative w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto z-10">
          
          {/* LEFT COLUMN: Section Title & Value Metrics (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 relative z-30 pointer-events-auto">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
                <span className="text-white">WHY WORK WITH US</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.035em] leading-[1.08] text-white">
                The editor you don’t{' '}
                <span className="font-editorial-serif italic font-normal text-amber-300 block">
                  have to micro-manage.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal pt-1 max-w-md">
                We know what happens when an editor disappears mid-project. That’s not us.
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1 backdrop-blur-md">
                <span className="text-[10px] font-mono-tech uppercase text-neutral-400 font-bold">YOUR VISION</span>
                <div className="text-xl sm:text-2xl font-black text-white">100% Custom</div>
                <p className="text-[10px] text-neutral-400">Authentic brand voice</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1 backdrop-blur-md">
                <span className="text-[10px] font-mono-tech uppercase text-neutral-400 font-bold">COMMUNICATION</span>
                <div className="text-xl sm:text-2xl font-black text-amber-400">Zero Drama</div>
                <p className="text-[10px] text-neutral-400">Direct Frame.io review</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono-tech text-neutral-400 pt-1">
              <a 
                href="#contact" 
                className="px-4 py-2 rounded-full bg-neutral-950/80 border border-white/10 hover:border-white/30 text-amber-400 hover:text-white flex items-center gap-2 backdrop-blur-md transition-all font-bold"
              >
                <span>WHY KRITVIDEO →</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: DESKTOP PINNED TRACK + MOBILE RESPONSIVE STACK */}
          <div className="lg:col-span-7 relative w-full">
            
            {/* DESKTOP VIEW (>= lg): Gliding Track with Alpha Mask */}
            <div 
              className="hidden lg:flex relative h-[560px] sm:h-[620px] items-center justify-center overflow-visible pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            >
              <div 
                ref={trackRef}
                className="flex flex-col items-center space-y-6 will-change-transform pointer-events-auto transition-transform duration-75 ease-out w-full max-w-[620px]"
                style={{ transformOrigin: 'center center' }}
              >
                {/* Desktop Card 1 */}
                <div 
                  onClick={() => scrollToCard(0)}
                  className="w-full rounded-[30px] bg-neutral-900/90 border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-row gap-5 items-center justify-between cursor-pointer hover:border-amber-400/40 transition-all group"
                >
                  <div className="space-y-2.5 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-tech uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">YOUR STYLE</span>
                      <span className="text-xs font-mono-tech text-neutral-400">{`{ 01 }`}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">
                      Your Style, <span className="font-editorial-serif italic font-normal text-amber-300">Not A Generic Template</span>
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      We don’t slap the same flashy TikTok preset on every client. We study your vibe so the final video actually feels like you.
                    </p>
                    <div className="pt-1 flex items-center gap-3 text-xs font-mono-tech text-neutral-300">
                      <span className="flex items-center gap-1 text-amber-400"><CheckCircle2 className="w-3.5 h-3.5" /> Authentic Voice</span>
                      <span>• No Templates</span>
                    </div>
                  </div>
                  <div className="w-[200px] h-[150px] rounded-2xl overflow-hidden relative border border-white/10 shadow-inner bg-black shrink-0">
                    <img src="/editor_frames/editor-frame-030.jpg" alt="Custom Style Cut" loading="lazy" decoding="async" className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 text-[9px] font-mono-tech text-amber-400 font-bold bg-black/60 px-1.5 py-0.5 rounded">CUSTOM VIBE</div>
                  </div>
                </div>

                {/* Desktop Card 2 */}
                <div 
                  onClick={() => scrollToCard(1)}
                  className="w-full rounded-[30px] bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-7 shadow-[0_30px_90px_rgba(245,158,11,0.45)] text-black cursor-pointer hover:scale-[1.01] transition-all flex flex-col justify-between min-h-[190px] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-black/15 text-black border border-black/20">EFFORTLESS CUTS</span>
                    <span className="text-xs font-mono-tech font-extrabold text-black/80">{`{ 02 }`}</span>
                  </div>
                  <div className="my-3 space-y-1">
                    <h3 className="text-2xl font-black tracking-tight text-black">
                      We Cut The <span className="font-editorial-serif italic font-normal text-white drop-shadow-md">Awkward Stuff</span>
                    </h3>
                    <p className="text-xs text-black/80 font-medium leading-relaxed max-w-lg">
                      The 5-second silence while you remembered your line? The accidental lens smudge? Gone. We make you look effortless on camera.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono-tech font-bold text-black/90 border-t border-black/15 pt-2">
                    <span>SEAMLESS PACING // ZERO PAUSES</span>
                    <span>FLAWLESS FLOW ↗</span>
                  </div>
                </div>

                {/* Desktop Card 3 */}
                <div 
                  onClick={() => scrollToCard(2)}
                  className="w-full rounded-[30px] bg-neutral-900/90 border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-row gap-5 items-center justify-between cursor-pointer hover:border-amber-400/40 transition-all group"
                >
                  <div className="space-y-2.5 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-tech uppercase font-bold px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300">TIME SAVED</span>
                      <span className="text-xs font-mono-tech text-neutral-400">{`{ 03 }`}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">
                      You Get Your <span className="font-editorial-serif italic font-normal text-amber-300">Weekends Back</span>
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      Spend your time filming, writing, or resting instead of staring at rendering bars at 2:00 AM on a Sunday.
                    </p>
                    <div className="pt-1 flex items-center gap-3 text-xs font-mono-tech text-neutral-300">
                      <span className="flex items-center gap-1 text-amber-400"><CheckCircle2 className="w-3.5 h-3.5" /> 48h Turnaround</span>
                      <span>• No 2 AM Renders</span>
                    </div>
                  </div>
                  <div className="w-[200px] h-[150px] rounded-2xl overflow-hidden relative border border-white/10 shadow-inner bg-black shrink-0">
                    <img src="/photographer_frames/ezgif-frame-090.jpg" alt="Creator Rest" loading="lazy" decoding="async" className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 text-[9px] font-mono-tech text-amber-400 font-bold bg-black/60 px-1.5 py-0.5 rounded">WEEKENDS BACK</div>
                  </div>
                </div>

              </div>
            </div>

            {/* MOBILE VIEW (< lg): Clean Natural Vertical Stack (Zero Mask, Zero Clipping) */}
            <div className="flex lg:hidden flex-col space-y-4 w-full">
              {/* Mobile Card 1 */}
              <div className="w-full rounded-2xl bg-neutral-900/90 border border-white/15 p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">YOUR STYLE</span>
                  <span className="text-xs font-mono-tech text-neutral-400">{`{ 01 }`}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Your style, <span className="font-editorial-serif italic text-amber-300">not a generic template</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We don’t slap the same flashy TikTok preset on every client. We study your vibe so the final video actually feels like you.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono-tech text-neutral-300 pt-1">
                  <span className="flex items-center gap-1 text-amber-400"><CheckCircle2 className="w-3.5 h-3.5" /> Authentic Voice</span>
                  <span>• No Templates</span>
                </div>
              </div>

              {/* Mobile Card 2 */}
              <div className="w-full rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-5 shadow-lg text-black space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech font-black uppercase px-2 py-0.5 rounded-full bg-black/15 text-black">EFFORTLESS CUTS</span>
                  <span className="text-xs font-mono-tech font-bold text-black/80">{`{ 02 }`}</span>
                </div>
                <h3 className="text-lg font-black text-black">
                  We Cut The <span className="font-editorial-serif italic text-white drop-shadow-sm">Awkward Stuff</span>
                </h3>
                <p className="text-xs text-black/85 font-medium leading-relaxed">
                  The 5-second silence while you remembered your line? The accidental lens smudge? Gone. We make you look effortless on camera.
                </p>
              </div>

              {/* Mobile Card 3 */}
              <div className="w-full rounded-2xl bg-neutral-900/90 border border-white/15 p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase font-bold text-amber-400">TIME SAVED</span>
                  <span className="text-xs font-mono-tech text-neutral-400">{`{ 03 }`}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  You Get Your <span className="font-editorial-serif italic text-amber-300">Weekends Back</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Spend your time filming, writing, or resting instead of staring at rendering bars at 2:00 AM on a Sunday.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono-tech text-neutral-300 pt-1">
                  <span className="flex items-center gap-1 text-amber-400"><CheckCircle2 className="w-3.5 h-3.5" /> 48h Delivery</span>
                  <span>• Zero Sunday Stress</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM CONTROLS & PAGINATION BAR (Desktop only) */}
        <div className="hidden lg:flex w-full max-w-7xl mx-auto items-center justify-between gap-4 pt-2 text-xs font-mono-tech text-neutral-400 relative z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
              disabled={activeCardIndex === 0}
              aria-label="Previous advantage"
              className="w-8 h-8 rounded-full bg-neutral-900/80 border border-white/15 text-white flex items-center justify-center hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95 backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToCard(Math.min(2, activeCardIndex + 1))}
              disabled={activeCardIndex === 2}
              aria-label="Next advantage"
              className="w-8 h-8 rounded-full bg-neutral-900/80 border border-white/15 text-white flex items-center justify-center hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95 backdrop-blur-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-neutral-400 ml-2">
              SCROLL OR CLICK TO GLIDE VERTICAL DECK
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to card ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  activeCardIndex === idx
                    ? 'w-6 h-2 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <div className="text-neutral-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>GUARANTEED 48-HOUR TURNAROUND</span>
          </div>
        </div>

        {/* Seamless Soft Gradient Dissolve */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none z-10" />

      </div>

    </section>
  );
}

