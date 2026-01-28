import { useState, useEffect } from 'react';

/**
 * useResponsiveLayout Hook
 * 
 * Detects screen size and determines if we should use mobile or desktop layout.
 * Prevents flicker by using a "mounted" guard.
 * 
 * Breakpoint: 1024px (lg in Tailwind)
 * - Desktop: >= 1024px
 * - Mobile/Tablet: < 1024px
 */

export const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true); // Default to mobile to prevent flash
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkBreakpoint = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkBreakpoint();

    // Listen for resize events
    window.addEventListener('resize', checkBreakpoint);

    return () => {
      window.removeEventListener('resize', checkBreakpoint);
    };
  }, []);

  return {
    isMobile: isMounted ? isMobile : true, // Default to mobile until mounted
    isDesktop: isMounted ? !isMobile : false,
    isMounted,
  };
};
