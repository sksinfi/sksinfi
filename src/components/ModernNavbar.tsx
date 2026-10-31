"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Building2,
  TrendingUp,
  FileText,
  Users,
  Compass
} from "lucide-react";
import EnquiryModal from "@/components/EnquiryModal";

interface ModernNavbarProps {
  onOpenEnquiry?: (category?: string, product?: string) => void;
}

export default function ModernNavbar({ onOpenEnquiry }: ModernNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCat, setModalCat] = useState("Loans");
  const [modalProd, setModalProd] = useState("Home Loan");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApplyClick = (category = "Loans", product = "Home Loan") => {
    if (onOpenEnquiry) {
      onOpenEnquiry(category, product);
    } else {
      setModalCat(category);
      setModalProd(product);
      setModalOpen(true);
    }
    setMobileMenuOpen(false);
  };

  const loanLinks = [
    { name: "Home Loan", href: "/loan", rate: "8.35%*" },
    { name: "Loan Against Property", href: "/loan", rate: "9.00%*" },
    { name: "Business & MSME Loan", href: "/loan", rate: "10.50%*" },
    { name: "Commercial Vehicle Loan", href: "/loan", rate: "8.75%*" },
    { name: "Machinery & Equipment Loan", href: "/loan", rate: "9.25%*" },
    { name: "Project & Working Capital", href: "/loan", rate: "9.50%*" },
  ];

  const investmentLinks = [
    { name: "Mutual Funds & SIP", href: "/investment", tag: "Wealth" },
    { name: "Life & Health Insurance", href: "/insurance", tag: "Security" },
    { name: "Corporate Fixed Deposits", href: "/investment", tag: "Up to 9.1%*" },
    { name: "Bonds & Debentures", href: "/bonds", tag: "Fixed Yield" },
    { name: "Demat & Equity Advisory", href: "/investment", tag: "Trading" },
  ];

  return (
    <header className="w-full relative z-[1000] font-sans">
      {/* ================= TOP ANNOUNCEMENT STRIP ================= */}
      <div className="bg-[#052e35] text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+919928593122"
              className="inline-flex items-center gap-1.5 hover:text-[#b69455] transition text-white/90"
            >
              <Phone size={13} className="text-[#b69455]" />
              <span>+91 99285 93122</span>
            </a>
            <a
              href="tel:+919928529222"
              className="inline-flex items-center gap-1.5 hover:text-[#b69455] transition text-white/90"
            >
              <Phone size={13} className="text-[#b69455]" />
              <span>+91 99285 29222</span>
            </a>
            <a
              href="mailto:info@sksinfi.com"
              className="inline-flex items-center gap-1.5 hover:text-[#b69455] transition text-white/90"
            >
              <Mail size={13} className="text-[#b69455]" />
              <span>info@sksinfi.com</span>
            </a>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-[#f9f0df] font-medium flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#b69455]" />
              Jaipur&apos;s #1 Trusted Financial Consultant
            </span>
            <div className="h-3 w-px bg-white/20" />
            <Link
              href="/partner"
              className="hover:text-[#b69455] transition text-white/90 font-medium"
            >
              Become Partner (DSA)
            </Link>
            <div className="h-3 w-px bg-white/20" />
            <Link
              href="/blogs"
              className="text-[#e2c48d] hover:text-white transition font-semibold"
            >
              Knowledge Hub
            </Link>
          </div>
        </div>
      </div>

      {/* ================= FLOATING PILL NAVBAR ================= */}
      <div
        className="w-full sticky top-0 z-[1000] transition-all duration-300 bg-white border-b border-slate-100"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "0 1px 3px rgba(0, 0, 0, 0.04)",
          paddingTop: isScrolled ? "10px" : "14px",
          paddingBottom: isScrolled ? "10px" : "14px"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <Image
              src="/images/skslogo.png"
              alt="SKS INFI Logo"
              width={180}
              height={55}
              priority
              style={{ width: "auto", height: "auto" }}
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center flex-row flex-nowrap gap-1 xl:gap-2"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center"
            }}
          >
            <Link
              href="/"
              style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#094b57] transition rounded-full hover:bg-slate-50"
            >
              Home
            </Link>

            {/* Loans Dropdown */}
            <div
              className="relative inline-flex items-center"
              style={{ display: "inline-flex", alignItems: "center", position: "relative" }}
              onMouseEnter={() => setActiveDropdown("loans")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                style={{ backgroundColor: "transparent", color: "#1e293b", width: "auto", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#094b57] transition rounded-full hover:bg-slate-50 cursor-pointer border-0"
              >
                <span>Loans</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "loans" ? "rotate-180 text-[#094b57]" : "text-slate-400"
                  }`}
                />
              </button>

              {activeDropdown === "loans" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 pt-3 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#094b57] px-3 mb-1.5">
                    Loan Solutions
                  </div>
                  <div className="space-y-1">
                    {loanLinks.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#094b57] hover:bg-slate-50 rounded-xl transition"
                      >
                        <span>{item.name}</span>
                        <span className="text-[10px] font-bold text-[#b69455] bg-[#f9f0df] px-2 py-0.5 rounded-full">
                          {item.rate}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Investments Dropdown */}
            <div
              className="relative inline-flex items-center"
              style={{ display: "inline-flex", alignItems: "center", position: "relative" }}
              onMouseEnter={() => setActiveDropdown("investments")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                style={{ backgroundColor: "transparent", color: "#1e293b", width: "auto", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#094b57] transition rounded-full hover:bg-slate-50 cursor-pointer border-0"
              >
                <span>Investments</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "investments" ? "rotate-180 text-[#094b57]" : "text-slate-400"
                  }`}
                />
              </button>

              {activeDropdown === "investments" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 pt-3 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#094b57] px-3 mb-1.5">
                    Wealth &amp; Protection
                  </div>
                  <div className="space-y-1">
                    {investmentLinks.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#094b57] hover:bg-slate-50 rounded-xl transition"
                      >
                        <span>{item.name}</span>
                        <span className="text-[10px] font-bold text-[#094b57] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                          {item.tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/sksinfi_nri"
              style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#094b57] transition rounded-full hover:bg-slate-50"
            >
              NRI Desk
            </Link>

            <Link
              href="/calculator"
              style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#094b57] transition rounded-full hover:bg-slate-50"
            >
              <Calculator size={14} className="text-[#b69455]" />
              <span>Calculators</span>
            </Link>

            <Link
              href="/blogs"
              style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#094b57] transition rounded-full hover:bg-slate-50"
            >
              Blogs
            </Link>

            <Link
              href="/about"
              style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#094b57] transition rounded-full hover:bg-slate-50"
            >
              About
            </Link>

            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
              className="px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#094b57] transition rounded-full hover:bg-slate-50"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button (ApnaRupee pill style in SKS INFI colors) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleApplyClick("Loans", "Home Loan")}
              style={{
                background: "linear-gradient(135deg, #094b57 0%, #0d6170 50%, #b69455 100%)",
                boxShadow: "0 4px 14px rgba(9, 75, 87, 0.25)",
                width: "auto"
              }}
              className="text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center gap-1.5 hover:opacity-95 transition-all transform hover:-translate-y-0.5"
            >
              <span>Apply Online</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => handleApplyClick()}
              style={{ background: "#094b57" }}
              className="text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full sm:hidden"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#094b57] rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE OVERLAY MENU ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[70px] bg-white border-b border-slate-200 shadow-2xl p-4 max-h-[85vh] overflow-y-auto z-[999] animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2 pb-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
            >
              Home
            </Link>

            <div className="border-t border-slate-100 pt-2">
              <div className="px-3 py-1 text-xs font-bold text-[#094b57] uppercase tracking-wider">
                Loans
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {loanLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2">
              <div className="px-3 py-1 text-xs font-bold text-[#094b57] uppercase tracking-wider">
                Investments &amp; Wealth
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {investmentLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2 space-y-1">
              <Link
                href="/sksinfi_nri"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                NRI Desk
              </Link>
              <Link
                href="/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Calculators (EMI &amp; SIP)
              </Link>
              <Link
                href="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Knowledge Hub / Blogs
              </Link>
              <Link
                href="/partner"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Become Partner (DSA)
              </Link>
              <Link
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Careers
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                About SKS INFI
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Call & Apply CTAs */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href="tel:+919928593122"
                className="flex items-center justify-center gap-1.5 py-3 px-3 bg-slate-100 text-[#094b57] text-xs font-bold rounded-xl"
              >
                <Phone size={14} className="text-[#b69455]" />
                <span>Call Us</span>
              </a>
              <button
                type="button"
                onClick={() => handleApplyClick()}
                style={{ background: "linear-gradient(135deg, #094b57 0%, #b69455 100%)" }}
                className="py-3 px-3 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-md"
              >
                <span>Apply Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Internal EnquiryModal fallback */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategory={modalCat}
        initialProduct={modalProd}
      />
    </header>
  );
}
