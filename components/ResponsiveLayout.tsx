import React from 'react';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { DesktopLayout } from './DesktopLayout';
import { MobileAppLayout } from './MobileAppLayout';

/**
 * ResponsiveLayout Component
 * 
 * Switches between DesktopLayout and MobileAppLayout based on screen size.
 * Prevents flicker by using mounted guard from useResponsiveLayout hook.
 */

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  isAuthorized: boolean;
  onLogout: () => void;
  pageTitle?: string;
  showSearch?: boolean;
  onSearchClick?: () => void;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  isAuthorized,
  onLogout,
  pageTitle,
  showSearch,
  onSearchClick,
}) => {
  const { isMobile, isMounted } = useResponsiveLayout();

  // Show mobile layout by default until mounted to prevent flash
  if (!isMounted || isMobile) {
    return (
      <MobileAppLayout
        isAuthorized={isAuthorized}
        onLogout={onLogout}
        pageTitle={pageTitle}
        showSearch={showSearch}
        onSearchClick={onSearchClick}
      >
        {children}
      </MobileAppLayout>
    );
  }

  return (
    <DesktopLayout isAuthorized={isAuthorized} onLogout={onLogout}>
      {children}
    </DesktopLayout>
  );
};
