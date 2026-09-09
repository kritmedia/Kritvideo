import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowUpRight, 
  Play, 
  ChevronDown, 
  Sparkles, 
  Youtube, 
  Smartphone, 
  Mic2, 
  Briefcase, 
  Layers, 
  Clock, 
  Film, 
  Volume2, 
  Palette, 
  Type, 
  Scissors, 
  Check, 
  Sliders, 
  HelpCircle, 
  HardDrive, 
  UserCheck, 
  Activity, 
  ArrowRight, 
  ArrowLeft,
  Eye, 
  Instagram, 
  Video,
  ChevronRight,
  Monitor,
  CheckCircle2,
  Camera
} from 'lucide-react';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { submitWixLead } from '../lib/wixClient';
import SectionFinalCTAAndFooter from '../components/SectionFinalCTAAndFooter';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';
import SEOHead from '../components/SEOHead';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

interface ServiceItem {
  id: string;
  num: string;
  category: string;
  title: string;
  desc: string;
  thumbnail: string;
  videoUrl: string;
  youtubeId: string;
  format: string;
  resolution: string;
  idealFor: string;
  badge: string;
  included: Array<{ icon: React.ElementType; text: string }>;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'youtube',
    num: '01',
    category: 'YOUTUBE VIDEO EDITING',
    title: 'Long-form, without the long nights.',
    desc: 'Talking heads, documentaries, and explainers. We turn raw footage into high-retention YouTube cuts with custom pacing, sound design, color grading, and graphics.',
    thumbnail: 'https://i.ytimg.com/vi/OWRKm1ZpbDA/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=OWRKm1ZpbDA',
    youtubeId: 'OWRKm1ZpbDA',
    format: '16:9',
    resolution: '4K DCI',
    idealFor: 'LONG-FORM / YOUTUBE',
    badge: 'CINEMATOGRAPHY REEL',
    included: [
      { icon: Scissors, text: 'Cuts & pacing' },
      { icon: Film, text: 'B-roll integration' },
      { icon: Volume2, text: 'Audio cleanup & EQ' },
      { icon: Palette, text: 'Graphics & lower thirds' },
      { icon: Type, text: 'Captions & subtitles' },
      { icon: CheckCircle2, text: 'Final platform export' },
    ],
  },
  {
    id: 'shortform',
    num: '02',
    category: 'SHORT-FORM VIDEO EDITING',
    title: 'Make the good bits impossible to miss.',
    desc: 'Transform raw clips or long videos into viral 9:16 vertical edits for Reels, Shorts, and TikTok with punchy hooks and kinetic captions.',
    thumbnail: 'https://i.ytimg.com/vi/QUx1anKHYuI/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=QUx1anKHYuI',
    youtubeId: 'QUx1anKHYuI',
    format: '9:16 / 16:9',
    resolution: '4K Apple Log',
    idealFor: 'REELS / SHORTS / TIKTOK',
    badge: '4K APPLE LOG',
    included: [
      { icon: Scissors, text: 'First 3s hook design' },
      { icon: Film, text: 'Punchy visual movement' },
      { icon: Volume2, text: 'Dynamic sound effects' },
      { icon: Palette, text: 'Motion stickers & assets' },
      { icon: Type, text: 'Animated kinetic captions' },
      { icon: CheckCircle2, text: 'Vertical social exports' },
    ],
  },
  {
    id: 'podcast',
    num: '03',
    category: 'PODCAST VIDEO EDITING',
    title: 'You talk. We make it watchable.',
    desc: 'Multi-cam camera switching, dialogue de-noising (-14 LUFS), dead air removal, and viral promotional clips for social distribution.',
    thumbnail: 'https://i.ytimg.com/vi/xuas_Yc7VNQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=xuas_Yc7VNQ',
    youtubeId: 'xuas_Yc7VNQ',
    format: '16:9',
    resolution: 'Sony A7SIII 4K',
    idealFor: 'PODCASTS / INTERVIEWS',
    badge: 'CINEMATIC SOCCER EDIT',
    included: [
      { icon: Camera, text: 'Multi-camera switching' },
      { icon: Volume2, text: 'Dialogue cleanup (-14 LUFS)' },
      { icon: Scissors, text: 'Removing dead air & filler' },
      { icon: Palette, text: 'Episode titles & branding' },
      { icon: Film, text: 'Short-form social cuts' },
      { icon: CheckCircle2, text: 'Multi-platform masters' },
    ],
  },
  {
    id: 'brand',
    num: '04',
    category: 'BRAND & COMMERCIAL',
    title: 'Make your brand look expensive.',
    desc: 'High-converting social ads, product launches, and brand films engineered to capture attention and elevate your brand perception.',
    thumbnail: 'https://i.ytimg.com/vi/IJsVs6Nw6ls/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=IJsVs6Nw6ls',
    youtubeId: 'IJsVs6Nw6ls',
    format: '16:9 / 4:5 / 9:16',
    resolution: 'Sony A7IV 4K',
    idealFor: 'ADS / PRODUCT / BRAND',
    badge: 'COMMERCIAL VIDEO',
    included: [
      { icon: Scissors, text: 'Commercial storytelling' },
      { icon: Palette, text: 'ACES / Log color grading' },
      { icon: Volume2, text: 'Cinematic audio mix' },
      { icon: Film, text: 'Product focal framing' },
      { icon: Type, text: 'Minimal luxury titles' },
      { icon: CheckCircle2, text: 'Omni-channel deliverables' },
    ],
  },
  {
    id: 'repurposing',
    num: '05',
    category: 'CONTENT REPURPOSING',
    title: 'One recording. More to work with.',
    desc: 'Turn a single recording into an omnipresent content pack: vertical cutdowns, audiograms, quote reels, and multi-platform exports.',
    thumbnail: 'https://i.ytimg.com/vi/OsP0icRA4Hc/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=OsP0icRA4Hc',
    youtubeId: 'OsP0icRA4Hc',
    format: 'MULTIPLE',
    resolution: 'Sony FX3 4K',
    idealFor: 'MORE CONTENT / LESS EFFORT',
    badge: 'CINEMATIC FILM',
    included: [
      { icon: Scissors, text: 'Key moment extraction' },
      { icon: Film, text: 'Vertical 9:16 reframing' },
      { icon: Type, text: 'Autonomous captioning' },
      { icon: Palette, text: 'Platform hook design' },
      { icon: Volume2, text: 'Shorts sound mastering' },
      { icon: CheckCircle2, text: 'Batch exports pack' },
    ],
  },
];

interface ServiceFAQItem {
  id: string;
  category: 'ingestion' | 'style' | 'scope';
  categoryLabel: string;
  question: string;
  answer: string;
  highlight: string;
}

const SERVICE_FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions', count: 6, icon: HelpCircle, color: 'from-amber-500/20 via-orange-500/10' },
  { id: 'ingestion', label: 'Footage & Ingestion', count: 2, icon: HardDrive, color: 'from-emerald-500/20 via-amber-500/10' },
  { id: 'style', label: 'Brief & Style', count: 2, icon: UserCheck, color: 'from-amber-500/20 via-yellow-500/15' },
  { id: 'scope', label: 'Scope & Volume', count: 2, icon: Clock, color: 'from-orange-500/25 via-amber-500/15' },
];

const SERVICE_FAQ_DATA: ServiceFAQItem[] = [
  {
    id: 'raw-footage',
    category: 'ingestion',
    categoryLabel: 'Ingestion',
    question: 'CAN YOU WORK WITH RAW, UNORGANISED FOOTAGE?',
    answer: "Yes. Send raw, unorganized clips. We organize takes, sync audio, and shape the story without any tedious prep needed on your end.",
    highlight: 'Zero Prep Needed',
  },
  {
    id: 'editing-brief',
    category: 'style',
    categoryLabel: 'Workflow',
    question: 'DO I NEED TO PROVIDE AN EDITING BRIEF?',
    answer: "A brief is simple: tell us your audience, platform, and share 1 or 2 reference links you like.",
    highlight: 'Simple Briefing',
  },
  {
    id: 'existing-style',
    category: 'style',
    categoryLabel: 'Style Match',
    question: 'CAN YOU FOLLOW MY EXISTING STYLE?',
    answer: "100%. Share previous videos or channels you like — we match your exact pacing, captions, and font aesthetic.",
    highlight: 'Brand Continuity',
  },
  {
    id: 'video-volume',
    category: 'scope',
    categoryLabel: 'Capacity',
    question: 'CAN YOU EDIT ONE VIDEO AND MULTIPLE VIDEOS EVERY MONTH?',
    answer: 'Yes. We handle both single signature videos and regular monthly editing retainers with guaranteed 48-hour delivery.',
    highlight: 'Flexible Volume',
  },
  {
    id: 'multiple-formats',
    category: 'ingestion',
    categoryLabel: 'Deliverables',
    question: 'CAN YOU CREATE DIFFERENT FORMATS FROM ONE VIDEO?',
    answer: 'Yes. We deliver 16:9 YouTube masters, 9:16 vertical reels, 1:1 square feeds, and 4:5 social cuts.',
    highlight: 'Multi-Platform Masters',
  },
  {
    id: 'service-selection',
    category: 'scope',
    categoryLabel: 'Consultation',
    question: 'WHAT IF I\'M NOT SURE WHICH SERVICE I NEED?',
    answer: "Reach out via our contact form. Tell us what footage you have, and we will recommend the best workflow.",
    highlight: 'Free Creative Advice',
  },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  // INTERACTIVE SERVICES STATE
  const [activeServiceIndex, setActiveServiceIndex] = useState<number>(0);
  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // FAQ State
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string>('raw-footage');

  // IntersectionObserver to highlight tabs as user scrolls through services
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    serviceCardRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveServiceIndex(index);
            }
          });
        },
        { rootMargin: '-15% 0px -40% 0px', threshold: 0.2 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToServiceCard = (id: string, index: number) => {
    setActiveServiceIndex(index);
    const el = document.getElementById(`service-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToService = (index: number) => {
    const target = SERVICES_LIST[index];
    if (target) scrollToServiceCard(target.id, index);
  };

  const handlePrev = () => {
    const newIdx = Math.max(0, activeServiceIndex - 1);
    const target = SERVICES_LIST[newIdx];
    if (target) scrollToServiceCard(target.id, newIdx);
  };

  const handleNext = () => {
    const newIdx = Math.min(SERVICES_LIST.length - 1, activeServiceIndex + 1);
    const target = SERVICES_LIST[newIdx];
    if (target) scrollToServiceCard(target.id, newIdx);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFaqCategoryChange = (catId: string) => {
    setActiveFaqCategory(catId);
    const items = catId === 'all' ? SERVICE_FAQ_DATA : SERVICE_FAQ_DATA.filter((item) => item.category === catId);
    if (items.length > 0) {
      const isCurrentlyOpenInNewCategory = items.some((item) => item.id === openFaqId);
      if (!isCurrentlyOpenInNewCategory) {
        setOpenFaqId(items[0].id);
      }
    }
  };

  const filteredFAQs = activeFaqCategory === 'all'
    ? SERVICE_FAQ_DATA
    : SERVICE_FAQ_DATA.filter((item) => item.category === activeFaqCategory);

  const activeCategoryObj = SERVICE_FAQ_CATEGORIES.find(c => c.id === activeFaqCategory) || SERVICE_FAQ_CATEGORIES[0];
  const activeService = SERVICES_LIST[activeServiceIndex];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden font-sans">
      <SEOHead
        title="Video Editing Services & Retainer Pricing — KritVideo Studio"
        description="Transparent pricing and dedicated post-production teams. Single cuts from $490, monthly retainers from $1,850/mo. DaVinci color grading, spatial sound design, and 24-48h turnaround."
        canonical="https://kritvideo.com/services"
      />
      {/* Scroll Depth Progress Bar & Back to Top Indicator */}
      <ScrollProgressIndicator />

      {/* 01. HEADER / NAVIGATION */}
      <Header currentPath="/services" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 02. HERO SECTION: "Editing for what's next."                              */}
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
            <span>// SERVICES</span>
          </div>

          {/* Centered Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-[-0.04em] leading-[0.96] text-white">
            Editing for what's{' '}
            <span className="font-editorial-serif italic font-normal text-amber-300">
              next.
            </span>
          </h1>

          {/* Centered Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Dedicated video editors and colorists for YouTube creators, podcasters, and modern brands. High-retention narrative cuts, DaVinci Resolve color science, and guaranteed 48-hour delivery.
          </p>

          {/* Centered Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('services-interactive')}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
            >
              <span>EXPLORE OUR SERVICES</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => onNavigate('/work')}
              className="px-7 py-4 rounded-full bg-neutral-900/80 border border-white/15 hover:border-white text-neutral-300 hover:text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 shadow-lg"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>WATCH WORK</span>
            </button>
          </div>

          {/* Centered Process Pipeline */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-mono-tech text-neutral-400 uppercase tracking-widest">
            <span>SHOOT</span>
            <span className="text-amber-500/60">•</span>
            <span>EDIT</span>
            <span className="text-amber-500/60">•</span>
            <span>POLISH</span>
            <span className="text-amber-500/60">•</span>
            <span>PUBLISH</span>
            <span className="text-amber-500/60">•</span>
            <span className="text-amber-400 font-bold">GROW</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. WHAT WE EDIT: INTERACTIVE SERVICES SHOWCASE (All 5 Services on Scroll) */}
      {/* ========================================================================= */}
      <section 
        id="services-interactive"
        className="relative py-14 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-gradient-to-b from-black via-[#0a0704] to-black scroll-mt-28 sm:scroll-mt-32"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 25%, rgba(245, 158, 11, 0.05), transparent 70%)'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          
          {/* SECTION HEADER: "Different videos. Same goal." */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>● WHAT WE EDIT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.035em] text-white leading-[1.05]">
                Different videos.{' '}
                <span className="font-editorial-serif italic font-normal text-amber-300">
                  Same goal.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                High-retention edits tailored for your audience and platform. Send your footage — we handle everything through to final delivery.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono-tech text-neutral-400 shrink-0">
              <span className="text-amber-400 font-bold">SERVICE 0{activeServiceIndex + 1}</span>
              <span>/</span>
              <span>05</span>
            </div>
          </div>

          {/* STICKY TAB NAVIGATION DOCK (Positioned comfortably below floating header dock to ensure zero overlap) */}
          <div className="sticky top-[104px] sm:top-[112px] md:top-[124px] lg:top-[130px] z-30 py-3 -mx-4 px-4 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16 bg-black/95 backdrop-blur-2xl border-y border-white/[0.10] transition-all shadow-2xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* 5 Interactive Thumbnail Preview Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar md:grid md:grid-cols-5 md:gap-3 flex-1 pb-1">
                {SERVICES_LIST.map((item, idx) => {
                  const isActive = activeServiceIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToServiceCard(item.id, idx)}
                      className={`group/tab relative p-2 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl shrink-0 md:shrink min-w-[135px] md:min-w-0 text-left ${
                        isActive
                          ? 'bg-neutral-900/95 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                          : 'bg-neutral-950/70 border-white/10 hover:border-white/30 hover:bg-neutral-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Mini Thumbnail */}
                        <div className="w-11 h-9 sm:w-12 sm:h-10 rounded-lg overflow-hidden relative shrink-0 border border-white/10 bg-neutral-900">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title} 
                            className="w-full h-full object-cover filter brightness-90 group-hover/tab:scale-110 transition-transform duration-300"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-amber-500/20 ring-1 ring-inset ring-amber-400" />
                          )}
                        </div>

                        {/* Label & Number */}
                        <div className="truncate">
                          <div className={`text-[10px] font-mono-tech font-bold transition-colors ${
                            isActive ? 'text-amber-400' : 'text-neutral-400'
                          }`}>
                            {item.num}
                          </div>
                          <div className="text-xs font-bold text-white truncate font-sans">
                            {item.id.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {/* Active Indicator Bar */}
                      {isActive && (
                        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next controls */}
              <div className="hidden lg:flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={activeServiceIndex === 0}
                  aria-label="Previous Service"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-white/15 hover:border-white text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeServiceIndex === SERVICES_LIST.length - 1}
                  aria-label="Next Service"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-white/15 hover:border-white text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* 5 SERVICE CARDS (Each comes sequentially after scrolling) */}
          <div className="space-y-12 sm:space-y-16 pt-2">
            {SERVICES_LIST.map((service, idx) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                ref={(el) => { serviceCardRefs.current[idx] = el; }}
                className="relative rounded-[28px] sm:rounded-[36px] bg-neutral-950/90 border border-white/[0.14] p-5 sm:p-7 lg:p-9 transition-all duration-500 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden scroll-mt-56 sm:scroll-mt-64"
              >
                {/* Corner Viewfinder Crop Marks */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* 1. LEFT COLUMN: Narrative & Action */}
                  <div className="lg:col-span-4 space-y-4 sm:space-y-5">
                    <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-amber-400 font-bold uppercase tracking-widest">
                      <span>{service.num} / {service.category}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                      {service.desc}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onNavigate('/contact')}
                        className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95"
                      >
                        <span>GET STARTED</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>

                      <a
                        href={service.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-full bg-neutral-900 border border-white/15 hover:border-white text-neutral-300 hover:text-white text-xs font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <Play className="w-3 h-3 fill-current text-amber-400" />
                        <span>OPEN ON YOUTUBE ↗</span>
                      </a>
                    </div>
                  </div>

                  {/* 2. MIDDLE COLUMN: Visual Workstation Mockup with Embedded YouTube */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 p-2 shadow-2xl transition-all hover:border-amber-400/50">
                      {/* Workstation Screen Frame with YouTube Embed */}
                      <div className="relative rounded-xl overflow-hidden aspect-video bg-black shadow-inner">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${service.youtubeId}?rel=0&modestbranding=1`}
                          title={service.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>

                      {/* Multitrack NLE Timeline Ruler Underneath (Exact reference recreation) */}
                      <div className="pt-2 px-1 space-y-1 select-none">
                        <div className="flex items-center justify-between text-[9px] font-mono-tech text-neutral-500 px-1">
                          <span>00:00:00</span>
                          <span>TIMELINE TC: 01:04:12</span>
                          <span className="text-amber-400 font-bold">{service.badge}</span>
                        </div>
                        {/* Video Tracks */}
                        <div className="h-3 w-full bg-neutral-900 rounded flex gap-1 p-0.5 overflow-hidden">
                          <div className="h-full w-2/5 bg-cyan-600/80 rounded text-[7px] font-mono-tech text-cyan-100 flex items-center px-1 truncate">V1_A_ROLL</div>
                          <div className="h-full w-1/4 bg-purple-600/80 rounded text-[7px] font-mono-tech text-purple-100 flex items-center px-1 truncate">V2_B_ROLL</div>
                          <div className="h-full w-1/3 bg-amber-600/80 rounded text-[7px] font-mono-tech text-amber-100 flex items-center px-1 truncate">V3_GRAPHIC</div>
                        </div>
                        {/* Audio Waveform Track */}
                        <div className="h-2.5 w-full bg-neutral-900 rounded flex items-center px-1 gap-0.5 overflow-hidden">
                          <span className="text-[7px] font-mono-tech text-neutral-500 mr-1">A1</span>
                          <div className="h-full flex-1 flex items-center gap-0.5">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <span 
                                key={i} 
                                className="w-1 bg-emerald-500/80 rounded-full"
                                style={{ height: `${Math.max(25, Math.sin(i * 0.5 + idx) * 100)}%` }}
                              />
                            ))}
                          </div>
                          <span className="text-[8px] font-mono-tech text-amber-400 font-bold ml-1">-14 LUFS</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 3. RIGHT COLUMN: WHAT'S INCLUDED DOCK */}
                  <div className="lg:col-span-3 space-y-4 lg:pl-4 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0">
                    <div className="text-xs font-mono-tech uppercase tracking-widest text-amber-400 font-bold flex items-center justify-between">
                      <span>WHAT'S INCLUDED</span>
                      <span className="text-[10px] text-neutral-500">{service.included.length} PASSES</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-neutral-200">
                      {service.included.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <li key={i} className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-md bg-neutral-900 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                              <Icon className="w-3 h-3" />
                            </div>
                            <span className="font-medium text-neutral-300 text-xs">{item.text}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="pt-4 border-t border-white/[0.08] text-[10px] font-mono-tech text-neutral-400 space-y-1">
                      <div>{service.format} | {service.resolution}</div>
                      <div className="text-amber-400/90 font-bold">IDEAL FOR: {service.idealFor}</div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>





      {/* ========================================================================= */}
      {/* 07. FAQ SECTION: (Preserved 2-column dock with mobile sticky category switcher) */}
      {/* ========================================================================= */}
      <section
        id="faq"
        className="relative pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-black text-white select-none overflow-x-clip border-t border-white/[0.08] scroll-mt-28 sm:scroll-mt-32"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400 font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
              <span className="text-white">BEFORE YOU SEND THE FOOTAGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] leading-tight text-white">
              A few{' '}
              <span className="font-editorial-serif italic font-normal text-amber-300">
                useful answers.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl mx-auto font-normal">
              Everything you need to know about our video editing services, process, raw files, and deliverables.
            </p>
          </div>

          {/* MOBILE STICKY CATEGORY SWITCHER (Visible on < lg screens, docks below top nav) */}
          <div className="lg:hidden sticky top-[68px] sm:top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-black/95 backdrop-blur-2xl border-y border-white/10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400">
                <Sliders className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Category: <strong className="text-amber-300 font-bold">{activeCategoryObj.label}</strong></span>
              </div>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold">
                {filteredFAQs.length} {filteredFAQs.length === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>

            {/* Horizontal Scrollable Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
              {SERVICE_FAQ_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeFaqCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleFaqCategoryChange(cat.id)}
                    className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono-tech tracking-wide transition-all duration-200 cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-amber-400 text-black font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.35)] border border-amber-400'
                        : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono-tech ${
                      isActive
                        ? 'bg-black/20 text-black font-black'
                        : 'bg-white/10 text-neutral-300'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            {/* LEFT COLUMN: Interactive "FAQ Category" Card with Viewfinder Reticles (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4 space-y-4 relative">
              <div className="relative p-6 sm:p-7 rounded-[32px] bg-neutral-950/85 border border-white/15 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden group">
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                      Service FAQ Category
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold">
                    {filteredFAQs.length} ITEMS
                  </span>
                </div>

                <div className="space-y-2 pt-4">
                  {SERVICE_FAQ_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeFaqCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleFaqCategoryChange(cat.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-mono-tech tracking-wide transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-300 border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] font-bold translate-x-1'
                            : 'text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/10'
                        }`}
                      >
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

            <div className="lg:col-span-8 space-y-3.5">
              {filteredFAQs.map((item, index) => {
                const isOpen = openFaqId === item.id;
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
                    {isOpen && (
                      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none" />
                    )}

                    <button
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors relative"
                    >
                      <div className="flex items-start gap-4 sm:gap-5 flex-1">
                        <span className={`text-xs font-mono-tech font-bold shrink-0 pt-0.5 transition-colors ${
                          isOpen ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'text-neutral-500'
                        }`}>
                          &#123; {itemNumber} &#125;
                        </span>

                        <div className="space-y-1">
                          <h3 className={`text-sm sm:text-base md:text-[1.05rem] font-bold tracking-tight leading-snug transition-colors ${
                            isOpen ? 'text-white' : 'text-neutral-200 hover:text-white'
                          }`}>
                            {item.question}
                          </h3>
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-neutral-400">
                              {item.categoryLabel}
                            </span>
                            <span className="text-neutral-600">•</span>
                            <span className="text-[10px] font-mono-tech text-amber-400 font-semibold">
                              {item.highlight}
                            </span>
                          </div>
                        </div>
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
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile-only Direct Ingestion Hotline Card placed naturally below FAQs */}
              <div className="lg:hidden mt-6 pt-2">
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/15 space-y-2 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>Have a custom format or scope?</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
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
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. FINAL CTA & FOOTER: 100% IDENTICAL TO HOMEPAGE */}
      {/* ========================================================================= */}
      <SectionFinalCTAAndFooter onNavigate={onNavigate} />

    </div>
  );
}
