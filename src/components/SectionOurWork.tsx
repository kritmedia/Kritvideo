import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  youtubeId: string;
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
    id: 'tech-explainer',
    youtubeId: 'OWRKm1ZpbDA',
    category: 'youtube',
    categoryLabel: 'YOUTUBE',
    title: 'The 10-Minute Tech Explainer',
    client: 'YouTube',
    tagline: 'High watch-time storytelling with punchy visual cues',
    duration: '02:15',
    durationSeconds: 135,
    views: 'YouTube • High Watch Time',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/OWRKm1ZpbDA/hqdefault.jpg',
    themeColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.40)',
    highlights: ['Pacing & Hook Design', 'Dead-Air Removal', 'Clean Visual Flow'],
    specs: {
      resolution: '4K DCI (3840x2160)',
      codec: 'ProRes 422 HQ',
      fps: '60 FPS',
      colorSpace: 'Rec.709',
    },
  },
  {
    id: 'product-ad',
    youtubeId: 'IJsVs6Nw6ls',
    category: 'brand',
    categoryLabel: 'ADS',
    title: 'Product Launch Ad',
    client: 'Meta & TikTok Ads',
    tagline: 'High-conversion paid video designed to hook in 3 seconds',
    duration: '01:30',
    durationSeconds: 90,
    views: 'Meta & TikTok Ads',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/IJsVs6Nw6ls/hqdefault.jpg',
    themeColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.40)',
    highlights: ['3-Second Hook', 'Dynamic Sound SFX', 'Clear Call-to-Action'],
    specs: {
      resolution: '4K DCI (4096x2160)',
      codec: 'ProRes 4444',
      fps: '24 FPS',
      colorSpace: 'ACEScg',
    },
  },
  {
    id: 'studio-podcast',
    youtubeId: 'xuas_Yc7VNQ',
    category: 'creator',
    categoryLabel: 'PODCAST',
    title: 'Two-Host Studio Podcast',
    client: 'Multi-Cam & Clean Audio',
    tagline: 'Smooth multi-angle cuts with studio dialogue mastering',
    duration: '01:45',
    durationSeconds: 105,
    views: 'Multi-Cam & Clean Audio',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/xuas_Yc7VNQ/hqdefault.jpg',
    themeColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.40)',
    highlights: ['Multi-Cam Switching', 'Voice De-Noise', 'Social Snippet Selection'],
    specs: {
      resolution: '4K UHD (3840x2160)',
      codec: 'ProRes 422',
      fps: '30 FPS',
      colorSpace: 'Rec.709',
    },
  },
  {
    id: 'viral-hooks',
    youtubeId: 'QUx1anKHYuI',
    category: 'shorts',
    categoryLabel: 'REELS / TIKTOK',
    title: 'Viral Hook Series',
    client: 'Instagram Reels',
    tagline: 'Snappy vertical cuts built to stop the thumb scroll',
    duration: '01:05',
    durationSeconds: 65,
    views: 'Instagram Reels',
    format: '9:16',
    thumbnail: 'https://i.ytimg.com/vi/QUx1anKHYuI/hqdefault.jpg',
    themeColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.40)',
    highlights: ['Thumb-Stop Hook', 'Kinetic Captions', 'Punchy Sound Effects'],
    specs: {
      resolution: '1080x1920 (Vertical)',
      codec: 'H.264 / ProRes',
      fps: '60 FPS',
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

  // Playback timer simulation for transport dock
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

  // Fullscreen trigger
  const toggleFullScreen = () => {
    setIsFullScreen((prev) => {
      const next = !prev;
      if (next) setIsPlaying(true);
      return next;
    });
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
        if (isFullScreen) {
          setIsFullScreen(false);
        } else if (isPlaying) {
          setIsPlaying(false);
        }
        if (showSpecsModal) setShowSpecsModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullScreen, isPlaying, showSpecsModal]);

  // Lock body scroll when theater mode or specs modal is open
  useEffect(() => {
    if (isFullScreen || showSpecsModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFullScreen, showSpecsModal]);

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
            <span className="text-white">SELECTED EDITS</span>
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
              Proof we{' '}
              <span className="font-editorial-serif italic font-normal text-amber-300 block sm:inline">
                know our craft.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-2xl">
              Hit play. Judge with your eyes, not technical spec sheets.
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
              className="px-5 py-2.5 rounded-full bg-neutral-900 border border-white/15 hover:border-white text-white transition-all font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <span>VIEW MORE WORK ↗</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3D APPLE COVER FLOW CAROUSEL                                              */}
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

              const isHorizontal = item.format === '16:9';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isCenter) {
                      if (!isPlaying) {
                        setIsPlaying(true);
                      }
                    } else {
                      setCurrentIndex(index);
                      setCurrentTime(0);
                    }
                  }}
                  onMouseEnter={() => isCenter && setIsHoveringCard(true)}
                  onMouseLeave={() => isCenter && setIsHoveringCard(false)}
                  style={{
                    transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transition: 'all 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  className={`absolute ${
                    isHorizontal
                      ? 'w-[270px] xs:w-[290px] sm:w-[410px] md:w-[460px] aspect-[4/4.8]'
                      : 'w-[250px] xs:w-[270px] sm:w-[370px] md:w-[410px] aspect-[4/5]'
                  } rounded-[32px] overflow-hidden cursor-pointer shadow-[0_30px_70px_rgba(0,0,0,0.9)] border ${
                    isCenter
                      ? 'border-white/30 ring-1 ring-white/20 shadow-[0_0_60px_rgba(0,0,0,0.95)]'
                      : 'border-white/10 filter brightness-75 hover:brightness-95'
                  }`}
                >
                  {/* Media Content: Real YouTube Player when playing, Artwork Thumbnail when idle */}
                  {isCenter && isPlaying ? (
                    <div className="w-full h-full relative bg-black">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title={item.title}
                        className="w-full h-full border-0 rounded-[32px]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
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
                  )}

                  {/* Top Artwork Gradient & Format Badges (Visible when not playing) */}
                  {(!isCenter || !isPlaying) && (
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
                          className="pointer-events-auto w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110 cursor-pointer"
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
                  )}

                  {/* Quick Floating Actions When Video is Playing Inline */}
                  {isCenter && isPlaying && (
                    <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2 pointer-events-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFullScreen();
                        }}
                        aria-label="Expand to Fullscreen Theater"
                        className="w-8 h-8 rounded-full bg-black/80 hover:bg-white hover:text-black text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                        title="Fullscreen Theater (F)"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(false);
                        }}
                        aria-label="Stop playback"
                        className="w-8 h-8 rounded-full bg-black/80 hover:bg-white hover:text-black text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                        title="Stop playback (ESC)"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Central Play Liquid Button on Active Card */}
                  {isCenter && !isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(true);
                        }}
                        aria-label="Play video"
                        className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 hover:bg-white hover:text-black text-white backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
                        title="Play Video"
                      >
                        <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1 transition-transform group-hover:scale-110" />
                      </button>
                    </div>
                  )}

                  {/* Frosted Glass Bottom Banner (Hidden during inline playback to give 100% unobstructed view) */}
                  <div className={`absolute bottom-0 inset-x-0 p-5 sm:p-7 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-md border-t border-white/10 flex flex-col justify-end transition-opacity duration-300 ${
                    isCenter && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}>
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
                          className="text-[11px] font-mono-tech text-neutral-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
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
        {/* FROSTED GLASS FLOATING MEDIA CONTROLS BAR                                 */}
        {/* ========================================================================= */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative rounded-full bg-neutral-900/70 backdrop-blur-2xl border border-white/15 px-5 sm:px-8 py-3.5 sm:py-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4">
            {/* Left Deck: Prev / Play / Next */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous reel"
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-90"
                title="Previous Video (Left Arrow)"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? 'Pause playback' : 'Play video'}
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
                className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors cursor-pointer"
                title="View Technical Specs"
              >
                <Sliders className="w-4 h-4" />
              </button>

              <button
                onClick={toggleFullScreen}
                aria-label="Toggle Fullscreen Theater"
                className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors cursor-pointer text-amber-400"
                title="Full Screen Cinema (F)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMuted((prev) => !prev)}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
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
            “Warning: May cause an irresistible urge to film more content.”
          </p>

          <div className="flex items-center justify-center gap-6 pt-2">
            <a
              href="#contact"
              className="px-9 py-4 bg-white text-black font-bold text-xs sm:text-sm rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2.5 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* IMMERSIVE FULL SCREEN THEATER MODAL (Triggered by Fullscreen button or 'F' key) */}
      {/* ========================================================================= */}
      {isFullScreen && createPortal(
        <div
          ref={theaterContainerRef}
          onClick={() => setIsFullScreen(false)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-5 md:p-6 animate-fadeIn select-none overflow-y-auto"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${activeItem.glowColor} 0%, rgba(0,0,0,0.98) 75%)`,
          }}
        >
          {/* Floating Left Side Navigation Chevron (md+) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Video"
            className="hidden md:flex fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-neutral-900/80 hover:bg-white hover:text-black border border-white/20 text-white items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-95 group"
            title="Previous Video (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Floating Right Side Navigation Chevron (md+) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Video"
            className="hidden md:flex fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-neutral-900/80 hover:bg-white hover:text-black border border-white/20 text-white items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-95 group"
            title="Next Video (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Centered Unified Cinema Stage (Video + Controls Grouped Tightly with Zero Excessive Void) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${
              activeItem.format === '16:9' ? 'max-w-5xl' : 'max-w-md sm:max-w-lg'
            } flex flex-col items-center justify-center my-auto`}
          >
            {/* Top Fullscreen Header Bar */}
            <div className="w-full flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/15 px-4 sm:px-6 py-2.5 rounded-full mb-3 shadow-lg">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: activeItem.themeColor }}
                />
                <span className="font-mono-tech text-xs text-white uppercase tracking-wider font-bold">
                  KRIT CINEMA THEATER • {activeItem.format}
                </span>
                <span className="hidden sm:inline font-mono-tech text-[10px] text-neutral-400 px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                  {activeItem.categoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-[11px] text-neutral-400 hidden sm:inline-block">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-white font-mono text-[10px]">ESC</kbd> to exit
                </span>
                <button
                  onClick={() => setIsFullScreen(false)}
                  aria-label="Exit Fullscreen"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Exit Theater (ESC)"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Cinema Stage with YouTube Player */}
            <div
              className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)] border border-white/20 bg-black flex items-center justify-center ${
                activeItem.format === '16:9'
                  ? 'aspect-video max-h-[58vh] sm:max-h-[64vh]'
                  : 'aspect-[9/16] h-[58vh] sm:h-[64vh] max-h-[64vh] mx-auto'
              }`}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeItem.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeItem.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Bottom Fullscreen Transport Dock (Directly Hugging the Video Player with Minimal 12px-14px Gap) */}
            <div className="relative z-20 w-full bg-neutral-950/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl space-y-2.5 mt-3 sm:mt-3.5">
              {/* Scrubber */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-mono-tech text-[11px] sm:text-xs text-neutral-400 shrink-0">
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

                <span className="font-mono-tech text-[11px] sm:text-xs text-neutral-400 shrink-0">
                  {activeItem.duration}
                </span>
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous video"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </button>

                  <button
                    onClick={() => setIsPlaying((prev) => !prev)}
                    aria-label={isPlaying ? 'Pause playback' : 'Play video'}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-black" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next video"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </button>
                </div>

                {/* Title & Client */}
                <div className="text-center min-w-0 px-2 flex-1 hidden sm:block">
                  <p className="text-sm font-bold text-white truncate">{activeItem.title}</p>
                  <p className="text-xs text-neutral-400 truncate">{activeItem.client}</p>
                </div>

                {/* Right Deck Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    onClick={() => setIsMuted((prev) => !prev)}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${activeItem.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono-tech transition-colors"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => setIsFullScreen(false)}
                    className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white hover:text-black font-mono-tech text-xs text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    EXIT THEATER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* TECH SPECS MODAL (Mounted via Portal) */}
      {showSpecsModal && createPortal(
        <div
          onClick={() => setShowSpecsModal(false)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-6 animate-fadeIn"
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
        </div>,
        document.body
      )}
    </section>
  );
}
