import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface TargetCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  parallaxOn?: boolean;
  hoverDuration?: number;
}

const TargetCursor = ({
  spinDuration = 2,
  hideDefaultCursor = true,
  parallaxOn = true,
  hoverDuration = 0.2,
}: TargetCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const inner = innerRef.current;
    if (!cursor || !inner) return;

    // Hide default cursor
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    // Create smooth movement using quickTo
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' });

    // Parallax effect for inner cursor
    const innerXTo = parallaxOn
      ? gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'power3' })
      : null;
    const innerYTo = parallaxOn
      ? gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'power3' })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      if (parallaxOn && innerXTo && innerYTo) {
        innerXTo(e.clientX);
        innerYTo(e.clientY);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest('.cursor-target') || target?.closest('a') || target?.closest('button')) {
        setIsHovering(true);
        gsap.to(cursor, {
          scale: 2.5,
          duration: hoverDuration,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest('.cursor-target') || target?.closest('a') || target?.closest('button')) {
        setIsHovering(false);
        gsap.to(cursor, {
          scale: 1,
          duration: hoverDuration,
          ease: 'power2.out',
        });
      }
    };

    const handleDocumentLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    const handleDocumentEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleDocumentLeave);
    document.addEventListener('mouseenter', handleDocumentEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleDocumentLeave);
      document.removeEventListener('mouseenter', handleDocumentEnter);
      if (hideDefaultCursor) {
        document.body.style.cursor = 'auto';
      }
    };
  }, [isTouchDevice, hideDefaultCursor, parallaxOn, hoverDuration]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      >
        {/* Outer ring - spinning */}
        <div
          className="w-10 h-10 rounded-full border-2 border-white relative"
          style={{
            animation: `spin ${spinDuration}s linear infinite`,
          }}
        >
          {/* Target lines */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white -translate-x-1/2" />
        </div>
        
        {/* Center dot */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-200 ${
            isHovering ? 'w-2 h-2' : 'w-1 h-1'
          }`}
        />
      </div>

      {/* Inner follower (parallax effect) */}
      {parallaxOn && (
        <div
          ref={innerRef}
          className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-50"
          style={{ 
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 20px hsl(var(--primary))',
          }}
        />
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default TargetCursor;
