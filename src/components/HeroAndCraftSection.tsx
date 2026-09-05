import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, Film, Sliders, Volume2, CheckCircle2, ChevronRight } from 'lucide-react';
import { CRAFT_FEATURE_CARDS } from '../data/content';

interface HeroAndCraftSectionProps {
  onOpenContact: () => void;
  onExploreServices: () => void;
}

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `/frames/ezgif-frame-${paddedIndex}.jpg`;
};

export const HeroAndCraftSection: React.FC<HeroAndCraftSectionProps> = ({
  onOpenContact,
  onExploreServices,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  const [currentFrameNum, setCurrentFrameNum] = useState<number>(1);
  const [activeCraftTab, setActiveCraftTab] = useState<string>('pacing');

  // Preload all 240 frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        if (i === 1) {
          drawFrame(1);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const imgIndex = frameIndex - 1;
    let img = imagesRef.current[imgIndex];

    // Fallback to nearest loaded frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[imgIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[imgIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Fill deep black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // End-to-end cover scaling
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, drawY, drawWidth, drawHeight);

    lastDrawnFrameRef.current = frameIndex;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      const frame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)) + 1)
      );
      drawFrame(frame);
    }
  };

  useEffect(() => {
    resizeCanvas();

    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      // Compute progress 0.0 -> 1.0 across the entire 2-section experience
      const progress = -rect.top / scrollableDistance;
      targetProgressRef.current = Math.min(1, Math.max(0, progress));
    };

    const handleResize = () => {
      resizeCanvas();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const LERP_FACTOR = 0.09;
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * LERP_FACTOR;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)) + 1)
      );

      if (frameIndex !== lastDrawnFrameRef.current) {
        drawFrame(frameIndex);
        setCurrentFrameNum(frameIndex);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    handleScroll();
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const activeCraftCard = CRAFT_FEATURE_CARDS.find((c) => c.id === activeCraftTab) || CRAFT_FEATURE_CARDS[0];

  return (
    <div ref={wrapperRef} className="relative w-full bg-black text-white">
      {/* Sticky Background Canvas that remains pinned during both Section 1 and Section 2 */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
          style={{ backgroundColor: '#000000' }}
        />
        {/* Subtle Dark Gradient to protect left-side text legibility while leaving right-side camera crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none lg:from-black/80 lg:via-black/20" />

        {/* Live Frame Tracker Badge on Bottom-Right */}
        <div className="absolute bottom-8 right-8 z-10 hidden lg:flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
            360° Stage // Frame {String(currentFrameNum).padStart(3, '0')} / {TOTAL_FRAMES}
          </span>
        </div>
      </div>

      {/* Scrolling Content Overlay (Positioned over the sticky canvas) */}
      <div className="relative z-10 -mt-[100vh]">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION */}
        {/* ========================================================================= */}
        <section id="home" className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-16 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Bold Hero Typography & Actions */}
              <div className="lg:col-span-7 border-l border-white/20 pl-6 sm:pl-10 lg:pl-12 py-2">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase text-white/50 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
                    Professional Video Intelligence
                  </span>
                </div>

                <h1
                  id="hero-main-title"
                  className="text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-black leading-[0.88] tracking-tighter uppercase text-white drop-shadow-2xl"
                >
                  RAW <span className="block text-white/30">TO REFINED.</span>
                </h1>

                <p className="mt-6 sm:mt-8 text-base sm:text-lg font-light text-white/70 max-w-xl leading-relaxed">
                  Transform cinematic raw footage into high-end professional exports. Precision storytelling, ACEScg color science, and spatial audio mastering for modern creators.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                  <button
                    id="hero-book-project-btn"
                    onClick={onOpenContact}
                    className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-all cursor-pointer shadow-xl flex items-center gap-3 group"
                  >
                    <span>Start Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    id="hero-explore-craft-btn"
                    onClick={onExploreServices}
                    className="px-6 sm:px-8 py-4 sm:py-5 bg-black/40 backdrop-blur-sm text-white font-bold uppercase text-xs tracking-widest border border-white/20 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Explore Pipeline
                  </button>

                  <div className="flex flex-col border-l border-white/20 pl-5 hidden sm:flex">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5 font-mono">
                      Post Engine
                    </span>
                    <span className="text-xs font-mono text-white/90">v4.2.0-STABLE</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Blank space kept open for the camera */}
              <div className="hidden lg:block lg:col-span-5 min-h-[300px]" aria-hidden="true" />
            </div>

            {/* Technical Specs Footer Bar */}
            <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 backdrop-blur-[2px]">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-mono">Color Grade</span>
                <span className="text-sm sm:text-base font-semibold italic text-white">ACEScg & Deep Palette™</span>
                <span className="text-[10px] font-mono text-white/40 mt-0.5">Kodak 2383 / 35mm</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-mono">Encoding</span>
                <span className="text-sm sm:text-base font-semibold italic text-white">Lossless 12-bit Master</span>
                <span className="text-[10px] font-mono text-white/40 mt-0.5">ProRes 4444 XQ / RAW</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-mono">Resolution</span>
                <span className="text-sm sm:text-base font-semibold italic text-white">Up to 8K Master</span>
                <span className="text-[10px] font-mono text-white/40 mt-0.5">DCI 8192 × 4320</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-mono">Turnaround</span>
                <span className="text-sm sm:text-base font-semibold italic text-white">48h Guaranteed</span>
                <span className="text-[10px] font-mono text-white/40 mt-0.5">Real-time Frame.io</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: BEHIND THE EDITS (TEXT ON LEFT, RIGHT OPEN FOR CAMERA VISUAL) */}
        {/* ========================================================================= */}
        <section id="about" className="min-h-screen flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl w-full mx-auto">
            {/* Grid Layout: Left 7 cols for Content, Right 5 cols left empty for camera transition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Content Side */}
              <div className="lg:col-span-7 space-y-6">
                {/* Section Header */}
                <div className="border-l border-white/20 pl-6 sm:pl-8 py-1 space-y-3">
                  <span
                    id="section2-eyebrow"
                    className="text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase text-white/50 block font-mono flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
                    Section 02 // Post-Production Intelligence
                  </span>

                  <h2
                    id="section2-heading"
                    className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tighter uppercase text-white leading-[0.92] drop-shadow-xl"
                  >
                    SHAPING RAW STORIES <span className="block text-white/30">INTO REFINED MASTERS.</span>
                  </h2>

                  <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                    We operate an uncompromising post-production pipeline turning chaotic raw rushes into high-retention stories, cinematic commercials, and viral long-form narratives.
                  </p>
                </div>

                {/* Craft Selector Tabs */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {CRAFT_FEATURE_CARDS.map((card) => {
                    const isSelected = activeCraftTab === card.id;
                    return (
                      <button
                        key={card.id}
                        onClick={() => setActiveCraftTab(card.id)}
                        className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-2 ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-xl'
                            : 'bg-black/70 text-white/70 border-white/15 hover:border-white/40 hover:text-white backdrop-blur-md'
                        }`}
                      >
                        {card.id === 'pacing' && <Film className="w-3.5 h-3.5" />}
                        {card.id === 'color' && <Sliders className="w-3.5 h-3.5" />}
                        {card.id === 'audio' && <Volume2 className="w-3.5 h-3.5" />}
                        <span>{card.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Craft Feature Card */}
                <div className="bg-black/80 backdrop-blur-lg border border-white/20 p-6 sm:p-7 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase font-semibold">
                      {activeCraftCard.tag}
                    </span>
                    <div className="px-3 py-1 bg-black/90 border border-white/20 text-right">
                      <span className="text-sm font-bold text-white font-mono">{activeCraftCard.metric}</span>
                      <span className="text-[9px] uppercase tracking-widest text-white/40 block font-mono">
                        {activeCraftCard.metricLabel}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                      {activeCraftCard.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      {activeCraftCard.subtitle}
                    </p>
                  </div>

                  {/* Technical Visualizer Module */}
                  <div className="p-3.5 bg-black/90 border border-white/10 space-y-2.5 font-mono text-xs">
                    {activeCraftTab === 'pacing' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-white/70">
                          <span className="flex items-center gap-1.5 text-white text-[11px]">
                            <Film className="w-3.5 h-3.5 text-[#ff5500]" /> Dynamic Timeline Cuts
                          </span>
                          <span className="text-white text-[9px] uppercase font-mono tracking-widest">
                            RETENTION LOCKED
                          </span>
                        </div>
                        <div className="h-3.5 bg-black flex gap-0.5 overflow-hidden p-0.5 border border-white/20">
                          <div className="bg-white w-[18%]" title="Hook A-Roll" />
                          <div className="bg-white/40 w-[12%]" title="B-Roll Zoom" />
                          <div className="bg-white w-[22%]" title="Core Point" />
                          <div className="bg-white/60 w-[14%]" title="Pattern Interrupt" />
                          <div className="bg-white w-[34%]" title="Climax Callout" />
                        </div>
                      </div>
                    )}

                    {activeCraftTab === 'color' && (
                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex items-center justify-between text-white/70">
                          <span className="flex items-center gap-1.5 text-white text-[11px]">
                            <Sliders className="w-3.5 h-3.5 text-[#ff5500]" /> DaVinci Color Science
                          </span>
                          <span className="text-white text-[9px] uppercase font-mono tracking-widest">
                            ACEScg 1.3
                          </span>
                        </div>
                        <div className="flex justify-between text-white/60">
                          <span>Dynamic Gamut: S-Log3 / RED RAW</span>
                          <span className="text-white font-mono">16+ Stops</span>
                        </div>
                      </div>
                    )}

                    {activeCraftTab === 'audio' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-white/70">
                          <span className="flex items-center gap-1.5 text-white text-[11px]">
                            <Volume2 className="w-3.5 h-3.5 text-[#ff5500]" /> Spatial Master Level
                          </span>
                          <span className="text-white text-[9px] uppercase font-mono tracking-widest">
                            -14.0 LUFS
                          </span>
                        </div>
                        <div className="grid grid-cols-6 gap-1 h-3.5 items-end bg-black p-0.5 border border-white/20">
                          <div className="bg-white h-full" />
                          <div className="bg-white h-4/5" />
                          <div className="bg-white/40 h-3/5" />
                          <div className="bg-white h-full" />
                          <div className="bg-white/40 h-2/3" />
                          <div className="bg-white h-5/6" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10 text-xs font-mono">
                    {activeCraftCard.specs.map((spec) => (
                      <div key={spec.label} className="bg-black/60 border border-white/10 p-2.5 space-y-0.5">
                        <div className="text-[10px] text-white/40 uppercase">{spec.label}</div>
                        <div className="text-white font-medium text-xs truncate">{spec.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={onOpenContact}
                      className="px-6 py-2.5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>Get in touch</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-white/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>Studio Calibrated</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Kept completely open for image transition */}
              <div className="hidden lg:block lg:col-span-5 min-h-[400px]" aria-hidden="true" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
