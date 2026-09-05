import React, { useState, useEffect } from 'react';
import { Film, ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="nav-brand-logo"
          className="flex items-center gap-3 text-white group cursor-pointer"
        >
          <span className="text-2xl font-black tracking-tighter uppercase text-white group-hover:text-white/80 transition-colors">
            KRITVIDEO
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 border border-white/20 text-white/60">
            PRO STUDIO
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-widest uppercase text-white/60">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase()}`}
              className="hover:text-white hover:opacity-100 transition-opacity duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-cta-contact-btn"
            onClick={onOpenContact}
            className="px-6 py-2.5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-all cursor-pointer shadow-sm"
          >
            Get in touch
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/60 hover:text-white bg-black border border-white/20 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-black border-b border-white/10 px-6 py-6 space-y-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-semibold tracking-widest uppercase text-white/70 hover:text-white py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 cursor-pointer"
            >
              Get in touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
