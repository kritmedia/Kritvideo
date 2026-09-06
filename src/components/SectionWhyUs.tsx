import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Calibrated vertical offsets so Card 0 starts 100% fully visible and centered
const START_OFFSET = 440;
const TOTAL_TRAVEL = 1200;
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
          const currentActive = Math.max(0, Math.min(4, Math.round(normalized)));
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
      className="relative lg:h-[260vh] select-none text-white py-12 lg:py-0"
    >
      {/* Pinned Viewport Container (Sticky on Desktop, Natural Flow on Mobile) */}
      <div className="relative lg:sticky lg:top-0 min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-20 pt-16 lg:pt-24 pb-8 overflow-visible lg:overflow-hidden">
        
        {/* Ambient Warm Golden Underglows */}
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent blur-[160px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-orange-600/10 via-amber-400/5 to-transparent blur-[160px] pointer-events-none z-0" />

        {/* MAIN STAGE: Left Side Fixed Typography & Right Side Cards */}
        <div className="relative w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto z-10">
          
          {/* LEFT COLUMN: Section Title & Value Metrics (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 relative z-30 pointer-events-auto">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
                <span className="text-white">WHY KRITVIDEO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.035em] leading-[1.08] text-white">
                A video editor should{' '}
                <span className="font-editorial-serif italic font-normal text-amber-300 block">
                  make your life easier.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal pt-1 max-w-md">
                We shape every edit around your audience and authentic style — no generic templates, no missed deadlines, and zero drama.
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
                      <span className="text-[10px] font-mono-tech uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">YOUR VISION</span>
                      <span className="text-xs font-mono-tech text-neutral-400">{`{ 01 }`}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">
                      Your Style <span className="font-editorial-serif italic font-normal text-amber-300">Stays Yours</span>
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      We study your channel and brand voice so your edits stay authentically yours — never cookie-cutter templates.
                    </p>
                    <div className="pt-1 flex items-center gap-3 text-xs font-mono-tech text-neutral-300">
                      <span className="flex items-center gap-1 text-amber-400"><CheckCircle2 className="w-3.5 h-3.5" /> Authentic Voice</span>
                      <span>• No Templates</span>
                    </div>
                  </div>
                  <div className="w-[200px] h-[150px] rounded-2xl overflow-hidden relative border border-white/10 shadow-inner bg-black shrink-0">
                    <img src="/editor_frames/editor-frame-030.jpg" alt="Lead Editor Cut" loading="lazy" decoding="async" className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 text-[9px] font-mono-tech text-amber-400 font-bold bg-black/60 px-1.5 py-0.5 rounded">CUSTOM CRAFT</div>
                  </div>
                </div>

                {/* Desktop Card 2 */}
                <div 
                  onClick={() => scrollToCard(1)}
                  className="w-full rounded-[30px] bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-7 shadow-[0_30px_90px_rgba(245,158,11,0.45)] text-black cursor-pointer hover:scale-[1.01] transition-all flex flex-col justify-between min-h-[190px] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-black/15 text-black border border-black/20">THE DETAILS MATTER</span>
                    <span className="text-xs font-mono-tech font-extrabold text-black/80">{`{ 02 }`}</span>
                  </div>
                  <div className="my-3 space-y-1">
                    <h3 className="text-2xl font-black tracking-tight text-black">
                      We Edit The <span className="font-editorial-serif italic font-normal text-white drop-shadow-md">Boring Bits Too</span>
                    </h3>
                    <p className="text-xs text-black/80 font-medium leading-relaxed max-w-lg">
                      Awkward pauses, duplicate takes, audio hum, and pacing lulls — we clean them all so your video flows effortlessly.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono-tech font-bold text-black/90 border-t border-black/15 pt-2">
                    <span>CLEAN AUDIO // TIGHT PACING</span>
                    <span>WE HANDLE IT ALL ↗</span>
                  </div>
                </div>

                {/* Desktop Card 3 */}
                <div 
                  onClick={() => scrollToCard(2)}
                  className="w-full rounded-[30px] bg-neutral-900/90 border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col justify-between cursor-pointer hover:border-amber-400/40 transition-all group"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <div>
                      <h3 className="text-lg font-extrabold text-white tracking-tight">
                        Zero Timeline <span className="font-editorial-serif italic font-normal text-amber-300">Friction</span>
                      </h3>
                      <p className="text-[11px] text-neutral-400 pt-0.5">
                        No editing software needed. Tell us what you want to make — we handle the rest.
                      </p>
                    </div>
                    <span className="text-xs font-mono-tech text-neutral-400 font-bold">{`{ 03 }`}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 my-3">
                    {[
                      { step: '01', title: 'Upload', desc: 'Raw clips' },
                      { step: '02', title: 'We Cut', desc: 'Story & pacing' },
                      { step: '03', title: 'Review', desc: 'Direct notes' },
                      { step: '04', title: 'Publish', desc: 'Master file' },
                    ].map((node) => (
                      <div key={node.step} className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono-tech font-bold text-amber-400">{node.title}</span>
                          <span className="text-[8px] font-mono-tech text-neutral-400">{node.step}</span>
                        </div>
                        <span className="text-[9px] text-neutral-300 leading-tight">{node.desc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 pt-1 border-t border-white/[0.08]">
                    <span className="text-amber-400 font-bold">EFFORTLESS POST-PRODUCTION</span>
                    <span>FRAME.IO SYNC ↗</span>
                  </div>
                </div>

                {/* Desktop Card 4 */}
                <div 
                  onClick={() => scrollToCard(3)}
                  className="w-full rounded-[30px] bg-neutral-900/90 border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col justify-between cursor-pointer hover:border-amber-400/40 transition-all group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-amber-400 font-bold uppercase tracking-wider">CLEAR WORKFLOW</span>
                      <span className="text-xs font-mono-tech text-neutral-400">{`{ 04 }`}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">
                      Quality Without <span className="font-editorial-serif italic font-normal text-amber-300">The Drama</span>
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal pt-0.5">
                      Direct communication with lead editors and fast turnaround on revisions until you are completely satisfied.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 my-3">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-0.5">
                      <span className="text-[8px] font-mono-tech uppercase text-neutral-400 font-bold">COMMUNICATION</span>
                      <div className="text-lg font-black text-white">Direct</div>
                      <p className="text-[8px] text-neutral-400">Zero middlemen</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-0.5">
                      <span className="text-[8px] font-mono-tech uppercase text-neutral-400 font-bold">TURNAROUND</span>
                      <div className="text-lg font-black text-amber-400">48 Hours</div>
                      <p className="text-[8px] text-neutral-400">Guaranteed SLA</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-0.5">
                      <span className="text-[8px] font-mono-tech uppercase text-neutral-400 font-bold">REVISIONS</span>
                      <div className="text-lg font-black text-white">Included</div>
                      <p className="text-[8px] text-neutral-400">Until satisfied</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 border-t border-white/[0.08] pt-1.5">
                    <span className="text-white font-semibold">RAPID SLA GUARANTEE</span>
                    <span className="text-amber-400 font-bold">LEARN MORE ↗</span>
                  </div>
                </div>

                {/* Desktop Card 5 */}
                <div 
                  onClick={() => scrollToCard(4)}
                  className="w-full rounded-[30px] bg-neutral-900/90 border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-row gap-5 items-center justify-between cursor-pointer hover:border-amber-400/40 transition-all group"
                >
                  <div className="space-y-2.5 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-tech uppercase font-bold px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300">BESPOKE FINISHING</span>
                      <span className="text-xs font-mono-tech text-neutral-400">{`{ 05 }`}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">
                      DaVinci Resolve <span className="font-editorial-serif italic font-normal text-amber-300">Precision</span>
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      Cinema-grade color grading and -14 LUFS dialogue mastering included in every single cut.
                    </p>
                    <div className="pt-1 flex items-center gap-3 text-xs font-mono-tech text-neutral-400">
                      <span className="text-amber-400">ACES Color Science</span>
                      <span>•</span>
                      <span>Fairlight Audio</span>
                    </div>
                  </div>
                  <div className="w-[200px] h-[150px] rounded-2xl overflow-hidden relative border border-white/10 shadow-inner bg-black shrink-0">
                    <img src="/photographer_frames/ezgif-frame-090.jpg" alt="Color Grading Suite" loading="lazy" decoding="async" className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 text-[9px] font-mono-tech text-amber-400 font-bold bg-black/60 px-1.5 py-0.5 rounded">DAVINCI ACES</div>
                  </div>
                </div>

              </div>
            </div>

            {/* MOBILE VIEW (< lg): Clean Natural Vertical Stack (Zero Mask, Zero Clipping) */}
            <div className="flex lg:hidden flex-col space-y-4 w-full">
              {/* Mobile Card 1 */}
              <div className="w-full rounded-2xl bg-neutral-900/90 border border-white/15 p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">YOUR VISION</span>
                  <span className="text-xs font-mono-tech text-neutral-400">{`{ 01 }`}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Your Style <span className="font-editorial-serif italic text-amber-300">Stays Yours</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We study your channel and brand voice so your edits stay authentically yours — never cookie-cutter templates.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono-tech text-neutral-300 pt-1">
                  <span className="flex items-center gap-1 text-amber-400"><CheckCircle2 className="w-3.5 h-3.5" /> Authentic Voice</span>
                  <span>• No Templates</span>
                </div>
              </div>

              {/* Mobile Card 2 */}
              <div className="w-full rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-5 shadow-lg text-black space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech font-black uppercase px-2 py-0.5 rounded-full bg-black/15 text-black">THE DETAILS MATTER</span>
                  <span className="text-xs font-mono-tech font-bold text-black/80">{`{ 02 }`}</span>
                </div>
                <h3 className="text-lg font-black text-black">
                  We Edit The <span className="font-editorial-serif italic text-white drop-shadow-sm">Boring Bits Too</span>
                </h3>
                <p className="text-xs text-black/85 font-medium leading-relaxed">
                  Awkward silences, duplicate takes, audio hum, and pacing lulls — we clean them all so your video flows effortlessly.
                </p>
              </div>

              {/* Mobile Card 3 */}
              <div className="w-full rounded-2xl bg-neutral-900/90 border border-white/15 p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase font-bold text-amber-400">ZERO TIMELINE FRICTION</span>
                  <span className="text-xs font-mono-tech text-neutral-400">{`{ 03 }`}</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No editing software needed. Drop your raw footage and tell us what you want to achieve — we handle the rest.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { step: '01', title: 'Upload', desc: 'Raw files' },
                    { step: '02', title: 'We Cut', desc: 'Story & pacing' },
                    { step: '03', title: 'Review', desc: 'Frame.io notes' },
                    { step: '04', title: 'Publish', desc: 'Ready master' },
                  ].map((n) => (
                    <div key={n.step} className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                      <div className="text-[9px] font-mono-tech font-bold text-amber-400">{n.step} {n.title}</div>
                      <div className="text-[9px] text-neutral-400">{n.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Card 4 */}
              <div className="w-full rounded-2xl bg-neutral-900/90 border border-white/15 p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase font-bold text-amber-400">CLEAR WORKFLOW</span>
                  <span className="text-xs font-mono-tech text-neutral-400">{`{ 04 }`}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Quality Without <span className="font-editorial-serif italic text-amber-300">The Drama</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Direct lead editor communication, guaranteed 48-hour delivery, and fast revisions until you are completely satisfied.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xs font-bold text-white">Direct</div>
                    <div className="text-[8px] font-mono-tech text-neutral-400">Zero Middlemen</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xs font-bold text-amber-400">48 Hours</div>
                    <div className="text-[8px] font-mono-tech text-neutral-400">Guaranteed SLA</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-xs font-bold text-white">Included</div>
                    <div className="text-[8px] font-mono-tech text-neutral-400">Revisions Included</div>
                  </div>
                </div>
              </div>

              {/* Mobile Card 5 */}
              <div className="w-full rounded-2xl bg-neutral-900/90 border border-white/15 p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase font-bold text-amber-400">DAVINCI RESOLVE</span>
                  <span className="text-xs font-mono-tech text-neutral-400">{`{ 05 }`}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Bespoke Finishing <span className="font-editorial-serif italic text-amber-300">Built-In</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Cinema-grade color grading and -14 LUFS dialogue mastering included in every single cut.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono-tech text-neutral-300 pt-1">
                  <span className="text-amber-400">ACES Color Science</span>
                  <span>•</span>
                  <span>Fairlight Audio</span>
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
              onClick={() => scrollToCard(Math.min(4, activeCardIndex + 1))}
              disabled={activeCardIndex === 4}
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
            {[0, 1, 2, 3, 4].map((idx) => (
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

