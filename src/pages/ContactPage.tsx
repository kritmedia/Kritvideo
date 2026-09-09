import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Mail, 
  MessageSquare, 
  Copy, 
  Check, 
  ChevronDown, 
  Clock, 
  Film,
  Compass,
  Calendar
} from 'lucide-react';
import Header from '../components/Header';
import SectionFinalCTAAndFooter from '../components/SectionFinalCTAAndFooter';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';
import SEOHead from '../components/SEOHead';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

const EMAIL_ADDRESS = 'hello@kritvideo.com';
const WHATSAPP_LINK = 'https://wa.me/917002983079?text=Hi%20KritVideo%2C%20I%20have%20a%20video%20project%20I%27d%20like%20to%20discuss.';
const EMAIL_MAILTO = 'mailto:hello@kritvideo.com?subject=Project%20Enquiry%20-%20KritVideo&body=Hi%20KritVideo%20team%2C%0A%0AI%20have%20a%20video%20project%20I%27d%20like%20to%20discuss.%0A%0AWhat%20I%27m%20making%3A%20%0AFootage%20details%3A%20%0AExpected%20duration%3A%20%0ATarget%20deadline%3A%20';

const FAQ_ITEMS = [
  {
    question: "How do we send you large raw footage files?",
    answer: "Share via Google Drive, Dropbox, WeTransfer, or Frame.io. For high-volume archives, we provide dedicated cloud bucket access."
  },
  {
    question: "What is your typical turnaround time?",
    answer: "Short-form reels and shorts are delivered within 24 to 48 hours. Long-form YouTube edits and podcasts are typically ready in 3 to 5 business days."
  },
  {
    question: "How do revisions and feedback work?",
    answer: "Review drafts via interactive Frame.io links with timecoded notes. We refine pacing and transitions promptly to match your vision."
  },
  {
    question: "Do you work with international clients across time zones?",
    answer: "Yes. We work asynchronously with creators and brands worldwide (US, UK, Europe, Australia, and Asia) with seamless communication."
  },
  {
    question: "Can I get in touch before I have all my footage ready?",
    answer: "Yes. Reaching out early helps align on shot formats, aspect ratios, and reference pacing before you roll camera."
  }
];

const WHAT_TO_SEND_ITEMS = [
  {
    number: "01",
    title: "PROJECT FORMAT",
    description: "YouTube video, 9:16 Shorts/Reels, podcast, or commercial ad.",
    icon: Film
  },
  {
    number: "02",
    title: "FOOTAGE & DURATION",
    description: "Rough volume of raw clips and intended final runtime.",
    icon: Clock
  },
  {
    number: "03",
    title: "STYLE REFERENCES",
    description: "1 or 2 reference links whose pacing or editing style you like.",
    icon: Compass
  },
  {
    number: "04",
    title: "TARGET DEADLINE",
    description: "Your ideal delivery date or regular publishing cadence.",
    icon: Calendar
  }
];

const STEPS = [
  {
    step: "01",
    title: "YOU MESSAGE US",
    desc: "Tell us what you're making and what you need."
  },
  {
    step: "02",
    title: "WE TAKE A LOOK",
    desc: "We'll understand the project, ask anything we need to clarify and work out what makes sense."
  },
  {
    step: "03",
    title: "YOU GET A QUOTE",
    desc: "We'll share the pricing and expected timeline based on your actual project."
  },
  {
    step: "04",
    title: "WE GET TO WORK",
    desc: "Once everything looks good, send over the footage and we'll take it from there."
  }
];

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="relative bg-black text-white selection:bg-amber-400 selection:text-black min-h-screen overflow-x-hidden font-sans">
      <SEOHead
        title="Book a Project & Get a Video Quote — 48h Turnaround | KritVideo"
        description="Start your next video project with KritVideo. Direct WhatsApp chat (+91 7002983079), instant quote estimation, or email hello@kritvideo.com. Fast 48-hour first cut guarantee."
        canonical="https://kritvideo.com/contact"
      />
      {/* Scroll Depth Progress Bar & Back to Top Indicator */}
      <ScrollProgressIndicator />

      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(245, 158, 11, 0.08), transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(217, 119, 6, 0.04), transparent 60%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
      </div>

      {/* 01. HEADER / NAVIGATION */}
      <Header currentPath="/contact" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 01. HERO SECTION: "TELL US WHAT YOU'RE MAKING."                           */}
      {/* ========================================================================= */}
      <section 
        className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-[#100b05] via-[#090704] to-black"
      >
        {/* Ambient Sunburst Glow */}
        <div 
          className="absolute top-0 inset-x-0 h-[650px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.08) 35%, rgba(0, 0, 0, 0) 70%)',
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 pt-4 text-center space-y-7 sm:space-y-8">
          
          {/* Centered Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>// GET IN TOUCH</span>
          </div>

          {/* Centered Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-[-0.04em] leading-[0.96] text-white">
            Tell us what you're{' '}
            <span className="font-editorial-serif italic font-normal text-amber-300">
              making.
            </span>
          </h1>

          {/* Centered Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Got a video in mind? Have a folder full of footage? Or just wondering what it might cost to get it edited?
            <br className="hidden sm:inline" />
            {' '}Drop us a message. Tell us what you're working on and we'll figure out the rest.
          </p>

          {/* Centered Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={EMAIL_MAILTO}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
            >
              <span>EMAIL US</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full bg-neutral-900/80 border border-white/15 hover:border-white text-neutral-300 hover:text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 shadow-lg"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WHATSAPP FOR A QUOTE ↗</span>
            </a>
          </div>

          {/* Process Pipeline / Trust Indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-mono-tech text-neutral-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-amber-400" /> 24H RESPONSE TIME</span>
            <span className="text-amber-500/60">•</span>
            <span>NO COMMITMENT REQUIRED</span>
            <span className="text-amber-500/60">•</span>
            <span className="text-amber-400 font-bold">DIRECT CREATIVE TEAM ACCESS</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. TWO WAYS TO REACH US (Studio Desk Aesthetic)                          */}
      {/* ========================================================================= */}
      <section id="contact-options" className="relative py-16 sm:py-24 px-5 sm:px-8 max-w-6xl mx-auto z-10 border-t border-white/[0.08]">
        
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold">
            <span>● DIRECT CHANNELS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Whatever's easiest for you.
          </h2>
          <p className="text-xs sm:text-sm font-mono-tech text-neutral-400">
            Direct communication with our editing leads. No rigid forms, no gatekeepers.
          </p>
        </div>

        {/* The Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* 01 / EMAIL CARD */}
          <div className="relative group rounded-3xl sm:rounded-[32px] bg-neutral-950/90 border border-white/10 hover:border-white/25 p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tech uppercase tracking-[0.2em] text-neutral-400 font-bold px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
                  01 / EMAIL
                </span>
                <Mail className="w-5 h-5 text-neutral-400 group-hover:text-amber-300 transition-colors" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Prefer email?
                </h3>
                <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Send us the details of your project and we'll get back to you.
                </p>
                <p className="mt-2 text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  You can include your video requirements, footage details, references, expected duration, deadline, or simply tell us what you're trying to make.
                </p>
              </div>

              {/* Direct email display with copy button */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-500 block">
                    DIRECT INBOX
                  </span>
                  <a 
                    href={EMAIL_MAILTO}
                    className="text-amber-400 font-mono-tech font-bold text-sm sm:text-base hover:underline truncate block"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/20 border border-white/10 text-xs font-mono-tech uppercase tracking-wider text-neutral-200 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <a
                href={EMAIL_MAILTO}
                className="w-full py-4 px-6 bg-white hover:bg-neutral-200 text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>WRITE TO US ↗</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <p className="text-center text-xs font-mono-tech text-neutral-400">
                Don't worry about writing the perfect brief. Just tell us what you know.
              </p>
            </div>

          </div>

          {/* 02 / WHATSAPP CARD */}
          <div className="relative group rounded-3xl sm:rounded-[32px] bg-neutral-950/90 border border-white/10 hover:border-white/25 p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tech uppercase tracking-[0.2em] text-neutral-400 font-bold px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
                  02 / WHATSAPP
                </span>
                <MessageSquare className="w-5 h-5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Want a quicker chat?
                </h3>
                <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Message us directly on WhatsApp if you'd rather discuss your project, ask a few questions or get a quote.
                </p>
                <p className="mt-2 text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Send us a quick description of what you're making and we'll take it from there.
                </p>
              </div>

              {/* Status preview banner */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-emerald-400 font-semibold block">
                    ONLINE & READY
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-300 font-mono-tech truncate block">
                    Fast response time during studio hours
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>WHATSAPP US FOR A QUOTE ↗</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <p className="text-center text-xs font-mono-tech text-neutral-400">
                Questions are welcome. “How much would this cost?” is a perfectly good first message.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 03. WHAT TO SEND US                                                       */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto z-10 border-t border-white/[0.08] overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(245, 158, 11, 0.05), transparent 70%)'
          }}
        />
        
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold">
            <span>● BEFORE YOU REACH OUT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Helpful details to include.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed pt-1 font-normal">
            No fancy brief required. If you know any of these 4 things, send them over:
          </p>
        </div>

        {/* 4 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
          {WHAT_TO_SEND_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.number}
                className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-neutral-950/90 border border-white/[0.08] hover:border-amber-400/40 transition-all group flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech text-amber-400 font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                      {item.number}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-amber-300 transition-colors" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassuring Context Note (Without redundant CTA button) */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-neutral-950/90 border border-white/[0.08] text-center max-w-2xl mx-auto relative z-10">
          <p className="text-xs sm:text-sm font-mono-tech text-neutral-400">
            Don't have all of these details figured out yet? That's completely fine. Just share what you know and we'll help scope the rest.
          </p>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 04. WHAT HAPPENS AFTER YOU CONTACT US                                     */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto z-10 border-t border-white/[0.08] overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245, 158, 11, 0.04), transparent 70%)'
          }}
        />

        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14 sm:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold">
            <span>● TRANSPARENT PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            No disappearing into the void.
          </h2>
        </div>

        {/* 4 Steps Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-neutral-950/90 border border-white/[0.08] hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-xl group"
            >
              <div className="space-y-3">
                <span className="inline-block text-xs font-mono-tech px-2.5 py-1 rounded bg-amber-400/10 text-amber-400 font-bold border border-amber-400/20">
                  {step.step}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 05. FAQ / PRACTICAL CLIENT CLARITY                                        */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 max-w-4xl mx-auto z-10 border-t border-white/[0.08]">
        
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold">
            <span>● FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            A few things you might be wondering.
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaq === index;
            const itemNumber = (index + 1).toString().padStart(2, '0');
            return (
              <div
                key={index}
                className={`rounded-[24px] transition-all duration-300 border overflow-hidden relative ${
                  isOpen
                    ? 'bg-neutral-950/95 border-amber-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/20'
                    : 'bg-neutral-950/50 hover:bg-neutral-950/80 border-white/[0.08] hover:border-white/20'
                }`}
              >
                {isOpen && (
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none" />
                )}

                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-4 sm:gap-5 flex-1">
                    <span className={`text-xs font-mono-tech font-bold shrink-0 pt-0.5 transition-colors ${
                      isOpen ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'text-neutral-500'
                    }`}>
                      &#123; {itemNumber} &#125;
                    </span>
                    <span className={`text-sm sm:text-base md:text-[1.05rem] font-bold tracking-tight leading-snug transition-colors ${
                      isOpen ? 'text-white' : 'text-neutral-200 hover:text-white'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? 'bg-amber-400 border-amber-400 text-black rotate-180 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 06. STUDIO CLOSING REASSURANCE (Streamlined & Clean)                      */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 max-w-4xl mx-auto z-10 border-t border-white/[0.08] text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold">
            <span>● DIRECT CREATIVE PARTNERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            Let's make something remarkable.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed font-normal">
            Whether you need a dedicated post-production partner or a single high-impact project polished to perfection, our team is ready to deliver.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono-tech text-neutral-400 uppercase tracking-widest">
            <span className="text-amber-300 font-semibold">NO RIGID FORMS</span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-300 font-semibold">NO SALES CALL MARATHONS</span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-300 font-semibold">DIRECT CREATIVE ACCESS</span>
          </div>
        </div>
      </section>

      {/* Reusable Editorial Footer (with CTA hidden since ContactPage has its own dedicated 07 Final CTA) */}
      <SectionFinalCTAAndFooter onNavigate={onNavigate} hideCta={true} />

    </div>
  );
}
