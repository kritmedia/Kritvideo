import React, { useState } from 'react';
import { RAW_VS_MASTER_POINTS } from '../data/content';
import { AlertCircle, CheckCircle2, Sliders, Film, Volume2, Sparkles, Layers } from 'lucide-react';

export const TimelineComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { title: 'Color & Contrast', icon: Sliders },
    { title: 'Story Pacing', icon: Film },
    { title: 'Audio & Foley', icon: Volume2 },
    { title: 'Motion & Polish', icon: Sparkles },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="border-l border-white/20 pl-6 sm:pl-10 py-2 space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.4em] uppercase text-white/40 block font-mono">
              The Post-Production Shift
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              RAW RUSHES <span className="block text-white/30">VS. REFINED MASTER.</span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg font-light">
              Observe the precision engineering your footage undergoes before reaching your audience.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const active = activeTab === idx;
              return (
                <button
                  key={tab.title}
                  id={`comparison-tab-${idx}`}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    active
                      ? 'bg-white text-black border-white'
                      : 'bg-black border-white/15 text-white/50 hover:text-white hover:border-white/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-black' : 'text-white/50'}`} />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Board on Pure Black */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left: Raw Ingest State */}
          <div className="bg-black border border-white/10 p-6 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 text-white/40" />
                  Initial Raw Footage State
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-white/15 text-white/40 uppercase">
                  STAGE 01 / INPUT
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white/60">
                  {RAW_VS_MASTER_POINTS[activeTab].category}
                </h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-mono bg-black p-4 border border-white/10">
                  "{RAW_VS_MASTER_POINTS[activeTab].raw}"
                </p>
              </div>

              {/* Technical Diagnostics */}
              <div className="space-y-2.5 pt-2 text-xs text-white/40 font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span>Pacing Consistency:</span>
                  <span className="text-white/60">Irregular (Dead Air Gaps)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span>Audio LUFS Range:</span>
                  <span className="text-white/60">-28 to -8 dBFS Uncontrolled</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Luminance Curve:</span>
                  <span className="text-white/60">Uncalibrated Flat Log</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-black border border-white/10 text-xs text-white/40 flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 bg-white/40" />
              <span>Requires narrative assembly, sync & dynamic grading</span>
            </div>
          </div>

          {/* Right: Master Delivery State */}
          <div className="bg-black border border-white p-6 sm:p-10 flex flex-col justify-between space-y-8 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <span className="flex items-center gap-2 text-[10px] font-mono text-white uppercase tracking-widest font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  KritVideo Master Delivery
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-black font-bold uppercase tracking-wider">
                  PRORES 4K MASTER
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  {RAW_VS_MASTER_POINTS[activeTab].category} — Enhanced
                </h3>
                <p className="text-xs sm:text-sm text-white leading-relaxed font-mono bg-black p-4 border border-white/30">
                  "{RAW_VS_MASTER_POINTS[activeTab].master}"
                </p>
              </div>

              {/* Master Diagnostics */}
              <div className="space-y-2.5 pt-2 text-xs text-white/80 font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span>Retention Structure:</span>
                  <span className="text-white font-bold">Hook & Flow Locked</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span>Audio Mastering:</span>
                  <span className="text-white font-bold">-14.0 LUFS Broadcast Standard</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Color Gamut:</span>
                  <span className="text-white font-bold">ACEScg & Kodak 2383 LUT</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-black border border-white text-xs text-white flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>Ready for instant publishing with 100% monetization safety</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
