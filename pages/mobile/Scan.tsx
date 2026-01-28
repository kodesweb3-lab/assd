import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORM_SERVICES } from '../../data/services';

/**
 * Scan Page (Mobile)
 * 
 * Primary mobile screen for scanning/observing signals.
 * Big input for URL/handle/reference.
 * Save research items with domain selector, tags, notes.
 */

const Scan: React.FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const [savedItems, setSavedItems] = useState<Array<{
    id: number;
    url: string;
    domain: string;
    tags: string;
    notes: string;
    timestamp: string;
  }>>([]);

  const handleSave = () => {
    if (!url.trim()) return;
    
    const newItem = {
      id: Date.now(),
      url: url.trim(),
      domain: selectedDomain || 'Unspecified',
      tags: tags.trim(),
      notes: notes.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setSavedItems(prev => [newItem, ...prev]);
    setUrl('');
    setSelectedDomain('');
    setTags('');
    setNotes('');
  };

  const popularDomains = PLATFORM_SERVICES.slice(0, 8).map(s => s.name);

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Main Input */}
      <div className="space-y-4">
        <label className="block text-xs font-mono uppercase tracking-wider text-soft-slate">
          Paste URL / Handle / Reference
        </label>
        <textarea
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://twitter.com/... or @handle or reference ID"
          className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-sm focus:outline-none focus:border-electric-blue/50 transition-all resize-none"
        />
      </div>

      {/* Domain Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-soft-slate">
          Domain (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {popularDomains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain === selectedDomain ? '' : domain)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all ${
                selectedDomain === domain
                  ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                  : 'border-white/10 text-soft-slate hover:border-white/20'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-soft-slate">
          Tags (Optional)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="#tag1 #tag2"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-sm focus:outline-none focus:border-electric-blue/50 transition-all"
        />
      </div>

      {/* Notes */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-soft-slate">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Research observations..."
          className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-sm focus:outline-none focus:border-electric-blue/50 transition-all resize-none"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!url.trim()}
        className="w-full py-4 bg-electric-blue text-midnight hover:bg-white transition-all text-xs font-bold font-mono uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Research Item
      </button>

      {/* Saved Items */}
      {savedItems.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-white/10">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white">Saved Items</h3>
          <div className="space-y-3">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white/5 border border-white/10 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-white truncate">{item.url}</p>
                    {item.domain !== 'Unspecified' && (
                      <p className="text-[10px] font-mono text-electric-blue uppercase mt-1">
                        {item.domain}
                      </p>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-soft-slate/60 ml-2">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.split(' ').filter(t => t).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white/5 text-[9px] font-mono text-soft-slate/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.notes && (
                  <p className="text-[10px] text-soft-slate/80 font-light leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {savedItems.length === 0 && (
        <div className="pt-8 text-center space-y-3 opacity-40">
          <p className="text-xs font-mono text-soft-slate uppercase tracking-wider">
            No research items saved
          </p>
          <p className="text-[10px] font-mono text-soft-slate/60">
            Saved items appear here
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="pt-6 border-t border-white/10">
        <p className="text-[10px] font-mono text-soft-slate/60 leading-relaxed text-center">
          FAKE does not automate delivery or guarantee visibility metrics. Research items are stored locally.
        </p>
      </div>
    </div>
  );
};

export default Scan;
