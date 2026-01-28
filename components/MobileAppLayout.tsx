import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SearchProvider, useSearch } from '../contexts/SearchContext';

/**
 * MobileAppLayout Component
 * 
 * Modern mobile app experience with:
 * - Bottom navigation with all menu items
 * - Smooth animations and transitions
 * - Modern UI design
 */

interface MobileAppLayoutProps {
  children: React.ReactNode;
  isAuthorized: boolean;
  onLogout: () => void;
  pageTitle?: string;
  showSearch?: boolean;
  onSearchClick?: () => void;
}

const MobileHeaderWithContext: React.FC<{ 
  title?: string; 
  showSearch?: boolean; 
  onSearchClick?: () => void;
}> = ({ title, showSearch, onSearchClick }) => {
  const searchContext = useSearch();

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      searchContext.toggleSearch();
    }
  };

  return (
    <header 
      className="sticky top-0 z-40 bg-midnight/98 backdrop-blur-xl border-b border-white/10 shadow-lg"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between px-4 h-16">
        <h1 className="text-lg font-bold text-white font-display uppercase tracking-wider">
          {title || 'FAKE Tek'}
        </h1>
        {showSearch && (
          <button
            onClick={handleSearchClick}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-soft-slate hover:text-white transition-all active:scale-95"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

const MobileHeader: React.FC<{ 
  title?: string; 
  showSearch?: boolean; 
  onSearchClick?: () => void;
}> = ({ title, showSearch, onSearchClick }) => {
  return (
    <header 
      className="sticky top-0 z-40 bg-midnight/98 backdrop-blur-xl border-b border-white/10 shadow-lg"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between px-4 h-16">
        <h1 className="text-lg font-bold text-white font-display uppercase tracking-wider">
          {title || 'FAKE Tek'}
        </h1>
        {showSearch && (
          <button
            onClick={onSearchClick}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-soft-slate hover:text-white transition-all active:scale-95"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

const BottomNav: React.FC<{ isAuthorized: boolean; onLogout: () => void }> = ({ isAuthorized, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Primary navigation items (always visible)
  const primaryNavItems = [
    { 
      label: 'Home', 
      path: '/', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    { 
      label: 'Domains', 
      path: '/domains', 
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2'
    },
  ];

  // Secondary navigation items (in expandable menu)
  const secondaryNavItems = [
    { label: 'Mission', path: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Responsible Use', path: '/responsible-use', icon: 'M12 11V7m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Ethics', path: '/research-ethics', icon: 'M9 12l2 2 4-4' },
  ];

  // Protected navigation items
  const protectedNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z', requiresAuth: true },
    { label: 'Scan', path: '/scan', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', requiresAuth: true },
    { label: 'Notes', path: '/notes', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', requiresAuth: true },
    { label: 'Account', path: '/account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  const handleNavClick = (item: typeof primaryNavItems[0] | typeof secondaryNavItems[0] | typeof protectedNavItems[0]) => {
    if ('requiresAuth' in item && item.requiresAuth && !isAuthorized) {
      navigate('/auth/login');
    } else {
      navigate(item.path);
      setExpanded(false);
    }
  };

  const allSecondaryItems = [...secondaryNavItems, ...(isAuthorized ? protectedNavItems : [])];

  return (
    <>
      {/* Expanded Menu Overlay */}
      {expanded && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] transition-opacity"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Expanded Menu */}
      <div className={`
        fixed bottom-20 left-0 right-0 z-[50] transition-all duration-300 ease-out
        ${expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        <div className="mx-4 mb-2 bg-midnight/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
            {allSecondaryItems.map((item) => {
              const active = isActive(item.path);
              const disabled: boolean = 'requiresAuth' in item && item.requiresAuth && !isAuthorized;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item)}
                  disabled={disabled}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                    ${active 
                      ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/30' 
                      : disabled 
                      ? 'text-white/20' 
                      : 'text-white hover:bg-white/5 border border-transparent'
                    }
                  `}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-midnight/98 backdrop-blur-xl border-t border-white/10 z-50 shadow-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-around h-20 px-2">
          {/* Primary Items */}
          {primaryNavItems.map((item) => {
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={`
                  flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all
                  ${active 
                    ? 'text-electric-blue' 
                    : 'text-soft-slate'
                  }
                  active:scale-95
                `}
                aria-label={item.label}
              >
                <div className={`
                  p-2.5 rounded-xl mb-1 transition-all
                  ${active ? 'bg-electric-blue/20' : ''}
                `}>
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={active ? 2.5 : 2} 
                      d={item.icon} 
                    />
                  </svg>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {item.label}
                </span>
                {active && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-electric-blue rounded-full" />
                )}
              </button>
            );
          })}

          {/* More Menu Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`
              flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all
              ${expanded ? 'text-electric-blue' : 'text-soft-slate'}
              active:scale-95
            `}
            aria-label="More"
          >
            <div className={`
              p-2.5 rounded-xl mb-1 transition-all
              ${expanded ? 'bg-electric-blue/20' : ''}
            `}>
              <svg 
                className={`w-6 h-6 transition-transform ${expanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export const MobileAppLayout: React.FC<MobileAppLayoutProps> = ({ 
  children, 
  isAuthorized, 
  onLogout,
  pageTitle,
  showSearch = false,
  onSearchClick
}) => {
  const location = useLocation();
  const isAuthScreen = location.pathname.startsWith('/auth') || location.pathname === '/before-you-begin';
  
  // Get page title from location if not provided
  const getPageTitle = () => {
    if (pageTitle) return pageTitle;
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path === '/domains' || path === '/tools') return 'Domains';
    if (path === '/scan') return 'Scan';
    if (path === '/notes') return 'Notes';
    if (path === '/account') return 'Account';
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/about') return 'Mission';
    if (path === '/research-ethics') return 'Ethics';
    if (path === '/responsible-use') return 'Responsible Use';
    return 'FAKE Tek';
  };

  const content = (
    <div className="min-h-screen bg-midnight selection:bg-electric-blue selection:text-midnight flex flex-col">
      {showSearch ? (
        <MobileHeaderWithContext 
          title={getPageTitle()} 
          showSearch={showSearch}
          onSearchClick={onSearchClick}
        />
      ) : (
        <MobileHeader 
          title={getPageTitle()} 
          showSearch={showSearch}
          onSearchClick={onSearchClick}
        />
      )}
      <main 
        className="flex-1 overflow-y-auto"
        style={{ 
          paddingBottom: isAuthScreen ? '0' : 'calc(5rem + env(safe-area-inset-bottom))',
          paddingTop: 'env(safe-area-inset-top)'
        }}
      >
        <div className="px-4 py-6">
          {children}
        </div>
      </main>
      {!isAuthScreen && <BottomNav isAuthorized={isAuthorized} onLogout={onLogout} />}
    </div>
  );

  // Wrap with SearchProvider if search is enabled
  if (showSearch) {
    return <SearchProvider>{content}</SearchProvider>;
  }

  return content;
};
