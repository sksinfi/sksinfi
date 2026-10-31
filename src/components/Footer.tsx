"use client";

import React, { useEffect } from "react";
import { authenticFooterHtml } from "@/data/authenticFooter";

export default function Footer() {
  useEffect(() => {
    // Scroll-to-top handler
    const scrollUpBtn = document.querySelector(".scroll-up");
    if (scrollUpBtn) {
      const handleClick = (e: Event) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      scrollUpBtn.addEventListener("click", handleClick);
      return () => {
        scrollUpBtn.removeEventListener("click", handleClick);
      };
    }
  }, []);

  const normalizedFooterHtml = authenticFooterHtml.replace(/\r\n/g, "\n");

  return (
    <div
      id="site-footer-wrapper"
      className="w-full relative z-[500]"
      dangerouslySetInnerHTML={{ __html: normalizedFooterHtml }}
      suppressHydrationWarning
    />
  );
}
