import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import Header from './components/Header';
import VideoCursor from './components/VideoCursor';
import InteractiveProcessCards from './components/InteractiveProcessCards';
import SectionServices from './components/SectionServices';
import SectionWhyUs from './components/SectionWhyUs';
import SectionOurWork from './components/SectionOurWork';
import SectionTestimonials from './components/SectionTestimonials';
import SectionFAQ from './components/SectionFAQ';
import SectionFinalCTAAndFooter from './components/SectionFinalCTAAndFooter';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import SEOHead from './components/SEOHead';

// Code-split subpage bundles with React.lazy
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const WorkPage = React.lazy(() => import('./pages/WorkPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const BlogArchivePage = React.lazy(() => import('./pages/BlogArchivePage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

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

const normalizePath = (pathname: string, hash: string): string => {
  const p = (pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
  const h = (hash || '').toLowerCase();

  // Hash-based overrides (e.g. #/services, #/work, #/blog)
  if (h.startsWith('#/services')) return '/services';
  if (h.startsWith('#/work')) return '/work';
  if (h.startsWith('#/about')) return '/about';
  if (h.startsWith('#/contact')) return '/contact';
  if (h.startsWith('#/blog')) return h.replace('#', '');

  // Primary path routing
  if (p === '/' || p === '') return '/';
  if (p === '/services') return '/services';
  if (p === '/work') return '/work';
  if (p === '/about') return '/about';
  if (p === '/contact') return '/contact';
  if (p === '/blog') return '/blog';
  if (p.startsWith('/blog/')) return p;

  // Any other path is 404
  return '/404';
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const heroImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_HERO_FRAMES).fill(null));
  const secondImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_SECOND_FRAMES).fill(null));

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname, window.location.hash);
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(normalizePath(window.location.pathname, window.location.hash));
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    const hashIndex = path.indexOf('#');
    const hash = hashIndex !== -1 ? path.substring(hashIndex) : '';
    const basePath = hashIndex !== -1 ? path.substring(0, hashIndex) : path;
    const targetRoute = normalizePath(basePath, hash);

    if (targetRoute === '/services') {
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
    } else if (targetRoute === '/work') {
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
    } else if (targetRoute === '/about') {
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
    } else if (targetRoute === '/contact') {
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
    } else if (targetRoute === '/blog' || targetRoute.startsWith('/blog/')) {
      window.history.pushState({}, '', targetRoute + hash);
      setCurrentPath(targetRoute);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (targetRoute === '/') {
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
    } else {
      window.history.pushState({}, '', path);
      setCurrentPath('/404');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Helper to load an individual hero frame on demand
  const loadHeroFrame = useCallback((frameNumber: number, highPriority = false) => {
    const idx = frameNumber - 1;
    if (idx < 0 || idx >= TOTAL_HERO_FRAMES) return;
    if (!heroImagesRef.current[idx]) {
      const img = new Image();
      if (highPriority) {
        (img as any).fetchPriority = 'high';
      }
      img.src = getHeroFramePath(frameNumber);
      heroImagesRef.current[idx] = img;
    }
  }, []);

  // Helper to load an individual second animation frame on demand
  const loadSecondFrame = useCallback((frameNumber: number) => {
    const idx = frameNumber - 1;
    if (idx < 0 || idx >= TOTAL_SECOND_FRAMES) return;
    if (!secondImagesRef.current[idx]) {
      const img = new Image();
      img.src = getSecondAnimationPath(frameNumber);
      secondImagesRef.current[idx] = img;
    }
  }, []);

  // Helper to prefetch a range of hero frames
  const prefetchHeroRange = useCallback((start: number, end: number) => {
    const s = Math.max(1, start);
    const e = Math.min(TOTAL_HERO_FRAMES, end);
    for (let i = s; i <= e; i++) {
      loadHeroFrame(i);
    }
  }, [loadHeroFrame]);

  // Helper to prefetch a range of second animation frames
  const prefetchSecondRange = useCallback((start: number, end: number) => {
    const s = Math.max(1, start);
    const e = Math.min(TOTAL_SECOND_FRAMES, end);
    for (let i = s; i <= e; i++) {
      loadSecondFrame(i);
    }
  }, [loadSecondFrame]);

  // Helper to retrieve nearest loaded frame from a sequence
  const getLoadedImageFrom = useCallback((images: (HTMLImageElement | null)[], total: number, index: number): HTMLImageElement | null => {
    if (!images || images.length === 0) return null;
    const clampedIndex = Math.max(1, Math.min(total, index)) - 1;
    const direct = images[clampedIndex];
    if (direct && direct.complete && direct.naturalWidth > 0) return direct;

    for (let offset = 1; offset < total; offset++) {
      const left = clampedIndex - offset;
      if (left >= 0 && images[left] && images[left]!.complete && images[left]!.naturalWidth > 0) {
        return images[left];
      }
      const right = clampedIndex + offset;
      if (right < total && images[right] && images[right]!.complete && images[right]!.naturalWidth > 0) {
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

    // SEQUENCE 1: Hero (Photographer, 240 frames): Progress 0.0 -> 0.48
    // TRANSITION: Crossfade 0.48 -> 0.52
    // SEQUENCE 2: 2nd Animation (239 frames): Progress 0.52 -> 1.0

    if (progress <= 0.48) {
      const heroFrame = Math.min(
        TOTAL_HERO_FRAMES,
        Math.max(1, Math.round((progress / 0.48) * (TOTAL_HERO_FRAMES - 1)) + 1)
      );
      const img = getLoadedImageFrom(heroImagesRef.current, TOTAL_HERO_FRAMES, heroFrame);
      if (img) drawCoverImage(img, 1.0);
    } else if (progress > 0.48 && progress < 0.52) {
      const crossfade = (progress - 0.48) / 0.04;
      const heroImg = getLoadedImageFrom(heroImagesRef.current, TOTAL_HERO_FRAMES, TOTAL_HERO_FRAMES);
      const secondImg = getLoadedImageFrom(secondImagesRef.current, TOTAL_SECOND_FRAMES, 1);

      if (heroImg) drawCoverImage(heroImg, 1.0 - crossfade);
      if (secondImg) drawCoverImage(secondImg, crossfade);
    } else {
      const secondProgress = (progress - 0.52) / (1.0 - 0.52);
      const secondFrame = Math.min(
        TOTAL_SECOND_FRAMES,
        Math.max(1, Math.round(secondProgress * (TOTAL_SECOND_FRAMES - 1)) + 1)
      );
      const img = getLoadedImageFrom(secondImagesRef.current, TOTAL_SECOND_FRAMES, secondFrame);
      if (img) {
        const alpha = progress > 0.85 ? Math.max(0, (0.98 - progress) / 0.13) : 1.0;
        drawCoverImage(img, alpha);
      }
    }
  }, [getLoadedImageFrom]);

  // Progressive, non-blocking frame preloading strategy
  useEffect(() => {
    let isMounted = true;

    // 1. Instantly request Frame 1 with high priority
    loadHeroFrame(1, true);

    const firstImg = heroImagesRef.current[0];
    const handleInitialLoad = () => {
      if (isMounted) drawCompositeFrame(0);
      // 2. Buffer next 10 frames after Frame 1 has loaded
      prefetchHeroRange(2, 12);
    };

    if (firstImg) {
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        handleInitialLoad();
      } else {
        firstImg.onload = handleInitialLoad;
      }
    }

    // 3. Progressive idle background preloading: load 4 frames per idle cycle
    let currentIdleHero = 13;
    let idleTimer: any = null;

    const loadNextIdleBatch = () => {
      if (!isMounted) return;
      if (currentIdleHero <= TOTAL_HERO_FRAMES) {
        prefetchHeroRange(currentIdleHero, currentIdleHero + 3);
        currentIdleHero += 4;
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          idleTimer = (window as any).requestIdleCallback(loadNextIdleBatch, { timeout: 1200 });
        } else {
          idleTimer = setTimeout(loadNextIdleBatch, 80);
        }
      }
    };

    // Begin idle loading 1.5s after mount so initial paint, hydration, and fonts finish without contention
    const initialIdleDelay = setTimeout(() => {
      loadNextIdleBatch();
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(initialIdleDelay);
      if (idleTimer) {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          (window as any).cancelIdleCallback(idleTimer);
        } else {
          clearTimeout(idleTimer);
        }
      }
    };
  }, [drawCompositeFrame, loadHeroFrame, prefetchHeroRange]);

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

      // Scroll-driven adaptive lookahead prefetching
      const progress = currentProgressRef.current;
      if (progress <= 0.48) {
        const heroFrame = Math.min(
          TOTAL_HERO_FRAMES,
          Math.max(1, Math.round((progress / 0.48) * (TOTAL_HERO_FRAMES - 1)) + 1)
        );
        prefetchHeroRange(heroFrame - 2, heroFrame + 10);
        if (progress > 0.35) {
          prefetchSecondRange(1, 15);
        }
      } else {
        const secondProgress = (progress - 0.52) / (1.0 - 0.52);
        const secondFrame = Math.min(
          TOTAL_SECOND_FRAMES,
          Math.max(1, Math.round(secondProgress * (TOTAL_SECOND_FRAMES - 1)) + 1)
        );
        prefetchSecondRange(secondFrame - 2, secondFrame + 10);
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
  }, [drawCompositeFrame, resizeCanvas, prefetchHeroRange, prefetchSecondRange]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentPath === '/services') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative bg-black text-white selection:bg-white selection:text-black">
          <VideoCursor />
          <ServicesPage onNavigate={navigateTo} />
        </div>
      </Suspense>
    );
  }

  if (currentPath === '/work') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative bg-black text-white selection:bg-white selection:text-black">
          <VideoCursor />
          <WorkPage onNavigate={navigateTo} />
        </div>
      </Suspense>
    );
  }

  if (currentPath === '/about') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative bg-black text-white selection:bg-white selection:text-black">
          <VideoCursor />
          <AboutPage onNavigate={navigateTo} />
        </div>
      </Suspense>
    );
  }

  if (currentPath === '/contact') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative bg-black text-white selection:bg-white selection:text-black">
          <VideoCursor />
          <ContactPage onNavigate={navigateTo} />
        </div>
      </Suspense>
    );
  }

  if (currentPath === '/blog') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative bg-black text-white selection:bg-white selection:text-black">
          <VideoCursor />
          <BlogArchivePage onNavigate={navigateTo} />
        </div>
      </Suspense>
    );
  }

  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative bg-black text-white selection:bg-white selection:text-black">
          <VideoCursor />
          <BlogPostPage slug={slug} onNavigate={navigateTo} />
        </div>
      </Suspense>
    );
  }

  if (currentPath === '/404') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative bg-black text-white selection:bg-white selection:text-black">
          <VideoCursor />
          <NotFoundPage onNavigate={navigateTo} />
        </div>
      </Suspense>
    );
  }

  return (
    <div className="relative bg-black text-white selection:bg-white selection:text-black">
      <SEOHead
        title="KritVideo — High-Retention Video Editing Studio for Creators & Brands"
        description="Scale your YouTube channel with dedicated lead video editors. We cut high-retention long-form videos, viral Shorts, and commercial ads with guaranteed 48-hour delivery."
        canonical="https://kritvideo.com/"
      />
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
                Dedicated video editing for YouTube creators and brands. Send raw footage — get high-retention cuts delivered in 48 hours.
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
                    48H DELIVERY • DAVINCI COLOR • BESPOKE CRAFT
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
                <span>Global video editing studio • Fast turnaround • Production-ready delivery</span>
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
        <section id="process" className="relative lg:h-[220vh] select-none py-10 lg:py-0">
          <div className="lg:sticky lg:top-0 lg:min-h-screen flex items-center px-4 sm:px-12 md:px-16 lg:px-20 py-8 lg:py-16 overflow-hidden">
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
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 1000px' }}>
          <SectionOurWork />
        </div>

        {/* TESTIMONIALS SECTION (Matching 3-Card Carousel Design) */}
        <div id="testimonials" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <SectionTestimonials />
        </div>

        {/* FAQ SECTION (Directly above CTA section) */}
        <div id="faq" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <SectionFAQ />
        </div>

        {/* SECTION 6 — FINAL CTA & FOOTER */}
        <div id="contact" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <SectionFinalCTAAndFooter onNavigate={navigateTo} />
        </div>
      </div>
    </div>
  );
}
