"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Phone,
  Menu as MenuIcon,
  X as CloseIcon,
  ArrowRight
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: (category?: string, product?: string) => void;
}

interface NavItem {
  label: string;
  href: string;
  columns?: number;
  dropdownWidth?: string;
  bannerBadge?: string;
  subtitle?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "HOME",
    href: "/"
  },
  {
    label: "ABOUT US",
    href: "/about"
  },
  {
    label: "MSME",
    href: "/msme",
    columns: 2,
    dropdownWidth: "540px",
    subtitle: "MSME Capital & Growth Solutions",
    bannerBadge: "Strategic Advisory",
    children: [
      { label: "MSME For India", href: "/msme" },
      { label: "Why SKS INFI", href: "/msme/why-sks-infi" },
      { label: "MSME Financial Solutions", href: "/msme/financial-solutions" },
      { label: "MSME Registration", href: "/msme/registration" },
      { label: "MSME Subsidy and Intertive Schemes", href: "/msme/subsidy-schemes" },
      { label: "MSME IPO & Listing", href: "/msme/ipo-listing" },
      { label: "Invoice Discounting", href: "/msme/invoice-discounting" },
      { label: "MSME Growth & Bussiness Solutions", href: "/msme/growth-solutions" },
      { label: "MSME Venture Capital & Private Equity", href: "/msme/venture-capital" },
      { label: "CGTSME & MSME", href: "/msme/cgtmse" }
    ]
  },
  {
    label: "NRI DESK",
    href: "/sksinfi_nri",
    subtitle: "Global NRI Advisory Services",
    children: [
      { label: "SKS INFI & NRI", href: "/sksinfi_nri" },
      { label: "Loan", href: "/loan" },
      { label: "Real Estate", href: "/real_estate" },
      { label: "Investment", href: "/investment" },
      { label: "Insurance", href: "/insurance" },
      { label: "A/Cs & Tax", href: "/accountstax" }
    ]
  },
  {
    label: "LOAN",
    href: "/loan",
    columns: 2,
    dropdownWidth: "480px",
    subtitle: "Loan & Financing Portfolio",
    bannerBadge: "90+ Partner Banks",
    children: [
      { label: "SKSINFI & Loan", href: "/loan" },
      { label: "Home Loan", href: "/home_loan" },
      { label: "Loan Against Property", href: "/lap" },
      { label: "Personal Loan", href: "/personal-loan" },
      { label: "Business Loan", href: "/business-loan" },
      { label: "Education Loan", href: "/education" },
      { label: "Car Loan", href: "/car" },
      { label: "Commercial Vehicle", href: "/commercial_vehicle" }
    ]
  },
  {
    label: "REAL ESTATE",
    href: "/real_estate",
    subtitle: "Premium Jaipur & Rajasthan Properties",
    children: [
      { label: "Why Jaipur", href: "/why-jaipur" },
      { label: "SKS INFI & Real Estate", href: "/sksinfi-real-estate" },
      { label: "Residential", href: "/residential" },
      { label: "Commercial", href: "/commercial" },
      { label: "Industrial", href: "/industrial" },
      { label: "Farm House", href: "/farm_house" },
      { label: "Open Land", href: "/open_land" }
    ]
  },
  {
    label: "INVESTMENT",
    href: "/investment",
    subtitle: "Wealth Creation & Portfolio Management",
    children: [
      { label: "Why Investment", href: "/why_investment" },
      { label: "Mutual Fund & SIP", href: "/mutual_funds" },
      { label: "Bonds & Debentures", href: "/bonds" },
      { label: "NCD", href: "/ncd" },
      { label: "Unlisted Shares", href: "/unlisted_shares" },
      { label: "Equity & Demat", href: "/equity_demat" },
      { label: "Fixed Deposit", href: "/fixed-deposit" }
    ]
  },
  {
    label: "INSURANCE",
    href: "/insurance",
    subtitle: "Comprehensive Risk Protection",
    children: [
      { label: "Why Insurance", href: "/why_insurance" },
      { label: "Health Insurance", href: "/health" },
      { label: "Life Insurance", href: "/life" },
      { label: "Term Insurance", href: "/term" },
      { label: "Property Insurance", href: "/property" },
      { label: "Travel Insurance", href: "/travel" },
      { label: "Factory Insurance", href: "/factory" }
    ]
  },
  {
    label: "A/CS & TAX",
    href: "/accountstax",
    subtitle: "Tax Planning, GST & Audit Support",
    children: [
      { label: "Accounts", href: "/accounts" },
      { label: "Taxation", href: "/taxation" },
      { label: "GST", href: "/gst" },
      { label: "ITR", href: "/itr" },
      { label: "Litigation", href: "/litigation" }
    ]
  },
  {
    label: "CONTACT US",
    href: "/contact"
  }
];

export default function Navbar({ onOpenEnquiry }: NavbarProps = {}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect scroll for subtle elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isItemActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.href || pathname === child.href.split("#")[0]
      );
    }
    return false;
  };

  return (
    <>
      {/* ================= 1. TOP ANNOUNCEMENT & UTILITY BAR ================= */}
      <div
        id="sks-top-bar"
        style={{
          backgroundColor: "#003840",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
        }}
        className="w-full relative z-30 text-white font-sans text-xs overflow-hidden"
      >
        {/* Decorative Golden Swoosh Curves (Left Edge) */}
        <div className="absolute left-0 top-0 bottom-0 w-[110px] pointer-events-none overflow-hidden select-none z-0">
          <svg
            viewBox="0 0 110 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full object-cover"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="goldLeftRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e2ab39" />
                <stop offset="35%" stopColor="#f5cb68" />
                <stop offset="70%" stopColor="#d69a25" />
                <stop offset="100%" stopColor="#b88320" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="goldLeftGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffd885" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d69a25" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M -5 45 C 20 38, 50 18, 105 -8 C 75 12, 35 35, -5 45 Z" fill="url(#goldLeftRibbon)" />
            <path d="M -5 42 C 22 34, 55 16, 100 -6" stroke="url(#goldLeftGlow)" strokeWidth="1.6" />
            <path d="M -5 36 C 25 30, 60 12, 90 -6" stroke="#f5cb68" strokeWidth="1" strokeOpacity="0.75" />
            <path d="M 5 44 C 30 35, 65 20, 85 2" stroke="#e2ab39" strokeWidth="0.75" strokeOpacity="0.6" />
          </svg>
        </div>

        {/* Decorative Golden Swoosh Curves (Right Edge) */}
        <div className="absolute right-0 top-0 bottom-0 w-[110px] pointer-events-none overflow-hidden select-none z-0">
          <svg
            viewBox="0 0 110 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full object-cover"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="goldRightRibbon" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e2ab39" />
                <stop offset="35%" stopColor="#f5cb68" />
                <stop offset="70%" stopColor="#d69a25" />
                <stop offset="100%" stopColor="#b88320" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="goldRightGlow" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffd885" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d69a25" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 115 -5 C 90 2, 60 22, 5 48 C 35 28, 75 5, 115 -5 Z" fill="url(#goldRightRibbon)" />
            <path d="M 115 -2 C 88 6, 55 24, 10 46" stroke="url(#goldRightGlow)" strokeWidth="1.6" />
            <path d="M 115 4 C 85 10, 50 28, 20 46" stroke="#f5cb68" strokeWidth="1" strokeOpacity="0.75" />
            <path d="M 105 -4 C 80 5, 45 20, 25 38" stroke="#e2ab39" strokeWidth="0.75" strokeOpacity="0.6" />
          </svg>
        </div>

        <div
          style={{ maxWidth: "1380px", minHeight: "40px" }}
          className="w-full mx-auto px-4 sm:px-6 lg:px-8 pl-8 sm:pl-10 lg:pl-12 flex items-center justify-between gap-3 relative z-10 py-1.5"
        >
          {/* Left: NRI 24/7 Helpline */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              style={{ color: "#ffffff" }}
              className="text-[12px] sm:text-[12.5px] font-normal whitespace-nowrap"
            >
              <span className="hidden sm:inline">24/7 Service Available to NRI:</span>
              <span className="sm:hidden">24/7 NRI:</span>
            </span>
            <a
              href="tel:+919928593122"
              style={{ color: "#ffffff", textDecoration: "none" }}
              className="hover:text-[#f5cb68] font-bold text-[12px] sm:text-[12.5px] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap ml-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#e2ab39] shrink-0" />
              <span>+91 99285 93122</span>
            </a>
            <span className="text-white/35 ml-4 lg:ml-7 hidden md:inline select-none font-light">|</span>
          </div>

          {/* Right: Secondary Links & Flat Social Media Icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="sks-top-nav hidden md:flex items-center gap-2.5 lg:gap-3 text-[11.5px] sm:text-xs">
              <Link
                href="/sksinfin"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#f5cb68] font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                WHY SKSINFI
              </Link>
              <span className="text-white/35 select-none font-light">|</span>
              <Link
                href="/enquirynow"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#f5cb68] font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                Get In Touch
              </Link>
              <span className="text-white/35 select-none font-light">|</span>
              <Link
                href="/partner-with-us"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#f5cb68] font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                BECOME OUR PARTNER
              </Link>
              <span className="text-white/35 select-none font-light">|</span>
              <Link
                href="/blogs"
                style={{ color: "#e2ab39", textDecoration: "none" }}
                className="hover:text-white font-bold transition-colors duration-200 whitespace-nowrap"
              >
                BLOGS
              </Link>
              <span className="text-white/35 select-none font-light">|</span>
            </div>

            {/* Flat Social Icons (Direct crisp white glyphs without circle boxes) */}
            <div className="hidden sm:flex items-center gap-3.5 text-white">
              <a
                href="https://www.facebook.com/profile.php?id=61580467109664"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#f5cb68] transition-colors duration-150 text-[12.5px] flex items-center justify-center"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/sksinfi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#f5cb68] transition-colors duration-150 text-[12.5px] flex items-center justify-center"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@sksinfi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#f5cb68] transition-colors duration-150 text-[12.5px] flex items-center justify-center"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/sksinfi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#f5cb68] transition-colors duration-150 text-[12.5px] flex items-center justify-center"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://x.com/infi_sks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Twitter"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#f5cb68] transition-colors duration-150 text-[12.5px] flex items-center justify-center"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN NAVIGATION (STICKY) ================= */}
      <header
        id="sks-main-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#ffffff",
          boxShadow: isScrolled
            ? "0 4px 20px rgba(0, 0, 0, 0.10)"
            : "0 4px 18px rgba(0, 0, 0, 0.08)"
        }}
        className="w-full font-sans transition-all duration-200"
      >
        <div
          style={{ maxWidth: "1380px" }}
          className="w-full mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            style={{
              height: isScrolled ? "72px" : "80px",
              minHeight: isScrolled ? "72px" : "80px",
              transition: "height 0.25s ease, min-height 0.25s ease"
            }}
            className="flex items-center justify-between gap-3 xl:gap-5"
          >
            {/* Left: Brand Logo & Tagline with subtle vertical divider */}
            <div className="flex items-center shrink-0">
              <Link
                href="/"
                className="inline-flex items-center shrink-0 no-underline"
              >
                <img
                  src="/img/sksl.jpg"
                  alt="SKS INFI - MSME | LOAN | INVESTMENT"
                  style={{
                    height: isScrolled ? "52px" : "60px",
                    maxHeight: "62px",
                    width: "auto",
                    objectFit: "contain",
                    transition: "height 0.25s ease"
                  }}
                  className="block max-w-[165px] sm:max-w-[195px] xl:max-w-[210px]"
                />
              </Link>
              {/* Vertical gold divider after logo */}
              <div
                style={{
                  width: "1.5px",
                  height: "30px",
                  backgroundColor: "#b7832f",
                  marginLeft: "22px",
                  marginRight: "22px"
                }}
                className="hidden xl:block shrink-0"
              />
            </div>

            {/* Desktop Navigation Links (Evenly distributed with generous spacing) */}
            <nav
              className="sks-desktop-nav hidden xl:flex items-center justify-between flex-1 gap-1.5 xl:gap-2.5 2xl:gap-5 flex-nowrap pl-2"
              style={{
                alignItems: "center",
                flexWrap: "nowrap"
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isHome = item.label === "HOME";
                const hasChildren = item.children && item.children.length > 0;
                const isTwoCols = item.columns === 2;
                const isOpen = activeDropdown === item.label;

                if (isHome) {
                  return (
                    <div key={item.label} className="relative py-2 shrink-0">
                      <Link
                        href={item.href}
                        style={{
                          backgroundColor: "#b7832f",
                          color: "#ffffff",
                          textDecoration: "none",
                          whiteSpace: "nowrap"
                        }}
                        className="relative inline-flex items-center justify-center px-4 xl:px-5 py-1.5 text-[12px] xl:text-[12.5px] font-bold uppercase tracking-wider rounded-lg shadow-xs hover:bg-[#a67426] active:scale-95 transition-all duration-200"
                      >
                        <span>HOME</span>
                      </Link>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="relative group py-2 shrink-0"
                    onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                    onMouseLeave={() => hasChildren && handleMouseLeave()}
                  >
                    <Link
                      href={item.href}
                      style={{
                        color: "#003840",
                        textDecoration: "none",
                        whiteSpace: "nowrap"
                      }}
                      className="relative inline-flex items-center gap-1 px-1 xl:px-1.5 py-1 text-[12px] xl:text-[12.5px] font-bold uppercase tracking-wide hover:text-[#b7832f] transition-colors duration-150"
                    >
                      <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 stroke-[2.2] ${
                            isOpen
                              ? "rotate-180 text-[#b7832f]"
                              : "text-[#003840] group-hover:text-[#b7832f]"
                          }`}
                        />
                      )}
                    </Link>

                    {/* Premium Mega & Standard Dropdown Card */}
                    {hasChildren && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: isTwoCols ? "-60px" : "-10px",
                          paddingTop: "6px",
                          zIndex: 9999
                        }}
                        className={`transition-all duration-200 ${
                          isOpen
                            ? "opacity-100 visible translate-y-0 pointer-events-auto"
                            : "opacity-0 invisible translate-y-1.5 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        <div
                          style={{
                            width: item.dropdownWidth || (isTwoCols ? "510px" : "265px")
                          }}
                          className="bg-white rounded-2xl border border-gray-100 border-t-2 border-t-[#b69455] shadow-[0_20px_45px_-8px_rgba(0,75,80,0.18),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
                        >
                          {/* Dropdown Header Banner */}
                          <div className="px-4 py-2 bg-gradient-to-r from-[#004B50]/[0.04] to-transparent border-b border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#004B50] uppercase tracking-wider">
                              {item.subtitle || item.label}
                            </span>
                            {isTwoCols && (
                              <span className="text-[10px] font-bold text-[#b69455] uppercase tracking-wider">
                                {item.bannerBadge || (item.label === "LOAN" ? "90+ Partner Banks" : "Strategic Advisory")}
                              </span>
                            )}
                          </div>

                          {/* Dropdown Grid/List */}
                          <div
                            className={
                              isTwoCols
                                ? "grid grid-cols-2 gap-1 p-2.5"
                                : "flex flex-col gap-0.5 p-2"
                            }
                          >
                            {item.children!.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <Link
                                  key={sub.href + sub.label}
                                  href={sub.href}
                                  onClick={() => setActiveDropdown(null)}
                                  style={{
                                    color: isSubActive ? "#b69455" : "#334155",
                                    textDecoration: "none"
                                  }}
                                  className={`group/sub px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                                    isSubActive
                                      ? "bg-[#faf1e0] font-semibold"
                                      : "hover:text-[#004B50] hover:bg-[#f1f7f8]"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                                        isSubActive
                                          ? "bg-[#b69455] scale-125"
                                          : "bg-[#b69455]/70 group-hover/sub:bg-[#004B50] group-hover/sub:scale-125"
                                      }`}
                                    />
                                    <span className="truncate">{sub.label}</span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-[#b69455] opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all shrink-0" />
                                </Link>
                              );
                            })}
                          </div>

                          {/* Dropdown Footer Link */}
                          <div className="px-4 py-2 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-[11px]">
                            <span className="text-gray-500 font-medium">
                              Need personalized advisory?
                            </span>
                            <Link
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              style={{ color: "#004B50", textDecoration: "none" }}
                              className="hover:text-[#b69455] font-bold inline-flex items-center gap-1 transition-colors"
                            >
                              <span>Explore</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile / Tablet Actions (< 1280px) - No Enquire button */}
            <div className="sks-mobile-toggle flex xl:hidden items-center gap-2.5 shrink-0 ml-auto">
              {/* Quick Call Icon Button */}
              <a
                href="tel:+919928593122"
                aria-label="Call SKS INFI"
                style={{ color: "#004B50", textDecoration: "none" }}
                className="w-10 h-10 rounded-full bg-[#004B50]/5 hover:bg-[#004B50]/10 flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4 text-[#b69455]" />
              </a>

              {/* Hamburger Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                style={{
                  backgroundColor: "#004B50",
                  color: "#ffffff"
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center border-none cursor-pointer hover:bg-[#00383C] active:scale-95 transition-all shadow-xs"
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="w-5 h-5 text-white" />
                ) : (
                  <MenuIcon className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ================= 3. MOBILE MODERN SLIDE DRAWER ================= */}
        {mobileMenuOpen && (
          <div className="sks-mobile-drawer fixed inset-0 z-[1000]">
            {/* Backdrop with blur */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Panel from Right */}
            <div
              style={{
                width: "86vw",
                maxWidth: "360px",
                backgroundColor: "#ffffff"
              }}
              className="fixed top-0 right-0 bottom-0 z-[1001] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
            >
              {/* Drawer Top Bar */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src="/img/sksl.jpg"
                    alt="SKS INFI"
                    style={{
                      height: "46px",
                      maxHeight: "48px",
                      width: "auto",
                      maxWidth: "165px",
                      objectFit: "contain"
                    }}
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close drawer"
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center border-none cursor-pointer transition-colors"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Quick Action Pills */}
              <div className="p-3 bg-gray-50/80 border-b border-gray-100 grid grid-cols-3 gap-2 text-xs font-semibold shrink-0">
                <Link
                  href="/sksinfin"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: "#004B50",
                    backgroundColor: "#ffffff",
                    textDecoration: "none"
                  }}
                  className="p-2 rounded-xl text-center font-bold border border-gray-200/80 shadow-xs hover:border-[#b69455] transition-colors text-[11.5px]"
                >
                  Why SKSINFI
                </Link>
                <Link
                  href="/partner-with-us"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: "#004B50",
                    backgroundColor: "#ffffff",
                    textDecoration: "none"
                  }}
                  className="p-2 rounded-xl text-center font-bold border border-gray-200/80 shadow-xs hover:border-[#b69455] transition-colors text-[11.5px]"
                >
                  Partner With Us
                </Link>
                <Link
                  href="/blogs"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: "#004B50",
                    backgroundColor: "#ffffff",
                    textDecoration: "none"
                  }}
                  className="p-2 rounded-xl text-center font-bold border border-gray-200/80 shadow-xs hover:border-[#b69455] transition-colors text-[11.5px]"
                >
                  Blogs
                </Link>
              </div>

              {/* Drawer Scrollable Navigation */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isHome = item.label === "HOME";
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = !!mobileExpanded[item.label];
                  const active = isItemActive(item);

                  if (isHome) {
                    return (
                      <div key={item.label} className="border-b border-gray-100/70 pb-2 mb-1.5 pt-0.5">
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            backgroundColor: "#b69455",
                            color: "#ffffff",
                            textDecoration: "none"
                          }}
                          className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs hover:bg-[#a38243] transition-colors"
                        >
                          HOME
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.label}
                      className="border-b border-gray-100/70 last:border-none pb-1 mb-1"
                    >
                      {hasChildren ? (
                        <div>
                          <button
                            onClick={() => toggleMobileAccordion(item.label)}
                            style={{
                              color: active ? "#b69455" : "#004B50"
                            }}
                            className={`w-full flex items-center justify-between py-2.5 px-2.5 text-sm font-bold text-left bg-transparent border-none cursor-pointer rounded-lg transition-colors ${
                              active ? "bg-[#faf1e0]/40" : "hover:bg-gray-50"
                            }`}
                          >
                            <span className="uppercase tracking-wider">{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-[#b69455]" : ""
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="bg-[#f8fafc] rounded-xl p-2 my-1 grid grid-cols-1 gap-1 border border-gray-100">
                              {item.children!.map((sub) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <Link
                                    key={sub.href + sub.label}
                                    href={sub.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{
                                      color: isSubActive ? "#b69455" : "#334155",
                                      textDecoration: "none"
                                    }}
                                    className={`text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                                      isSubActive
                                        ? "bg-white font-bold shadow-xs border border-gray-200/50"
                                        : "hover:bg-white hover:text-[#004B50] font-medium"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 truncate">
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                          isSubActive ? "bg-[#b69455]" : "bg-gray-300"
                                        }`}
                                      />
                                      <span className="truncate">{sub.label}</span>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            color: active ? "#b69455" : "#004B50",
                            textDecoration: "none"
                          }}
                          className={`block py-2.5 px-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors ${
                            active
                              ? "bg-[#faf1e0]/40"
                              : "hover:text-[#b69455] hover:bg-gray-50"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Drawer Fixed Bottom Call & Socials (No Enquire Button) */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/90 space-y-2.5 shrink-0">
                <a
                  href="tel:+919928593122"
                  style={{
                    backgroundColor: "#003840",
                    color: "#ffffff",
                    textDecoration: "none"
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs hover:bg-[#002b31] shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#f5cb68]" />
                  <span style={{ color: "#ffffff" }}>Call 24/7 NRI: +91 99285 93122</span>
                </a>

                {/* Social icons in drawer bottom */}
                <div className="pt-2 flex items-center justify-center gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61580467109664"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#004B50] hover:border-[#004B50] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/sksinfi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#004B50] hover:border-[#004B50] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@sksinfi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#004B50] hover:border-[#004B50] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sksinfi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#004B50] hover:border-[#004B50] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://x.com/infi_sks"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Twitter"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#004B50] hover:border-[#004B50] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================= 4. FLOATING WHATSAPP BUTTON ================= */}
      <aside aria-label="WhatsApp quick chat">
        <a
          href="https://wa.me/919928593122?text=Hello%20SKS%20INFI%2C%20I%20would%20like%20to%20inquire%20about%20financial%20services"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with SKS INFI"
          style={{
            position: "fixed",
            right: "22px",
            bottom: "24px",
            zIndex: 9999,
            backgroundColor: "#25D366",
            color: "#ffffff",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(37, 211, 102, 0.45)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            textDecoration: "none"
          }}
          className="hover:scale-110 active:scale-95 group"
        >
          <i className="fab fa-whatsapp text-3xl"></i>
          {/* Subtle pulse ring */}
          <span
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              border: "2px solid #25D366",
              opacity: 0.6
            }}
            className="animate-ping pointer-events-none"
          />
        </a>
      </aside>
    </>
  );
}
