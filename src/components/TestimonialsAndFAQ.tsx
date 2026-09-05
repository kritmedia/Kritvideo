import React, { useState } from 'react';
import { TESTIMONIALS, FAQS } from '../data/content';
import { Plus, Minus, Quote, Star, MessageSquare } from 'lucide-react';

interface TestimonialsAndFAQProps {
  onOpenContact: () => void;
}

export const TestimonialsAndFAQ: React.FC<TestimonialsAndFAQProps> = ({ onOpenContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Testimonials Block */}
        <div className="space-y-16">
          <div className="border-l border-white/20 pl-6 sm:pl-10 py-2 space-y-3 max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.4em] uppercase text-white/40 block font-mono">
              Creator Endorsements
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              VERIFIED RETENTION <span className="block text-white/30">& AUDIENCE IMPACT.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                id={`testimonial-card-${idx}`}
                className="bg-black border border-white/10 hover:border-white/30 p-7 sm:p-8 flex flex-col justify-between space-y-6 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-white bg-black px-2 py-0.5 border border-white/20 uppercase">
                      {t.stats}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed italic font-light">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className="w-9 h-9 bg-black border border-white/30 flex items-center justify-center font-black text-white text-xs font-mono">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider text-white">{t.author}</div>
                    <div className="text-[11px] font-mono text-white/40">
                      {t.role} • {t.channelOrBrand}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Block */}
        <div id="faq" className="space-y-12 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="border-l border-white/20 pl-6 sm:pl-10 py-2 space-y-3 max-w-xl">
              <span className="text-xs font-semibold tracking-[0.4em] uppercase text-white/40 block font-mono">
                Knowledge Base
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95]">
                FREQUENTLY ASKED <span className="block text-white/30">QUESTIONS.</span>
              </h2>
            </div>
            <button
              onClick={onOpenContact}
              className="self-start md:self-auto text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-2 cursor-pointer underline font-mono"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Speak With Our Post Team
            </button>
          </div>

          <div className="space-y-4 max-w-4xl">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  id={`faq-item-${idx}`}
                  className="bg-black border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                      {faq.question}
                    </span>
                    <div className="w-7 h-7 bg-black border border-white/20 flex items-center justify-center text-white shrink-0 font-mono">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-sm text-white/60 leading-relaxed font-light border-t border-white/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
