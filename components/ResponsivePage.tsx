import React from 'react';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';

/**
 * ResponsivePage Component
 * 
 * Wrapper that renders different page components based on screen size.
 * Prevents flicker by using mounted guard.
 */

interface ResponsivePageProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}

export const ResponsivePage: React.FC<ResponsivePageProps> = ({ mobile, desktop }) => {
  const { isMobile, isMounted } = useResponsiveLayout();

  // Show mobile by default until mounted to prevent flash
  if (!isMounted || isMobile) {
    return <>{mobile}</>;
  }

  return <>{desktop}</>;
};
