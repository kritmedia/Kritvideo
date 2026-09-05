import React, { useEffect } from 'react';
import { ArrowUpRight, Home, Film, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import SectionFinalCTAAndFooter from '../components/SectionFinalCTAAndFooter';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col justify-between overflow-x-hidden">
      {/* Header */}
      <Header currentPath="/404" onNavigate={onNavigate} />

      {/* Main 404 Hero Container with Ambient Glow */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 pt-36 pb-20 text-center">
        {/* Ambient Amber Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-400/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Status Pill / Cinematic Timecode */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-amber-500/30 text-[11px] font-mono-tech tracking-[0.25em] text-amber-400 uppercase shadow-lg shadow-amber-500/10 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>TIMECODE 00:04:04:00 • CLIP NOT FOUND</span>
        </div>

        {/* Massive 404 Display */}
        <div className="relative mb-6 select-none">
          <h1 className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-700 drop-shadow-2xl">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <span className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-black text-amber-400/20 blur-2xl">
              404
            </span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="max-w-xl mx-auto space-y-4 mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
            This scene was cut in post-production.
          </h2>
          <p className="text-sm sm:text-base font-mono-tech text-neutral-400 leading-relaxed uppercase tracking-wider">
            The frame you are looking for has been trimmed from our timeline or moved to another reel.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onNavigate('/')}
            className="group px-7 py-3.5 bg-amber-400 text-black font-extrabold text-xs sm:text-sm font-mono-tech uppercase tracking-wider rounded-full hover:bg-amber-300 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(251,191,36,0.35)] hover:shadow-[0_0_45px_rgba(251,191,36,0.55)] active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>BACK TO HOME</span>
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('/work')}
            className="px-6 py-3.5 rounded-full bg-neutral-900/80 border border-white/15 hover:border-amber-400/50 text-neutral-300 hover:text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2.5 backdrop-blur-md cursor-pointer"
          >
            <Film className="w-4 h-4 text-amber-400" />
            <span>SEE OUR WORK</span>
          </button>

          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3.5 rounded-full bg-neutral-900/80 border border-white/15 hover:border-amber-400/50 text-neutral-300 hover:text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2.5 backdrop-blur-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-amber-400" />
            <span>TALK TO US</span>
          </button>
        </div>

        {/* Quick Route Directory */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/70 border border-white/10 backdrop-blur-xl max-w-lg w-full">
          <div className="text-[11px] font-mono-tech text-neutral-400 uppercase tracking-widest mb-3">
            Quick Timeline Jump
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono-tech text-neutral-300">
            <button
              onClick={() => onNavigate('/')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              /home
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              /services
            </button>
            <button
              onClick={() => onNavigate('/work')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              /work
            </button>
            <button
              onClick={() => onNavigate('/about')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              /about
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              /contact
            </button>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp Action */}
      <FloatingWhatsAppButton />

      {/* Footer */}
      <SectionFinalCTAAndFooter onNavigate={onNavigate} hideCta={true} />
    </div>
  );
};

export default NotFoundPage;
