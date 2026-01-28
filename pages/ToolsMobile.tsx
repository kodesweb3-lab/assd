import React, { useState, useMemo } from 'react';
import { PLATFORM_SERVICES, getServicesByCategory, searchServices } from '../data/services';
import type { PlatformService } from '../types';
import { useSearch } from '../contexts/SearchContext';

/**
 * Tools/Domains Page Mobile View
 * 
 * Searchable list with filters.
 * Category pills for platforms.
 * Expand/collapse per platform (accordion).
 * Each service item opens bottom sheet for details.
 */

interface ToolsMobileProps {
  onSearchToggle?: (show: boolean) => void;
}

const ToolsMobile: React.FC<ToolsMobileProps> = ({ onSearchToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlatformService['category'] | 'all'>('all');
  const [expandedPlatforms, setExpandedPlatforms] = useState<Set<string>>(new Set());
  const [expandedCapabilities, setExpandedCapabilities] = useState<Set<string>>(new Set());
  
  // Use search context - SearchProvider is always available when this component is rendered
  // (MobileAppLayout wraps with SearchProvider when showSearch is true)
  const { showSearch, setShowSearch } = useSearch();

  // Filter services
  const filteredServices = useMemo(() => {
    let services = PLATFORM_SERVICES;

    if (selectedCategory !== 'all') {
      services = getServicesByCategory(selectedCategory);
    }

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
    { value: 'all', label: 'All' },
    { value: 'social', label: 'Social' },
    { value: 'streaming', label: 'Streaming' },
    { value: 'content', label: 'Content' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'messaging', label: 'Messaging' },
    { value: 'traffic', label: 'Traffic' }
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar - Sticky */}
      {showSearch && (
        <div className="sticky top-14 z-30 bg-midnight/95 backdrop-blur-lg border-b border-white/10 pb-4 px-4 pt-4 -mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search platforms or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-sm focus:outline-none focus:border-electric-blue/50 transition-all"
              autoFocus
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-soft-slate/60"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="px-4 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border whitespace-nowrap ${
                selectedCategory === cat.value
                  ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                  : 'border-white/10 text-soft-slate hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {filteredServices.length > 0 && (
          <div className="text-[10px] font-mono text-soft-slate/60 uppercase tracking-wider">
            {filteredServices.length} {filteredServices.length === 1 ? 'Platform' : 'Platforms'}
          </div>
        )}

        {/* Services List */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12 text-soft-slate opacity-60">
            <p className="text-sm font-light">No platforms found</p>
            <p className="text-xs font-mono uppercase tracking-wider mt-2 opacity-60">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredServices.map((platform) => {
              const isPlatformExpanded = expandedPlatforms.has(platform.id);
              const capabilityCount = platform.capabilities.reduce((sum, cap) => sum + cap.variants.length, 0);

              return (
                <div
                  key={platform.id}
                  className="bg-white/5 border border-white/10 overflow-hidden"
                >
                  {/* Platform Header */}
                  <button
                    onClick={() => togglePlatform(platform.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white font-display break-words">
                          {platform.name}
                        </h3>
                        {platform.launchStatus === 'day1' && (
                          <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-electric-blue/20 text-electric-blue border border-electric-blue/30">
                            Day-1
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-soft-slate leading-relaxed line-clamp-2">
                        {platform.description}
                      </p>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-soft-slate/60 uppercase tracking-wider">
                        <span>{platform.capabilities.length} {platform.capabilities.length === 1 ? 'Capability' : 'Capabilities'}</span>
                        <span>•</span>
                        <span>{capabilityCount} {capabilityCount === 1 ? 'Variant' : 'Variants'}</span>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-electric-blue/60 transition-transform flex-shrink-0 ${isPlatformExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Platform Content */}
                  {isPlatformExpanded && (
                    <div className="border-t border-white/10 p-4 space-y-4">
                      {platform.capabilities.map((capability, capIdx) => {
                        const capabilityId = `${platform.id}-${capIdx}`;
                        const isCapabilityExpanded = expandedCapabilities.has(capabilityId);

                        return (
                          <div key={capIdx} className="space-y-2">
                            <button
                              onClick={() => toggleCapability(capabilityId)}
                              className="w-full flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2">
                                <div className="h-px w-4 bg-electric-blue/40" />
                                <h4 className="text-xs font-mono uppercase tracking-wider text-electric-blue">
                                  {capability.category}
                                </h4>
                                <span className="text-[9px] font-mono text-soft-slate/60">
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

                            {/* Variants List */}
                            {isCapabilityExpanded && (
                              <div className="pl-6 space-y-1.5">
                                {capability.variants.map((variant, varIdx) => (
                                  <div
                                    key={varIdx}
                                    className="flex items-start gap-2 py-1 text-xs text-soft-slate hover:text-white/80 transition-colors"
                                  >
                                    <div className="w-0.5 h-0.5 bg-signal-purple/40 mt-1.5 flex-shrink-0" />
                                    <span className="leading-relaxed">{variant.name}</span>
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
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsMobile;
