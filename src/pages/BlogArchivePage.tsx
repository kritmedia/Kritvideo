import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, 
  Search, 
  Clock, 
  Calendar, 
  Sparkles, 
  Tag, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  Sliders,
  Play,
  Film
} from 'lucide-react';
import Header from '../components/Header';
import SectionFinalCTAAndFooter from '../components/SectionFinalCTAAndFooter';
import ScrollProgressIndicator from '../components/ScrollProgressIndicator';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import SEOHead from '../components/SEOHead';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogCategory, BlogPost } from '../data/blogPosts';

interface BlogArchivePageProps {
  onNavigate: (path: string) => void;
}

export default function BlogArchivePage({ onNavigate }: BlogArchivePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      <SEOHead
        title="Video Production & Retention Editing Blog — KritVideo"
        description="Explore in-depth playbooks on YouTube retention editing, DaVinci Resolve ACES color grading, audio engineering (-14 LUFS), and short-form repurposing from the KritVideo team."
        canonical="https://kritvideo.com/blog"
        keywords="video editing blog, youtube retention editing guide, davinci resolve color science, audio mastering lufs, viral shorts repurposing, video editing playbooks"
      />

      <ScrollProgressIndicator />
      <Header currentPath="/blog" onNavigate={onNavigate} />
      <FloatingWhatsAppButton />

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-[140px] rounded-full" />
      </div>

      <main className="relative z-10 pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono-tech text-amber-400 uppercase tracking-widest mb-6 shadow-inner">
            <Sparkles className="w-3 h-3" />
            <span>KritVideo Editorial & Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
            Insights on <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">Retention</span>, Color Science & Sound.
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Deep-dive guides, engineering breakdowns, and tactical editing strategies used by our lead editors to cut videos that captivate millions of viewers.
          </p>

          {/* Search & Filter Controls */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-neutral-500 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search retention, DaVinci Resolve, LUFS, pacing..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-neutral-900/70 border border-neutral-800 focus:border-amber-400/80 focus:ring-2 focus:ring-amber-400/20 text-sm text-white placeholder-neutral-500 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-mono-tech text-neutral-400 hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-tech transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              ALL ({BLOG_POSTS.length})
            </button>
            {BLOG_CATEGORIES.map((cat) => {
              const count = BLOG_POSTS.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono-tech transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {cat.toUpperCase()} ({count})
                </button>
              );
            })}
          </div>
        </section>

        {/* FEATURED SPOTLIGHT ARTICLE (Shown when category is All and no search) */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <section className="mb-16">
            <div className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>FEATURED PLAYBOOK</span>
            </div>

            <div 
              onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800/90 hover:border-amber-400/60 overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(251,191,36,0.12)] grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Media Preview */}
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-neutral-900">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-950" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-[11px] font-mono-tech text-amber-300 uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Text Container */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono-tech text-neutral-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      {featuredPost.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight leading-snug mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0 p-0.5">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">{featuredPost.author.name}</div>
                      <div className="text-[10px] text-neutral-500 font-mono-tech">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-amber-400 group-hover:translate-x-1 transition-transform">
                    READ PLAYBOOK
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ARTICLES GRID */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-900">
            <h2 className="text-sm font-mono-tech uppercase tracking-widest text-neutral-400">
              {searchQuery ? `Search Results (${filteredPosts.length})` : selectedCategory === 'All' ? 'All Publications' : `${selectedCategory} Articles (${filteredPosts.length})`}
            </h2>
            <span className="text-xs font-mono-tech text-neutral-500">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 rounded-2xl bg-neutral-950/40 border border-neutral-900">
              <BookOpen className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No articles found</h3>
              <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
                We couldn’t find any articles matching "{searchQuery}". Try searching for another topic or clear the filter.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-5 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-mono-tech text-white transition-colors"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="group cursor-pointer rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-amber-400/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(251,191,36,0.08)]"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-52 overflow-hidden bg-neutral-900">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neutral-700 text-[10px] font-mono-tech text-neutral-300 uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] font-mono-tech text-neutral-500 mb-3">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer Author & CTA */}
                  <div className="px-6 pb-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono-tech">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0 p-0.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span className="text-neutral-400 text-[11px] truncate max-w-[130px]">{post.author.name}</span>
                    </div>

                    <span className="text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                      READ <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* STUDIO CONSULTATION BANNER */}
        <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-amber-500/20 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono-tech text-amber-400 uppercase tracking-widest block mb-3">
              // SCALING CREATOR PIPELINES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Want our lead editors cutting your next video?
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-8">
              We engineer 48-hour delivery video pipelines with DaVinci Resolve color science, spatial audio mastering, and micro-pacing for channels and brands worldwide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono-tech tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:scale-105 cursor-pointer"
              >
                REQUEST A PROJECT QUOTE
              </button>
              <button
                onClick={() => onNavigate('/work')}
                className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-mono-tech tracking-wider uppercase transition-all cursor-pointer"
              >
                EXPLORE PORTFOLIO
              </button>
            </div>
          </div>
        </section>
      </main>

      <SectionFinalCTAAndFooter onNavigate={onNavigate} />
    </div>
  );
}
