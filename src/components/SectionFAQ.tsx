import React, { useState, useRef, useCallback } from 'react';
import { 
  ChevronDown, 
  Sparkles, 
  ArrowUpRight, 
  HelpCircle,
  Clock,
  UserCheck,
  HardDrive,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'workflow' | 'editors' | 'ingestion' | 'pricing';
  question: string;
  answer: string;
  highlight: string;
  timeEstimate?: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Questions', count: 8, icon: HelpCircle, color: 'from-amber-500/20 via-orange-500/10' },
  { id: 'workflow', label: 'Turnaround & Delivery', count: 2, icon: Clock, color: 'from-amber-400/25 via-orange-500/15' },
  { id: 'editors', label: 'Lead Editors & Craft', count: 2, icon: UserCheck, color: 'from-amber-500/20 via-yellow-500/15' },
  { id: 'ingestion', label: 'Raw Files & Ingestion', count: 2, icon: HardDrive, color: 'from-emerald-500/20 via-amber-500/10' },
  { id: 'pricing', label: 'Pricing & Revisions', count: 2, icon: Sparkles, color: 'from-orange-500/25 via-amber-500/15' },
];

const FAQ_DATA: FAQItem[] = [
  {
    id: 'service-include',
    category: 'workflow',
    question: 'WHAT DOES A VIDEO EDITING SERVICE INCLUDE?',
    answer:
      'KritVideo can handle the main stages of post-production, including footage selection, cutting, pacing, B-roll, captions, graphics, audio editing, colour correction and final exports. What we include depends on the type of video you\'re making.',
    highlight: 'Full Post-Production',
    timeEstimate: 'Customized to Format',
  },
  {
    id: 'youtube-editing',
    category: 'editors',
    question: 'DO YOU EDIT YOUTUBE VIDEOS?',
    answer:
      'Yes. We edit YouTube videos including talking-head content, interviews, documentaries, educational videos, podcasts and other long-form creator content.',
    highlight: 'Long-Form & Retention',
    timeEstimate: '16:9 4K Masters',
  },
  {
    id: 'turn-into-shorts',
    category: 'workflow',
    question: 'CAN YOU TURN LONG VIDEOS INTO SHORTS?',
    answer:
      'Yes. We can find useful moments in your existing footage and turn them into short-form videos for Instagram Reels, YouTube Shorts and TikTok.',
    highlight: 'Vertical Viral Cutdowns',
    timeEstimate: '9:16 Social Edits',
  },
  {
    id: 'send-footage',
    category: 'ingestion',
    question: 'HOW DO I SEND MY FOOTAGE?',
    answer:
      'Once your project is confirmed, we\'ll give you the upload details. You can send raw footage, audio, graphics, references and any other files needed for the project.',
    highlight: 'Private High-Speed Upload',
    timeEstimate: 'Drive / Dropbox / Frame',
  },
  {
    id: 'turnaround-time',
    category: 'workflow',
    question: 'HOW FAST DO YOU DELIVER THE FIRST CUT?',
    answer:
      'From the moment your raw footage finishes uploading, our editors start immediately. Your first cut is delivered within 48 hours—pacing-engineered and sound-designed.',
    highlight: 'Guaranteed 48H Delivery',
    timeEstimate: 'Avg Delivery: 38 Hours',
  },
  {
    id: 'dedicated-talent',
    category: 'editors',
    question: 'DO I WORK WITH A DEDICATED EDITOR?',
    answer:
      'Yes. You work with dedicated lead editors who learn your pacing, style, and channel preferences so every video feels consistent. No random freelancers or AI templates.',
    highlight: 'Dedicated Lead Editors',
    timeEstimate: 'Direct Communication',
  },
  {
    id: 'revisions-process',
    category: 'pricing',
    question: 'WHAT IS YOUR REVISION PROCESS?',
    answer:
      'Revisions are included until you are completely satisfied with the final video. Leave timestamped notes on the review link and we make the adjustments quickly.',
    highlight: 'Revisions Included',
    timeEstimate: 'Fast Turnarounds',
  },
  {
    id: 'contracts-terms',
    category: 'pricing',
    question: 'ARE THERE LONG-TERM CONTRACTS?',
    answer:
      'No long-term lock-in. We offer flexible project-based and retainer workflows so you can scale up, pause, or stop anytime.',
    highlight: 'Flexible Workflows',
    timeEstimate: 'Cancel / Pause Anytime',
  },
];

export default function SectionFAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string>('service-include');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const filteredFAQs = activeCategory === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const activeCategoryObj = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  return (
    <section
      id="faq"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-black text-white select-none overflow-hidden"
    >
      {/* 1. ARCHITECTURAL FILM RIBBON / MESH WAVE IN BACKGROUND (Matching reference aesthetic) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <svg
          className="absolute w-full h-[600px] top-0 left-0 text-white/[0.03]"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C 300 450, 700 50, 1100 320 C 1300 450, 1500 250, 1600 280"
            stroke="currentColor"
            strokeWidth="80"
            strokeLinecap="round"
            className="blur-3xl"
          />
          <path
            d="M-50 180 C 350 430, 750 30, 1150 300 C 1350 430, 1550 230, 1650 260"
            stroke="url(#ambientAmberLine)"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
          <defs>
            <linearGradient id="ambientAmberLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#ea580c" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. DYNAMIC MOUSE-TRACKING SPOTLIGHT CONE */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.07), transparent 60%)`,
        }}
      />

      {/* 3. SUBTLE TECH DOT MATRIX GRID TEXTURE */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:28px_28px]" 
      />

      {/* 4. DYNAMIC AMBIENT AURORA GLOW TIED TO SELECTED CATEGORY */}
      <div 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-gradient-to-r ${activeCategoryObj.color} to-transparent blur-[160px] pointer-events-none transition-all duration-1000 z-0`} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER: Luxury Headline with Editorial Serif & Studio Counter */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-18">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400 font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
            <span className="text-white">QUESTIONS, ANSWERED</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] leading-tight text-white">
            A few things you might{' '}
            <span className="font-editorial-serif italic font-normal text-amber-300">
              want to know.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl mx-auto font-normal">
            Everything you need to know about our video editing services, process, raw files, and deliverables.
          </p>

          {/* CTA Link */}
          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-mono-tech text-amber-400 hover:text-amber-300 font-bold tracking-wider transition-colors"
            >
              <span>SEE ALL FAQs →</span>
            </a>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT: Left Sidebar Category Card + Right Accordion List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* LEFT COLUMN: Interactive "FAQ Category" Card with Viewfinder Reticles */}
          <div className="lg:col-span-4 space-y-4 relative">
            <div className="relative p-6 sm:p-7 rounded-[32px] bg-neutral-950/85 border border-white/15 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden group">
              
              {/* Corner Viewfinder Crop Marks for Camera Monitor aesthetic */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-500/50 pointer-events-none" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-500/50 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-500/50 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-500/50 pointer-events-none" />

              {/* Category Header with Live Filter Indicator */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    FAQ Category
                  </h3>
                </div>
                <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold">
                  {filteredFAQs.length} ITEMS
                </span>
              </div>

              {/* Category Options List with Smooth Interactive States */}
              <div className="space-y-2 pt-4">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-mono-tech tracking-wide transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-300 border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] font-bold translate-x-1'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/10'
                      }`}
                    >
                      {/* Active Left Vertical Accent Line */}
                      {isActive && (
                        <div className="absolute left-0 top-1 bottom-1 w-1 bg-amber-400 rounded-r shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                      )}

                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
                        <span>{cat.label}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono-tech transition-colors ${
                        isActive 
                          ? 'bg-amber-400 text-black font-extrabold shadow-sm' 
                          : 'bg-white/5 text-neutral-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Direct Ingestion Hotline Card */}
              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 space-y-2 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>Have a custom format or scope?</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                    Speak directly with a post-production coordinator in under 15 minutes.
                  </p>
                  <a
                    href="mailto:hello@kritvideo.com"
                    className="inline-flex items-center gap-2 text-xs font-mono-tech text-amber-400 hover:text-amber-300 font-bold pt-1 transition-colors group"
                  >
                    <span>hello@kritvideo.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Luxury Expandable Accordion List with Dynamic Highlights */}
          <div className="lg:col-span-8 space-y-3.5">
            {filteredFAQs.map((item, index) => {
              const isOpen = openId === item.id;
              const itemNumber = (index + 1).toString().padStart(2, '0');

              return (
                <div
                  key={item.id}
                  className={`rounded-[24px] transition-all duration-300 border overflow-hidden relative ${
                    isOpen
                      ? 'bg-neutral-950/95 border-amber-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/20'
                      : 'bg-neutral-950/50 hover:bg-neutral-950/80 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {/* Subtle Inset Top Light when Open */}
                  {isOpen && (
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none" />
                  )}

                  {/* Accordion Question Header Button */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors relative"
                  >
                    <div className="flex items-start gap-4 sm:gap-5 flex-1">
                      {/* Monospace Numeric Badge with Glow */}
                      <span className={`text-xs font-mono-tech font-bold shrink-0 pt-0.5 transition-colors ${
                        isOpen ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'text-neutral-500'
                      }`}>
                        &#123; {itemNumber} &#125;
                      </span>

                      {/* Question Text */}
                      <div className="space-y-1">
                        <h3 className={`text-sm sm:text-base md:text-[1.05rem] font-bold tracking-tight leading-snug transition-colors ${
                          isOpen ? 'text-white' : 'text-neutral-200 hover:text-white'
                        }`}>
                          {item.question}
                        </h3>

                        {item.timeEstimate && !isOpen && (
                          <span className="inline-block text-[10px] font-mono-tech text-neutral-500">
                            {item.timeEstimate}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expand/Collapse Circular Chevron Indicator */}
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-amber-400 text-black border-amber-400 rotate-180 shadow-[0_0_15px_rgba(245,158,11,0.7)] scale-105'
                        : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                    }`}>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Accordion Answer Container with Smooth Reveal & Metadata Badges */}
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-white/[0.06] animate-fadeIn space-y-4">
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal max-w-2xl">
                        {item.answer}
                      </p>

                      {/* Technical Spec Badges */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono-tech text-amber-400 font-bold shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.highlight}</span>
                        </div>

                        {item.timeEstimate && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono-tech text-neutral-300">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            <span>{item.timeEstimate}</span>
                          </div>
                        )}
                      </div>
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
}
