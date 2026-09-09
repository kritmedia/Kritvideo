import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sliders,
  ArrowUpRight,
  Tv,
  Smartphone,
  Layers,
  Sparkles,
  RotateCcw,
  Check,
  X
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  category: 'youtube' | 'shorts' | 'brand' | 'creator';
  categoryLabel: string;
  title: string;
  client: string;
  tagline: string;
  duration: string;
  durationSeconds: number;
  views: string;
  format: '16:9' | '9:16';
  thumbnail: string;
  videoPreviewUrl?: string;
  themeColor: string;
  glowColor: string;
  highlights: string[];
  specs: {
    resolution: string;
    codec: string;
    fps: string;
    colorSpace: string;
  };
}

const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'youtube-doc',
    category: 'youtube',
    categoryLabel: 'YOUTUBE',
    title: 'YouTube Documentary',
    client: 'Story-Led Production',
    tagline: 'Story-led long-form editing',
    duration: '18:42',
    durationSeconds: 1122,
    views: 'YouTube Long-Form',
    format: '16:9',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=75',
    themeColor: '#e67300', // Amber gold
    glowColor: 'rgba(230, 115, 0, 0.40)',
    highlights: ['Narrative Flow', 'Visual Pacing', 'Sound Design'],
    specs: {
      resolution: '4K DCI (3840x2160)',
      codec: 'Apple ProRes 422',
      fps: '24 FPS',
      colorSpace: 'DaVinci YRGB',
    },
  },
  {
    id: 'brand-film',
    category: 'brand',
    categoryLabel: 'BRAND',
    title: 'Brand Film',
    client: 'Apex Commercials',
    tagline: 'Cinematic commercial edit',
    duration: '01:30',
    durationSeconds: 90,
    views: 'Commercial Edit',
    format: '16:9',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=75',
    themeColor: '#d97706', // Warm bronze
    glowColor: 'rgba(217, 119, 6, 0.40)',
    highlights: ['Commercial Color Grade', 'Sound Finishing', 'Dynamic Motion'],
    specs: {
      resolution: '4K UHD (3840x2160)',
      codec: 'ProRes 4444',
      fps: '30 FPS',
      colorSpace: 'ACEScg Wide Gamut',
    },
  },
  {
    id: 'podcast',
    category: 'creator',
    categoryLabel: 'PODCASTS',
    title: 'Podcast',
    client: 'Silicon Conversations',
    tagline: 'Multi-camera conversation edit',
    duration: '45:10',
    durationSeconds: 2710,
    views: 'Multi-Cam Master',
    format: '16:9',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=75',
    themeColor: '#9333ea', // Violet
    glowColor: 'rgba(147, 51, 234, 0.40)',
    highlights: ['Multi-Cam Switching', 'Audio Normalization', 'Chaptering'],
    specs: {
      resolution: '4K UHD (3840x2160)',
      codec: 'ProRes 422 HQ',
      fps: '24 FPS',
      colorSpace: 'Rec.709',
    },
  },
  {
    id: 'travel-film',
    category: 'creator',
    categoryLabel: 'BRAND',
    title: 'Travel Film',
    client: 'Nordic Cinematic',
    tagline: 'Cinematic storytelling',
    duration: '08:20',
    durationSeconds: 500,
    views: 'Cinematic Story',
    format: '16:9',
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=75',
    themeColor: '#0284c7', // Cyber blue
    glowColor: 'rgba(2, 132, 199, 0.40)',
    highlights: ['Film Emulation', 'Atmospheric Foley', 'Seamless Cuts'],
    specs: {
      resolution: '4K DCI (4096x2160)',
      codec: 'ProRes 422',
      fps: '24 FPS',
      colorSpace: 'Cineon Log / Kodak 2383',
    },
  },
  {
    id: 'short-form',
    category: 'shorts',
    categoryLabel: 'SHORT-FORM',
    title: 'Short-Form',
    client: 'Viral Studio',
    tagline: 'Reels & Shorts editing',
    duration: '0:50',
    durationSeconds: 50,
    views: 'Social Reels',
    format: '9:16',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=75',
    themeColor: '#dc2626', // Crimson red
    glowColor: 'rgba(220, 38, 38, 0.40)',
    highlights: ['Hook Retention', 'Kinetic Captions', 'Sound FX'],
    specs: {
      resolution: '1080x1920 (Vertical)',
      codec: 'H.265 / HEVC',
      fps: '60 FPS',
      colorSpace: 'Rec.709',
    },
  },
  {
    id: 'product-video',
    category: 'brand',
    categoryLabel: 'ADS',
    title: 'Product Video',
    client: 'Design Lab',
    tagline: 'E-commerce creative',
    duration: '0:45',
    durationSeconds: 45,
    views: 'Paid Ad Creative',
    format: '16:9',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=75',
    themeColor: '#16a34a', // Emerald green
    glowColor: 'rgba(22, 163, 74, 0.40)',
    highlights: ['Macro Product Shots', 'Crisp Typography', 'Dynamic Grade'],
    specs: {
      resolution: '4K UHD (3840x2160)',
      codec: 'ProRes 4444',
      fps: '60 FPS',
      colorSpace: 'Rec.709',
    },
  },
  {
    id: 'youtube-interview',
    category: 'youtube',
    categoryLabel: 'YOUTUBE',
    title: 'YouTube Interview',
    client: 'Creator Studio',
    tagline: 'Long-form creator content',
    duration: '22:15',
    durationSeconds: 1335,
    views: 'Creator Long-Form',
    format: '16:9',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
    themeColor: '#f59e0b', // Amber
    glowColor: 'rgba(245, 158, 11, 0.40)',
    highlights: ['Pacing Optimization', 'B-Roll Integration', 'Graphic Callouts'],
    specs: {
      resolution: '4K DCI (3840x2160)',
      codec: 'ProRes 422',
      fps: '24 FPS',
      colorSpace: 'Rec.709',
    },
  },
];

export default function SectionOurWork() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(18);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpecsModal, setShowSpecsModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const theaterContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = PORTFOLIO_DATA;
  const activeItem = filteredItems[currentIndex] || PORTFOLIO_DATA[0];

  // Playback timer simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= activeItem.durationSeconds) return 0;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, activeItem.durationSeconds]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    setCurrentTime(0);
  }, [filteredItems.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    setCurrentTime(0);
  }, [filteredItems.length]);

  // Mobile viewport detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Fullscreen trigger (with fallback if iframe blocks native API)
  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullScreen();
      } else if (e.key === 'Escape') {
        if (isFullScreen) setIsFullScreen(false);
        if (showSpecsModal) setShowSpecsModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullScreen, showSpecsModal]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(
    100,
    (currentTime / (activeItem.durationSeconds || 100)) * 100
  );

  return (
    <section
      id="work"
      className="relative pt-14 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-10 md:px-16 lg:px-20 bg-black text-white overflow-hidden select-none"
    >
      {/* DYNAMIC AMBIENT BACKDROP GLOW MATCHING ACTIVE ALBUM/VIDEO ARTWORK */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 38%, ${activeItem.glowColor} 0%, rgba(0, 0, 0, 0.96) 80%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Eyebrow */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.28em] text-neutral-400 font-semibold">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: activeItem.themeColor }}
            />
            <span className="text-white">SELECTED WORK</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{PORTFOLIO_DATA.length} FEATURED EDITS</span>
            </span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.035em] leading-[1.08] text-white">
              See what happens{' '}
              <span className="font-editorial-serif italic font-normal text-amber-300 block sm:inline">
                when we get the footage.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-2xl">
              Recent video edits across YouTube, high-retention shorts, podcasts, and brand campaigns.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400">
            <a
              href="/work"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/work');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="px-5 py-2.5 rounded-full bg-neutral-900 border border-white/15 hover:border-white text-white transition-all font-bold flex items-center gap-2"
            >
              <span>VIEW ALL WORK ↗</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3D APPLE COVER FLOW CAROUSEL */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full h-[440px] sm:h-[540px] md:h-[590px] flex items-center justify-center my-4 perspective-[1400px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
              {filteredItems.map((item, index) => {
                const offset = index - currentIndex;
                const isCenter = offset === 0;
                const isLeft = offset < 0;
                const isRight = offset > 0;
                const absOffset = Math.abs(offset);

                // On mobile, only render center card and immediate left/right neighbor to prevent horizontal overflow
                if (isMobile && absOffset > 1) return null;
                if (!isMobile && absOffset > 2) return null;

                let translateX = 0;
                let translateZ = 0;
                let rotateY = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = 30 - absOffset * 10;

                if (isMobile) {
                  if (isCenter) {
                    translateX = 0;
                    translateZ = 40;
                    rotateY = 0;
                    scale = 1.0;
                    opacity = 1;
                  } else if (isLeft) {
                    translateX = -140;
                    translateZ = -80;
                    rotateY = 24;
                    scale = 0.82;
                    opacity = 0.38;
                  } else if (isRight) {
                    translateX = 140;
                    translateZ = -80;
                    rotateY = -24;
                    scale = 0.82;
                    opacity = 0.38;
                  }
                } else {
                  if (isCenter) {
                    translateX = 0;
                    translateZ = 70;
                    rotateY = 0;
                    scale = 1.08;
                    opacity = 1;
                  } else if (isLeft) {
                    translateX = -190 * absOffset - 80;
                    translateZ = -130 * absOffset;
                    rotateY = 36;
                    scale = Math.max(0.76, 1 - absOffset * 0.12);
                    opacity = Math.max(0.35, 0.9 - absOffset * 0.25);
                  } else if (isRight) {
                    translateX = 190 * absOffset + 80;
                    translateZ = -130 * absOffset;
                    rotateY = -36;
                    scale = Math.max(0.76, 1 - absOffset * 0.12);
                    opacity = Math.max(0.35, 0.9 - absOffset * 0.25);
                  }
                }

                // If horizontal video, give it a slightly wider aesthetic proportion
                const isHorizontal = item.format === '16:9';

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (isCenter) {
                        setIsPlaying((prev) => !prev);
                      } else {
                        setCurrentIndex(index);
                        setCurrentTime(0);
                      }
                    }}
                    onMouseEnter={() => isCenter && setIsHoveringCard(true)}
                    onMouseLeave={() => isCenter && setIsHoveringCard(false)}
                    data-cursor={isCenter ? (isPlaying ? 'PAUSE' : 'PLAY') : 'SELECT'}
                    style={{
                      transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                      transition: 'all 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                    className={`absolute ${
                      isHorizontal ? 'w-[270px] xs:w-[290px] sm:w-[410px] md:w-[460px] aspect-[4/4.8]' : 'w-[250px] xs:w-[270px] sm:w-[370px] md:w-[410px] aspect-[4/5]'
                    } rounded-[32px] overflow-hidden cursor-pointer shadow-[0_30px_70px_rgba(0,0,0,0.9)] border ${
                      isCenter
                        ? 'border-white/30 ring-1 ring-white/20 shadow-[0_0_60px_rgba(0,0,0,0.95)]'
                        : 'border-white/10 filter brightness-75 hover:brightness-95'
                    }`}
                  >
                    {/* Artwork Image Frame */}
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 select-none"
                      style={{
                        transform: isCenter && isHoveringCard ? 'scale(1.06)' : 'scale(1)',
                      }}
                    />

                    {/* Top Artwork Gradient & Format Badges */}
                    <div className="absolute top-0 inset-x-0 p-5 sm:p-6 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/85 via-black/35 to-transparent">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15 shadow-sm">
                          {item.categoryLabel}
                        </span>
                        <span
                          className={`font-mono-tech text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            item.format === '16:9'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {item.format}
                        </span>
                      </div>

                      {/* Fullscreen Trigger Button on Active Card */}
                      {isCenter ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFullScreen();
                          }}
                          aria-label="Open Fullscreen Theater"
                          data-cursor="FULLSCREEN"
                          className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110"
                          title="Full Screen Cinema View (F)"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="font-mono-tech text-[11px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 border border-white/15">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {/* Central Play/Pause Liquid Button */}
                    {isCenter && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className={`w-18 h-18 rounded-full bg-black/40 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                            isHoveringCard || !isPlaying ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                          }`}
                        >
                          {isPlaying ? (
                            <Pause className="w-7 h-7 fill-white" />
                          ) : (
                            <Play className="w-7 h-7 fill-white ml-1" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Frosted Glass Bottom Banner */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-md border-t border-white/10 flex flex-col justify-end">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 font-semibold truncate pr-2">
                          {item.client}
                        </span>
                        <span
                          className="text-xs font-mono-tech font-bold shrink-0"
                          style={{ color: item.themeColor }}
                        >
                          {item.views}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-xs font-editorial-serif italic text-neutral-300 mt-1 line-clamp-1">
                        {item.tagline}
                      </p>

                      {/* Equalizer on Center Card */}
                      {isCenter && isPlaying && (
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                          <div className="flex items-center gap-1">
                            {[35, 75, 50, 90, 65, 80, 45, 95, 70, 55, 85].map((h, i) => (
                              <span
                                key={i}
                                className="w-1 rounded-full animate-pulse"
                                style={{
                                  height: `${h * 0.16}px`,
                                  backgroundColor: item.themeColor,
                                  animationDelay: `${i * 0.1}s`,
                                }}
                              />
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFullScreen();
                            }}
                            className="text-[11px] font-mono-tech text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>FULLSCREEN</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        {/* ========================================================================= */}
        {/* FROSTED GLASS FLOATING MEDIA CONTROLS BAR */}
        {/* ========================================================================= */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative rounded-full bg-neutral-900/70 backdrop-blur-2xl border border-white/15 px-5 sm:px-8 py-3.5 sm:py-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4">
            {/* Left Deck: Prev / Play / Next */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous reel"
                data-cursor="PREV"
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-90"
                title="Previous Video (Left Arrow)"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? 'Pause playback' : 'Play video'}
                data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
                className="w-12 h-12 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all cursor-pointer active:scale-95"
                title="Play / Pause (Space)"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-black" />
                ) : (
                  <Play className="w-5 h-5 fill-black ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                aria-label="Next reel"
                data-cursor="NEXT"
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-90"
                title="Next Video (Right Arrow)"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Center Track Capsule: Mini Thumbnail + Title + Live Scrubber */}
            <div className="flex-1 min-w-0 px-2 sm:px-4 hidden sm:flex items-center gap-3.5 bg-black/40 rounded-2xl p-2 border border-white/10">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20">
                <img
                  src={activeItem.thumbnail}
                  alt={activeItem.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white truncate pr-2">
                    {activeItem.title}
                  </span>
                  <span className="font-mono-tech text-[10px] text-neutral-400 shrink-0">
                    {formatTime(currentTime)} / {activeItem.duration}
                  </span>
                </div>

                {/* Progress bar scrubber */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = clickX / rect.width;
                    setCurrentTime(percent * activeItem.durationSeconds);
                  }}
                  className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer relative group"
                >
                  <div
                    className="h-full rounded-full transition-all duration-150"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: activeItem.themeColor,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Deck: Specs / Fullscreen / Audio */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 text-neutral-300">
              <button
                onClick={() => setShowSpecsModal(true)}
                aria-label="View editing specs"
                data-cursor="SPECS"
                className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors cursor-pointer"
                title="View Technical Specs"
              >
                <Sliders className="w-4 h-4" />
              </button>

              <button
                onClick={toggleFullScreen}
                aria-label="Toggle Fullscreen Theater"
                data-cursor="FULLSCREEN"
                className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors cursor-pointer text-amber-400"
                title="Full Screen Cinema (F)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMuted((prev) => !prev)}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                data-cursor={isMuted ? 'UNMUTE' : 'MUTE'}
                className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors cursor-pointer"
                title="Mute / Unmute"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Supporting Line */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-sm sm:text-base font-editorial-serif italic text-neutral-300">
            “Warning: You may start looking at your own camera roll differently.”
          </p>

          <div className="flex items-center justify-center gap-6 pt-2">
            <a
              href="#contact"
              data-cursor="EDIT"
              className="px-9 py-4 bg-white text-black font-bold text-xs sm:text-sm rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2.5 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95"
            >
              <span>Request an Edit in This Style</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* IMMERSIVE FULL SCREEN THEATER MODAL (Triggered by Fullscreen button or 'F' key) */}
      {/* ========================================================================= */}
      {isFullScreen && (
        <div
          ref={theaterContainerRef}
          className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 sm:p-8 animate-fadeIn select-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${activeItem.glowColor} 0%, rgba(0,0,0,0.98) 75%)`,
          }}
        >
          {/* Top Fullscreen Bar */}
          <div className="relative z-20 flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-3.5 rounded-full max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: activeItem.themeColor }}
              />
              <span className="font-mono-tech text-xs text-white uppercase tracking-widest font-bold">
                KRIT CINEMA THEATER • {activeItem.format}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs text-neutral-400 hidden sm:inline-block">
                Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-white font-mono text-[10px]">ESC</kbd> to exit
              </span>
              <button
                onClick={() => setIsFullScreen(false)}
                aria-label="Exit Fullscreen"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Cinema Stage */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div
              className={`relative rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.95)] border border-white/20 ${
                activeItem.format === '16:9'
                  ? 'w-full max-w-6xl aspect-[16/9]'
                  : 'h-full max-h-[80vh] aspect-[9/16]'
              }`}
            >
              <img
                src={activeItem.thumbnail}
                alt={activeItem.title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />

              {/* Theater Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

              {/* Large Central Theater Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="w-24 h-24 rounded-full bg-black/60 backdrop-blur-2xl border border-white/30 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 fill-white" />
                  ) : (
                    <Play className="w-10 h-10 fill-white ml-1.5" />
                  )}
                </button>
              </div>

              {/* Bottom Film Info In-Stage */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 flex items-end justify-between">
                <div>
                  <span className="font-mono-tech text-xs text-amber-400 uppercase tracking-widest font-semibold block">
                    {activeItem.client} • {activeItem.specs.resolution}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                    {activeItem.title}
                  </h2>
                  <p className="text-sm font-editorial-serif italic text-neutral-300 mt-1">
                    {activeItem.tagline}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 font-mono-tech text-xs text-neutral-300">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    {activeItem.specs.codec}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    {activeItem.specs.fps}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Fullscreen Transport Dock */}
          <div className="relative z-20 max-w-4xl mx-auto w-full bg-neutral-950/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3">
            {/* Scrubber */}
            <div className="flex items-center gap-4">
              <span className="font-mono-tech text-xs text-neutral-400 shrink-0">
                {formatTime(currentTime)}
              </span>

              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percent = clickX / rect.width;
                  setCurrentTime(percent * activeItem.durationSeconds);
                }}
                className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer relative"
              >
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: activeItem.themeColor,
                  }}
                />
              </div>

              <span className="font-mono-tech text-xs text-neutral-400 shrink-0">
                {activeItem.duration}
              </span>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-black" />
                  ) : (
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Title in Theater Dock */}
              <div className="text-center hidden sm:block">
                <p className="text-sm font-bold text-white">{activeItem.title}</p>
                <p className="text-xs text-neutral-400">{activeItem.client}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsFullScreen(false)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black font-mono-tech text-xs text-white transition-colors cursor-pointer"
                >
                  EXIT THEATER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TECH SPECS MODAL */}
      {showSpecsModal && (
        <div
          onClick={() => setShowSpecsModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-neutral-950 border border-neutral-800 p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest block">
                  TECHNICAL EDIT SPECIFICATION
                </span>
                <h4 className="text-xl font-bold text-white mt-1">{activeItem.title}</h4>
              </div>
              <button
                onClick={() => setShowSpecsModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono-tech text-xs">
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-neutral-500 uppercase">Resolution</span>
                <p className="text-white font-bold text-sm">{activeItem.specs.resolution}</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-neutral-500 uppercase">Master Codec</span>
                <p className="text-white font-bold text-sm">{activeItem.specs.codec}</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-neutral-500 uppercase">Framerate</span>
                <p className="text-white font-bold text-sm">{activeItem.specs.fps}</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-neutral-500 uppercase">Color Space</span>
                <p className="text-white font-bold text-sm">{activeItem.specs.colorSpace}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono-tech text-neutral-400 uppercase tracking-wider block">
                Editorial Highlights
              </span>
              <div className="flex flex-wrap gap-2">
                {activeItem.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono-tech px-3 py-1.5 rounded-full bg-neutral-900 text-neutral-200 border border-neutral-800"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowSpecsModal(false)}
              className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Close Spec Sheet
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
