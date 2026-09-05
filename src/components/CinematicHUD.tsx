import React, { useMemo } from 'react';

interface CinematicHUDProps {
  progress: number; // 0.0 to 1.0
}

export default function CinematicHUD({ progress }: CinematicHUDProps) {
  // Generate rolling SMPTE timecode from scroll progress
  const timecode = useMemo(() => {
    const totalFrames = Math.round(progress * 240);
    const fps = 24;
    const hours = Math.floor(totalFrames / (fps * 3600));
    const minutes = Math.floor((totalFrames % (fps * 3600)) / (fps * 60));
    const seconds = Math.floor((totalFrames % (fps * 60)) / fps);
    const frames = totalFrames % fps;

    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
  }, [progress]);

  // Telemetry HUD is active during the cinematic photographer scroll (Hero & Section 2)
  // Fades out gracefully as user enters Section 3 Services so cards have 100% unobstructed space
  const telemetryOpacity = progress <= 0.38 ? 1 : Math.max(0, 1 - (progress - 0.38) / 0.08);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none overflow-hidden text-neutral-400 font-mono-tech text-[11px] tracking-wider">
      {/* 4 Corner Viewfinder Frame Reticles — Always subtle & persistent */}
      <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-white/20" />
      <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-white/20" />
      <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-white/20" />
      <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-white/20" />

      {/* Floating Cinematic Telemetry (Visible in Hero & Craft, fading out before Section 3) */}
      <div
        className="w-full h-full relative transition-opacity duration-300"
        style={{ opacity: telemetryOpacity }}
      >
        {/* BOTTOM LEFT: Live Stereo Audio VU Meter */}
        <div className="absolute bottom-6 left-6 sm:left-10 flex items-center gap-3 hidden sm:flex">
          <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center gap-2.5 text-[10px] shadow-lg">
            <span className="text-neutral-400 font-bold">AUDIO</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-emerald-400 h-2 rounded-xs animate-pulse" />
                <span className="w-1 bg-emerald-400 h-3 rounded-xs" />
                <span className="w-1 bg-amber-400 h-1.5 rounded-xs" />
              </div>
              <span className="text-neutral-300 text-[10px] font-mono-tech">-14 LUFS</span>
            </div>
          </div>
        </div>

        {/* BOTTOM RIGHT: Sequence Timeline Scrub Counter */}
        <div className="absolute bottom-6 right-6 sm:right-10 flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center gap-2.5 text-[10px] text-neutral-300 shadow-lg">
            <span className="text-neutral-400">FRAME</span>
            <span className="text-white font-bold font-mono-tech">{Math.min(240, Math.round(progress * 480))} / 240</span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-400 font-semibold font-mono-tech">TC {timecode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
