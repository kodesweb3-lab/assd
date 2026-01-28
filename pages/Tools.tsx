import React, { useState } from 'react';
import { FULL_INVENTORY } from '../constants';

const Tools: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories based on search
  const filteredCategories = FULL_INVENTORY.filter(category => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(query) ||
      category.items.some(item => item.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">
      {/* Header */}
      <header className="space-y-8 max-w-5xl">
        <div className="text-xs font-mono uppercase tracking-[0.6em] text-electric-blue mb-4">Research Domains</div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white font-display">Systems Legibility</h1>
        <p className="text-soft-slate text-2xl font-light leading-relaxed max-w-3xl">
          We reframe digital platforms as research domains. Our tools observe, measure, and analyze how signals interact with platform distribution thresholds.
        </p>
      </header>

      {/* Primary Disclaimer Banner */}
      <section className="p-10 border border-electric-blue/20 bg-electric-blue/5 glass-card">
        <div className="flex items-start gap-8">
          <div className="w-10 h-10 flex-shrink-0 border border-electric-blue flex items-center justify-center text-electric-blue font-bold text-sm">!</div>
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">Observational Instrument Disclaimer</h4>
            <p className="text-sm text-soft-slate leading-relaxed max-w-4xl">
              FAKE tools are built for research, observation, and responsible experimentation. FAKE does not provide automated engagement, artificial amplification, or guaranteed outcomes. The following categories represent our current observational surfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search domains or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-sm focus:outline-none focus:border-electric-blue/50 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-soft-slate/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Compact Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category, idx) => {
          const isExpanded = selectedCategory === category.title;
          const displayItems = isExpanded ? category.items : category.items.slice(0, 3);
          const hasMore = category.items.length > 3;

          return (
            <div
              key={idx}
              className={`glass-card border-white/5 p-6 space-y-4 group transition-all cursor-pointer ${
                isExpanded ? 'border-electric-blue/30 bg-electric-blue/5' : 'hover:border-electric-blue/20'
              }`}
              onClick={() => setSelectedCategory(isExpanded ? null : category.title)}
            >
              {/* Category Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono text-electric-blue uppercase tracking-widest leading-tight">
                    {category.title}
                  </h3>
                  {hasMore && (
                    <span className="text-[10px] font-mono text-soft-slate/40">
                      {isExpanded ? '−' : `+${category.items.length - 3}`}
                    </span>
                  )}
                </div>
                <div className="h-px w-8 bg-white/10" />
              </div>

              {/* Services List - Compact */}
              <div className="space-y-2">
                <ul className="space-y-1.5">
                  {displayItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-soft-slate group-hover:text-white/80 transition-colors"
                    >
                      <div className="w-0.5 h-0.5 bg-signal-purple/40 mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {hasMore && !isExpanded && (
                  <button className="text-[10px] font-mono text-electric-blue/60 hover:text-electric-blue uppercase tracking-wider mt-2">
                    View All
                  </button>
                )}
              </div>

              {/* Footer Note */}
              <div className="pt-4 border-t border-white/5 opacity-30">
                <p className="text-[9px] italic text-soft-slate leading-relaxed">
                  Research-intent monitoring active
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto text-center space-y-10 pt-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="space-y-6">
          <p className="text-soft-slate text-lg font-light leading-relaxed">
            Access to specific research protocols requires active Alpha Tek credentials. FAKE does not automate delivery or guarantee visibility metrics.
          </p>
          <button className="px-14 py-5 border border-white/10 text-[11px] font-mono tracking-[0.5em] uppercase text-soft-slate hover:text-white hover:border-electric-blue transition-all bg-midnight">
            Request_Protocol_Authorization
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Tools;
