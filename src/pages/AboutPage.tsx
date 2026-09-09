import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Volume2, 
  ChevronDown, 
  Plus
} from 'lucide-react';
import Header from '../components/Header';
import SectionFinalCTAAndFooter from '../components/SectionFinalCTAAndFooter';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';
import SEOHead from '../components/SEOHead';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence,
  useMotionValueEvent
} from 'motion/react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

interface AeoItem {
  question: string;
  answer: string;
}

const AEO_DATA: AeoItem[] = [
  {
    question: 'What does KritVideo do?',
    answer: 'We edit videos for creators, founders, businesses, and anyone who wants to post video content. You film your clips, upload them to us, and we send back a clean, polished video ready to post on YouTube, Instagram, LinkedIn, or your website.'
  },
  {
    question: 'Why should I hire you instead of editing myself?',
    answer: 'Editing takes hours of tedious work — cutting clips, balancing sound, and fixing colors. We do all of that for you, saving you hours every week so you can focus on creating without the headache.'
  },
  {
    question: 'Do I need an expensive camera to work with you?',
    answer: 'Not at all. You can film on your phone, a desk camera, or a cinema camera. Great videos come from good ideas and a clear story, not expensive gear.'
  },
  {
    question: 'How does the process work?',
    answer: 'It’s simple: you film your clips and upload them. We edit the video, polish the sound and picture, and send it to you. You review it, we make any quick tweaks you want, and it’s ready to publish.'
  }
];

// =========================================================================
// HIGH-PERFORMANCE STREAMLINED TEXT HIGHLIGHT COMPONENT
// =========================================================================
function AppleScrollParagraph({ 
  text, 
  className,
  accentWords = [],
}: { 
  text: string; 
  className?: string; 
  accentWords?: string[];
  offset?: [string, string];
}) {
  const words = text.split(/\s+/);
  return (
    <p className={className}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const isAccent = accentWords.some(acc => cleanWord.includes(acc.toLowerCase()));
        return (
          <span 
            key={i} 
            className={`inline-block mr-[0.26em] transition-colors ${
              isAccent ? 'text-amber-300 font-semibold' : 'text-neutral-200 font-normal'
            }`}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  // AEO Accordion State
  const [openAeoIndex, setOpenAeoIndex] = useState<number | null>(0);

  // Timeline Section Scroll Progress
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.70"]
  });

  const pathLength = useSpring(timelineProgress, {
    stiffness: 300,
    damping: 45,
    restDelta: 0.001
  });

  // Mobile detection for guaranteed 100% text visibility on touch devices
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Milestone individual activation triggers driven by timeline scroll
  const node1Active = useTransform(timelineProgress, [0.04, 0.22], [0.55, 1]);
  const node2Active = useTransform(timelineProgress, [0.24, 0.45], [0.55, 1]);
  const node3Active = useTransform(timelineProgress, [0.48, 0.70], [0.55, 1]);
  const node4Active = useTransform(timelineProgress, [0.72, 0.94], [0.55, 1]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-black text-white selection:bg-amber-400 selection:text-black select-none min-h-screen font-sans overflow-x-hidden">
      <SEOHead
        title="About Us — Story-Driven Video Post-Production Studio | KritVideo"
        description="Meet the editors, colorists, and sound designers behind KritVideo. Human craft, DaVinci Resolve precision, and retention-focused storytelling for creators and global brands."
        canonical="https://kritvideo.com/about"
      />
      {/* Scroll Depth Progress Bar & Back to Top Indicator */}
      <ScrollProgressIndicator />

      {/* 01. HEADER / NAVIGATION */}
      <Header currentPath="/about" onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 01. HERO SECTION: OUR LOVE FOR VIDEO                                      */}
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

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-7 sm:space-y-8">
          
          {/* Centered Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>// ABOUT KRITVIDEO</span>
          </div>

          {/* Centered Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-[-0.04em] leading-[0.96] text-white">
            Everyone has a story.{' '}
            <span className="font-editorial-serif italic font-normal text-amber-300 block mt-2 sm:mt-3">
              Not everyone has started telling it.
            </span>
          </h1>

          {/* Centered Subtitle */}
          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
              We love video. It is the best way to turn an idea in your head into something other people can see, hear, and feel. We started KritVideo to make video publishing easy for everyone.
            </p>
          </div>

          {/* Centered Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/work')}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all flex items-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
            >
              <span>SEE OUR WORK</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-4 rounded-full bg-neutral-900/80 border border-white/15 hover:border-white text-neutral-200 hover:text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 shadow-lg backdrop-blur-md"
            >
              <span>START YOUR PROJECT →</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. WHAT WE STAND FOR (Apple Text Highlights on Scroll)                   */}
      {/* ========================================================================= */}
      <section className="relative pt-20 pb-24 px-4 sm:px-8 border-t border-white/[0.08] bg-[#050403] overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245, 158, 11, 0.05), transparent 70%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">

          {/* Location Badge + Vertical Connector Node */}
          <div className="pt-8 flex flex-col items-center text-center space-y-3">
            <div className="w-5 h-5 rounded bg-neutral-900 border border-white/20 flex items-center justify-center text-amber-400 text-xs">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] sm:text-xs font-mono-tech text-neutral-400 uppercase tracking-widest">
              Video Editing Studio • Working with creators worldwide
            </div>
            {/* Continuous vertical connector line */}
            <div className="w-px h-12 bg-gradient-to-b from-white/30 via-amber-400/50 to-amber-400" />
          </div>

          {/* Apple-Style Text Highlighting on Scroll (Simple, short, relatable) */}
          <div className="max-w-3xl mx-auto text-center space-y-7 pt-4 pb-8">
            {/* Highlighted Headline */}
            <AppleScrollParagraph 
              text="we help you turn raw clips into great videos you are proud to share."
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15]"
              accentWords={["turn", "great", "videos", "proud", "share"]}
              offset={["start 0.85", "start 0.40"]}
            />

            {/* Highlighted Supporting Story */}
            <AppleScrollParagraph 
              text="Making a video should feel exciting, not stressful. If you have an idea and a phone or camera, you are ready to create. We take care of all the editing so you get your time back and can publish consistently without the burnout."
              className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal"
              accentWords={["exciting", "create", "editing", "time", "consistently"]}
              offset={["start 0.80", "start 0.35"]}
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. SNAKING S-CURVE TIMELINE: PROBLEM & SOLUTION IN SIMPLE ENGLISH         */}
      {/* ========================================================================= */}
      <section 
        ref={timelineRef}
        className="relative py-28 px-4 sm:px-8 border-t border-white/[0.08] bg-[#050403] overflow-hidden"
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 25%, rgba(245, 158, 11, 0.05), transparent 70%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          
          {/* Starting Node */}
          <div className="flex flex-col items-center text-center pb-16 relative z-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-amber-300 font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <h2 className="font-editorial-serif italic text-base text-amber-300 lowercase inline">our story & how it works.</h2>
            </div>
            <div className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest pt-2">
              [ SCROLL TO SEE HOW WE HELP ]
            </div>
          </div>

          {/* Desktop S-Curve Winding SVG Line */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 800 1350" 
              fill="none" 
              preserveAspectRatio="none"
            >
              {/* Background Ghost Guide Path */}
              <path 
                d="M 400 60 
                   C 400 140, 370 180, 370 250 
                   C 370 360, 430 430, 430 530 
                   C 430 640, 430 710, 430 810 
                   C 430 920, 370 990, 370 1090 
                   C 370 1190, 400 1270, 400 1350" 
                stroke="rgba(245, 158, 11, 0.12)" 
                strokeWidth="2" 
                strokeDasharray="4 6"
              />

              {/* Glowing Ambient Halo Line */}
              <motion.path 
                d="M 400 60 
                   C 400 140, 370 180, 370 250 
                   C 370 360, 430 430, 430 530 
                   C 430 640, 430 710, 430 810 
                   C 430 920, 370 990, 370 1090 
                   C 370 1190, 400 1270, 400 1350" 
                stroke="rgba(245, 158, 11, 0.35)" 
                strokeWidth="8" 
                strokeLinecap="round" 
                style={{ pathLength }}
                className="filter blur-[6px]"
              />

              {/* Foreground Golden Path */}
              <motion.path 
                d="M 400 60 
                   C 400 140, 370 180, 370 250 
                   C 370 360, 430 430, 430 530 
                   C 430 640, 430 710, 430 810 
                   C 430 920, 370 990, 370 1090 
                   C 370 1190, 400 1270, 400 1350" 
                stroke="#f59e0b" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Mobile Straight Spine Line */}
          <div className="md:hidden absolute left-3 sm:left-4 top-28 bottom-16 w-0.5 bg-neutral-900 z-0">
            <motion.div 
              style={{ scaleY: pathLength }}
              className="w-full h-full bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-300 origin-top shadow-[0_0_10px_rgba(245,158,11,1)]"
            />
          </div>

          {/* 4 Skimmable Milestones in Plain Simple English */}
          <div className="relative z-10 space-y-16 md:space-y-24">
            
            {/* ------------------------------------------------------------- */}
            {/* Milestone 01: The Problem                                     */}
            {/* ------------------------------------------------------------- */}
            <motion.div 
              style={{ opacity: isMobile ? 1 : node1Active }}
              className="relative pl-7 sm:pl-9 md:pl-0 md:grid md:grid-cols-12 md:gap-8 items-center transition-all duration-300"
            >
              <div className="md:hidden absolute left-[-22px] sm:left-[-24px] top-4 w-4 h-4 rounded-full bg-[#050403] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.8)] z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              <div className="md:col-span-6 relative z-20">
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0a0806] border border-white/10 hover:border-amber-400/40 transition-colors shadow-2xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400 font-bold">
                      <span>01.</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-white uppercase tracking-wider">the problem</span>
                    </div>
                    <span className="text-[10px] font-mono-tech text-neutral-500 uppercase">THE STRUGGLE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Shooting is fun. Editing gets overwhelming.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    You shoot your clips, get excited, and then face dozens of messy takes. Most videos never get published because editing takes hours of patience you simply don't have. Good ideas end up forgotten on hard drives.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-[10px] font-mono-tech text-amber-300 font-bold shadow-sm">
                      MESSY CLIPS → ONE GREAT VIDEO
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden md:block md:col-span-6 pl-8 relative z-20">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-[#0a0806]/90 border border-amber-500/20 backdrop-blur-md max-w-sm text-xs text-neutral-300 space-y-2 shadow-xl"
                >
                  <div className="text-amber-400 font-mono-tech font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    THE BIGGEST BOTTLENECK
                  </div>
                  <p className="leading-relaxed">People don't stop making videos because they lack ideas. They stop because editing takes too long.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* Milestone 02: How We Help (The Story & The Cut)               */}
            {/* ------------------------------------------------------------- */}
            <motion.div 
              style={{ opacity: isMobile ? 1 : node2Active }}
              className="relative pl-7 sm:pl-9 md:pl-0 md:grid md:grid-cols-12 md:gap-8 items-center transition-all duration-300"
            >
              <div className="md:hidden absolute left-[-22px] sm:left-[-24px] top-4 w-4 h-4 rounded-full bg-[#050403] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.8)] z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              <div className="hidden md:block md:col-span-6 md:text-right pr-8 relative z-20">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="inline-block p-5 rounded-2xl bg-[#0a0806]/90 border border-amber-500/20 backdrop-blur-md max-w-sm text-xs text-neutral-300 space-y-2 text-left shadow-xl"
                >
                  <div className="text-amber-400 font-mono-tech font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    NO FAKE TEMPLATES
                  </div>
                  <p className="leading-relaxed">We make your video look clean and engaging while making sure it still feels 100% like you.</p>
                </motion.div>
              </div>

              <div className="md:col-span-6 relative z-20">
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0a0806] border border-white/10 hover:border-amber-400/40 transition-colors shadow-2xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400 font-bold">
                      <span>02.</span>
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-amber-400/20" />
                      <span className="text-white uppercase tracking-wider">how we help</span>
                    </div>
                    <span className="text-[10px] font-mono-tech text-neutral-500 uppercase">THE STORY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    You shoot. We shape the story.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Send us your raw footage. We cut out the awkward pauses, pick your best takes, and pace the video smoothly so people enjoy watching from start to finish — keeping your natural voice front and center.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-[10px] font-mono-tech text-amber-300 font-bold shadow-sm">
                      YOUR NATURAL VOICE INTACT
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* Milestone 03: The Polish (Sound & Picture)                     */}
            {/* ------------------------------------------------------------- */}
            <motion.div 
              style={{ opacity: isMobile ? 1 : node3Active }}
              className="relative pl-7 sm:pl-9 md:pl-0 md:grid md:grid-cols-12 md:gap-8 items-center transition-all duration-300"
            >
              <div className="md:hidden absolute left-[-22px] sm:left-[-24px] top-4 w-4 h-4 rounded-full bg-[#050403] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.8)] z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              <div className="hidden md:block md:col-span-6 md:text-right pr-8 relative z-20">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="inline-block p-5 rounded-2xl bg-[#0a0806]/90 border border-amber-500/20 backdrop-blur-md max-w-sm text-xs text-neutral-300 space-y-2 text-left shadow-xl"
                >
                  <div className="text-amber-400 font-mono-tech font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    EASY ON EARS & EYES
                  </div>
                  <p className="leading-relaxed">No background hum, no quiet voices, no harsh cuts. Just clean, enjoyable video that looks professional.</p>
                </motion.div>
              </div>

              <div className="md:col-span-6 relative z-20">
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0a0806] border border-white/10 hover:border-amber-400/40 transition-colors shadow-2xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400 font-bold">
                      <span>03.</span>
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-amber-400/20" />
                      <span className="text-white uppercase tracking-wider">the polish</span>
                    </div>
                    <span className="text-[10px] font-mono-tech text-neutral-500 uppercase">FINISHING</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Crisp sound, balanced colors, clean look.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    We make your voice sound clear and easy to hear, fix dark or washed-out lighting, and add music and simple titles that make your video feel polished and enjoyable to watch.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-[10px] font-mono-tech text-amber-300 font-bold shadow-sm">
                      CLEAR SOUND & BRIGHT PICTURE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ------------------------------------------------------------- */}
            {/* Milestone 04: The Result (Publishing)                         */}
            {/* ------------------------------------------------------------- */}
            <motion.div 
              style={{ opacity: isMobile ? 1 : node4Active }}
              className="relative pl-7 sm:pl-9 md:pl-0 md:grid md:grid-cols-12 md:gap-8 items-center transition-all duration-300"
            >
              <div className="md:hidden absolute left-[-22px] sm:left-[-24px] top-4 w-4 h-4 rounded-full bg-[#050403] border-2 border-amber-400 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.8)] z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              <div className="md:col-span-6 relative z-20">
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0a0806] border border-white/10 hover:border-amber-400/40 transition-colors shadow-2xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400 font-bold">
                      <span>04.</span>
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-amber-400/20" />
                      <span className="text-white uppercase tracking-wider">the result</span>
                    </div>
                    <span className="text-[10px] font-mono-tech text-neutral-500 uppercase">PUBLISHED</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Finished, shared, and hours back every week.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Your video is finished and ready to upload to YouTube, Instagram, LinkedIn, or your website. No stress, no delays — just consistent videos that build real trust with your audience.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono-tech text-amber-300 font-bold">
                      NO STRESS • NO BOTTLENECK
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden md:block md:col-span-6 pl-8 relative z-20">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 backdrop-blur-md max-w-sm text-xs text-neutral-200 space-y-2 shadow-[0_4px_25px_rgba(245,158,11,0.15)]"
                >
                  <div className="text-amber-300 font-mono-tech font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    PEACE OF MIND
                  </div>
                  <p className="leading-relaxed">You focus on your ideas and your business. We take care of the editing every single week.</p>
                </motion.div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. FOUR THINGS WE GIVE YOU (Rich Obsidian Cards + Studio Backdrop)        */}
      {/* ========================================================================= */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-white/[0.08] bg-black overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245, 158, 11, 0.05), transparent 70%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-amber-400 font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>● WHAT YOU GET</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Four things we <span className="font-editorial-serif italic font-normal text-amber-300">give you.</span>
              </h2>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
              Simple, high-leverage outcomes that make creating and publishing videos effortless and enjoyable every single week.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Your Time Back',
                desc: 'Save 10 to 15 hours every week so you can focus on your business, clients, or thinking up your next big idea.',
                icon: Clock,
                metric: '10-15H / WEEK SAVED'
              },
              {
                num: '02',
                title: 'Confidence to Post',
                desc: 'Never second-guess your edits. Publish your content knowing every cut, frame, and syllable is dialed to perfection.',
                icon: ShieldCheck,
                metric: 'ZERO SECOND GUESSING'
              },
              {
                num: '03',
                title: 'Your True Voice',
                desc: 'Videos that feel authentically you, avoiding cheesy cookie-cutter templates and algorithmic cliches.',
                icon: Volume2,
                metric: '100% ORGANIC TONE'
              },
              {
                num: '04',
                title: 'Publish Regularly',
                desc: 'When post-production runs on autopilot, publishing high-retention content becomes consistent and scalable.',
                icon: Sparkles,
                metric: 'STEADY WEEKLY CADENCE'
              }
            ].map((card, i) => {
              const IconComponent = card.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative p-6 sm:p-7 rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-amber-400/50 backdrop-blur-2xl transition-all shadow-2xl flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-amber-400 font-bold px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                        {card.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-amber-300 group-hover:border-amber-400/40 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <span className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-widest block font-semibold">
                      {card.metric}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. MANIFESTO: CINEMATIC LETTERBOX MARQUEE                                */}
      {/* ========================================================================= */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-8 border-t border-white/[0.08] bg-[#060403] text-center overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245, 158, 11, 0.06), transparent 70%)'
          }}
        />

        {/* Anamorphic Letterbox Framing Bars */}
        <div className="absolute top-0 inset-x-0 h-10 bg-black border-b border-white/[0.08] flex items-center justify-between px-6 text-[9px] font-mono-tech uppercase tracking-widest text-neutral-500 pointer-events-none">
          <span>// 2.39:1 CINEMATIC SCOPE</span>
          <span>POST-PRODUCTION MANIFESTO</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 bg-black border-t border-white/[0.08] flex items-center justify-between px-6 text-[9px] font-mono-tech uppercase tracking-widest text-neutral-500 pointer-events-none">
          <span>STUDIO CRAFT</span>
          <span>KRITVIDEO MASTER</span>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10 pt-4">
          
          {/* Apple Highlight on the Manifesto Line */}
          <AppleScrollParagraph 
            text="SHOOT THE IDEA • TELL YOUR STORY • PRESS PUBLISH."
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono-tech tracking-tight leading-tight justify-center flex flex-wrap"
            accentWords={["PRESS", "PUBLISH"]}
            offset={["start 0.85", "start 0.40"]}
          />

          <p className="text-xs sm:text-sm font-mono-tech uppercase tracking-[0.2em] text-neutral-400 font-bold">
            Don't let editing stop you from sharing what you know.
          </p>

          {/* Apple Highlight on the Emotional Anchor Quote */}
          <div className="pt-8 border-t border-white/10 max-w-xl mx-auto space-y-4">
            <AppleScrollParagraph 
              text="“You don’t need to be a filmmaker to have a story worth sharing.”"
              className="text-xl sm:text-3xl font-editorial-serif italic leading-relaxed text-amber-300"
              accentWords={["filmmaker", "story", "worth", "sharing"]}
              offset={["start 0.85", "start 0.45"]}
            />
            <span className="block text-[11px] font-mono-tech text-amber-400 font-semibold uppercase tracking-widest">
              — KRITVIDEO
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. QUICK QUESTIONS (SIMPLE, DIRECT ANSWERS)                              */}
      {/* ========================================================================= */}
      <section className="relative py-24 sm:py-28 px-4 sm:px-8 border-t border-white/[0.08] bg-black overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(245, 158, 11, 0.05), transparent 70%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          <div className="space-y-2">
            <div className="text-xs font-mono-tech text-amber-400 font-bold uppercase tracking-widest">
              ● QUICK QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              A few things about KritVideo.
            </h2>
          </div>

          <div className="space-y-3">
            {AEO_DATA.map((item, idx) => {
              const isOpen = openAeoIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-neutral-950/80 border border-white/10 overflow-hidden transition-colors hover:border-amber-400/40 backdrop-blur-xl"
                >
                  <button
                    onClick={() => setOpenAeoIndex(isOpen ? null : idx)}
                    className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="text-sm sm:text-base font-bold text-white font-mono-tech group-hover:text-amber-300 transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-7 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-3">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. FINAL CTA: THE OBSIDIAN STAGE (Harmonized with Services Page)         */}
      {/* ========================================================================= */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-8 border-t border-white/[0.08] bg-gradient-to-b from-[#080604] via-black to-black overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245, 158, 11, 0.06), transparent 70%)'
          }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">
          
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>// START CREATING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Ready to turn your idea into{' '}
            <span className="font-editorial-serif italic font-normal text-amber-300">
              a video?
            </span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-normal">
            You don't need a finished plan or a studio setup. Tell us what you're thinking of making, and we'll help you get started.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all flex items-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95"
            >
              <span>START YOUR PROJECT ↗</span>
            </button>

            <button
              onClick={() => onNavigate('/work')}
              className="px-8 py-4 rounded-full bg-neutral-900/80 border border-white/15 hover:border-white text-neutral-200 hover:text-white text-xs sm:text-sm font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 shadow-lg"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>SEE OUR WORK ▶</span>
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono-tech text-neutral-400 uppercase tracking-widest">
            <span className="text-amber-300 font-semibold">NO RIGID FORMS</span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-300 font-semibold">FAST 24H RESPONSE</span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-300 font-semibold">DIRECT CREATIVE TEAM</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. UNIFIED FOOTER (With hideCta to eliminate duplicate footer CTA)       */}
      {/* ========================================================================= */}
      <div id="contact">
        <SectionFinalCTAAndFooter onNavigate={onNavigate} hideCta={true} />
      </div>

    </div>
  );
}
