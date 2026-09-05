import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  currentPath: string; // '/', '/services', '/work', '/about', '/contact'
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const handleLogoClick = () => {
    if (currentPath === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('/');
    }
  };

  const navItems = [
    { label: 'SERVICES', path: '/services' },
    { label: 'WORK', path: '/work' },
    { label: 'ABOUT', path: '/about' },
    { label: 'BLOG', path: '/blog' },
  ];

  return (
    <header 
      ref={headerRef}
      className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4 select-none"
    >
      <div className="relative pointer-events-auto w-[96%] sm:w-[90%] md:w-[84%] lg:w-[72%] max-w-5xl">
        {/* Main Glass Navigation Dock */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 bg-neutral-950/70 backdrop-blur-2xl border border-white/15 hover:border-white/25 rounded-full px-4 sm:px-7 py-2 sm:py-2.5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300">
          
          {/* Brand Logo */}
          <div 
            onClick={handleLogoClick}
            data-cursor="HOME"
            className="flex items-center gap-2.5 cursor-pointer pl-1 pr-2 py-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
          >
            <Logo size="md" />
          </div>

          {/* Center Navigation Pill (Visible on md+ screens) */}
          <div className="hidden md:flex bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-6 lg:px-9 py-2 sm:py-2.5 items-center gap-7 lg:gap-11 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
            {navItems.map((item) => {
              const isActive = currentPath.startsWith(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.path)}
                  data-cursor={item.label}
                  className={`text-[11px] sm:text-xs font-mono-tech tracking-[0.14em] uppercase transition-all duration-150 cursor-pointer relative py-1 px-1.5 ${
                    isActive 
                      ? 'text-white font-bold' 
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls: CTA Button & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={() => onNavigate('/contact')}
              data-cursor="CONTACT"
              className="px-4 sm:px-6 py-2 bg-white text-black font-bold text-[11px] sm:text-xs rounded-full hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] active:scale-95 flex items-center gap-1.5 cursor-pointer tracking-wide"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Hamburger Menu Toggle Button (Visible only on < md screens) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

        </div>

        {/* Responsive Mobile Drawer / Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full mt-2.5 inset-x-0 bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-50 flex flex-col gap-1.5 overflow-hidden"
            >
              {navItems.map((item) => {
                const isActive = currentPath.startsWith(item.path);
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate(item.path);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-colors text-left group ${
                      isActive ? 'bg-amber-500/10 border border-amber-500/20' : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-xs sm:text-sm font-mono-tech tracking-wider uppercase font-bold ${
                        isActive ? 'text-amber-400' : 'text-white group-hover:text-amber-300'
                      }`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-neutral-400">
                        {item.label === 'SERVICES' && 'Video editing, retention & post-production'}
                        {item.label === 'WORK' && 'Featured showcase & portfolio'}
                        {item.label === 'ABOUT' && 'Our story, craft & mission'}
                        {item.label === 'BLOG' && 'Retention guides & editing playbooks'}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isActive ? 'text-amber-400' : 'text-neutral-500 group-hover:text-white'
                    }`} />
                  </button>
                );
              })}

              <div className="pt-2.5 border-t border-white/10 mt-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('/contact');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs font-mono-tech uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
                >
                  <span>LET'S TALK / START PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
