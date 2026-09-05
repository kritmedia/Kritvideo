import React, { useEffect, useRef, useState, useMemo } from 'react';

interface AppleWordProps {
  word: string;
  wordProgress: number; // 0 to 1
  isSpecial?: boolean;
  key?: React.Key;
}

function AppleWord({ word, wordProgress, isSpecial }: AppleWordProps) {
  const opacity = 0.42 + 0.58 * Math.min(1, Math.max(0, wordProgress));
  const isFullyLit = wordProgress >= 0.80;

  if (isSpecial) {
    return (
      <span
        style={{ opacity }}
        className={`inline-block mx-1.5 font-editorial-serif italic font-normal text-2xl sm:text-4xl md:text-5xl transition-all duration-150 ${
          isFullyLit
            ? 'text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]'
            : 'text-neutral-300'
        }`}
      >
        {word}
      </span>
    );
  }

  return (
    <span
      style={{ opacity }}
      className={`inline-block mx-[0.22em] transition-all duration-150 ${
        isFullyLit ? 'text-white font-bold drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]' : 'text-neutral-300'
      }`}
    >
      {word}
    </span>
  );
}

export default function ScrollRevealNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerProgress, setContainerProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start highlighting when top of container enters 85% of viewport
      // Complete highlight when top of container reaches 20% of viewport
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.20;

      const progress = (start - rect.top) / (start - end);
      setContainerProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text segments
  const p1Words = useMemo(
    () =>
      "Great videos don't always start with perfect footage. Sometimes they start with hundreds of clips, questionable audio and a very optimistic".split(
        ' '
      ),
    []
  );

  const specialQuote = "“I'll edit this later.”";

  const transitionWords = useMemo(
    () => "That's where we come in.".split(' '),
    []
  );

  const p3Words = useMemo(
    () =>
      "We take your raw footage, kill the dead air, and cut high-retention videos that turn casual scrollers into loyal subscribers.".split(
        ' '
      ),
    []
  );

  const totalSteps = p1Words.length + 1 + transitionWords.length + p3Words.length;

  // Calculates individual word illumination progress (0 to 1)
  // Ensures that all words (including the final word 'goals.') reach 100% completion before container leaves viewport
  const getWordProgress = (globalIndex: number) => {
    const totalWordCount = totalSteps;
    // Spread all words across 0 to 0.78 progress range so everything is 100% lit with plenty of margin
    const wordStart = (globalIndex / totalWordCount) * 0.76;
    const wordDuration = 0.10;
    const wordEnd = wordStart + wordDuration;

    if (containerProgress <= wordStart) return 0;
    if (containerProgress >= wordEnd) return 1;
    return (containerProgress - wordStart) / (wordEnd - wordStart);
  };

  let currentIndex = 0;

  return (
    <div ref={containerRef} className="space-y-6 sm:space-y-8 my-8 sm:my-10 max-w-2xl select-none">
      {/* Paragraph 1 with Apple Word-by-Word Kinetic Illuminate */}
      <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-[1.32] tracking-tight flex flex-wrap items-baseline">
        {p1Words.map((word) => {
          const idx = currentIndex++;
          return (
            <AppleWord
              key={idx}
              word={word}
              wordProgress={getWordProgress(idx)}
            />
          );
        })}
        {(() => {
          const idx = currentIndex++;
          return (
            <AppleWord
              key={idx}
              word={specialQuote}
              wordProgress={getWordProgress(idx)}
              isSpecial
            />
          );
        })()}
      </p>

      {/* Transition Callout Accent */}
      <div className="flex items-center gap-4 pt-1">
        <span
          className="h-[1px] transition-all duration-300 bg-red-500"
          style={{
            width: `${Math.max(20, containerProgress * 64)}px`,
            opacity: containerProgress > 0.3 ? 1 : 0.3,
          }}
        />
        <div className="flex flex-wrap items-baseline font-mono-tech text-sm sm:text-base md:text-lg tracking-widest uppercase font-bold">
          {transitionWords.map((word) => {
            const idx = currentIndex++;
            const wp = getWordProgress(idx);
            const isLit = wp >= 0.75;
            return (
              <span
                key={idx}
                style={{ opacity: 0.25 + 0.75 * wp }}
                className={`mx-1.5 transition-colors duration-150 ${
                  isLit ? 'text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'text-neutral-600'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Paragraph 3 with complete illumination for every word including 'goals.' */}
      <p className="text-lg sm:text-xl md:text-2xl font-medium leading-[1.38] tracking-tight flex flex-wrap items-baseline text-neutral-300">
        {p3Words.map((word) => {
          const idx = currentIndex++;
          const wp = getWordProgress(idx);
          const isBrand = word === 'KritVideo';
          const isFullyLit = wp >= 0.8;

          return (
            <span
              key={idx}
              style={{ opacity: 0.22 + 0.78 * wp }}
              className={`inline-block mx-[0.22em] transition-all duration-150 ${
                isBrand && isFullyLit
                  ? 'text-white font-extrabold drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]'
                  : isFullyLit
                  ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'text-neutral-500'
              }`}
            >
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
}
