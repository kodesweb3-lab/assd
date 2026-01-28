import React, { useState } from 'react';

const DashboardDesktop: React.FC = () => {
  const [researchInput, setResearchInput] = useState('');
  const [mockResearch, setMockResearch] = useState<any[]>([]);

  const handleSaveObservation = () => {
    if (!researchInput.trim()) return;
    setMockResearch(prev => [...prev, { id: Date.now(), signal: researchInput, timestamp: new Date().toISOString() }]);
    setResearchInput('');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white font-display">Active Research Hub</h1>
          <p className="text-[10px] font-mono text-electric-blue tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-pulse" />
            Observational Node Active // AUTH_0x71...C44a
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Protocol Status</span>
            <div className="flex items-center gap-2 px-4 py-2 glass-card">
              <span className="text-[10px] font-mono text-soft-slate uppercase">FK_AXIOM_V5</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Card 1: Domain Pulse */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="glass-card flex flex-col h-full border-white/5">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Domain Pulse</h3>
              <span className="text-[9px] font-mono text-electric-blue/60">SECTOR_STATUS</span>
            </div>
            <div className="flex-grow overflow-auto p-4 space-y-2">
              {[
                { name: 'Video Platforms', status: 'Stable', pinned: true },
                { name: 'Acoustic DSPs', status: 'Optimal', pinned: false },
                { name: 'Messaging Hubs', status: 'Stable', pinned: true },
                { name: 'Professional Silos', status: 'Optimal', pinned: false },
                { name: 'Web Traffic Nodes', status: 'Active', pinned: false },
              ].map((domain, i) => (
                <div key={i} className="flex justify-between items-center p-4 hover:bg-white/5 transition-colors rounded-sm cursor-pointer group border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="text-xs font-bold text-white group-hover:text-electric-blue transition-colors font-display">{domain.name}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-mono text-soft-slate uppercase tracking-tighter">{domain.status}</span>
                    <div className={`w-3 h-3 border ${domain.pinned ? 'bg-electric-blue border-electric-blue' : 'border-white/20'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 2: Signal Scan */}
            <div className="glass-card p-8 space-y-8 border-white/5">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Signal Scan</h3>
                <span className="text-[9px] font-mono text-electric-blue uppercase">INPUT_REQUIRED</span>
              </div>
              <div className="space-y-4">
                <p className="text-[11px] text-soft-slate font-light leading-relaxed">Input signal for research observation. FAKE does not automate amplification or bypass safeguards.</p>
                <div className="relative">
                  <input 
                    type="text" 
                    value={researchInput}
                    onChange={(e) => setResearchInput(e.target.value)}
                    placeholder="URL / Handle / Reference..." 
                    className="w-full bg-midnight border border-white/10 p-4 pr-12 text-xs font-mono text-white placeholder:text-white/10 focus:outline-none focus:border-electric-blue/40 transition-all"
                  />
                </div>
                {mockResearch.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 opacity-20 border border-dashed border-white/10 space-y-2 rounded-sm bg-white/[0.02]">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-center px-6">No research items currently tracked</span>
                  </div>
                ) : (
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {mockResearch.map((item) => (
                      <div key={item.id} className="p-3 bg-white/5 text-[10px] font-mono text-soft-slate flex justify-between">
                        <span className="truncate max-w-[150px]">{item.signal}</span>
                        <span className="text-white/20">SAVED</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={handleSaveObservation}
                className="w-full py-4 bg-white/5 border border-white/10 hover:border-electric-blue/20 transition-all text-[10px] font-mono text-soft-slate uppercase tracking-widest"
              >
                Save_Observation_Brief
              </button>
            </div>

            {/* Card 3: Research Briefs */}
            <div className="glass-card p-8 space-y-8 border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Research Briefs</h3>
              <div className="space-y-4">
                {[
                  "Velocity vs Quality",
                  "Legitimacy Signals",
                  "Participation Clustering",
                  "Why content disappears"
                ].map((brief, idx) => (
                  <div key={idx} className="p-4 bg-midnight border border-white/5 rounded-sm flex justify-between items-center group hover:border-electric-blue/20 transition-all cursor-pointer">
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">{brief}</h4>
                    <svg className="w-3 h-3 text-white/20 group-hover:text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 4: Reference Dataset */}
            <div className="glass-card p-8 min-h-[250px] flex flex-col justify-between border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Reference Upload</h3>
              <div className="flex-grow flex flex-col justify-center items-center space-y-4 text-center">
                <div className="w-16 h-16 border border-white/5 flex items-center justify-center opacity-20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-white/40">No dataset loaded</p>
                  <p className="text-[9px] font-mono text-soft-slate uppercase tracking-widest">User-provided CSV datasets only</p>
                </div>
              </div>
              <button disabled className="w-full py-3 bg-white/5 border border-white/5 text-[9px] font-mono uppercase text-soft-slate opacity-50 cursor-not-allowed">
                Upload_Protocol_Log (Disabled in Demo)
              </button>
            </div>

            {/* Card 5: Insight Notes */}
            <div className="glass-card p-8 min-h-[250px] flex flex-col border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Insight Notes</h3>
                <span className="text-[9px] font-mono text-electric-blue/60">LOCAL_STATE_ONLY</span>
              </div>
              <textarea 
                placeholder="Capture system observations..." 
                className="flex-grow bg-transparent text-xs text-soft-slate font-light leading-relaxed focus:outline-none resize-none placeholder:text-white/5"
              />
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                <span className="px-2 py-1 bg-white/5 text-[8px] font-mono text-soft-slate/60 rounded-sm">#OBSERVATION</span>
                <span className="px-2 py-1 bg-white/5 text-[8px] font-mono text-soft-slate/60 rounded-sm">#MOCK_DATA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto p-10 border border-white/10 bg-white/[0.02] text-center space-y-4">
        <p className="text-[11px] font-mono text-soft-slate uppercase tracking-widest">Research Integrity Statement</p>
        <p className="text-xs text-soft-slate/60 italic leading-relaxed">
          FAKE instruments are for observation and data literacy. We do not automate engagement, inflate metrics, or guarantee outcomes. No sensitive research data is stored in this demo node.
        </p>
      </section>
    </div>
  );
};

export default DashboardDesktop;
