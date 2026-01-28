import React, { useEffect, useRef, useState } from 'react';
import { generateBinaryGrid, updateBinaryGrid, calculateOpacity, easing, DEFAULT_BINARY_CONFIG } from '../lib/binary';

/**
 * WelcomeOverlay Component
 * 
 * Fullscreen overlay that plays once per session:
 * 1. Shows animated binary background (0-0.9s)
 * 2. Fades in "FAKE Tek" logo (0.9-1.7s)
 * 3. Logo drifts and fades out (1.7-2.4s)
 * 4. Overlay fades out completely (2.4-3.0s)
 * 
 * Configuration:
 * - TIMING: Adjust animation phases in the useEffect
 * - DENSITY: Change DEFAULT_BINARY_CONFIG.density in lib/binary.ts
 * - COLORS: Modify palette in DEFAULT_BINARY_CONFIG.colors
 */

const SESSION_STORAGE_KEY = 'fake_welcome_seen';
const ANIMATION_DURATION = 3000; // 3 seconds total
const LOGO_FADE_IN_START = 900; // ms
const LOGO_FADE_IN_END = 1700; // ms
const LOGO_FADE_OUT_START = 1700; // ms
const LOGO_FADE_OUT_END = 2400; // ms
const OVERLAY_FADE_OUT_START = 2400; // ms
const OVERLAY_FADE_OUT_END = 3000; // ms

const WelcomeOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());
  const binaryGridRef = useRef<Array<{ x: number; y: number; value: string }>>([]);
  const originalOverflowRef = useRef<string>('');
  const [shouldRender, setShouldRender] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true') {
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show briefly then fade out
      setShouldRender(true);
      originalOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        setIsComplete(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        document.body.style.overflow = originalOverflowRef.current;
      }, 1000);
      return;
    }

    setShouldRender(true);
    startTimeRef.current = Date.now();
    
    // Prevent body scroll during overlay
    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    if (!canvas) {
      document.body.style.overflow = originalOverflowRef.current;
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      document.body.style.overflow = originalOverflowRef.current;
      return;
    }

    // Setup canvas with device pixel ratio (capped at 2 for performance)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.font = `${DEFAULT_BINARY_CONFIG.fontSize}px 'IBM Plex Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Regenerate grid on resize
      binaryGridRef.current = generateBinaryGrid(
        rect.width,
        rect.height,
        DEFAULT_BINARY_CONFIG.fontSize * 1.5,
        DEFAULT_BINARY_CONFIG.density
      );
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      if (progress >= 1) {
        setIsComplete(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        document.body.style.overflow = originalOverflowRef.current;
        window.removeEventListener('resize', updateCanvasSize);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Update binary grid periodically
      if (elapsed % DEFAULT_BINARY_CONFIG.updateRate < 16) {
        updateBinaryGrid(binaryGridRef.current, 0.3);
      }

      // Calculate opacities
      const bgOpacity = calculateOpacity(progress, OVERLAY_FADE_OUT_START / ANIMATION_DURATION, 1);
      const logoOpacity = calculateOpacity(
        progress,
        LOGO_FADE_IN_START / ANIMATION_DURATION,
        LOGO_FADE_OUT_END / ANIMATION_DURATION
      );
      const logoScale = progress < LOGO_FADE_OUT_START / ANIMATION_DURATION
        ? easing.easeOut((progress - LOGO_FADE_IN_START / ANIMATION_DURATION) / ((LOGO_FADE_IN_END - LOGO_FADE_IN_START) / ANIMATION_DURATION))
        : 1 - easing.easeIn((progress - LOGO_FADE_OUT_START / ANIMATION_DURATION) / ((LOGO_FADE_OUT_END - LOGO_FADE_OUT_START) / ANIMATION_DURATION));

      // Draw binary background
      ctx.globalAlpha = bgOpacity * 0.4;
      binaryGridRef.current.forEach((cell) => {
        const color = Math.random() > 0.7
          ? DEFAULT_BINARY_CONFIG.colors.primary
          : Math.random() > 0.5
          ? DEFAULT_BINARY_CONFIG.colors.secondary
          : DEFAULT_BINARY_CONFIG.colors.glow;
        ctx.fillStyle = color;
        ctx.fillText(cell.value, cell.x, cell.y);
      });

      // Draw "FAKE Tek" logo
      if (progress >= LOGO_FADE_IN_START / ANIMATION_DURATION) {
        const centerX = canvas.width / dpr / 2;
        const centerY = canvas.height / dpr / 2;
        const scale = Math.max(0.1, logoScale);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        ctx.translate(-centerX, -centerY);

        ctx.globalAlpha = logoOpacity;
        ctx.font = 'bold 72px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Render "FAKE" as binary-composed text
        const fakeText = 'FAKE';
        const tekText = 'Tek';
        const fakeY = centerY - 30;
        const tekY = centerY + 50;

        // Create binary fill effect for FAKE
        ctx.fillStyle = DEFAULT_BINARY_CONFIG.colors.primary;
        ctx.fillText(fakeText, centerX, fakeY);

        // Add subtle binary overlay on FAKE
        ctx.globalAlpha = logoOpacity * 0.3;
        ctx.font = '12px "IBM Plex Mono", monospace';
        for (let i = 0; i < fakeText.length; i++) {
          const charX = centerX - (fakeText.length * 20) / 2 + i * 20;
          const binaryChar = Math.random() > 0.5 ? '1' : '0';
          ctx.fillText(binaryChar, charX + Math.random() * 10 - 5, fakeY + Math.random() * 10 - 5);
        }

        // Render "Tek"
        ctx.globalAlpha = logoOpacity;
        ctx.font = 'bold 48px "Space Grotesk", sans-serif';
        ctx.fillStyle = DEFAULT_BINARY_CONFIG.colors.secondary;
        ctx.fillText(tekText, centerX, tekY);

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
      // Restore original overflow
      document.body.style.overflow = originalOverflowRef.current || '';
    };
  }, []);

  if (!shouldRender || isComplete) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-midnight pointer-events-none"
      style={{
        opacity: isComplete ? 0 : 1,
        transition: isComplete ? 'opacity 0.3s ease-out' : 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default WelcomeOverlay;
