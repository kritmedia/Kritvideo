import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `/frames/ezgif-frame-${paddedIndex}.jpg`;
};

export const SmoothScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  const [, setLoadedCount] = useState<number>(0);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        count++;
        setLoadedCount(count);
        // Render first frame immediately once loaded
        if (i === 1 && lastDrawnFrameRef.current === -1) {
          drawFrame(1);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const imgIndex = frameIndex - 1;
    let img = imagesRef.current[imgIndex];

    // Fallback to nearest loaded frame if current frame is still loading
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[imgIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[imgIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Fill pitch black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // End-to-end full bleed cover scaling
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, drawY, drawWidth, drawHeight);

    lastDrawnFrameRef.current = frameIndex;
  };

  // Resize canvas according to window size and DPR
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      // Re-draw current frame after resizing
      const frame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)) + 1)
      );
      drawFrame(frame);
    }
  };

  // Scroll listener and smooth requestAnimationFrame lerp loop
  useEffect(() => {
    resizeCanvas();

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      targetProgressRef.current = Math.min(1, Math.max(0, progress));
    };

    const handleResize = () => {
      resizeCanvas();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Smooth RAF render loop with dampening
    const LERP_FACTOR = 0.1; // Smooth inertial interpolation
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * LERP_FACTOR;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)) + 1)
      );

      if (frameIndex !== lastDrawnFrameRef.current) {
        drawFrame(frameIndex);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    handleScroll();
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500vh] bg-black">
      {/* Fixed Fullscreen Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover block pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000',
        }}
      />
    </div>
  );
};
