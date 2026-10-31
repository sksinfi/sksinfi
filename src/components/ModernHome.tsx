"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Building,
  Briefcase,
  Truck,
  Cog,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  IndianRupee,
  Phone,
  CheckCircle2,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  Award,
  Users,
  FileCheck,
  Percent,
  Sparkles,
  Calculator,
  Compass,
  Check
} from "lucide-react";
import EnquiryModal from "@/components/EnquiryModal";

export default function ModernHome() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("Loans");
  const [modalProduct, setModalProduct] = useState("Home Loan");

  // Calculator State: Loan EMI
  const [calcTab, setCalcTab] = useState<"emi" | "sip">("emi");
  const [loanAmount, setLoanAmount] = useState(3000000); // 30 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 Years

  // Calculator State: SIP
  const [sipMonthly, setSipMonthly] = useState(10000); // 10k/mo
  const [sipRate, setSipRate] = useState(12.5); // 12.5%
  const [sipYears, setSipYears] = useState(15); // 15 years

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const openEnquiry = (cat = "Loans", prod = "Home Loan") => {
    setModalCategory(cat);
    setModalProduct(prod);
    setModalOpen(true);
  };

  // EMI Formula
  const tenureMonths = tenureYears * 12;
  const monthlyRate = interestRate / 12 / 100;
  const emiValue =
    monthlyRate > 0
      ? Math.round(
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
            (Math.pow(1 + monthlyRate, tenureMonths) - 1)
        )
      : Math.round(loanAmount / tenureMonths);
  const totalLoanPayment = emiValue * tenureMonths;
  const totalLoanInterest = Math.max(0, totalLoanPayment - loanAmount);

  // SIP Formula
  const sipMonths = sipYears * 12;
  const sipMonthlyRate = sipRate / 12 / 100;
  const sipInvested = sipMonthly * sipMonths;
  const sipMaturity =
    sipMonthlyRate > 0
      ? Math.round(
          sipMonthly *
            ((Math.pow(1 + sipMonthlyRate, sipMonths) - 1) / sipMonthlyRate) *
            (1 + sipMonthlyRate)
        )
      : sipInvested;
  const sipEstReturns = Math.max(0, sipMaturity - sipInvested);

  // 9 Products matching ApnaRupee
  const loanProducts = [
    {
      id: "home-loan",
      title: "Home Loan",
      rate: "8.35% P.A.*",
      icon: Home,
      desc: "Turn your dream home into reality with low rates, customized tenures up to 30 years, and instant sanctions.",
      highlights: [
        "Up to 90% property value financing",
        "Tenure up to 30 years with lowest EMIs",
        "Quick approval & zero pre-payment penalty"
      ],
      tag: "Most Popular",
      category: "Loans",
      productName: "Home Loan"
    },
    {
      id: "lap",
      title: "Loan Against Property",
      rate: "9.00% P.A.*",
      icon: Building,
      desc: "Unlock the hidden market value of your residential or commercial property for business expansion or urgent capital.",
      highlights: [
        "High loan value up to ₹10+ Crores",
        "Retain 100% property ownership & use",
        "Flexible repayment tenures up to 15 years"
      ],
      tag: "High Value",
      category: "Loans",
      productName: "Loan Against Property"
    },
    {
      id: "commercial-loan",
      title: "Commercial Purchase Loan",
      rate: "8.75% P.A.*",
      icon: Briefcase,
      desc: "Buy retail shops, office spaces, corporate showrooms, or commercial plots with structured loan options.",
      highlights: [
        "Funding for offices, shops & plots",
        "Customized solutions for self-employed",
        "Competitive rates from leading PSU & Private banks"
      ],
      tag: "Business Growth",
      category: "Loans",
      productName: "Commercial Purchase Loan"
    },
    {
      id: "vehicle-loan",
      title: "Commercial Vehicle Loan",
      rate: "7.45% P.A.*",
      icon: Truck,
      desc: "Finance trucks, buses, tankers, construction vehicles, and fleet expansions with minimal documentation.",
      highlights: [
        "Up to 95% funding on chassis & body",
        "New & used commercial vehicles supported",
        "Fast doorstep documentation in Rajasthan"
      ],
      tag: "Fast Track",
      category: "Loans",
      productName: "Commercial Vehicle Loan"
    },
    {
      id: "machinery-loan",
      title: "Machinery & Equipment Loan",
      rate: "9.25% P.A.*",
      icon: Cog,
      desc: "Upgrade manufacturing plants, medical clinics, or industrial machinery without dipping into operating capital.",
      highlights: [
        "Collateral-free options up to ₹2 Crores",
        "Subsidized government scheme tie-ups",
        "Preserve working capital for daily operations"
      ],
      tag: "Industrial",
      category: "Loans",
      productName: "Machinery Loan"
    },
    {
      id: "education-loan",
      title: "Education Loan",
      rate: "7.35% P.A.*",
      icon: GraduationCap,
      desc: "Empower global academic dreams with 100% tuition, travel, and living expense coverage for India and abroad.",
      highlights: [
        "Covers tuition, living expenses & airfare",
        "Repayment starts after course completion",
        "Tax benefits under Section 80E"
      ],
      tag: "Study Abroad",
      category: "Loans",
      productName: "Education Loan"
    },
    {
      id: "business-loan",
      title: "MSME & Unsecured Loan",
      rate: "10.50% P.A.*",
      icon: TrendingUp,
      desc: "Fuel inventory, seasonal business demands, or immediate cash flow without collateral security.",
      highlights: [
        "Disbursal within 48 to 72 hours",
        "Minimal balance sheet requirements",
        "Flexible drop-line overdraft options"
      ],
      tag: "Instant Approval",
      category: "Loans",
      productName: "Business Loan"
    },
    {
      id: "insurance-sip",
      title: "Mutual Funds & SIP",
      rate: "Wealth Compounding",
      icon: Award,
      desc: "Grow generational wealth with NISM certified fund allocation, tax-saving ELSS, and tailored goal portfolios.",
      highlights: [
        "Curated top-quartile mutual fund schemes",
        "Periodic portfolio review & rebalancing",
        "Zero commission fee direct advisory"
      ],
      tag: "Wealth Creation",
      category: "Investments",
      productName: "Mutual Funds & SIP"
    },
    {
      id: "banking-advisory",
      title: "Insurance & Advisory",
      rate: "100% Protection",
      icon: ShieldCheck,
      desc: "Safeguard family and commercial assets with tailored Term, Health, Cyber, and Marine insurance policies.",
      highlights: [
        "Hassle-free claim settlement assistance",
        "Cashless hospitalization network coverage",
        "Corporate group health insurance policies"
      ],
      tag: "Protection",
      category: "Insurance",
      productName: "Insurance Advisory"
    }
  ];

  // 4-step process
  const steps = [
    {
      num: "01",
      title: "Check Eligibility",
      desc: "Instant assessment based on your income, CIBIL score, and loan requirement."
    },
    {
      num: "02",
      title: "Submit Application",
      desc: "Digital or doorstep document collection handled by your dedicated relationship manager."
    },
    {
      num: "03",
      title: "Get Sanctioned",
      desc: "We negotiate across 45+ banks to secure your approval at the lowest available ROI."
    },
    {
      num: "04",
      title: "Receive Funds",
      desc: "Direct loan disbursement into your bank account with complete legal compliance."
    }
  ];

  // Bank partners
  const partnerBanks = [
    "HDFC Bank",
    "State Bank of India",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra",
    "Bajaj Finserv",
    "Tata Capital",
    "PNB Housing",
    "Aditya Birla Capital",
    "Hero Fincorp",
    "L&T Finance",
    "Godrej Housing Finance"
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Hari Sharma",
      role: "Business Owner, Jaipur",
      quote:
        "SKS INFI helped me secure a ₹1.5 Cr Loan Against Property at an unbelievable 8.85% ROI when two other banks rejected my file. Their doorstep service and transparent handling were unmatched!",
      stars: 5,
      loan: "Loan Against Property"
    },
    {
      name: "Hitesh Kakrecha",
      role: "Architect & Real Estate Investor",
      quote:
        "Got my Home Loan sanctioned in just 3 days! The team compared rates between HDFC, SBI, and ICICI, saving me over ₹4.2 Lakhs in total interest over 15 years. Highly recommended financial consultant.",
      stars: 5,
      loan: "Home Loan"
    },
    {
      name: "Yogesh Pansare",
      role: "Industrial Manufacturer, RIICO Jaipur",
      quote:
        "From machinery financing to working capital credit line, SKS INFI delivered seamless execution with zero upfront hassle. Truly the most professional financial advisors in Rajasthan.",
      stars: 5,
      loan: "Machinery & MSME Loan"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "What is the minimum CIBIL score required for a Home or Business Loan?",
      a: "A CIBIL score of 700 or above is generally preferred by top tier banks for prime interest rates. However, at SKS INFI, we partner with 45+ banks and NBFCs, allowing us to find tailored loan solutions even for customers with lower scores or specific credit profiles."
    },
    {
      q: "How fast can my loan get sanctioned and disbursed?",
      a: "Unsecured business loans can be sanctioned within 48 to 72 hours. Home Loans and Loans Against Property typically take 5 to 7 working days, subject to property title verification and legal-technical clearance."
    },
    {
      q: "Can I transfer my existing high-interest loan to another bank?",
      a: "Yes! With our Loan Balance Transfer service, we can transfer your existing loan to a new bank offering lower interest rates, reducing your monthly EMI and total interest burden, plus providing an optional Top-Up loan."
    },
    {
      q: "Does SKS INFI charge any upfront fees for loan consultation?",
      a: "No. Our preliminary consultation, loan comparison, and eligibility assessment are 100% free of charge. We believe in complete transparency and zero hidden surprises."
    },
    {
      q: "How does SKS INFI assist NRIs looking to invest or take loans in Jaipur?",
      a: "We offer dedicated NRI financial desks with power-of-attorney documentation assistance, NRE/NRO banking, home loans for properties in India, and tax-efficient mutual fund investment portfolios."
    },
    {
      q: "How can I become a DSA Partner or Referral Partner with SKS INFI?",
      a: "Financial advisors, chartered accountants, real estate agents, and loan professionals can partner with SKS INFI to earn attractive payout structures, fast processing, and institutional support. Simply click 'Partner With Us' in the menu or contact us."
    }
  ];

  return (
    <div className="w-full bg-[#fcfdfd] text-[#2d3748] font-sans antialiased overflow-x-hidden">
      {/* ================= HERO SECTION (ApnaRupee layout) ================= */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#f4f8f9] via-[#ffffff] to-[#ffffff]">
        {/* Ambient background glow elements in SKS Teal & Gold */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#094b57]/8 to-[#b69455]/12 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#094b57]/5 rounded-full blur-3xl pointer-events-none -ml-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#b69455]/40 shadow-sm text-xs sm:text-sm font-semibold text-[#094b57] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#b69455] animate-ping" />
                <span>Jaipur&apos;s #1 Certified Financial Consultant &amp; Loan Syndicator</span>
              </div>

              {/* Dual-Tone Bold Heading (ApnaRupee signature style) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] text-[#094b57] mb-6">
                Compare Best Loan Offers{" "}
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#b69455] via-[#c9a764] to-[#094b57]">
                  With Lowest Interest Rates
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#556972] max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Unlock instant loan sanctions, minimal paperwork, and doorstep financial guidance from <strong className="text-[#094b57]">45+ leading banks &amp; NBFCs</strong>. Save lakhs in interest with SKS INFI.
              </p>

              {/* Quick checklist pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-[#094b57] mb-9">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#b69455]/20 flex items-center justify-center text-[#b69455]">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>Instant Eligibility Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#b69455]/20 flex items-center justify-center text-[#b69455]">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>Lowest ROI Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#b69455]/20 flex items-center justify-center text-[#b69455]">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span>100% Paperless &amp; Doorstep</span>
                </div>
              </div>

              {/* Dual CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => openEnquiry("Loans", "Quick Loan Comparison")}
                  style={{
                    background: "linear-gradient(135deg, #094b57 0%, #0d5966 100%)",
                    color: "#ffffff"
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-[#094b57]/20 hover:shadow-[#094b57]/40 hover:-translate-y-0.5 transition duration-200 text-sm sm:text-base flex items-center justify-center gap-2 group cursor-pointer border-0"
                >
                  <span>Apply For Loan Now</span>
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#loan-products"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#094b57] font-semibold border-2 border-[#094b57]/20 hover:border-[#b69455] hover:bg-[#b69455]/5 transition duration-200 text-sm sm:text-base text-center"
                >
                  Explore All Products
                </a>
              </div>

              {/* Trust ratings row */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-[#556972]">
                <div className="flex text-[#b69455]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-[#b69455]" />
                  ))}
                </div>
                <span>
                  <strong className="text-[#094b57]">4.9 / 5.0 Rating</strong> based on 1,500+ client reviews
                </span>
              </div>
            </div>

            {/* Right Column: 3x3 Circular Product Showcase (ApnaRupee Signature) */}
            <div className="lg:col-span-5">
              <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#094b57]/10 shadow-[0_20px_50px_rgba(9,75,87,0.08)] relative">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b69455]">Instant Services</span>
                    <h3 className="text-lg font-bold text-[#094b57]">Select Loan Category</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#094b57]/10 text-[#094b57]">
                    45+ Banks
                  </span>
                </div>

                {/* 3x3 Grid of Circular Icons */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                  {[
                    { name: "Home Loan", icon: Home, rate: "8.35%*" },
                    { name: "Property Loan", icon: Building, rate: "9.00%*" },
                    { name: "Commercial", icon: Briefcase, rate: "8.75%*" },
                    { name: "Vehicle Loan", icon: Truck, rate: "7.45%*" },
                    { name: "Machinery", icon: Cog, rate: "9.25%*" },
                    { name: "Education", icon: GraduationCap, rate: "7.35%*" },
                    { name: "Business", icon: TrendingUp, rate: "10.5%*" },
                    { name: "Mutual Funds", icon: Award, rate: "SIP" },
                    { name: "Insurance", icon: ShieldCheck, rate: "Cover" }
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => openEnquiry("Loans", item.name)}
                        className="group flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-white hover:bg-[#f4f8f9] transition-all duration-200 border border-slate-100 hover:border-[#b69455]/40 hover:shadow-md cursor-pointer"
                      >
                        <div
                          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2 shadow-md transition-all duration-300 transform group-hover:scale-110"
                          style={{
                            background: "linear-gradient(135deg, #094b57 0%, #0e6b7d 100%)",
                            color: "#ffffff"
                          }}
                        >
                          <IconComponent size={24} color="#ffffff" />
                        </div>
                        <span className="text-xs font-semibold text-[#094b57] group-hover:text-[#b69455] transition-colors leading-tight line-clamp-1">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold text-[#b69455] mt-0.5">
                          {item.rate}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Callout box inside hero card */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#556972]">
                    <ShieldCheck size={16} className="text-[#094b57]" />
                    <span>Safe &amp; 100% Encrypted</span>
                  </div>
                  <button
                    onClick={() => openEnquiry("Loans", "Quick Consultation")}
                    className="text-[#094b57] hover:text-[#b69455] font-bold flex items-center gap-1 transition"
                  >
                    Quick Check <ChevronDown size={14} className="-rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9 GLOSSY LOAN CARDS (ApnaRupee Core Theme) ================= */}
      <section id="loan-products" className="py-16 sm:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#b69455] bg-[#b69455]/10 px-3.5 py-1.5 rounded-full mb-3">
              Comprehensive Financial Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#094b57] tracking-tight">
              Our Loan &amp; Wealth Products
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#094b57] to-[#b69455] mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-base text-[#556972]">
              Choose from customized credit solutions with competitive interest rates and tailored advisory for individuals, doctors, traders, and businesses.
            </p>
          </div>

          {/* 9 Product Cards in 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanProducts.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.id}
                  className="loan-card glossy-card group relative bg-gradient-to-b from-white to-[#fbfdfd] rounded-2xl p-6 sm:p-7 border border-[#e2e8f0] hover:border-[#b69455]/50 shadow-[0_10px_30px_-5px_rgba(9,75,87,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(9,75,87,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Top Badge: Tag & Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-[#094b57]/10 text-[#094b57]">
                        {p.tag}
                      </span>
                      {/* ApnaRupee Signature Rate Pill */}
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#b69455]/15 to-[#d4af37]/25 text-[#094b57] border border-[#b69455]/40 shadow-xs">
                        {p.rate}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #094b57 0%, #0e6b7d 100%)",
                          color: "#ffffff"
                        }}
                      >
                        <IconComp size={26} color="#ffffff" />
                      </div>
                      <h3 className="text-xl font-bold text-[#094b57] group-hover:text-[#b69455] transition-colors">
                        {p.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#556972] mb-5 leading-relaxed">
                      {p.desc}
                    </p>

                    {/* Highlights Checklist */}
                    <ul className="space-y-2 mb-6 text-xs text-[#3a4d56]">
                      {p.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#b69455] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dual Action Buttons (ApnaRupee: Call Now + Apply) */}
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <a
                      href="tel:+919928593122"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#f4f8f9] hover:bg-[#094b57] text-[#094b57] hover:text-white font-semibold text-xs sm:text-sm text-center transition duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Phone size={14} />
                      <span>Call Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => openEnquiry(p.category, p.productName)}
                      style={{
                        background: "linear-gradient(135deg, #094b57 0%, #0d5966 100%)",
                        color: "#ffffff"
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl hover:opacity-90 font-semibold text-xs sm:text-sm text-center transition duration-200 shadow-sm flex items-center justify-center gap-1 cursor-pointer border-0"
                    >
                      <span>Apply</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TEAL CALLOUT BANNER (ApnaRupee "Start Your Financial Journey") ================= */}
      <section className="py-14 bg-gradient-to-r from-[#052e35] via-[#094b57] to-[#052e35] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#b69455_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#b69455]/20 text-[#f9f0df] border border-[#b69455]/40 mb-3">
                <Sparkles size={13} className="text-[#b69455]" />
                Zero Obligation Consultation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Start Your Financial Journey With SKS INFI
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Connect with our senior banking advisors to compare customized sanction limits, evaluate your loan eligibility, and get your file processed fast.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openEnquiry("General", "Free Eligibility Evaluation")}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#b69455] to-[#d4af37] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition duration-200"
              >
                Check Loan Eligibility
              </button>
              <a
                href="tel:+919928593122"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 transition flex items-center gap-2"
              >
                <Phone size={16} className="text-[#b69455]" />
                <span>+91 99285 93122</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS COUNTER BAR (ApnaRupee Stats Section) ================= */}
      <section className="py-12 bg-[#f4f8f9] border-y border-[#094b57]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#094b57] mb-1 flex items-center justify-center">
                <span>₹500+</span>
                <span className="text-[#b69455] ml-1">Cr</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#556972]">Business Disbursed</p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#094b57] mb-1 flex items-center justify-center">
                <span>45+</span>
                <span className="text-[#b69455] ml-1">Banks</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#556972]">Banking &amp; NBFC Partners</p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#094b57] mb-1 flex items-center justify-center">
                <span>15,000+</span>
                <span className="text-[#b69455] ml-1">Clients</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#556972]">Satisfied Borrowers</p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#094b57] mb-1 flex items-center justify-center">
                <span>15+</span>
                <span className="text-[#b69455] ml-1">Years</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#556972]">Industry Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT & 4-STEP PROCESS (ApnaRupee "Building Trust Through Financial Solutions") ================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Column: Trust Badges & Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#094b57] to-[#052e35] p-8 text-white">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#b69455]/20 border border-[#b69455]/40 flex items-center justify-center text-[#f9f0df] mb-4">
                    <Award size={30} className="text-[#b69455]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">SKS INFI</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Empowering Rajasthan &amp; India with institutional financial solutions, tailored debt restructuring, and wealth advisory.
                  </p>
                </div>

                <div className="space-y-4 text-xs pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#b69455] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">RERA Registered</strong>
                      <span className="text-white/70">Certified Financial Consulting Firm</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#b69455] text-white flex items-center justify-center shrink-0">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">NISM Certified Advisory</strong>
                      <span className="text-white/70">Institutional Wealth &amp; Mutual Funds</span>
                    </div>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#f9f0df]">
                  <span>Jaipur Headquartered</span>
                  <span className="font-bold text-[#b69455]">Serving Pan-India</span>
                </div>
              </div>
            </div>

            {/* Right Column: Why Choose Us */}
            <div className="lg:col-span-7">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#b69455] bg-[#b69455]/10 px-3.5 py-1.5 rounded-full mb-3">
                Building Trust Through Financial Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#094b57] tracking-tight mb-4">
                Why Thousands Choose SKS INFI Over Traditional Agents
              </h2>
              <p className="text-base text-[#556972] mb-6 leading-relaxed">
                Applying directly to a single bank often results in rigid criteria, higher interest rates, or rejection. SKS INFI syndicates your file across 45+ premier financial institutions to secure the lowest possible ROI and maximum sanctioned loan amount.
              </p>

              {/* 4 Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#f4f8f9] border border-gray-100">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <CheckCircle2 size={18} className="text-[#b69455]" />
                    <h4 className="font-bold text-sm text-[#094b57]">100% Unbiased Advisory</h4>
                  </div>
                  <p className="text-xs text-[#556972]">
                    We work for you, not the banks. We recommend the offer with the lowest total interest cost.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#f4f8f9] border border-gray-100">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <CheckCircle2 size={18} className="text-[#b69455]" />
                    <h4 className="font-bold text-sm text-[#094b57]">Dedicated Relationship Mgr</h4>
                  </div>
                  <p className="text-xs text-[#556972]">
                    A single personal point of contact coordinates paperwork, valuation, and legal clearance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#f4f8f9] border border-gray-100">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <CheckCircle2 size={18} className="text-[#b69455]" />
                    <h4 className="font-bold text-sm text-[#094b57]">Fast-Track Processing</h4>
                  </div>
                  <p className="text-xs text-[#556972]">
                    Priority institutional queues ensure your application does not sit in branch backlogs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#f4f8f9] border border-gray-100">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <CheckCircle2 size={18} className="text-[#b69455]" />
                    <h4 className="font-bold text-sm text-[#094b57]">Complete Transparency</h4>
                  </div>
                  <p className="text-xs text-[#556972]">
                    No hidden brokerage charges, no surprise fees. Everything documented upfront.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Step Process Section (Check Eligibility -> Submit Application -> Get Sanctioned -> Receive Funds) */}
          <div className="mt-12 pt-12 border-t border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-2xl font-bold text-[#094b57]">
                How It Works: 4 Simple Steps to Your Loan
              </h3>
              <p className="text-xs sm:text-sm text-[#556972] mt-1">
                Fast, seamless, and completely transparent from inquiry to final disbursal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-gradient-to-b from-[#fbfdfd] to-[#f4f8f9] border border-[#e2e8f0] text-center group hover:border-[#b69455] hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-full font-black text-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all shadow-md"
                    style={{
                      background: "linear-gradient(135deg, #094b57 0%, #0e6b7d 100%)",
                      color: "#f9f0df"
                    }}
                  >
                    {s.num}
                  </div>
                  <h4 className="text-base font-bold text-[#094b57] mb-2">{s.title}</h4>
                  <p className="text-xs text-[#556972] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE CALCULATORS PREVIEW (ApnaRupee Calculator Section) ================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#f4f8f9] to-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#b69455] bg-[#b69455]/10 px-3.5 py-1.5 rounded-full mb-3">
              Financial Planning Tools
            </span>
            <h2 className="text-3xl font-extrabold text-[#094b57]">
              Interactive Financial Calculators
            </h2>
            <p className="text-sm text-[#556972] mt-2">
              Plan your borrowing or investment journey with precision using our real-time financial calculators.
            </p>

            {/* Tab switch */}
            <div className="inline-flex p-1 bg-white rounded-full border border-gray-200 mt-6 shadow-sm">
              <button
                type="button"
                onClick={() => setCalcTab("emi")}
                style={{
                  backgroundColor: calcTab === "emi" ? "#094b57" : "transparent",
                  color: calcTab === "emi" ? "#ffffff" : "#556972"
                }}
                className="px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition"
              >
                Loan EMI Calculator
              </button>
              <button
                type="button"
                onClick={() => setCalcTab("sip")}
                style={{
                  backgroundColor: calcTab === "sip" ? "#094b57" : "transparent",
                  color: calcTab === "sip" ? "#ffffff" : "#556972"
                }}
                className="px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition"
              >
                Mutual Fund SIP Calculator
              </button>
            </div>
          </div>

          {/* Calculator Card Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e2e8f0] shadow-xl">
            {calcTab === "emi" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Sliders */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Loan Amount */}
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#094b57] mb-2">
                      <span>Loan Amount</span>
                      <span className="text-[#b69455] text-base font-bold">
                        ₹ {loanAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={20000000}
                      step={50000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      style={{ accentColor: "#094b57", width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "4px" }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                      <span>₹1 Lakh</span>
                      <span>₹2 Crores</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#094b57] mb-2">
                      <span>Interest Rate (% P.A.)</span>
                      <span className="text-[#b69455] text-base font-bold">
                        {interestRate} %
                      </span>
                    </div>
                    <input
                      type="range"
                      min={6.5}
                      max={18.0}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      style={{ accentColor: "#094b57", width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "4px" }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                      <span>6.5%</span>
                      <span>18.0%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#094b57] mb-2">
                      <span>Loan Tenure (Years)</span>
                      <span className="text-[#b69455] text-base font-bold">
                        {tenureYears} Years
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      style={{ accentColor: "#094b57", width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "4px" }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* Result Panel */}
                <div
                  className="lg:col-span-5 rounded-2xl p-6 sm:p-7 text-center shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #094b57 0%, #052e35 100%)",
                    color: "#ffffff"
                  }}
                >
                  <span className="text-xs uppercase tracking-wider text-[#b69455] font-bold block mb-1">
                    Monthly Loan EMI
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#f9f0df] mb-6">
                    ₹ {emiValue.toLocaleString("en-IN")}
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-left mb-6 pt-4 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-white/70">Principal Loan Amount</span>
                      <span className="font-semibold">₹ {loanAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Total Interest Payable</span>
                      <span className="font-semibold text-[#b69455]">
                        ₹ {totalLoanInterest.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-white/10 text-white">
                      <span>Total Payment (P + I)</span>
                      <span>₹ {totalLoanPayment.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openEnquiry("Loans", `Home Loan (EMI ₹${emiValue.toLocaleString("en-IN")})`)}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#b69455] to-[#d4af37] text-white font-bold text-sm hover:scale-105 transition shadow-lg"
                  >
                    Apply with this EMI
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* SIP Sliders */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Monthly Investment */}
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#094b57] mb-2">
                      <span>Monthly SIP Amount</span>
                      <span className="text-[#b69455] text-base font-bold">
                        ₹ {sipMonthly.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={100000}
                      step={500}
                      value={sipMonthly}
                      onChange={(e) => setSipMonthly(Number(e.target.value))}
                      style={{ accentColor: "#094b57", width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "4px" }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                      <span>₹500 / mo</span>
                      <span>₹1,00,000 / mo</span>
                    </div>
                  </div>

                  {/* Expected Rate of Return */}
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#094b57] mb-2">
                      <span>Expected Annual Return (% P.A.)</span>
                      <span className="text-[#b69455] text-base font-bold">
                        {sipRate} %
                      </span>
                    </div>
                    <input
                      type="range"
                      min={8}
                      max={20}
                      step={0.5}
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      style={{ accentColor: "#094b57", width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "4px" }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                      <span>8%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Investment Period */}
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#094b57] mb-2">
                      <span>Investment Period (Years)</span>
                      <span className="text-[#b69455] text-base font-bold">
                        {sipYears} Years
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      style={{ accentColor: "#094b57", width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "4px" }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* SIP Result */}
                <div
                  className="lg:col-span-5 rounded-2xl p-6 sm:p-7 text-center shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #094b57 0%, #052e35 100%)",
                    color: "#ffffff"
                  }}
                >
                  <span className="text-xs uppercase tracking-wider text-[#b69455] font-bold block mb-1">
                    Expected Maturity Value
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#f9f0df] mb-6">
                    ₹ {sipMaturity.toLocaleString("en-IN")}
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-left mb-6 pt-4 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-white/70">Total Invested Amount</span>
                      <span className="font-semibold">₹ {sipInvested.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Estimated Wealth Gain</span>
                      <span className="font-semibold text-[#b69455]">
                        ₹ {sipEstReturns.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-white/10 text-white">
                      <span>Wealth Multiplier</span>
                      <span>{(sipMaturity / Math.max(1, sipInvested)).toFixed(1)}x</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openEnquiry("Investments", `Mutual Funds SIP (₹${sipMonthly}/mo)`)}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#b69455] to-[#d4af37] text-white font-bold text-sm hover:scale-105 transition shadow-lg"
                  >
                    Start this SIP with SKS INFI
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= PARTNER BANKS & NBFCS ================= */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#556972] mb-8">
            Direct Tie-Ups with 45+ Premier Banks &amp; NBFCs
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {partnerBanks.map((bank, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#f8fafd] border border-gray-100 flex items-center justify-center text-center font-bold text-xs text-[#094b57] hover:border-[#b69455] hover:bg-white hover:shadow-sm transition"
              >
                {bank}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (ApnaRupee .glossy-card.review-card) ================= */}
      <section className="py-16 sm:py-20 bg-[#fbfdfd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#b69455] bg-[#b69455]/10 px-3.5 py-1.5 rounded-full mb-3">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#094b57]">
              Trusted by 15,000+ Borrowers &amp; Investors
            </h2>
            <p className="text-sm text-[#556972] mt-2">
              Hear firsthand from Jaipur families and business owners who secured optimal financial outcomes with SKS INFI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glossy-card review-card bg-white rounded-2xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex text-[#b69455] mb-4">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} size={16} className="fill-[#b69455]" />
                    ))}
                  </div>

                  <p className="text-sm text-[#4a5568] italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#094b57]">{t.name}</h4>
                    <span className="text-xs text-gray-500">{t.role}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#094b57]/10 text-[#094b57]">
                    {t.loan}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Google Review Banner */}
          <div className="mt-12 bg-white rounded-2xl p-6 border border-[#b69455]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#094b57] text-white flex items-center justify-center font-bold text-lg">
                G
              </div>
              <div>
                <strong className="block text-sm text-[#094b57]">Rated 4.9/5 by Clients on Google</strong>
                <span className="text-xs text-gray-500">Verified reviews from authentic loan and investment cases</span>
              </div>
            </div>
            <a
              href="https://g.page/r/sksinfi/review"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#094b57] hover:bg-[#b69455] text-white font-semibold text-xs transition"
            >
              Write a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION (ApnaRupee Accordion) ================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#b69455] bg-[#b69455]/10 px-3.5 py-1.5 rounded-full mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#094b57]">
              Got Questions? We&apos;ve Got Answers
            </h2>
            <p className="text-sm text-[#556972] mt-2">
              Everything you need to know about loan eligibility, interest rates, and financial advisory.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-[#f9fbfd] transition"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#094b57]">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? "bg-[#094b57] text-white rotate-180" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-[#556972] leading-relaxed bg-white border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ENQUIRY MODAL ================= */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategory={modalCategory}
        initialProduct={modalProduct}
      />
    </div>
  );
}
