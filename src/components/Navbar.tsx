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
  Sparkles,
  ArrowRight
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: (category?: string, product?: string) => void;
}

interface NavItem {
  label: string;
  href: string;
  columns?: number;
  subtitle?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "ABOUT US",
    href: "/about"
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
    subtitle: "Loan & Financing Portfolio",
    children: [
      { label: "SKSINFI & Loan", href: "/loan" },
      { label: "Home Loan", href: "/home_loan" },
      { label: "Loan Against Property", href: "/lap" },
      { label: "Personal Loan", href: "/personal-loan" },
      { label: "Business Loan", href: "/business-loan" },
      { label: "Education Loan", href: "/education" },
      { label: "Term Loan", href: "/term-loan" },
      { label: "Cash Credit / Overdraft", href: "/cas_overdraft" },
      { label: "Project Finance", href: "/project_finance" },
      { label: "CGTMSE", href: "/cgtsme" },
      { label: "MSME Loan", href: "/msme" },
      { label: "Subsidy from Govt.", href: "/subsidy-from" },
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
    label: "BLOGS",
    href: "/blogs"
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

  const handleEnquiryClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry("Loans");
    } else {
      window.location.href = "/enquirynow";
    }
  };

  const isItemActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child) => pathname === child.href);
    }
    return false;
  };

  return (
    <>
      {/* ================= 1. TOP ANNOUNCEMENT & UTILITY BAR ================= */}
      <div
        id="sks-top-bar"
        style={{ backgroundColor: "#094b57" }}
        className="w-full relative z-30 border-b border-white/10 text-white font-sans text-xs"
      >
        <div className="max-w-[1520px] w-full mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3">
          {/* NRI 24/7 Helpline */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9c787] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b69455]"></span>
            </span>
            <span
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
              className="text-[11px] sm:text-xs font-medium whitespace-nowrap"
            >
              <span className="hidden sm:inline">24/7 Service Available to NRI:</span>
              <span className="sm:hidden">24/7 NRI:</span>
            </span>
            <a
              href="tel:+919928593122"
              style={{ color: "#ffffff", textDecoration: "none" }}
              className="hover:text-[#e9c787] font-bold text-[11px] sm:text-xs inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#b69455] shrink-0" />
              <span>+91 99285 93122</span>
            </a>
          </div>

          {/* Secondary Links & Social Media Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="sks-top-nav hidden md:flex items-center gap-2.5 lg:gap-3 text-[11px] sm:text-xs">
              <Link
                href="/sksinfin"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#e9c787] font-medium transition-colors whitespace-nowrap"
              >
                WHY SKSINFI
              </Link>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
              <Link
                href="/enquirynow"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#e9c787] font-medium transition-colors whitespace-nowrap"
              >
                Get In Touch
              </Link>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
              <Link
                href="/partner-with-us"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#e9c787] font-medium transition-colors whitespace-nowrap"
              >
                BECOME OUR PARTNER
              </Link>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
              <Link
                href="/blogs"
                style={{ color: "#e9c787", textDecoration: "none" }}
                className="hover:text-white font-bold transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <span>BLOGS</span>
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2 sm:pl-3 sm:border-l sm:border-white/20">
              <a
                href="https://www.facebook.com/profile.php?id=61580467109664"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] flex items-center justify-center transition-all text-[11px] hover:scale-110"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/sksinfi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] flex items-center justify-center transition-all text-[11px] hover:scale-110"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@sksinfi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] flex items-center justify-center transition-all text-[11px] hover:scale-110"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/sksinfi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] flex items-center justify-center transition-all text-[11px] hover:scale-110"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://x.com/infi_sks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Twitter"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] flex items-center justify-center transition-all text-[11px] hover:scale-110"
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
            ? "0 4px 20px -2px rgba(9, 75, 87, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)"
            : "0 1px 3px rgba(0, 0, 0, 0.04)"
        }}
        className="w-full font-sans transition-all duration-200 border-b border-gray-100"
      >
        <div className="max-w-[1520px] w-full mx-auto px-4 lg:px-6">
          <div
            style={{
              height: isScrolled ? "66px" : "74px",
              transition: "height 0.2s ease"
            }}
            className="flex items-center justify-between gap-2 lg:gap-4"
          >
            {/* Left: Brand Logo */}
            <div className="flex items-center shrink-0">
              <Link
                href="/"
                className="inline-flex items-center shrink-0 no-underline py-1"
              >
                <img
                  src="/img/sksl.jpg"
                  alt="SKS INFI"
                  style={{
                    height: isScrolled ? "42px" : "48px",
                    maxHeight: "50px",
                    width: "auto",
                    maxWidth: "155px",
                    objectFit: "contain",
                    transition: "height 0.2s ease"
                  }}
                  className="block"
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav
              className="sks-desktop-nav flex items-center justify-center mx-auto gap-0.5 xl:gap-1.5"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "nowrap"
              }}
            >
              {NAV_ITEMS.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isTwoCols = item.columns === 2;
                const active = isItemActive(item);
                const isOpen = activeDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative group py-2"
                    onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                    onMouseLeave={() => hasChildren && handleMouseLeave()}
                  >
                    <Link
                      href={item.href}
                      style={{
                        color: active ? "#b69455" : "#094b57",
                        textDecoration: "none",
                        whiteSpace: "nowrap"
                      }}
                      className={`relative inline-flex items-center gap-1 px-1.5 xl:px-2.5 py-1.5 text-[11px] xl:text-[12px] 2xl:text-[12.5px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                        active
                          ? "bg-[#faf1e0]/70 font-bold"
                          : "hover:text-[#b69455] hover:bg-[#094b57]/[0.04]"
                      }`}
                    >
                      <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 ${
                            isOpen
                              ? "rotate-180 text-[#b69455]"
                              : "text-gray-400 group-hover:text-[#b69455] group-hover:rotate-180"
                          }`}
                        />
                      )}
                      {/* Active indicator underline */}
                      {active && (
                        <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#b69455] rounded-full" />
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
                            width: isTwoCols ? "510px" : "255px"
                          }}
                          className="bg-white rounded-2xl border border-gray-100 border-t-2 border-t-[#b69455] shadow-[0_20px_45px_-8px_rgba(9,75,87,0.18),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
                        >
                          {/* Dropdown Header Banner */}
                          <div className="px-4 py-2 bg-gradient-to-r from-[#094b57]/[0.04] to-transparent border-b border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#094b57] uppercase tracking-wider">
                              {item.subtitle || item.label}
                            </span>
                            {isTwoCols && (
                              <span className="text-[10px] font-bold text-[#b69455] uppercase tracking-wider">
                                90+ Partner Banks
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
                                      : "hover:text-[#094b57] hover:bg-[#f1f7f8]"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                                        isSubActive
                                          ? "bg-[#b69455] scale-125"
                                          : "bg-[#b69455]/70 group-hover/sub:bg-[#094b57] group-hover/sub:scale-125"
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
                              style={{ color: "#094b57", textDecoration: "none" }}
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

            {/* Right: Contact Callout & Action CTA */}
            <div className="sks-desktop-cta flex items-center gap-2.5 xl:gap-3 shrink-0">
              {/* Phone call pill on wider screens */}
              <a
                href="tel:+919928593122"
                style={{ textDecoration: "none" }}
                className="hidden 2xl:flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-gray-50 transition-colors border border-gray-200/80 group"
                title="Call SKS INFI Financial Advisory"
              >
                <div className="w-6 h-6 rounded-full bg-[#094b57]/10 flex items-center justify-center text-[#094b57] group-hover:bg-[#b69455] group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-3 h-3" />
                </div>
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold leading-none mb-0.5">
                    Advisory Desk
                  </span>
                  <span
                    style={{ color: "#094b57" }}
                    className="block text-[11.5px] font-bold group-hover:text-[#b69455] transition-colors leading-none"
                  >
                    +91 99285 93122
                  </span>
                </div>
              </a>

              {/* Primary Consultation Action Button */}
              <button
                onClick={handleEnquiryClick}
                style={{
                  background: "linear-gradient(135deg, #b69455 0%, #c4a25f 50%, #b69455 100%)",
                  color: "#ffffff"
                }}
                className="relative inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-[0_4px_16px_rgba(182,148,85,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-none shadow-xs whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Mobile / Tablet Actions (< 1024px) */}
            <div className="sks-mobile-toggle flex items-center gap-2 shrink-0">
              {/* Quick Call Icon Button */}
              <a
                href="tel:+919928593122"
                aria-label="Call SKS INFI"
                style={{ color: "#094b57", textDecoration: "none" }}
                className="w-9 h-9 rounded-full bg-[#094b57]/5 hover:bg-[#094b57]/10 flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4 text-[#b69455]" />
              </a>

              {/* Compact Enquire Button */}
              <button
                onClick={handleEnquiryClick}
                style={{
                  background: "linear-gradient(135deg, #b69455 0%, #c4a25f 100%)",
                  color: "#ffffff"
                }}
                className="text-[11px] font-bold px-3 py-1.5 rounded-full border-none cursor-pointer uppercase tracking-wide shadow-xs active:scale-95 transition-transform"
              >
                Enquire
              </button>

              {/* Hamburger Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                style={{
                  backgroundColor: "#094b57",
                  color: "#ffffff"
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center border-none cursor-pointer hover:bg-[#073942] active:scale-95 transition-all shadow-xs"
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
                      height: "36px",
                      maxHeight: "36px",
                      width: "auto",
                      maxWidth: "140px",
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
              <div className="p-3 bg-gray-50/80 border-b border-gray-100 grid grid-cols-2 gap-2 text-xs font-semibold shrink-0">
                <Link
                  href="/sksinfin"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: "#094b57",
                    backgroundColor: "#ffffff",
                    textDecoration: "none"
                  }}
                  className="p-2.5 rounded-xl text-center font-bold border border-gray-200/80 shadow-xs hover:border-[#b69455] transition-colors"
                >
                  Why SKSINFI
                </Link>
                <Link
                  href="/partner-with-us"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: "#094b57",
                    backgroundColor: "#ffffff",
                    textDecoration: "none"
                  }}
                  className="p-2.5 rounded-xl text-center font-bold border border-gray-200/80 shadow-xs hover:border-[#b69455] transition-colors"
                >
                  Partner With Us
                </Link>
              </div>

              {/* Drawer Scrollable Navigation */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = !!mobileExpanded[item.label];
                  const active = isItemActive(item);

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
                              color: active ? "#b69455" : "#094b57"
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
                                        : "hover:bg-white hover:text-[#094b57] font-medium"
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
                            color: active ? "#b69455" : "#094b57",
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

              {/* Drawer Fixed Bottom CTA & Contacts */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/90 space-y-2.5 shrink-0">
                <a
                  href="tel:+919928593122"
                  style={{
                    backgroundColor: "#094b57",
                    color: "#ffffff",
                    textDecoration: "none"
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs hover:bg-[#073942] shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#e9c787]" />
                  <span style={{ color: "#ffffff" }}>Call 24/7 NRI: +91 99285 93122</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleEnquiryClick();
                  }}
                  style={{
                    background: "linear-gradient(135deg, #b69455 0%, #c4a25f 100%)",
                    color: "#ffffff"
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs hover:opacity-95 shadow-xs uppercase tracking-wider border-none cursor-pointer transition-all"
                >
                  Book Free Financial Advisory
                </button>

                {/* Social icons in drawer bottom */}
                <div className="pt-2 flex items-center justify-center gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61580467109664"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#094b57] hover:border-[#094b57] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/sksinfi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#094b57] hover:border-[#094b57] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@sksinfi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#094b57] hover:border-[#094b57] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sksinfi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#094b57] hover:border-[#094b57] flex items-center justify-center transition-colors text-xs"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://x.com/infi_sks"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Twitter"
                    style={{ textDecoration: "none" }}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#094b57] hover:border-[#094b57] flex items-center justify-center transition-colors text-xs"
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
