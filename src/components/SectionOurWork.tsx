import React, { useState, useEffect, useCallback } from 'react';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  CheckSquare,
  ArrowUpRight
} from 'lucide-react';
import { SHOWCASE_VIDEOS, ShowcaseVideo } from '../data/showcaseVideos';

export default function SectionOurWork() {
  // Center active video in the 3D arc (default to index 3 - Nike Basketball Commercial)
  const [activeCenterIndex, setActiveCenterIndex] = useState<number>(3);

  // Cinema theater modal state
  const [selectedVideo, setSelectedVideo] = useState<ShowcaseVideo | null>(null);

  // Mobile detection for responsive 3D card layout
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

  // Carousel navigation handlers
  const handlePrev = useCallback(() => {
    setActiveCenterIndex((prev) => (prev - 1 + SHOWCASE_VIDEOS.length) % SHOWCASE_VIDEOS.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveCenterIndex((prev) => (prev + 1) % SHOWCASE_VIDEOS.length);
  }, []);

  // Clicking any card opens it in the 4K Cinema Theater
  const handleCardClick = (video: ShowcaseVideo, idx: number) => {
    setActiveCenterIndex(idx);
    setSelectedVideo(video);
  };

  // Switch video while in theater modal
  const handleModalPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedVideo) return;
    const currentIdx = SHOWCASE_VIDEOS.findIndex((v) => v.id === selectedVideo.id);
    const prevIdx = (currentIdx - 1 + SHOWCASE_VIDEOS.length) % SHOWCASE_VIDEOS.length;
    setSelectedVideo(SHOWCASE_VIDEOS[prevIdx]);
    setActiveCenterIndex(prevIdx);
  };

  const handleModalNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedVideo) return;
    const currentIdx = SHOWCASE_VIDEOS.findIndex((v) => v.id === selectedVideo.id);
    const nextIdx = (currentIdx + 1) % SHOWCASE_VIDEOS.length;
    setSelectedVideo(SHOWCASE_VIDEOS[nextIdx]);
    setActiveCenterIndex(nextIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (selectedVideo) {
        if (e.key === 'Escape') setSelectedVideo(null);
        if (e.key === 'ArrowLeft') handleModalPrev();
        if (e.key === 'ArrowRight') handleModalNext();
        return;
      }

      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, selectedVideo]);

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

  const activeVideo = SHOWCASE_VIDEOS[activeCenterIndex] || SHOWCASE_VIDEOS[0];

  return (
    <section
      id="work"
      className="relative pt-16 pb-16 sm:pt-20 sm:pb-20 px-3 sm:px-6 md:px-10 lg:px-16 bg-black text-white overflow-hidden select-none"
    >
      {/* Dynamic ambient backdrop glow matching active video */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 35%, ${activeVideo.glowColor} 0%, rgba(0, 0, 0, 0.98) 75%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Eyebrow */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.28em] text-neutral-400 font-semibold">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: activeVideo.themeColor }}
            />
            <span className="text-white">SELECTED WORK</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{SHOWCASE_VIDEOS.length} FEATURED EDITS</span>
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
              Recent video edits across YouTube, high-retention shorts, podcasts, and brand campaigns engineered to hold attention.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400 shrink-0">
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
              <span>VIEW ALL WORK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3D CURVED PANORAMIC VIDEO AMPHITHEATER CAROUSEL                           */}
        {/* ========================================================================= */}
        <div className="relative mt-6 sm:mt-10 max-w-[1600px] mx-auto z-10 select-none">
          {/* Navigation Arrow Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous Video"
            className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/80 hover:bg-amber-500 border border-white/20 hover:border-amber-400 text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.9)] active:scale-95 group"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Video"
            className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/80 hover:bg-amber-500 border border-white/20 hover:border-amber-400 text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.9)] active:scale-95 group"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* The 3D Arc Track */}
          <div
            className="w-full flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 py-6 sm:py-8 overflow-visible touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              perspective: '1300px',
              transformStyle: 'preserve-3d',
            }}
          >
            {SHOWCASE_VIDEOS.map((video, idx) => {
              const count = SHOWCASE_VIDEOS.length;
              let rel = (idx - activeCenterIndex) % count;
              if (rel > count / 2) rel -= count;
              if (rel < -count / 2) rel += count;

              const absRel = Math.abs(rel);
              const isCenter = rel === 0;

              // Responsive filtering to avoid horizontal overflow on mobile / tablet
              if (isMobile && absRel > 1) return null;
              if (!isMobile && absRel > 2) return null;

              // Compute Y rotation: outer cards angle inward
              const rotY = rel === 0 ? 0 : rel < 0 ? (24 - (absRel - 1) * 4) : -(24 - (absRel - 1) * 4);
              const scale = isCenter ? 1.0 : absRel === 1 ? 0.98 : 1.05;
              const translateZ = isCenter ? 0 : absRel === 1 ? -10 : 20;
              const zIndex = isCenter ? 35 : absRel === 1 ? 32 : 30;

              return (
                <div
                  key={video.id}
                  onClick={() => handleCardClick(video, idx)}
                  style={{
                    transform: `perspective(1200px) rotateY(${rotY}deg) translateZ(${translateZ}px) scale(${scale})`,
                    zIndex,
                    transformOrigin: rel < 0 ? 'right center' : rel > 0 ? 'left center' : 'center center',
                  }}
                  className={`relative shrink-0 w-[180px] xs:w-[200px] sm:w-[175px] md:w-[210px] lg:w-[240px] aspect-[9/13.5] rounded-2xl sm:rounded-[24px] overflow-hidden cursor-pointer transition-all duration-700 ease-out shadow-[0_20px_60px_rgba(0,0,0,0.9)] border ${
                    isCenter
                      ? 'border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)] ring-2 ring-amber-400/40'
                      : 'border-white/15 hover:border-white/40'
                  } group`}
                >
                  {/* Video Thumbnail Background */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105 brightness-95"
                  />

                  {/* Cinematic Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 group-hover:via-black/10 transition-colors" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 sm:top-3 inset-x-2.5 sm:inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-black/75 border border-white/15 text-[8px] sm:text-[9px] font-mono-tech uppercase font-bold text-amber-400 backdrop-blur-md">
                      {video.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 text-[8px] sm:text-[9px] font-mono-tech text-white/90 backdrop-blur-md">
                      {video.duration}
                    </span>
                  </div>

                  {/* Center Radiant Play Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCenter
                          ? 'bg-amber-400 text-black shadow-[0_0_30px_rgba(245,158,11,0.85)] scale-110 group-hover:scale-125'
                          : 'bg-white/90 text-black group-hover:bg-amber-400 group-hover:text-black group-hover:scale-110 shadow-xl'
                      }`}
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                    <span className="mt-2 text-[9px] font-mono-tech font-bold uppercase tracking-wider text-white/90 bg-black/70 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity">
                      WATCH FILM ▶
                    </span>
                  </div>

                  {/* Bottom Clean Meta Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 pointer-events-none space-y-0.5">
                    <p className="text-[9px] sm:text-[10px] font-mono-tech text-amber-400 font-semibold uppercase tracking-wider truncate">
                      {video.client}
                    </p>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 leading-snug">
                      {video.title}
                    </h4>
                  </div>

                  {/* Hover Accent Glow */}
                  <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/[0.08] transition-colors pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Interactive Hint */}
          <div className="text-center pt-2 select-none">
            <span className="text-[10px] sm:text-xs font-mono-tech text-neutral-500 uppercase tracking-widest">
              ← CLICK ANY CARD TO WATCH IN 4K CINEMA THEATER • USE ARROWS TO ROTATE →
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPECIALIZATION PILL BAR (Exact Recreation from Reference Image)           */}
        {/* ========================================================================= */}
        <div className="pt-8 sm:pt-10 flex justify-center px-4 relative z-20">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-7 px-6 sm:px-8 py-3 rounded-full bg-neutral-950/85 border border-white/15 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] text-xs sm:text-sm font-mono-tech text-neutral-200">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Short Video Editing</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 hidden sm:inline-block" />
            <div className="flex items-center gap-2">
              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Content Strategy</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 hidden sm:inline-block" />
            <div className="flex items-center gap-2">
              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Growth Optimization</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4K CINEMA THEATER MODAL (Full 4K Unobstructed Viewing Experience)          */}
      {/* ========================================================================= */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/95 backdrop-blur-3xl transition-all duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Left Arrow Floating Button */}
          <button
            onClick={handleModalPrev}
            aria-label="Previous Project"
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-neutral-900/80 hover:bg-amber-500 hover:border-amber-400 border border-white/20 text-white hover:text-black flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-95 group"
            title="Previous Video (←)"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Right Arrow Floating Button */}
          <button
            onClick={handleModalNext}
            aria-label="Next Project"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-neutral-900/80 hover:bg-amber-500 hover:border-amber-400 border border-white/20 text-white hover:text-black flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-95 group"
            title="Next Video (→)"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Cinema Screen Frame */}
          <div
            className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-neutral-950 border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-white/10 bg-neutral-900/70">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono-tech text-[10px] font-bold uppercase">
                  {selectedVideo.categoryLabel}
                </span>
                <span className="font-mono-tech text-xs text-neutral-400">
                  {selectedVideo.client}
                </span>
                <span className="hidden sm:inline-block text-neutral-600">•</span>
                <span className="hidden sm:inline-block font-mono-tech text-xs text-amber-400 font-semibold">
                  {selectedVideo.badge}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline-block text-[11px] font-mono-tech text-neutral-400">
                  Press <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-white/10 rounded text-neutral-200">ESC</kbd> to close
                </span>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Responsive Video Player */}
            <div
              className={`relative w-full ${
                selectedVideo.format === '9:16'
                  ? 'aspect-[9/16] max-h-[70vh] mx-auto'
                  : 'aspect-video'
              } bg-black overflow-hidden`}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Bottom Meta Bar */}
            <div className="p-5 sm:p-7 bg-neutral-900/90 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  {selectedVideo.tagline}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {selectedVideo.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono-tech text-neutral-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono-tech uppercase flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>WATCH ON YOUTUBE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={handleModalNext}
                  className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono-tech font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
