"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Show for a smooth brief period (min 600ms) then fade out
    const timer = setTimeout(() => {
      setFade(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      id="loader-wrapper"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center text-center px-4">
        {/* SKS INFI Logo with subtle wave pulse */}
        <div className="relative mb-6 transform transition-transform hover:scale-105 duration-300">
          <Image
            src="/images/skslogo.png"
            alt="SKS INFI Logo"
            width={240}
            height={85}
            priority
            className="w-48 sm:w-60 h-auto object-contain drop-shadow-sm"
          />
        </div>

        {/* 5-Bar Pulse Loader inspired by ApnaRupee in SKS INFI Teal & Gold */}
        <div className="bar-loader flex items-center justify-center gap-2.5 h-12 mb-4">
          {[0, 0.15, 0.3, 0.45, 0.6].map((delay, index) => (
            <div
              key={index}
              className="bar w-2.5 sm:w-3 h-7 rounded-full"
              style={{
                background: "linear-gradient(135deg, #094b57 0%, #b69455 100%)",
                boxShadow: "0 0 10px rgba(182, 148, 85, 0.6)",
                animation: "sksPulse 1.2s ease-in-out infinite",
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle tagline */}
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#094b57] uppercase">
          Your Trusted Financial Partner
        </p>
      </div>

      <style jsx global>{`
        @keyframes sksPulse {
          0%,
          100% {
            transform: scaleY(0.4);
            opacity: 0.55;
            box-shadow: 0 0 4px rgba(9, 75, 87, 0.4);
          }
          50% {
            transform: scaleY(1.15);
            opacity: 1;
            box-shadow: 0 0 16px rgba(182, 148, 85, 0.95);
          }
        }
      `}</style>
    </div>
  );
}
