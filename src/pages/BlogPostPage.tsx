import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Bookmark,
  Quote,
  Zap,
  Film,
  ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import SectionFinalCTAAndFooter from '../components/SectionFinalCTAAndFooter';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import SEOHead from '../components/SEOHead';
import NotFoundPage from './NotFoundPage';
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogPosts';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const post = getBlogPostBySlug(slug);

  // If slug doesn't exist, return 404 page
  if (!post) {
    return <NotFoundPage onNavigate={onNavigate} />;
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);

  // Inject Schema.org Article Structured Data
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "image": post.coverImage,
      "datePublished": "2026-09-01T08:00:00+05:30",
      "dateModified": "2026-09-06T10:00:00+05:30",
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "KritVideo",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kritvideo.com/kritvideo-logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://kritvideo.com/blog/${post.slug}`
      }
    };

    let script = document.getElementById('schema-article') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'schema-article';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById('schema-article');
      if (el) el.remove();
    };
  }, [post]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      <SEOHead
        title={`${post.title} — KritVideo`}
        description={post.metaDescription}
        canonical={`https://kritvideo.com/blog/${post.slug}`}
        keywords={post.keywords}
        ogType="article"
        ogImage={post.coverImage}
      />

      <ScrollProgressIndicator />
      <Header currentPath={`/blog/${post.slug}`} onNavigate={onNavigate} />
      <FloatingWhatsAppButton />

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* TOP NAVIGATION BREADCRUMB */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ARTICLES</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 text-xs font-mono-tech text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <Share2 className="w-3 h-3" />
            <span>SHARE</span>
          </button>
        </div>

        {/* ARTICLE HEADER */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono-tech text-amber-400 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-mono-tech text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {post.publishedAt}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-mono-tech text-neutral-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed font-normal mb-8">
            {post.subtitle}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3.5 py-4 border-y border-neutral-900">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover border border-neutral-700"
            />
            <div>
              <div className="text-sm font-semibold text-white">{post.author.name}</div>
              <div className="text-xs text-neutral-400 font-mono-tech">{post.author.role}</div>
            </div>
          </div>
        </header>

        {/* FEATURED COVER MEDIA */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800/80 mb-12 shadow-2xl bg-neutral-950">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-[320px] sm:h-[460px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-xs font-mono-tech text-neutral-400 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center justify-between">
            <span>KritVideo Editorial Suite • Field Analysis</span>
            <span className="text-amber-400">STUDIO MASTER</span>
          </div>
        </div>

        {/* KEY TAKEAWAYS CALLOUT BOX */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <aside className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900/60 to-neutral-950 border border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.06)]">
            <div className="flex items-center gap-2.5 text-xs font-mono-tech text-amber-400 uppercase tracking-widest mb-4">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>KEY TAKEAWAYS & PLAYBOOK SUMMARY</span>
            </div>

            <ul className="space-y-3">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* EDITORIAL CONTENT */}
        <article className="prose prose-invert max-w-none space-y-12">
          {post.content.map((section, sIdx) => (
            <section key={sIdx} className="space-y-6">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white border-b border-neutral-900 pb-3">
                  {section.heading}
                </h2>
              )}

              {section.subheading && (
                <h3 className="text-lg sm:text-xl font-semibold text-amber-300">
                  {section.subheading}
                </h3>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                  {p}
                </p>
              ))}

              {/* Callout Quote */}
              {section.callout && (
                <blockquote className="my-8 p-6 sm:p-7 rounded-2xl bg-neutral-950 border-l-4 border-amber-400 border-t border-r border-b border-neutral-800/80 shadow-lg">
                  <div className="text-xs font-mono-tech text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Quote className="w-3.5 h-3.5" />
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-base sm:text-lg italic text-neutral-200 leading-relaxed font-serif">
                    "{section.callout.quote}"
                  </p>
                </blockquote>
              )}

              {/* Bullet Points */}
              {section.bulletPoints && (
                <div className="my-6 p-5 sm:p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-3">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <div key={bpIdx} className="flex items-start gap-3 text-sm sm:text-base text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pro Tip Box */}
              {section.proTip && (
                <div className="my-8 p-5 sm:p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-4">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono-tech uppercase tracking-wider text-amber-400 block mb-1 font-semibold">
                      STUDIO PRO TIP
                    </span>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {section.proTip}
                    </p>
                  </div>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* AUTHOR SIGNATURE CARD */}
        <section className="mt-16 p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/40"
          />
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h3 className="text-base font-bold text-white">{post.author.name}</h3>
              <span className="text-xs font-mono-tech text-amber-400">• {post.author.role}</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
              KritVideo is an elite video post-production studio helping creators and brands cut high-retention YouTube content, viral social reels, and commercial campaigns with 48-hour delivery.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <button
                onClick={() => onNavigate('/about')}
                className="text-xs font-mono-tech text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                ABOUT OUR STUDIO <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* MID-PAGE CONVERSION CTA */}
        <section className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-amber-500/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest block mb-2">
              TIRED OF LOW RETENTION & EDITING FATIGUE?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Let our lead editors handle your next cut.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Skip the sleepless nights in Premiere. Get dedicated studio editors, DaVinci Resolve color, and guaranteed 48-hour delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono-tech uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(251,191,36,0.25)] hover:scale-105 cursor-pointer"
              >
                DISCUSS YOUR PROJECT
              </button>
              <button
                onClick={() => onNavigate('/work')}
                className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer"
              >
                WATCH PORTFOLIO REELS
              </button>
            </div>
          </div>
        </section>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-900">
              <h2 className="text-sm font-mono-tech uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>RELATED PLAYBOOKS</span>
              </h2>
              <button
                onClick={() => onNavigate('/blog')}
                className="text-xs font-mono-tech text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                VIEW ALL <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.slug}
                  onClick={() => onNavigate(`/blog/${rPost.slug}`)}
                  className="group cursor-pointer rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-amber-400/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="relative h-40 overflow-hidden bg-neutral-900">
                      <img
                        src={rPost.coverImage}
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-black/80 text-[10px] font-mono-tech text-neutral-300 uppercase">
                          {rPost.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-[10px] font-mono-tech text-neutral-500 mb-2">
                        {rPost.readTime}
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                        {rPost.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 pt-0 text-[11px] font-mono-tech text-amber-400 flex items-center gap-1">
                    READ ARTICLE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <SectionFinalCTAAndFooter onNavigate={onNavigate} />
    </div>
  );
}
