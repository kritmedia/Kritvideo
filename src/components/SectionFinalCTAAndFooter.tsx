import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

interface SectionFinalCTAAndFooterProps {
  onNavigate?: (path: string) => void;
  hideCta?: boolean;
}

export default function SectionFinalCTAAndFooter({ onNavigate, hideCta = false }: SectionFinalCTAAndFooterProps = {}) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div className="relative bg-black text-white selection:bg-white selection:text-black select-none">
      {/* SECTION 6 — FINAL CTA (Minimalistic, Premium Obsidian Glass Stage) */}
      {!hideCta && (
        <section id="contact" className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-black overflow-hidden">
          
          {/* Soft Ambient Radial Underglow behind card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-[160px] pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            
            {/* MINIMALISTIC LUXURY STAGE CARD */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative rounded-[36px] sm:rounded-[44px] bg-neutral-950/80 border border-white/[0.10] backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.12)] p-8 sm:p-14 md:p-16 lg:p-20 overflow-hidden text-center"
            >
              {/* Ambient Top Subtle Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[220px] bg-amber-500/[0.05] blur-[80px] pointer-events-none" />

              {/* Interactive Cursor Spotlight */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-0"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.08), transparent 65%)`,
                }}
              />

              {/* CONTENT CONTAINER */}
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                
                {/* Minimalist Eyebrow */}
                <div className="inline-flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
                  <span className="text-white">READY WHEN YOU ARE</span>
                </div>

                {/* Bold, Arresting Editorial Headline */}
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.035em] text-white leading-[1.08]">
                  Got footage?{' '}
                  <span className="font-editorial-serif italic font-normal text-amber-300 block sm:inline">
                    Let's make something out of it.
                  </span>
                </h2>

                {/* Confident Subtitle */}
                <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed font-normal">
                  Tell us what you're working on, what you need edited and where you want the finished video to go. We'll take a look and tell you what happens next.
                </p>

                {/* Minimalist Action Dock */}
                <div className="max-w-lg mx-auto pt-2 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => onNavigate ? onNavigate('/contact') : (window.location.href = '/contact')}
                      data-cursor="START"
                      className="w-full sm:w-auto px-9 py-4 bg-white hover:bg-neutral-200 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 shrink-0"
                    >
                      <span>LET'S GET STARTED</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Clean Trust Line */}
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono-tech text-neutral-400 pt-1">
                    <span className="text-neutral-300">
                      CLEAR PROCESS • REAL EDITORS • FINISHED VIDEOS
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* 2026 ULTRA-MODERN EDITORIAL FOOTER */}
      <footer className="relative pt-12 pb-14 sm:pt-16 sm:pb-16 px-6 sm:px-12 md:px-16 lg:px-20 bg-black overflow-hidden select-none">
        {/* Soft Ambient Underglow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-orange-500/10 via-amber-500/5 to-transparent blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* TOP TELEMETRY BAR (Live Studio Status & Global Time) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-16 border-b border-neutral-850/80 items-center justify-between">
            {/* Studio Availability Status */}
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-300 font-bold">
                STUDIO STATUS: <span className="text-emerald-400">ACCEPTING PROJECTS</span>
              </span>
            </div>

            {/* Global Studio Clock Feeds */}
            <div className="md:col-span-8 flex flex-wrap items-center justify-start md:justify-end gap-6 sm:gap-10 text-xs font-mono-tech text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">LA</span>
                <span className="text-white font-bold">10:42 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">LON</span>
                <span className="text-white font-bold">06:42 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">DEL</span>
                <span className="text-white font-bold">11:12 PM</span>
              </div>

              {/* Direct Scroll to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-cursor="TOP"
                className="px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-white text-xs font-mono-tech text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95 ml-auto md:ml-0"
              >
                BACK TO TOP ↗
              </button>
            </div>
          </div>

          {/* MAIN BRAND COHORTS & DIRECTORY */}
          <div className="pt-16 pb-16 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Manifesto & Value Proposition */}
            <div className="md:col-span-5 space-y-6">
              <div 
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('/');
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="cursor-pointer inline-block"
              >
                <Logo size="md" />
              </div>

              <p className="text-base sm:text-lg font-editorial-serif italic text-neutral-300 leading-relaxed max-w-sm">
                “You make the content. We'll make sure the edit does it justice.”
              </p>

              <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
                KritVideo is a video editing and post-production studio helping creators and brands turn raw footage into finished videos for YouTube, social media, campaigns and everything in between.
              </p>

              {/* Direct Contact & Location */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs font-mono-tech text-neutral-300">
                  <span>hello@kritvideo.com</span>
                  <button
                    onClick={() => navigator.clipboard.writeText('hello@kritvideo.com')}
                    className="px-2.5 py-0.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-[10px] text-white transition-colors cursor-pointer"
                  >
                    COPY
                  </button>
                </div>
                <span className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-wider">
                  INDIA • WORKING GLOBALLY
                </span>
              </div>
            </div>

            {/* Column 2: Capabilities Directory */}
            <div className="md:col-span-2 space-y-4">
              <span className="text-[11px] font-mono-tech uppercase tracking-widest text-neutral-400 font-bold block">
                POST-PRODUCTION
              </span>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/services') : (window.location.href = '/services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    YouTube Longform
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/services') : (window.location.href = '/services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Viral Shorts & Reels
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/services') : (window.location.href = '/services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Brand Commercials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/services') : (window.location.href = '/services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Podcast Multi-Cam
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/services') : (window.location.href = '/services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Color & Sound Finishing
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform & Studio Philosophy */}
            <div className="md:col-span-2 space-y-4">
              <span className="text-[11px] font-mono-tech uppercase tracking-widest text-neutral-400 font-bold block">
                NAVIGATION
              </span>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/work') : (window.location.href = '/work')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    WORK
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/services') : (window.location.href = '/services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    SERVICES
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/about') : (window.location.href = '/about')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    ABOUT
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('/#why-us');
                      } else {
                        const el = document.getElementById('why-us');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    WHY US
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('/#faq');
                      } else {
                        const el = document.getElementById('faq');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate ? onNavigate('/contact') : (window.location.href = '/contact')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    CONTACT
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Studio Connect & Direct Feeds */}
            <div className="md:col-span-3 space-y-4">
              <span className="text-[11px] font-mono-tech uppercase tracking-widest text-neutral-400 font-bold block">
                CONNECT & COMMUNITY
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono-tech">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-all"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-all"
                >
                  YOUTUBE
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-all"
                >
                  X / TWITTER
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-all"
                >
                  LINKEDIN
                </a>
              </div>

              {/* Codecs & Master Security Badge */}
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-850/80 text-[10px] font-mono-tech text-neutral-400 space-y-1">
                  <div className="text-neutral-300 font-bold uppercase">METADATA</div>
                  <div className="text-neutral-500">VIDEO EDITING / POST-PRODUCTION / STORY / SOUND / COLOUR / MOTION</div>
                </div>
              </div>
            </div>
          </div>

          {/* SUB-FOOTER: Copyright, Legals & Audio Signal */}
          <div className="pt-8 border-t border-neutral-850/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-neutral-400">
            <div className="flex items-center gap-2">
              <span>© 2026 KRITVIDEO. ALL RIGHTS RESERVED.</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">PRIVACY PROTOCOL</a>
              <span className="text-neutral-700">/</span>
              <a href="#terms" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
              <span className="text-neutral-700">/</span>
              <a href="#sla" className="hover:text-white transition-colors">48H SLA</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
