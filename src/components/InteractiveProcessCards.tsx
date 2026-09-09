import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderArchive, 
  BarChart3, 
  Flame, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

interface StageNode {
  id: number;
  numberStr: string;
  title: string;
  description: string;
  metric: string;
  icon: React.ElementType;
  xCoord: number; // 150, 450, 750, 1050 across 1200px width
  yCoord: number; // Y position on the 160px wave curve
}

const STAGES: StageNode[] = [
  {
    id: 1,
    numberStr: '01',
    title: 'Drop your footage',
    description: 'Send your raw video files via Google Drive, Dropbox, or Frame.io. No messy software setups.',
    metric: '01 — DROP',
    icon: FolderArchive,
    xCoord: 150,
    yCoord: 110,
  },
  {
    id: 2,
    numberStr: '02',
    title: 'We weave the magic',
    description: 'We cut the awkward pauses, fix the lighting, balance the audio, and make the story flow.',
    metric: '02 — WEAVE',
    icon: BarChart3,
    xCoord: 450,
    yCoord: 70,
  },
  {
    id: 3,
    numberStr: '03',
    title: 'Leave quick notes',
    description: 'Click directly on the video to tell us what to tweak. We fix it fast.',
    metric: '03 — NOTES',
    icon: Flame,
    xCoord: 750,
    yCoord: 95,
  },
  {
    id: 4,
    numberStr: '04',
    title: 'Hit publish',
    description: 'Download your crisp, export-ready video and go delight your audience.',
    metric: '04 — PUBLISH',
    icon: Sparkles,
    xCoord: 1050,
    yCoord: 55,
  },
];

export default function InteractiveProcessCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // activeStage: 0 = idle (before section is reached), 1-4 = stages
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const section = containerRef.current.closest('section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = section.offsetHeight - windowHeight;

      let progress = 0;

      if (totalScrollable > 100) {
        // Pinned sticky scrolling (Desktop):
        // Only starts measuring when the section reaches top of viewport (rect.top <= 0)
        // so it NEVER activates prematurely while you are still reading the hero!
        const scrolled = -rect.top;
        progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      } else {
        // Natural scrolling (Mobile):
        // Only activates once Section 2 has scrolled comfortably into view
        const enterPoint = windowHeight * 0.4;
        const exitPoint = -section.offsetHeight * 0.4;
        progress = Math.min(1, Math.max(0, (enterPoint - rect.top) / (enterPoint - exitPoint)));
      }

      setScrollProgress(progress);

      // Map progress cleanly to stages with deliberate breathing room:
      // progress == 0: Idle (no card highlighted prematurely before section is pinned)
      // 0.01 - 0.28: Stage 1
      // 0.28 - 0.54: Stage 2
      // 0.54 - 0.80: Stage 3
      // 0.80 - 1.00: Stage 4
      if (progress <= 0.01) {
        // Before section is in full view, Stage 1 is ready but not glowing aggressively
        setActiveStage(0);
      } else if (progress < 0.28) {
        setActiveStage(1);
      } else if (progress < 0.54) {
        setActiveStage(2);
      } else if (progress < 0.80) {
        setActiveStage(3);
      } else {
        setActiveStage(4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const effectiveStage = hoveredStage !== null ? hoveredStage : activeStage;

  // Undulating spline curve path strictly contained within 1200 x 160
  const curvePathD =
    'M 40 130 C 90 130, 110 110, 150 110 C 260 110, 340 70, 450 70 C 560 70, 640 95, 750 95 C 860 95, 940 55, 1050 55 C 1120 55, 1160 40, 1200 35';

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-7xl mx-auto select-none relative py-2"
    >
      {/* Top Header Row (Clear margin, no overlap with floating header) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10 relative pt-2">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-white">HOW IT WORKS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-[-0.035em] leading-[1.12]">
            Four steps.{' '}
            <span className="font-editorial-serif italic font-normal text-amber-300">
              Zero drama.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-normal leading-relaxed">
            Because editing video should never feel like doing your taxes.
          </p>
        </div>

        {/* Giant Watermark in Top Right */}
        <div className="hidden lg:block text-right select-none pointer-events-none shrink-0">
          <span className="text-[6.5rem] font-mono-tech font-black text-white/[0.04] leading-none block -mt-4">
            0{effectiveStage > 0 ? effectiveStage : 1}
          </span>
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-500 block -mt-2">
            STAGE PROGRESSION
          </span>
        </div>
      </div>

      {/* DESKTOP VIEW: Clean 4-Column Grid with Wave & Nodes Directly Above Cards */}
      <div className="hidden lg:block relative">
        
        {/* WAVE CURVE BAND (Strictly 160px tall, nodes sit safely inside this band) */}
        <div className="relative w-full h-[160px]">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
              </linearGradient>

              <linearGradient id="waveActiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ea580c" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
              </linearGradient>

              <filter id="waveGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Inactive Curve */}
            <path
              d={curvePathD}
              stroke="url(#waveBaseGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Active Illuminated Curve (Draws dynamically on scroll) */}
            <path
              d={curvePathD}
              stroke="url(#waveActiveGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#waveGlowFilter)"
              strokeDasharray="1300"
              strokeDashoffset={Math.max(0, 1300 * (1 - scrollProgress))}
              className="transition-all duration-200 ease-out"
            />

            {/* Vertical Guide Lines Dropping from each Node down to the Card Top */}
            {STAGES.map((s) => {
              const isCurrent = s.id === effectiveStage;
              return (
                <line
                  key={`line-${s.id}`}
                  x1={s.xCoord}
                  y1={s.yCoord + 24}
                  x2={s.xCoord}
                  y2={160}
                  stroke={isCurrent ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isCurrent ? 2 : 1}
                  strokeDasharray={isCurrent ? 'none' : '3 3'}
                  className="transition-colors duration-300"
                />
              );
            })}

            {/* Travelling Pulse Bead */}
            {effectiveStage > 0 && (
              <circle r="4" fill="#ffffff" className="animate-pulse shadow-lg">
                <animateMotion path={curvePathD} dur="5s" repeatCount="indefinite" />
              </circle>
            )}
          </svg>

          {/* 4 NODES POSITIONED PRECISELY ON THE WAVE (Safe from cards below) */}
          {STAGES.map((stage) => {
            const isActive = effectiveStage > 0 && stage.id <= effectiveStage;
            const isCurrent = stage.id === effectiveStage;
            const Icon = stage.icon;

            const leftPct = (stage.xCoord / 1200) * 100;
            const topPx = stage.yCoord;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  setActiveStage(stage.id);
                  setHoveredStage(stage.id);
                }}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPx}px`,
                }}
              >
                {/* Glowing Halo / Spotlight Under Node */}
                <div
                  className={`absolute -inset-3 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
                    isCurrent
                      ? 'bg-amber-500/50 scale-125'
                      : isActive
                      ? 'bg-orange-500/20 scale-100'
                      : 'bg-transparent'
                  }`}
                />

                {/* Node Button */}
                <div
                  className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-neutral-900 border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-110'
                      : isActive
                      ? 'bg-neutral-950/90 border border-amber-500/40 text-white shadow-md'
                      : 'bg-neutral-950/80 border border-white/15 text-neutral-500 group-hover:border-white/40 group-hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all ${
                      isCurrent
                        ? 'text-amber-400 scale-110'
                        : isActive
                        ? 'text-amber-300'
                        : 'text-neutral-500 group-hover:text-white'
                    }`}
                  />

                  {/* Micro stage pulse ring */}
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 STAGE CONTENT CARDS (POSITIONED DIRECTLY UNDER THE NODES IN PERFECT 4-COL GRID) */}
        <div className="grid grid-cols-4 gap-5 mt-2">
          {STAGES.map((stage) => {
            const isCurrent = stage.id === effectiveStage;
            const isActive = effectiveStage > 0 && stage.id <= effectiveStage;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  setActiveStage(stage.id);
                  setHoveredStage(stage.id);
                }}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[160px] group ${
                  isCurrent
                    ? 'bg-neutral-950/90 border-amber-500/60 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] scale-[1.02]'
                    : isActive
                    ? 'bg-neutral-950/50 border-white/[0.08] hover:border-white/25 hover:bg-neutral-950/80'
                    : 'bg-neutral-950/30 border-white/[0.04] opacity-65 hover:opacity-100 hover:border-white/20'
                }`}
              >
                {/* Giant Faint Background Number (Exact match to '1', '2', '3' in reference) */}
                <span className="absolute -right-2 -bottom-4 text-[5.5rem] font-mono-tech font-black text-white/[0.03] pointer-events-none select-none group-hover:text-white/[0.06] transition-colors leading-none">
                  {stage.numberStr}
                </span>

                <div className="relative z-10 space-y-2">
                  {/* Top Eyebrow + Metric Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono-tech font-bold uppercase tracking-wider ${
                        isCurrent ? 'text-amber-400' : 'text-neutral-500'
                      }`}
                    >
                      STAGE 0{stage.id}
                    </span>

                    <span
                      className={`text-[9px] font-mono-tech font-bold uppercase px-2 py-0.5 rounded-full truncate shrink-0 max-w-[140px] ${
                        isCurrent
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-white/[0.04] text-neutral-400'
                      }`}
                    >
                      {stage.metric}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3
                    className={`text-sm sm:text-base font-extrabold tracking-tight transition-colors ${
                      isCurrent ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                    }`}
                  >
                    {stage.title}
                  </h3>

                  {/* Stage Description */}
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* MOBILE VIEW (< lg): High-Contrast Stack */}
      <div className="lg:hidden space-y-3.5">
        {STAGES.map((stage) => {
          const isCurrent = stage.id === effectiveStage;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                isCurrent
                  ? 'bg-neutral-900 border-amber-400/60 shadow-[0_4px_20px_rgba(245,158,11,0.15)]'
                  : 'bg-neutral-950/90 border-white/15 hover:border-white/30'
              }`}
            >
              {/* Giant Watermark Number */}
              <span className="absolute right-2 -bottom-3 text-6xl font-mono-tech font-black text-white/[0.04] pointer-events-none select-none">
                {stage.numberStr}
              </span>

              <div className="relative z-10 flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-black shadow-md'
                      : 'bg-white/10 text-amber-400 border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono-tech text-amber-400 font-bold uppercase">
                      STAGE 0{stage.id}
                    </span>
                    <span className="text-[9px] font-mono-tech text-neutral-400 font-semibold truncate">
                      {stage.metric}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Technical Telemetry Ribbon */}
      <div className="pt-6 mt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-wider">KRITVIDEO STUDIO</span>
          <span className="text-neutral-700">//</span>
          <span className="text-neutral-400">PROVEN POST-PRODUCTION TIMELINE</span>
        </div>

        <div className="flex items-center gap-2 text-neutral-300">
          <span className="text-amber-400 font-bold">LEARN MORE ABOUT OUR PROCESS</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>

    </div>
  );
}
