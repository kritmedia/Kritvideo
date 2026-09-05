import React from 'react';
import { Film, ArrowUpRight, Github, Twitter, Youtube, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="bg-black border-t border-white/10 py-20 px-6 sm:px-8 lg:px-12 text-white/50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-black">
                <Film className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-white">
                KRIT<span className="text-white/40">VIDEO</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/40 max-w-md font-light leading-relaxed">
              Transforming raw rushes into cinema-grade, high-retention video masters. Story pacing, ACEScg color science, acoustic mastering, and precision motion for modern visionaries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-all flex items-center gap-3 cursor-pointer shadow-sm"
            >
              <span>Initiate Production</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Links and Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono">
          <div>
            © {new Date().getFullYear()} KRITVIDEO POST-PRODUCTION STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 uppercase tracking-wider font-bold text-[11px]">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
