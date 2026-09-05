import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import Logo from './components/Logo';
import Header from './components/Header';
import VideoCursor from './components/VideoCursor';
import InteractiveProcessCards from './components/InteractiveProcessCards';
import ScrollRevealNarrative from './components/ScrollRevealNarrative';
import SectionServices from './components/SectionServices';
import SectionWhyUs from './components/SectionWhyUs';
import SectionOurWork from './components/SectionOurWork';
import SectionTestimonials from './components/SectionTestimonials';
import SectionFAQ from './components/SectionFAQ';
import SectionFinalCTAAndFooter from './components/SectionFinalCTAAndFooter';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';

const TOTAL_HERO_FRAMES = 240;
const TOTAL_SECOND_FRAMES = 239;

const getHeroFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `/photographer_frames/ezgif-frame-${paddedIndex}.jpg`;
};

const getSecondAnimationPath = (index: number) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `/second_animation_frames/ezgif-frame-${paddedIndex}.jpg`;
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const heroImagesRef = useRef<HTMLImageElement[]>([]);
  const secondImagesRef = useRef<HTMLImageElement[]>([]);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const [activeNav, setActiveNav] = useState('HOME');
  const [isScrolled, setIsScrolled] = useState(false);

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p.startsWith('/services') || h.startsWith('#/services')) {
        return '/services';
      }
      if (p.startsWith('/work') || h.startsWith('#/work')) {
        return '/work';
      }
      if (p.startsWith('/about') || h.startsWith('#/about')) {
        return '/about';
      }
      if (p.startsWith('/contact') || h.startsWith('#/contact')) {
        return '/contact';
      }
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p.startsWith('/services') || h.startsWith('#/services')) {
        setCurrentPath('/services');
      } else if (p.startsWith('/work') || h.startsWith('#/work')) {
        setCurrentPath('/work');
      } else if (p.startsWith('/about') || h.startsWith('#/about')) {
        setCurrentPath('/about');
      } else if (p.startsWith('/contact') || h.startsWith('#/contact')) {
        setCurrentPath('/contact');
      } else {
        setCurrentPath('/');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (path.startsWith('/services')) {
      const hashIndex = path.indexOf('#');
      const hash = hashIndex !== -1 ? path.substring(hashIndex) : '';
      window.history.pushState({}, '', '/services' + hash);
      setCurrentPath('/services');
      if (hash) {
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else if (path.startsWith('/work')) {
      const hashIndex = path.indexOf('#');
      const hash = hashIndex !== -1 ? path.substring(hashIndex) : '';
      window.history.pushState({}, '', '/work' + hash);
      setCurrentPath('/work');
      if (hash) {
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else if (path.startsWith('/about')) {
      const hashIndex = path.indexOf('#');
      const hash = hashIndex !== -1 ? path.substring(hashIndex) : '';
      window.history.pushState({}, '', '/about' + hash);
      setCurrentPath('/about');
      if (hash) {
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else if (path.startsWith('/contact')) {
      const hashIndex = path.indexOf('#');
      const hash = hashIndex !== -1 ? path.substring(hashIndex) : '';
      window.history.pushState({}, '', '/contact' + hash);
      setCurrentPath('/contact');
      if (hash) {
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      const hashIndex = path.indexOf('#');
      const hash = hashIndex !== -1 ? path.substring(hashIndex) : '';
      window.history.pushState({}, '', '/' + hash);
      setCurrentPath('/');
      if (hash) {
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  // Helper to retrieve nearest loaded frame from a sequence
  const getLoadedImageFrom = useCallback((images: HTMLImageElement[], total: number, index: number): HTMLImageElement | null => {
    if (!images || images.length === 0) return null;
    const clampedIndex = Math.max(1, Math.min(total, index)) - 1;
    const direct = images[clampedIndex];
    if (direct && direct.complete && direct.naturalWidth > 0) return direct;

    for (let offset = 1; offset < total; offset++) {
      const left = clampedIndex - offset;
      if (left >= 0 && images[left] && images[left].complete && images[left].naturalWidth > 0) {
        return images[left];
      }
      const right = clampedIndex + offset;
      if (right < total && images[right] && images[right].complete && images[right].naturalWidth > 0) {
        return images[right];
      }
    }
    return null;
  }, []);

  // Hardware-accelerated bicubic dual-sequence renderer with seamless crossfade
  const drawCompositeFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Pitch black background fill
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const drawCoverImage = (img: HTMLImageElement, alpha = 1.0) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const hRatio = canvasWidth / img.naturalWidth;
      const vRatio = canvasHeight / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      const drawWidth = img.naturalWidth * ratio;
      const drawHeight = img.naturalHeight * ratio;
      const drawX = (canvasWidth - drawWidth) / 2;
      const drawY = (canvasHeight - drawHeight) / 2;

      ctx.globalAlpha = alpha;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, drawY, drawWidth, drawHeight);
      ctx.globalAlpha = 1.0;
    };

    // SEQUENCE 1: Hero (Photographer, 240 frames): Progress 0.0 -> 0.48 (Plays across Section 1 & Section 2 till end of 2nd section)
    // TRANSITION: Crossfade 0.48 -> 0.52 (Seamless dissolve as Section 3 enters)
    // SEQUENCE 2: 2nd Animation (239 frames): Progress 0.52 -> 1.0 (Plays across Section 3 & Section 4 till end of 4th section)

    if (progress <= 0.48) {
      // Pure 1st Animation (Plays all 240 frames across Sections 1 & 2)
      const heroFrame = Math.min(
        TOTAL_HERO_FRAMES,
        Math.max(1, Math.round((progress / 0.48) * (TOTAL_HERO_FRAMES - 1)) + 1)
      );
      const img = getLoadedImageFrom(heroImagesRef.current, TOTAL_HERO_FRAMES, heroFrame);
      if (img) drawCoverImage(img, 1.0);
    } else if (progress > 0.48 && progress < 0.52) {
      // Seamless Cinematic Crossfade between 1st Animation ending and 2nd Animation starting
      const crossfade = (progress - 0.48) / 0.04;
      const heroImg = getLoadedImageFrom(heroImagesRef.current, TOTAL_HERO_FRAMES, TOTAL_HERO_FRAMES);
      const secondImg = getLoadedImageFrom(secondImagesRef.current, TOTAL_SECOND_FRAMES, 1);

      if (heroImg) drawCoverImage(heroImg, 1.0 - crossfade);
      if (secondImg) drawCoverImage(secondImg, crossfade);
    } else {
      // 2nd Animation (Plays all 239 frames across Section 3 Services & Section 4 Why Us)
      const secondProgress = (progress - 0.52) / (1.0 - 0.52);
      const secondFrame = Math.min(
        TOTAL_SECOND_FRAMES,
        Math.max(1, Math.round(secondProgress * (TOTAL_SECOND_FRAMES - 1)) + 1)
      );
      const img = getLoadedImageFrom(secondImagesRef.current, TOTAL_SECOND_FRAMES, secondFrame);
      if (img) {
        // Smoothly crossfade canvas to pure black as Section 4 completes (progress 0.85 -> 0.98)
        const alpha = progress > 0.85 ? Math.max(0, (0.98 - progress) / 0.13) : 1.0;
        drawCoverImage(img, alpha);
      }
    }
  }, [getLoadedImageFrom]);

  // Preload both sequence sets (Hero photographer + 2nd Animation)
  useEffect(() => {
    let isMounted = true;

    // 1. Preload Hero Frames
    const heroImgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_HERO_FRAMES; i++) {
      const img = new Image();
      img.src = getHeroFramePath(i);
      heroImgs.push(img);
    }
    heroImagesRef.current = heroImgs;

    // 2. Preload 2nd Animation Frames
    const secondImgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_SECOND_FRAMES; i++) {
      const img = new Image();
      img.src = getSecondAnimationPath(i);
      secondImgs.push(img);
    }
    secondImagesRef.current = secondImgs;

    // Trigger initial frame draw once canvas is ready
    const handleInitialLoad = () => {
      if (isMounted) drawCompositeFrame(0);
    };

    if (heroImgs[0]) {
      if (heroImgs[0].complete) {
        handleInitialLoad();
      } else {
        heroImgs[0].onload = handleInitialLoad;
      }
    }

    return () => {
      isMounted = false;
      heroImagesRef.current = [];
      secondImagesRef.current = [];
    };
  }, [drawCompositeFrame]);

  // Handle window resizing and Retina/4K DPR synchronization
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      drawCompositeFrame(currentProgressRef.current);
    }
  }, [drawCompositeFrame]);

  // Scroll listener & smooth inertial RAF loop for Sections 1, 2, 3, and 4
  useEffect(() => {
    resizeCanvas();

    const handleScroll = () => {
      const container = heroContainerRef.current;
      if (container) {
        const totalDistance = container.offsetHeight - window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const progress = totalDistance > 0 ? scrollY / totalDistance : 0;
        targetProgressRef.current = Math.min(1, Math.max(0, progress));
      }
      setIsScrolled((window.scrollY || window.pageYOffset || 0) > 40);
    };

    const handleResize = () => {
      resizeCanvas();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Inertial smoothing animation frame loop
    let isRunning = true;
    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.12;
        drawCompositeFrame(currentProgressRef.current);
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    handleScroll();
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawCompositeFrame, resizeCanvas]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentPath === '/services') {
    return (
      <div className="relative bg-black text-white selection:bg-white selection:text-black">
        <VideoCursor />
        <ServicesPage onNavigate={navigateTo} />
      </div>
    );
  }

  if (currentPath === '/work') {
    return (
      <div className="relative bg-black text-white selection:bg-white selection:text-black">
        <VideoCursor />
        <WorkPage onNavigate={navigateTo} />
      </div>
    );
  }

  if (currentPath === '/about') {
    return (
      <div className="relative bg-black text-white selection:bg-white selection:text-black">
        <VideoCursor />
        <AboutPage onNavigate={navigateTo} />
      </div>
    );
  }

  if (currentPath === '/contact') {
    return (
      <div className="relative bg-black text-white selection:bg-white selection:text-black">
        <VideoCursor />
        <ContactPage onNavigate={navigateTo} />
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white selection:bg-white selection:text-black">
      <VideoCursor />
      
      {/* Scroll Depth Progress Bar & Back to Top Indicator */}
      <ScrollProgressIndicator />

      {/* Unified 2026 Responsive Floating Header */}
      <Header currentPath={currentPath} onNavigate={navigateTo} />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full block pointer-events-none z-0"
        style={{ backgroundColor: '#000000' }}
      />

      <div className="fixed inset-0 bg-gradient-to-r from-black/88 via-transparent to-black/88 pointer-events-none z-[1] lg:from-black/90 lg:via-transparent lg:to-black/85" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none z-[1]" />

      <div ref={heroContainerRef} className="relative z-10 flex flex-col">
        {/* SECTION 1: Hero Section (Minimal, High-Impact Split Layout matching reference image) */}
        <section className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 pt-32 pb-8 select-none">
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-10">
            
            {/* LEFT COLUMN: Bold, Minimal Headline & Pillars */}
            <div className="w-full lg:w-5/12 max-w-lg space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-white">VIDEO EDITING & POST-PRODUCTION STUDIO</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-black tracking-[-0.04em] leading-[0.94] text-white uppercase drop-shadow-2xl">
                YOU SHOOT.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                  WE EDIT.
                </span>
              </h1>

              {/* Core Services */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-mono-tech text-neutral-300 tracking-[0.16em] uppercase font-bold pt-1">
                <span>YOUTUBE</span>
                <span className="text-amber-400">✦</span>
                <span>SHORT-FORM</span>
                <span className="text-amber-400">✦</span>
                <span>PODCASTS</span>
                <span className="text-amber-400">✦</span>
                <span>BRAND VIDEO</span>
              </div>
            </div>

            {/* CENTER COLUMN: Kept completely open for character in background scroll */}
            <div className="hidden lg:block lg:w-2/12 pointer-events-none" />

            {/* RIGHT COLUMN: Concise purpose statement & modern capsule CTA */}
            <div className="w-full lg:w-5/12 max-w-md space-y-5 lg:text-left">
              <p className="text-xs sm:text-sm font-mono-tech uppercase tracking-wider text-neutral-200 leading-relaxed max-w-sm">
                Professional video editing for creators and brands. Send us your footage and we'll turn it into a finished video that's ready to publish.
              </p>

              {/* Modern Capsule CTA */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigateTo('/contact')}
                    data-cursor="START"
                    className="group pl-6 pr-2 py-2 bg-white text-black font-bold text-xs sm:text-sm rounded-full hover:bg-neutral-100 transition-all flex items-center gap-4 shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] active:scale-95 cursor-pointer"
                  >
                    <span className="tracking-wider uppercase font-mono-tech font-extrabold text-xs">
                      GET STARTED
                    </span>
                    <span className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-md">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </button>

                  <button
                    onClick={() => scrollToSection('work')}
                    data-cursor="PLAY"
                    className="px-5 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/15 hover:border-white text-neutral-300 hover:text-white text-xs font-mono-tech uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current text-amber-400" />
                    <span>SEE OUR WORK</span>
                  </button>
                </div>

                {/* Microcopy */}
                <div className="flex items-center gap-3 text-[11px] font-mono-tech text-neutral-400">
                  <span className="text-neutral-300">
                    REAL EDITORS • CLEAR PROCESS • FINISHED VIDEOS
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM RIBBON: Hero supporting note */}
          <div className="w-full max-w-7xl mx-auto pt-2 pb-2">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-950/60 backdrop-blur-2xl border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-neutral-300 tracking-wider">
              <div className="flex items-center gap-2 text-white font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span>Based in India. Working with creators, businesses and brands wherever they are.</span>
              </div>
              <div className="flex items-center gap-6 text-neutral-400 font-mono-tech text-[11px] uppercase tracking-widest shrink-0">
                <span>YOUTUBE</span>
                <span>•</span>
                <span>REELS & SHORTS</span>
                <span>•</span>
                <span>PODCASTS</span>
                <span>•</span>
                <span>COMMERCIALS</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Undulating Wave Pipeline (Interactive on Scroll) */}
        <section id="process" className="relative lg:h-[220vh] select-none">
          <div className="sticky top-0 min-h-screen flex items-center px-6 sm:px-12 md:px-16 lg:px-20 py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full">
              <InteractiveProcessCards />
            </div>
          </div>
        </section>

        <SectionServices />

        {/* SECTION 4 — WHY KRITVIDEO (Vertical Cards Interactive on Scroll) */}
        <SectionWhyUs />
      </div>

      {/* SUBSEQUENT SECTIONS (Seamlessly flow directly into Section 5) */}
      <div className="relative z-20 bg-black">
        {/* Seamless Top Dissolve Blend overlapping Section 4 */}
        <div className="absolute -top-36 inset-x-0 h-36 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />

        {/* SECTION 5 — OUR WORK (Video Showcase Gallery) */}
        <SectionOurWork />

        {/* TESTIMONIALS SECTION (Matching 3-Card Carousel Design) */}
        <div id="testimonials">
          <SectionTestimonials />
        </div>

        {/* FAQ SECTION (Directly above CTA section) */}
        <div id="faq">
          <SectionFAQ />
        </div>

        {/* SECTION 6 — FINAL CTA & FOOTER */}
        <div id="contact">
          <SectionFinalCTAAndFooter onNavigate={navigateTo} />
        </div>
      </div>
    </div>
  );
}
