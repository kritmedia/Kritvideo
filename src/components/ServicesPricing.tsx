import React from 'react';
import { PRICING_PLANS } from '../data/content';
import { Check, ArrowRight, Zap } from 'lucide-react';

interface ServicesPricingProps {
  onSelectPlan: (planId: string) => void;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="border-l border-white/20 pl-6 sm:pl-10 py-2 space-y-3 max-w-3xl">
          <span className="text-xs font-semibold tracking-[0.4em] uppercase text-white/40 block font-mono">
            Transparent Retainers
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
            HIGH-IMPACT <span className="block text-white/30">ENGAGEMENT MODELS.</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg font-light">
            Fixed-rate post-production with dedicated video editors, master colorists, and rapid turnarounds.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.badge === 'MOST POPULAR';

            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`bg-black border p-7 sm:p-9 flex flex-col justify-between space-y-8 relative transition-all duration-300 ${
                  isPopular
                    ? 'border-white ring-1 ring-white/30 shadow-2xl'
                    : 'border-white/10 hover:border-white/40'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-8 px-3.5 py-1 bg-white text-black text-[10px] font-black tracking-widest uppercase font-mono shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed min-h-[40px] font-light">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="pt-2 pb-4 border-b border-white/10 flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-white/40 font-mono uppercase tracking-wider">{plan.period}</span>
                  </div>

                  {/* Quick specs */}
                  <div className="space-y-2 text-xs text-white/60 font-mono">
                    <div className="flex justify-between">
                      <span className="text-white/40">Turnaround:</span>
                      <span className="text-white font-bold">{plan.turnaround}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Target:</span>
                      <span className="text-white font-bold truncate max-w-[180px]">
                        {plan.idealFor}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pt-4 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block font-semibold">
                      What's Included:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-mono">
                        <Check className="w-3.5 h-3.5 text-white mt-0.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  id={`select-plan-${plan.id}-btn`}
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-4 font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer ${
                    isPopular
                      ? 'bg-white text-black hover:bg-white/90 shadow-md'
                      : 'bg-black text-white border border-white/20 hover:border-white hover:bg-white/5'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
