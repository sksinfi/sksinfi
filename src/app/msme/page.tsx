"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import { submitLoanEnquiry } from "@/lib/supabase";
import {
  Landmark,
  BadgePercent,
  Coins,
  TrendingUp,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Mail,
  Award,
  Clock,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  statPill: string;
  description: string;
  offerings: string[];
  eligibility: string;
  timeline: string;
  deliverables: string[];
}

const MSME_SERVICES: ServiceItem[] = [
  {
    id: "financial-solutions",
    title: "MSME Financial Solutions",
    subtitle: "Working Capital Optimization & Balance Sheet Advisory",
    badge: "Strategic Financial Advisory",
    icon: Landmark,
    statPill: "Optimized Cash Flow & Lower Borrowing Cost",
    description:
      "Comprehensive financial engineering designed to strengthen your enterprise's liquidity, balance sheet health, and credit rating. We restructure existing credit facilities, negotiate lower interest margins, and optimize Maximum Permissible Bank Finance (MPBF).",
    offerings: [
      "Working Capital & Cash Flow Assessment to eliminate liquidity bottlenecks",
      "Balance Sheet Health & Financial Ratio Structuring for bank credit committees",
      "Multi-Banking Consortium & Syndicated Debt Advisory across PSU and private banks",
      "Credit Rating Advisory (CRISIL, ICRA, CARE) to reduce overall borrowing spreads",
      "Debt Restructuring & Resolution of stressed credit lines for sustainable growth"
    ],
    eligibility: "Manufacturing, Trading, and Service MSMEs with annual turnover of ₹50 Lakhs to ₹250+ Crore.",
    timeline: "2 to 4 Weeks for Complete Diagnostic & Financial Structuring",
    deliverables: [
      "Detailed Financial Diagnostic Report",
      "Working Capital Assessment (CMA Data)",
      "Multi-Banking Negotiation Strategy",
      "Credit Spread Reduction Roadmap"
    ]
  },
  {
    id: "subsidy-solutions",
    title: "MSME Subsidy & Incentive Solutions",
    subtitle: "Central & State Government Grants & Fiscal Rebates",
    badge: "Government Grants & Incentives",
    icon: BadgePercent,
    statPill: "Up to 40% Capital Subsidy & Interest Rebate",
    description:
      "Maximize government grant disbursements and fiscal exemptions under Central and State industrial schemes—including Rajasthan Investment Promotion Scheme (RIPS 2024 / 2022), PMEGP, and CLCSS. We manage complete paperwork, DPR preparation, and nodal department liaising.",
    offerings: [
      "Capital Investment Subsidy (up to 25% to 40% grant on plant, machinery, and civil structures)",
      "Interest Subvention Schemes (5% to 8% interest subsidy on term loans for up to 5-7 years)",
      "100% Electricity Duty, Mandi Fee, and Land Conversion / Stamp Duty Exemptions",
      "Technology Upgradation, Quality Certification (ZED, ISO), and Patent Filing Grants",
      "Turnkey Detailed Project Report (DPR) preparation and nodal agency liaising through disbursement"
    ],
    eligibility: "New manufacturing/service units or existing enterprises undergoing expansion, diversification, or modernization in Rajasthan and pan-India.",
    timeline: "4 to 8 Weeks from DPR Submission to Scheme Sanction",
    deliverables: [
      "Scheme Eligibility & Subsidy Audit",
      "Bankable Detailed Project Report (DPR)",
      "Nodal Agency Application & Representation",
      "Disbursement Follow-Up till Credit"
    ]
  },
  {
    id: "loan-services",
    title: "MSME Loan & Financial Services",
    subtitle: "Collateral-Free CGTMSE Debt & Secured Credit Lines",
    badge: "Debt Financing & Credit Lines",
    icon: Coins,
    statPill: "Collateral-Free Up to ₹5–10 Crore",
    description:
      "Fast-track debt financing powered by relationships with 40+ PSU banks, leading private banks, and specialized MSME NBFCs. We facilitate collateral-free CGTMSE loans, machinery finance, and competitive Cash Credit/Overdraft limits tailored to your cash cycle.",
    offerings: [
      "Collateral-Free CGTMSE Business Loans from ₹25 Lakhs up to ₹5 Crore – ₹10 Crore",
      "Machinery & Industrial Equipment Purchase Loans with tenures extending up to 7–10 years",
      "Flexible Cash Credit (CC) & Overdraft (OD) limits against hypothecation of stock and debtors",
      "Industrial Plot, Factory Shed Construction, and Commercial Real Estate Mortgages",
      "Non-Fund Based Limits: Bank Guarantees (BG), Letters of Credit (LC), and Buyer's Credit"
    ],
    eligibility: "Enterprises with minimum 1-2 years of operational track record, positive net worth, and viable repayment cash flows.",
    timeline: "7 to 15 Working Days from Document Submission to Sanction",
    deliverables: [
      "Multi-Lender Comparative Offer Matrix",
      "CMA Preparation & Credit Appraisal Support",
      "Sanction Letter Issuance at Lowest ROI",
      "Post-Sanction Disbursement Handholding"
    ]
  },
  {
    id: "venture-capital",
    title: "Venture Capital & Private Equity",
    subtitle: "Growth Equity, Family Office Syndicates & Venture Debt",
    badge: "Equity & Institutional Funding",
    icon: TrendingUp,
    statPill: "Seed to Series B Institutional Capital",
    description:
      "Connect scaling MSMEs, technology-enabled manufacturers, and innovative consumer brands with institutional equity, angel networks, family offices, and venture debt providers. We manage valuation modeling, investor pitch decks, and term sheet negotiations.",
    offerings: [
      "Investor Readiness Diagnostic & Financial Valuation Modeling using DCF & Market Multiples",
      "Professional Pitch Deck, Executive Teaser, and Information Memorandum (IM) creation",
      "Direct Roadshows with Angel Networks, Family Offices, and Mid-Market Private Equity Funds",
      "Venture Debt & Mezzanine Financing for high-growth firms seeking low equity dilution",
      "Term Sheet structuring, Shareholder Agreements (SHA/SSA), and Due Diligence advisory"
    ],
    eligibility: "Fast-growing enterprises with demonstrated product-market fit, scalable unit economics, and minimum annual revenues of ₹3 Cr to ₹50+ Cr.",
    timeline: "8 to 16 Weeks for Complete Investor Matchmaking & Term Sheet Execution",
    deliverables: [
      "Comprehensive Investor Deck & Financial Model",
      "Curated Outreach to Active VC/PE Funds",
      "Term Sheet & Valuation Negotiation",
      "Due Diligence & Legal Closing Advisory"
    ]
  },
  {
    id: "treds-setup",
    title: "TReDS Setup – Invoice Discounting",
    subtitle: "RBI-Approved Receivables Discounting Without Collateral",
    badge: "Receivables Financing (RBI Authorized)",
    icon: Layers,
    statPill: "24–48 Hr Cash Flow Without Collateral",
    description:
      "Unlock trapped working capital by institutional discounting of trade receivables on RBI-authorized TReDS platforms (RXIL, M1xchange, Invoicemart). Convert supply invoices to large corporates, PSUs, and government departments into liquid cash within 24–48 hours without recourse.",
    offerings: [
      "Turnkey Onboarding on all three RBI-authorized exchanges: RXIL, M1xchange, and Invoicemart",
      "Digital buyer-supplier agreement setup and enterprise portal integration",
      "Collateral-Free, 'Without Recourse' invoice discounting with zero balance-sheet borrowing liability",
      "Competitive multi-bank reverse auction ensuring the absolute lowest factoring discount rates",
      "Ongoing operational desk support for continuous invoice uploading and auction monitoring"
    ],
    eligibility: "Registered MSMEs (Udyam registered) supplying goods or services to Corporates, PSUs, or Government Departments with credit terms.",
    timeline: "3 to 5 Working Days for Platform Onboarding & Account Activation",
    deliverables: [
      "TReDS Platform Registration & Verification",
      "Buyer Mapping & KYC Approval",
      "Live Auction Discounting Workflow",
      "Direct Escrow Bank Credit Integration"
    ]
  },
  {
    id: "msme-ipo",
    title: "MSME IPO Listing & Fundraising",
    subtitle: "Public Listing on BSE SME & NSE Emerge Platforms",
    badge: "Capital Markets & SME IPO",
    icon: Sparkles,
    statPill: "Listing on BSE SME & NSE Emerge",
    description:
      "Transform your privately held MSME into a publicly traded corporate leader. SKS INFI provides comprehensive advisory for BSE SME and NSE Emerge public listings—from merchant banker appointment and capital restructuring to prospectus drafting, roadshows, and bell-ringing.",
    offerings: [
      "Feasibility Study & Pre-IPO Diagnostic against BSE SME and NSE Emerge listing criteria",
      "Selection and coordination with SEBI-registered Merchant Bankers, Underwriters, and Legal Counsels",
      "Statutory Audit alignment, Corporate Governance enhancement, and Capital Restructuring",
      "Drafting and filing of Draft Red Herring Prospectus (DRHP) with stock exchanges",
      "Institutional roadshows, HNI syndicate pitching, Anchor Investor placement, and successful listing"
    ],
    eligibility: "Profitable MSMEs with post-issue paid-up capital up to ₹25 Crore, minimum 2-3 years of audited profitability, and strong growth trajectory.",
    timeline: "4 to 6 Months for Complete Pre-IPO Structuring & Listing",
    deliverables: [
      "SME IPO Readiness & Valuation Audit",
      "Merchant Banker & Underwriter Syndicate",
      "DRHP Drafting & Exchange Approvals",
      "Public Issue Execution & Ringing the Bell"
    ]
  }
];

const FAQS = [
  {
    q: "What is the maximum limit for Collateral-Free MSME Loans under CGTMSE?",
    a: "Under the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) scheme, eligible MSMEs can secure collateral-free credit facilities up to ₹5 Crore (and in select expanded schemes/categories up to ₹10 Crore) from partner PSU banks and private institutions. SKS INFI assists with project viability assessment and documentation to ensure high sanction rates."
  },
  {
    q: "How does the Rajasthan Investment Promotion Scheme (RIPS 2024) benefit MSMEs?",
    a: "RIPS 2024 provides extensive fiscal incentives for enterprises setting up new manufacturing/service units or expanding existing facilities in Rajasthan. Benefits include Capital Investment Subsidies of up to 25%–40%, Interest Subvention of 5%–8% for up to 5–7 years, 100% exemption on Electricity Duty, Mandi Fee, and Stamp Duty. SKS INFI handles end-to-end DPR preparation and department liaison."
  },
  {
    q: "How does TReDS Invoice Discounting help solve delayed payment challenges?",
    a: "Trade Receivables Discounting System (TReDS) is an RBI-regulated digital exchange where MSMEs can upload approved invoices raised against large corporates and PSUs. Multiple banks bid competitively in an auction to finance the invoice, enabling you to receive payment within 24–48 hours at low interest rates without pledging any collateral, and on a 'without recourse' basis."
  },
  {
    q: "What are the primary eligibility criteria for an SME IPO on BSE SME or NSE Emerge?",
    a: "To list on BSE SME or NSE Emerge, a company generally needs a post-issue paid-up equity capital of up to ₹25 Crore, positive net tangible assets, at least 2–3 years of operational track record with operating profit (EBITDA), and clean corporate governance. SKS INFI guides businesses through pre-IPO audit, merchant banker selection, and full SEBI compliance."
  },
  {
    q: "Can SKS INFI help us combine Government Subsidies with Bank Term Loans?",
    a: "Yes! SKS INFI specializes in integrated financial engineering. We structure your bank term loans and working capital facilities in direct coordination with government subsidy policies (such as RIPS, PMEGP, or Central Capital Subsidies). This ensures that your project report satisfies bank underwriting while maximizing government grant disbursements."
  },
  {
    q: "What documents are required to start the MSME consultation process?",
    a: "To initiate an evaluation, we typically review your Udyam Registration Certificate, last 3 years of audited financials (P&L and Balance Sheet), GST returns for the past 12 months, 6-12 months of bank statements, and details of existing credit facilities. For startups seeking VC/PE, we additionally examine the business deck and revenue projections."
  }
];

export default function MsmePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState("MSME Financial Solutions");
  const [selectedServiceTab, setSelectedServiceTab] = useState(MSME_SERVICES[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [turnover, setTurnover] = useState("₹1 Cr - ₹5 Cr");
  const [serviceNeeded, setServiceNeeded] = useState("MSME Financial Solutions");
  const [city, setCity] = useState("Jaipur");
  const [message, setMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const handleOpenModal = (serviceName?: string) => {
    setModalService(serviceName || "MSME Financial Solutions");
    setModalOpen(true);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setFormError("Please enter your name and contact phone number.");
      return;
    }
    setFormLoading(true);
    setFormError("");

    try {
      await submitLoanEnquiry({
        name,
        phone,
        service_category: "MSME Advisory",
        product_name: serviceNeeded,
        city,
        message: `Company: ${companyName || "N/A"} | Turnover: ${turnover} | Details: ${message || "Interested in MSME consultation."}`
      });

      setFormSuccess(true);
      setName("");
      setPhone("");
      setCompanyName("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setFormError("Submission failed. Please call +91 99285 29222 directly for immediate support.");
    } finally {
      setFormLoading(false);
    }
  };

  const currentTabService = MSME_SERVICES.find((s) => s.id === selectedServiceTab) || MSME_SERVICES[0];

  return (
    <div className="msme-page min-h-screen flex flex-col bg-[#fcfcfa] text-[#333333]" suppressHydrationWarning>
      <Navbar onOpenEnquiry={(cat) => handleOpenModal(cat || "MSME Financial Solutions")} />

      <main className="flex-1 w-full">
        {/* ================= HERO SECTION ================= */}
        <section className="msme-dark-sec relative bg-gradient-to-br from-[#06323a] via-[#083d49] to-[#0a4f5e] text-white pt-12 pb-20 overflow-hidden">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-0 -mr-28 -mt-28 w-[460px] h-[460px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-[#b69455]/15 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-white/70 mb-6">
              <Link href="/" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }} className="hover:text-white transition">Home</Link>
              <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>/</span>
              <span style={{ color: "#e9c787", fontWeight: 600 }}>MSME Solutions</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Headline & Action */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#e9c787] text-xs font-semibold tracking-wide border border-[#b69455]/30">
                  <Sparkles size={14} className="text-[#e9c787]" />
                  <span style={{ color: "#e9c787" }}>360° MSME Capital & Growth Advisory • SKS INFI</span>
                </div>

                <h1
                  style={{
                    color: "#ffffff",
                    textTransform: "none",
                    lineHeight: "1.2",
                    letterSpacing: "-0.02em"
                  }}
                  className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight font-serif"
                >
                  Scale Your MSME with Strategic Capital, Subsidies & Public Listing
                </h1>

                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: "1.65",
                    fontSize: "16px",
                    fontWeight: 300,
                    margin: "0 0 20px 0"
                  }}
                >
                  From working capital and government subsidies to collateral-free credit lines, venture capital, and SME IPO listing on BSE SME & NSE Emerge. SKS INFI delivers turnkey financial advisory with 20+ years of proven expertise.
                </p>

                {/* Key Checklist Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-100">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#e9c787] shrink-0" />
                    <span style={{ color: "rgba(255, 255, 255, 0.95)" }}>Collateral-Free Loans up to ₹5–10 Cr</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#e9c787] shrink-0" />
                    <span style={{ color: "rgba(255, 255, 255, 0.95)" }}>Up to 40% Govt Subsidy (RIPS 2024 / PMEGP)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#e9c787] shrink-0" />
                    <span style={{ color: "rgba(255, 255, 255, 0.95)" }}>RBI-Approved TReDS Invoice Liquidity</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#e9c787] shrink-0" />
                    <span style={{ color: "rgba(255, 255, 255, 0.95)" }}>Turnkey BSE SME & NSE Emerge IPO Listing</span>
                  </div>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => handleOpenModal("MSME Financial Solutions")}
                    style={{
                      backgroundColor: "#b69455",
                      color: "#094b57",
                      border: "none",
                      cursor: "pointer"
                    }}
                    className="h-12 px-7 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>Book Free MSME Consultation</span>
                    <ArrowRight size={16} />
                  </button>

                  <a
                    href="#services"
                    style={{
                      color: "#ffffff",
                      textDecoration: "none",
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.25)"
                    }}
                    className="h-12 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 hover:bg-white/20"
                  >
                    <span>Explore 6 Services</span>
                    <ChevronDown size={16} />
                  </a>

                  <a
                    href="tel:+919928529222"
                    style={{
                      color: "#e9c787",
                      textDecoration: "none",
                      borderColor: "rgba(233, 199, 135, 0.4)"
                    }}
                    className="h-12 px-5 rounded-full bg-transparent hover:bg-white/10 font-semibold text-sm transition-all duration-300 flex items-center gap-2 border"
                  >
                    <PhoneCall size={16} />
                    <span>+91 99285 29222</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Visual Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl p-6 sm:p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <div>
                      <span style={{ color: "#e9c787" }} className="text-xs uppercase tracking-wider font-bold">
                        Institutional Reach
                      </span>
                      <h4 style={{ color: "#ffffff", textTransform: "none" }} className="text-xl font-bold mt-0.5">
                        MSME Growth Engine
                      </h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#b69455]/20 border border-[#b69455]/40 flex items-center justify-center text-[#e9c787]">
                      <Award size={24} />
                    </div>
                  </div>

                  {/* Bullet points on card */}
                  <div className="space-y-4 text-sm text-slate-100">
                    <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-[#b69455]/30 text-[#e9c787] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        01
                      </div>
                      <div>
                        <p style={{ color: "#ffffff", margin: 0, fontWeight: 600 }}>40+ Financial Institutions</p>
                        <p style={{ color: "rgba(255, 255, 255, 0.75)", margin: "2px 0 0 0", fontSize: "12px" }}>
                          PSU Banks, Private Lenders, NBFCs, and Venture Debt Funds.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-[#b69455]/30 text-[#e9c787] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        02
                      </div>
                      <div>
                        <p style={{ color: "#ffffff", margin: 0, fontWeight: 600 }}>Dedicated Scheme Officers</p>
                        <p style={{ color: "rgba(255, 255, 255, 0.75)", margin: "2px 0 0 0", fontSize: "12px" }}>
                          Expert preparation of Detailed Project Reports (DPR) & Subsidy filing.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-[#b69455]/30 text-[#e9c787] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        03
                      </div>
                      <div>
                        <p style={{ color: "#ffffff", margin: 0, fontWeight: 600 }}>Pre-IPO to Bell Ringing</p>
                        <p style={{ color: "rgba(255, 255, 255, 0.75)", margin: "2px 0 0 0", fontSize: "12px" }}>
                          Merchant banker selection, exchange filing, and public subscription.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                    <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>Zero upfront consultation charge</span>
                    <span style={{ color: "#e9c787", fontWeight: 600 }}>Jaipur & Pan-India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= IMPACT METRICS BAR ================= */}
        <section className="bg-white border-b border-gray-200 py-8 shadow-xs">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#094b57]" style={{ margin: 0 }}>₹500+ Cr</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium" style={{ margin: 0 }}>Capital & Debt Syndicated</p>
              </div>
              <div className="space-y-1 border-l border-gray-200">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#094b57]" style={{ margin: 0 }}>20+ Years</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium" style={{ margin: 0 }}>Financial & Banking Advisory</p>
              </div>
              <div className="space-y-1 border-l-0 md:border-l border-gray-200">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#094b57]" style={{ margin: 0 }}>1,500+</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium" style={{ margin: 0 }}>MSMEs & Enterprises Advised</p>
              </div>
              <div className="space-y-1 border-l border-gray-200">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#094b57]" style={{ margin: 0 }}>98%</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium" style={{ margin: 0 }}>Subsidy & Sanction Success</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6 CORE MSME SERVICES ================= */}
        <section id="services" className="py-20 bg-[#f9f8f5]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#094b57]/10 text-[#094b57] text-xs font-bold uppercase tracking-wider">
                Comprehensive Service Spectrum
              </span>
              <h2
                style={{ textTransform: "none", color: "#094b57" }}
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                Tailored Advisory for Every Stage of MSME Growth
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Whether you need immediate working capital, government grants, institutional factoring, equity investment, or public listing, our 6 core services provide end-to-end execution.
              </p>
            </div>

            {/* 6 Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MSME_SERVICES.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Row: Icon + Number Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#094b57]/10 to-[#b69455]/20 text-[#094b57] flex items-center justify-center group-hover:bg-[#094b57] group-hover:text-white transition-all duration-300 shadow-xs">
                          <IconComponent size={24} />
                        </div>
                        <span className="text-2xl font-black text-[#b69455]/30">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Service Tag */}
                      <span className="inline-block text-[11px] font-bold text-[#b69455] bg-[#b69455]/10 px-2.5 py-1 rounded-md mb-2">
                        {service.badge}
                      </span>

                      {/* Title & Subtitle */}
                      <h3
                        style={{ textTransform: "none", color: "#094b57" }}
                        className="text-xl font-bold group-hover:text-[#0c5e6d] transition mb-1"
                      >
                        {service.title}
                      </h3>
                      <p className="text-xs font-medium text-gray-500 mb-4" style={{ margin: "0 0 16px 0" }}>
                        {service.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-5" style={{ margin: "0 0 20px 0" }}>
                        {service.description}
                      </p>

                      {/* Offerings list */}
                      <div className="space-y-2.5 pt-4 border-t border-gray-100 mb-6">
                        {service.offerings.slice(0, 3).map((item, oIdx) => (
                          <div key={oIdx} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle2 size={14} className="text-[#094b57] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Card Area */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                        <Clock size={12} className="text-[#b69455]" />
                        <span>{service.timeline}</span>
                      </span>

                      <button
                        onClick={() => handleOpenModal(service.title)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#094b57] hover:text-[#b69455] transition"
                      >
                        <span>Enquire Now</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= INTERACTIVE SERVICE DEEP-DIVE TABS ================= */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#b69455]/15 text-[#8c6f37] text-xs font-bold uppercase tracking-wider">
                In-Depth Exploration
              </span>
              <h2
                style={{ textTransform: "none", color: "#094b57" }}
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                Service Deliverables & Eligibility Guide
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Click on any service below to examine specific deliverables, turnaround timelines, and eligibility criteria.
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
              {MSME_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedServiceTab(s.id)}
                  style={{
                    backgroundColor: selectedServiceTab === s.id ? "#094b57" : "#f1f3f5",
                    color: selectedServiceTab === s.id ? "#ffffff" : "#333333",
                    border: "none",
                    cursor: "pointer"
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    selectedServiceTab === s.id ? "shadow-md" : "hover:bg-gray-200"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Tab Content Card */}
            <div className="max-w-4xl mx-auto bg-[#fcfcfa] rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b69455]">
                    {currentTabService.badge}
                  </span>
                  <h3
                    style={{ textTransform: "none", color: "#094b57" }}
                    className="text-2xl sm:text-3xl font-bold mt-1 font-serif"
                  >
                    {currentTabService.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1" style={{ margin: "4px 0 0 0" }}>{currentTabService.subtitle}</p>
                </div>

                <button
                  onClick={() => handleOpenModal(currentTabService.title)}
                  style={{
                    backgroundColor: "#094b57",
                    color: "#ffffff",
                    border: "none",
                    cursor: "pointer"
                  }}
                  className="h-11 px-6 rounded-full hover:bg-[#0c5e6d] font-bold text-xs tracking-wider uppercase transition shadow-xs hover:shadow-md shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Apply For {currentTabService.title.split(" ")[0]}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Offerings Details */}
              <div className="py-6 space-y-4">
                <h4
                  style={{ textTransform: "none", color: "#111827" }}
                  className="text-sm font-bold uppercase tracking-wider"
                >
                  Key Scope of Work & Capabilities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentTabService.offerings.map((offering, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-2xs">
                      <Check size={16} className="text-[#094b57] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700">{offering}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta information grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 text-xs">
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="font-bold text-gray-900 uppercase text-[11px] mb-1">Target Eligibility</p>
                  <p className="text-gray-600 leading-relaxed" style={{ margin: 0 }}>{currentTabService.eligibility}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="font-bold text-gray-900 uppercase text-[11px] mb-1">Expected Turnaround</p>
                  <p className="text-gray-600 leading-relaxed" style={{ margin: 0 }}>{currentTabService.timeline}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100">
                  <p className="font-bold text-gray-900 uppercase text-[11px] mb-1">Key Deliverables</p>
                  <ul className="list-disc pl-4 text-gray-600 space-y-1" style={{ margin: 0 }}>
                    {currentTabService.deliverables.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE 4-STEP EXECUTION ROADMAP ================= */}
        <section className="msme-dark-sec py-20 bg-[#094b57] text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-[#e9c787] text-xs font-bold uppercase tracking-wider border border-white/15">
                Streamlined Execution
              </span>
              <h2
                style={{ color: "#ffffff", textTransform: "none" }}
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                How SKS INFI Delivers Results
              </h2>
              <p
                style={{ color: "rgba(255, 255, 255, 0.9)", margin: 0 }}
                className="text-sm sm:text-base font-light"
              >
                Our proven 4-stage process ensures zero paperwork delays, high approval rates, and continuous financial guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-3">
                <span className="text-3xl font-black text-[#e9c787]">01</span>
                <h4 style={{ color: "#ffffff", textTransform: "none", margin: 0 }} className="text-lg font-bold">
                  Diagnostic & Audit
                </h4>
                <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }} className="text-xs leading-relaxed">
                  We analyze your business financials, GST returns, and expansion goals to map exact capital needs and subsidy qualifications.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-3">
                <span className="text-3xl font-black text-[#e9c787]">02</span>
                <h4 style={{ color: "#ffffff", textTransform: "none", margin: 0 }} className="text-lg font-bold">
                  Scheme & Lender Matching
                </h4>
                <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }} className="text-xs leading-relaxed">
                  We match your enterprise with appropriate schemes (CGTMSE, RIPS, TReDS, or VC) and select best-fit institutional partners.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-3">
                <span className="text-3xl font-black text-[#e9c787]">03</span>
                <h4 style={{ color: "#ffffff", textTransform: "none", margin: 0 }} className="text-lg font-bold">
                  Turnkey Documentation
                </h4>
                <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }} className="text-xs leading-relaxed">
                  Our financial analysts draft comprehensive Detailed Project Reports (DPR), CMA projections, or Pitch Decks meeting strict compliance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-3">
                <span className="text-3xl font-black text-[#e9c787]">04</span>
                <h4 style={{ color: "#ffffff", textTransform: "none", margin: 0 }} className="text-lg font-bold">
                  Sanction & Disbursement
                </h4>
                <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }} className="text-xs leading-relaxed">
                  We follow through credit committee approvals, documentation signing, escrow setup, and final bank fund release to your account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= QUICK CONSULTATION INLINE FORM ================= */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-[#f9f8f5] rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#b69455]">
                  Fast-Track Eligibility
                </span>
                <h3
                  style={{ textTransform: "none", color: "#094b57" }}
                  className="text-2xl sm:text-3xl font-bold font-serif"
                >
                  Request an MSME Advisory Assessment
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Fill in your basic enterprise details below. Our senior MSME consultant will evaluate your options and contact you within 24 hours.
                </p>
              </div>

              {formSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 size={42} className="text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-emerald-900">Enquiry Received Successfully!</h4>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you. Our senior financial advisor will review your MSME requirements and connect with you shortly.
                  </p>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="mt-4 px-6 py-2 rounded-full bg-emerald-600 text-white font-semibold text-xs tracking-wider uppercase hover:bg-emerald-700 transition"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-5">
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 99285 29222"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Enterprise / Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Sharma Precision Works Pvt Ltd"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Annual Turnover Bracket
                      </label>
                      <select
                        value={turnover}
                        onChange={(e) => setTurnover(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      >
                        <option value="Below ₹1 Cr">Below ₹1 Crore</option>
                        <option value="₹1 Cr - ₹5 Cr">₹1 Crore - ₹5 Crore</option>
                        <option value="₹5 Cr - ₹25 Cr">₹5 Crore - ₹25 Crore</option>
                        <option value="₹25 Cr - ₹100 Cr">₹25 Crore - ₹100 Crore</option>
                        <option value="Above ₹100 Cr">Above ₹100 Crore</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Primary Service Needed *
                      </label>
                      <select
                        value={serviceNeeded}
                        onChange={(e) => setServiceNeeded(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white font-medium"
                      >
                        {MSME_SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Jaipur, Rajasthan"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Brief Business / Funding Requirement
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mention your target loan amount, expansion plan, subsidy interest, or specific questions..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={formLoading}
                      style={{
                        backgroundColor: "#094b57",
                        color: "#ffffff",
                        border: "none",
                        cursor: "pointer"
                      }}
                      className="w-full sm:w-auto min-w-[260px] h-12 px-8 rounded-full hover:bg-[#0c5e6d] font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mx-auto disabled:opacity-60"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit MSME Assessment Request</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-gray-500 mt-2.5">
                      Your business information is kept 100% confidential under strict professional privacy standards.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
        <section className="py-20 bg-[#f9f8f5] border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#094b57]/10 text-[#094b57] text-xs font-bold uppercase tracking-wider">
                Clear Answers
              </span>
              <h2
                style={{ textTransform: "none", color: "#094b57" }}
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                MSME Advisory FAQs
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Everything you need to know about loan limits, state subsidies, TReDS invoice discounting, and SME IPO eligibility.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs transition"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      style={{ background: "none", border: "none" }}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#094b57] hover:text-[#0c5e6d] transition cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp size={18} className="text-[#b69455] shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= DIRECT CONTACT & HOTLINE BANNER ================= */}
        <section className="msme-dark-sec py-16 bg-gradient-to-r from-[#094b57] via-[#0b5462] to-[#094b57] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-[#e9c787] text-xs font-bold uppercase tracking-wider border border-white/20">
                Direct Consulting Hotline
              </span>
              <h2
                style={{ color: "#ffffff", textTransform: "none" }}
                className="text-2xl sm:text-4xl font-bold font-serif"
              >
                Ready to Discuss Your MSME Financing or Subsidy?
              </h2>
              <p
                style={{ color: "rgba(255, 255, 255, 0.9)", margin: "0 auto" }}
                className="text-sm sm:text-base max-w-2xl font-light"
              >
                Connect directly with our senior financial consultants in Jaipur. Doorstep advisory and pan-India coverage available.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="tel:+919928529222"
                  style={{
                    backgroundColor: "#b69455",
                    color: "#094b57",
                    textDecoration: "none"
                  }}
                  className="h-12 px-7 rounded-full hover:bg-[#c5a365] font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition"
                >
                  <PhoneCall size={16} />
                  <span>Call +91 99285 29222</span>
                </a>
                <a
                  href="mailto:infi@sksinfi.com"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    borderColor: "rgba(255, 255, 255, 0.25)"
                  }}
                  className="h-12 px-7 rounded-full bg-white/10 hover:bg-white/20 font-semibold text-sm flex items-center gap-2 border transition"
                >
                  <Mail size={16} />
                  <span>infi@sksinfi.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Dynamic Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategory="MSME Advisory"
        initialProduct={modalService}
      />
    </div>
  );
}
