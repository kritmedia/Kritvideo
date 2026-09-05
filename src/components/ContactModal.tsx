import React, { useState } from 'react';
import { X, Film, CheckCircle2, ArrowRight, UploadCloud, Clock, Sparkles } from 'lucide-react';
import { ProjectQuoteState } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuote?: { quote: ProjectQuoteState; cost: number } | null;
  selectedPlanId?: string | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialQuote,
  selectedPlanId,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: initialQuote?.quote.projectType || (selectedPlanId ? selectedPlanId : 'youtube'),
    footageLink: '',
    estimatedLength: initialQuote?.quote.footageLengthMinutes ? `${initialQuote.quote.footageLengthMinutes} mins` : '30-45 mins',
    notes: '',
    turnaround: initialQuote?.quote.turnaroundSpeed === 'hyper_24h' ? '24 Hours' : '48 Hours',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div
        id="contact-modal-dialog"
        className="bg-black border border-white/20 w-full max-w-xl p-6 sm:p-10 relative shadow-2xl my-8 text-white"
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2.5 bg-black border border-white/20 text-white/50 hover:text-white hover:border-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-black border border-white flex items-center justify-center mx-auto text-white">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                INTAKE RECEIVED.
              </h3>
              <p className="text-white/50 text-sm max-w-md mx-auto font-light">
                Our post-production lead will evaluate your footage specifications and send your private Frame.io workspace credentials within 60 minutes.
              </p>
            </div>

            <div className="p-5 bg-black border border-white/20 text-left font-mono text-xs space-y-2 max-w-md mx-auto text-white/80">
              <div className="flex justify-between">
                <span className="text-white/40">CREATOR:</span>
                <span>{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">FORMAT:</span>
                <span className="uppercase text-white font-bold">{formData.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">TURNAROUND:</span>
                <span className="text-white font-bold">{formData.turnaround}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-colors cursor-pointer"
            >
              Return to Site
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 border-l border-white/30 pl-4 py-1">
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/40 block">
                Production Onboarding
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                SUBMIT RAW FOOTAGE.
              </h3>
              <p className="text-xs text-white/50 font-light">
                Provide project directives and secure repository link for rush ingest.
              </p>
            </div>

            {/* If initial quote exists */}
            {initialQuote && (
              <div className="p-4 bg-black border border-white/20 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40 uppercase">Selected Estimate:</span>
                <span className="text-white font-bold text-sm">
                  ${initialQuote.cost} USD ({initialQuote.quote.footageLengthMinutes}m raw)
                </span>
              </div>
            )}

            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Your Name / Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-3 bg-black border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@creator.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-3 bg-black border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Project Category</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-3 bg-black border border-white/15 text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="youtube">YouTube Long-Form / Talking Head</option>
                    <option value="commercial">Commercial / Brand Film</option>
                    <option value="social_reels">Vertical Reels / TikToks</option>
                    <option value="documentary">Mini-Documentary / Video Essay</option>
                    <option value="monthly-retainer">Monthly Studio Retainer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Target Turnaround</label>
                  <select
                    value={formData.turnaround}
                    onChange={(e) => setFormData({ ...formData, turnaround: e.target.value })}
                    className="w-full px-3.5 py-3 bg-black border border-white/15 text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="48 Hours">Standard 48 Hours</option>
                    <option value="24 Hours">Priority Express 24 Hours</option>
                    <option value="Flexible">Flexible / Multi-week Project</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider flex items-center justify-between">
                  <span>Raw Footage Link (Google Drive, Dropbox, Frame.io)</span>
                  <span className="text-white/30 lowercase">optional</span>
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/..."
                  value={formData.footageLink}
                  onChange={(e) => setFormData({ ...formData, footageLink: e.target.value })}
                  className="w-full px-3.5 py-3 bg-black border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider">
                  Creative Direction & Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your vision, references, or specific pacing hooks you want us to incorporate..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-3 bg-black border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black hover:bg-white/90 font-bold uppercase text-xs tracking-widest transition-all duration-200 shadow-md flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Scheduling Ingest Pipeline...</span>
              ) : (
                <>
                  <span>Submit Project For Ingest</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
