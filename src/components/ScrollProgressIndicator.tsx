import React, { useEffect, useRef } from 'react';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

export default function ScrollProgressIndicator() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (barRef.current) {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Yellow / Amber Scroll Depth Progress Bar */}
      <div 
        ref={barRef}
        style={{ transform: 'scaleX(0)' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 origin-left z-[100] shadow-[0_0_12px_rgba(245,158,11,0.9)] pointer-events-none transition-transform duration-75 ease-out will-change-transform"
      />

      {/* Floating WhatsApp Presales & Quotes Button */}
      <FloatingWhatsAppButton />
    </>
  );
}
