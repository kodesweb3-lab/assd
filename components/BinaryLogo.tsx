import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_BINARY_CONFIG } from '../lib/binary';

/**
 * BinaryLogo Component
 * 
 * Displays "FAKE Tek" hero text with animated binary fill effect.
 * Uses canvas with composite operation for clean, readable result.
 * 
 * Configuration:
 * - UPDATE_RATE: Change DEFAULT_BINARY_CONFIG.updateRate in lib/binary.ts
 * - DENSITY: Adjust binary digit density
 * - COLORS: Modify DEFAULT_BINARY_CONFIG.colors
 */

interface BinaryLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const BinaryLogo: React.FC<BinaryLogoProps> = ({ 
  className = '', 
  size = 'large' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const binaryDataRef = useRef<string[]>([]);
  const colsRef = useRef<number>(0);
  const [canvasError, setCanvasError] = useState(false);

  const prefersReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const sizeClasses = {
    small: 'text-6xl md:text-8xl',
    medium: 'text-8xl md:text-12xl',
    large: 'text-[10rem] md:text-[16rem]',
  };

  useEffect(() => {
    if (prefersReducedMotion || canvasError) {
      return; // Skip animation if reduced motion is preferred or canvas failed
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    try {
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) {
        setCanvasError(true);
        return;
      }

      const updateCanvas = () => {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);

        // Initialize binary data based on text area
        const cols = Math.floor(rect.width / 10);
        const rows = Math.floor(rect.height / 14);
        colsRef.current = cols;
        binaryDataRef.current = Array(cols * rows).fill(0).map(() => 
          Math.random() > 0.5 ? '1' : '0'
        );
      };

      updateCanvas();
      const resizeHandler = () => updateCanvas();
      window.addEventListener('resize', resizeHandler);

      let lastUpdate = 0;
      const animate = () => {
        const now = Date.now();
        
        if (now - lastUpdate >= DEFAULT_BINARY_CONFIG.updateRate) {
          // Update random binary digits (subtle changes)
          for (let i = 0; i < binaryDataRef.current.length; i++) {
            if (Math.random() < 0.1) { // 10% chance to update each frame
              binaryDataRef.current[i] = Math.random() > 0.5 ? '1' : '0';
            }
          }
          lastUpdate = now;
        }

        // Clear and redraw
        ctx.fillStyle = '#0B0E1A'; // Background color
        ctx.fillRect(0, 0, canvas.width / (Math.min(window.devicePixelRatio || 1, 2)), canvas.height / (Math.min(window.devicePixelRatio || 1, 2)));
        
        ctx.font = '11px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw binary digits with subtle color variation
        binaryDataRef.current.forEach((digit, index) => {
          const col = index % colsRef.current;
          const row = Math.floor(index / colsRef.current);
          const x = col * 10 + 5;
          const y = row * 14 + 7;

          // Subtle color variation - mostly white/blue with occasional purple
          const rand = Math.random();
          if (rand > 0.9) {
            ctx.fillStyle = DEFAULT_BINARY_CONFIG.colors.primary;
            ctx.globalAlpha = 0.6;
          } else if (rand > 0.85) {
            ctx.fillStyle = DEFAULT_BINARY_CONFIG.colors.secondary;
            ctx.globalAlpha = 0.5;
          } else {
            ctx.fillStyle = DEFAULT_BINARY_CONFIG.colors.glow;
            ctx.globalAlpha = 0.3 + Math.random() * 0.2;
          }
          ctx.fillText(digit, x, y);
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('resize', resizeHandler);
      };
    } catch (error) {
      setCanvasError(true);
    }
  }, [size, prefersReducedMotion, canvasError]);

  const tekSizeClasses = {
    small: 'text-4xl md:text-6xl',
    medium: 'text-6xl md:text-8xl',
    large: 'text-7xl md:text-10rem',
  };

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
    >
      {/* Screen reader text */}
      <span className="sr-only">FAKE Tek</span>
      
      {/* Container with binary canvas background and text overlay */}
      <div className="relative flex flex-col items-center">
        {/* Binary canvas - positioned behind text */}
        {!canvasError && !prefersReducedMotion && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
              mixBlendMode: 'screen',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />
        )}
        
        {/* FAKE text - crisp and readable */}
        <div 
          className={`${sizeClasses[size]} text-white font-display font-bold tracking-[-0.05em] leading-[0.75] relative z-10`}
          style={{
            WebkitTextStroke: '1px transparent',
            textShadow: '0 0 20px rgba(79, 140, 255, 0.1)',
          }}
        >
          FAKE
        </div>
        
        {/* Tek text - positioned below FAKE */}
        <div 
          className={`${tekSizeClasses[size]} text-signal-purple font-display font-bold tracking-[-0.05em] leading-[0.75] relative z-10 mt-2`}
          style={{
            WebkitTextStroke: '1px transparent',
            textShadow: '0 0 15px rgba(107, 92, 255, 0.15)',
          }}
        >
          Tek
        </div>
      </div>
    </div>
  );
};

export default BinaryLogo;
