import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC<{ isAuthorized: boolean; onLogout: () => void; isOpen: boolean; onToggle: () => void }> = ({ isAuthorized, onLogout, isOpen, onToggle }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const publicLinks = [
    { label: 'Mission', path: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Domains', path: '/domains', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2' },
    { label: 'Responsible Use', path: '/responsible-use', icon: 'M12 11V7m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Ethics', path: '/research-ethics', icon: 'M9 12l2 2 4-4' },
  ];

  const protectedLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' },
    { label: 'Projects', path: '/dashboard/projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2' },
    { label: 'Signals', path: '/dashboard/signals', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Rewards', path: '/dashboard/rewards', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2' },
    { label: 'Billing', path: '/dashboard/billing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-[60] lg:hidden p-3 bg-midnight/90 border border-white/10 text-white"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static left-0 top-0 h-screen w-64 glass-card border-r border-white/5 flex flex-col z-[60] lg:z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 lg:p-10 mb-4">
          <Link to="/" className="flex items-center gap-4 group" onClick={() => window.innerWidth < 1024 && onToggle()}>
            <div className="w-8 h-8 border border-electric-blue/40 flex items-center justify-center transition-all group-hover:bg-electric-blue group-hover:border-electric-blue">
              <span className="font-bold text-[10px] text-white tracking-tighter group-hover:text-black">FK</span>
            </div>
            <span className="font-bold text-xl tracking-[0.3em] text-white font-display">FAKE</span>
          </Link>
        </div>

        <nav className="flex-grow overflow-y-auto">
          <div className="px-6 mb-2 text-[9px] uppercase tracking-[0.4em] text-white/20 font-mono">Platform Access</div>
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => window.innerWidth < 1024 && onToggle()}
              className={`flex items-center gap-4 px-6 lg:px-10 py-3 text-[10px] font-mono tracking-widest uppercase transition-all hover:bg-white/5 ${
                isActive(link.path) ? 'sidebar-item-active' : 'text-soft-slate'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isAuthorized && (
            <div className="mt-10">
              <div className="px-6 mb-2 text-[9px] uppercase tracking-[0.4em] text-white/20 font-mono">Research Node</div>
              {protectedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                  className={`flex items-center gap-4 px-6 lg:px-10 py-3 text-[10px] font-mono tracking-widest uppercase transition-all hover:bg-white/5 ${
                    isActive(link.path) ? 'sidebar-item-active' : 'text-soft-slate'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className="p-6 lg:p-10 border-t border-white/5 space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Parent Entity</span>
            <a href="#" className="text-[9px] font-bold text-electric-blue hover:text-white transition-colors tracking-widest uppercase">ALPHA TEK</a>
          </div>
          
          {isAuthorized ? (
            <button 
              onClick={onLogout}
              className="w-full text-center py-3 border border-red-500/20 text-[9px] font-mono text-red-500/60 uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              Disconnect
            </button>
          ) : (
            <Link 
              to="/auth/login"
              onClick={() => window.innerWidth < 1024 && onToggle()}
              className="block w-full text-center py-3 bg-electric-blue/10 border border-electric-blue/40 text-[9px] font-mono text-electric-blue uppercase tracking-widest hover:bg-electric-blue hover:text-midnight transition-all"
            >
              Authorize
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export const Layout: React.FC<{ children: React.ReactNode; isAuthorized: boolean; onLogout: () => void }> = ({ children, isAuthorized, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-midnight selection:bg-electric-blue selection:text-midnight">
      <Sidebar isAuthorized={isAuthorized} onLogout={onLogout} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className="flex-grow lg:ml-64 min-h-screen relative w-full lg:w-auto overflow-x-hidden">
        <div className="p-3 sm:p-4 md:p-6 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};
