import React, { useEffect, useRef, useState } from 'react';

/**
 * BinaryLogo Component
 * 
 * Displays "FAKE Tek" hero text composed entirely of binary digits (0/1).
 * The digits change subtly to create a "calculating" effect.
 */

interface BinaryLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const UPDATE_RATE = 180; // milliseconds
const CHANGE_PROBABILITY = 0.1; // 10% chance per digit per update

const BinaryLogo: React.FC<BinaryLogoProps> = ({ 
  className = '', 
  size = 'large' 
}) => {
  const [fakeBinary, setFakeBinary] = useState<string>('01001000 01000001 01001011 01000101');
  const [tekBinary, setTekBinary] = useState<string>('01010100 01000101 01001011');
  const updateIntervalRef = useRef<NodeJS.Timeout>();

  const prefersReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Animate binary digits
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const updateDigits = () => {
      setFakeBinary(prev => 
        prev.split('').map(char => {
          if (char === ' ') return ' ';
          return Math.random() < CHANGE_PROBABILITY 
            ? (char === '0' ? '1' : '0')
            : char;
        }).join('')
      );
      
      setTekBinary(prev => 
        prev.split('').map(char => {
          if (char === ' ') return ' ';
          return Math.random() < CHANGE_PROBABILITY 
            ? (char === '0' ? '1' : '0')
            : char;
        }).join('')
      );
    };

    updateIntervalRef.current = setInterval(updateDigits, UPDATE_RATE);

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [prefersReducedMotion]);

  const sizeClasses = {
    small: 'text-lg sm:text-xl',
    medium: 'text-xl sm:text-2xl md:text-3xl',
    large: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
  };

  const tekSizeClasses = {
    small: 'text-base sm:text-lg',
    medium: 'text-lg sm:text-xl md:text-2xl',
    large: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  };

  const renderBinaryString = (binaryStr: string, isTek: boolean = false) => {
    const fontSize = isTek ? tekSizeClasses[size] : sizeClasses[size];
    return (
      <div className={`font-mono font-bold ${fontSize} leading-tight`}>
        {binaryStr.split('').map((char, idx) => {
          if (char === ' ') {
            return <span key={idx} className="mx-1 sm:mx-1.5 md:mx-2" />;
          }
          
          const rand = Math.random();
          const color = rand > 0.93 
            ? 'text-electric-blue' 
            : rand > 0.88 
            ? 'text-signal-purple' 
            : isTek 
            ? 'text-signal-purple/90' 
            : 'text-white';
          
          return (
            <span 
              key={idx} 
              className={`${color} transition-colors duration-75`}
              style={{ 
                textShadow: rand > 0.93 
                  ? (isTek ? '0 0 6px rgba(107, 92, 255, 0.5)' : '0 0 8px rgba(79, 140, 255, 0.5)')
                  : 'none' 
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Screen reader text */}
      <span className="sr-only">FAKE Tek</span>
      
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3">
        {/* FAKE - Binary composed */}
        {renderBinaryString(fakeBinary, false)}
        
        {/* Tek - Binary composed */}
        {renderBinaryString(tekBinary, true)}
      </div>
    </div>
  );
};

export default BinaryLogo;
