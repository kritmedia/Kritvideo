import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  RefreshCw, 
  Truck, 
  ArrowLeft, 
  Printer, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  AlertCircle
} from 'lucide-react';
import Header from './Header';
import SectionFinalCTAAndFooter from './SectionFinalCTAAndFooter';
import ScrollProgressIndicator from './ScrollProgressIndicator';
import SEOHead from './SEOHead';
import { PolicyDocument, POLICIES, LEGAL_COMPANY_INFO } from '../data/legalContent';

interface PolicyLayoutProps {
  currentPolicyKey: 'terms' | 'refund' | 'privacy' | 'delivery';
  onNavigate: (path: string) => void;
}

const POLICY_TABS = [
  { key: 'terms', label: 'Terms of Service', path: '/terms', icon: FileText },
  { key: 'refund', label: 'Refund Policy', path: '/refund-policy', icon: RefreshCw },
  { key: 'privacy', label: 'Privacy & Security', path: '/privacy', icon: ShieldCheck },
  { key: 'delivery', label: 'Digital Delivery & SLA', path: '/delivery-policy', icon: Truck },
] as const;

export default function PolicyLayout({ currentPolicyKey, onNavigate }: PolicyLayoutProps) {
  const policy: PolicyDocument = POLICIES[currentPolicyKey] || POLICIES.terms;
  const [activeSectionId, setActiveSectionId] = useState<string>(policy.sections[0]?.id || '');

  // Scroll spy to highlight active section in TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (let i = policy.sections.length - 1; i >= 0; i--) {
        const section = policy.sections[i];
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSectionId(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [policy]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSectionId(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <SEOHead 
        title={`${policy.title} — KritVideo Studio`}
        description={policy.description}
        canonicalUrl={`https://kritvideo.com/${policy.slug}`}
      />

      <ScrollProgressIndicator />
      <Header currentPath={`/${policy.slug}`} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 border-b border-white/[0.08] bg-gradient-to-b from-[#100b05] via-[#070503] to-black overflow-hidden">
        {/* Ambient Warm Sunburst Halo */}
        <div 
          className="absolute top-0 inset-x-0 h-[500px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.05) 40%, rgba(0, 0, 0, 0) 70%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumbs & Back Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 text-xs font-mono-tech text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO STUDIO</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 hover:border-amber-400/40 text-xs font-mono-tech text-neutral-300 hover:text-amber-300 transition-all cursor-pointer shadow-sm"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
          </div>

          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.2em] text-amber-400 font-semibold px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>// {policy.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
              {policy.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal pt-1">
              {policy.description}
            </p>
          </div>

          {/* Metadata Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono-tech text-neutral-400 border-t border-white/[0.06]">
            <div>
              <span className="text-neutral-500 uppercase">EFFECTIVE:</span>{' '}
              <span className="text-neutral-300">{policy.effectiveDate}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase">LAST UPDATED:</span>{' '}
              <span className="text-amber-300 font-semibold">{policy.lastUpdated}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase">GOVERNING JURISDICTION:</span>{' '}
              <span className="text-neutral-300">India / International Commercial</span>
            </div>
          </div>

          {/* Policy Switcher Horizontal Pills */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-white/[0.06]">
            {POLICY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentPolicyKey === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onNavigate(tab.path)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-amber-400 text-black font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                      : 'bg-neutral-950/80 border border-white/10 text-neutral-300 hover:text-white hover:border-amber-400/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Desktop Left Sticky Sidebar (Table of Contents) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              <div className="p-5 rounded-2xl bg-[#0a0806] border border-white/10 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-mono-tech uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    CONTENTS
                  </span>
                  <span className="text-[10px] font-mono-tech text-neutral-500">
                    {policy.sections.length} SECTIONS
                  </span>
                </div>

                <nav className="space-y-1">
                  {policy.sections.map((section) => {
                    const isActive = activeSectionId === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/30'
                            : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                        }`}
                      >
                        <span className="truncate pr-2">{section.title}</span>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Legal Entity Card */}
              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/[0.08] space-y-3 text-xs">
                <span className="text-[10px] font-mono-tech text-amber-400 font-bold uppercase tracking-widest block">
                  // STUDIO LEGAL DESK
                </span>
                <p className="text-neutral-300 leading-relaxed font-normal">
                  Official inquiries, commercial NDA requests, and compliance matters are administered directly by studio management.
                </p>
                <div className="pt-2 space-y-1.5 font-mono-tech text-[11px] text-neutral-400 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-amber-400" />
                    <a href="mailto:legal@kritvideo.com" className="hover:text-amber-300 transition-colors">
                      {LEGAL_COMPANY_INFO.legalEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                    <span>Response SLA: &lt; 48 Hours</span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Main Column (Clauses) */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16">
            {policy.sections.map((section, idx) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-[#090705] border border-white/[0.09] hover:border-amber-400/30 transition-colors shadow-2xl space-y-5"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-[10px] font-mono-tech text-amber-300 font-bold">
                    SECTION {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {section.title}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3.5 ${
                    section.callout.type === 'tip'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                      : section.callout.type === 'warning'
                      ? 'bg-red-500/10 border-red-500/30 text-red-200'
                      : 'bg-neutral-900 border-white/10 text-neutral-200'
                  }`}>
                    {section.callout.type === 'tip' ? (
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    ) : section.callout.type === 'warning' ? (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    )}
                    <div>{section.callout.text}</div>
                  </div>
                )}
              </section>
            ))}

            {/* Bottom Inquiries Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-neutral-950 via-[#0a0805] to-neutral-950 border border-amber-500/20 text-center space-y-4">
              <div className="text-xs font-mono-tech uppercase tracking-widest text-amber-400 font-bold">
                ● TRANSPARENT PARTNERSHIPS
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Have specific contract or NDA requirements?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
                We regularly work with high-profile creators, corporate agencies, and venture-backed founders with custom enterprise service agreements.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono-tech tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 cursor-pointer"
                >
                  START A CONVERSATION ↗
                </button>
                <a
                  href={`mailto:${LEGAL_COMPANY_INFO.legalEmail}`}
                  className="px-6 py-3 rounded-full bg-neutral-900 border border-white/10 hover:border-white/30 text-xs font-mono-tech text-neutral-200 hover:text-white transition-all cursor-pointer"
                >
                  EMAIL LEGAL DESK
                </a>
              </div>
            </div>

          </main>

        </div>
      </div>

      {/* Footer (with hideCta={true} to keep legal pages clean) */}
      <SectionFinalCTAAndFooter onNavigate={onNavigate} hideCta={true} />
    </div>
  );
}
