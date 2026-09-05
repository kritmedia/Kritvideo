import React, { useEffect, useState } from 'react';

export default function VideoCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  useEffect(() => {
    // Check if device has fine pointer (mouse/trackpad), skip for pure touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent has interactive attributes or is a button/link
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [role="button"], .cursor-pointer');
        setIsHovered(!!interactive);

        const customLabel = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        setCursorText(customLabel || null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth trailing playhead ring animation
  useEffect(() => {
    let animationFrameId: number;

    const follow = () => {
      setTrailingPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Precision Playhead / Razor Center Point */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.75 : isHovered ? 1.4 : 1})`,
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Inner precision core */}
          <div className={`w-2 h-2 rounded-full transition-colors duration-200 shadow-sm ${
            isHovered ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]' : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
          }`} />

          {/* Precision Crosshair Lines when hovering */}
          {isHovered && (
            <>
              <div className="absolute w-5 h-[1px] bg-red-400/80 pointer-events-none" />
              <div className="absolute h-5 w-[1px] bg-red-400/80 pointer-events-none" />
            </>
          )}
        </div>
      </div>

      {/* Trailing Viewfinder Reticle & NLE Timeline Bracket Ring */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Outer Viewfinder Bracket Ring */}
          <div
            className={`w-full h-full rounded-full border transition-all duration-200 ${
              isHovered
                ? 'border-red-500/80 bg-red-500/10 scale-105 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                : 'border-white/30 border-dashed animate-spin-slow'
            }`}
          />

          {/* Video Edit Custom Tooltip Label (e.g. PLAY, EDIT, SCRUB) */}
          {cursorText && (
            <div className="absolute top-full mt-2 whitespace-nowrap px-2 py-0.5 bg-black/90 border border-neutral-700 rounded text-[9px] font-mono-tech tracking-widest text-neutral-300 uppercase shadow-lg">
              {cursorText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
