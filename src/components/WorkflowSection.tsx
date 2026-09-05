import React from 'react';
import { WORKFLOW_STEPS } from '../data/content';
import { Check, ArrowRight } from 'lucide-react';

interface WorkflowSectionProps {
  onOpenContact: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="workflow" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="border-l border-white/20 pl-6 sm:pl-10 py-2 space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.4em] uppercase text-white/40 block font-mono">
              The 48-Hour Pipeline
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              RAW INGEST <span className="block text-white/30">TO FINAL MASTER.</span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg font-light">
              A high-precision post-production workflow designed for creators and brands requiring velocity without sacrificing cinema-grade craftsmanship.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="self-start md:self-auto px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-all flex items-center gap-3 cursor-pointer shadow-sm shrink-0"
          >
            <span>Submit Raw Footage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Pipeline Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.step}
              id={`workflow-step-${step.step}`}
              className="bg-black border border-white/10 hover:border-white/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-mono text-white">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 border border-white/15 px-2 py-0.5 uppercase tracking-wider">
                    {step.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-white/80 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                  Milestones:
                </span>
                {step.deliverables.map((deliv, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/70 text-[11px] font-mono">
                    <Check className="w-3 h-3 text-white shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
