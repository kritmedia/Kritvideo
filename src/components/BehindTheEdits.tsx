import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CRAFT_FEATURE_CARDS } from '../data/content';
import { ArrowUpRight, Sliders, Volume2, Film, Sparkles, Laptop } from 'lucide-react';

interface BehindTheEditsProps {
  onOpenContact: () => void;
}

const TOTAL_LAPTOP_FRAMES = 174;
const FPS = 24;

const getLaptopFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `/laptop_frames/ezgif-frame-${paddedIndex}.jpg`;
};

const formatTimecode = (frameNum: number) => {
  const totalFrames = Math.max(1, Math.min(TOTAL_LAPTOP_FRAMES, Math.round(frameNum)));
  const totalSeconds = Math.floor((totalFrames - 1) / FPS);
  const frames = (totalFrames - 1) % FPS;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
};

export const BehindTheEdits: React.FC<BehindTheEditsProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const [activeTab, setActiveTab] = useState<string>('pacing');
  const [currentFrameNum, setCurrentFrameNum] = useState<number>(1);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  const getLoadedImage = useCallback((index: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return null;
    const clampedIndex = Math.max(1, Math.min(TOTAL_LAPTOP_FRAMES, index)) - 1;
    const direct = images[clampedIndex];
    if (direct && direct.complete && direct.naturalWidth > 0) return direct;

    for (let offset = 1; offset < TOTAL_LAPTOP_FRAMES; offset++) {
      const prev = images[clampedIndex - offset];
      if (prev && prev.complete && prev.naturalWidth > 0) return prev;
      const next = images[clampedIndex + offset];
      if (next && next.complete && next.naturalWidth > 0) return next;
    }
    return null;
  }, []);

  // Preload all 174 laptop frames with decode()
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let isMounted = true;

    for (let i = 1; i <= TOTAL_LAPTOP_FRAMES; i++) {
      const img = new Image();
      img.src = getLaptopFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        if (i === 1) {
          requestAnimationFrame(() => renderSmoothFrame(1.0));
        }
      };
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      isMounted = false;
      imagesRef.current = [];
    };
  }, []);

  // Dual-Frame Sub-frame Optical Cross-Fade Renderer
  const renderSmoothFrame = (exactProgressFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const f1 = Math.floor(exactProgressFrame);
    const f2 = Math.min(TOTAL_LAPTOP_FRAMES, f1 + 1);
    const blend = exactProgressFrame - f1;

    const img1 = getLoadedImage(f1);
    const img2 = getLoadedImage(f2);

    if (!img1 || !img1.complete || img1.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Pitch black background fill
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Cover-scale calculations
    const scale = Math.max(width / img1.naturalWidth, height / img1.naturalHeight);
    const drawWidth = img1.naturalWidth * scale;
    const drawHeight = img1.naturalHeight * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.globalAlpha = 1.0;
    ctx.drawImage(img1, 0, 0, img1.naturalWidth, img1.naturalHeight, drawX, drawY, drawWidth, drawHeight);

    // Optical sub-frame cross-fade interpolation
    if (blend > 0.005 && img2 && img2.complete && img2.naturalWidth > 0 && img2 !== img1) {
      ctx.globalAlpha = blend;
      ctx.drawImage(img2, 0, 0, img2.naturalWidth, img2.naturalHeight, drawX, drawY, drawWidth, drawHeight);
      ctx.globalAlpha = 1.0;
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      const exactFrame = 1 + currentProgressRef.current * (TOTAL_LAPTOP_FRAMES - 1);
      renderSmoothFrame(exactFrame);
    }
  };

  useEffect(() => {
    resizeCanvas();

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      // Progress from 0 to 1 as user scrolls through Section 2
      const progress = -rect.top / scrollableDistance;
      targetProgressRef.current = Math.min(1, Math.max(0, progress));
    };

    const handleResize = () => {
      resizeCanvas();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const LERP_FACTOR = 0.075;
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * LERP_FACTOR;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const exactFrame = 1 + currentProgressRef.current * (TOTAL_LAPTOP_FRAMES - 1);
      renderSmoothFrame(exactFrame);

      const roundedFrame = Math.round(exactFrame);
      setCurrentFrameNum(roundedFrame);
      setScrollPercent(Math.round(currentProgressRef.current * 100));

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
  }, [getLoadedImage]);

  const activeCard = CRAFT_FEATURE_CARDS.find((c) => c.id === activeTab) || CRAFT_FEATURE_CARDS[0];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-[300vh] bg-black text-white"
    >
      {/* Sticky Fullscreen Viewport for Laptop Scroll Animation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Canvas: 174 Laptop Animation Frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none z-0"
          style={{ backgroundColor: '#000000' }}
        />

        {/* Dark Gradient Overlay for left-aligned content contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none z-10 lg:from-black/80 lg:via-black/30" />

        {/* Section 2 Content Container */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-8 flex-1 flex flex-col justify-between">
          {/* Main Grid: Left 7 cols for Text & Craft features, Right 5 cols open for Laptop Image Transition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header */}
              <div className="border-l border-white/20 pl-6 sm:pl-8 py-1 space-y-3">
                <span
                  id="section2-eyebrow"
                  className="text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase text-white/50 block font-mono flex items-center gap-2"
                >
                  <Laptop className="w-3.5 h-3.5 text-[#ff5500]" />
                  Section 02 // Post-Production Workstation
                </span>

                <h2
                  id="section2-heading"
                  className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tighter uppercase text-white leading-[0.92] drop-shadow-xl"
                >
                  SHAPING RAW STORIES <span className="block text-white/30">INTO REFINED MASTERS.</span>
                </h2>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                  We operate an uncompromising post-production pipeline turning chaotic raw footage into high-retention stories, cinematic commercials, and viral long-form narratives.
                </p>
              </div>

              {/* Craft Selector Tabs */}
              <div className="flex flex-wrap gap-2 pt-1">
                {CRAFT_FEATURE_CARDS.map((card) => {
                  const isSelected = activeTab === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => setActiveTab(card.id)}
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
                    {activeCard.tag}
                  </span>
                  <div className="px-3 py-1 bg-black/90 border border-white/20 text-right">
                    <span className="text-sm font-bold text-white font-mono">{activeCard.metric}</span>
                    <span className="text-[9px] uppercase tracking-widest text-white/40 block font-mono">
                      {activeCard.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                    {activeCard.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {activeCard.subtitle}
                  </p>
                </div>

                {/* Technical Visualizer Module */}
                <div className="p-3.5 bg-black/90 border border-white/10 space-y-2.5 font-mono text-xs">
                  {activeTab === 'pacing' && (
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

                  {activeTab === 'color' && (
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

                  {activeTab === 'audio' && (
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
                  {activeCard.specs.map((spec) => (
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

                  <span className="text-[11px] font-mono text-white/50">DaVinci Resolve Studio 19</span>
                </div>
              </div>
            </div>

            {/* Right Column: Broadcast SMPTE HUD Controller */}
            <div className="hidden lg:flex lg:col-span-5 h-full flex-col justify-end items-end pb-8 pointer-events-none space-y-3">
              <div className="bg-black/75 backdrop-blur-xl border border-white/15 p-4 rounded-none shadow-2xl space-y-2.5 min-w-[280px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 font-bold">
                      DAVINCI TIMELINE // LIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50">{scrollPercent}%</span>
                </div>

                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[11px] text-white/50 uppercase">PLAYHEAD TC</span>
                  <span className="text-sm text-white font-bold tracking-wider">
                    {formatTimecode(currentFrameNum)}
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="w-full h-1 bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff5500] to-white transition-all duration-75"
                    style={{ width: `${(currentFrameNum / TOTAL_LAPTOP_FRAMES) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-[9px] font-mono text-white/40 pt-0.5">
                  <span>FRAME {String(currentFrameNum).padStart(3, '0')} / {TOTAL_LAPTOP_FRAMES}</span>
                  <span>ACEScg 1.3 // PRORES 4444</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Indicators */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
            <span>KRITVIDEO // WORKSTATION PIPELINE</span>
            <span className="text-white/60">SCROLL DOWN FOR ESTIMATOR & PRICING</span>
          </div>
        </div>
      </div>
    </section>
  );
};
