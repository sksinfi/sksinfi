"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Quick, premium entrance and auto fade-out
    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 400); // 400ms fade transition
      return () => clearTimeout(removeTimer);
    }, 600); // 600ms initial brand showcase

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      id="sks-preloader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999999,
        background: "radial-gradient(circle at center, #094b57 0%, #052b32 60%, #02161a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.4s ease-out, visibility 0.4s ease-out",
        opacity: fading ? 0 : 1,
        visibility: fading ? "hidden" : "visible",
        pointerEvents: fading ? "none" : "auto",
      }}
      suppressHydrationWarning
    >
      {/* Background ambient gold glow */}
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(182, 148, 85, 0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo Card with Gold Border & Subtle Pulse */}
        <div
          style={{
            position: "relative",
            padding: "16px 28px",
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "16px",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35), 0 0 0 2px rgba(182, 148, 85, 0.6)",
            marginBottom: "24px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/sksl.jpg"
            alt="SKS INFI Logo"
            style={{
              height: "56px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Brand Name & Tagline */}
        <h2
          style={{
            margin: "0 0 4px 0",
            fontSize: "22px",
            fontWeight: "700",
            letterSpacing: "1px",
            background: "linear-gradient(135deg, #f9f0df 0%, #e8cf96 50%, #b69455 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
          }}
        >
          SKS INFI
        </h2>
        <p
          style={{
            margin: "0 0 24px 0",
            fontSize: "12px",
            fontWeight: "400",
            color: "rgba(249, 240, 223, 0.8)",
            letterSpacing: "1.5px",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
          }}
        >
          Your Trusted Financial Partner
        </p>

        {/* Animated Gold Loading Line */}
        <div
          style={{
            width: "180px",
            height: "3px",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "999px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "60px",
              background: "linear-gradient(90deg, #b69455, #f9f0df, #b69455)",
              borderRadius: "999px",
              animation: "sksPreloaderBar 1.2s infinite ease-in-out",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes sksPreloaderBar {
          0% { left: -60px; }
          50% { left: calc(100% - 30px); }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
