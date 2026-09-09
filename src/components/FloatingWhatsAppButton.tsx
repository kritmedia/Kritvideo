import React from 'react';

const WHATSAPP_PRESALES_LINK = 'https://wa.me/917002983079?text=Hi%20KritVideo%2C%20I%20have%20a%20presales%20query%20%2F%20would%20like%20to%20get%20a%20quote%20for%20a%20video%20project.';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default function FloatingWhatsAppButton() {
  return (
    <div
      className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 pointer-events-auto select-none transition-all duration-500 ease-out"
    >
      <a
        href={WHATSAPP_PRESALES_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 sm:gap-3 bg-neutral-950/85 hover:bg-neutral-900/95 backdrop-blur-2xl border border-emerald-500/30 hover:border-emerald-400/80 p-2 sm:py-2.5 sm:pl-3 sm:pr-4.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(16,185,129,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* WhatsApp Icon Circle with Pulsing Live Status Dot */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_22px_rgba(16,185,129,0.8)] transition-all shrink-0">
          <WhatsAppIcon className="w-5 h-5 text-white fill-white" />
          
          {/* Pulsing Active Beacon */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-neutral-950" />
          </span>
        </div>

        {/* Text Container: Desktop shows dual-line, Mobile shows compact label */}
        <div className="flex flex-col text-left pr-1 sm:pr-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-[13px] font-bold text-white tracking-wide leading-tight group-hover:text-emerald-300 transition-colors">
              <span className="hidden sm:inline">Presales & Quotes</span>
              <span className="sm:hidden">Get Quote</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase text-neutral-400 group-hover:text-neutral-200 tracking-wider transition-colors">
            Chat on WhatsApp ↗
          </span>
        </div>
      </a>
    </div>
  );
}
