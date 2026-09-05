import React from 'react';
import { 
  motion, 
  useScroll, 
  useSpring 
} from 'motion/react';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

export default function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Yellow / Amber Scroll Depth Progress Bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 origin-left z-[100] shadow-[0_0_12px_rgba(245,158,11,0.9)] pointer-events-none"
      />

      {/* Floating WhatsApp Presales & Quotes Button */}
      <FloatingWhatsAppButton />
    </>
  );
}
