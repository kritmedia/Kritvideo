import React from 'react';
import { TRUSTED_BRANDS } from '../data/content';
import { CircleDot, Layers, Box, Globe, Shield, Sparkles } from 'lucide-react';

export const TrustedBrands: React.FC = () => {
  const getBrandIcon = (type: string) => {
    switch (type) {
      case 'circle':
        return <CircleDot className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'hourglass':
        return <Box className="w-5 h-5 text-neutral-400 group-hover:text-[#ff5500] transition-colors" />;
      case 'split':
        return <Layers className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'layers':
      default:
        return <Sparkles className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
    }
  };

  return (
    <section id="trusted-brands-bar" className="py-10 px-6 sm:px-8 lg:px-12 border-y border-white/10 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Label on the left */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-semibold tracking-[0.3em] text-white/40 mb-1">
            Trusted By Top Creators
          </span>
          <span className="text-sm font-bold uppercase tracking-wider text-white">
            Industry Standard Studios
          </span>
        </div>

        {/* Brand list */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-12 w-full md:w-auto">
          {TRUSTED_BRANDS.map((brand) => (
            <div
              key={brand.name}
              id={`brand-badge-${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-2.5 text-white/60 font-bold uppercase text-xs tracking-widest group cursor-default hover:text-white transition-colors"
            >
              {getBrandIcon(brand.iconType)}
              <span className="group-hover:text-white transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
