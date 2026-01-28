import React, { useState, useMemo } from 'react';
import { PLATFORM_SERVICES, getServicesByCategory, searchServices } from '../data/services';
import type { PlatformService } from '../types';

const Tools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlatformService['category'] | 'all'>('all');
  const [expandedPlatforms, setExpandedPlatforms] = useState<Set<string>>(new Set());
  const [expandedCapabilities, setExpandedCapabilities] = useState<Set<string>>(new Set());

  // Filter services
  const filteredServices = useMemo(() => {
    let services = PLATFORM_SERVICES;

    // Filter by category
    if (selectedCategory !== 'all') {
      services = getServicesByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      services = searchServices(searchQuery).filter(service =>
        selectedCategory === 'all' || service.category === selectedCategory
      );
    }

    return services;
  }, [searchQuery, selectedCategory]);

  const togglePlatform = (platformId: string) => {
    const newExpanded = new Set(expandedPlatforms);
    if (newExpanded.has(platformId)) {
      newExpanded.delete(platformId);
    } else {
      newExpanded.add(platformId);
    }
    setExpandedPlatforms(newExpanded);
  };

  const toggleCapability = (capabilityId: string) => {
    const newExpanded = new Set(expandedCapabilities);
    if (newExpanded.has(capabilityId)) {
      newExpanded.delete(capabilityId);
    } else {
      newExpanded.add(capabilityId);
    }
    setExpandedCapabilities(newExpanded);
  };

  const categories: Array<{ value: PlatformService['category'] | 'all'; label: string }> = [
    { value: 'all', label: 'All Platforms' },
    { value: 'social', label: 'Social Platforms' },
    { value: 'streaming', label: 'Streaming & Creator' },
    { value: 'content', label: 'Content & Media' },
    { value: 'crypto', label: 'Crypto & NFT' },
    { value: 'messaging', label: 'Messaging' },
    { value: 'traffic', label: 'Traffic & Specialized' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-24 space-y-8 sm:space-y-12 md:space-y-16">
      {/* Header */}
      <header className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl">
        <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.6em] text-electric-blue mb-3 sm:mb-4">Research Domains</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white font-display">Systems Legibility</h1>
        <p className="text-soft-slate text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl">
          We reframe digital platforms as research domains. Our tools observe, measure, and analyze how signals interact with platform distribution thresholds.
        </p>
      </header>

      {/* Primary Disclaimer Banner */}
      <section className="p-4 sm:p-6 md:p-10 border border-electric-blue/20 bg-electric-blue/5 glass-card">
        <div className="flex items-start gap-3 sm:gap-4 md:gap-8">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 border border-electric-blue flex items-center justify-center text-electric-blue font-bold text-[10px] sm:text-xs md:text-sm">!</div>
          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <h4 className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white">Observational Instrument Disclaimer</h4>
            <p className="text-[11px] sm:text-xs md:text-sm text-soft-slate leading-relaxed max-w-4xl">
              FAKE tools are built for research, observation, and responsible experimentation. FAKE does not provide automated engagement, artificial amplification, or guaranteed outcomes. The following categories represent our current observational surfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Controls */}
      <div className="space-y-4 sm:space-y-6">
        {/* Search Bar */}
        <div className="max-w-2xl w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search platforms, capabilities, or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-xs sm:text-sm focus:outline-none focus:border-electric-blue/50 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-soft-slate/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all border ${
                selectedCategory === cat.value
                  ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                  : 'border-white/10 text-soft-slate hover:border-white/20 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {filteredServices.length > 0 && (
          <div className="text-[10px] sm:text-xs font-mono text-soft-slate/60 uppercase tracking-wider">
            {filteredServices.length} {filteredServices.length === 1 ? 'Platform' : 'Platforms'} Found
          </div>
        )}
      </div>

      {/* Services List - Accordion Style */}
      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 text-soft-slate">
            <p className="text-lg font-light">No platforms found matching your criteria.</p>
            <p className="text-sm mt-2 font-mono uppercase tracking-wider opacity-60">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredServices.map((platform) => {
            const isPlatformExpanded = expandedPlatforms.has(platform.id);
            const capabilityCount = platform.capabilities.reduce((sum, cap) => sum + cap.variants.length, 0);

            return (
              <div
                key={platform.id}
                className="glass-card border-white/5 overflow-hidden transition-all hover:border-electric-blue/20"
              >
                {/* Platform Header - Clickable */}
                <button
                  onClick={() => togglePlatform(platform.id)}
                  className="w-full p-3 sm:p-4 md:p-6 text-left flex items-start justify-between gap-2 sm:gap-3 md:gap-4 group"
                >
                  <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white font-display break-words">{platform.name}</h3>
                      {platform.launchStatus === 'day1' && (
                        <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-electric-blue/20 text-electric-blue border border-electric-blue/30">
                          Day-1
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs md:text-sm text-soft-slate leading-relaxed max-w-3xl break-words">
                      {platform.description}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 text-[9px] sm:text-[10px] md:text-xs font-mono text-soft-slate/60 uppercase tracking-wider flex-wrap">
                      <span>{platform.capabilities.length} {platform.capabilities.length === 1 ? 'Capability' : 'Capabilities'}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{capabilityCount} {capabilityCount === 1 ? 'Variant' : 'Variants'}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-electric-blue/60 group-hover:text-electric-blue transition-colors">
                    <svg
                      className={`w-5 h-5 transition-transform ${isPlatformExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Platform Content - Expandable */}
                {isPlatformExpanded && (
                  <div className="border-t border-white/5 p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {platform.capabilities.map((capability, capIdx) => {
                      const capabilityId = `${platform.id}-${capIdx}`;
                      const isCapabilityExpanded = expandedCapabilities.has(capabilityId);

                      return (
                        <div key={capIdx} className="space-y-3">
                          {/* Capability Header */}
                          <button
                            onClick={() => toggleCapability(capabilityId)}
                            className="w-full flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-px w-8 bg-electric-blue/40" />
                              <h4 className="text-sm font-mono uppercase tracking-wider text-electric-blue">
                                {capability.category}
                              </h4>
                              <span className="text-xs font-mono text-soft-slate/60">
                                ({capability.variants.length})
                              </span>
                            </div>
                            <svg
                              className={`w-4 h-4 text-soft-slate/60 transition-transform ${isCapabilityExpanded ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Variants List - Expandable */}
                          {isCapabilityExpanded && (
                            <div className="pl-11 space-y-2">
                              {capability.variants.map((variant, varIdx) => (
                                <div
                                  key={varIdx}
                                  className="flex items-start gap-3 py-1.5 text-sm text-soft-slate hover:text-white/80 transition-colors"
                                >
                                  <div className="w-0.5 h-0.5 bg-signal-purple/40 mt-2 flex-shrink-0" />
                                  <span className="leading-relaxed">{variant.name}</span>
                                  {variant.regions && variant.regions.length > 0 && (
                                    <span className="text-xs font-mono text-soft-slate/40">
                                      ({variant.regions.join(', ')})
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
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
