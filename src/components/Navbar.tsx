"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Phone,
  Menu as MenuIcon,
  X as CloseIcon,
  Sparkles
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: (category?: string, product?: string) => void;
}

interface NavItem {
  label: string;
  href: string;
  columns?: number;
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

  // Detect scroll for header elevation and topbar collapse
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

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

  return (
    <>
      {/* ================= 1. TOP HEADER BAR ================= */}
      <div
        id="sks-top-bar"
        style={{
          backgroundColor: "#094b57"
        }}
        className="w-full relative z-30 border-b border-white/15 text-white text-xs font-sans"
      >
        <div className="container mx-auto px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* NRI Helpline */}
          <div className="flex items-center gap-2">
            <span
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
              className="text-[11px] sm:text-xs font-medium"
            >
              24/7 Service Available to NRI:
            </span>
            <a
              href="tel:+919928593122"
              style={{ color: "#ffffff", textDecoration: "none" }}
              className="hover:text-[#e9c787] font-bold text-xs inline-flex items-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#b69455]" />
              <span>+91 99285 93122</span>
            </a>
          </div>

          {/* Quick Links & Socials */}
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-3 text-[11px] sm:text-xs">
              <Link
                href="/sksinfin"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#e9c787] font-medium transition"
              >
                WHY SKSINFI
              </Link>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
              <Link
                href="/enquirynow"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#e9c787] font-medium transition"
              >
                Get In Touch
              </Link>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
              <Link
                href="/partner-with-us"
                style={{ color: "#ffffff", textDecoration: "none" }}
                className="hover:text-[#e9c787] font-medium transition"
              >
                BECOME OUR PARTNER
              </Link>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
              <Link
                href="/blogs"
                style={{ color: "#e9c787", textDecoration: "none" }}
                className="hover:text-white font-bold transition"
              >
                BLOGS
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2 sm:pl-3 sm:border-l sm:border-white/20">
              <a
                href="https://www.facebook.com/profile.php?id=61580467109664"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition text-[11px]"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/sksinfi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition text-[11px]"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@sksinfi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition text-[11px]"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/sksinfi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition text-[11px]"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://x.com/infi_sks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Twitter"
                style={{ textDecoration: "none" }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition text-[11px]"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN NAVIGATION (Sticky) ================= */}
      <header
        id="sks-main-header"
        className="w-full sticky top-0 z-50 font-sans transition-shadow duration-200"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#ffffff",
          boxShadow: isScrolled
            ? "0 4px 20px rgba(0, 0, 0, 0.08)"
            : "0 1px 3px rgba(0, 0, 0, 0.04)"
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #eef2f6"
          }}
          className="w-full"
        >
          <div
            className="container mx-auto px-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: isScrolled ? "66px" : "74px",
              transition: "height 0.2s ease"
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexShrink: 0,
                textDecoration: "none"
              }}
            >
              <img
                src="/img/sksl.jpg"
                alt="SKS INFI"
                style={{
                  height: isScrolled ? "44px" : "50px",
                  maxHeight: isScrolled ? "44px" : "50px",
                  width: "auto",
                  maxWidth: "160px",
                  objectFit: "contain",
                  display: "block",
                  transition: "height 0.2s ease"
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "nowrap"
              }}
              className="sks-desktop-nav gap-0.5 xl:gap-1.5"
            >
              {NAV_ITEMS.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isTwoCols = item.columns === 2;

                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      style={{
                        color: pathname === item.href ? "#b69455" : "#094b57",
                        fontWeight: "700",
                        letterSpacing: "0.02em",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        whiteSpace: "nowrap",
                        textTransform: "uppercase",
                        textDecoration: "none"
                      }}
                      className="px-1.5 xl:px-2.5 py-2 text-[11px] xl:text-[12.5px] hover:text-[#b69455] hover:bg-[#faf1e0]/40 transition"
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 group-hover:rotate-180 text-gray-400 group-hover:text-[#b69455]" />
                      )}
                    </Link>

                    {/* Desktop Dropdown Card */}
                    {hasChildren && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: isTwoCols ? "-90px" : "0",
                          paddingTop: "6px",
                          zIndex: 9999
                        }}
                        className={`transition-all duration-200 ${
                          activeDropdown === item.label
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible translate-y-1 pointer-events-none"
                        }`}
                      >
                        <div
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "14px",
                            border: "1px solid #e2e8f0",
                            borderTop: "3px solid #094b57",
                            boxShadow: "0 20px 40px -6px rgba(9, 75, 87, 0.2), 0 0 1px rgba(0, 0, 0, 0.08)",
                            padding: "10px",
                            width: isTwoCols ? "460px" : "230px"
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: isTwoCols ? "repeat(2, 1fr)" : "1fr",
                              gap: "3px"
                            }}
                          >
                            {item.children!.map((sub) => (
                              <Link
                                key={sub.href + sub.label}
                                href={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  color: "#334155",
                                  padding: "7px 10px",
                                  borderRadius: "6px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  textDecoration: "none",
                                  transition: "all 0.15s ease"
                                }}
                                className="hover:bg-[#f1f7f8] hover:text-[#094b57] group/sub"
                              >
                                <span
                                  style={{
                                    width: "5px",
                                    height: "5px",
                                    borderRadius: "50%",
                                    backgroundColor: "#b69455",
                                    flexShrink: 0
                                  }}
                                  className="group-hover/sub:scale-125 transition-transform"
                                />
                                <span className="truncate">{sub.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop Consultation Action Button */}
            <div className="sks-desktop-cta items-center gap-3">
              <button
                onClick={handleEnquiryClick}
                style={{
                  backgroundColor: "#b69455",
                  color: "#ffffff",
                  fontWeight: "700",
                  letterSpacing: "0.04em",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(182, 148, 85, 0.35)",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase"
                }}
                className="px-3.5 xl:px-4 py-2 text-[11px] xl:text-xs hover:bg-[#a58446] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle & Quick Action */}
            <div className="sks-mobile-toggle items-center gap-2">
              <button
                onClick={handleEnquiryClick}
                style={{
                  backgroundColor: "#b69455",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer"
                }}
                className="uppercase tracking-wide"
              >
                Enquire
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                style={{
                  backgroundColor: "#094b57",
                  color: "#ffffff",
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer"
                }}
                className="hover:bg-[#073942] transition"
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

        {/* ================= 3. MOBILE SLIDE-DOWN DRAWER ================= */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-[-1] sks-mobile-drawer backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              style={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e2e8f0",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                maxHeight: "82vh",
                overflowY: "auto"
              }}
              className="sks-mobile-drawer"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {/* Top Quick Links for Mobile */}
                <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-gray-100 text-xs font-semibold">
                  <Link
                    href="/sksinfin"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: "#094b57", backgroundColor: "#f8fafc" }}
                    className="p-2.5 rounded-lg text-center font-bold no-underline"
                  >
                    Why SKSINFI
                  </Link>
                  <Link
                    href="/partner-with-us"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: "#094b57", backgroundColor: "#f8fafc" }}
                    className="p-2.5 rounded-lg text-center font-bold no-underline"
                  >
                    Partner With Us
                  </Link>
                </div>

                {/* Accordion Navigation Items */}
                {NAV_ITEMS.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = !!mobileExpanded[item.label];

                  return (
                    <div key={item.label} className="border-b border-gray-50 last:border-none">
                      {hasChildren ? (
                        <div>
                          <button
                            onClick={() => toggleMobileAccordion(item.label)}
                            style={{ color: "#094b57" }}
                            className="w-full flex items-center justify-between py-2.5 px-2 text-sm font-bold text-left bg-transparent border-none cursor-pointer"
                          >
                            <span className="uppercase">{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-[#b69455]" : ""
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div
                              style={{ backgroundColor: "#f8fafc" }}
                              className="rounded-xl p-2.5 mb-2 grid grid-cols-1 sm:grid-cols-2 gap-1 border border-gray-100"
                            >
                              {item.children!.map((sub) => (
                                <Link
                                  key={sub.href + sub.label}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  style={{ color: "#334155" }}
                                  className="text-xs font-medium py-2 px-3 rounded-lg hover:bg-white hover:text-[#094b57] transition flex items-center gap-2 no-underline"
                                >
                                  <span
                                    style={{
                                      width: "5px",
                                      height: "5px",
                                      borderRadius: "50%",
                                      backgroundColor: "#b69455"
                                    }}
                                  />
                                  <span>{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ color: "#094b57" }}
                          className="block py-2.5 px-2 text-sm font-bold uppercase no-underline hover:text-[#b69455]"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Mobile Contact & CTA Drawer Bottom */}
                <div className="pt-4 mt-2 border-t border-gray-100 space-y-2.5">
                  <a
                    href="tel:+919928593122"
                    style={{ backgroundColor: "#094b57", color: "#ffffff" }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs no-underline shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-[#e9c787]" />
                    <span>Call 24/7 NRI: +91 99285 93122</span>
                  </a>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleEnquiryClick();
                    }}
                    style={{ backgroundColor: "#b69455", color: "#ffffff" }}
                    className="w-full py-3 rounded-xl font-bold text-xs shadow-sm hover:bg-[#a58446] transition uppercase tracking-wider border-none cursor-pointer"
                  >
                    Book Free Financial Advisory
                  </button>
                </div>
              </div>
            </div>
          </>
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
