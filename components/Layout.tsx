import React from 'react';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { ResponsiveLayout } from './ResponsiveLayout';
import { useLocation } from 'react-router-dom';

/**
 * Layout Component
 * 
 * Wrapper that uses ResponsiveLayout to switch between desktop and mobile layouts.
 * Also handles page-specific props like pageTitle and showSearch.
 */

interface LayoutProps {
  children: React.ReactNode;
  isAuthorized: boolean;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAuthorized, onLogout }) => {
  const location = useLocation();
  const { isMobile } = useResponsiveLayout();

  // Determine page title and search visibility based on route
  const getPageConfig = () => {
    const path = location.pathname;
    
    if (path === '/domains' || path === '/tools') {
      return {
        pageTitle: 'Domains',
        showSearch: true,
        onSearchClick: () => {
          // Search toggle will be handled by ToolsMobile component
        }
      };
    }
    
    if (path === '/notes') {
      return {
        pageTitle: 'Notes',
        showSearch: true,
      };
    }

    if (path === '/scan') {
      return { pageTitle: 'Scan' };
    }

    if (path === '/account') {
      return { pageTitle: 'Account' };
    }

    if (path === '/dashboard') {
      return { pageTitle: 'Dashboard' };
    }

    return { pageTitle: undefined };
  };

  const config = getPageConfig();

  return (
    <ResponsiveLayout
      isAuthorized={isAuthorized}
      onLogout={onLogout}
      pageTitle={config.pageTitle}
      showSearch={config.showSearch}
      onSearchClick={config.onSearchClick}
    >
      {children}
    </ResponsiveLayout>
  );
};
