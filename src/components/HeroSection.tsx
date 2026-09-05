import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Video, Aperture, Sliders, Film } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onExploreServices: () => void;
}

const TOTAL_FRAMES = 240;
const FPS = 24;

const getFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `/photographer_frames/ezgif-frame-${paddedIndex}.jpg`;
};

// Formats frame number to SMPTE timecode: 00:00:SS:FF
const formatTimecode = (frameNum: number) => {
  const totalFrames = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNum)));
  const totalSeconds = Math.floor((totalFrames - 1) / FPS);
  const frames = (totalFrames - 1) % FPS;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onExploreServices,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const [currentFrameNum, setCurrentFrameNum] = useState<number>(1);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  // Helper to find nearest loaded fallback image
  const getLoadedImage = useCallback((index: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return null;
    const clampedIndex = Math.max(1, Math.min(TOTAL_FRAMES, index)) - 1;
    const direct = images[clampedIndex];
    if (direct && direct.complete && direct.naturalWidth > 0) return direct;

    // Search nearest loaded neighbor
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = images[clampedIndex - offset];
      if (prev && prev.complete && prev.naturalWidth > 0) return prev;
      const next = images[clampedIndex + offset];
      if (next && next.complete && next.naturalWidth > 0) return next;
    }
    return null;
  }, []);

  // Preload all 240 frames with async GPU decoding
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let isMounted = true;
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
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
    const f2 = Math.min(TOTAL_FRAMES, f1 + 1);
    const blend = exactProgressFrame - f1;

    const img1 = getLoadedImage(f1);
    const img2 = getLoadedImage(f2);

    if (!img1 || !img1.complete || img1.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Pitch black background fill
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // End-to-end full bleed cover scaling
    const scale = Math.max(width / img1.naturalWidth, height / img1.naturalHeight);
    const drawWidth = img1.naturalWidth * scale;
    const drawHeight = img1.naturalHeight * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Primary frame base
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img1, 0, 0, img1.naturalWidth, img1.naturalHeight, drawX, drawY, drawWidth, drawHeight);

    // Optical sub-frame cross-fade interpolation for continuous 60fps/120fps motion
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
      const exactFrame = 1 + currentProgressRef.current * (TOTAL_FRAMES - 1);
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

      const progress = -rect.top / scrollableDistance;
      targetProgressRef.current = Math.min(1, Math.max(0, progress));
    };

    const handleResize = () => {
      resizeCanvas();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Cinematic Inertial Smoothing with Damped Momentum
    const LERP_FACTOR = 0.075; // Heavily damped fluid cinematic feel
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * LERP_FACTOR;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const exactFrame = 1 + currentProgressRef.current * (TOTAL_FRAMES - 1);
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

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-[340vh] bg-black text-white"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Cinematic Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none z-0"
          style={{ backgroundColor: '#000000' }}
        />

        {/* Cinematic Lighting Scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent pointer-events-none z-10 lg:from-black/85 lg:via-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none z-10" />

        {/* Top Vignette Accent */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />

        {/* Hero Content Layer */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-36 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 border-l border-white/20 pl-6 sm:pl-10 lg:pl-12 py-2">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase text-white/60 font-mono flex items-center gap-2">
                  <Aperture className="w-3.5 h-3.5 text-[#ff5500] animate-spin-slow" />
                  Section 01 // Cinematic Ingest
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  24 FPS Master
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
                  className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-all cursor-pointer shadow-2xl flex items-center gap-3 group"
                >
                  <span>Start Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  id="hero-explore-craft-btn"
                  onClick={onExploreServices}
                  className="px-6 sm:px-8 py-4 sm:py-5 bg-black/40 backdrop-blur-md text-white font-bold uppercase text-xs tracking-widest border border-white/20 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
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

            {/* Right Column: Broadcast SMPTE HUD Controller */}
            <div className="hidden lg:flex lg:col-span-5 h-full flex-col justify-end items-end pb-8 pointer-events-none space-y-3">
              {/* Floating Lens/Camera Status HUD */}
              <div className="bg-black/75 backdrop-blur-xl border border-white/15 p-4 rounded-none shadow-2xl space-y-2.5 min-w-[280px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 font-bold">
                      OPTICAL SCRUB // LIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50">{scrollPercent}%</span>
                </div>

                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[11px] text-white/50 uppercase">SMPTE TC</span>
                  <span className="text-sm text-white font-bold tracking-wider">
                    {formatTimecode(currentFrameNum)}
                  </span>
                </div>

                {/* Progress bar scrub track */}
                <div className="w-full h-1 bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff5500] to-white transition-all duration-75"
                    style={{ width: `${(currentFrameNum / TOTAL_FRAMES) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-[9px] font-mono text-white/40 pt-0.5">
                  <span>FRAME {String(currentFrameNum).padStart(3, '0')} / {TOTAL_FRAMES}</span>
                  <span>S-LOG3 // 16+ STOPS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Footer Bar */}
          <div className="mb-6 pt-6 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 backdrop-blur-[2px]">
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
      </div>
    </section>
  );
};
