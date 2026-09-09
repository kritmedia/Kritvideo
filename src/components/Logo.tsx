import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const iconDimensions = {
    sm: 'w-10 h-10 sm:w-11 sm:h-11',
    md: 'w-11 h-11 sm:w-13 sm:h-13',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
  }[size];

  const textClass = {
    sm: 'text-base sm:text-lg tracking-tight',
    md: 'text-lg sm:text-xl md:text-[1.35rem] tracking-tight',
    lg: 'text-2xl sm:text-3xl tracking-tight',
  }[size];

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 group cursor-pointer select-none ${className}`}>
      {/* Official KritVideo App Emblem */}
      <div className={`relative ${iconDimensions} rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.7)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all duration-300 shrink-0 border border-white/20`}>
        <img
          src="/kritvideo-logo.webp"
          alt="KritVideo Logo"
          width="80"
          height="80"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Typography: KritVideo */}
      {showText && (
        <span className={`font-sans ${textClass} font-extrabold text-white flex items-center leading-none tracking-tight`}>
          <span>Krit</span>
          <span className="text-neutral-300 font-semibold group-hover:text-white transition-colors">Video</span>
        </span>
      )}
    </div>
  );
}
