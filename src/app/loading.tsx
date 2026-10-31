import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300">
      {/* Top progress line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#094b57] via-[#b69455] to-[#094b57] animate-pulse" />

      {/* Central Spinner */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#094b57]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#b69455] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#094b57] font-['Poppins',sans-serif]">
          SKS INFI • Loading
        </p>
      </div>
    </div>
  );
}
