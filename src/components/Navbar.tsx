"use client";

import React, { useEffect } from "react";
import { authenticHeaderHtml } from "@/data/authenticHeader";

interface NavbarProps {
  onOpenEnquiry?: (category?: string, product?: string) => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps = {}) {
  useEffect(() => {
    // 1. Sticky header effect
    const mainHeader = document.getElementById("mainheader");
    const handleScroll = () => {
      if (!mainHeader) return;
      if (window.scrollY > 40) {
        mainHeader.classList.add("sticky");
      } else {
        mainHeader.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Mobile toggle support
    const toggle = document.querySelector(".mega-menu-toggle");
    const menu = document.getElementById("mega-menu-primary-menu");
    if (toggle && menu) {
      const toggleHandler = () => {
        menu.classList.toggle("mega-menu-open");
      };
      toggle.addEventListener("click", toggleHandler);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        toggle.removeEventListener("click", toggleHandler);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const normalizedHeaderHtml = authenticHeaderHtml.replace(/\r\n/g, "\n");

  return (
    <div
      id="site-header-wrapper"
      className="w-full relative z-[1000]"
      dangerouslySetInnerHTML={{ __html: normalizedHeaderHtml }}
      suppressHydrationWarning
    />
  );
}
