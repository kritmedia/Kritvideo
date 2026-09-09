import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDown,
  Play, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  Volume2,
  Film,
  ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import SectionFinalCTAAndFooter from '../components/SectionFinalCTAAndFooter';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';
import SEOHead from '../components/SEOHead';

interface WorkPageProps {
  onNavigate: (path: string) => void;
}

interface ShowcaseVideo {
  id: string;
  youtubeId: string;
  title: string;
  client: string;
  category: 'shorts' | 'youtube' | 'brand' | 'podcast';
  categoryLabel: string;
  duration: string;
  views: string;
  format: '9:16' | '16:9';
  thumbnail: string;
  badge: string;
  tagline: string;
  highlights: string[];
}

const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  {
    id: 'sports-reel',
    youtubeId: 'OWRKm1ZpbDA',
    title: 'Cinematic Sports Reel',
    client: 'Jamison McDivitt',
    category: 'youtube',
    categoryLabel: 'YOUTUBE 4K',
    duration: '02:15',
    views: 'Cinematography',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/OWRKm1ZpbDA/hqdefault.jpg',
    badge: '4K DCI',
    tagline: 'High-energy pacing and kinetic visual cuts',
    highlights: ['Multi-layer sound design', 'Dynamic speed ramps', 'Commercial color grade']
  },
  {
    id: 'iphone-log',
    youtubeId: 'QUx1anKHYuI',
    title: 'iPhone 15 Pro Max Cinematic',
    client: 'Apple Log Visuals',
    category: 'shorts',
    categoryLabel: 'SHORT-FORM',
    duration: '01:05',
    views: 'Viral Retention',
    format: '9:16',
    thumbnail: 'https://i.ytimg.com/vi/QUx1anKHYuI/hqdefault.jpg',
    badge: 'APPLE LOG 4K',
    tagline: 'Viral vertical framing with punchy motion',
    highlights: ['First 3s hook design', 'Kinetic captions', 'Punchy audio SFX']
  },
  {
    id: 'soccer-commercial',
    youtubeId: 'xuas_Yc7VNQ',
    title: 'Cinematic Soccer Commercial',
    client: 'Apex Football',
    category: 'brand',
    categoryLabel: 'COMMERCIAL',
    duration: '01:45',
    views: 'Sony A7SIII',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/xuas_Yc7VNQ/hqdefault.jpg',
    badge: 'SONY A7SIII',
    tagline: 'Broadcast commercial pacing and sound design',
    highlights: ['Atmospheric foley', 'Film print emulation', 'Dynamic beat match']
  },
  {
    id: 'sneaker-product',
    youtubeId: 'IJsVs6Nw6ls',
    title: 'Nike Basketball Commercial',
    client: 'Nike Hoops Edit',
    category: 'brand',
    categoryLabel: 'BRAND & ADS',
    duration: '01:30',
    views: 'Commercial Master',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/IJsVs6Nw6ls/hqdefault.jpg',
    badge: 'COMMERCIAL',
    tagline: 'Product-focused commercial storytelling',
    highlights: ['Focal zoom framing', 'Heavy bass soundscape', 'ACES color workflow']
  },
  {
    id: 'basketball-film',
    youtubeId: 'OsP0icRA4Hc',
    title: 'FLY - Cinematic Basketball Film',
    client: 'Sony FX3 Productions',
    category: 'youtube',
    categoryLabel: 'DOCUMENTARY',
    duration: '03:40',
    views: 'Sony FX3 4K',
    format: '16:9',
    thumbnail: 'https://i.ytimg.com/vi/OsP0icRA4Hc/hqdefault.jpg',
    badge: 'SONY FX3',
    tagline: 'Emotional documentary storytelling and grading',
    highlights: ['Dialogue cleanup', 'Orchestral audio mix', 'Cinema letterbox export']
  },
  {
    id: 'podcast-master',
    youtubeId: 'xuas_Yc7VNQ',
    title: 'Silicon Conversations',
    client: 'Tech Founders Live',
    category: 'podcast',
    categoryLabel: 'PODCAST',
    duration: '45:10',
    views: 'Multi-Cam Master',
    format: '16:9',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=75',
    badge: 'MULTI-CAM',
    tagline: 'Multi-camera switching and dead-air removal',
    highlights: ['Speech audio leveling', 'Lower-third graphics', 'Shorts extract pack']
  },
  {
    id: 'viral-reel',
    youtubeId: 'QUx1anKHYuI',
    title: 'Creator Launch Campaign',
    client: 'Viral Studio Media',
    category: 'shorts',
    categoryLabel: 'REELS / TIKTOK',
    duration: '00:55',
    views: '1.8M Views',
    format: '9:16',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=75',
    badge: 'VIRAL HOOK',
    tagline: 'Engineered for 85%+ retention and algorithmic reach',
    highlights: ['Custom subtitle animations', 'Sound fx punch-ins', '9:16 optimized']
  }
];

export default function WorkPage({ onNavigate }: WorkPageProps) {
  // Theater Modal State (Opens video in full-screen cinema view)
  const [selectedVideo, setSelectedVideo] = useState<ShowcaseVideo | null>(null);

  // Category Filter for Grid Section
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Switch video while in theater modal
  const handleModalPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedVideo) return;
    const currentIdx = SHOWCASE_VIDEOS.findIndex(v => v.id === selectedVideo.id);
    const prevIdx = (currentIdx - 1 + SHOWCASE_VIDEOS.length) % SHOWCASE_VIDEOS.length;
    setSelectedVideo(SHOWCASE_VIDEOS[prevIdx]);
  };

  const handleModalNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedVideo) return;
    const currentIdx = SHOWCASE_VIDEOS.findIndex(v => v.id === selectedVideo.id);
    const nextIdx = (currentIdx + 1) % SHOWCASE_VIDEOS.length;
    setSelectedVideo(SHOWCASE_VIDEOS[nextIdx]);
  };

  // Keyboard navigation for cinema theater modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideo) {
        if (e.key === 'Escape') setSelectedVideo(null);
        if (e.key === 'ArrowLeft') handleModalPrev();
        if (e.key === 'ArrowRight') handleModalNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredGridVideos = activeCategory === 'all'
    ? SHOWCASE_VIDEOS
    : SHOWCASE_VIDEOS.filter((v) => v.category === activeCategory);

  return (
    <div className="relative bg-black text-white selection:bg-amber-400 selection:text-black select-none min-h-screen font-sans overflow-x-hidden">
      <SEOHead
        title="Our Work & Case Studies — High-Retention Video Edits | KritVideo"
        description="Explore our showcase of viral YouTube documentaries, commercial reels, podcasts, and high-converting short-form videos with verified retention analytics."
        canonical="https://kritvideo.com/work"
      />
      {/* Scroll Depth Progress Bar & Back to Top Indicator */}
      <ScrollProgressIndicator />

      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(245, 158, 11, 0.08), transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(217, 119, 6, 0.04), transparent 60%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
      </div>

      {/* 01. HEADER / NAVIGATION */}
      <Header currentPath="/work" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 02. HERO SECTION WITH 3D CURVED PANORAMIC VIDEO ARC                       */}
      {/* ========================================================================= */}
      <section 
        className="relative pt-32 sm:pt-40 pb-20 px-3 sm:px-6 md:px-8 overflow-hidden bg-gradient-to-b from-[#100b05] via-[#090704] to-black"
      >
        {/* Ambient Sunburst Glow */}
        <div 
          className="absolute top-0 inset-x-0 h-[650px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.08) 35%, rgba(0, 0, 0, 0) 70%)',
          }}
        />

        {/* Hero Copy Block */}
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-7 sm:space-y-8">
          
          {/* Centered Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>// OUR WORK</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-[-0.04em] leading-[0.96] text-white">
            Short-form & long-form video editing that{' '}
            <span className="font-editorial-serif italic font-normal text-amber-300 block sm:inline">
              actually gets results.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
            We turn raw footage into high-retention YouTube videos, podcasts, and viral shorts engineered to hold attention.
          </p>

          {/* Centered Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => scrollToSection('work-gallery')}
              className="px-7 py-4 rounded-full bg-neutral-900/80 border border-white/15 hover:border-white text-neutral-300 hover:text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 shadow-lg"
            >
              <span>SEE OUR WORK</span>
              <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 04. CINEMA THEATER MODAL (Full 4K Unobstructed Viewing Experience)        */}
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
                <span className="text-white font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
                  {selectedVideo.title}
                </span>
                <span className="text-neutral-500 text-xs font-mono-tech hidden md:inline">
                  • {selectedVideo.client}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-mono-tech flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden sm:inline">YouTube ↗</span>
                </a>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player Frame (Native Aspect Ratio Widescreen Cinema) */}
            <div className="relative w-full aspect-video bg-black shadow-inner">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Telemetry Footer */}
            <div className="p-4 sm:p-6 bg-neutral-950 border-t border-white/10 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <p className="text-amber-400 font-mono-tech uppercase font-bold text-[11px]">
                    Client: {selectedVideo.client}
                  </p>
                  <p className="text-neutral-300 text-sm font-medium mt-0.5">
                    {selectedVideo.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono-tech text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>{selectedVideo.badge}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>STUDIO AUDIO MASTER</span>
                  </div>
                </div>
              </div>

              {/* Quick Project Switcher & Highlight Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedVideo.highlights.map((hl, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 text-[10px] font-mono-tech flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      <span>{hl}</span>
                    </span>
                  ))}
                </div>

                {/* In-Modal Navigation Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleModalPrev}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/15 text-xs font-mono-tech flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>PREV</span>
                  </button>
                  <button
                    onClick={handleModalNext}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/15 text-xs font-mono-tech flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 05. DETAILED WORK GALLERY & FILTERABLE REELS                              */}
      {/* ========================================================================= */}
      <section 
        id="work-gallery"
        className="relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-gradient-to-b from-[#070504] via-black to-[#0a0704] border-t border-white/[0.08] overflow-hidden"
      >
        {/* Subtle Ambient Radial Lighting & Dot Grid */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(245, 158, 11, 0.05), transparent 70%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-amber-400 font-bold tracking-widest uppercase">
                <span>// PORTFOLIO DIRECTORY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Curated by format. <span className="font-editorial-serif italic font-normal text-amber-300">Engineered to retain.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-400">
                Browse our full roster of long-form YouTube cuts, commercials, dynamic podcasts, and viral short-form deliverables.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'ALL WORK' },
                { id: 'youtube', label: 'YOUTUBE' },
                { id: 'shorts', label: 'SHORTS & REELS' },
                { id: 'brand', label: 'COMMERCIALS' },
                { id: 'podcast', label: 'PODCASTS' },
              ].map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                        : 'bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGridVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-amber-400/40 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                {/* Thumbnail Screen */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />

                  {/* Badge & Duration */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono-tech font-bold uppercase">
                      {video.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono-tech">
                      {video.duration}
                    </span>
                  </div>

                  {/* Play Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.8)] scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-amber-400">
                      <span>{video.client}</span>
                      <span className="text-neutral-500">{video.badge}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {video.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono-tech text-neutral-400">
                    <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                      WATCH VIDEO ▶
                    </span>
                    <span>{video.views}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. PRODUCTION STANDARDS STRIP                                             */}
      {/* ========================================================================= */}
      <section className="relative py-16 px-4 sm:px-8 border-y border-white/[0.08] bg-black/90 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245, 158, 11, 0.05), transparent 70%)'
          }}
        />

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center relative z-10">
          <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-950/60 border border-white/[0.06] backdrop-blur-md hover:border-amber-400/30 transition-all">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 font-mono-tech">100M+</div>
            <div className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400">Views Generated</div>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-950/60 border border-white/[0.06] backdrop-blur-md hover:border-amber-400/30 transition-all">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono-tech">4K DCI</div>
            <div className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400">Cinematic Color Grade</div>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-950/60 border border-white/[0.06] backdrop-blur-md hover:border-amber-400/30 transition-all">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 font-mono-tech">100%</div>
            <div className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400">Studio Audio & Sound FX</div>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-950/60 border border-white/[0.06] backdrop-blur-md hover:border-amber-400/30 transition-all">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono-tech">24-48H</div>
            <div className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400">First Cut Delivery</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. FINAL CTA & UNIFIED FOOTER (Exact Parity)                             */}
      {/* ========================================================================= */}
      <div id="contact">
        <SectionFinalCTAAndFooter onNavigate={onNavigate} />
      </div>

    </div>
  );
}
