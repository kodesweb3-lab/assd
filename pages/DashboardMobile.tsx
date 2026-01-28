import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Dashboard Page Mobile View
 * 
 * Dashboard Home cards stacked vertically.
 * Domain Pulse, Signal Scan, Research Briefs, Notes.
 */

const DashboardMobile: React.FC = () => {
  const [researchInput, setResearchInput] = useState('');
  const [mockResearch, setMockResearch] = useState<any[]>([]);

  const handleSaveObservation = () => {
    if (!researchInput.trim()) return;
    setMockResearch(prev => [...prev, { 
      id: Date.now(), 
      signal: researchInput, 
      timestamp: new Date().toISOString() 
    }]);
    setResearchInput('');
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Domain Pulse */}
      <div className="bg-white/5 border border-white/10">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Domain Pulse</h3>
          <span className="text-[9px] font-mono text-electric-blue/60">SECTOR_STATUS</span>
        </div>
        <div className="p-4 space-y-2">
          {[
            { name: 'Video Platforms', status: 'Stable', pinned: true },
            { name: 'Acoustic DSPs', status: 'Optimal', pinned: false },
            { name: 'Messaging Hubs', status: 'Stable', pinned: true },
            { name: 'Professional Silos', status: 'Optimal', pinned: false },
            { name: 'Web Traffic Nodes', status: 'Active', pinned: false },
          ].map((domain, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-3 hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="text-xs font-bold text-white font-display">{domain.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-soft-slate uppercase">{domain.status}</span>
                <div className={`w-2 h-2 border ${domain.pinned ? 'bg-electric-blue border-electric-blue' : 'border-white/20'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signal Scan - Primary CTA */}
      <div className="bg-white/5 border border-white/10 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Signal Scan</h3>
          <span className="text-[9px] font-mono text-electric-blue uppercase">INPUT_REQUIRED</span>
        </div>
        <div className="space-y-3">
          <p className="text-[11px] text-soft-slate font-light leading-relaxed">
            Input signal for research observation. FAKE does not automate amplification or bypass safeguards.
          </p>
          <div className="relative">
            <input
              type="text"
              value={researchInput}
              onChange={(e) => setResearchInput(e.target.value)}
              placeholder="URL / Handle / Reference..."
              className="w-full bg-midnight border border-white/10 p-3 pr-12 text-xs font-mono text-white placeholder:text-white/10 focus:outline-none focus:border-electric-blue/40 transition-all"
            />
          </div>
          {mockResearch.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 opacity-20 border border-dashed border-white/10 space-y-2 rounded-sm bg-white/[0.02]">
              <span className="text-[9px] font-mono uppercase tracking-wider text-center px-4">
                No research items currently tracked
              </span>
            </div>
          ) : (
            <div className="max-h-32 overflow-y-auto space-y-2">
              {mockResearch.map((item) => (
                <div key={item.id} className="p-2 bg-white/5 text-[10px] font-mono text-soft-slate flex justify-between">
                  <span className="truncate max-w-[200px]">{item.signal}</span>
                  <span className="text-white/20">SAVED</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleSaveObservation}
          className="w-full py-3 bg-white/5 border border-white/10 hover:border-electric-blue/20 transition-all text-[10px] font-mono text-soft-slate uppercase tracking-wider"
        >
          Save_Observation_Brief
        </button>
      </div>

      {/* Research Briefs */}
      <div className="bg-white/5 border border-white/10 p-4 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white">Research Briefs</h3>
        <div className="space-y-2">
          {[
            "Velocity vs Quality",
            "Legitimacy Signals",
            "Participation Clustering",
            "Why content disappears"
          ].map((brief, idx) => (
            <Link
              key={idx}
              to="/dashboard"
              className="block p-3 bg-midnight border border-white/5 rounded-sm flex justify-between items-center group hover:border-electric-blue/20 transition-all"
            >
              <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{brief}</h4>
              <svg className="w-3 h-3 text-white/20 group-hover:text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Notes - Recent */}
      <div className="bg-white/5 border border-white/10 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Notes</h3>
          <Link to="/notes" className="text-[9px] font-mono text-electric-blue/60 uppercase">
            View All
          </Link>
        </div>
        <div className="text-center py-6 opacity-40">
          <p className="text-[10px] font-mono text-soft-slate/60 uppercase tracking-wider">
            No recent notes
          </p>
        </div>
        <Link
          to="/notes"
          className="block w-full text-center py-2 border border-white/10 text-white hover:bg-white/5 transition-all text-[10px] font-mono uppercase tracking-wider"
        >
          Create Note
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-[10px] font-mono text-soft-slate/60 leading-relaxed text-center">
          FAKE instruments are for observation and data literacy. We do not automate engagement, inflate metrics, or guarantee outcomes.
        </p>
      </div>
    </div>
  );
};

export default DashboardMobile;
