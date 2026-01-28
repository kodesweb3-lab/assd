import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SearchProvider, useSearch } from '../contexts/SearchContext';

/**
 * MobileAppLayout Component
 * 
 * App-like shell for mobile devices:
 * - Fixed bottom navigation with 5 tabs
 * - Compact top header
 * - Full-screen page views
 * - Safe area support for iOS
 */

interface MobileAppLayoutProps {
  children: React.ReactNode;
  isAuthorized: boolean;
  onLogout: () => void;
  pageTitle?: string;
  showSearch?: boolean;
  onSearchClick?: () => void;
}

const BottomNav: React.FC<{ isAuthorized: boolean; onLogout: () => void }> = ({ isAuthorized, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { 
      label: 'Home', 
      path: '/', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    { 
      label: 'Domains', 
      path: '/domains', 
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    },
    { 
      label: 'Scan', 
      path: '/scan', 
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      requiresAuth: true
    },
    { 
      label: 'Notes', 
      path: '/notes', 
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      requiresAuth: true
    },
    { 
      label: 'Account', 
      path: '/account', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.requiresAuth && !isAuthorized) {
      navigate('/auth/login');
    } else {
      navigate(item.path);
    }
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-midnight/95 backdrop-blur-lg border-t border-white/10 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const disabled = item.requiresAuth && !isAuthorized;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item)}
              disabled={disabled}
              className={`
                flex flex-col items-center justify-center flex-1 h-full
                transition-colors duration-200
                ${active 
                  ? 'text-electric-blue' 
                  : disabled 
                  ? 'text-white/20' 
                  : 'text-soft-slate hover:text-white'
                }
              `}
              aria-label={item.label}
            >
              <svg 
                className="w-5 h-5 mb-1" 
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
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-electric-blue" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

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
      className="sticky top-0 z-40 bg-midnight/95 backdrop-blur-lg border-b border-white/10"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between px-4 h-14">
        <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
          {title || 'FAKE Tek'}
        </h1>
        {showSearch && (
          <button
            onClick={handleSearchClick}
            className="p-2 text-soft-slate hover:text-white transition-colors"
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
      className="sticky top-0 z-40 bg-midnight/95 backdrop-blur-lg border-b border-white/10"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between px-4 h-14">
        <h1 className="text-base font-bold text-white font-display uppercase tracking-wider">
          {title || 'FAKE Tek'}
        </h1>
        {showSearch && (
          <button
            onClick={onSearchClick}
            className="p-2 text-soft-slate hover:text-white transition-colors"
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

export const MobileAppLayout: React.FC<MobileAppLayoutProps> = ({ 
  children, 
  isAuthorized, 
  onLogout,
  pageTitle,
  showSearch = false,
  onSearchClick
}) => {
  // Hide bottom nav on auth screens
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
        className="flex-1 overflow-y-auto pb-16"
        style={{ paddingBottom: isAuthScreen ? '0' : 'calc(4rem + env(safe-area-inset-bottom))' }}
      >
        {children}
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
