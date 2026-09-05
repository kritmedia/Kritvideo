import React, { useState } from 'react';
import { ProjectQuoteState } from '../types';
import { Calculator, Clock, Film, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ProjectEstimatorProps {
  onSelectEstimate: (quote: ProjectQuoteState, cost: number) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onSelectEstimate }) => {
  const [quoteState, setQuoteState] = useState<ProjectQuoteState>({
    projectType: 'youtube',
    footageLengthMinutes: 35,
    rawFormat: 'log_4k',
    turnaroundSpeed: 'standard',
    soundDesignIncluded: true,
    colorGradingIncluded: true,
    motionGraphicsIncluded: true,
    thumbnailIncluded: true,
  });

  // Calculate pricing logic
  const calculateCostAndTimeline = () => {
    let base = 250;
    if (quoteState.projectType === 'commercial') base = 950;
    if (quoteState.projectType === 'documentary') base = 750;
    if (quoteState.projectType === 'social_reels') base = 180;
    if (quoteState.projectType === 'youtube') base = 420;

    // Footage length scaling
    const footageCost = Math.max(0, quoteState.footageLengthMinutes - 15) * 4;

    // Raw format
    let formatCost = 0;
    if (quoteState.rawFormat === 'prores_raw') formatCost = 120;
    if (quoteState.rawFormat === 'log_4k') formatCost = 60;

    // Addons
    let addons = 0;
    if (quoteState.soundDesignIncluded) addons += 80;
    if (quoteState.colorGradingIncluded) addons += 90;
    if (quoteState.motionGraphicsIncluded) addons += 110;
    if (quoteState.thumbnailIncluded) addons += 45;

    // Turnaround speed multiplier
    let multiplier = 1.0;
    let turnaroundHours = 48;
    if (quoteState.turnaroundSpeed === 'express_48h') {
      multiplier = 1.25;
      turnaroundHours = 36;
    } else if (quoteState.turnaroundSpeed === 'hyper_24h') {
      multiplier = 1.6;
      turnaroundHours = 24;
    } else {
      turnaroundHours = 48;
    }

    const totalCost = Math.round((base + footageCost + formatCost + addons) * multiplier);

    return { totalCost, turnaroundHours };
  };

  const { totalCost, turnaroundHours } = calculateCostAndTimeline();

  return (
    <section id="estimator" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="border-l border-white/20 pl-6 sm:pl-10 py-2 space-y-4 max-w-3xl">
          <span className="text-xs font-semibold tracking-[0.4em] uppercase text-white/40 block font-mono">
            Interactive Configuration
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
            CALCULATE TURNAROUND <span className="block text-white/30">& INVESTMENT.</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg font-light leading-relaxed">
            Configure your raw footage parameters to calculate turnaround times, deliverable specs, and fixed transparent pricing.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-black border border-white/10 p-6 sm:p-10 space-y-10">
            {/* 1. Project Type */}
            <div className="space-y-4">
              <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 font-semibold">
                01. Select Video Format
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'youtube', label: 'YouTube Long-Form' },
                  { id: 'commercial', label: 'Brand Commercial' },
                  { id: 'social_reels', label: 'Shorts & Reels' },
                  { id: 'documentary', label: 'Mini-Doc / Essay' },
                ].map((type) => (
                  <button
                    key={type.id}
                    id={`estimator-type-${type.id}`}
                    type="button"
                    onClick={() =>
                      setQuoteState({ ...quoteState, projectType: type.id as any })
                    }
                    className={`p-3 text-xs font-bold uppercase tracking-wider border transition-all text-center cursor-pointer ${
                      quoteState.projectType === type.id
                        ? 'bg-white text-black border-white'
                        : 'bg-black border-white/15 text-white/60 hover:text-white hover:border-white/40'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Raw Footage Duration Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <label className="uppercase tracking-[0.25em] text-[10px] text-white/40 font-semibold">
                  02. Raw Footage Volume (Uncut)
                </label>
                <span className="text-white font-mono font-bold text-sm">
                  {quoteState.footageLengthMinutes} MIN RUSHES
                </span>
              </div>
              <input
                id="estimator-footage-slider"
                type="range"
                min="5"
                max="120"
                step="5"
                value={quoteState.footageLengthMinutes}
                onChange={(e) =>
                  setQuoteState({
                    ...quoteState,
                    footageLengthMinutes: parseInt(e.target.value, 10),
                  })
                }
                className="w-full h-1.5 bg-white/20 rounded-none appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>05 mins (Quick Cut)</span>
                <span>45 mins (Interview/Vlog)</span>
                <span>120 mins (Doc / Multi-Cam)</span>
              </div>
            </div>

            {/* 3. Camera Profile & Footage Spec */}
            <div className="space-y-4">
              <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 font-semibold">
                03. Camera Color Profile
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'log_4k', label: '10-Bit 4K LOG', sub: 'Sony S-Log / Canon C-Log' },
                  { id: 'prores_raw', label: 'ProRes / RAW', sub: 'Arri / RED / BM RAW' },
                  { id: 'standard_hd', label: 'Standard Rec.709', sub: 'Mirrorless 8-Bit' },
                  { id: 'smartphone', label: 'iPhone ProRes 4K', sub: 'Action / Mobile' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() =>
                      setQuoteState({ ...quoteState, rawFormat: fmt.id as any })
                    }
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      quoteState.rawFormat === fmt.id
                        ? 'bg-white text-black border-white'
                        : 'bg-black border-white/15 text-white/60 hover:text-white hover:border-white/40'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider">{fmt.label}</div>
                    <div className={`text-[10px] font-mono mt-1 ${quoteState.rawFormat === fmt.id ? 'text-black/70' : 'text-white/40'}`}>{fmt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Turnaround Speed */}
            <div className="space-y-4">
              <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 font-semibold">
                04. Turnaround Priority
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', title: 'Standard (48h)', sub: 'Normal Queue' },
                  { id: 'express_48h', title: 'Express (36h)', sub: 'Priority Queue' },
                  { id: 'hyper_24h', title: 'Hyper (24h)', sub: 'Dedicated Fastlane' },
                ].map((speed) => (
                  <button
                    key={speed.id}
                    type="button"
                    onClick={() =>
                      setQuoteState({ ...quoteState, turnaroundSpeed: speed.id as any })
                    }
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      quoteState.turnaroundSpeed === speed.id
                        ? 'bg-white text-black border-white'
                        : 'bg-black border-white/15 text-white/60 hover:text-white hover:border-white/40'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider">{speed.title}</div>
                    <div className={`text-[10px] font-mono mt-1 ${quoteState.turnaroundSpeed === speed.id ? 'text-black/70' : 'text-white/40'}`}>{speed.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Production Add-ons */}
            <div className="space-y-4 pt-2">
              <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 font-semibold">
                05. Production Polish Layers
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'soundDesignIncluded',
                    title: 'Sound Design & Foley',
                    desc: '-14 LUFS vocal mastering & risers',
                  },
                  {
                    key: 'colorGradingIncluded',
                    title: 'ACES Color Grading',
                    desc: 'Film print emulation & tone curve',
                  },
                  {
                    key: 'motionGraphicsIncluded',
                    title: 'Kinetic Motion Graphics',
                    desc: 'Lower thirds, HUDs & data charts',
                  },
                  {
                    key: 'thumbnailIncluded',
                    title: 'High-CTR Custom Thumbnail',
                    desc: 'Photoshop PSD + 3 A/B test variations',
                  },
                ].map((addon) => {
                  const active = (quoteState as any)[addon.key];
                  return (
                    <div
                      key={addon.key}
                      onClick={() =>
                        setQuoteState({
                          ...quoteState,
                          [addon.key]: !active,
                        })
                      }
                      className={`p-3.5 border flex items-start gap-3 cursor-pointer transition-all ${
                        active
                          ? 'bg-black border-white text-white'
                          : 'bg-black border-white/15 text-white/40 hover:border-white/30'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 mt-0.5 flex items-center justify-center border ${
                          active
                            ? 'bg-white border-white text-black'
                            : 'border-white/30 bg-transparent'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="text-xs space-y-0.5">
                        <div className="font-bold uppercase tracking-wider text-white">{addon.title}</div>
                        <div className="text-[10px] text-white/50 font-light">{addon.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Summary Card */}
          <div className="lg:col-span-5 sticky top-28 bg-black border border-white/20 p-6 sm:p-10 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                Estimate Summary
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-mono font-bold uppercase">{turnaroundHours}H Delivery</span>
              </div>
            </div>

            {/* Big Price Display */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                Calculated Rate
              </div>
              <div className="flex items-baseline gap-3">
                <span
                  id="estimator-total-price"
                  className="text-6xl sm:text-7xl font-black text-white font-mono tracking-tighter"
                >
                  ${totalCost}
                </span>
                <span className="text-white/50 text-xs uppercase font-mono tracking-widest">USD / Master Cut</span>
              </div>
              <div className="text-xs text-white/40 font-light pt-1">
                Includes all raw cut project files, 2 revision passes & 4K ProRes master export.
              </div>
            </div>

            {/* Scope Checklist */}
            <div className="space-y-3 pt-6 border-t border-white/10 text-xs text-white/70 font-mono">
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-white shrink-0" />
                <span>
                  Input: <strong className="text-white">{quoteState.footageLengthMinutes}m</strong> Raw Rushes
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-white shrink-0" />
                <span>
                  Target Length:{' '}
                  <strong className="text-white">
                    {quoteState.projectType === 'social_reels' ? '30-60s Short' : '8-15 min Master'}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-white shrink-0" />
                <span>
                  Turnaround: <strong className="text-white">{turnaroundHours} Hours Guaranteed</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Frame.io Timestamped Review Link</span>
              </div>
            </div>

            {/* Book Button */}
            <button
              id="estimator-book-quote-btn"
              onClick={() => onSelectEstimate(quoteState, totalCost)}
              className="w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md"
            >
              <span>Lock Estimate & Send Rushes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
